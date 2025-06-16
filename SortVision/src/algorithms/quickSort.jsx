/**
 * Async Quick Sort with visualization and sound support.
 *
 * Time Complexity:
 * - Best/Average: O(n log n)
 * - Worst: O(n²)
 * Space Complexity: O(log n) due to recursion
 *
 * @param {number[]} array - array to sort
 * @param {function} visualizeArray - callback to render current array state
 * @param {number} delay - millisecond pause between operations
 * @param {function} setCurrentBar - callback marking compare/swap indices
 * @param {object} shouldStopRef - { current: boolean } to signal stopping sort
 * @param {object} audio - { playPivotSound, playCompareSound, playSwapSound, playCompleteSound }
 * @returns {Promise<{comparisons:number, swaps:number}>}
 */
export async function quickSort(array, visualizeArray, delay, setCurrentBar, shouldStopRef, audio) {
  let comparisons = 0;
  let swaps = 0;

  async function qs(arr, left, right) {
    if (shouldStopRef.current) return;
    if (left < right) {
      const pivotIndex = await partition(arr, left, right);
      await qs(arr, left, pivotIndex - 1);
      await qs(arr, pivotIndex + 1, right);
    }
  }

  async function partition(arr, left, right) {
    const pivot = arr[right];
    audio.playPivotSound(pivot);
    let i = left - 1;
    for (let j = left; j < right; j++) {
      if (shouldStopRef.current) break;

      comparisons++;
      setCurrentBar({ compare: j, swap: null });
      visualizeArray(arr);
      audio.playCompareSound(arr[j]);
      await new Promise(res => setTimeout(res, delay));

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        swaps++;
        setCurrentBar({ compare: null, swap: i });
        visualizeArray(arr);
        audio.playSwapSound(arr[i]);
        await new Promise(res => setTimeout(res, delay));
      }
    }

    if (!shouldStopRef.current) {
      [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
      swaps++;
      setCurrentBar({ compare: null, swap: i + 1 });
      visualizeArray(arr);
      audio.playSwapSound(arr[i + 1]);
      await new Promise(res => setTimeout(res, delay));
    }

    return i + 1;
  }

  await qs(array, 0, array.length - 1);
  audio.playCompleteSound();
  return { comparisons, swaps };
}
