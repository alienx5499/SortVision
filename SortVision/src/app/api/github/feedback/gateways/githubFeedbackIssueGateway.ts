import type {
  GitHubCreateIssueBody,
  GitHubCreateIssueResult,
  GitHubFeedbackIssueGatewayConfig,
} from './githubFeedbackIssueTypes';

const GITHUB_BASE_URL = 'https://api.github.com';

export const createGitHubFeedbackIssueGateway = ({
  repoOwner,
  repoName,
  token,
  userAgent,
}: GitHubFeedbackIssueGatewayConfig) => {
  return {
    async createIssue(
      issueData: GitHubCreateIssueBody
    ): Promise<GitHubCreateIssueResult> {
      const response = await fetch(
        `${GITHUB_BASE_URL}/repos/${repoOwner}/${repoName}/issues`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/vnd.github+json',
            'User-Agent': userAgent,
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(issueData),
        }
      );

      const payload = await response.json().catch(() => ({}));
      return { ok: response.ok, status: response.status, payload };
    },
  };
};
