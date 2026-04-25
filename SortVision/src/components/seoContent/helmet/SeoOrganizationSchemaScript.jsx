import React from 'react';
import {
  AUTHOR_GITHUB,
  AUTHOR_NAME,
  AUTHOR_TWITTER,
  SITE_NAME,
} from '../../../constants/version';

/**
 * File purpose: Renders Organization JSON-LD for brand entity reinforcement.
 */
export const SeoOrganizationSchemaScript = ({ baseUrl }) => (
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      sameAs: [
        'https://github.com/alienx5499/SortVision',
        `https://twitter.com/${AUTHOR_TWITTER.replace('@', '')}`,
      ],
      founder: {
        '@type': 'Person',
        name: AUTHOR_NAME,
        url: AUTHOR_GITHUB,
      },
      foundingDate: '2024',
      description:
        'Free interactive sorting algorithm visualizer and DSA education platform for students, developers, and educators.',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'technical support',
        url: AUTHOR_GITHUB,
      },
    })}
  </script>
);
