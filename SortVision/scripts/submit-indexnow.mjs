#!/usr/bin/env node

/**
 * IndexNow Submission Script
 * 
 * Submits URLs to IndexNow for instant search engine indexing
 * Usage: node scripts/submit-indexnow.mjs [url1] [url2] ...
 * Or: node scripts/submit-indexnow.mjs --sitemap (submits sitemap URL)
 */

const INDEXNOW_API_KEY = '462fc979d8fd41159a1b91439815fa3e';
const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/IndexNow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow',
];
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sortvision.com';

async function submitToIndexNow(urls) {
  const urlList = Array.isArray(urls) ? urls : [urls];
  
  // Validate and normalize URLs
  const validUrls = urlList
    .map(url => {
      if (url.startsWith('/')) {
        return `${BASE_URL}${url}`;
      }
      if (!url.startsWith('http')) {
        return `${BASE_URL}/${url}`;
      }
      return url;
    })
    .filter(url => {
      try {
        const parsed = new URL(url);
        return parsed.hostname === 'www.sortvision.com' || parsed.hostname === 'sortvision.com';
      } catch {
        return false;
      }
    });

  if (validUrls.length === 0) {
    throw new Error('No valid URLs to submit');
  }

  const keyLocation = `${BASE_URL}/${INDEXNOW_API_KEY}.txt`;
  const payload = {
    host: new URL(BASE_URL).hostname,
    key: INDEXNOW_API_KEY,
    keyLocation: keyLocation,
    urlList: validUrls,
  };

  const results = [];
  
  for (const endpoint of INDEXNOW_ENDPOINTS) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      // 200 and 202 are both success codes for IndexNow
      const success = response.status === 200 || response.status === 202;
      results.push({
        endpoint,
        status: response.status,
        success: success,
        message: success ? 'Submitted successfully' : `HTTP ${response.status}`,
      });
    } catch (error) {
      results.push({
        endpoint,
        status: 0,
        success: false,
        message: error.message,
      });
    }
  }

  const successCount = results.filter(r => r.success).length;
  
  return {
    success: successCount > 0,
    urlCount: validUrls.length,
    results,
    submittedUrls: validUrls,
  };
}

async function submitSitemapToIndexNow() {
  const sitemapUrl = `${BASE_URL}/sitemap.xml`;
  return submitToIndexNow(sitemapUrl);
}

async function main() {
  try {
    const args = process.argv.slice(2);

    if (args.includes('--sitemap') || args.includes('-s')) {
      console.log('Submitting sitemap to IndexNow...');
      const result = await submitSitemapToIndexNow();
      
      if (result.success) {
        console.log('SUCCESS: Sitemap submitted successfully!');
        console.log(`   Submitted to ${result.results.filter(r => r.success).length}/${result.results.length} endpoint(s)`);
        result.results.forEach(r => {
          console.log(`   - ${r.endpoint}: ${r.message}`);
        });
      } else {
        console.error('ERROR: Failed to submit sitemap');
        result.results.forEach(r => {
          console.error(`   - ${r.endpoint}: ${r.message}`);
        });
        process.exit(1);
      }
    } else if (args.length > 0) {
      console.log(`Submitting ${args.length} URL(s) to IndexNow...`);
      const result = await submitToIndexNow(args);
      
      if (result.success) {
        console.log('SUCCESS: URLs submitted successfully!');
        console.log(`   Submitted ${result.urlCount} URL(s)`);
        console.log(`   Success on ${result.results.filter(r => r.success).length}/${result.results.length} endpoint(s)`);
        result.results.forEach(r => {
          console.log(`   - ${r.endpoint}: ${r.message}`);
        });
      } else {
        console.error('ERROR: Failed to submit URLs');
        result.results.forEach(r => {
          console.error(`   - ${r.endpoint}: ${r.message}`);
        });
        process.exit(1);
      }
    } else {
      console.log('IndexNow Submission Script');
      console.log('');
      console.log('Usage:');
      console.log('  node scripts/submit-indexnow.mjs --sitemap    Submit sitemap URL');
      console.log('  node scripts/submit-indexnow.mjs <url1> [url2] ...    Submit specific URLs');
      console.log('');
      console.log('Examples:');
      console.log('  node scripts/submit-indexnow.mjs --sitemap');
      console.log('  node scripts/submit-indexnow.mjs https://www.sortvision.com/');
      console.log('  node scripts/submit-indexnow.mjs /algorithms/config/bubble /algorithms/config/merge');
      process.exit(0);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
