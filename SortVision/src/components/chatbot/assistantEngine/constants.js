export const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
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
};

export const INSTANT_RESPONSES = {
  support: `
    <div class="animate-fade-in space-y-1 max-w-full">
      <p class="m-0 text-emerald-400">Thank you for considering supporting SortVision! </p>
      <div class="flex flex-col gap-2 mt-1">
        <a href="https://github.com/alienx5499/SortVision" target="_blank" class="inline-flex items-center gap-1 px-3 py-2 rounded-md border border-yellow-400 text-yellow-300 hover:bg-yellow-400/10 transition-all duration-150 text-sm">
           Star on GitHub
        </a>
        <a href="https://github.com/sponsors/alienx5499" target="_blank" class="inline-flex items-center gap-1 px-3 py-2 rounded-md border border-pink-400 text-pink-300 hover:bg-pink-400/10 transition-all duration-150 text-sm">
           Sponsor on GitHub
        </a>
        <a href="https://buymeacoffee.com/alienx5499" target="_blank" class="inline-flex items-center gap-1 px-3 py-2 rounded-md border border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 transition-all duration-150 text-sm">
           Buy me a coffee
        </a>
      </div>
      <p class="m-0 text-xs text-slate-400">Your support helps keep SortVision free and improving! </p>
    </div>`,
  creator: `
    <div class="animate-fade-in space-y-1 max-w-full">
      <p class="m-0 text-indigo-400 font-semibold">SortVision was created by alienX (Prabal Patra)</p>
      <p class="m-0 text-sm">A passionate developer dedicated to making algorithm learning more interactive and fun! </p>
      <div class="flex flex-col sm:flex-row flex-wrap gap-2 text-sm mt-1">
        <a href="https://github.com/alienx5499" target="_blank" class="inline-flex items-center gap-1 px-3 py-2 rounded-md border border-emerald-400 text-emerald-300 hover:bg-emerald-400/10 transition-all duration-150">
           GitHub
        </a>
        <a href="https://www.linkedin.com/in/prabalpatra5499/" target="_blank" class="inline-flex items-center gap-1 px-3 py-2 rounded-md border border-blue-400 text-blue-300 hover:bg-blue-400/10 transition-all duration-150">
           LinkedIn
        </a>
        <a href="https://x.com/alienx5499" target="_blank" class="inline-flex items-center gap-1 px-3 py-2 rounded-md border border-sky-400 text-sky-300 hover:bg-sky-400/10 transition-all duration-150">
           Twitter
        </a>
      </div>
    </div>`,
  github: `
    <div class="animate-fade-in space-y-1 max-w-full">
      <p class="m-0 text-emerald-400">Check out SortVision on GitHub! </p>
      <div class="flex flex-col gap-2 mt-1">
        <a href="https://github.com/alienx5499/SortVision" target="_blank" class="inline-flex items-center gap-1 px-3 py-2 rounded-md border border-emerald-400 text-emerald-300 hover:bg-emerald-400/10 transition-all duration-150 text-sm">
           View Repository
        </a>
        <a href="https://github.com/alienx5499/SortVision/issues" target="_blank" class="inline-flex items-center gap-1 px-3 py-2 rounded-md border border-yellow-400 text-yellow-300 hover:bg-yellow-400/10 transition-all duration-150 text-sm">
           Report Issues
        </a>
        <a href="https://github.com/alienx5499/SortVision/discussions" target="_blank" class="inline-flex items-center gap-1 px-3 py-2 rounded-md border border-blue-400 text-blue-300 hover:bg-blue-400/10 transition-all duration-150 text-sm">
           Join Discussions
        </a>
      </div>
    </div>`,
  help: `
    <div class="animate-fade-in space-y-1 max-w-full">
      <p class="m-0 text-emerald-400">Hi there! I'm SortBot, your sorting algorithm assistant! </p>
      <p class="m-0 text-sm">I can help you understand sorting algorithms. Try asking:</p>
      <div class="grid grid-cols-1 gap-1 mt-2 text-xs">
        <p class="m-0">• "What is bubble sort?"</p>
        <p class="m-0">• "How does merge sort work?"</p>
        <p class="m-0">• "Compare quick sort vs heap sort"</p>
        <p class="m-0">• "What's the complexity of insertion sort?"</p>
        <p class="m-0">• "Show me code examples"</p>
        <p class="m-0">• "Which algorithm should I use?"</p>
      </div>
      <p class="m-0 text-xs text-blue-300">Tip: Pick an algorithm above to start visualizing!</p>
    </div>`,
};

// Fast keyword detection for instant responses
export const FAST_KEYWORDS = {
  support: ['support', 'donate', 'sponsor', 'coffee', 'buy me', 'funding'],
  creator: [
    'creator',
    'author',
    'developer',
    'made by',
    'who made',
    'prabal',
    'alienx',
  ],
  github: ['github', 'repo', 'repository', 'source code', 'source'],
  help: [
    'help',
    'hi',
    'hello',
    'hey',
    'hola',
    '你好',
    '您好',
    'नमस्ते',
    'bonjour',
    'salut',
    'hallo',
    'guten tag',
    'ciao',
    'こんにちは',
    'こんばんは',
    'ওহে',
    'হ্যালো',
    'namaste',
    'what can you do',
    'commands',
  ],
  thankYou: ['thank', 'thanks', 'thx', 'tysm', 'thank you'],
  code: [
    'code',
    'implementation',
    'example',
    'show me code',
    'programming',
    'syntax',
    'show code',
    'code example',
    'source code',
    'implementation',
    'write code',
    'generate code',
  ],
};
export const KEYWORDS = {
  github: ['github', 'repo', 'repository', 'source code', 'source'],
  thankYou: ['thank', 'thanks', 'thx', 'tysm', 'thank you'],
  quadratic: ['n^2', 'n2', 'o(n2)', 'o(n^2)', 'quadratic', 'square time'],
  developer: [
    'developer',
    'creator',
    'author',
    'who made',
    'who created',
    'alienx',
    'prabal',
    'core developer',
  ],
  support: [
    'donate',
    'support',
    'sponsor',
    'coffee',
    'contribution',
    'help project',
  ],
  bubbleSort: ['bubble sort', 'bubble', 'bubblesort'],
  mergeSort: ['merge sort', 'merge', 'mergesort'],
  quickSort: ['quick sort', 'quick', 'quicksort'],
  heapSort: ['heap sort', 'heap', 'heapsort'],
  insertionSort: ['insertion sort', 'insertion', 'insertionsort'],
  selectionSort: ['selection sort', 'selection', 'selectionsort'],
  radixSort: ['radix sort', 'radix', 'radixsort'],
  bucketSort: ['bucket sort', 'bucket', 'bucketsort'],
  complexity: [
    'complexity',
    'time complexity',
    'space complexity',
    'big o',
    'o(n)',
    'performance',
    'efficiency',
    'speed',
    'fast',
    'slow',
  ],
  howItWorks: [
    'how does',
    'how it works',
    'explain',
    'what is',
    'algorithm works',
    'how',
    'work',
    'mechanism',
    'process',
  ],
  comparison: [
    'compare',
    'difference',
    'vs',
    'versus',
    'better',
    'faster',
    'slower',
    'which is',
    'pros and cons',
    'advantages',
    'disadvantages',
  ],
  steps: [
    'steps',
    'process',
    'procedure',
    'how to',
    'algorithm',
    'step by step',
  ],
  current: ['this', 'current', 'what is this', 'tell me about this', 'now'],
  general: ['hello', 'hi', 'hey', 'help', 'what can you do'],
  examples: ['example', 'demo', 'show me', 'demonstrate', 'sample'],
  visualization: ['visualize', 'visual', 'animation', 'see', 'watch', 'demo'],
  beginner: ['beginner', 'basic', 'simple', 'easy', 'start', 'learn'],
  advanced: ['advanced', 'complex', 'optimization', 'optimize', 'improve'],
  realWorld: ['real world', 'practical', 'use case', 'application', 'where'],
  memory: ['memory', 'space', 'storage', 'ram', 'memory usage'],
  stability: ['stable', 'stability', 'preserve', 'order', 'equal elements'],
  inPlace: ['in place', 'in-place', 'constant space', 'o(1) space'],
  recursive: ['recursive', 'recursion', 'recursively'],
  iterative: ['iterative', 'loop', 'iteration', 'iteratively'],
  divideConquer: ['divide', 'conquer', 'divide and conquer', 'split'],
  greedy: ['greedy', 'greedy algorithm', 'local optimum'],
  dynamic: ['dynamic programming', 'memoization', 'dp'],
  followUp: [
    'more',
    'also',
    'additionally',
    'what else',
    'tell me more',
    'continue',
  ],
  clarification: ['what do you mean', 'clarify', 'explain more', 'elaborate'],
  reset: ['reset', 'start over', 'new conversation', 'clear', 'restart'],
};
export const INTENT_PATTERNS = {
  question:
    /^(what|how|why|when|where|which|who|can|could|would|should|is|are|do|does|did)\s/i,
  request:
    /^(please|can you|could you|would you|show me|tell me|explain|help)\s/i,
  comparison:
    /\b(vs|versus|compare|difference|better|worse|faster|slower|than)\b/i,
  complexity: /\b(o\(|big o|complexity|time|space|efficiency|performance)\b/i,
  example: /\b(example|demo|show|demonstrate|sample|instance)\b/i,
  step: /\b(step|process|procedure|how to|algorithm|method)\b/i,
  current: /\b(this|current|now|here|present)\b/i,
  followUp:
    /\b(more|also|additionally|what else|tell me more|continue|and|further)\b/i,
};

// Enhanced helper functions for better chat handling
export const ALGORITHM_DATA = {
  bubbleSort: {
    name: 'Bubble Sort',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description:
      'Compares adjacent elements and swaps them if they are in wrong order. Repeats until array is sorted.',
    bestFor: 'Educational purposes and small datasets',
    steps:
      'Compare adjacent elements → Swap if needed → Move to next pair → Repeat until no swaps needed',
  },
  mergeSort: {
    name: 'Merge Sort',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    description:
      'Divides array into halves, sorts them recursively, then merges sorted halves.',
    bestFor: 'Large datasets and when stable sorting is needed',
    steps:
      'Divide array in half → Sort left half → Sort right half → Merge sorted halves',
  },
  quickSort: {
    name: 'Quick Sort',
    timeComplexity: 'O(n log n) average, O(n²) worst',
    spaceComplexity: 'O(log n)',
    description:
      'Picks a pivot element and partitions array around it, then sorts partitions recursively.',
    bestFor: 'General purpose sorting with good average performance',
    steps:
      'Choose pivot → Partition array around pivot → Recursively sort left partition → Recursively sort right partition',
  },
  heapSort: {
    name: 'Heap Sort',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    description:
      'Builds a max heap from array, then repeatedly extracts maximum element.',
    bestFor: 'When consistent O(n log n) performance is needed',
    steps:
      'Build max heap → Extract max (root) → Restore heap property → Repeat until array is sorted',
  },
  insertionSort: {
    name: 'Insertion Sort',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description:
      'Builds sorted array one element at a time by inserting each element into its correct position.',
    bestFor: 'Small datasets and nearly sorted arrays',
    steps:
      'Start with second element → Compare with previous elements → Insert in correct position → Move to next element',
  },
  selectionSort: {
    name: 'Selection Sort',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description:
      'Finds minimum element and places it at the beginning, then repeats for remaining array.',
    bestFor: 'Situations where memory writes are costly',
    steps:
      'Find minimum element → Swap with first element → Find minimum in remaining array → Repeat',
  },
  radixSort: {
    name: 'Radix Sort',
    timeComplexity: 'O(d × n)',
    spaceComplexity: 'O(n + k)',
    description:
      'Sorts numbers digit by digit, starting from least significant digit.',
    bestFor: 'Sorting integers or fixed-length strings',
    steps:
      'Sort by least significant digit → Move to next digit → Repeat until all digits processed',
  },
  bucketSort: {
    name: 'Bucket Sort',
    timeComplexity: 'O(n + k)',
    spaceComplexity: 'O(n)',
    description:
      'Distributes elements into buckets, sorts each bucket, then concatenates buckets.',
    bestFor: 'Uniformly distributed data',
    steps:
      'Create buckets → Distribute elements into buckets → Sort each bucket → Concatenate buckets',
  },
};
