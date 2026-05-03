/**
 * Backward-compatible GitHub utilities entry point.
 * Prefer importing from `@/utils/github` in new code.
 */
export {
  getGithubApiHeaders,
  formatCount,
  fetchRepoInfo,
  fetchStarCount,
  fetchRepoStats,
  clearGitHubCache,
} from './github';
