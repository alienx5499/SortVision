// src/utils/cacheSimulator.js
export class CacheSimulator {
  constructor(cacheSize = 512, lineSize = 64) {
    this.cacheSize = cacheSize;
    this.lineSize = lineSize;
    this.cache = new Map();
    this.hits = 0;
    this.misses = 0;
  }
  
  access(address) {
    const lineAddress = Math.floor(address / this.lineSize) * this.lineSize;
    
    if (this.cache.has(lineAddress)) {
      this.hits++;
      return true;
    } else {
      this.misses++;
      // Simple LRU eviction
      if (this.cache.size >= this.cacheSize / this.lineSize) {
        const firstKey = this.cache.keys().next().value;
        this.cache.delete(firstKey);
      }
      this.cache.set(lineAddress, true);
      return false;
    }
  }
  
  reset() {
    this.cache.clear();
    this.hits = 0;
    this.misses = 0;
  }
  
  get hitRate() {
    const total = this.hits + this.misses;
    return total > 0 ? this.hits / total : 0;
  }
}