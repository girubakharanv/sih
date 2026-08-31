import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWorker } from './WorkerContext';
import ShaderBackground from '../components/ShaderBackground';

export default function WorkerPassport() {
  const { worker, skillDNA, trustProfile } = useWorker();
  const [activeTab, setActiveTab] = useState('passport'); // 'passport' | 'credentials' | 'coop'

  return (
    <div className="w-full min-h-screen relative bg-background text-on-background selection:bg-primary selection:text-on-primary">
      <ShaderBackground className="fixed inset-0 z-0 opacity-25 pointer-events-none" />

      <div className="relative z-10 w-full min-h-screen pt-28 px-4 md:px-10 max-w-5xl mx-auto pb-28 flex flex-col gap-8">
        {/* Top Breadcrumbs */}
        <div className="flex items-center justify-between">
          <Link
            to="/worker"
            className="flex items-center gap-2 text-xs font-mono text-on-surface-variant hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Back to Worker Command</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="text-xs font-mono text-secondary uppercase font-bold tracking-wider">
              Cryptographically Signed Identity
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-fade-in-up">
          <div>
            <h1 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight">
              UNIVO Worker Passport
            </h1>
            <p className="text-xs md:text-sm text-on-surface-variant font-mono mt-1">
              Your portable, self-sovereign trade credential. Owned by you, authenticated by the Cooperative Guild.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('Worker Passport exported as W3C Verifiable Credential JSON-LD.')}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs border border-white/10 flex items-center gap-2 transition-all"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              <span>Export Credential</span>
            </button>
            <Link
              to="/worker"
              className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-bold text-xs font-sans flex items-center gap-2 shadow-[0_0_15px_rgba(173,198,255,0.3)]"
            >
              <span className="material-symbols-outlined text-sm">dashboard</span>
              <span>Launch Command</span>
            </Link>
          </div>
        </div>

        {/* Passport Physical / Holographic Card Container */}
        <div className="glass-card rounded-3xl p-6 md:p-10 border border-primary/40 relative overflow-hidden shadow-2xl bg-gradient-to-br from-[#1c1b1c]/90 via-[#131314]/95 to-[#0b0b0c] animate-fade-in-up">
          {/* Holographic Security Overlay Pattern */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>

          {/* Header of Passport */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 border-b border-white/10 relative z-10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={worker.avatar}
                  alt={worker.name}
                  className="w-24 h-24 rounded-2xl object-cover border-2 border-primary/50 shadow-2xl"
                />
                <span
                  className="material-symbols-outlined absolute -bottom-2 -right-2 text-secondary bg-[#131314] rounded-full p-1 border border-secondary/40 text-base"
                  title="Biometrically & Committee Verified"
                >
                  verified
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-2xl font-bold font-sans text-white">{worker.name}</h2>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30 uppercase font-bold">
                    {worker.tier}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant font-mono mt-0.5">{worker.role}</p>
                <div className="flex items-center gap-2 text-xs font-mono text-secondary mt-1.5">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  <span>{worker.location}</span>
                </div>
              </div>
            </div>

            {/* Sovereign DID & QR Simulation */}
            <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs">
              <div className="w-16 h-16 bg-white p-1 rounded-xl flex items-center justify-center shadow-inner">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=did:univo:worker:7089-karthik"
                  alt="QR Identity"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] uppercase text-on-surface-variant">Sovereign Worker DID</div>
                <div className="text-white font-bold text-[11px] select-all">{worker.did}</div>
                <div className="text-[10px] text-secondary">● Cryptographically Signed</div>
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8 font-mono relative z-10">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-on-surface-variant text-[10px] uppercase">Completed Missions</span>
              <div className="text-2xl font-bold text-white mt-1">{worker.completedJobs}</div>
              <span className="text-[10px] text-secondary">100% Fulfillment Rate</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-on-surface-variant text-[10px] uppercase">Zero-Incident Hours</span>
              <div className="text-2xl font-bold text-secondary mt-1">{worker.zeroSafetyIncidentsHours} hrs</div>
              <span className="text-[10px] text-on-surface-variant/80">Safety Gold Standard</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-on-surface-variant text-[10px] uppercase">Overall Trust Index</span>
              <div className="text-2xl font-bold text-primary mt-1">{trustProfile.overallTrust}%</div>
              <span className="text-[10px] text-primary">Top 1% in Sector 4</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-on-surface-variant text-[10px] uppercase">Trade Experience</span>
              <div className="text-2xl font-bold text-white mt-1">{worker.experienceYears} Years</div>
              <span className="text-[10px] text-on-surface-variant/80">Certified Master</span>
            </div>
          </div>

          {/* Verified Languages & Cooperative Participation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-8 border-b border-white/10 relative z-10 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-[#0e0e0f]/80 border border-white/5">
              <div className="text-[10px] text-on-surface-variant uppercase font-semibold mb-2">
                Certified Spoken Languages:
              </div>
              <div className="flex flex-wrap gap-2">
                {worker.languages.map((lang, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white font-sans">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0e0e0f]/80 border border-white/5">
              <div className="text-[10px] text-on-surface-variant uppercase font-semibold mb-2">
                Cooperative Participation &amp; Democracy:
              </div>
              <div className="text-white font-bold">{worker.guildStanding}</div>
              <div className="text-secondary text-[11px] mt-1">
                Participates in monthly fee setting, welfare pool allocations, and apprentice mentoring.
              </div>
            </div>
          </div>

          {/* Verified Skills Showcase */}
          <div className="pt-8 relative z-10">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-sans font-bold text-lg text-white">Cryptographically Verified Skill Credentials</h3>
                <p className="text-xs text-on-surface-variant font-mono mt-0.5">
                  Every skill is backed by document proof, committee audit, and peer mentor endorsements.
                </p>
              </div>
              <Link to="/worker/skills" className="text-xs font-mono text-primary hover:underline">
                View Full Skill DNA Radar →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              {skillDNA.map((skill) => (
                <div
                  key={skill.id}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/40 transition-all flex flex-col justify-between gap-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-white font-sans text-sm">{skill.name}</div>
                      <div className="text-[10px] text-on-surface-variant mt-0.5">
                        Verified by: <span className="text-white/80">{skill.verifier}</span>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        skill.status === 'VERIFIED_MASTER'
                          ? 'bg-secondary/15 text-secondary border-secondary/30'
                          : skill.status === 'PEER_ENDORSED'
                          ? 'bg-primary/15 text-primary border-primary/30'
                          : 'bg-tertiary/15 text-tertiary border-tertiary/30'
                      }`}
                    >
                      {skill.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px]">
                    <span className="text-on-surface-variant">Proficiency: <strong className="text-primary">{skill.proficiency}%</strong></span>
                    <span className="text-secondary">{skill.endorsementsCount} Peer Endorsements</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
