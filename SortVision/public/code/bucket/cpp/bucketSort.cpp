#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

// Bucket Sort (for floats in [0, 1))
// Time: Avg O(n + k), Worst O(n^2), Space: O(n + k)
void bucketSort(vector<float>& arr) {
    int n = (int)arr.size();
    vector<vector<float>> buckets(n);

    for (float x : arr) {
        int idx = min(n - 1, (int)(x * n));
        buckets[idx].push_back(x);
    }

    int k = 0;
    for (int i = 0; i < n; i++) {
        sort(buckets[i].begin(), buckets[i].end());
        for (float x : buckets[i]) arr[k++] = x;
    }
}

int main() {
    vector<float> arr = {0.42f, 0.32f, 0.23f, 0.52f, 0.25f, 0.47f, 0.51f};
    bucketSort(arr);
    for (float x : arr) cout << x << ' ';
    cout << '\n';
}
