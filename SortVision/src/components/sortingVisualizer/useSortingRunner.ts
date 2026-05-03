import { useCallback } from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import type { UseAudioReturn } from '@/hooks/audio';
import useSortingControls, {
  type CompareMetricsMap,
  type SortMetrics,
} from './SortingControls';
import type { SortingAlgorithmId } from './algorithmRegistry';
import type { VisualizerBarHighlight } from './visualizerBarState';
import type { RankedMetrics } from './visualizerMetricsTypes';

type Params = {
  runtime: {
    algorithm: SortingAlgorithmId;
    array: number[];
    speed: number;
    shouldStopRef: MutableRefObject<boolean>;
    audio: UseAudioReturn;
  };
  uiState: {
    setArray: Dispatch<SetStateAction<number[]>>;
    setCurrentBar: Dispatch<SetStateAction<VisualizerBarHighlight>>;
    setIsStopped: Dispatch<SetStateAction<boolean>>;
    setIsSorting: Dispatch<SetStateAction<boolean>>;
  };
  metricsState: {
    setMetrics: Dispatch<SetStateAction<SortMetrics>>;
    setCurrentTestingAlgo: Dispatch<SetStateAction<SortingAlgorithmId | null>>;
    setCompareMetrics: Dispatch<SetStateAction<CompareMetricsMap>>;
    setSortedMetrics: Dispatch<SetStateAction<RankedMetrics[]>>;
  };
};

export function useSortingRunner({ runtime, uiState, metricsState }: Params) {
  const sortingControls = useSortingControls();

  const stopSorting = useCallback(() => {
    sortingControls.stopSorting(
      runtime.shouldStopRef,
      uiState.setIsStopped,
      uiState.setIsSorting
    );
  }, [
    runtime.shouldStopRef,
    sortingControls,
    uiState.setIsSorting,
    uiState.setIsStopped,
  ]);

  const startSorting = useCallback(async () => {
    await sortingControls.startSorting(
      runtime.algorithm,
      runtime.array,
      uiState.setArray,
      runtime.speed,
      uiState.setCurrentBar,
      runtime.shouldStopRef,
      uiState.setIsStopped,
      uiState.setIsSorting,
      metricsState.setMetrics,
      runtime.audio
    );
  }, [
    metricsState.setMetrics,
    runtime.algorithm,
    runtime.array,
    runtime.audio,
    runtime.shouldStopRef,
    runtime.speed,
    sortingControls,
    uiState.setArray,
    uiState.setCurrentBar,
    uiState.setIsSorting,
    uiState.setIsStopped,
  ]);

  const testAllAlgorithms = useCallback(async () => {
    await sortingControls.testAllAlgorithms(
      runtime.array,
      uiState.setArray,
      runtime.speed,
      uiState.setCurrentBar,
      runtime.shouldStopRef,
      uiState.setIsStopped,
      uiState.setIsSorting,
      metricsState.setCurrentTestingAlgo,
      metricsState.setCompareMetrics,
      metricsState.setSortedMetrics,
      runtime.audio
    );
  }, [
    metricsState.setCompareMetrics,
    metricsState.setCurrentTestingAlgo,
    metricsState.setSortedMetrics,
    runtime.array,
    runtime.audio,
    runtime.shouldStopRef,
    runtime.speed,
    sortingControls,
    uiState.setArray,
    uiState.setCurrentBar,
    uiState.setIsSorting,
    uiState.setIsStopped,
  ]);

  return {
    stopSorting,
    startSorting,
    testAllAlgorithms,
  };
}
