// Bubble Sort (in-place)
// Time: Best O(n), Avg/Worst O(n^2), Space: O(1)
pub fn bubble_sort(arr: &mut [i32]) {
    let n = arr.len();
    for i in 0..n.saturating_sub(1) {
        let mut swapped = false;
        for j in 0..n - i - 1 {
            if arr[j] > arr[j + 1] {
                arr.swap(j, j + 1);
                swapped = true;
            }
        }
        if !swapped {
            break;
        }
    }
}

fn main() {
    let mut arr = [64, 34, 25, 12, 22, 11, 90];
    bubble_sort(&mut arr);
    println!("{:?}", arr);
}
