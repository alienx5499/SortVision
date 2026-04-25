import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  generateCanonicalUrl,
  getGeoSummary,
  getPromptHooks,
  getAlgorithmHowToSchema,
  getAlgorithmCatalogSchema,
  getLearningOutcomes,
} from '../utils/seo';
import { useLanguage } from '@/context/LanguageContext';
import { SeoHiddenContent } from './seoContent/SeoHiddenContent';
import { SeoHelmetContent } from './seoContent/SeoHelmetContent';

/**
 * SEO Content Component
 *
 * Provides comprehensive SEO optimization including:
 * - Meta tags (Open Graph, Twitter Cards, etc.)
 * - Structured data (Application, Educational Resource, FAQ)
 * - Keyword-rich content for search engines
 * - Algorithm-specific optimization
 */
const SEOContent = ({ algorithm = null }) => {
  const location = useLocation();
  const { language, t } = useLanguage();
  const baseUrl = 'https://www.sortvision.com';

  // Generate clean canonical URL
  const currentUrl = generateCanonicalUrl(location.pathname, algorithm);

  // GEO: AI-friendly summaries and prompt hooks (defined early for use in content)
  const geoSummary = algorithm
    ? getGeoSummary('algorithm', algorithm)
    : getGeoSummary('homepage');

  const promptHooks = algorithm
    ? getPromptHooks('algorithm', algorithm)
    : getPromptHooks('homepage');

  // 4. Comprehensive meta tags and structured data
  const pageTitle = algorithm
    ? t('seo.algorithmTitle', {
        algorithm: algorithm.charAt(0).toUpperCase() + algorithm.slice(1),
      })
    : t('seo.title');

  const pageDescription = algorithm
    ? t('seo.algorithmDescription', { algorithm })
    : t('seo.description');

  return (
    <>
      <SeoHelmetContent
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        t={t}
        language={language}
        currentUrl={currentUrl}
        baseUrl={baseUrl}
        algorithm={algorithm}
        getGeoSummary={getGeoSummary}
        getAlgorithmHowToSchema={getAlgorithmHowToSchema}
        getAlgorithmCatalogSchema={getAlgorithmCatalogSchema}
        getLearningOutcomes={getLearningOutcomes}
      />

      <SeoHiddenContent
        algorithm={algorithm}
        geoSummary={geoSummary}
        promptHooks={promptHooks}
      />
    </>
  );
};

export default SEOContent;
