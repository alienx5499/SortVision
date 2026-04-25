/**
 * SEO constants barrel.
 *
 * Keeps previous import path stable while constants live in focused modules.
 */

export {
  seoTranslations,
  getLocalizedContent,
} from './constantsParts/translations';
export { supportedLanguages } from './constantsParts/languages';
export { algorithms } from './constantsParts/algorithms';
export { globalKeywords } from './constantsParts/keywords';
