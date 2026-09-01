import { describe, expect, it } from 'vitest';
import { getStepExplanation } from './stepExplanation';

describe('getStepExplanation', () => {
  it('explains highlighted comparisons with live values', () => {
    const explanation = getStepExplanation({
      algorithm: 'bubble',
      array: [8, 3, 5],
      currentBar: { compare: 0, swap: 1 },
      isSorting: true,
      isStopped: false,
    });

    expect(explanation.status).toBe('running');
    expect(explanation.title).toBe('Comparing highlighted values');
    expect(explanation.detail).toContain('index 0 = 8');
    expect(explanation.detail).toContain('index 1 = 3');
    expect(explanation.currentFocus).toContain('neighboring values');
    expect(explanation.currentFocus).toContain('8 is greater than 3');
    expect(explanation.decisionRule).toContain('left value is larger');
    expect(explanation.walkthrough).toHaveLength(4);
  });

  it('uses the benchmark algorithm when test-all mode is active', () => {
    const explanation = getStepExplanation({
      algorithm: 'bubble',
      currentTestingAlgo: 'quick',
      array: [2, 1],
      currentBar: { compare: 1, swap: null },
      isSorting: true,
      isStopped: false,
    });

    expect(explanation.algorithmLabel).toBe('Quick Sort');
    expect(explanation.reason).toContain('pivot');
    expect(explanation.currentFocus).toContain('pivot');
  });
});
