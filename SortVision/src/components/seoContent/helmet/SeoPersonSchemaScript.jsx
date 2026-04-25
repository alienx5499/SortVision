import React from 'react';
import {
  AUTHOR_GITHUB,
  AUTHOR_NAME,
  AUTHOR_TWITTER,
} from '../../../constants/version';

/**
 * File purpose: Renders author Person JSON-LD for E-E-A-T reinforcement.
 */
export const SeoPersonSchemaScript = () => (
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: AUTHOR_GITHUB,
      sameAs: [
        `https://twitter.com/${AUTHOR_TWITTER.replace('@', '')}`,
        AUTHOR_GITHUB,
      ],
      jobTitle: 'Software Engineer',
    })}
  </script>
);
