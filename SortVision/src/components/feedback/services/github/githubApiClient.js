/**
 * Shared GitHub REST helpers for feedback tooling
 */

import {
  REPO_OWNER,
  REPO_NAME,
  ENABLE_API_LOGGING,
} from './githubFeedbackConfig';

export function githubHeaders() {
  return { Accept: 'application/json' };
}

/**
 * Validate GitHub token and repository access
 * @returns {Promise<boolean>} - Whether the token is valid
 */
export async function validateGitHubAccess() {
  if (!REPO_OWNER) {
    return false;
  }

  try {
    const response = await fetch(
      `/api/github/repos/${REPO_OWNER}/${REPO_NAME}`,
      {
        headers: githubHeaders(),
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
}

/**
 * Get repository information
 * @returns {Promise<Object|null>} - Repository information
 */
export async function getRepoInfo() {
  if (!REPO_OWNER) {
    return null;
  }

  try {
    const response = await fetch(
      `/api/github/repos/${REPO_OWNER}/${REPO_NAME}`,
      {
        headers: githubHeaders(),
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
}
