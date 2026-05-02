// Radix Sort (LSD, base 10, non-negative integers)
// Time: O(d * (n + k)), Space: O(n + k)
function radixSort(arr) {
  if (arr.length <= 1) return arr;

  const maxVal = Math.max(...arr);
  for (let exp = 1; Math.floor(maxVal / exp) > 0; exp *= 10) {
    countingSortByExp(arr, exp);
  }
  return arr;
}

function countingSortByExp(arr, exp) {
  const output = new Array(arr.length);
  const count = Array(10).fill(0);

  for (const x of arr) count[Math.floor(x / exp) % 10]++;
  for (let i = 1; i < 10; i++) count[i] += count[i - 1];

  for (let i = arr.length - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }

  for (let i = 0; i < arr.length; i++) arr[i] = output[i];
}

const arr = [170, 45, 75, 90, 802, 24, 2, 66];
console.log(radixSort(arr));
