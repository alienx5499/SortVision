export const ALGORITHM_CODE_EXAMPLES = {
  bubbleSort: {
    python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
    javascript: `function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`,
    java: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
    cpp: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`,
  },
  mergeSort: {
    python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
    javascript: `function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    
    return result.concat(left.slice(i)).concat(right.slice(j));
}`,
    java: `public static int[] mergeSort(int[] arr) {
    if (arr.length <= 1) return arr;
    
    int mid = arr.length / 2;
    int[] left = mergeSort(Arrays.copyOfRange(arr, 0, mid));
    int[] right = mergeSort(Arrays.copyOfRange(arr, mid, arr.length));
    
    return merge(left, right);
}

private static int[] merge(int[] left, int[] right) {
    int[] result = new int[left.length + right.length];
    int i = 0, j = 0, k = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result[k++] = left[i++];
        } else {
            result[k++] = right[j++];
        }
    }
    
    while (i < left.length) result[k++] = left[i++];
    while (j < right.length) result[k++] = right[j++];
    
    return result;
}`,
    cpp: `void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

void merge(vector<int>& arr, int left, int mid, int right) {
    vector<int> temp(right - left + 1);
    int i = left, j = mid + 1, k = 0;
    
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) {
            temp[k++] = arr[i++];
        } else {
            temp[k++] = arr[j++];
        }
    }
    
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];
    
    for (int i = 0; i < k; i++) {
        arr[left + i] = temp[i];
    }
}`,
  },
  quickSort: {
    python: `def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
    javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}`,
    java: `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

private static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr, i, j);
        }
    }
    
    swap(arr, i + 1, high);
    return i + 1;
}`,
    cpp: `void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    
    swap(arr[i + 1], arr[high]);
    return i + 1;
}`,
  },
  heapSort: {
    python: `def heapify(arr, n, i):
    largest = i
    left, right = 2 * i + 1, 2 * i + 2
    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for end in range(n - 1, 0, -1):
        arr[0], arr[end] = arr[end], arr[0]
        heapify(arr, end, 0)
    return arr`,
    javascript: `function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

function heapSort(arr) {
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(arr, n, i);
    for (let end = n - 1; end > 0; end--) {
        [arr[0], arr[end]] = [arr[end], arr[0]];
        heapify(arr, end, 0);
    }
    return arr;
}`,
    java: `public static void heapSort(int[] arr) {
    int n = arr.length;
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int end = n - 1; end > 0; end--) {
        int t = arr[0]; arr[0] = arr[end]; arr[end] = t;
        heapify(arr, end, 0);
    }
}

private static void heapify(int[] arr, int n, int i) {
    int largest = i, left = 2 * i + 1, right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest != i) {
        int t = arr[i]; arr[i] = arr[largest]; arr[largest] = t;
        heapify(arr, n, largest);
    }
}`,
    cpp: `void heapify(vector<int>& a, int n, int i) {
    int best = i, L = 2 * i + 1, R = 2 * i + 2;
    if (L < n && a[L] > a[best]) best = L;
    if (R < n && a[R] > a[best]) best = R;
    if (best != i) {
        swap(a[i], a[best]);
        heapify(a, n, best);
    }
}

void heapSort(vector<int>& a) {
    int n = (int)a.size();
    for (int i = n / 2 - 1; i >= 0; i--) heapify(a, n, i);
    for (int end = n - 1; end > 0; end--) {
        swap(a[0], a[end]);
        heapify(a, end, 0);
    }
}`,
  },
  insertionSort: {
    python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
    javascript: `function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}`,
    java: `public static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i], j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
    cpp: `void insertionSort(vector<int>& a) {
    for (int i = 1; i < (int)a.size(); i++) {
        int key = a[i], j = i - 1;
        while (j >= 0 && a[j] > key) {
            a[j + 1] = a[j];
            j--;
        }
        a[j + 1] = key;
    }
}`,
  },
  selectionSort: {
    python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_i = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_i]:
                min_i = j
        arr[i], arr[min_i] = arr[min_i], arr[i]
    return arr`,
    javascript: `function selectionSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        if (minIdx !== i) [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
    return arr;
}`,
    java: `public static void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        if (minIdx != i) {
            int t = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = t;
        }
    }
}`,
    cpp: `void selectionSort(vector<int>& a) {
    int n = (int)a.size();
    for (int i = 0; i < n; i++) {
        int m = i;
        for (int j = i + 1; j < n; j++) {
            if (a[j] < a[m]) m = j;
        }
        if (m != i) swap(a[i], a[m]);
    }
}`,
  },
  radixSort: {
    python: `def counting_sort_by_digit(arr, exp):
    output = [0] * len(arr)
    count = [0] * 10
    for x in arr:
        count[(x // exp) % 10] += 1
    for i in range(1, 10):
        count[i] += count[i - 1]
    for x in reversed(arr):
        d = (x // exp) % 10
        count[d] -= 1
        output[count[d]] = x
    return output

def radix_sort(arr):
    if not arr:
        return arr
    m = max(arr)
    exp = 1
    while m // exp > 0:
        arr = counting_sort_by_digit(arr, exp)
        exp *= 10
    return arr`,
    javascript: `function countingSortByDigit(arr, exp) {
    const output = new Array(arr.length).fill(0);
    const count = new Array(10).fill(0);
    for (const x of arr) count[Math.floor(x / exp) % 10]++;
    for (let i = 1; i < 10; i++) count[i] += count[i - 1];
    for (let k = arr.length - 1; k >= 0; k--) {
        const d = Math.floor(arr[k] / exp) % 10;
        count[d]--;
        output[count[d]] = arr[k];
    }
    return output;
}

function radixSort(arr) {
    if (!arr.length) return arr;
    let m = Math.max(...arr);
    for (let exp = 1; Math.floor(m / exp) > 0; exp *= 10) {
        arr = countingSortByDigit(arr, exp);
    }
    return arr;
}`,
    java: `public static void radixSort(int[] arr) {
    int max = arr[0];
    for (int x : arr) if (x > max) max = x;
    for (int exp = 1; max / exp > 0; exp *= 10)
        countingSortByDigit(arr, exp);
}

private static void countingSortByDigit(int[] arr, int exp) {
    int n = arr.length;
    int[] output = new int[n];
    int[] count = new int[10];
    for (int x : arr) count[(x / exp) % 10]++;
    for (int i = 1; i < 10; i++) count[i] += count[i - 1];
    for (int k = n - 1; k >= 0; k--) {
        int d = (arr[k] / exp) % 10;
        count[d]--;
        output[count[d]] = arr[k];
    }
    System.arraycopy(output, 0, arr, 0, n);
}`,
    cpp: `void countingSortByDigit(vector<int>& a, int exp) {
    int n = (int)a.size();
    vector<int> out(n);
    int cnt[10] = {};
    for (int x : a) cnt[(x / exp) % 10]++;
    for (int i = 1; i < 10; i++) cnt[i] += cnt[i - 1];
    for (int k = n - 1; k >= 0; k--) {
        int d = (a[k] / exp) % 10;
        cnt[d]--;
        out[cnt[d]] = a[k];
    }
    a.swap(out);
}

void radixSort(vector<int>& a) {
    if (a.empty()) return;
    int mx = *max_element(a.begin(), a.end());
    for (int exp = 1; mx / exp > 0; exp *= 10)
        countingSortByDigit(a, exp);
}`,
  },
  bucketSort: {
    python: `def insertion_sort_bucket(bucket):
    for i in range(1, len(bucket)):
        key = bucket[i]
        j = i - 1
        while j >= 0 and bucket[j] > key:
            bucket[j + 1] = bucket[j]
            j -= 1
        bucket[j + 1] = key

def bucket_sort(arr):
    if len(arr) <= 1:
        return arr
    n = len(arr)
    mx = max(arr)
    buckets = [[] for _ in range(n)]
    for x in arr:
        idx = min(n - 1, int(n * x / (mx + 1)))
        buckets[idx].append(x)
    for b in buckets:
        insertion_sort_bucket(b)
    return [x for b in buckets for x in b]`,
    javascript: `function insertionSortBucket(bucket) {
    for (let i = 1; i < bucket.length; i++) {
        const key = bucket[i];
        let j = i - 1;
        while (j >= 0 && bucket[j] > key) {
            bucket[j + 1] = bucket[j];
            j--;
        }
        bucket[j + 1] = key;
    }
}

function bucketSort(arr) {
    if (arr.length <= 1) return arr;
    const n = arr.length;
    const mx = Math.max(...arr);
    const buckets = Array.from({ length: n }, () => []);
    for (const x of arr) {
        const idx = Math.min(n - 1, Math.floor((n * x) / (mx + 1)));
        buckets[idx].push(x);
    }
    buckets.forEach(insertionSortBucket);
    return buckets.flat();
}`,
    java: `public static void bucketSort(int[] arr) {
    int n = arr.length;
    if (n <= 1) return;
    int mx = arr[0];
    for (int x : arr) if (x > mx) mx = x;
    @SuppressWarnings("unchecked")
    ArrayList<Integer>[] buckets = new ArrayList[n];
    for (int i = 0; i < n; i++) buckets[i] = new ArrayList<>();
    for (int x : arr) {
        int idx = Math.min(n - 1, (int)((long)n * x / (mx + 1)));
        buckets[idx].add(x);
    }
    int k = 0;
    for (ArrayList<Integer> b : buckets) {
        Collections.sort(b);
        for (int x : b) arr[k++] = x;
    }
}`,
    cpp: `void bucketSort(vector<int>& a) {
    int n = (int)a.size();
    if (n <= 1) return;
    int mx = *max_element(a.begin(), a.end());
    vector<vector<int>> buckets(n);
    for (int x : a) {
        int idx = min(n - 1, (int)((long long)n * x / (mx + 1)));
        buckets[idx].push_back(x);
    }
    vector<int> out;
    for (auto& b : buckets) {
        sort(b.begin(), b.end());
        out.insert(out.end(), b.begin(), b.end());
    }
    a.swap(out);
}`,
  },
};
