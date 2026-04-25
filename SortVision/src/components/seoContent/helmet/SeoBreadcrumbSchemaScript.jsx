import React from 'react';

/**
 * File purpose: Renders algorithm-page breadcrumb JSON-LD structure.
 */
export const SeoBreadcrumbSchemaScript = ({
  algorithm,
  baseUrl,
  currentUrl,
}) => {
  if (!algorithm) {
    return null;
  }

  const algorithmLabel = `${algorithm.charAt(0).toUpperCase()}${algorithm.slice(1)} Sort`;
  const algorithmUrl = currentUrl;

  return (
    <script type="application/ld+json">
      {JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: baseUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: algorithmLabel,
            item: algorithmUrl,
          },
        ],
      })}
    </script>
  );
};
