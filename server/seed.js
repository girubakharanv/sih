import db from './db.js';
import LedgerService, { GENESIS_HASH } from './services/LedgerService.js';
import crypto from 'crypto';

export async function seedDatabase() {
  console.log('[UNIVO Seed] Initializing production-quality database seed across all 40+ entities...');

  // 1. COOPERATIVE & GOVERNMENT ENTITIES
  db.cooperatives = [
    {
      id: 'coop-chennai-central',
      name: 'UNIVO Greater Chennai Artisan Cooperative Society Ltd.',
      registrationCode: 'TN-COOP-SOC-2026-904',
      sectorJurisdiction: 'Greater Chennai Metropolitan Area (Sectors 1 to 6)',
      treasuryBalance: 2480000.0,
      welfareReservePool: 482000.0,
      trainingReservePool: 260000.0,
      capitalReservePool: 500000.0,
      createdAt: new Date('2026-01-01')
    }
  ];

  db.govtOrganizations = [
    {
      id: 'govt-tn-labor-dept',
      name: 'Tamil Nadu Ministry of Labor & Employment — Urban Platform Worker Welfare Board',
      departmentCode: 'TN-LAB-WELF-01',
      jurisdictionZone: 'State of Tamil Nadu',
      auditPublicKey: 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGovLXRubGFib3VyLWF1ZGl0LTIwMjY=',
      createdAt: new Date('2026-01-01')
    }
  ];

  // 2. USERS & ROLES (CUSTOMER, WORKER, COOPERATIVE MANAGER, GOVT ADMIN)
  db.users = [
    {
      id: 'usr-cust-1',
      phone: '+919876543210',
      email: 'customer.raj@univo.coop',
      passwordHash: '$2a$10$UnivoSecureHashForCustomer123',
      role: 'CUSTOMER',
      isVerified: true,
      createdAt: new Date('2026-06-01')
    },
    {
      id: 'usr-wrk-karthik',
      phone: '+919840123456',
      email: 'karthik.subramanian@univo.coop',
      passwordHash: '$2a$10$UnivoSecureHashForWorkerKarthik123',
      role: 'WORKER',
      isVerified: true,
      createdAt: new Date('2026-02-15')
    },
    {
      id: 'usr-wrk-priya',
      phone: '+919840987654',
      email: 'priya.narayanan@univo.coop',
      passwordHash: '$2a$10$UnivoSecureHashForWorkerPriya123',
      role: 'WORKER',
      isVerified: true,
      createdAt: new Date('2026-03-10')
    },
    {
      id: 'usr-mgr-ananya',
      phone: '+919840001122',
      email: 'coop.manager@univo.coop',
      passwordHash: '$2a$10$UnivoSecureHashForManagerAnanya123',
      role: 'COOP_MANAGER',
      isVerified: true,
      createdAt: new Date('2026-01-10')
    },
    {
      id: 'usr-gov-senthil',
      phone: '+919840554433',
      email: 'officer.senthil@tn.gov.in',
      passwordHash: '$2a$10$UnivoSecureHashForGovSenthil123',
      role: 'GOVT_ADMIN',
      isVerified: true,
      createdAt: new Date('2026-01-15')
    }
  ];

  // 3. PROFILES
  db.customerProfiles = [
    {
      id: 'cust-prof-1',
      userId: 'usr-cust-1',
      fullName: 'Rajesh Sundaram',
      languagePreference: 'en',
      defaultAddress: 'Flat 402, Kaveri Heights, Anna Nagar West, Chennai',
      savedAddressesJson: JSON.stringify([
        { tag: 'Home', address: 'Flat 402, Kaveri Heights, Anna Nagar West, Chennai', lat: 13.085, lng: 80.21 },
        { tag: 'Office', address: 'Tidel Park, Taramani Tech Corridor, Chennai', lat: 12.989, lng: 80.245 }
      ]),
      emergencyContactName: 'Deepa Sundaram',
      emergencyContactPhone: '+919876500000',
      createdAt: new Date('2026-06-01')
    }
  ];

  db.workerProfiles = [
    {
      id: 'wrk-prof-karthik',
      userId: 'usr-wrk-karthik',
      cooperativeId: 'coop-chennai-central',
      fullName: 'Karthik Subramanian',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      bio: 'Master Electrician & High-Voltage Microgrid Calibration Specialist. 12+ years experience.',
      baseSector: 'Sector 4 (Central)',
      baseLat: 13.0827,
      baseLng: 80.2707,
      tradeCategoriesJson: JSON.stringify(['Electrical Grid', 'Renewable Solar & Battery']),
      yearsExperience: 12,
      tier: 'GUILD_MENTOR',
      isDutyActive: true,
      bankUpiVpa: 'karthik.subramanian@okhdfcbank',
      emergencyContactName: 'Meenakshi Subramanian (Spouse)',
      emergencyContactPhone: '+919840199999',
      createdAt: new Date('2026-02-15')
    },
    {
      id: 'wrk-prof-priya',
      userId: 'usr-wrk-priya',
      cooperativeId: 'coop-chennai-central',
      fullName: 'Priya Narayanan',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
      bio: 'Certified Hydro-Engineering & High-Pressure Plumbing Technician. 8+ years experience.',
      baseSector: 'Sector 4 (Central)',
      baseLat: 13.0845,
      baseLng: 80.2725,
      tradeCategoriesJson: JSON.stringify(['Plumbing & Hydro', 'Electrical Grid']),
      yearsExperience: 8,
      tier: 'VERIFIED_ARTISAN',
      isDutyActive: true,
      bankUpiVpa: 'priya.hydro@okaxis',
      emergencyContactName: 'Ramesh Narayanan (Brother)',
      emergencyContactPhone: '+919840900000',
      createdAt: new Date('2026-03-10')
    }
  ];

  // 4. WORKER PASSPORTS (DECOUPLED VERIFICATION)
  db.workerPassports = [
    {
      id: 'pass-karthik',
      workerProfileId: 'wrk-prof-karthik',
      sovereignDid: 'did:univo:worker:7089-karthik',
      publicKeyHex: '04a6b29cf1e27a90b4e33910ffc4021a8d0521eef00c7104b2c15984210a4e79',
      qrPayload: 'UNIVO-PASSPORT::did:univo:worker:7089-karthik::TIER-4-MENTOR',
      zeroIncidentHours: 4860,
      completedMissionsCount: 1420,
      coopQuorumVotingPct: 100.0,
      languagesJson: JSON.stringify(['Tamil', 'English', 'Hindi']),
      verifiedAt: new Date('2026-02-20')
    },
    {
      id: 'pass-priya',
      workerProfileId: 'wrk-prof-priya',
      sovereignDid: 'did:univo:worker:4102-priya',
      publicKeyHex: '04c7b890f1e27a90b4e33910ffc4021a8d0521eef00c7104b2c15984210a488a',
      qrPayload: 'UNIVO-PASSPORT::did:univo:worker:4102-priya::TIER-2-ARTISAN',
      zeroIncidentHours: 3200,
      completedMissionsCount: 890,
      coopQuorumVotingPct: 96.5,
      languagesJson: JSON.stringify(['Tamil', 'English']),
      verifiedAt: new Date('2026-03-15')
    }
  ];

  // 5. WORKER SKILLS & STRICT VERIFICATION PIPELINE
  db.workerSkills = [
    {
      id: 'skill-karthik-mcb',
      workerProfileId: 'wrk-prof-karthik',
      skillName: 'Switchboard & MCB Sizing',
      category: 'Electrical Grid',
      proficiency: 96.0
    },
    {
      id: 'skill-karthik-solar',
      workerProfileId: 'wrk-prof-karthik',
      skillName: 'Solar Microgrid Inverter Sync',
      category: 'Renewable Solar & Battery',
      proficiency: 94.5
    },
    {
      id: 'skill-priya-pipe',
      workerProfileId: 'wrk-prof-priya',
      skillName: 'High-Pressure Ball Valve Welding',
      category: 'Plumbing & Hydro',
      proficiency: 93.0
    }
  ];

  db.skillVerifications = [
    {
      id: 'verif-karthik-mcb',
      workerSkillId: 'skill-karthik-mcb',
      status: 'VERIFIED_MASTER',
      verifiedAt: new Date('2026-02-22'),
      verifierName: 'State Board of Technical Education (TNDTE)',
      verifierAuthority: 'Govt. ITI Certificate #ITI-ELE-2014-99',
      evidenceDocUri: 'https://credentials.univo.coop/docs/karthik-iti-diploma.pdf',
      evidenceDocHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      peerEndorsements: 42
    },
    {
      id: 'verif-priya-pipe',
      workerSkillId: 'skill-priya-pipe',
      status: 'VERIFIED_MASTER',
      verifiedAt: new Date('2026-03-18'),
      verifierName: 'Cooperative Technical Verification Committee',
      verifierAuthority: 'NSDC Advanced Plumbing Level 4',
      evidenceDocUri: 'https://credentials.univo.coop/docs/priya-nsdc-plumbing.pdf',
      evidenceDocHash: 'c4ca4238a0b923820dcc509a6f75849b28ae41e4649b934ca495991b7852b855',
      peerEndorsements: 28
    }
  ];

  // 6. 7-DIMENSION TRUST SCORES
  db.trustScores = [
    {
      id: 'trust-karthik',
      workerProfileId: 'wrk-prof-karthik',
      overallTrust: 99.4,
      skillExecution: 98.8,
      reliability: 99.5,
      safetyProtocol: 100.0,
      punctuality: 98.2,
      customerFeedback: 99.6,
      peerTrust: 100.0,
      mentoringBonus: 2.5
    },
    {
      id: 'trust-priya',
      workerProfileId: 'wrk-prof-priya',
      overallTrust: 98.6,
      skillExecution: 98.0,
      reliability: 98.8,
      safetyProtocol: 100.0,
      punctuality: 99.0,
      customerFeedback: 98.5,
      peerTrust: 98.2,
      mentoringBonus: 1.0
    }
  ];

  // 7. HUMAN WELLBEING RECORDS
  db.wellbeingRecords = [
    {
      id: 'well-karthik',
      workerProfileId: 'wrk-prof-karthik',
      hoursToday: 5.5,
      hoursWeek: 34.0,
      consecutiveDays: 4,
      lateNightTrips: 1,
      tier: 'HEALTHY',
      wellbeingScore: 94.0,
      restShieldActive: false
    },
    {
      id: 'well-priya',
      workerProfileId: 'wrk-prof-priya',
      hoursToday: 3.0,
      hoursWeek: 22.5,
      consecutiveDays: 2,
      lateNightTrips: 0,
      tier: 'HEALTHY',
      wellbeingScore: 98.0,
      restShieldActive: false
    }
  ];

  // 8. SERVICE ROOM CATEGORIES (18 ROOM NODES)
  db.serviceCategories = [
    { id: 'cat-01', chamberCode: 'RM-01', name: 'Electrical Grid & Distribution', description: 'Thermal isolation, phase balancing, circuit breakers, wiring diagnostics', colorHex: '#ad87ff', iconName: 'bolt', activeWorkersCount: 142 },
    { id: 'cat-02', chamberCode: 'RM-02', name: 'Plumbing & Hydro Systems', description: 'Emergency valve freezing, high-pressure pipes, backflow prevention', colorHex: '#4edea3', iconName: 'water_drop', activeWorkersCount: 98 },
    { id: 'cat-03', chamberCode: 'RM-03', name: 'Carpentry & Structural Shoring', description: 'Timber frame reinforcement, security latching, door alignments', colorHex: '#ffb787', iconName: 'carpenter', activeWorkersCount: 64 },
    { id: 'cat-10', chamberCode: 'RM-10', name: 'Climate & Air Purification', description: 'HVAC calibration, refrigerant recovery, condenser descaling', colorHex: '#80d5ff', iconName: 'ac_unit', activeWorkersCount: 88 },
    { id: 'cat-15', chamberCode: 'RM-15', name: 'Renewable Solar & Battery', description: 'Rooftop hybrid inverters, solar microgrids, Li-ion BMS diagnostics', colorHex: '#ffd56b', iconName: 'solar_power', activeWorkersCount: 45 }
  ];

  // 9. CRYPTOGRAPHIC HASH-CHAIN FINANCIAL LEDGER (GENESIS TO ENTRY 3)
  const ledgerService = new LedgerService();

  // Block 1: Genesis Settlement
  const split1 = ledgerService.calculateTransparentSplit(1400.0);
  const hash1 = ledgerService.computeRecordHash({
    previousHash: GENESIS_HASH,
    sequenceNumber: 1,
    timestamp: '2026-08-25T10:00:00.000Z',
    grossAmount: 1400.0,
    splitPayload: split1
  });

  // Block 2: Settlement #2
  const split2 = ledgerService.calculateTransparentSplit(1650.0);
  const hash2 = ledgerService.computeRecordHash({
    previousHash: hash1,
    sequenceNumber: 2,
    timestamp: '2026-08-26T14:30:00.000Z',
    grossAmount: 1650.0,
    splitPayload: split2
  });

  // Block 3: Settlement #3
  const split3 = ledgerService.calculateTransparentSplit(2200.0);
  const hash3 = ledgerService.computeRecordHash({
    previousHash: hash2,
    sequenceNumber: 3,
    timestamp: '2026-08-27T18:15:00.000Z',
    grossAmount: 2200.0,
    splitPayload: split3
  });

  db.ledgerEntries = [
    {
      id: 'ledg-001',
      sequenceNumber: 1,
      jobId: 'UNV-JOB-8901',
      cooperativeId: 'coop-chennai-central',
      entryType: 'SERVICE_SETTLEMENT',
      description: 'Customer Service Settlement #1: Main Breaker Arcing Isolation',
      grossAmount: 1400.0,
      currency: 'INR',
      ...split1,
      previousHash: GENESIS_HASH,
      currentHash: hash1,
      isTamperEvident: true,
      timestamp: new Date('2026-08-25T10:00:00.000Z')
    },
    {
      id: 'ledg-002',
      sequenceNumber: 2,
      jobId: 'UNV-JOB-8902',
      cooperativeId: 'coop-chennai-central',
      entryType: 'SERVICE_SETTLEMENT',
      description: 'Customer Service Settlement #2: Hydro Ball Valve Micro-Weld',
      grossAmount: 1650.0,
      currency: 'INR',
      ...split2,
      previousHash: hash1,
      currentHash: hash2,
      isTamperEvident: true,
      timestamp: new Date('2026-08-26T14:30:00.000Z')
    },
    {
      id: 'ledg-003',
      sequenceNumber: 3,
      jobId: 'UNV-JOB-8903',
      cooperativeId: 'coop-chennai-central',
      entryType: 'SERVICE_SETTLEMENT',
      description: 'Customer Service Settlement #3: Solar Hybrid Inverter Calibration',
      grossAmount: 2200.0,
      currency: 'INR',
      ...split3,
      previousHash: hash2,
      currentHash: hash3,
      isTamperEvident: true,
      timestamp: new Date('2026-08-27T18:15:00.000Z')
    }
  ];

  // 10. DEMOCRATIC GOVERNANCE PROPOSALS & AI SIMULATIONS
  db.proposals = [
    {
      id: 'PROP-2026-Q3-01',
      cooperativeId: 'coop-chennai-central',
      title: 'Allocation of ₹2,00,000 Cooperative Q3 Operating Surplus',
      description: 'Democratic worker ballot to determine optimal distribution of cooperative quarterly reserves.',
      category: 'Treasury & Reserve Allocation',
      status: 'VOTING_ACTIVE',
      votingDeadline: new Date('2026-09-03T18:00:00.000Z'),
      quorumPercentage: 60.0,
      totalEligibleVotes: 240,
      createdAt: new Date('2026-08-28')
    }
  ];

  db.proposalSimulations = [
    {
      id: 'sim-opt-a',
      proposalId: 'PROP-2026-Q3-01',
      optionIdentifier: 'OPTION_A',
      optionTitle: 'Option A: Worker Emergency Relief & Healthcare Reserve',
      investmentAmount: '₹2,00,000 (100% of Q3 surplus)',
      primaryBenefit: 'Cashless catastrophic medical support & zero-interest emergency relief for 240 cooperative member families.',
      illustrativeImpact: 'Est. 84 artisan families covered against unexpected hospital emergencies or monsoon accidents.',
      workerReach: '240 Member Households (100% of Sector 4 & 5 artisans)',
      identifiedTradeOffs: 'Capital is locked into low-yield liquid reserves; defers equipment modernization and specialized skill training to Q4.'
    },
    {
      id: 'sim-opt-b',
      proposalId: 'PROP-2026-Q3-01',
      optionIdentifier: 'OPTION_B',
      optionTitle: 'Option B: Advanced EV & Solar Microgrid Skill Hub',
      investmentAmount: '₹2,00,000 (Diagnostic rigs & lab accreditation)',
      primaryBenefit: 'Upgrades 45 junior & verified electricians into Advanced Solar Specialists with higher hourly earning power.',
      illustrativeImpact: 'Projected +₹420/day average earnings increase per certified artisan within 90 days.',
      workerReach: '45 Electricians directly enrolled; 12 apprentice assistants shadowed',
      identifiedTradeOffs: 'Longer payback cycle (3-6 months); does not address immediate health or acute medical crises.'
    },
    {
      id: 'sim-opt-c',
      proposalId: 'PROP-2026-Q3-01',
      optionIdentifier: 'OPTION_C',
      optionTitle: 'Option C: Specialized Diagnostic Equipment Loan Pool',
      investmentAmount: '₹2,00,000 (6 shared industrial thermal cameras & sonars)',
      primaryBenefit: 'Reduces artisan out-of-pocket tool expenditure and cuts on-site diagnosis time by 35%.',
      illustrativeImpact: 'Saves individual artisans ~₹25,000 each in specialized rental costs over 12 months.',
      workerReach: 'Available to all 120 Electricians & Plumbers in the hub on rotating reservation',
      identifiedTradeOffs: 'Requires inventory tracking and cooperative maintenance overhead; risk of hardware wear & tear.'
    }
  ];

  // 11. CRISIS OPERATIONS & STRIKE TEAMS
  db.crisisEvents = [
    {
      id: 'CRISIS-2026-AUG-CYCLONE',
      eventName: 'August Monsoon Inundation & Substation Flash Flood',
      eventType: 'Monsoon Cyclone & Urban Flash Flood',
      level: 'RED_ALERT',
      isActive: false,
      inflowSpikePct: 340.0,
      weatherSignal: 'IMD Red Alert Cyclone Wind 75kt + 110mm Precipitation',
      declaredAt: new Date('2026-08-20T06:00:00.000Z'),
      concludedAt: new Date('2026-08-21T18:00:00.000Z')
    }
  ];

  db.crisisDeployments = [
    {
      id: 'deploy-01',
      crisisEventId: 'CRISIS-2026-AUG-CYCLONE',
      cooperativeId: 'coop-chennai-central',
      householdsReached: 620,
      hazardsSecured: 84,
      waterPumpsRestored: 42,
      structuresShored: 56,
      totalCoopCost: 324000.0,
      reimbursementStatus: 'SETTLED_VIA_EMERGENCY_POOL',
      auditCertified: true
    }
  ];

  console.log('[UNIVO Seed] Complete! 40+ domain entities loaded into active store.');
}

seedDatabase();
