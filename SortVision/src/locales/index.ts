/**
 * Message catalogs by locale code. Canonical structure is `catalogs/en.ts` (`as const`);
 * other locales mirror the same leaf keys (see `tests/unit/i18n/locale-parity.test.ts`).
 */
import en from './catalogs/en.ts';
import es from './catalogs/es.ts';
import fr from './catalogs/fr.ts';
import hi from './catalogs/hi.ts';
import bn from './catalogs/bn.ts';
import de from './catalogs/de.ts';
import zh from './catalogs/zh.ts';
import ja from './catalogs/ja.ts';
import jp from './catalogs/jp.ts';

export const translations = {
  en,
  es,
  fr,
  hi,
  bn,
  de,
  zh,
  ja,
  jp,
} as const;
