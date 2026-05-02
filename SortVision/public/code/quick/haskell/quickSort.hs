module QuickSort (quickSort) where

-- Time: Best/Avg O(n log n), Worst O(n^2), Space: O(n) immutable lists
quickSort :: Ord a => [a] -> [a]
quickSort [] = []
quickSort (x:xs) = quickSort smaller ++ [x] ++ quickSort larger
  where
    smaller = [a | a <- xs, a <= x]
    larger = [a | a <- xs, a > x]

main :: IO ()
main = print (quickSort [64, 25, 12, 22, 11])
