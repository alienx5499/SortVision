import { useLocation } from 'react-router-dom';
import { LANGUAGE_SEO_BY_CODE } from './languageSeoConfig';
import {
  canonicalUrlForLanguage,
  detectLanguageFromPath,
  generateHreflangLinks,
  stripLangPrefixFromPathname,
} from './languageSeoPaths';

export function useLanguageDetection() {
  const location = useLocation();

  const currentLanguage = detectLanguageFromPath(location.pathname);
  const languageInfo = LANGUAGE_SEO_BY_CODE[currentLanguage];

  const getHreflangLinks = () => {
    const basePath = stripLangPrefixFromPathname(location.pathname);
    return generateHreflangLinks(basePath);
  };

  const getCanonicalUrl = () => {
    const basePath = stripLangPrefixFromPathname(location.pathname);
    return canonicalUrlForLanguage(currentLanguage, basePath);
  };

  return {
    currentLanguage,
    languageInfo,
    getHreflangLinks,
    getCanonicalUrl,
    isLocalized: currentLanguage !== 'en',
  };
}
