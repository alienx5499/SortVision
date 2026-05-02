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

export const resolveCodeLanguageFromSearch = search => {
  const params = new URLSearchParams(search || '');
  const lang = params.get('lang');
  if (lang && SUPPORTED_CODE_LANGUAGES.has(lang)) {
    return lang;
  }
  return DEFAULT_CODE_LANGUAGE;
};

export const buildSearchWithLanguage = (search, language) => {
  const params = new URLSearchParams(search || '');
  const nextLanguage = SUPPORTED_CODE_LANGUAGES.has(language)
    ? language
    : DEFAULT_CODE_LANGUAGE;
  params.set('lang', nextLanguage);
  return `?${params.toString()}`;
};

export const getCanonicalAlgorithmPath = (pathname, algorithm) => {
  const fallback = `/algorithms/details/${algorithm}`;
  const safePath = pathname || '';
  const parts = safePath.split('/').filter(Boolean);
  const knownSections = new Set(['config', 'details', 'metrics']);
  const supportedLocales = new Set([
    'en',
    'es',
    'hi',
    'fr',
    'de',
    'zh',
    'bn',
    'ja',
  ]);

  const hasLocalePrefix = parts.length > 0 && supportedLocales.has(parts[0]);
  const offset = hasLocalePrefix ? 1 : 0;

  if (parts[offset] === 'algorithms' && knownSections.has(parts[offset + 1])) {
    const localePrefix = hasLocalePrefix ? `/${parts[0]}` : '';
    return `${localePrefix}/algorithms/details/${algorithm}`;
  }

  return fallback;
};
