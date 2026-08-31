import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useWorker } from './WorkerContext';
import ShaderBackground from '../components/ShaderBackground';

export default function WorkerJobExecution() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { todayJobs, setTodayJobs, updateSkillProficiency } = useWorker();

  const job = todayJobs.find((j) => j.id === jobId) || todayJobs[0];

  // Execution steps
  // 1: Safety Checklist, 2: Technical Diagnostics & Knowledge Library, 3: AR Camera & Senior Guidance, 4: Mission Sign-off
  const [activeStep, setActiveStep] = useState(1);

  // Safety checklist state
  const [safetyChecks, setSafetyChecks] = useState({
    mainsIsolated: true,
    voltageTested: true,
    ppeEquipped: true,
    customerPresent: true
  });

  // Knowledge Library selection
  const [selectedSchematic, setSelectedSchematic] = useState('mcb-schematic');
  const [isMentorCalling, setIsMentorCalling] = useState(false);
  const [mentorCallActive, setMentorCallActive] = useState(false);

  // AR Camera Viewfinder State
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [arOverlaysVisible, setArOverlaysVisible] = useState(true);

  // Completion state
  const [isCompleting, setIsCompleting] = useState(false);
  const [jobNote, setJobNote] = useState('Replaced scorched 63A MCB isolator. Torqued busbar terminal screws to 2.8 Nm. Balanced phase currents across Line 1 & Line 2.');

  const allSafetyPassed = Object.values(safetyChecks).every(Boolean);

  const handleFinishMission = () => {
    setIsCompleting(true);
    setTimeout(() => {
      setIsCompleting(false);
      updateSkillProficiency('Switchboard', 1);
      updateSkillProficiency('High Voltage', 1);
      setTodayJobs((prev) => prev.filter((j) => j.id !== job.id));
      navigate('/worker/earnings');
    }, 1200);
  };

  if (!job) {
    return (
      <div className="w-full min-h-screen pt-32 text-center font-mono">
        <p>No active mission found.</p>
        <Link to="/worker" className="text-primary underline mt-2 block">
          Return to Command
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen relative bg-background text-on-background selection:bg-primary selection:text-on-primary">
      <ShaderBackground className="fixed inset-0 z-0 opacity-25 pointer-events-none" />

      <div className="relative z-10 w-full min-h-screen pt-28 px-4 md:px-10 max-w-6xl mx-auto pb-28 flex flex-col gap-8">
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            to="/worker"
            className="flex items-center gap-2 text-xs font-mono text-on-surface-variant hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Back to Worker Dashboard</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="text-xs font-mono text-secondary font-bold uppercase tracking-wider">
              Mission Execution Mode
            </span>
          </div>
        </div>

        {/* Top Mission Banner */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-primary/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in-up">
          <div>
            <div className="flex items-center gap-2 mb-1 font-mono text-xs">
              <span className="text-primary font-bold">{job.id}</span>
              <span className="px-2 py-0.5 rounded bg-secondary/15 text-secondary border border-secondary/30 text-[10px]">
                ON-SITE ACTIVE
              </span>
              <span className="text-on-surface-variant">• {job.category}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-sans font-bold text-white tracking-tight">
              {job.serviceTitle}
            </h1>
            <p className="text-xs font-mono text-on-surface-variant mt-1">
              Customer: <strong className="text-white">{job.customerName}</strong> • {job.location}
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono">
            <div className="text-right">
              <span className="text-[10px] text-on-surface-variant uppercase">Guaranteed Settlement</span>
              <div className="text-2xl font-bold text-secondary">{job.guaranteedEarnings}</div>
            </div>
          </div>
        </div>

        {/* Smart Job Bundling Cluster Banner (#13) */}
        <div className="glass-card rounded-2xl p-4 border border-secondary/40 bg-secondary/5 flex items-center justify-between font-mono text-xs animate-fade-in-up">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/20 border border-secondary/40 text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">alt_route</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white uppercase">Smart Job Bundling Opportunity Active</span>
                <span className="px-1.5 py-0.2 rounded bg-secondary text-black text-[9px] font-bold">42% Commute Saved</span>
              </div>
              <p className="text-[11px] text-on-surface-variant mt-0.5">
                Next mission available in the same building: Flat 204 (Inverter Phase Check, 120m away). Clustered automatically to eliminate deadhead transit.
              </p>
            </div>
          </div>

          <button
            onClick={() => soundEngine.playClick()}
            className="px-3 py-1.5 rounded-xl bg-secondary hover:bg-secondary/90 text-black font-bold text-xs shrink-0 transition-all"
          >
            Accept Bundle (+₹680)
          </button>
        </div>

        {/* Step Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 font-mono text-xs">
          {[
            { step: 1, label: '1. Safety Checklist', icon: 'shield' },
            { step: 2, label: '2. Technical Schematics', icon: 'menu_book' },
            { step: 3, label: '3. AR Camera & Mentor', icon: 'video_camera_front' },
            { step: 4, label: '4. Mission Sign-Off', icon: 'task_alt' }
          ].map((st) => (
            <button
              key={st.step}
              onClick={() => setActiveStep(st.step)}
              className={`p-3.5 rounded-2xl border flex items-center justify-center gap-2 transition-all ${
                activeStep === st.step
                  ? 'bg-primary/20 border-primary text-white font-bold shadow-[0_0_15px_rgba(173,198,255,0.2)]'
                  : 'bg-white/5 border-white/10 text-on-surface-variant hover:bg-white/10'
              }`}
            >
              <span className="material-symbols-outlined text-base">{st.icon}</span>
              <span>{st.label}</span>
            </button>
          ))}
        </div>

        {/* STEP 1: SAFETY CHECKLIST (Zero Accident Standard) */}
        {activeStep === 1 && (
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-sans font-bold text-xl text-white">Zero-Accident Safety Protocol</h2>
                <p className="text-xs font-mono text-on-surface-variant mt-0.5">
                  Verification of physical isolation is mandatory before manipulating electrical distribution hardware.
                </p>
              </div>
              <span className="material-symbols-outlined text-3xl text-secondary">verified_user</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <label className="p-4 rounded-2xl bg-[#0e0e0f]/80 border border-white/5 flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-xl">power_off</span>
                  <div>
                    <span className="text-white font-bold text-sm block">Main Service Isolation Switch De-energized</span>
                    <span className="text-on-surface-variant text-[11px]">Mains breaker switched off and lock-out tag attached</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={safetyChecks.mainsIsolated}
                  onChange={(e) => setSafetyChecks({ ...safetyChecks, mainsIsolated: e.target.checked })}
                  className="w-5 h-5 accent-secondary"
                />
              </label>

              <label className="p-4 rounded-2xl bg-[#0e0e0f]/80 border border-white/5 flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-xl">speed</span>
                  <div>
                    <span className="text-white font-bold text-sm block">Voltage Tester Probed Zero Potential</span>
                    <span className="text-on-surface-variant text-[11px]">Multimeter verified &lt; 2V residual on Phase and Neutral</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={safetyChecks.voltageTested}
                  onChange={(e) => setSafetyChecks({ ...safetyChecks, voltageTested: e.target.checked })}
                  className="w-5 h-5 accent-secondary"
                />
              </label>

              <label className="p-4 rounded-2xl bg-[#0e0e0f]/80 border border-white/5 flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-xl">front_hand</span>
                  <div>
                    <span className="text-white font-bold text-sm block">Insulated Gloves &amp; Protective Footwear Worn</span>
                    <span className="text-on-surface-variant text-[11px]">1000V rated Class 0 rubber gloves &amp; dielectric sole shoes</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={safetyChecks.ppeEquipped}
                  onChange={(e) => setSafetyChecks({ ...safetyChecks, ppeEquipped: e.target.checked })}
                  className="w-5 h-5 accent-secondary"
                />
              </label>

              <label className="p-4 rounded-2xl bg-[#0e0e0f]/80 border border-white/5 flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-xl">handshake</span>
                  <div>
                    <span className="text-white font-bold text-sm block">Client Worksite Walkthrough Completed</span>
                    <span className="text-on-surface-variant text-[11px]">Customer notified before power interruption</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={safetyChecks.customerPresent}
                  onChange={(e) => setSafetyChecks({ ...safetyChecks, customerPresent: e.target.checked })}
                  className="w-5 h-5 accent-secondary"
                />
              </label>
            </div>

            <div className="flex justify-end pt-3">
              <button
                type="button"
                disabled={!allSafetyPassed}
                onClick={() => setActiveStep(2)}
                className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-bold text-xs font-sans flex items-center gap-2 shadow-[0_0_15px_rgba(173,198,255,0.3)] disabled:opacity-40"
              >
                <span>Safety Confirmed • Proceed to Execution</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: TECHNICAL KNOWLEDGE LIBRARY & SCHEMATICS */}
        {activeStep === 2 && (
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-sans font-bold text-xl text-white">Complex Technical Knowledge Library</h2>
                <p className="text-xs font-mono text-on-surface-variant mt-0.5">
                  Official cooperative engineering schematics, wiring codes, and torque specifications.
                </p>
              </div>
              <span className="text-xs font-mono text-primary">Library Ver. 2026.4</span>
            </div>

            {/* Schematic Selector */}
            <div className="flex gap-2 font-mono text-xs">
              {[
                { id: 'mcb-schematic', label: '63A Dual-Pole Isolator Busbar Pinout' },
                { id: 'solar-schematic', label: 'Solar Hybrid Inverter Grid Sync Codes' },
                { id: 'torque-table', label: 'Terminal Screw Torque Specifications' }
              ].map((sch) => (
                <button
                  key={sch.id}
                  onClick={() => setSelectedSchematic(sch.id)}
                  className={`px-4 py-2 rounded-xl border transition-all ${
                    selectedSchematic === sch.id
                      ? 'bg-primary/20 border-primary text-white font-bold'
                      : 'bg-white/5 border-white/10 text-on-surface-variant hover:bg-white/10'
                  }`}
                >
                  {sch.label}
                </button>
              ))}
            </div>

            {/* Schematic Display Box */}
            <div className="p-6 rounded-2xl bg-[#0e0e0f] border border-white/10 font-mono text-xs space-y-4">
              {selectedSchematic === 'mcb-schematic' && (
                <div>
                  <div className="flex justify-between text-on-surface-variant pb-2 border-b border-white/10">
                    <span className="text-primary font-bold">Standard Indian Code IS 732 / IEC 60898-1</span>
                    <span>Rated: 240V / 415V AC • 10kA Breaking Capacity</span>
                  </div>
                  <pre className="text-white/80 p-4 bg-black/60 rounded-xl overflow-x-auto text-[11px] leading-relaxed my-2">
{`   [Incoming Line Phase (L)] ------> [Terminal 1] ───┐
                                                     [ Bi-Metallic Thermal Strip ]
   [Incoming Neutral Line  ] ------> [Terminal 3] ───┘
                                      │
   Busbar Comb Contact: Copper 10mm²   └──> Magnetic Trip Coil (Short-circuit)
   Required Tightening Torque: 2.8 Nm to 3.2 Nm
   Permissible Temperature Rise: Max 60K above ambient`}
                  </pre>
                  <p className="text-secondary text-[11px]">
                    ✓ Recommended Action: Clean copper busbar tooth with non-conductive contact cleaner before tightening.
                  </p>
                </div>
              )}

              {selectedSchematic === 'solar-schematic' && (
                <div>
                  <div className="flex justify-between text-on-surface-variant pb-2 border-b border-white/10">
                    <span className="text-secondary font-bold">Inverter Diagnostic Guide: Error Code E-04</span>
                    <span>Grid Frequency Drift / Anti-Islanding Protection</span>
                  </div>
                  <div className="space-y-2 text-on-surface-variant text-[11px] pt-2 leading-relaxed">
                    <p>1. Check AC Grid Input: Normal voltage should measure between 195V - 253V, frequency 49.5Hz - 50.5Hz.</p>
                    <p>2. If grid is healthy: Disconnect DC solar isolator for 3 minutes to discharge internal capacitor bank.</p>
                    <p>3. Flash updated grid-compliance firmware v4.1 via bluetooth optical coupler if error persists.</p>
                  </div>
                </div>
              )}

              {selectedSchematic === 'torque-table' && (
                <div className="space-y-2">
                  <span className="text-primary font-bold">Recommended Terminal Torque Table (Nm)</span>
                  <table className="w-full text-left text-[11px]">
                    <thead>
                      <tr className="border-b border-white/10 text-on-surface-variant">
                        <th className="py-1">Screw Size</th>
                        <th className="py-1">Application</th>
                        <th className="py-1">Target Torque</th>
                      </tr>
                    </thead>
                    <tbody className="text-white/80">
                      <tr className="border-b border-white/5">
                        <td className="py-1">M3.5</td>
                        <td>Household Wall Switches &amp; Sockets</td>
                        <td>1.2 Nm</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-1">M5</td>
                        <td>MCB Breaker Terminals &amp; Isolators</td>
                        <td>2.8 - 3.2 Nm</td>
                      </tr>
                      <tr>
                        <td className="py-1">M8</td>
                        <td>Main Distribution Busbar Bolts</td>
                        <td>12.0 Nm</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="flex justify-between pt-3 font-mono text-xs">
              <button
                type="button"
                onClick={() => setActiveStep(1)}
                className="px-5 py-3 rounded-xl bg-white/5 text-on-surface-variant"
              >
                Back to Safety
              </button>
              <button
                type="button"
                onClick={() => setActiveStep(3)}
                className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-bold flex items-center gap-2"
              >
                <span>Proceed to AR Viewfinder &amp; Mentor</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: AR CAMERA & SENIOR EXPERT GUIDANCE */}
        {activeStep === 3 && (
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-sans font-bold text-xl text-white">Camera Diagnostic Viewfinder &amp; Senior Mentor</h2>
                <p className="text-xs font-mono text-on-surface-variant mt-0.5">
                  Point device camera at the equipment to display AR wiring overlays, or dial a Guild Mentor for live guidance.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setArOverlaysVisible(!arOverlaysVisible)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-mono ${
                  arOverlaysVisible ? 'bg-secondary/20 border-secondary text-secondary' : 'bg-white/5 border-white/10 text-on-surface-variant'
                }`}
              >
                {arOverlaysVisible ? 'AR Telemetry: ON' : 'AR Telemetry: OFF'}
              </button>
            </div>

            {/* AR Camera Simulated Viewport */}
            <div className="relative w-full h-80 rounded-3xl overflow-hidden border border-white/15 bg-[#0a0a0b] flex items-center justify-center">
              {/* Camera Background Feed (Simulated) */}
              <img
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80"
                alt="Switchboard Viewfinder"
                className="w-full h-full object-cover opacity-60"
              />

              {/* Holographic AR Overlays */}
              {arOverlaysVisible && (
                <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none font-mono text-xs">
                  <div className="flex justify-between items-center">
                    <span className="px-2.5 py-1 rounded bg-black/70 text-secondary border border-secondary/40 text-[10px] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                      <span>CV Object Recognition: 63A Dual Breaker Detected</span>
                    </span>
                    <span className="text-white bg-black/70 px-2 py-0.5 rounded border border-white/10 text-[10px]">
                      Thermal Sensor: 34.2°C (Safe)
                    </span>
                  </div>

                  {/* AR Bounding Box with Pin Callouts */}
                  <div className="mx-auto w-48 h-32 border-2 border-dashed border-primary/80 rounded-xl relative flex items-center justify-center">
                    <span className="absolute -top-3 left-2 bg-primary text-black font-bold px-1.5 rounded text-[9px]">
                      MCB-01 TERMINAL
                    </span>
                    <span className="text-[10px] text-primary bg-black/80 px-2 py-0.5 rounded border border-primary/40">
                      Torque Target: 2.8 Nm
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-white/80 bg-black/70 p-2 rounded-xl border border-white/10">
                    <span>Phase Alignment: L1 - L2 Balanced</span>
                    <span>Harmonic Distortion: 2.1% THD</span>
                  </div>
                </div>
              )}
            </div>

            {/* SENIOR EXPERT REMOTE ASSISTANCE DOCK */}
            <div className="p-5 rounded-2xl bg-[#0e0e0f]/90 border border-primary/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono text-xs">
              <div className="flex items-center gap-3.5">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
                  alt="Guild Mentor"
                  className="w-12 h-12 rounded-xl object-cover border border-white/15"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white font-sans text-sm">Master Rajesh Verma</span>
                    <span className="text-[10px] text-secondary border border-secondary/30 px-1.5 rounded">Guild Mentor</span>
                  </div>
                  <p className="text-on-surface-variant text-[11px]">On-Duty Technical Guidance Specialist</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {mentorCallActive ? (
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-xl bg-secondary/20 text-secondary border border-secondary/30 text-xs font-bold animate-pulse">
                      Connected with Mentor (02:14)
                    </span>
                    <button
                      type="button"
                      onClick={() => setMentorCallActive(false)}
                      className="px-3 py-1.5 rounded-xl bg-error/20 text-error border border-error/30 text-xs"
                    >
                      End Call
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setMentorCallActive(true)}
                    className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-bold font-sans flex items-center gap-2 shadow-[0_0_15px_rgba(173,198,255,0.3)]"
                  >
                    <span className="material-symbols-outlined text-sm">support_agent</span>
                    <span>Dial Guild Senior Mentor</span>
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-between pt-3 font-mono text-xs">
              <button
                type="button"
                onClick={() => setActiveStep(2)}
                className="px-5 py-3 rounded-xl bg-white/5 text-on-surface-variant"
              >
                Back to Schematics
              </button>
              <button
                type="button"
                onClick={() => setActiveStep(4)}
                className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-bold flex items-center gap-2"
              >
                <span>Proceed to Mission Sign-Off</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: MISSION SIGN-OFF & PAYMENT RELEASE */}
        {activeStep === 4 && (
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-6 animate-fade-in-up">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 border border-secondary/30 mb-2">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="text-[10px] font-mono text-secondary font-bold uppercase tracking-wider">
                  Technical Completion Sign-Off
                </span>
              </div>
              <h2 className="font-sans font-bold text-2xl text-white">Certify Service Completion</h2>
              <p className="text-xs font-mono text-on-surface-variant mt-0.5">
                Signing off releases customer escrow directly to your UPI address and records skill proficiency updates.
              </p>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-on-surface-variant font-semibold mb-2">
                Technical Execution Log (Saved to Customer Ledger):
              </label>
              <textarea
                value={jobNote}
                onChange={(e) => setJobNote(e.target.value)}
                className="w-full bg-[#1c1b1c] border border-white/10 rounded-2xl p-4 text-xs font-mono text-white focus:outline-none focus:border-secondary min-h-[100px] resize-none"
              />
            </div>

            {/* Financial Settlement Review */}
            <div className="p-4 rounded-2xl bg-[#0e0e0f]/80 border border-white/5 font-mono text-xs space-y-2">
              <div className="flex justify-between text-on-surface-variant">
                <span>Guaranteed Labor Settlement:</span>
                <span className="text-white font-bold">{job.guaranteedEarnings}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Destination Bank / UPI:</span>
                <span className="text-secondary font-bold">karthik@okhdfcbank</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Skill DNA Boost:</span>
                <span className="text-primary font-bold">+1% Switchboard &amp; High Voltage</span>
              </div>
            </div>

            <button
              type="button"
              disabled={isCompleting}
              onClick={handleFinishMission}
              className="w-full bg-secondary hover:bg-secondary/90 text-[#003824] font-bold py-4 rounded-xl text-sm font-sans flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(78,222,163,0.3)] transition-all hover:scale-[1.01] disabled:opacity-50"
            >
              {isCompleting ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#003824] border-t-transparent rounded-full animate-spin"></span>
                  <span>Transmitting Final Telemetry &amp; Releasing UPI Pay...</span>
                </>
              ) : (
                <>
                  <span>Sign Off Mission &amp; Settle ₹1,200 to UPI</span>
                  <span className="material-symbols-outlined text-sm">lock_open</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
