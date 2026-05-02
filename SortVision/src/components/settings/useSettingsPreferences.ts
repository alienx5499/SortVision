import { useEffect, useMemo, useRef, useState } from 'react';
import { useAudio } from '@/hooks/useAudio';
import { getCurrentTheme, setTheme } from '@/utils/themeUtils';
import { useLanguage } from '@/context/LanguageContext';

const LANGUAGE_OPTIONS = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'es', name: 'Español' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ja', name: '日本語' },
];

type MicrophonePermissionState = 'granted' | 'denied' | 'prompt' | null;

export type LanguageOption = (typeof LANGUAGE_OPTIONS)[number];

export type SettingsPreferences = {
  t: (key: string, params?: Record<string, string | number>) => string;
  language: string;
  changeLanguage: (code: string) => void;
  isAudioEnabled: boolean;
  toggleAudio: () => void;
  isMicrophoneEnabled: boolean;
  toggleMicrophone: () => Promise<void>;
  microphonePermission: MicrophonePermissionState;
  theme: string;
  handleThemeChange: (newTheme: string) => void;
  languages: LanguageOption[];
};

export const useSettingsPreferences = () => {
  const { language, changeLanguage, t } = useLanguage();
  const { isAudioEnabled, enableAudio, disableAudio, playCompleteSound } =
    useAudio();
  const [theme, setThemeState] = useState(() => getCurrentTheme());
  const [isMicrophoneEnabled, setIsMicrophoneEnabled] = useState(() => {
    const saved = localStorage.getItem('microphoneEnabled');
    return saved !== null ? JSON.parse(saved) : false;
  });
  const [microphonePermission, setMicrophonePermission] =
    useState<MicrophonePermissionState>(null);

  const isAudioEnabledRef = useRef(isAudioEnabled);
  const enableAudioRef = useRef(enableAudio);
  const disableAudioRef = useRef(disableAudio);
  isAudioEnabledRef.current = isAudioEnabled;
  enableAudioRef.current = enableAudio;
  disableAudioRef.current = disableAudio;

  useEffect(() => {
    const savedSoundEnabled = localStorage.getItem('soundEnabled');
    if (savedSoundEnabled === null) return;
    const shouldEnable = JSON.parse(savedSoundEnabled) as boolean;
    if (shouldEnable && !isAudioEnabledRef.current) {
      enableAudioRef.current();
    }
    if (!shouldEnable && isAudioEnabledRef.current) {
      disableAudioRef.current();
    }
  }, []);

  useEffect(() => {
    const checkMicrophonePermission = async () => {
      try {
        const result = await navigator.permissions.query({
          name: 'microphone',
        });
        setMicrophonePermission(result.state);
        result.onchange = () => setMicrophonePermission(result.state);
      } catch {
        setMicrophonePermission('denied');
      }
    };
    checkMicrophonePermission();
  }, []);

  useEffect(() => {
    localStorage.setItem('soundEnabled', JSON.stringify(isAudioEnabled));
  }, [isAudioEnabled]);

  useEffect(() => {
    localStorage.setItem(
      'microphoneEnabled',
      JSON.stringify(isMicrophoneEnabled)
    );
  }, [isMicrophoneEnabled]);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    setThemeState(newTheme);
  };

  const toggleAudio = () => {
    if (isAudioEnabled) {
      disableAudio();
      return;
    }
    enableAudio();
    setTimeout(() => {
      playCompleteSound();
    }, 200);
  };

  const toggleMicrophone = async () => {
    try {
      if (!isMicrophoneEnabled) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        stream.getTracks().forEach(track => track.stop());
        setMicrophonePermission('granted');
        setIsMicrophoneEnabled(true);
      } else {
        setIsMicrophoneEnabled(false);
      }
    } catch {
      setMicrophonePermission('denied');
    }
  };

  return {
    t,
    language,
    changeLanguage,
    isAudioEnabled,
    toggleAudio,
    isMicrophoneEnabled,
    toggleMicrophone,
    microphonePermission,
    theme,
    handleThemeChange,
    languages: useMemo(() => LANGUAGE_OPTIONS, []),
  } satisfies SettingsPreferences;
};
