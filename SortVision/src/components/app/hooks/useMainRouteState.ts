import { useMemo } from 'react';
import { SORTING_ALGORITHM_REGISTRY } from '@/components/sortingVisualizer/algorithmRegistry';
import { stripLanguagePrefix } from '@/config/i18n';
import {
  ALGORITHMS_BASE_PATH,
  CONTRIBUTION_BASE_PATH,
  INTERNAL_TO_TAB,
  TAB_TO_INTERNAL,
  isAlgorithmTab,
  isContributionSection,
  toPathParts,
} from '@/config/routes';

export type MainRouteState = {
  activeTab: string;
  specialMode: 'contributors' | null;
  currentAlgorithm: string;
  pathTab: string;
};

export const useMainRouteState = ({
  pathname,
  algorithmName,
}: {
  pathname: string;
  algorithmName?: string;
}): MainRouteState => {
  const pathParts = useMemo(() => toPathParts(pathname), [pathname]);
  const { parts: pathWithoutLanguage } = useMemo(
    () => stripLanguagePrefix(pathParts),
    [pathParts]
  );

  const isAlgorithmPath = pathWithoutLanguage[0] === ALGORITHMS_BASE_PATH;
  const isContributionPath = pathWithoutLanguage[0] === CONTRIBUTION_BASE_PATH;

  const tabFromPath =
    isAlgorithmPath && pathWithoutLanguage.length >= 3
      ? pathWithoutLanguage[1]
      : null;
  const contributionSection =
    isContributionPath && pathWithoutLanguage.length >= 2
      ? pathWithoutLanguage[1]
      : null;
  const algorithmFromPath =
    isAlgorithmPath && pathWithoutLanguage.length >= 2
      ? pathWithoutLanguage[pathWithoutLanguage.length - 1]
      : algorithmName;

  const { activeTab, specialMode } = useMemo((): Pick<
    MainRouteState,
    'activeTab' | 'specialMode'
  > => {
    if (isContributionPath) {
      if (isContributionSection(contributionSection)) {
        return {
          activeTab: contributionSection,
          specialMode: 'contributors',
        };
      } else {
        return {
          activeTab: 'overview',
          specialMode: 'contributors',
        };
      }
    }

    if (isAlgorithmTab(tabFromPath)) {
      return {
        activeTab: TAB_TO_INTERNAL[tabFromPath] || 'controls',
        specialMode: null,
      };
    }

    const maybeAlgoSlug = pathWithoutLanguage[1];
    if (
      isAlgorithmPath &&
      pathWithoutLanguage.length === 2 &&
      maybeAlgoSlug != null &&
      maybeAlgoSlug in SORTING_ALGORITHM_REGISTRY
    ) {
      return {
        activeTab: 'controls',
        specialMode: null,
      };
    }

    return {
      activeTab: 'controls',
      specialMode: null,
    };
  }, [
    isContributionPath,
    contributionSection,
    isAlgorithmPath,
    tabFromPath,
    pathWithoutLanguage,
  ]);

  const currentAlgorithm = algorithmFromPath || 'bubble';
  return {
    activeTab,
    specialMode,
    currentAlgorithm,
    pathTab:
      activeTab in INTERNAL_TO_TAB
        ? INTERNAL_TO_TAB[activeTab as keyof typeof INTERNAL_TO_TAB]
        : 'config',
  };
};
