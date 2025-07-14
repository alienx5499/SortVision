// src/utils/memoryTracker.js
export class MemoryTracker {
  constructor() {
    this.allocations = [];
    this.snapshots = [];
  }

  trackAllocation(size, type) {
    this.allocations.push({ size, type, timestamp: performance.now() });
  }

  takeSnapshot() {
    this.snapshots.push({
      timestamp: performance.now(),
      totalMemory: this.allocations.reduce((sum, a) => sum + a.size, 0),
      allocations: [...this.allocations]
    });
  }

  clear() {
    this.allocations = [];
    this.snapshots = [];
  }
}

export function instrumentAlgorithm(algorithmFn, tracker) {
  return function(...args) {
    // Proxy array accesses to track memory
    const originalArray = args[0];
    const proxyArray = new Proxy(originalArray, {
      set(target, prop, value) {
        tracker.trackAllocation(sizeof(value), 'array_element');
        return Reflect.set(target, prop, value);
      }
    });
    
    args[0] = proxyArray;
    return algorithmFn.apply(this, args);
  };
}

function sizeof(value) {
  // Simple size estimation
  if (typeof value === 'number') return 8;
  if (typeof value === 'string') return value.length * 2;
  return 8; // default
}