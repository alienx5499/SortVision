import { useEffect, useState } from 'react';
import { POPUP_CONFIG } from '@/utils/popupConfig';

function callGtagEvent(
  eventName: string,
  params: Record<string, string | number>
) {
  if (typeof window === 'undefined') return;
  const w = window as Window & {
    gtag?: (
      cmd: string,
      action: string,
      p?: Record<string, string | number>
    ) => void;
  };
  w.gtag?.('event', eventName, params);
}

export type SponsorUsPopupHandlers = {
  showPopup: boolean;
  timeSpent: number;
  handleSponsorClick: () => void;
  handleDismiss: () => void;
  handleLater: () => void;
};

export function useSponsorUsPopup(): SponsorUsPopupHandlers {
  const [showPopup, setShowPopup] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    const hasSponsored = localStorage.getItem(
      POPUP_CONFIG.STORAGE_KEYS.sponsored
    );
    const hasDismissed = localStorage.getItem(
      POPUP_CONFIG.STORAGE_KEYS.sponsorDismissed
    );
    const forceFlag = localStorage.getItem('sv-show-sponsor-popup');
    const urlFlag =
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).get('showSponsorPopup');

    if (urlFlag === '1' || forceFlag === '1') {
      setTimeout(() => setShowPopup(true), 0);
    }

    const testMode =
      typeof window !== 'undefined' &&
      (new URLSearchParams(window.location.search).get('testSponsor') === '1' ||
        localStorage.getItem('sv-test-sponsor') === '1');

    if (testMode) {
      setTimeout(() => setShowPopup(true), 0);
    }

    if (hasSponsored || hasDismissed) {
      return;
    }

    const startTime = Date.now();
    let activityTimer: ReturnType<typeof setTimeout>;
    let engagementScore = 0;

    const trackInteraction = (type: string) => {
      setHasInteracted(true);
      const scores = POPUP_CONFIG.ENGAGEMENT_SCORES as Record<string, number>;
      const score = scores[type] ?? 1;
      engagementScore += score;
      clearTimeout(activityTimer);
      activityTimer = setTimeout(() => {
        engagementScore = Math.max(0, engagementScore - 1);
      }, POPUP_CONFIG.ACTIVITY_TIMEOUT * 1000);
    };

    const handleClick = () => trackInteraction('click');
    const handleScroll = () => trackInteraction('scroll');
    const handleKeyDown = () => trackInteraction('keydown');
    const handleMouseMove = () => trackInteraction('mousemove');

    document.addEventListener('click', handleClick);
    document.addEventListener('scroll', handleScroll);
    document.addEventListener('keydown', handleKeyDown);

    const devShortcut = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC');
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;
      if (cmdOrCtrl && e.shiftKey && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        setShowPopup(prev => !prev);
      }
    };
    document.addEventListener('keydown', devShortcut);
    document.addEventListener('mousemove', handleMouseMove);

    const timer = setInterval(() => {
      const currentTime = Date.now();
      const spent = Math.floor((currentTime - startTime) / 1000);
      setTimeSpent(spent);

      if (spent >= 50 && engagementScore >= 12) {
        setShowPopup(true);
        clearInterval(timer);
      } else if (spent >= 75 && hasInteracted && engagementScore >= 8) {
        setShowPopup(true);
        clearInterval(timer);
      } else if (spent >= 120 && hasInteracted && engagementScore >= 10) {
        setShowPopup(true);
        clearInterval(timer);
      } else if (spent >= 150 && engagementScore >= 15) {
        setShowPopup(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      clearTimeout(activityTimer);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keydown', devShortcut);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hasInteracted]);

  const handleSponsorClick = () => {
    callGtagEvent('sponsor_click', {
      event_category: 'engagement',
      event_label: 'popup_sponsor_click',
      value: Math.floor(timeSpent / 60),
    });
    window.open('https://github.com/sponsors/alienx5499', '_blank');
    localStorage.setItem('sortvision-sponsored', 'true');
    localStorage.setItem('sortvision-sponsor-timestamp', Date.now().toString());
    setShowPopup(false);
  };

  const handleDismiss = () => {
    callGtagEvent('sponsor_popup_dismissed', {
      event_category: 'engagement',
      event_label: 'sponsor_popup_dismiss',
      value: Math.floor(timeSpent / 60),
    });
    localStorage.setItem('sortvision-sponsor-popup-dismissed', 'true');
    localStorage.setItem(
      'sortvision-sponsor-popup-dismiss-timestamp',
      Date.now().toString()
    );
    setShowPopup(false);
  };

  const handleLater = () => {
    callGtagEvent('sponsor_popup_later', {
      event_category: 'engagement',
      event_label: 'sponsor_popup_later',
      value: Math.floor(timeSpent / 60),
    });
    setShowPopup(false);
  };

  return {
    showPopup,
    timeSpent,
    handleSponsorClick,
    handleDismiss,
    handleLater,
  };
}
