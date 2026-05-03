'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import VolumeControl from '../ui/VolumeControl';
import { useAudio } from '@/hooks/audio';
import { isAudioSupported } from '@/utils/soundEffects';

export default function AudioControls() {
  const { volume, setVolume, isMuted, toggleMute, isAudioEnabled } = useAudio();

  if (!isAudioSupported()) {
    return (
      <Card className="w-full">
        <CardHeader className="">
          <CardTitle className="text-sm font-medium">Audio Controls</CardTitle>
        </CardHeader>
        <CardContent className="">
          <p className="text-sm text-muted-foreground">
            Audio is not supported in your browser.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="">
        <CardTitle className="text-sm font-medium">Audio Controls</CardTitle>
      </CardHeader>
      <CardContent className="">
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
}
