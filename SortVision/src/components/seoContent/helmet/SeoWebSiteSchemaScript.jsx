import React from 'react';
import { SITE_NAME } from '../../../constants/version';

/**
 * File purpose: Renders WebSite JSON-LD for sitelinks search support.
 */
export const SeoWebSiteSchemaScript = ({ baseUrl }) => (
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseUrl}/?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    })}
  </script>
);
