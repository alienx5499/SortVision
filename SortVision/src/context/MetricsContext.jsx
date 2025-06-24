// src/context/MetricsContext.jsx (new file)
import { createContext } from 'react';

export const MetricsContext = createContext({
  memoryMetrics: [],
  cacheMetrics: { hits: 0, misses: 0 },
  branchMetrics: { accurate: 0, total: 0 },
  setMemoryMetrics: () => {},
  setCacheMetrics: () => {},
  setBranchMetrics: () => {}
});