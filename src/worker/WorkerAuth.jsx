import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useWorker } from './WorkerContext';
import ShaderBackground from '../components/ShaderBackground';

export default function WorkerAuth() {
  const navigate = useNavigate();
  const { worker, setWorker } = useWorker();

  const [authMode, setAuthMode] = useState('otp'); // 'otp' | 'password'
  const [step, setStep] = useState(1); // 1: Credential, 2: OTP / Password, 3: Profile
  const [identifier, setIdentifier] = useState(worker.id || 'WRK-7089');
  const [otp, setOtp] = useState(['5', '9', '9', '1']);
  const [password, setPassword] = useState('');
  const [resendTimer, setResendTimer] = useState(38);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Profile data for step 3
  const [name, setName] = useState(worker.name);
  const [email, setEmail] = useState(worker.email);
  const [phone, setPhone] = useState(worker.phone);
  const [emergencyName, setEmergencyName] = useState(worker.emergencyContact?.name || '');
  const [emergencyPhone, setEmergencyPhone] = useState(worker.emergencyContact?.phone || '');

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSendCode = (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setErrorMsg('Please enter a valid Worker ID or mobile number');
      return;
    }
    setErrorMsg('');
    setStep(2);
    setResendTimer(45);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setErrorMsg('');

    try {
      // Simulate checking OTP or Password then hit backend
      if (authMode === 'otp' && otp.filter(Boolean).length < 4) {
        setIsVerifying(false);
        setErrorMsg('Please enter at least the first 4 OTP digits (sample auto-filled: 5991)');
        return;
      }

      // Simulate a small delay for verification
      setTimeout(() => {
        setIsVerifying(false);
        setStep(3);
      }, 800);
      
    } catch (err) {
      setIsVerifying(false);
      setErrorMsg(err.message || 'Login failed.');
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setWorker((prev) => ({
      ...prev,
      name,
      email,
      phone,
      emergencyContact: {
        ...prev.emergencyContact,
        name: emergencyName,
        phone: emergencyPhone
      },
      isAuthenticated: true
    }));
    navigate('/worker');
  };

  return (
    <div className="w-full min-h-screen relative bg-background text-on-background selection:bg-secondary selection:text-[#003824]">
      <ShaderBackground className="fixed inset-0 z-0 opacity-30 pointer-events-none" />

      <div className="relative z-10 w-full min-h-screen pt-28 px-4 max-w-2xl mx-auto pb-20 flex flex-col justify-center">
        {/* Header Branding */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/30 mb-3">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="font-mono text-xs text-secondary uppercase tracking-widest font-semibold">
              UNIVO Cooperative Network
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight">
            Service Worker Portal
          </h1>
          <p className="text-xs md:text-sm text-on-surface-variant font-mono mt-1">
            Biometric &amp; OTP authenticated cooperative node
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-3 mb-8 font-mono text-xs">
          <span className={`px-3 py-1 rounded-lg border ${step === 1 ? 'bg-secondary/20 border-secondary text-secondary font-bold' : 'bg-white/5 border-white/10 text-on-surface-variant'}`}>
            1. Identity
          </span>
          <span className="text-white/20">→</span>
          <span className={`px-3 py-1 rounded-lg border ${step === 2 ? 'bg-secondary/20 border-secondary text-secondary font-bold' : 'bg-white/5 border-white/10 text-on-surface-variant'}`}>
            2. Authentication
          </span>
          <span className="text-white/20">→</span>
          <span className={`px-3 py-1 rounded-lg border ${step === 3 ? 'bg-secondary/20 border-secondary text-secondary font-bold' : 'bg-white/5 border-white/10 text-on-surface-variant'}`}>
            3. Profile Confirm
          </span>
        </div>

        {/* Card Box */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
          {errorMsg && (
            <div className="mb-6 p-3 rounded-xl bg-error/10 border border-error/30 text-error text-xs font-mono flex items-center gap-2 animate-fade-in-up">
              <span className="material-symbols-outlined text-sm">warning</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: ID Entry */}
          {step === 1 && (
            <form onSubmit={handleSendCode} className="space-y-6 animate-fade-in-up">
              <div>
                <label className="block text-xs font-mono uppercase text-on-surface-variant tracking-wider font-semibold mb-2">
                  Worker Login ID or Mobile Number
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-base">
                    badge
                  </span>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="WRK-XXXX or +91..."
                    className="w-full bg-[#1c1b1c]/90 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white font-mono focus:outline-none focus:border-secondary transition-all"
                    required
                  />
                </div>
                <p className="text-[11px] text-on-surface-variant/70 font-mono mt-2">
                  Enter your Cooperative Worker ID or registered phone number.
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-mono pt-2">
                <button
                  type="button"
                  onClick={() => setAuthMode(authMode === 'otp' ? 'password' : 'otp')}
                  className="text-secondary hover:underline"
                >
                  Switch to {authMode === 'otp' ? 'Password Login' : 'Instant OTP Login'}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-secondary hover:bg-secondary/90 text-[#003824] font-bold py-4 rounded-xl text-sm font-sans flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(78,222,163,0.3)] transition-all hover:scale-[1.01]"
              >
                <span>Continue</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </form>
          )}

          {/* STEP 2: OTP / Password Verification */}
          {step === 2 && (
            <form onSubmit={handleVerify} className="space-y-6 animate-fade-in-up">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-sans font-bold text-lg text-white">Enter Security Token</h3>
                  <p className="text-xs text-on-surface-variant font-mono mt-0.5">
                    Transmitted to <span className="text-secondary font-semibold">{identifier}</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-mono text-on-surface-variant hover:text-white underline"
                >
                  Edit ID
                </button>
              </div>

              {authMode === 'otp' ? (
                <div>
                  <div className="flex justify-between gap-2 max-w-sm mx-auto my-4">
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        id={`otp-${i}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        className="w-12 h-14 bg-[#1c1b1c] border border-white/15 rounded-xl text-center font-mono text-xl text-secondary font-bold focus:outline-none focus:border-secondary shadow-inner"
                      />
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono text-on-surface-variant mt-3">
                    <span>Didn't receive code?</span>
                    {resendTimer > 0 ? (
                      <span>Resend in {resendTimer}s</span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setResendTimer(45)}
                        className="text-secondary hover:underline"
                      >
                        Resend OTP Now
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-mono uppercase text-on-surface-variant tracking-wider font-semibold mb-2">
                    Enter Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#1c1b1c] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white font-mono focus:outline-none focus:border-secondary"
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full bg-secondary hover:bg-secondary/90 text-[#003824] font-bold py-4 rounded-xl text-sm font-sans flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(78,222,163,0.3)] transition-all disabled:opacity-50"
              >
                {isVerifying ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#003824] border-t-transparent rounded-full animate-spin"></span>
                    <span>Validating Authenticity...</span>
                  </>
                ) : (
                  <>
                    <span>Verify &amp; Proceed</span>
                    <span className="material-symbols-outlined text-sm">verified_user</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 3: Complete Profile Confirmation */}
          {step === 3 && (
            <form onSubmit={handleSaveProfile} className="space-y-5 animate-fade-in-up">
              <div>
                <h3 className="font-sans font-bold text-lg text-white">Confirm Worker Profile</h3>
                <p className="text-xs text-on-surface-variant font-mono mt-0.5">
                  Confirm your details before entering the Cooperative Dashboard.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-on-surface-variant mb-1.5 font-semibold">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#1c1b1c] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-secondary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-on-surface-variant mb-1.5 font-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#1c1b1c] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-secondary"
                    required
                  />
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="p-4 rounded-2xl bg-[#0e0e0f]/80 border border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-secondary font-mono text-xs font-bold">
                  <span className="material-symbols-outlined text-sm">security</span>
                  <span>Safety Protocol &amp; Emergency Contact</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={emergencyName}
                    onChange={(e) => setEmergencyName(e.target.value)}
                    placeholder="Emergency Contact Name"
                    className="bg-[#1c1b1c] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                  <input
                    type="text"
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    placeholder="Emergency Phone (+91 ...)"
                    className="bg-[#1c1b1c] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-secondary hover:bg-secondary/90 text-[#003824] font-bold py-4 rounded-xl text-sm font-sans flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(78,222,163,0.3)] transition-all hover:scale-[1.01]"
              >
                <span>Enter Worker Dashboard</span>
                <span className="material-symbols-outlined text-sm">login</span>
              </button>
            </form>
          )}
        </div>

        <div className="mt-8 text-center animate-fade-in-up flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-on-surface-variant hover:text-white border border-white/10 transition-all text-xs font-mono"
          >
            <span className="material-symbols-outlined text-sm">home</span>
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
