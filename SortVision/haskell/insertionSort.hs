-- insertionSort.hs
-- 🎯 Insertion Sort Algorithm in Haskell
-- Implements a stable, recursive insertion sort using pure functional programming principles.

module Main where

-- Insert element into sorted list
insert :: (Ord a) => a -> [a] -> [a]
insert x [] = [x]  -- If the list is empty, insert x
insert x (y:ys)
  | x <= y    = x : y : ys  -- Insert before the first element greater than or equal to x
  | otherwise = y : insert x ys  -- Recurse into the rest of the list

-- Main insertion sort function
insertionSort :: (Ord a) => [a] -> [a]
insertionSort [] = []  -- Base case: empty list is already sorted
insertionSort (x:xs) = insert x (insertionSort xs)  -- Insert head into sorted tail

-- Example usage
example :: IO ()
example = do
  let unsorted = [5, 2, 9, 1, 5, 6]
  let sorted = insertionSort unsorted
  putStrLn "🔢 Original list:"
  print unsorted
  putStrLn "✅ Sorted list:"
  print sorted

-- Test cases to validate correctness
runTests :: IO ()
runTests = do
  putStrLn "\n🧪 Running Test Cases..."
  let tests =
        [ ("Empty list", insertionSort ([] :: [Int]) == [])
        , ("Single element", insertionSort [1] == [1])
        , ("Two elements", insertionSort [2, 1] == [1, 2])
        , ("Multiple elements", insertionSort [3, 2, 1] == [1, 2, 3])
        , ("Duplicates", insertionSort [5, 2, 9, 1, 5, 6] == [1, 2, 5, 5, 6, 9])
        , ("Characters", insertionSort "haskell" == "aehklls")
        ]
  mapM_ (\(desc, result) -> putStrLn $ desc ++ ": " ++ (if result then "✅ Passed" else "❌ Failed")) tests

-- Main function to run example and tests
main :: IO ()
main = do
  example
  runTests
