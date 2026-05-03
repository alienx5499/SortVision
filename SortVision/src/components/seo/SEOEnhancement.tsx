'use client';

import { useEffect, type ReactNode } from 'react';
import {
  generateLanguageStructuredData,
  xDefaultHrefFromCanonical,
} from './languageStructuredData';
import { useLanguageDetection } from './useLanguageDetection';

export type SEOEnhancementContent = Partial<{
  title: string;
  description: string;
  mainEntity: unknown;
}>;

export type SEOEnhancementProps = {
  children?: ReactNode;
  content?: SEOEnhancementContent;
};

export function SEOEnhancement({
  children,
  content = {},
}: SEOEnhancementProps) {
  const { currentLanguage, getHreflangLinks, getCanonicalUrl } =
    useLanguageDetection();

  useEffect(() => {
    const hreflangLinks = getHreflangLinks();

    const existingLinks = document.querySelectorAll('link[hreflang]');
    existingLinks.forEach(link => link.remove());

    hreflangLinks.forEach(({ hreflang, href }) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = hreflang;
      link.href = href;
      document.head.appendChild(link);
    });

    const xDefaultLink = document.createElement('link');
    xDefaultLink.rel = 'alternate';
    xDefaultLink.hreflang = 'x-default';
    xDefaultLink.href = xDefaultHrefFromCanonical(
      getCanonicalUrl(),
      currentLanguage
    );
    document.head.appendChild(xDefaultLink);

    document.documentElement.lang = currentLanguage;

    if (content.title && content.description) {
      const structuredData = generateLanguageStructuredData(currentLanguage, {
        title: content.title,
        description: content.description,
        url: getCanonicalUrl(),
        mainEntity: content.mainEntity,
      });

      const existingScript = document.querySelector(
        'script[type="application/ld+json"]'
      );
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    return () => {
      document
        .querySelectorAll('link[hreflang]')
        .forEach(link => link.remove());

      const structuredDataScript = document.querySelector(
        'script[type="application/ld+json"]'
      );
      if (structuredDataScript) {
        structuredDataScript.remove();
      }
    };
  }, [currentLanguage, content, getHreflangLinks, getCanonicalUrl]);

  return <>{children}</>;
}

export default SEOEnhancement;
