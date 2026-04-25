import { PLACEHOLDER_MESSAGES } from './constants';

export const getFileExtension = language => {
  switch (language) {
    case 'python':
      return 'py';
    case 'javascript':
      return 'js';
    case 'typescript':
      return 'ts';
    case 'java':
      return 'java';
    case 'cpp':
      return 'cpp';
    case 'golang':
      return 'go';
    case 'rust':
      return 'rs';
    case 'csharp':
      return 'cs';
    case 'dart':
      return 'dart';
    case 'kotlin':
      return 'kt';
    case 'swift':
      return 'swift';
    case 'php':
      return 'php';
    case 'ruby':
      return 'rb';
    case 'scala':
      return 'scala';
    case 'c':
      return 'c';
    case 'r':
      return 'r';
    case 'lua':
      return 'lua';
    case 'haskell':
      return 'hs';
    case 'julia':
      return 'jl';
    case 'pseudocode':
      return 'txt';
    default:
      return 'txt';
  }
};

export const getPlaceholderContent = () => {
  return PLACEHOLDER_MESSAGES[
    Math.floor(Math.random() * PLACEHOLDER_MESSAGES.length)
  ];
};

export const getAlgorithmDoc = algorithm => {
  return `/**
 * ${algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort
 *
 * Description: Implements the ${algorithm} sort algorithm.
 *
 * Time Complexity: O(n^2) in worst case (varies by algorithm)
 * Space Complexity: O(1) or O(n) (varies by algorithm)
 */
`;
};

export const getTestCase = selectedLanguage => {
  switch (selectedLanguage) {
    case 'python':
      return `\n
def test():
    arr = [5, 2, 9, 1]
    bubbleSort(arr)
    assert arr == [1, 2, 5, 9]
`;
    case 'javascript':
      return `\n
// Test
const arr = [5, 2, 9, 1];
bubbleSort(arr);
console.assert(JSON.stringify(arr) === JSON.stringify([1,2,5,9]));
`;
    case 'java':
      return `\n
// Test
public static void main(String[] args) {
    int[] arr = {5,2,9,1};
    bubbleSort(arr);
    assert java.util.Arrays.equals(arr, new int[]{1,2,5,9});
}
`;
    case 'dart':
      return `\n
// Test
void main() {
  List<int> arr = [5, 2, 9, 1];
  bubbleSort(arr);
  assert(listEquals(arr, [1, 2, 5, 9]));
}
`;
    case 'kotlin':
      return `\n
// Test
fun main() {
    val arr = intArrayOf(5, 2, 9, 1)
    bubbleSort(arr)
    assert(arr.contentEquals(intArrayOf(1, 2, 5, 9)))
}
`;
    case 'swift':
      return `\n
// Test
var arr = [5, 2, 9, 1]
bubbleSort(&arr)
assert(arr == [1, 2, 5, 9])
`;
    case 'php':
      return `\n
// Test
$arr = [5, 2, 9, 1];
bubbleSort($arr);
assert($arr === [1, 2, 5, 9]);
`;
    case 'ruby':
      return `\n
# Test
arr = [5, 2, 9, 1]
bubble_sort(arr)
raise "Test failed" unless arr == [1, 2, 5, 9]
`;
    case 'scala':
      return `\n
// Test
val arr = Array(5, 2, 9, 1)
bubbleSort(arr)
assert(arr.sameElements(Array(1, 2, 5, 9)))
`;
    case 'c':
      return `\n
// Test
int main() {
    int arr[] = {5, 2, 9, 1};
    int n = 4;
    bubbleSort(arr, n);
    // Verify arr is [1, 2, 5, 9]
    return 0;
}
`;
    case 'r':
      return `\n
# Test
arr <- c(5, 2, 9, 1)
arr <- bubble_sort(arr)
stopifnot(identical(arr, c(1, 2, 5, 9)))
`;
    case 'lua':
      return `\n
-- Test
local arr = {5, 2, 9, 1}
bubbleSort(arr)
assert(table.concat(arr, ",") == "1,2,5,9")
`;
    case 'haskell':
      return `\n
-- Test
main :: IO ()
main = do
    let arr = [5, 2, 9, 1]
    let sorted = bubbleSort arr
    if sorted == [1, 2, 5, 9] then putStrLn "Test passed" else error "Test failed"
`;
    case 'julia':
      return `\n
# Test
arr = [5, 2, 9, 1]
bubble_sort!(arr)
@assert arr == [1, 2, 5, 9]
`;
    case 'pseudocode':
      return `\n
// Test
array = [5, 2, 9, 1]
bubbleSort(array)
assert array == [1, 2, 5, 9]
`;
    default:
      return `\n
// Test case placeholder
`;
  }
};
