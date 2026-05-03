import React from 'react';
import { SEO_GENERAL_FAQ_ENTRIES } from '../shared/seoFaqData';
/**
 * File purpose: Renders hidden FAQ content for search and answer engines.
 */

export const SeoGlobalFaqContent = () => (
  <>
    <h2>Frequently Asked Questions - Sorting Algorithms & DSA Learning</h2>
    <div>
      {SEO_GENERAL_FAQ_ENTRIES.map(({ question, answer }) => (
        <React.Fragment key={question}>
          <h3>{question}</h3>
          <p>{answer}</p>
        </React.Fragment>
      ))}
    </div>
  </>
);
