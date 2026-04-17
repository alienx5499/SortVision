/**
 * Assembles the payload sent to submitFeedback (telemetry + form fields).
 * Side-effect free aside from reading window/document/localStorage.
 */

function getDeviceInfo() {
  const ua = navigator.userAgent;
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const isTablet = /iPad/i.test(ua) || (isMobile && window.innerWidth > 768);

  return {
    deviceType: isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop',
    isMobile,
    isTablet,
    platform: navigator.platform || 'Unknown',
    vendor: navigator.vendor || 'Unknown',
    cookieEnabled: navigator.cookieEnabled,
    onlineStatus: navigator.onLine,
    doNotTrack: navigator.doNotTrack || 'Not set',
  };
}

function getNetworkInfo() {
  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;
  return connection
    ? {
        effectiveType: connection.effectiveType || 'Unknown',
        downlink: connection.downlink || 'Unknown',
        rtt: connection.rtt || 'Unknown',
        saveData: connection.saveData || false,
      }
    : {
        effectiveType: 'Unknown',
        downlink: 'Unknown',
        rtt: 'Unknown',
        saveData: false,
      };
}

function getPerformanceInfo() {
  if (performance && performance.timing) {
    const timing = performance.timing;
    return {
      domContentLoaded:
        timing.domContentLoadedEventEnd - timing.navigationStart,
      pageLoad: timing.loadEventEnd - timing.navigationStart,
      dnsLookup: timing.domainLookupEnd - timing.domainLookupStart,
      tcpConnect: timing.connectEnd - timing.connectStart,
      serverResponse: timing.responseEnd - timing.requestStart,
    };
  }
  return null;
}

function getBrowserCapabilities() {
  return {
    localStorage: typeof Storage !== 'undefined',
    sessionStorage: typeof Storage !== 'undefined',
    webGL: !!window.WebGLRenderingContext,
    touchSupport: 'ontouchstart' in window,
    geolocation: 'geolocation' in navigator,
    webWorkers: typeof Worker !== 'undefined',
    websockets: 'WebSocket' in window,
    indexedDB: 'indexedDB' in window,
    serviceWorker: 'serviceWorker' in navigator,
    pushNotifications: 'PushManager' in window,
  };
}

function getPageContext() {
  return {
    url: window.location.href,
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
    referrer: document.referrer || 'Direct access',
    title: document.title,
    scrollPosition: {
      x: window.pageXOffset || window.scrollX,
      y: window.pageYOffset || window.scrollY,
    },
    documentHeight: Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    ),
  };
}

function getMemoryInfo() {
  if (performance && performance.memory) {
    return {
      usedJSHeapSize: Math.round(performance.memory.usedJSHeapSize / 1048576),
      totalJSHeapSize: Math.round(performance.memory.totalJSHeapSize / 1048576),
      jsHeapSizeLimit: Math.round(performance.memory.jsHeapSizeLimit / 1048576),
    };
  }
  return null;
}

function getErrorHistory() {
  const errors = [];
  try {
    const storedErrors = localStorage.getItem('sortvision_error_log');
    if (storedErrors) {
      errors.push(...JSON.parse(storedErrors));
    }
  } catch {
    // ignore
  }
  return errors.slice(-5);
}

function getFeatureUsage() {
  try {
    const usage = localStorage.getItem('sortvision_feature_usage');
    return usage ? JSON.parse(usage) : null;
  } catch {
    return null;
  }
}

function getAccessibilityInfo() {
  return {
    reduceMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    highContrast: window.matchMedia('(prefers-contrast: high)').matches,
    darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
    forcedColors: window.matchMedia('(forced-colors: active)').matches,
  };
}

export function buildEnhancedFeedbackPayload({
  formData,
  locationData,
  sessionId,
  timeSpentOnSite,
  persistentSessionStart,
  appLocale,
}) {
  return {
    ...formData,
    locationData,
    sessionData: {
      sessionId,
      timeSpentOnSite,
      sessionStartTime: new Date(persistentSessionStart).toISOString(),
      submissionTime: new Date().toISOString(),
      userAgent: navigator.userAgent,
      screenResolution: `${screen.width}x${screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      language: navigator.language,
      appLocale,
      languages: navigator.languages || [navigator.language],
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      colorDepth: screen.colorDepth,
      pixelRatio: window.devicePixelRatio || 1,
    },
    deviceInfo: getDeviceInfo(),
    networkInfo: getNetworkInfo(),
    performanceInfo: getPerformanceInfo(),
    browserCapabilities: getBrowserCapabilities(),
    pageContext: getPageContext(),
    memoryInfo: getMemoryInfo(),
    errorHistory: getErrorHistory(),
    featureUsage: getFeatureUsage(),
    accessibilityInfo: getAccessibilityInfo(),
  };
}
