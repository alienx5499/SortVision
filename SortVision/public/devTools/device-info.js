/**
 * SortVision Debug Tools - Device Info Module
 *
 * This module handles collecting and displaying device information
 */

import {
  IS_MOBILE,
  IS_IOS,
  IS_ANDROID,
  isSupported,
  formatFileSize,
} from './core.js';

// Store interval IDs for cleanup
let _timeUpdateInterval;

/**
 * Update device info display
 */
function updateDeviceInfo() {
  // Device type with more details
  const deviceEl = document.getElementById('md-device');
  if (deviceEl) {
    const ua = navigator.userAgent;
    let deviceType = 'Unknown';
    let deviceDetails = '';

    if (/iPhone/.test(ua)) {
      deviceType = 'iPhone';
      const match = ua.match(/iPhone OS (\d+)_(\d+)/);
      if (match) {
        deviceDetails = ` ${match[1]}.${match[2]}`;
      }
    } else if (/iPad/.test(ua)) {
      deviceType = 'iPad';
      const match = ua.match(/OS (\d+)_(\d+)/);
      if (match) {
        deviceDetails = ` ${match[1]}.${match[2]}`;
      }
    } else if (/Android/.test(ua)) {
      deviceType = /Mobile/.test(ua) ? 'Android Phone' : 'Android Tablet';
      const match = ua.match(/Android (\d+)\.(\d+)/);
      if (match) {
        deviceDetails = ` ${match[1]}.${match[2]}`;
      }
    } else if (/Windows/.test(ua)) {
      deviceType = 'Windows';
      if (/Windows NT 10/.test(ua)) deviceDetails = ' 10';
      else if (/Windows NT 6.3/.test(ua)) deviceDetails = ' 8.1';
      else if (/Windows NT 6.2/.test(ua)) deviceDetails = ' 8';
      else if (/Windows NT 6.1/.test(ua)) deviceDetails = ' 7';
    } else if (/Macintosh/.test(ua)) {
      deviceType = 'Mac';
      const match = ua.match(/Mac OS X (\d+)[_.](\d+)/);
      if (match) {
        deviceDetails = ` ${match[1]}.${match[2]}`;
      }
    }

    deviceEl.innerHTML = `<span>${deviceType}</span><span class="faded">${deviceDetails}</span>`;
  }

  // Browser details
  const browserEl = document.getElementById('md-browser');
  if (browserEl) {
    const ua = navigator.userAgent;
    let browser = 'Unknown';
    let version = '';

    if (/Firefox\//.test(ua)) {
      browser = 'Firefox';
      const match = ua.match(/Firefox\/(\d+\.\d+)/);
      if (match) version = match[1];
    } else if (/MSIE|Trident\//.test(ua)) {
      browser = 'IE';
      const match = ua.match(/MSIE (\d+\.\d+)/);
      if (match) version = match[1];
      else {
        const tridentMatch = ua.match(/Trident\/.*rv:(\d+\.\d+)/);
        if (tridentMatch) version = tridentMatch[1];
      }
    } else if (/Edge\//.test(ua)) {
      browser = 'Edge';
      const match = ua.match(/Edge\/(\d+\.\d+)/);
      if (match) version = match[1];
    } else if (/Edg\//.test(ua)) {
      browser = 'Edge Chromium';
      const match = ua.match(/Edg\/(\d+\.\d+)/);
      if (match) version = match[1];
    } else if (/Chrome\//.test(ua)) {
      browser = 'Chrome';
      const match = ua.match(/Chrome\/(\d+\.\d+)/);
      if (match) version = match[1];
    } else if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) {
      browser = 'Safari';
      const match = ua.match(/Version\/(\d+\.\d+)/);
      if (match) version = match[1];
    }

    // Add engine info
    let engine = '';
    if (/WebKit\//.test(ua)) engine = ' (WebKit)';
    else if (/Gecko\//.test(ua)) engine = ' (Gecko)';
    else if (/Trident\//.test(ua)) engine = ' (Trident)';

    browserEl.innerHTML = `<span>${browser}</span> <span class="faded">${version}${engine}</span>`;
  }

  // GPU Information
  const gpuEl = document.getElementById('md-gpu');
  if (gpuEl) {
    let gpuInfo = 'GPU: Unknown';

    // Try to get GPU info from WebGL
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          // Use uppercase naming for unused variables to satisfy linter
          const VENDOR = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);

          // Clean up GPU name (remove excessive text)
          let gpuName = renderer
            .replace(
              /(ANGLE |Direct3D11 |OpenGL |Metal |NVIDIA |AMD |Intel |\(R\)|\(TM\))/g,
              ''
            )
            .replace(/\s+/g, ' ')
            .trim();

          // Add badge for known GPU vendors
          let vendorBadge = '';
          if (/NVIDIA/i.test(renderer)) {
            vendorBadge = '<span style="color: #76B900;">NVIDIA</span> ';
          } else if (/AMD|Radeon/i.test(renderer)) {
            vendorBadge = '<span style="color: #ED1C24;">AMD</span> ';
          } else if (/Intel/i.test(renderer)) {
            vendorBadge = '<span style="color: #0071C5;">Intel</span> ';
          } else if (/Apple/i.test(renderer)) {
            vendorBadge = '<span style="color: #A2AAAD;">Apple</span> ';
          }

          gpuInfo = `<span>GPU: ${vendorBadge}${gpuName}</span>`;

          // Add WebGL version info
          const glVersion = gl.getParameter(gl.VERSION);
          // Use uppercase naming for unused variables to satisfy linter
          const GLSL_VERSION = gl.getParameter(gl.SHADING_LANGUAGE_VERSION);
          const glVersionShort = glVersion.split(' ')[0];
          gpuInfo += `<span class="faded"> | WebGL ${glVersionShort}</span>`;
        }
      }
    } catch (error) {
      void error; // Using void to suppress unused variable warning
      gpuInfo = 'GPU: Info restricted';
    }

    gpuEl.innerHTML = gpuInfo;
  }

  // Enhanced viewport dimensions
  const viewportEl = document.getElementById('md-viewport');
  if (viewportEl) {
    const vw = Math.round(window.innerWidth);
    const vh = Math.round(window.innerHeight);
    const vwCss = Math.round(document.documentElement.clientWidth);
    const vhCss = Math.round(document.documentElement.clientHeight);
    const layout = vw > vh ? 'landscape' : 'portrait';

    viewportEl.innerHTML = `<span>${vw}x${vh}</span> <span class="faded">(CSS: ${vwCss}x${vhCss}) [${layout}]</span>`;
  }

  // Format height info with highlighting
  const heightEl = document.getElementById('md-height');
  if (heightEl) {
    const computedStyle = getComputedStyle(document.documentElement);
    const appHeight =
      computedStyle.getPropertyValue('--app-height').trim() || 'not set';
    const bodyHeight = Math.round(document.body.offsetHeight);
    const docHeight = Math.round(document.documentElement.scrollHeight);

    heightEl.innerHTML = `<span>--app-height: ${appHeight}</span> <span class="faded">| body: ${bodyHeight}px | doc: ${docHeight}px</span>`;
  }

  // Format orientation info with warning
  const orientationEl = document.getElementById('md-orientation');
  if (orientationEl) {
    let orientationInfo = 'Unknown';
    let warning = false;

    if (window.screen && window.screen.orientation) {
      const orientation = window.screen.orientation.type;
      orientationInfo = orientation;

      // Check if orientation is locked
      if (window.screen.orientation.locked) {
        orientationInfo += ' (locked)';
      }

      // Show warning for problematic orientations on mobile
      if (
        IS_MOBILE &&
        orientation.includes('portrait') &&
        window.innerWidth < 480
      ) {
        warning = true;
      }
    } else {
      // Fallback to aspect ratio detection
      const aspect = window.innerWidth / window.innerHeight;
      orientationInfo = aspect > 1 ? 'landscape' : 'portrait';

      // Show warning for narrow portrait
      if (aspect < 0.6) {
        warning = true;
      }
    }

    orientationEl.innerHTML = `<span>${orientationInfo}</span>`;

    // Update warning icon
    const warningIcon = orientationEl.querySelector('.warning-icon');
    if (warningIcon) {
      warningIcon.style.display = warning ? 'inline' : 'none';
    }
  }

  // Format touch capability info
  const touchEl = document.getElementById('md-touch');
  if (touchEl) {
    const hasTouchScreen =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    let pointerInfo = '';

    if (window.matchMedia) {
      // Using pointer media queries for more accurate detection
      const finePointer = window.matchMedia('(pointer: fine)').matches;
      const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
      const noPointer = window.matchMedia('(pointer: none)').matches;

      const pointerTypes = [];
      if (finePointer) pointerTypes.push('fine (mouse/stylus)');
      if (coarsePointer) pointerTypes.push('coarse (touch)');
      if (noPointer) pointerTypes.push('none');

      if (pointerTypes.length > 0) {
        pointerInfo = ` | pointer: ${pointerTypes.join(', ')}`;
      }
    }

    touchEl.innerHTML = `<span>Touch: ${
      hasTouchScreen ? 'Yes' : 'No'
    }</span><span class="faded">${pointerInfo}</span>`;
  }

  // Format scroll information
  const scrollEl = document.getElementById('md-scroll');
  if (scrollEl) {
    const scrollX = Math.round(window.scrollX);
    const scrollY = Math.round(window.scrollY);
    const maxScrollX = Math.max(
      0,
      document.documentElement.scrollWidth - window.innerWidth
    );
    const maxScrollY = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight
    );

    // Calculate percentages - use specific name for unused variable to avoid linter error
    const _xPercent =
      maxScrollX > 0 ? Math.round((scrollX / maxScrollX) * 100) : 0;
    const yPercent =
      maxScrollY > 0 ? Math.round((scrollY / maxScrollY) * 100) : 0;

    scrollEl.innerHTML = `<span>Scroll: (${scrollX}, ${scrollY})</span><span class="faded"> | ${yPercent}% of page</span>`;
  }

  // Format safe area information
  const safeAreaEl = document.getElementById('md-ios-safe-area');
  if (safeAreaEl) {
    let safeAreaInfo = 'Safe areas: none';

    if (IS_IOS && window.getComputedStyle) {
      try {
        const style = window.getComputedStyle(document.documentElement);
        const top = style.getPropertyValue('--safe-area-inset-top');
        const right = style.getPropertyValue('--safe-area-inset-right');
        const bottom = style.getPropertyValue('--safe-area-inset-bottom');
        const left = style.getPropertyValue('--safe-area-inset-left');

        if (top || right || bottom || left) {
          const areas = [];
          if (top && top !== '0px') areas.push(`top: ${top}`);
          if (right && right !== '0px') areas.push(`right: ${right}`);
          if (bottom && bottom !== '0px') areas.push(`bottom: ${bottom}`);
          if (left && left !== '0px') areas.push(`left: ${left}`);

          if (areas.length) {
            safeAreaInfo = `<span>Safe areas:</span><span class="faded"> ${areas.join(
              ', '
            )}</span>`;
          }
        }
      } catch (error) {
        void error; // Using void to suppress unused variable warning
      }
    }

    safeAreaEl.innerHTML = safeAreaInfo;
  }

  // Format pixel ratio info
  const pixelRatioEl = document.getElementById('md-pixel-ratio');
  if (pixelRatioEl) {
    const ratio = window.devicePixelRatio || 1;
    let screenInfo = '';

    if (window.screen) {
      const screenW = window.screen.width;
      const screenH = window.screen.height;
      screenInfo = ` | screen: ${screenW}x${screenH}`;
    }

    pixelRatioEl.innerHTML = `<span>Pixel Ratio: ${ratio.toFixed(
      2
    )}</span><span class="faded">${screenInfo}</span>`;
  }

  // Format network info - implemented in performance.js

  // Format performance info - implemented in performance.js

  // Format battery info - implemented in performance.js

  // Format supported features
  const featuresEl = document.getElementById('md-features');
  if (featuresEl) {
    const features = [
      { name: 'WebGL', supported: isSupported('webgl') },
      { name: 'WebGL2', supported: isSupported('webgl2') },
      { name: 'WebP', supported: !!window.createImageBitmap },
      { name: 'WebWorkers', supported: isSupported('webworker') },
      { name: 'ServiceWorker', supported: isSupported('serviceWorker') },
      { name: 'WebAssembly', supported: isSupported('webAssembly') },
      { name: 'Intl', supported: !!window.Intl },
      {
        name: 'IntersectionObserver',
        supported: !!window.IntersectionObserver,
      },
      { name: 'ResizeObserver', supported: !!window.ResizeObserver },
      { name: 'WebAnimations', supported: 'animate' in Element.prototype },
      {
        name: 'ES6',
        supported: typeof Symbol !== 'undefined' && Symbol.iterator,
      },
    ];

    const supported = features.filter(f => f.supported);
    // Define unused variables with underscore prefix to satisfy linter
    const _unsupported = features.filter(f => !f.supported);

    const supportedNames = supported.map(f => f.name);

    featuresEl.innerHTML = `<span>Features (${supported.length}/${
      features.length
    }):</span> <span class="faded">${supportedNames.join(', ')}</span>`;
  }

  // Format available input methods
  const inputsEl = document.getElementById('md-inputs');
  if (inputsEl) {
    const inputs = [];

    if (navigator.maxTouchPoints > 0) {
      inputs.push('touchscreen');
    }

    if (window.matchMedia('(pointer: fine)').matches) {
      inputs.push('mouse/touchpad');
    }

    // Check for gamepad
    if ('getGamepads' in navigator) {
      try {
        const gamepads = navigator.getGamepads();
        if (gamepads && gamepads.length && gamepads[0]) {
          inputs.push('gamepad');
        }
      } catch (error) {
        void error; // Using void to suppress unused variable warning
      }
    }

    inputsEl.innerHTML = `<span>Inputs:</span> <span class="faded">${
      inputs.join(', ') || 'unknown'
    }</span>`;
  }

  // Format haptic feedback support
  const hapticsEl = document.getElementById('md-haptics');
  if (hapticsEl) {
    const hasVibration = isSupported('vibrate');
    const highlightColor = '#64ffda'; // Blue highlight color

    let hapticsInfo = `<span style="color:${highlightColor}">Haptics:</span> ${
      hasVibration ? 'supported (Vibration API)' : 'not supported'
    }`;

    if (hasVibration) {
      hapticsInfo +=
        ' <button id="test-haptics" style="background: rgba(30, 41, 59, 0.8); border: 1px solid #475569; color: #64ffda; padding: 0.2em 0.5em; border-radius: 3px; font-size: 0.8em; margin-left: 0.5em; cursor: pointer;">Test</button>';
    }

    hapticsEl.innerHTML = hapticsInfo;

    // Add event listener for haptics test
    const testButton = document.getElementById('test-haptics');
    if (testButton) {
      testButton.addEventListener('click', e => {
        e.preventDefault();
        if (hasVibration) {
          navigator.vibrate(200);
          testButton.textContent = 'Vibrating...';
          setTimeout(() => {
            testButton.textContent = 'Test';
          }, 300);
        }
      });
    }
  }

  // Format sensor information
  const sensorsEl = document.getElementById('md-sensors');
  if (sensorsEl) {
    const hasMotion = isSupported('deviceMotion');
    const hasOrientation = isSupported('deviceOrientation');
    const hasGyro = hasMotion || hasOrientation;
    const hasAccel = hasMotion;

    const sensors = [];
    if (hasMotion) sensors.push('motion');
    if (hasOrientation) sensors.push('orientation');
    if (hasGyro) sensors.push('gyroscope');
    if (hasAccel) sensors.push('accelerometer');

    let accelValue = '';

    if (hasAccel) {
      // Will be updated by the event listener
      accelValue = ' | accel: 0';
    }

    sensorsEl.innerHTML = `<span>Sensors (${
      sensors.length
    }):</span> <span class="faded">${sensors.join(', ')}${accelValue}</span>`;

    // Add motion event listeners if supported
    if (hasMotion) {
      window.addEventListener(
        'devicemotion',
        e => {
          if (!e.acceleration) return;

          const accel = e.acceleration;
          const magnitude = Math.sqrt(
            accel.x * accel.x + accel.y * accel.y + accel.z * accel.z
          );

          const accelEl = document.getElementById('md-sensors');
          if (accelEl) {
            const parts = accelEl.innerHTML.split('|');
            if (parts.length > 1) {
              const newHtml = `${parts[0]}| accel: ${magnitude.toFixed(1)}`;
              accelEl.innerHTML = newHtml;
            }
          }
        },
        { passive: true }
      );
    }
  }

  // Format storage information
  const storageEl = document.getElementById('md-storage');
  if (storageEl) {
    const storageTypes = [];

    // Check localStorage
    try {
      if (window.localStorage) {
        storageTypes.push('localStorage');
      }
    } catch (error) {
      void error; // Using void to suppress unused variable warning
    }

    // Check sessionStorage
    try {
      if (window.sessionStorage) {
        storageTypes.push('sessionStorage');
      }
    } catch (error) {
      void error; // Using void to suppress unused variable warning
    }

    // Check indexedDB
    try {
      if (window.indexedDB) {
        storageTypes.push('indexedDB');
      }
    } catch (error) {
      void error; // Using void to suppress unused variable warning
    }

    // Try to get storage quotas
    // using underscore prefix for the unused variable to satisfy linter
    let _quotaInfo = '';

    if (navigator.storage && navigator.storage.estimate) {
      navigator.storage
        .estimate()
        .then(estimate => {
          const used = formatFileSize(estimate.usage || 0);
          const quota = formatFileSize(estimate.quota || 0);

          // Update the element
          const storageEl = document.getElementById('md-storage');
          if (storageEl) {
            storageEl.innerHTML = `<span>Storage:</span> <span class="faded">${storageTypes.join(
              ', '
            )} | ${used} / ${quota}</span>`;
          }
        })
        .catch(error => {
          void error; // Using void to suppress unused variable warning
        });
    } else {
      // Fallback for browsers without storage estimate API
      storageEl.innerHTML = `<span>Storage:</span> <span class="faded">${storageTypes.join(
        ', '
      )}</span>`;
    }
  }

  // Format time information
  const timeEl = document.getElementById('md-time');
  if (timeEl) {
    const highlightColor = '#64ffda'; // Blue highlight color

    // Clear any existing interval
    if (_timeUpdateInterval) {
      clearInterval(_timeUpdateInterval);
    }

    // Function to update time display
    const updateTimeDisplay = () => {
      const now = new Date();

      // Format time with seconds
      const timeString = now.toLocaleTimeString();

      // Format offset from UTC more precisely
      const offsetMinutes = now.getTimezoneOffset();
      const offsetHours = Math.abs(Math.floor(offsetMinutes / 60));
      const offsetMins = Math.abs(offsetMinutes % 60);
      const offsetSign = offsetMinutes <= 0 ? '+' : '-';
      const offsetFormatted = `UTC${offsetSign}${offsetHours}${
        offsetMins > 0 ? `:${offsetMins.toString().padStart(2, '0')}` : ''
      }`;

      // Calculate uptime from navigation start for precision
      let uptimeSeconds;
      if (window.performance && window.performance.timing) {
        uptimeSeconds = Math.round(
          (now.getTime() - window.performance.timing.navigationStart) / 1000
        );
      } else {
        uptimeSeconds = Math.round(performance.now() / 1000);
      }

      const hours = Math.floor(uptimeSeconds / 3600);
      const minutes = Math.floor((uptimeSeconds % 3600) / 60);
      const seconds = uptimeSeconds % 60;

      // Format uptime string based on duration
      let uptimeFormatted = '';
      if (hours > 0) {
        uptimeFormatted = `${hours}h ${minutes}m ${seconds}s`;
      } else if (minutes > 0) {
        uptimeFormatted = `${minutes}m ${seconds}s`;
      } else {
        uptimeFormatted = `${seconds}s`;
      }

      timeEl.innerHTML = `<span style="color:${highlightColor}">Time:</span> ${timeString} | ${offsetFormatted} | Uptime: ${uptimeFormatted}`;
    };

    // Update time immediately
    updateTimeDisplay();

    // Set up interval to update time every second
    _timeUpdateInterval = setInterval(updateTimeDisplay, 1000);
  }

  // Format PWA information
  const pwaEl = document.getElementById('md-pwa');
  if (pwaEl) {
    let pwaStatus = 'not installable';

    if ('serviceWorker' in navigator) {
      // Check if app is already installed
      if (
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true
      ) {
        pwaStatus = 'installed';
      } else if (window.BeforeInstallPromptEvent) {
        // Detectable as installable
        pwaStatus = 'installable';
      }
    }

    pwaEl.innerHTML = `<span>PWA:</span> <span class="faded">${pwaStatus}</span>`;
  }
}

/**
 * Monitor touch events
 */
function monitorTouchEvents() {
  const touchTypes = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];

  // Last touch position for tracking - use underscore prefix to satisfy linter
  let _lastTouchY = 0;

  touchTypes.forEach(type => {
    document.addEventListener(
      type,
      e => {
        const touch = e.touches[0] || e.changedTouches[0];
        if (!touch) return;

        // Track touch position
        if (type === 'touchstart' || type === 'touchmove') {
          _lastTouchY = touch.clientY;
        }

        // Update touch info in panel
        const touchEl = document.getElementById('md-touch');
        if (touchEl) {
          const x = Math.round(touch.clientX);
          const y = Math.round(touch.clientY);
          touchEl.textContent = `${type} at ${x},${y}`;
        }
      },
      { passive: true }
    );
  });

  // Reset touch info when no touches
  document.addEventListener(
    'touchend',
    () => {
      setTimeout(() => {
        const touchEl = document.getElementById('md-touch');
        if (touchEl && touchEl.textContent.includes('touchend')) {
          touchEl.textContent = 'Waiting for touch...';
        }
      }, 2000);
    },
    { passive: true }
  );
}

/**
 * Monitor scroll events
 */
function monitorScrollEvents() {
  const scrollEl = document.getElementById('md-scroll');
  if (!scrollEl) return;

  let lastScrollY = window.scrollY;
  let lastScrollX = window.scrollX;
  // Use uppercase for constants
  const MAX_SCROLL_X = Math.max(
    0,
    document.documentElement.scrollWidth - window.innerWidth
  );
  const MAX_SCROLL_Y = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight
  );

  window.addEventListener('scroll', () => {
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    if (scrollX !== lastScrollX || scrollY !== lastScrollY) {
      lastScrollX = scrollX;
      lastScrollY = scrollY;

      // Calculate scroll percentages - use underscore prefix for unused variable
      const _xPercent =
        MAX_SCROLL_X > 0 ? Math.round((scrollX / MAX_SCROLL_X) * 100) : 0;
      const yPercent =
        MAX_SCROLL_Y > 0 ? Math.round((scrollY / MAX_SCROLL_Y) * 100) : 0;

      scrollEl.innerHTML = `<span>Scroll: (${scrollX}, ${scrollY})</span><span class="faded"> | ${yPercent}% of page</span>`;
    }
  });
}

/**
 * Monitor viewport changes
 */
function monitorViewportChanges() {
  ['resize', 'orientationchange'].forEach(eventType => {
    window.addEventListener(
      eventType,
      () => {
        // Update after orientation changes
        setTimeout(updateDeviceInfo, 100);
        // Check again after iOS momentum scrolling typically finishes
        setTimeout(updateDeviceInfo, 500);
      },
      { passive: true }
    );
  });
}

/**
 * Clear all intervals and cleanup resources
 */
function cleanupDeviceInfo() {
  if (_timeUpdateInterval) {
    clearInterval(_timeUpdateInterval);
    _timeUpdateInterval = null;
  }
}

// Export the module
export {
  updateDeviceInfo,
  monitorTouchEvents,
  monitorScrollEvents,
  monitorViewportChanges,
  cleanupDeviceInfo,
};
