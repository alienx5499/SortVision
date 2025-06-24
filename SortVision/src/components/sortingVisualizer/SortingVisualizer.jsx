
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';
import { useAudio } from '@/hooks/useAudio';

// Import subcomponents
import SortingHeader from './SortingHeader';
import { ConfigPanel, MetricsPanel, DetailsPanel, ContributionPanel } from '../panels';
import SortingControls from './SortingControls';
import PerformanceMetrics from './PerformanceMetrics';

import { useAlgorithmState } from '@/context/AlgorithmState';
import { useContext } from 'react';
import { MetricsContext } from '../../context/MetricsContext';
import AnalysisPanel from '../analysis/AnalysisPanel';

/* Removed duplicate default export function SortingVisualizer */


/**
 * SortingVisualizer Component
 * 
 * Interactive visualization tool for various sorting algorithms with real-time
 * animation and performance metrics analysis.
 * 
 * Features:
 * - Interactive visualization of sorting algorithms (bubble, insertion, selection, etc.)
 * - Performance metrics tracking (time, comparisons, swaps)
 * - Algorithm comparison and benchmarking
 * - Configurable array size and animation speed
 * - Detailed algorithm information and complexity analysis
 * 
 * The application is structured with three main panels:
 * 1. Config Panel - Algorithm selection and configuration controls
 * 2. Metrics Panel - Performance data visualization and comparison
 * 3. Details Panel - Algorithm details and visual representation
 */
const SortingVisualizer = ({ initialAlgorithm = 'bubble', activeTab = 'controls', onTabChange, specialMode = null }) => {
  // Router navigation
  const navigate = useNavigate();

  // Audio hook
  const audio = useAudio();
  const { setAlgorithmName, setArray: setContextArray, setStep } = useAlgorithmState();


  //=============================================================================
  // STATE MANAGEMENT
  //=============================================================================

  // Core state variables for array data and algorithm selection
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState(initialAlgorithm);
  const [arraySize, setArraySize] = useState(30);

  // Sorting process control state
  const [isSorting, setIsSorting] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [currentBar, setCurrentBar] = useState({ compare: null, swap: null });

  // Performance metrics tracking state
  const [metrics, setMetrics] = useState({ swaps: 0, comparisons: 0, time: 0 });
  const [sortedMetrics, setSortedMetrics] = useState([]);
  const [currentTestingAlgo, setCurrentTestingAlgo] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [compareMetrics, setCompareMetrics] = useState({});

  // Reference for handling abort signals
  const shouldStopRef = useRef(false);

  // Reference for tracking sort start time 
  const sortStartTimeRef = useRef(null);

  // Import utility functions from subcomponents
  const sortingControls = SortingControls();
  const performanceMetrics = PerformanceMetrics();

  //=============================================================================
  // HANDLER FUNCTIONS
  //=============================================================================

  /**
   * Generates a new random array for visualization
   */
  const generateNewArray = () => {
    sortingControls.generateNewArray(arraySize, setArray, setCurrentBar);
    audio.playAccessSound(); // Play sound when generating new array
  };

  /**
   * Stops the current sorting process
   */
  const stopSorting = () => {
    sortingControls.stopSorting(shouldStopRef, setIsStopped, setIsSorting);
    audio.playAccessSound(); // Play sound when stopping
  };

  /**
   * Initiates the sorting process with the selected algorithm
   */
  const startSorting = async () => {
    sortStartTimeRef.current = Date.now();

    await sortingControls.startSorting(
      algorithm,
      array,
      setArray,
      speed,
      setCurrentBar,
      shouldStopRef,
      setIsStopped,
      setIsSorting,
      setMetrics,
      audio // Pass audio object to sorting controls
    );
  };

  /**
   * Benchmarks all sorting algorithms on the same array for comparison
   */
  const testAllAlgorithms = async () => {
    await sortingControls.testAllAlgorithms(
      array,
      setArray,
      speed,
      setCurrentBar,
      shouldStopRef,
      setIsStopped,
      setIsSorting,
      setCurrentTestingAlgo,
      setCompareMetrics,
      setSortedMetrics,
      audio // Pass audio object to sorting controls
    );
  };

  /**
   * Provides algorithm complexity and performance characteristics
   */
  const getAlgorithmTimeComplexity = () => {
    return performanceMetrics.getAlgorithmTimeComplexity(algorithm);
  };

  /**
   * Handle algorithm change and update URL for SEO
   */
  const handleAlgorithmChange = (newAlgorithm) => {
    setAlgorithm(newAlgorithm);

    // Update URL with path-based routing, preserving current tab and query parameters
    if (newAlgorithm !== initialAlgorithm) {
      const currentPath = window.location.pathname;
      const currentParams = new URLSearchParams(window.location.search);

      // Determine current tab from path
      let currentTab = 'config'; // default
      if (currentPath.includes('/details/')) {
        currentTab = 'details';
      } else if (currentPath.includes('/metrics/')) {
        currentTab = 'metrics';
      }

      // Build new URL with same tab structure
      const newSearch = currentParams.toString();
      const newUrl = `/algorithms/${currentTab}/${newAlgorithm}${newSearch ? `?${newSearch}` : ''}`;

      navigate(newUrl, { replace: true });
    }
  };

  /**
   * Handle array size change
   */
  const handleArraySizeChange = (newSize) => {
    setArraySize(newSize);
  };

  /**
   * Handle speed change
   */
  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
  };

  //=============================================================================
  // LIFECYCLE MANAGEMENT
  //=============================================================================

  /**
   * Handles component initialization, updates, and cleanup
   * 
   * Generates initial array on mount and when array size changes
   * Ensures sorting operations are properly terminated on unmount
   */
  useEffect(() => {
    generateNewArray();

    // Cleanup function to ensure sorting stops if component unmounts
    return () => {
      shouldStopRef.current = true;
    };
  }, [arraySize]);

  /**
   * Update algorithm when initialAlgorithm changes from route
   */
  useEffect(() => {
    if (initialAlgorithm !== algorithm) {
      setAlgorithm(initialAlgorithm);
    }
  }, [initialAlgorithm]);

  // Sync algorithm to context
  useEffect(() => {
    setAlgorithmName(algorithm);
  }, [algorithm]);

  // Sync array to context
  useEffect(() => {
    setContextArray(array);
  }, [array]);

  // Sync step to context (if you want live step updates too)
  useEffect(() => {
    setStep(currentBar);
  }, [currentBar]);


  //=============================================================================
  // COMPONENT RENDERING
  //=============================================================================

  return (
    <Card className="w-full max-w-5xl mx-auto border-slate-800 bg-slate-950 text-slate-200 shadow-lg">
      {/* Animation keyframes */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}} />

      {/* Application header */}
      <SortingHeader />

      {/* Main content area */}
      <CardContent className="p-4 space-y-4">
        {specialMode ? (
          // Special modes (contributors, etc.) - direct content without tab header
          <div className="w-full space-y-4">
            {specialMode === 'contributors' && (
              <ContributionPanel
                activeTab={activeTab}
                onTabChange={onTabChange}
              />
            )}
            {/* Future special modes can be added here */}
            {/* {specialMode === 'analytics' && <AnalyticsPanel />} */}
            {/* {specialMode === 'tutorials' && <TutorialsPanel />} */}
          </div>
        ) : (
          // Normal 3-tab mode
          <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
            {/* Tab navigation */}
            <TabsList className="grid w-full grid-cols-3 bg-slate-900">
              <TabsTrigger
                value="controls"
                className="font-mono"
                onClick={() => audio.playAccessSound()}
              >
                <span className="text-emerald-400">config</span>
                <span className="text-slate-400">.js</span>
              </TabsTrigger>
              <TabsTrigger
                value="metrics"
                className="font-mono"
                onClick={() => audio.playAccessSound()}
              >
                <span className="text-emerald-400">metrics</span>
                <span className="text-slate-400">.js</span>
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="font-mono"
                onClick={() => audio.playAccessSound()}
              >
                <span className="text-emerald-400">details</span>
                <span className="text-slate-400">.js</span>
              </TabsTrigger>
            </TabsList>

            {/* Configuration panel */}
            <TabsContent value="controls" className="space-y-4 mt-4">
              <ConfigPanel
                algorithm={algorithm}
                setAlgorithm={handleAlgorithmChange}
                arraySize={arraySize}
                setArraySize={handleArraySizeChange}
                speed={speed}
                setSpeed={handleSpeedChange}
                isSorting={isSorting}
                getAlgorithmTimeComplexity={getAlgorithmTimeComplexity}
                array={array}
                currentBar={currentBar}
                currentTestingAlgo={currentTestingAlgo}
                isStopped={isStopped}
                generateNewArray={generateNewArray}
                startSorting={startSorting}
                stopSorting={stopSorting}
                audio={audio}
              />
            </TabsContent>

            {/* Performance metrics panel */}
            <TabsContent value="metrics" className="space-y-4 mt-4">
              <MetricsPanel
                metrics={metrics}
                sortedMetrics={sortedMetrics}
                isSorting={isSorting}
                currentTestingAlgo={currentTestingAlgo}
                testAllAlgorithms={testAllAlgorithms}
                stopSorting={stopSorting}
                algorithm={algorithm}
                array={array}
                currentBar={currentBar}
                isStopped={isStopped}
              />
            </TabsContent>

            {/* Algorithm details panel */}
            <TabsContent value="details" className="space-y-4 mt-4">
              <DetailsPanel
                algorithm={algorithm}
                array={array}
                currentBar={currentBar}
                isSorting={isSorting}
                currentTestingAlgo={currentTestingAlgo}
                isStopped={isStopped}
                setAlgorithm={handleAlgorithmChange}
              />
            </TabsContent>

          </Tabs>
        )}
      </CardContent>


    </Card>
  );
};

export default SortingVisualizer; 
