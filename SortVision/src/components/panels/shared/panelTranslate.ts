/**
 * Matches `useLanguage().t` — single contract for panel modules that accept i18n.
 */
export type PanelTranslate = (
  key: string,
  params?: Record<string, string | number>
) => string;
