/**
 * SEO public API barrel.
 * Keeps legacy import path stable: `src/utils/seo`.
 */

export {
  seoTranslations,
  supportedLanguages,
  algorithms,
  globalKeywords,
} from './seo/data';

export {
  getAlgorithmMetaTags,
  getHomepageMetaTags,
  getContributionsMetaTags,
  getSSOCMetaTags,
} from './seo/meta';

export {
  getAlgorithmSchema,
  getGeoSummary,
  getPromptHooks,
  getAlgorithmHowToSchema,
  getAlgorithmCatalogSchema,
  getLearningOutcomes,
  getComparisonContext,
} from './seo/schema';

export {
  getAllAlgorithmUrls,
  formatPageTitle,
  generateCanonicalUrl,
  isCanonicalPath,
} from './seo/url';
