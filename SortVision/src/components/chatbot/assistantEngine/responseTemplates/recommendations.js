import { containsKeyword } from '../intentHandlers';

export function generateAlgorithmRecommendation(query, _context) {
  const lowerQuery = query.toLowerCase();

  // Use case based recommendations
  if (
    containsKeyword(lowerQuery, ['small', 'few elements', 'simple', 'beginner'])
  ) {
    return `
      <div class="animate-fade-in space-y-2 max-w-full">
        <p class="m-0 font-semibold text-emerald-400">For Small Datasets (≤ 50 elements):</p>
        <div class="space-y-1">
          <p class="m-0 text-sm">1) <strong>Insertion Sort</strong> - Best for small arrays, adaptive</p>
          <p class="m-0 text-sm">2) <strong>Selection Sort</strong> - Simple to understand and implement</p>
          <p class="m-0 text-sm">3) <strong>Bubble Sort</strong> - Educational purposes only</p>
        </div>
        <p class="m-0 text-xs text-blue-300">Tip: Insertion Sort is often the fastest for small datasets!</p>
      </div>`;
  }

  if (
    containsKeyword(lowerQuery, ['large', 'big', 'many elements', 'production'])
  ) {
    return `
      <div class="animate-fade-in space-y-2 max-w-full">
        <p class="m-0 font-semibold text-emerald-400">For Large Datasets (> 1000 elements):</p>
        <div class="space-y-1">
          <p class="m-0 text-sm">1) <strong>Quick Sort</strong> - Fastest average case O(n log n)</p>
          <p class="m-0 text-sm">2) <strong>Merge Sort</strong> - Guaranteed O(n log n), stable</p>
          <p class="m-0 text-sm">3) <strong>Heap Sort</strong> - Guaranteed O(n log n), in-place</p>
        </div>
        <p class="m-0 text-xs text-blue-300">Tip: Quick Sort is the most commonly used in production!</p>
      </div>`;
  }

  if (
    containsKeyword(lowerQuery, ['stable', 'preserve order', 'equal elements'])
  ) {
    return `
      <div class="animate-fade-in space-y-2 max-w-full">
        <p class="m-0 font-semibold text-emerald-400">For Stable Sorting (preserves equal elements order):</p>
        <div class="space-y-1">
          <p class="m-0 text-sm">1) <strong>Merge Sort</strong> - Stable, O(n log n)</p>
          <p class="m-0 text-sm">2) <strong>Insertion Sort</strong> - Stable, O(n²)</p>
          <p class="m-0 text-sm">3) <strong>Bubble Sort</strong> - Stable, O(n²)</p>
        </div>
        <p class="m-0 text-xs text-blue-300">Tip: Merge Sort is the best stable sorting algorithm!</p>
      </div>`;
  }

  if (
    containsKeyword(lowerQuery, [
      'memory',
      'space',
      'in-place',
      'constant space',
    ])
  ) {
    return `
      <div class="animate-fade-in space-y-2 max-w-full">
        <p class="m-0 font-semibold text-emerald-400">For Memory-Efficient Sorting (O(1) space):</p>
        <div class="space-y-1">
          <p class="m-0 text-sm">1) <strong>Heap Sort</strong> - O(n log n), in-place</p>
          <p class="m-0 text-sm">2) <strong>Quick Sort</strong> - O(log n) space for recursion</p>
          <p class="m-0 text-sm">3) <strong>Insertion Sort</strong> - O(1) space, O(n²) time</p>
        </div>
        <p class="m-0 text-xs text-blue-300">Tip: Heap Sort is the most memory-efficient O(n log n) algorithm!</p>
      </div>`;
  }

  return null;
}
