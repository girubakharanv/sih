import React, { useState } from 'react';
import ShaderBackground from './components/ShaderBackground';

const WorkerDiscovery = () => {
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState('confidence');
  const [activeSector, setActiveSector] = useState('Sector Gamma-9');
  const [assignedToast, setAssignedToast] = useState(null);

  const workers = [
    {
      id: 'NODE-7429',
      name: 'Dr. Evelyn Cross',
      role: 'Cybernetic Systems Integrator',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      matchConfidence: 98.4,
      trustScore: 99.2,
      proximity: '1.2 km',
      skills: ['Neural Architecture', 'Grid Synapse', 'Autonomous Edge'],
      wellbeing: '100% Optimal',
      available: true
    },
    {
      id: 'NODE-9104',
      name: 'Marcus Vance',
      role: 'Heavy Robotic Dispatch Operative',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      matchConfidence: 96.1,
      trustScore: 97.8,
      proximity: '2.8 km',
      skills: ['Telemetry Diagnostics', 'Hydraulic Rigging', 'Power Array'],
      wellbeing: '96% Healthy',
      available: true
    },
    {
      id: 'NODE-3851',
      name: 'Sora Tanaka',
      role: 'Bio-Telemetry & Sanitation Lead',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      matchConfidence: 94.7,
      trustScore: 98.9,
      proximity: '0.6 km',
      skills: ['Biosecurity', 'Environmental Cleanse', 'Water Filtering'],
      wellbeing: '98% Balanced',
      available: false
    },
    {
      id: 'NODE-6122',
      name: 'Aaron Kaelen',
      role: 'Smart Grid & Renewable Storage Eng.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      matchConfidence: 92.5,
      trustScore: 99.5,
      proximity: '3.4 km',
      skills: ['Solar Microgrid', 'Inverter Sync', 'Thermal Recoup'],
      wellbeing: '99% Optimal',
      available: true
    }
  ];

  const filteredWorkers = workers
    .filter((w) =>
      w.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      w.role.toLowerCase().includes(filterQuery.toLowerCase()) ||
      w.skills.some((s) => s.toLowerCase().includes(filterQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (selectedSort === 'confidence') return b.matchConfidence - a.matchConfidence;
      if (selectedSort === 'trust') return b.trustScore - a.trustScore;
      return parseFloat(a.proximity) - parseFloat(b.proximity);
    });

  const handleAssign = (worker) => {
    setAssignedToast(`Assigned ${worker.name} (${worker.id}) to current dispatch queue.`);
    setTimeout(() => setAssignedToast(null), 4000);
  };

  return (
    <div className="w-full min-h-screen relative bg-background text-on-background selection:bg-primary selection:text-on-primary">
      {/* Background WebGL Shader */}
      <ShaderBackground className="fixed inset-0 z-0 opacity-30 pointer-events-none" />

      {/* Toast Notification */}
      {assignedToast && (
        <div className="fixed bottom-6 right-6 z-50 glass-card px-5 py-3 rounded-2xl border border-secondary/40 bg-secondary/10 flex items-center gap-3 text-secondary font-mono text-xs shadow-2xl animate-fade-in-up">
          <span className="material-symbols-outlined">check_circle</span>
          <span>{assignedToast}</span>
        </div>
      )}

      <main className="relative z-10 w-full min-h-screen pt-28 px-4 md:px-12 max-w-7xl mx-auto pb-24 flex flex-col gap-8">
        {/* Header & Filter Bar */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-5 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-mono text-xs text-primary uppercase tracking-widest font-semibold">
                Neural Talent Radar
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight">
              Worker Discovery & Intelligence Feed
            </h1>
            <p className="font-mono text-xs text-on-surface-variant/80 mt-1">
              Live matching algorithm with cooperative fairness index and automated skill DNA parsing
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base">
                search
              </span>
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Filter by name, skill, or role..."
                className="bg-[#1c1b1c]/80 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary w-60"
              />
            </div>

            {/* Sort Toggles */}
            <div className="flex bg-[#0e0e0f]/80 p-1 rounded-xl border border-white/10 text-xs font-mono">
              <button
                onClick={() => setSelectedSort('confidence')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedSort === 'confidence' ? 'bg-primary/20 text-primary font-bold border border-primary/30' : 'text-on-surface-variant hover:text-white'
                }`}
              >
                Match %
              </button>
              <button
                onClick={() => setSelectedSort('trust')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedSort === 'trust' ? 'bg-primary/20 text-primary font-bold border border-primary/30' : 'text-on-surface-variant hover:text-white'
                }`}
              >
                Trust Score
              </button>
              <button
                onClick={() => setSelectedSort('proximity')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedSort === 'proximity' ? 'bg-primary/20 text-primary font-bold border border-primary/30' : 'text-on-surface-variant hover:text-white'
                }`}
              >
                Proximity
              </button>
            </div>
          </div>
        </header>

        {/* Two Column Layout: Radar Visualization & Worker Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Spatial Radar Screen */}
          <section className="lg:col-span-5 glass-card rounded-2xl p-6 border border-white/10 relative overflow-hidden flex flex-col justify-between h-[520px]">
            <div className="flex items-center justify-between z-10">
              <div className="font-mono text-xs text-secondary bg-secondary/10 px-2.5 py-1 rounded-lg inline-flex items-center gap-2 border border-secondary/20 font-semibold">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span>Active Sector: {activeSector}</span>
              </div>
              <span className="font-mono text-xs text-primary">1,402 Active Nodes</span>
            </div>

            {/* Concentric Radar Rings Graphic */}
            <div className="relative w-full h-[280px] flex items-center justify-center my-4">
              <div className="w-[280px] h-[280px] rounded-full border border-primary/20 border-dashed animate-[spin_60s_linear_infinite] absolute"></div>
              <div className="w-[190px] h-[190px] rounded-full border border-secondary/20 absolute"></div>
              <div className="w-[100px] h-[100px] rounded-full border border-tertiary/30 border-dashed absolute animate-[spin_40s_linear_infinite_reverse]"></div>
              <div className="w-3 h-3 rounded-full bg-primary animate-ping absolute"></div>

              {/* Node blips on radar */}
              <div
                onClick={() => setActiveSector('Sector Gamma-9 (Dr. Cross)')}
                className="w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_rgba(173,198,255,0.9)] absolute top-12 left-16 cursor-pointer hover:scale-150 transition-transform"
                title="Node 7429 - Cross"
              ></div>
              <div
                onClick={() => setActiveSector('Sector Delta-3 (Marcus Vance)')}
                className="w-3.5 h-3.5 rounded-full bg-secondary shadow-[0_0_12px_rgba(78,222,163,0.9)] absolute bottom-14 right-20 cursor-pointer hover:scale-150 transition-transform"
                title="Node 9104 - Vance"
              ></div>
              <div
                onClick={() => setActiveSector('Sector Alpha-1 (Sora Tanaka)')}
                className="w-3.5 h-3.5 rounded-full bg-tertiary shadow-[0_0_12px_rgba(255,185,95,0.9)] absolute top-24 right-14 cursor-pointer hover:scale-150 transition-transform"
                title="Node 3851 - Tanaka"
              ></div>
            </div>

            {/* Radar Telemetry Summary */}
            <div className="glass-hud p-4 rounded-xl border border-white/10 flex items-center justify-between text-xs font-mono z-10">
              <div>
                <div className="text-on-surface-variant">Fair Pay Dispersion:</div>
                <div className="text-white font-bold text-sm">99.4% Equitable</div>
              </div>
              <div>
                <div className="text-on-surface-variant">Wellbeing Index:</div>
                <div className="text-secondary font-bold text-sm">98.1% Safe</div>
              </div>
            </div>
          </section>

          {/* Right Column: Worker Cards List */}
          <section className="lg:col-span-7 flex flex-col gap-4">
            {filteredWorkers.map((worker) => (
              <div
                key={worker.id}
                className="glass-card rounded-2xl p-6 border border-white/10 hover:border-primary/40 transition-all duration-300 group"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={worker.avatar}
                      alt={worker.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-white/10 group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-sans font-bold text-lg text-white group-hover:text-primary transition-colors">
                          {worker.name}
                        </h3>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-on-surface-variant">
                          {worker.id}
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant font-mono">{worker.role}</p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-end gap-1">
                    <span className="font-mono text-base font-bold text-secondary">{worker.matchConfidence}% Match</span>
                    <span className="text-[11px] font-mono text-on-surface-variant/80">Trust: {worker.trustScore}% • {worker.proximity}</span>
                  </div>
                </div>

                {/* Skill DNA Badges */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {worker.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                  <span className="text-xs font-mono px-3 py-1 rounded-lg bg-secondary/10 border border-secondary/20 text-secondary">
                    {worker.wellbeing}
                  </span>
                </div>

                {/* Card Action Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        worker.available ? 'bg-secondary animate-pulse' : 'bg-on-surface-variant'
                      }`}
                    ></span>
                    <span className="text-on-surface-variant">
                      {worker.available ? 'Available for Quantum Dispatch' : 'Occupied with Task'}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAssign(worker)}
                    disabled={!worker.available}
                    className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_12px_rgba(173,198,255,0.2)] hover:scale-105 active:scale-95"
                  >
                    Assign Protocol
                  </button>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
};

export default WorkerDiscovery;
