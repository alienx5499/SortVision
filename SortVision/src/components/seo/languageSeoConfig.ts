export type LanguageSeoEntry = {
  name: string;
  nativeName: string;
  flag: string;
  locale: string;
  hreflang: string;
};

export const LANGUAGE_SEO_BY_CODE: Record<string, LanguageSeoEntry> = {
  en: {
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    locale: 'en_US',
    hreflang: 'en',
  },
  es: {
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    locale: 'es_ES',
    hreflang: 'es',
  },
  hi: {
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    locale: 'hi_IN',
    hreflang: 'hi',
  },
  fr: {
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    locale: 'fr_FR',
    hreflang: 'fr',
  },
  de: {
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    locale: 'de_DE',
    hreflang: 'de',
  },
  zh: {
    name: 'Chinese',
    nativeName: '中文',
    flag: '🇨🇳',
    locale: 'zh_CN',
    hreflang: 'zh',
  },
};
