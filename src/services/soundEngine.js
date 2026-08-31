/**
 * UNIVO Procedural Audio Engine
 * 
 * Implements lightweight, zero-asset Web Audio API synthesis
 * for cinematic room transitions, interactive clicks, and environmental sweeps.
 */

class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.masterGain = null;
    this.isMuted = localStorage.getItem('univo_audio_muted') === 'true';
  }

  init() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
        this.masterGain = this.audioCtx.createGain();
        this.masterGain.gain.value = this.isMuted ? 0 : 0.35;
        this.masterGain.connect(this.audioCtx.destination);
      }
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('univo_audio_muted', this.isMuted.toString());
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.35, this.audioCtx?.currentTime || 0);
    }
    return this.isMuted;
  }

  /**
   * Cinematic Frequency Dive on Portal Transition
   * 150Hz exponential ramp down to 40Hz over 500ms
   */
  playTransitionSweep() {
    this.init();
    if (!this.audioCtx || this.isMuted) return;

    try {
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.5);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.5);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  /**
   * Subtle High-Tech Click for UI Micro-Interactions
   */
  playClick() {
    this.init();
    if (!this.audioCtx || this.isMuted) return;

    try {
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {}
  }
}

export const soundEngine = new SoundEngine();
export default soundEngine;
