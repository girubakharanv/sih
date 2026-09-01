import React, { createContext, useContext, useState } from 'react';

const WorkerContext = createContext();

export function WorkerProvider({ children }) {
  // Master Worker Profile
  const [worker, setWorker] = useState({
    id: 'WRK-7089',
    did: 'did:univo:worker:7089-karthik',
    name: 'Karthik Subramanian',
    role: 'Senior Master Electrician & Solar Inverter Specialist',
    phone: '+91 98401 23456',
    email: 'karthik.subramanian@coop.univo.network',
    location: 'Sector 4, Chennai Central, Tamil Nadu',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    experienceYears: 8,
    completedJobs: 1420,
    zeroSafetyIncidentsHours: 4860,
    languages: ['Tamil (Native)', 'English (Professional)', 'Hindi (Conversational)'],
    tier: 'Advanced Specialist', // 'Beginner' | 'Verified Artisan' | 'Advanced Specialist' | 'Guild Mentor'
    guildStanding: 'Guild Council Member (Quorum Voting: 98%)',
    bankUpi: 'karthik@okhdfcbank',
    emergencyContact: {
      name: 'Vasanthi Subramanian',
      relation: 'Spouse',
      phone: '+91 98401 98711'
    },
    // Availability Settings
    isDutyActive: true,
    maxDailyWorkload: 4, // max jobs per day
    serviceRadiusKm: 8,
    activeTimeSlot: 'Morning & Afternoon (08:00 - 18:00)',
    // Wellbeing Metrics
    wellbeing: {
      score: 92, // 0 - 100
      status: 'Optimal Flow',
      hoursToday: 5.5,
      hoursWeek: 34,
      consecutiveDays: 4,
      lateNightTrips: 1,
      restRecommended: false,
      restShieldActive: false
    },
    isAuthenticated: false
  });

  // Dynamic Skill DNA & Verification Pipeline Status
  // status: 'VERIFIED_MASTER' | 'PEER_ENDORSED' | 'EVIDENCE_ATTACHED' | 'SELF_DECLARED'
  const [skillDNA, setSkillDNA] = useState([
    {
      id: 'skill-1',
      name: 'Electrical Grid & High Voltage',
      proficiency: 94,
      status: 'VERIFIED_MASTER',
      verificationDate: '12 Jan 2026',
      verifier: 'National Guild Standards Council #NGS-441',
      endorsementsCount: 14,
      evidenceDoc: 'ITI_Electrical_Diploma_GradeA.pdf'
    },
    {
      id: 'skill-2',
      name: 'Structural Wiring & Cable Trays',
      proficiency: 92,
      status: 'VERIFIED_MASTER',
      verificationDate: '18 Mar 2026',
      verifier: 'TN Industrial Electrical Board',
      endorsementsCount: 11,
      evidenceDoc: 'Structural_Wiring_Cert_2025.pdf'
    },
    {
      id: 'skill-3',
      name: 'Switchboard & MCB Isolator Sizing',
      proficiency: 95,
      status: 'VERIFIED_MASTER',
      verificationDate: '04 Feb 2026',
      verifier: 'Schneider Electric Certified Partner',
      endorsementsCount: 19,
      evidenceDoc: 'Master_Panel_Cert.pdf'
    },
    {
      id: 'skill-4',
      name: 'Fan & Industrial Motor Rewinding',
      proficiency: 91,
      status: 'PEER_ENDORSED',
      verificationDate: '22 May 2026',
      verifier: 'Endorsed by 4 Guild Mentors',
      endorsementsCount: 8,
      evidenceDoc: 'Motor_Lab_Practical_Test.pdf'
    },
    {
      id: 'skill-5',
      name: 'Rooftop Solar & Microgrid Inverters',
      proficiency: 88,
      status: 'VERIFIED_MASTER',
      verificationDate: '10 Jun 2026',
      verifier: 'MNRE Solar Rooftop Technician Cert',
      endorsementsCount: 16,
      evidenceDoc: 'MNRE_Solar_Certification.pdf'
    },
    {
      id: 'skill-6',
      name: 'Phase Balancing & Harmonics Testing',
      proficiency: 96,
      status: 'VERIFIED_MASTER',
      verificationDate: '15 Jul 2026',
      verifier: 'UNIVO Regional Safety Chamber',
      endorsementsCount: 22,
      evidenceDoc: 'Fluke_PowerQuality_Auditor.pdf'
    },
    {
      id: 'skill-7',
      name: 'Fast EV Charger Point Installation',
      proficiency: 74,
      status: 'EVIDENCE_ATTACHED',
      verificationDate: 'Under Co-op Audit',
      verifier: 'Pending practical evaluation exam',
      endorsementsCount: 2,
      evidenceDoc: 'EV_Course_Completion_2026.pdf'
    }
  ]);

  // 7-Dimension Trust Profile
  const [trustProfile, setTrustProfile] = useState({
    overallTrust: 99.4,
    skillExecution: 98.8,
    reliability: 99.2,
    safetyProtocol: 100.0,
    punctuality: 97.9,
    customerFeedback: 99.1,
    peerTrust: 99.6
  });

  // Current Operations & Today's Jobs
  const [todayJobs, setTodayJobs] = useState([
    {
      id: 'UNV-JOB-9410',
      customerName: 'Aarav Sundaram',
      customerPhone: '+91 98400 55112',
      serviceTitle: 'Main Power MCB & Surge Breaker Replacement',
      category: 'Electrical Grid (Room 01)',
      location: 'Apartment 402, Opal Heights, Sector 4, Chennai',
      distance: '1.2 km',
      eta: '12 mins',
      urgency: 'HIGH',
      status: 'DISPATCHED', // 'DISPATCHED' | 'IN_TRANSIT' | 'ARRIVED' | 'IN_PROGRESS' | 'COMPLETED'
      estimatedDuration: '45 - 60 mins',
      guaranteedEarnings: '₹1,200 ($18 UNV)',
      coopAllocation: '₹75 (Welfare Fund) + ₹45 (Tech Ops)',
      preliminaryDiagnosis: {
        probableProblem: 'Thermal Overload Tripping in 63A Dual-Pole Isolator',
        severity: 'HIGH',
        possibleIssue: 'Arcing contact point on Bus Bar connector',
        suggestedTools: ['Voltage Tester 1000V', 'Torque Screwdriver', '63A Double Pole MCB', 'Arc Flash Shield']
      }
    }
  ]);

  // Live Incoming Job Offer Modal
  const [incomingOffer, setIncomingOffer] = useState({
    isOpen: false,
    id: 'UNV-JOB-9821',
    customerName: 'Meenakshi Raman',
    serviceTitle: 'Solar Hybrid Inverter Error E-04 Diagnosis',
    category: 'Renewable Solar & Battery (Room 15)',
    requiredSkill: 'Rooftop Solar & Microgrid Inverters (88% DNA Match)',
    location: 'Plot 14, 2nd Avenue, Sector 5, Chennai',
    distance: '2.1 km',
    estimatedTime: '45 mins',
    estimatedAmount: '₹1,500 ($22.5 UNV)',
    whyMatched: 'You are the highest-rated Solar Inverter Specialist within 3km and hold an active MNRE Certificate.',
    fairnessInfo: 'Fairness Rotational Index: Sector 4/5 equity balanced. Declining this mission carries zero penalty or score decrement.',
    expirySeconds: 45
  });

  // Financial Earnings Ledger
  const [earnings, setEarnings] = useState({
    todayGross: 3650,
    weekGross: 21800,
    monthGross: 84500,
    pendingSettlement: 1670,
    coopWelfareContributed: 4225,
    dividendsEarned: 2400,
    transactions: [
      { id: 'TXN-W891', date: 'Today, 18:30', job: '#UNV-JOB-9390 3-Phase Balancing', earned: '+₹1,400', status: 'SETTLED_UPI' },
      { id: 'TXN-W884', date: 'Today, 14:15', job: '#UNV-JOB-9382 Sub-panel rewiring', earned: '+₹1,050', status: 'SETTLED_UPI' },
      { id: 'TXN-W879', date: 'Today, 10:45', job: '#UNV-JOB-9371 Industrial motor diagnostic', earned: '+₹1,200', status: 'SETTLED_UPI' },
      { id: 'TXN-W860', date: 'Yesterday', job: 'Weekly Co-op Healthcare Subsidy Credit', earned: '+₹850', status: 'DIVIDEND_CREDIT' }
    ]
  });

  const toggleDuty = () => {
    setWorker((prev) => ({ ...prev, isDutyActive: !prev.isDutyActive }));
  };

  const activateRestShield = (hours = 24) => {
    setWorker((prev) => ({
      ...prev,
      isDutyActive: false,
      wellbeing: {
        ...prev.wellbeing,
        restShieldActive: true,
        restHoursDuration: hours
      }
    }));
  };

  const acceptJobOffer = () => {
    if (!incomingOffer) return;
    const newJob = {
      id: incomingOffer.id,
      customerName: incomingOffer.customerName,
      customerPhone: '+91 98402 11990',
      serviceTitle: incomingOffer.serviceTitle,
      category: incomingOffer.category,
      location: incomingOffer.location,
      distance: incomingOffer.distance,
      eta: '18 mins',
      urgency: 'ELEVATED',
      status: 'DISPATCHED',
      estimatedDuration: incomingOffer.estimatedTime,
      guaranteedEarnings: incomingOffer.estimatedAmount,
      coopAllocation: '₹95 (Welfare Fund) + ₹55 (Tech Ops)',
      preliminaryDiagnosis: {
        probableProblem: 'Solar Hybrid Inverter Grid Desync',
        severity: 'ELEVATED',
        possibleIssue: 'Inverter Firmware Grid Frequency Fault or Damaged Varistor',
        suggestedTools: ['Multimeter with Frequency', 'Solar DC Disconnect Key', 'Spare MOV Pack']
      }
    };
    setTodayJobs((prev) => [newJob, ...prev]);
    setIncomingOffer((prev) => ({ ...prev, isOpen: false }));
  };

  const declineJobOffer = (reason) => {
    setIncomingOffer((prev) => ({ ...prev, isOpen: false }));
  };

  const triggerOfferSimulation = () => {
    setIncomingOffer((prev) => ({ ...prev, isOpen: true, expirySeconds: 45 }));
  };

  const updateSkillProficiency = (skillName, delta = 1) => {
    setSkillDNA((prev) =>
      prev.map((s) =>
        s.name.toLowerCase().includes(skillName.toLowerCase())
          ? { ...s, proficiency: Math.min(100, s.proficiency + delta) }
          : s
      )
    );
  };

  return (
    <WorkerContext.Provider
      value={{
        worker,
        setWorker,
        toggleDuty,
        activateRestShield,
        skillDNA,
        updateSkillProficiency,
        trustProfile,
        setTrustProfile,
        todayJobs,
        setTodayJobs,
        incomingOffer,
        setIncomingOffer,
        acceptJobOffer,
        declineJobOffer,
        triggerOfferSimulation,
        earnings,
        setEarnings
      }}
    >
      {children}
    </WorkerContext.Provider>
  );
}

export const useWorker = () => useContext(WorkerContext);
