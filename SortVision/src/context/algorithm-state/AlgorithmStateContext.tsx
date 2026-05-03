import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react';
import type { CurrentBarState } from '@/algorithms/types';

/** Re-export canonical bar highlight shape used by sorting algorithms. */
export type { CurrentBarState };

/**
 * Active step while sorting: bar indices (and optional description), or a scalar
 * legacy value (string/number). Use `kind` for safe narrowing.
 */
export type AlgorithmBarHighlightStep = {
  kind: 'bar_highlight';
} & CurrentBarState & {
    description?: string | null;
  };

export type AlgorithmScalarStep = {
  kind: 'scalar';
  value: string | number;
};

export type AlgorithmStepState =
  | AlgorithmBarHighlightStep
  | AlgorithmScalarStep
  | null
  | undefined;

/** Flattened step shape passed to the assistant / API (JSON-friendly). */
export type AlgorithmContextStepSnapshot = {
  compare: number | null;
  swap: number | null;
  description: string | number | null;
};

export type AlgorithmContextSnapshot = {
  algorithm: string;
  step: AlgorithmContextStepSnapshot;
  array: number[];
};

export type AlgorithmChatHistoryEntry = {
  kind: 'chat_turn';
  question: string;
  answer: string;
};

export type AlgorithmHistoryEntry = AlgorithmChatHistoryEntry;

export type AlgorithmStateContextValue = {
  algorithmName: string | null;
  setAlgorithmName: Dispatch<SetStateAction<string | null>>;
  step: AlgorithmStepState;
  setStep: Dispatch<SetStateAction<AlgorithmStepState>>;
  array: number[];
  setArray: Dispatch<SetStateAction<number[]>>;
  history: AlgorithmHistoryEntry[];
  addToHistory: (entry: AlgorithmHistoryEntry) => void;
  getContextObject: () => AlgorithmContextSnapshot;
};

function normalizeStepForSnapshot(
  step: AlgorithmStepState
): AlgorithmContextStepSnapshot {
  if (step == null) {
    return { compare: null, swap: null, description: null };
  }
  if (step.kind === 'bar_highlight') {
    return {
      compare: step.compare,
      swap: step.swap,
      description: step.description ?? null,
    };
  }
  return {
    compare: null,
    swap: null,
    description: step.value,
  };
}

const AlgorithmStateContext = createContext<AlgorithmStateContextValue | null>(
  null
);

export const AlgorithmStateProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [algorithmName, setAlgorithmName] = useState<string | null>(null);
  const [step, setStep] = useState<AlgorithmStepState>(null);
  const [array, setArray] = useState<number[]>([]);
  const [history, setHistory] = useState<AlgorithmHistoryEntry[]>([]);

  const contextValue = useMemo<AlgorithmStateContextValue>(() => {
    const getContextObject = (): AlgorithmContextSnapshot => ({
      algorithm: algorithmName ?? 'Unknown',
      step: normalizeStepForSnapshot(step),
      array: Array.isArray(array) ? array : [],
    });

    const addToHistory = (entry: AlgorithmHistoryEntry) => {
      setHistory(prev => [...prev, entry]);
    };

    return {
      algorithmName,
      setAlgorithmName,
      step,
      setStep,
      array,
      setArray,
      history,
      addToHistory,
      getContextObject,
    };
  }, [algorithmName, step, array, history]);

  return (
    <AlgorithmStateContext.Provider value={contextValue}>
      {children}
    </AlgorithmStateContext.Provider>
  );
};

export const useAlgorithmState = (): AlgorithmStateContextValue => {
  const context = useContext(AlgorithmStateContext);
  if (!context) {
    throw new Error(
      'useAlgorithmState must be used within AlgorithmStateProvider'
    );
  }
  return context;
};
