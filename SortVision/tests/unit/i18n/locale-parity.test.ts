import assert from 'node:assert/strict';
import test from 'node:test';

import bn from '../../../src/locales/catalogs/bn.ts';
import de from '../../../src/locales/catalogs/de.ts';
import enCatalog from '../../../src/locales/catalogs/en.ts';
import es from '../../../src/locales/catalogs/es.ts';
import fr from '../../../src/locales/catalogs/fr.ts';
import hi from '../../../src/locales/catalogs/hi.ts';
import ja from '../../../src/locales/catalogs/ja.ts';
import jp from '../../../src/locales/catalogs/jp.ts';
import zh from '../../../src/locales/catalogs/zh.ts';

/** Same composition as `locales/index.ts` (explicit `.ts` for Node ESM unit tests). */
const translations = {
  en: enCatalog,
  es,
  fr,
  hi,
  bn,
  de,
  zh,
  ja,
  jp,
} as const;

/** Dot-paths for every string leaf in the nested message tree (matches runtime `t()` resolution). */
function leafKeys(obj: unknown, prefix = ''): Set<string> {
  const out = new Set<string>();
  if (typeof obj === 'string') {
    if (prefix) out.add(prefix);
    return out;
  }
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
    return out;
  }
  for (const k of Object.keys(obj)) {
    const v = (obj as Record<string, unknown>)[k];
    const p = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'string') {
      out.add(p);
    } else if (v && typeof v === 'object' && !Array.isArray(v)) {
      for (const x of leafKeys(v, p)) out.add(x);
    }
  }
  return out;
}

const canonical = leafKeys(enCatalog);

test('all bundled locales expose the same leaf keys as en', () => {
  for (const [code, tree] of Object.entries(translations)) {
    const keys = leafKeys(tree);
    const missing = [...canonical].filter(k => !keys.has(k)).sort();
    const extra = [...keys].filter(k => !canonical.has(k)).sort();
    assert.deepEqual(
      missing,
      [],
      `${code}: missing ${missing.length} key(s) — first: ${missing.slice(0, 8).join(', ')}`
    );
    assert.deepEqual(
      extra,
      [],
      `${code}: ${extra.length} extra key(s) vs en — first: ${extra.slice(0, 8).join(', ')}`
    );
  }
});
