#include <iostream>
#include <vector>
using namespace std;

// Radix Sort (LSD, base 10, non-negative integers)
// Time: O(d * (n + k)), Space: O(n + k)
static int getMax(const vector<int>& arr) {
    int mx = arr[0];
    for (int x : arr) if (x > mx) mx = x;
    return mx;
}

static void countingSortByExp(vector<int>& arr, int exp) {
    vector<int> output(arr.size());
    int count[10] = {0};

    for (int x : arr) count[(x / exp) % 10]++;
    for (int i = 1; i < 10; i++) count[i] += count[i - 1];

    for (int i = (int)arr.size() - 1; i >= 0; i--) {
        int digit = (arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    arr = output;
}

void radixSort(vector<int>& arr) {
    int maxVal = getMax(arr);
    for (int exp = 1; maxVal / exp > 0; exp *= 10) {
        countingSortByExp(arr, exp);
    }
}

int main() {
    vector<int> arr = {170, 45, 75, 90, 802, 24, 2, 66};
    radixSort(arr);
    for (int x : arr) cout << x << ' ';
    cout << '\n';
}
