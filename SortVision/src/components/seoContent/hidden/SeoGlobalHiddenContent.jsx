import React from 'react';
import { SeoGlobalFaqContent } from './SeoGlobalFaqContent';
import { SeoGlobalIntroContent } from './SeoGlobalIntroContent';
import { SeoGlobalUseCasesContent } from './SeoGlobalUseCasesContent';
/**
 * File purpose: Composes global hidden SEO sections for non-algorithm pages.
 */

export const SeoGlobalHiddenContent = ({
  algorithm,
  geoSummary,
  promptHooks,
}) => (
  <div className="sr-only" aria-hidden="true">
    <SeoGlobalIntroContent
      algorithm={algorithm}
      geoSummary={geoSummary}
      promptHooks={promptHooks}
    />
    <SeoGlobalUseCasesContent />
    <SeoGlobalFaqContent />
  </div>
);
