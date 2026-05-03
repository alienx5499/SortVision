import { LANGUAGE_SEO_BY_CODE } from './languageSeoConfig';

const SITE_ORIGIN = 'https://www.sortvision.com';

export function detectLanguageFromPath(pathname: string): string {
  const pathParts = pathname.split('/').filter(Boolean);
  const firstSegment = pathParts[0];

  if (firstSegment && LANGUAGE_SEO_BY_CODE[firstSegment]) {
    return firstSegment;
  }

  return 'en';
}

export function generateHreflangLinks(basePath: string) {
  return Object.entries(LANGUAGE_SEO_BY_CODE).map(([code, config]) => ({
    hreflang: config.hreflang,
    href:
      code === 'en'
        ? `${SITE_ORIGIN}${basePath}`
        : `${SITE_ORIGIN}/${code}${basePath}`,
  }));
}

export function getLanguageLocale(language: string): string {
  return LANGUAGE_SEO_BY_CODE[language]?.locale || 'en_US';
}

export function stripLangPrefixFromPathname(pathname: string): string {
  const pathParts = pathname.split('/').filter(Boolean);
  if (pathParts[0] && LANGUAGE_SEO_BY_CODE[pathParts[0]]) {
    pathParts.shift();
  }
  return '/' + pathParts.join('/');
}

export function canonicalUrlForLanguage(
  language: string,
  basePath: string
): string {
  return language === 'en'
    ? `${SITE_ORIGIN}${basePath}`
    : `${SITE_ORIGIN}/${language}${basePath}`;
}
