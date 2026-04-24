/**
 * GitHub API service for SortVision feedback submission
 */

import {
  GITHUB_API_BASE,
  REPO_OWNER,
  REPO_NAME,
  DEV_MODE,
  ENABLE_API_LOGGING,
} from './githubFeedbackConfig';
import { githubHeaders } from './githubApiClient';
import { buildGitHubFeedbackIssue } from './buildGitHubFeedbackIssue';

export { validateGitHubAccess, getRepoInfo } from './githubApiClient';

function validateFeedbackGitHubConfig(token) {
  if (!token) {
    const message =
      'GitHub token not found. Please set NEXT_PUBLIC_GITHUB_TOKEN in your environment variables.';
    console.error(message);
    throw new Error(message);
  }

  if (!REPO_OWNER) {
    const message =
      'Repository owner missing. Please set NEXT_PUBLIC_GITHUB_REPO_OWNER in your environment variables.';
    console.error(message);
    throw new Error(message);
  }
}

function logIfEnabled(message, data) {
  if (ENABLE_API_LOGGING) {
    console.log(message, data);
  }
}

function mapGitHubErrorStatus(responseStatus, repoOwner, repoName) {
  if (responseStatus === 404) {
    return `Repository '${repoOwner}/${repoName}' not found or token lacks access. Verify: 1) Repository exists 2) Token has 'repo' scope 3) Token has access to private repos`;
  }
  if (responseStatus === 401) {
    return 'GitHub token is invalid or expired. Please check your NEXT_PUBLIC_GITHUB_TOKEN.';
  }
  if (responseStatus === 403) {
    return 'GitHub token lacks required permissions. Ensure token has "repo" and "issues" scopes.';
  }
  return null;
}

/**
 * Submit feedback by creating a GitHub issue
 * @param {Object} feedbackData - The feedback form data (including optional telemetry)
 * @returns {Promise<Object>} - Response from GitHub API
 */
export const submitFeedback = async feedbackData => {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  validateFeedbackGitHubConfig(token);

  logIfEnabled('GitHub API Debug Info:', {
    apiBase: GITHUB_API_BASE,
    repoOwner: REPO_OWNER,
    repoName: REPO_NAME,
    tokenPresent: !!token,
    tokenPrefix: token ? `${token.substring(0, 8)}...` : 'None',
    environment: DEV_MODE ? 'Development' : 'Production',
  });

  const issueData = buildGitHubFeedbackIssue(feedbackData);
  logIfEnabled('Submitting feedback to GitHub:', {
    repo: `${REPO_OWNER}/${REPO_NAME}`,
    title: issueData.title,
    labels: issueData.labels,
  });

  try {
    const apiUrl = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/issues`;

    logIfEnabled('Making GitHub API request:', {
      url: apiUrl,
      method: 'POST',
      hasToken: !!token,
      tokenLength: token ? token.length : 0,
    });

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        ...githubHeaders(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(issueData),
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
        repoOwner: REPO_OWNER,
        repoName: REPO_NAME,
        errorData: errorData,
      });

      const statusMessage = mapGitHubErrorStatus(
        response.status,
        REPO_OWNER,
        REPO_NAME
      );
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
