import React, { useState, useEffect, useRef, startTransition } from 'react';
import { Download, X, Wifi, WifiOff } from 'lucide-react';
import { Z_INDEX } from '../utils/zIndex';

const PWAInstaller = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isInstalled, setIsInstalled] = useState(false);

  const timerRef = useRef(null);
  const fallbackTimerRef = useRef(null);

  useEffect(() => {
    // Check if app is already installed
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone
    ) {
      startTransition(() => {
      setIsInstalled(true);
      });
    }

    // Debug PWA requirements (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 PWA Debug Info:');
      console.log('- HTTPS:', window.location.protocol === 'https:');
      console.log('- Service Worker:', 'serviceWorker' in navigator);
      console.log(
        '- Manifest:',
        document.querySelector('link[rel="manifest"]')?.href
      );
      console.log(
        '- Standalone:',
        window.matchMedia('(display-mode: standalone)').matches
      );
      console.log('- Navigator standalone:', window.navigator.standalone);
    }

    // beforeinstallprompt handler - only show when available
    const handleBeforeInstallPrompt = e => {
      // Only preventDefault if we actually want to show the prompt
      // This prevents the browser warning about preventDefault without prompt()
      if (!isInstalled && !sessionStorage.getItem('pwa-install-dismissed')) {
        e.preventDefault();
        setDeferredPrompt(e);
        setShowInstallPrompt(true);
      }
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

    // Add event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check initial online status
    startTransition(() => {
    setIsOnline(navigator.onLine);
    });

    // Cleanup
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstallClick = async () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Install button clicked, deferredPrompt:', deferredPrompt);
    }

    if (!deferredPrompt) {
      if (process.env.NODE_ENV === 'development') {
        console.log('❌ No deferred prompt available');
      }
      // Show instructions for manual installation
      alert(
        'PWA installation not available through browser prompt.\n\nTo install manually:\n• Chrome: Click the install icon in address bar\n• Firefox: Click the install icon in address bar\n• Safari: Tap Share > Add to Home Screen\n• Edge: Click the install icon in address bar'
      );
      setShowInstallPrompt(false);
      return;
    }

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted' && process.env.NODE_ENV === 'development') {
        console.log('✅ PWA installation accepted');
      } else if (process.env.NODE_ENV === 'development') {
        console.log('❌ PWA installation dismissed');
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ PWA installation error:', error);
      }
      alert(
        'Installation failed. Please try again or install manually from your browser menu.'
      );
    }

    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('PWA installer dismissed');
    }
    setShowInstallPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem('pwa-install-dismissed', 'true');
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      handleDismiss();
    }
  };

  // Simple display logic - don't show if already installed or dismissed
  if (
    isInstalled ||
    !showInstallPrompt ||
    sessionStorage.getItem('pwa-install-dismissed')
  ) {
    return null;
  }

  return (
    <>
      {/* PWA Install Prompt */}
      {showInstallPrompt && (
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
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-slate-900 border-slate-700 shadow-2xl shadow-red-500/20 rounded-2xl relative overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-red-500/30 group">
                {/* Decorative gradient background with animation */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-red-950/30 animate-pulse pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-red-500/5 to-transparent animate-pulse [animation-delay:1s] pointer-events-none" />

                {/* Close button with improved hover effect */}
                <button
                  onMouseDown={e => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDismiss();
                  }}
                  onTouchEnd={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDismiss();
                  }}
                  className="absolute top-3 right-3 z-50 p-1.5 rounded-full hover:bg-slate-800/80 transition-all duration-300 border border-slate-600 hover:border-red-500/50 group/close hover:rotate-90 transform cursor-pointer"
                  style={{
                    zIndex: 9999,
                    pointerEvents: 'auto',
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
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

                        <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-400/50 to-transparent animate-pulse" />
                      </h3>
                      <p className="text-slate-400 font-mono text-sm mt-1">
                        <span className="text-amber-400">//</span> PWA
                        Installation
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <p className="text-sm text-slate-300 font-mono leading-relaxed">
                      Install SortVision as a PWA for offline access and better
                      performance!
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
                    <span className="text-amber-400">//</span> Some features may
                    be limited
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PWAInstaller;
