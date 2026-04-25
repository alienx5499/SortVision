import { algorithms } from '../../utils/seo';
import {
  ALGORITHM_TABS,
  COMMON_CONTRIBUTORS,
  CONTRIBUTION_SECTIONS,
  SUPPORTED_LANGUAGES,
} from './metadata/constants';

export const generateAppStaticParams = () => {
  const params = [];

  params.push({ slug: [] });
  SUPPORTED_LANGUAGES.slice(1).forEach(lang => {
    params.push({ slug: [lang] });
  });

  SUPPORTED_LANGUAGES.forEach(lang => {
    const prefix = lang === 'en' ? [] : [lang];
    params.push({ slug: [...prefix, 'algorithms'] });
    params.push({ slug: [...prefix, 'contributions'] });
  });

  const algorithmNames = Object.keys(algorithms);
  for (const algorithm of algorithmNames) {
    for (const lang of SUPPORTED_LANGUAGES) {
      const prefix = lang === 'en' ? [] : [lang];

      params.push({ slug: [...prefix, 'algorithms', algorithm] });

      for (const tab of ALGORITHM_TABS) {
        params.push({ slug: [...prefix, 'algorithms', tab, algorithm] });
      }
    }
  }

  for (const section of CONTRIBUTION_SECTIONS) {
    for (const lang of SUPPORTED_LANGUAGES) {
      const prefix = lang === 'en' ? [] : [lang];
      params.push({ slug: [...prefix, 'contributions', section] });
    }
  }

  for (const contributor of COMMON_CONTRIBUTORS) {
    for (const lang of SUPPORTED_LANGUAGES) {
      const prefix = lang === 'en' ? [] : [lang];
      params.push({
        slug: [...prefix, 'contributions', 'overview', contributor],
      });
    }
  }

  params.push({
    slug: ['.well-known', 'appspecific', 'com.chrome.devtools.json'],
  });
  params.push({ slug: ['favicon.ico'] });

  return params;
};
