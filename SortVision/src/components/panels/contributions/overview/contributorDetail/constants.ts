import {
  Activity,
  Bug,
  GitCommit,
  GitPullRequest,
  type LucideIcon,
} from 'lucide-react';

export const API_BASE_URL = '/api/github';
export const INITIAL_LOADING_PROGRESS = { current: 0, total: 0, stage: '' };
export const INITIAL_FETCH_PROGRESS = {
  current: 0,
  total: 3,
  stage: 'Initializing...',
};
export const PR_SEARCH_CONFIG = {
  perPage: 100,
  maxPages: 10,
  enrichLimit: 50,
  enrichConcurrency: 5,
} as const;

export const COMMITS_PAGINATION_CONFIG = {
  perPage: 20,
  maxPages: 15,
  scrollThresholdPx: 160,
} as const;

export const DETAIL_CACHE_TTL_MS = 10 * 60 * 1000;
export const DETAIL_CACHE_STORAGE_KEY = 'sv_contributor_detail_cache_v1';

export const DETAIL_TABS: Array<{
  id: string;
  label: string;
  icon: LucideIcon;
}> = [
  { id: 'overview', label: 'overview.md', icon: Activity },
  { id: 'pulls', label: 'pulls.json', icon: GitPullRequest },
  { id: 'issues', label: 'issues.log', icon: Bug },
  { id: 'commits', label: 'commits.git', icon: GitCommit },
];
