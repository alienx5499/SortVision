{-
Radix Sort Algorithm in Haskell

What this file includes :-

-Implemented Radix Sort Algorithm
-Comments to make code clear
-Time and Space Complexity Analysis
-Example usage
-Test cases
-Performance Optimization Notes

Radix Sort Algorithm - This is non comparison sorting instead no's the sorted the basis of least significant bit (LSB) to Most significant bit (MSB).
-}

-- Implementation

-- Get maximum value to determine number of digits
getMax :: [Int] -> Int
getMax xs = maximum xs

-- Extract digit at given position
getDigit :: Int -> Int -> Int
getDigit num pos = (num `div`(10 ^ pos) `mod` 10)

-- Counting sort for specific digit position
countingSort :: [Int] -> Int -> [Int]
countingSort xs pos =
  concat [ [n | n <- xs, getDigit n pos == d] | d <- [0..9] ]

-- Main radix sort function
radixSort :: [Int] -> [Int]
radixSort [] = []
radixSort xs = foldl countingSort xs [0 .. maxDigits - 1]
  where
    maxNum = getMax xs
    maxDigits = length (show maxNum)

{-
Time complexity

O(nk)

Space Complexity

O(n+k);
-}

-- example case

main :: IO()
main = do
  let arr1 = [160, 45, 75, 90, 908, 24, 2, 646] --example
  let arr2 = [99, 77, 69, 53, 33, 27, 19, 2]    --Reverse sorted
  let arr3 = [1, 2, 44, 99, 102, 169, 277]      --Already sorted
  let arr4 = [1]                                --Single Element
  let arr5 = [2, 2, 4, 3, 3, 2, 6, 3, 2, 2, 4]  --Duplicate Elements
  let arr6 = []                                 --Empty array


  putStrLn "Example Case: "
  print $ radixSort arr1   -- [2, 24, 45, 75, 90, 160, 646, 908]

  --test cases
  putStrLn "Test Case 1: "
  print $ radixSort arr2 -- [2, 19, 27, 33, 53, 69, 77, 99]
  putStrLn "Test Case 2: "
  print $ radixSort arr3 -- [1, 2, 44, 99, 102, 169, 277]
  putStrLn "Test Case 3: "
  print $ radixSort arr4 -- [1]
  putStrLn "Test Case 4: "
  print $ radixSort arr5 -- [2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 6]
  putStrLn "Test Case 5: "
  print $ radixSort arr6 -- []


{-Performance Optimization Notes

-Use In-Place Counting Sort When Possible
-Early Exit Optimization
-Avoid Sorting When Not Needed

-}
