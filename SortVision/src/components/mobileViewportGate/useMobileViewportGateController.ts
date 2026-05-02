import { useCallback, useEffect, useRef, useState } from 'react';
import { useMobileOverlay } from '@/components/MobileOverlayContext';

const CONTINUE_ON_MOBILE_KEY = 'continue-on-mobile';
const REQUEST_DESKTOP_SITE_KEY = 'request-desktop-site';
const DESKTOP_SCALE = '0.8';

const isMobileViewport = () =>
  /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth <= 768;

const applyDesktopPreference = () => {
  document.documentElement.style.setProperty('--viewport-scale', DESKTOP_SCALE);
  document.documentElement.classList.add('desktop-view-requested');
};

const closeGateFrame = (close: () => void) => {
  requestAnimationFrame(() => {
    window.setTimeout(close, 300);
  });
};

export const useMobileViewportGateController = () => {
  const { isMobileOverlayVisible, setMobileOverlayVisible } =
    useMobileOverlay();
  const [animationStage, setAnimationStage] = useState(0);
  const timerRefs = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timerRefs.current.forEach(window.clearTimeout);
    timerRefs.current = [];
  }, []);

  useEffect(() => {
    const hasUserContinued =
      localStorage.getItem(CONTINUE_ON_MOBILE_KEY) === 'true';
    const hasRequestedDesktop =
      localStorage.getItem(REQUEST_DESKTOP_SITE_KEY) === 'true';

    if (hasRequestedDesktop) {
      applyDesktopPreference();
      return;
    }

    if (isMobileViewport() && !hasUserContinued) {
      requestAnimationFrame(() => {
        setMobileOverlayVisible(true);
        document.body.style.overflow = 'hidden';
      });

      timerRefs.current.push(
        window.setTimeout(() => setAnimationStage(1), 200)
      );
      timerRefs.current.push(
        window.setTimeout(() => setAnimationStage(2), 400)
      );
      timerRefs.current.push(
        window.setTimeout(() => setAnimationStage(3), 600)
      );
    }

    let orientationTimer: number | null = null;
    const handleOrientationChange = () => {
      if (!hasRequestedDesktop) return;
      if (orientationTimer) window.clearTimeout(orientationTimer);
      orientationTimer = window.setTimeout(applyDesktopPreference, 200);
    };

    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      if (orientationTimer) window.clearTimeout(orientationTimer);
      clearTimers();
    };
  }, [clearTimers, setMobileOverlayVisible]);

  const handleContinue = useCallback(() => {
    setAnimationStage(4);
    localStorage.setItem(CONTINUE_ON_MOBILE_KEY, 'true');

    closeGateFrame(() => {
      setMobileOverlayVisible(false);
      document.body.style.overflow = 'auto';
    });
  }, [setMobileOverlayVisible]);

  const handleRequestDesktop = useCallback(() => {
    setAnimationStage(4);
    localStorage.setItem(CONTINUE_ON_MOBILE_KEY, 'true');
    localStorage.setItem(REQUEST_DESKTOP_SITE_KEY, 'true');

    closeGateFrame(() => {
      applyDesktopPreference();
      setMobileOverlayVisible(false);
      document.body.style.overflow = 'auto';
    });
  }, [setMobileOverlayVisible]);

  return {
    animationStage,
    isMobileOverlayVisible,
    handleContinue,
    handleRequestDesktop,
  };
};
