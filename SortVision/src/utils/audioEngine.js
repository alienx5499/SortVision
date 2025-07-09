import { soundEffects, createADSR, mapValueToFrequency } from './soundEffects';

class AudioEngine {
  constructor() {
    this.audioContext = null;
    this.masterGain = null;
    this.isMuted = false;
    this.volume = 1;
    this.isAudioEnabled = false; // Start as disabled
    this.maxArrayValue = 100;
    this.lastPlayTime = 0;
    this.minPlayInterval = 50; // Minimum time between sounds in milliseconds
    this.activeOscillators = new Set();
    console.log('AudioEngine: Initializing instance.');
  }

  initAudio() {
    if (this.audioContext) {
      console.log('AudioEngine: Audio context already initialized');
      return;
    }

    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      console.log('AudioEngine: Successfully initialized audio context');
      
      // After initialization, try to enable audio
      this.enableAudio();
    } catch (error) {
      console.error('AudioEngine: Failed to initialize audio context:', error);
    }
  }

  enableAudio() {
    if (!this.audioContext) {
      console.log('AudioEngine: enableAudio called without AudioContext. Initializing...');
      this.initAudio();
      if (!this.audioContext) {
        console.error('AudioEngine: Failed to initialize AudioContext during enableAudio. Aborting.');
        this.isAudioEnabled = false;
        return;
      }
    }

    console.log('AudioEngine: enableAudio - Current AudioContext state BEFORE resume attempt:', this.audioContext.state);
    if (this.audioContext.state === 'suspended') {
      console.log('AudioEngine: AudioContext is suspended. Attempting to resume...');
      this.audioContext.resume().then(() => {
        this.isAudioEnabled = true;
        console.log('AudioEngine: AudioContext resumed successfully. State:', this.audioContext.state, 'isAudioEnabled:', this.isAudioEnabled);
        
        // Ensure master gain is connected
        if (this.masterGain) {
          try {
            this.masterGain.connect(this.audioContext.destination);
            console.log('AudioEngine: Master gain reconnected to destination after resume.');
          } catch (e) {
            console.warn('AudioEngine: Could not reconnect masterGain, it might already be connected:', e);
          }
        }
        
        // Play a very short, distinct sound to confirm audio is working
        this._playConfirmationSound();
      }).catch(error => {
        console.error('AudioEngine: Error resuming AudioContext:', error);
        this.isAudioEnabled = false;
        console.log('AudioEngine: isAudioEnabled set to false due to resume error.');
      });
    } else if (this.audioContext.state === 'running') {
      this.isAudioEnabled = true;
      console.log('AudioEngine: AudioContext is already running. State:', this.audioContext.state);
      // Play confirmation sound if this is the first enable
      if (this.lastPlayTime === 0) {
        this._playConfirmationSound();
      }
    } else {
      console.log('AudioEngine: AudioContext state is unexpected:', this.audioContext.state);
      this.isAudioEnabled = false;
    }
  }

  disableAudio() {
    this.isAudioEnabled = false;
    console.log('AudioEngine: Audio disabled. isAudioEnabled:', this.isAudioEnabled);
    
    // Stop all active oscillators
    for (const oscInfo of this.activeOscillators) {
      try {
        if (oscInfo.oscillator && oscInfo.oscillator.stop) {
          oscInfo.oscillator.stop();
        }
      } catch (e) {
        console.warn('AudioEngine: Error stopping oscillator during disable:', e);
      }
    }
    this.activeOscillators.clear();
    
    // Optionally suspend the audio context to save resources
    if (this.audioContext && this.audioContext.state === 'running') {
      this.audioContext.suspend().then(() => {
        console.log('AudioEngine: AudioContext suspended.');
      }).catch(error => {
        console.warn('AudioEngine: Error suspending AudioContext:', error);
      });
    }
  }

  // Private helper to play a simple confirmation sound
  _playConfirmationSound() {
    // *** AUDIO DISABLED *** - Confirmation sound muted
    console.log('AudioEngine: Confirmation sound disabled - audio muted but UI remains functional');
    return;
    
    // Original confirmation sound logic kept for reference (unreachable code)
    try {
      if (!this.audioContext || !this.masterGain) {
        console.warn('AudioEngine: Cannot play confirmation sound, audioContext or masterGain not ready.');
        return;
      }
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.value = 880; // A5 note
      gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);

      oscillator.connect(gainNode);
      gainNode.connect(this.masterGain);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.1);
      console.log('AudioEngine: Played confirmation sound.');
    } catch (e) {
      console.error('AudioEngine: Error playing confirmation sound:', e);
    }
  }

  setVolume(value) {
    this.volume = Math.max(0, Math.min(1, value));
    if (this.masterGain) {
      this.masterGain.gain.value = this.isMuted ? 0 : this.volume;
      console.log(`AudioEngine: Volume set to ${this.volume}. Actual gain value: ${this.masterGain.gain.value}. Muted: ${this.isMuted}`);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain) {
      this.masterGain.gain.value = this.isMuted ? 0 : this.volume;
      console.log(`AudioEngine: Mute toggled. Muted: ${this.isMuted}. Actual gain value: ${this.masterGain.gain.value}`);
    }
  }

  setMaxArrayValue(value) {
    this.maxArrayValue = value;
    console.log(`AudioEngine: Max array value set to ${this.maxArrayValue}.`);
  }

  cleanupOscillators() {
    const now = performance.now();
    const initialSize = this.activeOscillators.size;
    for (const oscInfo of this.activeOscillators) {
      if (now - oscInfo.startTime > oscInfo.duration * 1000 + 100) { // Add a small buffer
        try {
          if (oscInfo.oscillator && oscInfo.oscillator.stop) {
            // In some cases, stopping an already stopped oscillator can throw an error
            // For now, we'll just let it naturally stop and rely on garbage collection.
            // If persistent issues arise, we might re-evaluate this.
            // oscInfo.oscillator.stop(); 
          }
          this.activeOscillators.delete(oscInfo);
        } catch (e) {
          console.error('AudioEngine: Error cleaning up oscillator:', e);
        }
      }
    }
    if (this.activeOscillators.size < initialSize) {
      console.log(`AudioEngine: Cleaned up ${initialSize - this.activeOscillators.size} old oscillators. Remaining: ${this.activeOscillators.size}.`);
    }
  }

  playSound(frequency, type, duration, value = null) {
    // *** AUDIO DISABLED *** - All sounds are muted while keeping UI functional
    console.log('AudioEngine: Audio playback disabled - sound muted but UI remains functional');
    return;
    
    // Original audio logic kept for reference (unreachable code)
    if (!this.audioContext || this.isMuted || !this.isAudioEnabled || this.audioContext.state !== 'running') {
      console.log('AudioEngine: Play sound aborted - Audio not ready or not running. Context:', !!this.audioContext, 'Muted:', this.isMuted, 'Enabled:', this.isAudioEnabled, 'State:', this.audioContext ? this.audioContext.state : 'N/A');
      return;
    }

    const now = performance.now();
    if (now - this.lastPlayTime < this.minPlayInterval) {
      // console.log(`AudioEngine: Play sound debounced. Last play: ${this.lastPlayTime.toFixed(2)}, Current: ${now.toFixed(2)}, Interval: ${this.minPlayInterval}.`);
      return;
    }
    this._actuallyPlaySound(frequency, type, duration, value, now);
  }

  _actuallyPlaySound(frequency, type, duration, value, playTime) {
    try {
      this.cleanupOscillators();

      const oscillator = this.audioContext.createOscillator();
      const gainNode = createADSR(this.audioContext, 0.02, 0.1, 0.3, 0.2);

      const finalFrequency = value !== null
        ? mapValueToFrequency(value, this.maxArrayValue, frequency)
        : frequency;

      oscillator.type = type;
      oscillator.frequency.value = finalFrequency;

      oscillator.connect(gainNode);
      gainNode.connect(this.masterGain);

      const oscInfo = {
        oscillator,
        startTime: playTime,
        duration: duration
      };
      this.activeOscillators.add(oscInfo);

      oscillator.start(this.audioContext.currentTime); // Start immediately
      oscillator.stop(this.audioContext.currentTime + duration);

      this.lastPlayTime = playTime;
      console.log(`AudioEngine: Playing sound. Freq: ${finalFrequency}, Type: ${type}, Duration: ${duration}. Active oscillators: ${this.activeOscillators.size}. Context state: ${this.audioContext.state}`);

      // Remove oscillator from active set after it's done
      setTimeout(() => {
        if (this.activeOscillators.has(oscInfo)) {
          this.activeOscillators.delete(oscInfo);
          // console.log(`AudioEngine: Oscillator cleaned up by setTimeout. Remaining: ${this.activeOscillators.size}.`);
        }
      }, duration * 1000 + 50); // Small buffer for cleanup

    } catch (error) {
      console.error('AudioEngine: Error playing sound in _actuallyPlaySound:', error);
      if (error.name === 'InvalidStateError' && this.audioContext.state !== 'running') {
        console.error('AudioEngine: AudioContext is not in a running state. Current state:', this.audioContext.state);
      }
    }
  }

  playCompareSound(value = null) {
    const { frequency, type, duration } = soundEffects.compare;
    this.playSound(frequency, type, duration, value);
  }

  playSwapSound(value = null) {
    const { frequency, type, duration } = soundEffects.swap;
    this.playSound(frequency, type, duration, value);
  }

  playAccessSound(value = null) {
    const { frequency, type, duration } = soundEffects.access;
    this.playSound(frequency, type, duration, value);
  }

  playCompleteSound() {
    const { frequencies, type, duration } = soundEffects.complete;
    // Ensure the context is running before attempting to play the arpeggio
    if (this.audioContext && this.audioContext.state === 'suspended') {
      console.log('AudioEngine: AudioContext suspended during playCompleteSound, attempting to resume.');
      this.audioContext.resume().then(() => {
        frequencies.forEach((freq, index) => {
          setTimeout(() => {
            this.playSound(freq, type, duration);
          }, index * 120); // Slightly increased delay for clarity
        });
      }).catch(error => {
        console.error('AudioEngine: Error resuming context for playCompleteSound:', error);
      });
    } else {
      frequencies.forEach((freq, index) => {
        setTimeout(() => {
          this.playSound(freq, type, duration);
        }, index * 120); // Slightly increased delay for clarity
      });
    }
  }

  playPivotSound(value = null) {
    const { frequency, type, duration } = soundEffects.pivot;
    this.playSound(frequency, type, duration, value);
  }

  playMergeSound(value = null) {
    const { frequency, type, duration } = soundEffects.merge;
    this.playSound(frequency, type, duration, value);
  }

  playCategoryClickSound() {
    const { frequency, type, duration } = soundEffects.categoryClick;
    this.playSound(frequency, type, duration);
  }

  playAlgorithmSelectSound() {
    this.playSound(soundEffects.complete.frequencies[0], 'sine', 0.1);
  }

  playTypingSound() {
    // *** AUDIO DISABLED *** - Typing sound muted
    console.log('AudioEngine: Typing sound disabled - audio muted but UI remains functional');
    return;
    
    // Original typing sound logic kept for reference (unreachable code)
    if (!this.audioContext || this.isMuted || !this.isAudioEnabled || this.audioContext.state !== 'running') {
      return;
    }

    try {
      // Create oscillators for a more complex typing sound
      const keyPressOsc = this.audioContext.createOscillator();
      const keyReleaseOsc = this.audioContext.createOscillator();
      const noiseOsc = this.audioContext.createOscillator();
      
      const keyPressGain = this.audioContext.createGain();
      const keyReleaseGain = this.audioContext.createGain();
      const noiseGain = this.audioContext.createGain();

      // Key press sound (deeper thud)
      keyPressOsc.type = 'triangle';
      keyPressOsc.frequency.setValueAtTime(150, this.audioContext.currentTime);
      keyPressOsc.frequency.exponentialRampToValueAtTime(80, this.audioContext.currentTime + 0.05);
      
      keyPressGain.gain.setValueAtTime(0, this.audioContext.currentTime);
      keyPressGain.gain.linearRampToValueAtTime(this.volume * 0.3, this.audioContext.currentTime + 0.005);
      keyPressGain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.05);

      // Key release sound (higher pitched click)
      keyReleaseOsc.type = 'square';
      keyReleaseOsc.frequency.setValueAtTime(1200, this.audioContext.currentTime + 0.005);
      keyReleaseOsc.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.02);
      
      keyReleaseGain.gain.setValueAtTime(0, this.audioContext.currentTime);
      keyReleaseGain.gain.linearRampToValueAtTime(this.volume * 0.15, this.audioContext.currentTime + 0.01);
      keyReleaseGain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.02);

      // Mechanical noise (white noise simulation)
      noiseOsc.type = 'square';
      noiseOsc.frequency.setValueAtTime(2000, this.audioContext.currentTime);
      
      noiseGain.gain.setValueAtTime(0, this.audioContext.currentTime);
      noiseGain.gain.linearRampToValueAtTime(this.volume * 0.05, this.audioContext.currentTime + 0.002);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.03);

      // Connect all oscillators
      keyPressOsc.connect(keyPressGain);
      keyReleaseOsc.connect(keyReleaseGain);
      noiseOsc.connect(noiseGain);

      keyPressGain.connect(this.masterGain);
      keyReleaseGain.connect(this.masterGain);
      noiseGain.connect(this.masterGain);

      // Start and stop all oscillators
      keyPressOsc.start(this.audioContext.currentTime);
      keyReleaseOsc.start(this.audioContext.currentTime);
      noiseOsc.start(this.audioContext.currentTime);

      keyPressOsc.stop(this.audioContext.currentTime + 0.05);
      keyReleaseOsc.stop(this.audioContext.currentTime + 0.02);
      noiseOsc.stop(this.audioContext.currentTime + 0.03);

    } catch (error) {
      console.error('AudioEngine: Error playing typing sound:', error);
    }
  }

  closeAudio() {
    if (this.audioContext && this.audioContext.state !== 'closed') {
      console.log('AudioEngine: Attempting to close AudioContext. Current state:', this.audioContext.state);
      this.audioContext.close().then(() => {
        console.log('AudioEngine: AudioContext closed successfully.');
        this.audioContext = null;
        this.masterGain = null;
        this.isAudioEnabled = false;
        this.activeOscillators.clear();
      }).catch(error => {
        console.error('AudioEngine: Error closing AudioContext:', error);
      });
    } else {
      console.log('AudioEngine: AudioContext already closed or not initialized.');
    }
  }
}

export const audioEngine = new AudioEngine(); 