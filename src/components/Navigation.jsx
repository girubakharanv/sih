import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MissionControlModal from './MissionControlModal';

export default function Navigation() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMissionControlOpen, setIsMissionControlOpen] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { path: '/customer', label: 'Customer Portal', icon: 'person' },
    { path: '/worker', label: 'Worker Command', icon: 'engineering' },
    { path: '/engine', label: 'Core AI Engine', icon: 'psychology' },
    { path: '/governance', label: 'Democracy & Governance', icon: 'how_to_vote' },
    { path: '/crisis', label: 'Crisis Command', icon: 'emergency_home' },
    { path: '/government', label: 'Govt Oversight', icon: 'verified_user' },
    { path: '/welfare', label: 'Mutual Aid', icon: 'health_and_safety' },
    { path: '/parametric', label: 'Climate Shield', icon: 'cyclone' }
  ];

  return (
    <>
      {/* National Hackathon Mission Control Modal */}
      <MissionControlModal
        isOpen={isMissionControlOpen}
        onClose={() => setIsMissionControlOpen(false)}
      />

      {/* Top Floating Glass HUD Bar */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 transition-all duration-300">
        <div className="glass-hud rounded-2xl px-5 py-3 flex items-center justify-between shadow-2xl border border-white/10">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/40 flex items-center justify-center text-primary group-hover:glow-active transition-all">
                <span className="material-symbols-outlined text-xl">hub</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-sans font-bold tracking-tight text-white text-base">UNIVO</span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">OS v2.4</span>
                </div>
                <p className="text-[11px] font-mono text-on-surface-variant/70 leading-none">Cooperative Intelligence</p>
              </div>
            </Link>

            {/* Quick Mission Control Launcher */}
            <button
              onClick={() => setIsMissionControlOpen(true)}
              className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/15 border border-primary/30 text-primary text-[11px] font-mono font-bold hover:bg-primary/25 transition-all ml-2"
              title="Open System Narrative & 32-Point Audit"
            >
              <span className="material-symbols-outlined text-xs">auto_stories</span>
              <span>System Story</span>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path) || (item.path === '/' && location.pathname === '/');
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/15 text-primary border border-primary/30 shadow-[0_0_12px_rgba(173,198,255,0.2)]'
                      : 'text-on-surface-variant hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Telemetry Status & Live Feed */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex flex-col items-end text-[11px] font-mono">
              <div className="flex items-center gap-1.5 text-secondary">
                <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                <span className="font-semibold">NODE ACTIVE</span>
              </div>
              <span className="text-on-surface-variant/60">{timeStr}</span>
            </div>

            {/* High Contrast Mode Toggle */}
            <button
              onClick={() => {
                document.body.classList.toggle('high-contrast');
              }}
              title="High Contrast Mode (WCAG AAA)"
              className="glass-panel w-8 h-8 rounded-full flex items-center justify-center text-on-surface hover:text-white transition-all text-xs font-bold font-mono"
            >
              HC
            </button>

            {/* Language Switcher Dropdown */}
            <select
              defaultValue={localStorage.getItem('univo_language') || 'en'}
              onChange={(e) => {
                localStorage.setItem('univo_language', e.target.value);
                window.location.reload();
              }}
              title="Select Language"
              className="bg-black/60 border border-white/15 text-white text-xs rounded-xl px-2 py-1 font-mono focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="en">EN (English)</option>
              <option value="hi">HI (हिन्दी)</option>
              <option value="ta">TA (தமிழ்)</option>
              <option value="te">TE (తెలుగు)</option>
              <option value="bn">BN (বাংলা)</option>
              <option value="mr">MR (मराठी)</option>
            </select>

            {/* Audio Toggle Button */}
            <button
              onClick={() => {
                import('../services/soundEngine.js').then(({ soundEngine }) => {
                  soundEngine.toggleMute();
                });
              }}
              title="Toggle Spatial Audio"
              className="glass-panel w-8 h-8 rounded-full flex items-center justify-center text-on-surface hover:text-primary transition-all"
            >
              <span className="material-symbols-outlined text-sm">volume_up</span>
            </button>

            {/* Assisted Registration Quick Link for Low-Literacy Workers */}
            <Link
              to="/worker/assisted-register"
              title="Assisted Worker Registration (Voice & Icon Guided)"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary/15 border border-secondary/40 text-secondary text-xs font-mono font-bold hover:bg-secondary/25 transition-all"
            >
              <span className="material-symbols-outlined text-sm">record_voice_over</span>
              <span>Assisted Onboard</span>
            </Link>

            <Link
              to="/request"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-semibold text-xs transition-all shadow-[0_0_15px_rgba(173,198,255,0.3)] hover:scale-105 active:scale-95"
            >
              <span className="material-symbols-outlined text-sm">bolt</span>
              <span>New Request</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-1 rounded-lg hover:bg-white/10"
              aria-label="Toggle Menu"
            >
              <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 p-3 glass-hud rounded-2xl border border-white/10 flex flex-col gap-1 shadow-2xl">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path) || (item.path === '/' && location.pathname === '/');
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                    isActive ? 'bg-primary/20 text-primary border border-primary/30' : 'text-on-surface-variant hover:bg-white/5'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </header>
    </>
  );
}
