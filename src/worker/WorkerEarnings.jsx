import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWorker } from './WorkerContext';
import ShaderBackground from '../components/ShaderBackground';

export default function WorkerEarnings() {
  const { earnings, worker } = useWorker();
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawnSuccess, setWithdrawnSuccess] = useState(false);

  const handleInstantUpiWithdraw = () => {
    setIsWithdrawing(true);
    setTimeout(() => {
      setIsWithdrawing(false);
      setWithdrawnSuccess(true);
      setTimeout(() => setWithdrawnSuccess(false), 3500);
    }, 1200);
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
            Transparent Cooperative Economics
          </span>
        </div>

        {/* Title */}
        <div className="animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight">
            Earnings &amp; Cooperative Balance
          </h1>
          <p className="text-xs md:text-sm text-on-surface-variant font-mono mt-1 max-w-2xl">
            Zero hidden deductions. Zero commission extraction. 100% of customer labor pay is settled to your bank.
          </p>
        </div>

        {/* Withdrawal Banner */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-secondary/40 shadow-2xl relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 animate-fade-in-up">
          <div>
            <span className="text-[10px] font-mono uppercase text-on-surface-variant font-semibold">Available for Instant UPI Release</span>
            <div className="text-4xl font-bold font-mono text-secondary mt-1">₹{earnings.pendingSettlement}</div>
            <div className="text-xs font-mono text-on-surface-variant mt-1">
              Destination: <strong className="text-white">{worker.bankUpi}</strong> (HDFC Bank)
            </div>
          </div>

          <div>
            <button
              type="button"
              disabled={isWithdrawing}
              onClick={handleInstantUpiWithdraw}
              className="px-6 py-4 rounded-xl bg-secondary hover:bg-secondary/90 text-[#003824] font-bold font-sans text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(78,222,163,0.3)] transition-all hover:scale-105 disabled:opacity-50"
            >
              {isWithdrawing ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#003824] border-t-transparent rounded-full animate-spin"></span>
                  <span>Transmitting via UPI...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">send_to_mobile</span>
                  <span>Instant Withdrawal to UPI</span>
                </>
              )}
            </button>
            {withdrawnSuccess && (
              <span className="text-[11px] font-mono text-secondary block mt-1 text-center animate-fade-in-up">
                ✓ Settled via UPI Ref #HDFC-88912
              </span>
            )}
          </div>
        </div>

        {/* Financial Aggregates Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
          <div className="glass-card p-5 rounded-2xl border border-white/10">
            <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Today's Total Gross</span>
            <div className="text-2xl font-bold text-white mt-1">₹{earnings.todayGross}</div>
            <span className="text-[10px] text-secondary">3 Missions Settled</span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10">
            <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Current Week</span>
            <div className="text-2xl font-bold text-white mt-1">₹{earnings.weekGross}</div>
            <span className="text-[10px] text-on-surface-variant/80">Avg ₹4,360 / day</span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10">
            <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Monthly Total</span>
            <div className="text-2xl font-bold text-white mt-1">₹{earnings.monthGross}</div>
            <span className="text-[10px] text-primary">Top 5% Guild Tier</span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10">
            <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Co-op Dividends Earned</span>
            <div className="text-2xl font-bold text-secondary mt-1">+₹{earnings.dividendsEarned}</div>
            <span className="text-[10px] text-secondary">Quarterly Equity Share</span>
          </div>
        </div>

        {/* Itemized Transaction History */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-4 font-mono text-xs">
          <div className="flex justify-between items-center pb-3 border-b border-white/10">
            <h3 className="font-sans font-bold text-lg text-white">Recent Transactions &amp; Settlements</h3>
            <span className="text-on-surface-variant">Instant Settlement Protocol</span>
          </div>

          <div className="space-y-3">
            {earnings.transactions.map((txn) => (
              <div
                key={txn.id}
                className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">check_circle</span>
                  <div>
                    <div className="text-white font-bold">{txn.job}</div>
                    <div className="text-[11px] text-on-surface-variant/80 mt-0.5">
                      {txn.id} • {txn.date}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-secondary font-bold text-sm">{txn.earned}</div>
                  <div className="text-[10px] text-on-surface-variant">{txn.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
