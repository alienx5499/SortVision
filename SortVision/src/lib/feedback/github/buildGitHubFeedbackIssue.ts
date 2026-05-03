import type { EnhancedFeedbackPayload, GitHubIssueDraft } from '../types';
import { DEV_MODE } from './githubFeedbackConfig';
import {
  getRatingDisplay,
  formatLocationInfo,
  formatLocationDetails,
  formatSessionData,
  formatDeviceInfo,
  formatNetworkInfo,
  formatPerformanceInfo,
  formatPageContext,
  formatMemoryInfo,
  formatAccessibilityInfo,
  formatFeatureUsage,
  formatErrorHistory,
} from './formatters';

/**
 * Build GitHub issue title, markdown body, and labels from enriched feedback payload.
 */
export function buildGitHubFeedbackIssue(
  feedbackData: EnhancedFeedbackPayload
): GitHubIssueDraft {
  const issueBody = `## Feedback Details
  
**From:** ${feedbackData.name}
**Email:** ${feedbackData.email || 'Not provided (anonymous feedback)'}
**Rating:** ${getRatingDisplay(feedbackData.rating ?? 0)}
**Region:** ${feedbackData.region || 'Not specified'}
${formatLocationInfo(feedbackData.locationData)}
**Type:** ${feedbackData.feedbackType}
**Follow-up:** ${
    feedbackData.email
      ? 'Email provided - can follow up'
      : 'Anonymous - no follow-up possible'
  }
  
---
  
## Detailed Feedback
  
${feedbackData.detailedFeedback}
${formatLocationDetails(feedbackData.locationData)}
${formatSessionData(feedbackData.sessionData)}
${formatDeviceInfo(feedbackData.deviceInfo, feedbackData.browserCapabilities)}
${formatNetworkInfo(feedbackData.networkInfo)}
${formatPerformanceInfo(feedbackData.performanceInfo)}
${formatPageContext(feedbackData.pageContext)}
${formatMemoryInfo(feedbackData.memoryInfo)}
${formatAccessibilityInfo(feedbackData.accessibilityInfo)}
${formatFeatureUsage(feedbackData.featureUsage)}
${formatErrorHistory(feedbackData.errorHistory)}
  
---
  
**Technical Metadata:**
- **Source:** SortVision Feedback Form
- **Environment:** ${DEV_MODE ? 'Development' : 'Production'}
- **Session ID:** \`${feedbackData.sessionData?.sessionId || 'Unknown'}\`
- **User Agent:** ${
    feedbackData.sessionData?.userAgent ||
    (typeof globalThis !== 'undefined' &&
    'navigator' in globalThis &&
    globalThis.navigator
      ? globalThis.navigator.userAgent
      : 'Unknown')
  }
- **Page URL:** ${
    typeof window !== 'undefined' ? window.location.href : 'Unknown'
  }
- **Submission ID:** ${Date.now().toString(36).toUpperCase()}`;

  const labels = [
    'user-feedback',
    feedbackData.feedbackType.toLowerCase().replace(/\s+/g, '-'),
  ];

  if (feedbackData.feedbackType === 'Bug') {
    labels.push('bug');
  }

  if (feedbackData.feedbackType === 'Feature Request') {
    labels.push('enhancement');
  }

  if (DEV_MODE) {
    labels.push('development');
  }

  return {
    title: `${feedbackData.feedbackType}: ${feedbackData.name}`,
    body: issueBody,
    labels,
    assignees: [],
  };
}
