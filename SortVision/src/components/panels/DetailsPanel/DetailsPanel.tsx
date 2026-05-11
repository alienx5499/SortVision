import React from 'react';
import DataPanel from './DataPanel';
import type { DetailsPanelProps } from './detailsPanelContracts';

/**
 * DetailsPanel Component
 *
 * Wrapper for the DataPanel component that displays:
 * - Algorithm details and information
 * - Array visualization with animated bars
 */
const DetailsPanel = (props: DetailsPanelProps) => {
  return <DataPanel {...props} />;
};

export default DetailsPanel;
