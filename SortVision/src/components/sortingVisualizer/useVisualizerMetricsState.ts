import { useState } from 'react';
import type { CompareMetricsMap, SortMetrics } from './SortingControls';
import type { SortingAlgorithmId } from './algorithmRegistry';
import type { RankedMetrics } from './visualizerMetricsTypes';

export function useVisualizerMetricsState() {
  const [metrics, setMetrics] = useState<SortMetrics>({
    swaps: 0,
    comparisons: 0,
    time: 0,
  });
  const [sortedMetrics, setSortedMetrics] = useState<RankedMetrics[]>([]);
  const [currentTestingAlgo, setCurrentTestingAlgo] =
    useState<SortingAlgorithmId | null>(null);
  const [compareMetrics, setCompareMetrics] = useState<CompareMetricsMap>({});

  return {
    metrics,
    sortedMetrics,
    currentTestingAlgo,
    compareMetrics,
    setMetrics,
    setSortedMetrics,
    setCurrentTestingAlgo,
    setCompareMetrics,
  };
}
