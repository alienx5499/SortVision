import assert from 'node:assert/strict';
import test from 'node:test';

import {
  extractInternalPathsFromHtml,
  extractLocsFromXml,
  gradeFromPassRate,
  safeUrlToPath,
  sampleArray,
} from '../helpers/qa-parse.mjs';

test('gradeFromPassRate', () => {
  assert.equal(gradeFromPassRate(NaN), '—');
  assert.equal(gradeFromPassRate(Infinity), '—');
  assert.equal(gradeFromPassRate(100), 'S+');
  assert.equal(gradeFromPassRate(98.5), 'S');
  assert.equal(gradeFromPassRate(96), 'A+');
  assert.equal(gradeFromPassRate(92), 'A');
  assert.equal(gradeFromPassRate(87), 'B+');
  assert.equal(gradeFromPassRate(82), 'B');
  assert.equal(gradeFromPassRate(79.9), 'C');
  assert.equal(gradeFromPassRate(50), 'C');
});

test('safeUrlToPath', () => {
  assert.equal(safeUrlToPath('https://example.com/foo/bar?q=1'), '/foo/bar?q=1');
  assert.equal(safeUrlToPath('/only-path'), null);
  assert.equal(safeUrlToPath('not-a-url'), null);
});

test('extractInternalPathsFromHtml skips fragments and unsafe schemes', () => {
  const html = `
    <a href="/algorithms/config/bubble">ok</a>
    <a href="#skip">x</a>
    <a href="mailto:a@b.com">m</a>
    <a href="javascript:void(0)">j</a>
    <a href="https://www.sortvision.com/fr/algorithms/config/merge">abs</a>
  `;
  const paths = extractInternalPathsFromHtml(html).sort();
  assert.ok(paths.includes('/algorithms/config/bubble'));
  assert.ok(paths.includes('/fr/algorithms/config/merge'));
  assert.equal(paths.includes('#skip'), false);
});

test('extractLocsFromXml', () => {
  const xml = `<?xml?><urlset><url><loc>https://x.com/a</loc></url><url><loc> https://x.com/b </loc></url></urlset>`;
  assert.deepEqual(extractLocsFromXml(xml), [
    'https://x.com/a',
    'https://x.com/b',
  ]);
});

test('extractLocsFromXml empty or no locs', () => {
  assert.deepEqual(extractLocsFromXml(''), []);
  assert.deepEqual(extractLocsFromXml('<urlset></urlset>'), []);
});

test('sampleArray returns full array when short', () => {
  assert.deepEqual(sampleArray([1, 2], 5), [1, 2]);
});

test('sampleArray respects count and uniqueness', () => {
  const arr = [10, 20, 30, 40, 50];
  const out = sampleArray(arr, 3);
  assert.equal(out.length, 3);
  const set = new Set(out);
  assert.equal(set.size, 3);
  for (const x of out) assert.ok(arr.includes(x));
});
