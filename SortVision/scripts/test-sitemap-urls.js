#!/usr/bin/env node

/**
 * Sitemap URL Tester
 * 
 * This script tests all URLs in the sitemap to ensure:
 * - They return 200 OK status
 * - They don't redirect (3xx status codes)
 * - They load successfully
 * 
 * Usage: node scripts/test-sitemap-urls.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Configuration
const SITEMAP_PATH = path.join(__dirname, '..', 'public', 'sitemap.xml');
const MAX_CONCURRENT_REQUESTS = 10; // Limit concurrent requests to avoid rate limiting
const REQUEST_TIMEOUT = 10000; // 10 seconds timeout
const DELAY_BETWEEN_BATCHES = 1000; // 1 second delay between batches

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

/**
 * Parse sitemap XML and extract URLs
 */
function extractUrlsFromSitemap(sitemapContent) {
  const urlRegex = /<loc>(.*?)<\/loc>/g;
  const urls = [];
  let match;
  
  while ((match = urlRegex.exec(sitemapContent)) !== null) {
    urls.push(match[1]);
  }
  
  return urls;
}

/**
 * Test a single URL
 */
function testUrl(url) {
  return new Promise((resolve) => {
    const urlObj = new URL(url);
    const protocol = urlObj.protocol === 'https:' ? https : http;
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'User-Agent': 'SortVision-Sitemap-Tester/1.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      timeout: REQUEST_TIMEOUT,
    };
    
    const startTime = Date.now();
    
    const req = protocol.request(options, (res) => {
      const responseTime = Date.now() - startTime;
      
      // Check for redirects
      const isRedirect = res.statusCode >= 300 && res.statusCode < 400;
      const redirectLocation = res.headers.location || 'N/A';
      
      // Consume response data to free up memory
      res.on('data', () => {});
      res.on('end', () => {
        resolve({
          url,
          statusCode: res.statusCode,
          isRedirect,
          redirectLocation,
          responseTime,
          success: res.statusCode === 200,
          error: null,
        });
      });
    });
    
    req.on('error', (error) => {
      resolve({
        url,
        statusCode: null,
        isRedirect: false,
        redirectLocation: null,
        responseTime: Date.now() - startTime,
        success: false,
        error: error.message,
      });
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve({
        url,
        statusCode: null,
        isRedirect: false,
        redirectLocation: null,
        responseTime: REQUEST_TIMEOUT,
        success: false,
        error: 'Request timeout',
      });
    });
    
    req.end();
  });
}

/**
 * Test URLs in batches
 */
async function testUrlsInBatches(urls, batchSize = MAX_CONCURRENT_REQUESTS) {
  const results = [];
  const batches = [];
  
  // Split URLs into batches
  for (let i = 0; i < urls.length; i += batchSize) {
    batches.push(urls.slice(i, i + batchSize));
  }
  
  console.log(`${colors.cyan}Testing ${urls.length} URLs in ${batches.length} batches of ${batchSize}...${colors.reset}\n`);
  
  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    const batchNumber = i + 1;
    
    process.stdout.write(`${colors.blue}[Batch ${batchNumber}/${batches.length}]${colors.reset} Testing ${batch.length} URLs... `);
    
    const batchResults = await Promise.all(batch.map(url => testUrl(url)));
    results.push(...batchResults);
    
    const successCount = batchResults.filter(r => r.success).length;
    console.log(`${colors.green}[OK] ${successCount}/${batch.length} successful${colors.reset}`);
    
    // Delay between batches to avoid rate limiting
    if (i < batches.length - 1) {
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_BATCHES));
    }
  }
  
  return results;
}

/**
 * Generate report from test results
 */
function generateReport(results) {
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  const redirects = results.filter(r => r.isRedirect);
  const errors = results.filter(r => r.error);
  
  console.log('\n' + '='.repeat(80));
  console.log(`${colors.cyan}SITEMAP URL TEST REPORT${colors.reset}`);
  console.log('='.repeat(80) + '\n');
  
  // Summary
  console.log(`${colors.blue}SUMMARY${colors.reset}`);
  console.log(`Total URLs tested: ${results.length}`);
  console.log(`${colors.green}[OK] Successful (200 OK): ${successful.length}${colors.reset}`);
  console.log(`${colors.red}[FAILED] Failed: ${failed.length}${colors.reset}`);
  console.log(`${colors.yellow}[WARN] Redirects: ${redirects.length}${colors.reset}`);
  console.log(`${colors.red}[ERROR] Errors: ${errors.length}${colors.reset}`);
  
  // Performance stats
  const avgResponseTime = results.reduce((sum, r) => sum + r.responseTime, 0) / results.length;
  const maxResponseTime = Math.max(...results.map(r => r.responseTime));
  const minResponseTime = Math.min(...results.map(r => r.responseTime));
  
  console.log(`\n${colors.blue}PERFORMANCE${colors.reset}`);
  console.log(`Average response time: ${avgResponseTime.toFixed(2)}ms`);
  console.log(`Min response time: ${minResponseTime}ms`);
  console.log(`Max response time: ${maxResponseTime}ms`);
  
  // Redirects
  if (redirects.length > 0) {
    console.log(`\n${colors.yellow}[WARN] REDIRECTS (${redirects.length})${colors.reset}`);
    console.log('These URLs are redirecting and should be updated in the sitemap:\n');
    redirects.forEach((result, index) => {
      console.log(`${index + 1}. ${result.url}`);
      console.log(`   Status: ${result.statusCode}`);
      console.log(`   Redirects to: ${result.redirectLocation}\n`);
    });
  }
  
  // Errors
  if (errors.length > 0) {
    console.log(`\n${colors.red}[ERROR] ERRORS (${errors.length})${colors.reset}`);
    console.log('These URLs encountered errors:\n');
    errors.forEach((result, index) => {
      console.log(`${index + 1}. ${result.url}`);
      console.log(`   Status: ${result.statusCode || 'N/A'}`);
      console.log(`   Error: ${result.error}\n`);
    });
  }
  
  // Status code distribution
  const statusCodes = {};
  results.forEach(r => {
    const code = r.statusCode || 'ERROR';
    statusCodes[code] = (statusCodes[code] || 0) + 1;
  });
  
  console.log(`\n${colors.blue}STATUS CODE DISTRIBUTION${colors.reset}`);
  Object.entries(statusCodes)
    .sort((a, b) => b[1] - a[1])
    .forEach(([code, count]) => {
      const color = code === '200' ? colors.green : code.startsWith('3') ? colors.yellow : colors.red;
      console.log(`${color}${code}: ${count}${colors.reset}`);
    });
  
  console.log('\n' + '='.repeat(80) + '\n');
  
  // Exit code based on results
  return {
    success: failed.length === 0 && redirects.length === 0,
    redirectCount: redirects.length,
    errorCount: errors.length,
  };
}

/**
 * Save results to JSON file
 */
function saveResults(results, outputPath) {
  const reportData = {
    timestamp: new Date().toISOString(),
    totalUrls: results.length,
    successful: results.filter(r => r.success).length,
    failed: results.filter(r => !r.success).length,
    redirects: results.filter(r => r.isRedirect).length,
    errors: results.filter(r => r.error).length,
    results,
  };
  
  fs.writeFileSync(outputPath, JSON.stringify(reportData, null, 2), 'utf8');
  console.log(`${colors.green}[OK] Results saved to: ${outputPath}${colors.reset}`);
}

/**
 * Main execution
 */
async function main() {
  console.log(`${colors.cyan}Starting Sitemap URL Testing...${colors.reset}\n`);
  
  try {
    // Read sitemap
    if (!fs.existsSync(SITEMAP_PATH)) {
      console.error(`${colors.red}[ERROR] Sitemap not found at ${SITEMAP_PATH}${colors.reset}`);
      console.log(`${colors.yellow}Run 'node scripts/generate-sitemap.js' first to generate the sitemap.${colors.reset}`);
      process.exit(1);
    }
    
    const sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf8');
    const urls = extractUrlsFromSitemap(sitemapContent);
    
    if (urls.length === 0) {
      console.error(`${colors.red}[ERROR] No URLs found in sitemap${colors.reset}`);
      process.exit(1);
    }
    
    console.log(`${colors.green}[OK] Found ${urls.length} URLs in sitemap${colors.reset}\n`);
    
    // Test URLs
    const results = await testUrlsInBatches(urls);
    
    // Generate report
    const report = generateReport(results);
    
    // Save results
    const outputPath = path.join(__dirname, '..', 'sitemap-test-results.json');
    saveResults(results, outputPath);
    
    // Exit with appropriate code
    if (!report.success) {
      console.log(`${colors.red}[FAILED] Tests failed: ${report.errorCount} errors, ${report.redirectCount} redirects${colors.reset}`);
      process.exit(1);
    } else {
      console.log(`${colors.green}[SUCCESS] All tests passed successfully!${colors.reset}`);
      process.exit(0);
    }
    
  } catch (error) {
    console.error(`${colors.red}[FATAL] Fatal error: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { testUrl, extractUrlsFromSitemap };
