// Bucket Sort (for numbers in [0, 1))
// Time: Avg O(n + k), Worst O(n^2), Space: O(n + k)
function bucketSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const n = arr.length;
  const buckets: number[][] = Array.from({ length: n }, () => []);

  for (const x of arr) {
    const idx = Math.min(n - 1, Math.floor(x * n));
    buckets[idx].push(x);
  }

  let k = 0;
  for (const bucket of buckets) {
    bucket.sort((a, b) => a - b);
    for (const x of bucket) arr[k++] = x;
  }
  return arr;
}

const arr = [0.42, 0.32, 0.23, 0.52, 0.25, 0.47, 0.51];
console.log(bucketSort(arr));
