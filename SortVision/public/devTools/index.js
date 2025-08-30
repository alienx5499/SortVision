/**
 * SortVision Debug Tools - Main Entry Point
 *
 * This file imports and initializes all debug tool modules
 */

import { initDevTools, debugLog } from './core.js';
import {
  createDebugPanel,
  attachPanelListeners,
  toggleDebugPanel,
} from './ui.js';
import {
  updateDeviceInfo,
  monitorTouchEvents,
  monitorScrollEvents,
  monitorViewportChanges,
} from './device-info.js';
import {
  startPerformanceMonitoring,
  updateBatteryInfo,
  monitorNetworkInfo,
} from './performance.js';
import monitoring, { initPerformanceMonitoring } from './monitoring.js';

/**
 * Initialize all debug tools
 */
function initializeDevTools() {
  // Check if we should initialize - core.js will handle the validation
  // and show access denied message if needed
  if (!initDevTools()) {
    return;
  }

  // Log initialization
  debugLog('Debug Tools Initialized', 'info');

  // Create and setup the debug panel
  createDebugPanel();
  attachPanelListeners();

  // Initialize device info
  updateDeviceInfo();
  monitorTouchEvents();
  monitorScrollEvents();
  monitorViewportChanges();

  // Initialize performance monitoring
  startPerformanceMonitoring();
  updateBatteryInfo();
  monitorNetworkInfo();

  // Initialize enhanced monitoring
  initPerformanceMonitoring();

  // Expose the toggle function globally
  window.toggleDevTools = toggleDebugPanel;

  // Expose monitoring globally (for development convenience)
  window.svMonitoring = monitoring;
}

// Run initialization
document.addEventListener('DOMContentLoaded', initializeDevTools);

// Export functionality for direct imports
export { initializeDevTools, toggleDebugPanel, monitoring };
