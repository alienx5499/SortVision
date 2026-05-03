import type enCatalog from '@/locales/catalogs/en';
import type { MessageLeafPath } from '@/types/messageLeafPaths';

/** Placeholder values for `{name}` segments in message strings. */
export type TranslationParams = Record<string, string | number>;

/** Every leaf message path in the English catalog; other locales must mirror these keys. */
export type TranslationKey = MessageLeafPath<typeof enCatalog>;
