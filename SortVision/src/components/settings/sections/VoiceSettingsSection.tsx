import React from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Check } from 'lucide-react';
import { SettingsSectionHeader } from './SettingsSectionHeader';

type VoiceSettingsSectionProps = {
  title: string;
  description: string;
  isMicrophoneEnabled: boolean;
  microphonePermission: 'granted' | 'denied' | 'prompt' | null;
  onToggleMicrophone: () => Promise<void>;
  enabledLabel: string;
  disabledLabel: string;
  enableDescription: string;
  disableDescription: string;
  deniedDescription: string;
};

export const VoiceSettingsSection = ({
  title,
  description,
  isMicrophoneEnabled,
  microphonePermission,
  onToggleMicrophone,
  enabledLabel,
  disabledLabel,
  enableDescription,
  disableDescription,
  deniedDescription,
}: VoiceSettingsSectionProps) => (
  <div className="space-y-4">
    <SettingsSectionHeader title={title} description={description} />
    <motion.button
      whileHover={{
        scale: 1.03,
        boxShadow: '0 4px 32px 0 rgba(168,85,247,0.10)',
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onToggleMicrophone}
      className={`w-full flex items-center gap-4 p-4 sm:p-4 rounded-2xl border transition-all duration-300 backdrop-blur-md shadow-lg group relative overflow-hidden bg-slate-800/70 ${
        isMicrophoneEnabled
          ? 'border-[color:var(--color-purple-400)]/60 shadow-[0_2px_24px_0_rgba(168,85,247,0.10)]'
          : 'border-slate-700 hover:border-[color:var(--color-purple-400)]/40'
      }`}
      style={{
        boxShadow: isMicrophoneEnabled
          ? '0 2px 24px 0 rgba(168,85,247,0.10)'
          : undefined,
      }}
    >
      <motion.div
        animate={{
          rotate: isMicrophoneEnabled ? 0 : -20,
          scale: isMicrophoneEnabled ? 1.1 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`size-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-400/30 to-slate-800/60 shadow-inner transition-all duration-300 ${
          isMicrophoneEnabled
            ? 'text-[color:var(--color-purple-400)]'
            : 'text-slate-400'
        }`}
      >
        {isMicrophoneEnabled ? (
          <Mic className="size-5 sm:h-6 sm:w-6 animate-pulse" />
        ) : (
          <MicOff className="size-5 sm:h-6 sm:w-6" />
        )}
      </motion.div>
      <div className="flex-1 text-left">
        <div
          className={`text-sm sm:text-base font-semibold font-mono transition-colors duration-200 ${
            isMicrophoneEnabled
              ? 'text-[color:var(--color-purple-400)]'
              : 'text-white'
          }`}
        >
          {isMicrophoneEnabled ? enabledLabel : disabledLabel}
        </div>
        <div className="text-xs sm:text-sm text-slate-400 font-mono">
          {microphonePermission === 'denied'
            ? deniedDescription
            : isMicrophoneEnabled
              ? disableDescription
              : enableDescription}
        </div>
      </div>
      {isMicrophoneEnabled && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 sm:top-3 right-2 sm:right-3 size-5 sm:h-6 sm:w-6 rounded-full bg-[color:var(--color-purple-400)]/20 flex items-center justify-center shadow-lg"
        >
          <Check className="size-3 sm:h-4 sm:w-4 text-[color:var(--color-purple-400)]" />
        </motion.div>
      )}
      {microphonePermission === 'denied' && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 sm:top-3 right-2 sm:right-3 size-5 sm:h-6 sm:w-6 rounded-full bg-red-500/20 flex items-center justify-center shadow-lg"
        >
          <span className="size-3 sm:h-4 sm:w-4 text-red-500">!</span>
        </motion.div>
      )}
      <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-tr from-white/10 via-white/0 to-white/5 opacity-60" />
    </motion.button>
  </div>
);
