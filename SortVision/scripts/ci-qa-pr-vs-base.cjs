#!/usr/bin/env node
/**
 * Appends "this PR vs base branch last green CI" QA comparison to the PR comment.
 * Uses qa-metrics.json from this run vs qa-metrics downloaded from base branch's latest successful CI.
 *
 * Env: QA_COMMENT_FILE, QA_METRICS_CURRENT, QA_METRICS_BASE (optional),
 *      BASE_REF (e.g. main), BASE_SHA (short display optional).
 */
const fs = require('fs');

const commentFile = process.env.QA_COMMENT_FILE;
const curPath = process.env.QA_METRICS_CURRENT;
const basePath = process.env.QA_METRICS_BASE;
const baseRef = process.env.BASE_REF || 'main';
const baseSha = (process.env.BASE_SHA || '').slice(0, 7);

function readJson(p) {
  if (!p) return null;
  try {
    if (fs.existsSync(p)) {
      return JSON.parse(fs.readFileSync(p, 'utf8'));
    }
  } catch {
    /* ignore */
  }
  return null;
}

function escCell(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/\|/g, '\\|');
}

function n(v) {
  const x = Number(v);
  return Number.isFinite(x) ? x : 0;
}

function listNames(names, max = 40) {
  if (!names || names.length === 0) return '_None_';
  const slice = names.slice(0, max);
  const lines = slice.map((name) => `- \`${escCell(name)}\``);
  if (names.length > max) {
    lines.push(`- _…and ${names.length - max} more_`);
  }
  return lines.join('\n');
}

function main() {
  if (!commentFile || !fs.existsSync(commentFile)) {
    process.exit(0);
  }

  const head = readJson(curPath);
  if (!head) {
    process.exit(0);
  }

  const base = readJson(basePath);
  const headFailed = Array.isArray(head.failedNames) ? head.failedNames : [];
  const baseHasFailedNames = base && Array.isArray(base.failedNames);
  const baseFailed = baseHasFailedNames ? base.failedNames : [];

  /** Failed on base, not failing on this PR → fixed */
  const fixed = baseHasFailedNames
    ? baseFailed.filter((name) => !headFailed.includes(name))
    : [];
  /** Failing on this PR, not in base failed list → new regression (or new test) */
  const newFailures = baseHasFailedNames
    ? headFailed.filter((name) => !baseFailed.includes(name))
    : [];
  /** Failed on both base and this PR */
  const stillFailing = baseHasFailedNames
    ? headFailed.filter((name) => baseFailed.includes(name))
    : [];

  const hp = n(head.passed);
  const hf = n(head.failed);
  const ht = n(head.total);

  const lines = [
    '',
    `### QA vs \`${escCell(baseRef)}\` (last successful CI on base branch)`,
    '',
  ];

  if (!base) {
    lines.push(
      `_No baseline metrics found (download \`qa-metrics\` artifact from latest green run on \`${escCell(baseRef)}\`). Showing this run only._`,
      '',
      '| | This PR |',
      '|---|--------|',
      `| Passed | ${hp} |`,
      `| Failed | ${hf} |`,
      `| Total | ${ht} |`,
      `| Δ passed vs base | — |`,
      '',
      '#### Failures on this PR',
      listNames(headFailed),
      ''
    );
    fs.appendFileSync(commentFile, lines.join('\n'), 'utf8');
    return;
  }

  const bp = n(base.passed);
  const bf = n(base.failed);
  const bt = n(base.total);
  const deltaPassed = hp - bp;
  let deltaStr = '—';
  if (deltaPassed > 0) deltaStr = `**+${deltaPassed}**`;
  else if (deltaPassed < 0) deltaStr = `**${deltaPassed}**`;
  else deltaStr = '**0**';

  const baseLabel = baseSha ? `\`${escCell(baseRef)}\` @ ${escCell(baseSha)}` : `\`${escCell(baseRef)}\``;

  lines.push(
    `Baseline: last green **Continuous integration** on ${baseLabel} (same \`test:ci\` suite).`,
    '',
    '| | Base | This PR | Δ passed |',
    '|---|------|---------|----------|',
    `| Passed | ${bp} | ${hp} | ${deltaStr} |`,
    `| Failed | ${bf} | ${hf} | ${hf - bf === 0 ? '—' : `**${hf - bf > 0 ? '+' : ''}${hf - bf}**`} |`,
    `| Total | ${bt} | ${ht} | ${ht - bt === 0 ? '—' : `**${ht - bt > 0 ? '+' : ''}${ht - bt}**`} |`,
    ''
  );

  if (baseHasFailedNames) {
    lines.push(
      '#### Fixed (failed on base, passing on this PR)',
      listNames(fixed),
      '',
      '#### New failures (failed on this PR; were not failing on base)',
      listNames(newFailures),
      '',
      '#### Still failing (failed on base and still failing on this PR)',
      listNames(stillFailing),
      ''
    );
  } else {
    lines.push(
      '_Per-test lists need a baseline `qa-metrics` artifact that includes `failedNames` (green **Continuous integration** on the base branch after this update)._',
      '',
      '#### Failures on this PR',
      listNames(headFailed),
      ''
    );
  }

  fs.appendFileSync(commentFile, lines.join('\n'), 'utf8');
}

main();
