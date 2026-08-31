import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomer } from '../customer/CustomerContext';
import { useWorker } from '../worker/WorkerContext';
import { useSocial } from '../social/SocialContext';

export default function StoryTourController() {
  const navigate = useNavigate();
  const customer = useCustomer();
  const worker = useWorker();
  const social = useSocial();

  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [activeEdgeState, setActiveEdgeState] = useState('NORMAL');
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // 49 STORY STEPS
  const storySteps = [
    // CUSTOMER JOURNEY (1 - 18)
    { num: 1, title: 'Customer Opens UNIVO', path: '/customer', actor: 'CUSTOMER', desc: 'Customer launches UNIVO Progressive Web Interface with multilingual support.' },
    { num: 2, title: 'Enters Immersive Environment', path: '/customer', actor: 'CUSTOMER', desc: 'Obsidian glassmorphic HUD with real-time operational status.' },
    { num: 3, title: 'Chooses Service Room', path: '/customer', actor: 'CUSTOMER', desc: 'Explores 18 specialized service room nodes.' },
    { num: 4, title: 'Creates Request (Photo/Voice/Text)', path: '/customer/request', actor: 'CUSTOMER', desc: 'Inputs optical photo, spoken Tamil/Hindi, or text narrative.' },
    { num: 5, title: 'AI Understands Request', path: '/customer/request', actor: 'AI', desc: 'Preliminary multi-modal classification (MCB Thermal Arcing).' },
    { num: 6, title: 'Structured Job Created', path: '/customer/select-worker', actor: 'AI', desc: 'Ticket generated with Chamber RM-01, urgency, and duration.' },
    { num: 7, title: 'Qualified Workers Discovered', path: '/customer/select-worker', actor: 'QUALIFICATION', desc: 'Strict safety gates filter out unqualified or fatigued candidates.' },
    { num: 8, title: 'Fair Dispatch Ranks Candidates', path: '/engine', actor: 'DISPATCH', desc: 'Mathematical Base Score + Historical Fairness Adjustment.' },
    { num: 9, title: 'Customer Sees Matched Worker', path: '/customer/select-worker', actor: 'CUSTOMER', desc: 'Priya Narayanan presented with verified Skill DNA and explainable rationale.' },
    { num: 10, title: 'Booking Confirmed', path: '/customer/select-worker', actor: 'CUSTOMER', desc: 'Job assigned and escrow hold created.' },
    { num: 11, title: 'Worker Tracked in Real Time', path: '/customer/tracking/UNV-JOB-8901', actor: 'CUSTOMER', desc: 'Radar simulation with live ETA countdown and direct communication.' },
    { num: 12, title: 'Worker Arrives on Site', path: '/customer/tracking/UNV-JOB-8901', actor: 'WORKER', desc: 'Technician checks in with zero-accident safety gear.' },
    { num: 13, title: 'Worker Makes Final Diagnosis', path: '/worker/execute/UNV-JOB-8901', actor: 'WORKER', desc: 'Physical confirmation of MCB overload and phase desync.' },
    { num: 14, title: 'Complex Support Available', path: '/worker/execute/UNV-JOB-8901', actor: 'WORKER', desc: 'Direct dialer to Guild Mentor Karthik S. and schematic library.' },
    { num: 15, title: 'Job Completed', path: '/worker/execute/UNV-JOB-8901', actor: 'WORKER', desc: 'Mission signed off with photo proof and checklist clearance.' },
    { num: 16, title: 'Customer Settles Payment', path: '/customer/settlement/UNV-JOB-8901', actor: 'CUSTOMER', desc: 'Transparent invoice of ₹1,400 with 6-way split preview.' },
    { num: 17, title: 'Transparent Ledger Updates', path: '/worker/earnings', actor: 'LEDGER', desc: 'Cryptographic SHA-256 hash-chain block appended.' },
    { num: 18, title: 'Customer Gives Structured Feedback', path: '/customer/settlement/UNV-JOB-8901', actor: 'CUSTOMER', desc: '5-dimension rating (workmanship, safety, punctuality).' },

    // WORKER EVOLUTION (19 - 24)
    { num: 19, title: 'Skill DNA Updates', path: '/worker/skills', actor: 'WORKER', desc: 'Workmanship 5★ yields +1.5% proficiency to Switchboard DNA.' },
    { num: 20, title: 'Trust Profile Recalibrates', path: '/worker/skills', actor: 'WORKER', desc: 'Composite trust updates across 7 dimensions (98.6% -> 99.1%).' },
    { num: 21, title: 'Fairness History Updates', path: '/worker', actor: 'DISPATCH', desc: '14-day mission allocation counter increments from 3 to 4.' },
    { num: 22, title: 'Wellbeing Engine Updates', path: '/worker/wellbeing', actor: 'WELLBEING', desc: 'Shift hours updated to 3.9h today; circadian state remains Healthy.' },
    { num: 23, title: 'Earnings Ledger Updates', path: '/worker/earnings', actor: 'WORKER', desc: '₹1,148 credited via instant UPI 2.0; lifetime earnings updated.' },
    { num: 24, title: 'Career & Training Recommendations Update', path: '/worker/career', actor: 'WORKER', desc: 'AI pathway unlocks Advanced Solar Specialist accreditation.' },

    // COOPERATIVE GOVERNANCE & DIGITAL TWIN (25 - 34)
    { num: 25, title: 'Job Data Enters Analytics', path: '/dashboard', actor: 'COOPERATIVE', desc: 'Central cooperative telemetry integrates completed mission metrics.' },
    { num: 26, title: 'Demand Model Updates', path: '/rooms', actor: 'COOPERATIVE', desc: 'Room RM-01 velocity and sector heatmaps update.' },
    { num: 27, title: 'Fairness Metrics Recalculate', path: '/engine', actor: 'COOPERATIVE', desc: 'Gini coefficient maintains healthy equity (G = 0.24).' },
    { num: 28, title: 'Wellbeing Metrics Aggregate', path: '/worker/wellbeing', actor: 'COOPERATIVE', desc: 'Cooperative-wide fatigue monitoring shows zero critical alerts.' },
    { num: 29, title: 'Workforce Capacity Updates', path: '/workers', actor: 'COOPERATIVE', desc: 'Real-time talent radar displays available vs in-mission artisans.' },
    { num: 30, title: 'Financial Metrics & Treasury Update', path: '/worker/earnings', actor: 'COOPERATIVE', desc: 'Welfare pool grows to ₹4,82,000; training pool to ₹2,60,000.' },
    { num: 31, title: 'Digital Twin Simulates Future', path: '/dashboard', actor: 'COOPERATIVE', desc: 'Simulates 3-month monsoon stress test and equipment loans.' },
    { num: 32, title: 'Surplus Proposal Created', path: '/governance', actor: 'GOVERNANCE', desc: 'Proposal to allocate ₹2,00,000 Q3 cooperative surplus.' },
    { num: 33, title: 'Workers Simulate AI What-If', path: '/governance', actor: 'GOVERNANCE', desc: 'AI explains trade-offs across Options A, B, and C.' },
    { num: 34, title: 'Workers Vote with Sovereign DID', path: '/governance', actor: 'GOVERNANCE', desc: 'Cryptographic ballot signed with private key (Quorum 78.4% met).' },

    // MUTUAL AID WELFARE (35 - 37)
    { num: 35, title: 'Welfare Request Created', path: '/welfare', actor: 'WELFARE', desc: 'Worker applies for monsoon income disruption support.' },
    { num: 36, title: 'Automated Rule & Peer Review', path: '/welfare', actor: 'WELFARE', desc: 'Sensor rainfall > 80mm verified; committee audits tenure.' },
    { num: 37, title: 'Support Decision Recorded', path: '/welfare', actor: 'WELFARE', desc: 'Disbursement of ₹3,500 approved via instant cooperative escrow.' },

    // CRISIS OPERATIONS (38 - 42)
    { num: 38, title: 'Crisis Multi-Signal Detection', path: '/crisis', actor: 'CRISIS', desc: 'Emergency requests spike +340%; red alert cyclone active.' },
    { num: 39, title: 'System Enters Crisis Mode', path: '/crisis', actor: 'CRISIS', desc: 'Posture switches from individual dispatch to emergency taskforce.' },
    { num: 40, title: '5 Skill-Based Strike Teams Mobilize', path: '/crisis', actor: 'CRISIS', desc: 'High-voltage, hydro barriers, structural shoring, care, logistics.' },
    { num: 41, title: 'Live Strike Team Deployment', path: '/crisis', actor: 'CRISIS', desc: '148 artisans deploy; 620 families reached; 84 hazards secured.' },
    { num: 42, title: 'Post-Crisis Comprehensive Audit', path: '/crisis', actor: 'CRISIS', desc: 'Event audit report certified with 100% cost reimbursement.' },

    // GOVERNMENT REGULATORY OVERSIGHT (43 - 49)
    { num: 43, title: 'Aggregated Metrics Update', path: '/government', actor: 'GOVERNMENT', desc: 'State Labor Board dashboard receives real-time telemetry.' },
    { num: 44, title: 'Cooperative Health Verified', path: '/government', actor: 'GOVERNMENT', desc: 'Financial solvency ratio 2.42x with clean audit opinion.' },
    { num: 45, title: 'Living Wage Compliance Confirmed', path: '/government', actor: 'GOVERNMENT', desc: '99.4% living wage compliance (1.74x statutory minimum).' },
    { num: 46, title: 'Skills & Training Progression Tracked', path: '/government', actor: 'GOVERNMENT', desc: '45 master artisans certified; 18 apprentices shadowed.' },
    { num: 47, title: 'Welfare Impact Evaluated', path: '/government', actor: 'GOVERNMENT', desc: '₹1,84,500 cashless medical support disbursed with zero bureaucracy.' },
    { num: 48, title: 'Disaster Mitigation Validated', path: '/government', actor: 'GOVERNMENT', desc: '84 electrical hazards averted; drinking water restored.' },
    { num: 49, title: 'Regional Service Coverage Audited', path: '/government', actor: 'GOVERNMENT', desc: 'Complete equity verification across Sectors 1 through 6.' }
  ];

  const currentStoryItem = storySteps[currentStep - 1] || storySteps[0];

  const handleStepJump = (stepNum) => {
    setCurrentStep(stepNum);
    const item = storySteps[stepNum - 1];
    if (item) navigate(item.path);
  };

  const handleNext = () => {
    if (currentStep < 49) {
      handleStepJump(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      handleStepJump(currentStep - 1);
    }
  };

  const handleEdgeStateToggle = (stateKey) => {
    setActiveEdgeState(stateKey);
    if (customer.setEdgeState) {
      customer.setEdgeState(stateKey);
    }
  };

  return (
    <>
      {/* Floating HUD Pill to Open Story Tour */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="glass-hud px-4 py-2.5 rounded-full border border-primary/40 shadow-2xl flex items-center gap-2.5 text-xs font-mono text-white hover:scale-105 transition-all glow-active"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
          <span className="font-bold">E2E Story Tour: Step {currentStep}/49</span>
          <span className="material-symbols-outlined text-sm">{isOpen ? 'keyboard_arrow_down' : 'route'}</span>
        </button>
      </div>

      {/* Expanded Story Tour & Edge-State Harness Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 md:right-8 z-50 w-[94vw] max-w-2xl glass-card rounded-3xl p-6 border border-primary/50 shadow-2xl space-y-4 font-mono text-xs animate-fade-in-up backdrop-blur-2xl">
          {/* Header */}
          <div className="flex justify-between items-start pb-2 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30 font-bold text-[10px]">
                  STEP {currentStoryItem.num} OF 49 • {currentStoryItem.actor}
                </span>
                <span className="text-[10px] text-on-surface-variant">Continuous Unified Data Layer</span>
              </div>
              <h3 className="font-sans font-bold text-lg text-white mt-1">{currentStoryItem.title}</h3>
              <p className="text-[11px] text-on-surface-variant leading-relaxed mt-0.5">
                {currentStoryItem.desc}
              </p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-on-surface-variant hover:text-white">
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span>Previous</span>
            </button>

            {/* Quick Stage Selectors */}
            <div className="flex gap-1 overflow-x-auto scrollbar-none text-[10px]">
              {[
                { label: 'Customer (1-18)', step: 1 },
                { label: 'Worker (19-24)', step: 19 },
                { label: 'Cooperative (25-34)', step: 25 },
                { label: 'Welfare (35-37)', step: 35 },
                { label: 'Crisis (38-42)', step: 38 },
                { label: 'Government (43-49)', step: 43 }
              ].map((stage) => (
                <button
                  key={stage.step}
                  onClick={() => handleStepJump(stage.step)}
                  className={`px-2 py-1 rounded-lg border whitespace-nowrap ${
                    currentStep >= stage.step && currentStep < stage.step + 10
                      ? 'bg-primary/20 border-primary text-primary font-bold'
                      : 'bg-white/5 border-white/10 text-on-surface-variant hover:text-white'
                  }`}
                >
                  {stage.label}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentStep === 49}
              className="px-4 py-1.5 rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-bold disabled:opacity-30 flex items-center gap-1"
            >
              <span>Next</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          {/* EDGE STATE TESTING HARNESS */}
          <div className="pt-3 border-t border-white/10 space-y-2">
            <div className="flex justify-between items-center text-[10px]">
              <span className="uppercase font-bold text-on-surface-variant">Edge State Test Simulator:</span>
              <span className="text-secondary font-bold">Active: {activeEdgeState}</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 text-[10px]">
              {[
                { id: 'NORMAL', label: 'Normal' },
                { id: 'LOADING', label: 'Loading' },
                { id: 'ERROR', label: 'Error' },
                { id: 'UNAUTHORIZED', label: 'Unauthorized' },
                { id: 'EMPTY', label: 'Empty State' },
                { id: 'INVALID_REQ', label: 'Invalid Req' },
                { id: 'WORKER_UNAVAIL', label: 'Worker Unavail' },
                { id: 'PAYMENT_FAIL', label: 'Payment Fail' },
                { id: 'AI_UNCERTAIN', label: 'AI Uncertain' },
                { id: 'CRISIS_ACTIVE', label: 'Crisis Mode' }
              ].map((edge) => (
                <button
                  key={edge.id}
                  onClick={() => handleEdgeStateToggle(edge.id)}
                  className={`p-1.5 rounded-lg border text-center transition-all ${
                    activeEdgeState === edge.id
                      ? 'bg-secondary/20 border-secondary text-secondary font-bold'
                      : 'bg-white/5 border-white/10 text-on-surface-variant hover:bg-white/10'
                  }`}
                >
                  {edge.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
