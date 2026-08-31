import React, { useState, useEffect } from 'react';
import ShaderBackground from './components/ShaderBackground';
import { ThreeDataPrism } from './components/ThreeVisualizers';

const CustomerJobRequest = () => {
  const [taskDescription, setTaskDescription] = useState('');
  const [skills, setSkills] = useState('Data Analysis, Neural Ops');
  const [urgency, setUrgency] = useState('medium');
  const [terminalLogs, setTerminalLogs] = useState([
    { type: 'dim', text: 'System standby - neural network ready.' },
    { type: 'primary', text: 'Awaiting task parameters...' }
  ]);
  const [aiConfidence, setAiConfidence] = useState(94.8);
  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatchSuccess, setDispatchSuccess] = useState(false);

  // Dynamic cost calculation based on input & urgency
  const baseRate = 180;
  const urgencyMultiplier = urgency === 'high' ? 1.5 : urgency === 'medium' ? 1.2 : 1.0;
  const computedFee = Math.round(baseRate * urgencyMultiplier);
  const coopTax = Math.round(computedFee * 0.05);
  const total = computedFee + coopTax;

  useEffect(() => {
    if (!taskDescription.trim()) return;

    const timer = setTimeout(() => {
      const words = taskDescription.trim().split(/\s+/).length;
      const detectedConfidence = Math.min(99.4, 85 + words * 1.5).toFixed(1);
      setAiConfidence(parseFloat(detectedConfidence));

      setTerminalLogs((prev) => [
        ...prev.slice(-4),
        { type: 'tertiary', text: `Parsing syntactic intent: "${taskDescription.slice(0, 32)}..."` },
        { type: 'secondary', text: `Confidence resolved at ${detectedConfidence}% | Skills matched.` }
      ]);
    }, 600);

    return () => clearTimeout(timer);
  }, [taskDescription]);

  const handleDispatch = (e) => {
    e.preventDefault();
    if (!taskDescription.trim()) return;
    setIsDispatching(true);

    setTerminalLogs((prev) => [
      ...prev,
      { type: 'primary', text: 'Initiating quantum job packet negotiation...' },
      { type: 'secondary', text: 'Locking cooperative worker assignment via fairness protocol...' }
    ]);

    setTimeout(() => {
      setIsDispatching(false);
      setDispatchSuccess(true);
      setTerminalLogs((prev) => [
        ...prev,
        { type: 'secondary', text: 'DISPATCH CONFIRMED: Worker Node #841 Assigned (Trust: 99.2%)' }
      ]);
    }, 1800);
  };

  return (
    <div className="w-full min-h-screen relative bg-background text-on-background selection:bg-primary selection:text-on-primary">
      {/* Background WebGL Shader */}
      <ShaderBackground className="fixed inset-0 z-0 opacity-40 pointer-events-none" />

      {/* 3D Three.js Prism Visualizer */}
      <div className="fixed inset-y-0 right-0 w-full md:w-1/2 z-0 pointer-events-none hidden md:flex items-center justify-center opacity-85 mix-blend-screen pr-12">
        <ThreeDataPrism className="w-[450px] h-[450px]" />
      </div>

      <div className="relative z-10 w-full min-h-screen pt-28 px-4 md:px-12 max-w-7xl mx-auto pb-24 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Protocol Form */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/30 mb-3">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="font-mono text-xs text-secondary tracking-widest uppercase font-semibold">System Ready</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight">Job Request Protocol</h1>
            <p className="text-on-surface-variant text-sm mt-1 max-w-lg">
              Define the parameters for cooperative intelligence dispatch. The system auto-calibrates worker matching and ethical fair pay.
            </p>
          </div>

          {dispatchSuccess && (
            <div className="glass-panel p-4 rounded-xl border border-secondary/40 bg-secondary/10 flex items-center justify-between animate-fade-in-up">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-2xl">check_circle</span>
                <div>
                  <h4 className="font-sans font-bold text-white text-sm">Dispatch Packet Deployed</h4>
                  <p className="text-xs text-on-surface-variant font-mono">Job Hash: #JOB-0x89F4A • Matched with 99.2% Trust</p>
                </div>
              </div>
              <button
                onClick={() => { setDispatchSuccess(false); setTaskDescription(''); }}
                className="px-3 py-1 rounded-lg bg-secondary/20 hover:bg-secondary/30 text-secondary text-xs font-mono"
              >
                Reset
              </button>
            </div>
          )}

          <div className="glass-card rounded-2xl p-6 md:p-8 relative border border-white/10">
            <form onSubmit={handleDispatch} className="space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-mono uppercase tracking-wider text-on-surface-variant font-semibold">
                    Task Objective Description
                  </label>
                  <span className="text-primary/70 font-mono text-[11px]">REQ_PARAM_01</span>
                </div>
                <textarea
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  className="w-full bg-[#1c1b1c]/80 border border-white/10 rounded-xl p-4 text-white placeholder:text-on-surface-variant/40 min-h-[130px] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all font-sans text-sm resize-none"
                  placeholder="Describe your technical or operative requirement (e.g. Inspect solar inverter array telemetries and calibrate voltage regulators)..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-on-surface-variant font-semibold">
                    Target Skill DNA
                  </label>
                  <input
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="w-full bg-[#1c1b1c]/80 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-primary focus:outline-none font-sans"
                    placeholder="e.g. Electrical, Telemetry"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-on-surface-variant font-semibold">
                    Urgency Priority
                  </label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                    className="w-full bg-[#1c1b1c]/80 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-primary focus:outline-none font-sans"
                  >
                    <option value="low" className="bg-[#1c1b1c]">Standard Priority (24h)</option>
                    <option value="medium" className="bg-[#1c1b1c]">Elevated Priority (4h)</option>
                    <option value="high" className="bg-[#1c1b1c]">Critical Immediate Dispatch</option>
                  </select>
                </div>
              </div>

              {/* Financial Calculation Breakdown */}
              <div className="bg-[#0e0e0f]/80 p-4 rounded-xl border border-white/5 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Worker Fair Base Pay:</span>
                  <span className="text-white">${computedFee} UNV</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Cooperative Fund (5%):</span>
                  <span className="text-white">${coopTax} UNV</span>
                </div>
                <div className="border-t border-white/10 pt-2 flex justify-between font-bold text-sm text-primary">
                  <span>Total Estimated Settlement:</span>
                  <span>${total} UNV</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isDispatching}
                className="w-full bg-primary hover:bg-primary/90 text-on-primary font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(173,198,255,0.3)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {isDispatching ? (
                  <>
                    <span className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></span>
                    <span>Broadcasting Protocol...</span>
                  </>
                ) : (
                  <>
                    <span>Initialize Intelligence Dispatch</span>
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* AI Terminal Output */}
          <div className="glass-panel rounded-2xl p-5 bg-[#0e0e0f]/80 border border-tertiary/20">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-base">terminal</span>
                <span className="font-mono text-xs uppercase tracking-wider text-tertiary font-semibold">AI Neural Reasoning Feed</span>
              </div>
              <span className="font-mono text-[11px] text-primary/80">Confidence: {aiConfidence}%</span>
            </div>
            <div className="h-28 overflow-y-auto font-mono text-xs space-y-1.5 leading-relaxed">
              {terminalLogs.map((log, index) => (
                <div
                  key={index}
                  className={`flex gap-2 ${
                    log.type === 'primary'
                      ? 'text-primary'
                      : log.type === 'secondary'
                      ? 'text-secondary'
                      : log.type === 'tertiary'
                      ? 'text-tertiary'
                      : 'text-on-surface-variant/70'
                  }`}
                >
                  <span className="text-outline/40">&gt;</span>
                  <span>{log.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Network Telemetry & Live Nodes */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <h3 className="font-sans font-bold text-white text-base flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">analytics</span>
              <span>Dispatch Calibrations</span>
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-on-surface-variant">Worker Availability:</span>
                  <span className="text-secondary font-bold">84% Optimal</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full w-[84%] transition-all"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-on-surface-variant">Fairness Score:</span>
                  <span className="text-primary font-bold">98.9 / 100</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full w-[98%] transition-all"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-on-surface-variant">Latency:</span>
                  <span className="text-tertiary font-bold">14ms Quantum Edge</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-tertiary h-full rounded-full w-[92%] transition-all"></div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10">
              <h4 className="text-xs font-mono uppercase text-on-surface-variant tracking-wider mb-3">Live Active Nodes Nearby</h4>
              <div className="space-y-2.5">
                {[
                  { name: 'Dr. Elena Rostova', role: 'Telemetry Specialist', trust: 99.4, dist: '0.8 km' },
                  { name: 'Kaelen Vance', role: 'Autonomous Grid Ops', trust: 98.7, dist: '1.4 km' },
                  { name: 'Sora Chen', role: 'Bio-Telemetry Analyst', trust: 99.8, dist: '2.1 km' }
                ].map((node, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                        {node.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-sans font-semibold text-xs text-white">{node.name}</div>
                        <div className="text-[10px] text-on-surface-variant font-mono">{node.role}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-secondary font-mono font-bold">{node.trust}%</div>
                      <div className="text-[10px] text-on-surface-variant/70 font-mono">{node.dist}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerJobRequest;
