import type { GitHubContributor } from './githubContributor';
import type { AuthenticatedFetch } from './githubContributionsGateway';
import type { CachedContributorLineTotals } from './contributorStatsCache';

/** Sub-tabs inside the contributors special mode. */
export type ContributionSectionTab = 'overview' | 'guide';

export type ContributionPanelProps = {
  /** Matches contributors `Tabs` values (`overview` | `guide`); other strings fall back to overview. */
  activeTab?: string;
  onTabChange?: (tab: string) => void;
};

export type ContributionAggregateStats = {
  totalContributors: number;
  totalCommits: number;
  totalStars: number;
  totalForks: number;
  totalLinesAdded: number;
  totalLinesDeleted: number;
  totalChanges: number;
};

export type GetCachedContributorLineStats = (
  login: string
) => CachedContributorLineTotals | null;

export type UseContributionPanelDataResult = {
  contributors: GitHubContributor[];
  stats: ContributionAggregateStats;
  loading: boolean;
  error: string | null;
  fetchContributors: () => Promise<void>;
  authenticatedFetch: AuthenticatedFetch;
  getCachedContributorStats: GetCachedContributorLineStats;
  projectAdmins: string[];
  botUsers: string[];
};
