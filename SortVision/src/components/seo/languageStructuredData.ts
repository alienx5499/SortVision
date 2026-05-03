import { LANGUAGE_SEO_BY_CODE } from './languageSeoConfig';

const SITE_ORIGIN = 'https://www.sortvision.com';

export type LanguageStructuredContent = {
  title: string;
  description: string;
  url: string;
  mainEntity?: unknown;
};

export function generateLanguageStructuredData(
  language: string,
  content: LanguageStructuredContent
) {
  const languageInfo = LANGUAGE_SEO_BY_CODE[language];

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: content.title,
    description: content.description,
    url: content.url,
    inLanguage: languageInfo?.hreflang || 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: 'SortVision',
      url: SITE_ORIGIN,
      availableLanguage: Object.keys(LANGUAGE_SEO_BY_CODE).map(code => ({
        '@type': 'Language',
        name: LANGUAGE_SEO_BY_CODE[code].name,
        alternateName: LANGUAGE_SEO_BY_CODE[code].nativeName,
      })),
    },
    author: {
      '@type': 'Person',
      name: 'alienX',
      url: 'https://github.com/alienx5499',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SortVision',
      url: SITE_ORIGIN,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_ORIGIN}/favicon.svg`,
      },
    },
    dateModified: new Date().toISOString(),
    mainEntity: content.mainEntity ?? null,
  };
}

export function xDefaultHrefFromCanonical(
  canonicalUrl: string,
  currentLanguage: string
): string {
  return canonicalUrl.replace(`/${currentLanguage}`, '');
}
