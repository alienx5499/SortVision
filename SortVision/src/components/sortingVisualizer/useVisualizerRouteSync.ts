import { useMemo } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { AppNavigate } from '@/lib/navigation/useAppNavigate';
import {
  SORTING_ALGORITHMS,
  type SortingAlgorithmId,
} from './algorithmRegistry';
import { useVisualizerAlgorithmNavigation } from './useVisualizerAlgorithmNavigation';

type Params = {
  initialAlgorithm: string;
  algorithm: SortingAlgorithmId;
  setAlgorithm: Dispatch<SetStateAction<SortingAlgorithmId>>;
  navigate: AppNavigate;
  getLocalizedUrl: (path: string) => string;
};

export function useVisualizerRouteSync({
  initialAlgorithm,
  algorithm,
  setAlgorithm,
  navigate,
  getLocalizedUrl,
}: Params) {
  const { handleAlgorithmChange } = useVisualizerAlgorithmNavigation({
    initialAlgorithm,
    algorithm,
    setAlgorithm,
    navigate,
    getLocalizedUrl,
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
