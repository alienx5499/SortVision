import { useEffect, useCallback, useState } from 'react';
import { audioEngine } from '../utils/audioEngine';
import { isAudioSupported } from '../utils/soundEffects';

export const useAudio = () => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [volume, setVolumeState] = useState(audioEngine.volume);
  const [isMuted, setIsMuted] = useState(audioEngine.isMuted);

  useEffect(() => {
    console.log(
      'useAudio: Hook mounted. Initial isAudioEnabled state:',
      isAudioEnabled
    );
    let hasInteracted = false;

    const handleUserInteraction = () => {
      if (hasInteracted) return; // Prevent multiple initializations
      hasInteracted = true;

      console.log(
        'useAudio: First user interaction detected. Initializing audio...'
      );

      // Ensure AudioEngine is initialized and enabled only once on first user interaction
      if (!audioEngine.audioContext) {
        audioEngine.initAudio();
        if (!audioEngine.audioContext) {
          console.error(
            'useAudio: Failed to initialize AudioContext during user interaction. Aborting sound enable.'
          );
          return;
        }
      }

      if (!audioEngine.isAudioEnabled) {
        audioEngine.enableAudio();
      }

      // Update local state to match engine state
      setIsAudioEnabled(audioEngine.isAudioEnabled);

      // Remove event listeners after first interaction
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      console.log('useAudio: Hook unmounting. Closing audio engine.');
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      audioEngine.closeAudio(); // Crucial for memory leak prevention
    };
  }, []); // Dependency array remains empty for single mount run

  const setVolume = useCallback(value => {
    audioEngine.setVolume(value);
    setVolumeState(value);
  }, []);

  const toggleMute = useCallback(() => {
    audioEngine.toggleMute();
    setIsMuted(!isMuted);
  }, [isMuted]);

  const playCompareSound = useCallback(
    value => {
      if (isAudioEnabled) {
        audioEngine.playCompareSound(value);
      }
    },
    [isAudioEnabled]
  );

  const playSwapSound = useCallback(
    value => {
      if (isAudioEnabled) {
        audioEngine.playSwapSound(value);
      }
    },
    [isAudioEnabled]
  );

  const playAccessSound = useCallback(
    value => {
      if (isAudioEnabled) {
        audioEngine.playAccessSound(value);
      }
    },
    [isAudioEnabled]
  );

  const playCompleteSound = useCallback(() => {
    if (isAudioEnabled) {
      audioEngine.playCompleteSound();
    }
  }, [isAudioEnabled]);

  const playPivotSound = useCallback(
    value => {
      if (isAudioEnabled) {
        audioEngine.playPivotSound(value);
      }
    },
    [isAudioEnabled]
  );

  const playMergeSound = useCallback(
    value => {
      if (isAudioEnabled) {
        audioEngine.playMergeSound(value);
      }
    },
    [isAudioEnabled]
  );

  const setMaxArrayValue = useCallback(value => {
    audioEngine.setMaxArrayValue(value);
  }, []);

  const playCategoryClickSound = useCallback(() => {
    if (isAudioEnabled) {
      audioEngine.playCategoryClickSound();
    }
  }, [isAudioEnabled]);

  const playAlgorithmSelectSound = useCallback(() => {
    if (isAudioEnabled) {
      audioEngine.playAlgorithmSelectSound();
    }
  }, [isAudioEnabled]);

  const playTypingSound = useCallback(() => {
    if (isAudioEnabled) {
      audioEngine.playTypingSound();
    }
  }, [isAudioEnabled]);

  const enableAudio = useCallback(() => {
    audioEngine.initAudio();
    audioEngine.enableAudio();
    // Use a small delay to allow the async enableAudio to complete
    setTimeout(() => {
      setIsAudioEnabled(audioEngine.isAudioEnabled);
    }, 100);
  }, []);

  const disableAudio = useCallback(() => {
    audioEngine.disableAudio();
    setIsAudioEnabled(audioEngine.isAudioEnabled);
  }, []);

  return {
    setVolume,
    toggleMute,
    enableAudio,
    disableAudio,
    playCompareSound,
    playSwapSound,
    playAccessSound,
    playCompleteSound,
    playPivotSound,
    playMergeSound,
    setMaxArrayValue,
    playCategoryClickSound,
    playAlgorithmSelectSound,
    playTypingSound,
    isMuted,
    volume,
    isAudioEnabled,
    isAudioSupported: isAudioSupported(),
  };
};
