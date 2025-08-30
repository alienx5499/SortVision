import React from 'react';
import { ArrayVisualization } from '../../visualizations';
import {
  AlgorithmSelector,
  AlgorithmDetails,
  AlgorithmInfo,
  InteractiveTip,
  FunFact,
} from '.';

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
  currentTestingAlgo,
  isStopped,
  setAlgorithm,
}) => {
  return (
    <div className="space-y-6">
      {/* Algorithm Details with enhanced styling */}
      <div className="bg-slate-900 p-4 rounded border border-slate-800">
        {/* Algorithm Selector Component */}
        <AlgorithmSelector algorithm={algorithm} setAlgorithm={setAlgorithm} />

        {/* Algorithm Details Component */}
        <AlgorithmDetails algorithm={algorithm} />

        {/* Algorithm Info Component */}
        <AlgorithmInfo algorithm={algorithm} />

        {/* Interactive Tip Component */}
        <InteractiveTip algorithm={algorithm} />

        {/* Fun Fact Component */}
        <FunFact algorithm={algorithm} />
      </div>

      {/* Array visualization with consistent styling across all panels */}
      <div className="mt-6">
        <ArrayVisualization
          algorithm={algorithm}
          array={array}
          currentBar={currentBar}
          isSorting={isSorting}
          currentTestingAlgo={currentTestingAlgo}
          isStopped={isStopped}
        />
      </div>
    </div>
  );
};

export default DataPanel;
