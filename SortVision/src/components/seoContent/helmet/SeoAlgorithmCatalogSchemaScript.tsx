import React from 'react';
/**
 * File purpose: Renders JSON-LD for the sorting algorithm catalog entity.
 */

export const SeoAlgorithmCatalogSchemaScript = ({
  getAlgorithmCatalogSchema,
}: any) => (
  <>
    <script type="application/ld+json">
      {JSON.stringify(getAlgorithmCatalogSchema())}
    </script>
  </>
);
