import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSocial } from './SocialContext';
import ShaderBackground from '../components/ShaderBackground';

export default function CrisisModeHub() {
  const {
    isCrisisMode,
    toggleCrisisMode,
    crisisSignalData,
    crisisMetrics,
    postCrisisReport
  } = useSocial();

  const [activeStrikeTeam, setActiveStrikeTeam] = useState('electricians');

  const strikeTeams = [
    {
      id: 'electricians',
      name: 'High-Voltage Isolation & Grid Safety',
      icon: 'bolt',
      lead: 'Master Karthik Subramanian',
      deployedCount: 38,
      primaryMission: 'Isolating water-submerged ground-floor distribution boards and preventing electrical fires.',
      color: '#f59e0b',
      hazardsMitigated: 34
    },
    {
      id: 'plumbers',
      name: 'Hydro Barrier & De-Watering Team',
      icon: 'faucet',
      lead: 'Master Priya Narayanan',
      deployedCount: 32,
      primaryMission: 'Deploying heavy submersible trash pumps, sealing broken municipal valves, restoring drinking water lines.',
      color: '#3b82f6',
      hazardsMitigated: 28
    },
    {
      id: 'carpenters',
      name: 'Structural Shoring & Roof Tarping',
      icon: 'carpenter',
      lead: 'Master Vikram Rao',
      deployedCount: 26,
      primaryMission: 'Reinforcing unstable masonry wall fractures and erecting emergency water diversion berms.',
      color: '#92400e',
      hazardsMitigated: 14
    },
    {
      id: 'care',
      name: 'Vulnerable Elder & Medical Triage',
      icon: 'elderly',
      lead: 'Master Ananya Deshmukh',
      deployedCount: 24,
      primaryMission: 'Transporting bedridden residents and essential oxygen canisters to dry second-floor relief hubs.',
      color: '#f43f5e',
      hazardsMitigated: 8
    },
    {
      id: 'logistics',
      name: 'High-Clearance Logistics & Generator Pods',
      icon: 'electric_car',
      lead: 'Logistics Commander Farhan Ali',
      deployedCount: 28,
      primaryMission: 'Operating high-axle electric transport vehicles and deploying 50kVA mobile power trailers.',
      color: '#8b5cf6',
      hazardsMitigated: 16
    }
  ];

  return (
    <div className="w-full min-h-screen relative bg-background text-on-background selection:bg-primary selection:text-on-primary">
      <ShaderBackground className="fixed inset-0 z-0 opacity-25 pointer-events-none" />

      <div className="relative z-10 w-full min-h-screen pt-28 px-4 md:px-10 max-w-7xl mx-auto pb-28 flex flex-col gap-8">
        {/* Breadcrumb & Mode Switcher */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-xs font-mono text-on-surface-variant hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Back to Main Dashboard</span>
          </Link>

          {/* DYNAMIC MODE TOGGLE SWITCH */}
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-on-surface-variant uppercase text-[10px] font-bold">System Posture:</span>
            <button
              onClick={toggleCrisisMode}
              className={`px-5 py-2.5 rounded-2xl border flex items-center gap-2.5 transition-all shadow-xl font-bold ${
                isCrisisMode
                  ? 'bg-error/20 border-error text-error animate-pulse shadow-[0_0_20px_rgba(255,180,171,0.4)]'
                  : 'bg-secondary/20 border-secondary text-secondary'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${isCrisisMode ? 'bg-error animate-ping' : 'bg-secondary'}`} />
              <span>{isCrisisMode ? 'CRISIS MODE ACTIVE' : 'NORMAL MODE'}</span>
              <span className="material-symbols-outlined text-sm">{isCrisisMode ? 'emergency_home' : 'swap_horiz'}</span>
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-error/10 border border-error/20 mb-2">
            <span className="text-[10px] font-mono text-error uppercase font-bold tracking-wider">
              Part E: Cooperative Crisis Mode &amp; Strike Teams
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight">
            Crisis Command &amp; Emergency Mobilization
          </h1>
          <p className="text-xs md:text-sm text-on-surface-variant font-mono mt-1 max-w-3xl">
            When natural disasters or infrastructure collapses strike, UNIVO converts from individual service dispatch into a coordinated cooperative strike force.
          </p>
        </div>

        {/* Crisis Signal Detection Alert Banner */}
        <div className={`p-6 rounded-3xl border transition-all space-y-3 font-mono text-xs ${
          isCrisisMode ? 'bg-error/10 border-error/40 text-error shadow-[0_0_30px_rgba(255,180,171,0.2)]' : 'glass-card border-white/10 text-on-surface-variant'
        }`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl text-error">warning</span>
              <h3 className="font-sans font-bold text-base text-white">
                Multi-Signal Crisis Detection: {crisisSignalData.crisisType}
              </h3>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-error/20 text-error font-bold border border-error/30">
              {crisisSignalData.weatherAlertLevel}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[11px] text-white/90">
            <div>
              <span className="text-on-surface-variant block text-[10px]">Emergency Inflow Spike:</span>
              <strong className="text-error">+{crisisSignalData.emergencyRequestSpikePct}%</strong> above baseline
            </div>
            <div>
              <span className="text-on-surface-variant block text-[10px]">Worker Field Reports:</span>
              <strong className="text-white">{crisisSignalData.workerOnGroundReportsCount} Verified Reports</strong>
            </div>
            <div>
              <span className="text-on-surface-variant block text-[10px]">Cooperative Protocol:</span>
              <strong className="text-secondary">Volunteer Strike Teams Active</strong>
            </div>
          </div>
        </div>

        {/* LIVE CRISIS DASHBOARD METRICS */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 font-mono text-xs">
          <div className="glass-card p-5 rounded-2xl border border-white/10">
            <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Artisans Deployed</span>
            <div className="text-3xl font-bold text-white mt-1">{crisisMetrics.workersDeployed}</div>
            <span className="text-[10px] text-secondary">5 Strike Teams</span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10">
            <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Households Reached</span>
            <div className="text-3xl font-bold text-secondary mt-1">{crisisMetrics.householdsReached}</div>
            <span className="text-[10px] text-secondary">Zero Casualties</span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10">
            <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Electrical Hazards Fixed</span>
            <div className="text-3xl font-bold text-primary mt-1">{crisisMetrics.hazardsFixed}</div>
            <span className="text-[10px] text-primary">Substations Secured</span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10">
            <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Water Lines Restored</span>
            <div className="text-3xl font-bold text-white mt-1">{crisisMetrics.waterSystemsRestored}</div>
            <span className="text-[10px] text-white/80">Pumps Active</span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Structures Shored</span>
            <div className="text-3xl font-bold text-tertiary mt-1">{crisisMetrics.structuresSecured}</div>
            <span className="text-[10px] text-tertiary">Roof Tarped</span>
          </div>
        </div>

        {/* 5 SKILL-BASED STRIKE TEAMS */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-6 font-mono text-xs animate-fade-in-up">
          <div className="flex justify-between items-center pb-2 border-b border-white/10">
            <div>
              <h3 className="font-sans font-bold text-xl text-white">5 Specialized Cooperative Strike Teams</h3>
              <p className="text-on-surface-variant mt-0.5">
                Skill DNA automatically aggregates verified technicians into specialized emergency units.
              </p>
            </div>
            <span className="text-secondary text-[11px]">100% Volunteer Guild Allocation</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {strikeTeams.map((team) => {
              const isSelected = activeStrikeTeam === team.id;
              return (
                <button
                  key={team.id}
                  onClick={() => setActiveStrikeTeam(team.id)}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between h-36 transition-all ${
                    isSelected
                      ? 'bg-primary/20 border-primary shadow-[0_0_15px_rgba(173,198,255,0.2)]'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="material-symbols-outlined text-2xl" style={{ color: team.color }}>
                      {team.icon}
                    </span>
                    <span className="text-[10px] text-white font-bold">{team.deployedCount} Active</span>
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs text-white leading-tight">{team.name}</h4>
                    <span className="text-[10px] text-on-surface-variant block mt-1">Lead: {team.lead.split(' ')[1]}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Strike Team Details */}
          {(() => {
            const team = strikeTeams.find((t) => t.id === activeStrikeTeam);
            return (
              <div className="p-5 rounded-2xl bg-[#0e0e0f]/90 border border-primary/30 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-sans font-bold text-base text-white">{team.name}</span>
                    <span className="text-secondary font-bold">• Lead: {team.lead}</span>
                  </div>
                  <span className="text-primary font-bold">{team.hazardsMitigated} Hazards Mitigated</span>
                </div>
                <p className="text-on-surface-variant text-[11px] leading-relaxed">{team.primaryMission}</p>
              </div>
            );
          })()}
        </div>

        {/* COVERED VS UNCOVERED VULNERABLE ZONES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="glass-card p-6 rounded-3xl border border-secondary/30 space-y-3">
            <div className="flex items-center gap-2 text-secondary font-bold text-sm">
              <span className="material-symbols-outlined text-base">check_circle</span>
              <span>Covered Emergency Sectors (Active Grid):</span>
            </div>
            <div className="space-y-2">
              {crisisMetrics.coveredZones.map((zone, i) => (
                <div key={i} className="p-3 rounded-xl bg-secondary/10 border border-secondary/20 text-white flex items-center justify-between">
                  <span>{zone}</span>
                  <span className="text-[10px] text-secondary font-bold">100% Power Isolated</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-error/30 space-y-3">
            <div className="flex items-center gap-2 text-error font-bold text-sm">
              <span className="material-symbols-outlined text-base">pending</span>
              <span>Uncovered / High Inundation Zones:</span>
            </div>
            <div className="space-y-2">
              {crisisMetrics.uncoveredZones.map((zone, i) => (
                <div key={i} className="p-3 rounded-xl bg-error/10 border border-error/20 text-white flex items-center justify-between">
                  <span>{zone}</span>
                  <span className="text-[10px] text-error font-bold">High Water Depths (&gt;0.8m)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* POST-CRISIS COMPREHENSIVE AUDIT REPORT */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-5 font-mono text-xs animate-fade-in-up">
          <div className="flex justify-between items-start pb-2 border-b border-white/10">
            <div>
              <span className="text-[10px] uppercase font-bold text-primary">Decentralized Transparency Audit</span>
              <h3 className="font-sans font-bold text-xl text-white mt-0.5">{postCrisisReport.eventName}</h3>
              <p className="text-on-surface-variant text-[11px] mt-0.5">Event ID: {postCrisisReport.eventId} • Duration: {postCrisisReport.durationHours} Hours</p>
            </div>
            <span className="text-secondary font-bold text-sm">AUDIT CERTIFIED</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[11px]">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
              <span className="text-on-surface-variant text-[10px] uppercase">Artisan Mobilization</span>
              <div className="text-white font-bold text-sm mt-0.5">{postCrisisReport.workersDeployed} Technicians</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
              <span className="text-on-surface-variant text-[10px] uppercase">Community Impact</span>
              <div className="text-white font-bold text-sm mt-0.5">{postCrisisReport.householdsServed} Households</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
              <span className="text-on-surface-variant text-[10px] uppercase">Cooperative Cost</span>
              <div className="text-secondary font-bold text-sm mt-0.5">{postCrisisReport.cooperativeDirectLaborCost}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
              <span className="text-on-surface-variant text-[10px] uppercase">Reimbursement Status</span>
              <div className="text-primary font-bold text-sm mt-0.5">{postCrisisReport.reimbursementStatus}</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#0e0e0f] text-on-surface-variant text-[11px] italic">
            Note: {postCrisisReport.disclaimer}
          </div>
        </div>
      </div>
    </div>
  );
}
