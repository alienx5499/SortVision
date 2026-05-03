import React from 'react';
import {
  ContributorStats,
  ContributorList,
  RepositoryHealth,
  ContributeGuide,
  QuickReferences,
  BestPractices,
  useContributionPanelData,
} from './contributions';
import type {
  ContributionPanelProps,
  ContributionSectionTab,
} from './contributions';

export type { ContributionPanelProps } from './contributions';

const ContributionPanel = ({
  activeTab = 'overview',
  onTabChange: _onTabChange,
}: ContributionPanelProps) => {
  const activeSection: ContributionSectionTab =
    activeTab === 'guide' ? 'guide' : 'overview';

  const {
    contributors,
    stats,
    loading,
    error,
    fetchContributors,
    authenticatedFetch,
    getCachedContributorStats,
    projectAdmins,
    botUsers,
  } = useContributionPanelData();

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center">
          <div className="text-red-400 mb-4">{error}</div>
          <button
            type="button"
            onClick={fetchContributors}
            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="space-y-6 min-h-[600px]">
        {activeSection === 'overview' && (
          <div className="space-y-6">
            <div className="min-h-[120px]">
              <ContributorStats
                stats={stats}
                loading={loading}
                onRefresh={fetchContributors}
              />
            </div>

            <div className="min-h-[200px]">
              <ContributorList
                contributors={contributors}
                loading={loading}
                onRefresh={fetchContributors}
                projectAdmins={projectAdmins}
                botUsers={botUsers}
                authenticatedFetch={authenticatedFetch}
                getCachedContributorStats={getCachedContributorStats}
              />
            </div>

            <div className="min-h-[150px]">
              <RepositoryHealth />
            </div>
          </div>
        )}

        {activeSection === 'guide' && (
          <div className="space-y-6">
            <div className="min-h-[200px]">
              <ContributeGuide />
            </div>

            <div className="min-h-[150px]">
              <BestPractices />
            </div>

            <div className="min-h-[150px]">
              <QuickReferences />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContributionPanel;
