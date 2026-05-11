import { useCallback } from 'react';
import type { UseAudioReturn } from '@/hooks/audio';

export function useVisualizerAudioEffects(audio: UseAudioReturn) {
  const playAccessSound = useCallback(() => {
    audio.playAccessSound();
  }, [audio]);

  return { playAccessSound };
}
