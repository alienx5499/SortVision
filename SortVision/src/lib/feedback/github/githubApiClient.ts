/**
 * Shared GitHub REST helpers for feedback tooling
 */

import {
  REPO_OWNER,
  REPO_NAME,
  ENABLE_API_LOGGING,
} from './githubFeedbackConfig';

export function githubHeaders(): HeadersInit {
  return { Accept: 'application/json' };
}

/**
 * Validate GitHub token and repository access
 */
export async function validateGitHubAccess(): Promise<boolean> {
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

interface GitHubRepoPayload {
  name: string;
  private: boolean;
  owner: { login: string };
}

/**
 * Get repository information
 */
export async function getRepoInfo(): Promise<GitHubRepoPayload | null> {
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
      const repoData = (await response.json()) as GitHubRepoPayload;
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
