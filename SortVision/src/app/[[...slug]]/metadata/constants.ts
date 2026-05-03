import { BASE_URL } from '@/config/canonical';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '@/config/i18n';
import { ALGORITHM_TABS, CONTRIBUTION_SECTIONS } from '@/config/routes';

export const OG_LOCALE_MAP = {
  en: 'en_US',
  es: 'es_ES',
  hi: 'hi_IN',
  fr: 'fr_FR',
  de: 'de_DE',
  zh: 'zh_CN',
  bn: 'bn_BD',
  ja: 'ja_JP',
};

export const HREFLANG_REGION_ALIASES = {
  en: ['en-US', 'en-GB', 'en-IN'],
  es: ['es-ES', 'es-MX', 'es-AR'],
  hi: ['hi-IN'],
  fr: ['fr-FR', 'fr-CA'],
  de: ['de-DE', 'de-AT'],
  zh: ['zh-CN', 'zh-TW', 'zh-HK'],
  bn: ['bn-BD', 'bn-IN'],
  ja: ['ja-JP'],
};

export { BASE_URL, SUPPORTED_LANGUAGES, ALGORITHM_TABS, CONTRIBUTION_SECTIONS };
export { DEFAULT_LANGUAGE };

export const COMMON_CONTRIBUTORS = [
  'alienx5499',
  'dependabot[bot]',
  'github-actions[bot]',
];
