import React, { createContext, useContext, useState, useEffect } from 'react';

const CustomerContext = createContext();

export const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', flag: '🌐' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' }
];

export const SERVICE_ROOMS = [
  { id: 1, name: 'Electrical', code: 'RM-01', color: '#f59e0b', icon: 'electrical_services', count: '142 Workers' },
  { id: 2, name: 'Plumbing & Water', code: 'RM-02', color: '#3b82f6', icon: 'faucet', count: '98 Workers' },
  { id: 3, name: 'Carpentry & Furniture', code: 'RM-03', color: '#92400e', icon: 'carpenter', count: '64 Workers' },
  { id: 4, name: 'Appliance & Cooling', code: 'RM-04', color: '#6366f1', icon: 'mode_fan', count: '89 Workers' },
  { id: 5, name: 'Construction & Masonry', code: 'RM-05', color: '#71717a', icon: 'foundation', count: '120 Workers' },
  { id: 6, name: 'Painting & Finishing', code: 'RM-06', color: '#ec4899', icon: 'format_paint', count: '55 Workers' },
  { id: 7, name: 'Gardening & Green Work', code: 'RM-07', color: '#10b981', icon: 'yard', count: '48 Workers' },
  { id: 8, name: 'Cleaning & Sanitation', code: 'RM-08', color: '#06b6d4', icon: 'cleaning_services', count: '110 Workers' },
  { id: 9, name: 'Pest & Hygiene', code: 'RM-09', color: '#4d7c0f', icon: 'pest_control', count: '39 Workers' },
  { id: 10, name: 'Care & Assistance', code: 'RM-10', color: '#f43f5e', icon: 'elderly', count: '72 Workers' },
  { id: 11, name: 'Vehicle Services', code: 'RM-11', color: '#334155', icon: 'directions_car', count: '84 Workers' },
  { id: 12, name: 'Local Logistics', code: 'RM-12', color: '#8b5cf6', icon: 'local_shipping', count: '130 Workers' },
  { id: 13, name: 'Household Assistance', code: 'RM-13', color: '#d946ef', icon: 'home_repair_service', count: '95 Workers' },
  { id: 14, name: 'Rural & Agriculture', code: 'RM-14', color: '#15803d', icon: 'agriculture', count: '41 Workers' },
  { id: 15, name: 'Renewable & Green Jobs', code: 'RM-15', color: '#84cc16', icon: 'solar_power', count: '105 Workers' },
  { id: 16, name: 'Digital & Local Tech', code: 'RM-16', color: '#0ea5e9', icon: 'router', count: '160 Workers' },
  { id: 17, name: 'Safety & Security', code: 'RM-17', color: '#ef4444', icon: 'shield', count: '88 Workers' },
  { id: 18, name: 'General Local Services', code: 'RM-18', color: '#64748b', icon: 'handyman', count: '210 Workers' }
];

export const INITIAL_QUALIFIED_WORKERS = [
  {
    id: 'WRK-7089',
    name: 'Karthik Subramanian',
    role: 'Senior Master Electrician & Solar Inverter Specialist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    verified: true,
    skillDNA: {
      'Phase Balancing': 99,
      'High Voltage Isolation': 98,
      'Microgrid Inverters': 96,
      'Safety Protocols': 100
    },
    skillMatchPercentage: 99.2,
    trustScore: 99.4,
    distance: '1.2 km',
    etaMinutes: 12,
    available: true,
    experience: '8 years • 1,420 jobs',
    languages: ['Tamil', 'English', 'Hindi'],
    phone: '+91 98401 23456',
    hourlyRate: 220
  },
  {
    id: 'WRK-4102',
    name: 'Priya Narayanan',
    role: 'Certified Hydrodynamic & Leak Telemetry Tech',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    verified: true,
    skillDNA: {
      'Acoustic Pipe Sonar': 97,
      'Pressure Regulators': 99,
      'Emergency Pipe Sealing': 95
    },
    skillMatchPercentage: 96.8,
    trustScore: 98.9,
    distance: '2.4 km',
    etaMinutes: 19,
    available: true,
    experience: '6 years • 890 jobs',
    languages: ['Tamil', 'English'],
    phone: '+91 98840 98765',
    hourlyRate: 190
  },
  {
    id: 'WRK-9331',
    name: 'Rajesh Kumar Verma',
    role: 'HVAC & Clean Room Environmental Calibrator',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    verified: true,
    skillDNA: {
      'Compressor Diagnostics': 98,
      'Freon Gas Cycle': 94,
      'Thermal Imaging': 97
    },
    skillMatchPercentage: 94.5,
    trustScore: 97.6,
    distance: '3.1 km',
    etaMinutes: 24,
    available: true,
    experience: '11 years • 2,100 jobs',
    languages: ['Hindi', 'English'],
    phone: '+91 98111 54321',
    hourlyRate: 240
  },
  {
    id: 'WRK-2210',
    name: 'Ananya Deshmukh',
    role: 'Smart Automation & IoT Diagnostics Lead',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    verified: true,
    skillDNA: {
      'Bus Protocol': 99,
      'Circuit Testing': 95,
      'Home Automation': 99
    },
    skillMatchPercentage: 92.1,
    trustScore: 99.0,
    distance: '4.5 km',
    etaMinutes: 35,
    available: false,
    experience: '5 years • 740 jobs',
    languages: ['Hindi', 'Marathi', 'English'],
    phone: '+91 99200 11223',
    hourlyRate: 260
  }
];

export function CustomerProvider({ children }) {
  // Current Customer Auth / Profile
  const [customer, setCustomer] = useState({
    isAuthenticated: true,
    id: 'CUST-8841',
    name: 'Aarav Sundaram',
    email: 'aarav.sundaram@univo.network',
    phone: '+91 98400 55112',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    selectedLanguage: 'en',
    currentLocation: {
      address: 'Skyline Hub, Sector 4, Chennai Central',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600001',
      coords: { lat: 13.0827, lng: 80.2707 }
    },
    savedAddresses: [
      { id: 'addr-1', label: 'Home', address: 'Apartment 402, Opal Heights, Sector 4, Chennai', isDefault: true },
      { id: 'addr-2', label: 'Office / Studio', address: 'Unit 12B, Tidal Tech Park, Taramani, Chennai', isDefault: false },
      { id: 'addr-3', label: 'Parents Residence', address: 'No 18, 4th Cross St, Besant Nagar, Chennai', isDefault: false }
    ],
    emergencyContact: {
      name: 'Meera Sundaram',
      relationship: 'Spouse',
      phone: '+91 98400 99887'
    },
    notificationPreferences: {
      sms: true,
      whatsapp: true,
      inAppAlerts: true,
      voiceAnnounce: true
    }
  });

  // Current Active Jobs
  const [activeJobs, setActiveJobs] = useState([
    {
      id: 'UNV-JOB-9410',
      serviceName: 'Main Power MCB & Surge Breaker Replacement',
      category: 'Electrical Grid',
      roomCode: 'RM-01',
      status: 'DISPATCHED', // 'MATCHING' | 'DISPATCHED' | 'IN_TRANSIT' | 'ARRIVED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'RESCHEDULED'
      worker: INITIAL_QUALIFIED_WORKERS[0],
      createdAt: 'Today, 21:10',
      urgency: 'HIGH',
      location: 'Apartment 402, Opal Heights, Sector 4, Chennai',
      estimatedDuration: '45 - 60 mins',
      etaMinutes: 11,
      estimatedPriceRange: '₹1,200 - ₹1,600 (180 UNV)',
      preliminaryDiagnosis: {
        probableProblem: 'Thermal Overload Tripping in 63A Dual-Pole Isolator',
        severity: 'HIGH',
        possibleIssue: 'Arcing contact point on Bus Bar connector',
        requiredSkills: ['High Voltage Isolation', 'Arc Quench Testing', 'Phase Balancing'],
        confidence: 96.4
      },
      financials: {
        basePay: 1200,
        parts: 350,
        coopTax: 75,
        platformFee: 45,
        total: 1670
      }
    }
  ]);

  // Job History
  const [historyJobs, setHistoryJobs] = useState([
    {
      id: 'UNV-JOB-8120',
      serviceName: 'High Pressure Water Line Descaling & Valve Seal',
      category: 'Plumbing & Hydro',
      roomCode: 'RM-02',
      status: 'COMPLETED',
      completedAt: '28 Aug 2026',
      worker: INITIAL_QUALIFIED_WORKERS[1],
      totalPaid: '₹1,450 (160 UNV)',
      rating: 5.0,
      invoiceUrl: '#download-inv-8120'
    },
    {
      id: 'UNV-JOB-7742',
      serviceName: 'Dual HVAC Compressor Clean & Gas Leak Calibration',
      category: 'Climate & Air',
      roomCode: 'RM-10',
      status: 'COMPLETED',
      completedAt: '14 Aug 2026',
      worker: INITIAL_QUALIFIED_WORKERS[2],
      totalPaid: '₹2,100 (240 UNV)',
      rating: 4.8,
      invoiceUrl: '#download-inv-7742'
    }
  ]);

  // Saved Workers
  const [savedWorkers, setSavedWorkers] = useState([
    INITIAL_QUALIFIED_WORKERS[0],
    INITIAL_QUALIFIED_WORKERS[1]
  ]);

  // Payments / Transactions
  const [payments, setPayments] = useState([
    { id: 'TXN-9081', date: '28 Aug 2026', desc: 'Job #UNV-JOB-8120 Hydro Descaling', amount: '₹1,450', status: 'SETTLED', method: 'UPI (GPay)' },
    { id: 'TXN-8742', date: '14 Aug 2026', desc: 'Job #UNV-JOB-7742 HVAC Calibration', amount: '₹2,100', status: 'SETTLED', method: 'UNV Token Wallet' },
    { id: 'TXN-8201', date: '02 Aug 2026', desc: 'Cooperative Member Dividend Credit', amount: '+₹340', status: 'CREDITED', method: 'Co-op Dividend' }
  ]);

  // Active Draft Request during request creation
  const [draftRequest, setDraftRequest] = useState(null);

  // Forced Simulation State for Testing all edge states
  // 'normal' | 'loading' | 'empty' | 'error' | 'cancelled' | 'rescheduled' | 'worker_unavailable' | 'ai_uncertainty'
  const [forcedState, setForcedState] = useState('normal');

  const updateCustomer = (data) => setCustomer((prev) => ({ ...prev, ...data }));

  const addSavedWorker = (worker) => {
    if (!savedWorkers.some((w) => w.id === worker.id)) {
      setSavedWorkers((prev) => [...prev, worker]);
    }
  };

  const removeSavedWorker = (workerId) => {
    setSavedWorkers((prev) => prev.filter((w) => w.id !== workerId));
  };

  const cancelJob = (jobId, reason) => {
    setActiveJobs((prev) =>
      prev.map((job) =>
        job.id === jobId ? { ...job, status: 'CANCELLED', cancellationReason: reason } : job
      )
    );
  };

  const rescheduleJob = (jobId, newTime) => {
    setActiveJobs((prev) =>
      prev.map((job) =>
        job.id === jobId ? { ...job, status: 'RESCHEDULED', rescheduledTime: newTime } : job
      )
    );
  };

  const completeJob = (jobId, feedback) => {
    const job = activeJobs.find((j) => j.id === jobId);
    if (!job) return;

    const completed = {
      ...job,
      status: 'COMPLETED',
      completedAt: 'Just now',
      totalPaid: `₹${job.financials.total}`,
      rating: feedback.overall,
      feedback
    };

    setHistoryJobs((prev) => [completed, ...prev]);
    setActiveJobs((prev) => prev.filter((j) => j.id !== jobId));
    setPayments((prev) => [
      {
        id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
        date: 'Today',
        desc: `Job #${job.id} ${job.serviceName}`,
        amount: `₹${job.financials.total}`,
        status: 'SETTLED',
        method: feedback.paymentMethod || 'Instant UPI'
      },
      ...prev
    ]);
  };

  return (
    <CustomerContext.Provider
      value={{
        customer,
        updateCustomer,
        activeJobs,
        setActiveJobs,
        historyJobs,
        savedWorkers,
        addSavedWorker,
        removeSavedWorker,
        payments,
        draftRequest,
        setDraftRequest,
        cancelJob,
        rescheduleJob,
        completeJob,
        forcedState,
        setForcedState,
        QUALIFIED_WORKERS: INITIAL_QUALIFIED_WORKERS
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}

export const useCustomer = () => useContext(CustomerContext);
