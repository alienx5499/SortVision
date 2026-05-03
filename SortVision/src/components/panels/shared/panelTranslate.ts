import type {
  TranslationKey,
  TranslationParams,
} from '@/config/translationKey';

/**
 * Matches `useLanguage().t` — single contract for panel modules that accept i18n.
 */
export type PanelTranslate = (
  key: TranslationKey,
  params?: TranslationParams
) => string;
