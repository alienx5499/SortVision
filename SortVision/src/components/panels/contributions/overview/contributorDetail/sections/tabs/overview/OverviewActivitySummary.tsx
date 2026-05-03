import React from 'react';
import { Bug, GitPullRequest, TrendingUp } from 'lucide-react';

const OverviewActivitySummary = ({
  hasComprehensive,
  issues,
  linesAdded,
  linesDeleted,
  mergedPrCount,
  openIssueCount,
  openPrCount,
  prAdditionsTotal,
  prDeletionsTotal,
  pullRequests,
  closedIssueCount,
  closedPrCount,
  t,
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
    <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
      <div className="flex items-center gap-2 text-emerald-400 text-sm mb-2">
        <GitPullRequest className="w-4 h-4" />
        {t('contributions.contributorDetail.pullRequests')}
      </div>
      <div className="text-xl sm:text-2xl font-bold text-white font-mono">
        {pullRequests.length}
      </div>
      <div className="text-xs text-slate-400 mt-1 space-y-1">
        <div>
          {t('contributions.contributorDetail.total')}: {pullRequests.length}
        </div>
        {pullRequests.length > 0 && (
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <span className="text-purple-400">
              {mergedPrCount} {t('contributions.contributorDetail.merged')}
            </span>
            <span className="text-green-400">
              {openPrCount} {t('contributions.contributorDetail.open')}
            </span>
            <span className="text-red-400">
              {closedPrCount} {t('contributions.contributorDetail.closed')}
            </span>
          </div>
        )}
      </div>
    </div>

    <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
      <div className="flex items-center gap-2 text-blue-400 text-sm mb-2">
        <Bug className="w-4 h-4" />
        {t('contributions.contributorDetail.issues')}
      </div>
      <div className="text-xl sm:text-2xl font-bold text-white font-mono">
        {issues.length}
      </div>
      <div className="text-xs text-slate-400 mt-1 space-y-1">
        <div>
          {t('contributions.contributorDetail.total')}: {issues.length}
        </div>
        {issues.length > 0 && (
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <span className="text-green-400">
              {openIssueCount} {t('contributions.contributorDetail.open')}
            </span>
            <span className="text-purple-400">
              {closedIssueCount} {t('contributions.contributorDetail.closed')}
            </span>
          </div>
        )}
      </div>
    </div>

    <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
      <div className="flex items-center gap-2 text-green-400 text-sm mb-2">
        <TrendingUp className="w-4 h-4" />
        {t('contributions.contributorDetail.linesAdded')}
      </div>
      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white font-mono">
        +{linesAdded.toLocaleString()}
      </div>
      <div className="text-xs text-slate-400 mt-1 space-y-1">
        <div>
          {hasComprehensive
            ? t('contributions.contributorDetail.totalInsertions')
            : t('contributions.contributorDetail.totalInsertionsPartial')}
        </div>
        <div className="flex gap-2">
          <span className="text-emerald-400">
            PRs: +{prAdditionsTotal.toLocaleString()}
          </span>
        </div>
      </div>
    </div>

    <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
      <div className="flex items-center gap-2 text-red-400 text-sm mb-2">
        <TrendingUp className="w-4 h-4 rotate-180" />
        {t('contributions.contributorDetail.linesDeleted')}
      </div>
      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white font-mono">
        -{linesDeleted.toLocaleString()}
      </div>
      <div className="text-xs text-slate-400 mt-1 space-y-1">
        <div>
          {hasComprehensive
            ? t('contributions.contributorDetail.totalDeletions')
            : t('contributions.contributorDetail.totalDeletionsPartial')}
        </div>
        <div className="flex gap-2">
          <span className="text-red-400">
            PRs: -{prDeletionsTotal.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default OverviewActivitySummary;
