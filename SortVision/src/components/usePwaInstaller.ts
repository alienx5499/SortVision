import {
  useCallback,
  useEffect,
  useState,
  startTransition,
  type MouseEvent,
} from 'react';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

export type PwaInstallerState = {
  showInstallPrompt: boolean;
  isOnline: boolean;
  isInstalled: boolean;
  handleInstallClick: () => Promise<void>;
  handleDismiss: () => void;
  handleBackdropClick: (e: MouseEvent<HTMLDivElement>) => void;
};

export function usePwaInstaller(): PwaInstallerState {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone
    ) {
      startTransition(() => {
        setIsInstalled(true);
      });
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 PWA Debug Info:');
      console.log('- HTTPS:', window.location.protocol === 'https:');
      console.log('- Service Worker:', 'serviceWorker' in navigator);
      console.log(
        '- Manifest:',
        document.querySelector('link[rel="manifest"]')?.getAttribute('href')
      );
      console.log(
        '- Standalone:',
        window.matchMedia('(display-mode: standalone)').matches
      );
      console.log(
        '- Navigator standalone:',
        (window.navigator as Navigator & { standalone?: boolean }).standalone
      );
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      if (!isInstalled && !sessionStorage.getItem('pwa-install-dismissed')) {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
        setShowInstallPrompt(true);
      }
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    startTransition(() => {
      setIsOnline(navigator.onLine);
    });

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isInstalled]);

  const handleInstallClick = useCallback(async () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Install button clicked, deferredPrompt:', deferredPrompt);
    }

    if (!deferredPrompt) {
      if (process.env.NODE_ENV === 'development') {
        console.log('❌ No deferred prompt available');
      }
      alert(
        'PWA installation not available through browser prompt.\n\nTo install manually:\n• Chrome: Click the install icon in address bar\n• Firefox: Click the install icon in address bar\n• Safari: Tap Share > Add to Home Screen\n• Edge: Click the install icon in address bar'
      );
      setShowInstallPrompt(false);
      return;
    }

    try {
      await deferredPrompt.prompt();
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
  }, [deferredPrompt]);

  const handleDismiss = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('PWA installer dismissed');
    }
    setShowInstallPrompt(false);
    sessionStorage.setItem('pwa-install-dismissed', 'true');
  }, []);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        handleDismiss();
      }
    },
    [handleDismiss]
  );

  return {
    showInstallPrompt,
    isOnline,
    isInstalled,
    handleInstallClick,
    handleDismiss,
    handleBackdropClick,
  };
}
