import { Bot, Crown, Users, type LucideIcon } from 'lucide-react';

type CommitLike = {
  _comprehensiveStats?: {
    totalLinesAdded?: number;
    totalLinesDeleted?: number;
    hasComprehensiveStats?: boolean;
  };
  stats?: { additions?: number; deletions?: number };
};

type PRLike = { additions?: number; deletions?: number };

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getContributorType({
  isAdmin,
  isBot,
}: {
  isAdmin: boolean;
  isBot: boolean;
}): { label: string; color: string; icon: LucideIcon } {
  if (isAdmin) return { label: 'ADMIN', color: 'emerald', icon: Crown };
  if (isBot) return { label: 'BOT', color: 'blue', icon: Bot };
  return { label: 'COMMUNITY', color: 'purple', icon: Users };
}

export function getComprehensiveStats(
  commits: CommitLike[]
): CommitLike['_comprehensiveStats'] | null {
  if (!commits.length) return null;
  return commits[0]!._comprehensiveStats || null;
}

export function calculateLinesAdded({
  commits,
  pullRequests,
}: {
  commits: CommitLike[];
  pullRequests: PRLike[];
}): number {
  const comprehensiveStats = getComprehensiveStats(commits);
  if (comprehensiveStats?.hasComprehensiveStats) {
    return comprehensiveStats.totalLinesAdded ?? 0;
  }

  return (
    pullRequests.reduce((sum, pr) => sum + (pr.additions || 0), 0) +
    commits.reduce((sum, commit) => sum + (commit.stats?.additions || 0), 0)
  );
}

export function calculateLinesDeleted({
  commits,
  pullRequests,
}: {
  commits: CommitLike[];
  pullRequests: PRLike[];
}): number {
  const comprehensiveStats = getComprehensiveStats(commits);
  if (comprehensiveStats?.hasComprehensiveStats) {
    return comprehensiveStats.totalLinesDeleted ?? 0;
  }

  return (
    pullRequests.reduce((sum, pr) => sum + (pr.deletions || 0), 0) +
    commits.reduce((sum, commit) => sum + (commit.stats?.deletions || 0), 0)
  );
}
