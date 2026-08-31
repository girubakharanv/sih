import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSocial } from './SocialContext';
import parametricRuleEngine, { PARAMETRIC_THRESHOLDS } from './ParametricRuleEngine';
import ShaderBackground from '../components/ShaderBackground';

export default function ParametricProtectionView() {
  const { parametricTelemetry, setParametricTelemetry } = useSocial();

  const [temp, setTemp] = useState(parametricTelemetry.ambientTemperature);
  const [rain, setRain] = useState(parametricTelemetry.rainfallRate);
  const [flood, setFlood] = useState(parametricTelemetry.floodInundationDepth);

  const evaluatedRules = parametricRuleEngine.evaluateTriggers({
    ambientTemperature: temp,
    rainfallRate: rain,
    floodInundationDepth: flood
  });

  return (
    <div className="w-full min-h-screen relative bg-background text-on-background selection:bg-primary selection:text-on-primary">
      <ShaderBackground className="fixed inset-0 z-0 opacity-25 pointer-events-none" />

      <div className="relative z-10 w-full min-h-screen pt-28 px-4 md:px-10 max-w-6xl mx-auto pb-28 flex flex-col gap-8">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            to="/welfare"
            className="flex items-center gap-2 text-xs font-mono text-on-surface-variant hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Back to Mutual Aid &amp; Welfare Center</span>
          </Link>
          <div className="flex items-center gap-2 font-mono text-xs text-secondary">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span>Co-op Micro-Sensor Telemetry Active</span>
          </div>
        </div>

        {/* Title */}
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 mb-2">
            <span className="text-[10px] font-mono text-secondary uppercase font-bold tracking-wider">
              Part D: Parametric Protection Rule Engine
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight">
            Parametric Mutual Aid &amp; Climate Shield
          </h1>
          <p className="text-xs md:text-sm text-on-surface-variant font-mono mt-1 max-w-3xl">
            Objective, sensor-triggered mutual aid relief. When temperature, rainfall, or flood depth cross predefined thresholds, relief stipends and safe rest orders trigger automatically.
          </p>
        </div>

        {/* Mandatory Concept Prototype Disclaimer */}
        <div className="p-4 rounded-2xl bg-tertiary/10 border border-tertiary/30 text-tertiary font-mono text-xs flex items-start gap-3 animate-fade-in-up">
          <span className="material-symbols-outlined text-lg mt-0.5">info</span>
          <div>
            <span className="font-bold text-white uppercase tracking-wider block mb-0.5">
              IMPORTANT: PROTECTION / MUTUAL AID CONCEPT PROTOTYPE
            </span>
            <span>
              This is a decentralized cooperative mutual aid concept prototype. It demonstrates objective rule-based payouts driven by regional IoT sensor telemetry. It is not an underwriting or licensed insurance contract.
            </span>
          </div>
        </div>

        {/* Real-time Environmental Telemetry Simulator */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-6 font-mono text-xs shadow-2xl animate-fade-in-up">
          <div className="flex justify-between items-center pb-2 border-b border-white/10">
            <h3 className="font-sans font-bold text-lg text-white">Live Environmental Sensor Telemetry (Interactive Sandbox)</h3>
            <span className="text-on-surface-variant">Adjust sliders to trigger automated protocols</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Ambient Temperature Slider */}
            <div className="p-4 rounded-2xl bg-[#0e0e0f]/80 border border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant uppercase text-[10px] font-bold">Ambient Temperature</span>
                <span className={`text-base font-bold ${temp >= PARAMETRIC_THRESHOLDS.EXTREME_HEAT_TEMP_C ? 'text-error' : 'text-secondary'}`}>
                  {temp}°C
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="48"
                step="0.5"
                value={temp}
                onChange={(e) => setTemp(parseFloat(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-[10px] text-on-surface-variant/70">
                <span>Safe (32°C)</span>
                <span>Threshold: ≥ {PARAMETRIC_THRESHOLDS.EXTREME_HEAT_TEMP_C}°C</span>
              </div>
            </div>

            {/* Precipitation Rate Slider */}
            <div className="p-4 rounded-2xl bg-[#0e0e0f]/80 border border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant uppercase text-[10px] font-bold">Rainfall Rate</span>
                <span className={`text-base font-bold ${rain >= PARAMETRIC_THRESHOLDS.HEAVY_RAIN_MM_PER_HR ? 'text-primary' : 'text-white'}`}>
                  {rain} mm/hr
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="120"
                step="5"
                value={rain}
                onChange={(e) => setRain(parseFloat(e.target.value))}
                className="w-full accent-secondary"
              />
              <div className="flex justify-between text-[10px] text-on-surface-variant/70">
                <span>Light Rain (15mm)</span>
                <span>Threshold: ≥ {PARAMETRIC_THRESHOLDS.HEAVY_RAIN_MM_PER_HR} mm/hr</span>
              </div>
            </div>

            {/* Flood Inundation Depth Slider */}
            <div className="p-4 rounded-2xl bg-[#0e0e0f]/80 border border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant uppercase text-[10px] font-bold">Inundation Water Depth</span>
                <span className={`text-base font-bold ${flood >= PARAMETRIC_THRESHOLDS.FLASH_FLOOD_DEPTH_METERS ? 'text-error' : 'text-white'}`}>
                  {flood} meters
                </span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.2"
                step="0.05"
                value={flood}
                onChange={(e) => setFlood(parseFloat(e.target.value))}
                className="w-full accent-error"
              />
              <div className="flex justify-between text-[10px] text-on-surface-variant/70">
                <span>Dry Sub-floor (0m)</span>
                <span>Threshold: ≥ {PARAMETRIC_THRESHOLDS.FLASH_FLOOD_DEPTH_METERS}m</span>
              </div>
            </div>
          </div>
        </div>

        {/* Engine Output & Automated Mutual Aid Grants */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-secondary/40 space-y-6 font-mono text-xs animate-fade-in-up">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase font-bold text-secondary">Automated Execution Protocol</span>
              <h3 className="font-sans font-bold text-2xl text-white mt-0.5">
                Active Parametric Stipends &amp; Directives
              </h3>
              <p className="text-on-surface-variant mt-0.5">
                Funds and rest orders are released autonomously without manual paperwork or delay.
              </p>
            </div>
            <div className="text-right">
              <span className="text-on-surface-variant uppercase text-[10px]">Calculated Mutual Aid Relief</span>
              <div className="text-3xl font-bold text-secondary">{evaluatedRules.totalDirectStipend}</div>
              <span className="text-[10px] text-on-surface-variant">{evaluatedRules.triggeredRulesCount} Active Trigger(s)</span>
            </div>
          </div>

          {evaluatedRules.triggeredRules.length === 0 ? (
            <div className="p-8 text-center text-on-surface-variant border border-dashed border-white/10 rounded-2xl">
              All environmental telemetry is currently below trigger thresholds. Safe conditions detected.
            </div>
          ) : (
            <div className="space-y-3">
              {evaluatedRules.triggeredRules.map((rule) => (
                <div
                  key={rule.id}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-base">bolt</span>
                      <span className="font-bold text-white text-sm">{rule.title}</span>
                      <span className="text-[10px] text-on-surface-variant">• {rule.metric}</span>
                    </div>
                    <p className="text-on-surface-variant text-[11px] mt-1 leading-relaxed">{rule.action}</p>
                  </div>

                  <div className="text-right whitespace-nowrap">
                    <span className="text-secondary font-bold text-sm block">{rule.stipendGranted}</span>
                    <span className="text-[10px] text-primary">Autonomously Escrowed</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Automated Directives */}
          {evaluatedRules.automatedDirectives.length > 0 && (
            <div className="p-4 rounded-2xl bg-[#0e0e0f]/90 border border-white/5 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-primary">Constitutional Rest &amp; Transit Rights Active:</span>
              {evaluatedRules.automatedDirectives.map((d, i) => (
                <div key={i} className="text-white text-[11px] flex items-center gap-2">
                  <span className="material-symbols-outlined text-xs text-secondary">check</span>
                  <span>{d}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
