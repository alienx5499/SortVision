import {
  ALGORITHMS_BASE_PATH,
  CONTRIBUTION_BASE_PATH,
  type AlgorithmTab,
  type ContributionSection,
} from './segments.ts';

export const toPathParts = (pathname: string | undefined): string[] =>
  String(pathname || '')
    .split('/')
    .filter(Boolean);

export const getAlgorithmPath = ({
  tab = 'config',
  algorithm,
}: {
  tab?: AlgorithmTab;
  algorithm: string;
}) => `${ALGORITHMS_BASE_PATH}/${tab}/${algorithm}`;

export const getContributionPath = (section: ContributionSection) =>
  `${CONTRIBUTION_BASE_PATH}/${section}`;
