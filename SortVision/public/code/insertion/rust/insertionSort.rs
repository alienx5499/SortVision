//! # Insertion Sort in Rust
//!
//! This module provides an implementation of the insertion sort algorithm
//! using generics and Rust's standard practices.
//!
//! ## Time Complexity
//! - Best Case: O(n)
//! - Average Case: O(n²)
//! - Worst Case: O(n²)
//!
//! ## Space Complexity
//! - O(1) Auxiliary
//!
//! ## Example
//! ```rust
//! let mut data = vec![5, 3, 4, 1, 2];
//! insertion_sort(&mut data);
//! assert_eq!(data, vec![1, 2, 3, 4, 5]);
//! ```

/// Performs insertion sort on a mutable slice of ordered elements.
/// 
/// # Arguments
/// * `arr` - A mutable slice of elements that implement the `Ord` trait.
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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_unsorted() {
        let mut data = vec![9, 5, 1, 4, 3];
        insertion_sort(&mut data);
        assert_eq!(data, vec![1, 3, 4, 5, 9]);
    }

    #[test]
    fn test_sorted() {
        let mut data = vec![1, 2, 3, 4, 5];
        insertion_sort(&mut data);
        assert_eq!(data, vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn test_single_element() {
        let mut data = vec![42];
        insertion_sort(&mut data);
        assert_eq!(data, vec![42]);
    }

    #[test]
    fn test_empty() {
        let mut data: Vec<i32> = vec![];
        insertion_sort(&mut data);
        assert_eq!(data, vec![]);
    }

    #[test]
    fn test_duplicates() {
        let mut data = vec![3, 3, 3];
        insertion_sort(&mut data);
        assert_eq!(data, vec![3, 3, 3]);
    }
}
