import React from 'react';
import { ArrayVisualization } from '../../sortingVisualizer/components/ArrayVisualization';
import {
  AlgorithmSelector,
  AlgorithmDetails,
  AlgorithmInfo,
  InteractiveTip,
  FunFact,
} from '.';
import type { DataPanelProps } from './detailsPanelContracts';

/**
 * DataPanel Component
 *
 * Displays the visualization and information of sorting algorithms:
 * - Algorithm selection UI
 * - Algorithm details (pseudocode, characteristics)
 * - Algorithm information (category, related algorithms, historical context)
 * - Interactive tips and fun facts
 * - Array visualization with animated bars
 */
const DataPanel = ({
  algorithm,
  array,
  currentBar,
  isSorting,
  isPaused = false,
  currentTestingAlgo,
  isStopped,
  setAlgorithm,
}: DataPanelProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-4 rounded border border-slate-800">
        <AlgorithmSelector algorithm={algorithm} setAlgorithm={setAlgorithm} />

        <AlgorithmDetails algorithm={algorithm} />

        <AlgorithmInfo algorithm={algorithm} />

        <InteractiveTip algorithm={algorithm} />

        <FunFact algorithm={algorithm} />
      </div>

      <div className="mt-6">
        <ArrayVisualization
          algorithm={algorithm}
          array={array}
          currentBar={currentBar}
          isSorting={isSorting}
          isPaused={isPaused}
          currentTestingAlgo={currentTestingAlgo}
          isStopped={isStopped}
        />
      </div>
    </div>
  );
};

export default DataPanel;
