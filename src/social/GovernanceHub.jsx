import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSocial } from './SocialContext';
import ShaderBackground from '../components/ShaderBackground';

export default function GovernanceHub() {
  const { proposals, castVote } = useSocial();
  const activeProposal = proposals[0];

  const [selectedOptionId, setSelectedOptionId] = useState('opt-a');
  const [isCasting, setIsCasting] = useState(false);
  const [activeSimulationOption, setActiveSimulationOption] = useState(activeProposal.options[0]);

  const handleVoteSubmit = () => {
    setIsCasting(true);
    setTimeout(() => {
      castVote(activeProposal.id, selectedOptionId);
      setIsCasting(false);
    }, 1000);
  };

  return (
    <div className="w-full min-h-screen relative bg-background text-on-background selection:bg-primary selection:text-on-primary">
      <ShaderBackground className="fixed inset-0 z-0 opacity-25 pointer-events-none" />

      <div className="relative z-10 w-full min-h-screen pt-28 px-4 md:px-10 max-w-6xl mx-auto pb-28 flex flex-col gap-8">
        {/* Breadcrumbs & Navigation */}
        <div className="flex items-center justify-between">
          <Link
            to="/worker"
            className="flex items-center gap-2 text-xs font-mono text-on-surface-variant hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Back to Worker Hub</span>
          </Link>
          <div className="flex items-center gap-2 font-mono text-xs text-primary">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span>Sovereign Worker Ballot: did:univo:worker:7089-karthik</span>
          </div>
        </div>

        {/* Header Title */}
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-2">
            <span className="text-[10px] font-mono text-primary uppercase font-bold tracking-wider">
              Part A: Democratic Cooperative Governance
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight">
            Democratic Assembly &amp; AI What-If Simulator
          </h1>
          <p className="text-xs md:text-sm text-on-surface-variant font-mono mt-1 max-w-3xl">
            Every technician is an equity co-owner. AI does not vote. AI does not decide. AI explains trade-offs — workers hold sovereign power.
          </p>
        </div>

        {/* Constitutional AI Guarantee Alert */}
        <div className="p-4 rounded-2xl bg-[#0e0e0f]/90 border border-primary/30 flex items-start gap-3.5 font-mono text-xs animate-fade-in-up">
          <span className="material-symbols-outlined text-xl text-primary mt-0.5">balance</span>
          <div>
            <span className="font-bold text-white uppercase tracking-wider block mb-0.5">
              THE UNIVO CONSTITUTIONAL RULE:
            </span>
            <span className="text-on-surface-variant leading-relaxed">
              <strong>AI DOES NOT VOTE. AI DOES NOT DECIDE. AI EXPLAINS.</strong> Algorithmic projections below quantify financial, reach, and liquidity trade-offs to empower workers to make informed democratic choices.
            </span>
          </div>
        </div>

        {/* Active Proposal Hero Card */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl relative overflow-hidden space-y-6 animate-fade-in-up">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs mb-1">
                <span className="text-primary font-bold">{activeProposal.id}</span>
                <span className="px-2 py-0.5 rounded bg-secondary/15 text-secondary border border-secondary/30 text-[10px] font-bold">
                  {activeProposal.status.replace('_', ' ')}
                </span>
                <span className="text-on-surface-variant">• {activeProposal.category}</span>
              </div>
              <h2 className="text-2xl font-bold font-sans text-white">{activeProposal.title}</h2>
              <div className="text-xs font-mono text-on-surface-variant mt-1">
                Voting Window: <strong className="text-white">{activeProposal.votingDeadline}</strong>
              </div>
            </div>

            <div className="text-right font-mono">
              <div className="text-xs text-on-surface-variant">Quorum Status:</div>
              <div className="text-2xl font-bold text-secondary">{activeProposal.quorumCurrent}%</div>
              <span className="text-[10px] text-on-surface-variant">Required: {activeProposal.quorumRequired}% (Quorum Met ✓)</span>
            </div>
          </div>

          {/* Voting Options Breakdown Grid */}
          <div className="space-y-4">
            <h3 className="font-sans font-bold text-lg text-white">Select Allocation Option:</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activeProposal.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                const isUserVoted = activeProposal.userVotedOption === opt.id;

                return (
                  <div
                    key={opt.id}
                    onClick={() => { setSelectedOptionId(opt.id); setActiveSimulationOption(opt); }}
                    className={`glass-card p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between gap-4 ${
                      isSelected
                        ? 'border-primary/60 bg-primary/10 shadow-[0_0_20px_rgba(173,198,255,0.2)]'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-mono text-xs font-bold text-primary">{opt.title.split(':')[0]}</span>
                        {isUserVoted && (
                          <span className="text-[9px] bg-secondary text-black font-bold px-1.5 py-0.5 rounded font-mono">
                            YOUR VOTE
                          </span>
                        )}
                      </div>
                      <h4 className="font-sans font-bold text-sm text-white">{opt.title.split(':')[1]}</h4>
                      <p className="text-xs font-mono text-on-surface-variant mt-1.5 leading-relaxed">{opt.summary}</p>
                    </div>

                    <div className="pt-3 border-t border-white/5 font-mono text-xs">
                      <div className="flex justify-between mb-1">
                        <span className="text-on-surface-variant">{opt.votesCount} Votes</span>
                        <span className="text-white font-bold">{opt.percentage}%</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: `${opt.percentage}%` }}></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI WHAT-IF SIMULATOR INSPECTOR */}
          <div className="p-6 rounded-2xl bg-[#0e0e0f]/90 border border-primary/40 space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <div className="flex items-center gap-2 text-primary font-bold">
                <span className="material-symbols-outlined text-base">psychology</span>
                <span className="text-sm">AI WHAT-IF SIMULATOR: {activeSimulationOption.title.split(':')[0]}</span>
              </div>
              <span className="text-[10px] text-on-surface-variant">Deterministic Impact Model</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px]">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-[10px] text-on-surface-variant uppercase font-bold">Estimated Investment</span>
                <div className="text-white font-bold">{activeSimulationOption.aiSimulation.investment}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-[10px] text-on-surface-variant uppercase font-bold">Worker Reach</span>
                <div className="text-secondary font-bold">{activeSimulationOption.aiSimulation.workerReach}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1 sm:col-span-2">
                <span className="text-[10px] text-on-surface-variant uppercase font-bold">Primary Cooperative Benefit</span>
                <div className="text-white font-bold">{activeSimulationOption.aiSimulation.mainBenefit}</div>
                <div className="text-secondary mt-1">{activeSimulationOption.aiSimulation.illustrativeImpact}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-tertiary/10 border border-tertiary/20 space-y-1 sm:col-span-2 text-tertiary">
                <span className="text-[10px] uppercase font-bold text-tertiary">Identified Trade-Offs &amp; Constraints:</span>
                <p className="text-white/80 leading-relaxed">{activeSimulationOption.aiSimulation.potentialTradeOffs}</p>
              </div>
            </div>
          </div>

          {/* Cast Sovereign Vote Action */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-white/10 font-mono text-xs">
            <div className="text-on-surface-variant">
              {activeProposal.voterHasVoted
                ? '✓ Your cryptographic vote has been recorded on the decentralized audit ledger.'
                : 'Signing ballot with your private artisan key.'}
            </div>

            <button
              type="button"
              disabled={isCasting || activeProposal.voterHasVoted}
              onClick={handleVoteSubmit}
              className={`px-8 py-3.5 rounded-xl font-sans font-bold text-xs flex items-center gap-2 transition-all ${
                activeProposal.voterHasVoted
                  ? 'bg-white/10 text-on-surface-variant cursor-not-allowed'
                  : 'bg-primary hover:bg-primary/90 text-on-primary shadow-[0_0_20px_rgba(173,198,255,0.3)] hover:scale-105'
              }`}
            >
              {isCasting ? (
                <>
                  <span className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></span>
                  <span>Signing &amp; Recording Ballot...</span>
                </>
              ) : activeProposal.voterHasVoted ? (
                <>
                  <span className="material-symbols-outlined text-sm">done_all</span>
                  <span>Vote Cast Successfully</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">how_to_vote</span>
                  <span>Cast Sovereign Ballot for Selected Option</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Immutable Audit Log */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-3 font-mono text-xs animate-fade-in-up">
          <h3 className="font-sans font-bold text-base text-white">Cryptographic Ballot Audit History</h3>
          <div className="space-y-2">
            {activeProposal.auditLog.map((log, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-[11px]">
                <div className="text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  <span>{log.event}</span>
                </div>
                <span className="text-on-surface-variant/70">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
