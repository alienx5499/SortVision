import React from 'react';
import AlgorithmSelectorCard from './algorithmSelector/AlgorithmSelectorCard';
import type { AlgorithmSelectorProps } from './configPanelContracts';

/** Thin wrapper to keep public import path stable. */
const AlgorithmSelector = (props: AlgorithmSelectorProps) => (
  <AlgorithmSelectorCard {...props} />
);

export default AlgorithmSelector;
