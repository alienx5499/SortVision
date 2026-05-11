import React, { useImperativeHandle, forwardRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SortingHeader from './SortingHeader';
import {
  ConfigPanel,
  MetricsPanel,
  DetailsPanel,
  ContributionPanel,
} from '../panels';
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
      <style
        dangerouslySetInnerHTML={{
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
      `,
        }}
      />

      <SortingHeader />

      <CardContent className="p-4 space-y-4">
        {specialMode ? (
          <div className="w-full space-y-4 min-h-[500px]">
            {specialMode === 'contributors' && (
              <Tabs
                value={activeTab}
                onValueChange={onTabChange}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 bg-slate-900">
                  <TabsTrigger
                    value="overview"
                    className="font-mono"
                    aria-label={t('visualizer.tabs.overview')}
                    onClick={() => audio.playAccessSound()}
                  >
                    <span className="text-emerald-400">
                      {t('visualizer.tabs.overview')}
                    </span>
                    <span className="text-slate-400">.js</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="guide"
                    className="font-mono"
                    aria-label={t('visualizer.tabs.guide')}
                    onClick={() => audio.playAccessSound()}
                  >
                    <span className="text-emerald-400">
                      {t('visualizer.tabs.guide')}
                    </span>
                    <span className="text-slate-400">.js</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value={activeTab}
                  className="space-y-4 mt-4 min-h-[500px]"
                >
                  <ContributionPanel
                    activeTab={activeTab}
                    onTabChange={onTabChange}
                  />
                </TabsContent>
              </Tabs>
            )}
          </div>
        ) : (
          <Tabs
            value={activeTab}
            onValueChange={onTabChange}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 bg-slate-900">
              <TabsTrigger
                value="controls"
                className="font-mono"
                aria-label={t('visualizer.tabs.config')}
                onClick={() => audio.playAccessSound()}
              >
                <span className="text-emerald-400">
                  {t('visualizer.tabs.config')}
                </span>
                <span className="text-slate-400">.js</span>
              </TabsTrigger>
              <TabsTrigger
                value="metrics"
                className="font-mono"
                aria-label={t('visualizer.tabs.metrics')}
                onClick={() => audio.playAccessSound()}
              >
                <span className="text-emerald-400">
                  {t('visualizer.tabs.metrics')}
                </span>
                <span className="text-slate-400">.js</span>
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="font-mono"
                aria-label={t('visualizer.tabs.details')}
                onClick={() => audio.playAccessSound()}
              >
                <span className="text-emerald-400">
                  {t('visualizer.tabs.details')}
                </span>
                <span className="text-slate-400">.js</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="controls"
              className="space-y-4 mt-4 min-h-[500px]"
            >
              <ConfigPanel
                algorithm={algorithm}
                setAlgorithm={handleAlgorithmChange}
                arraySize={arraySize}
                setArraySize={setArraySize}
                speed={speed}
                setSpeed={setSpeed}
                isSorting={isSorting}
                isPaused={isPaused}
                getAlgorithmTimeComplexity={getAlgorithmTimeComplexity}
                array={array}
                currentBar={currentBar}
                currentTestingAlgo={currentTestingAlgo}
                isStopped={isStopped}
                generateNewArray={generateNewArray}
                startSorting={startSorting}
                pauseSorting={pauseSorting}
                resumeSorting={resumeSorting}
                audio={audio}
              />
            </TabsContent>

            <TabsContent
              value="metrics"
              className="space-y-4 mt-4 min-h-[500px]"
            >
              <MetricsPanel
                metrics={metrics}
                sortedMetrics={sortedMetrics}
                isSorting={isSorting}
                currentTestingAlgo={currentTestingAlgo}
                testAllAlgorithms={testAllAlgorithms}
                stopSorting={stopTestAllSorting}
                algorithm={algorithm}
                array={array}
                currentBar={currentBar}
                isStopped={isStopped}
              />
            </TabsContent>

            <TabsContent
              value="details"
              className="space-y-4 mt-4 min-h-[500px]"
            >
              <DetailsPanel
                algorithm={algorithm}
                array={array}
                currentBar={currentBar}
                isSorting={isSorting}
                isPaused={isPaused}
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
});

export default SortingVisualizer;
