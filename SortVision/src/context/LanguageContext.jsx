import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../locales';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Check URL first for language
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const supportedLanguages = [
        'en',
        'es',
        'hi',
        'fr',
        'de',
        'zh',
        'bn',
        'ja',
        'jp',
      ];

      // Check if first segment is a language code
      const pathSegments = path.split('/').filter(Boolean);
      if (
        pathSegments.length > 0 &&
        supportedLanguages.includes(pathSegments[0])
      ) {
        return pathSegments[0];
      }

      // Check URL search params as fallback
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get('lang');
      if (langParam && supportedLanguages.includes(langParam)) {
        return langParam;
      }
    }

    // Check localStorage
    const saved = localStorage.getItem('language');
    if (saved) return saved;

    // Auto-detect language from browser
    const browserLang = navigator.language || navigator.languages?.[0] || 'en';

    // Map browser languages to supported languages
    if (browserLang.startsWith('es')) return 'es';
    if (browserLang.startsWith('hi')) return 'hi';
    if (browserLang.startsWith('fr')) return 'fr';
    if (browserLang.startsWith('de')) return 'de';
    if (browserLang.startsWith('zh')) return 'zh';
    if (browserLang.startsWith('bn')) return 'bn';
    if (browserLang.startsWith('ja') || browserLang.startsWith('jp'))
      return 'ja';
    if (browserLang.startsWith('en')) return 'en';

    // Default to English for unsupported languages
    return 'en';
  });

  const [currentTranslations, setCurrentTranslations] = useState(
    translations[language]
  );

  useEffect(() => {
    setCurrentTranslations(translations[language]);
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key, params = {}) => {
    const keys = key.split('.');
    let value = currentTranslations;

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(
          `Translation key "${key}" not found for language "${language}"`
        );
        return key;
      }
    }

    // Handle interpolation
    if (typeof value === 'string' && Object.keys(params).length > 0) {
      return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey] !== undefined ? params[paramKey] : match;
      });
    }

    return value;
  };

  const changeLanguage = newLanguage => {
    setLanguage(newLanguage);

    // Update URL to reflect language change
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const currentSearch = window.location.search;

      // Remove existing language from path if present
      let newPath = currentPath;
      const supportedLanguages = [
        'en',
        'es',
        'hi',
        'fr',
        'de',
        'zh',
        'bn',
        'ja',
        'jp',
      ];

      // Check if first segment is a language code and remove it
      const pathSegments = currentPath.split('/').filter(Boolean);
      if (
        pathSegments.length > 0 &&
        supportedLanguages.includes(pathSegments[0])
      ) {
        // Remove the language segment and reconstruct path
        pathSegments.shift();
        newPath = '/' + pathSegments.join('/');
      }

      // Ensure path starts with /
      if (!newPath.startsWith('/')) {
        newPath = '/' + newPath;
      }

      // Add new language to path (except for English)
      if (newLanguage !== 'en') {
        newPath = `/${newLanguage}${newPath}`;
      }

      // Update URL without page reload
      const newUrl = `${newPath}${currentSearch}`;
      window.history.pushState({}, '', newUrl);
    }
  };

  // Utility function to generate localized URLs
  const getLocalizedUrl = path => {
    if (typeof window === 'undefined') return path;

    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    // Add language prefix for non-English languages
    if (language !== 'en') {
      return `/${language}/${cleanPath}`;
    }

    return `/${cleanPath}`;
  };

  const value = {
    language,
    changeLanguage,
    t,
    translations: currentTranslations,
    getLocalizedUrl,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
