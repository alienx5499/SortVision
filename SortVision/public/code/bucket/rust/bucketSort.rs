// Bucket Sort (for numbers in [0, 1))
// Time: Avg O(n + k), Worst O(n^2), Space: O(n + k)
pub fn bucket_sort(arr: &mut [f64]) {
    if arr.len() <= 1 {
        return;
    }

    let n = arr.len();
    let mut buckets: Vec<Vec<f64>> = vec![Vec::new(); n];

    for &x in arr.iter() {
        let mut idx = (x * n as f64) as usize;
        if idx >= n {
            idx = n - 1;
        }
        buckets[idx].push(x);
    }

    for b in &mut buckets {
        b.sort_by(|a, b| a.total_cmp(b));
    }

    let mut k = 0;
    for b in buckets {
        for x in b {
            arr[k] = x;
            k += 1;
        }
    }
}

fn main() {
    let mut arr = [0.42, 0.32, 0.23, 0.52, 0.25, 0.47, 0.51];
    bucket_sort(&mut arr);
    println!("{:?}", arr);
}
