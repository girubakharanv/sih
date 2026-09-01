import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWorker } from './WorkerContext';
import ShaderBackground from '../components/ShaderBackground';

export default function WorkerWellbeing() {
  const { worker, activateRestShield } = useWorker();
  const [restHours, setRestHours] = useState(24);
  const [shieldActivated, setShieldActivated] = useState(worker.wellbeing.restShieldActive);

  const handleActivateShield = () => {
    activateRestShield(restHours);
    setShieldActivated(true);
  };

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
          <span className="text-[11px] font-mono text-secondary bg-secondary/10 border border-secondary/20 px-3 py-1 rounded-full">
            Artisan Welfare &amp; Anti-Burnout Shield
          </span>
        </div>

        {/* Title */}
        <div className="animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight">
            Wellbeing &amp; Cooperative Rest Shield
          </h1>
          <p className="text-xs md:text-sm text-on-surface-variant font-mono mt-1 max-w-2xl">
            UNIVO algorithms monitor human fatigue, not just mission quotas. You have the sovereign right to rest without penalty.
          </p>
        </div>

        {/* The Cooperative Anti-Burnout Shield Guarantee */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-secondary/40 shadow-2xl relative overflow-hidden space-y-4 animate-fade-in-up">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-secondary/10 border border-secondary/30 flex items-center justify-center text-secondary shrink-0">
              <span className="material-symbols-outlined text-3xl">health_and_safety</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-secondary uppercase font-bold tracking-wider">
                Constitutional Protection
              </span>
              <h2 className="text-xl font-bold font-sans text-white mt-0.5">
                The Zero-Penalty Rest Guarantee
              </h2>
              <p className="text-xs font-mono text-on-surface-variant leading-relaxed mt-1">
                <strong>Important: Recommended rest must NOT permanently reduce future job opportunities.</strong>
                <br />When you activate the Rest Shield, your priority tier is locked in cryogenic hold until you return.
              </p>
            </div>
          </div>
        </div>

        {/* Real-time Fatigue Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 font-mono text-xs">
          <div className="glass-card p-5 rounded-2xl border border-secondary/30 bg-secondary/10">
            <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Overall Wellbeing Status</span>
            <div className="text-2xl font-bold text-secondary mt-1">
              {worker.wellbeing.score > 80 ? 'Healthy' : worker.wellbeing.score > 60 ? 'Monitor' : worker.wellbeing.score > 40 ? 'At Risk' : 'Critical'}
            </div>
            <span className="text-[10px] text-secondary">Score: {worker.wellbeing.score}/100</span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10">
            <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Today's Active Hours</span>
            <div className="text-2xl font-bold text-white mt-1">{worker.wellbeing.hoursToday} / 8.0h</div>
            <span className="text-[10px] text-secondary">Within Safe Limits</span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10">
            <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Weekly Cumulative</span>
            <div className="text-2xl font-bold text-white mt-1">{worker.wellbeing.hoursWeek} / 44.0h</div>
            <span className="text-[10px] text-on-surface-variant/80">34h recorded</span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10">
            <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Consecutive Days</span>
            <div className="text-2xl font-bold text-white mt-1">{worker.wellbeing.consecutiveDays} Days</div>
            <span className="text-[10px] text-tertiary">Day 6 triggers rest alert</span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10">
            <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Late-Night Trips</span>
            <div className="text-2xl font-bold text-secondary mt-1">{worker.wellbeing.lateNightTrips} Trip</div>
            <span className="text-[10px] text-on-surface-variant/80">Circadian rhythm safe</span>
          </div>
        </div>

        {/* REST SHIELD CONTROLS */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-6">
          <div>
            <h3 className="font-sans font-bold text-xl text-white">Activate Cooperative Rest Shield</h3>
            <p className="text-xs font-mono text-on-surface-variant mt-0.5">
              Pause incoming notifications and preserve your dispatch priority.
            </p>
          </div>

          {shieldActivated ? (
            <div className="p-6 rounded-2xl bg-secondary/15 border border-secondary/40 text-center font-mono text-xs space-y-3 animate-fade-in-up">
              <span className="material-symbols-outlined text-4xl text-secondary">verified</span>
              <h4 className="font-sans font-bold text-lg text-white">Rest Shield Currently Active</h4>
              <p className="text-on-surface-variant max-w-md mx-auto">
                You are on protected rest for the next {restHours} hours. Your priority dispatch standing is locked and preserved.
              </p>
              <button
                type="button"
                onClick={() => setShieldActivated(false)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold"
              >
                Resume Active Duty
              </button>
            </div>
          ) : (
            <div className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-on-surface-variant font-semibold mb-2">
                  Select Rest Duration:
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { hrs: 12, label: '12 Hours (Half-Day)' },
                    { hrs: 24, label: '24 Hours (Full Day)' },
                    { hrs: 48, label: '48 Hours (Weekend Reset)' }
                  ].map((opt) => (
                    <button
                      key={opt.hrs}
                      type="button"
                      onClick={() => setRestHours(opt.hrs)}
                      className={`p-3.5 rounded-xl border text-center transition-all ${
                        restHours === opt.hrs
                          ? 'bg-secondary/20 border-secondary text-white font-bold'
                          : 'bg-white/5 border-white/10 text-on-surface-variant hover:bg-white/10'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleActivateShield}
                className="w-full bg-secondary hover:bg-secondary/90 text-[#003824] font-bold py-4 rounded-xl text-sm font-sans flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(78,222,163,0.3)] transition-all hover:scale-[1.01]"
              >
                <span className="material-symbols-outlined text-sm">nightlight</span>
                <span>Engage Protected Rest Shield ({restHours}h)</span>
              </button>
            </div>
          )}
        </div>

        {/* COOPERATIVE EMERGENCY WELFARE FUND */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-4 font-mono text-xs">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] text-primary uppercase font-bold">Mutual Aid Network</span>
              <h3 className="font-sans font-bold text-xl text-white mt-0.5">
                Cooperative Welfare &amp; Health Shield
              </h3>
              <p className="text-on-surface-variant mt-0.5">
                Every completed service contributes 5% to the Worker Welfare Pool. Owned collaboratively by all members.
              </p>
            </div>
            <div className="text-right">
              <span className="text-on-surface-variant text-[10px] uppercase">Your Contribution Balance:</span>
              <div className="text-xl font-bold text-secondary">₹4,225</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
              <span className="material-symbols-outlined text-primary text-xl">medical_services</span>
              <div className="font-bold text-white text-sm">Emergency Medical Cover</div>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Up to ₹3,00,000 cashless hospitalization for member &amp; dependents.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
              <span className="material-symbols-outlined text-secondary text-xl">build_circle</span>
              <div className="font-bold text-white text-sm">Hardware &amp; Tool Protection</div>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                0% interest micro-loans for accidental tool loss or voltage meter replacement.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
              <span className="material-symbols-outlined text-tertiary text-xl">umbrella</span>
              <div className="font-bold text-white text-sm">Monsoon Rain Wage Subsidy</div>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Guaranteed baseline income during extreme weather flooding in Chennai.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
