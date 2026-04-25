import { ALGO_SCHEME_MAP, DEFAULT_SCHEME, WINNER_SCHEME } from './config';

export const getRankingColorScheme = (algo, rank) => {
  if (rank === 1) return WINNER_SCHEME;
  return ALGO_SCHEME_MAP[algo] || DEFAULT_SCHEME;
};

export const getPerformanceBarWidth = rank => {
  return `${Math.max(5, 100 - (rank - 1) * 15)}%`;
};

export const getComparisonDelta = (algoMetrics, currentAlgoMetrics) => {
  if (!currentAlgoMetrics || !(algoMetrics.time > 0)) return null;

  const currentTime = parseFloat(currentAlgoMetrics.time);
  const candidateTime = parseFloat(algoMetrics.time);

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
