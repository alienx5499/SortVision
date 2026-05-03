/**
 * Sound Effects Utility
 * Provides different sound effects for sorting operations using Web Audio API
 */

export type SortSoundOscillatorType = 'sine' | 'triangle';

export interface SingleToneEffect {
  frequency: number;
  type: SortSoundOscillatorType;
  duration: number;
}

export interface ArpeggioEffect {
  frequencies: number[];
  type: SortSoundOscillatorType;
  duration: number;
}

export const soundEffects: {
  compare: SingleToneEffect;
  swap: SingleToneEffect;
  access: SingleToneEffect;
  complete: ArpeggioEffect;
  pivot: SingleToneEffect;
  merge: SingleToneEffect;
  categoryClick: SingleToneEffect;
} = {
  compare: {
    frequency: 440,
    type: 'sine',
    duration: 0.08,
  },
  swap: {
    frequency: 523.25,
    type: 'sine',
    duration: 0.1,
  },
  access: {
    frequency: 392,
    type: 'sine',
    duration: 0.08,
  },
  complete: {
    frequencies: [523.25, 659.25, 783.99],
    type: 'triangle',
    duration: 0.2,
  },
  pivot: {
    frequency: 466.16,
    type: 'sine',
    duration: 0.08,
  },
  merge: {
    frequency: 493.88,
    type: 'sine',
    duration: 0.08,
  },
  categoryClick: {
    frequency: 550,
    type: 'sine',
    duration: 0.06,
  },
};

export function createADSR(
  audioContext: AudioContext,
  attackTime = 0.02,
  decayTime = 0.1,
  sustainLevel = 0.3,
  releaseTime = 0.2
): GainNode {
  const gainNode = audioContext.createGain();
  const now = audioContext.currentTime;

  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(0.5, now + attackTime);
  gainNode.gain.linearRampToValueAtTime(
    sustainLevel,
    now + attackTime + decayTime
  );
  gainNode.gain.linearRampToValueAtTime(
    0,
    now + attackTime + decayTime + releaseTime
  );

  return gainNode;
}

export function mapValueToFrequency(
  value: number,
  maxValue: number,
  baseFrequency: number
): number {
  const minFrequency = baseFrequency * 0.8;
  const maxFrequency = baseFrequency * 1.2;
  return minFrequency + (value / maxValue) * (maxFrequency - minFrequency);
}

export function isAudioSupported(): boolean {
  if (typeof window === 'undefined') return false;
  const w = window as Window & { webkitAudioContext?: typeof AudioContext };
  return !!(window.AudioContext || w.webkitAudioContext);
}

class SoundEffects {
  audioContext: AudioContext | null = null;
  readonly isAudioSupported: boolean;
  isEnabled = false;

  constructor() {
    this.isAudioSupported = isAudioSupported();
  }

  init(): void {
    if (!this.isAudioSupported || this.audioContext) return;
    this.audioContext = new AudioContext();
  }

  playComparisonSound(): void {
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

  playSwapSound(): void {
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

  playCompletionSound(): void {
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

  enable(): void {
    this.isEnabled = true;
    this.init();
  }

  disable(): void {
    this.isEnabled = false;
  }
}

const soundEffectsInstance = new SoundEffects();

export default soundEffectsInstance;
