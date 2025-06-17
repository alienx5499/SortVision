//! Insertion Sort Implementation in Rust
//!
//! This file contains a generic, in-place, and stable implementation of the insertion sort algorithm,
//! with documentation, examples, and test cases for educational purposes.

/// Performs insertion sort on a mutable slice of elements that implement the `Ord` trait.
///
/// Insertion sort builds the sorted list one item at a time by comparing each new element
/// with the elements before it and inserting it into the correct position.
///
/// # Arguments
///
/// * `arr` - A mutable slice of elements that will be sorted in-place
///
/// # Example
///
/// ```
/// let mut data = vec![4, 2, 7, 1, 3];
/// insertion_sort(&mut data);
/// assert_eq!(data, vec![1, 2, 3, 4, 7]);
/// ```
///
/// # Time Complexity
/// - Best Case: O(n)     [Already sorted]
/// - Average Case: O(n²)
/// - Worst Case: O(n²)   [Reverse sorted]
///
/// # Space Complexity
/// - O(1) auxiliary space (in-place)
///
/// # Stability
/// - Stable sort: maintains relative order of equal elements
pub fn insertion_sort<T: Ord>(arr: &mut [T]) {
    let len = arr.len();
    for i in 1..len {
        let mut j = i;
        while j > 0 && arr[j] < arr[j - 1] {
            arr.swap(j, j - 1);
            j -= 1;
        }
    }
}

/// Demonstrates usage of the insertion sort function.
fn main() {
    let mut nums = vec![29, 10, 14, 37, 13];
    println!("Original: {:?}", nums);
    insertion_sort(&mut nums);
    println!("Sorted:   {:?}", nums);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_sorted_array() {
        let mut data = vec![1, 2, 3, 4, 5];
        insertion_sort(&mut data);
        assert_eq!(data, vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn test_reverse_array() {
        let mut data = vec![5, 4, 3, 2, 1];
        insertion_sort(&mut data);
        assert_eq!(data, vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn test_duplicates() {
        let mut data = vec![3, 3, 2, 1, 2];
        insertion_sort(&mut data);
        assert_eq!(data, vec![1, 2, 2, 3, 3]);
    }

    #[test]
    fn test_single_element() {
        let mut data = vec![42];
        insertion_sort(&mut data);
        assert_eq!(data, vec![42]);
    }

    #[test]
    fn test_empty_array() {
        let mut data: Vec<i32> = vec![];
        insertion_sort(&mut data);
        assert!(data.is_empty());
    }
}
