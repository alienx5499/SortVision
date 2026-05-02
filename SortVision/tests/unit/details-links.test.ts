import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildSearchWithLanguage,
  getCanonicalAlgorithmPath,
  resolveCodeLanguageFromSearch,
} from '../../src/components/panels/details/algorithmDetails/urlLanguage.ts';

test('resolveCodeLanguageFromSearch falls back to pseudocode', () => {
  assert.equal(resolveCodeLanguageFromSearch(''), 'pseudocode');
  assert.equal(resolveCodeLanguageFromSearch('?lang=unknown'), 'pseudocode');
});

test('resolveCodeLanguageFromSearch accepts supported languages', () => {
  assert.equal(resolveCodeLanguageFromSearch('?lang=rust'), 'rust');
  assert.equal(resolveCodeLanguageFromSearch('?foo=1&lang=haskell'), 'haskell');
});

test('buildSearchWithLanguage preserves existing params', () => {
  const next = buildSearchWithLanguage('?foo=1&algorithm=bubble', 'python');
  const params = new URLSearchParams(next);
  assert.equal(params.get('foo'), '1');
  assert.equal(params.get('algorithm'), 'bubble');
  assert.equal(params.get('lang'), 'python');
});

test('getCanonicalAlgorithmPath normalizes details route', () => {
  assert.equal(
    getCanonicalAlgorithmPath('/algorithms/config/bubble', 'bubble'),
    '/algorithms/details/bubble'
  );
  assert.equal(
    getCanonicalAlgorithmPath('/fr/algorithms/metrics/quick', 'quick'),
    '/fr/algorithms/details/quick'
  );
});

test('getCanonicalAlgorithmPath falls back for unknown paths', () => {
  assert.equal(
    getCanonicalAlgorithmPath('/random/path', 'merge'),
    '/algorithms/details/merge'
  );
});
