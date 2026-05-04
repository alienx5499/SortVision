/**
 * GitHub API service for SortVision feedback submission
 */

import type { EnhancedFeedbackPayload } from '../types';
import { DEV_MODE, ENABLE_API_LOGGING } from './githubFeedbackConfig';

export { validateGitHubAccess, getRepoInfo } from './githubApiClient';

function logIfEnabled(message: string, data: unknown): void {
  if (ENABLE_API_LOGGING) {
    console.log(message, data);
  }
}

function mapGitHubErrorStatus(
  responseStatus: number,
  upstreamDetail?: string,
  errorCode?: string
): string | null {
  const detail = upstreamDetail?.trim();

  if (responseStatus === 404) {
    return 'Feedback API endpoint or repository was not found.';
  }
  if (responseStatus === 401) {
    return [
      'Feedback API is unauthorized. Set a valid GITHUB_TOKEN on the server.',
      detail ? `GitHub: ${detail}` : null,
    ]
      .filter(Boolean)
      .join(' ');
  }
  if (responseStatus === 403) {
    if (errorCode === 'forbidden_origin') {
      return 'Feedback submission was blocked because this origin is not allowed.';
    }
    return [
      'Feedback API returned 403 and rejected the submission.',
      detail ? `GitHub: ${detail}` : null,
      'Fix: classic PAT needs repo scope (or access to that repo); fine-grained PAT needs Issues (write) on the feedback repo (FEEDBACK_REPO_OWNER / FEEDBACK_REPO_NAME).',
    ]
      .filter(Boolean)
      .join(' ');
  }
  if (responseStatus === 503 && errorCode === 'ip_resolution_failed') {
    return [
      'Feedback could not be accepted because the server could not verify your connection for anti-abuse limits.',
      'Please try again in a few minutes, or open an issue on the SortVision repo if it keeps happening.',
    ].join(' ');
  }
  if (responseStatus === 500) {
    if (errorCode === 'missing_github_token') {
      return [
        'We could not save your feedback: the server has no GitHub token (GITHUB_TOKEN).',
        'If you manage this site: add GITHUB_TOKEN in the host environment (see SortVision .env.example).',
      ].join(' ');
    }
    if (errorCode === 'missing_feedback_repo_config') {
      return [
        'We could not save your feedback: FEEDBACK_REPO_OWNER / FEEDBACK_REPO_NAME are not set for the feedback issues repo.',
        'If you manage this site: set those variables where you deploy (see SortVision/.env.example).',
      ].join(' ');
    }
  }
  return null;
}

interface FeedbackApiErrorBody {
  error?: string;
  message?: string;
  code?: string;
}

interface FeedbackApiSuccessBody {
  success?: boolean;
  issueNumber?: number;
  issueUrl?: string;
  data?: { number?: number; html_url?: string };
}

/**
 * Submit feedback by creating a GitHub issue via the app API route.
 */
export async function submitFeedback(
  feedbackData: EnhancedFeedbackPayload
): Promise<{
  success: true;
  issueNumber?: number;
  issueUrl?: string;
  data: unknown;
}> {
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

      let errorData: FeedbackApiErrorBody;
      try {
        errorData = (await response.json()) as FeedbackApiErrorBody;
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
        errorData,
      });

      const statusMessage = mapGitHubErrorStatus(
        response.status,
        errorData.message,
        errorData.code
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

    const result = (await response.json()) as FeedbackApiSuccessBody;

    const issueNumber = result.issueNumber ?? result.data?.number;
    const issueUrl = result.issueUrl ?? result.data?.html_url;

    logIfEnabled('Feedback submitted successfully:', {
      issueNumber,
      issueUrl,
    });

    return {
      success: true,
      issueNumber,
      issueUrl,
      data: result,
    };
  } catch (error) {
    if (ENABLE_API_LOGGING) {
      console.error('Error submitting feedback to GitHub:', error);
    }
    throw error;
  }
}
