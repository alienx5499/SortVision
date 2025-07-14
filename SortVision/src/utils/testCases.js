// src/utils/testCases.js
export const testCases = {
  randomSmall: {
    name: 'Small Random Array (100 elements)',
    generator: () => Array.from({length: 100}, () => Math.floor(Math.random() * 1000))
  },
  randomLarge: {
    name: 'Large Random Array (10,000 elements)',
    generator: () => Array.from({length: 10000}, () => Math.floor(Math.random() * 10000))
  },
  sorted: {
    name: 'Pre-sorted Array',
    generator: () => Array.from({length: 1000}, (_, i) => i)
  },
  reverseSorted: {
    name: 'Reverse-sorted Array',
    generator: () => Array.from({length: 1000}, (_, i) => 1000 - i)
  },
  nearlySorted: {
    name: 'Nearly Sorted Array',
    generator: () => {
      const arr = Array.from({length: 1000}, (_, i) => i);
      // Swap 5% of elements
      for (let i = 0; i < 50; i++) {
        const a = Math.floor(Math.random() * 1000);
        const b = Math.floor(Math.random() * 1000);
        [arr[a], arr[b]] = [arr[b], arr[a]];
      }
      return arr;
    }
  }
};