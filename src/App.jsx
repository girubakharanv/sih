import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './dashboard';
import ServiceWorldHub from './service_world_hub';
import CustomerJobRequest from './customer_job_request';
import WorkerDiscovery from './worker_discovery';
import ServiceRoomTransitions from './service_room_transitions';
import RoleSelectionLanding from './components/RoleSelectionLanding';

// Customer Journey Components & Context
import { CustomerProvider } from './customer/CustomerContext';
import CustomerAuth from './customer/CustomerAuth';
import CustomerHome from './customer/CustomerHome';
import CustomerRequestService from './customer/CustomerRequestService';
import CustomerWorkerSelection from './customer/CustomerWorkerSelection';
import CustomerJobTracking from './customer/CustomerJobTracking';
import CustomerPaymentFeedback from './customer/CustomerPaymentFeedback';
import CustomerStateTester from './customer/CustomerStateTester';

// Worker Guild & Command Components & Context
import { WorkerProvider } from './worker/WorkerContext';
import WorkerRegistration from './worker/WorkerRegistration';
import WorkerPassport from './worker/WorkerPassport';
import WorkerDashboard from './worker/WorkerDashboard';
import WorkerSkillDNA from './worker/WorkerSkillDNA';
import WorkerJobExecution from './worker/WorkerJobExecution';
import WorkerWellbeing from './worker/WorkerWellbeing';
import WorkerCareer from './worker/WorkerCareer';
import WorkerEarnings from './worker/WorkerEarnings';
import IntelligenceSandbox from './engine/IntelligenceSandbox';

// Cooperative Social Infrastructure Components & Context
import { SocialProvider } from './social/SocialContext';
import GovernanceHub from './social/GovernanceHub';
import WelfareCenter from './social/WelfareCenter';
import ParametricProtectionView from './social/ParametricProtectionView';
import CrisisModeHub from './social/CrisisModeHub';
import GovernmentPortal from './government/GovernmentPortal';
import StoryTourController from './components/StoryTourController';
import { AccessibilityProvider } from './context/AccessibilityContext';
import NetworkStatusIndicator from './components/NetworkStatusIndicator';
import AssistedWorkerRegistration from './worker/AssistedWorkerRegistration';

function App() {
  return (
    <AccessibilityProvider>
      <CustomerProvider>
        <WorkerProvider>
          <SocialProvider>
            <Router>
              <div className="relative min-h-screen bg-[#131314] text-[#e5e2e3]">
                {/* Persistent Film Grain Filter */}
                <div className="film-grain" />

                {/* Rural Low-Connectivity / Offline Network Banner */}
                <NetworkStatusIndicator />

                {/* Global Floating Glass HUD Header / Navigation */}
                <Navigation />

                {/* Floating Operational State Tester */}
                <CustomerStateTester />

                {/* 49-Step Story Tour Controller */}
                <StoryTourController />

                {/* Routes */}
                <Routes>
                  {/* Assisted Low-Digital-Literacy Worker Registration */}
                  <Route path="/worker/assisted-register" element={<AssistedWorkerRegistration />} />
                {/* Government & Cooperative Oversight Routes */}
                <Route path="/government" element={<GovernmentPortal />} />
                <Route path="/oversight" element={<GovernmentPortal />} />

                {/* Cooperative Social Infrastructure Routes */}
                <Route path="/governance" element={<GovernanceHub />} />
                <Route path="/welfare" element={<WelfareCenter />} />
                <Route path="/parametric" element={<ParametricProtectionView />} />
                <Route path="/crisis" element={<CrisisModeHub />} />

                {/* Core Intelligence Engine Sandbox */}
                <Route path="/engine" element={<IntelligenceSandbox />} />
                <Route path="/intelligence" element={<IntelligenceSandbox />} />

              {/* Customer Journey Routes */}
              <Route path="/customer" element={<CustomerHome />} />
              <Route path="/customer/auth" element={<CustomerAuth />} />
              <Route path="/customer/request" element={<CustomerRequestService />} />
              <Route path="/customer/select-worker" element={<CustomerWorkerSelection />} />
              <Route path="/customer/tracking/:jobId" element={<CustomerJobTracking />} />
              <Route path="/customer/settlement/:jobId" element={<CustomerPaymentFeedback />} />

              {/* Worker Complete Application Routes */}
              <Route path="/worker" element={<WorkerDashboard />} />
              <Route path="/worker/register" element={<WorkerRegistration />} />
              <Route path="/worker/passport" element={<WorkerPassport />} />
              <Route path="/worker/skills" element={<WorkerSkillDNA />} />
              <Route path="/worker/execute/:jobId" element={<WorkerJobExecution />} />
              <Route path="/worker/wellbeing" element={<WorkerWellbeing />} />
              <Route path="/worker/career" element={<WorkerCareer />} />
              <Route path="/worker/earnings" element={<WorkerEarnings />} />

              {/* Core UNIVO Operating System Views */}
              <Route path="/" element={<RoleSelectionLanding />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/hub" element={<ServiceWorldHub />} />
              <Route path="/request" element={<CustomerRequestService />} />
              <Route path="/workers" element={<WorkerDiscovery />} />
              <Route path="/rooms" element={<ServiceRoomTransitions />} />

              {/* Fallbacks */}
              <Route path="/service-world-hub" element={<ServiceWorldHub />} />
              <Route path="/customer-job-request" element={<CustomerRequestService />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
        </SocialProvider>
      </WorkerProvider>
    </CustomerProvider>
    </AccessibilityProvider>
  );
}

export default App;
