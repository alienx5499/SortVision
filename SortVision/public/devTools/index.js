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
  console.log('🚀 initializeDevTools called');

  // Check if we should initialize - core.js will handle the validation
  // and show access denied message if needed
  if (!initDevTools()) {
    console.log('❌ DevTools initialization blocked');
    return;
  }

  console.log('✅ DevTools initialization approved, proceeding...');

  // Log initialization
  debugLog('Debug Tools Initialized', 'info');

  // Create and setup the debug panel
  console.log('🎨 Creating debug panel...');
  createDebugPanel();
  attachPanelListeners();

  // Initialize device info
  console.log('📱 Initializing device info...');
  updateDeviceInfo();
  monitorTouchEvents();
  monitorScrollEvents();
  monitorViewportChanges();

  // Initialize performance monitoring
  console.log('⚡ Initializing performance monitoring...');
  startPerformanceMonitoring();
  updateBatteryInfo();
  monitorNetworkInfo();

  // Initialize enhanced monitoring
  initPerformanceMonitoring();

  // Expose the toggle function globally
  window.toggleDevTools = toggleDebugPanel;
  console.log('🔧 toggleDevTools exposed globally');

  // Expose monitoring globally (for development convenience)
  window.svMonitoring = monitoring;
  console.log('📊 svMonitoring exposed globally');

  console.log('✅ DevTools initialization complete!');
}

// Run initialization - handle both cases
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeDevTools);
} else {
  // DOM is already loaded
  initializeDevTools();
}

// Fallback initialization after a short delay
setTimeout(() => {
  if (!window.toggleDevTools) {
    console.log('🔄 Fallback initialization triggered');
    initializeDevTools();
  }
}, 1000);

// Export functionality for direct imports
export { initializeDevTools, toggleDebugPanel, monitoring };
