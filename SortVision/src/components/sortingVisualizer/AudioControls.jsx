import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VolumeControl from '../ui/VolumeControl';
import { useAudio } from '@/hooks/useAudio';
import { isAudioSupported } from '@/utils/soundEffects';
import { useTranslation } from 'react-i18next';

/**
 * AudioControls Component
 * Provides audio control panel for the sorting visualizer
 */
const AudioControls = () => {
  const { t } = useTranslation();
  const {
    volume,
    setVolume,
    isMuted,
    toggleMute,
    isAudioEnabled
  } = useAudio();

  if (!isAudioSupported()) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-sm font-medium">{t('audio.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {t('audio.notSupported')}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-sm font-medium">{t('audio.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{t('audio.volume')}</span>
            <VolumeControl
              volume={volume}
              onVolumeChange={setVolume}
              isMuted={isMuted}
              onMuteToggle={toggleMute}
            />
          </div>
          {!isAudioEnabled && (
            <p className="text-sm text-yellow-500">
              {t('audio.enable')}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioControls; 