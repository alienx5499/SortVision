import React, { useState, useEffect } from 'react';
import { Download, X, Wifi, WifiOff } from 'lucide-react';
import { Z_INDEX } from '../utils/zIndex';

const PWAInstaller = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isDevMode, setIsDevMode] = useState(false);

  useEffect(() => {
    // Check if we're in development mode
    const isDev = process.env.NODE_ENV === 'development';
    setIsDevMode(isDev);

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsInstalled(true);
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    // In development mode, show a mock install prompt after 3 seconds
    // Only if not already dismissed and not in test mode
    if (isDev) {
      const timer = setTimeout(() => {
        const isDismissed = sessionStorage.getItem('pwa-install-dismissed');
        const isTestMode = localStorage.getItem('sv-test-pwa') === '1';
        
        if (!isDismissed || isTestMode) {
          setShowInstallPrompt(true);
          console.log('🔧 Development mode: Showing mock PWA install prompt');
        }
      }, 3000);
      return () => clearTimeout(timer);
    }

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
    setIsOnline(navigator.onLine);

    // Cleanup
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isDevMode) {
      // Mock installation in development mode
      console.log('🔧 Development mode: Mock PWA installation');
      alert('🔧 Development Mode: This would install the PWA in production!\n\nIn production, this would:\n• Add app to home screen\n• Enable offline functionality\n• Provide native app experience');
      setIsInstalled(true);
      setShowInstallPrompt(false);
      return;
    }

    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('✅ PWA installation accepted');
    } else {
      console.log('❌ PWA installation dismissed');
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
    
    console.log('PWA installer dismissed');
  };

  const handleBackdropClick = (e) => {
    console.log('Backdrop clicked', e.target, e.currentTarget);
    if (e.target === e.currentTarget) {
      console.log('Closing PWA via backdrop click');
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
    </>
  );
};

export default PWAInstaller;
