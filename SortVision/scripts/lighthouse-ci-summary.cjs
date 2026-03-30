#!/usr/bin/env node
/**
 * Lighthouse category scores: job summary + optional PR comment.
 * With MANIFEST_*_BASE_PATH + LIGHTHOUSE_BASE_REF, adds Δ vs last green CI on the base branch (same URLs).
 */
const fs = require('fs');
const path = require('path');

const summaryPath = process.env.GITHUB_STEP_SUMMARY;
const commentDir = process.env.LIGHTHOUSE_COMMENT_DIR;
const baseRef = (process.env.LIGHTHOUSE_BASE_REF || '').trim();

if (!summaryPath && !commentDir) {
  process.exit(0);
}

/** Prefer file path; fall back to inline JSON from env. */
function loadManifest(envJsonKey, envPathKey) {
  const p = process.env[envPathKey];
  if (p) {
    try {
      if (fs.existsSync(p)) {
        return fs.readFileSync(p, 'utf8');
      }
    } catch {
      /* ignore */
    }
  }
  return process.env[envJsonKey] || '';
}

function pct(n) {
  if (n == null || Number.isNaN(n)) return '—';
  return `${Math.round(Number(n) * 100)}`;
}

function escapeMarkdownTableCell(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/\|/g, '\\|');
}

function parseRows(json) {
  try {
    const rows = JSON.parse(json || '[]');
    return Array.isArray(rows) ? rows : [];
  } catch {
    return [];
  }
}

/** url -> summary */
function rowsToMap(json) {
  const m = new Map();
  for (const r of parseRows(json)) {
    const u = r.url || '';
    if (u) m.set(u, r.summary || {});
  }
  return m;
}

function scoreInt(summary, cat) {
  if (!summary || typeof summary !== 'object') return null;
  const s = summary;
  let v;
  if (cat === 'best-practices') {
    v = s['best-practices'] ?? s.bestPractices;
  } else {
    v = s[cat];
  }
  if (v == null || Number.isNaN(Number(v))) return null;
  return Math.round(Number(v) * 100);
}

function deltaStr(cur, prev) {
  if (cur == null || prev == null) return '—';
  const d = cur - prev;
  if (d === 0) return '—';
  return d > 0 ? `+${d}` : `${d}`;
}

function tableMarkdown(title, manifestJson) {
  const lines = [`### ${title}`, ''];
  const rows = parseRows(manifestJson);
  if (rows.length === 0) {
    lines.push('_Could not parse Lighthouse manifest or no rows._', '');
    return lines.join('\n');
  }

  lines.push(
    '| URL | Performance | Accessibility | Best practices | SEO |',
    '|-----|-------------|-----------------|----------------|-----|'
  );

  for (const r of rows) {
    const s = r.summary || {};
    const url = escapeMarkdownTableCell(r.url || '—');
    const bp = s['best-practices'] ?? s.bestPractices;
    lines.push(
      `| ${url} | ${pct(s.performance)} | ${pct(s.accessibility)} | ${pct(bp)} | ${pct(s.seo)} |`
    );
  }
  lines.push('');
  return lines.join('\n');
}

function tableMarkdownWithDelta(title, currentJson, baseJson) {
  const lines = [`### ${title}`, ''];
  const curRows = parseRows(currentJson);
  const baseMap = rowsToMap(baseJson);

  if (curRows.length === 0) {
    lines.push('_No manifest rows._', '');
    return lines.join('\n');
  }

  const refLabel = baseRef ? `\`${escapeMarkdownTableCell(baseRef)}\`` : 'base branch';
  lines.push(`_Δ = change vs last successful **Continuous integration** on ${refLabel} (same URLs)._`, '');

  lines.push(
    '| URL | Perf | Δ | A11y | Δ | Best | Δ | SEO | Δ |',
    '|-----|------|---|------|---|------|---|-----|---|'
  );

  for (const r of curRows) {
    const url = escapeMarkdownTableCell(r.url || '—');
    const cur = r.summary || {};
    const prev = baseMap.get(r.url || '') || {};

    const p0 = scoreInt(cur, 'performance');
    const p1 = scoreInt(prev, 'performance');
    const a0 = scoreInt(cur, 'accessibility');
    const a1 = scoreInt(prev, 'accessibility');
    const b0 = scoreInt(cur, 'best-practices');
    const b1 = scoreInt(prev, 'best-practices');
    const s0 = scoreInt(cur, 'seo');
    const s1 = scoreInt(prev, 'seo');

    lines.push(
      `| ${url} | ${p0 ?? '—'} | ${deltaStr(p0, p1)} | ${a0 ?? '—'} | ${deltaStr(a0, a1)} | ${b0 ?? '—'} | ${deltaStr(b0, b1)} | ${s0 ?? '—'} | ${deltaStr(s0, s1)} |`
    );
  }
  lines.push('');
  return lines.join('\n');
}

function buildReportBody() {
  const mobileCur = loadManifest('MANIFEST_MOBILE', 'MANIFEST_MOBILE_PATH');
  const desktopCur = loadManifest('MANIFEST_DESKTOP', 'MANIFEST_DESKTOP_PATH');
  const mobileBase = loadManifest('MANIFEST_MOBILE_BASE', 'MANIFEST_MOBILE_BASE_PATH');
  const desktopBase = loadManifest('MANIFEST_DESKTOP_BASE', 'MANIFEST_DESKTOP_BASE_PATH');

  const hasMobileBase = parseRows(mobileBase).length > 0;
  const hasDesktopBase = parseRows(desktopBase).length > 0;

  const mobileBlock = hasMobileBase
    ? tableMarkdownWithDelta('Lighthouse (mobile)', mobileCur, mobileBase)
    : tableMarkdown('Lighthouse (mobile)', mobileCur);

  const desktopBlock = hasDesktopBase
    ? tableMarkdownWithDelta('Lighthouse (desktop)', desktopCur, desktopBase)
    : tableMarkdown('Lighthouse (desktop)', desktopCur);

  let intro = '';
  if ((hasMobileBase || hasDesktopBase) && baseRef) {
    intro = `### Lighthouse vs \`${escapeMarkdownTableCell(baseRef)}\` (last green CI on base)\n\n`;
  }

  return intro + [mobileBlock, desktopBlock].join('\n');
}

const body = buildReportBody();
console.log(body);

if (summaryPath) {
  fs.appendFileSync(summaryPath, `${body}\n`, 'utf8');
}

if (commentDir) {
  fs.mkdirSync(commentDir, { recursive: true });
  const runUrl =
    process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY && process.env.GITHUB_RUN_ID
      ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
      : '';
  const headerLines = ['<!-- sortvision-lighthouse-report -->', '### Lighthouse (CI)', ''];
  if (runUrl) {
    headerLines.push(`[View workflow run](${runUrl})`, '');
  }
  const text = `${headerLines.join('\n')}${body}\n`;
  fs.writeFileSync(path.join(commentDir, 'comment.md'), text, 'utf8');
}
