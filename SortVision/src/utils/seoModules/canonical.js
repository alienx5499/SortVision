/**
 * Canonical URL and path normalization helpers.
 */

import { algorithms } from './constants';

/**
 * Format SEO title based on page type
 * @param {string} algorithm - Optional algorithm name
 * @returns {string} - Formatted page title
 */
export const formatPageTitle = (algorithm = null) => {
  if (algorithm && algorithms[algorithm]) {
    return `${algorithms[algorithm].name} Visualizer | SortVision - Learn How ${algorithms[algorithm].name} Works`;
  }
  return 'SortVision | Interactive Sorting Algorithm Visualizer & Learning Tool';
};

export const generateCanonicalUrl = pathname => {
  const baseUrl = 'https://www.sortvision.com';

  // Clean pathname - remove trailing slashes and ensure proper format
  let cleanPath = pathname.replace(/\/+$/, '') || '/';

  // Remove any query parameters and hash fragments for canonical URL
  cleanPath = cleanPath.split('?')[0].split('#')[0];

  // Handle new path-based routing structure
  const pathParts = cleanPath.split('/').filter(Boolean);

  // Handle algorithm paths with tab structure: /algorithms/{tab}/{algorithm}
  if (pathParts[0] === 'algorithms') {
    if (pathParts.length === 3) {
      // Format: /algorithms/config/bubble or /algorithms/details/bubble
      const tab = pathParts[1];
      const algorithmParam = pathParts[2];
      const validTabs = ['config', 'details', 'metrics'];
      const validAlgorithms = Object.keys(algorithms);

      if (
        validTabs.includes(tab) &&
        validAlgorithms.includes(algorithmParam.toLowerCase())
      ) {
        cleanPath = `/algorithms/${tab}/${algorithmParam.toLowerCase()}`;
      } else {
        cleanPath = '/';
      }
    } else if (pathParts.length === 2) {
      // Legacy format: /algorithms/bubble -> redirect to /algorithms/config/bubble
      const algorithmParam = pathParts[1];
      const validAlgorithms = Object.keys(algorithms);
      if (validAlgorithms.includes(algorithmParam.toLowerCase())) {
        cleanPath = `/algorithms/config/${algorithmParam.toLowerCase()}`;
      } else {
        cleanPath = '/';
      }
    } else {
      cleanPath = '/';
    }
  }
  // Handle contribution paths: /contributions/{section}
  else if (pathParts[0] === 'contributions') {
    if (pathParts.length === 2) {
      const section = pathParts[1];
      const validSections = ['overview', 'guide', 'ssoc'];
      if (validSections.includes(section)) {
        cleanPath = `/contributions/${section}`;
      } else {
        cleanPath = '/contributions/overview';
      }
    } else if (pathParts.length === 1) {
      cleanPath = '/contributions/overview';
    }
  }

  // Handle edge cases for common URL variations
  const urlMappings = {
    '/index': '/',
    '/home': '/',
    '/index.html': '/',
    '/main': '/',
    '/sorting': '/',
    '/visualizer': '/',
    '/contribute': '/contributions/overview',
    '/contributors': '/contributions/overview',
  };

  if (urlMappings[cleanPath]) {
    cleanPath = urlMappings[cleanPath];
  }

  // Always return clean URL
  return `${baseUrl}${cleanPath}`;
};

/**
 * Validate if a URL path is canonical
 * @param {string} pathname - The pathname to validate
 * @returns {boolean} - Whether the path is in canonical format
 */
export const isCanonicalPath = pathname => {
  const canonical = generateCanonicalUrl(pathname);
  const current = `https://www.sortvision.com${pathname}`;
  return canonical === current;
};
