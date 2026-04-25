import React from 'react';
/**
 * File purpose: Renders JSON-LD for the sorting algorithm catalog entity.
 */

export const SeoAlgorithmCatalogSchemaScript = ({
  getAlgorithmCatalogSchema,
}) => (
  <>
    <script type="application/ld+json">
      {JSON.stringify(getAlgorithmCatalogSchema())}
    </script>
  </>
);
