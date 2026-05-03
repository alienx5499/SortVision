/** Typings for `audioEngine.js` (play* methods accept numeric array values). */

export interface AudioEngine {
  audioContext: AudioContext | null;
  volume: number;
  isMuted: boolean;
  isAudioEnabled: boolean;
  initAudio(): void;
  enableAudio(): void;
  disableAudio(): void;
  closeAudio(): void;
  setVolume(value: number): void;
  toggleMute(): void;
  playCompareSound(value?: number | null): void;
  playSwapSound(value?: number | null): void;
  playAccessSound(value?: number | null): void;
  playCompleteSound(): void;
  playPivotSound(value?: number | null): void;
  playMergeSound(value?: number | null): void;
  setMaxArrayValue(value: number): void;
  playCategoryClickSound(): void;
  playAlgorithmSelectSound(): void;
  playTypingSound(): void;
}

export declare const audioEngine: AudioEngine;
