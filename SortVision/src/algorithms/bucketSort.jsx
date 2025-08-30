/**
 * Bucket Sort Algorithm
 *
 * Time Complexity:
 * - Best Case: O(n + n²/k) where k is the number of buckets
 * - Average Case: O(n + n²/k)
 * - Worst Case: O(n²) - when all elements are placed in a single bucket
 *
 * Space Complexity: O(n + k) - where k is the number of buckets
 *
 * Description:
 * Bucket Sort is a distribution sort algorithm that works by distributing elements
 * of an array into a number of buckets. Each bucket is then sorted individually,
 * either using a different sorting algorithm or recursively applying bucket sort.
 * This implementation uses insertion sort for sorting individual buckets.
 */
export const bucketSort = async (
  array,
  visualizeArray,
  delay,
  setCurrentBar,
  shouldStopRef,
  audio
) => {
  let comparisons = 0;
  let swaps = 0;

  // Find maximum value in array
  const max = Math.max(...array);
  const min = Math.min(...array);
  const range = max - min;

  // Create buckets
  const bucketCount = Math.floor(Math.sqrt(array.length));
  const buckets = Array.from({ length: bucketCount }, () => []);

  // Distribute elements into buckets
  for (let i = 0; i < array.length; i++) {
    if (shouldStopRef.current) break;

    const bucketIndex = Math.floor((array[i] - min) / (range / bucketCount));
    // Ensure index is within bounds
    const safeIndex = Math.min(bucketIndex, bucketCount - 1);
    buckets[safeIndex].push(array[i]);

    setCurrentBar({ compare: i, swap: null });
    visualizeArray(array);
    audio.playAccessSound(array[i]); // Play access sound when distributing
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  // Sort individual buckets using insertion sort
  const insertionSort = async bucket => {
    for (let i = 1; i < bucket.length; i++) {
      if (shouldStopRef.current) break;

      let key = bucket[i];
      let j = i - 1;

      while (j >= 0 && bucket[j] > key) {
        comparisons++;
        audio.playCompareSound(bucket[j]); // Play compare sound
        bucket[j + 1] = bucket[j];
        j--;
        swaps++;
      }
      bucket[j + 1] = key;
      audio.playSwapSound(key); // Play swap sound
    }
  };

  // Sort each bucket
  for (let i = 0; i < buckets.length; i++) {
    if (shouldStopRef.current) break;
    await insertionSort(buckets[i]);
  }

  // Concatenate buckets back into original array
  let index = 0;
  for (let i = 0; i < buckets.length; i++) {
    if (shouldStopRef.current) break;

    for (let j = 0; j < buckets[i].length; j++) {
      array[index] = buckets[i][j];
      setCurrentBar({ compare: null, swap: index });
      visualizeArray(array);
      audio.playAccessSound(array[index]); // Play access sound when merging
      await new Promise(resolve => setTimeout(resolve, delay));
      index++;
    }
  }

  audio.playCompleteSound(); // Play completion sound
  return { swaps, comparisons };
};
