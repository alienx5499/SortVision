import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { API_BASE_URL } from './constants';
import { COMMITS_PAGINATION_CONFIG } from './constants';
import { useContributorDetailData } from './hooks/useContributorDetailData';
import { useContributorDetailModalEffects } from './hooks/useContributorDetailModalEffects';
import ContributorDetailHeader from './sections/ContributorDetailHeader';
import ContributorDetailLoadingState from './sections/ContributorDetailLoadingState';
import ContributorDetailTabs from './sections/ContributorDetailTabs';
import CommitsTab from './sections/tabs/CommitsTab';
import IssuesTab from './sections/tabs/IssuesTab';
import OverviewTab from './sections/tabs/OverviewTab';
import PullRequestsTab from './sections/tabs/PullRequestsTab';
import { getContributorType } from './utils/formatters';

const ContributorDetailModal = ({
  contributor,
  isOpen,
  onClose,
  isAdmin,
  isBot,
  authenticatedFetch,
  getCachedContributorStats,
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');

  const repoOwner = process.env.NEXT_PUBLIC_GITHUB_REPO_OWNER || 'alienx5499';
  const repoName = process.env.NEXT_PUBLIC_GITHUB_REPO_NAME || 'SortVision';
  void API_BASE_URL;

  const {
    profileData,
    pullRequests,
    issues,
    commits,
    hasMoreCommits,
    loadingMoreCommits,
    loadMoreCommits,
    loading,
    loadingProgress,
  } = useContributorDetailData({
    contributor,
    isOpen,
    authenticatedFetch,
    getCachedContributorStats,
    repoOwner,
    repoName,
  });

  useContributorDetailModalEffects({ isOpen, onClose });

  const contributorType = getContributorType({ isAdmin, isBot });

  if (!isOpen || !contributor) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(5px)' }}
          transition={{
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
            scale: { type: 'spring', damping: 25, stiffness: 300 },
          }}
          className="relative w-full max-w-4xl max-h-[95vh] bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl flex flex-col"
        >
          <ContributorDetailHeader
            contributor={contributor}
            contributorType={contributorType}
            profileData={profileData}
            onClose={onClose}
          />

          <ContributorDetailTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div
            className="flex-1 p-4 sm:p-6 overflow-y-auto min-h-0"
            onScroll={event => {
              if (activeTab !== 'commits') return;
              if (!hasMoreCommits || loadingMoreCommits) return;
              const element = event.currentTarget;
              const distanceFromBottom =
                element.scrollHeight - element.scrollTop - element.clientHeight;
              if (
                distanceFromBottom <=
                COMMITS_PAGINATION_CONFIG.scrollThresholdPx
              ) {
                loadMoreCommits();
              }
            }}
          >
            {loading ? (
              <ContributorDetailLoadingState
                t={t}
                loadingProgress={loadingProgress}
              />
            ) : (
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <OverviewTab
                      profileData={profileData}
                      contributor={contributor}
                      pullRequests={pullRequests}
                      issues={issues}
                      commits={commits}
                      t={t}
                    />
                  </motion.div>
                )}
                {activeTab === 'pulls' && (
                  <motion.div
                    key="pulls"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <PullRequestsTab pullRequests={pullRequests} t={t} />
                  </motion.div>
                )}
                {activeTab === 'issues' && (
                  <motion.div
                    key="issues"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <IssuesTab issues={issues} t={t} />
                  </motion.div>
                )}
                {activeTab === 'commits' && (
                  <motion.div
                    key="commits"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <CommitsTab
                      commits={commits}
                      hasMoreCommits={hasMoreCommits}
                      loadingMoreCommits={loadingMoreCommits}
                      t={t}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContributorDetailModal;
