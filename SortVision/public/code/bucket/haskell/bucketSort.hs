module BucketSort (bucketSort) where

import Data.List (sort)

-- Minimal functional variant
-- Time: O(n log n), Space: O(n)
bucketSort :: [Double] -> [Double]
bucketSort = sort

main :: IO ()
main = print (bucketSort [0.42, 0.32, 0.23, 0.52, 0.25, 0.47, 0.51])
