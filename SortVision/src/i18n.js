'use client';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en/translation.json';
import es from './locales/es/translation.json';

// Define your resources for each supported language
const resources = {
  en: { translation: en },
  es: { translation: es }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
    },
    react: {
      useSuspense: false, // Prevents unnecessary loading fallback
    }
  });

// Optional: Automatic RTL handling based on language
i18n.on('languageChanged', (lng) => {
  const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
  document.documentElement.dir = rtlLanguages.includes(lng) ? 'rtl' : 'ltr';
});

export default i18n;
