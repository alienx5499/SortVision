#!/usr/bin/env node
/**
 * Appends a "base branch vs this PR" diff section to the QA PR comment:
 * git diff --numstat for SortVision/tests and SortVision/scripts, plus repo shortstat.
 * Env: BASE_SHA, HEAD_SHA, BASE_REF, QA_COMMENT_FILE, GITHUB_WORKSPACE (Actions).
 */
const { execSync } = require('child_process');
const fs = require('fs');

const base = process.env.BASE_SHA;
const head = process.env.HEAD_SHA;
const baseRef = process.env.BASE_REF || 'main';
const commentFile = process.env.QA_COMMENT_FILE;
const cwd = process.env.GITHUB_WORKSPACE || process.cwd();

if (!commentFile || !base || !head || !fs.existsSync(commentFile)) {
  process.exit(0);
}

function git(args) {
  try {
    return execSync(`git ${args}`, {
      encoding: 'utf8',
      maxBuffer: 10 * 1024 * 1024,
      cwd,
    }).trim();
  } catch {
    return '';
  }
}

function escCell(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/\|/g, '\\|');
}

const paths = 'SortVision/tests SortVision/scripts';
const numstat = git(`diff --numstat ${base} ${head} -- ${paths}`);
const rows = [];

for (const line of numstat.split('\n')) {
  if (!line.trim()) continue;
  const parts = line.split('\t');
  if (parts.length < 3) continue;
  const add = parts[0];
  const del = parts[1];
  const file = parts.slice(2).join('\t');
  rows.push(`| \`${escCell(file)}\` | +${escCell(add)} | −${escCell(del)} |`);
}

const shortstat = git(`diff --shortstat ${base} ${head}`);

const section = [
  '',
  `### vs \`${escCell(baseRef)}\` (\`${escCell(base.slice(0, 7))}\`) → this PR (\`${escCell(head.slice(0, 7))}\`)`,
  '',
  'Line changes under **SortVision/tests/** and **SortVision/scripts/** (`git diff --numstat` vs base branch):',
  '',
  '| File | + | − |',
  '|------|---|---|',
  rows.length > 0 ? rows.join('\n') : '| _No changes in those paths_ | — | — |',
  '',
  '<details><summary>Whole-repo shortstat vs base</summary>',
  '',
  '```',
  shortstat || '(unavailable)',
  '```',
  '',
  '</details>',
  '',
].join('\n');

fs.appendFileSync(commentFile, section, 'utf8');
