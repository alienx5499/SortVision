import React, { useImperativeHandle, forwardRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import SortingHeader from './SortingHeader';
import { SortingVisualizerTabs } from './SortingVisualizerTabs';
import { useSortingVisualizerController } from './hooks/useSortingController';

export type SortingVisualizerHandle = {
  playPause: () => void;
  resetVisualization: () => void;
  shuffleArray: () => void;
  increaseSpeed: () => void;
  decreaseSpeed: () => void;
  nextAlgorithm: () => void;
  prevAlgorithm: () => void;
  generateNewArray: () => void;
  /** Pauses an in-flight single-algorithm run (same as the config Pause control). */
  stopSorting: () => void;
  resumeSorting: () => void;
};

export type SortingVisualizerProps = {
  initialAlgorithm?: string;
  activeTab?: string;
  onTabChange?: (value: string) => void;
  specialMode?: 'contributors' | null;
};

const SortingVisualizer = forwardRef<
  SortingVisualizerHandle,
  SortingVisualizerProps
>(function SortingVisualizer(
  {
    initialAlgorithm = 'bubble',
    activeTab = 'controls',
    onTabChange,
    specialMode = null,
  },
  ref
) {
  const {
    t,
    audio,
    state: {
      array,
      algorithm,
      arraySize,
      isSorting,
      isPaused,
      isStopped,
      speed,
      currentBar,
      metrics,
      sortedMetrics,
      currentTestingAlgo,
    },
    actions: {
      playPause,
      resetVisualization,
      shuffleArray,
      increaseSpeed,
      decreaseSpeed,
      nextAlgorithm,
      prevAlgorithm,
      generateNewArray,
      pauseSorting,
      resumeSorting,
      stopTestAllSorting,
      startSorting,
      testAllAlgorithms,
      handleAlgorithmChange,
      setArraySize,
      setSpeed,
      getAlgorithmTimeComplexity,
    },
  } = useSortingVisualizerController(initialAlgorithm);

  useImperativeHandle(ref, () => ({
    playPause,
    resetVisualization,
    shuffleArray,
    increaseSpeed,
    decreaseSpeed,
    nextAlgorithm,
    prevAlgorithm,
    generateNewArray,
    stopSorting: pauseSorting,
    resumeSorting,
  }));

  return (
    <Card className="w-full max-w-5xl mx-auto border-slate-800 bg-slate-950 text-slate-200 shadow-lg">
      <SortingHeader />

      <CardContent className="p-4 space-y-4">
        <SortingVisualizerTabs
          t={t}
          audio={audio}
          algorithm={algorithm}
          array={array}
          arraySize={arraySize}
          isSorting={isSorting}
          isPaused={isPaused}
          isStopped={isStopped}
          speed={speed}
          currentBar={currentBar}
          activeTab={activeTab}
          onTabChange={onTabChange}
          handleAlgorithmChange={handleAlgorithmChange}
          setArraySize={setArraySize}
          setSpeed={setSpeed}
          getAlgorithmTimeComplexity={getAlgorithmTimeComplexity}
          generateNewArray={generateNewArray}
          startSorting={startSorting}
          pauseSorting={pauseSorting}
          resumeSorting={resumeSorting}
          metrics={metrics}
          sortedMetrics={sortedMetrics}
          currentTestingAlgo={currentTestingAlgo}
          testAllAlgorithms={testAllAlgorithms}
          stopTestAllSorting={stopTestAllSorting}
          specialMode={specialMode}
        />
      </CardContent>
    </Card>
  );
});

export default SortingVisualizer;
