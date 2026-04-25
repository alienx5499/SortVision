export const getCurrentRunDerivedMetrics = ({
  metrics,
  sortedMetrics,
  algorithm,
  arrayLength,
}) => {
  const swapRatio =
    metrics.comparisons > 0
      ? (metrics.swaps / metrics.comparisons).toFixed(2)
      : 0;
  const timePerElement =
    arrayLength > 0 ? (metrics.time / arrayLength).toFixed(2) : 0;
  const operationsPerMs =
    metrics.time > 0
      ? ((metrics.swaps + metrics.comparisons) / metrics.time).toFixed(2)
      : 0;

  const performanceScore =
    metrics.time > 0
      ? Math.round(
          metrics.swaps * 0.3 +
            metrics.comparisons * 0.3 +
            parseFloat(metrics.time) * 0.4
        )
      : 0;

  const bestAlgorithm = sortedMetrics.length > 0 ? sortedMetrics[0] : null;

  const improvementPercent =
    bestAlgorithm && metrics.time > 0 && algorithm !== bestAlgorithm.algo
      ? Math.round(
          ((metrics.time - parseFloat(bestAlgorithm.metrics.time)) /
            metrics.time) *
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
