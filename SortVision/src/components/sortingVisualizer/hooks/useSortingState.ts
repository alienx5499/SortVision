import { useState } from 'react';
import {
  normalizeSortingAlgorithmId,
  type SortingAlgorithmId,
} from '../algorithmRegistry';
import type { VisualizerBarHighlight } from '../visualizerBarState';

export const useSortingState = (initialAlgorithm: string) => {
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

  return {
    array,
    setArray,
    algorithm,
    setAlgorithm,
    arraySize,
    setArraySize,
    isSorting,
    setIsSorting,
    isPaused,
    setIsPaused,
    isStopped,
    setIsStopped,
    speed,
    setSpeed,
    currentBar,
    setCurrentBar,
  };
};

export type SortingState = ReturnType<typeof useSortingState>;
