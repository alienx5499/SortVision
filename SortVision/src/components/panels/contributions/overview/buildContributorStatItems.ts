import { GitCommit, GitFork, Star, Users } from 'lucide-react';
import type { ContributionAggregateStats } from '../contributionsPanelContracts';
import type { PanelTranslate } from '../../shared/panelTranslate';
import type { ContributorStatDisplayItem } from './contributorStatsTypes';

export function buildContributorStatItems(
  t: PanelTranslate,
  stats: ContributionAggregateStats | null | undefined
): ContributorStatDisplayItem[] {
  return [
    {
      id: 'contributors',
      icon: Users,
      label: t('contributions.stats.contributors'),
      value: stats?.totalContributors ?? 0,
      color: 'emerald',
      description: t('contributions.stats.amazingDevelopers'),
    },
    {
      id: 'commits',
      icon: GitCommit,
      label: t('contributions.stats.totalCommits'),
      value: stats?.totalCommits ?? 0,
      color: 'blue',
      description: t('contributions.stats.linesOfImpact'),
    },
    {
      id: 'stars',
      icon: Star,
      label: t('contributions.stats.githubStars'),
      value: stats?.totalStars ?? 0,
      color: 'yellow',
      description: t('contributions.stats.communityLove'),
    },
    {
      id: 'forks',
      icon: GitFork,
      label: t('contributions.stats.forks'),
      value: stats?.totalForks ?? 0,
      color: 'purple',
      description: t('contributions.stats.projectCopies'),
    },
  ];
}
