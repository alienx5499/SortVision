/**
 * Legacy barrel: language SEO helpers and enhancement component.
 * Prefer importing from ./languageSeoConfig, ./languageSeoPaths, etc.
 */
export { LANGUAGE_SEO_BY_CODE as SUPPORTED_LANGUAGES } from './languageSeoConfig';
export {
  detectLanguageFromPath,
  generateHreflangLinks,
  getLanguageLocale,
  stripLangPrefixFromPathname,
  canonicalUrlForLanguage,
} from './languageSeoPaths';
export {
  generateLanguageStructuredData,
  xDefaultHrefFromCanonical,
} from './languageStructuredData';
export { useLanguageDetection } from './useLanguageDetection';
export { SEOEnhancement } from './SEOEnhancement';
export { default } from './SEOEnhancement';
