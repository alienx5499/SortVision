import type { GitHubIssue } from '../leaderboardGithubTypes';

export type GitHubPullExport = {
  merged_at?: string | null;
  title?: string;
  body?: string | null;
  number?: number;
};

export type ContributorExportDetail = {
  issues: GitHubIssue[];
  prs: GitHubPullExport[];
  beginnerIssues: number;
  intermediateIssues: number;
  advancedIssues: number;
  totalPoints: number;
  totalIssues: number;
};

export type ExportProgressCallback = (
  progress: number,
  message: string
) => void;

export type LeaderboardExportRow = Record<string, string | number>;

export type LeaderboardExportResult =
  | { status: 'ok'; csv: string; filename: string; rowCount: number }
  | { status: 'empty' };
