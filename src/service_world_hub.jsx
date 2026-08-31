import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ShaderBackground from './components/ShaderBackground';
import { ThreeRoomOrchestrator } from './components/ThreeVisualizers';
import soundEngine from './services/soundEngine';

const ServiceWorldHub = () => {
  const navigate = useNavigate();
  const [activeRoom, setActiveRoom] = useState({
    id: 1,
    name: 'Electrical Grid',
    color: '#f59e0b',
    code: 'RM-01',
    activeWorkers: 42,
    loadPercentage: 78,
    status: 'Optimal Flow'
  });

  const [isAudioMuted, setIsAudioMuted] = useState(soundEngine.isMuted);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const handleToggleAudio = () => {
    const muted = soundEngine.toggleMute();
    setIsAudioMuted(muted);
  };

  const handleToggleMotion = () => {
    setIsReducedMotion(!isReducedMotion);
    document.body.classList.toggle('reduced-motion');
  };

  const handleSelectRoomFrom3D = (roomData) => {
    setActiveRoom({
      ...activeRoom,
      ...roomData
    });
    soundEngine.playTransitionSweep();
  };

  return (
    <div className="w-full min-h-screen relative bg-background text-on-background selection:bg-primary/30 selection:text-primary overflow-hidden">
      {/* Film Grain Overlay */}
      <div className="film-grain" />

      {/* Background WebGL Shader */}
      <ShaderBackground className="fixed inset-0 z-0 opacity-30 pointer-events-none" />

      {/* 3D 18-Room Spatial Topology Hub */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-auto">
        <ThreeRoomOrchestrator className="w-full h-full" onSelectRoom={handleSelectRoomFrom3D} />
      </div>

      {/* Floating HUD Controls (Top Right) */}
      <div className="fixed top-24 right-6 md:right-12 z-40 flex flex-col gap-3">
        <button
          onClick={handleToggleAudio}
          aria-label="Toggle Audio"
          className={`glass-panel w-11 h-11 rounded-full flex items-center justify-center transition-all ${
            isAudioMuted ? 'text-outline hover:text-white' : 'text-primary glass-glow-primary'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">
            {isAudioMuted ? 'volume_off' : 'volume_up'}
          </span>
        </button>

        <button
          onClick={handleToggleMotion}
          aria-label="Reduced Motion"
          className={`glass-panel w-11 h-11 rounded-full flex items-center justify-center transition-all ${
            isReducedMotion ? 'text-primary glass-glow-primary' : 'text-on-surface hover:text-primary'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">animation</span>
        </button>
      </div>

      {/* Main Cinematic Overlay Content */}
      <main className="fixed inset-0 pointer-events-none flex flex-col justify-end p-6 md:p-16 z-30 pb-24">
        <div className="max-w-2xl pointer-events-auto animate-fade-in-up">
          <div className="font-label-caps text-label-caps text-primary tracking-widest uppercase mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span>Sector Alpha • Chamber {activeRoom.code || 'RM-01'}</span>
          </div>

          <h1 className="font-display-lg text-white mb-4 drop-shadow-2xl uppercase tracking-tight">
            {activeRoom.name || 'ROOM 01 — ELECTRICAL'}
          </h1>

          <p className="font-data-mono text-xs md:text-sm text-on-surface-variant max-w-lg mb-6 leading-relaxed">
            Primary sovereign infrastructure node for high-voltage isolation, phase balancing, and localized grid management. Residential and commercial configurations available.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/customer/request"
              onClick={() => soundEngine.playClick()}
              className="bg-primary text-on-primary font-body-md font-bold px-8 py-3.5 rounded-full hover:bg-primary-fixed transition-all hover:shadow-[0_0_24px_rgba(173,198,255,0.4)] flex items-center gap-2 shadow-lg"
            >
              <span>Enter Service Chamber</span>
              <span className="material-symbols-outlined text-[18px]">login</span>
            </Link>

            <Link
              to="/workers"
              onClick={() => soundEngine.playClick()}
              className="glass-panel text-on-surface font-body-md font-semibold px-8 py-3.5 rounded-full hover:text-primary hover:border-primary/50 transition-all flex items-center gap-2"
            >
              <span>Explore Verified Workers</span>
              <span className="material-symbols-outlined text-[18px]">group</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Bottom Status Bar from Stitch */}
      <footer className="fixed bottom-0 left-0 w-full flex justify-between items-center px-6 md:px-12 py-3 z-40 bg-transparent border-t border-white/5 backdrop-blur-md pointer-events-auto font-mono text-xs">
        <div className="flex gap-6 md:gap-10">
          <div className="flex flex-col">
            <span className="font-label-caps text-[10px] text-outline uppercase">System State</span>
            <span className="font-data-mono text-secondary flex items-center gap-1.5 font-bold">
              <span className="material-symbols-outlined text-[14px]">sensors</span> Optimal
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-label-caps text-[10px] text-outline uppercase">Neural Feed</span>
            <span className="font-data-mono text-primary flex items-center gap-1.5 font-bold">
              <span className="material-symbols-outlined text-[14px]">psychology</span> Synchronized
            </span>
          </div>

          <div className="flex flex-col hidden sm:flex">
            <span className="font-label-caps text-[10px] text-outline uppercase">Active Artisans</span>
            <span className="font-data-mono text-white flex items-center gap-1.5 font-bold">
              <span className="material-symbols-outlined text-[14px]">engineering</span> 240 On-Call
            </span>
          </div>
        </div>

        <div className="font-data-mono text-[11px] text-outline text-right opacity-60">
          © 2026 UNIVO Cooperative Systems • Distributed Workforce Protocol
        </div>
      </footer>
    </div>
  );
};

export default ServiceWorldHub;
