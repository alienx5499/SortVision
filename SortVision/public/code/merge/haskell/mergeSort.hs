--Merge Sort Algorithm in Haskell 

--What this file includes :-

--Implemented Merge Sort Algorithm
--Comments to make code clear
--Time and Space Complexity Analysis
--Example usage
--Test cases
--Performance Optimization Notes

--Merge Sort Algorithm - This is a divide-and-conquer algorithm that divides an array into two halves,
--recursively sorts them, and then merges the two sorted halves.

-- Implementation

--Merge function to combine two sorted lists
merge :: (Ord a) => [a] -> [a] -> [a]
merge xs ys = case (xs, ys) of 
      ([], ys) -> ys
      (xs, []) -> xs
      (x:xs', y:ys')
          | x <= y -> x : merge xs' (y:ys')
          | otherwise -> y : merge (x:xs') ys'

--Split list into two halves 
splitAt' :: Int -> [a] -> ([a], [a])
splitAt' n xs = (take n xs,  drop n xs)

--Merge sort function using divide and conquer
mergeSort :: (Ord a) => [a] -> [a]
mergeSort xs
  | null xs = [] --handle empty array
  | length xs == 1 = xs
  | otherwise =
      let (left, right) = splitAt'(length xs `div` 2) xs
      in merge (mergeSort left) (mergeSort right)

--Time Complexity

--Since the various loops runs n times the time complexity is O(n logn)

--Space Complexity

--It is O(n)

main :: IO()
main = do
  let arr1 = [160, 45, 75, 90, 908, 24, 2, 646] --example
  let arr2 = [99, 77, 69, 53, 33, 27, 19, 2]    --Reverse sorted
  let arr3 = [1, 2, 44, 99, 102, 169, 277]      --Already sorted
  let arr4 = [1]                                --Single Element
  let arr5 = [2, 2, 4, 3, 3, 2, 6, 3, 2, 2, 4]  --Duplicate Elements
  let arr6 = [] :: [Int]                                 --Empty array


  putStrLn "Example Case: "
  print $ mergeSort arr1   -- [2, 24, 45, 75, 90, 160, 646, 908]

  --test cases
  putStrLn "Test Case 1: "
  print $ mergeSort arr2 -- [2, 19, 27, 33, 53, 69, 77, 99]
  putStrLn "Test Case 2: "
  print $ mergeSort arr3 -- [1, 2, 44, 99, 102, 169, 277]
  putStrLn "Test Case 3: "
  print $ mergeSort arr4 -- [1]
  putStrLn "Test Case 4: "
  print $ mergeSort arr5 -- [2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 6]
  putStrLn "Test Case 5: "
  print $ mergeSort arr6 -- []

--Performance Optimization Notes

--Use In-Place Counting Sort When Possible
--Early Exit Optimization
--Avoid Sorting When Not Needed