// Selection Sort (in-place)
// Time: Best/Avg/Worst O(n^2), Space: O(1)
pub fn selection_sort(arr: &mut [i32]) {
    let n = arr.len();
    for i in 0..n.saturating_sub(1) {
        let mut min_idx = i;
        for j in i + 1..n {
            if arr[j] < arr[min_idx] {
                min_idx = j;
            }
        }
        if min_idx != i {
            arr.swap(i, min_idx);
        }
    }
}

fn main() {
    let mut arr = [64, 25, 12, 22, 11];
    selection_sort(&mut arr);
    println!("{:?}", arr);
}
