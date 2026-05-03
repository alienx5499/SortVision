import React, { useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { buildRepositoryHealthMetrics } from './buildRepositoryHealthMetrics';
import { RepositoryHealthCard } from './RepositoryHealthCard';
import { RepositoryHealthFrame } from './RepositoryHealthFrame';
import { RepositoryHealthLatestRelease } from './RepositoryHealthLatestRelease';
import { createGithubProxyJsonFetch } from './repositoryHealthService';
import { useRepositoryHealthData } from './useRepositoryHealthData';

const authenticatedFetch = createGithubProxyJsonFetch();

const RepositoryHealth = () => {
  const { t } = useLanguage();
  const { healthData, fetchHealthData } =
    useRepositoryHealthData(authenticatedFetch);

  const healthMetrics = useMemo(
    () => buildRepositoryHealthMetrics(t, healthData),
    [healthData, t]
  );

  return (
    <RepositoryHealthFrame
      loading={healthData.loading}
      onRefresh={() => void fetchHealthData()}
    >
      {healthData.error && (
        <div className="mb-4 p-2 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-400 font-mono relative z-10">
          API limit reached. Showing cached data.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 relative z-10">
        {healthMetrics.map((metric, index) => (
          <RepositoryHealthCard
            key={metric.title}
            metric={metric}
            index={index}
            loading={healthData.loading}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
        {healthData.releases.latest && (
          <RepositoryHealthLatestRelease release={healthData.releases.latest} />
        )}
      </div>
    </RepositoryHealthFrame>
  );
};

export default RepositoryHealth;
