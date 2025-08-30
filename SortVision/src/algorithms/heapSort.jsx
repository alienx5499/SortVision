/**
 * Heap Sort Algorithm
 *
 * Time Complexity:
 * - Best Case: O(n log n)
 * - Average Case: O(n log n)
 * - Worst Case: O(n log n)
 *
 * Space Complexity: O(1) - in-place sorting
 *
 * Description:
 * Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure.
 * It divides the input into a sorted and unsorted region, and iteratively shrinks the
 * unsorted region by extracting the largest element and moving it to the sorted region.
 *
 */
const heapify = async (
  array,
  n,
  i,
  visualizeArray,
  delay,
  setCurrentBar,
  shouldStopRef,
  audio
) => {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n) {
    setCurrentBar({ compare: left, swap: largest });
    visualizeArray(array);
    audio.playCompareSound(array[left]); // Play comparison sound
    await new Promise(resolve => setTimeout(resolve, delay));

    if (array[left] > array[largest]) {
      largest = left;
    }
  }

  if (right < n) {
    setCurrentBar({ compare: right, swap: largest });
    visualizeArray(array);
    audio.playCompareSound(array[right]); // Play comparison sound
    await new Promise(resolve => setTimeout(resolve, delay));

    if (array[right] > array[largest]) {
      largest = right;
    }
  }

  if (largest !== i) {
    [array[i], array[largest]] = [array[largest], array[i]];
    setCurrentBar({ compare: null, swap: i });
    visualizeArray(array);
    audio.playSwapSound(array[i]); // Play swap sound
    await new Promise(resolve => setTimeout(resolve, delay));

    await heapify(
      array,
      n,
      largest,
      visualizeArray,
      delay,
      setCurrentBar,
      shouldStopRef,
      audio
    );
  }
};

export const heapSort = async (
  array,
  visualizeArray,
  delay,
  setCurrentBar,
  shouldStopRef,
  audio
) => {
  let swaps = 0;
  let comparisons = 0;
  const n = array.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    if (shouldStopRef.current) return { swaps, comparisons };
    await heapify(
      array,
      n,
      i,
      visualizeArray,
      delay,
      setCurrentBar,
      shouldStopRef,
      audio
    );
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    if (shouldStopRef.current) return { swaps, comparisons };

    [array[0], array[i]] = [array[i], array[0]];
    swaps++;
    setCurrentBar({ compare: null, swap: i });
    visualizeArray(array);
    audio.playSwapSound(array[i]); // Play swap sound
    await new Promise(resolve => setTimeout(resolve, delay));

    await heapify(
      array,
      i,
      0,
      visualizeArray,
      delay,
      setCurrentBar,
      shouldStopRef,
      audio
    );
  }

  audio.playCompleteSound(); // Play completion sound
  return { swaps, comparisons };
};
