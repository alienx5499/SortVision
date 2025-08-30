/// Find minimum element in unsorted portion
/// # Arguments
/// * `arr` - Vector to search in
/// * `start` - Starting index of unsorted portion
/// * `end` - Ending index of unsorted portion
/// # Returns
/// Index of minimum element

fn find_min_index(arr: &Vec<i32>, start: usize, end: usize) -> usize {
    // Initialize minimum index as the start position
    let mut min_idx = start;

    // Iterate through the unsorted portion from start+1 to end
    for i in (start + 1)..=end {
        // If we find a smaller element, update min_idx
        if arr[i] < arr[min_idx] {
            min_idx = i;
        }
    }

    // Return the index of the minimum element found
    min_idx
}

/// Public function to sort a vector using Selection Sort algorithm
/// Selection Sort works by repeatedly finding the minimum element
/// from the unsorted portion and placing it at the beginning.
/// # Arguments
/// * `arr` - Vector to be sorted
pub fn sort(arr: &mut Vec<i32>) {
    let len = arr.len();
    if len <= 1 {
        return; // Already sorted
    }

    // Iterate through the array from 0 to second-to-last element
    for i in 0..len-1 {
        // Find the minimum element in the unsorted portion
        let min_idx = find_min_index(arr, i, len - 1);

        // Swap the found minimum element with the first element of unsorted portion
        // Only swap if we found a smaller element (when min_idx is different from i)
        if min_idx != i {
            arr.swap(i, min_idx);
        }
    }
}
