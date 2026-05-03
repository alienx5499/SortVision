'use client';

import { Download, X, WifiOff } from 'lucide-react';
import { Z_INDEX } from '@/utils/zIndex';
import { usePwaInstaller } from './usePwaInstaller';

export default function PWAInstaller() {
  const {
    showInstallPrompt,
    isOnline,
    isInstalled,
    handleInstallClick,
    handleDismiss,
    handleBackdropClick,
  } = usePwaInstaller();

  if (
    isInstalled ||
    !showInstallPrompt ||
    sessionStorage.getItem('pwa-install-dismissed')
  ) {
    return null;
  }

  return (
    <>
      {showInstallPrompt && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in-50"
            style={{ zIndex: Z_INDEX.PWA_INSTALL_BACKDROP }}
          />

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
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-red-950/30 animate-pulse pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-red-500/5 to-transparent animate-pulse [animation-delay:1s] pointer-events-none" />

                <button
                  type="button"
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
                >
                  <X className="h-4 w-4 text-slate-400 group-hover/close:text-red-400 transition-colors duration-300" />
                </button>

                <div className="p-6 pr-10 relative">
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

                  <div className="mb-6">
                    <p className="text-sm text-slate-300 font-mono leading-relaxed">
                      Install SortVision as a PWA for offline access and better
                      performance!
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => void handleInstallClick()}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm rounded-xl hover:from-red-400 hover:to-red-500 transition-all duration-300 font-mono shadow-lg hover:shadow-red-500/20 border border-red-400/30 hover:scale-105 transform"
                    >
                      Install App
                    </button>
                    <button
                      type="button"
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

      {!isOnline && (
        <div
          className="fixed top-4 left-4 w-[320px] max-w-[90vw] transform transition-all duration-500 ease-out animate-in slide-in-from-top-5"
          style={{ zIndex: Z_INDEX.OFFLINE_INDICATOR }}
        >
          <div className="bg-slate-900 border-slate-700 shadow-2xl shadow-yellow-500/20 rounded-2xl relative overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-yellow-500/30 group">
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
}
