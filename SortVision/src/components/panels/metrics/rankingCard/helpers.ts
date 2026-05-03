import type { SortRunMetrics } from '../metricsPanelContracts';
import {
  ALGO_SCHEME_MAP,
  DEFAULT_SCHEME,
  WINNER_SCHEME,
  type RankingColorScheme,
} from './config';

export const getRankingColorScheme = (
  algo: string,
  rank: number
): RankingColorScheme => {
  if (rank === 1) return WINNER_SCHEME;
  return ALGO_SCHEME_MAP[algo] ?? DEFAULT_SCHEME;
};

export const getPerformanceBarWidth = (rank: number): string =>
  `${Math.max(5, 100 - (rank - 1) * 15)}%`;

export const getComparisonDelta = (
  algoMetrics: SortRunMetrics,
  currentAlgoMetrics: SortRunMetrics | null | undefined
): { faster: boolean; percent: number } | null => {
  if (!currentAlgoMetrics || !(Number(algoMetrics.time) > 0)) return null;

  const currentTime = Number.parseFloat(String(currentAlgoMetrics.time));
  const candidateTime = Number.parseFloat(String(algoMetrics.time));

  if (!(currentTime > 0) || !(candidateTime > 0)) return null;

  if (candidateTime < currentTime) {
    return {
      faster: true,
      percent: Math.round((candidateTime / currentTime - 1) * -100),
    };
  }

  return {
    faster: false,
    percent: Math.round((candidateTime / currentTime - 1) * 100),
  };
};
