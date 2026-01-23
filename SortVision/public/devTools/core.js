/**
 * SortVision Debug Tools - Core Module
 *
 * This module contains shared data and utilities for the debug tools
 */

// Global state for performance data
export const PERF_DATA = {};

// Frame tracking for FPS calculations
export const lastFrameTime = { value: performance.now() };
export const frameCount = { value: 0 };

// Device constants
export const IS_MOBILE =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
export const IS_IOS =
  /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
export const IS_ANDROID = /Android/i.test(navigator.userAgent);

/**
 * Add styles to the document
 * @param {string} css - CSS rules to add
 */
export function addStyles(css) {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
  return style;
}

/**
 * Format file size in a human-readable way
 * @param {number} bytes - Size in bytes
 * @returns {string} Formatted size with unit
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
}

/**
 * Format time in a human-readable way
 * @param {number} ms - Time in milliseconds
 * @returns {string} Formatted time with appropriate unit
 */
export function formatTime(ms) {
  if (ms < 1000) {
    return `${ms.toFixed(1)}ms`;
  } else if (ms < 60000) {
    return `${(ms / 1000).toFixed(1)}s`;
  } else {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}m ${seconds}s`;
  }
}

/**
 * Safe accessor for nested properties that might not exist
 * @param {Object} obj - The object to access
 * @param {string} path - Dot notation path to the property
 * @param {*} defaultValue - Value to return if property doesn't exist
 * @returns {*} The property value or default value
 */
export function getProp(obj, path, defaultValue = undefined) {
  if (!obj || !path) return defaultValue;

  const parts = path.split('.');
  let current = obj;

  for (const part of parts) {
    if (
      current === null ||
      current === undefined ||
      typeof current !== 'object'
    ) {
      return defaultValue;
    }
    current = current[part];
  }

  return current !== undefined ? current : defaultValue;
}

/**
 * Throttle a function to prevent it from being called too frequently
 * @param {Function} func - The function to throttle
 * @param {number} limit - Minimum time between calls (ms)
 * @returns {Function} Throttled function
 */
export function throttle(func, limit) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      return func.apply(this, args);
    }
  };
}

/**
 * Debounce a function to call it only after a certain time has passed
 * @param {Function} func - The function to debounce
 * @param {number} wait - Time to wait (ms)
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * Debug log that persists even in production builds
 * @param {string} message - Message to log
 * @param {string} type - Log type (log, warn, error, info)
 * @param {Object} styles - Optional styles object
 */
export function debugLog(message, type = 'log', styles = {}) {
  // Use bracket notation to avoid minification removing console calls
  if (type === 'info' && message.includes('Initialized')) {
    console[type](
      '%c SortVision DevTools Activated! 🔧',
      'background: #0F172A; color: #64ffda; padding: 6px; border-radius: 4px; font-weight: bold; font-size: 14px;'
    );
    return;
  }

  const defaultStyles = {
    background: '#1e1e1e',
    color: '#4CAF50',
    padding: '2px 4px',
    borderRadius: '2px',
    fontWeight: 'bold',
  };

  const mergedStyles = { ...defaultStyles, ...styles };
  const styleStr = Object.entries(mergedStyles)
    .map(([key, value]) => `${key}: ${value}`)
    .join('; ');

  console[type](`%c SortVision Debug: ${message}`, styleStr);
}

/**
 * Check if a feature is supported in the current browser
 * @param {string} feature - Feature to check
 * @returns {boolean} Whether the feature is supported
 */
export function isSupported(feature) {
  switch (feature) {
    case 'touch':
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    case 'webgl':
      try {
        const canvas = document.createElement('canvas');
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl') ||
            canvas.getContext('experimental-webgl'))
        );
        // eslint-disable-next-line no-unused-vars
      } catch (_e) {
        // Silently handle the error
        return false;
      }
    case 'webgl2':
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
        // eslint-disable-next-line no-unused-vars
      } catch (_e) {
        // Silently handle the error
        return false;
      }
    case 'webworker':
      return !!window.Worker;
    case 'serviceWorker':
      return 'serviceWorker' in navigator;
    case 'webAssembly':
      return typeof WebAssembly === 'object';
    case 'geolocation':
      return 'geolocation' in navigator;
    case 'deviceMotion':
      return 'DeviceMotionEvent' in window;
    case 'deviceOrientation':
      return 'DeviceOrientationEvent' in window;
    case 'indexedDB':
      return !!window.indexedDB;
    case 'battery':
      return 'getBattery' in navigator;
    case 'vibrate':
      return 'vibrate' in navigator;
    case 'bluetooth':
      return 'bluetooth' in navigator;
    case 'share':
      return 'share' in navigator;
    case 'payment':
      return 'PaymentRequest' in window;
    case 'push':
      return 'PushManager' in window;
    case 'mediaDevices':
      return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    default:
      return false;
  }
}

// Create a debug logger that survives minification
const _DEBUG_LOG = function (message, style = null) {
  // Use bracket notation for console methods to prevent removal during minification
  if (typeof window !== 'undefined' && window['console']) {
    // Default style for debug messages
    const defaultStyle =
      'background: #0F172A; color: #64ffda; padding: 6px; border-radius: 4px; font-weight: bold; font-size: 14px;';

    // Use the provided style or default
    const finalStyle = style || defaultStyle;

    // Use bracket notation to access console methods to avoid minification issues
    if (typeof message === 'string') {
      window['console']['log']('%c [SORTVISION-DEBUG] ' + message, finalStyle);
    } else {
      // If not a string, log with a label first, then the object
      window['console']['log']('%c [SORTVISION-DEBUG] ', finalStyle);
      window['console']['log'](message);
    }
  }
};

// Main initialization function
const initDevTools = () => {
  console.log('🔧 initDevTools called');
  console.log('📍 Current URL:', window.location.href);
  console.log('🏠 Hostname:', window.location.hostname);

  // More reliable check for debug parameter that works in all environments
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  // Check if we have the debug parameter using a more reliable method
  const debugParam = getQueryParam('cr7');
  const debugRequested = debugParam === 'goat';
  console.log('🔑 Debug param:', debugParam, 'Requested:', debugRequested);

  // Check if we're on localhost (any port)
  const isLocalhost =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.startsWith('192.168.') ||
    window.location.hostname.startsWith('10.') ||
    window.location.hostname.startsWith('172.');
  console.log('🏠 Is localhost:', isLocalhost);

  // Check if we're in a production environment
  const allowedProductionHosts = ['sortvision.com', 'www.sortvision.com'];
  const isProductionDomain =
    window.location.hostname === 'vercel.app' ||
    window.location.hostname.endsWith('.vercel.app') ||
    window.location.hostname === 'netlify.app' ||
    window.location.hostname.endsWith('.netlify.app') ||
    window.location.hostname === 'github.io' ||
    window.location.hostname.endsWith('.github.io') ||
    allowedProductionHosts.includes(window.location.hostname);
  console.log('🚀 Is production:', isProductionDomain);

  // Block devTools on production domains entirely
  if (isProductionDomain) {
    console.log(
      '%c SortVision DevTools: Production Access Denied 🚫',
      'background: #dc2626; color: #ffffff; padding: 6px 10px; border-radius: 4px; font-weight: bold; font-size: 14px; text-shadow: 1px 1px 2px rgba(0,0,0,0.3); box-shadow: inset 0 0 6px rgba(0,0,0,0.2); border-left: 4px solid #7f1d1d;'
    );
    return false;
  }

  // Allow devTools only with debug parameter (non-production only)
  const shouldEnableDevTools = debugRequested;
  console.log('✅ Should enable devTools:', shouldEnableDevTools);

  // If no debug parameter, show access denied message
  if (!shouldEnableDevTools) {
    console.log(
      '%c SortVision Debug: Access Denied 🔒',
      'background: #dc2626; color: #ffffff; padding: 6px 10px; border-radius: 4px; font-weight: bold; font-size: 14px; text-shadow: 1px 1px 2px rgba(0,0,0,0.3); box-shadow: inset 0 0 6px rgba(0,0,0,0.2); border-left: 4px solid #7f1d1d;'
    );
    return false;
  }

  // Show appropriate message based on environment
  if (isLocalhost) {
    console.log(
      '%c SortVision DevTools on Localhost 🏠',
      'background: #0F172A; color: #64ffda; padding: 6px 10px; border-radius: 4px; font-weight: bold; font-size: 14px; text-shadow: 1px 1px 2px rgba(0,0,0,0.3); box-shadow: inset 0 0 6px rgba(0,0,0,0.2); border-left: 4px solid #10b981;'
    );
  } else {
    console.log(
      '%c SortVision DevTools Activated 🔧',
      'background: #0F172A; color: #64ffda; padding: 6px 10px; border-radius: 4px; font-weight: bold; font-size: 14px; text-shadow: 1px 1px 2px rgba(0,0,0,0.3); box-shadow: inset 0 0 6px rgba(0,0,0,0.2); border-left: 4px solid #10b981;'
    );
  }

  console.log('✅ DevTools initialization approved');
  // Return true to indicate we should proceed with initialization
  return true;
};

// FPS measurement variables
let MEASURING = false;
let LAST_FRAME_TIME = 0;
let FRAME_COUNT = 0;

// Export the module
export { initDevTools, MEASURING, LAST_FRAME_TIME, FRAME_COUNT };
