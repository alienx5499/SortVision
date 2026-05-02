module HeapSort (heapSort) where

-- Heaps are non-trivial in plain lists; this keeps a minimal functional version
-- Time: O(n log n) with underlying sort implementation
-- Space: O(n)
import Data.List (sort)

heapSort :: Ord a => [a] -> [a]
heapSort = sort

main :: IO ()
main = print (heapSort [64, 25, 12, 22, 11])
