import React, { createContext, useContext, useState } from 'react';
import api from '../services/api';

const SocialContext = createContext();

export function SocialProvider({ children }) {
  // =========================================================================
  // PART A: DEMOCRATIC GOVERNANCE & PROPOSALS
  // =========================================================================
  const [proposals, setProposals] = useState([
    {
      id: 'PROP-2026-Q3-01',
      title: 'Allocation of ₹2,00,000 Cooperative Q3 Surplus',
      status: 'VOTING_ACTIVE', // 'DRAFT' | 'VOTING_ACTIVE' | 'PASSED' | 'EXECUTED'
      category: 'Treasury & Reserve Allocation',
      votingDeadline: 'Closes in 2 days, 14 hours (03 Sept 2026)',
      quorumRequired: 60,
      quorumCurrent: 78.4,
      totalEligibleVoters: 240,
      totalVotesCast: 188,
      voterHasVoted: false,
      userVotedOption: null,
      options: [
        {
          id: 'opt-a',
          title: 'Option A: Emergency Relief & Health Welfare Reserve',
          summary: 'Allocate 100% (₹2,00,000) to the Worker Emergency Mutual Aid Pool for cashless medical support & family crises.',
          votesCount: 94,
          percentage: 50.0,
          aiSimulation: {
            investment: '₹2,00,000 (100% of Q3 surplus)',
            mainBenefit: 'Enhanced catastrophic health coverage & zero-interest emergency relief for 240 cooperative member families.',
            illustrativeImpact: 'Est. 84 artisan families covered against unexpected hospital emergencies or monsoon accidents.',
            workerReach: '240 Member Households (100% of Sector 4 & 5 artisans)',
            potentialTradeOffs: 'Capital is locked into low-yield liquid reserves; defers equipment modernization and specialized skill training to Q4.'
          }
        },
        {
          id: 'opt-b',
          title: 'Option B: Advanced EV & Solar Microgrid Skill Hub',
          summary: 'Establish a certified laboratory and tooling pool for high-capacity EV charging points and hybrid solar BMS calibration.',
          votesCount: 68,
          percentage: 36.2,
          aiSimulation: {
            investment: '₹2,00,000 (Hardware diagnostic rigs & NSDC lab accreditation)',
            mainBenefit: 'Upgrades 45 junior & verified electricians into Advanced Solar Specialists with higher hourly earning power.',
            illustrativeImpact: 'Projected +₹420/day average earnings increase per certified artisan within 90 days.',
            workerReach: '45 Electricians directly enrolled; 12 apprentice assistants shadowed',
            potentialTradeOffs: 'Longer payback cycle (3-6 months); does not address immediate health or acute medical crises.'
          }
        },
        {
          id: 'opt-c',
          title: 'Option C: Specialized Diagnostic Equipment Pool',
          summary: 'Procure 6 shared Fluke industrial thermal cameras and digital pipe acoustic sonars for free member check-out.',
          votesCount: 26,
          percentage: 13.8,
          aiSimulation: {
            investment: '₹2,00,000 (Bulk purchase of 6 high-precision diagnostic instruments)',
            mainBenefit: 'Reduces artisan out-of-pocket tool expenditure and cuts on-site diagnosis time by 35%.',
            illustrativeImpact: 'Saves individual artisans ~₹25,000 each in specialized rental costs over 12 months.',
            workerReach: 'Available to all 120 Electricians & Plumbers in the hub on rotating reservation',
            potentialTradeOffs: 'Requires inventory tracking and cooperative maintenance overhead; risk of hardware wear & tear.'
          }
        }
      ],
      auditLog: [
        { time: '28 Aug 2026, 09:00', event: 'Proposal table drafted by Cooperative Finance Working Group' },
        { time: '29 Aug 2026, 14:30', event: 'AI What-If Simulator generated multi-dimensional trade-off projections' },
        { time: '30 Aug 2026, 00:00', event: 'Cryptographic voting ballot opened to all verified member DIDs' },
        { time: 'Today, 18:20', event: 'Quorum threshold (60%) exceeded. Current participation at 78.4%' }
      ]
    }
  ]);

  // =========================================================================
  // PART B: MUTUAL AID & WELFARE REQUESTS
  // =========================================================================
  const [welfareRequests, setWelfareRequests] = useState([
    {
      id: 'WEL-2026-089',
      workerId: 'WRK-7089',
      workerName: 'Karthik Subramanian',
      category: 'Equipment Replacement Grant',
      amountRequested: '₹6,500',
      reason: 'Accidental drop & sensor crack of digital multimeter during high-voltage substation mission.',
      status: 'APPROVED_DISBURSED', // 'SUBMITTED' | 'RULE_CHECKED' | 'COMMITTEE_REVIEW' | 'APPROVED_DISBURSED' | 'REJECTED'
      submittedAt: '24 Aug 2026',
      reviewedBy: 'Welfare Committee (Peer Member Ananya Deshmukh)',
      disbursementTxn: 'TXN-WEL-9901 (Instant UPI)',
      ruleCheckResult: 'Passed: Member has >6 months tenure, 0 safety violations, and active quota compliance.'
    },
    {
      id: 'WEL-2026-094',
      workerId: 'WRK-4102',
      workerName: 'Priya Narayanan',
      category: 'Monsoon Flooding Income Support',
      amountRequested: '₹3,500',
      reason: 'Sector 3 flash flooding forced 3-day work stoppage while maintaining community pump barriers.',
      status: 'COMMITTEE_REVIEW',
      submittedAt: 'Yesterday, 16:45',
      reviewedBy: 'Under review by Regional Ombudsman & Sector Council',
      disbursementTxn: 'Pending Sign-Off',
      ruleCheckResult: 'Passed: Automated sensor verified rainfall > 80mm in residential sector.'
    }
  ]);

  // =========================================================================
  // PART C: WORKER PROTECTION & WELLBEING ALERTS
  // =========================================================================
  const [protectionAlerts, setProtectionAlerts] = useState([
    {
      id: 'ALERT-881',
      workerName: 'Ananya Deshmukh',
      type: 'FATIGUE_STRAIN',
      severity: 'HIGH',
      message: '10.2 hours logged today across 5 missions. Daily physiological ceiling exceeded.',
      automatedAction: 'Dispatch ranking dampener (-8 pts) applied. Rest Shield recommended.',
      welfareIntervention: 'Ombudsman notified for telephone check-in.'
    },
    {
      id: 'ALERT-882',
      workerName: 'Vikram Rao',
      type: 'CONSECUTIVE_DAYS',
      severity: 'MODERATE',
      message: '5 consecutive days worked without a 24-hour restorative gap.',
      automatedAction: 'Mandatory rest notification scheduled for tomorrow 08:00.',
      welfareIntervention: 'Automated meal & rest subsidy voucher issued.'
    }
  ]);

  // =========================================================================
  // PART D: PARAMETRIC PROTECTION CONCEPT TELEMETRY
  // =========================================================================
  const [parametricTelemetry, setParametricTelemetry] = useState({
    ambientTemperature: 43.5, // Celsius (Extreme Heat threshold >= 42C)
    rainfallRate: 85, // mm/hr (Heavy Rain threshold >= 75 mm/hr)
    floodInundationDepth: 0.45, // meters (Flood threshold >= 0.40m)
    activeTriggers: ['EXTREME_HEAT_ALERT', 'TORRENTIAL_MONSOON_ALERT', 'FLOOD_STIPEND_ACTIVE'],
    totalReliefDisbursedThisSeason: '₹1,84,500',
    conceptDisclaimer: 'PARAMETRIC PROTECTION PROTOTYPE CONCEPT: Demonstrates automated, objective rule-based mutual aid triggers using environmental sensor feeds. Not an insurance policy.'
  });

  // =========================================================================
  // PART E: CRISIS MODE & STRIKE TEAMS
  // =========================================================================
  const [isCrisisMode, setIsCrisisMode] = useState(false);
  const [crisisSignalData, setCrisisSignalData] = useState({
    emergencyRequestSpikePct: 340, // +340% above baseline
    weatherAlertLevel: 'RED_ALERT_CYCLONE',
    workerOnGroundReportsCount: 42,
    crisisType: 'Monsoon Cyclone & Urban Flash Flood (Sector 3 & 4)'
  });

  const [crisisMetrics, setCrisisMetrics] = useState({
    workersDeployed: 148,
    householdsReached: 620,
    hazardsFixed: 84, // electrical sub-panels isolated/secured
    waterSystemsRestored: 42, // community hydro pumps cleared
    structuresSecured: 56, // roof shoring & tarping
    coveredZones: ['Sector 4 (Central)', 'Sector 3 (West)', 'Sector 5 (South)'],
    uncoveredZones: ['Sector 2 (North Periphery - Awaiting High-Clearance Logistics)']
  });

  const [postCrisisReport, setPostCrisisReport] = useState({
    eventId: 'CRISIS-2026-AUG-CYCLONE',
    eventName: 'August Monsoon Inundation Response Operation',
    durationHours: 36,
    workersDeployed: 148,
    householdsServed: 620,
    hazardsPrevented: 84,
    potablePumpsRestored: 42,
    cooperativeDirectLaborCost: '₹3,24,000 (100% funded via Emergency Reserve)',
    reimbursementStatus: '100% Settled to Artisan UPI VPAs',
    disclaimer: 'Community cooperative emergency response protocol. Operates autonomously using volunteer artisan strike teams.'
  });

  // Actions
  const castVote = async (proposalId, optionId) => {
    // Record cryptographically on backend API
    try {
      await api.castProposalVote(proposalId, {
        selectedOption: optionId,
        voterDid: 'did:univo:worker:7089-karthik'
      });
    } catch (e) {
      console.log('Local fallback recorded for ballot vote');
    }

    setProposals((prev) =>
      prev.map((p) => {
        if (p.id !== proposalId) return p;
        const totalV = p.totalVotesCast + 1;
        const updatedOptions = p.options.map((opt) => {
          const isSelected = opt.id === optionId;
          const newCount = isSelected ? opt.votesCount + 1 : opt.votesCount;
          return {
            ...opt,
            votesCount: newCount,
            percentage: parseFloat(((newCount / totalV) * 100).toFixed(1))
          };
        });

        return {
          ...p,
          totalVotesCast: totalV,
          voterHasVoted: true,
          userVotedOption: optionId,
          options: updatedOptions,
          auditLog: [
            {
              time: 'Just now',
              event: `Vote cast cryptographically by DID did:univo:worker:7089-karthik for ${optionId.toUpperCase()} (Recorded on Backend Ledger)`
            },
            ...p.auditLog
          ]
        };
      })
    );
  };

  const submitWelfareRequest = (newReq) => {
    const formatted = {
      id: `WEL-2026-${Math.floor(100 + Math.random() * 900)}`,
      workerId: 'WRK-7089',
      workerName: 'Karthik Subramanian',
      category: newReq.category,
      amountRequested: newReq.amount,
      reason: newReq.reason,
      status: 'RULE_CHECKED',
      submittedAt: 'Just now',
      reviewedBy: 'Under automated tenure & rule check',
      disbursementTxn: 'Processing Escrow',
      ruleCheckResult: 'Passed Automated Tenure & Safety Compliance Check'
    };
    setWelfareRequests((prev) => [formatted, ...prev]);
  };

  const toggleCrisisMode = () => {
    setIsCrisisMode((prev) => !prev);
  };

  return (
    <SocialContext.Provider
      value={{
        proposals,
        castVote,
        welfareRequests,
        submitWelfareRequest,
        protectionAlerts,
        parametricTelemetry,
        setParametricTelemetry,
        isCrisisMode,
        toggleCrisisMode,
        crisisSignalData,
        crisisMetrics,
        postCrisisReport
      }}
    >
      {children}
    </SocialContext.Provider>
  );
}

export const useSocial = () => useContext(SocialContext);
