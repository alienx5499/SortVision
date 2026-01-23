import React from 'react';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';
import { Button } from './button';
import { Slider } from './slider';

/**
 * Get the appropriate volume icon based on volume level
 */
const getVolumeIcon = (isMuted, volume) => {
  if (isMuted || volume === 0) {
    return VolumeX;
  } else if (volume < 0.5) {
    return Volume1;
  } else {
    return Volume2;
  }
};

/**
 * VolumeControl Component
 * Provides volume slider and mute toggle
 */
const VolumeControl = ({
  volume = 1,
  onVolumeChange,
  isMuted = false,
  onMuteToggle,
  className = '',
}) => {
  const handleVolumeChange = value => {
    if (onVolumeChange) {
      onVolumeChange(value[0]);
    }
  };

  const VolumeIcon = getVolumeIcon(isMuted, volume);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={onMuteToggle}
        className="h-8 w-8 p-0 hover:bg-slate-700/50"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        <VolumeIcon
          className={`h-4 w-4 ${isMuted ? 'text-slate-400' : 'text-white'}`}
        />
      </Button>

      <div className="flex-1 min-w-[80px]">
        <Slider
          value={[isMuted ? 0 : volume]}
          onValueChange={handleVolumeChange}
          max={1}
          min={0}
          step={0.01}
          className="w-full"
          disabled={isMuted}
        />
      </div>

      <span className="text-xs text-slate-400 min-w-[32px] text-right">
        {Math.round((isMuted ? 0 : volume) * 100)}%
      </span>
    </div>
  );
};

export default VolumeControl;
