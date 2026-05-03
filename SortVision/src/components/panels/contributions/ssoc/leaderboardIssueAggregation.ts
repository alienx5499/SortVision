import { POINTS_CONFIG } from './config';
import type {
  GitHubIssue,
  ParticipantIssueStats,
} from './leaderboardGithubTypes';

export const emptyIssueStats = (): ParticipantIssueStats => ({
  beginnerIssues: 0,
  intermediateIssues: 0,
  advancedIssues: 0,
  totalPoints: 0,
  totalIssues: 0,
  uniqueLabels: [],
  issueTypes: [],
  firstIssueDate: null,
  lastIssueDate: null,
  bugsSolved: 0,
  bugsReported: 0,
  hasCompletedIn24Hours: false,
});

/**
 * Pure domain: derive SSOC / bug / label stats from raw GitHub issue lists.
 */
export function aggregateParticipantIssueStats(
  assignedIssues: GitHubIssue[],
  createdIssues: GitHubIssue[]
): ParticipantIssueStats {
  let beginnerIssues = 0;
  let intermediateIssues = 0;
  let advancedIssues = 0;
  let totalPoints = 0;
  const uniqueLabels = new Set<string>();
  const issueTypes = new Set<string>();
  let firstIssueDate: string | null = null;
  let lastIssueDate: string | null = null;
  let bugsSolved = 0;
  let bugsReported = 0;
  let hasCompletedIn24Hours = false;

  assignedIssues.forEach(issue => {
    if (!issue.pull_request) {
      const labels = issue.labels.map(label => label.name);
      labels.forEach(label => uniqueLabels.add(label));

      const type = labels.find(l =>
        ['bug', 'feature', 'enhancement', 'documentation'].includes(
          l.toLowerCase()
        )
      );
      if (type) {
        issueTypes.add(type.toLowerCase());
        if (type.toLowerCase() === 'bug') {
          bugsSolved++;
        }
      }

      if (issue.closed_at && issue.created_at) {
        const createdAt = new Date(issue.created_at);
        const closedAt = new Date(issue.closed_at);
        const timeDifferenceHours =
          (closedAt.getTime() - createdAt.getTime()) / (1000 * 60 * 60);

        if (timeDifferenceHours <= 24) {
          hasCompletedIn24Hours = true;
        }
      }

      if (
        !firstIssueDate ||
        new Date(issue.created_at!) < new Date(firstIssueDate)
      ) {
        firstIssueDate = issue.created_at!;
      }
      if (
        issue.closed_at &&
        (!lastIssueDate || new Date(issue.closed_at) > new Date(lastIssueDate))
      ) {
        lastIssueDate = issue.closed_at;
      }

      if (labels.includes('SSoC25')) {
        if (labels.includes('Beginner')) {
          beginnerIssues++;
          totalPoints += POINTS_CONFIG.Beginner;
        } else if (labels.includes('Intermediate')) {
          intermediateIssues++;
          totalPoints += POINTS_CONFIG.Intermediate;
        } else if (labels.includes('Advanced') || labels.includes('Advance')) {
          advancedIssues++;
          totalPoints += POINTS_CONFIG.Advanced;
        }
      }
    }
  });

  createdIssues.forEach(issue => {
    if (!issue.pull_request) {
      const labels = issue.labels.map(label => label.name);
      if (labels.some(label => label.toLowerCase() === 'bug')) {
        bugsReported++;
      }
    }
  });

  return {
    beginnerIssues,
    intermediateIssues,
    advancedIssues,
    totalPoints,
    totalIssues: beginnerIssues + intermediateIssues + advancedIssues,
    uniqueLabels: Array.from(uniqueLabels),
    issueTypes: Array.from(issueTypes),
    firstIssueDate,
    lastIssueDate,
    bugsSolved,
    bugsReported,
    hasCompletedIn24Hours,
  };
}
