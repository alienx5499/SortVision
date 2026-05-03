import { useCallback } from 'react';
import type { AppNavigate } from '@/lib/navigation/useAppNavigate';
import {
  INTERNAL_TO_TAB,
  resolveContributionSectionFromTab,
} from '@/config/routes';

type Params = {
  specialMode: 'contributors' | null;
  currentAlgorithm: string;
  locationSearch: string;
  getLocalizedUrl: (path: string) => string;
  navigate: AppNavigate;
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
