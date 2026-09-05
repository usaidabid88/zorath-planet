/**
 * Procedural Web Audio API Sci-Fi Sound Synthesizer Engine
 * Pure synthesized soundscapes, tactile UI clicks, scanner sweeps, and ambient cosmic drones.
 * Requires zero external audio file downloads for instant 0ms latency playback.
 */

let audioCtx = null;
let masterGain = null;
let droneGain = null;
let droneOscillators = [];
let isMuted = true; // Default to muted for polite browser audio policy
let isDronePlaying = false;

/**
 * Lazy initialize AudioContext on user interaction
 */
function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    audioCtx = new AudioContextClass();

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(isMuted ? 0 : 0.35, audioCtx.currentTime);
    masterGain.connect(audioCtx.destination);
  }

  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }

  return audioCtx;
}

/**
 * Set master mute state
 */
export function setMuted(muted) {
  isMuted = muted;
  const ctx = getAudioContext();
  if (ctx && masterGain) {
    masterGain.gain.setTargetAtTime(muted ? 0 : 0.35, ctx.currentTime, 0.05);
  }
  if (muted && isDronePlaying) {
    stopAmbientDrone();
  }
}

export function getMuted() {
  return isMuted;
}

/**
 * Tactile Sci-Fi Button Beep / Switch Click
 */
export function playUiClick(freq = 960, type = 'sine') {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.3, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.07);
  } catch (err) {
    // AudioContext safety fallback
  }
}

/**
 * Planetary Telemetry Tick / Chart Hover
 */
export function playTelemetryTick() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.03);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.04);
  } catch (err) {}
}

/**
 * Radar / Scanner Harmonic Sweep
 */
export function playScanSweep() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sawtooth';

    osc1.frequency.setValueAtTime(420, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(1280, ctx.currentTime + 0.16);

    osc2.frequency.setValueAtTime(210, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(640, ctx.currentTime + 0.16);

    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(masterGain);

    osc1.start(ctx.currentTime);
    osc2.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.19);
    osc2.stop(ctx.currentTime + 0.19);
  } catch (err) {}
}

/**
 * High-Energy Warp Charge / Launch Confirmation Sound
 */
export function playWarpCharge() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const subOsc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(2400, ctx.currentTime + 0.45);

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(480, ctx.currentTime + 0.45);

    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(55, ctx.currentTime);
    subOsc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.45);

    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);

    osc.connect(filter);
    subOsc.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);

    osc.start(ctx.currentTime);
    subOsc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.55);
    subOsc.stop(ctx.currentTime + 0.55);
  } catch (err) {}
}

/**
 * Start Ambient Deep Space Drone (Binaural Harmonic Layers)
 */
export function startAmbientDrone() {
  const ctx = getAudioContext();
  if (!ctx) return;

  stopAmbientDrone(); // Clean previous if any

  try {
    droneGain = ctx.createGain();
    droneGain.gain.setValueAtTime(0.001, ctx.currentTime);
    droneGain.gain.exponentialRampToValueAtTime(isMuted ? 0.001 : 0.15, ctx.currentTime + 1.2);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(240, ctx.currentTime);

    // 3 Layered Harmonic Frequencies (55Hz Fundamental, 110Hz Sub, 165Hz Chord)
    const freqs = [55, 110, 164.81];
    droneOscillators = freqs.map((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = i === 0 ? 'sine' : i === 1 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.connect(filter);
      osc.start();
      return osc;
    });

    filter.connect(droneGain);
    droneGain.connect(masterGain);
    isDronePlaying = true;
  } catch (err) {}
}

/**
 * Stop Ambient Deep Space Drone
 */
export function stopAmbientDrone() {
  if (!droneGain || !audioCtx) return;
  try {
    droneGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.4);
    setTimeout(() => {
      droneOscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (e) {}
      });
      droneOscillators = [];
      isDronePlaying = false;
    }, 450);
  } catch (err) {
    droneOscillators = [];
    isDronePlaying = false;
  }
}

export function isDroneActive() {
  return isDronePlaying;
}
