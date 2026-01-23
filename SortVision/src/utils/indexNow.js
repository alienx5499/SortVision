/**
 * IndexNow Utility
 *
 * Submits URLs to IndexNow protocol for instant search engine indexing
 * Supports Bing, Yandex, and other IndexNow-compatible search engines
 */

// IndexNow API key - must be publicly accessible via URL
// The key file must exist at: https://www.sortvision.com/{KEY}.txt
// This is NOT a secret - it's required to be public by IndexNow protocol
const INDEXNOW_API_KEY = '462fc979d8fd41159a1b91439815fa3e';
const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/IndexNow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow',
];
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sortvision.com';

/**
 * Submit a single URL or array of URLs to IndexNow
 * @param {string|string[]} urls - Single URL or array of URLs to submit
 * @param {Object} options - Additional options
 * @returns {Promise<{success: boolean, results: Array}>}
 */
export async function submitToIndexNow(urls, options = {}) {
  const urlList = Array.isArray(urls) ? urls : [urls];

  // Validate URLs
  const validUrls = urlList
    .map(url => {
      // If URL is relative, make it absolute
      if (url.startsWith('/')) {
        return `${BASE_URL}${url}`;
      }
      // If URL doesn't start with http, assume it's relative
      if (!url.startsWith('http')) {
        return `${BASE_URL}/${url}`;
      }
      return url;
    })
    .filter(url => {
      try {
        const parsed = new URL(url);
        return (
          parsed.hostname === 'www.sortvision.com' ||
          parsed.hostname === 'sortvision.com'
        );
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

  // Submit to all IndexNow endpoints in parallel
  const promises = INDEXNOW_ENDPOINTS.map(async endpoint => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      const status = response.status;
      // 200 and 202 are both success codes for IndexNow
      const success = status === 200 || status === 202;

      results.push({
        endpoint,
        status,
        success,
        message: success ? 'Submitted successfully' : `HTTP ${status}`,
      });

      if (!success && process.env.NODE_ENV === 'development') {
        console.warn(`IndexNow submission failed to ${endpoint}:`, status);
      }
    } catch (error) {
      results.push({
        endpoint,
        status: 0,
        success: false,
        message: error.message,
        error: error.name,
      });

      if (process.env.NODE_ENV === 'development') {
        console.error(`IndexNow submission error to ${endpoint}:`, error);
      }
    }
  });

  await Promise.allSettled(promises);

  const successCount = results.filter(r => r.success).length;
  const overallSuccess = successCount > 0;

  if (options.log !== false) {
    console.log(
      `[IndexNow] Submitted ${validUrls.length} URL(s) to ${successCount}/${INDEXNOW_ENDPOINTS.length} endpoint(s)`
    );
  }

  return {
    success: overallSuccess,
    urlCount: validUrls.length,
    results,
    submittedUrls: validUrls,
  };
}

/**
 * Submit sitemap URL to IndexNow
 */
export async function submitSitemapToIndexNow() {
  const sitemapUrl = `${BASE_URL}/sitemap.xml`;
  return submitToIndexNow(sitemapUrl, { log: true });
}

/**
 * Submit all URLs from sitemap to IndexNow
 * Note: This should be used sparingly as it can be rate-limited
 */
export async function submitAllSitemapUrlsToIndexNow() {
  try {
    // In a real implementation, you'd parse the sitemap.xml
    // For now, we'll submit the sitemap URL itself
    // Search engines will crawl the sitemap and index all URLs
    return await submitSitemapToIndexNow();
  } catch (error) {
    console.error('[IndexNow] Error submitting sitemap URLs:', error);
    throw error;
  }
}

/**
 * Submit a single page URL when it's created/updated
 * @param {string} path - Page path (e.g., '/algorithms/config/bubble')
 */
export async function notifyPageUpdate(path) {
  const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;
  return submitToIndexNow(url, { log: process.env.NODE_ENV === 'development' });
}
