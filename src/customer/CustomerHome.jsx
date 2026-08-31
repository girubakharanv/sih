import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCustomer, SERVICE_ROOMS, LANGUAGES } from './CustomerContext';
import ShaderBackground from '../components/ShaderBackground';

export default function CustomerHome() {
  const navigate = useNavigate();
  const {
    customer,
    updateCustomer,
    activeJobs,
    historyJobs,
    payments,
    savedWorkers,
    removeSavedWorker,
    forcedState
  } = useCustomer();

  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'active' | 'history' | 'payments' | 'saved' | 'support'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoomFilter, setSelectedRoomFilter] = useState(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [newAddressLabel, setNewAddressLabel] = useState('New Site');
  const [newAddressText, setNewAddressText] = useState('');

  // Search filtering over service rooms
  const filteredRooms = SERVICE_ROOMS.filter(
    (room) =>
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Address switcher
  const handleSelectAddress = (addr) => {
    updateCustomer({
      currentLocation: {
        ...customer.currentLocation,
        address: addr.address
      },
      savedAddresses: customer.savedAddresses.map((a) => ({
        ...a,
        isDefault: a.id === addr.id
      }))
    });
    setIsAddressModalOpen(false);
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddressText.trim()) return;
    const newAddr = {
      id: `addr-${Date.now()}`,
      label: newAddressLabel,
      address: newAddressText,
      isDefault: false
    };
    updateCustomer({
      savedAddresses: [...customer.savedAddresses, newAddr]
    });
    setNewAddressText('');
  };

  // Check forced testing state
  const isLoading = forcedState === 'loading';
  const isEmpty = forcedState === 'empty';

  return (
    <div className="w-full min-h-screen relative bg-background text-on-background selection:bg-primary selection:text-on-primary">
      <ShaderBackground className="fixed inset-0 z-0 opacity-25 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full min-h-screen pt-28 px-4 md:px-10 max-w-7xl mx-auto pb-28 flex flex-col gap-8">
        {/* Top Customer Header with Location & Language */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <img
              src={customer.avatar}
              alt={customer.name}
              className="w-14 h-14 rounded-2xl object-cover border border-white/15 shadow-xl"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-sans font-bold text-2xl text-white">
                  Welcome, {customer.name}
                </h1>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                  {customer.id}
                </span>
              </div>

              {/* Active Address Pill */}
              <button
                onClick={() => setIsAddressModalOpen(true)}
                className="flex items-center gap-1.5 text-xs font-mono text-on-surface-variant hover:text-white mt-1 transition-colors group"
              >
                <span className="material-symbols-outlined text-secondary text-sm group-hover:scale-110 transition-transform">
                  location_on
                </span>
                <span className="underline underline-offset-2 max-w-md truncate">
                  {customer.currentLocation.address}
                </span>
                <span className="material-symbols-outlined text-xs">arrow_drop_down</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Multi-language Selector */}
            <div className="flex items-center gap-1 bg-[#1c1b1c] p-1 rounded-xl border border-white/10 text-xs font-mono">
              <span className="material-symbols-outlined text-base text-on-surface-variant pl-1">
                translate
              </span>
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => updateCustomer({ selectedLanguage: lang.code })}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    customer.selectedLanguage === lang.code
                      ? 'bg-primary/20 text-primary font-bold border border-primary/30'
                      : 'text-on-surface-variant hover:text-white'
                  }`}
                  title={lang.name}
                >
                  {lang.native}
                </button>
              ))}
            </div>

            {/* Quick Request Button */}
            <Link
              to="/customer/request"
              className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-sans font-bold text-xs shadow-[0_0_15px_rgba(173,198,255,0.3)] transition-all flex items-center gap-2 hover:scale-105"
            >
              <span className="material-symbols-outlined text-base">add_circle</span>
              <span>Request Service</span>
            </Link>
          </div>
        </div>

        {/* Extraordinary 60-Second Hero Narrative Showcase */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-primary/30 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 shadow-2xl relative overflow-hidden animate-fade-in-up">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 mb-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-mono text-primary uppercase tracking-widest font-bold">
                  UNIVO Platform Manifesto
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-sans font-bold text-white tracking-tight">
                One Platform for India's Distributed Workforce
              </h2>
              <p className="text-xs font-mono text-on-surface-variant max-w-3xl mt-1 leading-relaxed">
                Transforming informal gig labor into a sovereign artisan cooperative. Every service request runs through strict qualification gates, explainable fair dispatch, and a cryptographic tamper-evident ledger.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                to="/hub"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs border border-white/10 transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">view_in_ar</span>
                <span>Enter 3D World</span>
              </Link>
              <Link
                to="/engine"
                className="px-4 py-2 rounded-xl bg-secondary/20 hover:bg-secondary/30 text-secondary font-mono text-xs border border-secondary/40 transition-all flex items-center gap-1.5 font-bold"
              >
                <span className="material-symbols-outlined text-sm">psychology</span>
                <span>AI Sandbox</span>
              </Link>
            </div>
          </div>

          {/* 4 Key Pillar Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 font-mono text-xs">
            <div className="p-3 rounded-xl bg-black/30 border border-white/5 space-y-1">
              <span className="text-[10px] text-primary uppercase font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">verified</span> Verified Passport
              </span>
              <p className="text-[11px] text-white">Sovereign DID + Skill DNA radar</p>
            </div>

            <div className="p-3 rounded-xl bg-black/30 border border-white/5 space-y-1">
              <span className="text-[10px] text-secondary uppercase font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">alt_route</span> Fair Dispatch
              </span>
              <p className="text-[11px] text-white">Safety gated + Gini equity index</p>
            </div>

            <div className="p-3 rounded-xl bg-black/30 border border-white/5 space-y-1">
              <span className="text-[10px] text-tertiary uppercase font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">receipt_long</span> Hash Ledger
              </span>
              <p className="text-[11px] text-white">SHA-256 transparent 6-way split</p>
            </div>

            <div className="p-3 rounded-xl bg-black/30 border border-white/5 space-y-1">
              <span className="text-[10px] text-white uppercase font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">how_to_vote</span> Democracy
              </span>
              <p className="text-[11px] text-white">AI What-If + Worker voting</p>
            </div>
          </div>
        </div>

        {/* 3 Entry Mode Request Banner */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 mb-2">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="text-[10px] font-mono text-secondary uppercase tracking-widest font-semibold">
                  Multi-Modal Dispatch Engine
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white font-sans">
                How would you like to describe your problem?
              </h2>
              <p className="text-xs text-on-surface-variant font-mono mt-1">
                Choose any medium — our cooperative AI parses visual, acoustic, and textual semantics.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* PHOTO ENTRY */}
            <Link
              to="/customer/request?mode=photo"
              className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-primary/50 transition-all group hover:scale-[1.02] flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-4 group-hover:glow-active transition-all">
                  <span className="material-symbols-outlined text-2xl">photo_camera</span>
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="font-sans font-bold text-white text-base">1. Photo AI Diagnostic</h3>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/15 text-primary">Vision</span>
                </div>
                <p className="text-xs text-on-surface-variant font-mono mt-1.5 leading-relaxed">
                  Snap or upload a photo. AI detects problem, category, urgency, and estimated cost range instantly.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-primary group-hover:translate-x-1 transition-transform">
                <span>Snap or Upload</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </Link>

            {/* VOICE ENTRY */}
            <Link
              to="/customer/request?mode=voice"
              className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-secondary/50 transition-all group hover:scale-[1.02] flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 border border-secondary/30 flex items-center justify-center text-secondary mb-4 group-hover:glow-emerald transition-all">
                  <span className="material-symbols-outlined text-2xl">mic</span>
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="font-sans font-bold text-white text-base">2. Voice Intake</h3>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-secondary/15 text-secondary">Indian Langs</span>
                </div>
                <p className="text-xs text-on-surface-variant font-mono mt-1.5 leading-relaxed">
                  Speak naturally in <strong>Tamil, Hindi, or English</strong>. AI extracts intent, urgency, and creates a structured job.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-secondary group-hover:translate-x-1 transition-transform">
                <span>Start Speaking</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </Link>

            {/* TEXT ENTRY */}
            <Link
              to="/customer/request?mode=text"
              className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-tertiary/50 transition-all group hover:scale-[1.02] flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-tertiary/10 border border-tertiary/30 flex items-center justify-center text-tertiary mb-4 group-hover:glow-gold transition-all">
                  <span className="material-symbols-outlined text-2xl">edit_note</span>
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="font-sans font-bold text-white text-base">3. Text Narrative</h3>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-tertiary/15 text-tertiary">NLP Stream</span>
                </div>
                <p className="text-xs text-on-surface-variant font-mono mt-1.5 leading-relaxed">
                  Describe what you need in plain text. AI isolates required Skill DNA, preferred schedule, and location.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-tertiary group-hover:translate-x-1 transition-transform">
                <span>Describe Issue</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Customer Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 overflow-x-auto pb-2 scrollbar-none font-mono text-xs">
          {[
            { id: 'explore', label: 'Explore Service Rooms', icon: 'view_in_ar', badge: '18' },
            { id: 'active', label: 'Active In-Flight Jobs', icon: 'sync', badge: activeJobs.length },
            { id: 'history', label: 'Service History', icon: 'history', badge: historyJobs.length },
            { id: 'payments', label: 'Payments & Ledger', icon: 'account_balance_wallet', badge: null },
            { id: 'saved', label: 'Saved Workers', icon: 'bookmark', badge: savedWorkers.length },
            { id: 'support', label: 'Cooperative Support', icon: 'support_agent', badge: '24/7' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary/20 text-white font-bold border border-primary/40 shadow-[0_0_12px_rgba(173,198,255,0.2)]'
                  : 'text-on-surface-variant hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <span className="material-symbols-outlined text-base">{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.badge !== null && (
                <span className="px-1.5 py-0.2 rounded-full bg-white/10 text-[10px]">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* TAB CONTENT: 1. EXPLORE ROOMS & UNIVERSAL SEARCH */}
        {activeTab === 'explore' && (
          <div className="space-y-6 animate-fade-in-up">
            {/* Universal Search Bar */}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search over 100+ cooperative services (e.g. MCB Tripping, Leak Repair, HVAC, Solar, Garden)..."
                className="w-full bg-[#1c1b1c]/80 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm text-white placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary font-sans shadow-xl"
              />
            </div>

            {/* 18-Room Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {filteredRooms.map((room) => (
                <Link
                  key={room.id}
                  to={`/customer/request?room=${encodeURIComponent(room.name)}`}
                  className="glass-card p-4 rounded-2xl border border-white/10 hover:border-primary/50 transition-all group hover:scale-[1.03] flex flex-col justify-between h-36"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: `${room.color}33`, border: `1px solid ${room.color}66` }}
                    >
                      <span className="material-symbols-outlined text-lg" style={{ color: room.color }}>
                        {room.icon}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-on-surface-variant/60">
                      {room.code}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-sans font-bold text-xs text-white group-hover:text-primary transition-colors leading-tight">
                      {room.name}
                    </h4>
                    <p className="text-[10px] font-mono text-on-surface-variant/80 mt-1">
                      {room.count}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT: 2. ACTIVE IN-FLIGHT JOBS */}
        {activeTab === 'active' && (
          <div className="space-y-4 animate-fade-in-up">
            {isEmpty || activeJobs.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 text-center border border-white/10">
                <span className="material-symbols-outlined text-5xl text-on-surface-variant/40 mb-3">
                  pending_actions
                </span>
                <h3 className="font-sans font-bold text-lg text-white">No Active Jobs In Flight</h3>
                <p className="text-xs font-mono text-on-surface-variant mt-1 max-w-sm mx-auto">
                  All your requested service protocols have concluded. Request a new service anytime.
                </p>
                <Link
                  to="/customer/request"
                  className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  <span>Initialize New Job</span>
                </Link>
              </div>
            ) : (
              activeJobs.map((job) => (
                <div
                  key={job.id}
                  className="glass-card rounded-3xl p-6 md:p-8 border border-primary/30 shadow-2xl relative overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-secondary animate-ping"></div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-primary font-bold">{job.id}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary/15 text-secondary border border-secondary/30">
                            {job.status}
                          </span>
                        </div>
                        <h3 className="font-sans font-bold text-xl text-white mt-1">
                          {job.serviceName}
                        </h3>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-mono text-lg font-bold text-secondary">
                        ETA {job.etaMinutes} mins
                      </div>
                      <div className="text-xs text-on-surface-variant font-mono">
                        Estimated: {job.estimatedDuration}
                      </div>
                    </div>
                  </div>

                  {/* Assigned Worker Header */}
                  {job.worker && (
                    <div className="p-4 rounded-2xl bg-[#0e0e0f]/80 border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={job.worker.avatar}
                          alt={job.worker.name}
                          className="w-12 h-12 rounded-xl object-cover border border-white/10"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-sans font-bold text-sm text-white">
                              {job.worker.name}
                            </span>
                            <span className="material-symbols-outlined text-secondary text-sm" title="Verified">
                              verified
                            </span>
                          </div>
                          <p className="text-xs font-mono text-on-surface-variant">
                            {job.worker.role}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-mono">
                        <div>
                          <span className="text-on-surface-variant">Trust Score:</span>
                          <span className="text-secondary font-bold ml-1">{job.worker.trustScore}%</span>
                        </div>
                        <Link
                          to={`/customer/tracking/${job.id}`}
                          className="px-4 py-2 rounded-xl bg-primary text-on-primary font-bold flex items-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-sm">near_me</span>
                          <span>Open Live Tracker</span>
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Preliminary Diagnosis Notice */}
                  <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 flex items-start gap-2.5 text-xs font-mono text-primary mb-4">
                    <span className="material-symbols-outlined text-sm mt-0.5">info</span>
                    <div>
                      <span className="font-bold uppercase tracking-wider">Preliminary AI Diagnosis: </span>
                      <span className="text-on-surface-variant">
                        {job.preliminaryDiagnosis.probableProblem}. Final assessment by worker upon on-site physical inspection.
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB CONTENT: 3. SERVICE HISTORY */}
        {activeTab === 'history' && (
          <div className="space-y-4 animate-fade-in-up">
            {historyJobs.map((job) => (
              <div
                key={job.id}
                className="glass-card rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined">task_alt</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-on-surface-variant">{job.id}</span>
                      <span className="font-mono text-[10px] text-secondary">● {job.status}</span>
                      <span className="text-xs text-on-surface-variant/70 font-mono">• {job.completedAt}</span>
                    </div>
                    <h4 className="font-sans font-bold text-white text-base mt-0.5">{job.serviceName}</h4>
                    <p className="text-xs font-mono text-on-surface-variant mt-0.5">
                      Served by {job.worker.name} • Rated {job.rating} ★
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-white text-sm">{job.totalPaid}</span>
                  <Link
                    to={`/customer/request?rebook=${job.worker.id}`}
                    className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono border border-white/10"
                  >
                    Rebook Worker
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB CONTENT: 4. PAYMENTS & LEDGER */}
        {activeTab === 'payments' && (
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <div>
                <h3 className="font-sans font-bold text-lg text-white">Cooperative Transparent Ledger</h3>
                <p className="text-xs text-on-surface-variant font-mono mt-0.5">
                  Itemized settlements with zero hidden charges. 5% allocated to worker welfare community pools.
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-on-surface-variant">Member Credit:</span>
                <div className="text-xl font-bold font-mono text-secondary">₹4,250 (320 UNV)</div>
              </div>
            </div>

            <div className="space-y-3">
              {payments.map((txn) => (
                <div
                  key={txn.id}
                  className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between font-mono text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">receipt_long</span>
                    <div>
                      <div className="text-white font-semibold">{txn.desc}</div>
                      <div className="text-[11px] text-on-surface-variant/70">
                        {txn.id} • {txn.date} • via {txn.method}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white text-sm">{txn.amount}</div>
                    <div className="text-[10px] text-secondary">{txn.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT: 5. SAVED WORKERS */}
        {activeTab === 'saved' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-up">
            {savedWorkers.map((worker) => (
              <div
                key={worker.id}
                className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col justify-between gap-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={worker.avatar}
                      alt={worker.name}
                      className="w-12 h-12 rounded-xl object-cover border border-white/10"
                    />
                    <div>
                      <div className="font-sans font-bold text-white text-sm">{worker.name}</div>
                      <div className="text-xs font-mono text-on-surface-variant">{worker.role}</div>
                      <div className="text-[11px] font-mono text-secondary mt-0.5">
                        Trust Score: {worker.trustScore}% • {worker.experience}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeSavedWorker(worker.id)}
                    className="text-on-surface-variant hover:text-error text-sm"
                    title="Remove from saved"
                  >
                    <span className="material-symbols-outlined">bookmark_remove</span>
                  </button>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs font-mono">
                  <span className="text-on-surface-variant">Langs: {worker.languages.join(', ')}</span>
                  <Link
                    to={`/customer/request?workerId=${worker.id}`}
                    className="px-3.5 py-1.5 rounded-lg bg-primary text-on-primary font-bold text-xs"
                  >
                    Direct Dispatch
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB CONTENT: 6. COOPERATIVE SUPPORT */}
        {activeTab === 'support' && (
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-6 animate-fade-in-up">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                <span className="font-mono text-xs text-primary font-semibold">24/7 Cooperative Concierge</span>
              </div>
              <h3 className="font-sans font-bold text-2xl text-white">Emergency &amp; Service Resolution Desk</h3>
              <p className="text-xs text-on-surface-variant font-mono mt-1">
                Direct hotline to regional cooperative managers, ombudsman, and instant emergency dispatch.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-panel p-5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-secondary text-2xl">call</span>
                  <h4 className="font-sans font-bold text-white text-sm">Emergency SOS Dispatch Hotline</h4>
                </div>
                <p className="text-xs text-on-surface-variant font-mono mb-4">
                  For gas leaks, structural collapse, or high-voltage fire hazards. Priority response under 7 minutes.
                </p>
                <a
                  href="tel:1800-UNIVO-SOS"
                  className="px-4 py-2 rounded-xl bg-secondary/20 hover:bg-secondary/30 text-secondary font-mono text-xs font-bold border border-secondary/30 inline-block"
                >
                  Call 1800-UNIVO-SOS
                </a>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-primary text-2xl">chat</span>
                  <h4 className="font-sans font-bold text-white text-sm">AI Concierge &amp; Dispute Ombudsman</h4>
                </div>
                <p className="text-xs text-on-surface-variant font-mono mb-4">
                  Report discrepancies, pricing audits, or reschedule ongoing service dispatches.
                </p>
                <button
                  onClick={() => alert('Cooperative AI Concierge connected. Ready to assist.')}
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-bold text-xs"
                >
                  Launch Live Chat
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Address Switcher & Management Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card rounded-3xl p-6 md:p-8 max-w-lg w-full border border-white/15 shadow-2xl animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-sans font-bold text-lg text-white">Saved Service Addresses</h3>
              <button
                onClick={() => setIsAddressModalOpen(false)}
                className="text-on-surface-variant hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3 mb-6">
              {customer.savedAddresses.map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => handleSelectAddress(addr)}
                  className={`p-3.5 rounded-xl border text-xs font-mono cursor-pointer transition-all flex items-center justify-between ${
                    addr.isDefault
                      ? 'bg-primary/20 border-primary text-white shadow-[0_0_12px_rgba(173,198,255,0.2)]'
                      : 'bg-white/5 border-white/10 text-on-surface-variant hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-base">
                      {addr.label.toLowerCase().includes('home') ? 'home' : 'apartment'}
                    </span>
                    <div>
                      <div className="font-bold text-white">{addr.label}</div>
                      <div className="text-[11px] opacity-80 mt-0.5">{addr.address}</div>
                    </div>
                  </div>
                  {addr.isDefault && (
                    <span className="text-[10px] text-primary font-bold uppercase">Active</span>
                  )}
                </div>
              ))}
            </div>

            {/* Add New Address Form */}
            <form onSubmit={handleAddAddress} className="pt-4 border-t border-white/10 space-y-3">
              <div className="font-mono text-xs text-on-surface-variant font-semibold">
                Add New Delivery Location
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newAddressLabel}
                  onChange={(e) => setNewAddressLabel(e.target.value)}
                  placeholder="Label (e.g. Factory Site)"
                  className="bg-[#1c1b1c] border border-white/10 rounded-xl px-3 py-2 text-xs text-white w-1/3"
                />
                <input
                  type="text"
                  value={newAddressText}
                  onChange={(e) => setNewAddressText(e.target.value)}
                  placeholder="Full street address & pincode"
                  className="bg-[#1c1b1c] border border-white/10 rounded-xl px-3 py-2 text-xs text-white flex-1"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold border border-white/15"
              >
                + Save Address
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
