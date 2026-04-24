import { Bot, Crown, Users } from 'lucide-react';

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getContributorType({ isAdmin, isBot }) {
  if (isAdmin) return { label: 'ADMIN', color: 'emerald', icon: Crown };
  if (isBot) return { label: 'BOT', color: 'blue', icon: Bot };
  return { label: 'COMMUNITY', color: 'purple', icon: Users };
}

export function getComprehensiveStats(commits) {
  if (!commits.length) return null;
  return commits[0]._comprehensiveStats || null;
}

export function calculateLinesAdded({ commits, pullRequests }) {
  const comprehensiveStats = getComprehensiveStats(commits);
  if (comprehensiveStats && comprehensiveStats.hasComprehensiveStats) {
    return comprehensiveStats.totalLinesAdded;
  }

  return (
    pullRequests.reduce((sum, pr) => sum + (pr.additions || 0), 0) +
    commits.reduce((sum, commit) => sum + (commit.stats?.additions || 0), 0)
  );
}

export function calculateLinesDeleted({ commits, pullRequests }) {
  const comprehensiveStats = getComprehensiveStats(commits);
  if (comprehensiveStats && comprehensiveStats.hasComprehensiveStats) {
    return comprehensiveStats.totalLinesDeleted;
  }

  return (
    pullRequests.reduce((sum, pr) => sum + (pr.deletions || 0), 0) +
    commits.reduce((sum, commit) => sum + (commit.stats?.deletions || 0), 0)
  );
}
