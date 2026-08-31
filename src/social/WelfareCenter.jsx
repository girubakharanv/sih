import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSocial } from './SocialContext';
import ShaderBackground from '../components/ShaderBackground';

export default function WelfareCenter() {
  const { welfareRequests, submitWelfareRequest, protectionAlerts } = useSocial();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState('Emergency Medical & Hospitalization');
  const [amount, setAmount] = useState('₹5,000');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason.trim()) return;
    setIsSubmitting(true);

    setTimeout(() => {
      submitWelfareRequest({ category, amount, reason });
      setIsSubmitting(false);
      setIsModalOpen(false);
      setReason('');
    }, 1000);
  };

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
          <div className="flex items-center gap-2 font-mono text-xs text-secondary">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span>Worker Welfare Pool Balance: ₹4,82,000</span>
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-fade-in-up">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 mb-2">
              <span className="text-[10px] font-mono text-secondary uppercase font-bold tracking-wider">
                Parts B &amp; C: Mutual Aid &amp; Worker Protection
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight">
              Mutual Aid Center &amp; Worker Protection
            </h1>
            <p className="text-xs md:text-sm text-on-surface-variant font-mono mt-1 max-w-2xl">
              Cooperative welfare is a constitutional right, not charity. Self-organized assistance for health, tool recovery, and income disruption.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-3 rounded-xl bg-secondary hover:bg-secondary/90 text-[#003824] font-bold font-sans text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(78,222,163,0.3)] transition-all hover:scale-105"
          >
            <span className="material-symbols-outlined text-base">emergency</span>
            <span>Submit Mutual Aid Request</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* PART C: ACTIVE WORKER PROTECTION & AUTOMATED INTERVENTIONS */}
        {/* ========================================================================= */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-primary/30 space-y-4 font-mono text-xs shadow-2xl animate-fade-in-up">
          <div className="flex justify-between items-center pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">health_and_safety</span>
              <h3 className="font-sans font-bold text-lg text-white">Active Worker Protection Interventions</h3>
            </div>
            <span className="text-secondary font-bold">2 Automated Protective Actions Engaged</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {protectionAlerts.map((alert) => (
              <div
                key={alert.id}
                className="p-5 rounded-2xl bg-[#0e0e0f]/90 border border-white/10 space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-sans font-bold text-sm text-white">{alert.workerName}</span>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${
                        alert.severity === 'HIGH'
                          ? 'bg-error/15 text-error border-error/30'
                          : 'bg-tertiary/15 text-tertiary border-tertiary/30'
                      }`}
                    >
                      {alert.type}
                    </span>
                  </div>
                  <p className="text-on-surface-variant text-[11px] leading-relaxed">{alert.message}</p>
                </div>

                <div className="pt-2 border-t border-white/5 space-y-1 text-[11px]">
                  <div className="text-primary flex items-start gap-1">
                    <span className="font-bold">Automated Action:</span>
                    <span>{alert.automatedAction}</span>
                  </div>
                  <div className="text-secondary flex items-start gap-1">
                    <span className="font-bold">Welfare Desk:</span>
                    <span>{alert.welfareIntervention}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PART B: 4-STAGE MUTUAL AID WORKFLOW & REQUEST AUDIT TABLE */}
        {/* ========================================================================= */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-6 font-mono text-xs animate-fade-in-up">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-sans font-bold text-xl text-white">Mutual Aid Workflow &amp; Disbursements</h3>
              <p className="text-on-surface-variant mt-0.5">
                Every request follows an auditable 4-stage workflow: Request ➔ Rule Check ➔ Committee Review ➔ Disbursed.
              </p>
            </div>
            <span className="text-[10px] text-on-surface-variant">Instant UPI 2.0 Clearing</span>
          </div>

          {/* Workflow Stepper Indicator */}
          <div className="grid grid-cols-4 gap-2 p-3 rounded-2xl bg-[#0e0e0f]/90 border border-white/5 text-center text-[10px] uppercase font-bold">
            <div className="p-2 rounded-lg bg-primary/20 text-primary border border-primary/30">
              1. Submission
            </div>
            <div className="p-2 rounded-lg bg-secondary/20 text-secondary border border-secondary/30">
              2. Rule Check
            </div>
            <div className="p-2 rounded-lg bg-primary/20 text-primary border border-primary/30">
              3. Co-op Review
            </div>
            <div className="p-2 rounded-lg bg-secondary/20 text-secondary border border-secondary/30">
              4. Direct Payout
            </div>
          </div>

          {/* Request Records Table */}
          <div className="space-y-3">
            {welfareRequests.map((req) => (
              <div
                key={req.id}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-bold">{req.id}</span>
                    <span className="text-white font-sans font-bold text-sm">• {req.category}</span>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${
                        req.status === 'APPROVED_DISBURSED'
                          ? 'bg-secondary/15 text-secondary border-secondary/30'
                          : 'bg-tertiary/15 text-tertiary border-tertiary/30'
                      }`}
                    >
                      {req.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-bold text-secondary">{req.amountRequested}</span>
                    <div className="text-[10px] text-on-surface-variant">{req.submittedAt}</div>
                  </div>
                </div>

                <p className="text-white/80 text-[11px] leading-relaxed italic">
                  "{req.reason}"
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-white/5 text-[10px] text-on-surface-variant">
                  <div>
                    <span className="block text-[9px] uppercase font-bold text-white/60">Rule Verification:</span>
                    <span className="text-secondary">{req.ruleCheckResult}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase font-bold text-white/60">Reviewed By:</span>
                    <span className="text-white/90">{req.reviewedBy}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase font-bold text-white/60">Settlement Ledger:</span>
                    <span className="text-primary font-bold">{req.disbursementTxn}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Mutual Aid Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card rounded-3xl p-6 md:p-8 max-w-lg w-full border border-secondary/40 shadow-2xl space-y-4 font-mono text-xs animate-fade-in-up">
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <h3 className="font-sans font-bold text-xl text-white">Apply for Cooperative Mutual Aid</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-on-surface-variant uppercase font-semibold mb-1">
                  Welfare Category:
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#1c1b1c] border border-white/10 rounded-xl p-3 text-white text-xs"
                >
                  <option value="Emergency Medical & Hospitalization">Emergency Medical &amp; Hospitalization</option>
                  <option value="Monsoon & Climate Income Support">Monsoon &amp; Climate Income Support</option>
                  <option value="Equipment / Tool Replacement Grant">Equipment / Tool Replacement Grant</option>
                  <option value="Family Education & Caregiver Aid">Family Education &amp; Caregiver Aid</option>
                </select>
              </div>

              <div>
                <label className="block text-on-surface-variant uppercase font-semibold mb-1">
                  Requested Emergency Grant Amount:
                </label>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. ₹5,000"
                  className="w-full bg-[#1c1b1c] border border-white/10 rounded-xl p-3 text-white text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-on-surface-variant uppercase font-semibold mb-1">
                  Circumstances &amp; Description:
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Describe emergency, medical admission, damaged hardware, or weather stoppage..."
                  className="w-full bg-[#1c1b1c] border border-white/10 rounded-xl p-3 text-white text-xs min-h-[90px] resize-none"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-white/5 text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 rounded-xl bg-secondary hover:bg-secondary/90 text-[#003824] font-bold font-sans text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(78,222,163,0.3)] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Validating Eligibility Rules...</span>
                  ) : (
                    <span>Submit to Committee</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
