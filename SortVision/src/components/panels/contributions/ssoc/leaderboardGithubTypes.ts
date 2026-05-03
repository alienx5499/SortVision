export type GitHubLabel = { name: string };

export type GitHubIssue = {
  pull_request?: unknown;
  labels: GitHubLabel[];
  closed_at?: string | null;
  created_at?: string;
  number?: number;
  title?: string;
  assignee?: { login: string } | null;
  assignees?: { login: string }[];
};

export type GitHubContributorApi = { login: string };

export type GitHubUserProfile = {
  name?: string | null;
  avatar_url?: string;
};

export type ParticipantIssueStats = {
  beginnerIssues: number;
  intermediateIssues: number;
  advancedIssues: number;
  totalPoints: number;
  totalIssues: number;
  uniqueLabels: string[];
  issueTypes: string[];
  firstIssueDate: string | null;
  lastIssueDate: string | null;
  bugsSolved: number;
  bugsReported: number;
  hasCompletedIn24Hours: boolean;
};
