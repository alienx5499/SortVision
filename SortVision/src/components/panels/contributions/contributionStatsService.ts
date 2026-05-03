import type { GitHubContributor } from './githubContributor';
import type { ContributorStatEntry } from './contributorStatsCache';

export type ContributionLineTotals = {
  totalLinesAdded: number;
  totalLinesDeleted: number;
};

export function calculateLineTotalsFromContributorStats(
  contributorStats: ContributorStatEntry[]
): ContributionLineTotals {
  let totalLinesAdded = 0;
  let totalLinesDeleted = 0;

  contributorStats.forEach(contributor => {
    contributor.weeks?.forEach(week => {
      totalLinesAdded += week.a || 0;
      totalLinesDeleted += week.d || 0;
    });
  });

  return { totalLinesAdded, totalLinesDeleted };
}

export function calculateLineTotalsFromPullRequests(
  pullRequests: { additions?: number; deletions?: number }[]
): ContributionLineTotals {
  let totalLinesAdded = 0;
  let totalLinesDeleted = 0;

  pullRequests.forEach(pr => {
    if (pr.additions) totalLinesAdded += pr.additions;
    if (pr.deletions) totalLinesDeleted += pr.deletions;
  });

  return { totalLinesAdded, totalLinesDeleted };
}

export function sortContributorsByPriority(
  contributors: GitHubContributor[],
  projectAdmins: readonly string[]
): GitHubContributor[] {
  return [...contributors].sort((a, b) => {
    if (projectAdmins.includes(a.login)) return -1;
    if (projectAdmins.includes(b.login)) return 1;
    return b.contributions - a.contributions;
  });
}

export function totalCommits(contributors: GitHubContributor[]): number {
  return contributors.reduce(
    (sum, contributor) => sum + contributor.contributions,
    0
  );
}
