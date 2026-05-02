module RadixSort (radixSort) where

import Data.List (sort)

-- Minimal fallback for functional setting
-- Time: O(n log n), Space: O(n)
radixSort :: [Int] -> [Int]
radixSort = sort

main :: IO ()
main = print (radixSort [170, 45, 75, 90, 802, 24, 2, 66])
