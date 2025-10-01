const baseUrl = 'https://www.sortvision.com';
const supportedLanguages = ['en', 'es', 'hi', 'fr', 'de', 'zh'];
const algorithms = [
  'bubble', 'insertion', 'selection', 'merge', 'quick', 
  'heap', 'radix', 'bucket'
];

export default function sitemap() {
  const urls = [];

  // Generate homepage URLs for all languages
  supportedLanguages.forEach(lang => {
    const path = lang === 'en' ? '' : `/${lang}`;
    
    urls.push({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: lang === 'en' ? 1.0 : 0.9,
      alternates: {
        languages: supportedLanguages.reduce((acc, l) => {
          const lPath = l === 'en' ? '' : `/${l}`;
          acc[l] = `${baseUrl}${lPath}`;
          return acc;
        }, {})
      }
    });
  });

  // Generate algorithm pages for all languages
  supportedLanguages.forEach(lang => {
    const langPath = lang === 'en' ? '' : `/${lang}`;
    
    algorithms.forEach(algorithm => {
      // Config pages
      urls.push({
        url: `${baseUrl}${langPath}/algorithms/config/${algorithm}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
          languages: supportedLanguages.reduce((acc, l) => {
            const lPath = l === 'en' ? '' : `/${l}`;
            acc[l] = `${baseUrl}${lPath}/algorithms/config/${algorithm}`;
            return acc;
          }, {})
        }
      });

      // Details pages
      urls.push({
        url: `${baseUrl}${langPath}/algorithms/details/${algorithm}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: supportedLanguages.reduce((acc, l) => {
            const lPath = l === 'en' ? '' : `/${l}`;
            acc[l] = `${baseUrl}${lPath}/algorithms/details/${algorithm}`;
            return acc;
          }, {})
        }
      });

      // Metrics pages
      urls.push({
        url: `${baseUrl}${langPath}/algorithms/metrics/${algorithm}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: supportedLanguages.reduce((acc, l) => {
            const lPath = l === 'en' ? '' : `/${l}`;
            acc[l] = `${baseUrl}${lPath}/algorithms/metrics/${algorithm}`;
            return acc;
          }, {})
        }
      });
    });
  });

  // Generate contributions pages for all languages
  supportedLanguages.forEach(lang => {
    const langPath = lang === 'en' ? '' : `/${lang}`;
    
    const contributionPages = [
      'contributions',
      'contributions/overview',
      'contributions/guide',
      'contributions/ssoc'
    ];

    contributionPages.forEach(page => {
      urls.push({
        url: `${baseUrl}${langPath}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
        alternates: {
          languages: supportedLanguages.reduce((acc, l) => {
            const lPath = l === 'en' ? '' : `/${l}`;
            acc[l] = `${baseUrl}${lPath}/${page}`;
            return acc;
          }, {})
        }
      });
    });
  });

  return urls;
}
