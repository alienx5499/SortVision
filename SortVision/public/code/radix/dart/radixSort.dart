/*
Radix Sort Algorithm in Dart 

What this file includes :-

-Implemented Radix Sort Algorithm
-Comments to make code clear
-Time and Space Complexity Analysis
-Example usage
-Test cases
-Performance Optimization Notes

Radix Sort Algorithm - This is non comparison sorting instead no's the sorted the basis of least significant bit (LSB).

*/

//Helper function for comparing lists since we can't use external packages
bool listsEqual(List<int> a, List<int> b) {
  if (a.length != b.length) return false;
  for (int i = 0; i < a.length; i++) {
    if (a[i] != b[i]) return false;
  }
  return true;
}

//Implementation

class RadixSort {
  static void sort(List<int> arr) {
    //if array is empty
    if (arr.isEmpty) return;

    int maxNum = getMax(arr);

    int exp = 1;
    while (maxNum ~/ exp > 0) {
      countSort(arr, exp);
      exp *= 10;
    }
  }

  //Function to get the maximum value out of array.
  static int getMax(List<int> arr) {
    int max = arr[0];

    for (int i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
      }
    }

    return max;
  }

  //Function to sort the arr on the basis of least significant digit.
  static void countSort(List<int> arr, int exp) {
    int n = arr.length;

    List<int> output = List.filled(n, 0);
    List<int> count = List.filled(10, 0);

    //increase the element of count
    for (int i = 0; i < n; i++) {
      int digit = (arr[i] ~/ exp) % 10;
      count[digit]++;
    }

    //cumulative sum of elemets of count
    for (int i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    //arrange elements in output based on their least significant bit
    for (int i = n - 1; i >= 0; i--) {
      int digit = (arr[i] ~/ exp) % 10;
      output[count[digit] - 1] = arr[i];
      count[digit]--;
    }

    //assign new elements to array
    for (int i = 0; i < n; i++) {
      arr[i] = output[i];
    }
  }
}

//Time complexity

//O(nk)

//Space Complexity

//O(n+k);

//Test Cases

void runTests() {
  void test(String name, List<int> input, List<int> expected) {
    RadixSort.sort(input);
    assert(listsEqual(input, expected),
        '$name failed\nExpected: $expected\nGot: $input');
    print('$name passed');
  }

  test('Test 1', [5, 3, 1, 2, 4], [1, 2, 3, 4, 5]);
  test('Test 2', [160, 45, 75, 90, 908, 24, 2, 646],
      [2, 24, 45, 75, 90, 160, 646, 908]);
  test('Test 3 (empty)', [], []);
  test('Test 4 (single)', [1], [1]);
  test('Test 5 (reverse)', [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  test('Test 6 (duplicates)', [3, 3, 3, 3, 1, 1, 2, 2],
      [1, 1, 2, 2, 3, 3, 3, 3]);
}

void main() {
  //Example
  List<int> numbers = [160, 45, 75, 90, 908, 24, 2, 646];
  print("Original: $numbers");

  RadixSort.sort(numbers);
  print("Sorted:   $numbers");

  //test cases
  runTests();
}

/*Performance Optimization Notes

-Use In-Place Counting Sort When Possible
-Early Exit Optimization
-Avoid Sorting When Not Needed

*/
