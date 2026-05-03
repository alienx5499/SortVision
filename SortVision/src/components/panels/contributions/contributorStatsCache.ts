import { CONTRIBUTOR_STATS_CACHE_MS } from './contributionConstants';

export type ContributorWeekStat = { a?: number; d?: number };

export type ContributorStatEntry = {
  author?: { login: string };
  weeks?: ContributorWeekStat[];
};

export type CachedContributorLineTotals = {
  totalLinesAdded: number;
  totalLinesDeleted: number;
};

let cache: ContributorStatEntry[] = [];
let cachedAt: number | null = null;

export function getValidCachedContributorStats(
  now: number
): ContributorStatEntry[] | null {
  if (
    cache.length > 0 &&
    cachedAt !== null &&
    now - cachedAt < CONTRIBUTOR_STATS_CACHE_MS
  ) {
    return cache;
  }
  return null;
}

export function setContributorStatsCache(
  entries: ContributorStatEntry[],
  now: number
) {
  cache = entries;
  cachedAt = now;
}

export function findContributorLinesInCache(
  login: string
): CachedContributorLineTotals | null {
  if (!cache.length) return null;
  const contributorStat = cache.find(
    stat => stat.author && stat.author.login === login
  );
  if (!contributorStat?.weeks) return null;
  let totalLinesAdded = 0;
  let totalLinesDeleted = 0;
  contributorStat.weeks.forEach(week => {
    totalLinesAdded += week.a || 0;
    totalLinesDeleted += week.d || 0;
  });
  return { totalLinesAdded, totalLinesDeleted };
}
