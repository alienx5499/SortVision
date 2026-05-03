import React from 'react';
import { SeoAlgorithmCatalogSchemaScript } from './SeoAlgorithmCatalogSchemaScript';
import { SeoAlgorithmHowToSchemaScript } from './SeoAlgorithmHowToSchemaScript';
import { SeoAlgorithmSpecificFaqSchemaScript } from './SeoAlgorithmSpecificFaqSchemaScript';
import { SeoBreadcrumbSchemaScript } from './SeoBreadcrumbSchemaScript';
import { SeoEducationalResourceSchemaScript } from './SeoEducationalResourceSchemaScript';
import { SeoFaqSchemaScript } from './SeoFaqSchemaScript';
import { SeoOrganizationSchemaScript } from './SeoOrganizationSchemaScript';
import { SeoPersonSchemaScript } from './SeoPersonSchemaScript';
import { SeoSoftwareApplicationSchemaScript } from './SeoSoftwareApplicationSchemaScript';
import { SeoVideoObjectSchemaScript } from './SeoVideoObjectSchemaScript';
import { SeoWebSiteSchemaScript } from './SeoWebSiteSchemaScript';
import { SeoWebPageTransparencySchemaScript } from './SeoWebPageTransparencySchemaScript';
/**
 * File purpose: Orchestrates all JSON-LD schema scripts used by the page.
 */

export const SeoStructuredDataScripts = ({
  algorithm,
  baseUrl,
  currentUrl,
  getGeoSummary,
  getAlgorithmHowToSchema,
  getAlgorithmCatalogSchema,
  getLearningOutcomes,
}: any) => (
  <>
    <SeoSoftwareApplicationSchemaScript
      baseUrl={baseUrl}
      getGeoSummary={getGeoSummary}
      getLearningOutcomes={getLearningOutcomes}
    />
    <SeoWebSiteSchemaScript baseUrl={baseUrl} />
    <SeoAlgorithmCatalogSchemaScript
      getAlgorithmCatalogSchema={getAlgorithmCatalogSchema}
    />
    <SeoBreadcrumbSchemaScript
      algorithm={algorithm}
      baseUrl={baseUrl}
      currentUrl={currentUrl}
    />
    <SeoPersonSchemaScript />
    <SeoOrganizationSchemaScript baseUrl={baseUrl} />
    <SeoEducationalResourceSchemaScript baseUrl={baseUrl} />
    {!algorithm && <SeoFaqSchemaScript />}
    <SeoAlgorithmSpecificFaqSchemaScript algorithm={algorithm} />
    <SeoAlgorithmHowToSchemaScript
      algorithm={algorithm}
      getAlgorithmHowToSchema={getAlgorithmHowToSchema}
    />
    <SeoVideoObjectSchemaScript />
    <SeoWebPageTransparencySchemaScript
      algorithm={algorithm}
      baseUrl={baseUrl}
      currentUrl={currentUrl}
      getGeoSummary={getGeoSummary}
      getLearningOutcomes={getLearningOutcomes}
    />
  </>
);
