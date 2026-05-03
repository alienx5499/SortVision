import { useEffect } from 'react';
import type { AlgorithmStateContextValue } from '@/context/algorithm-state';
import type { VisualizerBarHighlight } from './visualizerBarState';

type BridgeParams = Pick<
  AlgorithmStateContextValue,
  'setAlgorithmName' | 'setArray' | 'setStep'
> & {
  algorithm: string;
  array: number[];
  currentBar: VisualizerBarHighlight;
};

export function useVisualizerContextBridge({
  algorithm,
  array,
  currentBar,
  setAlgorithmName,
  setArray: setContextArray,
  setStep,
}: BridgeParams) {
  useEffect(() => {
    setAlgorithmName(algorithm);
  }, [algorithm, setAlgorithmName]);

  useEffect(() => {
    setContextArray(array);
  }, [array, setContextArray]);

  useEffect(() => {
    setStep(currentBar);
  }, [currentBar, setStep]);
}
