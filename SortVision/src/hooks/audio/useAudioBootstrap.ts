import { useEffect, type Dispatch, type SetStateAction } from 'react';
import { audioEngine } from '@/utils/audioEngine';

export const useAudioBootstrap = (
  setIsAudioEnabled: Dispatch<SetStateAction<boolean>>
) => {
  useEffect(() => {
    let hasInteracted = false;

    const handleUserInteraction = () => {
      if (hasInteracted) return;
      hasInteracted = true;

      if (!audioEngine.audioContext) {
        audioEngine.initAudio();
        if (!audioEngine.audioContext) {
          return;
        }
      }

      if (!audioEngine.isAudioEnabled) {
        audioEngine.enableAudio();
      }

      setIsAudioEnabled(audioEngine.isAudioEnabled);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      audioEngine.closeAudio();
    };
  }, [setIsAudioEnabled]);
};
