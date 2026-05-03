import { soundEffects, type SortSoundOscillatorType } from './soundEffects';

function getAudioContextConstructor():
  | (typeof AudioContext & { new (): AudioContext })
  | undefined {
  if (typeof window === 'undefined') return undefined;
  const w = window as Window & {
    webkitAudioContext?: typeof AudioContext;
  };
  return window.AudioContext || w.webkitAudioContext;
}

interface ActiveOscillator {
  oscillator: OscillatorNode;
  startTime: number;
  duration: number;
}

/** Retained for API parity; playback is currently stubbed (see `playSound`). */
export class AudioEngine {
  audioContext: AudioContext | null = null;
  masterGain: GainNode | null = null;
  isMuted = false;
  volume = 1;
  isAudioEnabled = false;
  maxArrayValue = 100;
  lastPlayTime = 0;
  private readonly activeOscillators = new Set<ActiveOscillator>();

  constructor() {
    console.log('AudioEngine: Initializing instance.');
  }

  initAudio(): void {
    if (this.audioContext) {
      console.log('AudioEngine: Audio context already initialized');
      return;
    }

    try {
      const Ctor = getAudioContextConstructor();
      if (!Ctor) {
        console.error('AudioEngine: No AudioContext constructor available');
        return;
      }
      this.audioContext = new Ctor();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      console.log('AudioEngine: Successfully initialized audio context');

      this.enableAudio();
    } catch (error) {
      console.error('AudioEngine: Failed to initialize audio context:', error);
    }
  }

  enableAudio(): void {
    if (!this.audioContext) {
      console.log(
        'AudioEngine: enableAudio called without AudioContext. Initializing...'
      );
      this.initAudio();
      if (!this.audioContext) {
        console.error(
          'AudioEngine: Failed to initialize AudioContext during enableAudio. Aborting.'
        );
        this.isAudioEnabled = false;
        return;
      }
    }

    console.log(
      'AudioEngine: enableAudio - Current AudioContext state BEFORE resume attempt:',
      this.audioContext.state
    );
    if (this.audioContext.state === 'suspended') {
      console.log(
        'AudioEngine: AudioContext is suspended. Attempting to resume...'
      );
      this.audioContext
        .resume()
        .then(() => {
          this.isAudioEnabled = true;
          console.log(
            'AudioEngine: AudioContext resumed successfully. State:',
            this.audioContext?.state,
            'isAudioEnabled:',
            this.isAudioEnabled
          );

          if (this.masterGain && this.audioContext) {
            try {
              this.masterGain.connect(this.audioContext.destination);
              console.log(
                'AudioEngine: Master gain reconnected to destination after resume.'
              );
            } catch (e) {
              console.warn(
                'AudioEngine: Could not reconnect masterGain, it might already be connected:',
                e
              );
            }
          }

          this._playConfirmationSound();
        })
        .catch(error => {
          console.error('AudioEngine: Error resuming AudioContext:', error);
          this.isAudioEnabled = false;
          console.log(
            'AudioEngine: isAudioEnabled set to false due to resume error.'
          );
        });
    } else if (this.audioContext.state === 'running') {
      this.isAudioEnabled = true;
      console.log(
        'AudioEngine: AudioContext is already running. State:',
        this.audioContext.state
      );
      if (this.lastPlayTime === 0) {
        this._playConfirmationSound();
      }
    } else {
      console.log(
        'AudioEngine: AudioContext state is unexpected:',
        this.audioContext.state
      );
      this.isAudioEnabled = false;
    }
  }

  disableAudio(): void {
    this.isAudioEnabled = false;
    console.log(
      'AudioEngine: Audio disabled. isAudioEnabled:',
      this.isAudioEnabled
    );

    for (const oscInfo of this.activeOscillators) {
      try {
        oscInfo.oscillator.stop();
      } catch (e) {
        console.warn(
          'AudioEngine: Error stopping oscillator during disable:',
          e
        );
      }
    }
    this.activeOscillators.clear();

    if (this.audioContext && this.audioContext.state === 'running') {
      this.audioContext
        .suspend()
        .then(() => {
          console.log('AudioEngine: AudioContext suspended.');
        })
        .catch(error => {
          console.warn('AudioEngine: Error suspending AudioContext:', error);
        });
    }
  }

  private _playConfirmationSound(): void {
    console.log(
      'AudioEngine: Confirmation sound disabled - audio muted but UI remains functional'
    );
  }

  setVolume(value: number): void {
    this.volume = Math.max(0, Math.min(1, value));
    if (this.masterGain) {
      this.masterGain.gain.value = this.isMuted ? 0 : this.volume;
      console.log(
        `AudioEngine: Volume set to ${this.volume}. Actual gain value: ${this.masterGain.gain.value}. Muted: ${this.isMuted}`
      );
    }
  }

  toggleMute(): void {
    this.isMuted = !this.isMuted;
    if (this.masterGain) {
      this.masterGain.gain.value = this.isMuted ? 0 : this.volume;
      console.log(
        `AudioEngine: Mute toggled. Muted: ${this.isMuted}. Actual gain value: ${this.masterGain.gain.value}`
      );
    }
  }

  setMaxArrayValue(value: number): void {
    this.maxArrayValue = value;
    console.log(`AudioEngine: Max array value set to ${this.maxArrayValue}.`);
  }

  playSound(
    _frequency: number,
    _type: SortSoundOscillatorType,
    _duration: number,
    _value: number | null = null
  ): void {
    console.log(
      'AudioEngine: Audio playback disabled - sound muted but UI remains functional'
    );
  }

  playCompareSound(value: number | null = null): void {
    const { frequency, type, duration } = soundEffects.compare;
    this.playSound(frequency, type, duration, value);
  }

  playSwapSound(value: number | null = null): void {
    const { frequency, type, duration } = soundEffects.swap;
    this.playSound(frequency, type, duration, value);
  }

  playAccessSound(value: number | null = null): void {
    const { frequency, type, duration } = soundEffects.access;
    this.playSound(frequency, type, duration, value);
  }

  playCompleteSound(): void {
    const { frequencies, type, duration } = soundEffects.complete;
    if (this.audioContext && this.audioContext.state === 'suspended') {
      console.log(
        'AudioEngine: AudioContext suspended during playCompleteSound, attempting to resume.'
      );
      this.audioContext
        .resume()
        .then(() => {
          frequencies.forEach((freq, index) => {
            setTimeout(() => {
              this.playSound(freq, type, duration);
            }, index * 120);
          });
        })
        .catch(error => {
          console.error(
            'AudioEngine: Error resuming context for playCompleteSound:',
            error
          );
        });
    } else {
      frequencies.forEach((freq, index) => {
        setTimeout(() => {
          this.playSound(freq, type, duration);
        }, index * 120);
      });
    }
  }

  playPivotSound(value: number | null = null): void {
    const { frequency, type, duration } = soundEffects.pivot;
    this.playSound(frequency, type, duration, value);
  }

  playMergeSound(value: number | null = null): void {
    const { frequency, type, duration } = soundEffects.merge;
    this.playSound(frequency, type, duration, value);
  }

  playCategoryClickSound(): void {
    const { frequency, type, duration } = soundEffects.categoryClick;
    this.playSound(frequency, type, duration);
  }

  playAlgorithmSelectSound(): void {
    this.playSound(soundEffects.complete.frequencies[0], 'sine', 0.1);
  }

  playTypingSound(): void {
    console.log(
      'AudioEngine: Typing sound disabled - audio muted but UI remains functional'
    );
  }

  closeAudio(): void {
    if (this.audioContext && this.audioContext.state !== 'closed') {
      console.log(
        'AudioEngine: Attempting to close AudioContext. Current state:',
        this.audioContext.state
      );
      this.audioContext
        .close()
        .then(() => {
          console.log('AudioEngine: AudioContext closed successfully.');
          this.audioContext = null;
          this.masterGain = null;
          this.isAudioEnabled = false;
          this.activeOscillators.clear();
        })
        .catch(error => {
          console.error('AudioEngine: Error closing AudioContext:', error);
        });
    } else {
      console.log(
        'AudioEngine: AudioContext already closed or not initialized.'
      );
    }
  }
}

export const audioEngine = new AudioEngine();
