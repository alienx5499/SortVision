import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSortingState } from './useSortingState';
import type { SortingAlgorithmId } from './algorithmRegistry';

describe('useSortingState - Stress Tests', () => {
  it('handles rapid state changes', () => {
    const { result } = renderHook(() => useSortingState('bubble'));

    act(() => {
      result.current.setIsSorting(true);
      result.current.setIsPaused(true);
      result.current.setIsStopped(false);
    });

    expect(result.current.isSorting).toBe(true);
    expect(result.current.isPaused).toBe(true);
    expect(result.current.isStopped).toBe(false);
  });

  it('handles large array size', () => {
    const { result } = renderHook(() => useSortingState('bubble'));

    act(() => {
      result.current.setArraySize(500);
    });

    expect(result.current.arraySize).toBe(500);
  });

  it('handles extreme speed values', () => {
    const { result } = renderHook(() => useSortingState('bubble'));

    act(() => {
      result.current.setSpeed(1);
    });
    expect(result.current.speed).toBe(1);
  });

  it('cycles through all algorithms', () => {
    const algorithms: SortingAlgorithmId[] = [
      'bubble',
      'insertion',
      'selection',
      'quick',
      'merge',
      'radix',
      'heap',
      'bucket',
    ];
    const { result } = renderHook(() => useSortingState('bubble'));

    algorithms.forEach(algo => {
      act(() => {
        result.current.setAlgorithm(algo);
      });
      expect(result.current.algorithm).toBe(algo);
    });
  });

  it('maintains state after multiple re-renders', () => {
    const { result } = renderHook(() => useSortingState('bubble'));

    act(() => {
      result.current.setIsSorting(true);
    });

    // Trigger re-renders
    for (let i = 0; i < 5; i++) {
      act(() => {
        result.current.setAlgorithm(
          i % 2 === 0 ? 'bubble' : ('quick' as SortingAlgorithmId)
        );
      });
    }

    expect(result.current.isSorting).toBe(true);
  });

  it('handles zero array size', () => {
    const { result } = renderHook(() => useSortingState('bubble'));

    act(() => {
      result.current.setArraySize(0);
    });

    expect(result.current.arraySize).toBe(0);
  });

  it('handles negative speed (edge case)', () => {
    const { result } = renderHook(() => useSortingState('bubble'));

    act(() => {
      result.current.setSpeed(-10);
    });

    expect(result.current.speed).toBe(-10);
  });

  it('handles concurrent setter calls', () => {
    const { result } = renderHook(() => useSortingState('bubble'));

    act(() => {
      result.current.setAlgorithm('quick' as SortingAlgorithmId);
      result.current.setArraySize(100);
      result.current.setSpeed(200);
      result.current.setIsSorting(true);
    });

    expect(result.current.algorithm).toBe('quick');
    expect(result.current.arraySize).toBe(100);
    expect(result.current.speed).toBe(200);
    expect(result.current.isSorting).toBe(true);
  });
});
