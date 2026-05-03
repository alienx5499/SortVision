import type { Dispatch, MutableRefObject, SetStateAction } from 'react';

/**
 * Highlight state for the visualizer bars (compare / swap indices).
 * `null` means no highlight for that role.
 */
export type CurrentBarState = {
  compare: number | null;
  swap: number | null;
};

/**
 * Counters returned after a sort completes (for metrics UI).
 */
export type SortStepMetrics = {
  swaps: number;
  comparisons: number;
};

/**
 * Minimal audio surface used by sorting implementations.
 * Keeps algorithms decoupled from the full `useAudio` return type.
 */
export type SortingAlgorithmAudio = {
  playCompareSound: (value?: number) => void;
  playSwapSound: (value?: number) => void;
  playAccessSound: (value?: number) => void;
  playCompleteSound: () => void;
  playPivotSound: (value?: number) => void;
  playMergeSound: (value?: number) => void;
};

export type ShouldStopRef = MutableRefObject<boolean>;

/** When true, {@link delayStep} blocks until cleared (pause without aborting). */
export type SortPausedRef = MutableRefObject<boolean>;

export type SortStepDelayRefs = {
  shouldStopRef: ShouldStopRef;
  sortPausedRef: SortPausedRef;
};

/**
 * Signature for all visualizer-driven sorting functions.
 */
export type SortingAlgorithm = (
  array: number[],
  visualizeArray: Dispatch<SetStateAction<number[]>>,
  delay: number,
  setCurrentBar: Dispatch<SetStateAction<CurrentBarState>>,
  shouldStopRef: ShouldStopRef,
  sortPausedRef: SortPausedRef,
  audio: SortingAlgorithmAudio
) => Promise<SortStepMetrics>;
