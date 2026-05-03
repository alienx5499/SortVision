'use client';

import { useLanguage } from '@/context/language';
import type { ContributionAggregateStats } from '../contributionsPanelContracts';
import { buildContributorStatItems } from './buildContributorStatItems';
import { ContributorStatCard } from './ContributorStatCard';
import { ContributorStatsFrame } from './ContributorStatsFrame';

export type ContributorStatsProps = {
  stats: ContributionAggregateStats | null | undefined;
  loading: boolean;
  onRefresh?: () => void;
};

export default function ContributorStats({
  stats,
  loading,
  onRefresh,
}: ContributorStatsProps) {
  const { t } = useLanguage();
  const statItems = buildContributorStatItems(t, stats);

  return (
    <ContributorStatsFrame
      title={t('contributions.stats.contributorMetrics')}
      loading={loading}
      onRefresh={onRefresh}
    >
      <div className="grid grid-cols-2 gap-4 relative z-10">
        {statItems.map((item, index) => (
          <ContributorStatCard
            key={item.id}
            item={item}
            loading={loading}
            index={index}
          />
        ))}
      </div>
    </ContributorStatsFrame>
  );
}
