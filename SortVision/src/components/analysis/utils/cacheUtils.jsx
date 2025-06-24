// cacheUtils.js
export function trackCacheAccess(pattern) {
  // Simulate cache hits/misses based on access pattern
  let hits = 0;
  let misses = 0;
  
  const cacheSize = 32;
  const cache = new Set();
  
  for (let i = 0; i < pattern.length; i++) {
    const key = Math.floor(pattern[i] / cacheSize);
    if (cache.has(key)) {
      hits++;
    } else {
      misses++;
      if (cache.size >= cacheSize) {
        const toRemove = [...cache][0];
        cache.delete(toRemove);
      }
      cache.add(key);
    }
  }
  
  return { hits, misses };
}
// In your main App.jsx or SortingVisualizer.jsx
import AnalysisPanel from '../components/analysis/AnalysisPanel';

// Add this to your component layout:
<AnalysisPanel />