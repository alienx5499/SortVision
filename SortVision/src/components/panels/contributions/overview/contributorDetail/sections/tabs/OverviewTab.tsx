import React, { useMemo } from 'react';
import OverviewActivitySummary from './overview/OverviewActivitySummary';
import OverviewProfileDetails from './overview/OverviewProfileDetails';
import OverviewStatsGrid from './overview/OverviewStatsGrid';
import {
  calculateLinesAdded,
  calculateLinesDeleted,
  getComprehensiveStats,
} from '../../utils/formatters';

const OverviewTab = ({
  profileData,
  contributor,
  pullRequests,
  issues,
  commits,
  t,
}) => {
  const linesAdded = useMemo(
    () => calculateLinesAdded({ commits, pullRequests }),
    [commits, pullRequests]
  );
  const linesDeleted = useMemo(
    () => calculateLinesDeleted({ commits, pullRequests }),
    [commits, pullRequests]
  );
  const comprehensiveStats = useMemo(
    () => getComprehensiveStats(commits),
    [commits]
  );
  const hasComprehensive = !!(
    comprehensiveStats && comprehensiveStats.hasComprehensiveStats
  );
  const mergedPrCount = useMemo(
    () => pullRequests.filter(pr => pr.merged === true || pr.merged_at).length,
    [pullRequests]
  );
  const openPrCount = useMemo(
    () => pullRequests.filter(pr => pr.state === 'open').length,
    [pullRequests]
  );
  const closedPrCount = useMemo(
    () =>
      pullRequests.filter(
        pr => pr.state === 'closed' && !pr.merged && !pr.merged_at
      ).length,
    [pullRequests]
  );
  const openIssueCount = useMemo(
    () => issues.filter(issue => issue.state === 'open').length,
    [issues]
  );
  const closedIssueCount = useMemo(
    () => issues.filter(issue => issue.state === 'closed').length,
    [issues]
  );
  const prAdditionsTotal = useMemo(
    () => pullRequests.reduce((sum, pr) => sum + (pr.additions || 0), 0),
    [pullRequests]
  );
  const prDeletionsTotal = useMemo(
    () => pullRequests.reduce((sum, pr) => sum + (pr.deletions || 0), 0),
    [pullRequests]
  );

  return (
    <div className="space-y-6">
      <OverviewStatsGrid
        contributor={contributor}
        profileData={profileData}
        t={t}
      />
      <OverviewProfileDetails profileData={profileData} t={t} />
      <OverviewActivitySummary
        closedIssueCount={closedIssueCount}
        closedPrCount={closedPrCount}
        hasComprehensive={hasComprehensive}
        issues={issues}
        linesAdded={linesAdded}
        linesDeleted={linesDeleted}
        mergedPrCount={mergedPrCount}
        openIssueCount={openIssueCount}
        openPrCount={openPrCount}
        prAdditionsTotal={prAdditionsTotal}
        prDeletionsTotal={prDeletionsTotal}
        pullRequests={pullRequests}
        t={t}
      />
    </div>
  );
};

export default OverviewTab;
