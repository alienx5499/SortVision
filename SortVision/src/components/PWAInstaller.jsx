import React, { useState, useEffect } from 'react';
import { Download, X, Wifi, WifiOff } from 'lucide-react';
import { Z_INDEX } from '../utils/zIndex';

const PWAInstaller = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isDevMode, setIsDevMode] = useState(false);
  const [debugInfo, setDebugInfo] = useState([]);
  const [showDebugPanel, setShowDebugPanel] = useState(false);

  // Debug logging function
  const addDebugLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = { message, type, timestamp };
    setDebugInfo(prev => [...prev, logEntry]);
    console.log(`[${timestamp}] ${message}`);
  };

  useEffect(() => {
    // Check if we're in development mode
    const isDev = process.env.NODE_ENV === 'development';
    setIsDevMode(isDev);

    // Debug PWA status
    addDebugLog('🔍 PWA Debug Info:', 'info');
    addDebugLog(`- NODE_ENV: ${process.env.NODE_ENV}`, 'info');
    addDebugLog(`- Display mode standalone: ${window.matchMedia('(display-mode: standalone)').matches}`, 'info');
    addDebugLog(`- Navigator standalone: ${window.navigator.standalone}`, 'info');
    addDebugLog(`- Service Worker support: ${'serviceWorker' in navigator}`, 'info');
    addDebugLog(`- HTTPS: ${window.location.protocol === 'https:'}`, 'info');
    addDebugLog(`- Hostname: ${window.location.hostname}`, 'info');
    addDebugLog(`- User Agent: ${navigator.userAgent}`, 'info');
    
    // Check PWA installability
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(registration => {
        addDebugLog(`- Service Worker registered: ${!!registration}`, 'info');
        if (registration) {
          addDebugLog(`- Service Worker scope: ${registration.scope}`, 'info');
        }
      });
    }

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsInstalled(true);
      addDebugLog('✅ PWA already installed', 'success');
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      addDebugLog('🎉 beforeinstallprompt event fired!', 'success');
      addDebugLog(`🎉 Event details: ${JSON.stringify(e, null, 2)}`, 'info');
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    // Listen for online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Listen for custom PWA trigger events
    const handlePWATrigger = (event) => {
      addDebugLog(`🚀 PWA trigger received from: ${event.detail?.source}`, 'info');
      addDebugLog(`🚀 Deferred prompt available: ${!!deferredPrompt}`, 'info');
      setShowInstallPrompt(true);
    };

    // Add event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('triggerPWAInstall', handlePWATrigger);

    // Set a flag to track if beforeinstallprompt ever fires
    let beforeInstallPromptFired = false;
    const originalHandleBeforeInstallPrompt = handleBeforeInstallPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
      beforeInstallPromptFired = true;
      originalHandleBeforeInstallPrompt(e);
    });

    // Check initial online status
    setIsOnline(navigator.onLine);

    // Show install prompt after delay (only in development or test mode)
    // In production, wait for GitHub popup interaction
    const timer = setTimeout(() => {
      const isDismissed = sessionStorage.getItem('pwa-install-dismissed');
      const isTestMode = localStorage.getItem('sv-test-pwa') === '1';
      const hasGitHubDismissed = localStorage.getItem('sortvision-popup-dismissed');
      const hasGitHubStarred = localStorage.getItem('sortvision-starred');
      
      // Only show automatically in development or test mode
      // In production, wait for GitHub popup interaction
      if (isDev || isTestMode) {
        if (!isDismissed || isTestMode) {
          setShowInstallPrompt(true);
          if (isDev) {
            console.log('🔧 Development mode: Showing mock PWA install prompt');
          } else {
            console.log('🚀 Test mode: Showing PWA install prompt');
          }
        }
      } else {
        // In production, only show if GitHub popup was already interacted with
        if ((hasGitHubDismissed || hasGitHubStarred) && !isDismissed) {
          setShowInstallPrompt(true);
          console.log('🚀 Production: Showing PWA install prompt after GitHub interaction');
        }
      }
    }, 3000);

    // Cleanup
    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('triggerPWAInstall', handlePWATrigger);
    };
  }, []);

  const handleInstallClick = async () => {
    addDebugLog('🔧 Install button clicked', 'info');
    addDebugLog(`🔧 Dev mode: ${isDevMode}`, 'info');
    addDebugLog(`🔧 Deferred prompt: ${!!deferredPrompt}`, 'info');
    
    if (isDevMode) {
      // Mock installation in development mode
      addDebugLog('🔧 Development mode: Mock PWA installation', 'info');
      alert('🔧 Development Mode: This would install the PWA in production!\n\nIn production, this would:\n• Add app to home screen\n• Enable offline functionality\n• Provide native app experience');
      setIsInstalled(true);
      setShowInstallPrompt(false);
      return;
    }

    if (!deferredPrompt) {
      addDebugLog('❌ No deferred prompt available, showing manual install instructions', 'warning');
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isAndroid = /Android/.test(navigator.userAgent);
      const isChrome = /Chrome/.test(navigator.userAgent);
      const isSafari = /Safari/.test(navigator.userAgent) && !isChrome;
      
      let instructions = '📱 To install SortVision:\n\n';
      
      if (isIOS) {
        instructions += '• Tap the Share button (square with arrow up)\n• Scroll down and tap "Add to Home Screen"\n• Tap "Add" to confirm\n\n';
      } else if (isAndroid) {
        instructions += '• Look for the install icon in the address bar\n• Or tap the menu (3 dots) → "Install app"\n• Or "Add to Home screen"\n\n';
      } else if (isChrome) {
        instructions += '• Look for the install icon (⊕) in the address bar\n• Or click the menu (3 dots) → "Install SortVision"\n• Or press Ctrl+Shift+I → Application → Install\n\n';
      } else if (isSafari) {
        instructions += '• Go to File → "Add to Dock" (if supported)\n• Or use Share → "Add to Home Screen"\n\n';
      } else {
        instructions += '• Look for install options in your browser menu\n• Or try the address bar for install icons\n\n';
      }
      
      instructions += 'If you don\'t see install options, your browser may not support PWAs or the site needs to be added to your home screen manually.';
      
      alert(instructions);
      setShowInstallPrompt(false);
      return;
    }

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        addDebugLog('✅ PWA installation accepted', 'success');
      } else {
        addDebugLog('❌ PWA installation dismissed', 'warning');
      }
    } catch (error) {
      addDebugLog(`❌ Error during PWA installation: ${error.message}`, 'error');
      alert('❌ Installation failed. Please try using your browser\'s install option instead.');
    }
    
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    console.log('handleDismiss called');
    setShowInstallPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem('pwa-install-dismissed', 'true');
    
    // Clear test mode flags without modifying URL
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sv-test-pwa');
      // Don't modify URL to prevent reload loops
    }
    
    addDebugLog('PWA installer dismissed', 'info');
  };

  const handleBackdropClick = (e) => {
    addDebugLog('Backdrop clicked', 'info');
    if (e.target === e.currentTarget) {
      addDebugLog('Closing PWA via backdrop click', 'info');
      handleDismiss();
    }
  };

  // Test mode: Force show PWA installer for testing
  const isTestMode = typeof window !== 'undefined' && 
    (new URLSearchParams(window.location.search).get('testPWA') === '1' || 
     localStorage.getItem('sv-test-pwa') === '1');

  // Don't show if already installed or dismissed (except in dev mode or test mode)
  if (!isTestMode && (isInstalled || !showInstallPrompt || (!isDevMode && sessionStorage.getItem('pwa-install-dismissed')))) {
    return null;
  }

  return (
    <>
      {/* PWA Install Prompt */}
      {(showInstallPrompt || isTestMode) && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in-50" 
            style={{ zIndex: Z_INDEX.PWA_INSTALL_BACKDROP }}
          />
          
          {/* Modal */}
          <div 
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ zIndex: Z_INDEX.PWA_INSTALL_MODAL }}
            onClick={handleBackdropClick}
          >
            <div 
              className="w-full max-w-md transform transition-all duration-500 ease-out animate-in zoom-in-95 slide-in-from-bottom-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-slate-900 border-slate-700 shadow-2xl shadow-red-500/20 rounded-2xl relative overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-red-500/30 group">
                {/* Decorative gradient background with animation */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-red-950/30 animate-pulse pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-red-500/5 to-transparent animate-pulse [animation-delay:1s] pointer-events-none" />

                {/* Close button with improved hover effect */}
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('PWA Close button mouse down');
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('PWA Close button clicked - calling handleDismiss');
                    handleDismiss();
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('PWA Close button touch end');
                    handleDismiss();
                  }}
                  className="absolute top-3 right-3 z-50 p-1.5 rounded-full hover:bg-slate-800/80 transition-all duration-300 border border-slate-600 hover:border-red-500/50 group/close hover:rotate-90 transform cursor-pointer"
                  style={{ 
                    zIndex: 9999,
                    pointerEvents: 'auto',
                    position: 'absolute',
                    top: '12px',
                    right: '12px'
                  }}
                  aria-label="Close PWA Install"
                  type="button"
                >
                  <X className="h-4 w-4 text-slate-400 group-hover/close:text-red-400 transition-colors duration-300" />
                </button>

                <div className="p-6 pr-10 relative">
                  {/* Header with icon and title */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                        <Download className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute inset-0 rounded-full border-2 border-red-400/20 animate-ping" />
                      <div className="absolute inset-0 rounded-full border-2 border-red-400/10 animate-ping [animation-delay:0.5s]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold font-mono text-white relative group">
                        <span className="text-red-400 transition-colors duration-300 group-hover:text-red-300">
                          Install
                        </span>
                        <span className="text-emerald-400 transition-colors duration-300 group-hover:text-emerald-300">
                          SortVision
                        </span>
                    {isDevMode && (
                      <span className="ml-2 text-xs bg-yellow-600/20 text-yellow-300 px-2 py-0.5 rounded border border-yellow-600/30 font-mono">
                        DEV MODE
                      </span>
                    )}
                    {isTestMode && (
                      <span className="ml-2 text-xs bg-purple-600/20 text-purple-300 px-2 py-0.5 rounded border border-purple-600/30 font-mono">
                        TEST MODE
                      </span>
                    )}
                        <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-400/50 to-transparent animate-pulse" />
                      </h3>
                      <p className="text-slate-400 font-mono text-sm mt-1">
                        <span className="text-amber-400">//</span> PWA Installation
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <p className="text-sm text-slate-300 font-mono leading-relaxed">
                      {isDevMode 
                        ? "🔧 Development Mode: Testing PWA install prompt. In production, this would install the app!"
                        : "Install SortVision as a PWA for offline access and better performance!"
                      }
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleInstallClick}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm rounded-xl hover:from-red-400 hover:to-red-500 transition-all duration-300 font-mono shadow-lg hover:shadow-red-500/20 border border-red-400/30 hover:scale-105 transform"
                    >
                      Install App
                    </button>
                    <button
                      onClick={handleDismiss}
                      className="px-6 py-3 bg-slate-800/50 text-slate-300 text-sm rounded-xl hover:bg-slate-700/50 transition-all duration-300 font-mono border border-slate-600/30 hover:border-slate-500/50 hover:scale-105 transform"
                    >
                      Not now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Offline Indicator */}
      {!isOnline && (
        <div 
          className="fixed top-4 left-4 w-[320px] max-w-[90vw] transform transition-all duration-500 ease-out animate-in slide-in-from-top-5"
          style={{ zIndex: Z_INDEX.OFFLINE_INDICATOR }}
        >
          <div className="bg-slate-900 border-slate-700 shadow-2xl shadow-yellow-500/20 rounded-2xl relative overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-yellow-500/30 group">
            {/* Decorative gradient background with animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-yellow-950/30 animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-yellow-500/5 to-transparent animate-pulse [animation-delay:1s]" />

            <div className="p-3 relative">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-6 h-6 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <WifiOff className="w-3 h-3 text-white" />
                  </div>
                  <div className="absolute inset-0 rounded-full border-2 border-yellow-400/20 animate-ping" />
                  <div className="absolute inset-0 rounded-full border-2 border-yellow-400/10 animate-ping [animation-delay:0.5s]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold font-mono text-white">
                    <span className="text-yellow-400">Offline</span>
                    <span className="text-orange-400"> Mode</span>
                  </h4>
                  <p className="text-xs text-slate-400 font-mono">
                    <span className="text-amber-400">//</span> Some features may be limited
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Development Mode Test Button */}
      {isDevMode && !showInstallPrompt && !isInstalled && (
        <div className="fixed top-4 right-4 z-50 group">
          <div className="relative">
            {/* Animated rings */}
            <div className="absolute inset-0 rounded-full bg-yellow-400/30 animate-ping [animation-duration:2s] scale-110" />
            <div className="absolute inset-0 rounded-full bg-yellow-400/20 animate-ping [animation-duration:3s] scale-125" />

            {/* Main button */}
            <button
              onClick={() => setShowInstallPrompt(true)}
              className="relative h-12 w-12 rounded-full shadow-2xl transition-all duration-500 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500 border-2 border-yellow-300/60 hover:border-yellow-200/80 overflow-hidden group-hover:scale-110 group-hover:rotate-3 active:scale-95"
              aria-label="Test PWA Prompt"
            >
              {/* Button background effects */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300/40 via-transparent to-yellow-300/30 animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Decorative elements */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-2 left-2 w-0.5 h-0.5 bg-yellow-200 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
              </div>

              {/* Icon */}
              <div className="relative flex items-center justify-center h-full">
                <span className="text-white font-mono text-xs font-bold">🔧</span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Online Indicator */}
      {isOnline && !isInstalled && !isDevMode && (
        <div className="fixed top-4 right-4 z-50 group">
          <div className="relative">
            {/* Animated rings */}
            <div className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping [animation-duration:2s] scale-110" />
            <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping [animation-duration:3s] scale-125" />

            {/* Main button */}
            <div className="relative h-12 w-12 rounded-full shadow-2xl transition-all duration-500 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 border-2 border-emerald-300/60 overflow-hidden group-hover:scale-110 group-hover:rotate-3">
              {/* Button background effects */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300/40 via-transparent to-emerald-300/30 animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Decorative elements */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-2 left-2 w-0.5 h-0.5 bg-emerald-200 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
              </div>

              {/* Icon */}
              <div className="relative flex items-center justify-center h-full">
                <Wifi className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Debug Panel - Only show in production or when debug is enabled */}
      {(process.env.NODE_ENV === 'production' || localStorage.getItem('sv-debug-pwa') === '1') && (
        <div className="fixed bottom-4 left-4 z-50">
          <button
            onClick={() => setShowDebugPanel(!showDebugPanel)}
            className="bg-slate-800 text-white px-3 py-2 rounded-lg text-xs font-mono border border-slate-600 hover:bg-slate-700 transition-colors"
          >
            {showDebugPanel ? 'Hide' : 'Show'} PWA Debug
          </button>
          
          {showDebugPanel && (
            <div className="absolute bottom-12 left-0 w-80 max-h-96 bg-slate-900 border border-slate-600 rounded-lg shadow-2xl overflow-hidden">
              <div className="bg-slate-800 px-3 py-2 border-b border-slate-600 flex justify-between items-center">
                <span className="text-white text-xs font-mono">PWA Debug Log</span>
                <button
                  onClick={() => setDebugInfo([])}
                  className="text-slate-400 hover:text-white text-xs"
                >
                  Clear
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto p-3 space-y-1">
                {debugInfo.length === 0 ? (
                  <div className="text-slate-400 text-xs">No debug info yet...</div>
                ) : (
                  debugInfo.map((log, index) => (
                    <div key={index} className="text-xs font-mono">
                      <span className="text-slate-400">[{log.timestamp}]</span>
                      <span className={`ml-2 ${
                        log.type === 'error' ? 'text-red-400' :
                        log.type === 'warning' ? 'text-yellow-400' :
                        log.type === 'success' ? 'text-green-400' :
                        'text-white'
                      }`}>
                        {log.message}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PWAInstaller;
