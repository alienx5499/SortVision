import React, { useState } from 'react';
import SortingVisualizer from './sortingVisualizer/SortingVisualizer';
import AnalysisPanel from './components/analysis/AnalysisPanel'; // Add this import
// Add this import at the top:
import AnalysisPanel from '../analysis/AnalysisPanel';

// Add this to your return statement (right after <Controls />):
<div className="analysis-container mt-8 p-4 bg-white rounded-lg shadow">
  <AnalysisPanel />
</div>

// Create a new context if you don't have one
export const MetricsContext = React.createContext();

const SortingVisualizerWrapper = () => {
  const [memoryMetrics, setMemoryMetrics] = useState([]);
  const [cacheMetrics, setCacheMetrics] = useState({ hits: 0, misses: 0 });
  const [branchMetrics, setBranchMetrics] = useState({ accurate: 0, total: 0 });
  const [showAnalysis, setShowAnalysis] = useState(true); // Control panel visibility

  return (
    <MetricsContext.Provider value={{
      memoryMetrics,
      cacheMetrics,
      branchMetrics,
      setMemoryMetrics,
      setCacheMetrics,
      setBranchMetrics
    }}>
      <div className="sorting-container">
        {/* Add a toggle button */}
        <button 
          onClick={() => setShowAnalysis(!showAnalysis)}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          {showAnalysis ? 'Hide Analysis' : 'Show Analysis'}
        </button>
        
        <SortingVisualizer />
        
        {/* Conditionally render AnalysisPanel */}
        {showAnalysis && (
          <div className="analysis-panel-container mt-6 p-4 border rounded-lg">
            <AnalysisPanel />
          </div>
        )}
      </div>
    </MetricsContext.Provider>
  );
};

export default SortingVisualizerWrapper;