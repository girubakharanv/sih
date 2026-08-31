import express from 'express';
import cors from 'cors';
import db from './db.js';
import { seedDatabase } from './seed.js';
import { generateToken, requireAuth, requireRole, ROLES } from './middleware/auth.js';
import auditLogger from './middleware/audit.js';
import LedgerService, { GENESIS_HASH } from './services/LedgerService.js';
import paymentGateway from './services/PaymentService.js';

const app = express();
const PORT = process.env.PORT || 4000;
const ledgerService = new LedgerService();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(auditLogger(db));

// Initialize seed data on boot
seedDatabase();

// =========================================================================
// 1. HEALTH & SYSTEM METADATA
// =========================================================================
app.get('/api/health', (req, res) => {
  res.json({
    status: 'HEALTHY',
    system: 'UNIVO Cooperative Operating System API',
    version: '2.4.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    entitiesTracked: Object.keys(db).length,
    rolesSupported: Object.values(ROLES),
    ledgerIntegrity: 'SHA-256 Tamper-Evident Hash Chain Active'
  });
});

// =========================================================================
// 2. AUTHENTICATION (CUSTOMER, WORKER, COOP MANAGER, GOVT ADMIN)
// =========================================================================
app.post('/api/auth/login', (req, res) => {
  const { phone, email, role = 'CUSTOMER', otp } = req.body;

  let user = null;
  if (phone) user = db.users.find((u) => u.phone === phone);
  else if (email) user = db.users.find((u) => u.email === email);

  // If user does not exist in seed, dynamically register session user with requested role
  if (!user) {
    user = {
      id: `usr-${Date.now()}`,
      phone: phone || '+919999900000',
      email: email || `user_${Date.now()}@univo.coop`,
      role: role || ROLES.CUSTOMER,
      isVerified: true,
      createdAt: new Date()
    };
    db.users.push(user);
  }

  const token = generateToken(user);

  res.json({
    success: true,
    token,
    user: {
      id: user.id,
      phone: user.phone,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified
    }
  });
});

app.get('/api/auth/me', requireAuth, (req, res) => {
  const user = db.users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'UserNotFound' });

  // Attach associated profile
  let profile = null;
  if (user.role === ROLES.CUSTOMER) {
    profile = db.customerProfiles.find((p) => p.userId === user.id);
  } else if (user.role === ROLES.WORKER) {
    profile = db.workerProfiles.find((p) => p.userId === user.id);
  }

  res.json({ user, profile });
});

// Helper to sanitize worker profiles for public/customer view
function sanitizeWorkerProfile(worker, viewerUser = null) {
  // If viewer is the worker themselves or coop manager/govt admin, they get full authorized profile
  const isOwner = viewerUser && (viewerUser.id === worker.userId || viewerUser.role === ROLES.COOP_MANAGER || viewerUser.role === ROLES.GOVT_ADMIN);

  const sanitized = {
    id: worker.id,
    userId: worker.userId,
    fullName: worker.fullName,
    avatarUrl: worker.avatarUrl,
    bio: worker.bio,
    baseSector: worker.baseSector,
    tradeCategoriesJson: worker.tradeCategoriesJson,
    yearsExperience: worker.yearsExperience,
    tier: worker.tier,
    isDutyActive: worker.isDutyActive
  };

  // Only expose private financial details & emergency contacts to the worker owner or cooperative manager
  if (isOwner) {
    sanitized.bankUpiVpa = worker.bankUpiVpa;
    sanitized.emergencyContactName = worker.emergencyContactName;
    sanitized.emergencyContactPhone = worker.emergencyContactPhone;
  }

  return sanitized;
}

// Rate limiting in-memory store
const rateLimitMap = new Map();
function rateLimiter(limit = 120, windowMs = 60000) {
  return (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';
    const now = Date.now();
    const clientData = rateLimitMap.get(ip) || { count: 0, resetAt: now + windowMs };

    if (now > clientData.resetAt) {
      clientData.count = 1;
      clientData.resetAt = now + windowMs;
    } else {
      clientData.count += 1;
    }

    rateLimitMap.set(ip, clientData);

    if (clientData.count > limit) {
      return res.status(429).json({
        error: 'TooManyRequests',
        message: 'Rate limit exceeded. Please slow down your requests.'
      });
    }

    next();
  };
}

// Apply rate limiter to all API endpoints
app.use('/api', rateLimiter(180, 60000));

// =========================================================================
// 3. WORKER PROFILES, PASSPORT & SEPARATE VERIFICATION PIPELINE
// =========================================================================
app.get('/api/workers', (req, res) => {
  const { category, search, page = 1, limit = 10 } = req.query;

  let results = [...db.workerProfiles];

  if (category) {
    results = results.filter((w) => w.tradeCategoriesJson.includes(category));
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter((w) => w.fullName.toLowerCase().includes(q) || w.bio.toLowerCase().includes(q));
  }

  // Join passport and trust scores with strict PII masking
  const enriched = results.map((worker) => {
    const passport = db.workerPassports.find((p) => p.workerProfileId === worker.id);
    const trustScore = db.trustScores.find((t) => t.workerProfileId === worker.id);
    const skills = db.workerSkills.filter((s) => s.workerProfileId === worker.id);
    const wellbeing = db.wellbeingRecords.find((w) => w.workerProfileId === worker.id);

    return {
      ...sanitizeWorkerProfile(worker, req.user),
      passport,
      trustScore,
      skills,
      wellbeing: {
        currentFatigueTier: wellbeing?.currentFatigueTier || 'HEALTHY',
        activeDutyHoursToday: wellbeing?.activeDutyHoursToday || 3.5,
        restBreakStatus: wellbeing?.restBreakStatus || 'VERIFIED'
      }
    };
  });

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const paginated = enriched.slice((pageNum - 1) * limitNum, pageNum * limitNum);

  res.json({
    total: enriched.length,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(enriched.length / limitNum),
    data: paginated
  });
});

app.get('/api/workers/:id/passport', (req, res) => {
  const worker = db.workerProfiles.find((w) => w.id === req.params.id || w.userId === req.params.id);
  if (!worker) return res.status(404).json({ error: 'WorkerNotFound' });

  const passport = db.workerPassports.find((p) => p.workerProfileId === worker.id);
  const trustScore = db.trustScores.find((t) => t.workerProfileId === worker.id);
  const skills = db.workerSkills.filter((s) => s.workerProfileId === worker.id).map((s) => {
    const verif = db.skillVerifications.find((v) => v.workerSkillId === s.id);
    return { ...s, verification: verif };
  });

  res.json({
    worker: sanitizeWorkerProfile(worker, req.user),
    passport,
    trustScore,
    verifiedSkills: skills
  });
});

// Decoupled Skill Verification Audit Submission
app.post('/api/workers/:id/verify-skill', requireAuth, requireRole(ROLES.COOP_MANAGER, ROLES.GOVT_ADMIN), (req, res) => {
  const { skillId, status, verifierAuthority, evidenceDocUri } = req.body;

  let verif = db.skillVerifications.find((v) => v.workerSkillId === skillId);
  if (!verif) {
    verif = {
      id: `verif-${Date.now()}`,
      workerSkillId: skillId,
      status: status || 'VERIFIED_MASTER',
      verifiedAt: new Date(),
      verifierName: req.user.email,
      verifierAuthority: verifierAuthority || 'Cooperative Verification Committee',
      evidenceDocUri: evidenceDocUri || 'https://credentials.univo.coop/docs/verified.pdf',
      evidenceDocHash: 'sha256-verified-doc-hash',
      peerEndorsements: 1
    };
    db.skillVerifications.push(verif);
  } else {
    verif.status = status;
    verif.verifiedAt = new Date();
    verif.verifierName = req.user.email;
  }

  res.json({ success: true, verification: verif });
});

// =========================================================================
// 4. SERVICE DIRECTORY & SERVICE REQUEST INTAKE
// =========================================================================
app.get('/api/categories', (req, res) => {
  res.json({ categories: db.serviceCategories });
});

app.post('/api/requests', (req, res) => {
  const {
    customerId = 'cust-prof-1',
    intakeMode = 'TEXT',
    serviceCategory = 'Electrical Grid',
    detectedProblem = 'Switchboard Thermal Arcing',
    urgency = 'ELEVATED',
    severity = 'HIGH',
    priceEstimateMin = 1200,
    priceEstimateMax = 1600,
    targetAddress = 'Anna Nagar West, Chennai'
  } = req.body;

  const newRequest = {
    id: `REQ-${Date.now()}`,
    customerProfileId: customerId,
    intakeMode,
    serviceCategory,
    chamberCode: 'RM-01',
    detectedProblem,
    urgency,
    severity,
    priceEstimateMin,
    priceEstimateMax,
    aiConfidence: 96.8,
    isPreliminaryDiagnosis: true,
    targetAddress,
    createdAt: new Date()
  };

  db.serviceRequests.push(newRequest);

  res.status(201).json({ success: true, serviceRequest: newRequest });
});

// =========================================================================
// 5. JOBS, FAIR DISPATCH & LIFECYCLE
// =========================================================================
app.get('/api/jobs', (req, res) => {
  res.json({ jobs: db.jobs });
});

app.post('/api/jobs/dispatch', (req, res) => {
  const { serviceRequestId, selectedWorkerId, baseScore = 82.0, fairnessAdjustment = 9.0, finalSuitability = 91.0, grossAmount = 1400.0 } = req.body;

  const job = {
    id: `UNV-JOB-${Math.floor(1000 + Math.random() * 9000)}`,
    serviceRequestId: serviceRequestId || `REQ-${Date.now()}`,
    customerId: 'cust-prof-1',
    title: 'Emergency Breaker Arcing & Phase Stabilization',
    category: 'Electrical Grid',
    status: 'DISPATCHED',
    urgency: 'ELEVATED',
    locationAddress: 'Anna Nagar West, Chennai',
    laborPrice: grossAmount * 0.85,
    partsPrice: grossAmount * 0.15,
    totalAmount: grossAmount,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  db.jobs.push(job);

  // Record Explainable Fairness Adjustment
  const fairnessRec = {
    id: `FAIR-${Date.now()}`,
    jobId: job.id,
    selectedWorkerId: selectedWorkerId || 'wrk-prof-priya',
    recentMissions14d: 3,
    sectorAverage14d: 8.5,
    opportunityDelta: 5.5,
    adjustmentPoints: fairnessAdjustment,
    explainableReason: `Worker is fully qualified and received +${fairnessAdjustment} pts fairness boost because they were historically underserved in the recent 14-day cycle.`,
    createdAt: new Date()
  };
  db.fairnessAdjustments.push(fairnessRec);

  res.status(201).json({
    success: true,
    job,
    fairnessRecord: fairnessRec
  });
});

// =========================================================================
// 6. CRYPTOGRAPHIC HASH-CHAIN FINANCIAL LEDGER
// =========================================================================
app.get('/api/ledger', (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  const sorted = [...db.ledgerEntries].sort((a, b) => b.sequenceNumber - a.sequenceNumber);
  const paginated = sorted.slice((pageNum - 1) * limitNum, pageNum * limitNum);

  res.json({
    totalEntries: sorted.length,
    page: pageNum,
    limit: limitNum,
    data: paginated
  });
});

// Cryptographic Hash Chain Audit Endpoint
app.get('/api/ledger/verify-chain', async (req, res) => {
  let expectedPrevHash = GENESIS_HASH;
  const sorted = [...db.ledgerEntries].sort((a, b) => a.sequenceNumber - b.sequenceNumber);

  for (let i = 0; i < sorted.length; i++) {
    const entry = sorted[i];

    if (entry.previousHash !== expectedPrevHash) {
      return res.status(400).json({
        isValid: false,
        compromisedSequence: entry.sequenceNumber,
        reason: `Broken chain link at #${entry.sequenceNumber}: expected ${expectedPrevHash}, found ${entry.previousHash}`
      });
    }

    const split = {
      grossAmount: entry.grossAmount,
      workerShare: entry.workerShare,
      coopShare: entry.coopShare,
      welfareShare: entry.welfareShare,
      trainingShare: entry.trainingShare,
      operationsShare: entry.operationsShare,
      capitalReserveShare: entry.capitalReserveShare
    };

    const recomputed = ledgerService.computeRecordHash({
      previousHash: entry.previousHash,
      sequenceNumber: entry.sequenceNumber,
      timestamp: entry.timestamp instanceof Date ? entry.timestamp.toISOString() : entry.timestamp,
      grossAmount: entry.grossAmount,
      splitPayload: split
    });

    if (recomputed !== entry.currentHash) {
      return res.status(400).json({
        isValid: false,
        compromisedSequence: entry.sequenceNumber,
        reason: `Hash mismatch at sequence #${entry.sequenceNumber}: data has been tampered with.`
      });
    }

    expectedPrevHash = entry.currentHash;
  }

  res.json({
    isValid: true,
    verifiedEntriesCount: sorted.length,
    latestHash: expectedPrevHash,
    reason: 'Cryptographic hash chain is 100% intact and tamper-free from Genesis.'
  });
});

// Append settlement to hash-chain
app.post('/api/ledger/settle', requireAuth, async (req, res) => {
  const { jobId, description, grossAmount = 1500.0 } = req.body;

  const sorted = [...db.ledgerEntries].sort((a, b) => b.sequenceNumber - a.sequenceNumber);
  const latest = sorted[0];

  const previousHash = latest ? latest.currentHash : GENESIS_HASH;
  const sequenceNumber = latest ? latest.sequenceNumber + 1 : 1;
  const timestamp = new Date().toISOString();
  const split = ledgerService.calculateTransparentSplit(grossAmount);

  const currentHash = ledgerService.computeRecordHash({
    previousHash,
    sequenceNumber,
    timestamp,
    grossAmount: split.grossAmount,
    splitPayload: split
  });

  const newEntry = {
    id: `ledg-${String(sequenceNumber).padStart(3, '0')}`,
    sequenceNumber,
    jobId: jobId || `UNV-JOB-${Math.floor(1000 + Math.random() * 9000)}`,
    cooperativeId: 'coop-chennai-central',
    entryType: 'SERVICE_SETTLEMENT',
    description: description || `Cooperative Settlement #${sequenceNumber}`,
    ...split,
    currency: 'INR',
    previousHash,
    currentHash,
    isTamperEvident: true,
    timestamp: new Date()
  };

  db.ledgerEntries.push(newEntry);

  res.status(201).json({
    success: true,
    ledgerEntry: newEntry
  });
});

// =========================================================================
// 7. DEMOCRATIC GOVERNANCE & AI SIMULATOR
// =========================================================================
app.get('/api/proposals', (req, res) => {
  const proposalsWithSim = db.proposals.map((p) => {
    const simulations = db.proposalSimulations.filter((s) => s.proposalId === p.id);
    const votes = db.votes.filter((v) => v.proposalId === p.id);
    return { ...p, simulations, votesCount: votes.length };
  });

  res.json({ proposals: proposalsWithSim });
});

app.post('/api/proposals/:id/vote', requireAuth, (req, res) => {
  const { selectedOption, voterDid = 'did:univo:worker:7089-karthik' } = req.body;

  const vote = {
    id: `vote-${Date.now()}`,
    proposalId: req.params.id,
    userId: req.user.id,
    voterDid,
    selectedOption,
    digitalSignature: crypto.createHash('sha256').update(`${req.user.id}:${req.params.id}:${selectedOption}`).digest('hex'),
    createdAt: new Date()
  };

  db.votes.push(vote);

  res.status(201).json({
    success: true,
    message: 'Cryptographic sovereign ballot recorded on governance ledger.',
    vote
  });
});

// =========================================================================
// 8. CRISIS OPERATIONS & LIVE TELEMETRY
// =========================================================================
app.get('/api/crisis/live', (req, res) => {
  const activeEvent = db.crisisEvents.find((c) => c.isActive) || db.crisisEvents[0];
  const deployments = db.crisisDeployments.filter((d) => d.crisisEventId === activeEvent.id);

  res.json({
    activeEvent,
    deployments,
    isCrisisModeActive: activeEvent?.isActive || false,
    strikeTeamsCount: 5,
    totalArtisansMobilized: 148
  });
});

// =========================================================================
// 9. MUTUAL AID WELFARE & PRIVACY PROTECTION
// =========================================================================
// Worker creates welfare request (requires auth, private to worker and coop committee)
app.post('/api/welfare/requests', requireAuth, (req, res) => {
  const { category, requestedAmount, emergencyReason } = req.body;

  const newWelfare = {
    id: `WELF-${Date.now()}`,
    workerProfileId: req.user.id,
    workerEmail: req.user.email,
    category: category || 'CLIMATE_DISRUPTION',
    requestedAmount: Number(requestedAmount) || 3500.0,
    emergencyReason: emergencyReason || 'Rainfall disruption > 80mm sensor trigger',
    status: 'COMMITTEE_REVIEW',
    submittedAt: new Date(),
    isPrivateRecord: true
  };

  db.welfareRequests.push(newWelfare);

  res.status(201).json({
    success: true,
    message: 'Welfare assistance request registered under cooperative privacy vault.',
    welfareRequest: newWelfare
  });
});

// View welfare requests: Worker can only see their own; Coop Manager / Govt Admin can see all
app.get('/api/welfare/requests', requireAuth, (req, res) => {
  let list = db.welfareRequests;

  if (req.user.role === ROLES.WORKER) {
    list = list.filter((w) => w.workerProfileId === req.user.id);
  } else if (req.user.role === ROLES.CUSTOMER) {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Customers do not have authorization to view private artisan welfare records.'
    });
  }

  res.json({ welfareRequests: list });
});

// Cooperative manager decides welfare assistance
app.post('/api/welfare/:id/decide', requireAuth, requireRole(ROLES.COOP_MANAGER, ROLES.GOVT_ADMIN), (req, res) => {
  const { decision = 'APPROVED', approvedAmount = 3500.0, notes } = req.body;
  const target = db.welfareRequests.find((w) => w.id === req.params.id);

  if (!target) return res.status(404).json({ error: 'WelfareRequestNotFound' });

  target.status = decision;
  target.approvedAmount = approvedAmount;
  target.decisionAt = new Date();
  target.decidedBy = req.user.email;
  target.notes = notes || 'Cooperative mutual aid committee approved under parametric rule #402';

  res.json({
    success: true,
    decision: target
  });
});

// Start Express Server
const server = app.listen(PORT, () => {
  console.log(`[UNIVO Server] Production Backend running on http://localhost:${PORT}`);
  console.log(`[UNIVO Server] Health check: http://localhost:${PORT}/api/health`);
  console.log(`[UNIVO Server] Tamper-evident ledger audit: http://localhost:${PORT}/api/ledger/verify-chain`);
});

export default app;
