export const DEFAULT_LANGUAGE = 'en';

export const SUPPORTED_LANGUAGES = [
  'en',
  'es',
  'hi',
  'fr',
  'de',
  'zh',
  'bn',
  'ja',
] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

/** Non-standard codes that should resolve to a supported language. */
export const LANGUAGE_ALIASES: Record<string, SupportedLanguage> = {
  jp: 'ja',
};

export const SUPPORTED_LANGUAGE_SET = new Set<string>(SUPPORTED_LANGUAGES);

export const normalizeLanguage = (
  language: unknown
): SupportedLanguage | null => {
  if (!language) return null;
  const normalized = String(language).toLowerCase();
  const resolved = LANGUAGE_ALIASES[normalized] ?? normalized;
  return SUPPORTED_LANGUAGE_SET.has(resolved)
    ? (resolved as SupportedLanguage)
    : null;
};

export const isSupportedLanguage = (language: unknown) =>
  normalizeLanguage(language) !== null;

export const isDefaultLanguage = (language: unknown) =>
  normalizeLanguage(language) === DEFAULT_LANGUAGE;

export const stripLanguagePrefix = (
  pathParts: string[]
): { language: SupportedLanguage; parts: string[] } => {
  if (!Array.isArray(pathParts) || pathParts.length === 0) {
    return { language: DEFAULT_LANGUAGE, parts: [] };
  }

  const maybeLanguage = normalizeLanguage(pathParts[0]);
  if (maybeLanguage) {
    return { language: maybeLanguage, parts: pathParts.slice(1) };
  }

  return { language: DEFAULT_LANGUAGE, parts: pathParts };
};
