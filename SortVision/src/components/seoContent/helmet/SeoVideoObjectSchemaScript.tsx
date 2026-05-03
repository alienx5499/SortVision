import React from 'react';

/**
 * File purpose: VideoObject JSON-LD integration point.
 */
export const SeoVideoObjectSchemaScript = ({ schema = null }: any) => {
  if (!schema) return null;

  return <script type="application/ld+json">{JSON.stringify(schema)}</script>;
};
