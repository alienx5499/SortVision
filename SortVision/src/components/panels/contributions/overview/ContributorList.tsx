import React from 'react';
import { Github } from '@/components/ui/OptimizedIcons';
import { useLanguage } from '@/context/language';
import ContributorDetailModal from './contributorDetail/ContributorDetailModal';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContributorListState } from './useContributorListState';
import type { GitHubContributor } from '../githubContributor';
import { ContributorCard } from './components/ContributorCard';
import { ContributorListFilters } from './components/ContributorListFilters';
import { ContributorListLoadingGrid } from './components/ContributorListLoadingGrid';
import { ContributorListFrame } from './components/ContributorListFrame';
import type { GetCachedContributorLineStats } from '../contributionsPanelContracts';

export type { GitHubContributor };

export type ContributorListProps = {
  contributors: GitHubContributor[];
  loading: boolean;
  onRefresh?: () => void;
  projectAdmins?: string[];
  botUsers?: string[];
  authenticatedFetch?: (
    input: RequestInfo | URL,
    init?: RequestInit
  ) => Promise<Response>;
  getCachedContributorStats?: GetCachedContributorLineStats;
};

const ContributorList = ({
  contributors,
  loading,
  onRefresh,
  projectAdmins = [],
  botUsers = [],
  authenticatedFetch,
  getCachedContributorStats,
}: ContributorListProps) => {
  const { getLocalizedUrl, t } = useLanguage();

  const navigate = useNavigate();
  const location = useLocation();

  const {
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    selectedContributor,
    isModalOpen,
    filteredContributors,
    handleContributorClick,
    handleCloseModal,
  } = useContributorListState({
    location,
    contributors,
    navigate,
    getLocalizedUrl,
    projectAdmins,
    botUsers,
  });

  return (
    <ContributorListFrame loading={loading} onRefresh={onRefresh}>
      <ContributorListFilters
        filter={filter}
        setFilter={setFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        t={t}
      />

      <div className="font-mono text-xs text-slate-400 mb-4 relative z-10">
        <span className="text-emerald-400">{filteredContributors.length}</span>{' '}
        {t('contributions.list.contributorsFound')}
      </div>

      {loading ? (
        <ContributorListLoadingGrid />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
          {filteredContributors.map((contributor, index) => (
            <ContributorCard
              key={contributor.login}
              contributor={contributor}
              index={index}
              isAdmin={projectAdmins.includes(contributor.login)}
              isBot={botUsers.includes(contributor.login)}
              onClick={() => handleContributorClick(contributor)}
              t={t}
            />
          ))}
        </div>
      )}

      {!loading && filteredContributors.length === 0 && (
        <div className="text-center py-12 relative z-10">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
            <Github className="w-8 h-8 text-slate-500" />
          </div>
          <p className="text-slate-400 font-mono text-sm">
            {t('contributions.list.noContributorsFound')}
          </p>
          <p className="text-slate-500 font-mono text-xs mt-1">
            Try adjusting your filters
          </p>
        </div>
      )}

      <ContributorDetailModal
        contributor={selectedContributor}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isAdmin={
          !!(
            selectedContributor &&
            projectAdmins.includes(selectedContributor.login)
          )
        }
        isBot={
          !!(
            selectedContributor && botUsers.includes(selectedContributor.login)
          )
        }
        authenticatedFetch={authenticatedFetch}
        getCachedContributorStats={getCachedContributorStats}
      />
    </ContributorListFrame>
  );
};

export default ContributorList;
