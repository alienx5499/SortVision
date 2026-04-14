/**
 * GitHub API service for SortVision feedback submission
 * Handles creating issues in the GitHub repository
 */

const GITHUB_API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const REPO_OWNER = process.env.NEXT_PUBLIC_FEEDBACK_REPO_OWNER;
const REPO_NAME = process.env.NEXT_PUBLIC_FEEDBACK_REPO_NAME;
const USER_AGENT = process.env.NEXT_PUBLIC_API_USER_AGENT;
const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === 'true';
const ENABLE_API_LOGGING =
  process.env.NEXT_PUBLIC_ENABLE_API_LOGGING === 'true' || DEV_MODE;

/**
 * Submit feedback by creating a GitHub issue
 * @param {Object} feedbackData - The feedback form data
 * @param {string} feedbackData.name - User's name
 * @param {string} feedbackData.email - User's email (optional)
 * @param {string} feedbackData.feedbackType - Type of feedback (Bug, Feature Request, etc.)
 * @param {string} feedbackData.detailedFeedback - Detailed feedback text
 * @param {number} feedbackData.rating - Star rating (0-5)
 * @param {string} feedbackData.region - User's region
 * @returns {Promise<Object>} - Response from GitHub API
 */
export const submitFeedback = async feedbackData => {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  if (!token) {
    console.error(
      '❌ GitHub token not found. Please set NEXT_PUBLIC_GITHUB_TOKEN in your environment variables.'
    );
    throw new Error(
      'GitHub token not found. Please set NEXT_PUBLIC_GITHUB_TOKEN in your environment variables.'
    );
  }

  if (!REPO_OWNER) {
    console.error(
      '❌ Repository owner missing. Please set NEXT_PUBLIC_GITHUB_REPO_OWNER in your environment variables.'
    );
    throw new Error(
      'Repository owner missing. Please set NEXT_PUBLIC_GITHUB_REPO_OWNER in your environment variables.'
    );
  }

  // Debug logging for API access
  if (ENABLE_API_LOGGING) {
    console.log('🔍 GitHub API Debug Info:', {
      apiBase: GITHUB_API_BASE,
      repoOwner: REPO_OWNER,
      repoName: REPO_NAME,
      tokenPresent: !!token,
      tokenPrefix: token ? `${token.substring(0, 8)}...` : 'None',
      environment: DEV_MODE ? 'Development' : 'Production',
    });
  }

  // Generate star rating display
  const getRatingDisplay = rating => {
    if (rating === 0) return '⭐ Not rated';
    const stars = '⭐'.repeat(rating);
    const labels = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'];
    return `${stars} ${rating}/5 - ${labels[rating]}`;
  };

  // Format location information like "Bengaluru, India, Asia Pacific"
  const formatLocationInfo = locationData => {
    if (!locationData) {
      return 'Location: Not detected';
    }

    const parts = [];
    // Same order as UI: City, Country, Region
    if (locationData.city && locationData.city !== 'Unknown')
      parts.push(locationData.city);
    if (locationData.country && locationData.country !== 'Unknown')
      parts.push(locationData.country);
    if (locationData.region && locationData.region !== 'Unknown')
      parts.push(locationData.region);

    const location = parts.length > 0 ? parts.join(', ') : 'Unknown';
    const method = locationData.detectionMethod || 'Unknown';
    const accuracy = locationData.accuracy || 'unknown';

    return `📍 **Location:** ${location} (via ${method}, ${accuracy} accuracy)`;
  };

  // Format enhanced location details
  const formatLocationDetails = locationData => {
    if (!locationData) {
      return '';
    }

    let details = '\n## 🌍 Location Information\n\n';

    if (locationData.ip && locationData.ip !== 'Unknown') {
      details += `- **IP Address:** ${locationData.ip}\n`;
    }

    if (locationData.country && locationData.country !== 'Unknown') {
      details += `- **Country:** ${locationData.country}`;
      if (locationData.countryCode && locationData.countryCode !== 'Unknown') {
        details += ` (${locationData.countryCode})`;
      }
      details += '\n';
    }

    if (locationData.region && locationData.region !== 'Unknown') {
      details += `- **Region/State:** ${locationData.region}\n`;
    }

    if (locationData.city && locationData.city !== 'Unknown') {
      details += `- **City:** ${locationData.city}\n`;
    }

    if (locationData.latitude && locationData.longitude) {
      details += `- **Coordinates:** ${locationData.latitude}, ${locationData.longitude}\n`;
    }

    if (locationData.timezone && locationData.timezone !== 'Unknown') {
      details += `- **Timezone:** ${locationData.timezone}\n`;
    }

    if (locationData.isp && locationData.isp !== 'Unknown') {
      details += `- **ISP:** ${locationData.isp}\n`;
    }

    if (
      locationData.org &&
      locationData.org !== 'Unknown' &&
      locationData.org !== locationData.isp
    ) {
      details += `- **Organization:** ${locationData.org}\n`;
    }

    if (locationData.asn && locationData.asn !== 'Unknown') {
      details += `- **ASN:** ${locationData.asn}\n`;
    }

    details += `- **Detection Method:** ${
      locationData.detectionMethod || 'Unknown'
    }\n`;
    details += `- **Accuracy Level:** ${locationData.accuracy || 'unknown'}\n`;
    details += `- **Detected At:** ${
      locationData.detectedAt || new Date().toISOString()
    }\n`;

    return details;
  };

  // Format comprehensive session and technical data
  const formatSessionData = sessionData => {
    if (!sessionData) return '';

    const formatTime = seconds => {
      if (seconds < 60) return `${seconds}s`;
      if (seconds < 3600)
        return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return `${hours}h ${minutes}m`;
    };

    return `
## 📊 Session Analytics

**🆔 Session ID:** \`${sessionData.sessionId}\`
**⏱️ Time on Site:** ${formatTime(sessionData.timeSpentOnSite)} *(${
      sessionData.timeSpentOnSite > 300
        ? 'Engaged user'
        : sessionData.timeSpentOnSite > 60
          ? 'Active session'
          : 'Quick visit'
    })*
**🕐 Session Started:** ${new Date(
      sessionData.sessionStartTime
    ).toLocaleString()}
**📤 Submitted:** ${new Date(sessionData.submissionTime).toLocaleString()}
**🖥️ Screen:** ${sessionData.screenResolution} (Viewport: ${
      sessionData.viewportSize
    })
**🎨 Color Depth:** ${sessionData.colorDepth}bit, **Pixel Ratio:** ${
      sessionData.pixelRatio
    }x
**🌐 Language:** ${sessionData.language} (Available: ${
      sessionData.languages?.join(', ') || 'N/A'
    })
**🕐 Timezone:** ${sessionData.timezone}`;
  };

  // Format device and browser information
  const formatDeviceInfo = (deviceInfo, browserCapabilities) => {
    if (!deviceInfo) return '';

    const caps = browserCapabilities || {};
    const supportedFeatures = Object.entries(caps)
      .filter(([, supported]) => supported)
      .map(([feature]) => feature)
      .join(', ');

    const unsupportedFeatures = Object.entries(caps)
      .filter(([, supported]) => !supported)
      .map(([feature]) => feature)
      .join(', ');

    return `
## 📱 Device & Browser Information

**📱 Device Type:** ${deviceInfo.deviceType} (Mobile: ${
      deviceInfo.isMobile ? '✅' : '❌'
    }, Tablet: ${deviceInfo.isTablet ? '✅' : '❌'})
**💻 Platform:** ${deviceInfo.platform}
**🏢 Vendor:** ${deviceInfo.vendor}
**🌐 Online Status:** ${deviceInfo.onlineStatus ? '🟢 Online' : '🔴 Offline'}
**🍪 Cookies:** ${deviceInfo.cookieEnabled ? '✅ Enabled' : '❌ Disabled'}
**🔒 Do Not Track:** ${deviceInfo.doNotTrack}

### Browser Capabilities
**✅ Supported:** ${supportedFeatures || 'None detected'}
**❌ Unsupported:** ${unsupportedFeatures || 'All supported'}`;
  };

  // Format network information
  const formatNetworkInfo = networkInfo => {
    if (!networkInfo) return '';

    const connectionQuality =
      networkInfo.effectiveType === '4g'
        ? '🟢 Excellent'
        : networkInfo.effectiveType === '3g'
          ? '🟡 Good'
          : networkInfo.effectiveType === '2g'
            ? '🟠 Poor'
            : '⚪ Unknown';

    return `
## 🌐 Network Information

**📶 Connection:** ${networkInfo.effectiveType} ${connectionQuality}
**⬇️ Downlink:** ${networkInfo.downlink}Mbps
**⏱️ RTT:** ${networkInfo.rtt}ms
**💾 Data Saver:** ${networkInfo.saveData ? '✅ Enabled' : '❌ Disabled'}`;
  };

  // Format performance metrics
  const formatPerformanceInfo = performanceInfo => {
    if (!performanceInfo) return '';

    return `
## ⚡ Performance Metrics

**🏠 DOM Content Loaded:** ${performanceInfo.domContentLoaded}ms
**📄 Page Load:** ${performanceInfo.pageLoad}ms
**🔍 DNS Lookup:** ${performanceInfo.dnsLookup}ms
**🔗 TCP Connect:** ${performanceInfo.tcpConnect}ms
**📡 Server Response:** ${performanceInfo.serverResponse}ms`;
  };

  // Format page context
  const formatPageContext = pageContext => {
    if (!pageContext) return '';

    return `
## 📄 Page Context

**📍 Current Page:** ${pageContext.pathname}
**🔗 Full URL:** ${pageContext.url}
**🔍 Query Parameters:** ${pageContext.search || 'None'}
**⚓ Hash:** ${pageContext.hash || 'None'}
**👈 Referrer:** ${pageContext.referrer}
**📜 Page Title:** ${pageContext.title}
**📏 Scroll Position:** ${pageContext.scrollPosition.x}, ${
      pageContext.scrollPosition.y
    }
**📐 Document Height:** ${pageContext.documentHeight}px`;
  };

  // Format memory information
  const formatMemoryInfo = memoryInfo => {
    if (!memoryInfo) return '';

    const memoryUsage = (
      (memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit) *
      100
    ).toFixed(1);
    const memoryStatus =
      memoryUsage > 80 ? '🔴 High' : memoryUsage > 50 ? '🟡 Medium' : '🟢 Low';

    return `
## 🧠 Memory Information

**💾 Used Heap:** ${memoryInfo.usedJSHeapSize}MB
**📦 Total Heap:** ${memoryInfo.totalJSHeapSize}MB
**🏗️ Heap Limit:** ${memoryInfo.jsHeapSizeLimit}MB
**📊 Usage:** ${memoryUsage}% ${memoryStatus}`;
  };

  // Format error history
  const formatErrorHistory = errorHistory => {
    if (!errorHistory || errorHistory.length === 0) return '';

    const errorList = errorHistory
      .map(
        (error, index) =>
          `${index + 1}. **${error.message || 'Unknown Error'}** at ${
            error.timestamp || 'Unknown time'
          }\n   \`${error.stack || 'No stack trace'}\``
      )
      .join('\n');

    return `
## ⚠️ Recent Errors (Last 5)

${errorList}`;
  };

  // Format feature usage
  const formatFeatureUsage = featureUsage => {
    if (!featureUsage) return '';

    const usageList = Object.entries(featureUsage)
      .map(([feature, data]) => {
        if (typeof data === 'object' && data.count) {
          return `**${feature}:** ${data.count} times (Last used: ${new Date(
            data.lastUsed
          ).toLocaleString()})`;
        }
        return `**${feature}:** ${data}`;
      })
      .join('\n');

    return `
## 🎯 Feature Usage Analytics

${usageList}`;
  };

  // Format accessibility information
  const formatAccessibilityInfo = accessibilityInfo => {
    if (!accessibilityInfo) return '';

    return `
## ♿ Accessibility Preferences

**🎬 Reduce Motion:** ${
      accessibilityInfo.reduceMotion ? '✅ Enabled' : '❌ Disabled'
    }
**🌗 Dark Mode:** ${
      accessibilityInfo.darkMode ? '🌙 Preferred' : '☀️ Light mode'
    }
**🔆 High Contrast:** ${
      accessibilityInfo.highContrast ? '✅ Enabled' : '❌ Disabled'
    }
**🎨 Forced Colors:** ${
      accessibilityInfo.forcedColors ? '✅ Active' : '❌ Inactive'
    }`;
  };

  // Format the issue body with comprehensive data
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

  const issueData = {
    title: `${getEmojiForType(feedbackData.feedbackType)} ${
      feedbackData.feedbackType
    }: ${feedbackData.name}`,
    body: issueBody,
    labels: labels,
    assignees: [], // You can add assignees here if needed
  };

  if (ENABLE_API_LOGGING) {
    console.log('Submitting feedback to GitHub:', {
      repo: `${REPO_OWNER}/${REPO_NAME}`,
      title: issueData.title,
      labels: issueData.labels,
    });
  }

  try {
    const apiUrl = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/issues`;

    if (ENABLE_API_LOGGING) {
      console.log('🚀 Making GitHub API request:', {
        url: apiUrl,
        method: 'POST',
        hasToken: !!token,
        tokenLength: token ? token.length : 0,
      });
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `token ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': USER_AGENT,
      },
      body: JSON.stringify(issueData),
    });

    if (!response.ok) {
      console.error(
        `❌ GitHub API Error ${response.status}: ${response.statusText}`
      );

      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = {
          message: `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      console.error('📋 Error Details:', {
        status: response.status,
        statusText: response.statusText,
        url: apiUrl,
        repoOwner: REPO_OWNER,
        repoName: REPO_NAME,
        errorData: errorData,
      });

      // Specific error messages for common issues
      if (response.status === 404) {
        throw new Error(
          `Repository '${REPO_OWNER}/${REPO_NAME}' not found or token lacks access. Verify: 1) Repository exists 2) Token has 'repo' scope 3) Token has access to private repos`
        );
      } else if (response.status === 401) {
        throw new Error(
          'GitHub token is invalid or expired. Please check your NEXT_PUBLIC_GITHUB_TOKEN.'
        );
      } else if (response.status === 403) {
        throw new Error(
          'GitHub token lacks required permissions. Ensure token has "repo" and "issues" scopes.'
        );
      }

      throw new Error(
        `GitHub API Error (${response.status}): ${
          errorData.message || response.statusText
        }`
      );
    }

    const result = await response.json();

    if (ENABLE_API_LOGGING) {
      console.log('Feedback submitted successfully:', {
        issueNumber: result.number,
        issueUrl: result.html_url,
      });
    }

    return {
      success: true,
      issueNumber: result.number,
      issueUrl: result.html_url,
      data: result,
    };
  } catch (error) {
    if (ENABLE_API_LOGGING) {
      console.error('Error submitting feedback to GitHub:', error);
    }
    throw error;
  }
};

/**
 * Get emoji for feedback type
 * @param {string} type - Feedback type
 * @returns {string} - Emoji for the type
 */
const getEmojiForType = type => {
  const emojiMap = {
    Bug: '🐛',
    'Feature Request': '✨',
    Suggestion: '💡',
    Other: '📝',
  };
  return emojiMap[type] || '📝';
};

/**
 * Validate GitHub token and repository access
 * @returns {Promise<boolean>} - Whether the token is valid
 */
export const validateGitHubAccess = async () => {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  if (!token || !REPO_OWNER) {
    return false;
  }

  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': USER_AGENT,
        },
      }
    );

    if (ENABLE_API_LOGGING) {
      console.log(
        'GitHub access validation:',
        response.ok ? 'Success' : 'Failed'
      );
    }

    return response.ok;
  } catch (error) {
    if (ENABLE_API_LOGGING) {
      console.error('Error validating GitHub access:', error);
    }
    return false;
  }
};

/**
 * Get repository information
 * @returns {Promise<Object>} - Repository information
 */
export const getRepoInfo = async () => {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  if (!token || !REPO_OWNER) {
    return null;
  }

  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': USER_AGENT,
        },
      }
    );

    if (response.ok) {
      const repoData = await response.json();
      if (ENABLE_API_LOGGING) {
        console.log('Repository info fetched:', {
          name: repoData.name,
          private: repoData.private,
          owner: repoData.owner.login,
        });
      }
      return repoData;
    }
    return null;
  } catch (error) {
    if (ENABLE_API_LOGGING) {
      console.error('Error fetching repository info:', error);
    }
    return null;
  }
};
