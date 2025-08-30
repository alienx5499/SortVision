/**
 * SortVision Monitoring Module
 * Provides production-safe logging, error tracking, and performance monitoring
 */

import { throttle } from './core.js';

// Constants
const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
};

// Track whether we're in production or development
const IS_PRODUCTION = !window.location.hostname.match(
  /(localhost|127.0.0.1|192.168.|10.|172.)/
);
const FORCE_LOGGING = window.location.search
  .toLowerCase()
  .includes('debug=true');

/**
 * Production-safe logging function that survives minification
 * Uses bracket notation to prevent removal during production builds
 *
 * @param {string} message - Message to log
 * @param {string} level - Log level (error, warn, info, debug)
 * @param {Object} data - Additional data to log
 * @param {Object} styles - Optional styles for console output
 */
export function logger(
  message,
  level = LOG_LEVELS.INFO,
  data = null,
  styles = {}
) {
  // Skip debug logs in production unless forced
  if (level === LOG_LEVELS.DEBUG && IS_PRODUCTION && !FORCE_LOGGING) {
    return;
  }

  // Default styles based on log level
  const levelStyles = {
    [LOG_LEVELS.ERROR]: { background: '#FF5252', color: 'white' },
    [LOG_LEVELS.WARN]: { background: '#FFD740', color: 'black' },
    [LOG_LEVELS.INFO]: { background: '#40C4FF', color: 'black' },
    [LOG_LEVELS.DEBUG]: { background: '#69F0AE', color: 'black' },
  };

  // Use level-specific styles with custom overrides
  const mergedStyles = { ...levelStyles[level], ...styles };

  // Format the message
  const formattedMessage = `[SortVision][${level.toUpperCase()}] ${message}`;

  // Use bracket notation to prevent minification from removing these calls
  try {
    // Log the message with styling
    window['console'][level](
      `%c${formattedMessage}`,
      Object.entries(mergedStyles)
        .map(([k, v]) => `${k}:${v}`)
        .join(';')
    );

    // Log additional data if provided
    if (data) {
      window['console'][level](data);
    }

    // Store logs if enabled
    if (window.SV_STORE_LOGS) {
      storeLog(formattedMessage, level, data);
    }
  } catch {
    // Fallback to basic logging if something goes wrong
    window['console']['log'](formattedMessage);
    if (data) window['console']['log'](data);
  }
}

// Shorthand methods
export const logError = (msg, data, styles) =>
  logger(msg, LOG_LEVELS.ERROR, data, styles);
export const logWarn = (msg, data, styles) =>
  logger(msg, LOG_LEVELS.WARN, data, styles);
export const logInfo = (msg, data, styles) =>
  logger(msg, LOG_LEVELS.INFO, data, styles);
export const logDebug = (msg, data, styles) =>
  logger(msg, LOG_LEVELS.DEBUG, data, styles);

// Store logs in memory (limited to prevent memory issues)
const MAX_STORED_LOGS = 1000;
let storedLogs = [];

/**
 * Store log in memory
 * @private
 */
function storeLog(message, level, data) {
  // Remove oldest log if we've reached the limit
  if (storedLogs.length >= MAX_STORED_LOGS) {
    storedLogs.shift();
  }

  storedLogs.push({
    timestamp: new Date().toISOString(),
    message,
    level,
    data: data ? JSON.stringify(data) : null,
  });
}

/**
 * Get all stored logs
 * @returns {Array} Array of stored logs
 */
export function getLogs() {
  return [...storedLogs];
}

/**
 * Clear stored logs
 */
export function clearLogs() {
  storedLogs = [];
  logInfo('Logs cleared');
}

// Error tracking
let errorCount = 0;
const errorMap = new Map();

/**
 * Track JavaScript errors
 * @param {Error} error - Error object
 * @param {string} context - Where the error occurred
 */
export function trackError(error, context = 'unknown') {
  errorCount++;

  // Create error fingerprint
  const errorKey = `${error.name}:${error.message}:${context}`;

  // Update error count in map
  if (!errorMap.has(errorKey)) {
    errorMap.set(errorKey, {
      count: 1,
      firstSeen: new Date(),
      lastSeen: new Date(),
      context,
    });
  } else {
    const record = errorMap.get(errorKey);
    record.count++;
    record.lastSeen = new Date();
    errorMap.set(errorKey, record);
  }

  // Log the error
  logError(`Error in ${context}`, {
    name: error.name,
    message: error.message,
    stack: error.stack,
    count: errorMap.get(errorKey).count,
  });
}

/**
 * Get error statistics
 * @returns {Object} Error statistics
 */
export function getErrorStats() {
  return {
    totalErrors: errorCount,
    uniqueErrors: errorMap.size,
    errorDetails: Array.from(errorMap.entries()).map(([key, details]) => ({
      error: key,
      ...details,
    })),
  };
}

// Performance monitoring
let perfMetrics = {
  fps: 0,
  memory: null,
  lastUpdate: Date.now(),
};

// Throttled function to update performance metrics
const updatePerformanceMetrics = throttle(() => {
  try {
    // Get memory usage if available
    if (window.performance && window.performance.memory) {
      perfMetrics.memory = {
        totalJSHeapSize: window.performance.memory.totalJSHeapSize,
        usedJSHeapSize: window.performance.memory.usedJSHeapSize,
        jsHeapSizeLimit: window.performance.memory.jsHeapSizeLimit,
      };
    }

    perfMetrics.lastUpdate = Date.now();
  } catch {
    // Ignore errors
  }
}, 2000);

/**
 * Update FPS counter
 */
let frameCount = 0;
let lastTimestamp = 0;

function updateFPS(timestamp) {
  if (!lastTimestamp) {
    lastTimestamp = timestamp;
  }

  frameCount++;

  // Update FPS every second
  if (timestamp - lastTimestamp >= 1000) {
    perfMetrics.fps = Math.round(
      (frameCount * 1000) / (timestamp - lastTimestamp)
    );
    frameCount = 0;
    lastTimestamp = timestamp;
    updatePerformanceMetrics();
  }

  requestAnimationFrame(updateFPS);
}

/**
 * Initialize performance monitoring
 */
export function initPerformanceMonitoring() {
  // Start FPS monitoring
  requestAnimationFrame(updateFPS);

  // Set up global error handler
  window.addEventListener('error', event => {
    trackError(event.error || new Error(event.message), 'window.onerror');
    return false;
  });

  // Set up unhandled promise rejection handler
  window.addEventListener('unhandledrejection', event => {
    const error =
      event.reason instanceof Error
        ? event.reason
        : new Error(String(event.reason));

    trackError(error, 'unhandled-promise');
  });
}

/**
 * Get current performance metrics
 * @returns {Object} Performance metrics
 */
export function getPerformanceMetrics() {
  return { ...perfMetrics };
}

// Initialize by exposing global logging in production
if (IS_PRODUCTION) {
  // Expose minimal API globally for production debugging
  window['svDebug'] = {
    log: logger,
    error: logError,
    warn: logWarn,
    info: logInfo,
    getErrors: getErrorStats,
    getPerf: getPerformanceMetrics,
    getLogs,
  };
}

// Export default monitoring object
export default {
  logger,
  logError,
  logWarn,
  logInfo,
  logDebug,
  trackError,
  getErrorStats,
  initPerformanceMonitoring,
  getPerformanceMetrics,
  getLogs,
  clearLogs,
};
