// We intentionally allow indexing + caching for better search and AI visibility.
export const ROBOTS_DIRECTIVES =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
export const NON_CANONICAL_ROBOTS_DIRECTIVES =
  'noindex, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

export const SUPPORTED_LANGUAGES = [
  'en',
  'es',
  'hi',
  'fr',
  'de',
  'zh',
  'bn',
  'ja',
];

export const LANGUAGE_ALIASES = {
  jp: 'ja',
};

export const MAX_SEO_TITLE_LENGTH = 60;
export const MAX_SEO_DESCRIPTION_LENGTH = 155;
export const MAX_OG_DESCRIPTION_LENGTH = 220;
