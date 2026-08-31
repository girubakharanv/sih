import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ShaderBackground from './components/ShaderBackground';
import { ThreeRoomOrchestrator } from './components/ThreeVisualizers';

import soundEngine from './services/soundEngine';

const ServiceRoomTransitions = () => {
  const [selectedRoomId, setSelectedRoomId] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const rooms = [
    {
      id: 1,
      name: 'ROOM 01 — ELECTRICAL',
      tag: 'ACTIVE SECTOR',
      desc: 'Primary infrastructure node for high-voltage distribution and localized grid management. Residential and commercial configurations available.',
      color: '#f59e0b',
      services: [
        { title: 'Master Electrician', level: 'Lvl 4 Authorization', icon: 'electrical_services', color: 'text-primary' },
        { title: 'Structural Wiring', level: 'Infrastructure Core', icon: 'cable', color: 'text-secondary' },
        { title: 'Solar Integration', level: 'Renewable Storage Node', icon: 'solar_power', color: 'text-tertiary' }
      ]
    },
    {
      id: 2,
      name: 'ROOM 02 — PLUMBING & HYDRO',
      tag: 'MUNICIPAL SECTOR',
      desc: 'High-pressure fluid dynamic telemetry and municipal bio-sanitation routing. Real-time leak sensor integration enabled.',
      color: '#3b82f6',
      services: [
        { title: 'Hydrodynamic Engineer', level: 'Municipal Lvl 3', icon: 'faucet', color: 'text-primary' },
        { title: 'Acoustic Pipe Diagnostics', level: 'Sub-Surface Sensor', icon: 'water_drop', color: 'text-secondary' },
        { title: 'Filtration Loop Calibration', level: 'Pure Loop Ops', icon: 'filter_alt', color: 'text-tertiary' }
      ]
    },
    {
      id: 3,
      name: 'ROOM 03 — CLIMATE & BIO-SECURITY',
      tag: 'ENVIRONMENTAL NODE',
      desc: 'Atmospheric circulation, carbon extraction, and environmental containment zones for dense urban sectors.',
      color: '#10b981',
      services: [
        { title: 'HVAC Quantum Calibrator', level: 'Clean Room Certified', icon: 'thermostat', color: 'text-primary' },
        { title: 'Atmospheric Filtration', level: 'HEPA / Ionization', icon: 'air', color: 'text-secondary' },
        { title: 'Thermal Recoup Vector', level: 'Green Grid Cert', icon: 'energy_savings_leaf', color: 'text-tertiary' }
      ]
    }
  ];

  const currentRoom = rooms.find((r) => r.id === selectedRoomId) || rooms[0];

  const handleRoomSwitch = (id) => {
    if (id === selectedRoomId) return;
    soundEngine.playTransitionSweep();
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedRoomId(id);
      setIsTransitioning(false);
    }, 400);
  };

  return (
    <div className="w-full min-h-screen relative bg-background text-on-background selection:bg-primary selection:text-on-primary overflow-x-hidden">
      {/* Background WebGL Shader */}
      <ShaderBackground className="fixed inset-0 z-0 opacity-40 pointer-events-none" />

      {/* 3D Visualizer Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-auto">
        <ThreeRoomOrchestrator className="w-full h-full" />
      </div>

      {/* Smooth Transition Overlay */}
      <div
        className={`fixed inset-0 bg-background z-50 pointer-events-none transition-opacity duration-300 ${
          isTransitioning ? 'opacity-70' : 'opacity-0'
        }`}
      />

      <main className="relative z-10 w-full min-h-screen pt-28 px-4 md:px-12 max-w-7xl mx-auto pb-24 flex flex-col md:flex-row justify-between items-end md:items-center gap-8 pointer-events-none">
        {/* Left Side: Room Navigation Carousel */}
        <div className="pointer-events-auto glass-hud p-6 rounded-3xl border border-white/10 max-w-md w-full animate-fade-in-up">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            <span className="font-mono text-xs text-primary uppercase tracking-wider font-semibold">
              Spatial Room Transitions
            </span>
          </div>

          <h1 className="text-2xl font-bold text-white font-sans mb-2">Service World Hub Navigation</h1>
          <p className="text-xs text-on-surface-variant font-mono mb-6">
            Select an operational room to view active workers, load statistics, and service dispatch specs.
          </p>

          <div className="flex flex-col gap-2.5">
            {rooms.map((room) => {
              const active = room.id === selectedRoomId;
              return (
                <button
                  key={room.id}
                  onClick={() => handleRoomSwitch(room.id)}
                  className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all duration-200 ${
                    active
                      ? 'bg-primary/20 border-primary shadow-[0_0_20px_rgba(173,198,255,0.2)]'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: room.color }}
                    ></span>
                    <span className="font-sans font-bold text-sm text-white">{room.name}</span>
                  </div>
                  <span className="font-mono text-[11px] text-primary">{room.tag}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Active Room Detail HUD Card */}
        <div className="pointer-events-auto glass-card rounded-3xl p-6 md:p-8 border border-white/10 max-w-lg w-full shadow-2xl backdrop-blur-2xl animate-fade-in-up">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-1">
              <span className="font-mono text-xs text-primary font-bold">{currentRoom.tag}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary/10 text-secondary border border-secondary/20">
                100% ONLINE
              </span>
            </div>
            <h2 className="font-sans font-bold text-2xl text-white">{currentRoom.name}</h2>
            <div className="w-full h-px bg-gradient-to-r from-primary to-transparent mt-3"></div>
          </div>

          <p className="font-sans text-xs text-on-surface-variant leading-relaxed mb-6">
            {currentRoom.desc}
          </p>

          <h3 className="font-mono text-xs uppercase tracking-wider text-on-surface-variant mb-3 font-semibold">
            Certified Services in Sector
          </h3>

          <div className="space-y-3 mb-6">
            {currentRoom.services.map((svc, i) => (
              <div
                key={i}
                className="glass-panel p-3.5 rounded-xl flex items-center justify-between border border-white/5 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined ${svc.color} text-xl`}>
                    {svc.icon}
                  </span>
                  <div>
                    <div className="font-sans font-semibold text-xs text-white">{svc.title}</div>
                    <div className="font-mono text-[10px] text-on-surface-variant/70">{svc.level}</div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant text-sm">arrow_forward_ios</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Link
              to="/request"
              className="flex-1 py-3 text-center rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-sans font-bold text-xs shadow-[0_0_15px_rgba(173,198,255,0.3)] transition-all"
            >
              Request Service in Room
            </Link>
            <Link
              to="/workers"
              className="flex-1 py-3 text-center rounded-xl glass-panel hover:bg-white/10 text-white font-sans text-xs border border-white/10 transition-all"
            >
              Inspect Workers
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServiceRoomTransitions;
