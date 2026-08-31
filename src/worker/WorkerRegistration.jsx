import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useWorker } from './WorkerContext';
import { SERVICE_ROOMS, LANGUAGES } from '../customer/CustomerContext';
import ShaderBackground from '../components/ShaderBackground';
import api from '../services/api';

export default function WorkerRegistration() {
  const navigate = useNavigate();
  const { worker, setWorker } = useWorker();

  const [step, setStep] = useState(1); // 1: Personal & Contact, 2: Trade & Skills, 3: Certificates & Verification Evidence, 4: Financial & Consent
  const [name, setName] = useState(worker.name || '');
  const [mobile, setMobile] = useState(worker.phone || '+91 98401 23456');
  const [location, setLocation] = useState(worker.location || 'Sector 4, Chennai Central');
  const [selectedRooms, setSelectedRooms] = useState(['Electrical Grid', 'Renewable Solar & Battery']);
  const [skillsText, setSkillsText] = useState('High Voltage Isolation, Microgrid Inverters, Phase Balancing, MCB Switchboard Sizing');
  const [experienceYears, setExperienceYears] = useState(8);
  const [certFile, setCertFile] = useState('ITI_Electrical_Diploma_GradeA.pdf');
  const [idFile, setIdFile] = useState('Aadhaar_National_ID_Verified.pdf');
  const [policeClearance, setPoliceClearance] = useState('Police_Clearance_Record_2026.pdf');
  const [bankUpi, setBankUpi] = useState(worker.bankUpi || 'karthik@okhdfcbank');
  const [emergencyName, setEmergencyName] = useState(worker.emergencyContact.name || 'Vasanthi Subramanian');
  const [emergencyPhone, setEmergencyPhone] = useState(worker.emergencyContact.phone || '+91 98401 98711');
  const [consentData, setConsentData] = useState(true);
  const [consentDutyGps, setConsentDutyGps] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleRoom = (roomName) => {
    if (selectedRooms.includes(roomName)) {
      setSelectedRooms(selectedRooms.filter((r) => r !== roomName));
    } else {
      setSelectedRooms([...selectedRooms, roomName]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.login({
        phone: mobile.startsWith('+') ? mobile : `+91 ${mobile}`,
        role: 'WORKER'
      });

      setIsSubmitting(false);
      setWorker((prev) => ({
        ...prev,
        name,
        phone: mobile,
        location,
        experienceYears,
        bankUpi,
        emergencyContact: {
          name: emergencyName,
          relation: 'Nominated Contact',
          phone: emergencyPhone
        }
      }));
      navigate('/worker/passport');
    } catch (err) {
      setIsSubmitting(false);
      console.error('Registration failed:', err);
      alert('Registration failed: ' + err.message);
    }
  };

  return (
    <div className="w-full min-h-screen relative bg-background text-on-background selection:bg-primary selection:text-on-primary">
      <ShaderBackground className="fixed inset-0 z-0 opacity-25 pointer-events-none" />

      <div className="relative z-10 w-full min-h-screen pt-28 px-4 md:px-10 max-w-4xl mx-auto pb-28 flex flex-col gap-8">
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            to="/worker"
            className="flex items-center gap-2 text-xs font-mono text-on-surface-variant hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Back to Worker Hub</span>
          </Link>
          <span className="text-[11px] font-mono text-secondary bg-secondary/10 border border-secondary/20 px-3 py-1 rounded-full">
            Artisan Guild Onboarding Protocol
          </span>
        </div>

        {/* Title */}
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-[10px] font-mono text-primary uppercase tracking-widest font-semibold">
              Sovereign Guild Membership
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight">
            Artisan Co-owner Registration
          </h1>
          <p className="text-xs md:text-sm text-on-surface-variant font-mono mt-1 max-w-2xl">
            You are joining a democratic workers cooperative. You are not a contractor or delivery driver — you are an equity shareholder with full vote, transparent earnings, and verified dignity.
          </p>
        </div>

        {/* Wizard Stepper */}
        <div className="grid grid-cols-4 gap-2 font-mono text-xs">
          {[
            { num: 1, label: 'Identity' },
            { num: 2, label: 'Trade & Skills' },
            { num: 3, label: 'Verification Proof' },
            { num: 4, label: 'Settlement & Privacy' }
          ].map((s) => (
            <button
              key={s.num}
              type="button"
              onClick={() => setStep(s.num)}
              className={`p-3 rounded-2xl border text-center transition-all ${
                step === s.num
                  ? 'bg-primary/20 border-primary text-white font-bold shadow-[0_0_15px_rgba(173,198,255,0.2)]'
                  : step > s.num
                  ? 'bg-secondary/10 border-secondary/30 text-secondary'
                  : 'bg-white/5 border-white/10 text-on-surface-variant'
              }`}
            >
              <div className="text-sm font-bold">{s.num}</div>
              <div className="text-[10px] opacity-80 mt-0.5">{s.label}</div>
            </button>
          ))}
        </div>

        {/* Wizard Form Card */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* STEP 1: Personal & Contact */}
          {step === 1 && (
            <div className="space-y-5 animate-fade-in-up">
              <div>
                <h3 className="font-sans font-bold text-xl text-white">1. Master Artisan Identity</h3>
                <p className="text-xs text-on-surface-variant font-mono mt-0.5">
                  Your legal identity is cryptographically tied to your sovereign Worker DID.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-on-surface-variant font-semibold mb-1.5">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#1c1b1c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-sans focus:outline-none focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-on-surface-variant font-semibold mb-1.5">
                    Primary Mobile Number (+91)
                  </label>
                  <input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full bg-[#1c1b1c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-on-surface-variant font-semibold mb-1.5">
                  Primary Operating Sector / Base City
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-[#1c1b1c] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-sans focus:outline-none focus:border-primary"
                  required
                />
              </div>

              {/* Emergency Contact */}
              <div className="p-4 rounded-2xl bg-[#0e0e0f]/80 border border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-secondary font-mono text-xs font-bold">
                  <span className="material-symbols-outlined text-sm">shield</span>
                  <span>Safety Protocol: On-Site Emergency Nominee</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <input
                    type="text"
                    value={emergencyName}
                    onChange={(e) => setEmergencyName(e.target.value)}
                    placeholder="Nominee Full Name (e.g. Spouse / Sibling)"
                    className="bg-[#1c1b1c] border border-white/10 rounded-xl p-3 text-white"
                  />
                  <input
                    type="text"
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    placeholder="Emergency Phone (+91 ...)"
                    className="bg-[#1c1b1c] border border-white/10 rounded-xl p-3 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-bold text-xs font-sans flex items-center gap-2 shadow-[0_0_15px_rgba(173,198,255,0.3)]"
                >
                  <span>Proceed to Trade &amp; Skills</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Trade & Skills */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in-up">
              <div>
                <h3 className="font-sans font-bold text-xl text-white">2. Trade Specializations &amp; Chambers</h3>
                <p className="text-xs text-on-surface-variant font-mono mt-0.5">
                  Select the cooperative chambers where you practice your craftsmanship.
                </p>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-on-surface-variant font-semibold mb-2">
                  Select Service Chambers (Multiple Allowed):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {SERVICE_ROOMS.slice(0, 12).map((room) => {
                    const isSelected = selectedRooms.includes(room.name);
                    return (
                      <button
                        key={room.id}
                        type="button"
                        onClick={() => toggleRoom(room.name)}
                        className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                          isSelected
                            ? 'bg-primary/20 border-primary text-white font-bold shadow-[0_0_12px_rgba(173,198,255,0.2)]'
                            : 'bg-white/5 border-white/10 text-on-surface-variant hover:bg-white/10'
                        }`}
                      >
                        <span className="material-symbols-outlined text-base" style={{ color: room.color }}>
                          {room.icon}
                        </span>
                        <span className="text-xs font-sans truncate">{room.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-on-surface-variant font-semibold mb-1.5">
                  Specific Technical Skills (Comma-separated tags):
                </label>
                <textarea
                  value={skillsText}
                  onChange={(e) => setSkillsText(e.target.value)}
                  className="w-full bg-[#1c1b1c] border border-white/10 rounded-xl p-3.5 text-xs text-white font-mono focus:outline-none focus:border-primary resize-none min-h-[90px]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-on-surface-variant font-semibold mb-1.5">
                  Years of Certified Trade Experience:
                </label>
                <input
                  type="number"
                  min="1"
                  max="40"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(parseInt(e.target.value) || 1)}
                  className="w-40 bg-[#1c1b1c] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-mono"
                />
              </div>

              <div className="flex justify-between pt-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-on-surface-variant font-mono text-xs"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-bold text-xs font-sans flex items-center gap-2 shadow-[0_0_15px_rgba(173,198,255,0.3)]"
                >
                  <span>Proceed to Verification Proof</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Certificates & Truth Pipeline Proof */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in-up">
              <div>
                <h3 className="font-sans font-bold text-xl text-white">3. Verification Evidence &amp; Truth Protocol</h3>
                <p className="text-xs text-on-surface-variant font-mono mt-0.5">
                  UNIVO strictly enforces the Truth Protocol: <em>Never present an unverified claim as verified.</em>
                </p>
              </div>

              {/* 5-Stage Verification Pipeline Indicator */}
              <div className="p-4 rounded-2xl bg-[#0e0e0f]/90 border border-primary/20 space-y-2 font-mono text-xs">
                <span className="text-[10px] text-primary uppercase font-bold tracking-wider">
                  Cryptographic Verification Pipeline:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] pt-1">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-center">
                    <span className="text-primary font-bold">1. Self-Declared</span>
                    <div className="text-[9px] text-on-surface-variant mt-0.5">Candidate Claim</div>
                  </div>
                  <div className="p-2 rounded-lg bg-secondary/15 border border-secondary/30 text-center">
                    <span className="text-secondary font-bold">2. Document Proof</span>
                    <div className="text-[9px] text-on-surface-variant mt-0.5">Certificates &amp; ITI</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-center">
                    <span className="text-white font-bold">3. Co-op Audit</span>
                    <div className="text-[9px] text-on-surface-variant mt-0.5">Committee Review</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-center">
                    <span className="text-white font-bold">4. History Log</span>
                    <div className="text-[9px] text-on-surface-variant mt-0.5">Logged Missions</div>
                  </div>
                  <div className="p-2 rounded-lg bg-primary/20 border border-primary/40 text-center">
                    <span className="text-primary font-bold">5. Peer Trust</span>
                    <div className="text-[9px] text-on-surface-variant mt-0.5">Guild Endorsements</div>
                  </div>
                </div>
              </div>

              {/* Document Upload Simulation */}
              <div className="space-y-3 font-mono text-xs">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary text-2xl">workspace_premium</span>
                    <div>
                      <div className="text-white font-bold">Trade Diploma / Government ITI Certificate</div>
                      <div className="text-[11px] text-on-surface-variant mt-0.5">{certFile}</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-secondary font-bold px-2 py-0.5 rounded bg-secondary/15 border border-secondary/30">
                    ATTACHED
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-2xl">badge</span>
                    <div>
                      <div className="text-white font-bold">National Identity (Aadhaar / Voter ID)</div>
                      <div className="text-[11px] text-on-surface-variant mt-0.5">{idFile}</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-secondary font-bold px-2 py-0.5 rounded bg-secondary/15 border border-secondary/30">
                    VERIFIED
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-white/70 text-2xl">verified_user</span>
                    <div>
                      <div className="text-white font-bold">Police Clearance &amp; Background Verification</div>
                      <div className="text-[11px] text-on-surface-variant mt-0.5">{policeClearance}</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-primary font-bold px-2 py-0.5 rounded bg-primary/15 border border-primary/30">
                    CLEARED
                  </span>
                </div>
              </div>

              <div className="flex justify-between pt-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-on-surface-variant font-mono text-xs"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-bold text-xs font-sans flex items-center gap-2 shadow-[0_0_15px_rgba(173,198,255,0.3)]"
                >
                  <span>Proceed to Financial Settlement</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Financial & Consent */}
          {step === 4 && (
            <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up">
              <div>
                <h3 className="font-sans font-bold text-xl text-white">4. Direct Settlement &amp; Dignity Consents</h3>
                <p className="text-xs text-on-surface-variant font-mono mt-0.5">
                  100% of customer labor pay is settled to your UPI / Bank within 30 seconds of mission sign-off.
                </p>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-on-surface-variant font-semibold mb-1.5">
                  Instant UPI VPA / Bank Settlement Identifier:
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary text-base">
                    account_balance_wallet
                  </span>
                  <input
                    type="text"
                    value={bankUpi}
                    onChange={(e) => setBankUpi(e.target.value)}
                    placeholder="e.g. yourname@okhdfcbank or 98401XXXXX@upi"
                    className="w-full bg-[#1c1b1c] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-secondary"
                    required
                  />
                </div>
                <p className="text-[11px] text-on-surface-variant/70 font-mono mt-1.5">
                  Settlements are processed via National Automated Clearing House &amp; Instant UPI 2.0 with zero commission deductions.
                </p>
              </div>

              {/* Dignity & Privacy Consents */}
              <div className="space-y-3 font-mono text-xs">
                <label className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentDutyGps}
                    onChange={(e) => setConsentDutyGps(e.target.checked)}
                    className="mt-0.5 accent-primary"
                  />
                  <div>
                    <span className="text-white font-bold block">On-Duty GPS Telemetry Only</span>
                    <span className="text-on-surface-variant text-[11px]">
                      Your location is strictly queried while a mission is active for customer ETA safety. Zero passive surveillance when off duty.
                    </span>
                  </div>
                </label>

                <label className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentData}
                    onChange={(e) => setConsentData(e.target.checked)}
                    className="mt-0.5 accent-secondary"
                  />
                  <div>
                    <span className="text-white font-bold block">Cooperative Data Sovereignty</span>
                    <span className="text-on-surface-variant text-[11px]">
                      Your Skill DNA and Trust credentials belong to you in your portable UNIVO Worker Passport and cannot be locked by any platform.
                    </span>
                  </div>
                </label>
              </div>

              <div className="flex justify-between pt-3">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-on-surface-variant font-mono text-xs"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 rounded-xl bg-secondary hover:bg-secondary/90 text-[#003824] font-bold text-sm font-sans flex items-center gap-2 shadow-[0_0_20px_rgba(78,222,163,0.3)] transition-all hover:scale-[1.01] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#003824] border-t-transparent rounded-full animate-spin"></span>
                      <span>Issuing Sovereign Worker Passport...</span>
                    </>
                  ) : (
                    <>
                      <span>Complete Registration &amp; View Passport</span>
                      <span className="material-symbols-outlined text-sm">badge</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
