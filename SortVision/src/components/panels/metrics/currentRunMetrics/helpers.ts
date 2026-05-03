import type {
  SortRunMetrics,
  SortedMetricListEntry,
} from '../metricsPanelContracts';

export const getCurrentRunDerivedMetrics = ({
  metrics,
  sortedMetrics,
  algorithm,
  arrayLength,
}: {
  metrics: SortRunMetrics;
  sortedMetrics: SortedMetricListEntry[];
  algorithm: string;
  arrayLength: number;
}) => {
  const swapRatio =
    metrics.comparisons > 0
      ? (metrics.swaps / metrics.comparisons).toFixed(2)
      : 0;
  const timePerElement =
    arrayLength > 0 ? (Number(metrics.time) / arrayLength).toFixed(2) : 0;
  const operationsPerMs =
    Number(metrics.time) > 0
      ? ((metrics.swaps + metrics.comparisons) / Number(metrics.time)).toFixed(
          2
        )
      : 0;

  const performanceScore =
    Number(metrics.time) > 0
      ? Math.round(
          metrics.swaps * 0.3 +
            metrics.comparisons * 0.3 +
            Number(metrics.time) * 0.4
        )
      : 0;

  const bestAlgorithm = sortedMetrics.length > 0 ? sortedMetrics[0]! : null;

  const improvementPercent =
    bestAlgorithm &&
    Number(metrics.time) > 0 &&
    algorithm !== bestAlgorithm.algo
      ? Math.round(
          ((Number(metrics.time) -
            Number.parseFloat(String(bestAlgorithm.metrics.time))) /
            Number(metrics.time)) *
            100
        )
      : 0;

  return {
    swapRatio,
    timePerElement,
    operationsPerMs,
    performanceScore,
    bestAlgorithm,
    improvementPercent,
  };
};

export type CurrentRunDerivedMetrics = ReturnType<
  typeof getCurrentRunDerivedMetrics
>;
