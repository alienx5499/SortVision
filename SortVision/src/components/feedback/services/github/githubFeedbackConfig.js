export const GITHUB_API_BASE = '/api/github';
export const REPO_OWNER =
  process.env.NEXT_PUBLIC_FEEDBACK_REPO_OWNER || 'alienx5499';
export const REPO_NAME =
  process.env.NEXT_PUBLIC_FEEDBACK_REPO_NAME || 'SortVision';
export const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === 'true';
export const ENABLE_API_LOGGING =
  process.env.NEXT_PUBLIC_ENABLE_API_LOGGING === 'true' || DEV_MODE;
