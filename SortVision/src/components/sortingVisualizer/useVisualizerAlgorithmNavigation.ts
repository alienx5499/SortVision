import { useCallback, useEffect } from 'react';
import type { AppNavigate } from '@/lib/navigation/useAppNavigate';
import type { Dispatch, SetStateAction } from 'react';
import {
  normalizeSortingAlgorithmId,
  type SortingAlgorithmId,
} from './algorithmRegistry';

type Params = {
  initialAlgorithm: string;
  algorithm: SortingAlgorithmId;
  setAlgorithm: Dispatch<SetStateAction<SortingAlgorithmId>>;
  navigate: AppNavigate;
  getLocalizedUrl: (path: string) => string;
};

export function useVisualizerAlgorithmNavigation({
  initialAlgorithm,
  algorithm,
  setAlgorithm,
  navigate,
  getLocalizedUrl,
}: Params) {
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const next = normalizeSortingAlgorithmId(initialAlgorithm);
      setAlgorithm(prev => (prev === next ? prev : next));
    });
    return () => window.cancelAnimationFrame(frame);
  }, [initialAlgorithm, setAlgorithm]);

  const handleAlgorithmChange = useCallback(
    (newAlgorithm: SortingAlgorithmId) => {
      setAlgorithm(newAlgorithm);
      const initial = normalizeSortingAlgorithmId(initialAlgorithm);
      if (newAlgorithm === initial) return;

      const currentPath = window.location.pathname;
      const currentParams = new URLSearchParams(window.location.search);
      let currentTab = 'config';
      if (currentPath.includes('/details/')) currentTab = 'details';
      else if (currentPath.includes('/metrics/')) currentTab = 'metrics';

      const newSearch = currentParams.toString();
      const basePath = `algorithms/${currentTab}/${newAlgorithm}`;
      const newUrl =
        getLocalizedUrl(basePath) + (newSearch ? `?${newSearch}` : '');
      navigate(newUrl, { replace: true });
    },
    [getLocalizedUrl, initialAlgorithm, navigate, setAlgorithm]
  );

  return { handleAlgorithmChange };
}
