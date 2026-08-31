import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ShaderBackground from '../components/ShaderBackground';
import { useAccessibility } from '../context/AccessibilityContext';
import soundEngine from '../services/soundEngine';

export default function AssistedWorkerRegistration() {
  const { t, language } = useAccessibility();
  const [step, setStep] = useState(1);
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('EXPERIENCED');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const trades = [
    { id: 'elec', name: 'Electrician (மின்சார வேலை / बिजली)', icon: 'bolt', color: '#f59e0b' },
    { id: 'plumb', name: 'Plumber (குழாய் வேலை / प्लम्बर)', icon: 'faucet', color: '#3b82f6' },
    { id: 'carp', name: 'Carpenter (தச்சு வேலை / बढ़ई)', icon: 'carpenter', color: '#92400e' },
    { id: 'driver', name: 'Driver & Logistics (வாகனம் / चालक)', icon: 'local_shipping', color: '#8b5cf6' },
    { id: 'mason', name: 'Mason & Construction (கட்டுமானம் / राजमिस्त्री)', icon: 'foundation', color: '#71717a' },
    { id: 'farm', name: 'Agri & Solar Tech (வேளாண்மை / कृषि)', icon: 'solar_power', color: '#10b981' }
  ];

  const handleSelectTrade = (trade) => {
    soundEngine.playClick();
    setSelectedTrade(trade);
    setStep(2);
  };

  const handleDialerInput = (num) => {
    soundEngine.playClick();
    if (mobileNumber.length < 10) {
      setMobileNumber((prev) => prev + num);
    }
  };

  const handleBackspace = () => {
    soundEngine.playClick();
    setMobileNumber((prev) => prev.slice(0, -1));
  };

  const handlePhotoCapture = () => {
    soundEngine.playClick();
    setHasPhoto(true);
  };

  const handleComplete = () => {
    soundEngine.playTransitionSweep();
    setIsRegistered(true);
  };

  return (
    <div className="w-full min-h-screen relative bg-[#0e0e0f] text-white selection:bg-primary selection:text-black">
      <ShaderBackground className="fixed inset-0 z-0 opacity-20 pointer-events-none" />

      <div className="relative z-10 w-full min-h-screen pt-28 px-4 md:px-8 max-w-4xl mx-auto pb-28 flex flex-col gap-6">
        {/* Top Voice Prompt Banner */}
        <div className="p-4 rounded-2xl bg-secondary/20 border-2 border-secondary/50 flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={() => soundEngine.playClick()}
              className="w-12 h-12 rounded-full bg-secondary text-black flex items-center justify-center shadow-lg hover:scale-105 active:scale-95"
            >
              <span className="material-symbols-outlined text-2xl">volume_up</span>
            </button>
            <div>
              <span className="text-xs font-mono text-secondary font-bold uppercase block">
                Audio Assistance Active (குரல் வழிகாட்டல் / आवाज़ सहायता)
              </span>
              <span className="text-sm md:text-base font-sans font-bold text-white">
                {step === 1 && 'Select your work skill using the big buttons below.'}
                {step === 2 && 'Type your 10-digit mobile phone number.'}
                {step === 3 && 'Take a photo of your certificate or Aadhaar card.'}
              </span>
            </div>
          </div>

          <span className="text-xs font-mono px-3 py-1 rounded bg-black/40 border border-white/10 font-bold">
            Step {step} of 3
          </span>
        </div>

        {/* Step 1: Giant Visual Trade Selection */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in-up">
            <h2 className="text-2xl font-bold font-sans text-center text-white">
              What work do you do? (உங்கள் தொழில் என்ன? / आपका काम क्या है?)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {trades.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleSelectTrade(t)}
                  className="p-6 rounded-3xl border-2 border-white/15 bg-white/5 hover:bg-white/10 active:scale-95 text-left flex items-center gap-5 transition-all shadow-xl hover:border-primary"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-md"
                    style={{ backgroundColor: `${t.color}30`, color: t.color }}
                  >
                    <span className="material-symbols-outlined text-4xl">{t.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white font-sans">{t.name}</h3>
                    <span className="text-xs font-mono text-secondary font-bold">Tap to Select ✓</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Giant Numeric Dialer for Mobile */}
        {step === 2 && (
          <div className="space-y-6 max-w-md mx-auto w-full animate-fade-in-up">
            <div className="text-center space-y-1">
              <span className="text-xs font-mono text-secondary font-bold">
                Selected Work: {selectedTrade?.name}
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Enter Mobile Number (மொபைல் எண்)
              </h2>
            </div>

            {/* Display Screen */}
            <div className="p-4 rounded-2xl bg-black border-2 border-primary/60 text-center text-3xl font-mono font-bold text-primary tracking-widest min-h-[60px] flex items-center justify-center shadow-inner">
              {mobileNumber || '— — — — — — — — — —'}
            </div>

            {/* Giant Touch Keypad */}
            <div className="grid grid-cols-3 gap-3">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((n) => (
                <button
                  key={n}
                  onClick={() => handleDialerInput(n)}
                  className="py-4 rounded-2xl bg-white/10 hover:bg-white/20 active:bg-primary active:text-black font-mono text-2xl font-bold transition-all shadow-lg"
                >
                  {n}
                </button>
              ))}
              <button
                onClick={handleBackspace}
                className="py-4 rounded-2xl bg-error/20 hover:bg-error/30 text-error font-mono text-xl font-bold flex items-center justify-center"
              >
                <span className="material-symbols-outlined">backspace</span>
              </button>
              <button
                onClick={() => handleDialerInput('0')}
                className="py-4 rounded-2xl bg-white/10 hover:bg-white/20 font-mono text-2xl font-bold"
              >
                0
              </button>
              <button
                disabled={mobileNumber.length < 10}
                onClick={() => setStep(3)}
                className="py-4 rounded-2xl bg-secondary hover:bg-secondary/90 text-black font-mono text-lg font-bold flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none"
              >
                <span className="material-symbols-outlined">check</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Visual Camera Snap for Documents */}
        {step === 3 && !isRegistered && (
          <div className="space-y-6 max-w-md mx-auto w-full text-center animate-fade-in-up">
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Take Photo of Certificate or Aadhaar (ஆவணப் படம் எடுக்கவும்)
            </h2>

            <div className="p-8 rounded-3xl border-2 border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center gap-4">
              {hasPhoto ? (
                <div className="space-y-2">
                  <div className="w-20 h-20 rounded-full bg-secondary/20 text-secondary mx-auto flex items-center justify-center text-3xl">
                    <span className="material-symbols-outlined text-4xl">check_circle</span>
                  </div>
                  <span className="font-bold text-white block">Document Photo Saved ✓</span>
                  <span className="text-xs text-on-surface-variant font-mono">Verified by Cooperative Committee</span>
                </div>
              ) : (
                <>
                  <button
                    onClick={handlePhotoCapture}
                    className="w-24 h-24 rounded-full bg-primary/20 border-2 border-primary text-primary hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-2xl"
                  >
                    <span className="material-symbols-outlined text-4xl">photo_camera</span>
                  </button>
                  <span className="text-sm font-bold text-white">Tap to Snap Photo with Camera</span>
                </>
              )}
            </div>

            <button
              onClick={handleComplete}
              className="w-full py-4 rounded-2xl bg-secondary hover:bg-secondary/90 text-black font-sans font-bold text-base shadow-2xl transition-all"
            >
              Complete Registration &amp; Enter Cooperative Guild
            </button>
          </div>
        )}

        {/* Success Confirmation */}
        {isRegistered && (
          <div className="glass-card p-8 rounded-3xl border-2 border-secondary text-center space-y-4 max-w-md mx-auto animate-fade-in-up">
            <div className="w-20 h-20 rounded-full bg-secondary text-black mx-auto flex items-center justify-center text-4xl shadow-xl">
              <span className="material-symbols-outlined text-4xl">verified</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Registration Complete! (பதிவு முடிந்தது)</h2>
            <p className="text-xs font-mono text-on-surface-variant leading-relaxed">
              Sovereign Worker DID generated for <strong>{mobileNumber}</strong>. You are now an equity co-owner of the UNIVO Artisan Cooperative.
            </p>
            <Link
              to="/worker"
              className="block w-full py-3.5 rounded-xl bg-primary text-black font-bold font-sans text-sm shadow-xl"
            >
              Go to Worker Command Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
