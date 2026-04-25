import React from 'react';
import AlgorithmSelectorCard from './algorithmSelector/AlgorithmSelectorCard';

/**
 * Algorithm Selector Component
 *
 * Thin wrapper to keep public import path stable.
 */
const AlgorithmSelector = props => {
  return <AlgorithmSelectorCard {...props} />;
};

export default AlgorithmSelector;
