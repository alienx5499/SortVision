import { EXCLUDED_USERS, getGithubLeaderboardApiConfig } from './config';
import type { LeaderboardEnrichedParticipant } from './leaderboardTypes';
import { fetchGitHubRepoJson } from './leaderboardGitHubGateway';
import type {
  GitHubContributorApi,
  GitHubIssue,
  GitHubUserProfile,
  ParticipantIssueStats,
} from './leaderboardGithubTypes';
import {
  aggregateParticipantIssueStats,
  emptyIssueStats,
} from './leaderboardIssueAggregation';
import { buildEnrichedParticipant } from './leaderboardParticipantFactory';

export async function fetchParticipantIssues(
  username: string
): Promise<ParticipantIssueStats> {
  try {
    const { REPO_OWNER, REPO_NAME } = getGithubLeaderboardApiConfig();
    const assignedIssues = (await fetchGitHubRepoJson(
      `/repos/${REPO_OWNER}/${REPO_NAME}/issues?state=closed&assignee=${username}&per_page=100`
    )) as GitHubIssue[];

    const createdIssues = (await fetchGitHubRepoJson(
      `/repos/${REPO_OWNER}/${REPO_NAME}/issues?state=all&creator=${username}&per_page=100`
    )) as GitHubIssue[];

    return aggregateParticipantIssueStats(assignedIssues, createdIssues);
  } catch (error) {
    console.error(`Error fetching issues for ${username}:`, error);
    return emptyIssueStats();
  }
}

export async function fetchLeaderboardData(): Promise<
  LeaderboardEnrichedParticipant[]
> {
  try {
    const { REPO_OWNER, REPO_NAME } = getGithubLeaderboardApiConfig();
    const contributors = (await fetchGitHubRepoJson(
      `/repos/${REPO_OWNER}/${REPO_NAME}/contributors?per_page=100`
    )) as GitHubContributorApi[];

    let allSsocIssues: GitHubIssue[] = [];
    let page = 1;
    let hasMorePages = true;

    while (hasMorePages) {
      const ssocIssuesPage = (await fetchGitHubRepoJson(
        `/repos/${REPO_OWNER}/${REPO_NAME}/issues?state=closed&labels=SSoC25&per_page=100&page=${page}`
      )) as GitHubIssue[];

      if (ssocIssuesPage.length > 0) {
        allSsocIssues = allSsocIssues.concat(ssocIssuesPage);
        page++;
        if (ssocIssuesPage.length < 100) {
          hasMorePages = false;
        }
      } else {
        hasMorePages = false;
      }
    }

    if (process.env.NEXT_PUBLIC_ENABLE_API_LOGGING === 'true') {
      console.log(
        `📊 Fetched ${allSsocIssues.length} total SSoC25 issues across ${
          page - 1
        } pages`
      );
    }

    const ssocAssignees = new Set<string>();
    allSsocIssues.forEach(issue => {
      if (issue.assignee && !issue.pull_request) {
        ssocAssignees.add(issue.assignee.login);
      }
      if (issue.assignees && issue.assignees.length > 0) {
        issue.assignees.forEach(assignee => {
          ssocAssignees.add(assignee.login);
        });
      }
    });

    if (process.env.NEXT_PUBLIC_ENABLE_API_LOGGING === 'true') {
      console.log(
        `👥 Found ${ssocAssignees.size} unique SSOC assignees:`,
        Array.from(ssocAssignees).slice(0, 10),
        '...'
      );
    }

    const allParticipants = new Set<string>();

    contributors.forEach(contributor => {
      if (!EXCLUDED_USERS.includes(contributor.login.toLowerCase())) {
        allParticipants.add(contributor.login);
      }
    });

    ssocAssignees.forEach(assignee => {
      if (!EXCLUDED_USERS.includes(assignee.toLowerCase())) {
        allParticipants.add(assignee);
      }
    });

    const participantPromises = Array.from(allParticipants).map(
      async (username): Promise<LeaderboardEnrichedParticipant | null> => {
        try {
          const [profile, issueStats] = await Promise.all([
            fetchGitHubRepoJson(
              `/users/${username}`
            ) as Promise<GitHubUserProfile>,
            fetchParticipantIssues(username),
          ]);

          return buildEnrichedParticipant(username, profile, issueStats);
        } catch (error) {
          console.error(`Error fetching data for ${username}:`, error);
          return null;
        }
      }
    );

    return (await Promise.all(participantPromises))
      .filter(
        (participant): participant is LeaderboardEnrichedParticipant =>
          participant !== null
      )
      .sort((a, b) => b.totalPoints - a.totalPoints);
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    return [];
  }
}
