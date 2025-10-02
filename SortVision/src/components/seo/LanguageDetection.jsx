/**
 * Language Detection and SEO Enhancement Component
 * 
 * This component provides language detection, hreflang generation,
 * and other SEO enhancements for multilingual support.
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Supported languages configuration
export const SUPPORTED_LANGUAGES = {
  en: { 
    name: 'English', 
    nativeName: 'English', 
    flag: '🇺🇸',
    locale: 'en_US',
    hreflang: 'en'
  },
  es: { 
    name: 'Spanish', 
    nativeName: 'Español', 
    flag: '🇪🇸',
    locale: 'es_ES',
    hreflang: 'es'
  },
  hi: { 
    name: 'Hindi', 
    nativeName: 'हिन्दी', 
    flag: '🇮🇳',
    locale: 'hi_IN',
    hreflang: 'hi'
  },
  fr: { 
    name: 'French', 
    nativeName: 'Français', 
    flag: '🇫🇷',
    locale: 'fr_FR',
    hreflang: 'fr'
  },
  de: { 
    name: 'German', 
    nativeName: 'Deutsch', 
    flag: '🇩🇪',
    locale: 'de_DE',
    hreflang: 'de'
  },
  zh: { 
    name: 'Chinese', 
    nativeName: '中文', 
    flag: '🇨🇳',
    locale: 'zh_CN',
    hreflang: 'zh'
  }
};

/**
 * Detect language from URL path
 * @param {string} pathname - Current pathname
 * @returns {string} - Detected language code
 */
export const detectLanguageFromPath = (pathname) => {
  const pathParts = pathname.split('/').filter(Boolean);
  const firstSegment = pathParts[0];
  
  if (firstSegment && SUPPORTED_LANGUAGES[firstSegment]) {
    return firstSegment;
  }
  
  return 'en'; // Default to English
};

/**
 * Generate hreflang links for all supported languages
 * @param {string} basePath - Base path without language prefix
 * @returns {Array} - Array of hreflang link objects
 */
export const generateHreflangLinks = (basePath) => {
  const baseUrl = 'https://www.sortvision.com';
  
  return Object.entries(SUPPORTED_LANGUAGES).map(([code, config]) => ({
    hreflang: config.hreflang,
    href: code === 'en' 
      ? `${baseUrl}${basePath}` 
      : `${baseUrl}/${code}${basePath}`
  }));
};

/**
 * Get language-specific locale for OpenGraph
 * @param {string} language - Language code
 * @returns {string} - Locale string
 */
export const getLanguageLocale = (language) => {
  return SUPPORTED_LANGUAGES[language]?.locale || 'en_US';
};

/**
 * Generate language-specific structured data
 * @param {string} language - Language code
 * @param {Object} content - Content object
 * @returns {Object} - Structured data object
 */
export const generateLanguageStructuredData = (language, content) => {
  const baseUrl = 'https://www.sortvision.com';
  const languageInfo = SUPPORTED_LANGUAGES[language];
  
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
      url: baseUrl,
      availableLanguage: Object.keys(SUPPORTED_LANGUAGES).map(code => ({
        '@type': 'Language',
        name: SUPPORTED_LANGUAGES[code].name,
        alternateName: SUPPORTED_LANGUAGES[code].nativeName
      }))
    },
    author: {
      '@type': 'Person',
      name: 'alienX',
      url: 'https://github.com/alienx5499'
    },
    publisher: {
      '@type': 'Organization',
      name: 'SortVision',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/favicon.svg`
      }
    },
    dateModified: new Date().toISOString(),
    mainEntity: content.mainEntity || null
  };
};

/**
 * Language Detection Hook
 * Provides language detection and SEO utilities
 */
export const useLanguageDetection = () => {
  const location = useLocation();
  
  const currentLanguage = detectLanguageFromPath(location.pathname);
  const languageInfo = SUPPORTED_LANGUAGES[currentLanguage];
  
  // Generate hreflang links for current path
  const getHreflangLinks = () => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    
    // Remove language prefix if present
    if (pathParts[0] && SUPPORTED_LANGUAGES[pathParts[0]]) {
      pathParts.shift();
    }
    
    const basePath = '/' + pathParts.join('/');
    return generateHreflangLinks(basePath);
  };
  
  // Get canonical URL for current language
  const getCanonicalUrl = () => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    
    // Remove language prefix if present
    if (pathParts[0] && SUPPORTED_LANGUAGES[pathParts[0]]) {
      pathParts.shift();
    }
    
    const basePath = '/' + pathParts.join('/');
    const baseUrl = 'https://www.sortvision.com';
    
    return currentLanguage === 'en' 
      ? `${baseUrl}${basePath}`
      : `${baseUrl}/${currentLanguage}${basePath}`;
  };
  
  return {
    currentLanguage,
    languageInfo,
    getHreflangLinks,
    getCanonicalUrl,
    isLocalized: currentLanguage !== 'en'
  };
};

/**
 * SEO Enhancement Component
 * Automatically adds language-specific meta tags and structured data
 */
export const SEOEnhancement = ({ children, content = {} }) => {
  const { currentLanguage, getHreflangLinks, getCanonicalUrl } = useLanguageDetection();
  
  useEffect(() => {
    // Add hreflang links to document head
    const hreflangLinks = getHreflangLinks();
    
    // Remove existing hreflang links
    const existingLinks = document.querySelectorAll('link[hreflang]');
    existingLinks.forEach(link => link.remove());
    
    // Add new hreflang links
    hreflangLinks.forEach(({ hreflang, href }) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = hreflang;
      link.href = href;
      document.head.appendChild(link);
    });
    
    // Add x-default hreflang
    const xDefaultLink = document.createElement('link');
    xDefaultLink.rel = 'alternate';
    xDefaultLink.hreflang = 'x-default';
    xDefaultLink.href = getCanonicalUrl().replace(`/${currentLanguage}`, '');
    document.head.appendChild(xDefaultLink);
    
    // Update document language
    document.documentElement.lang = currentLanguage;
    
    // Add language-specific structured data
    if (content.title && content.description) {
      const structuredData = generateLanguageStructuredData(currentLanguage, {
        ...content,
        url: getCanonicalUrl()
      });
      
      // Remove existing structured data
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.remove();
      }
      
      // Add new structured data
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
    
    // Cleanup function
    return () => {
      const hreflangLinks = document.querySelectorAll('link[hreflang]');
      hreflangLinks.forEach(link => link.remove());
      
      const structuredDataScript = document.querySelector('script[type="application/ld+json"]');
      if (structuredDataScript) {
        structuredDataScript.remove();
      }
    };
  }, [currentLanguage, content, getHreflangLinks, getCanonicalUrl]);
  
  return children;
};

export default SEOEnhancement;
