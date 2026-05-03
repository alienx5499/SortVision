/**
 * Feedback GitHub issues are created in the repo named by server env only:
 * `REPO_OWNER` and `REPO_NAME` (no fallbacks, no alternate keys).
 */
export function getFeedbackIssueRepoFromEnv(
  env: NodeJS.ProcessEnv = process.env
): { owner: string; name: string } {
  return {
    owner: (env.REPO_OWNER ?? '').trim(),
    name: (env.REPO_NAME ?? '').trim(),
  };
}
