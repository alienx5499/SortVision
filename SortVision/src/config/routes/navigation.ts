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

export const buildClientRoutePatterns = (
  includeLocalePrefix: boolean
): string[] => {
  const prefix = includeLocalePrefix ? '/:lang' : '';
  const homePath = includeLocalePrefix ? '/:lang' : '/';
  return [
    homePath,
    `${prefix}/${ALGORITHMS_BASE_PATH}/config/:algorithmName`,
    `${prefix}/${ALGORITHMS_BASE_PATH}/details/:algorithmName`,
    `${prefix}/${ALGORITHMS_BASE_PATH}/metrics/:algorithmName`,
    `${prefix}/${ALGORITHMS_BASE_PATH}/:algorithmName`,
    `${prefix}/${CONTRIBUTION_BASE_PATH}/overview`,
    `${prefix}/${CONTRIBUTION_BASE_PATH}/overview/:contributorId`,
    `${prefix}/${CONTRIBUTION_BASE_PATH}/guide`,
    `${prefix}/${CONTRIBUTION_BASE_PATH}/ssoc`,
    `${prefix}/${CONTRIBUTION_BASE_PATH}`,
  ];
};
