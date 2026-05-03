import React from 'react';
import { SEO_FAQ_ENTRIES } from '../shared/seoFaqData';
/**
 * File purpose: Renders FAQPage JSON-LD entries for interview and DSA questions.
 */

export const SeoFaqSchemaScript = () => (
  <>
    <script type="application/ld+json">
      {JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: SEO_FAQ_ENTRIES.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: answer,
          },
        })),
      })}
    </script>
  </>
);
