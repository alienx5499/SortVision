export const ALGORITHM_OPTIONS = [
  {
    value: 'bubble',
    label: 'Bubble Sort',
    shimmerClass: 'via-red-400/5',
  },
  {
    value: 'selection',
    label: 'Selection Sort',
    shimmerClass: 'via-yellow-400/5',
  },
  {
    value: 'insertion',
    label: 'Insertion Sort',
    shimmerClass: 'via-orange-400/5',
  },
  {
    value: 'bucket',
    label: 'Bucket Sort',
    shimmerClass: 'via-pink-400/5',
  },
  {
    value: 'radix',
    label: 'Radix Sort',
    shimmerClass: 'via-cyan-400/5',
  },
  {
    value: 'heap',
    label: 'Heap Sort',
    shimmerClass: 'via-indigo-400/5',
  },
  {
    value: 'merge',
    label: 'Merge Sort',
    shimmerClass: 'via-blue-400/5',
  },
  {
    value: 'quick',
    label: 'Quick Sort',
    shimmerClass: 'via-green-400/5',
  },
];

export const BADGE_THEME_MAP = {
  bubble:
    'bg-red-500/10 text-red-400 border border-red-500/20 shadow-lg shadow-red-500/10',
  insertion:
    'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-lg shadow-orange-500/10',
  selection:
    'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-lg shadow-amber-500/10',
  quick:
    'bg-green-500/10 text-green-400 border border-green-500/20 shadow-lg shadow-green-500/10',
  merge:
    'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/10',
  radix:
    'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-lg shadow-cyan-500/10',
  heap: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/10',
  bucket:
    'bg-pink-500/10 text-pink-400 border border-pink-500/20 shadow-lg shadow-pink-500/10',
};

export const BADGE_GRADIENT_MAP = {
  bubble: 'bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0',
  insertion:
    'bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0',
  selection:
    'bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0',
  quick: 'bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0',
  merge: 'bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0',
  radix: 'bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0',
  heap: 'bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0',
  bucket: 'bg-gradient-to-r from-pink-500/0 via-pink-500/10 to-pink-500/0',
};

export const BADGE_COMPLEXITY_TEXT_MAP = {
  bubble: 'O(n²) - Simple exchange sort',
  insertion: 'O(n²) - Builds sorted array',
  selection: 'O(n²) - Finds minimum element',
  quick: 'O(n log n) - Divide & conquer',
  merge: 'O(n log n) - Divide & merge',
  radix: 'O(nk) - Non-comparative sort',
  heap: 'O(n log n) - Binary heap sort',
  bucket: 'O(n+k) - Distribution sort',
};
