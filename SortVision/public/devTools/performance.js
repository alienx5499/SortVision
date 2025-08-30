/**
 * SortVision Debug Tools - Performance Module
 *
 * This module handles performance monitoring and information display
 */

import { PERF_DATA, lastFrameTime, frameCount } from './core.js';

// FPS tracking
let fpsUpdateInterval;
let memoryUpdateInterval;

/**
 * Start performance monitoring
 */
function startPerformanceMonitoring() {
  // Start FPS tracking
  trackFPS();

  // Start memory tracking if available
  if (performance.memory) {
    trackMemory();
  }

  // Track performance metrics
  trackPerformanceMetrics();

  // Update the performance display in debug panel
  updatePerformanceInfo();

  // Update every 3 seconds
  setInterval(updatePerformanceInfo, 3000);
}

/**
 * Track frames per second
 */
function trackFPS() {
  // Clear existing interval if any
  if (fpsUpdateInterval) {
    clearInterval(fpsUpdateInterval);
  }

  // Set up FPS tracking
  fpsUpdateInterval = setInterval(() => {
    if (!PERF_DATA.fps) {
      PERF_DATA.fps = {
        current: 0,
        avg: 0,
        min: Infinity,
        max: 0,
        samples: [],
      };
    }

    // Calculate FPS
    const now = performance.now();
    const elapsed = now - lastFrameTime.value;
    const fps = frameCount.value / (elapsed / 1000);

    // Reset frame count
    frameCount.value = 0;
    lastFrameTime.value = now;

    // Store values
    PERF_DATA.fps.current = Math.round(fps);

    // Store for rolling average (keep last 10 samples)
    PERF_DATA.fps.samples.push(PERF_DATA.fps.current);
    if (PERF_DATA.fps.samples.length > 10) {
      PERF_DATA.fps.samples.shift();
    }

    // Update min/max
    PERF_DATA.fps.min = Math.min(PERF_DATA.fps.min, PERF_DATA.fps.current);
    PERF_DATA.fps.max = Math.max(PERF_DATA.fps.max, PERF_DATA.fps.current);

    // Calculate average
    const sum = PERF_DATA.fps.samples.reduce((a, b) => a + b, 0);
    PERF_DATA.fps.avg = Math.round(sum / PERF_DATA.fps.samples.length);

    // Update UI
    updateFpsDisplay();
  }, 1000);

  // Set up RAF loop for counting frames
  function countFrame() {
    frameCount.value++;
    requestAnimationFrame(countFrame);
  }

  requestAnimationFrame(countFrame);
}

/**
 * Update FPS display
 */
function updateFpsDisplay() {
  const fpsEl = document.getElementById('md-fps');
  if (!fpsEl || !PERF_DATA.fps) return;

  // Color coding
  let fpsColor = '#4CAF50'; // Green for good FPS
  if (PERF_DATA.fps.current < 30) {
    fpsColor = '#FF9800'; // Orange for medium FPS
  }
  if (PERF_DATA.fps.current < 20) {
    fpsColor = '#F44336'; // Red for poor FPS
  }

  fpsEl.innerHTML = `<span style="color:${fpsColor}">${PERF_DATA.fps.current} FPS</span> <span class="faded">avg: ${PERF_DATA.fps.avg} | min: ${PERF_DATA.fps.min} | max: ${PERF_DATA.fps.max}</span>`;
}

/**
 * Track memory usage if available
 */
function trackMemory() {
  // Clear existing interval if any
  if (memoryUpdateInterval) {
    clearInterval(memoryUpdateInterval);
  }

  if (!performance.memory) {
    const memEl = document.getElementById('md-memory');
    if (memEl) {
      memEl.textContent = 'Memory API not available';
    }
    return;
  }

  memoryUpdateInterval = setInterval(() => {
    if (!PERF_DATA.memory) {
      PERF_DATA.memory = {
        used: 0,
        total: 0,
        limit: 0,
        history: [],
      };
    }

    // Get current memory values (in MB)
    PERF_DATA.memory.used = Math.round(
      performance.memory.usedJSHeapSize / (1024 * 1024)
    );
    PERF_DATA.memory.total = Math.round(
      performance.memory.totalJSHeapSize / (1024 * 1024)
    );
    PERF_DATA.memory.limit = Math.round(
      performance.memory.jsHeapSizeLimit / (1024 * 1024)
    );

    // Store for history (last 10 readings)
    PERF_DATA.memory.history.push(PERF_DATA.memory.used);
    if (PERF_DATA.memory.history.length > 10) {
      PERF_DATA.memory.history.shift();
    }

    // Update UI
    updateMemoryDisplay();
  }, 2000);
}

/**
 * Update memory display
 */
function updateMemoryDisplay() {
  const memEl = document.getElementById('md-memory');
  if (!memEl || !PERF_DATA.memory) return;

  // Calculate percentage of heap used
  const percentUsed = Math.round(
    (PERF_DATA.memory.used / PERF_DATA.memory.limit) * 100
  );

  // Color coding
  let memColor = '#4CAF50'; // Green for low memory usage
  if (percentUsed > 50) {
    memColor = '#FF9800'; // Orange for medium memory usage
  }
  if (percentUsed > 80) {
    memColor = '#F44336'; // Red for high memory usage
  }

  // Check for leaks using basic heuristic (consistent increase over time)
  let leakWarning = '';
  const history = PERF_DATA.memory.history;
  if (history.length >= 5) {
    let increasing = true;
    for (let i = 1; i < history.length; i++) {
      if (history[i] <= history[i - 1]) {
        increasing = false;
        break;
      }
    }

    // Only warn if consistently increasing
    if (increasing && history[history.length - 1] > history[0] * 1.2) {
      leakWarning = ' <span style="color:#F44336">⚠️ Possible leak</span>';
    }
  }

  memEl.innerHTML = `<span style="color:${memColor}">${PERF_DATA.memory.used} MB</span> <span class="faded">of ${PERF_DATA.memory.limit} MB (${percentUsed}%)</span>${leakWarning}`;
}

/**
 * Measure loading and navigation times
 */
function trackPerformanceMetrics() {
  const navTimingEl = document.getElementById('md-nav-timing');
  if (!navTimingEl) return;

  // Using Performance API to get navigation timing
  if (performance && performance.timing) {
    const timing = performance.timing;

    // Calculate key metrics
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    const dnsTime = timing.domainLookupEnd - timing.domainLookupStart;
    const tcpTime = timing.connectEnd - timing.connectStart;
    const domReadyTime =
      timing.domContentLoadedEventEnd - timing.navigationStart;
    const renderTime = timing.domComplete - timing.domLoading;

    // Format output with color coding
    let loadColor = '#4CAF50'; // Green for fast load
    if (loadTime > 2000) loadColor = '#FF9800'; // Orange for medium load
    if (loadTime > 5000) loadColor = '#F44336'; // Red for slow load

    // Store in performance data
    PERF_DATA.timing = {
      load: loadTime,
      dns: dnsTime,
      tcp: tcpTime,
      domReady: domReadyTime,
      render: renderTime,
    };

    navTimingEl.innerHTML = `<span style="color:${loadColor}">Load: ${loadTime}ms</span> <span class="faded">| DNS: ${dnsTime}ms | TCP: ${tcpTime}ms | DOM: ${domReadyTime}ms</span>`;
  } else {
    navTimingEl.textContent = 'Navigation Timing API not available';
  }
}

/**
 * Update battery information if available
 */
function updateBatteryInfo() {
  const batteryEl = document.getElementById('md-battery');
  if (!batteryEl) return;

  if (!navigator.getBattery) {
    batteryEl.textContent = 'Battery API not available';
    return;
  }

  navigator.getBattery().then(battery => {
    // Store initial values
    updateBatteryDisplay(battery);

    // Set up event listeners for changes
    battery.addEventListener('chargingchange', () =>
      updateBatteryDisplay(battery)
    );
    battery.addEventListener('levelchange', () =>
      updateBatteryDisplay(battery)
    );
    battery.addEventListener('chargingtimechange', () =>
      updateBatteryDisplay(battery)
    );
    battery.addEventListener('dischargingtimechange', () =>
      updateBatteryDisplay(battery)
    );
  });
}

/**
 * Display battery status
 */
function updateBatteryDisplay(battery) {
  const batteryEl = document.getElementById('md-battery');
  if (!batteryEl) return;

  // Calculate battery percentage
  const level = Math.round(battery.level * 100);

  // Enhanced color coding for battery level with more granular ranges
  let levelColor;
  if (level >= 80) {
    levelColor = '#4CAF50'; // Green for excellent battery (80-100%)
  } else if (level >= 60) {
    levelColor = '#8BC34A'; // Light green for good battery (60-79%)
  } else if (level >= 40) {
    levelColor = '#CDDC39'; // Lime for decent battery (40-59%)
  } else if (level >= 30) {
    levelColor = '#FFC107'; // Amber for caution level (30-39%)
  } else if (level >= 20) {
    levelColor = '#FF9800'; // Orange for low battery (20-29%)
  } else if (level >= 10) {
    levelColor = '#FF5722'; // Deep orange for very low (10-19%)
  } else {
    levelColor = '#F44336'; // Red for critical (0-9%)
  }

  // Blue color for the term highlighting
  const highlightColor = '#64ffda'; // Blue highlight color

  // Calculate remaining time
  let timeInfo = '';
  if (battery.charging) {
    if (battery.chargingTime !== Infinity) {
      const minutes = Math.round(battery.chargingTime / 60);
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      timeInfo = `(${hours}h ${mins}m until full)`;
    }
  } else {
    if (battery.dischargingTime !== Infinity) {
      const hours = Math.floor(battery.dischargingTime / 3600);
      const minutes = Math.floor((battery.dischargingTime % 3600) / 60);
      timeInfo = `(${hours}h ${minutes}m left)`;
    }
  }

  const batteryStatus = battery.charging ? 'charging' : 'discharging';

  // Format the battery info with only the heading and percentage value colored
  batteryEl.innerHTML = `
    <span style="color:${highlightColor}">Battery:</span> <span style="color:${levelColor}">${level}%</span> |<br>
    ${batteryStatus} ${timeInfo}
  `;
}

/**
 * Start network information monitoring
 */
function monitorNetworkInfo() {
  updateNetworkInfo();

  if (navigator.connection) {
    navigator.connection.addEventListener('change', updateNetworkInfo);
  }
}

/**
 * Update network information display
 */
function updateNetworkInfo() {
  const networkEl = document.getElementById('md-network');
  if (!networkEl) return;

  if (!navigator.connection) {
    networkEl.textContent = 'Network API not available';
    return;
  }

  const conn = navigator.connection;
  const highlightColor = '#64ffda'; // Blue highlight color

  // Determine connection type dynamically with better description
  let type = 'unknown';
  let subType = '';

  if (conn.type) {
    switch (conn.type) {
      case 'cellular':
        type = 'Cellular';
        // Detect 5G by checking effectiveType and downlink/rtt combinations
        if (
          conn.effectiveType === '4g' &&
          conn.downlink >= 50 &&
          conn.rtt < 50
        ) {
          subType = ' (5G)';
        } else if (conn.effectiveType) {
          // Use effectiveType for cellular subtype
          switch (conn.effectiveType) {
            case 'slow-2g':
              subType = ' (2G slow)';
              break;
            case '2g':
              subType = ' (2G)';
              break;
            case '3g':
              subType = ' (3G)';
              break;
            case '4g':
              subType = ' (4G)';
              break;
            default:
              subType = ` (${conn.effectiveType})`;
          }
        }
        break;
      case 'wifi':
        type = 'WiFi';
        // Enhanced WiFi info - check signal strength if available
        if ('wifiDetails' in navigator && navigator.wifiDetails) {
          try {
            const wifiInfo = navigator.wifiDetails();
            if (wifiInfo && wifiInfo.signalStrength) {
              const strength = wifiInfo.signalStrength;
              if (strength > -50) subType = ' (Excellent)';
              else if (strength > -60) subType = ' (Good)';
              else if (strength > -70) subType = ' (Fair)';
              else subType = ' (Poor)';
            }
          } catch {
            // WiFi details API might throw
          }
        }
        // If downlink is very fast, might be WiFi 6
        else if (conn.downlink > 200) {
          subType = ' (High-speed)';
        }
        break;
      case 'ethernet':
        type = 'Ethernet';
        break;
      case 'bluetooth':
        type = 'Bluetooth';
        break;
      case 'wimax':
        type = 'WiMAX';
        break;
      case 'none':
        type = 'Offline';
        break;
      default:
        type = conn.type;
    }
  } else if (conn.effectiveType) {
    // If type not available, use effective type with descriptive labels
    switch (conn.effectiveType) {
      case 'slow-2g':
        type = '2G (slow)';
        break;
      case '2g':
        type = '2G';
        break;
      case '3g':
        type = '3G';
        break;
      case '4g':
        type = '4G';
        // Check if it might be 5G based on speed metrics
        if (conn.downlink >= 50 && conn.rtt < 50) {
          type = '5G';
        }
        break;
      default:
        type = conn.effectiveType;
    }
  }

  // Color-code based on speed
  let speedColor = '#f97316'; // Orange for slow
  if (conn.downlink < 1) {
    speedColor = '#ef4444'; // Red for very slow
  } else if (conn.downlink > 20) {
    speedColor = '#4ade80'; // Green for fast
  } else if (conn.downlink > 100) {
    speedColor = '#22d3ee'; // Cyan for very fast
  }

  // Color-code based on latency
  let rttColor = '#f97316'; // Orange for medium latency
  if (conn.rtt > 200) {
    rttColor = '#ef4444'; // Red for high latency
  } else if (conn.rtt < 50) {
    rttColor = '#4ade80'; // Green for low latency
  } else if (conn.rtt < 20) {
    rttColor = '#22d3ee'; // Cyan for very low latency
  }

  // Build the parts with proper styling - only key terms highlighted
  let networkInfo = `<span style="color:${highlightColor}">Network:</span> ${type}${subType}`;

  // Add downlink information if available
  if (conn.downlink) {
    networkInfo += ` | <span style="color:${speedColor}">${conn.downlink} Mbps</span>`;
  }

  // Add RTT information
  if (conn.rtt) {
    networkInfo += ` | <span style="color:${highlightColor}">RTT:</span> <span style="color:${rttColor}">${conn.rtt}ms</span>`;
  }

  // Add data saver status
  if ('saveData' in conn) {
    networkInfo += ` | <span style="color:${highlightColor}">Data saver:</span> ${
      conn.saveData ? 'ON' : 'OFF'
    }`;
  }

  // Update the network information display
  networkEl.innerHTML = networkInfo;
}

/**
 * Update performance information in the debug panel
 */
function updatePerformanceInfo() {
  const perfEl = document.getElementById('md-perf');
  if (!perfEl) return;

  const highlightColor = '#64ffda'; // Blue highlight color

  // Get current FPS
  const fps = PERF_DATA.fps ? PERF_DATA.fps.current : 0;

  // Get memory usage
  const memUsed = PERF_DATA.memory ? PERF_DATA.memory.used : 0;
  const memLimit = PERF_DATA.memory ? PERF_DATA.memory.limit : 0;

  // Get page load time
  const loadTime = PERF_DATA.timing ? PERF_DATA.timing.load : 0;
  const domTime = PERF_DATA.timing ? PERF_DATA.timing.domReady : 0;

  // Color coding for FPS
  let fpsColor = '#4CAF50'; // Green for good FPS
  if (fps < 45) fpsColor = '#FF9800'; // Orange for medium FPS
  if (fps < 30) fpsColor = '#F44336'; // Red for poor FPS

  // Format the performance info with "Performance:" prefix and only key terms highlighted
  perfEl.innerHTML = `<span style="color:${highlightColor}">Performance:</span> <span style="color:${fpsColor}">${fps} FPS</span> | <span style="color:${highlightColor}">Mem:</span> ${memUsed}MB / ${memLimit}MB | <span style="color:${highlightColor}">Load:</span> ${loadTime}ms | <span style="color:${highlightColor}">DOM:</span> ${domTime}ms`;
}

// Export the module
export {
  startPerformanceMonitoring,
  updateBatteryInfo,
  monitorNetworkInfo,
  updatePerformanceInfo,
};
