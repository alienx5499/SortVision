import { useState, useEffect } from 'react';
import { X, Github, Star } from 'lucide-react';
import StarOnGithub from './mvpblocks/star-on-github.jsx';
import { POPUP_CONFIG } from '../utils/popupConfig';
import { fetchRepoInfo } from '../utils/githubApi';

const StarOnGithubPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [repoStats, setRepoStats] = useState({ stars: 1200, starFormatted: '1.2k' });
  const [repoLoading, setRepoLoading] = useState(true); // eslint-disable-line no-unused-vars

  useEffect(() => {
    // Check if user has already dismissed the popup or starred
    const hasStarred = localStorage.getItem(POPUP_CONFIG.STORAGE_KEYS.starred);
    const hasDismissed = localStorage.getItem(POPUP_CONFIG.STORAGE_KEYS.dismissed);
    const forceFlag = localStorage.getItem('sv-show-star-popup');
    const urlFlag = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('showStarPopup');

    // Load repository statistics (always attempt)
    const loadRepoStats = async () => {
      try {
        setRepoLoading(true);
        const info = await fetchRepoInfo();
        setRepoStats({
          stars: info.stars,
          starFormatted: info.stars >= 1000 ?
            (info.stars / 1000).toFixed(1).replace('.0', '') + 'k' :
            info.stars.toString()
        });
      } catch (error) {
        console.warn('Failed to load repo stats:', error);
      } finally {
        setRepoLoading(false);
      }
    };

    loadRepoStats();
    const refresh = setInterval(loadRepoStats, 60000);

    // Dev/QA: allow forcing popup via query/localStorage (do not short-circuit repo fetch)
    if (urlFlag === '1' || forceFlag === '1') {
      setShowPopup(true);
    }

    if (hasStarred || hasDismissed) {
      return () => clearInterval(refresh);
    }

    // Track time spent on the app
    const startTime = Date.now();
    let activityTimer;
    let engagementScore = 0;

    // Track user interactions to determine engagement
    const trackInteraction = (type) => {
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

    // Dev shortcut: Ctrl/Cmd+Shift+G to toggle popup
    const devShortcut = e => {
      const isMac = navigator.platform.toUpperCase().includes('MAC');
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;
      if (cmdOrCtrl && e.shiftKey && (e.key === 'G' || e.key === 'g')) {
        e.preventDefault();
        setShowPopup(prev => !prev);
      }
    };
    document.addEventListener('keydown', devShortcut);
    document.addEventListener('mousemove', handleMouseMove);

    // Timer to track time spent and show popup
    const timer = setInterval(() => {
      const currentTime = Date.now();
      const spent = Math.floor((currentTime - startTime) / 1000);
      setTimeSpent(spent);

      // Show popup if user has spent enough time and is engaged
      // Conditions for showing popup:
      
      // 1. Standard engagement: 45+ seconds with good interaction
      if (spent >= 45 && hasInteracted && engagementScore >= 5) {
        setShowPopup(true);
        clearInterval(timer);
      }
      
      // 2. High engagement: Very active user in shorter time
      else if (spent >= 20 && engagementScore >= 12) {
        setShowPopup(true);
        clearInterval(timer);
      }
      
      // 3. Power user: Extensive exploration
      else if (spent >= 90 && engagementScore >= 15) {
        setShowPopup(true);
        clearInterval(timer);
      }
      
      // 4. Extended session: User has been exploring for a while
      else if (spent >= 120 && hasInteracted && engagementScore >= 8) {
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
      clearInterval(refresh);
    };
  }, [hasInteracted]);

  const handleStarClick = () => {
    // Track analytics event if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'github_star_click', {
        event_category: 'engagement',
        event_label: 'popup_star_click',
        value: Math.floor(timeSpent / 60) // Time spent in minutes
      });
    }
    
    // Open GitHub repository
    window.open('https://github.com/alienx5499/SortVision', '_blank');
    
    // Mark as starred in localStorage
    localStorage.setItem('sortvision-starred', 'true');
    localStorage.setItem('sortvision-star-timestamp', Date.now().toString());
    
    // Hide popup
    setShowPopup(false);
  };

  const handleDismiss = () => {
    // Track analytics event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'popup_dismissed', {
        event_category: 'engagement',
        event_label: 'github_popup_dismiss',
        value: Math.floor(timeSpent / 60)
      });
    }
    
    // Mark as dismissed
    localStorage.setItem('sortvision-popup-dismissed', 'true');
    localStorage.setItem('sortvision-popup-dismiss-timestamp', Date.now().toString());
    setShowPopup(false);
  };

  const handleLater = () => {
    // Track analytics event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'popup_later', {
        event_category: 'engagement',
        event_label: 'github_popup_later',
        value: Math.floor(timeSpent / 60)
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
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] animate-in fade-in duration-300"
        onClick={handleLater}
      />
      
      {/* Popup - centered modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center animate-in fade-in duration-300">
        <div className="w-[380px] max-w-[90vw] bg-slate-900 border border-slate-700 shadow-2xl shadow-red-500/20 rounded-2xl relative overflow-hidden transition-transform duration-300 hover:scale-[1.01]">
          {/* Decorative gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-red-950/30 animate-gradient" />
          <div className="relative p-6">
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 z-10 p-1.5 rounded-full hover:bg-slate-800/80 transition-all duration-300 border border-slate-600 hover:border-red-500/50 group hover:rotate-90 transform"
            aria-label="Close popup"
          >
            <X className="h-4 w-4 text-slate-400 group-hover:text-red-400 transition-colors duration-300" />
          </button>

          {/* Content */}
          <div className="text-center space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <div className="relative mx-auto w-10 h-10 mb-1">
                <Star className="w-6 h-6 text-emerald-400 absolute inset-0 m-auto" />
                <div className="absolute inset-0 rounded-full border-2 border-emerald-400/20 animate-ping" />
                <div className="absolute inset-0 rounded-full border-2 border-emerald-400/10 animate-ping [animation-delay:0.5s]" />
              </div>
              <h3 className="text-xl font-bold font-mono text-white relative group">
                Enjoying SortVision?
              </h3>
              <p className="text-slate-400 font-mono text-sm leading-relaxed">
                You've been exploring algorithms for a while! If you're finding SortVision helpful, 
                consider giving us a star on GitHub. It helps us reach more learners like you!
              </p>
            </div>

            {/* Benefits */}
            <div className="bg-slate-800/50 rounded-xl p-4 text-left border border-slate-700 relative overflow-hidden">
              {/* subtle gradient line */}
              <div className="absolute -inset-x-1 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-slate-300" />
                  <h4 className="font-semibold text-sm text-white">Why star us?</h4>
                </div>
                <div className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-900 border border-slate-700 text-slate-300">
                  Live: <span className="text-emerald-400 font-semibold">{repoStats.starFormatted}</span> stars
                </div>
              </div>

              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-[3px] inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Support open-source education</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-[3px] inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Help others discover this tool</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-[3px] inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Show appreciation for free learning resources</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-[3px] inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>
                    Join our community of <span className="font-semibold text-emerald-400">{repoStats.starFormatted}+ developers</span>
                  </span>
                </li>
              </ul>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              {/* Star button */}
              <div onClick={handleStarClick} className="cursor-pointer">
                <StarOnGithub />
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
              🎯 You've spent {Math.floor(timeSpent / 60)}m {timeSpent % 60}s exploring algorithms
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default StarOnGithubPopup;
