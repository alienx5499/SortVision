/**
 * GitHub API service for SortVision feedback submission
 */

import { DEV_MODE, ENABLE_API_LOGGING } from './githubFeedbackConfig';

export { validateGitHubAccess, getRepoInfo } from './githubApiClient';

function logIfEnabled(message, data) {
  if (ENABLE_API_LOGGING) {
    console.log(message, data);
  }
}

function mapGitHubErrorStatus(responseStatus) {
  if (responseStatus === 404) {
    return 'Feedback API endpoint or repository was not found.';
  }
  if (responseStatus === 401) {
    return 'Feedback API is unauthorized. Check server GitHub token.';
  }
  if (responseStatus === 403) {
    return 'Feedback API is forbidden. Verify server token scopes.';
  }
  return null;
}

/**
 * Submit feedback by creating a GitHub issue
 * @param {Object} feedbackData - The feedback form data (including optional telemetry)
 * @returns {Promise<Object>} - Response from GitHub API
 */
export const submitFeedback = async feedbackData => {
  logIfEnabled('GitHub API Debug Info:', {
    endpoint: '/api/github/feedback',
    clientSideTokenPresent: false,
    environment: DEV_MODE ? 'Development' : 'Production',
  });

  try {
    const apiUrl = '/api/github/feedback';

    logIfEnabled('Making GitHub API request:', {
      url: apiUrl,
      method: 'POST',
    });

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackData),
    });

    if (!response.ok) {
      console.error(
        `GitHub API Error ${response.status}: ${response.statusText}`
      );

      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = {
          message: `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      console.error('Error Details:', {
        status: response.status,
        statusText: response.statusText,
        url: apiUrl,
        repo: 'server-managed',
        errorData: errorData,
      });

      const statusMessage = mapGitHubErrorStatus(response.status);
      if (statusMessage) {
        throw new Error(statusMessage);
      }

      throw new Error(
        `GitHub API Error (${response.status}): ${
          errorData.message || response.statusText
        }`
      );
    }

    const result = await response.json();

    logIfEnabled('Feedback submitted successfully:', {
      issueNumber: result.number,
      issueUrl: result.html_url,
    });

    return {
      success: true,
      issueNumber: result.number,
      issueUrl: result.html_url,
      data: result,
    };
  } catch (error) {
    if (ENABLE_API_LOGGING)
      console.error('Error submitting feedback to GitHub:', error);
    throw error;
  }
};
