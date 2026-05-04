import { getFeedbackGithubRepoFromEnv } from '@/config/githubRepos';

/**
 * Feedback GitHub issues are created in the repo named by server env only:
 * `FEEDBACK_REPO_OWNER` and `FEEDBACK_REPO_NAME` (no fallbacks).
 */
export function getFeedbackIssueRepoFromEnv(
  env: NodeJS.ProcessEnv = process.env
): { owner: string; name: string } {
  return getFeedbackGithubRepoFromEnv(env);
}
