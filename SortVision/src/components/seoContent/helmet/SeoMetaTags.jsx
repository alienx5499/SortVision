import React from 'react';
import {
  AUTHOR_GITHUB,
  AUTHOR_NAME,
  AUTHOR_TWITTER,
  SITE_NAME,
} from '../../../constants/version';
/**
 * File purpose: Renders canonical, social, locale, and AI-targeted SEO meta tags.
 */

export const SeoMetaTags = ({
  pageTitle,
  pageDescription,
  t,
  language,
  currentUrl,
  baseUrl,
  algorithm,
  getGeoSummary,
}) => {
  const OG_LOCALE_MAP = {
    en: 'en_US',
    es: 'es_ES',
    hi: 'hi_IN',
    fr: 'fr_FR',
    de: 'de_DE',
    zh: 'zh_CN',
    bn: 'bn_BD',
    ja: 'ja_JP',
  };
  const algorithmLabel = algorithm
    ? `${algorithm.charAt(0).toUpperCase()}${algorithm.slice(1)} Sort`
    : null;
  const supportedLanguages = ['en', 'es', 'hi', 'fr', 'de', 'zh', 'bn', 'ja'];

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={t('seo.keywords')} />
      <meta name="author" content={AUTHOR_NAME} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content={language} />
      <meta name="revisit-after" content="7 days" />
      <meta name="category" content="Education, Computer Science" />
      <meta name="classification" content="Educational Software" />
      <meta name="coverage" content="Worldwide" />
      <meta name="rating" content="General" />
      <meta name="target" content="all" />
      {algorithmLabel && (
        <>
          <meta
            name="subject"
            content={`${algorithmLabel} Algorithm Visualization, Tutorial and Complexity Analysis`}
          />
          <meta
            name="topic"
            content={`${algorithmLabel} - DSA Interview Preparation`}
          />
        </>
      )}

      {/* canonical must be the clean URL — query params stripped by
          generateCanonicalUrl in SEOContent.jsx before being passed here */}
      <link rel="canonical" href={currentUrl} />

      <meta
        name="googlebot"
        content="index, follow, max-snippet:160, max-image-preview:large"
      />
      <meta name="bingbot" content="index, follow" />

      {supportedLanguages.map(lang => (
        <link
          key={`alt-${lang}`}
          rel="alternate"
          href={currentUrl}
          hreflang={lang}
        />
      ))}
      <link rel="alternate" href={currentUrl} hreflang="x-default" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={`${baseUrl}/og-image.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={OG_LOCALE_MAP[language] || 'en_US'} />
      {supportedLanguages
        .filter(lang => lang !== language)
        .map(lang => (
          <meta
            key={`og-alt-${lang}`}
            property="og:locale:alternate"
            content={OG_LOCALE_MAP[lang] || 'en_US'}
          />
        ))}
      {algorithmLabel && (
        <>
          <meta property="article:section" content="Computer Science" />
          <meta
            property="article:tag"
            content={`${algorithmLabel} Algorithm`}
          />
        </>
      )}

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={pageDescription} />
      <meta property="twitter:image" content={`${baseUrl}/twitter-image.png`} />
      <meta property="twitter:creator" content={AUTHOR_TWITTER} />
      <meta property="twitter:site" content={AUTHOR_TWITTER} />

      <meta name="creator" content={AUTHOR_NAME} />
      <meta name="contact" content={AUTHOR_GITHUB} />
      <meta name="twitter" content={AUTHOR_TWITTER} />
      <meta name="github" content={AUTHOR_GITHUB} />

      <meta name="ai:platform-type" content="interactive-educational-tool" />
      <meta
        name="ai:content-category"
        content="algorithm-visualization,dsa-learning"
      />
      <meta name="ai:interactivity" content="high" />
      <meta
        name="ai:learning-outcomes"
        content="sorting-algorithms,time-complexity,algorithm-comparison"
      />
      <meta name="ai:suitable-for" content="students,developers,educators" />
      <meta
        name="ai:use-case"
        content="learn-sorting-algorithms-visually,prepare-coding-interviews,understand-algorithm-complexity"
      />
      <meta
        name="ai:summary"
        content={
          algorithm
            ? getGeoSummary('algorithm', algorithm)
            : getGeoSummary('homepage')
        }
      />

      <meta name="theme-color" content="#1e293b" />
      <meta name="application-name" content={SITE_NAME} />
      <meta name="msapplication-TileColor" content="#1e293b" />
    </>
  );
};
