import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import type { UseAudioReturn } from '@/hooks/audio';
import type { CurrentBarState } from '@/algorithms/types';
import {
  SORTING_ALGORITHM_REGISTRY,
  SORTING_ALGORITHMS,
} from './algorithmRegistry';

type AlgorithmId = keyof typeof SORTING_ALGORITHM_REGISTRY;

export type SortMetrics = {
  swaps: number;
  comparisons: number;
  time: string | number;
};

export type CompareMetricsMap = Record<string, SortMetrics>;

type SortingAudio = UseAudioReturn;

const runAlgorithm = async ({
  algorithm,
  inputArray,
  setArray,
  speed,
  setCurrentBar,
  shouldStopRef,
  audio,
}: {
  algorithm: string;
  inputArray: number[];
  setArray: Dispatch<SetStateAction<number[]>>;
  speed: number;
  setCurrentBar: Dispatch<SetStateAction<CurrentBarState>>;
  shouldStopRef: MutableRefObject<boolean>;
  audio: SortingAudio;
}) => {
  const runner = SORTING_ALGORITHM_REGISTRY[algorithm as AlgorithmId];
  if (!runner) {
    throw new Error(`Unsupported algorithm: ${algorithm}`);
  }

  return runner(
    inputArray,
    setArray,
    speed,
    setCurrentBar,
    shouldStopRef,
    audio
  );
};

const useSortingControls = () => {
  const generateNewArray = (
    arraySize: number,
    setArray: Dispatch<SetStateAction<number[]>>,
    setCurrentBar: Dispatch<SetStateAction<CurrentBarState>>
  ) => {
    const newArray = Array.from(
      { length: arraySize },
      () => Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
    setCurrentBar({ compare: null, swap: null });
  };

  const stopSorting = (
    shouldStopRef: MutableRefObject<boolean>,
    setIsStopped: Dispatch<SetStateAction<boolean>>,
    setIsSorting: Dispatch<SetStateAction<boolean>>
  ) => {
    shouldStopRef.current = true;
    setIsStopped(true);
    setIsSorting(false);
  };

  const startSorting = async (
    algorithm: string,
    array: number[],
    setArray: Dispatch<SetStateAction<number[]>>,
    speed: number,
    setCurrentBar: Dispatch<SetStateAction<CurrentBarState>>,
    shouldStopRef: MutableRefObject<boolean>,
    setIsStopped: Dispatch<SetStateAction<boolean>>,
    setIsSorting: Dispatch<SetStateAction<boolean>>,
    setMetrics: Dispatch<SetStateAction<SortMetrics>>,
    audio: SortingAudio
  ) => {
    shouldStopRef.current = false;
    setIsStopped(false);
    setIsSorting(true);
    const startTime = performance.now();

    let metrics: { swaps?: number; comparisons?: number } | undefined;
    try {
      metrics = await runAlgorithm({
        algorithm,
        inputArray: array,
        setArray,
        speed,
        setCurrentBar,
        shouldStopRef,
        audio,
      });
    } catch (error) {
      console.log('Sorting was stopped:', error);
      setIsSorting(false);
      setIsStopped(true);
      return;
    }

    const endTime = performance.now();
    setMetrics({
      swaps: metrics?.swaps || 0,
      comparisons: metrics?.comparisons || 0,
      time: (endTime - startTime).toFixed(2),
    });

    setIsSorting(false);
  };

  const testAllAlgorithms = async (
    array: number[],
    setArray: Dispatch<SetStateAction<number[]>>,
    speed: number,
    setCurrentBar: Dispatch<SetStateAction<CurrentBarState>>,
    shouldStopRef: MutableRefObject<boolean>,
    setIsStopped: Dispatch<SetStateAction<boolean>>,
    setIsSorting: Dispatch<SetStateAction<boolean>>,
    setCurrentTestingAlgo: Dispatch<SetStateAction<AlgorithmId | null>>,
    setCompareMetrics: Dispatch<SetStateAction<CompareMetricsMap>>,
    setSortedMetrics: Dispatch<
      SetStateAction<{ algo: string; metrics: SortMetrics; rank: number }[]>
    >,
    audio: SortingAudio
  ) => {
    setIsSorting(true);
    shouldStopRef.current = false;
    setIsStopped(false);

    const results: CompareMetricsMap = {};
    const originalArray = [...array];
    for (const algo of SORTING_ALGORITHMS) {
      if (shouldStopRef.current) break;
      setCurrentTestingAlgo(algo);
      setArray([...originalArray]);
      const startTime = performance.now();

      let metrics: { swaps?: number; comparisons?: number } | undefined;
      try {
        metrics = await runAlgorithm({
          algorithm: algo,
          inputArray: [...originalArray],
          setArray,
          speed,
          setCurrentBar,
          shouldStopRef,
          audio,
        });

        const endTime = performance.now();
        results[algo] = {
          swaps: metrics?.swaps || 0,
          comparisons: metrics?.comparisons || 0,
          time: (endTime - startTime).toFixed(2),
        };
      } catch (error) {
        console.log(`Error testing ${algo}:`, error);
      }
    }

    setCurrentTestingAlgo(null);
    setCompareMetrics(results);
    const sortedResults = Object.entries(results)
      .sort(
        ([, a], [, b]) =>
          Number.parseFloat(String(a.time)) - Number.parseFloat(String(b.time))
      )
      .map(([algo, metrics], index) => ({
        algo,
        metrics,
        rank: index + 1,
      }));

    setSortedMetrics(sortedResults);
    setIsSorting(false);
  };

  return {
    generateNewArray,
    stopSorting,
    startSorting,
    testAllAlgorithms,
  };
};

export default useSortingControls;
