import type {
  TranslationKey,
  TranslationParams,
} from '@/config/translationKey';
import type { GitHubContributor } from '../../githubContributor';

export type ContributorDetailTranslate = (
  key: TranslationKey,
  params?: TranslationParams
) => string;

export type ContributorDetailCommit = {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: { date: string };
  };
  stats?: {
    total?: number;
    additions?: number;
    deletions?: number;
  };
  files?: Array<{
    filename: string;
    additions?: number;
    deletions?: number;
  }>;
};

export type ContributorDetailPullRequest = {
  id: number;
  number: number;
  title: string;
  state: string;
  html_url: string;
  updated_at: string;
  merged?: boolean;
  merged_at?: string | null;
  closed_at?: string | null;
  additions?: number;
  deletions?: number;
  changed_files?: number;
};

export type ContributorDetailIssue = {
  id: number;
  number: number;
  title: string;
  state: string;
  html_url: string;
  updated_at: string;
  labels?: Array<{ id: number; name: string; color: string }>;
};

/** Subset of GitHub user API fields used in the contributor detail overview. */
export type ContributorOverviewProfile = {
  public_repos?: number;
  followers?: number;
  following?: number;
  company?: string;
  location?: string;
  email?: string;
  blog?: string;
};

export type OverviewTabProps = {
  profileData: unknown;
  contributor: GitHubContributor;
  pullRequests: ContributorDetailPullRequest[];
  issues: ContributorDetailIssue[];
  commits: ContributorDetailCommit[];
  t: ContributorDetailTranslate;
};
