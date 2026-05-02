// Selection Sort (in-place)
// Time: Best/Avg/Worst O(n^2), Space: O(1)
function selectionSort(arr: number[]): number[] {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}

const arr = [64, 25, 12, 22, 11];
console.log(selectionSort(arr));
