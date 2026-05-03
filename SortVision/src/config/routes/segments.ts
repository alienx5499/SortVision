export const ALGORITHM_TABS = ['config', 'details', 'metrics'] as const;
export type AlgorithmTab = (typeof ALGORITHM_TABS)[number];

export const CONTRIBUTION_SECTIONS = ['overview', 'guide', 'ssoc'] as const;
export type ContributionSection = (typeof CONTRIBUTION_SECTIONS)[number];

export const CONTRIBUTION_BASE_PATH = 'contributions';
export const ALGORITHMS_BASE_PATH = 'algorithms';

export const DETAIL_CODE_DEFAULT_TAB = 'details';

export const TAB_TO_INTERNAL: Record<AlgorithmTab, string> = {
  config: 'controls',
  metrics: 'metrics',
  details: 'details',
};

export const INTERNAL_TO_TAB: Record<string, AlgorithmTab> = {
  controls: 'config',
  metrics: 'metrics',
  details: 'details',
};
