import { algorithms } from './data';

export const getAllAlgorithmUrls = () =>
  Object.keys(algorithms).map(key => ({
    url: `/algorithms/${key}`,
    title: algorithms[key].name,
    description: algorithms[key].seo_description,
    lastModified: new Date().toISOString().split('T')[0],
  }));

export const formatPageTitle = (algorithm = null) => {
  if (algorithm && algorithms[algorithm]) {
    return `${algorithms[algorithm].name} Visualizer | SortVision - Learn How ${algorithms[algorithm].name} Works`;
  }
  return 'SortVision | Interactive Sorting Algorithm Visualizer & Learning Tool';
};

export const generateCanonicalUrl = pathname => {
  const baseUrl = 'https://www.sortvision.com';
  let cleanPath = pathname.replace(/\/+$/, '') || '/';
  cleanPath = cleanPath.split('?')[0].split('#')[0];
  const pathParts = cleanPath.split('/').filter(Boolean);

  if (pathParts[0] === 'algorithms') {
    if (pathParts.length === 3) {
      const tab = pathParts[1];
      const algorithmParam = pathParts[2];
      const validTabs = ['config', 'details', 'metrics'];
      const validAlgorithms = Object.keys(algorithms);
      if (
        validTabs.includes(tab) &&
        validAlgorithms.includes(algorithmParam.toLowerCase())
      ) {
        cleanPath = `/algorithms/${tab}/${algorithmParam.toLowerCase()}`;
      } else {
        cleanPath = '/';
      }
    } else if (pathParts.length === 2) {
      const algorithmParam = pathParts[1];
      const validAlgorithms = Object.keys(algorithms);
      if (validAlgorithms.includes(algorithmParam.toLowerCase())) {
        cleanPath = `/algorithms/config/${algorithmParam.toLowerCase()}`;
      } else {
        cleanPath = '/';
      }
    } else {
      cleanPath = '/';
    }
  } else if (pathParts[0] === 'contributions') {
    if (pathParts.length === 2) {
      const section = pathParts[1];
      const validSections = ['overview', 'guide', 'ssoc'];
      cleanPath = validSections.includes(section)
        ? `/contributions/${section}`
        : '/contributions/overview';
    } else if (pathParts.length === 1) {
      cleanPath = '/contributions/overview';
    }
  }

  const urlMappings = {
    '/index': '/',
    '/home': '/',
    '/index.html': '/',
    '/main': '/',
    '/sorting': '/',
    '/visualizer': '/',
    '/contribute': '/contributions/overview',
    '/contributors': '/contributions/overview',
  };

  if (urlMappings[cleanPath]) cleanPath = urlMappings[cleanPath];
  return `${baseUrl}${cleanPath}`;
};

export const isCanonicalPath = pathname => {
  const canonical = generateCanonicalUrl(pathname);
  const cleanPath =
    (pathname || '/').split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
  const current = `https://www.sortvision.com${cleanPath}`;
  return canonical === current;
};
