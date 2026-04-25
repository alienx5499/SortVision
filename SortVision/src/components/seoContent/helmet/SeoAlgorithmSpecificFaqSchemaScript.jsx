import React from 'react';
import { SEO_ALGORITHM_DEEP_DIVE_FAQ_ENTRIES } from '../shared/seoFaqData';

/**
 * File purpose: Renders algorithm-specific FAQPage JSON-LD for deep-dive queries.
 */
export const SeoAlgorithmSpecificFaqSchemaScript = ({ algorithm }) => {
  if (!algorithm) {
    return null;
  }

  const normalizedAlgorithm = algorithm.toLowerCase();
  const filteredEntries = SEO_ALGORITHM_DEEP_DIVE_FAQ_ENTRIES.filter(
    entry =>
      entry.question.toLowerCase().includes(normalizedAlgorithm) ||
      entry.answer.toLowerCase().includes(normalizedAlgorithm)
  );

  if (filteredEntries.length === 0) {
    return null;
  }

  return (
    <script type="application/ld+json">
      {JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: filteredEntries.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: answer,
          },
        })),
      })}
    </script>
  );
};
