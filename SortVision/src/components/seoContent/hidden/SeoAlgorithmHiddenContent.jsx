import React from 'react';
import { SEO_ALGORITHM_DEEP_DIVE_FAQ_ENTRIES } from '../shared/seoFaqData';
import { ALGORITHM_DETAILS } from './SeoAlgorithmDetailsMap';
/**
 * File purpose: Renders algorithm-specific hidden SEO content blocks.
 */

export const SeoAlgorithmHiddenContent = ({
  algorithm,
  geoSummary,
  promptHooks,
}) => {
  if (!algorithm) {
    return null;
  }

  const normalizedAlgorithm = algorithm.toLowerCase();
  const details = ALGORITHM_DETAILS[normalizedAlgorithm];
  const algorithmName =
    normalizedAlgorithm.charAt(0).toUpperCase() + normalizedAlgorithm.slice(1);
  const filteredDeepDiveFaq = SEO_ALGORITHM_DEEP_DIVE_FAQ_ENTRIES.filter(
    entry =>
      entry.question.toLowerCase().includes(normalizedAlgorithm) ||
      entry.answer.toLowerCase().includes(normalizedAlgorithm)
  );

  return (
    <div className="sr-only" aria-hidden="true">
      <div data-geo="ai-summary" style={{ display: 'none' }}>
        {geoSummary}
      </div>

      <div data-geo="prompt-hooks" style={{ display: 'none' }}>
        {promptHooks.map((hook, index) => (
          <p key={index}>{hook}</p>
        ))}
      </div>

      <h2>
        {algorithmName} Sort Algorithm Visualizer – Master DSA with SortVision
      </h2>
      <p>
        Experience our advanced interactive {normalizedAlgorithm} sort
        visualizer with professional-grade step-by-step animations, detailed
        performance tracking, recursion behavior visualization, and
        comprehensive complexity analysis for interview and production-level
        understanding.
      </p>

      {details ? (
        <>
          <h3>{algorithmName} Sort Complexity and Characteristics</h3>
          <ul>
            <li>Best Time Complexity: {details.timeComplexity.best}</li>
            <li>Average Time Complexity: {details.timeComplexity.average}</li>
            <li>Worst Time Complexity: {details.timeComplexity.worst}</li>
            <li>Space Complexity: {details.spaceComplexity}</li>
            <li>Stable: {details.stable ? 'Yes' : 'No'}</li>
            <li>In-Place: {details.inPlace ? 'Yes' : 'No'}</li>
          </ul>

          <h3>{algorithmName} Sort Use Cases</h3>
          <ul>
            {details.useCases.map(useCase => (
              <li key={useCase}>{useCase}</li>
            ))}
          </ul>

          <h3>{algorithmName} Sort Real-World Applications</h3>
          <ul>
            {details.realWorldUse.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3>{algorithmName} Sort Interview Tips</h3>
          <ul>
            {details.interviewTips.map(tip => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>

          <h3>Why Learn {algorithmName} Sort First</h3>
          <p>{details.whyLearnFirst}</p>

          <h3>Common {algorithmName} Sort Interview Mistakes</h3>
          <ul>
            {details.commonMistakes.map(mistake => (
              <li key={mistake}>{mistake}</li>
            ))}
          </ul>

          {filteredDeepDiveFaq.length > 0 && (
            <>
              <h3>{algorithmName} Sort Deep-Dive FAQ</h3>
              {filteredDeepDiveFaq.map(({ question, answer }) => (
                <React.Fragment key={`${normalizedAlgorithm}-${question}`}>
                  <h4>{question}</h4>
                  <p>{answer}</p>
                </React.Fragment>
              ))}
            </>
          )}
        </>
      ) : (
        <p>
          Detailed algorithm data is being prepared for {algorithmName} sort.
          Core visualization and complexity coverage remain available.
        </p>
      )}
    </div>
  );
};
