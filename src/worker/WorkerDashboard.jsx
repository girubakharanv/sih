import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWorker } from './WorkerContext';
import ShaderBackground from '../components/ShaderBackground';

export default function WorkerDashboard() {
  const navigate = useNavigate();
  const {
    worker,
    toggleDuty,
    todayJobs,
    skillDNA,
    trustProfile,
    incomingOffer,
    setIncomingOffer,
    acceptJobOffer,
    declineJobOffer,
    triggerOfferSimulation,
    earnings
  } = useWorker();

  const [activeSubTab, setActiveSubTab] = useState('ops'); // 'ops' | 'skills' | 'wellbeing' | 'governance'
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState('Taking scheduled rest / break');

  const handleExecuteDecline = () => {
    declineJobOffer(declineReason);
    setIsDeclineModalOpen(false);
  };

  return (
    <div className="w-full min-h-screen relative bg-background text-on-background selection:bg-primary selection:text-on-primary">
      <ShaderBackground className="fixed inset-0 z-0 opacity-25 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full min-h-screen pt-28 px-4 md:px-10 max-w-7xl mx-auto pb-28 flex flex-col gap-8">
        {/* Top Worker Command Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={worker.avatar}
                alt={worker.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-primary/50 shadow-xl"
              />
              <span
                className={`w-3.5 h-3.5 rounded-full absolute -top-1 -right-1 border-2 border-[#131314] ${
                  worker.isDutyActive ? 'bg-secondary animate-pulse' : 'bg-on-surface-variant'
                }`}
              />
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="font-sans font-bold text-2xl text-white">
                  {worker.name}
                </h1>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 uppercase font-bold">
                  {worker.tier}
                </span>
              </div>
              <p className="text-xs font-mono text-on-surface-variant mt-0.5">
                {worker.role} • {worker.location}
              </p>
            </div>
          </div>

          {/* Quick Metrics & Duty Switch */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            {/* Duty Mode Toggle */}
            <button
              onClick={toggleDuty}
              className={`px-4 py-2.5 rounded-2xl border flex items-center gap-2 transition-all ${
                worker.isDutyActive
                  ? 'bg-secondary/20 border-secondary text-white font-bold shadow-[0_0_15px_rgba(78,222,163,0.3)]'
                  : 'bg-white/5 border-white/10 text-on-surface-variant'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${worker.isDutyActive ? 'bg-secondary' : 'bg-white/30'}`} />
              <span>{worker.isDutyActive ? 'Available on Grid' : 'Rest Mode (Protected)'}</span>
            </button>

            {/* Simulate Incoming Job Offer */}
            <button
              onClick={triggerOfferSimulation}
              className="px-4 py-2.5 rounded-2xl bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(173,198,255,0.2)] hover:scale-105 transition-all"
            >
              <span className="material-symbols-outlined text-base">notifications_active</span>
              <span>Simulate Offer</span>
            </button>

            {/* Worker Passport Quick Link */}
            <Link
              to="/worker/passport"
              className="px-4 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center gap-2 transition-all"
            >
              <span className="material-symbols-outlined text-base">badge</span>
              <span>My Passport</span>
            </Link>
          </div>
        </div>

        {/* 4 Overview Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
          {/* Earnings Card */}
          <Link
            to="/worker/earnings"
            className="glass-card p-5 rounded-3xl border border-white/10 hover:border-primary/40 transition-all flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <span className="text-[10px] uppercase text-on-surface-variant font-semibold">Today's Earnings</span>
              <span className="material-symbols-outlined text-primary text-base">payments</span>
            </div>
            <div className="my-2">
              <div className="text-2xl font-bold text-white">₹{earnings.todayGross}</div>
              <span className="text-[10px] text-secondary">₹{earnings.pendingSettlement} pending sign-off</span>
            </div>
            <div className="text-[10px] text-on-surface-variant/80 pt-2 border-t border-white/5">
              100% direct settlement • Instant UPI
            </div>
          </Link>

          {/* Wellbeing & Rest Shield */}
          <Link
            to="/worker/wellbeing"
            className="glass-card p-5 rounded-3xl border border-white/10 hover:border-secondary/40 transition-all flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <span className="text-[10px] uppercase text-on-surface-variant font-semibold">Wellbeing Score</span>
              <span className="material-symbols-outlined text-secondary text-base">favorite</span>
            </div>
            <div className="my-2">
              <div className="text-2xl font-bold text-secondary">{worker.wellbeing.score}%</div>
              <span className="text-[10px] text-white/80">{worker.wellbeing.hoursToday}h logged today • Safe Rest Shield</span>
            </div>
            <div className="text-[10px] text-on-surface-variant/80 pt-2 border-t border-white/5">
              Zero penalty for taking rest
            </div>
          </Link>

          {/* Skill DNA */}
          <Link
            to="/worker/skills"
            className="glass-card p-5 rounded-3xl border border-white/10 hover:border-primary/40 transition-all flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <span className="text-[10px] uppercase text-on-surface-variant font-semibold">Skill DNA Index</span>
              <span className="material-symbols-outlined text-primary text-base">network_node</span>
            </div>
            <div className="my-2">
              <div className="text-2xl font-bold text-primary">{trustProfile.skillExecution}%</div>
              <span className="text-[10px] text-white/80">6 Master Verified Nodes</span>
            </div>
            <div className="text-[10px] text-on-surface-variant/80 pt-2 border-t border-white/5">
              Cryptographically audited
            </div>
          </Link>

          {/* Trust Profile */}
          <Link
            to="/worker/skills"
            className="glass-card p-5 rounded-3xl border border-white/10 hover:border-tertiary/40 transition-all flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <span className="text-[10px] uppercase text-on-surface-variant font-semibold">Composite Trust</span>
              <span className="material-symbols-outlined text-tertiary text-base">verified</span>
            </div>
            <div className="my-2">
              <div className="text-2xl font-bold text-tertiary">{trustProfile.overallTrust}%</div>
              <span className="text-[10px] text-white/80">Peer Trust: {trustProfile.peerTrust}%</span>
            </div>
            <div className="text-[10px] text-on-surface-variant/80 pt-2 border-t border-white/5">
              Zero safety violations • 4,860h safe
            </div>
          </Link>
        </div>

        {/* Worker Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 overflow-x-auto pb-2 scrollbar-none font-mono text-xs">
          {[
            { id: 'ops', label: "Today's Operations", icon: 'engineering', badge: todayJobs.length },
            { id: 'skills', label: 'Skill DNA & Trust', icon: 'radar', badge: `${trustProfile.overallTrust}%` },
            { id: 'wellbeing', label: 'Wellbeing & Rest Shield', icon: 'self_improvement', badge: 'Active' },
            { id: 'governance', label: 'Co-op Guild & Governance', icon: 'account_balance', badge: 'Vote Open' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                activeSubTab === tab.id
                  ? 'bg-primary/20 text-white font-bold border border-primary/40 shadow-[0_0_12px_rgba(173,198,255,0.2)]'
                  : 'text-on-surface-variant hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <span className="material-symbols-outlined text-base">{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="px-1.5 py-0.2 rounded-full bg-white/10 text-[10px]">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* SUBTAB 1: TODAY'S OPERATIONS */}
        {/* ========================================================================= */}
        {activeSubTab === 'ops' && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-sans font-bold text-xl text-white">Active Missions In Progress</h2>
                <p className="text-xs font-mono text-on-surface-variant mt-0.5">
                  Assigned missions adhering to your maximum daily workload cap ({worker.maxDailyWorkload} jobs/day).
                </p>
              </div>
              <span className="text-xs font-mono text-secondary">Sector 4 Radar Online</span>
            </div>

            {todayJobs.length === 0 ? (
              <div className="glass-card rounded-3xl p-12 text-center border border-white/10 font-mono">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">done_all</span>
                <h3 className="font-bold text-white text-base">All Daily Missions Concluded</h3>
                <p className="text-xs text-on-surface-variant mt-1">You are free to take rest or keep duty active for emergency calls.</p>
              </div>
            ) : (
              todayJobs.map((job) => (
                <div
                  key={job.id}
                  className="glass-card rounded-3xl p-6 md:p-8 border border-primary/30 shadow-2xl relative overflow-hidden space-y-6"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1 font-mono text-xs">
                        <span className="text-primary font-bold">{job.id}</span>
                        <span className="px-2 py-0.5 rounded bg-secondary/15 text-secondary border border-secondary/30 text-[10px]">
                          {job.status}
                        </span>
                        <span className="text-on-surface-variant text-[11px]">• {job.category}</span>
                      </div>
                      <h3 className="font-sans font-bold text-2xl text-white">{job.serviceTitle}</h3>
                      <div className="flex items-center gap-2 text-xs font-mono text-on-surface-variant mt-1">
                        <span className="material-symbols-outlined text-sm text-secondary">location_on</span>
                        <span className="text-white">{job.location}</span>
                        <span>({job.distance} • ETA {job.eta})</span>
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <div className="text-xs text-on-surface-variant">Guaranteed Labor Pay:</div>
                      <div className="text-2xl font-bold text-secondary">{job.guaranteedEarnings}</div>
                      <div className="text-[10px] text-on-surface-variant/80">Co-op: {job.coopAllocation}</div>
                    </div>
                  </div>

                  {/* Customer Information & Direct Contact */}
                  <div className="p-4 rounded-2xl bg-[#0e0e0f]/80 border border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono text-xs">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                        <span className="material-symbols-outlined">person</span>
                      </span>
                      <div>
                        <div className="font-bold text-white text-sm">{job.customerName}</div>
                        <div className="text-on-surface-variant text-[11px]">Verified Cooperative Member</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={`tel:${job.customerPhone}`}
                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-sm text-secondary">call</span>
                        <span>Call Customer</span>
                      </a>
                      <Link
                        to={`/worker/execute/${job.id}`}
                        className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-bold font-sans flex items-center gap-2 shadow-[0_0_15px_rgba(173,198,255,0.3)] hover:scale-105 transition-all"
                      >
                        <span className="material-symbols-outlined text-sm">construction</span>
                        <span>Launch On-Site Mission Suite</span>
                      </Link>
                    </div>
                  </div>

                  {/* Preliminary Diagnostic & Suggested Tools */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                      <span className="text-[10px] text-on-surface-variant uppercase font-semibold">
                        Customer Preliminary Intake
                      </span>
                      <div className="text-white font-bold">{job.preliminaryDiagnosis.probableProblem}</div>
                      <div className="text-on-surface-variant text-[11px] leading-relaxed">
                        Suspected Cause: {job.preliminaryDiagnosis.possibleIssue}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                      <span className="text-[10px] text-on-surface-variant uppercase font-semibold">
                        Recommended Diagnostic Tools
                      </span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {job.preliminaryDiagnosis.suggestedTools.map((tool, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-white/10 text-[11px] text-white">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* SUBTAB 2: SKILL DNA & TRUST PROFILE PREVIEW */}
        {/* ========================================================================= */}
        {activeSubTab === 'skills' && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-sans font-bold text-xl text-white">Cryptographic Skill DNA &amp; Trust</h2>
                <p className="text-xs font-mono text-on-surface-variant mt-0.5">
                  Proficiencies dynamically update from completed work, peer endorsements, and 5-star workmanship ratings.
                </p>
              </div>
              <Link to="/worker/skills" className="text-xs font-mono text-primary hover:underline">
                Open Full Interactive Radar →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {skillDNA.map((skill) => (
                <div
                  key={skill.id}
                  className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between gap-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-sans font-bold text-white text-sm">{skill.name}</div>
                      <div className="text-[10px] text-on-surface-variant mt-0.5">{skill.verifier}</div>
                    </div>
                    <span className="text-primary font-bold text-base">{skill.proficiency}%</span>
                  </div>

                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-700"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[10px] text-on-surface-variant pt-1 border-t border-white/5">
                    <span>Status: <strong className="text-secondary">{skill.status.replace('_', ' ')}</strong></span>
                    <span>{skill.endorsementsCount} Peer Endorsements</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SUBTAB 3: WELLBEING & REST SHIELD PREVIEW */}
        {/* ========================================================================= */}
        {activeSubTab === 'wellbeing' && (
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-6 font-mono text-xs animate-fade-in-up">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-sans font-bold text-xl text-white">Cooperative Anti-Burnout Shield</h2>
                <p className="text-on-surface-variant mt-0.5">
                  Automated cognitive and physical fatigue protection. Your dignity and health precede platform dispatch volume.
                </p>
              </div>
              <div className="text-right">
                <span className="text-secondary text-2xl font-bold">{worker.wellbeing.score}/100</span>
                <div className="text-[10px] text-on-surface-variant">Wellbeing Index</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-secondary/10 border border-secondary/30 text-secondary leading-relaxed">
              <strong>THE COOPERATIVE DIGNITY GUARANTEE:</strong> Taking scheduled rest or declining missions when fatigued 
              <strong> NEVER permanently damages your future matching priority or algorithm placement</strong>. 
              The system preserves your priority tier until you return refreshed.
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] uppercase text-on-surface-variant">Daily Hours</span>
                <div className="text-lg font-bold text-white mt-1">{worker.wellbeing.hoursToday} / 8.0h</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] uppercase text-on-surface-variant">Weekly Hours</span>
                <div className="text-lg font-bold text-white mt-1">{worker.wellbeing.hoursWeek} / 44.0h</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] uppercase text-on-surface-variant">Consecutive Days</span>
                <div className="text-lg font-bold text-white mt-1">{worker.wellbeing.consecutiveDays} Days (Max 6)</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] uppercase text-on-surface-variant">Late Night Shifts</span>
                <div className="text-lg font-bold text-secondary mt-1">{worker.wellbeing.lateNightTrips} this month</div>
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                to="/worker/wellbeing"
                className="px-5 py-2.5 rounded-xl bg-secondary hover:bg-secondary/90 text-[#003824] font-bold font-sans flex items-center gap-2"
              >
                <span>Open Full Wellbeing &amp; Welfare Desk</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SUBTAB 4: CO-OP GUILD & GOVERNANCE */}
        {/* ========================================================================= */}
        {activeSubTab === 'governance' && (
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-6 font-mono text-xs animate-fade-in-up">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                <span className="text-primary font-bold uppercase text-[10px]">Active Cooperative Ballot</span>
              </div>
              <h2 className="font-sans font-bold text-2xl text-white">Democratic Worker Assembly</h2>
              <p className="text-on-surface-variant mt-0.5">
                Vote on upcoming changes to hourly baseline tariffs, healthcare allocation, and apprentice mentorship stipends.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] text-primary uppercase font-bold">Proposal #UNV-DAO-104</span>
                  <h4 className="font-sans font-bold text-base text-white mt-0.5">
                    Increase Solar Inverter Emergency Base Pay by +15%
                  </h4>
                </div>
                <span className="text-secondary font-bold">Quorum: 84% Met</span>
              </div>
              <p className="text-on-surface-variant leading-relaxed">
                Adjusts standard 45-minute solar diagnostic base tariff from ₹1,200 to ₹1,380 to account for rising calibrated multimeter hardware costs.
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => alert('Voted AYE for Proposal #UNV-DAO-104 via Worker Key.')}
                  className="px-5 py-2 rounded-xl bg-secondary/20 hover:bg-secondary/30 text-secondary border border-secondary/40 font-bold"
                >
                  Vote AYE (Approve)
                </button>
                <button
                  onClick={() => alert('Voted NAY for Proposal #UNV-DAO-104.')}
                  className="px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-on-surface-variant border border-white/10"
                >
                  Vote NAY (Reject)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* INCOMING JOB OFFER MODAL (WITH ALGORITHMIC FAIRNESS EXPLANATION) */}
      {/* ========================================================================= */}
      {incomingOffer.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card rounded-3xl p-6 md:p-8 max-w-xl w-full border border-secondary/50 shadow-2xl space-y-5 animate-fade-in-up">
            <div className="flex justify-between items-start">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 border border-secondary/30 mb-2">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                  <span className="text-[10px] font-mono text-secondary font-bold uppercase tracking-wider">
                    Incoming Co-op Mission Offer
                  </span>
                </div>
                <h3 className="font-sans font-bold text-2xl text-white">{incomingOffer.serviceTitle}</h3>
                <span className="text-xs font-mono text-primary">{incomingOffer.category}</span>
              </div>
              <div className="text-right font-mono">
                <span className="text-[10px] text-on-surface-variant uppercase">Guaranteed Pay</span>
                <div className="text-2xl font-bold text-secondary">{incomingOffer.estimatedAmount}</div>
              </div>
            </div>

            {/* Key Mission Metadata */}
            <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-[#0e0e0f]/80 border border-white/5 font-mono text-xs">
              <div>
                <span className="text-[10px] text-on-surface-variant">Customer:</span>
                <div className="text-white font-bold truncate">{incomingOffer.customerName}</div>
              </div>
              <div>
                <span className="text-[10px] text-on-surface-variant">Distance &amp; ETA:</span>
                <div className="text-white font-bold">{incomingOffer.distance} ({incomingOffer.estimatedTime})</div>
              </div>
              <div>
                <span className="text-[10px] text-on-surface-variant">Location:</span>
                <div className="text-white font-bold truncate">{incomingOffer.location}</div>
              </div>
            </div>

            {/* WHY THIS JOB WAS MATCHED (Algorithmic Transparency) */}
            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 space-y-1 font-mono text-xs">
              <div className="flex items-center gap-1.5 text-primary font-bold">
                <span className="material-symbols-outlined text-sm">psychology</span>
                <span>Why You Were Matched (Algorithmic Transparency):</span>
              </div>
              <p className="text-on-surface-variant leading-relaxed">
                {incomingOffer.whyMatched}
              </p>
            </div>

            {/* FAIRNESS INFORMATION (No penalty guarantee) */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1 font-mono text-xs">
              <div className="flex items-center gap-1.5 text-secondary font-bold">
                <span className="material-symbols-outlined text-sm">balance</span>
                <span>Cooperative Fairness Information:</span>
              </div>
              <p className="text-on-surface-variant leading-relaxed text-[11px]">
                {incomingOffer.fairnessInfo}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2 font-mono">
              <button
                type="button"
                onClick={() => setIsDeclineModalOpen(true)}
                className="py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-on-surface-variant hover:text-white font-bold text-xs transition-all"
              >
                Decline (No Penalty)
              </button>
              <button
                type="button"
                onClick={acceptJobOffer}
                className="py-3.5 rounded-xl bg-secondary hover:bg-secondary/90 text-[#003824] font-bold text-xs font-sans flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(78,222,163,0.3)] transition-all hover:scale-[1.02]"
              >
                <span>Accept Mission</span>
                <span className="material-symbols-outlined text-sm">check</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Decline Reason Modal */}
      {isDeclineModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card rounded-3xl p-6 md:p-8 max-w-md w-full border border-white/15 shadow-2xl font-mono text-xs space-y-4">
            <h3 className="font-sans font-bold text-lg text-white">Decline Mission Protocol</h3>
            <p className="text-on-surface-variant">
              Declining will never penalize your standing. Please let the guild know why so another artisan can be dispatched:
            </p>

            <select
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              className="w-full bg-[#1c1b1c] border border-white/10 rounded-xl p-3 text-white text-xs"
            >
              <option value="Taking scheduled rest / break">Taking scheduled rest / break</option>
              <option value="Required tools not in transit kit">Required tools not in transit kit</option>
              <option value="Distance exceeds current battery/range">Distance exceeds current battery/range</option>
              <option value="Personal family emergency">Personal family emergency</option>
            </select>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setIsDeclineModalOpen(false)}
                className="flex-1 py-3 rounded-xl bg-white/5 text-white"
              >
                Back
              </button>
              <button
                onClick={handleExecuteDecline}
                className="flex-1 py-3 rounded-xl bg-white/20 text-white font-bold"
              >
                Confirm Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
