import { usePathname } from 'next/navigation';
import { LANGUAGE_SEO_BY_CODE } from './languageSeoConfig';
import {
  canonicalUrlForLanguage,
  detectLanguageFromPath,
  generateHreflangLinks,
  stripLangPrefixFromPathname,
} from './languageSeoPaths';

export function useLanguageDetection() {
  const pathname = usePathname();

  const currentLanguage = detectLanguageFromPath(pathname);
  const languageInfo = LANGUAGE_SEO_BY_CODE[currentLanguage];

  const getHreflangLinks = () => {
    const basePath = stripLangPrefixFromPathname(pathname);
    return generateHreflangLinks(basePath);
  };

  const getCanonicalUrl = () => {
    const basePath = stripLangPrefixFromPathname(pathname);
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
