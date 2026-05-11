import { describe, it, expect, vi } from 'vitest';
import { useSortingActions } from './useSortingActions';
import { renderHook } from '@testing-library/react';
import type { SortingAlgorithmId } from './algorithmRegistry';

const createMockRefs = () => ({
  sortPausedRef: { current: false },
  sortUserCancelRequestedRef: { current: false },
  sortVisualizerSessionRef: { current: 0 },
  generateNewArrayRef: { current: vi.fn() },
});

const createMockState = () => ({
  array: [5, 3, 8, 1, 9] as number[],
  setArray: vi.fn(),
  algorithm: 'bubble' as SortingAlgorithmId,
  setAlgorithm: vi.fn(),
  arraySize: 20,
  setArraySize: vi.fn(),
  isSorting: false,
  setIsSorting: vi.fn(),
  isPaused: false,
  setIsPaused: vi.fn(),
  isStopped: true,
  setIsStopped: vi.fn(),
  speed: 50,
  setSpeed: vi.fn(),
  currentBar: { indices: [], color: 'default' as const },
  setCurrentBar: vi.fn(),
});

describe('useSortingActions', () => {
  it('returns actions object', () => {
    const refs = createMockRefs();
    const state = createMockState();

    const { result } = renderHook(() =>
      useSortingActions({
        ...state,
        abortSortingRunner: vi.fn(),
        playAccessSound: vi.fn(),
        sortVisualizerSessionRef: refs.sortVisualizerSessionRef,
        sortPausedRef: refs.sortPausedRef,
        sortUserCancelRequestedRef: refs.sortUserCancelRequestedRef,
        startSorting: vi.fn(),
        currentTestingAlgo: null,
        abortActiveVisualization: vi.fn(),
      })
    );

    expect(result.current).toHaveProperty('playPause');
    expect(result.current).toHaveProperty('generateNewArray');
    expect(result.current).toHaveProperty('shuffleArray');
    expect(result.current).toHaveProperty('resetVisualization');
    expect(result.current).toHaveProperty('increaseSpeed');
    expect(result.current).toHaveProperty('decreaseSpeed');
    expect(result.current).toHaveProperty('stopTestAllSorting');
    expect(result.current.generateNewArrayRef).toBeDefined();
  });

  it('generateNewArrayRef is ref with current', () => {
    const refs = createMockRefs();
    const state = createMockState();

    const { result } = renderHook(() =>
      useSortingActions({
        ...state,
        abortSortingRunner: vi.fn(),
        playAccessSound: vi.fn(),
        sortVisualizerSessionRef: refs.sortVisualizerSessionRef,
        sortPausedRef: refs.sortPausedRef,
        sortUserCancelRequestedRef: refs.sortUserCancelRequestedRef,
        startSorting: vi.fn(),
        currentTestingAlgo: null,
        abortActiveVisualization: vi.fn(),
      })
    );

    expect(result.current.generateNewArrayRef).toHaveProperty('current');
    expect(typeof result.current.generateNewArrayRef.current).toBe('function');
  });

  it('shuffleArray is a function', () => {
    const refs = createMockRefs();
    const state = createMockState();

    const { result } = renderHook(() =>
      useSortingActions({
        ...state,
        abortSortingRunner: vi.fn(),
        playAccessSound: vi.fn(),
        sortVisualizerSessionRef: refs.sortVisualizerSessionRef,
        sortPausedRef: refs.sortPausedRef,
        sortUserCancelRequestedRef: refs.sortUserCancelRequestedRef,
        startSorting: vi.fn(),
        currentTestingAlgo: null,
        abortActiveVisualization: vi.fn(),
      })
    );

    expect(typeof result.current.shuffleArray).toBe('function');
  });

  it('resetVisualization is a function', () => {
    const refs = createMockRefs();
    const state = createMockState();

    const { result } = renderHook(() =>
      useSortingActions({
        ...state,
        abortSortingRunner: vi.fn(),
        playAccessSound: vi.fn(),
        sortVisualizerSessionRef: refs.sortVisualizerSessionRef,
        sortPausedRef: refs.sortPausedRef,
        sortUserCancelRequestedRef: refs.sortUserCancelRequestedRef,
        startSorting: vi.fn(),
        currentTestingAlgo: null,
        abortActiveVisualization: vi.fn(),
      })
    );

    expect(typeof result.current.resetVisualization).toBe('function');
  });

  it('increaseSpeed is a function', () => {
    const refs = createMockRefs();
    const state = createMockState();

    const { result } = renderHook(() =>
      useSortingActions({
        ...state,
        abortSortingRunner: vi.fn(),
        playAccessSound: vi.fn(),
        sortVisualizerSessionRef: refs.sortVisualizerSessionRef,
        sortPausedRef: refs.sortPausedRef,
        sortUserCancelRequestedRef: refs.sortUserCancelRequestedRef,
        startSorting: vi.fn(),
        currentTestingAlgo: null,
        abortActiveVisualization: vi.fn(),
      })
    );

    expect(typeof result.current.increaseSpeed).toBe('function');
  });

  it('decreaseSpeed is a function', () => {
    const refs = createMockRefs();
    const state = createMockState();

    const { result } = renderHook(() =>
      useSortingActions({
        ...state,
        abortSortingRunner: vi.fn(),
        playAccessSound: vi.fn(),
        sortVisualizerSessionRef: refs.sortVisualizerSessionRef,
        sortPausedRef: refs.sortPausedRef,
        sortUserCancelRequestedRef: refs.sortUserCancelRequestedRef,
        startSorting: vi.fn(),
        currentTestingAlgo: null,
        abortActiveVisualization: vi.fn(),
      })
    );

    expect(typeof result.current.decreaseSpeed).toBe('function');
  });

  it('stopTestAllSorting is a function', () => {
    const refs = createMockRefs();
    const state = createMockState();

    const { result } = renderHook(() =>
      useSortingActions({
        ...state,
        abortSortingRunner: vi.fn(),
        playAccessSound: vi.fn(),
        sortVisualizerSessionRef: refs.sortVisualizerSessionRef,
        sortPausedRef: refs.sortPausedRef,
        sortUserCancelRequestedRef: refs.sortUserCancelRequestedRef,
        startSorting: vi.fn(),
        currentTestingAlgo: null,
        abortActiveVisualization: vi.fn(),
      })
    );

    expect(typeof result.current.stopTestAllSorting).toBe('function');
  });

  it('playPause is a function', () => {
    const refs = createMockRefs();
    const state = createMockState();

    const { result } = renderHook(() =>
      useSortingActions({
        ...state,
        abortSortingRunner: vi.fn(),
        playAccessSound: vi.fn(),
        sortVisualizerSessionRef: refs.sortVisualizerSessionRef,
        sortPausedRef: refs.sortPausedRef,
        sortUserCancelRequestedRef: refs.sortUserCancelRequestedRef,
        startSorting: vi.fn(),
        currentTestingAlgo: null,
        abortActiveVisualization: vi.fn(),
      })
    );

    expect(typeof result.current.playPause).toBe('function');
  });
});
