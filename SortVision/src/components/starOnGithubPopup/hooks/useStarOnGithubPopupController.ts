import { useEffect, useRef, useState } from 'react';
import { POPUP_CONFIG, trackPopupEvent } from '@/utils/popupConfig';
import { fetchRepoInfo } from '@/utils/githubApi';
import {
  applyDecayImproved,
  calculateWeightedScore,
  trackInteractionImproved,
} from '@/utils/improvedEngagement';
import { getInitialPopupVisibility } from '../utils/popupFlags';
import { formatStarCountDisplay } from '../utils/formatStarCount';
import type {
  GithubStarRepoStats,
  UseStarOnGithubPopupControllerResult,
} from '../starOnGithubPopupContracts';

const { STORAGE_KEYS, GITHUB_URL } = POPUP_CONFIG;

export function useStarOnGithubPopupController(): UseStarOnGithubPopupControllerResult {
  const [showPopup, setShowPopup] = useState(getInitialPopupVisibility);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [repoStats, setRepoStats] = useState<GithubStarRepoStats>({
    stars: 1200,
    starFormatted: '1.2k',
  });

  const activityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const engagementScore = useRef(0);
  const interactionHistory = useRef<unknown[]>([]);
  const qualityInteractions = useRef(0);

  useEffect(() => {
    const hasStarred = localStorage.getItem(STORAGE_KEYS.starred);
    const hasDismissed = localStorage.getItem(STORAGE_KEYS.dismissed);

    const loadRepoStats = async () => {
      try {
        const info = await fetchRepoInfo();
        const stars = typeof info.stars === 'number' ? info.stars : 1200;
        setRepoStats({
          stars,
          starFormatted: formatStarCountDisplay(stars),
        });
      } catch (error) {
        console.warn('Failed to load repo stats:', error);
      }
    };

    void loadRepoStats();
    const refresh = setInterval(() => void loadRepoStats(), 60_000);

    if (hasStarred || hasDismissed) {
      return () => clearInterval(refresh);
    }

    const startTime = Date.now();
    const useImproved = POPUP_CONFIG.USE_EXPONENTIAL_DECAY;
    engagementScore.current = 0;
    interactionHistory.current = [];
    qualityInteractions.current = 0;

    const trackInteraction = (
      type: string,
      qualityType: string | null = null
    ) => {
      setHasInteracted(true);

      if (useImproved && POPUP_CONFIG.THROTTLE_MS) {
        const result = trackInteractionImproved(
          type,
          engagementScore.current,
          interactionHistory.current,
          qualityType,
          POPUP_CONFIG
        );

        engagementScore.current = result.score;
        interactionHistory.current = result.history;

        if (qualityType || result.added >= 3) qualityInteractions.current++;

        if (activityTimer.current) clearTimeout(activityTimer.current);
        activityTimer.current = setTimeout(() => {
          engagementScore.current = applyDecayImproved(
            engagementScore.current,
            POPUP_CONFIG.DECAY_RATE || 0.95,
            true
          );
        }, POPUP_CONFIG.ACTIVITY_TIMEOUT * 1000);
      } else {
        const score =
          (POPUP_CONFIG.ENGAGEMENT_SCORES as Record<string, number>)[type] || 1;
        engagementScore.current += score;

        if (activityTimer.current) clearTimeout(activityTimer.current);
        activityTimer.current = setTimeout(() => {
          engagementScore.current = Math.max(0, engagementScore.current - 1);
        }, POPUP_CONFIG.ACTIVITY_TIMEOUT * 1000);
      }
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
      if (cmdOrCtrl && e.shiftKey && (e.key === 'G' || e.key === 'g')) {
        e.preventDefault();
        setShowPopup(prev => !prev);
      }
    };
    document.addEventListener('keydown', devShortcut);
    document.addEventListener('mousemove', handleMouseMove);

    const timer = setInterval(() => {
      const spent = Math.floor((Date.now() - startTime) / 1000);
      setTimeSpent(spent);

      let currentScore = engagementScore.current;
      if (useImproved) {
        currentScore = calculateWeightedScore(
          engagementScore.current,
          qualityInteractions.current,
          1.0,
          spent
        );
      }

      if (
        (spent >= 45 && hasInteracted && currentScore >= 5) ||
        (spent >= 20 && currentScore >= 12) ||
        (spent >= 90 && currentScore >= 15) ||
        (spent >= 120 && hasInteracted && currentScore >= 8)
      ) {
        setShowPopup(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      if (activityTimer.current) clearTimeout(activityTimer.current);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keydown', devShortcut);
      document.removeEventListener('mousemove', handleMouseMove);
      clearInterval(refresh);
    };
  }, [hasInteracted]);

  const handleStarClick = () => {
    trackPopupEvent('starClick', timeSpent, {
      event_label: 'popup_star_click',
    });
    window.open(GITHUB_URL, '_blank', 'noopener,noreferrer');
    localStorage.setItem(STORAGE_KEYS.starred, 'true');
    localStorage.setItem(STORAGE_KEYS.starTimestamp, Date.now().toString());
    setShowPopup(false);
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent('triggerPWAInstall', {
          detail: { source: 'github_star_click' },
        })
      );
    }, 6000);
  };

  const handleDismiss = () => {
    trackPopupEvent('dismiss', timeSpent, {
      event_label: 'github_popup_dismiss',
    });
    localStorage.setItem(STORAGE_KEYS.dismissed, 'true');
    localStorage.setItem(STORAGE_KEYS.dismissTimestamp, Date.now().toString());
    setShowPopup(false);
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent('triggerPWAInstall', {
          detail: { source: 'github_popup_dismiss' },
        })
      );
    }, 5000);
  };

  const handleLater = () => {
    trackPopupEvent('later', timeSpent, {
      event_label: 'github_popup_later',
    });
    setShowPopup(false);
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent('triggerPWAInstall', {
          detail: { source: 'github_popup_later' },
        })
      );
    }, 7000);
  };

  return {
    showPopup,
    timeSpent,
    repoStats,
    handleStarClick,
    handleDismiss,
    handleLater,
  };
}
