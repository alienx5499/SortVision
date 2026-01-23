import { useState, useEffect } from 'react';
import { X, Heart, Sparkles } from 'lucide-react';
import SponsorUs from './mvpblocks/sponsor-us.jsx';
import { POPUP_CONFIG } from '../utils/popupConfig';
import { Z_INDEX } from '../utils/zIndex';

const SponsorUsPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    // Check if user has already dismissed the popup or sponsored
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

    // Dev/QA: allow forcing popup via query/localStorage
    if (urlFlag === '1' || forceFlag === '1') {
      setTimeout(() => setShowPopup(true), 0);
    }

    // Test mode: Force show sponsor popup for testing
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

    // Track time spent on the app
    const startTime = Date.now();
    let activityTimer;
    let engagementScore = 0;

    // Track user interactions to determine engagement
    const trackInteraction = type => {
      setHasInteracted(true);

      // Use configured engagement scores
      const score = POPUP_CONFIG.ENGAGEMENT_SCORES[type] || 1;
      engagementScore += score;

      // Reset activity timer on interaction
      clearTimeout(activityTimer);
      activityTimer = setTimeout(() => {
        // User has been inactive, reduce engagement
        engagementScore = Math.max(0, engagementScore - 1);
      }, POPUP_CONFIG.ACTIVITY_TIMEOUT * 1000);
    };

    // Add event listeners for tracking engagement
    const handleClick = () => trackInteraction('click');
    const handleScroll = () => trackInteraction('scroll');
    const handleKeyDown = () => trackInteraction('keydown');
    const handleMouseMove = () => trackInteraction('mousemove');

    document.addEventListener('click', handleClick);
    document.addEventListener('scroll', handleScroll);
    document.addEventListener('keydown', handleKeyDown);

    // Dev shortcut: Ctrl/Cmd+Shift+S to toggle popup
    const devShortcut = e => {
      const isMac = navigator.platform.toUpperCase().includes('MAC');
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;
      if (cmdOrCtrl && e.shiftKey && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        setShowPopup(prev => !prev);
      }
    };
    document.addEventListener('keydown', devShortcut);
    document.addEventListener('mousemove', handleMouseMove);

    // Timer to track time spent and show popup
    // Show sponsor popup after more engagement (typically after GitHub star popup)
    const timer = setInterval(() => {
      const currentTime = Date.now();
      const spent = Math.floor((currentTime - startTime) / 1000);
      setTimeSpent(spent);

      // Show popup if user has spent enough time and is engaged
      // Sponsor popup - Balanced timing (appears after GitHub star, but not too late)

      // 1. High engagement: Very active user (50s + 12 points - after GitHub star has time)
      if (spent >= 50 && engagementScore >= 12) {
        setShowPopup(true);
        clearInterval(timer);
      }

      // 2. Standard engagement: Normal user (75s + 8 points - good balance)
      else if (spent >= 75 && hasInteracted && engagementScore >= 8) {
        setShowPopup(true);
        clearInterval(timer);
      }

      // 3. Extended session: User has been exploring (120s + 10 points - 2 minutes)
      else if (spent >= 120 && hasInteracted && engagementScore >= 10) {
        setShowPopup(true);
        clearInterval(timer);
      }

      // 4. Power user: Extensive exploration (150s + 15 points - 2.5 minutes)
      else if (spent >= 150 && engagementScore >= 15) {
        setShowPopup(true);
        clearInterval(timer);
      }
    }, 1000);

    // Cleanup
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
    // Track analytics event if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'sponsor_click', {
        event_category: 'engagement',
        event_label: 'popup_sponsor_click',
        value: Math.floor(timeSpent / 60), // Time spent in minutes
      });
    }

    // Open GitHub Sponsors page
    window.open('https://github.com/sponsors/alienx5499', '_blank');

    // Mark as sponsored in localStorage
    localStorage.setItem('sortvision-sponsored', 'true');
    localStorage.setItem('sortvision-sponsor-timestamp', Date.now().toString());

    // Hide popup
    setShowPopup(false);
  };

  const handleDismiss = () => {
    // Track analytics event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'sponsor_popup_dismissed', {
        event_category: 'engagement',
        event_label: 'sponsor_popup_dismiss',
        value: Math.floor(timeSpent / 60),
      });
    }

    // Mark as dismissed
    localStorage.setItem('sortvision-sponsor-popup-dismissed', 'true');
    localStorage.setItem(
      'sortvision-sponsor-popup-dismiss-timestamp',
      Date.now().toString()
    );
    setShowPopup(false);
  };

  const handleLater = () => {
    // Track analytics event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'sponsor_popup_later', {
        event_category: 'engagement',
        event_label: 'sponsor_popup_later',
        value: Math.floor(timeSpent / 60),
      });
    }

    // Don't mark as permanently dismissed, just hide for this session
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
        style={{ zIndex: Z_INDEX.SPONSOR_BACKDROP }}
        onClick={handleLater}
      />

      {/* Popup - centered modal */}
      <div
        className="fixed inset-0 flex items-center justify-center animate-in fade-in duration-300"
        style={{ zIndex: Z_INDEX.SPONSOR_MODAL }}
      >
        <div className="w-[380px] max-w-[90vw] bg-slate-900 border border-slate-700 shadow-2xl shadow-pink-500/20 rounded-2xl relative overflow-hidden transition-transform duration-300 hover:scale-[1.01]">
          {/* Decorative gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-pink-950/30 animate-gradient" />
          <div className="relative p-6">
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full hover:bg-slate-800/80 transition-all duration-300 border border-slate-600 hover:border-pink-500/50 group hover:rotate-90 transform"
              aria-label="Close popup"
            >
              <X className="h-4 w-4 text-slate-400 group-hover:text-pink-400 transition-colors duration-300" />
            </button>

            {/* Content */}
            <div className="text-center space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <div className="relative mx-auto w-10 h-10 mb-1">
                  <Heart className="w-6 h-6 text-pink-400 absolute inset-0 m-auto fill-pink-400 animate-pulse" />
                  <div className="absolute inset-0 rounded-full border-2 border-pink-400/20 animate-ping" />
                  <div className="absolute inset-0 rounded-full border-2 border-pink-400/10 animate-ping [animation-delay:0.5s]" />
                  <Sparkles className="w-3 h-3 text-pink-300 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold font-mono text-white relative group">
                  Love SortVision?
                  {typeof window !== 'undefined' &&
                    (new URLSearchParams(window.location.search).get(
                      'testSponsor'
                    ) === '1' ||
                      localStorage.getItem('sv-test-sponsor') === '1') && (
                      <span className="ml-2 text-xs bg-purple-600/20 text-purple-300 px-2 py-0.5 rounded border border-purple-600/30 font-mono">
                        TEST MODE
                      </span>
                    )}
                </h3>
                <p className="text-slate-400 font-mono text-sm leading-relaxed">
                  Your support helps us keep SortVision free and open-source!
                  Consider sponsoring us to help maintain and improve this
                  educational tool.
                </p>
              </div>

              {/* Benefits */}
              <div className="bg-slate-800/50 rounded-xl p-4 text-left border border-slate-700 relative overflow-hidden">
                {/* subtle gradient line */}
                <div className="absolute -inset-x-1 top-0 h-px bg-gradient-to-r from-transparent via-pink-400/40 to-transparent" />

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                    <h4 className="font-semibold text-sm text-white">
                      Why sponsor us?
                    </h4>
                  </div>
                </div>

                <ul className="text-xs text-slate-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-[3px] inline-block w-1.5 h-1.5 rounded-full bg-pink-400" />
                    <span>Keep SortVision free and accessible to everyone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[3px] inline-block w-1.5 h-1.5 rounded-full bg-pink-400" />
                    <span>Support ongoing development and new features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[3px] inline-block w-1.5 h-1.5 rounded-full bg-pink-400" />
                    <span>
                      Help us maintain server costs and infrastructure
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[3px] inline-block w-1.5 h-1.5 rounded-full bg-pink-400" />
                    <span>
                      Enable us to create more educational content and tools
                    </span>
                  </li>
                </ul>
              </div>

              {/* Action buttons */}
              <div className="space-y-3">
                {/* Sponsor button */}
                <div onClick={handleSponsorClick} className="cursor-pointer">
                  <SponsorUs />
                </div>

                {/* Secondary actions */}
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={handleLater}
                    className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    Maybe later
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    Don't show again
                  </button>
                </div>
              </div>

              {/* User engagement stats (fun touch) */}
              <div className="text-xs text-slate-400 border-t border-slate-700 pt-4">
                💝 Thank you for being part of the SortVision community!
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SponsorUsPopup;
