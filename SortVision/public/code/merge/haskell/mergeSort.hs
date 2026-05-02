module MergeSort (mergeSort) where

-- Time: Best/Avg/Worst O(n log n), Space: O(n)
mergeSort :: Ord a => [a] -> [a]
mergeSort [] = []
mergeSort [x] = [x]
mergeSort xs = merge (mergeSort left) (mergeSort right)
  where
    mid = length xs `div` 2
    left = take mid xs
    right = drop mid xs

merge :: Ord a => [a] -> [a] -> [a]
merge xs [] = xs
merge [] ys = ys
merge (x:xs) (y:ys)
  | x <= y = x : merge xs (y:ys)
  | otherwise = y : merge (x:xs) ys

main :: IO ()
main = print (mergeSort [64, 25, 12, 22, 11])
