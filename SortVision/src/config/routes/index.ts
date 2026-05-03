/**
 * URL segments, client route patterns, and type guards for app navigation.
 * Import from `@/config/routes` (this folder’s public API).
 */
export {
  ALGORITHM_TABS,
  CONTRIBUTION_SECTIONS,
  CONTRIBUTION_BASE_PATH,
  ALGORITHMS_BASE_PATH,
  DETAIL_CODE_DEFAULT_TAB,
  TAB_TO_INTERNAL,
  INTERNAL_TO_TAB,
  type AlgorithmTab,
  type ContributionSection,
} from './segments.ts';
export {
  isAlgorithmTab,
  isContributionSection,
  resolveContributionSectionFromTab,
} from './guards.ts';
export {
  toPathParts,
  getAlgorithmPath,
  getContributionPath,
  buildClientRoutePatterns,
} from './navigation.ts';
