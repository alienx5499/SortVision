import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import VolumeControl from '../ui/VolumeControl';
import { useAudio } from '@/hooks/useAudio';
import { isAudioSupported } from '@/utils/soundEffects';

/**
 * AudioControls Component
 * Provides audio control panel for the sorting visualizer
 */
const AudioControls = () => {
  const { volume, setVolume, isMuted, toggleMute, isAudioEnabled } = useAudio();

  if (!isAudioSupported()) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Audio Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Audio is not supported in your browser.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Audio Controls</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Volume</span>
            <VolumeControl
              volume={volume}
              onVolumeChange={setVolume}
              isMuted={isMuted}
              onMuteToggle={toggleMute}
            />
          </div>
          {!isAudioEnabled && (
            <p className="text-sm text-yellow-500">
              Click anywhere to enable audio
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioControls;
