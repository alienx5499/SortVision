import React from 'react';
import { SeoGlobalHiddenContent } from './hidden/SeoGlobalHiddenContent';
import { SeoAlgorithmHiddenContent } from './hidden/SeoAlgorithmHiddenContent';
/**
 * File purpose: Composes hidden semantic SEO content for crawlers and LLM parsing.
 */

export const SeoHiddenContent = ({ algorithm, geoSummary, promptHooks }) => {
  return (
    <>
      <SeoGlobalHiddenContent
        algorithm={algorithm}
        geoSummary={geoSummary}
        promptHooks={promptHooks}
      />
      <SeoAlgorithmHiddenContent
        algorithm={algorithm}
        geoSummary={geoSummary}
        promptHooks={promptHooks}
      />
    </>
  );
};
