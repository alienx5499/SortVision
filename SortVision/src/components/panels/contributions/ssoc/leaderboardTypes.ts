export type LeaderboardParticipant = {
  contributorName: string;
  githubId: string;
  totalPoints: number;
  beginnerIssues: number;
  intermediateIssues: number;
  advancedIssues: number;
  avatarUrl?: string;
  achievements?: Record<string, boolean>;
  bugsSolved?: number;
  bugsReported?: number;
};

/** Row built by `fetchLeaderboardData` (githubService) for the SSOC leaderboard. */
export type LeaderboardEnrichedParticipant = LeaderboardParticipant & {
  discordId: string;
  achievements: Record<string, boolean>;
  totalIssues: number;
  uniqueLabels: string[];
  issueTypes: string[];
  firstIssueDate: string | null;
  lastIssueDate: string | null;
  hasCompletedIn24Hours: boolean;
};

export type RankedLeaderboardParticipant = LeaderboardParticipant & {
  originalRank: number;
};
