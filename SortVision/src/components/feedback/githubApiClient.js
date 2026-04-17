/**
 * Shared GitHub REST helpers for feedback tooling
 */

import {
  GITHUB_API_BASE,
  REPO_OWNER,
  REPO_NAME,
  USER_AGENT,
  ENABLE_API_LOGGING,
} from './githubFeedbackConfig';

export function githubHeaders(token) {
  return {
    Authorization: `token ${token}`,
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': USER_AGENT,
  };
}

/**
 * Validate GitHub token and repository access
 * @returns {Promise<boolean>} - Whether the token is valid
 */
export async function validateGitHubAccess() {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  if (!token || !REPO_OWNER) {
    return false;
  }

  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}`,
      {
        headers: githubHeaders(token),
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
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  if (!token || !REPO_OWNER) {
    return null;
  }

  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}`,
      {
        headers: githubHeaders(token),
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
