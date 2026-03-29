#!/usr/bin/env node
/**
 * Lighthouse category scores: optional GITHUB_STEP_SUMMARY, optional PR comment file (CI).
 */
const fs = require('fs');
const path = require('path');

const summaryPath = process.env.GITHUB_STEP_SUMMARY;
const commentDir = process.env.LIGHTHOUSE_COMMENT_DIR;

if (!summaryPath && !commentDir) {
  process.exit(0);
}

/** Prefer file path (parallel CI jobs upload manifests); fall back to inline JSON from the same job. */
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

/** Markdown table cell: escape backslashes first, then pipes (predictable table parsing). */
function escapeMarkdownTableCell(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/\|/g, '\\|');
}

function tableMarkdown(title, manifestJson) {
  const lines = [`### ${title}`, ''];
  let rows;
  try {
    rows = JSON.parse(manifestJson || '[]');
  } catch {
    lines.push('_Could not parse Lighthouse manifest._', '');
    return lines.join('\n');
  }
  if (!Array.isArray(rows) || rows.length === 0) {
    lines.push('_No manifest rows (run may have failed before collection)._', '');
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

function buildReportBody() {
  const mobile = loadManifest('MANIFEST_MOBILE', 'MANIFEST_MOBILE_PATH');
  const desktop = loadManifest('MANIFEST_DESKTOP', 'MANIFEST_DESKTOP_PATH');
  return [tableMarkdown('Lighthouse (mobile)', mobile), tableMarkdown('Lighthouse (desktop)', desktop)].join(
    '\n'
  );
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
