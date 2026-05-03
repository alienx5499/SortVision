/**
 * Configuration for engagement-driven popups.
 */
export const POPUP_CONFIG = {
  ENGAGEMENT_THRESHOLDS: {
    standard: {
      minTime: 45,
      minEngagement: 5,
      requiresInteraction: true,
    },
    highActivity: {
      minTime: 20,
      minEngagement: 12,
      requiresInteraction: true,
    },
    powerUser: {
      minTime: 90,
      minEngagement: 15,
      requiresInteraction: true,
    },
    extended: {
      minTime: 120,
      minEngagement: 8,
      requiresInteraction: true,
    },
  },
  ENGAGEMENT_SCORES: {
    click: 2.5,
    keydown: 1.5,
    scroll: 0.8,
    mousemove: 0.2,
  },
  QUALITY_SCORES: {
    algorithmSelect: 5,
    sortingStart: 6,
    sortingPause: 4,
    arraySizeChange: 3,
    speedChange: 3,
    tabSwitch: 2,
  },
  THROTTLE_MS: {
    click: 200,
    scroll: 100,
    keydown: 150,
    mousemove: 500,
  },
  ACTIVITY_TIMEOUT: 30,
  DECAY_RATE: 0.95,
  USE_EXPONENTIAL_DECAY: true,
  STORAGE_KEYS: {
    starred: 'sortvision-starred',
    dismissed: 'sortvision-popup-dismissed',
    starTimestamp: 'sortvision-star-timestamp',
    dismissTimestamp: 'sortvision-popup-dismiss-timestamp',
    sponsored: 'sortvision-sponsored',
    sponsorDismissed: 'sortvision-sponsor-popup-dismissed',
    sponsorTimestamp: 'sortvision-sponsor-timestamp',
    sponsorDismissTimestamp: 'sortvision-sponsor-popup-dismiss-timestamp',
  },
  GITHUB_URL: 'https://github.com/alienx5499/SortVision',
  STAR_COUNT: '1.2k',
  ANALYTICS_EVENTS: {
    starClick: 'github_star_click',
    dismiss: 'popup_dismissed',
    later: 'popup_later',
    show: 'popup_shown',
    sponsorClick: 'sponsor_click',
    sponsorDismiss: 'sponsor_popup_dismissed',
    sponsorLater: 'sponsor_popup_later',
    sponsorShow: 'sponsor_popup_shown',
  },
} as const;
