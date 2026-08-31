import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ShaderBackground from './components/ShaderBackground';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [governanceVotes, setGovernanceVotes] = useState([
    { id: 1, title: 'Protocol Update 2.4a', time: '04:22:10 remaining', status: 'Voting Active', voted: false },
    { id: 2, title: 'Worker Fairness Multiplier Bump', time: '12:05:40 remaining', status: 'Quorum Reached', voted: true }
  ]);

  const toggleVote = (id) => {
    setGovernanceVotes((prev) =>
      prev.map((v) => (v.id === id ? { ...v, voted: !v.voted } : v))
    );
  };

  return (
    <div className="w-full min-h-screen relative bg-background text-on-background selection:bg-primary selection:text-on-primary">
      {/* Background Ambient Glows & WebGL Shader */}
      <ShaderBackground className="fixed inset-0 z-0 opacity-25 pointer-events-none" />
      <div className="fixed top-0 left-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-1/3 h-1/3 bg-secondary/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative z-10 w-full min-h-screen pt-28 px-4 md:px-12 max-w-7xl mx-auto pb-24 flex flex-col gap-8">
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold text-lg">
              A
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-sans font-bold text-2xl md:text-3xl text-white tracking-tight">
                  Aetheris Cooperative Ops
                </h1>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-secondary/10 text-secondary border border-secondary/30">
                  SYSTEM OPTIMAL
                </span>
              </div>
              <p className="font-mono text-xs text-on-surface-variant/80 mt-0.5">
                Role: Chief Operations Commander • ID: #USR-9921
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/request"
              className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-sans font-bold text-xs shadow-[0_0_15px_rgba(173,198,255,0.3)] transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">bolt</span>
              <span>Deploy New Task</span>
            </Link>
            <Link
              to="/hub"
              className="px-4 py-2.5 rounded-xl glass-panel hover:bg-white/10 text-white font-sans text-xs border border-white/10 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">view_in_ar</span>
              <span>Enter 3D Hub</span>
            </Link>
          </div>
        </div>

        {/* 4 Quick Stat Metric Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-card p-5 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between text-on-surface-variant text-xs font-mono mb-2">
              <span>ACTIVE WORKERS</span>
              <span className="material-symbols-outlined text-primary text-base">engineering</span>
            </div>
            <div className="font-sans font-bold text-3xl text-white">4,821</div>
            <div className="text-secondary text-xs font-mono mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">trending_up</span>
              <span>+12% vs last week</span>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between text-on-surface-variant text-xs font-mono mb-2">
              <span>SYSTEM THROUGHPUT</span>
              <span className="material-symbols-outlined text-secondary text-base">speed</span>
            </div>
            <div className="font-sans font-bold text-3xl text-white">94.8 <span className="text-sm text-on-surface-variant font-mono">TB/s</span></div>
            <div className="text-primary text-xs font-mono mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">check</span>
              <span>12ms quantum latency</span>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between text-on-surface-variant text-xs font-mono mb-2">
              <span>COOP FAIRNESS INDEX</span>
              <span className="material-symbols-outlined text-tertiary text-base">balance</span>
            </div>
            <div className="font-sans font-bold text-3xl text-white">99.4%</div>
            <div className="text-secondary text-xs font-mono mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">verified</span>
              <span>Autonomous compliance</span>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between text-on-surface-variant text-xs font-mono mb-2">
              <span>WORKFORCE HEALTH</span>
              <span className="material-symbols-outlined text-secondary text-base">vital_signs</span>
            </div>
            <div className="font-sans font-bold text-3xl text-white">88%</div>
            <div className="text-secondary text-xs font-mono mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">favorite</span>
              <span>Zero fatigue flags</span>
            </div>
          </div>
        </div>

        {/* Central Intelligence Loop: Node Topology Map & Predictive Demand */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Node Topology Canvas */}
          <div className="lg:col-span-8 glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-sans font-bold text-white text-lg flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">hub</span>
                  <span>Cooperative Node Network Topology</span>
                </h3>
                <p className="font-mono text-xs text-on-surface-variant/80 mt-0.5">
                  Real-time neural mesh routing across municipal sectors
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span>MESH SYNC</span>
              </div>
            </div>

            {/* Simulated Dynamic SVG Network Map */}
            <div className="relative w-full h-56 my-4 flex items-center justify-center">
              <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 200">
                <defs>
                  <radialGradient cx="50%" cy="50%" id="nodeGlow2" r="50%">
                    <stop offset="0%" stopColor="#adc6ff" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#adc6ff" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <path className="animate-pulse" d="M 50 100 Q 150 50, 200 100 T 350 100" fill="none" stroke="rgba(173, 198, 255, 0.3)" strokeWidth="1.5" />
                <path d="M 100 150 Q 200 180, 250 120 T 380 150" fill="none" stroke="rgba(78, 222, 163, 0.3)" strokeWidth="1.5" />
                <path d="M 80 50 Q 250 20, 300 80" fill="none" stroke="rgba(255, 185, 95, 0.25)" strokeDasharray="4 4" strokeWidth="1" />

                <circle cx="50" cy="100" fill="#adc6ff" r="5" />
                <circle className="animate-ping" cx="50" cy="100" fill="url(#nodeGlow2)" r="12" />
                <circle cx="200" cy="100" fill="#adc6ff" r="7" />
                <circle cx="350" cy="100" fill="#4edea3" r="4" />
                <circle cx="100" cy="150" fill="#4edea3" r="5" />
                <circle cx="250" cy="120" fill="#adc6ff" r="6" />
                <circle cx="380" cy="150" fill="#ffb95f" r="4" />
                <circle cx="80" cy="50" fill="#adc6ff" r="4" />
                <circle cx="300" cy="80" fill="#4edea3" r="5" />
              </svg>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5 font-mono text-xs">
              <div>
                <div className="text-on-surface-variant">ACTIVE SECTORS</div>
                <div className="text-white font-bold text-base mt-0.5">18 Rooms</div>
              </div>
              <div>
                <div className="text-on-surface-variant">AUTO-CALIBRATION</div>
                <div className="text-secondary font-bold text-base mt-0.5">99.8% Success</div>
              </div>
              <div>
                <div className="text-on-surface-variant">PEAK LOAD</div>
                <div className="text-tertiary font-bold text-base mt-0.5">Optimal Band</div>
              </div>
            </div>
          </div>

          {/* Governance & Realtime Action Panel */}
          <div className="lg:col-span-4 glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-sans font-bold text-white text-base flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-lg">gavel</span>
                  <span>Cooperative Governance</span>
                </h3>
                <span className="font-mono text-xs text-tertiary px-2 py-0.5 rounded bg-tertiary/10 border border-tertiary/20">
                  DAO VOTE
                </span>
              </div>
              <p className="font-mono text-xs text-on-surface-variant mb-4">
                Decentralized decision loops for worker rights and tax distributions.
              </p>

              <div className="space-y-3">
                {governanceVotes.map((vote) => (
                  <div
                    key={vote.id}
                    className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-primary/40 transition-all flex flex-col gap-2"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-sans font-semibold text-xs text-white">{vote.title}</span>
                      <span className="font-mono text-[10px] text-secondary">{vote.status}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-mono text-on-surface-variant/80">
                      <span>{vote.time}</span>
                      <button
                        onClick={() => toggleVote(vote.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                          vote.voted
                            ? 'bg-secondary/20 text-secondary border border-secondary/30'
                            : 'bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30'
                        }`}
                      >
                        {vote.voted ? 'Voted (Yes)' : 'Cast Vote'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 mt-4">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold mb-1">
                <span className="material-symbols-outlined text-sm">auto_mode</span>
                <span>Automated Fairness Protocol</span>
              </div>
              <p className="text-[11px] text-on-surface-variant font-sans leading-relaxed">
                Zero gig-economy exploitation. Algorithmic transparency ensures equitable distribution of platform revenue directly back into community funds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
