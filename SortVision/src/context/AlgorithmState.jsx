// AlgorithmState.jsx
import React, { createContext, useContext, useState } from 'react';

// Create the context with a default value
const AlgorithmStateContext = createContext({
  algorithmName: null,
  setAlgorithmName: () => {},
  step: null,
  setStep: () => {},
  array: [],
  setArray: () => {},
  history: [],
  addToHistory: () => {},
  getContextObject: () => ({
    algorithm: 'Unknown',
    step: { compare: null, swap: null, description: null },
    array: [],
  }),
});

export const AlgorithmStateProvider = ({ children }) => {
  // Initialize state with default values
  const [algorithmName, setAlgorithmName] = useState(null);
  const [step, setStep] = useState(null);
  const [array, setArray] = useState([]);
  const [history, setHistory] = useState([]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(() => {
    const getContextObject = () => {
      let normalizedStep;

      if (typeof step !== 'object' || step === null) {
        normalizedStep = {
          compare: null,
          swap: null,
          description:
            typeof step === 'string' || typeof step === 'number' ? step : null,
        };
      } else {
        normalizedStep = {
          compare: step.compare ?? null,
          swap: step.swap ?? null,
          description: step.description ?? null,
        };
      }

      return {
        algorithm: algorithmName ?? 'Unknown',
        step: normalizedStep,
        array: Array.isArray(array) ? array : [],
      };
    };

    const addToHistory = entry => {
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

export const useAlgorithmState = () => {
  const context = useContext(AlgorithmStateContext);
  if (!context) {
    throw new Error(
      'useAlgorithmState must be used within AlgorithmStateProvider'
    );
  }
  return context;
};
