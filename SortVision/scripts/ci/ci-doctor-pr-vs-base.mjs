#!/usr/bin/env node // react-doctor-disable-line -- intentionally a standalone CLI script, knip/files

// This file is intentionally standalone and not imported - used by CI workflows
// react-doctor-disable-line -- knip/files

// This file is intentionally standalone and not imported - used by CI workflows

import { readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { env } from 'process';

// Paths from environment
const METRICS_CURRENT_PATH = env.DOCTOR_METRICS_CURRENT;
const METRICS_BASE_PATH = env.DOCTOR_METRICS_BASE;
const COMMENT_DIR = env.DOCTOR_COMMENT_DIR;
const BASE_REF = env.DOCTOR_BASE_REF || 'main';
const RUN_URL = env.DOCTOR_RUN_URL || '';

/**
 * Parse score from react-doctor output format "100 / 100"
 * Returns the first number as the score
 */
function parseScore(content) {
  const match = content.match(/(\d+)\s*\/\s*\d+/);
  if (match) {
    return parseInt(match[1], 10);
  }
  return null;
}

/**
 * Extract score from JSON metrics file
 */
async function extractScoreFromJson(filePath) {
  try {
    const content = await readFile(filePath, 'utf-8');
    const data = JSON.parse(content);

    // Try different possible JSON structures from react-doctor
    if (typeof data.score === 'number') {
      return data.score;
    }
    if (typeof data.score === 'string') {
      return parseScore(data.score);
    }
    if (data.summary && typeof data.summary.score === 'number') {
      return data.summary.score;
    }
    if (data.summary && typeof data.summary.score === 'string') {
      return parseScore(data.summary.score);
    }

    // Try to parse score from string content
    const score = parseScore(content);
    return score;
  } catch (error) {
    console.error(`Error reading metrics file ${filePath}: ${error.message}`);
    return null;
  }
}

/**
 * Extract score from text output file (fallback for non-JSON formats)
 */
async function extractScoreFromText(filePath) {
  try {
    const content = await readFile(filePath, 'utf-8');
    return parseScore(content);
  } catch (error) {
    console.error(`Error reading file ${filePath}: ${error.message}`);
    return null;
  }
}

/**
 * Get the current PR number from GitHub context
 */
function getPrNumber() {
  // GitHub Actions provides these environment variables
  const prNumber = env.GITHUB_REF_NAME || env.GITHUB_HEAD_REF;

  // Extract PR number from ref if it's a PR branch
  if (prNumber && prNumber.startsWith('PR-')) {
    return prNumber.replace('PR-', '');
  }

  // Fallback: try to get from GITHUB_REF
  const ref = env.GITHUB_REF || '';
  const prMatch = ref.match(/\/pull\/(\d+)\//);
  if (prMatch) {
    return prMatch[1];
  }

  return null;
}

/**
 * Ensure directory exists, create if needed
 */
async function ensureDir(dirPath) {
  if (!existsSync(dirPath)) {
    await mkdir(dirPath, { recursive: true });
  }
}

/**
 * Write content to file, creating directory if needed
 */
async function writeFile(dir, filename, content) {
  await ensureDir(dir);
  const filePath = join(dir, filename);
  await writeFileContent(filePath, content);
}

/**
 * Write content to a file
 */
async function writeFileContent(filePath, content) {
  const { writeFile: write } = await import('fs/promises');
  await write(filePath, content, 'utf-8');
}

/**
 * Format delta for display
 */
function formatDelta(delta) {
  if (delta > 0) {
    return `+${delta}`;
  }
  return `${delta}`;
}

/**
 * Main execution
 */
async function main() {
  console.log('React Doctor PR vs Base Comparison');
  console.log('==================================');

  // Validate required environment variables
  if (!METRICS_CURRENT_PATH) {
    console.error('Error: DOCTOR_METRICS_CURRENT environment variable is required');
    process.exit(0);
  }

  if (!COMMENT_DIR) {
    console.error('Error: DOCTOR_COMMENT_DIR environment variable is required');
    process.exit(0);
  }

  // Read current metrics
  console.log(`\nReading current metrics from: ${METRICS_CURRENT_PATH}`);
  let currentScore = null;

  if (existsSync(METRICS_CURRENT_PATH)) {
    currentScore = await extractScoreFromJson(METRICS_CURRENT_PATH);
    if (currentScore === null) {
      currentScore = await extractScoreFromText(METRICS_CURRENT_PATH);
    }
  } else {
    console.log(`Current metrics file not found: ${METRICS_CURRENT_PATH}`);
  }

  if (currentScore === null) {
    console.log('Could not extract score from current metrics. Exiting gracefully.');
    process.exit(0);
  }

  console.log(`Current Score: ${currentScore}/100`);

  // Read base metrics (optional)
  let baseScore = null;
  let delta = 0;
  let deltaDisplay = 'N/A';

  if (METRICS_BASE_PATH && existsSync(METRICS_BASE_PATH)) {
    console.log(`\nReading base metrics from: ${METRICS_BASE_PATH}`);
    baseScore = await extractScoreFromJson(METRICS_BASE_PATH);
    if (baseScore === null) {
      baseScore = await extractScoreFromText(METRICS_BASE_PATH);
    }

    if (baseScore !== null) {
      console.log(`Base Score: ${baseScore}/100`);
      delta = currentScore - baseScore;
      deltaDisplay = formatDelta(delta);
      console.log(`Delta: ${deltaDisplay}`);
    }
  } else {
    console.log('\nBase metrics not available (DOCTOR_METRICS_BASE not set or file not found)');
    deltaDisplay = 'N/A';
  }

  // Get PR number
  const prNumber = getPrNumber();
  console.log(`\nPR Number: ${prNumber || 'Not detected'}`);

  // Write PR number file
  if (prNumber) {
    const prNumberPath = join(COMMENT_DIR, 'pr_number.txt');
    await ensureDir(COMMENT_DIR);
    await writeFileContent(prNumberPath, prNumber);
    console.log(`Written PR number to: ${prNumberPath}`);
  }

  // Build comment markdown
  const runLink = RUN_URL ? `[View run](${RUN_URL})` : '';
  const runLinkLine = runLink ? `\n\n${runLink}` : '';

  const commentMarkdown = `<!-- sortvision-doctor-report -->
### React Doctor Score

| Metric | Value |
|--------|-------|
| Score | ${currentScore}/100 |
| Delta vs ${BASE_REF} | ${deltaDisplay} |
${runLinkLine}
`;

  // Write comment file
  const commentPath = join(COMMENT_DIR, 'comment.md');
  await ensureDir(COMMENT_DIR);
  await writeFileContent(commentPath, commentMarkdown);
  console.log(`\nWritten comment to: ${commentPath}`);
  console.log('\nComment content:');
  console.log('---');
  console.log(commentMarkdown.trim());
  console.log('---');

  console.log('\nDone!');
}

main().catch((error) => {
  console.error('Unexpected error:', error);
  // Exit 0 to not fail the CI pipeline
  process.exit(0);
});
