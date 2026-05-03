/**
 * Canonical URL and path normalization helpers.
 */

import { algorithms } from './constants';
import { buildCanonicalUrl, normalizeCanonicalPath } from '@/config/canonical';

/**
 * Format SEO title based on page type
 * @param {string} algorithm - Optional algorithm name
 * @returns {string} - Formatted page title
 */
export const formatPageTitle = (algorithm: string | null = null) => {
  if (
    !algorithm ||
    !Object.prototype.hasOwnProperty.call(algorithms, algorithm)
  ) {
    return 'SortVision | Interactive Sorting Algorithm Visualizer & Learning Tool';
  }
  const meta = algorithms[algorithm as keyof typeof algorithms];
  return `${meta.name} Visualizer | SortVision - Learn How ${meta.name} Works`;
};

export const generateCanonicalUrl = (pathname: string) => {
  const cleanedPath = normalizeCanonicalPath(pathname);

  // Handle edge cases for common URL variations not handled by shared policy
  const urlMappings: Record<string, string> = {
    '/index': '/',
    '/home': '/',
    '/index.html': '/',
    '/main': '/',
    '/sorting': '/',
    '/visualizer': '/',
    '/contribute': '/contributions/overview',
    '/contributors': '/contributions/overview',
  };

  const mappedPath = urlMappings[cleanedPath] || cleanedPath;

  if (mappedPath.startsWith('/algorithms/')) {
    const pathParts = mappedPath.split('/').filter(Boolean);
    const maybeAlgorithm = pathParts[pathParts.length - 1];
    const validAlgorithms = Object.keys(algorithms);
    if (
      maybeAlgorithm &&
      !validAlgorithms.includes(maybeAlgorithm.toLowerCase())
    ) {
      return buildCanonicalUrl('/');
    }
  }

  return buildCanonicalUrl(mappedPath);
};

/**
 * Validate if a URL path is canonical
 * @param {string} pathname - The pathname to validate
 * @returns {boolean} - Whether the path is in canonical format
 */
export const isCanonicalPath = (pathname: string) => {
  const canonical = generateCanonicalUrl(pathname);
  const current = `https://www.sortvision.com${pathname}`;
  return canonical === current;
};
