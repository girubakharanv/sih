import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ShaderBackground from '../components/ShaderBackground';
import jobUnderstandingEngine from './JobUnderstandingEngine';
import qualificationEngine from './QualificationEngine';
import fairDispatchEngine from './FairDispatchEngine';
import opportunityEquityIndex from './OpportunityEquityIndex';
import trustEngine from './TrustEngine';
import wellbeingEngine from './WellbeingEngine';
import learningLoop from './LearningLoop';

export default function IntelligenceSandbox() {
  const [activeEngineTab, setActiveEngineTab] = useState('dispatch'); // 'dispatch' | 'understanding' | 'qualification' | 'equity' | 'trust' | 'wellbeing' | 'learning'

  // =========================================================================
  // 1. STATE FOR JOB UNDERSTANDING ENGINE
  // =========================================================================
  const [understandingInputMode, setUnderstandingInputMode] = useState('photo'); // 'photo' | 'voice' | 'text'
  const [photoTag, setPhotoTag] = useState('mcb-overload');
  const [voiceText, setVoiceText] = useState('வணக்கம், மெயின் பாக்ஸ்ல இருந்து புகை வருது, ட்ரிப் ஆகுது (Smoke from main box, tripping repeatedly)');
  const [voiceLang, setVoiceLang] = useState('ta');
  const [textQuery, setTextQuery] = useState('Our rooftop solar inverter has stopped syncing with the grid and error code E-04 is flashing.');

  const getActiveUnderstandingResult = () => {
    if (understandingInputMode === 'photo') {
      return jobUnderstandingEngine.analyzePhoto(photoTag);
    } else if (understandingInputMode === 'voice') {
      return jobUnderstandingEngine.analyzeVoice(voiceText, voiceLang);
    } else {
      return jobUnderstandingEngine.analyzeText(textQuery);
    }
  };
  const activeJobUnderstanding = getActiveUnderstandingResult();

  // =========================================================================
  // 2. STATE FOR WORKER QUALIFICATION & FAIR DISPATCH
  // =========================================================================
  // Candidate pool with varied qualifications, historical missions, and fatigue states
  const [candidates, setCandidates] = useState([
    {
      id: 'WRK-A',
      name: 'Karthik Subramanian',
      role: 'Master Electrician & Inverter Tech',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      isDutyActive: true,
      distance: '1.4 km',
      trustScore: 99.4,
      recentMissions14d: 14, // High recent opportunity concentration!
      skillDNA: [{ name: 'Switchboard & MCB Sizing', proficiency: 96, status: 'VERIFIED_MASTER' }],
      wellbeing: { hoursToday: 5.5, consecutiveDays: 4, status: 'Healthy' }
    },
    {
      id: 'WRK-B',
      name: 'Priya Narayanan',
      role: 'Certified Hydro & Electrical Tech',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
      isDutyActive: true,
      distance: '2.1 km',
      trustScore: 98.6,
      recentMissions14d: 3, // Historically underserved!
      skillDNA: [{ name: 'Switchboard & MCB Sizing', proficiency: 93, status: 'VERIFIED_MASTER' }],
      wellbeing: { hoursToday: 3.0, consecutiveDays: 2, status: 'Healthy' }
    },
    {
      id: 'WRK-C',
      name: 'Rajesh Verma',
      role: 'HVAC & Phase Technician',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      isDutyActive: true,
      distance: '3.2 km',
      trustScore: 97.5,
      recentMissions14d: 7,
      skillDNA: [{ name: 'Switchboard & MCB Sizing', proficiency: 90, status: 'VERIFIED_MASTER' }],
      wellbeing: { hoursToday: 6.5, consecutiveDays: 4, status: 'Monitor' }
    },
    {
      id: 'WRK-D (Low Skill Fail)',
      name: 'Vikram Rao (Apprentice)',
      role: 'Junior Field Hand',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      isDutyActive: true,
      distance: '0.8 km',
      trustScore: 91.0,
      recentMissions14d: 2,
      skillDNA: [{ name: 'Switchboard & MCB Sizing', proficiency: 62, status: 'SELF_DECLARED' }], // < 75% cutoff
      wellbeing: { hoursToday: 2.0, consecutiveDays: 1, status: 'Healthy' }
    },
    {
      id: 'WRK-E (Fatigue Fail)',
      name: 'Ananya Deshmukh',
      role: 'Automation Tech',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      isDutyActive: true,
      distance: '1.1 km',
      trustScore: 99.0,
      recentMissions14d: 11,
      skillDNA: [{ name: 'Switchboard & MCB Sizing', proficiency: 95, status: 'VERIFIED_MASTER' }],
      wellbeing: { hoursToday: 10.2, consecutiveDays: 6, status: 'Critical' } // > 9.5h cutoff
    }
  ]);

  // Run dispatch engine on active job
  const dispatchOutput = fairDispatchEngine.dispatch(activeJobUnderstanding, candidates, { avgJobsPerWorker14d: 8.5 });

  // =========================================================================
  // 3. STATE FOR OPPORTUNITY EQUITY INDEX & GINI
  // =========================================================================
  const equityReport = opportunityEquityIndex.getCooperativeMetrics(candidates);

  // =========================================================================
  // 4. STATE FOR TRUST ENGINE
  // =========================================================================
  const [trustSimulation, setTrustSimulation] = useState({
    baseTrust: 98.8,
    customerRating: 5,
    punctualityDelay: 0,
    safetyPassed: true,
    mentorSessionCompleted: false,
    votedInDAO: false
  });

  const simulatedTrustResult = trustEngine.processTrustEvent(
    { overallTrust: trustSimulation.baseTrust, skillExecution: 99.0, reliability: 98.5, safetyProtocol: 100 },
    {
      ratings: { overall: trustSimulation.customerRating },
      safetyPassed: trustSimulation.safetyPassed,
      etaDelayMins: trustSimulation.punctualityDelay,
      mentoringSessionCompleted: trustSimulation.mentorSessionCompleted,
      votedInDAO: trustSimulation.votedInDAO
    }
  );

  // =========================================================================
  // 5. STATE FOR WELLBEING ENGINE
  // =========================================================================
  const [wellbeingSim, setWellbeingSim] = useState({
    hoursToday: 5.5,
    consecutiveDays: 4,
    hoursWeek: 34.0,
    lateNightTrips: 1
  });
  const simulatedWellbeingResult = wellbeingEngine.evaluate(wellbeingSim);

  // =========================================================================
  // 6. STATE FOR CLOSED-LOOP LEARNING
  // =========================================================================
  const [learningLog, setLearningLog] = useState(null);

  const triggerLearningSimulation = () => {
    const report = {
      jobId: 'UNV-JOB-9410',
      serviceCategory: 'Electrical Grid',
      specificSkill: 'Switchboard & MCB Sizing',
      ratings: { workmanship: 5, professionalism: 5, punctuality: 5, safety: 5, overall: 5 },
      laborEarnings: 1200,
      durationHours: 0.9,
      safetyPassed: true,
      etaDelayMins: 0
    };
    const result = learningLoop.processCompletedMission(report, candidates[1]); // Priya Narayanan
    setLearningLog(result);

    // Increment Priya's missions in candidates state
    setCandidates((prev) =>
      prev.map((c) => (c.id === 'WRK-B' ? { ...c, recentMissions14d: c.recentMissions14d + 1 } : c))
    );
  };

  return (
    <div className="w-full min-h-screen relative bg-background text-on-background selection:bg-primary selection:text-on-primary">
      <ShaderBackground className="fixed inset-0 z-0 opacity-25 pointer-events-none" />

      <div className="relative z-10 w-full min-h-screen pt-28 px-4 md:px-10 max-w-7xl mx-auto pb-28 flex flex-col gap-8">
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-xs font-mono text-on-surface-variant hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></span>
            <span className="text-xs font-mono text-secondary font-bold uppercase tracking-wider">
              UNIVO Core Intelligence Layer v2.4
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 mb-2">
            <span className="text-primary font-mono font-bold text-[10px] uppercase">
              Algorithmic Brain &amp; Fairness Sandbox
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight">
            UNIVO Core Intelligence Sandbox
          </h1>
          <p className="text-xs md:text-sm text-on-surface-variant font-mono mt-1 max-w-3xl">
            Live interactive demonstration of the 8 intelligence engines: multi-modal understanding, strict safety qualification gating, explainable fair dispatch, Gini equity indices, multi-factor trust, fatigue protection, and closed-loop learning.
          </p>
        </div>

        {/* Engine Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 overflow-x-auto pb-2 scrollbar-none font-mono text-xs">
          {[
            { id: 'dispatch', label: '1. Fair Dispatch & Explainability', icon: 'alt_route' },
            { id: 'understanding', label: '2. AI Job Understanding', icon: 'psychology' },
            { id: 'qualification', label: '3. Qualification Safety Gates', icon: 'shield' },
            { id: 'equity', label: '4. Opportunity Equity & Gini', icon: 'balance' },
            { id: 'trust', label: '5. Multi-Factor Trust', icon: 'verified' },
            { id: 'wellbeing', label: '6. Human Wellbeing Engine', icon: 'favorite' },
            { id: 'learning', label: '7. Closed-Loop Learning', icon: 'loop' },
            { id: 'federated', label: '8. Federated Learning Concept', icon: 'device_hub' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveEngineTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                activeEngineTab === tab.id
                  ? 'bg-primary/20 text-white font-bold border border-primary/40 shadow-[0_0_12px_rgba(173,198,255,0.2)]'
                  : 'text-on-surface-variant hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <span className="material-symbols-outlined text-base">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: FAIR DISPATCH & EXPLAINABILITY */}
        {/* ========================================================================= */}
        {activeEngineTab === 'dispatch' && (
          <div className="space-y-6 animate-fade-in-up">
            {/* Core Principle Callout */}
            <div className="glass-card rounded-3xl p-6 border border-primary/30 space-y-2 font-mono text-xs">
              <div className="flex items-center gap-2 text-primary font-bold">
                <span className="material-symbols-outlined text-base">rule</span>
                <span className="text-sm">THE FAIR DISPATCH PRINCIPLE:</span>
              </div>
              <p className="text-on-surface-variant leading-relaxed">
                Fairness does <strong>NOT</strong> mean random assignment. Fairness operates <strong>STRICTLY AMONG QUALIFIED CANDIDATES</strong>.
                Unqualified candidates (low skill, unverified claims, or critical fatigue) are completely excluded before ranking.
                Among qualified peers, artisans with fewer recent missions receive an explainable cooperative fairness adjustment.
              </p>
            </div>

            {/* Side-by-side: Selected Worker Card vs Detailed Score Table */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Selected Worker Showcase (Worker B selected over Worker A) */}
              <div className="lg:col-span-5 glass-card rounded-3xl p-6 border border-secondary/50 shadow-2xl space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-secondary uppercase font-bold px-2 py-0.5 rounded bg-secondary/15 border border-secondary/30">
                      ★ Dispatched Artisan
                    </span>
                    <h3 className="font-sans font-bold text-2xl text-white mt-1.5">
                      {dispatchOutput.selectedWorker?.name}
                    </h3>
                    <p className="text-xs font-mono text-on-surface-variant">
                      {dispatchOutput.selectedWorker?.role}
                    </p>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-[10px] text-on-surface-variant uppercase">Final Suitability</span>
                    <div className="text-3xl font-bold text-secondary">
                      {dispatchOutput.selectedWorker?.scoringBreakdown.finalScore}/100
                    </div>
                  </div>
                </div>

                {/* Explainable Rationale Box */}
                <div className="p-4 rounded-2xl bg-[#0e0e0f]/90 border border-secondary/30 space-y-2 font-mono text-xs">
                  <div className="flex items-center gap-1.5 text-secondary font-bold">
                    <span className="material-symbols-outlined text-sm">psychology</span>
                    <span>Explainable Dispatch Rationale:</span>
                  </div>
                  <p className="text-white/90 text-[11px] leading-relaxed">
                    {dispatchOutput.selectedWorker?.scoringBreakdown.whySelectedText}
                  </p>
                </div>

                {/* Score Formula Breakdown */}
                <div className="space-y-2 font-mono text-xs border-t border-white/10 pt-3">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Base Suitability Score:</span>
                    <span className="text-white font-bold">{dispatchOutput.selectedWorker?.scoringBreakdown.baseScore} pts</span>
                  </div>
                  <div className="flex justify-between text-secondary">
                    <span>Fairness Adjustment (Underserved):</span>
                    <span className="font-bold">+{dispatchOutput.selectedWorker?.scoringBreakdown.fairnessAdjustment} pts</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Fatigue Deduction:</span>
                    <span className="text-white">-{dispatchOutput.selectedWorker?.scoringBreakdown.fatiguePenalty} pts</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                    <span>Final Calculated Suitability:</span>
                    <span className="text-secondary">{dispatchOutput.selectedWorker?.scoringBreakdown.finalScore} / 100</span>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-on-surface-variant bg-white/5 p-3 rounded-xl">
                  {dispatchOutput.selectedWorker?.scoringBreakdown.fairnessExplanation}
                </div>
              </div>

              {/* All Ranked Qualified Candidates Table */}
              <div className="lg:col-span-7 glass-card rounded-3xl p-6 border border-white/10 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <h4 className="font-sans font-bold text-base text-white">Qualified Candidate Comparison</h4>
                  <span className="text-on-surface-variant text-[11px]">Sector Avg: 8.5 missions/14d</span>
                </div>

                <div className="space-y-3">
                  {dispatchOutput.rankedCandidates.map((cand, idx) => {
                    const isSelected = idx === 0;
                    return (
                      <div
                        key={cand.id}
                        className={`p-4 rounded-2xl border transition-all ${
                          isSelected
                            ? 'bg-secondary/10 border-secondary/40 shadow-[0_0_15px_rgba(78,222,163,0.15)]'
                            : 'bg-white/5 border-white/10'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <img src={cand.avatar} alt={cand.name} className="w-10 h-10 rounded-xl object-cover" />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white text-sm">{cand.name}</span>
                                {isSelected && (
                                  <span className="text-[9px] bg-secondary text-black font-bold px-1.5 py-0.2 rounded">
                                    SELECTED
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-on-surface-variant">
                                Distance: {cand.distance} • 14d Missions: <strong>{cand.recentMissions14d}</strong>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-lg font-bold text-white">
                              {cand.scoringBreakdown.finalScore} <span className="text-xs text-on-surface-variant font-normal">pts</span>
                            </div>
                            <span className="text-[10px] text-on-surface-variant">
                              Base: {cand.scoringBreakdown.baseScore} | Adj: {cand.scoringBreakdown.fairnessAdjustment > 0 ? `+${cand.scoringBreakdown.fairnessAdjustment}` : cand.scoringBreakdown.fairnessAdjustment}
                            </span>
                          </div>
                        </div>

                        {/* Comparative Insight */}
                        <div className="mt-2 pt-2 border-t border-white/5 text-[11px] text-on-surface-variant">
                          {cand.id === 'WRK-A' && (
                            <span>
                              Worker A has higher Base Score (87.2), but received a <strong>-4.5 fairness dampener</strong> because they already took 14 missions.
                            </span>
                          )}
                          {cand.id === 'WRK-B' && (
                            <span className="text-secondary font-semibold">
                              Worker B has slightly lower Base (79.5), but received <strong>+13.8 fairness boost</strong> because they were underserved (3 missions). <strong>Selected!</strong>
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Disqualified Candidates Section */}
                <div className="pt-4 border-t border-white/10">
                  <span className="text-[10px] uppercase font-bold text-error block mb-2">
                    Disqualified Before Ranking (Safety Protocol Active):
                  </span>
                  <div className="space-y-2">
                    {dispatchOutput.disqualifiedCandidates.map((dq) => (
                      <div key={dq.id} className="p-3 rounded-xl bg-error/10 border border-error/20 flex justify-between items-center text-[11px]">
                        <div>
                          <strong className="text-white">{dq.name}</strong>
                          <div className="text-error mt-0.5">{dq.qualificationDetails?.disqualificationReasons?.[0]}</div>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-error/20 text-error font-bold text-[10px]">
                          EXCLUDED
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: AI JOB UNDERSTANDING ENGINE */}
        {/* ========================================================================= */}
        {activeEngineTab === 'understanding' && (
          <div className="space-y-6 animate-fade-in-up font-mono text-xs">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-sans font-bold text-xl text-white">Multi-Modal Semantic Diagnostic Engine</h3>
                <p className="text-on-surface-variant mt-0.5">
                  Converts raw photo, speech in Indian languages, or text into structured engineering tickets.
                </p>
              </div>
              <span className="px-3 py-1 rounded bg-primary/10 border border-primary/20 text-primary">
                Model: Gemini 1.5 Interface
              </span>
            </div>

            {/* Input Mode Selector */}
            <div className="flex gap-2">
              {[
                { id: 'photo', label: 'Photo Optical Feed', icon: 'photo_camera' },
                { id: 'voice', label: 'Voice (Tamil / Hindi / Eng)', icon: 'mic' },
                { id: 'text', label: 'Text Narrative', icon: 'edit_note' }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setUnderstandingInputMode(m.id)}
                  className={`px-4 py-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                    understandingInputMode === m.id
                      ? 'bg-primary/20 border-primary text-white font-bold'
                      : 'bg-white/5 border-white/10 text-on-surface-variant hover:bg-white/10'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">{m.icon}</span>
                  <span>{m.label}</span>
                </button>
              ))}
            </div>

            {/* Input Controls based on mode */}
            {understandingInputMode === 'photo' && (
              <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3">
                <span className="text-on-surface-variant">Select Test Optical Sample:</span>
                <div className="flex gap-3">
                  {[
                    { tag: 'mcb-overload', label: 'MCB Thermal Arcing Breaker' },
                    { tag: 'pipe-leak', label: 'High Pressure Water Valve Rupture' },
                    { tag: 'solar-inverter', label: 'Solar Hybrid Inverter Error E-04' }
                  ].map((p) => (
                    <button
                      key={p.tag}
                      onClick={() => setPhotoTag(p.tag)}
                      className={`px-4 py-2 rounded-xl border ${
                        photoTag === p.tag ? 'bg-primary/20 border-primary text-white' : 'bg-white/5 text-on-surface-variant'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {understandingInputMode === 'voice' && (
              <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => { setVoiceLang('ta'); setVoiceText('வணக்கம், மெயின் பாக்ஸ்ல இருந்து புகை வருது, ட்ரிப் ஆகுது'); }}
                    className={`px-3 py-1.5 rounded-xl border ${voiceLang === 'ta' ? 'bg-secondary/20 border-secondary text-secondary font-bold' : 'bg-white/5 text-on-surface-variant'}`}
                  >
                    Tamil Input (தமிழ்)
                  </button>
                  <button
                    onClick={() => { setVoiceLang('hi'); setVoiceText('नमस्ते, बाथरूम की मेन पाइपलाइन से बहुत तेज़ पानी बह रहा है और वाल्व बंद नहीं हो रहा'); }}
                    className={`px-3 py-1.5 rounded-xl border ${voiceLang === 'hi' ? 'bg-secondary/20 border-secondary text-secondary font-bold' : 'bg-white/5 text-on-surface-variant'}`}
                  >
                    Hindi Input (हिन्दी)
                  </button>
                </div>
                <input
                  type="text"
                  value={voiceText}
                  onChange={(e) => setVoiceText(e.target.value)}
                  className="w-full bg-[#1c1b1c] border border-white/10 rounded-xl p-3 text-white"
                />
              </div>
            )}

            {understandingInputMode === 'text' && (
              <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-2">
                <span className="text-on-surface-variant">Free-form Narrative Input:</span>
                <textarea
                  value={textQuery}
                  onChange={(e) => setTextQuery(e.target.value)}
                  className="w-full bg-[#1c1b1c] border border-white/10 rounded-xl p-3 text-white resize-none h-20"
                />
              </div>
            )}

            {/* Output Structured Ticket */}
            <div className="glass-card rounded-3xl p-6 border border-primary/40 space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <div>
                  <span className="text-primary font-bold uppercase text-[10px]">Engine Output Schema</span>
                  <h4 className="font-sans font-bold text-lg text-white">{activeJobUnderstanding.specificProblem}</h4>
                </div>
                <div className="text-right">
                  <span className="text-secondary font-bold text-lg">{activeJobUnderstanding.confidence}%</span>
                  <div className="text-[10px] text-on-surface-variant">Confidence Score</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-tertiary/10 border border-tertiary/20 text-tertiary text-[11px]">
                ⚠️ <strong>PRELIMINARY LABEL:</strong> Computerized assessment. Physical confirmation belongs to on-site worker.
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
                <div className="p-3 rounded-xl bg-white/5">
                  <span className="text-on-surface-variant text-[10px]">Chamber Mapped:</span>
                  <div className="font-bold text-white">{activeJobUnderstanding.serviceCategory} ({activeJobUnderstanding.chamberCode})</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5">
                  <span className="text-on-surface-variant text-[10px]">Urgency / Severity:</span>
                  <div className="font-bold text-tertiary">{activeJobUnderstanding.urgency} / {activeJobUnderstanding.severity}</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5">
                  <span className="text-on-surface-variant text-[10px]">Est. Duration:</span>
                  <div className="font-bold text-white">{activeJobUnderstanding.estimatedDurationMins} minutes</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5">
                  <span className="text-on-surface-variant text-[10px]">Price Estimate:</span>
                  <div className="font-bold text-secondary">₹{activeJobUnderstanding.priceEstimate.min} - ₹{activeJobUnderstanding.priceEstimate.max}</div>
                </div>
              </div>

              <div>
                <span className="text-on-surface-variant text-[10px] block mb-1.5">Required Skill DNA Strands:</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeJobUnderstanding.requiredSkills.map((sk, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-primary/15 border border-primary/30 text-primary">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/50 border border-white/5 text-[11px] text-white/80">
                <span className="text-on-surface-variant text-[10px] block">Reasoning Trace:</span>
                {activeJobUnderstanding.reasoningTrace}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: QUALIFICATION SAFETY GATES */}
        {/* ========================================================================= */}
        {activeEngineTab === 'qualification' && (
          <div className="space-y-6 animate-fade-in-up font-mono text-xs">
            <div>
              <h3 className="font-sans font-bold text-xl text-white">Strict Safety Qualification Gates</h3>
              <p className="text-on-surface-variant mt-0.5">
                Every candidate is evaluated against 6 Golden Safety Gates before dispatch ranking.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {candidates.map((c) => {
                const evalResult = qualificationEngine.evaluateWorker(activeJobUnderstanding, c);
                return (
                  <div
                    key={c.id}
                    className={`glass-card p-5 rounded-2xl border ${
                      evalResult.isQualified ? 'border-secondary/40' : 'border-error/40 bg-error/5'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-sans font-bold text-base text-white">{c.name}</h4>
                        <span className="text-[10px] text-on-surface-variant">{c.role}</span>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded font-bold text-[10px] uppercase ${
                          evalResult.isQualified
                            ? 'bg-secondary/20 text-secondary border border-secondary/30'
                            : 'bg-error/20 text-error border border-error/30'
                        }`}
                      >
                        {evalResult.isQualified ? 'PASSED QUALIFICATION' : 'DISQUALIFIED (UNSAFE)'}
                      </span>
                    </div>

                    {evalResult.isQualified ? (
                      <div className="space-y-1 text-[11px] text-secondary">
                        {evalResult.passedGates.map((gate, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-xs">check_circle</span>
                            <span>{gate}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-1.5 text-[11px] text-error">
                        <span className="font-bold block">Disqualification Reason:</span>
                        {evalResult.disqualificationReasons.map((reason, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <span className="material-symbols-outlined text-xs mt-0.5">cancel</span>
                            <span>{reason}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: OPPORTUNITY EQUITY & GINI COEFFICIENT */}
        {/* ========================================================================= */}
        {activeEngineTab === 'equity' && (
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-6 font-mono text-xs animate-fade-in-up">
            <div className="flex justify-between items-start">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 border border-secondary/30 mb-2">
                  <span className="text-secondary font-bold text-[10px] uppercase">Gini-Style Inequality Analyzer</span>
                </div>
                <h3 className="font-sans font-bold text-2xl text-white">Cooperative Opportunity Equity Index</h3>
                <p className="text-on-surface-variant mt-0.5">
                  Tracks wealth and dispatch concentration across all cooperative members.
                </p>
              </div>
              <div className="text-right">
                <span className="text-on-surface-variant text-[10px] uppercase">Calculated Gini Coefficient</span>
                <div className="text-3xl font-bold text-secondary">{equityReport.giniCoefficient}</div>
                <span className="text-primary text-[10px] font-bold">{equityReport.giniClassification}</span>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] text-on-surface-variant uppercase">Concentration Ratio</span>
                <div className="text-xl font-bold text-white mt-1">{equityReport.concentrationRatio}x</div>
                <span className="text-[10px] text-secondary">Top 20% vs Bottom 20%</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] text-on-surface-variant uppercase">Avg Missions / Artisan</span>
                <div className="text-xl font-bold text-white mt-1">{equityReport.averageMissionsPerArtisan}</div>
                <span className="text-[10px] text-on-surface-variant/80">Rolling 14 Days</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] text-on-surface-variant uppercase">Total Dispatches</span>
                <div className="text-xl font-bold text-white mt-1">{equityReport.totalMissionsTracked}</div>
                <span className="text-[10px] text-on-surface-variant/80">Sector Central</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] text-on-surface-variant uppercase">Fairness Status</span>
                <div className="text-xl font-bold text-secondary mt-1">{equityReport.fairnessHealthCheck.status}</div>
                <span className="text-[10px] text-secondary">Zero Algorithmic Bias</span>
              </div>
            </div>

            {/* Simulated Lorenz Curve Coordinates */}
            <div className="p-4 rounded-2xl bg-[#0e0e0f]/90 border border-white/5 space-y-2">
              <span className="text-on-surface-variant font-bold text-[10px] uppercase">
                Lorenz Opportunity Curve Coordinates (Equitable Distribution Plot):
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-[11px]">
                {equityReport.lorenzCurve.slice(1, 7).map((pt, i) => (
                  <div key={i} className="p-2 rounded bg-white/5 border border-white/5">
                    <span className="text-on-surface-variant block text-[9px]">{pt.populationPct}% Pop</span>
                    <span className="font-bold text-secondary">{pt.opportunityPct}% Opp</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: MULTI-FACTOR TRUST ENGINE */}
        {/* ========================================================================= */}
        {activeEngineTab === 'trust' && (
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-6 font-mono text-xs animate-fade-in-up">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-sans font-bold text-xl text-white">Multi-Factor Trust Engine Simulator</h3>
                <p className="text-on-surface-variant mt-0.5">
                  Adjust simulated mission outcomes to observe real-time Trust score recalculation.
                </p>
              </div>
              <div className="text-right">
                <span className="text-on-surface-variant text-[10px] uppercase">Recalculated Trust:</span>
                <div className="text-3xl font-bold text-primary">{simulatedTrustResult.overallTrust}%</div>
                <span className="text-secondary text-[10px]">Tier: {simulatedTrustResult.trustTier}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/5 space-y-2">
                <label className="text-on-surface-variant font-bold block">Customer Rating (1 to 5 Stars):</label>
                <div className="flex gap-2">
                  {[3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setTrustSimulation({ ...trustSimulation, customerRating: star })}
                      className={`px-3 py-1.5 rounded-lg border ${
                        trustSimulation.customerRating === star ? 'bg-primary/20 border-primary text-white font-bold' : 'bg-white/5 text-on-surface-variant'
                      }`}
                    >
                      {star} ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 space-y-2">
                <label className="text-on-surface-variant font-bold block">Arrival Punctuality (Minutes Delay):</label>
                <div className="flex gap-2">
                  {[0, 5, 20].map((mins) => (
                    <button
                      key={mins}
                      onClick={() => setTrustSimulation({ ...trustSimulation, punctualityDelay: mins })}
                      className={`px-3 py-1.5 rounded-lg border ${
                        trustSimulation.punctualityDelay === mins ? 'bg-primary/20 border-primary text-white font-bold' : 'bg-white/5 text-on-surface-variant'
                      }`}
                    >
                      {mins === 0 ? 'On-Time (0m)' : `+${mins}m Delay`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 space-y-2">
                <label className="text-on-surface-variant font-bold block">Apprentice Mentoring Session:</label>
                <button
                  onClick={() => setTrustSimulation({ ...trustSimulation, mentorSessionCompleted: !trustSimulation.mentorSessionCompleted })}
                  className={`w-full py-1.5 rounded-lg border ${
                    trustSimulation.mentorSessionCompleted ? 'bg-secondary/20 border-secondary text-secondary font-bold' : 'bg-white/5 text-on-surface-variant'
                  }`}
                >
                  {trustSimulation.mentorSessionCompleted ? '✓ Mentored Apprentice (+0.5)' : '+ Completed Mentoring'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: HUMAN WELLBEING ENGINE */}
        {/* ========================================================================= */}
        {activeEngineTab === 'wellbeing' && (
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-6 font-mono text-xs animate-fade-in-up">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-sans font-bold text-xl text-white">4-Tier Human Wellbeing Engine</h3>
                <p className="text-on-surface-variant mt-0.5">
                  Adjust hours and shift accumulation to observe state shifts: Healthy ➔ Monitor ➔ At Risk ➔ Critical.
                </p>
              </div>
              <div className="text-right">
                <span className="text-on-surface-variant text-[10px] uppercase">Engine Evaluation</span>
                <div
                  className={`text-2xl font-bold ${
                    simulatedWellbeingResult.status === 'Healthy'
                      ? 'text-secondary'
                      : simulatedWellbeingResult.status === 'Monitor'
                      ? 'text-primary'
                      : simulatedWellbeingResult.status === 'At Risk'
                      ? 'text-tertiary'
                      : 'text-error'
                  }`}
                >
                  {simulatedWellbeingResult.status.toUpperCase()} ({simulatedWellbeingResult.score}%)
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 space-y-2">
                <label className="text-on-surface-variant font-bold block">
                  Today's Active Hours: <span className="text-white">{wellbeingSim.hoursToday} hrs</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="0.5"
                  value={wellbeingSim.hoursToday}
                  onChange={(e) => setWellbeingSim({ ...wellbeingSim, hoursToday: parseFloat(e.target.value) })}
                  className="w-full accent-primary"
                />
              </div>

              <div className="p-4 rounded-xl bg-white/5 space-y-2">
                <label className="text-on-surface-variant font-bold block">
                  Consecutive Working Days: <span className="text-white">{wellbeingSim.consecutiveDays} days</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={wellbeingSim.consecutiveDays}
                  onChange={(e) => setWellbeingSim({ ...wellbeingSim, consecutiveDays: parseInt(e.target.value) })}
                  className="w-full accent-secondary"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0e0e0f]/80 border border-white/5 space-y-1.5">
              <span className="text-[10px] text-on-surface-variant uppercase font-bold">Engine Automated Directives:</span>
              {simulatedWellbeingResult.recommendations.map((rec, i) => (
                <div key={i} className="text-white text-[11px] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-xs text-primary">arrow_forward</span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: CLOSED-LOOP LEARNING */}
        {/* ========================================================================= */}
        {activeEngineTab === 'learning' && (
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-6 font-mono text-xs animate-fade-in-up">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-sans font-bold text-xl text-white">Closed-Loop Learning Orchestrator</h3>
                <p className="text-on-surface-variant mt-0.5">
                  Simulate a completed 5-star customer mission and observe the multi-engine propagation.
                </p>
              </div>
              <button
                type="button"
                onClick={triggerLearningSimulation}
                className="px-5 py-3 rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-bold font-sans text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(173,198,255,0.3)]"
              >
                <span className="material-symbols-outlined text-sm">play_arrow</span>
                <span>Simulate Completed Mission &amp; Learn</span>
              </button>
            </div>

            {learningLog ? (
              <div className="space-y-4 animate-fade-in-up">
                <div className="p-4 rounded-2xl bg-secondary/15 border border-secondary/30 text-secondary">
                  ✓ {learningLog.auditNarrative}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                    <span className="text-[10px] text-on-surface-variant uppercase">Skill DNA Evolution</span>
                    <div className="text-white font-bold">{learningLog.skillDnaUpdates.targetSkill}</div>
                    <div className="text-secondary font-bold">+{learningLog.skillDnaUpdates.boostApplied}% Proficiency Boost</div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                    <span className="text-[10px] text-on-surface-variant uppercase">Trust Score Ledger</span>
                    <div className="text-white font-bold">Previous: {learningLog.trustUpdates.previousTrust}%</div>
                    <div className="text-primary font-bold">Updated: {learningLog.trustUpdates.overallTrust}% (Delta: +{learningLog.trustUpdates.delta}%)</div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                    <span className="text-[10px] text-on-surface-variant uppercase">Opportunity Counter</span>
                    <div className="text-white font-bold">14d Missions: {learningLog.equityUpdates.updatedMissions}</div>
                    <div className="text-secondary font-bold">Total Completed: {learningLog.equityUpdates.totalCompletedJobs}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-on-surface-variant border border-dashed border-white/10 rounded-2xl">
                Click "Simulate Completed Mission &amp; Learn" above to trigger and inspect real-time closed-loop engine propagation.
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 8: FEDERATED LEARNING ARCHITECTURE CONCEPT (#32) */}
        {/* ========================================================================= */}
        {activeEngineTab === 'federated' && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="glass-card rounded-3xl p-6 border border-primary/30 space-y-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-primary font-bold">
                <span className="material-symbols-outlined text-base">device_hub</span>
                <span className="text-sm">FEDERATED LEARNING ON EDGE (CONCEPTUAL ARCHITECTURE):</span>
              </div>
              <p className="text-on-surface-variant leading-relaxed">
                Raw customer photos, optical diagnostics, and voice recordings remain stored <strong>locally on the worker's device</strong>.
                Local models compute model gradient weight deltas ($\Delta W$), which are cryptographically signed with the artisan's DID and transmitted to the cooperative aggregator.
                No raw customer biometric or visual data ever leaves the sovereign edge.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-secondary font-bold">
                  <span className="material-symbols-outlined text-base">phone_android</span>
                  <span>1. On-Device Training (Edge)</span>
                </div>
                <p className="text-on-surface-variant text-[11px] leading-relaxed">
                  Worker device calculates local gradient loss from on-site confirmed diagnoses without transmitting raw customer photos.
                </p>
                <div className="p-2.5 rounded bg-black/40 border border-white/5 text-[10px] text-white">
                  Local Delta: ΔW_k = -η ∇L_k(W)
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <span className="material-symbols-outlined text-base">lock</span>
                  <span>2. Differential Privacy Vault</span>
                </div>
                <p className="text-on-surface-variant text-[11px] leading-relaxed">
                  Gaussian noise is injected into parameter gradients to ensure zero individual household reconstruction is mathematically possible.
                </p>
                <div className="p-2.5 rounded bg-black/40 border border-white/5 text-[10px] text-primary">
                  Noise: (ε, δ)-Differential Privacy
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-tertiary font-bold">
                  <span className="material-symbols-outlined text-base">hub</span>
                  <span>3. Cooperative Aggregation</span>
                </div>
                <p className="text-on-surface-variant text-[11px] leading-relaxed">
                  Cooperative server runs FedAvg across 240+ verified artisan nodes to publish model v2.5 back to all devices.
                </p>
                <div className="p-2.5 rounded bg-black/40 border border-white/5 text-[10px] text-tertiary">
                  FedAvg: W_{"{t+1}"} = ∑ (n_k / n) W_k
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
