import { useMemo } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import {
  SORTING_ALGORITHMS,
  type SortingAlgorithmId,
} from '../algorithmRegistry';
import { useVisualizerAlgorithmNavigation } from './useSortingNavigation';

type Params = {
  algorithm: SortingAlgorithmId;
  setAlgorithm: Dispatch<SetStateAction<SortingAlgorithmId>>;
};

export function useVisualizerRouteSync({ algorithm, setAlgorithm }: Params) {
  const { handleAlgorithmChange } = useVisualizerAlgorithmNavigation({
    algorithm,
    setAlgorithm,
  });

  const currentAlgoIdx = useMemo(
    () => Math.max(0, SORTING_ALGORITHMS.indexOf(algorithm)),
    [algorithm]
  );

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

  return {
    handleAlgorithmChange,
    nextAlgorithm,
    prevAlgorithm,
  };
}
