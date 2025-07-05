-- bubbleSort.hs
-- Bubble Sort implementation in Haskell
-- Author: Bharath Kumar P
-- Date: 04-07-2025

module BubbleSort (bubbleSort) where

-- | Main bubble sort function
-- Takes a list of orderable elements and returns a sorted list.
bubbleSort :: (Ord a) => [a] -> [a]
bubbleSort xs = case bubble xs of
                    (ys, False) -> ys
                    (ys, True)  -> bubbleSort ys
  where
    -- Perform a single pass of bubble sort
    bubble :: (Ord a) => [a] -> ([a], Bool)
    bubble (x1:x2:xs)
      | x1 > x2   = let (rest, _) = bubble (x1:xs)
                    in  (x2:rest, True)
      | otherwise = let (rest, swapped) = bubble (x2:xs)
                    in  (x1:rest, swapped)
    bubble xs = (xs, False)

-- | Example usage for quick test
main :: IO ()
main = do
  let unsorted = [5,1,4,2,8]
  let sorted = bubbleSort unsorted
  putStrLn "Unsorted:"
  print unsorted
  putStrLn "Sorted:"
  print sorted
