import { DEFAULT_LANGUAGE, normalizeLanguage } from './i18n.ts';
import {
  ALGORITHMS_BASE_PATH,
  CONTRIBUTION_BASE_PATH,
  DETAIL_CODE_DEFAULT_TAB,
  isAlgorithmTab,
  isContributionSection,
  toPathParts,
} from './routes/index.ts';

export const BASE_URL = 'https://www.sortvision.com';

export const getBaseUrl = () => process.env.NEXT_PUBLIC_SITE_URL || BASE_URL;

export const normalizeCanonicalPath = (pathname: string) => {
  const pathParts = toPathParts(pathname);
  if (pathParts.length === 0) return '/';

  const maybeLanguage = normalizeLanguage(pathParts[0]);
  const language = maybeLanguage || DEFAULT_LANGUAGE;
  const parts = maybeLanguage ? pathParts.slice(1) : pathParts;
  const localePrefix = language === DEFAULT_LANGUAGE ? '' : `/${language}`;

  if (parts[0] === ALGORITHMS_BASE_PATH) {
    if (parts.length === 3 && isAlgorithmTab(parts[1])) {
      return `${localePrefix}/${ALGORITHMS_BASE_PATH}/${parts[1]}/${parts[2]}`;
    }
    if (parts.length === 2) {
      return `${localePrefix}/${ALGORITHMS_BASE_PATH}/config/${parts[1]}`;
    }
    return `${localePrefix}/`;
  }

  if (parts[0] === CONTRIBUTION_BASE_PATH) {
    const section = parts[1];
    if (isContributionSection(section)) {
      const suffix = parts[2] ? `/${parts[2]}` : '';
      return `${localePrefix}/${CONTRIBUTION_BASE_PATH}/${section}${suffix}`;
    }
    return `${localePrefix}/${CONTRIBUTION_BASE_PATH}/overview`;
  }

  return `${localePrefix}/${parts.join('/')}`.replace(/\/+$/, '') || '/';
};

export const getCanonicalAlgorithmDetailsPath = (
  pathname: string,
  algorithm: string
) => {
  const normalized = normalizeCanonicalPath(pathname);
  const parts = toPathParts(normalized);
  const hasLocale = parts.length > 0 && normalizeLanguage(parts[0]);
  const offset = hasLocale ? 1 : 0;
  const localePrefix = hasLocale ? `/${parts[0]}` : '';

  if (
    parts[offset] === ALGORITHMS_BASE_PATH &&
    isAlgorithmTab(parts[offset + 1])
  ) {
    return `${localePrefix}/${ALGORITHMS_BASE_PATH}/${DETAIL_CODE_DEFAULT_TAB}/${algorithm}`;
  }

  return `/${ALGORITHMS_BASE_PATH}/${DETAIL_CODE_DEFAULT_TAB}/${algorithm}`;
};

export const buildCanonicalUrl = (pathname: string) =>
  `${getBaseUrl()}${normalizeCanonicalPath(pathname)}`;
