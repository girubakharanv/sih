import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGovernment } from './GovernmentContext';
import ShaderBackground from '../components/ShaderBackground';
import api from '../services/api';

export default function GovernmentAuth() {
  const navigate = useNavigate();
  const { government, updateGovernment } = useGovernment();

  const [identifier, setIdentifier] = useState(government.id || 'GOV-TN-042');
  const [password, setPassword] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setErrorMsg('');

    if (!identifier.trim() || !password.trim()) {
      setIsVerifying(false);
      setErrorMsg('Official ID and Password are required.');
      return;
    }

    try {
      // Hit real backend (mocked for demo)
      await api.login({
        identifier: identifier,
        role: 'GOVERNMENT'
      });
      
      setTimeout(() => {
        setIsVerifying(false);
        updateGovernment({ isAuthenticated: true });
        navigate('/government');
      }, 800);
      
    } catch (err) {
      setIsVerifying(false);
      setErrorMsg(err.message || 'Authorization failed.');
    }
  };

  return (
    <div className="w-full min-h-screen relative bg-background text-on-background selection:bg-primary selection:text-white">
      <ShaderBackground className="fixed inset-0 z-0 opacity-20 pointer-events-none" />

      <div className="relative z-10 w-full min-h-screen pt-28 px-4 max-w-2xl mx-auto pb-20 flex flex-col justify-center">
        {/* Header Branding */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-3">
            <span className="material-symbols-outlined text-sm text-primary">verified_user</span>
            <span className="font-mono text-xs text-primary uppercase tracking-widest font-semibold">
              Authorized Access Only
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight">
            Government Oversight Portal
          </h1>
          <p className="text-xs md:text-sm text-on-surface-variant font-mono mt-2">
            Secure regulatory monitoring and aggregated data governance.
          </p>
        </div>

        {/* Card Box */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-primary/20 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
          {errorMsg && (
            <div className="mb-6 p-3 rounded-xl bg-error/10 border border-error/30 text-error text-xs font-mono flex items-center gap-2 animate-fade-in-up">
              <span className="material-symbols-outlined text-sm">warning</span>
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-6 animate-fade-in-up">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-sans font-bold text-lg text-white">Official Authentication</h3>
                <p className="text-[11px] text-on-surface-variant font-mono mt-0.5 max-w-sm leading-relaxed">
                  Authentication requires verified departmental credentials. All access is logged for data privacy compliance.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-on-surface-variant tracking-wider font-semibold mb-2">
                  Government Login ID
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-base">
                    badge
                  </span>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="GOV-XXXX"
                    className="w-full bg-[#1c1b1c] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white font-mono focus:outline-none focus:border-primary transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-on-surface-variant tracking-wider font-semibold mb-2">
                  Password
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-base">
                    lock
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#1c1b1c] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white font-mono focus:outline-none focus:border-primary"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full bg-primary hover:bg-primary/90 text-on-primary font-bold py-4 rounded-xl text-sm font-sans flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(173,198,255,0.3)] transition-all disabled:opacity-50"
            >
              {isVerifying ? (
                <>
                  <span className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></span>
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Authenticate Session</span>
                  <span className="material-symbols-outlined text-sm">login</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 p-4 rounded-2xl bg-black/40 border border-primary/20 space-y-2">
            <div className="flex items-center gap-2 text-primary font-mono text-[10px] font-bold">
              <span className="material-symbols-outlined text-sm">security</span>
              <span>DATA GOVERNANCE WARNING</span>
            </div>
            <p className="text-[10px] font-mono text-on-surface-variant/80 leading-relaxed">
              You are accessing the UNIVO Government portal. Access is restricted to authorized personnel. 
              By proceeding, you agree to handle all aggregated data in accordance with strict anonymization 
              and privacy protocols. Individual customer and worker private information is cryptographically protected and remains inaccessible.
            </p>
          </div>

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
