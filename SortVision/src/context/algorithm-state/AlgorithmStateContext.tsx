import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react';

export type CurrentBarState = {
  compare: unknown;
  swap: unknown;
};

export type AlgorithmStepState =
  | CurrentBarState
  | string
  | number
  | null
  | undefined;

export type AlgorithmContextSnapshot = {
  algorithm: string;
  step: {
    compare: unknown;
    swap: unknown;
    description: unknown;
  };
  array: number[];
};

export type AlgorithmStateContextValue = {
  algorithmName: string | null;
  setAlgorithmName: Dispatch<SetStateAction<string | null>>;
  step: AlgorithmStepState;
  setStep: Dispatch<SetStateAction<AlgorithmStepState>>;
  array: number[];
  setArray: Dispatch<SetStateAction<number[]>>;
  history: unknown[];
  addToHistory: (entry: unknown) => void;
  getContextObject: () => AlgorithmContextSnapshot;
};

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
  const [history, setHistory] = useState<unknown[]>([]);

  const contextValue = useMemo<AlgorithmStateContextValue>(() => {
    const getContextObject = (): AlgorithmContextSnapshot => {
      let normalizedStep: {
        compare: unknown;
        swap: unknown;
        description: unknown;
      };

      if (typeof step !== 'object' || step === null) {
        normalizedStep = {
          compare: null,
          swap: null,
          description:
            typeof step === 'string' || typeof step === 'number' ? step : null,
        };
      } else {
        const o = step as Record<string, unknown>;
        normalizedStep = {
          compare: o.compare ?? null,
          swap: o.swap ?? null,
          description: o.description ?? null,
        };
      }

      return {
        algorithm: algorithmName ?? 'Unknown',
        step: normalizedStep,
        array: Array.isArray(array) ? array : [],
      };
    };

    const addToHistory = (entry: unknown) => {
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
