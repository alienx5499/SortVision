/**
 * Supported language metadata for SEO and hreflang.
 */

import {
  LANGUAGE_ALIASES,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from '@/config/i18n';

type LanguageSeoMeta = {
  name: string;
  nativeName: string;
  flag: string;
};

const languageMetadata: Record<SupportedLanguage, LanguageSeoMeta> = {
  en: { name: 'English', nativeName: 'English', flag: '🇺🇸' },
  es: { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  hi: { name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  fr: { name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  de: { name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  zh: { name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  bn: { name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
  ja: { name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
};

export const supportedLanguages: Record<string, LanguageSeoMeta> =
  SUPPORTED_LANGUAGES.reduce(
    (acc, lang) => {
      acc[lang] = languageMetadata[lang];
      return acc;
    },
    {} as Record<string, LanguageSeoMeta>
  );

Object.entries(LANGUAGE_ALIASES).forEach(([alias, canonical]) => {
  if (supportedLanguages[canonical]) {
    supportedLanguages[alias] = supportedLanguages[canonical];
  }
});
