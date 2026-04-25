/**
 * SEO utilities barrel.
 *
 * Keeps legacy import paths stable while implementation lives in seoModules.
 */

export {
  seoTranslations,
  getLocalizedContent,
  supportedLanguages,
  algorithms,
  globalKeywords,
} from './seoModules/constants';

export {
  getAlgorithmMetaTags,
  getHomepageMetaTags,
  getContributionsMetaTags,
  getSSOCMetaTags,
} from './seoModules/meta';

export {
  formatPageTitle,
  generateCanonicalUrl,
  isCanonicalPath,
} from './seoModules/canonical';

export { getGeoSummary, getPromptHooks } from './seoModules/geo';

export {
  getAlgorithmSchema,
  getAllAlgorithmUrls,
  getAlgorithmHowToSchema,
  getAlgorithmCatalogSchema,
  getLearningOutcomes,
  getComparisonContext,
} from './seoModules/schema';
