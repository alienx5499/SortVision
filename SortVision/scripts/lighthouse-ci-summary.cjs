#!/usr/bin/env node
/**
 * Appends Lighthouse category scores to GITHUB_STEP_SUMMARY (mobile + desktop manifests from LHCI action).
 */
const fs = require('fs');

const out = process.env.GITHUB_STEP_SUMMARY;
if (!out) {
  process.exit(0);
}

function pct(n) {
  if (n == null || Number.isNaN(n)) return '—';
  return `${Math.round(Number(n) * 100)}`;
}

function table(title, manifestJson) {
  const lines = [`### ${title}`, ''];
  let rows;
  try {
    rows = JSON.parse(manifestJson || '[]');
  } catch {
    lines.push('_Could not parse Lighthouse manifest._', '');
    const text = lines.join('\n');
    console.log(text);
    fs.appendFileSync(out, text + '\n', 'utf8');
    return;
  }
  if (!Array.isArray(rows) || rows.length === 0) {
    lines.push('_No manifest rows (run may have failed before collection)._', '');
    const text = lines.join('\n');
    console.log(text);
    fs.appendFileSync(out, text + '\n', 'utf8');
    return;
  }

  lines.push(
    '| URL | Performance | Accessibility | Best practices | SEO |',
    '|-----|-------------|-----------------|----------------|-----|'
  );

  for (const r of rows) {
    const s = r.summary || {};
    const url = String(r.url || '—').replace(/\|/g, '\\|');
    const bp = s['best-practices'] ?? s.bestPractices;
    lines.push(
      `| ${url} | ${pct(s.performance)} | ${pct(s.accessibility)} | ${pct(bp)} | ${pct(s.seo)} |`
    );
  }
  lines.push('');
  const text = lines.join('\n');
  console.log(text);
  fs.appendFileSync(out, text + '\n', 'utf8');
}

table('Lighthouse (mobile)', process.env.MANIFEST_MOBILE);
table('Lighthouse (desktop)', process.env.MANIFEST_DESKTOP);
