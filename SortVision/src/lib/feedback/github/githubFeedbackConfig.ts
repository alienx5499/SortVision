import { getFeedbackIssueRepoFromEnv } from './feedbackIssueRepo';

export const GITHUB_API_BASE = '/api/github';

const feedbackRepo = getFeedbackIssueRepoFromEnv();
export const REPO_OWNER = feedbackRepo.owner;
export const REPO_NAME = feedbackRepo.name;
export const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === 'true';
export const ENABLE_API_LOGGING =
  process.env.NEXT_PUBLIC_ENABLE_API_LOGGING === 'true' || DEV_MODE;
