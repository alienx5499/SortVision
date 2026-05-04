import { getGithubLeaderboardApiConfig } from '../config';
import type { GitHubIssue } from '../leaderboardGithubTypes';
import type { GitHubPullExport } from './leaderboardExportTypes';

export function formatIssuesOnly(issues: GitHubIssue[]): string {
  if (issues.length === 0) return 'No issues';

  return issues.map(issue => `#${issue.number}`).join(', ');
}

export function formatPRLinks(
  prs: GitHubPullExport[],
  githubUsername: string
): string {
  if (prs.length === 0) return 'No PRs';

  const { REPO_OWNER, REPO_NAME } = getGithubLeaderboardApiConfig();
  return `https://github.com/${REPO_OWNER}/${REPO_NAME}/pulls?q=is%3Apr+is%3Aclosed+author%3A${githubUsername}`;
}

export function exportDateStamp(): string {
  return new Date().toISOString().split('T')[0]!;
}
