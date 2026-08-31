import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWorker } from './WorkerContext';
import ShaderBackground from '../components/ShaderBackground';

export default function WorkerSkillDNA() {
  const { skillDNA, trustProfile, updateSkillProficiency } = useWorker();
  const [selectedSkill, setSelectedSkill] = useState(skillDNA[0]);

  return (
    <div className="w-full min-h-screen relative bg-background text-on-background selection:bg-primary selection:text-on-primary">
      <ShaderBackground className="fixed inset-0 z-0 opacity-25 pointer-events-none" />

      <div className="relative z-10 w-full min-h-screen pt-28 px-4 md:px-10 max-w-6xl mx-auto pb-28 flex flex-col gap-8">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            to="/worker"
            className="flex items-center gap-2 text-xs font-mono text-on-surface-variant hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Back to Worker Hub</span>
          </Link>
          <span className="text-[11px] font-mono text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
            Dynamic Cryptographic Skill Matrix
          </span>
        </div>

        {/* Title */}
        <div className="animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight">
            Skill DNA &amp; 7-Dimension Trust Profile
          </h1>
          <p className="text-xs md:text-sm text-on-surface-variant font-mono mt-1 max-w-2xl">
            Unlike static resumes, your Skill DNA evolves continuously from completed missions, client telemetry, and peer endorsements.
          </p>
        </div>

        {/* 7-DIMENSION TRUST PROFILE RADAR */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl relative overflow-hidden space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 mb-2">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="text-[10px] font-mono text-secondary uppercase tracking-wider font-semibold">
                  Cooperative Reputation Ledger
                </span>
              </div>
              <h2 className="text-2xl font-bold font-sans text-white">
                The 7 Dimensions of Cooperative Trust
              </h2>
            </div>
            <div className="text-right font-mono">
              <span className="text-xs text-on-surface-variant">Composite Trust:</span>
              <div className="text-3xl font-bold text-secondary">{trustProfile.overallTrust}%</div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 font-mono text-xs text-center">
            {[
              { label: 'Technical Skill', val: trustProfile.skillExecution, icon: 'bolt' },
              { label: 'Reliability', val: trustProfile.reliability, icon: 'lock' },
              { label: 'Safety Protocol', val: trustProfile.safetyProtocol, icon: 'shield' },
              { label: 'Punctuality', val: trustProfile.punctuality, icon: 'schedule' },
              { label: 'Customer Voice', val: trustProfile.customerFeedback, icon: 'reviews' },
              { label: 'Peer Trust', val: trustProfile.peerTrust, icon: 'handshake' },
              { label: 'Overall Trust', val: trustProfile.overallTrust, icon: 'verified' }
            ].map((dim, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-between"
              >
                <span className="material-symbols-outlined text-lg text-primary mb-1">{dim.icon}</span>
                <div className="text-lg font-bold text-white">{dim.val}%</div>
                <div className="text-[10px] text-on-surface-variant/80 mt-0.5 leading-tight">{dim.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SKILL DNA BREAKDOWN & DETAIL INSPECTOR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Skill List */}
          <div className="lg:col-span-7 space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-sans font-bold text-lg text-white">Active DNA Strands</h3>
              <span className="text-on-surface-variant">Click to inspect audit trail</span>
            </div>

            {skillDNA.map((skill) => {
              const isSelected = selectedSkill.id === skill.id;
              return (
                <div
                  key={skill.id}
                  onClick={() => setSelectedSkill(skill)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-primary/20 border-primary shadow-[0_0_15px_rgba(173,198,255,0.2)]'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-sans font-bold text-sm text-white">{skill.name}</div>
                    <span className="text-primary font-bold text-sm">{skill.proficiency}%</span>
                  </div>

                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-2">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-500"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-on-surface-variant">
                    <span>{skill.verifier}</span>
                    <span className="text-secondary">{skill.endorsementsCount} Peer Endorsements</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Audit Trail & Proof Inspector */}
          <div className="lg:col-span-5 glass-card rounded-3xl p-6 border border-white/10 space-y-5 font-mono text-xs sticky top-28">
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] text-primary uppercase font-bold">Cryptographic Audit Inspector</span>
                <h4 className="font-sans font-bold text-lg text-white mt-0.5">{selectedSkill.name}</h4>
              </div>
              <div className="text-2xl font-bold text-primary">{selectedSkill.proficiency}%</div>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-[#0e0e0f]/80 border border-white/5 space-y-1">
                <span className="text-[10px] uppercase text-on-surface-variant">Verification Authority:</span>
                <div className="text-white font-bold">{selectedSkill.verifier}</div>
                <div className="text-[10px] text-secondary">Verified on {selectedSkill.verificationDate}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0e0e0f]/80 border border-white/5 space-y-1">
                <span className="text-[10px] uppercase text-on-surface-variant">Cryptographic Evidence Document:</span>
                <div className="text-white font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-primary">description</span>
                  <span>{selectedSkill.evidenceDoc}</span>
                </div>
                <div className="text-[10px] text-on-surface-variant/80">SHA-256 Checksum Validated</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0e0e0f]/80 border border-white/5 space-y-1">
                <span className="text-[10px] uppercase text-on-surface-variant">Peer Endorsements:</span>
                <div className="text-secondary font-bold text-sm">
                  {selectedSkill.endorsementsCount} Guild Master Endorsements
                </div>
                <p className="text-[10px] text-on-surface-variant leading-relaxed mt-0.5">
                  Endorsed by senior peer technicians during joint electrical panel installations and quarterly safety drills.
                </p>
              </div>
            </div>

            {/* Test Simulation: Simulate Customer Review Updating Skill */}
            <div className="pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => updateSkillProficiency(selectedSkill.name, 1)}
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold flex items-center justify-center gap-2 transition-all"
              >
                <span className="material-symbols-outlined text-sm text-secondary">upgrade</span>
                <span>Simulate Completed Job Boost (+1%)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
