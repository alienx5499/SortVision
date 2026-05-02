module SelectionSort (selectionSort) where

-- Time: Best/Avg/Worst O(n^2), Space: O(1) extra (excluding output list)
selectionSort :: Ord a => [a] -> [a]
selectionSort [] = []
selectionSort xs = m : selectionSort (removeFirst m xs)
  where
    m = minimum xs

removeFirst :: Eq a => a -> [a] -> [a]
removeFirst _ [] = []
removeFirst x (y:ys)
  | x == y = ys
  | otherwise = y : removeFirst x ys

main :: IO ()
main = print (selectionSort [64, 25, 12, 22, 11])
