
--Quick Sort Algorithm in Lua

--What this file includes :-

--Implemented Quick Sort Algorithm
--Comments to make code clear
--Time and Space Complexity Analysis
--Example usage
--Test cases
--Performance Optimization Notes

--Quick Sort Algorithm - Sorts an array by choosing a pivot and putting lesser elements on the left and greater elements on the right.

-- Implementation

--Partition function to place pivot at correct position
function partition(arr, low, high)
  local pivot = arr[high]
  local idx = low - 1

  for j = low, high - 1 do
    if arr[j] <= pivot then
      idx = idx + 1
      arr[idx],arr[j] = arr[j], arr[idx]
    end
  end

  arr[idx + 1], arr[high] = arr[high], arr[idx + 1]
  return idx + 1
end

--Quick sort function to sort array using partition
function quickSort(arr, low, high)
  --Optimization
  if arr == nil or #arr <= 1 then
    return
  end

  if low < high then
    local p = partition(arr, low, high)

    quickSort(arr, low, p-1)  --left half
    quickSort(arr, p+1, high) --right half
  end
end

--Time Complexity
--Best case - O(nlogn)
--Worst case where pivot is smallest or largest value - O(n^2)

--Space Complexity
--In place substitution - O(1)

--Printing the array
function printArray(arr)
  for i = 1, #arr do
    io.write(arr[i] .. " ")
  end
  print()
end

--example case
local arr1 = {5, 6, 2, 4, 1, 3}
print("Original: ")
printArray(arr1)

quickSort(arr1, 1, #arr1)
print("Sorted: ")
printArray(arr1)

--test cases
-- Test Case-1 (empty array)
local arr2 = {}
print("Original: ")
printArray(arr2)

quickSort(arr2, 1, #arr2)
print("Sorted: ")
printArray(arr2)

-- Test Case-2 (Single Element)
local arr3 = {1}
print("Original: ")
printArray(arr3)

quickSort(arr3, 1, #arr3)
print("Sorted: ")
printArray(arr3)

-- Test Case-3 (Reverse Sorted)
local arr4 = {6, 5, 4, 3, 2, 1}
print("Original: ")
printArray(arr4)

quickSort(arr4, 1, #arr4)
print("Sorted: ")
printArray(arr4)

-- Test Case-4 (Already Sorted)
local arr5 = {1, 2, 3, 4, 5, 6}
print("Original: ")
printArray(arr5)

quickSort(arr5, 1, #arr5)
print("Sorted: ")
printArray(arr5)

-- Test Case-5 (Duplicate Elements)
local arr6 = {2, 1, 2, 4, 1, 2, 5}
print("Original: ")
printArray(arr6)

quickSort(arr6, 1, #arr6)
print("Sorted: ")
printArray(arr6)

-- Test Case-6 (Negative Elements)
local arr7 = {3, -1, 4, -5, 0}
print("Original: ")
printArray(arr7)

quickSort(arr7, 1, #arr7)
print("Sorted: ")
printArray(arr7)

--Performance Optimization Notes

--Exiting early if the array is empty or has a single element in it
--Choose better pivot
--Switch to insertion sort on very small partitions
