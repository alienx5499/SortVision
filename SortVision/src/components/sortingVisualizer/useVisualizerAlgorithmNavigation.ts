import { useCallback } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { SortingAlgorithmId } from './algorithmRegistry';

type Params = {
  algorithm: SortingAlgorithmId;
  setAlgorithm: Dispatch<SetStateAction<SortingAlgorithmId>>;
};

export function useVisualizerAlgorithmNavigation({
  algorithm,
  setAlgorithm,
}: Params) {
  const handleAlgorithmChange = useCallback(
    (newAlgorithm: SortingAlgorithmId) => {
      setAlgorithm(newAlgorithm);
    },
    [setAlgorithm]
  );

  return { handleAlgorithmChange };
}
