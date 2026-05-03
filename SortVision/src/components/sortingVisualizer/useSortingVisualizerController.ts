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
import useSortingControls, {
  type CompareMetricsMap,
  type SortMetrics,
} from './SortingControls';
import { usePerformanceMetrics } from './usePerformanceMetrics';
import {
  SORTING_ALGORITHMS,
  normalizeSortingAlgorithmId,
  type SortingAlgorithmId,
} from './algorithmRegistry';
import { shuffleInPlace } from '@/utils/shuffleInPlace';
import { useVisualizerContextBridge } from './useVisualizerContextBridge';
import { useVisualizerAlgorithmNavigation } from './useVisualizerAlgorithmNavigation';
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
  const [metrics, setMetrics] = useState({
    swaps: 0,
    comparisons: 0,
    time: 0 as number | string,
  });
  const [sortedMetrics, setSortedMetrics] = useState<
    {
      algo: string;
      metrics: SortMetrics;
      rank: number;
    }[]
  >([]);
  const [currentTestingAlgo, setCurrentTestingAlgo] =
    useState<SortingAlgorithmId | null>(null);
  const [, setCompareMetrics] = useState<CompareMetricsMap>({});

  const shouldStopRef = useRef(false);
  const sortStartTimeRef = useRef<number | null>(null);

  const sortingControls = useSortingControls();
  const performanceMetrics = usePerformanceMetrics();

  const { handleAlgorithmChange } = useVisualizerAlgorithmNavigation({
    initialAlgorithm,
    algorithm,
    setAlgorithm,
    navigate,
    getLocalizedUrl,
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
    audio.playAccessSound();
  }, [arraySize, audio]);

  const stopSorting = () => {
    sortingControls.stopSorting(shouldStopRef, setIsStopped, setIsSorting);
    audio.playAccessSound();
  };

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
      audio
    );
  };

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
      audio
    );
  };

  const shuffleArray = () => {
    setArray(prev => {
      const copy = [...prev];
      shuffleInPlace(copy);
      return copy;
    });
    audio.playAccessSound();
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
  const currentAlgoIdx = Math.max(0, SORTING_ALGORITHMS.indexOf(algorithm));
  const nextAlgorithm = () =>
    handleAlgorithmChange(
      SORTING_ALGORITHMS[(currentAlgoIdx + 1) % SORTING_ALGORITHMS.length]
    );
  const prevAlgorithm = () =>
    handleAlgorithmChange(
      SORTING_ALGORITHMS[
        (currentAlgoIdx - 1 + SORTING_ALGORITHMS.length) %
          SORTING_ALGORITHMS.length
      ]
    );

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
