module InsertionSort (insertionSort) where

-- Time: Best O(n), Avg/Worst O(n^2), Space: O(n) for immutable list rebuilds
insertionSort :: Ord a => [a] -> [a]
insertionSort = foldl insert []
  where
    insert [] x = [x]
    insert (y:ys) x
      | x <= y = x : y : ys
      | otherwise = y : insert ys x

main :: IO ()
main = print (insertionSort [64, 25, 12, 22, 11])
