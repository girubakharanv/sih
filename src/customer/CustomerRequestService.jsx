import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useCustomer, SERVICE_ROOMS, LANGUAGES } from './CustomerContext';
import ShaderBackground from '../components/ShaderBackground';

export default function CustomerRequestService() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { customer, setDraftRequest } = useCustomer();

  // Mode: 'photo' | 'voice' | 'text'
  const initialMode = searchParams.get('mode') || 'photo';
  const preselectedRoom = searchParams.get('room') || '';
  const [activeMode, setActiveMode] = useState(initialMode);

  // Common fields
  const [location, setLocation] = useState(customer.currentLocation.address);
  const [urgency, setUrgency] = useState('elevated'); // 'standard' | 'elevated' | 'emergency'
  const [preferredTime, setPreferredTime] = useState('Today, Immediate (within 30 mins)');

  // 1. PHOTO ENTRY STATE
  const [selectedPhotoPreset, setSelectedPhotoPreset] = useState(null);
  const [customPhotoUrl, setCustomPhotoUrl] = useState(null);
  const [isAnalyzingPhoto, setIsAnalyzingPhoto] = useState(false);
  const [photoDiagnosis, setPhotoDiagnosis] = useState(null);

  const PHOTO_PRESETS = [
    {
      id: 'mcb-overload',
      title: 'Burned MCB Isolator & Tripping Switchboard',
      category: 'Electrical Grid',
      img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&auto=format&fit=crop&q=80',
      diagnosis: {
        probableProblem: 'Thermal Overload & Micro-Arcing in 63A Dual-Pole Breaker',
        serviceCategory: 'Electrical Grid (Room 01)',
        severity: 'HIGH',
        urgency: 'ELEVATED (Within 2 Hours)',
        possibleIssue: 'Corroded Busbar terminal creating thermal choke and repetitive tripping',
        requiredSkills: ['High Voltage Isolation', 'Arc Quench Testing', 'Phase Balancing', 'Terminal Torquing'],
        estimatedDuration: '45 - 60 mins',
        estimatedPriceRange: '₹1,200 - ₹1,600 ($18 - $24 UNV)',
        confidence: 96.8
      }
    },
    {
      id: 'pipe-burst',
      title: 'High Pressure Water Pipe Valve Rupture',
      category: 'Plumbing & Hydro',
      img: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&auto=format&fit=crop&q=80',
      diagnosis: {
        probableProblem: 'Stress Fracture along Main Cold-Water Brass Ball Valve',
        serviceCategory: 'Plumbing & Hydro (Room 02)',
        severity: 'CRITICAL',
        urgency: 'EMERGENCY IMMEDIATE (Under 30 Mins)',
        possibleIssue: 'Water hammer surge degraded threading; continuous active leaking risk to sub-flooring',
        requiredSkills: ['Emergency Pipe Freezing', 'Thread Taping & Solvent Welding', 'Pressure Regulators'],
        estimatedDuration: '30 - 45 mins',
        estimatedPriceRange: '₹950 - ₹1,400 ($14 - $21 UNV)',
        confidence: 98.2
      }
    },
    {
      id: 'hvac-frost',
      title: 'AC Evaporator Frosting & Warm Air Output',
      category: 'Climate & Air',
      img: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&auto=format&fit=crop&q=80',
      diagnosis: {
        probableProblem: 'Refrigerant Micro-Leak with Severe Evaporator Coil Ice Blockage',
        serviceCategory: 'Climate & Air (Room 10)',
        severity: 'MODERATE',
        urgency: 'STANDARD (Today / Scheduled)',
        possibleIssue: 'Low suction line pressure caused expansion valve freezing; dirty capillary filter',
        requiredSkills: ['Halide Leak Detector', 'Gas Recovery & Recharge', 'Coil Chemical Deep Clean'],
        estimatedDuration: '60 - 90 mins',
        estimatedPriceRange: '₹1,800 - ₹2,400 ($26 - $35 UNV)',
        confidence: 94.1
      }
    }
  ];

  const handleSelectPhotoPreset = (preset) => {
    setSelectedPhotoPreset(preset);
    setIsAnalyzingPhoto(true);
    setPhotoDiagnosis(null);

    setTimeout(() => {
      setIsAnalyzingPhoto(false);
      setPhotoDiagnosis(preset.diagnosis);
      setUrgency(preset.diagnosis.severity === 'CRITICAL' ? 'emergency' : 'elevated');
    }, 900);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const dummyUrl = URL.createObjectURL(file);
    setCustomPhotoUrl(dummyUrl);
    handleSelectPhotoPreset(PHOTO_PRESETS[0]);
  };

  // 2. VOICE ENTRY STATE
  const [voiceLang, setVoiceLang] = useState('ta'); // 'ta' | 'hi' | 'en'
  const [isRecording, setIsRecording] = useState(false);
  const [voiceSeconds, setVoiceSeconds] = useState(0);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [voicePipelineStep, setVoicePipelineStep] = useState(0);
  const [voiceStructuredResult, setVoiceStructuredResult] = useState(null);
  const voiceTimerRef = useRef(null);

  const VOICE_SAMPLES = {
    ta: {
      langName: 'Tamil (தமிழ்)',
      sampleAudio: 'வணக்கம், எங்க வீட்டுல மெயின் கரண்ட் பாக்ஸ்ல இருந்து புகை வருது, அடிக்கடி ட்ரிப் ஆகுது. உடனே ஒரு எலக்ட்ரீசியன் வேணும்.',
      translation: 'Hello, smoke is coming from our main current distribution box and it trips repeatedly. Need an electrician immediately.',
      extracted: {
        intent: 'Emergency Electrical Hazard / Fire Risk',
        service: 'Electrical Grid (Room 01)',
        problem: 'Main Switchboard Arcing & Burn Out',
        urgency: 'EMERGENCY (Immediate)',
        requiredSkill: 'High Voltage Isolation & MCB Replacement',
        estimatedRange: '₹1,200 - ₹1,600'
      }
    },
    hi: {
      langName: 'Hindi (हिन्दी)',
      sampleAudio: 'नमस्ते, बाथरूम की मेन पाइपलाइन से बहुत तेज़ पानी बह रहा है और वाल्व बंद नहीं हो रहा। प्लंबर को जल्दी भेजो।',
      translation: 'Hello, water is gushing heavily from the bathroom main pipeline and the valve cannot be shut off. Send a plumber quickly.',
      extracted: {
        intent: 'Active High-Pressure Water Leakage',
        service: 'Plumbing & Hydro (Room 02)',
        problem: 'Broken Shutoff Valve & Line Rupture',
        urgency: 'CRITICAL (Under 30 mins)',
        requiredSkill: 'Acoustic Pipe Sonar & Emergency Isolation',
        estimatedRange: '₹950 - ₹1,400'
      }
    },
    en: {
      langName: 'English',
      sampleAudio: 'Hi UNIVO, our rooftop solar inverter has stopped syncing with the grid and error code E-04 is flashing. Need diagnostic assistance today.',
      translation: 'Hi UNIVO, our rooftop solar inverter has stopped syncing with the grid and error code E-04 is flashing. Need diagnostic assistance today.',
      extracted: {
        intent: 'Solar Grid Inverter Desynchronization',
        service: 'Renewable Solar & Battery (Room 15)',
        problem: 'Inverter Grid Sync Failure / Error Code E-04',
        urgency: 'ELEVATED (Within 4 Hours)',
        requiredSkill: 'Solar Microgrid Calibration & Firmware Flash',
        estimatedRange: '₹1,500 - ₹2,100'
      }
    }
  };

  const startVoiceRecording = () => {
    setIsRecording(true);
    setVoiceSeconds(0);
    setVoiceTranscript('');
    setVoiceStructuredResult(null);
    setVoicePipelineStep(1);

    voiceTimerRef.current = setInterval(() => {
      setVoiceSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopVoiceRecording = () => {
    setIsRecording(false);
    clearInterval(voiceTimerRef.current);

    const sample = VOICE_SAMPLES[voiceLang];
    setVoiceTranscript(sample.sampleAudio);

    // Simulate pipeline steps
    setTimeout(() => setVoicePipelineStep(2), 400); // Acoustic Analysis
    setTimeout(() => setVoicePipelineStep(3), 800); // Semantic Extraction
    setTimeout(() => {
      setVoicePipelineStep(4);
      setVoiceStructuredResult(sample.extracted);
    }, 1300);
  };

  // 3. TEXT ENTRY STATE
  const [textDescription, setTextDescription] = useState(
    preselectedRoom ? `I need service assistance in ${preselectedRoom}. ` : ''
  );
  const [textExtracted, setTextExtracted] = useState(null);
  const [isNlpParsing, setIsNlpParsing] = useState(false);

  useEffect(() => {
    if (!textDescription.trim() || textDescription.length < 15) {
      setTextExtracted(null);
      return;
    }

    setIsNlpParsing(true);
    const timer = setTimeout(() => {
      setIsNlpParsing(false);
      const lower = textDescription.toLowerCase();

      let detectedCategory = 'General Repair & Maintenance';
      let detectedSkill = 'Diagnostic Inspection';
      let detectedUrgency = 'STANDARD (24h)';
      let price = '₹800 - ₹1,200';

      if (lower.includes('light') || lower.includes('spark') || lower.includes('electric') || lower.includes('wire') || lower.includes('mcb') || lower.includes('power')) {
        detectedCategory = 'Electrical Grid (Room 01)';
        detectedSkill = 'Circuit Testing & High Voltage Isolation';
        detectedUrgency = 'ELEVATED (Within 4 Hours)';
        price = '₹1,200 - ₹1,600';
      } else if (lower.includes('water') || lower.includes('pipe') || lower.includes('leak') || lower.includes('tap') || lower.includes('drain')) {
        detectedCategory = 'Plumbing & Hydro (Room 02)';
        detectedSkill = 'Pressure Regulators & Leak Sealing';
        detectedUrgency = 'CRITICAL (Immediate)';
        price = '₹950 - ₹1,400';
      } else if (lower.includes('ac') || lower.includes('cool') || lower.includes('gas') || lower.includes('hvac') || lower.includes('air')) {
        detectedCategory = 'Climate & Air (Room 10)';
        detectedSkill = 'Compressor & Refrigerant Cycle Testing';
        detectedUrgency = 'STANDARD (Scheduled)';
        price = '₹1,800 - ₹2,400';
      }

      setTextExtracted({
        category: detectedCategory,
        specificProblem: textDescription.slice(0, 70) + (textDescription.length > 70 ? '...' : ''),
        urgency: detectedUrgency,
        requiredSkill: detectedSkill,
        location,
        preferredTime,
        estimatedRange: price
      });
    }, 700);

    return () => clearTimeout(timer);
  }, [textDescription, location, preferredTime]);

  // Submit to Qualified Worker Selection
  const handleProceedToWorkerSelection = (payload) => {
    const jobTicket = {
      id: `UNV-JOB-${Math.floor(10000 + Math.random() * 90000)}`,
      entryMode: activeMode,
      serviceName: payload.serviceName || payload.problem || 'Cooperative On-Site Inspection',
      category: payload.category || payload.serviceCategory || 'Electrical Grid',
      specificSkill: payload.requiredSkills?.[0] || payload.requiredSkill || 'General Technical Diagnostic',
      urgency: payload.urgency || urgency,
      location,
      estimatedDuration: payload.estimatedDuration || '45 - 60 mins',
      preferredTime,
      estimatedRange: payload.estimatedPriceRange || payload.estimatedRange || '₹1,200 - ₹1,600',
      preliminaryDiagnosis: payload.preliminaryDiagnosis || {
        probableProblem: payload.problem || payload.specificProblem || 'Customer Reported Fault',
        severity: payload.severity || 'HIGH',
        confidence: payload.confidence || 95.2,
        requiredSkills: payload.requiredSkills || [payload.requiredSkill || 'Diagnostic Protocol']
      }
    };

    setDraftRequest(jobTicket);
    navigate('/customer/select-worker');
  };

  return (
    <div className="w-full min-h-screen relative bg-background text-on-background selection:bg-primary selection:text-on-primary">
      <ShaderBackground className="fixed inset-0 z-0 opacity-25 pointer-events-none" />

      <div className="relative z-10 w-full min-h-screen pt-28 px-4 md:px-10 max-w-5xl mx-auto pb-28 flex flex-col gap-8">
        {/* Header Breadcrumbs */}
        <div className="flex items-center justify-between">
          <Link
            to="/customer"
            className="flex items-center gap-2 text-xs font-mono text-on-surface-variant hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Back to Customer Portal</span>
          </Link>
          <span className="text-[11px] font-mono text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
            Stage 1 of 3: Problem Intake
          </span>
        </div>

        <div className="animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight">
            Initiate Service Request Protocol
          </h1>
          <p className="text-xs md:text-sm text-on-surface-variant font-mono mt-1">
            Choose your preferred medium. The cooperative intelligence engine structures the technical requirements automatically.
          </p>
        </div>

        {/* 3 Entry Mode Selector Tabs */}
        <div className="grid grid-cols-3 gap-3 p-1.5 rounded-2xl bg-[#0e0e0f]/80 border border-white/10 max-w-xl font-mono text-xs">
          <button
            onClick={() => setActiveMode('photo')}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${
              activeMode === 'photo'
                ? 'bg-primary/20 text-white font-bold border border-primary/40 shadow-[0_0_15px_rgba(173,198,255,0.2)]'
                : 'text-on-surface-variant hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">photo_camera</span>
            <span>1. Photo AI</span>
          </button>
          <button
            onClick={() => setActiveMode('voice')}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${
              activeMode === 'voice'
                ? 'bg-secondary/20 text-white font-bold border border-secondary/40 shadow-[0_0_15px_rgba(78,222,163,0.2)]'
                : 'text-on-surface-variant hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">mic</span>
            <span>2. Voice (Indian Langs)</span>
          </button>
          <button
            onClick={() => setActiveMode('text')}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${
              activeMode === 'text'
                ? 'bg-tertiary/20 text-white font-bold border border-tertiary/40 shadow-[0_0_15px_rgba(255,185,95,0.2)]'
                : 'text-on-surface-variant hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">edit_note</span>
            <span>3. Text Narrative</span>
          </button>
        </div>

        {/* Common Parameters: Location & Time */}
        <div className="glass-panel p-4 rounded-2xl border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div>
            <label className="block text-on-surface-variant mb-1 font-semibold">Service Delivery Address</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-[#1c1b1c] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-on-surface-variant mb-1 font-semibold">Preferred Time Window</label>
            <select
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              className="w-full bg-[#1c1b1c] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-primary"
            >
              <option value="Today, Immediate (within 30 mins)">⚡ Immediate Dispatch (Under 30 mins)</option>
              <option value="Today, Morning Slot (10:00 AM - 12:00 PM)">Today, Morning Slot (10:00 AM - 12:00 PM)</option>
              <option value="Today, Afternoon Slot (02:00 PM - 04:00 PM)">Today, Afternoon Slot (02:00 PM - 04:00 PM)</option>
              <option value="Tomorrow, Priority Morning (09:00 AM)">Tomorrow, Priority Morning (09:00 AM)</option>
            </select>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MODE 1: PHOTO AI INTAKE */}
        {/* ========================================================================= */}
        {activeMode === 'photo' && (
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-6 animate-fade-in-up">
            <div>
              <h2 className="text-xl font-bold text-white font-sans flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">filter_center_focus</span>
                <span>Visual Diagnostic Camera &amp; File Upload</span>
              </h2>
              <p className="text-xs text-on-surface-variant font-mono mt-1">
                Upload or select a photo of the damaged component, breaker, leakage, or device.
              </p>
            </div>

            {/* Photo Presets for immediate one-click testing */}
            <div>
              <div className="text-xs font-mono text-on-surface-variant font-semibold mb-2">
                Quick Test Samples (Simulated Camera Snapshots):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PHOTO_PRESETS.map((preset) => (
                  <div
                    key={preset.id}
                    onClick={() => handleSelectPhotoPreset(preset)}
                    className={`rounded-2xl border p-3 cursor-pointer transition-all flex flex-col justify-between ${
                      selectedPhotoPreset?.id === preset.id
                        ? 'bg-primary/20 border-primary shadow-[0_0_15px_rgba(173,198,255,0.2)]'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <img
                      src={preset.img}
                      alt={preset.title}
                      className="w-full h-28 object-cover rounded-xl mb-2"
                    />
                    <div className="font-sans font-bold text-xs text-white">{preset.title}</div>
                    <span className="font-mono text-[10px] text-primary mt-1">{preset.category}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Upload Dropzone */}
            <div className="border-2 border-dashed border-white/15 rounded-2xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer relative bg-white/[0.02]">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <span className="material-symbols-outlined text-3xl text-primary mb-2">add_photo_alternate</span>
              <div className="font-sans font-semibold text-xs text-white">
                Upload Custom Photo or Snap with Device Camera
              </div>
              <div className="text-[11px] font-mono text-on-surface-variant/70 mt-1">
                Supports JPEG, PNG, HEIC up to 15MB
              </div>
            </div>

            {/* Analysis Loading */}
            {isAnalyzingPhoto && (
              <div className="glass-panel p-6 rounded-2xl text-center border border-primary/30 flex flex-col items-center justify-center gap-3">
                <span className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
                <span className="font-mono text-xs text-primary">
                  Running Neural Vision Classifier &amp; Volumetric Defect Mapping...
                </span>
              </div>
            )}

            {/* AI DIAGNOSIS OUTPUT */}
            {photoDiagnosis && !isAnalyzingPhoto && (
              <div className="glass-card rounded-2xl p-6 border border-primary/40 bg-primary/5 space-y-4 animate-fade-in-up">
                {/* MANDATORY PRELIMINARY DISCLAIMER ALERT */}
                <div className="p-4 rounded-xl bg-tertiary/10 border border-tertiary/30 text-xs font-mono text-tertiary flex items-start gap-3">
                  <span className="material-symbols-outlined text-lg mt-0.5">report_problem</span>
                  <div>
                    <span className="font-bold uppercase tracking-wider block text-white mb-0.5">
                      IMPORTANT: PRELIMINARY ALGORITHMIC DIAGNOSIS
                    </span>
                    <span>
                      AI assessment is preliminary. Final diagnosis is determined by the service worker on site.
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3.5 rounded-xl bg-[#0e0e0f]/80 border border-white/5 space-y-1.5">
                    <span className="text-on-surface-variant uppercase text-[10px]">Probable Problem</span>
                    <div className="text-white font-bold text-sm">{photoDiagnosis.probableProblem}</div>
                    <div className="text-primary text-[11px]">AI Match Confidence: {photoDiagnosis.confidence}%</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0e0e0f]/80 border border-white/5 space-y-1.5">
                    <span className="text-on-surface-variant uppercase text-[10px]">Service Category</span>
                    <div className="text-white font-bold text-sm">{photoDiagnosis.serviceCategory}</div>
                    <div className="text-secondary text-[11px]">Mapped to Co-op Chamber</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0e0e0f]/80 border border-white/5 space-y-1.5">
                    <span className="text-on-surface-variant uppercase text-[10px]">Severity &amp; Urgency</span>
                    <div className="text-tertiary font-bold text-sm">{photoDiagnosis.severity} — {photoDiagnosis.urgency}</div>
                    <div className="text-on-surface-variant/70 text-[11px]">Auto-escalated for safety</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0e0e0f]/80 border border-white/5 space-y-1.5">
                    <span className="text-on-surface-variant uppercase text-[10px]">Estimated Duration &amp; Price</span>
                    <div className="text-secondary font-bold text-sm">{photoDiagnosis.estimatedPriceRange}</div>
                    <div className="text-on-surface-variant/70 text-[11px]">Duration: {photoDiagnosis.estimatedDuration}</div>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono text-on-surface-variant font-semibold block mb-2">
                    Required Skill DNA Identified for Job:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {photoDiagnosis.requiredSkills.map((sk, i) => (
                      <span key={i} className="text-xs font-mono px-3 py-1 rounded-lg bg-primary/15 border border-primary/30 text-primary">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleProceedToWorkerSelection(photoDiagnosis)}
                  className="w-full bg-primary hover:bg-primary/90 text-on-primary font-bold py-4 rounded-xl text-sm font-sans flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(173,198,255,0.3)] transition-all hover:scale-[1.01]"
                >
                  <span>Approve Structured Job &amp; Discover Qualified Workers</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE 2: VOICE INTAKE IN INDIAN LANGUAGES */}
        {/* ========================================================================= */}
        {activeMode === 'voice' && (
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-6 animate-fade-in-up">
            <div>
              <h2 className="text-xl font-bold text-white font-sans flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">mic</span>
                <span>Natural Voice Intake (Indian Languages)</span>
              </h2>
              <p className="text-xs text-on-surface-variant font-mono mt-1">
                Speak freely in your native language. Our acoustic bridge translates spoken semantics into structured dispatch specs.
              </p>
            </div>

            {/* Language Selection for Voice */}
            <div>
              <label className="block text-xs font-mono uppercase text-on-surface-variant font-semibold mb-2">
                Select Spoken Language:
              </label>
              <div className="flex gap-3 font-mono text-xs">
                {['ta', 'hi', 'en'].map((code) => {
                  const s = VOICE_SAMPLES[code];
                  return (
                    <button
                      key={code}
                      onClick={() => { setVoiceLang(code); setVoiceTranscript(''); setVoiceStructuredResult(null); }}
                      className={`px-4 py-2 rounded-xl border transition-all ${
                        voiceLang === code
                          ? 'bg-secondary/20 text-secondary border-secondary font-bold shadow-[0_0_12px_rgba(78,222,163,0.2)]'
                          : 'bg-white/5 border-white/10 text-on-surface-variant hover:bg-white/10'
                      }`}
                    >
                      {s.langName}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Recording Module */}
            <div className="glass-panel p-8 rounded-3xl border border-white/10 text-center flex flex-col items-center justify-center gap-4">
              <button
                onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${
                  isRecording
                    ? 'bg-error text-white animate-pulse shadow-[0_0_30px_rgba(255,180,171,0.6)] scale-110'
                    : 'bg-secondary/20 hover:bg-secondary/30 text-secondary border border-secondary/40 shadow-[0_0_25px_rgba(78,222,163,0.3)] hover:scale-105'
                }`}
              >
                <span className="material-symbols-outlined text-4xl">
                  {isRecording ? 'stop' : 'mic'}
                </span>
              </button>

              <div>
                <div className="font-mono text-sm text-white font-bold">
                  {isRecording ? `Recording Audio... (${voiceSeconds}s)` : 'Click to Speak Naturally'}
                </div>
                <div className="text-xs font-mono text-on-surface-variant mt-1">
                  Sample prompt will load for: <strong className="text-secondary">{VOICE_SAMPLES[voiceLang].langName}</strong>
                </div>
              </div>

              {/* Speech Waveform Simulation */}
              {isRecording && (
                <div className="flex items-center gap-1.5 h-8">
                  {[40, 75, 30, 90, 60, 100, 45, 80, 50, 95, 35, 70].map((h, i) => (
                    <div
                      key={i}
                      className="w-1.5 bg-secondary rounded-full animate-pulse"
                      style={{ height: `${h}%`, animationDuration: `${0.4 + (i % 4) * 0.2}s` }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Voice Processing Pipeline Architecture Visualizer */}
            <div className="p-4 rounded-2xl bg-[#0e0e0f]/80 border border-white/5 space-y-2">
              <div className="font-mono text-xs text-on-surface-variant font-semibold">
                Speech-to-Protocol Pipeline:
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                <span className={`px-2.5 py-1 rounded-lg border ${voicePipelineStep >= 1 ? 'bg-secondary/20 text-secondary border-secondary' : 'bg-white/5 text-on-surface-variant border-white/5'}`}>
                  1. Spoken Audio ({voiceLang.toUpperCase()})
                </span>
                <span>→</span>
                <span className={`px-2.5 py-1 rounded-lg border ${voicePipelineStep >= 2 ? 'bg-secondary/20 text-secondary border-secondary' : 'bg-white/5 text-on-surface-variant border-white/5'}`}>
                  2. Acoustic NLP
                </span>
                <span>→</span>
                <span className={`px-2.5 py-1 rounded-lg border ${voicePipelineStep >= 3 ? 'bg-secondary/20 text-secondary border-secondary' : 'bg-white/5 text-on-surface-variant border-white/5'}`}>
                  3. Semantic Intent
                </span>
                <span>→</span>
                <span className={`px-2.5 py-1 rounded-lg border ${voicePipelineStep >= 4 ? 'bg-primary/20 text-primary border-primary' : 'bg-white/5 text-on-surface-variant border-white/5'}`}>
                  4. Structured Job
                </span>
              </div>
            </div>

            {/* Voice Transcription Result */}
            {voiceTranscript && (
              <div className="glass-panel p-5 rounded-2xl border border-secondary/30 space-y-3 animate-fade-in-up">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-secondary">
                    Recognized Audio Transcript:
                  </span>
                  <p className="font-sans text-base text-white mt-1 italic">
                    "{voiceTranscript}"
                  </p>
                  <p className="text-xs font-mono text-on-surface-variant mt-1">
                    English Meaning: "{VOICE_SAMPLES[voiceLang].translation}"
                  </p>
                </div>

                {voiceStructuredResult && (
                  <div className="pt-4 border-t border-white/10 space-y-4">
                    <div className="p-3 rounded-xl bg-tertiary/10 border border-tertiary/30 text-xs font-mono text-tertiary flex items-start gap-2">
                      <span className="material-symbols-outlined text-sm mt-0.5">report_problem</span>
                      <span>AI assessment is preliminary. Final diagnosis is determined by the service worker on site.</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-on-surface-variant text-[10px] uppercase">Service Chamber</span>
                        <div className="text-white font-bold">{voiceStructuredResult.service}</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-on-surface-variant text-[10px] uppercase">Detected Urgency</span>
                        <div className="text-tertiary font-bold">{voiceStructuredResult.urgency}</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-on-surface-variant text-[10px] uppercase">Required Skill</span>
                        <div className="text-primary font-bold">{voiceStructuredResult.requiredSkill}</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-on-surface-variant text-[10px] uppercase">Estimated Rate</span>
                        <div className="text-secondary font-bold">{voiceStructuredResult.estimatedRange}</div>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        handleProceedToWorkerSelection({
                          serviceName: voiceStructuredResult.problem,
                          category: voiceStructuredResult.service,
                          requiredSkill: voiceStructuredResult.requiredSkill,
                          urgency: voiceStructuredResult.urgency,
                          estimatedRange: voiceStructuredResult.estimatedRange
                        })
                      }
                      className="w-full bg-secondary hover:bg-secondary/90 text-[#003824] font-bold py-4 rounded-xl text-sm font-sans flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(78,222,163,0.3)] transition-all hover:scale-[1.01]"
                    >
                      <span>Approve Voice Ticket &amp; Match Workers</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE 3: TEXT NARRATIVE INTAKE */}
        {/* ========================================================================= */}
        {activeMode === 'text' && (
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-6 animate-fade-in-up">
            <div>
              <h2 className="text-xl font-bold text-white font-sans flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary">edit_note</span>
                <span>Natural Language Text Narrative</span>
              </h2>
              <p className="text-xs text-on-surface-variant font-mono mt-1">
                Describe the issue in your own words. The natural language entity extractor parses the chamber, urgency, and skills.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5 text-xs font-mono">
                <label className="text-on-surface-variant font-semibold uppercase">
                  Problem Description
                </label>
                <span className="text-tertiary">Real-time Entity Extractor Active</span>
              </div>
              <textarea
                value={textDescription}
                onChange={(e) => setTextDescription(e.target.value)}
                placeholder="Example: My AC is blowing room-temperature air and making a rattling sound near the outdoor compressor unit. Need someone today..."
                className="w-full bg-[#1c1b1c] border border-white/10 rounded-2xl p-4 text-white text-sm focus:outline-none focus:border-tertiary min-h-[140px] font-sans resize-none"
              />
            </div>

            {/* Extracted NLP parameters preview */}
            {isNlpParsing && (
              <div className="p-4 rounded-xl bg-white/5 text-xs font-mono text-tertiary flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-tertiary border-t-transparent rounded-full animate-spin"></span>
                <span>Extracting category, urgency, and skill DNA tokens...</span>
              </div>
            )}

            {textExtracted && !isNlpParsing && (
              <div className="p-5 rounded-2xl bg-tertiary/5 border border-tertiary/30 space-y-4 animate-fade-in-up">
                <div className="text-xs font-mono text-tertiary font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">psychology</span>
                  <span>Extracted Structured Specifications</span>
                </div>
                
                <div className="p-3 rounded-xl bg-tertiary/10 border border-tertiary/30 text-xs font-mono text-tertiary flex items-start gap-2">
                  <span className="material-symbols-outlined text-sm mt-0.5">report_problem</span>
                  <span>AI assessment is preliminary. Final diagnosis is determined by the service worker on site.</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-[#0e0e0f]/80 border border-white/5">
                    <span className="text-on-surface-variant text-[10px]">Service Category</span>
                    <div className="text-white font-bold">{textExtracted.category}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0e0e0f]/80 border border-white/5">
                    <span className="text-on-surface-variant text-[10px]">Detected Urgency</span>
                    <div className="text-tertiary font-bold">{textExtracted.urgency}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0e0e0f]/80 border border-white/5">
                    <span className="text-on-surface-variant text-[10px]">Required Skill DNA</span>
                    <div className="text-primary font-bold">{textExtracted.requiredSkill}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0e0e0f]/80 border border-white/5">
                    <span className="text-on-surface-variant text-[10px]">Estimated Range</span>
                    <div className="text-secondary font-bold">{textExtracted.estimatedRange}</div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    handleProceedToWorkerSelection({
                      serviceName: textExtracted.specificProblem,
                      category: textExtracted.category,
                      requiredSkill: textExtracted.requiredSkill,
                      urgency: textExtracted.urgency,
                      estimatedRange: textExtracted.estimatedRange
                    })
                  }
                  className="w-full bg-tertiary hover:bg-tertiary/90 text-[#3e2400] font-bold py-4 rounded-xl text-sm font-sans flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,185,95,0.3)] transition-all hover:scale-[1.01]"
                >
                  <span>Confirm Structured Job &amp; Discover Qualified Workers</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
