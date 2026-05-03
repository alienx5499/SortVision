/**
 * Assembles the payload sent to submitFeedback (telemetry + form fields).
 * Browser-only: call from client components / hooks only.
 */

import type {
  BuildEnhancedFeedbackPayloadInput,
  EnhancedFeedbackPayload,
  FeedbackAccessibilityInfo,
  FeedbackBrowserCapabilities,
  FeedbackDeviceInfo,
  FeedbackErrorLogEntry,
  FeedbackMemoryInfo,
  FeedbackNetworkInfo,
  FeedbackPageContext,
  FeedbackPerformanceInfo,
} from '../types';

type NavigatorNetworkInfo = {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
};

interface PerformanceWithMemory extends Performance {
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

function getDeviceInfo(): FeedbackDeviceInfo {
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

function getNetworkInfo(): FeedbackNetworkInfo {
  const nav = navigator as Navigator & {
    connection?: NavigatorNetworkInfo;
    mozConnection?: NavigatorNetworkInfo;
    webkitConnection?: NavigatorNetworkInfo;
  };
  const connection =
    nav.connection || nav.mozConnection || nav.webkitConnection;
  return connection
    ? {
        effectiveType: connection.effectiveType || 'Unknown',
        downlink: connection.downlink ?? 'Unknown',
        rtt: connection.rtt ?? 'Unknown',
        saveData: connection.saveData || false,
      }
    : {
        effectiveType: 'Unknown',
        downlink: 'Unknown',
        rtt: 'Unknown',
        saveData: false,
      };
}

function getPerformanceInfo(): FeedbackPerformanceInfo | null {
  const perf = performance as Performance & { timing?: PerformanceTiming };
  const timing = perf.timing;
  if (timing) {
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

function getBrowserCapabilities(): FeedbackBrowserCapabilities {
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

function getPageContext(): FeedbackPageContext {
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

function getMemoryInfo(): FeedbackMemoryInfo | null {
  const perf = performance as PerformanceWithMemory;
  if (perf.memory) {
    return {
      usedJSHeapSize: Math.round(perf.memory.usedJSHeapSize / 1048576),
      totalJSHeapSize: Math.round(perf.memory.totalJSHeapSize / 1048576),
      jsHeapSizeLimit: Math.round(perf.memory.jsHeapSizeLimit / 1048576),
    };
  }
  return null;
}

function getErrorHistory(): FeedbackErrorLogEntry[] {
  const errors: FeedbackErrorLogEntry[] = [];
  try {
    const storedErrors = localStorage.getItem('sortvision_error_log');
    if (storedErrors) {
      const parsed = JSON.parse(storedErrors) as unknown;
      if (Array.isArray(parsed)) {
        errors.push(...(parsed as FeedbackErrorLogEntry[]));
      }
    }
  } catch {
    // ignore malformed log
  }
  return errors.slice(-5);
}

function getFeatureUsage(): Record<string, unknown> | null {
  try {
    const usage = localStorage.getItem('sortvision_feature_usage');
    if (!usage) return null;
    const parsed = JSON.parse(usage) as unknown;
    return typeof parsed === 'object' &&
      parsed !== null &&
      !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

function getAccessibilityInfo(): FeedbackAccessibilityInfo {
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
}: BuildEnhancedFeedbackPayloadInput): EnhancedFeedbackPayload {
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
      languages: navigator.languages
        ? [...navigator.languages]
        : [navigator.language],
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
