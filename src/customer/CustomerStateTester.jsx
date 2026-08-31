import React, { useState } from 'react';
import { useCustomer } from './CustomerContext';

export default function CustomerStateTester() {
  const { forcedState, setForcedState } = useCustomer();
  const [isOpen, setIsOpen] = useState(false);

  const states = [
    { id: 'normal', label: 'Normal Flow', desc: 'Standard production state with active data' },
    { id: 'loading', label: 'Loading / Skeleton', desc: 'Simulates network lag & async spinners' },
    { id: 'empty', label: 'Empty State', desc: 'Zero active jobs, clean history & empty states' },
    { id: 'error', label: 'Network Error', desc: 'Simulates network drop or failed dispatch' },
    { id: 'worker_unavailable', label: 'Worker Unavailable', desc: 'Simulates high demand & sector escalation' },
    { id: 'ai_uncertainty', label: 'AI Uncertainty Alert', desc: 'Simulates multi-symptom ambiguity' }
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50 font-mono text-xs">
      {/* Trigger Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="glass-hud px-4 py-2.5 rounded-2xl border border-primary/40 text-primary font-bold shadow-2xl flex items-center gap-2 hover:scale-105 transition-all bg-[#0e0e0f]/90"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></span>
        <span>Simulate State: {forcedState.toUpperCase()}</span>
        <span className="material-symbols-outlined text-sm">{isOpen ? 'expand_more' : 'tune'}</span>
      </button>

      {/* Drawer */}
      {isOpen && (
        <div className="absolute bottom-14 left-0 w-80 glass-card rounded-3xl p-4 border border-white/15 shadow-2xl space-y-2 backdrop-blur-2xl animate-fade-in-up">
          <div className="flex justify-between items-center pb-2 border-b border-white/10">
            <span className="font-bold text-white uppercase text-[11px]">System Edge State Tester</span>
            <button onClick={() => setIsOpen(false)} className="text-on-surface-variant hover:text-white">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>

          <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
            {states.map((st) => (
              <button
                key={st.id}
                onClick={() => { setForcedState(st.id); setIsOpen(false); }}
                className={`w-full text-left p-2.5 rounded-xl border transition-all ${
                  forcedState === st.id
                    ? 'bg-primary/20 border-primary text-white font-bold'
                    : 'bg-white/5 border-white/5 text-on-surface-variant hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs">{st.label}</span>
                  {forcedState === st.id && <span className="text-secondary text-xs">● Active</span>}
                </div>
                <div className="text-[10px] opacity-70 leading-tight mt-0.5">{st.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
