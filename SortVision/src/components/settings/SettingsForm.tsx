import React from 'react';
import { useSettingsPreferences } from './useSettingsPreferences';
import { AudioSettingsSection } from './sections/AudioSettingsSection';
import { VoiceSettingsSection } from './sections/VoiceSettingsSection';
import { ThemeSettingsSection } from './sections/ThemeSettingsSection';
import { LanguageSettingsSection } from './sections/LanguageSettingsSection';

export type SettingsFormProps = {
  onClose?: () => void;
};

const SettingsForm = ({ onClose: _onClose }: SettingsFormProps) => {
  const {
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
    languages,
  } = useSettingsPreferences();

  return (
    <div className="space-y-10">
      <AudioSettingsSection
        title={t('settings.sound.title')}
        description={t('settings.sound.description')}
        isAudioEnabled={isAudioEnabled}
        onToggleAudio={toggleAudio}
        enabledLabel={t('settings.sound.enabled')}
        disabledLabel={t('settings.sound.disabled')}
        enableDescription={t('settings.sound.enableDescription')}
        disableDescription={t('settings.sound.disableDescription')}
      />

      <VoiceSettingsSection
        title={t('settings.voiceControl.title')}
        description={t('settings.voiceControl.description')}
        isMicrophoneEnabled={isMicrophoneEnabled}
        microphonePermission={microphonePermission}
        onToggleMicrophone={toggleMicrophone}
        enabledLabel={t('settings.voiceControl.enabled')}
        disabledLabel={t('settings.voiceControl.disabled')}
        enableDescription={t('settings.voiceControl.enableDescription')}
        disableDescription={t('settings.voiceControl.disableDescription')}
        deniedDescription={t('settings.voiceControl.denied')}
      />

      <ThemeSettingsSection
        title={t('settings.theme.title')}
        description={t('settings.theme.description')}
        theme={theme}
        onChangeTheme={handleThemeChange}
      />

      <LanguageSettingsSection
        title={t('settings.language.title')}
        description={t('settings.language.description')}
        language={language}
        languages={languages}
        onChangeLanguage={changeLanguage}
      />
    </div>
  );
};

export default SettingsForm;
