import { useCallback } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import {
  INTERNAL_TO_TAB,
  resolveContributionSectionFromTab,
} from '@/config/routes';

type Params = {
  specialMode: 'contributors' | null;
  currentAlgorithm: string;
  locationSearch: string;
  getLocalizedUrl: (path: string) => string;
  navigate: NavigateFunction;
};

export function useMainTabNavigation({
  specialMode,
  currentAlgorithm,
  locationSearch,
  getLocalizedUrl,
  navigate,
}: Params) {
  return useCallback(
    (newTab: string) => {
      if (specialMode === 'contributors') {
        const section = resolveContributionSectionFromTab(newTab);
        const newUrl = getLocalizedUrl(`contributions/${section}`);
        navigate(newUrl, { replace: true });
        return;
      }

      const pathSegment = INTERNAL_TO_TAB[newTab] || 'config';
      const currentParams = new URLSearchParams(locationSearch);
      const basePath = `algorithms/${pathSegment}/${currentAlgorithm}`;
      const newUrl =
        getLocalizedUrl(basePath) +
        (currentParams.toString() ? `?${currentParams.toString()}` : '');
      navigate(newUrl, { replace: true });
    },
    [specialMode, currentAlgorithm, locationSearch, getLocalizedUrl, navigate]
  );
}
