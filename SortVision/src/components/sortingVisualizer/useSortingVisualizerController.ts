import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useAppNavigate } from '@/lib/navigation/useAppNavigate';
import { useAudio } from '@/hooks/audio';
import { useAlgorithmState } from '@/context/algorithm-state';
import { useLanguage } from '@/context/language';
import { usePerformanceMetrics } from './usePerformanceMetrics';
import {
  normalizeSortingAlgorithmId,
  type SortingAlgorithmId,
} from './algorithmRegistry';
import { shuffleInPlace } from '@/utils/shuffleInPlace';
import { useVisualizerContextBridge } from './useVisualizerContextBridge';
import { useVisualizerRouteSync } from './useVisualizerRouteSync';
import { useVisualizerAudioEffects } from './useVisualizerAudioEffects';
import { useVisualizerMetricsState } from './useVisualizerMetricsState';
import { useSortingRunner } from './useSortingRunner';
import type { VisualizerBarHighlight } from './visualizerBarState';

export const useSortingVisualizerController = (initialAlgorithm: string) => {
  const navigate = useAppNavigate();
  const audio = useAudio();
  const { t, getLocalizedUrl } = useLanguage();
  const {
    setAlgorithmName,
    setArray: setContextArray,
    setStep,
  } = useAlgorithmState();

  const [array, setArray] = useState<number[]>([]);
  const [algorithm, setAlgorithm] = useState<SortingAlgorithmId>(() =>
    normalizeSortingAlgorithmId(initialAlgorithm)
  );
  const [arraySize, setArraySize] = useState(30);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [currentBar, setCurrentBar] = useState<VisualizerBarHighlight>({
    compare: null,
    swap: null,
  });
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
      algorithm,
      setAlgorithm,
    });

  const {
    stopSorting: abortSortingRunner,
    startSorting,
    testAllAlgorithms,
  } = useSortingRunner({
    runtime: {
      algorithm,
      array,
      speed,
      shouldStopRef,
      sortPausedRef,
      sortUserCancelRequestedRef,
      sortVisualizerSessionRef,
      audio,
    },
    uiState: {
      setArray,
      setCurrentBar,
      setIsStopped,
      setIsSorting,
      setIsPaused,
    },
    metricsState: {
      setMetrics,
      setCurrentTestingAlgo,
      setCompareMetrics,
      setSortedMetrics,
    },
  });

  useVisualizerContextBridge({
    algorithm,
    array,
    currentBar,
    setAlgorithmName,
    setArray: setContextArray,
    setStep,
  });

  /** Hard-abort: cooperative exit via {@link shouldStopRef} (reset, array size, benchmark stop). */
  const abortActiveVisualization = useCallback(() => {
    sortPausedRef.current = false;
    setIsPaused(false);
    sortUserCancelRequestedRef.current = false;
    abortSortingRunner();
  }, [abortSortingRunner]);

  const generateNewArray = useCallback(() => {
    if (isSorting && isPaused && !currentTestingAlgo) {
      sortVisualizerSessionRef.current += 1;
      abortActiveVisualization();
    }
    const newArray = Array.from(
      { length: arraySize },
      () => Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
    setCurrentBar({ compare: null, swap: null });
    setIsStopped(false);
    playAccessSound();
  }, [
    abortActiveVisualization,
    arraySize,
    currentTestingAlgo,
    isPaused,
    isSorting,
    playAccessSound,
  ]);

  const pauseSorting = useCallback(() => {
    if (!isSorting || isPaused || currentTestingAlgo) return;
    sortPausedRef.current = true;
    setIsPaused(true);
    playAccessSound();
  }, [currentTestingAlgo, isPaused, isSorting, playAccessSound]);

  const resumeSorting = useCallback(() => {
    if (!isPaused) return;
    sortPausedRef.current = false;
    setIsPaused(false);
    playAccessSound();
  }, [isPaused, playAccessSound]);

  const stopTestAllSorting = useCallback(() => {
    sortUserCancelRequestedRef.current = true;
    abortSortingRunner();
    playAccessSound();
  }, [abortSortingRunner, playAccessSound]);

  const shuffleArray = () => {
    setArray(prev => {
      const copy = [...prev];
      shuffleInPlace(copy);
      return copy;
    });
    playAccessSound();
  };

  const playPause = () => {
    if (currentTestingAlgo) return;
    if (isPaused) {
      resumeSorting();
      return;
    }
    if (isSorting) {
      pauseSorting();
      return;
    }
    startSorting();
  };

  const resetVisualization = () => {
    sortVisualizerSessionRef.current += 1;
    abortActiveVisualization();
    generateNewArray();
  };

  const increaseSpeed = () => setSpeed(s => Math.max(1, s - 10));
  const decreaseSpeed = () => setSpeed(s => s + 10);

  const getAlgorithmTimeComplexity = () =>
    performanceMetrics.getAlgorithmTimeComplexity(algorithm);

  const generateNewArrayRef = useRef(generateNewArray);

  useLayoutEffect(() => {
    generateNewArrayRef.current = generateNewArray;
  }, [generateNewArray]);

  useEffect(() => {
    sortVisualizerSessionRef.current += 1;
    sortPausedRef.current = false;
    queueMicrotask(() => {
      setIsPaused(false);
    });
    generateNewArrayRef.current();
    return () => {
      shouldStopRef.current = true;
    };
  }, [arraySize]);

  return {
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
      compareMetrics,
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
  };
};
