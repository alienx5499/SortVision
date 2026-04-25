import React from 'react';
/**
 * File purpose: Renders optional algorithm-specific HowTo JSON-LD schema.
 */

export const SeoAlgorithmHowToSchemaScript = ({
  algorithm,
  getAlgorithmHowToSchema,
}) => {
  const howToSchema = algorithm ? getAlgorithmHowToSchema(algorithm) : null;

  return (
    <>
      {algorithm && howToSchema && (
        <script type="application/ld+json">
          {JSON.stringify(howToSchema)}
        </script>
      )}
    </>
  );
};
