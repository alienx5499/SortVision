import React from 'react';
import { DataPanel as DataPanelComponent } from './details';
import type { DetailsPanelProps } from './details/detailsPanelContracts';

/**
 * DetailsPanel Component
 *
 * Wrapper for the DataPanel component that displays:
 * - Algorithm details and information
 * - Array visualization with animated bars
 */
const DetailsPanel = (props: DetailsPanelProps) => {
  return <DataPanelComponent {...props} />;
};

export default DetailsPanel;
