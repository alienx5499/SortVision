import { usePerformanceMetrics } from './usePerformanceMetrics';

/**
 * Legacy no-op component. Prefer `usePerformanceMetrics()` in hooks or parents.
 * Kept so barrel exports remain valid if anything still imported the default.
 */
export default function PerformanceMetrics() {
  usePerformanceMetrics();
  return null;
}
