import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSortingState } from './useSortingState';

describe('useSortingState - Full Integration', () => {
  it('initializes with bubble sort algorithm', () => {
    const { result } = renderHook(() => useSortingState('bubble'));
    expect(result.current.algorithm).toBe('bubble');
  });

  it('initializes with quick sort algorithm', () => {
    const { result } = renderHook(() => useSortingState('quick'));
    expect(result.current.algorithm).toBe('quick');
  });

  it('initializes with merge sort algorithm', () => {
    const { result } = renderHook(() => useSortingState('merge'));
    expect(result.current.algorithm).toBe('merge');
  });

  it('initializes with heap sort algorithm', () => {
    const { result } = renderHook(() => useSortingState('heap'));
    expect(result.current.algorithm).toBe('heap');
  });

  it('initializes with radix sort algorithm', () => {
    const { result } = renderHook(() => useSortingState('radix'));
    expect(result.current.algorithm).toBe('radix');
  });

  it('initializes with bucket sort algorithm', () => {
    const { result } = renderHook(() => useSortingState('bucket'));
    expect(result.current.algorithm).toBe('bucket');
  });

  it('initializes with insertion sort algorithm', () => {
    const { result } = renderHook(() => useSortingState('insertion'));
    expect(result.current.algorithm).toBe('insertion');
  });

  it('initializes with selection sort algorithm', () => {
    const { result } = renderHook(() => useSortingState('selection'));
    expect(result.current.algorithm).toBe('selection');
  });

  it('provides all expected state properties', () => {
    const { result } = renderHook(() => useSortingState('bubble'));

    expect(result.current).toHaveProperty('array');
    expect(result.current).toHaveProperty('algorithm');
    expect(result.current).toHaveProperty('arraySize');
    expect(result.current).toHaveProperty('isSorting');
    expect(result.current).toHaveProperty('isPaused');
    expect(result.current).toHaveProperty('isStopped');
    expect(result.current).toHaveProperty('speed');
    expect(result.current).toHaveProperty('currentBar');
  });

  it('provides all expected setter functions', () => {
    const { result } = renderHook(() => useSortingState('bubble'));

    expect(result.current).toHaveProperty('setArray');
    expect(result.current).toHaveProperty('setAlgorithm');
    expect(result.current).toHaveProperty('setArraySize');
    expect(result.current).toHaveProperty('setIsSorting');
    expect(result.current).toHaveProperty('setIsPaused');
    expect(result.current).toHaveProperty('setIsStopped');
    expect(result.current).toHaveProperty('setSpeed');
    expect(result.current).toHaveProperty('setCurrentBar');
  });

  it('currentBar has correct structure', () => {
    const { result } = renderHook(() => useSortingState('bubble'));

    expect(result.current.currentBar).toHaveProperty('compare');
    expect(result.current.currentBar).toHaveProperty('swap');
  });

  it('isSorting defaults to false', () => {
    const { result } = renderHook(() => useSortingState('bubble'));
    expect(result.current.isSorting).toBe(false);
  });

  it('isPaused defaults to false', () => {
    const { result } = renderHook(() => useSortingState('bubble'));
    expect(result.current.isPaused).toBe(false);
  });

  it('isStopped state is boolean', () => {
    const { result } = renderHook(() => useSortingState('bubble'));
    expect(typeof result.current.isStopped).toBe('boolean');
  });
});
