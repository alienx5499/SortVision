/**
 * Sound Effects Utility
 * Provides different sound effects for sorting operations using Web Audio API
 */

// Sound effect configurations with softer, more pleasant frequencies
export const soundEffects = {
  compare: {
    frequency: 440, // A4 note - softer than before
    type: 'sine',
    duration: 0.08,
  },
  swap: {
    frequency: 523.25, // C5 note - pleasant higher tone
    type: 'sine',
    duration: 0.1,
  },
  access: {
    frequency: 392, // G4 note - warm tone
    type: 'sine',
    duration: 0.08,
  },
  complete: {
    frequencies: [523.25, 659.25, 783.99], // C5, E5, G5 - more noticeable C major arpeggio
    type: 'triangle', // Changed to triangle for a fuller sound
    duration: 0.2, // Slightly increased duration per note
  },
  pivot: {
    frequency: 466.16, // A#4/Bb4 note
    type: 'sine',
    duration: 0.08,
  },
  merge: {
    frequency: 493.88, // B4 note
    type: 'sine',
    duration: 0.08,
  },
};

// ADSR envelope creation helper with softer attack and release
export const createADSR = (
  audioContext,
  attackTime = 0.02,
  decayTime = 0.1,
  sustainLevel = 0.3,
  releaseTime = 0.2
) => {
  const gainNode = audioContext.createGain();
  const now = audioContext.currentTime;

  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(0.5, now + attackTime); // Reduced peak volume
  gainNode.gain.linearRampToValueAtTime(
    sustainLevel,
    now + attackTime + decayTime
  );
  gainNode.gain.linearRampToValueAtTime(
    0,
    now + attackTime + decayTime + releaseTime
  );

  return gainNode;
};

// Map array value to frequency with reduced range for softer sounds
export const mapValueToFrequency = (value, maxValue, baseFrequency) => {
  const minFrequency = baseFrequency * 0.8; // Reduced range
  const maxFrequency = baseFrequency * 1.2; // Reduced range
  return minFrequency + (value / maxValue) * (maxFrequency - minFrequency);
};

// Check if audio is supported
export const isAudioSupported = () => {
  return (
    typeof window !== 'undefined' &&
    (window.AudioContext || window.webkitAudioContext)
  );
};

class SoundEffects {
  constructor() {
    this.audioContext = null;
    this.isAudioSupported =
      typeof window !== 'undefined' && window.AudioContext;
    this.isEnabled = false;
  }

  init() {
    if (!this.isAudioSupported || this.audioContext) return;
    this.audioContext = new AudioContext();
  }

  // Play a click sound for comparisons
  playComparisonSound() {
    if (!this.isEnabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      1000,
      this.audioContext.currentTime + 0.1
    );

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 0.1
    );

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }

  // Play a pop sound for swaps
  playSwapSound() {
    if (!this.isEnabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      600,
      this.audioContext.currentTime + 0.2
    );

    gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 0.2
    );

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 0.2);
  }

  // Play a success sound when sorting completes
  playCompletionSound() {
    if (!this.isEnabled || !this.audioContext) return;

    const now = this.audioContext.currentTime;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, now);
    oscillator.frequency.exponentialRampToValueAtTime(800, now + 0.1);
    oscillator.frequency.exponentialRampToValueAtTime(1000, now + 0.2);

    gainNode.gain.setValueAtTime(0.2, now);
    gainNode.gain.exponentialRampToValueAtTime(0.1, now + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.start();
    oscillator.stop(now + 0.2);
  }

  enable() {
    this.isEnabled = true;
    this.init();
  }

  disable() {
    this.isEnabled = false;
  }
}

// Create a singleton instance
const soundEffectsInstance = new SoundEffects();

export default soundEffectsInstance;
