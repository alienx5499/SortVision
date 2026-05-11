import { useCallback, useLayoutEffect, useRef } from 'react';
import { shuffleInPlace } from '@/utils/shuffleInPlace';
import type { SortingAlgorithmId } from '../algorithmRegistry';
import type { SortingState } from './useSortingState';

export type SortingActionsParams = SortingState & {
  abortSortingRunner: () => void;
  playAccessSound: () => void;
  sortVisualizerSessionRef: { current: number };
  sortPausedRef: { current: boolean };
  sortUserCancelRequestedRef: { current: boolean };
  startSorting: () => void;
  currentTestingAlgo: SortingAlgorithmId | null;
  abortActiveVisualization: () => void;
};

export const useSortingActions = (params: SortingActionsParams) => {
  const {
    array,
    setArray,
    arraySize,
    isSorting,
    setIsSorting,
    isPaused,
    setIsPaused,
    setCurrentBar,
    setIsStopped,
    setSpeed,
    currentTestingAlgo,
    abortSortingRunner,
    playAccessSound,
    sortVisualizerSessionRef,
    sortPausedRef,
    sortUserCancelRequestedRef,
    startSorting,
    abortActiveVisualization,
  } = params;

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
    setArray,
    setCurrentBar,
    setIsStopped,
    sortVisualizerSessionRef,
  ]);

  const pauseSorting = useCallback(() => {
    if (!isSorting || isPaused || currentTestingAlgo) return;
    sortPausedRef.current = true;
    setIsPaused(true);
    playAccessSound();
  }, [
    currentTestingAlgo,
    isPaused,
    isSorting,
    playAccessSound,
    setIsPaused,
    sortPausedRef,
  ]);

  const resumeSorting = useCallback(() => {
    if (!isPaused) return;
    sortPausedRef.current = false;
    setIsPaused(false);
    playAccessSound();
  }, [isPaused, playAccessSound, setIsPaused, sortPausedRef]);

  const stopTestAllSorting = useCallback(() => {
    sortUserCancelRequestedRef.current = true;
    abortSortingRunner();
    playAccessSound();
  }, [abortSortingRunner, playAccessSound, sortUserCancelRequestedRef]);

  const shuffleArray = useCallback(() => {
    setArray(prev => {
      shuffleInPlace(prev);
      return [...prev];
    });
    playAccessSound();
  }, [playAccessSound, setArray]);

  const playPause = useCallback(() => {
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
  }, [
    currentTestingAlgo,
    isPaused,
    isSorting,
    pauseSorting,
    resumeSorting,
    startSorting,
  ]);

  const resetVisualization = useCallback(() => {
    sortVisualizerSessionRef.current += 1;
    abortActiveVisualization();
    generateNewArray();
  }, [abortActiveVisualization, generateNewArray, sortVisualizerSessionRef]);

  const generateNewArrayRef = useRef(generateNewArray);
  useLayoutEffect(() => {
    generateNewArrayRef.current = generateNewArray;
  }, [generateNewArray]);

  return {
    abortActiveVisualization,
    generateNewArray,
    pauseSorting,
    resumeSorting,
    stopTestAllSorting,
    shuffleArray,
    playPause,
    resetVisualization,
    increaseSpeed: () => setSpeed(s => Math.max(1, s - 10)),
    decreaseSpeed: () => setSpeed(s => s + 10),
    generateNewArrayRef,
  };
};

export type SortingActions = ReturnType<typeof useSortingActions>;
