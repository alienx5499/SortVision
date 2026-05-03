import { POINTS_CONFIG } from '../config';
import { fetchLeaderboardData } from '../leaderboardQueryService';
import type { LeaderboardEnrichedParticipant } from '../leaderboardTypes';
import { fetchContributorExportDetail } from './leaderboardContributorExportDetail';
import { arrayToCSV } from './leaderboardCsv';
import {
  exportDateStamp,
  formatIssuesOnly,
  formatPRLinks,
} from './leaderboardExportFormatters';
import type {
  ExportProgressCallback,
  LeaderboardExportResult,
  LeaderboardExportRow,
} from './leaderboardExportTypes';

function buildFullExportRow(
  participant: LeaderboardEnrichedParticipant,
  rankIndex: number,
  detail: Awaited<ReturnType<typeof fetchContributorExportDetail>>
): LeaderboardExportRow {
  return {
    Rank: rankIndex + 1,
    'Contributor Name': participant.contributorName,
    'GitHub Username': participant.githubId,
    'Issues Resolved': formatIssuesOnly(detail.issues),
    'PR Links': formatPRLinks(detail.prs, participant.githubId),
    'Beginner Issues Count': detail.beginnerIssues,
    'Intermediate Issues Count': detail.intermediateIssues,
    'Advanced Issues Count': detail.advancedIssues,
    'Beginner Score': detail.beginnerIssues * POINTS_CONFIG.Beginner,
    'Intermediate Score':
      detail.intermediateIssues * POINTS_CONFIG.Intermediate,
    'Advanced Score': detail.advancedIssues * POINTS_CONFIG.Advanced,
    'Total Score': detail.totalPoints,
    'Profile URL': `https://github.com/${participant.githubId}`,
    'Total Issues': detail.totalIssues,
    'Export Date': exportDateStamp(),
  };
}

/**
 * Orchestrates full export: fetch leaderboard → enrich rows → CSV string.
 * No `alert` / `window` download — UI layer calls `downloadCsvFile`.
 */
export async function runFullLeaderboardExport(
  onProgress?: ExportProgressCallback
): Promise<LeaderboardExportResult> {
  onProgress?.(0, 'Fetching leaderboard data...');

  const participants = await fetchLeaderboardData();

  if (!participants || participants.length === 0) {
    return { status: 'empty' };
  }

  const activeParticipants = participants.filter(p => p.totalPoints > 0);

  onProgress?.(20, 'Fetching detailed contributor information...');

  const detailedData: LeaderboardExportRow[] = [];
  const total = activeParticipants.length;

  for (let i = 0; i < activeParticipants.length; i++) {
    const participant = activeParticipants[i]!;

    onProgress?.(
      20 + (i / total) * 70,
      `Processing ${participant.contributorName}...`
    );

    const contributorData = await fetchContributorExportDetail(
      participant.githubId
    );

    detailedData.push(buildFullExportRow(participant, i, contributorData));

    if (i < activeParticipants.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  onProgress?.(95, 'Generating Excel file...');

  detailedData.sort(
    (a, b) => Number(b['Total Score']) - Number(a['Total Score'])
  );

  detailedData.forEach((data, index) => {
    data.Rank = index + 1;
  });

  const csvContent = arrayToCSV(detailedData);
  const filename = `SSOC_S4_Leaderboard_Export_${exportDateStamp()}.csv`;

  onProgress?.(100, 'Export completed!');

  return {
    status: 'ok',
    csv: csvContent,
    filename,
    rowCount: detailedData.length,
  };
}

/**
 * Quick summary CSV without per-user detail API calls.
 */
export async function runQuickLeaderboardExport(): Promise<LeaderboardExportResult> {
  const participants = await fetchLeaderboardData();

  if (!participants || participants.length === 0) {
    return { status: 'empty' };
  }

  const activeParticipants = participants
    .filter(p => p.totalPoints > 0)
    .sort((a, b) => b.totalPoints - a.totalPoints);

  const summaryData: LeaderboardExportRow[] = activeParticipants.map(
    (participant, index) => ({
      Rank: index + 1,
      'Contributor Name': participant.contributorName,
      'GitHub Username': participant.githubId,
      'Beginner Issues': participant.beginnerIssues,
      'Intermediate Issues': participant.intermediateIssues,
      'Advanced Issues': participant.advancedIssues,
      'Total Points': participant.totalPoints,
      'Profile URL': `https://github.com/${participant.githubId}`,
      'Export Date': exportDateStamp(),
    })
  );

  const csvContent = arrayToCSV(summaryData);
  const filename = `SSOC_S4_Quick_Summary_${exportDateStamp()}.csv`;

  return {
    status: 'ok',
    csv: csvContent,
    filename,
    rowCount: summaryData.length,
  };
}
