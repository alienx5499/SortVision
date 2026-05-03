import { POPUP_CONFIG } from './config';

export const shouldShowPopup = (
  timeSpent: number,
  engagementScore: number,
  hasInteracted: boolean
) => {
  const { ENGAGEMENT_THRESHOLDS } = POPUP_CONFIG;

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
