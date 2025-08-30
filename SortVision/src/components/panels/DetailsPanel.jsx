import React from 'react';
import { DataPanel as DataPanelComponent } from './details';

/**
 * DetailsPanel Component
 *
 * Wrapper for the DataPanel component that displays:
 * - Algorithm details and information
 * - Array visualization with animated bars
 */
const DetailsPanel = props => {
  return <DataPanelComponent {...props} />;
};

export default DetailsPanel;
