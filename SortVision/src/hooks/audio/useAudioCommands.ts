import { useCallback } from 'react';
import { audioEngine } from '@/utils/audioEngine';

export const useAudioCommands = (isAudioEnabled: boolean) => {
  return {
    setVolume: useCallback((value: number) => {
      audioEngine.setVolume(value);
    }, []),
    toggleMute: useCallback(() => {
      audioEngine.toggleMute();
    }, []),
    enableAudio: useCallback(() => {
      audioEngine.initAudio();
      audioEngine.enableAudio();
    }, []),
    disableAudio: useCallback(() => {
      audioEngine.disableAudio();
    }, []),
    playCompareSound: useCallback(
      (value?: number) => {
        if (isAudioEnabled) {
          audioEngine.playCompareSound(value ?? null);
        }
      },
      [isAudioEnabled]
    ),
    playSwapSound: useCallback(
      (value?: number) => {
        if (isAudioEnabled) {
          audioEngine.playSwapSound(value ?? null);
        }
      },
      [isAudioEnabled]
    ),
    playAccessSound: useCallback(
      (value?: number) => {
        if (isAudioEnabled) {
          audioEngine.playAccessSound(value ?? null);
        }
      },
      [isAudioEnabled]
    ),
    playCompleteSound: useCallback(() => {
      if (isAudioEnabled) {
        audioEngine.playCompleteSound();
      }
    }, [isAudioEnabled]),
    playPivotSound: useCallback(
      (value?: number) => {
        if (isAudioEnabled) {
          audioEngine.playPivotSound(value ?? null);
        }
      },
      [isAudioEnabled]
    ),
    playMergeSound: useCallback(
      (value?: number) => {
        if (isAudioEnabled) {
          audioEngine.playMergeSound(value ?? null);
        }
      },
      [isAudioEnabled]
    ),
    setMaxArrayValue: useCallback((value: number) => {
      audioEngine.setMaxArrayValue(value);
    }, []),
    playCategoryClickSound: useCallback(() => {
      if (isAudioEnabled) {
        audioEngine.playCategoryClickSound();
      }
    }, [isAudioEnabled]),
    playAlgorithmSelectSound: useCallback(() => {
      if (isAudioEnabled) {
        audioEngine.playAlgorithmSelectSound();
      }
    }, [isAudioEnabled]),
    playTypingSound: useCallback(() => {
      if (isAudioEnabled) {
        audioEngine.playTypingSound();
      }
    }, [isAudioEnabled]),
  };
};
