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

  // Engagement scoring system
  ENGAGEMENT_SCORES: {
    click: 3,        // High engagement - user actively using features
    keydown: 2,      // Medium engagement - keyboard usage
    scroll: 1,       // Low engagement - passive browsing
    mousemove: 0.5   // Minimal engagement - just mouse movement
  },

  // Activity timeout (seconds of inactivity before reducing engagement)
  ACTIVITY_TIMEOUT: 30,

  // LocalStorage keys
  STORAGE_KEYS: {
    starred: 'sortvision-starred',
    dismissed: 'sortvision-popup-dismissed',
    starTimestamp: 'sortvision-star-timestamp',
    dismissTimestamp: 'sortvision-popup-dismiss-timestamp'
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
    show: 'popup_shown'
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
