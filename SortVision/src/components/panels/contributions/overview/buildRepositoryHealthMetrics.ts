import type { LucideIcon } from 'lucide-react';
import { AlertCircle, GitPullRequest, Package } from 'lucide-react';
import type { PanelTranslate } from '../../shared/panelTranslate';
import type { RepositoryHealthState } from './repositoryHealthTypes';

export type HealthMetricRow = {
  label: string;
  value: string | number;
  color: string;
};

export type HealthMetricGroup = {
  title: string;
  icon: LucideIcon;
  color: 'blue' | 'purple' | 'emerald';
  data: HealthMetricRow[];
};

export function buildRepositoryHealthMetrics(
  t: PanelTranslate,
  healthData: RepositoryHealthState
): HealthMetricGroup[] {
  return [
    {
      title: t('contributions.health.issues'),
      icon: AlertCircle,
      color: 'blue',
      data: [
        {
          label: t('contributions.health.open'),
          value: healthData.issues.open,
          color: 'text-yellow-400',
        },
        {
          label: t('contributions.health.closed'),
          value: healthData.issues.closed,
          color: 'text-green-400',
        },
        {
          label: t('contributions.health.recent'),
          value: healthData.issues.recentlyUpdated,
          color: 'text-blue-400',
        },
      ],
    },
    {
      title: t('contributions.health.pullRequests'),
      icon: GitPullRequest,
      color: 'purple',
      data: [
        {
          label: t('contributions.health.open'),
          value: healthData.pullRequests.open,
          color: 'text-blue-400',
        },
        {
          label: t('contributions.health.merged'),
          value: healthData.pullRequests.merged,
          color: 'text-emerald-400',
        },
        {
          label: t('contributions.health.closed'),
          value: healthData.pullRequests.closed,
          color: 'text-slate-400',
        },
      ],
    },
    {
      title: t('contributions.health.repository'),
      icon: Package,
      color: 'emerald',
      data: [
        {
          label: t('contributions.health.size'),
          value: `${healthData.repository.size}MB`,
          color: 'text-slate-300',
        },
        {
          label: t('contributions.health.language'),
          value: healthData.repository.language,
          color: 'text-blue-400',
        },
        {
          label: t('contributions.health.stars'),
          value: healthData.repository.stars,
          color: 'text-yellow-400',
        },
      ],
    },
  ];
}
