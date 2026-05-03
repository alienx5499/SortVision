import { getCanonicalAlgorithmDetailsPath } from '../../../../config/canonical.ts';

export const SUPPORTED_CODE_LANGUAGES = new Set([
  'pseudocode',
  'python',
  'javascript',
  'java',
  'typescript',
  'cpp',
  'c',
  'csharp',
  'php',
  'golang',
  'swift',
  'kotlin',
  'rust',
  'ruby',
  'scala',
  'dart',
  'r',
  'lua',
  'haskell',
  'julia',
]);

export const DEFAULT_CODE_LANGUAGE = 'pseudocode';

export const resolveCodeLanguageFromSearch = (search: string): string => {
  const params = new URLSearchParams(search || '');
  const lang = params.get('lang');
  if (lang && SUPPORTED_CODE_LANGUAGES.has(lang)) {
    return lang;
  }
  return DEFAULT_CODE_LANGUAGE;
};

export const buildSearchWithLanguage = (
  search: string,
  language: string
): string => {
  const params = new URLSearchParams(search || '');
  const nextLanguage = SUPPORTED_CODE_LANGUAGES.has(language)
    ? language
    : DEFAULT_CODE_LANGUAGE;
  params.set('lang', nextLanguage);
  return `?${params.toString()}`;
};

export const getCanonicalAlgorithmPath = (
  pathname: string,
  algorithm: string
): string => {
  return getCanonicalAlgorithmDetailsPath(pathname, algorithm);
};
