/// Merges two sorted portions of a vector.
///
/// This function takes a vector `arr` and indices `left`, `mid`, `right`
/// such that `arr[left..=mid]` and `arr[mid+1..=right]` are sorted sub-arrays.
/// It merges these two sub-arrays into a single sorted sub-array in `arr[left..=right]`.
///
/// # Arguments
/// * `arr` - The vector containing the portions to merge. It is modified in place.
/// * `left` - Start index of the first sorted portion.
/// * `mid` - End index of the first sorted portion.
/// * `right` - End index of the second sorted portion.
///
/// # Performance
/// - Time Complexity: O(n), where n is the total number of elements in the two portions being merged (right - left + 1).
/// - Space Complexity: O(n) for the temporary vectors used to store the left and right portions.
fn merge(arr: &mut Vec<i32>, left: usize, mid: usize, right: usize) {
    let n1 = mid - left + 1;
    let n2 = right - mid;

    let mut left_half = Vec::with_capacity(n1);
    let mut right_half = Vec::with_capacity(n2);

    for i in 0..n1 {
        left_half.push(arr[left + i]);
    }
    for j in 0..n2 {
        right_half.push(arr[mid + 1 + j]);
    }

    let mut i = 0;
    let mut j = 0;
    let mut k = left;

    while i < n1 && j < n2 {
        if left_half[i] <= right_half[j] {
            arr[k] = left_half[i];
            i += 1;
        } else {
            arr[k] = right_half[j];
            j += 1;
        }
        k += 1;
    }

    while i < n1 {
        arr[k] = left_half[i];
        i += 1;
        k += 1;
    }

    while j < n2 {
        arr[k] = right_half[j];
        j += 1;
        k += 1;
    }
}

/// Internal recursive implementation of merge sort. Sorts `arr[left..=right]` in-place.
/// This function is intended for internal use by `merge_sort`.
///
/// # Arguments
/// * `arr` - The vector to sort. It will be modified in-place.
/// * `left` - The starting index of the portion of the array to sort.
/// * `right` - The ending index of the portion of the array to sort.
///
/// # Performance Notes (for this helper function)
/// - Time Complexity: O(N log N), where N = `right - left + 1`.
/// - Space Complexity: O(N) for temporary arrays in `merge` (for the portion being merged),
///   plus O(log N) extra space for the recursion stack.
fn _merge_sort_recursive_impl(arr: &mut Vec<i32>, left: usize, right: usize) {
    if left < right {
        let mid = left + (right - left) / 2;
        _merge_sort_recursive_impl(arr, left, mid);
        _merge_sort_recursive_impl(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}
/// # Performance
/// - Time Complexity: O(M + N log N), where M is `arr.len()` and N is `right - left + 1`.
///   - O(N log N) for sorting the portion `arr[left..=right]`.
///   - O(M) for cloning the entire `arr` to be returned.
///   If sorting the entire array (e.g., `left=0, right=arr.len()-1`), N approaches M,
///   so complexity is O(M log M).
/// - Space Complexity: O(M + N_temp), where M is for the cloned output vector and N_temp is the space
///   used by `merge` for temporary arrays (proportional to the segment size, up to M if sorting whole array).
///   Also includes O(log N) for the recursion stack depth.
fn merge_sort(arr: &mut Vec<i32>, left: usize, right: usize) -> Vec<i32> {
    if arr.is_empty() {
        return vec![];
    }
    if left > right {
        panic!("'left' index (value: {}) cannot be greater than 'right' index (value: {}).", left, right);
    }
    if right >= arr.len() {
        panic!("'right' index (value: {}) is out of bounds for array of length {}.", right, arr.len());
    }
    _merge_sort_recursive_impl(arr, left, right);
    arr.to_vec()
}

fn main() {
    println!("Merge Sort Example Usage:");

    // Example 1: Regular unsorted vector
    let mut numbers1 = vec![5, 1, 9, 3, 7, 2, 8, 6, 4];
    println!("Original array 1: {:?}", numbers1);
    let sorted_numbers1 = merge_sort(&mut numbers1, 0, numbers1.len() - 1);
    println!("Sorted array 1 (from return): {:?}", sorted_numbers1);
    println!("Original array 1 (after in-place sort): {:?}", numbers1);


    // Example 2: Array with duplicate elements
    let mut numbers2 = vec![4, 1, 3, 4, 1, 2, 4, 2];
    println!("\nOriginal array 2: {:?}", numbers2);
    let sorted_numbers2 = merge_sort(&mut numbers2, 0, numbers2.len() - 1);
    println!("Sorted array 2: {:?}", sorted_numbers2);

    // Example 3: Already sorted array
    let mut numbers3 = vec![1, 2, 3, 4, 5];
    println!("\nOriginal array 3: {:?}", numbers3);
    let sorted_numbers3 = merge_sort(&mut numbers3, 0, numbers3.len() - 1);
    println!("Sorted array 3: {:?}", sorted_numbers3);

    // Example 4: Reversed array
    let mut numbers4 = vec![5, 4, 3, 2, 1];
    println!("\nOriginal array 4: {:?}", numbers4);
    let sorted_numbers4 = merge_sort(&mut numbers4, 0, numbers4.len() - 1);
    println!("Sorted array 4: {:?}", sorted_numbers4);

    // Example 5: Single element array
    let mut numbers5 = vec![42];
    println!("\nOriginal array 5: {:?}", numbers5);
    let sorted_numbers5 = merge_sort(&mut numbers5, 0, numbers5.len() - 1);
    println!("Sorted array 5: {:?}", sorted_numbers5);

    // Example 6: Empty array
    let mut numbers6: Vec<i32> = vec![];
    println!("\nOriginal array 6: {:?}", numbers6);
    let sorted_numbers6 = merge_sort(&mut numbers6, 0, 0);
    println!("Sorted array 6: {:?}", sorted_numbers6);

    // Example 7: Sort a sub-segment
    let mut numbers7 = vec![0, 0, 0, 5, 1, 9, 3, 0, 0, 0];
    println!("\nOriginal array 7: {:?}", numbers7);
    let _ = merge_sort(&mut numbers7, 3, 6); // Sorts in place
    println!("Array 7 (sorted subsegment [3..=6]): {:?}", numbers7);
}

#[cfg(test)]
mod tests {

    use super::merge_sort;

    #[test]
    fn test_empty_vec() {
        let mut arr: Vec<i32> = vec![];
        let sorted_arr = merge_sort(&mut arr, 0, 0);
        assert_eq!(sorted_arr, vec![]);
        assert_eq!(arr, vec![]);
    }

    #[test]
    fn test_single_element() {
        let mut arr = vec![42];
        let len = arr.len();
        let sorted_arr = merge_sort(&mut arr, 0, len - 1);
        assert_eq!(sorted_arr, vec![42]);
        assert_eq!(arr, vec![42]);
    }

    #[test]
    fn test_sorted_input() {
        let mut arr = vec![1, 2, 3, 4, 5];
        let len = arr.len();
        let sorted_arr = merge_sort(&mut arr, 0, len - 1);
        assert_eq!(sorted_arr, vec![1, 2, 3, 4, 5]);
        assert_eq!(arr, vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn test_reversed_input() {
        let mut arr = vec![5, 4, 3, 2, 1];
        let len = arr.len();
        let sorted_arr = merge_sort(&mut arr, 0, len - 1);
        assert_eq!(sorted_arr, vec![1, 2, 3, 4, 5]);
        assert_eq!(arr, vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn test_duplicate_elements() {
        let mut arr = vec![4, 1, 3, 4, 1, 2];
        let len = arr.len();
        let sorted_arr = merge_sort(&mut arr, 0, len - 1);
        assert_eq!(sorted_arr, vec![1, 1, 2, 3, 4, 4]);
        assert_eq!(arr, vec![1, 1, 2, 3, 4, 4]);
    }

    #[test]
    fn test_odd_length_vec() {
        let mut arr = vec![7, 2, 8, 2, 7];
        let len = arr.len();
        let sorted_arr = merge_sort(&mut arr, 0, len - 1);
        assert_eq!(sorted_arr, vec![2, 2, 7, 7, 8]);
        assert_eq!(arr, vec![2, 2, 7, 7, 8]);
    }

    #[test]
    fn test_mixed_numbers() {
        let mut arr = vec![-5, 0, 10, -2, 5, 0, -10];
        let len = arr.len();
        let sorted_arr = merge_sort(&mut arr, 0, len - 1);
        assert_eq!(sorted_arr, vec![-10, -5, -2, 0, 0, 5, 10]);
        assert_eq!(arr, vec![-10, -5, -2, 0, 0, 5, 10]);
    }

    #[test]
    #[should_panic]
    fn test_panic_left_greater_than_right() {
        let mut arr = vec![1, 2, 3];
        merge_sort(&mut arr, 1, 0);
    }

    #[test]
    #[should_panic]
    fn test_panic_right_out_of_bounds() {
        let mut arr = vec![1, 2, 3];
        let len = arr.len();
        merge_sort(&mut arr, 0, len);
    }

    #[test]
    fn test_sort_sub_array() {
        let mut arr = vec![9, 8, 7,  3, 1, 2,  6, 5, 4];
        // Sorts elements at indices 3, 4, 5 which are [3,1,2]
        // merge_sort modifies arr in place and also returns a clone.
        let sorted_sub_part_clone = merge_sort(&mut arr, 3, 5);

        // The returned vector from merge_sort is a clone of the *entire* array after modification.
        assert_eq!(arr, vec![9, 8, 7,  1, 2, 3,  6, 5, 4]); // Check in-place modification
        assert_eq!(sorted_sub_part_clone, vec![9, 8, 7,  1, 2, 3,  6, 5, 4]); // Check returned clone
    }
}
