import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SeoMetaTags } from './helmet/SeoMetaTags';
import { SeoStructuredDataScripts } from './helmet/SeoStructuredDataScripts';
/**
 * File purpose: Composes all Helmet-based SEO metadata and JSON-LD blocks.
 */

export const SeoHelmetContent = ({
  pageTitle,
  pageDescription,
  t,
  language,
  currentUrl,
  baseUrl,
  algorithm,
  getGeoSummary,
  getAlgorithmHowToSchema,
  getAlgorithmCatalogSchema,
  getLearningOutcomes,
}) => (
  <Helmet>
    <SeoMetaTags
      pageTitle={pageTitle}
      pageDescription={pageDescription}
      t={t}
      language={language}
      currentUrl={currentUrl}
      baseUrl={baseUrl}
      algorithm={algorithm}
      getGeoSummary={getGeoSummary}
    />
    <SeoStructuredDataScripts
      algorithm={algorithm}
      baseUrl={baseUrl}
      currentUrl={currentUrl}
      getGeoSummary={getGeoSummary}
      getAlgorithmHowToSchema={getAlgorithmHowToSchema}
      getAlgorithmCatalogSchema={getAlgorithmCatalogSchema}
      getLearningOutcomes={getLearningOutcomes}
    />
  </Helmet>
);
