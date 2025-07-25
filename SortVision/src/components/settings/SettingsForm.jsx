import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sun, Moon, Monitor, Contrast, Check, Mic, MicOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAudio } from '@/hooks/useAudio';
import { getCurrentTheme, setTheme, themes } from '@/utils/themeUtils';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher';

const themeIconMap = {
  light: Sun,
  dark: Moon,
  contrast: Contrast,
  system: Monitor,
};

const themeIconColor = {
  light: 'text-yellow-300',
  dark: 'text-purple-400',
  contrast: 'text-emerald-400',
  system: 'text-blue-400',
};

const SettingsForm = ({ onClose: _onClose }) => {
  // Use the audio hook for consistent audio system
  const { isAudioEnabled, enableAudio, disableAudio, playCompleteSound } = useAudio();

  // Initialize audio state from localStorage on mount
  useEffect(() => {
    const savedSoundEnabled = localStorage.getItem('soundEnabled');
    if (savedSoundEnabled !== null) {
      const shouldEnable = JSON.parse(savedSoundEnabled);
      if (shouldEnable && !isAudioEnabled) {
        enableAudio();
      } else if (!shouldEnable && isAudioEnabled) {
        disableAudio();
      }
    }
  }, []); // Run only on mount

  const [isMicrophoneEnabled, setIsMicrophoneEnabled] = useState(() => {
    const saved = localStorage.getItem('microphoneEnabled');
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [microphonePermission, setMicrophonePermission] = useState(null);

  const [theme, setThemeState] = useState(() => getCurrentTheme());

  const { t } = useTranslation();

  // Handle theme changes
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setThemeState(newTheme);
  };

  // Check microphone permission on mount
  useEffect(() => {
    const checkMicrophonePermission = async () => {
      try {
        const result = await navigator.permissions.query({ name: 'microphone' });
        setMicrophonePermission(result.state);
        result.onchange = () => setMicrophonePermission(result.state);
      } catch (error) {
        console.error('Error checking microphone permission:', error);
        setMicrophonePermission('denied');
      }
    };
    checkMicrophonePermission();
  }, []);

  // Save audio enabled state to localStorage
  useEffect(() => {
    localStorage.setItem('soundEnabled', JSON.stringify(isAudioEnabled));
  }, [isAudioEnabled]);

  useEffect(() => {
    localStorage.setItem('microphoneEnabled', JSON.stringify(isMicrophoneEnabled));
  }, [isMicrophoneEnabled]);

  
  return (
    <div className="space-y-10">
      {/* Sound Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-mono text-emerald-400 mb-1">
          <span className="text-amber-400">$</span>
          <span>{t('settings.sound')}</span>
        </div>
        <div className="text-xs font-mono text-slate-500 mb-2">
          <span className="text-amber-400">//</span> {t('settings.sound_desc')}
        </div>
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: '0 4px 32px 0 rgba(168,85,247,0.10)' }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            if (isAudioEnabled) {
              disableAudio();
            } else {
              enableAudio();
              // Play a test sound when enabling
              setTimeout(() => {
                playCompleteSound();
              }, 200);
            }
          }}
          className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 backdrop-blur-md shadow-lg group relative overflow-hidden
            bg-slate-800/70
            ${isAudioEnabled
              ? 'border-[color:var(--color-purple-400)]/60 shadow-[0_2px_24px_0_rgba(168,85,247,0.10)]'
              : 'border-slate-700 hover:border-[color:var(--color-purple-400)]/40'}
          `}
          style={{
            boxShadow: isAudioEnabled ? '0 2px 24px 0 rgba(168,85,247,0.10)' : undefined,
          }}
        >
          <motion.div
            animate={{ rotate: isAudioEnabled ? 0 : -20, scale: isAudioEnabled ? 1.1 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`h-12 w-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-400/30 to-slate-800/60 shadow-inner transition-all duration-300
              ${isAudioEnabled ? 'text-[color:var(--color-purple-400)]' : 'text-slate-400'}`}
          >
            {isAudioEnabled ? <Volume2 className="h-6 w-6 animate-pulse" /> : <VolumeX className="h-6 w-6" />}
          </motion.div>
          <div className="flex-1 text-left">
            <div className={`text-base font-semibold font-mono transition-colors duration-200 ${isAudioEnabled ? 'text-[color:var(--color-purple-400)]' : 'text-white'}`}>{isAudioEnabled ? t('settings.sound_enabled') : t('settings.sound_disabled')}</div>
            <div className="text-xs text-slate-400 font-mono">{isAudioEnabled ? t('settings.sound_disable_hint') : t('settings.sound_enable_hint')}</div>
          </div>
          {isAudioEnabled && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-3 right-3 h-6 w-6 rounded-full bg-[color:var(--color-purple-400)]/20 flex items-center justify-center shadow-lg"
            >
              <Check className="h-4 w-4 text-[color:var(--color-purple-400)]" />
            </motion.div>
          )}
          {/* Glass shine effect */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-tr from-white/10 via-white/0 to-white/5 opacity-60" />
        </motion.button>
      </div>

      {/* Microphone Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-mono text-emerald-400 mb-1">
          <span className="text-amber-400">$</span>
          <span>{t('settings.voice')}</span>
        </div>
        <div className="text-xs font-mono text-slate-500 mb-2">
          <span className="text-amber-400">//</span> {t('settings.voice_desc')}
        </div>
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: '0 4px 32px 0 rgba(168,85,247,0.10)' }}
          whileTap={{ scale: 0.98 }}
          onClick={async () => {
            try {
              if (!isMicrophoneEnabled) {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                stream.getTracks().forEach(track => track.stop()); // Stop the stream after permission check
                setMicrophonePermission('granted');
                setIsMicrophoneEnabled(true);
              } else {
                setIsMicrophoneEnabled(false);
              }
            } catch (error) {
              console.error('Error accessing microphone:', error);
              setMicrophonePermission('denied');
            }
          }}
          className={`w-full flex items-center gap-4 p-4 sm:p-4 rounded-2xl border transition-all duration-300 backdrop-blur-md shadow-lg group relative overflow-hidden
            bg-slate-800/70
            ${isMicrophoneEnabled
              ? 'border-[color:var(--color-purple-400)]/60 shadow-[0_2px_24px_0_rgba(168,85,247,0.10)]'
              : 'border-slate-700 hover:border-[color:var(--color-purple-400)]/40'}
          `}
          style={{
            boxShadow: isMicrophoneEnabled ? '0 2px 24px 0 rgba(168,85,247,0.10)' : undefined,
          }}
        >
          <motion.div
            animate={{ rotate: isMicrophoneEnabled ? 0 : -20, scale: isMicrophoneEnabled ? 1.1 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-400/30 to-slate-800/60 shadow-inner transition-all duration-300
              ${isMicrophoneEnabled ? 'text-[color:var(--color-purple-400)]' : 'text-slate-400'}`}
          >
            {isMicrophoneEnabled ? <Mic className="h-5 w-5 sm:h-6 sm:w-6 animate-pulse" /> : <MicOff className="h-5 w-5 sm:h-6 sm:w-6" />}
          </motion.div>
          <div className="flex-1 text-left">
            <div className={`text-sm sm:text-base font-semibold font-mono transition-colors duration-200 ${isMicrophoneEnabled ? 'text-[color:var(--color-purple-400)]' : 'text-white'}`}> 
            {isMicrophoneEnabled ? t('settings.voice_enabled') : t('settings.voice_disabled')}
            </div>
            <div className="text-xs sm:text-sm text-slate-400 font-mono">
            {microphonePermission === 'denied' 
            ? t('settings.voice_denied')
            : (isMicrophoneEnabled ? t('settings.voice_disable_hint') : t('settings.voice_enable_hint'))}
            </div>
          </div>
          {isMicrophoneEnabled && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-2 sm:top-3 right-2 sm:right-3 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-[color:var(--color-purple-400)]/20 flex items-center justify-center shadow-lg"
            >
              <Check className="h-3 w-3 sm:h-4 sm:w-4 text-[color:var(--color-purple-400)]" />
            </motion.div>
          )}
          {microphonePermission === 'denied' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-2 sm:top-3 right-2 sm:right-3 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-red-500/20 flex items-center justify-center shadow-lg"
            >
              <span className="h-3 w-3 sm:h-4 sm:w-4 text-red-500">!</span>
            </motion.div>
          )}
          {/* Glass shine effect */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-tr from-white/10 via-white/0 to-white/5 opacity-60" />
        </motion.button>
      </div>

      {/* Theme Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-mono text-purple-400 mb-1">
          <span className="text-amber-400">$</span>
          <span>{t('settings.theme')}</span>
        </div>
        <div className="text-xs font-mono text-slate-500 mb-2">
          <span className="text-amber-400">//</span> {t('settings.theme_desc')}
        </div>
        <div className="grid grid-cols-2 gap-5">
          {themes.map((themeOption) => {
            const Icon = themeIconMap[themeOption.id];
            const iconColor = themeIconColor[themeOption.id];
            return (
              <motion.button
                key={themeOption.id}
                whileHover={{ scale: 1.04, boxShadow: '0 4px 32px 0 rgba(168,85,247,0.10)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleThemeChange(themeOption.id)}
                className={`relative flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 backdrop-blur-md shadow-md overflow-hidden
                  bg-slate-800/70
                  ${theme === themeOption.id
                    ? 'border-[color:var(--color-purple-400)]/60 shadow-[0_2px_24px_0_rgba(168,85,247,0.10)]'
                    : 'border-slate-700 hover:border-[color:var(--color-purple-400)]/40'}
                `}
                style={{
                  boxShadow: theme === themeOption.id ? '0 2px 24px 0 rgba(168,85,247,0.10)' : undefined,
                }}
              >
                <motion.span
                  className={`text-xl ${iconColor}`}
                  animate={{ rotate: theme === themeOption.id ? -20 : 0, scale: theme === themeOption.id ? 1.1 : 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Icon className="h-7 w-7" />
                </motion.span>
                <span className={`text-base font-mono font-semibold transition-colors duration-200 ${theme === themeOption.id ? 'text-[color:var(--color-purple-400)]' : 'text-white'}`}>{themeOption.name}</span>
                {theme === themeOption.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 h-6 w-6 rounded-full bg-[color:var(--color-purple-400)]/20 flex items-center justify-center shadow-lg"
                  >
                    <Check className="h-4 w-4 text-[color:var(--color-purple-400)]" />
                  </motion.div>
                )}
                {/* Glass shine effect */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-tr from-white/10 via-white/0 to-white/5 opacity-60" />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Language Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-mono text-purple-400 mb-1">
          <span className="text-amber-400">$</span>
          <span>{t('settings.language')}</span>
        </div>
        <div className="text-xs font-mono text-slate-500 mb-2">
          <span className="text-amber-400">//</span> {t('settings.language_desc')}
        </div>
        <LanguageSwitcher />
      </div>
    </div>
  );
};

export default SettingsForm;