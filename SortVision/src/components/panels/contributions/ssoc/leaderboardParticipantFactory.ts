import type { LeaderboardEnrichedParticipant } from './leaderboardTypes';
import type {
  GitHubUserProfile,
  ParticipantIssueStats,
} from './leaderboardGithubTypes';

export function buildAchievementsFromIssueStats(
  issueStats: ParticipantIssueStats
): Record<string, boolean> {
  return {
    completedIn24Hours: issueStats.hasCompletedIn24Hours,
    solvedBugs: issueStats.bugsSolved > 0,
    reportedBugs: issueStats.bugsReported > 0,
    helpedOthers: false,
    hasStreakOfFiveDays: false,
    hasReviewedPRs: false,
    improvedDocs: issueStats.issueTypes.includes('documentation'),
    hasFirstStep: issueStats.totalIssues === 1,
    isNewcomer: issueStats.totalIssues >= 2,
    isRisingStar: issueStats.totalIssues >= 5,
    isCommittedContributor: issueStats.totalIssues >= 10,
    isSeasonedDeveloper: issueStats.totalIssues >= 15,
    isVeteranContributor: issueStats.totalIssues >= 20,
    isDiverseContributor: issueStats.issueTypes.length >= 3,
  };
}

export function buildEnrichedParticipant(
  username: string,
  profile: GitHubUserProfile,
  issueStats: ParticipantIssueStats
): LeaderboardEnrichedParticipant {
  return {
    contributorName: profile.name || username,
    githubId: username,
    discordId: 'N/A',
    avatarUrl: profile.avatar_url,
    achievements: buildAchievementsFromIssueStats(issueStats),
    bugsSolved: issueStats.bugsSolved,
    bugsReported: issueStats.bugsReported,
    beginnerIssues: issueStats.beginnerIssues,
    intermediateIssues: issueStats.intermediateIssues,
    advancedIssues: issueStats.advancedIssues,
    totalPoints: issueStats.totalPoints,
    totalIssues: issueStats.totalIssues,
    uniqueLabels: issueStats.uniqueLabels,
    issueTypes: issueStats.issueTypes,
    firstIssueDate: issueStats.firstIssueDate,
    lastIssueDate: issueStats.lastIssueDate,
    hasCompletedIn24Hours: issueStats.hasCompletedIn24Hours,
  };
}
