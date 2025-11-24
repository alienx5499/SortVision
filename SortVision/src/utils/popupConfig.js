/**
 * Configuration for the Star on GitHub popup
 * Adjust these values to fine-tune when the popup appears
 */

export const POPUP_CONFIG = {
  // Engagement thresholds
  ENGAGEMENT_THRESHOLDS: {
    // Standard engagement: 45+ seconds with decent interaction
    standard: {
      minTime: 45, // seconds
      minEngagement: 5,
      requiresInteraction: true
    },
    
    // High engagement: Very active user in shorter time  
    highActivity: {
      minTime: 20, // seconds
      minEngagement: 12,
      requiresInteraction: true
    },
    
    // Power user: Extensive exploration
    powerUser: {
      minTime: 90, // seconds
      minEngagement: 15,
      requiresInteraction: true
    },
    
    // Extended session: User exploring for a while
    extended: {
      minTime: 120, // seconds
      minEngagement: 8,
      requiresInteraction: true
    }
  },

  // Engagement scoring system (improved)
  ENGAGEMENT_SCORES: {
    click: 2.5,      // High engagement - user actively using features (reduced to prevent spam)
    keydown: 1.5,    // Medium engagement - keyboard usage
    scroll: 0.8,     // Low engagement - passive browsing
    mousemove: 0.2   // Minimal engagement - just mouse movement (reduced)
  },

  // Quality-based interaction scores (algorithm-specific)
  QUALITY_SCORES: {
    algorithmSelect: 5,      // User selected an algorithm
    sortingStart: 6,         // User started sorting
    sortingPause: 4,         // User paused/resumed
    arraySizeChange: 3,      // User changed array size
    speedChange: 3,          // User changed speed
    tabSwitch: 2,            // User switched tabs
  },

  // Throttle configuration (prevents spam)
  THROTTLE_MS: {
    click: 200,      // 200ms between clicks
    scroll: 100,     // 100ms between scrolls
    keydown: 150,    // 150ms between keydowns
    mousemove: 500,  // 500ms between mouse moves
  },

  // Activity timeout (seconds of inactivity before reducing engagement)
  ACTIVITY_TIMEOUT: 30,

  // Decay configuration (exponential decay instead of linear)
  DECAY_RATE: 0.95,  // 5% decay per 30 seconds of inactivity
  USE_EXPONENTIAL_DECAY: true, // Use improved decay algorithm

  // LocalStorage keys
  STORAGE_KEYS: {
    starred: 'sortvision-starred',
    dismissed: 'sortvision-popup-dismissed',
    starTimestamp: 'sortvision-star-timestamp',
    dismissTimestamp: 'sortvision-popup-dismiss-timestamp',
    sponsored: 'sortvision-sponsored',
    sponsorDismissed: 'sortvision-sponsor-popup-dismissed',
    sponsorTimestamp: 'sortvision-sponsor-timestamp',
    sponsorDismissTimestamp: 'sortvision-sponsor-popup-dismiss-timestamp'
  },

  // GitHub repository URL
  GITHUB_URL: 'https://github.com/alienx5499/SortVision',

  // Current star count (update this manually or fetch from GitHub API)
  STAR_COUNT: '1.2k',

  // Analytics events
  ANALYTICS_EVENTS: {
    starClick: 'github_star_click',
    dismiss: 'popup_dismissed', 
    later: 'popup_later',
    show: 'popup_shown',
    sponsorClick: 'sponsor_click',
    sponsorDismiss: 'sponsor_popup_dismissed',
    sponsorLater: 'sponsor_popup_later',
    sponsorShow: 'sponsor_popup_shown'
  }
};

/**
 * Helper function to check if popup should be shown based on time and engagement
 */
export const shouldShowPopup = (timeSpent, engagementScore, hasInteracted) => {
  const { ENGAGEMENT_THRESHOLDS } = POPUP_CONFIG;
  
  // Check each threshold condition
  for (const [key, threshold] of Object.entries(ENGAGEMENT_THRESHOLDS)) {
    if (
      timeSpent >= threshold.minTime &&
      engagementScore >= threshold.minEngagement &&
      (!threshold.requiresInteraction || hasInteracted)
    ) {
      return { shouldShow: true, trigger: key };
    }
  }
  
  return { shouldShow: false, trigger: null };
};

/**
 * Helper function to track analytics events
 */
export const trackPopupEvent = (eventType, timeSpent, additionalData = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const eventName = POPUP_CONFIG.ANALYTICS_EVENTS[eventType];
    if (eventName) {
      window.gtag('event', eventName, {
        event_category: 'engagement',
        event_label: `github_popup_${eventType}`,
        value: Math.floor(timeSpent / 60), // Time in minutes
        ...additionalData
      });
    }
  }
};
