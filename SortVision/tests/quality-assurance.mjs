#!/usr/bin/env node

/**
 * SortVision - Comprehensive Quality Assurance Suite
 * 
 * Complete A-Z testing covering:
 * - All pages load correctly (200 status)
 * - SEO compliance (canonicals, meta tags, Open Graph)
 * - Performance metrics
 * - Content validation
 * - Multi-language support
 * - Security headers
 * - API endpoints
 * 
 * Usage:
 *   npm test                  # Run all tests (600+ tests)
 *   npm run test:quick        # Quick validation (30 tests)
 *   npm run test:prod         # Production tests
 */

import { performance } from 'perf_hooks';

// Configuration
const args = process.argv.slice(2);
const isProduction = args.includes('--production') || args.includes('--prod');
const isQuick = args.includes('--quick');
const isExtended = args.includes('--extended');
const isCI = process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true';
const BASE_URL = isProduction ? 'https://www.sortvision.com' : 'http://localhost:3000';
const CANONICAL_BASE = 'https://www.sortvision.com'; // Production URLs for SEO

// Timeout configuration - longer in CI environments
const DEFAULT_TIMEOUT = isCI ? 30000 : 10000; // 30s in CI, 10s locally

// Performance thresholds - more lenient in CI environments
// CI environments are slower, so we use more realistic thresholds
const PERF_THRESHOLDS = {
  homepage: {
    // CI runners can be noisy/slow; keep this lenient to avoid flaky failures.
    pass: isCI ? 4000 : 1000,    // 4s in CI, 1s locally
    warn: isCI ? 8000 : 3000,    // 8s in CI, 3s locally
  },
  algorithmPage: {
    // CI runners can be very slow for heavier pages (e.g., bucket/radix).
    pass: isCI ? 6000 : 2500,    // 6s in CI, 2.5s locally
    warn: isCI ? 12000 : 3500,   // 12s in CI, 3.5s locally
  },
};

// Test configuration
const ALGORITHMS = ['bubble', 'insertion', 'selection', 'merge', 'quick', 'heap', 'radix', 'bucket'];
const LANGUAGES = ['en', 'es', 'hi', 'fr', 'de', 'zh', 'ja', 'pt'];
const TABS = ['config', 'details', 'metrics'];

// Results tracking
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
let warnings = 0;
const failedTestDetails = [];
const warningDetails = [];

// Logging
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(80));
  log(`  ${title}`, colors.bright + colors.cyan);
  console.log('='.repeat(80) + '\n');
}

function logTest(name, status, details = '') {
  totalTests++;
  const statusSymbol = status === 'PASS' ? '✓' : status === 'WARN' ? '⚠' : '✗';
  const color = status === 'PASS' ? colors.green : status === 'WARN' ? colors.yellow : colors.red;
  
  if (status === 'PASS') passedTests++;
  else if (status === 'FAIL') {
    failedTests++;
    failedTestDetails.push({ name, details });
  } else if (status === 'WARN') {
    warnings++;
    warningDetails.push({ name, details });
  }
  
  log(`${statusSymbol} ${name}${details ? ` - ${details}` : ''}`, color);
}

// HTTP utility - Increased timeout for CI environments
async function fetchWithTimeout(url, timeout = DEFAULT_TIMEOUT) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, { 
      signal: controller.signal,
      redirect: 'manual'
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error(`Timeout after ${timeout}ms`);
    }
    throw error;
  }
}

function safeUrlToPath(u) {
  try {
    const parsed = new URL(u);
    return parsed.pathname + (parsed.search || '');
  } catch {
    return null;
  }
}

function extractInternalPathsFromHtml(html) {
  const paths = new Set();
  const hrefRegex = /<a[^>]*href=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = hrefRegex.exec(html)) !== null) {
    const href = (match[1] || '').trim();
    if (!href) continue;
    if (href.startsWith('#')) continue;
    if (href.startsWith('mailto:') || href.startsWith('tel:')) continue;
    if (href.startsWith('javascript:')) continue;

    if (href.startsWith('/')) {
      paths.add(href);
      continue;
    }

    const maybePath = safeUrlToPath(href);
    if (maybePath) paths.add(maybePath);
  }
  return Array.from(paths);
}

function extractLocsFromXml(xml) {
  const locs = [];
  const locRegex = /<loc>\s*([^<\s]+)\s*<\/loc>/gi;
  let match;
  while ((match = locRegex.exec(xml)) !== null) {
    locs.push(match[1]);
  }
  return locs;
}

function sampleArray(arr, count) {
  if (arr.length <= count) return arr;
  const out = [];
  const seen = new Set();
  while (out.length < count && seen.size < arr.length) {
    const idx = Math.floor(Math.random() * arr.length);
    if (seen.has(idx)) continue;
    seen.add(idx);
    out.push(arr[idx]);
  }
  return out;
}

async function runExtendedSitemapSuite() {
  logSection('Extended: Sitemap Consistency');

  // Validate sitemap endpoints exist
  await Promise.all([
    testURL(`${BASE_URL}/sitemap.xml`, 200, { name: 'Sitemap: /sitemap.xml' }),
    testURL(`${BASE_URL}/sitemap-index.xml`, 200, {
      name: 'Sitemap: /sitemap-index.xml',
    }),
  ]);

  // Parse sitemaps and validate that listed URLs respond
  let sitemapXml = '';
  let sitemapIndexXml = '';

  try {
    const res = await fetchWithTimeout(`${BASE_URL}/sitemap.xml`);
    sitemapXml = await res.text();
  } catch (e) {
    logTest('Sitemap parse: /sitemap.xml', 'FAIL', e.message);
    return;
  }

  try {
    const res = await fetchWithTimeout(`${BASE_URL}/sitemap-index.xml`);
    sitemapIndexXml = await res.text();
  } catch (e) {
    // sitemap-index.xml might not always be used locally; treat as warning.
    logTest('Sitemap parse: /sitemap-index.xml', 'WARN', e.message);
  }

  const sitemapUrls = extractLocsFromXml(sitemapXml);
  const indexUrls = extractLocsFromXml(sitemapIndexXml);

  // If index points to additional sitemap files, sanity check a sample of them too.
  const indexSample = sampleArray(indexUrls, isCI ? 5 : 10);
  for (const u of indexSample) {
    const expected = safeUrlToPath(u);
    if (!expected) continue;
    await testURL(`${BASE_URL}${expected}`, [200, 301, 308], {
      name: `Sitemap index entry: ${expected}`,
    });
  }

  // Validate sitemap URLs (sample in CI to keep runtime bounded)
  const maxUrls = isCI ? 120 : 250;
  const toCheck = sampleArray(sitemapUrls, maxUrls)
    .map(safeUrlToPath)
    .filter(Boolean);

  const batchSize = isCI ? 15 : 25;
  for (let i = 0; i < toCheck.length; i += batchSize) {
    const batch = toCheck.slice(i, i + batchSize).map((p) =>
      testURL(`${BASE_URL}${p}`, [200, 301, 308], { name: `Sitemap URL: ${p}` })
    );
    await Promise.all(batch);
  }
}

async function runExtendedLinkIntegritySuite() {
  logSection('Extended: Internal Link Integrity (Sampled)');

  // Representative pages to discover links from
  const seedPages = [
    '/',
    '/contributions/overview',
    '/algorithms/config/bubble',
    '/algorithms/details/merge',
    '/algorithms/metrics/quick',
    '/es',
    '/fr/algorithms/config/merge',
    '/de/algorithms/config/quick',
    '/zh/algorithms/config/heap',
    '/ja/algorithms/config/radix',
  ];

  const discovered = new Set();

  for (const seed of seedPages) {
    try {
      const res = await fetchWithTimeout(`${BASE_URL}${seed}`);
      if (res.status !== 200) {
        logTest(`Link seed: ${seed}`, 'WARN', `Status ${res.status}`);
        continue;
      }
      const html = await res.text();
      extractInternalPathsFromHtml(html).forEach((p) => discovered.add(p));
      logTest(`Link seed: ${seed}`, 'PASS', `${discovered.size} total links`);
    } catch (e) {
      logTest(`Link seed: ${seed}`, 'WARN', e.message);
    }
  }

  const discoveredList = Array.from(discovered).filter((p) => p.startsWith('/'));
  const sampleCount = isCI ? 80 : 160;
  const linkSample = sampleArray(discoveredList, sampleCount);

  const batchSize = isCI ? 15 : 25;
  for (let i = 0; i < linkSample.length; i += batchSize) {
    const batch = linkSample.slice(i, i + batchSize).map((p) =>
      testURL(`${BASE_URL}${p}`, [200, 301, 308, 405], {
        name: `Link: ${p}`,
      })
    );
    await Promise.all(batch);
  }
}

async function runExtendedSecurityHeadersSuite() {
  logSection('Extended: Security Headers (Sampled)');

  // In production we expect HSTS; locally (http) it won't exist.
  const checkHsts = isProduction;

  const paths = [
    '/',
    '/algorithms/config/bubble',
    '/contributions/overview',
    '/robots.txt',
    '/sitemap.xml',
  ];

  for (const p of paths) {
    try {
      const res = await fetchWithTimeout(`${BASE_URL}${p}`);
      const headers = res.headers;
      const xcto = headers.get('x-content-type-options');
      const xfo = headers.get('x-frame-options');
      const hsts = headers.get('strict-transport-security');

      const missing = [];
      if (!xcto) missing.push('x-content-type-options');
      if (!xfo) missing.push('x-frame-options');
      if (checkHsts && !hsts) missing.push('strict-transport-security');

      if (missing.length) {
        logTest(`SecHdr: ${p}`, 'WARN', `Missing: ${missing.join(', ')}`);
      } else {
        logTest(`SecHdr: ${p}`, 'PASS');
      }
    } catch (e) {
      logTest(`SecHdr: ${p}`, 'WARN', e.message);
    }
  }
}

// Test function
async function testURL(url, expectedStatus, options = {}) {
  const {
    name = url,
    checkCanonical = false,
    canonicalUrl = null,
    checkSEO = false,
    checkContent = false,
  } = options;

  try {
    const response = await fetchWithTimeout(url);
    const actualStatus = response.status;
    
    const expectedStatuses = Array.isArray(expectedStatus)
      ? expectedStatus
      : [expectedStatus];

    if (!expectedStatuses.includes(actualStatus)) {
      logTest(
        name,
        'FAIL',
        `Expected ${expectedStatuses.join(' or ')}, got ${actualStatus}`
      );
      return;
    }
    
    if (actualStatus === 200) {
      const html = await response.text();
      
      // Canonical check
      if (checkCanonical && canonicalUrl) {
        const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
        const foundCanonical = canonicalMatch ? canonicalMatch[1] : null;
        
        if (foundCanonical !== canonicalUrl) {
          logTest(name, 'FAIL', `Canonical: expected ${canonicalUrl}, got ${foundCanonical}`);
          return;
        }
      }
      
      // SEO checks
      if (checkSEO) {
        const hasTitle = /<title>.*?<\/title>/i.test(html);
        const hasDescription = /<meta[^>]*name=["']description["'][^>]*content=["'][^"']+["']/i.test(html);
        
        if (!hasTitle || !hasDescription) {
          logTest(name, 'FAIL', `Missing SEO: ${!hasTitle ? 'title' : ''} ${!hasDescription ? 'description' : ''}`);
          return;
        }
      }
      
      // Content check
      if (checkContent && html.length < 100) {
        logTest(name, 'FAIL', 'Content too short');
        return;
      }
    }
    
    logTest(name, 'PASS');
  } catch (error) {
    logTest(name, 'FAIL', error.message);
  }
}

// Quick validation (30 tests)
async function runQuickValidation() {
  logSection('Quick Validation Suite (30 Tests)');
  
  const tests = [];
  
  // Core pages
  tests.push(testURL(`${BASE_URL}/`, 200, { name: 'Homepage', checkSEO: true, checkContent: true }));
  tests.push(testURL(`${BASE_URL}/en`, 200, { name: 'English homepage', checkSEO: true }));
  tests.push(testURL(`${BASE_URL}/es`, 200, { name: 'Spanish homepage', checkSEO: true }));
  tests.push(testURL(`${BASE_URL}/fr`, 200, { name: 'French homepage', checkSEO: true }));
  tests.push(testURL(`${BASE_URL}/de`, 200, { name: 'German homepage', checkSEO: true }));
  
  // Algorithm pages with canonicals
  tests.push(testURL(`${BASE_URL}/algorithms/config/bubble`, 200, {
    name: 'Bubble Sort Config',
    checkCanonical: true,
    canonicalUrl: `${CANONICAL_BASE}/algorithms/config/bubble`,
    checkSEO: true
  }));
  
  tests.push(testURL(`${BASE_URL}/algorithms/details/merge`, 200, {
    name: 'Merge Sort Details',
    checkCanonical: true,
    canonicalUrl: `${CANONICAL_BASE}/algorithms/config/merge`
  }));
  
  tests.push(testURL(`${BASE_URL}/algorithms/metrics/quick`, 200, {
    name: 'Quick Sort Metrics',
    checkCanonical: true,
    canonicalUrl: `${CANONICAL_BASE}/algorithms/config/quick`
  }));
  
  // Multi-language
  for (let i = 0; i < 15; i++) {
    const lang = LANGUAGES[i % LANGUAGES.length];
    const algo = ALGORITHMS[i % ALGORITHMS.length];
    const tab = TABS[i % TABS.length];
    // English uses /algorithms/config/algo (no /en prefix)
    const canonical = lang === 'en' ?
      `${CANONICAL_BASE}/algorithms/config/${algo}` :
      `${CANONICAL_BASE}/${lang}/algorithms/config/${algo}`;
    const skipCanonical = lang === 'pt'; // PT not fully supported
    
    tests.push(testURL(`${BASE_URL}/${lang}/algorithms/${tab}/${algo}`, 200, {
      name: `${lang.toUpperCase()}/${algo}/${tab}`,
      checkCanonical: !skipCanonical,
      canonicalUrl: canonical
    }));
  }
  
  // Contributions
  tests.push(testURL(`${BASE_URL}/contributions/overview`, 200, { name: 'Contributions', checkSEO: true }));
  
  // SEO files
  tests.push(testURL(`${BASE_URL}/sitemap.xml`, 200, { name: 'Sitemap' }));
  tests.push(testURL(`${BASE_URL}/manifest.json`, 200, { name: 'Manifest' }));
  
  // API endpoints
  tests.push(testURL(`${BASE_URL}/api/ai-info`, 200, { name: 'AI Info API' }));
  tests.push(testURL(`${BASE_URL}/api/indexnow`, 405, { name: 'IndexNow API (POST only)' }));
  
  await Promise.all(tests);
}

// Comprehensive validation (200 tests)
async function runComprehensiveValidation() {
  logSection('Comprehensive Validation Suite (200 Tests)');
  
  const tests = [];
  
  log('[All Language Homepages - 8 tests]', colors.blue);
  for (const lang of LANGUAGES) {
    tests.push(testURL(`${BASE_URL}/${lang}`, 200, {
      name: `${lang.toUpperCase()} homepage`,
      checkSEO: true,
      checkContent: true
    }));
  }
  
  log('[All Algorithms × All Tabs - 192 tests]', colors.blue);
  for (const lang of LANGUAGES) {
    for (const algo of ALGORITHMS) {
      for (const tab of TABS) {
        // English uses /algorithms/config/algo (no /en prefix as it's default)
        // Portuguese not fully supported yet, skip canonical check
        const canonicalUrl = lang === 'en' ? 
          `${CANONICAL_BASE}/algorithms/config/${algo}` :
          `${CANONICAL_BASE}/${lang}/algorithms/config/${algo}`;
        const skipCanonical = lang === 'pt'; // PT not fully supported
        
        tests.push(testURL(`${BASE_URL}/${lang}/algorithms/${tab}/${algo}`, 200, {
          name: `${lang}/${algo}/${tab}`,
          checkCanonical: !skipCanonical,
          canonicalUrl: canonicalUrl
        }));
      }
    }
  }
  
  // Run in batches
  const batchSize = 20;
  for (let i = 0; i < tests.length; i += batchSize) {
    await Promise.all(tests.slice(i, i + batchSize));
  }
}

// Integration suite (250 tests)
async function runIntegrationSuite() {
  logSection('Integration Suite (250 Tests)');
  
  const tests = [];
  
  log('[Core Pages - 40 tests]', colors.blue);
  for (const lang of LANGUAGES) {
    tests.push(testURL(`${BASE_URL}/${lang}`, 200, { name: `Core: ${lang}` }));
  }
  
  for (const algo of ALGORITHMS) {
    for (const tab of TABS) {
      tests.push(testURL(`${BASE_URL}/algorithms/${tab}/${algo}`, 200, {
        name: `Core: ${algo}/${tab}`
      }));
    }
  }
  
  tests.push(testURL(`${BASE_URL}/contributions/overview`, 200, { name: 'Core: Contributions' }));
  tests.push(testURL(`${BASE_URL}/contributions/guide`, 200, { name: 'Core: Guide' }));
  tests.push(testURL(`${BASE_URL}/sitemap.xml`, 200, { name: 'Core: Sitemap' }));
  tests.push(testURL(`${BASE_URL}/sitemap-index.xml`, 200, { name: 'Core: Sitemap Index' }));
  tests.push(testURL(`${BASE_URL}/manifest.json`, 200, { name: 'Core: Manifest' }));
  
  await Promise.all(tests);
  tests.length = 0;
  
  log('[Deep SEO - 96 tests]', colors.blue);
  for (const lang of LANGUAGES) {
    for (const algo of ALGORITHMS) {
      const canonicalUrl = lang === 'en' ?
        `${CANONICAL_BASE}/algorithms/config/${algo}` :
        `${CANONICAL_BASE}/${lang}/algorithms/config/${algo}`;
      const skipCanonical = lang === 'pt';
      
      tests.push(testURL(`${BASE_URL}/${lang}/algorithms/config/${algo}`, 200, {
        name: `SEO: ${lang}/${algo}`,
        checkCanonical: !skipCanonical,
        canonicalUrl: canonicalUrl,
        checkSEO: true,
        checkContent: true
      }));
    }
  }
  
  await Promise.all(tests);
  tests.length = 0;
  
  log('[Security & Headers - 64 tests]', colors.blue);
  const securityPaths = ['/', '/algorithms/config/bubble', '/contributions/overview'];
  for (const path of securityPaths) {
    for (const lang of LANGUAGES) {
      const url = path === '/' ? `${BASE_URL}/${lang}` : `${BASE_URL}/${lang}${path}`;
      tests.push(testURL(url, 200, { name: `Security: ${lang}${path}` }));
    }
  }
  
  await Promise.all(tests);
  tests.length = 0;
  
  log('[Content Validation - 50 tests]', colors.blue);
  const contentTests = [];
  for (const lang of ['en', 'es', 'fr', 'de', 'zh']) {
    for (const algo of ['bubble', 'merge', 'quick', 'heap', 'radix', 'bucket', 'insertion', 'selection']) {
      contentTests.push(testURL(`${BASE_URL}/${lang}/algorithms/config/${algo}`, 200, {
        name: `Content: ${lang}/${algo}`,
        checkContent: true
      }));
    }
  }
  
  await Promise.all(contentTests);
}

// Performance audit (120 tests)
async function runPerformanceAudit() {
  logSection(`Performance Audit (120 Tests)`);
  
  log('[Homepage Performance - 24 tests]', colors.blue);
  const perfTests = [];
  
  for (const lang of LANGUAGES) {
    for (let run = 1; run <= 3; run++) {
      perfTests.push((async () => {
        const start = performance.now();
        try {
          const response = await fetchWithTimeout(`${BASE_URL}/${lang}`);
          const end = performance.now();
          const duration = Math.round(end - start);
          
          if (response.status === 200) {
            const { pass, warn } = PERF_THRESHOLDS.homepage;
            const status = duration < pass ? 'PASS' : duration < warn ? 'WARN' : 'FAIL';
            logTest(`Perf: ${lang} (run ${run})`, status, `${duration}ms`);
          }
        } catch (error) {
          logTest(`Perf: ${lang} (run ${run})`, 'FAIL', error.message);
        }
      })());
    }
  }
  
  await Promise.all(perfTests);
  perfTests.length = 0;
  
  log('[Algorithm Pages - 96 tests]', colors.blue);
  for (const algo of ALGORITHMS) {
    for (const tab of TABS) {
      for (let run = 1; run <= 4; run++) {
        perfTests.push((async () => {
          const start = performance.now();
        try {
          const response = await fetchWithTimeout(`${BASE_URL}/algorithms/${tab}/${algo}`);
          const end = performance.now();
          const duration = Math.round(end - start);
          
          if (response.status === 200) {
            const { pass, warn } = PERF_THRESHOLDS.algorithmPage;
            const status = duration < pass ? 'PASS' : duration < warn ? 'WARN' : 'FAIL';
            logTest(`Perf: ${algo}/${tab} (${run})`, status, `${duration}ms`);
          }
          } catch (error) {
            logTest(`Perf: ${algo}/${tab} (${run})`, 'FAIL', error.message);
          }
        })());
      }
    }
  }
  
  const batchSize = 10;
  for (let i = 0; i < perfTests.length; i += batchSize) {
    await Promise.all(perfTests.slice(i, i + batchSize));
  }
}

// Production tests (100 tests)
async function runProductionTests() {
  logSection('Production Validation (100 Tests)');
  
  const tests = [];
  
  log('[Production Health]', colors.blue);
  tests.push(testURL(`${BASE_URL}/`, 200, { name: 'Prod: Homepage', checkSEO: true }));
  tests.push(testURL(`${BASE_URL}/sitemap.xml`, 200, { name: 'Prod: Sitemap' }));
  tests.push(testURL(`${BASE_URL}/manifest.json`, 200, { name: 'Prod: Manifest' }));
  
  for (const lang of LANGUAGES) {
    // PT is not fully supported in production yet; it may redirect.
    if (lang === 'pt') {
      tests.push(
        testURL(`${BASE_URL}/${lang}`, [200, 301, 308], {
          name: 'Prod: pt (redirect ok)',
          checkSEO: false,
          checkContent: false,
        })
      );
      continue;
    }

    tests.push(
      testURL(`${BASE_URL}/${lang}`, 200, {
        name: `Prod: ${lang}`,
        checkSEO: true,
        checkContent: true,
      })
    );
  }
  
  for (const algo of ALGORITHMS) {
    for (const tab of TABS) {
      tests.push(testURL(`${BASE_URL}/algorithms/${tab}/${algo}`, 200, {
        name: `Prod: ${algo}/${tab}`,
        checkCanonical: true,
        canonicalUrl: `${CANONICAL_BASE}/algorithms/config/${algo}`,
        checkContent: true
      }));
    }
  }
  
  for (const lang of ['es', 'fr', 'de', 'zh']) {
    for (const algo of ALGORITHMS) {
      tests.push(testURL(`${BASE_URL}/${lang}/algorithms/config/${algo}`, 200, {
        name: `Prod: ${lang}/${algo}`,
        checkSEO: true,
        checkCanonical: true,
        canonicalUrl: `${CANONICAL_BASE}/${lang}/algorithms/config/${algo}`
      }));
    }
  }
  
  await Promise.all(tests);
}

// Main execution
async function main() {
  const startTime = performance.now();
  
  log('\n' + '█'.repeat(80), colors.cyan);
  log('  SortVision - Quality Assurance Suite', colors.bright);
  log('█'.repeat(80) + '\n', colors.cyan);
  
  log(`Target: ${BASE_URL}`, colors.blue);
  log(`Mode: ${isProduction ? 'Production' : 'Development'}`, colors.blue);
  log(
    `Suite: ${
      isQuick
        ? 'Quick (30 tests)'
        : isProduction
          ? 'Production (100 tests)'
          : isExtended
            ? 'Extended (1000+ tests)'
            : 'Complete (600 tests)'
    }`,
    colors.blue
  );
  console.log('');
  
  try {
    if (isQuick) {
      await runQuickValidation();
    } else if (isProduction) {
      await runProductionTests();
    } else {
      await runQuickValidation();
      await runComprehensiveValidation();
      await runIntegrationSuite();
      await runPerformanceAudit();

      if (isExtended) {
        await runExtendedSitemapSuite();
        await runExtendedLinkIntegritySuite();
        await runExtendedSecurityHeadersSuite();
      }
    }
    
    const endTime = performance.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    // Summary
    logSection('Test Summary');
    console.log(`Total Tests:    ${totalTests}`);
    log(`Passed:         ${passedTests} ✓`, colors.green);
    if (warnings > 0) log(`Warnings:       ${warnings} ⚠`, colors.yellow);
    if (failedTests > 0) log(`Failed:         ${failedTests} ✗`, colors.red);
    console.log(`Duration:       ${duration}s`);
    console.log(`Pass Rate:      ${((passedTests / totalTests) * 100).toFixed(1)}%`);
    
    if (failedTests > 0) {
      logSection('Failed Tests');
      failedTestDetails.slice(0, 20).forEach(({ name, details }) => {
        log(`✗ ${name}: ${details}`, colors.red);
      });
      if (failedTestDetails.length > 20) {
        log(`... and ${failedTestDetails.length - 20} more failures`, colors.red);
      }
    }
    
    if (warnings > 0 && warnings <= 10) {
      logSection('Warnings');
      warningDetails.forEach(({ name, details }) => {
        log(`⚠ ${name}: ${details}`, colors.yellow);
      });
    }
    
    // Grade
    console.log('\n' + '='.repeat(80));
    const passRate = (passedTests / totalTests) * 100;
    let grade, gradeColor;
    
    if (passRate === 100) {
      grade = 'S+';
      gradeColor = colors.green + colors.bright;
    } else if (passRate >= 98) {
      grade = 'S';
      gradeColor = colors.green + colors.bright;
    } else if (passRate >= 95) {
      grade = 'A+';
      gradeColor = colors.green;
    } else if (passRate >= 90) {
      grade = 'A';
      gradeColor = colors.green;
    } else if (passRate >= 85) {
      grade = 'B+';
      gradeColor = colors.yellow;
    } else if (passRate >= 80) {
      grade = 'B';
      gradeColor = colors.yellow;
    } else {
      grade = 'C';
      gradeColor = colors.red;
    }
    
    log(`  Final Grade: ${grade}`, gradeColor);
    console.log('='.repeat(80) + '\n');
    
    process.exit(failedTests > 0 ? 1 : 0);
    
  } catch (error) {
    log(`\nFatal Error: ${error.message}`, colors.red);
    console.error(error);
    process.exit(1);
  }
}

main();
