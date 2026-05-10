import React from 'react';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';
import { Button } from './button';
import { Slider } from './slider';

export type VolumeControlProps = {
  volume?: number;
  onVolumeChange?: (value: number) => void;
  isMuted?: boolean;
  onMuteToggle?: () => void;
  className?: string;
};

const VolumeControl = ({
  volume = 1,
  onVolumeChange,
  isMuted = false,
  onMuteToggle,
  className = '',
}: VolumeControlProps) => {
  const handleVolumeChange = (value: number[]) => {
    onVolumeChange?.(value[0] ?? 0);
  };

  const renderVolumeIcon = () => {
    const iconClassName = `size-4 ${isMuted ? 'text-slate-400' : 'text-white'}`;

    if (isMuted || volume === 0) {
      return <VolumeX className={iconClassName} />;
    }
    if (volume < 0.5) {
      return <Volume1 className={iconClassName} />;
    }
    return <Volume2 className={iconClassName} />;
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={onMuteToggle}
        className="size-8 p-0 hover:bg-slate-700/50"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {renderVolumeIcon()}
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
