/*
Radix Sort Algorithm in Lua 

What this file includes :-

-Implemented Radix Sort Algorithm
-Comments to make code clear
-Time and Space Complexity Analysis
-Example usage
-Test cases
-Performance Optimization Notes

Radix Sort Algorithm - This is non comparison sorting instead no's the sorted the basis of least significant bit (LSB) to Most significant bit (MSB).

*/

-- Implementation

-- Get maximum value in array to determine number of digits
function getMax(arr)
  local max = arr[1]

  for i = 2, #arr do 
    if arr[i] > max then
      max = arr[i]
    end
  end

  return max
end

-- Counting Sort for each digit
function countingSort(arr, exp)
  local n = #arr

  local output = {}
  local count = {}

  --initialize count array
  for i = 0, 9 do
    count[i] = 0
  end

  --counting occurences
  for i = 1, n do
    local idx = math.floor(arr[i] / exp) % 10

    count[idx] = count[idx] + 1;
  end
  
  --cumulative sum
  for i = 1, 9 do
    count[i] = count[i] + count [i-1]
  end

  --building the output array
  for i = n, 1, -1 do
    local idx = math.floor(arr[i] / exp) % 10

    output[count[idx]] = arr[i]
    count[idx] = count[idx] - 1
  end

  --changing the initial array
  for i = 1, n do
    arr[i] = output[i]
  end
end

-- Main radix sort function
function radixSort(arr)
  if #arr == 0 then
    return
  end
  --get max
  local m = getMax(arr)
  local exp = 1

  while math.floor(m / exp) > 0 do
    countingSort(arr, exp)
    
    exp = exp * 10
  end
end

--printing the array
function printArray(arr)
  for i = 1, #arr do
    io.write(arr[i] .. " ")
  end
  print()
end

/*
Time complexity
O(nk)
where k is range 
Space Complexity
O(n+k);
where k is range
*/

--example case
local arr = {160, 45, 75, 90, 908, 24, 2, 646}
print("Original array")
printArray(arr)

radixSort(arr)
print("Sorted array")
printArray(arr)

--test cases
--test case 1 - Empty array
local test1 = {}
print("Original array:")
printArray(test1)
radixSort(test1)

print("Sorted array:")
printArray(test1)

--test case 2 - Single Element
local test2 = {1}
print("Original array:")
printArray(test2)
radixSort(test2)

print("Sorted array:")
printArray(test2)

--test case 3 - Already sorted array
local test3 = {1, 2, 3, 4, 5, 6, 7, 8}
print("Original array:")
printArray(test3)
radixSort(test3)

print("Sorted array:")
printArray(test3)

--test case 4 - Reverse sorted array
local test4 = {80, 77, 69, 52, 41, 32, 22, 1}
print("Original array:")
printArray(test4)
radixSort(test4)

print("Sorted array:")
printArray(test4)

--test case 5 - Duplicate elements in array
local test5 = {2, 1, 2, 4, 1, 2, 5}
print("Original array:")
printArray(test5)
radixSort(test5)

print("Sorted array:")
printArray(test5)

/*Performance Optimization Notes

-Use In-Place Counting Sort When Possible
-Early Exit Optimization
-Avoid Sorting When Not Needed

*/