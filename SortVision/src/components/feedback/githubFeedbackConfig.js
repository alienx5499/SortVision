export const GITHUB_API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
export const REPO_OWNER = process.env.NEXT_PUBLIC_FEEDBACK_REPO_OWNER;
export const REPO_NAME = process.env.NEXT_PUBLIC_FEEDBACK_REPO_NAME;
export const USER_AGENT = process.env.NEXT_PUBLIC_API_USER_AGENT;
export const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === 'true';
export const ENABLE_API_LOGGING =
  process.env.NEXT_PUBLIC_ENABLE_API_LOGGING === 'true' || DEV_MODE;
