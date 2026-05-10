import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Check } from 'lucide-react';
import { SettingsSectionHeader } from './SettingsSectionHeader';

type AudioSettingsSectionProps = {
  title: string;
  description: string;
  isAudioEnabled: boolean;
  onToggleAudio: () => void;
  enabledLabel: string;
  disabledLabel: string;
  enableDescription: string;
  disableDescription: string;
};

export const AudioSettingsSection = ({
  title,
  description,
  isAudioEnabled,
  onToggleAudio,
  enabledLabel,
  disabledLabel,
  enableDescription,
  disableDescription,
}: AudioSettingsSectionProps) => (
  <div className="space-y-4">
    <SettingsSectionHeader title={title} description={description} />
    <motion.button
      whileHover={{
        scale: 1.03,
        boxShadow: '0 4px 32px 0 rgba(168,85,247,0.10)',
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onToggleAudio}
      className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 backdrop-blur-md shadow-lg group relative overflow-hidden bg-slate-800/70 ${
        isAudioEnabled
          ? 'border-[color:var(--color-purple-400)]/60 shadow-[0_2px_24px_0_rgba(168,85,247,0.10)]'
          : 'border-slate-700 hover:border-[color:var(--color-purple-400)]/40'
      }`}
      style={{
        boxShadow: isAudioEnabled
          ? '0 2px 24px 0 rgba(168,85,247,0.10)'
          : undefined,
      }}
    >
      <motion.div
        animate={{
          rotate: isAudioEnabled ? 0 : -20,
          scale: isAudioEnabled ? 1.1 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`size-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-400/30 to-slate-800/60 shadow-inner transition-all duration-300 ${
          isAudioEnabled
            ? 'text-[color:var(--color-purple-400)]'
            : 'text-slate-400'
        }`}
      >
        {isAudioEnabled ? (
          <Volume2 className="size-6 animate-pulse" />
        ) : (
          <VolumeX className="size-6" />
        )}
      </motion.div>
      <div className="flex-1 text-left">
        <div
          className={`text-base font-semibold font-mono transition-colors duration-200 ${
            isAudioEnabled
              ? 'text-[color:var(--color-purple-400)]'
              : 'text-white'
          }`}
        >
          {isAudioEnabled ? enabledLabel : disabledLabel}
        </div>
        <div className="text-xs text-slate-400 font-mono">
          {isAudioEnabled ? disableDescription : enableDescription}
        </div>
      </div>
      {isAudioEnabled && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 size-6 rounded-full bg-[color:var(--color-purple-400)]/20 flex items-center justify-center shadow-lg"
        >
          <Check className="size-4 text-[color:var(--color-purple-400)]" />
        </motion.div>
      )}
      <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-tr from-white/10 via-white/0 to-white/5 opacity-60" />
    </motion.button>
  </div>
);
