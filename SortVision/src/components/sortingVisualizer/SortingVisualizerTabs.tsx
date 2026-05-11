import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ConfigPanel,
  MetricsPanel,
  DetailsPanel,
  ContributionPanel,
} from '../panels';
import type {
  SortingVisualizerHandle,
  SortingVisualizerProps,
} from './SortingVisualizer';
import type { SortingAlgorithmId } from './algorithmRegistry';
import type { VisualizerBarHighlight } from './visualizerBarState';
import type { ConfigPanelAudio } from '../panels/config';
import type { AlgorithmComplexityProfile } from './usePerformanceMetrics';
import type {
  SortRunMetrics,
  SortedMetricListEntry,
} from '../panels/metrics/metricsPanelContracts';
import type { useLanguage } from '@/context/language';

interface SortingVisualizerTabsProps extends Omit<
  SortingVisualizerProps,
  'initialAlgorithm'
> {
  t: (...args: Parameters<ReturnType<typeof useLanguage>['t']>) => string;
  audio: ConfigPanelAudio;
  algorithm: SortingAlgorithmId;
  array: number[];
  arraySize: number;
  isSorting: boolean;
  isPaused: boolean;
  isStopped: boolean;
  speed: number;
  currentBar: VisualizerBarHighlight;
  handleAlgorithmChange: (algorithm: SortingAlgorithmId) => void;
  setArraySize: (size: number) => void;
  setSpeed: (speed: number) => void;
  getAlgorithmTimeComplexity: () => AlgorithmComplexityProfile | undefined;
  generateNewArray: () => void;
  startSorting: () => void;
  pauseSorting: () => void;
  resumeSorting: () => void;
  metrics: SortRunMetrics;
  sortedMetrics: SortedMetricListEntry[];
  currentTestingAlgo: SortingAlgorithmId | null;
  testAllAlgorithms: () => void;
  stopTestAllSorting: () => void;
}

export function SortingVisualizerTabs({
  t,
  audio,
  algorithm,
  array,
  arraySize,
  isSorting,
  isPaused,
  isStopped,
  speed,
  currentBar,
  activeTab,
  onTabChange,
  handleAlgorithmChange,
  setArraySize,
  setSpeed,
  getAlgorithmTimeComplexity,
  generateNewArray,
  startSorting,
  pauseSorting,
  resumeSorting,
  metrics,
  sortedMetrics,
  currentTestingAlgo,
  testAllAlgorithms,
  stopTestAllSorting,
  specialMode,
}: SortingVisualizerTabsProps) {
  if (specialMode === 'contributors') {
    return (
      <div className="w-full space-y-4 min-h-[500px]">
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
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
            value={activeTab ?? 'overview'}
            className="space-y-4 mt-4 min-h-[500px]"
          >
            <ContributionPanel
              activeTab={activeTab}
              onTabChange={onTabChange}
            />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
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

      <TabsContent value="controls" className="space-y-4 mt-4 min-h-[500px]">
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

      <TabsContent value="metrics" className="space-y-4 mt-4 min-h-[500px]">
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

      <TabsContent value="details" className="space-y-4 mt-4 min-h-[500px]">
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
  );
}
