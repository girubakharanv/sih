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
import CustomerProtectedRoute from './customer/CustomerProtectedRoute';
import CustomerRequestService from './customer/CustomerRequestService';
import CustomerWorkerSelection from './customer/CustomerWorkerSelection';
import CustomerJobTracking from './customer/CustomerJobTracking';
import CustomerPaymentFeedback from './customer/CustomerPaymentFeedback';
import CustomerStateTester from './customer/CustomerStateTester';

// Worker Guild & Command Components & Context
import { WorkerProvider } from './worker/WorkerContext';
import WorkerAuth from './worker/WorkerAuth';
import WorkerProtectedRoute from './worker/WorkerProtectedRoute';
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
import { I18nProvider } from './context/I18nContext';
import NetworkStatusIndicator from './components/NetworkStatusIndicator';
import AssistedWorkerRegistration from './worker/AssistedWorkerRegistration';

// Government Components & Context
import { GovernmentProvider } from './government/GovernmentContext';
import GovernmentAuth from './government/GovernmentAuth';
import GovernmentProtectedRoute from './government/GovernmentProtectedRoute';

function App() {
  return (
    <I18nProvider>
      <AccessibilityProvider>
        <CustomerProvider>
          <WorkerProvider>
            <SocialProvider>
              <GovernmentProvider>
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
                      
                      {/* Government Oversight Routes */}
                      <Route path="/government/auth" element={<GovernmentAuth />} />
                      <Route path="/government" element={<GovernmentProtectedRoute><GovernmentPortal /></GovernmentProtectedRoute>} />
                      <Route path="/government/dashboard" element={<GovernmentProtectedRoute><GovernmentPortal /></GovernmentProtectedRoute>} />
                      <Route path="/government/cooperatives" element={<GovernmentProtectedRoute><GovernmentPortal /></GovernmentProtectedRoute>} />
                      <Route path="/government/employment" element={<GovernmentProtectedRoute><GovernmentPortal /></GovernmentProtectedRoute>} />
                      <Route path="/government/skills" element={<GovernmentProtectedRoute><GovernmentPortal /></GovernmentProtectedRoute>} />
                      <Route path="/government/welfare" element={<GovernmentProtectedRoute><GovernmentPortal /></GovernmentProtectedRoute>} />
                      <Route path="/government/coverage" element={<GovernmentProtectedRoute><GovernmentPortal /></GovernmentProtectedRoute>} />
                      <Route path="/government/demand" element={<GovernmentProtectedRoute><GovernmentPortal /></GovernmentProtectedRoute>} />
                      <Route path="/government/crisis" element={<GovernmentProtectedRoute><GovernmentPortal /></GovernmentProtectedRoute>} />
                      <Route path="/government/reports" element={<GovernmentProtectedRoute><GovernmentPortal /></GovernmentProtectedRoute>} />
                      <Route path="/government/privacy" element={<GovernmentProtectedRoute><GovernmentPortal /></GovernmentProtectedRoute>} />
                      <Route path="/government/profile" element={<GovernmentProtectedRoute><GovernmentPortal /></GovernmentProtectedRoute>} />

                      {/* Cooperative Social Infrastructure Routes */}
                      <Route path="/governance" element={<GovernanceHub />} />
                      <Route path="/welfare" element={<WelfareCenter />} />
                      <Route path="/parametric" element={<ParametricProtectionView />} />
                      <Route path="/crisis" element={<CrisisModeHub />} />

                      {/* Core Intelligence Engine Sandbox */}
                      <Route path="/engine" element={<IntelligenceSandbox />} />
                      <Route path="/intelligence" element={<IntelligenceSandbox />} />

                      {/* Customer Journey Routes */}
                      <Route path="/customer/auth" element={<CustomerAuth />} />
                      <Route path="/customer" element={<CustomerProtectedRoute><CustomerHome /></CustomerProtectedRoute>} />
                      <Route path="/customer/request" element={<CustomerProtectedRoute><CustomerRequestService /></CustomerProtectedRoute>} />
                      <Route path="/customer/select-worker" element={<CustomerProtectedRoute><CustomerWorkerSelection /></CustomerProtectedRoute>} />
                      <Route path="/customer/tracking/:jobId" element={<CustomerProtectedRoute><CustomerJobTracking /></CustomerProtectedRoute>} />
                      <Route path="/customer/settlement/:jobId" element={<CustomerProtectedRoute><CustomerPaymentFeedback /></CustomerProtectedRoute>} />

                      {/* Worker Complete Application Routes */}
                      <Route path="/worker/auth" element={<WorkerAuth />} />
                      <Route path="/worker/register" element={<WorkerRegistration />} />
                      <Route path="/worker" element={<WorkerProtectedRoute><WorkerDashboard /></WorkerProtectedRoute>} />
                      <Route path="/worker/jobs" element={<WorkerProtectedRoute><WorkerDashboard /></WorkerProtectedRoute>} />
                      <Route path="/worker/passport" element={<WorkerProtectedRoute><WorkerPassport /></WorkerProtectedRoute>} />
                      <Route path="/worker/profile" element={<WorkerProtectedRoute><WorkerPassport /></WorkerProtectedRoute>} />
                      <Route path="/worker/availability" element={<WorkerProtectedRoute><WorkerPassport /></WorkerProtectedRoute>} />
                      <Route path="/worker/skills" element={<WorkerProtectedRoute><WorkerSkillDNA /></WorkerProtectedRoute>} />
                      <Route path="/worker/trust" element={<WorkerProtectedRoute><WorkerSkillDNA /></WorkerProtectedRoute>} />
                      <Route path="/worker/execute/:jobId" element={<WorkerProtectedRoute><WorkerJobExecution /></WorkerProtectedRoute>} />
                      <Route path="/worker/wellbeing" element={<WorkerProtectedRoute><WorkerWellbeing /></WorkerProtectedRoute>} />
                      <Route path="/worker/career" element={<WorkerProtectedRoute><WorkerCareer /></WorkerProtectedRoute>} />
                      <Route path="/worker/training" element={<WorkerProtectedRoute><WorkerCareer /></WorkerProtectedRoute>} />
                      <Route path="/worker/earnings" element={<WorkerProtectedRoute><WorkerEarnings /></WorkerProtectedRoute>} />
                      <Route path="/worker/welfare" element={<WorkerProtectedRoute><WelfareCenter /></WorkerProtectedRoute>} />
                      <Route path="/worker/governance" element={<WorkerProtectedRoute><GovernanceHub /></WorkerProtectedRoute>} />

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
              </GovernmentProvider>
            </SocialProvider>
          </WorkerProvider>
        </CustomerProvider>
      </AccessibilityProvider>
    </I18nProvider>
  );
}

export default App;
