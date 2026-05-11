import { useCallback, useEffect, useRef } from 'react';
import { useAudio } from '@/hooks/audio';
import { useAlgorithmState } from '@/context/algorithm-state';
import { useLanguage } from '@/context/language';
import { usePerformanceMetrics } from '../usePerformanceMetrics';
import { useSortingState } from './useSortingState';
import { useSortingActions } from './useSortingActions';
import { useVisualizerRouteSync } from './useVisualizerRouteSync';
import { useVisualizerContextBridge } from './useVisualizerContextBridge';
import { useVisualizerAudioEffects } from './useVisualizerAudioEffects';
import { useVisualizerMetricsState } from './useVisualizerMetricsState';
import { useSortingRunner } from './useSortingRunner';

export const useSortingVisualizerController = (initialAlgorithm: string) => {
  const audio = useAudio();
  const { t } = useLanguage();
  const {
    setAlgorithmName,
    setArray: setContextArray,
    setStep,
  } = useAlgorithmState();

  // State hook
  const state = useSortingState(initialAlgorithm);

  // Metrics state
  const {
    metrics,
    sortedMetrics,
    currentTestingAlgo,
    compareMetrics,
    setMetrics,
    setSortedMetrics,
    setCurrentTestingAlgo,
    setCompareMetrics,
  } = useVisualizerMetricsState();

  // Refs
  const shouldStopRef = useRef(false);
  /** Pause without aborting the in-flight algorithm (honored inside {@link delayStep}). */
  const sortPausedRef = useRef(false);
  /** Set when the user stops benchmark "test all" so the original array can be restored. */
  const sortUserCancelRequestedRef = useRef(false);
  /** Bumped on reset / array-size changes so stale async sort completions cannot apply stale metrics. */
  const sortVisualizerSessionRef = useRef(0);
  const performanceMetrics = usePerformanceMetrics();
  const { playAccessSound } = useVisualizerAudioEffects(audio);

  const { handleAlgorithmChange, nextAlgorithm, prevAlgorithm } =
    useVisualizerRouteSync({
      algorithm: state.algorithm,
      setAlgorithm: state.setAlgorithm,
    });

  const {
    stopSorting: abortSortingRunner,
    startSorting,
    testAllAlgorithms,
  } = useSortingRunner({
    runtime: {
      algorithm: state.algorithm,
      array: state.array,
      speed: state.speed,
      shouldStopRef,
      sortPausedRef,
      sortUserCancelRequestedRef,
      sortVisualizerSessionRef,
      audio,
    },
    uiState: {
      setArray: state.setArray,
      setCurrentBar: state.setCurrentBar,
      setIsStopped: state.setIsStopped,
      setIsSorting: state.setIsSorting,
      setIsPaused: state.setIsPaused,
    },
    metricsState: {
      setMetrics,
      setCurrentTestingAlgo,
      setCompareMetrics,
      setSortedMetrics,
    },
  });

  useVisualizerContextBridge({
    algorithm: state.algorithm,
    array: state.array,
    currentBar: state.currentBar,
    setAlgorithmName,
    setArray: setContextArray,
    setStep,
  });

  // Abort function used by actions hook
  const abortActiveVisualization = useCallback(() => {
    sortPausedRef.current = false;
    state.setIsPaused(false);
    sortUserCancelRequestedRef.current = false;
    abortSortingRunner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abortSortingRunner, state.setIsPaused]);

  // Actions hook
  const actions = useSortingActions({
    ...state,
    abortSortingRunner,
    playAccessSound,
    sortVisualizerSessionRef,
    sortPausedRef,
    sortUserCancelRequestedRef,
    startSorting,
    currentTestingAlgo,
    abortActiveVisualization,
  });

  const getAlgorithmTimeComplexity = useCallback(
    () => performanceMetrics.getAlgorithmTimeComplexity(state.algorithm),
    [performanceMetrics, state.algorithm]
  );

  // Sync generateNewArray ref on arraySize change
  useEffect(() => {
    sortVisualizerSessionRef.current += 1;
    sortPausedRef.current = false;
    queueMicrotask(() => {
      state.setIsPaused(false);
    });
    actions.generateNewArrayRef.current();
    return () => {
      shouldStopRef.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.arraySize]);

  return {
    t,
    audio,
    state: {
      array: state.array,
      algorithm: state.algorithm,
      arraySize: state.arraySize,
      isSorting: state.isSorting,
      isPaused: state.isPaused,
      isStopped: state.isStopped,
      speed: state.speed,
      currentBar: state.currentBar,
      metrics,
      compareMetrics,
      sortedMetrics,
      currentTestingAlgo,
    },
    actions: {
      playPause: actions.playPause,
      resetVisualization: actions.resetVisualization,
      shuffleArray: actions.shuffleArray,
      increaseSpeed: actions.increaseSpeed,
      decreaseSpeed: actions.decreaseSpeed,
      nextAlgorithm,
      prevAlgorithm,
      generateNewArray: actions.generateNewArray,
      pauseSorting: actions.pauseSorting,
      resumeSorting: actions.resumeSorting,
      stopTestAllSorting: actions.stopTestAllSorting,
      startSorting,
      testAllAlgorithms,
      handleAlgorithmChange,
      setArraySize: state.setArraySize,
      setSpeed: state.setSpeed,
      getAlgorithmTimeComplexity,
    },
  };
};
