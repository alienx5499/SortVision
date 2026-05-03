/**
 * Application-wide policy: locales, URLs, routing segments, translation typing.
 * Prefer `@/config` when importing multiple symbols; single-domain imports
 * (`@/config/i18n`, etc.) remain valid and tree-shake cleanly.
 */

export {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  LANGUAGE_ALIASES,
  SUPPORTED_LANGUAGE_SET,
  normalizeLanguage,
  isSupportedLanguage,
  isDefaultLanguage,
  stripLanguagePrefix,
  type SupportedLanguage,
} from './i18n';

export {
  BASE_URL,
  getBaseUrl,
  normalizeCanonicalPath,
  getCanonicalAlgorithmDetailsPath,
  buildCanonicalUrl,
} from './canonical';

export {
  ALGORITHM_TABS,
  CONTRIBUTION_SECTIONS,
  CONTRIBUTION_BASE_PATH,
  ALGORITHMS_BASE_PATH,
  DETAIL_CODE_DEFAULT_TAB,
  TAB_TO_INTERNAL,
  INTERNAL_TO_TAB,
  isAlgorithmTab,
  isContributionSection,
  resolveContributionSectionFromTab,
  toPathParts,
  getAlgorithmPath,
  getContributionPath,
  type AlgorithmTab,
  type ContributionSection,
} from './routes';

export type { TranslationKey, TranslationParams } from './translationKey';
