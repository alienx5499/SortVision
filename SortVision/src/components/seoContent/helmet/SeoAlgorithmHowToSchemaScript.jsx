import React from 'react';
/**
 * File purpose: Renders optional algorithm-specific HowTo JSON-LD schema.
 */

export const SeoAlgorithmHowToSchemaScript = ({
  algorithm,
  getAlgorithmHowToSchema,
}) => (
  <>
    {algorithm && getAlgorithmHowToSchema(algorithm) && (
      <script type="application/ld+json">
        {JSON.stringify(getAlgorithmHowToSchema(algorithm))}
      </script>
    )}
  </>
);
