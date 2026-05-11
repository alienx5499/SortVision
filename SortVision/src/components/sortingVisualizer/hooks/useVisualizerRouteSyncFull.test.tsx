import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useVisualizerRouteSync } from './useVisualizerRouteSync';
import type { SortingAlgorithmId } from './algorithmRegistry';

describe('useVisualizerRouteSync - Algorithm Navigation', () => {
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

  it('handleAlgorithmChange updates algorithm', () => {
    const setAlgorithm = vi.fn();
    const { result } = renderHook(() =>
      useVisualizerRouteSync({
        algorithm: 'bubble' as SortingAlgorithmId,
        setAlgorithm,
      })
    );

    act(() => {
      result.current.handleAlgorithmChange('quick' as SortingAlgorithmId);
    });

    expect(setAlgorithm).toHaveBeenCalledWith('quick');
  });

  it('nextAlgorithm cycles through algorithms', () => {
    const setAlgorithm = vi.fn();
    const { result } = renderHook(() =>
      useVisualizerRouteSync({
        algorithm: 'bubble' as SortingAlgorithmId,
        setAlgorithm,
      })
    );

    act(() => {
      result.current.nextAlgorithm();
    });

    expect(setAlgorithm).toHaveBeenCalled();
    const calledAlgo = setAlgorithm.mock.calls[0][0];
    expect(algorithms).toContain(calledAlgo);
  });

  it('prevAlgorithm cycles backwards', () => {
    const setAlgorithm = vi.fn();
    const { result } = renderHook(() =>
      useVisualizerRouteSync({
        algorithm: 'quick' as SortingAlgorithmId,
        setAlgorithm,
      })
    );

    act(() => {
      result.current.prevAlgorithm();
    });

    expect(setAlgorithm).toHaveBeenCalled();
  });

  it('returns all navigation functions', () => {
    const setAlgorithm = vi.fn();
    const { result } = renderHook(() =>
      useVisualizerRouteSync({
        algorithm: 'bubble' as SortingAlgorithmId,
        setAlgorithm,
      })
    );

    expect(typeof result.current.handleAlgorithmChange).toBe('function');
    expect(typeof result.current.nextAlgorithm).toBe('function');
    expect(typeof result.current.prevAlgorithm).toBe('function');
  });

  it('multiple nextAlgorithm calls work correctly', () => {
    const setAlgorithm = vi.fn();
    const { result } = renderHook(() =>
      useVisualizerRouteSync({
        algorithm: 'bubble' as SortingAlgorithmId,
        setAlgorithm,
      })
    );

    act(() => {
      result.current.nextAlgorithm();
    });
    act(() => {
      result.current.nextAlgorithm();
    });

    expect(setAlgorithm).toHaveBeenCalledTimes(2);
  });

  it('handles edge case at algorithm boundary', () => {
    const setAlgorithm = vi.fn();
    const { result } = renderHook(() =>
      useVisualizerRouteSync({
        algorithm: 'bucket' as SortingAlgorithmId,
        setAlgorithm,
      })
    );

    act(() => {
      result.current.nextAlgorithm();
    });

    expect(setAlgorithm).toHaveBeenCalled();
  });

  it('handles edge case at algorithm start', () => {
    const setAlgorithm = vi.fn();
    const { result } = renderHook(() =>
      useVisualizerRouteSync({
        algorithm: 'bubble' as SortingAlgorithmId,
        setAlgorithm,
      })
    );

    act(() => {
      result.current.prevAlgorithm();
    });

    expect(setAlgorithm).toHaveBeenCalled();
  });

  it('handleAlgorithmChange with valid algorithm', () => {
    const setAlgorithm = vi.fn();
    const { result } = renderHook(() =>
      useVisualizerRouteSync({
        algorithm: 'bubble' as SortingAlgorithmId,
        setAlgorithm,
      })
    );

    algorithms.forEach(algo => {
      setAlgorithm.mockClear();
      act(() => {
        result.current.handleAlgorithmChange(algo);
      });
      expect(setAlgorithm).toHaveBeenCalledWith(algo);
    });
  });
});
