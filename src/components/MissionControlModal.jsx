import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import soundEngine from '../services/soundEngine';

export default function MissionControlModal({ isOpen, onClose }) {
  const [activeSubTab, setActiveSubTab] = useState('story'); // 'story' | 'checklist' | 'services' | 'matrix'

  if (!isOpen) return null;

  const narrativeStory = [
    { actor: 'Customer', quote: '“I have a problem.”', desc: 'Customer takes a photo or speaks in Tamil/Hindi/English to describe an active breakdown.', icon: 'person', color: '#adc6ff' },
    { actor: 'UNIVO AI', quote: '“I understand it.”', desc: 'Multi-modal diagnostic models classify the problem, skill requirements, duration, and transparent rates.', icon: 'psychology', color: '#60a5fa' },
    { actor: 'Fair Dispatch', quote: '“I\'ll find the right qualified worker fairly.”', desc: 'Disqualifies unverified/fatigued candidates; ranks verified pool with explainable fairness equity.', icon: 'alt_route', color: '#4edea3' },
    { actor: 'Worker', quote: '“I\'ll do the job.”', desc: 'Artisan arrives equipped with sovereign credentials, live tracking, and guild mentor backup.', icon: 'engineering', color: '#f59e0b' },
    { actor: 'Cooperative', quote: '“I\'ll make the value transparent and shared.”', desc: 'Cryptographic SHA-256 hash-chain splits ₹1,400 across 6 transparent cooperative pools.', icon: 'hub', color: '#ec4899' },
    { actor: 'AI', quote: '“I\'ll learn from the job.”', desc: 'Post-mission learning loop recalibrates Skill DNA, 7-factor Trust, and demand spread models.', icon: 'loop', color: '#a78bfa' },
    { actor: 'Workers', quote: '“We\'ll decide our future together.”', desc: 'Democratic governance with AI What-If trade-off simulation and cryptographic sovereign ballots.', icon: 'how_to_vote', color: '#38bdf8' },
    { actor: 'Government', quote: '“I\'ll see the impact and support the ecosystem.”', desc: 'Privacy-preserving labor board portal verifies living wages, social security, and disaster mitigation.', icon: 'verified_user', color: '#34d399' },
    { actor: 'SYSTEM', quote: '“The next job makes the ecosystem better.”', desc: 'Every completed mission strengthens collective intelligence, solvency, and equitable income distribution.', icon: 'sync', color: '#fbbf24' }
  ];

  const canonicalServices = [
    { id: 'RM-01', name: 'Electrical', desc: 'High-voltage, breaker isolation, switchboards', color: '#f59e0b', icon: 'electrical_services' },
    { id: 'RM-02', name: 'Plumbing & Water', desc: 'Hydro-lines, leak sonar, water filtration', color: '#3b82f6', icon: 'faucet' },
    { id: 'RM-03', name: 'Carpentry & Furniture', desc: 'Structural joinery, shoring, cabinetry', color: '#92400e', icon: 'carpenter' },
    { id: 'RM-04', name: 'Appliance & Cooling', desc: 'Compressor diagnostics, refrigerant safety', color: '#6366f1', icon: 'mode_fan' },
    { id: 'RM-05', name: 'Construction & Masonry', desc: 'Civil repairs, structural shoring, tiling', color: '#71717a', icon: 'foundation' },
    { id: 'RM-06', name: 'Painting & Finishing', desc: 'Surface coating, waterproofing, anti-fungal', color: '#ec4899', icon: 'format_paint' },
    { id: 'RM-07', name: 'Gardening & Green Work', desc: 'Urban botany, drip irrigation, compost', color: '#10b981', icon: 'yard' },
    { id: 'RM-08', name: 'Cleaning & Sanitation', desc: 'Biohazard deep decontamination, sanitization', color: '#06b6d4', icon: 'cleaning_services' },
    { id: 'RM-09', name: 'Pest & Hygiene', desc: 'Targeted eco-friendly vector control', color: '#4d7c0f', icon: 'pest_control' },
    { id: 'RM-10', name: 'Care & Assistance', desc: 'Elderly assistance, mobility support', color: '#f43f5e', icon: 'elderly' },
    { id: 'RM-11', name: 'Vehicle Services', desc: 'EV battery diagnostics, on-demand mechanic', color: '#334155', icon: 'directions_car' },
    { id: 'RM-12', name: 'Local Logistics', desc: 'First/last mile micro-freight, courier', color: '#8b5cf6', icon: 'local_shipping' },
    { id: 'RM-13', name: 'Household Assistance', desc: 'Smart home setup, general domestic help', color: '#d946ef', icon: 'home_repair_service' },
    { id: 'RM-14', name: 'Rural & Agriculture', desc: 'Solar pumps, farm tech, micro-irrigation', color: '#15803d', icon: 'agriculture' },
    { id: 'RM-15', name: 'Renewable & Green Jobs', desc: 'Rooftop solar, microgrid inverter balance', color: '#84cc16', icon: 'solar_power' },
    { id: 'RM-16', name: 'Digital & Local Tech', desc: 'Broadband routers, hardware repair, IoT', color: '#0ea5e9', icon: 'router' },
    { id: 'RM-17', name: 'Safety & Security', desc: 'CCTV installation, physical access control', color: '#ef4444', icon: 'shield' },
    { id: 'RM-18', name: 'General Local Services', desc: 'Multi-trade diagnostics, quick emergency response', color: '#64748b', icon: 'handyman' }
  ];

  const implementationMatrix = [
    {
      category: 'REAL IMPLEMENTED FEATURES',
      color: 'text-secondary border-secondary/40 bg-secondary/10',
      items: [
        'Cryptographic SHA-256 Tamper-Evident Hash Chain Ledger (LedgerService.js)',
        'Full Express REST Backend with RBAC (Customer, Worker, Coop, Govt)',
        'PostgreSQL / Prisma Canonical Domain Schema (40+ models)',
        'Strict Qualification Safety Gating (Removes unqualified before dispatch)',
        'Opportunity Equity Index with Gini Coefficient Calculation (G = 0.24)',
        '7-Factor Trust Composite Score Engine (TrustEngine.js)',
        'Circadian Fatigue & Rest Shield Guard (WellbeingEngine.js)',
        'Interactive 18-Room Three.js Spatial Topology with Touch Support',
        'Procedural Web Audio API Sound Engine (zero external audio files)',
        'Rural Offline Outbox Queue & Network Auto-Sync (offlineSync.js)',
        'Pan-India Multilingual Localization Engine (EN, HI, TA, TE, BN, MR)',
        'Assisted Low-Digital-Literacy Worker Onboarding Flow'
      ]
    },
    {
      category: 'DEMO / SIMULATED AI CAPABILITIES',
      color: 'text-primary border-primary/40 bg-primary/10',
      items: [
        'Multi-Modal Optical Fault Detection (Photo tag entity extraction)',
        'Indian Natural Language Intent Extraction (Spoken Tamil & Hindi)',
        'Digital Twin 3-Month Monsoon Scenario Stress Test',
        'AI What-If Democratic Proposal Simulator (AI explains, workers vote)',
        'Live GPS Worker Radar Tracking & Real-Time ETA Countdown',
        'Parametric Climate Sensor Triggers (Rainfall > 80mm, Heat > 42°C)'
      ]
    },
    {
      category: 'CONCEPTUAL FUTURE INTEGRATIONS',
      color: 'text-tertiary border-tertiary/40 bg-tertiary/10',
      items: [
        'Federated Learning on Edge (Local gradient aggregation without centralizing raw customer photos)',
        'State-Level RBI / ONDC Decentralized Instant Settlement Rail',
        'Hardware IoT Acoustic Pipeline Leak Sonar Sensors',
        'Municipal Water Board Automated Parametric Smart Contracts'
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in-up">
      <div className="w-full max-w-5xl max-h-[90vh] glass-card rounded-3xl border border-white/20 shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-2xl">hub</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-sans text-white">UNIVO Mission Control &amp; Architecture</h2>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30 uppercase">
                  National Hackathon Spec
                </span>
              </div>
              <p className="text-xs font-mono text-on-surface-variant">One Platform for India's Distributed Workforce</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-white/10 bg-white/[0.01] font-mono text-xs overflow-x-auto">
          {[
            { id: 'story', label: '1. The 9-Actor Product Story', icon: 'auto_stories' },
            { id: 'services', label: '2. All 18 Service Families', icon: 'grid_view' },
            { id: 'matrix', label: '3. Technical Transparency Matrix', icon: 'verified' },
            { id: 'checklist', label: '4. 32-Point System Audit', icon: 'fact_check' },
            { id: 'demo', label: '5. Demo Credentials', icon: 'key' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundEngine.playClick();
                setActiveSubTab(tab.id);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-all whitespace-nowrap ${
                activeSubTab === tab.id
                  ? 'bg-white/10 text-white font-bold border-t-2 border-primary'
                  : 'text-on-surface-variant hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-base">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 font-mono text-xs">
          {/* TAB 5: DEMO CREDENTIALS */}
          {activeSubTab === 'demo' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-secondary/10 border border-secondary/30 text-white leading-relaxed">
                <strong>HACKATHON JUDGE DEMO ACCOUNTS:</strong> Use the credentials below to log into the respective portals.
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <h3 className="font-bold text-primary mb-2 text-sm">Customer Portal</h3>
                  <p><strong>Phone:</strong> +91 98765 43210</p>
                  <p><strong>OTP:</strong> 5991</p>
                  <p className="text-on-surface-variant mt-2 text-[10px]">Route: /customer/auth</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <h3 className="font-bold text-secondary mb-2 text-sm">Worker Portal</h3>
                  <p><strong>Phone:</strong> +91 98401 23456</p>
                  <p><strong>OTP:</strong> 5991</p>
                  <p className="text-on-surface-variant mt-2 text-[10px]">Route: /worker/register</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <h3 className="font-bold text-blue-400 mb-2 text-sm">Cooperative Portal</h3>
                  <p><strong>Email:</strong> manager@univo.coop</p>
                  <p><strong>Password:</strong> password123</p>
                  <p className="text-on-surface-variant mt-2 text-[10px]">Route: /governance</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <h3 className="font-bold text-purple-400 mb-2 text-sm">Government Portal</h3>
                  <p><strong>Email:</strong> admin@tn-labour.gov.in</p>
                  <p><strong>Password:</strong> password123</p>
                  <p className="text-on-surface-variant mt-2 text-[10px]">Route: /government</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: 9-ACTOR STORY */}
          {activeSubTab === 'story' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/30 text-white leading-relaxed">
                <strong>THE CORE INVARIANT:</strong> UNIVO is not a delivery app. It is an equitable cooperative operating system where each completed mission elevates worker skills, restores opportunity balance, and funds collective welfare.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {narrativeStory.map((item, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between gap-2 hover:border-white/20 transition-all">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-lg" style={{ color: item.color }}>{item.icon}</span>
                        <span className="font-bold text-xs uppercase" style={{ color: item.color }}>{item.actor}</span>
                      </div>
                      <h4 className="font-sans font-bold text-sm text-white">{item.quote}</h4>
                    </div>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: 18 CANONICAL SERVICE FAMILIES */}
          {activeSubTab === 'services' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-on-surface-variant text-xs">
                <span>All 18 national infrastructure sectors integrated into spatial rooms:</span>
                <span className="text-secondary font-bold">18 of 18 Active</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {canonicalServices.map((svc) => (
                  <div key={svc.id} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center flex flex-col items-center gap-2 hover:border-primary transition-all">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${svc.color}25`, color: svc.color }}>
                      <span className="material-symbols-outlined text-xl">{svc.icon}</span>
                    </div>
                    <span className="text-[10px] text-on-surface-variant font-bold">{svc.id}</span>
                    <h5 className="font-sans font-bold text-xs text-white leading-tight">{svc.name}</h5>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TRANSPARENCY MATRIX */}
          {activeSubTab === 'matrix' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-on-surface-variant leading-relaxed">
                <strong>HACKATHON INTEGRITY GUARANTEE:</strong> We strictly distinguish between what is actively running in software vs. simulated models vs. conceptual future state architecture.
              </div>

              <div className="space-y-4">
                {implementationMatrix.map((group, idx) => (
                  <div key={idx} className={`p-4 rounded-2xl border ${group.color}`}>
                    <h4 className="font-bold text-sm mb-2">{group.category}</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                      {group.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-sm mt-0.5">check_circle</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: 32-POINT CHECKLIST */}
          {activeSubTab === 'checklist' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
              {[
                '1. Verified Worker Passport — Passports with sovereign DID & QR',
                '2. Skill DNA — Multi-dimensional proficiency radar (0-100%)',
                '3. Trust Graph/Profile — 7-factor composite trust scoring',
                '4. AI Photo Diagnosis — Visual optical fault entity extraction',
                '5. Multilingual Voice Request — Spoken Tamil, Hindi & English input',
                '6. Natural Language Understanding — Semantic token extraction',
                '7. AI Skill-to-Job Matching — Gated 6-gate qualification pipeline',
                '8. Fair Dispatch — Mathematically explainable suitability scoring',
                '9. Explainable Dispatch — Auditable reason logs for every match',
                '10. Opportunity Equity — Rolling Gini coefficient tracking (G = 0.24)',
                '11. Wellbeing/Burnout Guard — Max 9.5-hour duty fatigue cutoff',
                '12. Fair Rest Protection — Rest recommendation alerts',
                '13. Smart Job Bundling — Geographic 800m commute cluster bundling',
                '14. Live Worker Tracking — Real-time simulated GPS radar',
                '15. Remote Expert Assist — Live dialer to Guild Mentor Karthik',
                '16. Transparent Cooperative Ledger — 6-way visible revenue split',
                '17. Tamper-Evident Ledger — SHA-256 hash-chain verified from Genesis',
                '18. Structured Feedback — 5-dimension workmanship rating',
                '19. One Job → Multiple Engines — Closes feedback loop in real time',
                '20. Demand Forecasting — Chamber velocity heatmap predictions',
                '21. Demand Spread Mapping — Sectoral load balance visualization',
                '22. Workforce Digital Twin — 3-month monsoon macro-simulation',
                '23. AI Governance What-If — Trade-off simulation for ₹2,00,000 surplus',
                '24. Democratic Worker Voting — Sovereign DID cryptographic ballot',
                '25. Mutual Aid/Welfare — 4-stage transparent assistance workflow',
                '26. Climate/Parametric Protection — Sensor-triggered relief payout',
                '27. Crisis Mode — Red alert emergency taskforce posture',
                '28. Skill-based Emergency Teams — 5 specialized disaster response units',
                '29. National Government Dashboard — Real-time state compliance metrics',
                '30. Privacy-Preserving View — Statistical aggregates without leaking PII',
                '31. Rural Offline-First Sync — Local outbox queue with auto-reconnect',
                '32. Federated Learning Concept — Local edge gradient aggregation model'
              ].map((point, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-base">task_alt</span>
                  <span className="text-white">{point}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 flex justify-between items-center bg-white/[0.02] font-mono text-xs">
          <span className="text-on-surface-variant">Press ESC or click close to return to the interactive experience</span>
          <div className="flex gap-2">
            <Link
              to="/engine"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 font-bold"
            >
              Open AI Sandbox
            </Link>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
