import { act } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useVisualizerRouteSync } from './useVisualizerRouteSync';
import type { SortingAlgorithmId } from './algorithmRegistry';

describe('useVisualizerRouteSync', () => {
  it('returns handleAlgorithmChange function', () => {
    const mockSetAlgorithm = vi.fn();
    const { result } = renderHook(() =>
      useVisualizerRouteSync({
        algorithm: 'bubble' as SortingAlgorithmId,
        setAlgorithm: mockSetAlgorithm,
      })
    );

    expect(result.current.handleAlgorithmChange).toBeDefined();
    expect(typeof result.current.handleAlgorithmChange).toBe('function');
  });

  it('returns nextAlgorithm function', () => {
    const mockSetAlgorithm = vi.fn();
    const { result } = renderHook(() =>
      useVisualizerRouteSync({
        algorithm: 'bubble' as SortingAlgorithmId,
        setAlgorithm: mockSetAlgorithm,
      })
    );

    expect(result.current.nextAlgorithm).toBeDefined();
    expect(typeof result.current.nextAlgorithm).toBe('function');
  });

  it('returns prevAlgorithm function', () => {
    const mockSetAlgorithm = vi.fn();
    const { result } = renderHook(() =>
      useVisualizerRouteSync({
        algorithm: 'bubble' as SortingAlgorithmId,
        setAlgorithm: mockSetAlgorithm,
      })
    );

    expect(result.current.prevAlgorithm).toBeDefined();
    expect(typeof result.current.prevAlgorithm).toBe('function');
  });

  it('handleAlgorithmChange calls setAlgorithm with new algorithm', () => {
    const mockSetAlgorithm = vi.fn();
    const { result } = renderHook(() =>
      useVisualizerRouteSync({
        algorithm: 'bubble' as SortingAlgorithmId,
        setAlgorithm: mockSetAlgorithm,
      })
    );

    act(() => {
      result.current.handleAlgorithmChange('quick' as SortingAlgorithmId);
    });

    expect(mockSetAlgorithm).toHaveBeenCalledWith('quick');
  });

  it('navigates to next algorithm', () => {
    const mockSetAlgorithm = vi.fn();
    const { result } = renderHook(() =>
      useVisualizerRouteSync({
        algorithm: 'bubble' as SortingAlgorithmId,
        setAlgorithm: mockSetAlgorithm,
      })
    );

    act(() => {
      result.current.nextAlgorithm();
    });

    expect(mockSetAlgorithm).toHaveBeenCalled();
  });

  it('navigates to previous algorithm', () => {
    const mockSetAlgorithm = vi.fn();
    const { result } = renderHook(() =>
      useVisualizerRouteSync({
        algorithm: 'quick' as SortingAlgorithmId,
        setAlgorithm: mockSetAlgorithm,
      })
    );

    act(() => {
      result.current.prevAlgorithm();
    });

    expect(mockSetAlgorithm).toHaveBeenCalled();
  });
});
