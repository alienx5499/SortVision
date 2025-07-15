// src/components/panels/AnalysisDashboard.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AlgorithmContext } from '../../context/AlgorithmState';
import MemoryTracker from './analysis/MemoryTracker';
import CacheAnalyzer from './analysis/CacheAnalyzer';
import RegressionTester from './analysis/RegressionTester';
import { MemoryTracker as MemoryTrackerUtil, instrumentAlgorithm } from '../../utils/memoryTracker';
import { CacheSimulator } from '../../utils/cacheSimulator';

export default function AnalysisDashboard() {
  const { currentAlgorithm, array, isRunning } = useContext(AlgorithmContext);
  const [memorySnapshots, setMemorySnapshots] = useState([]);
  const [cacheStats, setCacheStats] = useState({ hits: 0, misses: 0 });
  const [activeTab, setActiveTab] = useState('memory');
  
  useEffect(() => {
    const memoryTracker = new MemoryTrackerUtil();
    const cacheSim = new CacheSimulator();
    
    const trackAccess = (index, isWrite = false) => {
      // Simulate memory address (simplified)
      const address = index * 8; // Assuming 8 bytes per number
      cacheSim.access(address);
      setCacheStats({ hits: cacheSim.hits, misses: cacheSim.misses });
    };
    
    const instrumentedAlgorithm = instrumentAlgorithm(
      currentAlgorithm.implementation,
      memoryTracker
    );
    
    // Run the algorithm with instrumentation
    if (!isRunning && array.length > 0) {
      memoryTracker.clear();
      cacheSim.reset();
      
      const arrCopy = [...array];
      instrumentedAlgorithm(arrCopy, { trackAccess });
      
      setMemorySnapshots(memoryTracker.snapshots);
      setCacheStats({ hits: cacheSim.hits, misses: cacheSim.misses });
    }
  }, [currentAlgorithm, array, isRunning]);
  
  return (
    <div className="analysis-dashboard">
      <div className="tabs">
        <button 
          className={activeTab === 'memory' ? 'active' : ''}
          onClick={() => setActiveTab('memory')}
        >
          Memory Analysis
        </button>
        <button 
          className={activeTab === 'cache' ? 'active' : ''}
          onClick={() => setActiveTab('cache')}
        >
          Cache Analysis
        </button>
        <button 
          className={activeTab === 'regression' ? 'active' : ''}
          onClick={() => setActiveTab('regression')}
        >
          Regression Tests
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'memory' && (
          <MemoryTracker snapshots={memorySnapshots} />
        )}
        
        {activeTab === 'cache' && (
          <CacheAnalyzer hits={cacheStats.hits} misses={cacheStats.misses} />
        )}
        
        {activeTab === 'regression' && (
          <RegressionTester />
        )}
      </div>
    </div>
  );
}