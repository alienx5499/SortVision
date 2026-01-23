/**
 * SortVision Debug Tools - UI Module
 *
 * This module handles the debug panel UI creation and styling
 */

import { debugLog as _debugLog } from './core.js';

// Panel container reference
let panel;

/**
 * Creates and styles the debug panel
 * @returns {HTMLElement} The debug panel element
 */
function createDebugPanel() {
  // Create panel if it doesn't exist
  if (panel) return panel;

  panel = document.createElement('div');
  panel.id = 'mobile-debug-panel';

  // Add CSS for terminal style
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    /* Base animations */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes blinkCursor {
      50% { border-right-color: transparent; }
    }

    @keyframes moveRight {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    @keyframes pulse {
      0% { opacity: 0.6; }
      50% { opacity: 1; }
      100% { opacity: 0.6; }
    }

    /* Debug Panel - Terminal Style */
    #mobile-debug-panel {
      background-color: rgba(15, 23, 42, 0.98);
      border: 1px solid #1e293b;
      color: #64ffda;
      font-family: "SF Mono", "Monaco", "Menlo", "Courier New", Courier, monospace;
      font-size: 0.85em;
      padding: 2.5em 0.6em 0.6em;
      width: 18em;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      border-radius: 8px;
      position: fixed;
      top: 10px;
      left: 10px;
      z-index: 10001;
      backdrop-filter: blur(12px);
      box-sizing: border-box;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
      max-height: 90dvh; /* Use dvh units for dynamic viewport height */
      display: flex;
      flex-direction: column;
    }

    /* Animated background elements */
    #mobile-debug-bg {
      position: absolute;
      inset: 0;
      opacity: 0.1;
      overflow: hidden;
      pointer-events: none;
    }

    /* Animated grid pattern */
    #mobile-debug-bg::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: radial-gradient(#444 1px, transparent 1px);
      background-size: 8px 8px;
      opacity: 0.3;
    }

    /* Animated code lines */
    .debug-code-line {
      position: absolute;
      left: 0;
      height: 1px;
      background: linear-gradient(to right, transparent, rgba(100, 255, 218, 0.3), transparent);
      animation: moveRight linear infinite;
    }

    /* Floating particles */
    .debug-particle {
      position: absolute;
      border-radius: 50%;
      animation: pulse infinite;
    }

    /* Terminal Header */
    #mobile-debug-header {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1.6em;
      background-color: #1e293b;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      padding: 0 0.5em;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #334155;
    }

    #mobile-debug-title {
      color: #ddd;
      font-size: 0.8em;
      line-height: 1.6em;
      font-weight: 500;
      display: flex;
      align-items: center;
    }

    #mobile-debug-title::before {
      content: '';
      display: inline-block;
      width: 0.6em;
      height: 0.6em;
      background-color: #64ffda;
      border-radius: 50%;
      margin-right: 0.5em;
      animation: pulse 2s infinite;
    }

    #mobile-debug-controls {
      display: flex;
      gap: 0.4em;
      padding: 0.4em;
    }

    .terminal-control {
      width: 0.75em;
      height: 0.75em;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .terminal-control:hover {
      transform: scale(1.1);
    }

    .terminal-control.close {
      background-color: #ff5f56;
    }

    .terminal-control.minimize {
      background-color: #ffbd2e;
    }

    .terminal-control.maximize {
      background-color: #27c93f;
    }

    /* Debug Rows */
    .debug-row {
      position: relative;
      padding: 0.35em 0.5em;
      margin-bottom: 0.4em;
      display: flex;
      align-items: flex-start;
      font-size: 0.9em;
      animation: fadeIn 0.3s ease-out;
      background-color: rgba(30, 41, 59, 0.5);
      border-radius: 4px;
      overflow: hidden;
      transition: all 0.2s ease;
      border-left: 2px solid rgba(100, 255, 218, 0.3);
    }

    .debug-row:hover {
      background-color: rgba(30, 41, 59, 0.8);
      border-left-color: rgba(100, 255, 218, 0.7);
      transform: translateX(2px);
    }

    /* Shimmer effect on row hover */
    .debug-row::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to right, transparent, rgba(100, 255, 218, 0.1), transparent);
      transform: translateX(-100%);
      transition: transform 0.5s ease;
    }

    .debug-row:hover::after {
      transform: translateX(100%);
    }

    /* Text Content */
    .debug-row .prompt {
      color: #27c93f;
      opacity: 0.9;
      width: 1.2em;
      margin-right: 0.8em;
      font-weight: bold;
      padding-top: 0.35em;
    }

    .debug-row .value {
      color: #64ffda;
      font-family: "SF Mono", "Monaco", "Menlo", "Courier New", Courier, monospace;
      flex: 1;
    }

    .debug-row .highlight {
      color: #27c93f;
    }

    .debug-row .faded {
      opacity: 0.7;
    }

    /* Warning Icon */
    .warning-icon {
      color: #ffbd2e;
      margin-left: 0.4em;
      animation: blinkCursor 1s step-end infinite;
    }

    /* Toggle Button Container */
    #md-toggle-button-container {
      margin-top: 0;
      text-align: center;
      position: relative;
      overflow: hidden;
      border-radius: 4px;
      padding: 15px 0 10px;
      border-top: 1px solid rgba(100, 255, 218, 0.2);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    /* Button shimmer effect */
    #md-toggle-button-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to right, transparent, rgba(100, 255, 218, 0.1), transparent);
      transform: translateX(-100%);
      transition: transform 1s ease;
    }

    #md-toggle-button-container:hover::before {
      transform: translateX(100%);
    }

    /* Toggle Button */
    #md-toggle-button {
      background: rgba(30, 41, 59, 0.8);
      border: 2px solid #64ffda;
      color: #64ffda;
      padding: 0.7em 1em;
      border-radius: 4px;
      font-family: "SF Mono", "Monaco", "Menlo", "Courier New", Courier, monospace;
      font-size: 1em;
      font-weight: 500;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.2s ease;
      width: 80%;
      max-width: 200px;
      letter-spacing: 0.15em;
      position: relative;
      z-index: 1;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      margin: 0 auto;
    }

    /* Button hover effect */
    #md-toggle-button:hover {
      background: rgba(51, 65, 85, 0.9);
      box-shadow: 0 0 10px rgba(100, 255, 218, 0.3);
      transform: translateY(-1px);
    }

    /* Button active effect */
    #md-toggle-button:active {
      transform: translateY(1px);
      box-shadow: 0 0 5px rgba(100, 255, 218, 0.2);
    }

    /* Button focus effect */
    #md-toggle-button:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(100, 255, 218, 0.3);
    }

    /* Test Button Styles */
    .md-test-btn {
      background: rgba(30, 41, 59, 0.8);
      border: 2px solid #64ffda;
      color: #64ffda;
      padding: 0.7em 1em;
      border-radius: 4px;
      font-family: "SF Mono", "Monaco", "Menlo", "Courier New", Courier, monospace;
      font-size: 1em;
      font-weight: 500;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.2s ease;
      letter-spacing: 0.15em;
      position: relative;
      z-index: 1;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      min-width: 70px;
    }

    .md-test-btn:hover {
      background: rgba(51, 65, 85, 0.9);
      box-shadow: 0 0 10px rgba(100, 255, 218, 0.3);
      transform: translateY(-1px);
    }

    .md-test-btn:active {
      transform: translateY(1px);
      box-shadow: 0 0 5px rgba(100, 255, 218, 0.2);
    }

    .md-test-btn:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(100, 255, 218, 0.3);
    }

    .md-clear-btn {
      border-color: #ff6b6b;
      color: #ff6b6b;
    }

    .md-clear-btn:hover {
      border-color: #ff5252;
      color: #ff5252;
      background: rgba(255, 107, 107, 0.1);
    }

    /* Small Test Button Styles */
    .md-small-btn {
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid #475569;
      color: #64ffda;
      padding: 0.2em 0.5em;
      border-radius: 3px;
      font-family: "SF Mono", "Monaco", "Menlo", "Courier New", Courier, monospace;
      font-size: 0.8em;
      font-weight: 500;
      text-transform: none;
      cursor: pointer;
      transition: all 0.2s ease;
      outline: none;
      text-align: center;
      box-shadow: none;
      min-width: 40px;
      letter-spacing: normal;
      position: relative;
      z-index: 1;
      margin-left: 0.5em;
    }

    .md-small-btn:hover {
      background: rgba(51, 65, 85, 0.9);
      border-color: #64ffda;
    }

    .md-small-btn:active {
      background: rgba(30, 41, 59, 0.9);
    }

    .md-small-btn:focus {
      outline: none;
      border-color: #64ffda;
    }

    .md-small-btn.md-clear-btn {
      border-color: #ff6b6b;
      color: #ff6b6b;
    }

    .md-small-btn.md-clear-btn:hover {
      border-color: #ff5252;
      color: #ff5252;
      background: rgba(255, 107, 107, 0.1);
    }

    .md-small-btn.md-sponsor-btn {
      border-color: #ec4899;
      color: #ec4899;
    }

    .md-small-btn.md-sponsor-btn:hover {
      border-color: #f472b6;
      color: #f472b6;
      background: rgba(236, 72, 153, 0.1);
    }

    /* Add a scrollable container for debug rows */
    #mobile-debug-content {
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: #64ffda #1e293b;
      flex: 1;
      padding-right: 0.4em; /* Add padding for scrollbar */
      margin-bottom: 0.8em;
    }

    /* Scrollbar styling for webkit browsers */
    #mobile-debug-content::-webkit-scrollbar {
      width: 6px;
    }

    #mobile-debug-content::-webkit-scrollbar-track {
      background: #1e293b;
      border-radius: 4px;
    }

    #mobile-debug-content::-webkit-scrollbar-thumb {
      background-color: rgba(100, 255, 218, 0.5);
      border-radius: 4px;
    }

    #mobile-debug-content::-webkit-scrollbar-thumb:hover {
      background-color: rgba(100, 255, 218, 0.8);
    }

    /* Delayed animations for rows */
    .debug-row:nth-child(1) { animation-delay: 0.05s; }
    .debug-row:nth-child(2) { animation-delay: 0.1s; }
    .debug-row:nth-child(3) { animation-delay: 0.15s; }
    .debug-row:nth-child(4) { animation-delay: 0.2s; }
    .debug-row:nth-child(5) { animation-delay: 0.25s; }
    .debug-row:nth-child(6) { animation-delay: 0.3s; }
    .debug-row:nth-child(7) { animation-delay: 0.35s; }
    .debug-row:nth-child(8) { animation-delay: 0.4s; }
    .debug-row:nth-child(9) { animation-delay: 0.45s; }
    .debug-row:nth-child(10) { animation-delay: 0.5s; }
    .debug-row:nth-child(11) { animation-delay: 0.55s; }
    .debug-row:nth-child(12) { animation-delay: 0.6s; }
    .debug-row:nth-child(13) { animation-delay: 0.65s; }
    .debug-row:nth-child(14) { animation-delay: 0.7s; }
    .debug-row:nth-child(15) { animation-delay: 0.75s; }

    /* Specific debug rows that might have multi-line content */
    #md-battery.value,
    #md-features.value {
      line-height: 1.4;
    }
  `;
  document.head.appendChild(styleSheet);

  // Create the HTML structure
  panel.innerHTML = `
    <div id="mobile-debug-header">
      <div id="mobile-debug-title">SortVision Dev Tools</div>
      <div id="mobile-debug-controls">
        <div class="terminal-control minimize"></div>
        <div class="terminal-control maximize"></div>
        <div class="terminal-control close"></div>
      </div>
    </div>

    <!-- Animated background elements -->
    <div id="mobile-debug-bg">
      <!-- Animated code lines -->
      <div class="debug-code-line" style="top: 15%; width: 30%; animation-duration: 15s;"></div>
      <div class="debug-code-line" style="top: 45%; width: 20%; animation-duration: 12s;"></div>
      <div class="debug-code-line" style="top: 75%; width: 40%; animation-duration: 18s;"></div>

      <!-- Floating particles -->
      <div class="debug-particle" style="top: 10%; left: 20%; width: 6px; height: 6px; background-color: rgba(100, 255, 218, 0.5); animation-duration: 3s;"></div>
      <div class="debug-particle" style="top: 30%; left: 70%; width: 4px; height: 4px; background-color: rgba(45, 212, 191, 0.5); animation-duration: 2.3s;"></div>
      <div class="debug-particle" style="top: 70%; left: 30%; width: 5px; height: 5px; background-color: rgba(139, 92, 246, 0.5); animation-duration: 4s;"></div>
      <div class="debug-particle" style="top: 60%; left: 80%; width: 3px; height: 3px; background-color: rgba(248, 113, 113, 0.5); animation-duration: 3.5s;"></div>
    </div>

    <!-- Scrollable content container -->
    <div id="mobile-debug-content">
      <div class="debug-row">
        <span class="prompt">$</span>
        <span id="md-device" class="value">--</span>
      </div>

      <div class="debug-row">
        <span class="prompt">$</span>
        <span id="md-browser" class="value">--</span>
      </div>

      <div class="debug-row">
        <span class="prompt">$</span>
        <span id="md-gpu" class="value">--</span>
      </div>

      <div class="debug-row">
        <span class="prompt">$</span>
        <span id="md-viewport" class="value">--</span>
      </div>

      <div class="debug-row">
        <span class="prompt">$</span>
        <span id="md-height" class="value">--</span>
      </div>

      <div class="debug-row">
        <span class="prompt">$</span>
        <span id="md-orientation" class="value">--</span>
        <span class="warning-icon" style="display: none">!</span>
      </div>

      <div class="debug-row">
        <span class="prompt">$</span>
        <span id="md-touch" class="value">--</span>
      </div>

      <div class="debug-row">
        <span class="prompt">$</span>
        <span id="md-scroll" class="value">--</span>
      </div>

      <div class="debug-row">
        <span class="prompt">$</span>
        <span id="md-ios-safe-area" class="value">--</span>
      </div>

      <div class="debug-row">
        <span class="prompt">$</span>
        <span id="md-pixel-ratio" class="value">--</span>
      </div>

      <div class="debug-row">
        <span class="prompt">$</span>
        <span id="md-network" class="value">--</span>
      </div>

      <div class="debug-row">
        <span class="prompt">$</span>
        <span id="md-perf" class="value">--</span>
      </div>

      <div class="debug-row">
        <span class="prompt">$</span>
        <span id="md-battery" class="value">--</span>
      </div>

      <div class="debug-row">
        <span class="prompt">$</span>
        <span id="md-features" class="value">--</span>
      </div>

      <div class="debug-row">
        <span class="prompt">$</span>
        <span id="md-inputs" class="value">--</span>
      </div>

      <div class="debug-row">
        <span class="prompt">$</span>
        <span id="md-haptics" class="value">--</span>
      </div>

      <div class="debug-row">
        <span class="prompt">$</span>
        <span id="md-sensors" class="value">--</span>
      </div>

      <div class="debug-row">
        <span class="prompt">$</span>
        <span id="md-storage" class="value">--</span>
      </div>

      <div class="debug-row">
        <span class="prompt">$</span>
        <span id="md-time" class="value">--</span>
      </div>

      <div class="debug-row">
        <span class="prompt">$</span>
        <span id="md-pwa" class="value">--</span>
      </div>

      <!-- PWA Test -->
      <div class="debug-row">
        <span class="prompt">$</span>
        <span class="value" style="flex: 1;">Test PWA Popup</span>
        <button id="md-test-pwa-btn" class="md-small-btn" data-test="pwa">
          Test
        </button>
      </div>
      
      <!-- GitHub Star Test -->
      <div class="debug-row">
        <span class="prompt">$</span>
        <span class="value" style="flex: 1;">Test Star GitHub Popup</span>
        <button id="md-test-github-btn" class="md-small-btn" data-test="github">
          Test
        </button>
      </div>
      
      <!-- Sponsor Popup Test -->
      <div class="debug-row">
        <span class="prompt">$</span>
        <span class="value" style="flex: 1;">Test Sponsor Popup</span>
        <button id="md-test-sponsor-btn" class="md-small-btn md-sponsor-btn" data-test="sponsor">
          Test
        </button>
      </div>
      
      <!-- All Popups Test -->
      <div class="debug-row">
        <span class="prompt">$</span>
        <span class="value" style="flex: 1;">Test All Popups</span>
        <button id="md-test-all-btn" class="md-small-btn" data-test="all">
          Test
        </button>
      </div>
      
      <!-- Clear Tests -->
      <div class="debug-row">
        <span class="prompt">$</span>
        <span class="value" style="flex: 1; color: #ff6b6b;">Clear All Tests</span>
        <button id="md-clear-tests-btn" class="md-small-btn md-clear-btn" data-test="clear">
          Clear
        </button>
      </div>
    </div>

    <div id="md-toggle-button-container">
      <button id="md-toggle-button">CLOSE</button>
    </div>
  `;

  // Add to body when DOM is ready
  if (document.body) {
    document.body.appendChild(panel);
  } else {
    window.addEventListener('DOMContentLoaded', () => {
      document.body.appendChild(panel);
    });
  }

  return panel;
}

/**
 * Attaches event listeners to the debug panel
 */
function attachPanelListeners() {
  if (!panel) return;

  const toggleBtn = document.getElementById('md-toggle-button');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      panel.style.display = 'none';
    });
  }

  // Add click handlers for terminal controls
  const closeBtn = document.querySelector('.terminal-control.close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      panel.style.display = 'none';
    });
  }

  const minimizeBtn = document.querySelector('.terminal-control.minimize');
  if (minimizeBtn) {
    minimizeBtn.addEventListener('click', () => {
      const rows = panel.querySelectorAll('.debug-row');
      rows.forEach(row => {
        row.style.display = row.style.display === 'none' ? 'flex' : 'none';
      });
    });
  }

  const maximizeBtn = document.querySelector('.terminal-control.maximize');
  if (maximizeBtn) {
    maximizeBtn.addEventListener('click', () => {
      if (panel.style.width === '24em') {
        panel.style.width = '18em';
      } else {
        panel.style.width = '24em';
      }
    });
  }

  // Add test button event listeners
  const testButtons = panel.querySelectorAll('.md-small-btn');
  testButtons.forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();

      const testType = button.getAttribute('data-test');
      console.log(`[DevTools] Testing popup: ${testType}`);

      switch (testType) {
        case 'pwa':
          localStorage.setItem('sv-test-pwa', '1');
          localStorage.removeItem('sv-test-github');
          localStorage.removeItem('sv-test-sponsor');
          _debugLog('PWA test mode enabled - reloading...', 'info');
          setTimeout(() => window.location.reload(), 500);
          break;
        case 'github':
          localStorage.setItem('sv-test-github', '1');
          localStorage.removeItem('sv-test-pwa');
          localStorage.removeItem('sv-test-sponsor');
          _debugLog('GitHub popup test mode enabled - reloading...', 'info');
          setTimeout(() => window.location.reload(), 500);
          break;
        case 'sponsor':
          localStorage.setItem('sv-test-sponsor', '1');
          localStorage.removeItem('sv-test-pwa');
          localStorage.removeItem('sv-test-github');
          _debugLog('Sponsor popup test mode enabled - reloading...', 'info');
          setTimeout(() => window.location.reload(), 500);
          break;
        case 'both':
          localStorage.setItem('sv-test-pwa', '1');
          localStorage.setItem('sv-test-github', '1');
          localStorage.removeItem('sv-test-sponsor');
          _debugLog('Both popup test modes enabled - reloading...', 'info');
          setTimeout(() => window.location.reload(), 500);
          break;
        case 'all':
          localStorage.setItem('sv-test-pwa', '1');
          localStorage.setItem('sv-test-github', '1');
          localStorage.setItem('sv-test-sponsor', '1');
          _debugLog('All popup test modes enabled - reloading...', 'info');
          setTimeout(() => window.location.reload(), 500);
          break;
        case 'clear':
          localStorage.removeItem('sv-test-pwa');
          localStorage.removeItem('sv-test-github');
          localStorage.removeItem('sv-test-sponsor');
          _debugLog('All test modes cleared - reloading...', 'info');
          setTimeout(() => window.location.reload(), 500);
          break;
      }
    });
  });
}

/**
 * Toggles the visibility of the debug panel
 */
function toggleDebugPanel() {
  if (!panel) {
    createDebugPanel();
    attachPanelListeners();
    return;
  }

  if (panel.style.display === 'none') {
    panel.style.display = 'flex';
  } else {
    panel.style.display = 'none';
  }
}

// Export the module
export { createDebugPanel, attachPanelListeners, toggleDebugPanel };
