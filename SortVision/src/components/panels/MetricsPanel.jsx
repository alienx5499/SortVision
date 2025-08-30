import React from 'react';
import { ArrayVisualization } from '../visualizations';
import { CurrentRunMetrics, AlgorithmComparison } from './metrics';

/**
 * MetricsPanel Component
 *
 * Displays performance metrics for sorting algorithms:
 * - Current run metrics (swaps, comparisons, time)
 * - Efficiency ratios and performance indicators
 * - Algorithm comparison with rankings
 * - Test all algorithms functionality
 * - Performance visualization
 */
const MetricsPanel = ({
  metrics,
  sortedMetrics,
  isSorting,
  currentTestingAlgo,
  testAllAlgorithms,
  stopSorting,
  algorithm,
  array,
  currentBar,
  isStopped,
}) => {
  return (
    <div className="space-y-6">
      {/* Current Run Metrics */}
      <CurrentRunMetrics
        metrics={metrics}
        sortedMetrics={sortedMetrics}
        algorithm={algorithm}
        array={array}
      />

      {/* Algorithm Comparison Section */}
      <AlgorithmComparison
        sortedMetrics={sortedMetrics}
        isSorting={isSorting}
        currentTestingAlgo={currentTestingAlgo}
        testAllAlgorithms={testAllAlgorithms}
        stopSorting={stopSorting}
        algorithm={algorithm}
      />

      {/* Add the array visualization */}
      {array && (
        <ArrayVisualization
          algorithm={algorithm}
          array={array}
          currentBar={currentBar}
          isSorting={isSorting}
          currentTestingAlgo={currentTestingAlgo}
          isStopped={isStopped}
          height="h-100"
        />
      )}
    </div>
  );
};

export default MetricsPanel;
