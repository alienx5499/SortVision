import { useMemo, type RefObject } from 'react';
import { useKeyboardShortcuts } from '@/hooks';
import type { SortingVisualizerHandle } from '@/components/sortingVisualizer/SortingVisualizer';

type UseMainShortcutsParams = {
  sortingRef: RefObject<SortingVisualizerHandle | null>;
  setSettingsOpen: (open: boolean | ((v: boolean) => boolean)) => void;
  setChatOpen: (open: boolean | ((v: boolean) => boolean)) => void;
  setFeedbackOpen: (open: boolean | ((v: boolean) => boolean)) => void;
};

export const useMainShortcuts = ({
  sortingRef,
  setSettingsOpen,
  setChatOpen,
  setFeedbackOpen,
}: UseMainShortcutsParams) => {
  const shortcuts = useMemo(
    () => ({
      ' ': () => sortingRef.current?.playPause(),
      r: () => sortingRef.current?.resetVisualization(),
      R: () => sortingRef.current?.resetVisualization(),
      n: () => sortingRef.current?.generateNewArray?.(),
      N: () => sortingRef.current?.generateNewArray?.(),
      s: () => sortingRef.current?.shuffleArray(),
      S: () => sortingRef.current?.shuffleArray(),
      '+': () => sortingRef.current?.increaseSpeed(),
      '=': () => sortingRef.current?.increaseSpeed(),
      '-': () => sortingRef.current?.decreaseSpeed(),
      _: () => sortingRef.current?.decreaseSpeed(),
      ArrowRight: () => sortingRef.current?.nextAlgorithm(),
      ArrowLeft: () => sortingRef.current?.prevAlgorithm(),
      h: () => setSettingsOpen(true),
      H: () => setSettingsOpen(true),
      '?': () => setSettingsOpen(true),
      c: () => setChatOpen(v => !v),
      C: () => setChatOpen(v => !v),
      f: () => setFeedbackOpen(v => !v),
      F: () => setFeedbackOpen(v => !v),
      g: () => setSettingsOpen(v => !v),
      G: () => setSettingsOpen(v => !v),
    }),
    [sortingRef, setSettingsOpen, setChatOpen, setFeedbackOpen]
  );

  useKeyboardShortcuts(shortcuts);
};
