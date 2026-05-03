import { useState } from 'react';
import { audioEngine } from '@/utils/audioEngine';
import { isAudioSupported } from '@/utils/soundEffects';
import { useAudioBootstrap } from './useAudioBootstrap';
import { useAudioCommands } from './useAudioCommands';

export function useAudio() {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [volume, setVolumeState] = useState(audioEngine.volume);
  const [isMuted, setIsMuted] = useState(audioEngine.isMuted);
  useAudioBootstrap(setIsAudioEnabled);
  const commands = useAudioCommands(isAudioEnabled);

  const setVolume = (value: number) => {
    commands.setVolume(value);
    setVolumeState(audioEngine.volume);
  };

  const toggleMute = () => {
    commands.toggleMute();
    setIsMuted(audioEngine.isMuted);
  };

  const enableAudio = () => {
    commands.enableAudio();
    setTimeout(() => {
      setIsAudioEnabled(audioEngine.isAudioEnabled);
    }, 100);
  };

  const disableAudio = () => {
    commands.disableAudio();
    setIsAudioEnabled(audioEngine.isAudioEnabled);
  };

  return {
    setVolume,
    toggleMute,
    enableAudio,
    disableAudio,
    playCompareSound: commands.playCompareSound,
    playSwapSound: commands.playSwapSound,
    playAccessSound: commands.playAccessSound,
    playCompleteSound: commands.playCompleteSound,
    playPivotSound: commands.playPivotSound,
    playMergeSound: commands.playMergeSound,
    setMaxArrayValue: commands.setMaxArrayValue,
    playCategoryClickSound: commands.playCategoryClickSound,
    playAlgorithmSelectSound: commands.playAlgorithmSelectSound,
    playTypingSound: commands.playTypingSound,
    isMuted,
    volume,
    isAudioEnabled,
    isAudioSupported: isAudioSupported(),
  };
}

export type UseAudioReturn = ReturnType<typeof useAudio>;
