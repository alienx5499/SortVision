/**
 * Mirrors devTools / index.html: ?cr7=goat on non-production hosts only.
 */
export function shouldAllowSortVisionVerboseLogging() {
  const urlParams = new URLSearchParams(window.location.search);
  const hasDebugParam = urlParams.get('cr7') === 'goat';

  const hostname = window.location.hostname.toLowerCase();
  const isProductionDomain =
    hostname.endsWith('.vercel.app') ||
    hostname === 'vercel.app' ||
    hostname.endsWith('.netlify.app') ||
    hostname === 'netlify.app' ||
    hostname.endsWith('.github.io') ||
    hostname === 'github.io' ||
    hostname.endsWith('.sortvision.com') ||
    hostname === 'sortvision.com';

  if (isProductionDomain && hasDebugParam) {
    console.log(
      '%c SortVision DevTools Access Denied\n DevTools not available in production',
      'background: #991b1b; color: #ffffff; padding: 6px 10px; border-radius: 4px; font-weight: bold; font-size: 14px; border-left: 3px solid #f87171;'
    );
    return false;
  }

  return process.env.NODE_ENV !== 'production' || hasDebugParam;
}
