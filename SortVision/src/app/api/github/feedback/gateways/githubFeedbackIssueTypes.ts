import type { GitHubIssueDraft } from '@/lib/feedback/types';

export type GitHubFeedbackIssueGatewayConfig = {
  repoOwner: string;
  repoName: string;
  token: string;
  userAgent: string;
};

/** GitHub REST issue create payload produced by `buildGitHubFeedbackIssue`. */
export type GitHubCreateIssueBody = GitHubIssueDraft;

export type GitHubCreateIssueResult = {
  ok: boolean;
  status: number;
  payload: unknown;
};
