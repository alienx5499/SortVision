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
} from './githubIssueFormatters';

function getEmojiForType(type) {
  const emojiMap = {
    Bug: '🐛',
    'Feature Request': '✨',
    Suggestion: '💡',
    Other: '📝',
  };
  return emojiMap[type] || '📝';
}

/**
 * Build GitHub issue title, markdown body, and labels from enriched feedback payload.
 */
export function buildGitHubFeedbackIssue(feedbackData) {
  const issueBody = `## Feedback Details
  
**👤 From:** ${feedbackData.name}
**📧 Email:** ${feedbackData.email || 'Not provided (anonymous feedback)'}
**⭐ Rating:** ${getRatingDisplay(feedbackData.rating)}
**🌍 Region:** ${feedbackData.region || 'Not specified'}
${formatLocationInfo(feedbackData.locationData)}
**🏷️ Type:** ${feedbackData.feedbackType}
**📬 Follow-up:** ${
    feedbackData.email
      ? '✅ Email provided - can follow up'
      : '❌ Anonymous - no follow-up possible'
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
  
**🔧 Technical Metadata:**
- **Source:** SortVision Feedback Form
- **Environment:** ${DEV_MODE ? 'Development' : 'Production'}
- **Session ID:** \`${feedbackData.sessionData?.sessionId || 'Unknown'}\`
- **User Agent:** ${feedbackData.sessionData?.userAgent || navigator.userAgent}
- **Page URL:** ${
    typeof window !== 'undefined' ? window.location.href : 'Unknown'
  }
- **Submission ID:** ${Date.now().toString(36).toUpperCase()}`;

  // Create labels based on feedback type
  const labels = [
    'user-feedback',
    feedbackData.feedbackType.toLowerCase().replace(/\s+/g, '-'),
  ];

  // Add priority label for bugs
  if (feedbackData.feedbackType === 'Bug') {
    labels.push('bug');
  }

  // Add enhancement label for feature requests
  if (feedbackData.feedbackType === 'Feature Request') {
    labels.push('enhancement');
  }

  // Add environment label
  if (DEV_MODE) {
    labels.push('development');
  }

  return {
    title: `${getEmojiForType(feedbackData.feedbackType)} ${
      feedbackData.feedbackType
    }: ${feedbackData.name}`,
    body: issueBody,
    labels: labels,
    assignees: [],
  };
}
