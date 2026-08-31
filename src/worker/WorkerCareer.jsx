import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWorker } from './WorkerContext';
import ShaderBackground from '../components/ShaderBackground';

export default function WorkerCareer() {
  const { worker, trustProfile } = useWorker();

  const guildTiers = [
    {
      tier: 'Beginner',
      subtitle: 'Apprentice Artisan',
      requirements: 'Identity verified, 0 - 50 completed missions, supervised field shadowing',
      benefits: 'Base cooperative rate, access to senior mentor chat, basic health shield',
      isCurrent: worker.tier === 'Beginner',
      isUnlocked: true
    },
    {
      tier: 'Verified Artisan',
      subtitle: 'Independent Craftsman',
      requirements: '50+ completed missions, 100% safety checks passed, 1 trade certificate verified',
      benefits: '+15% earnings tariff, direct emergency dispatch, hardware repair micro-loans',
      isCurrent: worker.tier === 'Verified Artisan',
      isUnlocked: true
    },
    {
      tier: 'Advanced Specialist',
      subtitle: 'Master Technician',
      requirements: '500+ completed missions, Trust Score > 98%, 5+ verified Skill DNA nodes',
      benefits: '+35% premium diagnostics tariff, priority high-value industrial calls, AGM voting quorum',
      isCurrent: worker.tier === 'Advanced Specialist',
      isUnlocked: true
    },
    {
      tier: 'Guild Mentor',
      subtitle: 'Elder & Cooperative Inspector',
      requirements: '1,000+ completed missions, 10+ peer endorsements, Zero-safety incident record > 3,000 hrs',
      benefits: 'Hourly mentor advisory stipend, remote AR guidance compensation, Guild Council seat',
      isCurrent: worker.tier === 'Guild Mentor',
      isUnlocked: false,
      progress: '88% toward unlocking Mentor badge (Need 2 more Peer Endorsements)'
    }
  ];

  const skillGapRecommendations = [
    {
      title: 'Commercial Fast EV Charger Installation (DC 60kW+)',
      currentProficiency: 74,
      gap: 'Pending practical evaluation exam',
      potentialBoost: '+₹450/hr average mission earnings boost',
      provider: 'National Skill Development Council (NSDC)',
      action: 'Register for Practical Exam (Co-op Funded)'
    },
    {
      title: 'Lithium Battery Storage BMS Calibration & Firmware',
      currentProficiency: 65,
      gap: 'High demand in Sector 4 rooftop solar systems',
      potentialBoost: '+₹600/hr industrial microgrid tariff',
      provider: 'UNIVO Renewable Energy Chamber',
      action: 'Enroll in Self-Paced Virtual Lab'
    }
  ];

  return (
    <div className="w-full min-h-screen relative bg-background text-on-background selection:bg-primary selection:text-on-primary">
      <ShaderBackground className="fixed inset-0 z-0 opacity-25 pointer-events-none" />

      <div className="relative z-10 w-full min-h-screen pt-28 px-4 md:px-10 max-w-5xl mx-auto pb-28 flex flex-col gap-8">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            to="/worker"
            className="flex items-center gap-2 text-xs font-mono text-on-surface-variant hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Back to Worker Dashboard</span>
          </Link>
          <span className="text-[11px] font-mono text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
            Guild Meritocracy &amp; Career Ladder
          </span>
        </div>

        {/* Title */}
        <div className="animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight">
            Artisan Career &amp; Guild Hierarchy
          </h1>
          <p className="text-xs md:text-sm text-on-surface-variant font-mono mt-1 max-w-2xl">
            Advance through verifiable craft mastery, not algorithmic favoritism. Transparent milestones from Beginner to Guild Mentor.
          </p>
        </div>

        {/* 4-Tier Ladder Grid */}
        <div className="space-y-4 font-mono text-xs animate-fade-in-up">
          {guildTiers.map((gt, i) => (
            <div
              key={gt.tier}
              className={`glass-card rounded-3xl p-6 border transition-all ${
                gt.isCurrent
                  ? 'border-primary/60 bg-primary/5 shadow-[0_0_25px_rgba(173,198,255,0.15)]'
                  : gt.isUnlocked
                  ? 'border-white/10'
                  : 'border-white/5 opacity-80 bg-black/40'
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center font-bold text-white text-sm">
                    {i + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-sans font-bold text-lg text-white">{gt.tier}</h3>
                      <span className="text-[11px] text-on-surface-variant">• {gt.subtitle}</span>
                      {gt.isCurrent && (
                        <span className="px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/40 font-bold text-[10px] uppercase">
                          Current Tier
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {!gt.isUnlocked && (
                  <span className="px-3 py-1 rounded-xl bg-tertiary/10 text-tertiary border border-tertiary/30 text-[10px] font-bold">
                    Next Career Milestone
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-[11px]">
                <div className="p-3 rounded-xl bg-[#0e0e0f]/80 border border-white/5 space-y-1">
                  <span className="text-on-surface-variant uppercase text-[10px]">Prerequisites &amp; Requirements:</span>
                  <div className="text-white/90">{gt.requirements}</div>
                </div>
                <div className="p-3 rounded-xl bg-[#0e0e0f]/80 border border-white/5 space-y-1">
                  <span className="text-on-surface-variant uppercase text-[10px]">Tier Entitlements &amp; Pay:</span>
                  <div className="text-secondary font-bold">{gt.benefits}</div>
                </div>
              </div>

              {gt.progress && (
                <div className="mt-3 p-3 rounded-xl bg-tertiary/10 border border-tertiary/20 text-tertiary text-[11px] flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  <span>{gt.progress}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* AI SKILL-GAP RECOMMENDATIONS */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-5 font-mono text-xs">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 mb-2">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="text-secondary font-bold text-[10px] uppercase">Cooperative Learning Intelligence</span>
            </div>
            <h2 className="font-sans font-bold text-2xl text-white">AI Skill-Gap Recommendations</h2>
            <p className="text-on-surface-variant mt-0.5">
              Identified from high-demand unfulfilled requests in Sector 4 and adjacent industrial zones.
            </p>
          </div>

          <div className="space-y-3">
            {skillGapRecommendations.map((gap, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div>
                  <h4 className="font-sans font-bold text-sm text-white">{gap.title}</h4>
                  <div className="text-on-surface-variant text-[11px] mt-0.5">{gap.gap}</div>
                  <div className="text-secondary text-[11px] font-bold mt-1">{gap.potentialBoost}</div>
                </div>

                <button
                  type="button"
                  onClick={() => alert(`Registration initiated for ${gap.title}. Funded 100% via Co-op Education Pool.`)}
                  className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-bold font-sans text-xs whitespace-nowrap shadow-[0_0_12px_rgba(173,198,255,0.2)]"
                >
                  {gap.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
