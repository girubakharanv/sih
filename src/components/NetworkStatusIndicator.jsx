import React, { useState, useEffect } from 'react';
import offlineSync from '../services/offlineSync';
import { useAccessibility } from '../context/AccessibilityContext';

export default function NetworkStatusIndicator() {
  const { t } = useAccessibility();
  const [isOnline, setIsOnline] = useState(offlineSync.isOnline);
  const [outboxCount, setOutboxCount] = useState(offlineSync.getOutboxCount());
  const [isSimulatingOffline, setIsSimulatingOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = offlineSync.subscribe((online, count) => {
      setIsOnline(online);
      setOutboxCount(count);
    });
    return unsubscribe;
  }, []);

  const handleToggleSimulatedOffline = () => {
    const next = !isSimulatingOffline;
    setIsSimulatingOffline(next);
    offlineSync.setSimulatedOffline(next);
  };

  return (
    <>
      {/* Offline Banner when disconnected */}
      {!isOnline && (
        <div className="fixed top-0 left-0 w-full z-50 bg-tertiary text-on-tertiary font-mono text-xs px-4 py-2 flex items-center justify-between shadow-xl animate-fade-in-up">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-base">cloud_off</span>
            <span className="font-bold">
              {t('offlineBanner')}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-black/20 font-bold">
              Queued: {outboxCount} Actions
            </span>
            <button
              onClick={handleToggleSimulatedOffline}
              className="text-[11px] underline hover:opacity-80 font-bold"
            >
              Reconnect
            </button>
          </div>
        </div>
      )}

      {/* Floating Connectivity Control for Judges & Demonstrations */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={handleToggleSimulatedOffline}
          title="Toggle Rural Low-Signal / Offline Mode"
          className={`glass-hud px-3 py-1.5 rounded-full border text-xs font-mono flex items-center gap-2 shadow-lg transition-all ${
            isOnline
              ? 'border-white/10 text-on-surface-variant hover:text-white'
              : 'border-tertiary bg-tertiary/20 text-tertiary font-bold shadow-[0_0_15px_rgba(255,185,95,0.3)]'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-secondary' : 'bg-tertiary animate-ping'}`} />
          <span>{isOnline ? 'Network: 4G/WiFi' : 'Network: Rural 2G / Offline'}</span>
          {outboxCount > 0 && (
            <span className="px-1.5 py-0.2 rounded bg-tertiary text-black text-[10px] font-bold">
              {outboxCount}
            </span>
          )}
        </button>
      </div>
    </>
  );
}
