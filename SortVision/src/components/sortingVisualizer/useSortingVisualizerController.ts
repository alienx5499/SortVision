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
  const performanceMetrics = usePerformanceMetrics();
  const { playAccessSound } = useVisualizerAudioEffects(audio);

  const { handleAlgorithmChange, nextAlgorithm, prevAlgorithm } =
    useVisualizerRouteSync({
      initialAlgorithm,
      algorithm,
      setAlgorithm,
      navigate,
      getLocalizedUrl,
    });

  const {
    stopSorting: stopSortingRunner,
    startSorting,
    testAllAlgorithms,
  } = useSortingRunner({
    runtime: {
      algorithm,
      array,
      speed,
      shouldStopRef,
      audio,
    },
    uiState: {
      setArray,
      setCurrentBar,
      setIsStopped,
      setIsSorting,
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

  const generateNewArray = useCallback(() => {
    const newArray = Array.from(
      { length: arraySize },
      () => Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
    setCurrentBar({ compare: null, swap: null });
    playAccessSound();
  }, [arraySize, playAccessSound]);

  const stopSorting = () => {
    stopSortingRunner();
    playAccessSound();
  };

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
    if (isSorting) stopSorting();
    else startSorting();
  };

  const resetVisualization = () => {
    stopSorting();
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
      stopSorting,
      startSorting,
      testAllAlgorithms,
      handleAlgorithmChange,
      setArraySize,
      setSpeed,
      getAlgorithmTimeComplexity,
    },
  };
};
