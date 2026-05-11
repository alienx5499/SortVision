import { act } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSortingState } from './useSortingState';
import type { SortingAlgorithmId } from './algorithmRegistry';

describe('useSortingState - Edge Cases', () => {
  it('handles algorithm change via setAlgorithm', () => {
    const { result } = renderHook(() => useSortingState('bubble'));
    act(() => {
      result.current.setAlgorithm('merge' as SortingAlgorithmId);
    });
    expect(result.current.algorithm).toBe('merge');
  });

  it('handles array size change via setArraySize', () => {
    const { result } = renderHook(() => useSortingState('bubble'));
    act(() => {
      result.current.setArraySize(100);
    });
    expect(result.current.arraySize).toBe(100);
  });

  it('handles speed change via setSpeed', () => {
    const { result } = renderHook(() => useSortingState('bubble'));
    act(() => {
      result.current.setSpeed(200);
    });
    expect(result.current.speed).toBe(200);
  });

  it('handles multiple state changes', () => {
    const { result } = renderHook(() => useSortingState('bubble'));

    act(() => {
      result.current.setAlgorithm('quick' as SortingAlgorithmId);
      result.current.setIsSorting(true);
      result.current.setIsPaused(true);
    });

    expect(result.current.algorithm).toBe('quick');
    expect(result.current.isSorting).toBe(true);
    expect(result.current.isPaused).toBe(true);
  });

  it('setCurrentBar updates current bar state', () => {
    const { result } = renderHook(() => useSortingState('bubble'));
    const newBar = { indices: [0, 1], color: 'comparing' as const };

    act(() => {
      result.current.setCurrentBar(newBar);
    });

    expect(result.current.currentBar).toEqual(newBar);
  });

  it('setIsStopped updates isStopped state', () => {
    const { result } = renderHook(() => useSortingState('bubble'));
    act(() => {
      result.current.setIsStopped(false);
    });
    expect(result.current.isStopped).toBe(false);
  });

  it('can toggle isSorting from true to false', () => {
    const { result } = renderHook(() => useSortingState('bubble'));

    act(() => {
      result.current.setIsSorting(true);
    });
    expect(result.current.isSorting).toBe(true);

    act(() => {
      result.current.setIsSorting(false);
    });
    expect(result.current.isSorting).toBe(false);
  });

  it('can toggle isPaused from true to false', () => {
    const { result } = renderHook(() => useSortingState('bubble'));

    act(() => {
      result.current.setIsPaused(true);
    });
    expect(result.current.isPaused).toBe(true);

    act(() => {
      result.current.setIsPaused(false);
    });
    expect(result.current.isPaused).toBe(false);
  });

  it('maintains state across multiple renders', () => {
    const { result } = renderHook(() => useSortingState('bubble'));

    act(() => {
      result.current.setIsSorting(true);
    });

    // Trigger re-render by changing algorithm
    act(() => {
      result.current.setAlgorithm('insertion' as SortingAlgorithmId);
    });

    expect(result.current.isSorting).toBe(true);
    expect(result.current.algorithm).toBe('insertion');
  });

  it('all setter functions are defined', () => {
    const { result } = renderHook(() => useSortingState('bubble'));

    expect(typeof result.current.setArray).toBe('function');
    expect(typeof result.current.setAlgorithm).toBe('function');
    expect(typeof result.current.setArraySize).toBe('function');
    expect(typeof result.current.setIsSorting).toBe('function');
    expect(typeof result.current.setIsPaused).toBe('function');
    expect(typeof result.current.setIsStopped).toBe('function');
    expect(typeof result.current.setSpeed).toBe('function');
    expect(typeof result.current.setCurrentBar).toBe('function');
  });
});
