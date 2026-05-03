import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/locales';
import {
  DEFAULT_LANGUAGE,
  normalizeLanguage,
  stripLanguagePrefix,
} from '@/config/i18n';
import type {
  TranslationKey,
  TranslationParams,
} from '@/config/translationKey';

type TranslationLeaf = string;
interface TranslationBranch {
  [key: string]: TranslationNode;
}
type TranslationNode = TranslationLeaf | TranslationBranch;
type TranslationTree = TranslationBranch;

type LanguageContextValue = {
  language: string;
  changeLanguage: (newLanguage: string) => void;
  t: (key: TranslationKey, params?: TranslationParams) => string;
  translations: TranslationTree;
  getLocalizedUrl: (path: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const resolveInitialLanguage = () => {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const fromPath = stripLanguagePrefix(pathParts).language;
  if (fromPath) return fromPath;

  const urlParams = new URLSearchParams(window.location.search);
  const langParam = normalizeLanguage(urlParams.get('lang'));
  if (langParam) return langParam;

  const saved = normalizeLanguage(localStorage.getItem('language'));
  if (saved) return saved;

  const browserLang = navigator.language || navigator.languages?.[0] || 'en';
  return normalizeLanguage(browserLang.split('-')[0]) || DEFAULT_LANGUAGE;
};

const stripKnownLanguagePrefix = (path: string) => {
  const pathSegments = path.split('/').filter(Boolean);
  const { parts } = stripLanguagePrefix(pathSegments);
  return `/${parts.join('/')}`.replace(/\/+$/, '') || '/';
};

function resolveTranslationValue(
  tree: TranslationTree,
  key: string
): TranslationNode | undefined {
  const keys = key.split('.');
  let value: TranslationNode | undefined = tree;

  for (const k of keys) {
    if (!value || typeof value === 'string') {
      return undefined;
    }
    value = value[k];
  }

  return value;
}

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState(resolveInitialLanguage);

  const typedTranslations = translations as Record<string, TranslationTree>;
  const currentTranslations =
    typedTranslations[language] || typedTranslations[DEFAULT_LANGUAGE];

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: TranslationKey, params: TranslationParams = {}) => {
    const value = resolveTranslationValue(currentTranslations, key);

    if (value === undefined) {
      console.warn(
        `Translation key "${key}" not found for language "${language}"`
      );
      return key;
    }

    if (typeof value === 'string' && Object.keys(params).length > 0) {
      return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey] !== undefined
          ? String(params[paramKey])
          : match;
      });
    }

    return typeof value === 'string' ? value : key;
  };

  const changeLanguage = (newLanguage: string) => {
    const normalizedLanguage =
      normalizeLanguage(newLanguage) || DEFAULT_LANGUAGE;
    setLanguage(normalizedLanguage);

    if (typeof window !== 'undefined') {
      const currentPath = stripKnownLanguagePrefix(window.location.pathname);
      const currentSearch = window.location.search;
      let newPath = currentPath;
      if (normalizedLanguage !== DEFAULT_LANGUAGE) {
        newPath = `/${normalizedLanguage}${currentPath}`;
      }

      const newUrl = `${newPath}${currentSearch}`;
      window.history.pushState({}, '', newUrl);
    }
  };

  const getLocalizedUrl = (path: string) => {
    if (typeof window === 'undefined') return path;

    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    if (language !== DEFAULT_LANGUAGE) {
      return `/${language}/${cleanPath}`;
    }

    return `/${cleanPath}`;
  };

  const value: LanguageContextValue = {
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

export { LanguageContext };
