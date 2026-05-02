// Insertion Sort (in-place)
// Time: Best O(n), Avg/Worst O(n^2), Space: O(1)
function insertionSort(arr: number[]): number[] {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

const arr = [64, 25, 12, 22, 11];
console.log(insertionSort(arr));
