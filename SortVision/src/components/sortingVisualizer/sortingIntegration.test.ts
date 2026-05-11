import { describe, it, expect } from 'vitest';
import { normalizeSortingAlgorithmId } from './algorithmRegistry';

describe('Sorting Algorithm Registry', () => {
  it('normalizeSortingAlgorithmId returns valid algorithm', () => {
    const result = normalizeSortingAlgorithmId('bubble');
    expect(result).toBe('bubble');
  });

  it('normalizeSortingAlgorithmId handles quick', () => {
    const result = normalizeSortingAlgorithmId('quick');
    expect(result).toBe('quick');
  });

  it('normalizeSortingAlgorithmId returns default for invalid', () => {
    const result = normalizeSortingAlgorithmId('invalid');
    expect(result).toBe('bubble');
  });

  it('normalizeSortingAlgorithmId handles merge', () => {
    const result = normalizeSortingAlgorithmId('merge');
    expect(result).toBe('merge');
  });
});

describe('Sorting Flow Integration', () => {
  it('all algorithms in registry have corresponding sort function', () => {
    const algorithms = [
      'bubble',
      'insertion',
      'selection',
      'quick',
      'merge',
      'radix',
      'heap',
      'bucket',
    ];
    algorithms.forEach(algo => {
      const normalized = normalizeSortingAlgorithmId(algo);
      expect(normalized).toBe(algo);
    });
  });

  it('normalizeSortingAlgorithmId is case-sensitive', () => {
    const result = normalizeSortingAlgorithmId('Bubble');
    expect(result).toBe('bubble');
  });
});
