// Quick Sort (in-place, Lomuto partition)
// Time: Best/Avg O(n log n), Worst O(n^2), Space: O(log n) recursion
pub fn quick_sort(arr: &mut [i32]) {
    if arr.len() <= 1 {
        return;
    }

    let p = partition(arr);
    let (left, right_with_pivot) = arr.split_at_mut(p);
    let (_, right) = right_with_pivot.split_at_mut(1);

    quick_sort(left);
    quick_sort(right);
}

fn partition(arr: &mut [i32]) -> usize {
    let len = arr.len();
    let pivot = arr[len - 1];
    let mut i = 0;

    for j in 0..len - 1 {
        if arr[j] <= pivot {
            arr.swap(i, j);
            i += 1;
        }
    }
    arr.swap(i, len - 1);
    i
}

fn main() {
    let mut arr = [64, 25, 12, 22, 11];
    quick_sort(&mut arr);
    println!("{:?}", arr);
}
