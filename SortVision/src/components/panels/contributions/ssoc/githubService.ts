/**
 * Public SSOC leaderboard API (backward-compatible barrel).
 * Implementation is split: gateway → domain → query service.
 */
export type { ParticipantIssueStats } from './leaderboardGithubTypes';

export { fetchGitHubRepoJson as fetchGitHubData } from './leaderboardGitHubGateway';
export {
  fetchParticipantIssues,
  fetchLeaderboardData,
} from './leaderboardQueryService';
