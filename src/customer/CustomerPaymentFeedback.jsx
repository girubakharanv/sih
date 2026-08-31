import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCustomer } from './CustomerContext';
import ShaderBackground from '../components/ShaderBackground';

export default function CustomerPaymentFeedback() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { activeJobs, completeJob } = useCustomer();

  const job = activeJobs.find((j) => j.id === jobId) || activeJobs[0] || {
    id: 'UNV-JOB-9410',
    serviceName: 'Main Power MCB & Surge Breaker Replacement',
    worker: {
      name: 'Karthik Subramanian',
      role: 'Senior Master Electrician',
      trustScore: 99.4,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    financials: {
      basePay: 1200,
      parts: 350,
      coopTax: 75,
      platformFee: 45,
      total: 1670
    }
  };

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'wallet'
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  // 5-Dimension Structured Feedback
  const [ratings, setRatings] = useState({
    workmanship: 5,
    professionalism: 5,
    punctuality: 5,
    safety: 5,
    overall: 5
  });

  const [feedbackNote, setFeedbackNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRatingChange = (key, value) => {
    setRatings((prev) => ({ ...prev, [key]: value }));
  };

  const handleProcessPayment = (e) => {
    e.preventDefault();
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsPaid(true);
    }, 1200);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    completeJob(job.id, {
      ...ratings,
      paymentMethod,
      note: feedbackNote
    });

    setTimeout(() => {
      navigate('/customer');
    }, 2000);
  };

  const ratingCategories = [
    { key: 'workmanship', label: 'Workmanship & Technical Quality', desc: 'Precision of fix, durability, correct tooling' },
    { key: 'professionalism', label: 'Professionalism & Communication', desc: 'Clear explanation, polite conduct, respect' },
    { key: 'punctuality', label: 'Punctuality & Timeliness', desc: 'Arrival within predicted ETA window' },
    { key: 'safety', label: 'Safety Protocols & Cleanliness', desc: 'Adherence to protective gear and site clean-up' },
    { key: 'overall', label: 'Overall Cooperative Experience', desc: 'Fairness, transparency, and trust' }
  ];

  return (
    <div className="w-full min-h-screen relative bg-background text-on-background selection:bg-primary selection:text-on-primary">
      <ShaderBackground className="fixed inset-0 z-0 opacity-25 pointer-events-none" />

      <div className="relative z-10 w-full min-h-screen pt-28 px-4 md:px-10 max-w-4xl mx-auto pb-28 flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link
            to="/customer"
            className="flex items-center gap-2 text-xs font-mono text-on-surface-variant hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Back to Customer Portal</span>
          </Link>
          <span className="text-[11px] font-mono text-secondary bg-secondary/10 border border-secondary/20 px-3 py-1 rounded-full">
            Stage 3 of 3: Settlement &amp; Feedback
          </span>
        </div>

        <div className="animate-fade-in-up">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-secondary text-base">task_alt</span>
            <span className="font-mono text-xs text-secondary font-bold uppercase">
              Service Successfully Executed
            </span>
          </div>
          <h1 className="text-3xl font-sans font-bold text-white tracking-tight">
            Transparent Settlement &amp; Rating
          </h1>
          <p className="text-xs text-on-surface-variant font-mono mt-1">
            Job #{job.id} • {job.serviceName} performed by {job.worker?.name}
          </p>
        </div>

        {/* STEP 1: TRANSPARENT PAYMENT BREAKDOWN */}
        {!isPaid ? (
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-6 shadow-2xl animate-fade-in-up">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <h2 className="font-sans font-bold text-xl text-white">Itemized Invoice Breakdown</h2>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 border border-white/10 text-on-surface-variant">
                Guaranteed Fair Rate
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center text-on-surface-variant">
                <span>Verified Labor Pay (Direct to Technician):</span>
                <span className="text-white font-bold">₹{job.financials?.basePay}</span>
              </div>
              <div className="flex justify-between items-center text-on-surface-variant">
                <span>Replacement Parts / Hardware (Itemized Breaker):</span>
                <span className="text-white font-bold">₹{job.financials?.parts}</span>
              </div>
              <div className="flex justify-between items-center text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <span>Cooperative Community Welfare Fund (5%):</span>
                  <span className="text-[10px] text-secondary" title="Health & pension for gig workers">ℹ</span>
                </span>
                <span className="text-secondary font-bold">+₹{job.financials?.coopTax}</span>
              </div>
              <div className="flex justify-between items-center text-on-surface-variant">
                <span>Decentralized Network Protocol &amp; Hosting (3%):</span>
                <span className="text-white font-bold">+₹{job.financials?.platformFee}</span>
              </div>

              <div className="border-t border-white/15 pt-3 flex justify-between items-center text-base font-bold text-white">
                <span>Total Amount Due:</span>
                <span className="text-secondary text-xl">₹{job.financials?.total}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-mono uppercase text-on-surface-variant font-semibold mb-3">
                Select Settlement Method:
              </label>
              <div className="grid grid-cols-3 gap-3 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3.5 rounded-2xl border text-center transition-all ${
                    paymentMethod === 'upi'
                      ? 'bg-primary/20 text-white font-bold border-primary shadow-[0_0_15px_rgba(173,198,255,0.2)]'
                      : 'bg-white/5 border-white/10 text-on-surface-variant hover:bg-white/10'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg mb-1 block">qr_code_scanner</span>
                  <span>Instant UPI (GPay/PhonePe)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-2xl border text-center transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-primary/20 text-white font-bold border-primary shadow-[0_0_15px_rgba(173,198,255,0.2)]'
                      : 'bg-white/5 border-white/10 text-on-surface-variant hover:bg-white/10'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg mb-1 block">credit_card</span>
                  <span>Credit / Debit Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('wallet')}
                  className={`p-3.5 rounded-2xl border text-center transition-all ${
                    paymentMethod === 'wallet'
                      ? 'bg-primary/20 text-white font-bold border-primary shadow-[0_0_15px_rgba(173,198,255,0.2)]'
                      : 'bg-white/5 border-white/10 text-on-surface-variant hover:bg-white/10'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg mb-1 block">account_balance_wallet</span>
                  <span>UNV Co-op Balance</span>
                </button>
              </div>
            </div>

            <button
              onClick={handleProcessPayment}
              disabled={isProcessingPayment}
              className="w-full bg-secondary hover:bg-secondary/90 text-[#003824] font-bold py-4 rounded-xl text-sm font-sans flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(78,222,163,0.3)] transition-all hover:scale-[1.01] disabled:opacity-50"
            >
              {isProcessingPayment ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#003824] border-t-transparent rounded-full animate-spin"></span>
                  <span>Authenticating Gateway &amp; Releasing Escrow...</span>
                </>
              ) : (
                <>
                  <span>Authorize Settlement of ₹{job.financials?.total}</span>
                  <span className="material-symbols-outlined text-sm">lock</span>
                </>
              )}
            </button>
          </div>
        ) : (
          /* STEP 2: STRUCTURED 5-DIMENSION FEEDBACK */
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-6 shadow-2xl animate-fade-in-up">
            <div className="p-4 rounded-2xl bg-secondary/10 border border-secondary/30 flex items-center gap-3 text-secondary text-xs font-mono">
              <span className="material-symbols-outlined text-xl">check_circle</span>
              <span>Payment Verified &amp; Settled via {paymentMethod.toUpperCase()}. Digital Receipt Dispatched.</span>
            </div>

            <div>
              <h2 className="font-sans font-bold text-2xl text-white">
                Evaluate Technician: {job.worker?.name}
              </h2>
              <p className="text-xs text-on-surface-variant font-mono mt-1">
                Your structured feedback directly updates the worker's cooperative Trust Score on the blockchain ledger.
              </p>
            </div>

            {/* 5 Rating Dimension Sliders / Stars */}
            <div className="space-y-4">
              {ratingCategories.map((cat) => (
                <div
                  key={cat.key}
                  className="p-4 rounded-2xl bg-[#0e0e0f]/80 border border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                >
                  <div>
                    <h4 className="font-sans font-bold text-sm text-white">{cat.label}</h4>
                    <p className="text-[11px] font-mono text-on-surface-variant/70 mt-0.5">{cat.desc}</p>
                  </div>

                  {/* 5-Star interactive buttons */}
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingChange(cat.key, star)}
                        className={`text-xl transition-all ${
                          star <= ratings[cat.key] ? 'text-primary scale-110' : 'text-white/20 hover:text-white/40'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                    <span className="font-mono text-xs text-primary font-bold ml-2 w-6 text-right">
                      {ratings[cat.key]}.0
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Qualitative Feedback */}
            <div>
              <label className="block text-xs font-mono uppercase text-on-surface-variant font-semibold mb-2">
                Additional Comments for Cooperative Registry (Optional):
              </label>
              <textarea
                value={feedbackNote}
                onChange={(e) => setFeedbackNote(e.target.value)}
                placeholder="Describe your satisfaction with the repair quality, clean up, or technical conduct..."
                className="w-full bg-[#1c1b1c] border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder:text-on-surface-variant/40 font-sans min-h-[90px] focus:outline-none focus:border-primary resize-none"
              />
            </div>

            <button
              onClick={handleSubmitReview}
              disabled={isSubmitted}
              className="w-full bg-primary hover:bg-primary/90 text-on-primary font-bold py-4 rounded-xl text-sm font-sans flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(173,198,255,0.3)] transition-all disabled:opacity-50"
            >
              {isSubmitted ? (
                <>
                  <span className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></span>
                  <span>Recorded! Updating Cooperative Trust Ledger...</span>
                </>
              ) : (
                <>
                  <span>Submit Structured Feedback</span>
                  <span className="material-symbols-outlined text-sm">send</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
