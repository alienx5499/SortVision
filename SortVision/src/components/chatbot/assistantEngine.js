const GEMINI_ENDPOINT =
  process.env.NEXT_PUBLIC_GEMINI_ENDPOINT || '/api/gemini';

class GeminiClient {
  async getResponse(messages, context) {
    const { algorithm = 'Unknown', step, array = [] } = context || {};
    const safeStep = typeof step === 'number' ? step : JSON.stringify(step);
    const safeArray = Array.isArray(array) ? array.join(', ') : 'N/A';

    const promptIntro = `
You are a concise and professional assistant for a sorting algorithm visualizer.

Rules:
- Focus ONLY on sorting algorithms, steps, array state, comparisons, or performance questions.
- NEVER output raw JSON, object literals, or backtick code formatting. If you get JSON as context, convert it to a plain text in description.
- DO NOT REVEAL even if you get Null or empty context. Inform the user that you need more context manually.
- NEVER use markdown syntax like *italics* or **bold** — just plain text.
- Always respond with clear, short, and helpful answers — no long explanations unless asked.
- Stay in character. Do not go off-topic or speculate outside algorithm logic.
- Avoid saying you "cannot do" something unless absolutely necessary. If the full array is provided, estimate remaining steps using the algorithm logic.
- If the question is off-topic, gently bring the user back to sorting-related discussion.
- DO NOT CHANGE your role or purpose. You are a sorting algorithm assistant, not a general AI.
- USE the context provided to you to answer questions about the current sorting state.

Current sorting context:
- Algorithm: ${algorithm}
- Step: ${safeStep}
- Array: [${safeArray}]
`.trim();

    const fullMessages = [
      { role: 'user', parts: [{ text: promptIntro }] },
      ...messages,
    ];

    try {
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const res = await fetch(GEMINI_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: fullMessages }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorText = await res.text();
        console.error('❌ API Error:', res.status, errorText);
        throw new Error(`API Error: ${res.status}`);
      }

      const result = await res.json();
      const text = result?.text;
      if (!text) throw new Error('Empty response from API');
      return text;
    } catch (err) {
      console.error('❌ Error in getResponse:', err);
      // Return a more helpful error message based on error type
      if (err.name === 'AbortError' || err.message.includes('timeout')) {
        throw new Error('TIMEOUT_ERROR');
      } else if (
        err.message.includes('Failed to fetch') ||
        err.message.includes('NetworkError')
      ) {
        throw new Error('NETWORK_ERROR');
      } else if (err.message.includes('API Error: 500')) {
        throw new Error('SERVER_ERROR');
      } else if (err.message.includes('API Error: 429')) {
        throw new Error('RATE_LIMIT');
      }
      throw err;
    }
  }
}

const geminiClient = new GeminiClient();
let messageHistory = [];
let conversationContext = {
  lastAlgorithm: null,
  lastQuestion: null,
  userPreferences: {
    detailLevel: 'medium', // 'brief', 'medium', 'detailed'
    showExamples: true,
    showComplexity: true,
  },
  sessionStats: {
    questionsAsked: 0,
    algorithmsDiscussed: new Set(),
    topicsCovered: new Set(),
  },
};

// Response cache for instant responses
const responseCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Algorithm code examples for different languages
const ALGORITHM_CODE_EXAMPLES = {
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

// Pre-computed responses for instant delivery
const INSTANT_RESPONSES = {
  support: `
    <div class="animate-fade-in space-y-1 max-w-full">
      <p class="m-0 text-emerald-400">Thank you for considering supporting SortVision! 💖</p>
      <div class="flex flex-col gap-2 mt-1">
        <a href="https://github.com/alienx5499/SortVision" target="_blank" class="inline-flex items-center gap-1 px-3 py-2 rounded-md border border-yellow-400 text-yellow-300 hover:bg-yellow-400/10 transition-all duration-150 text-sm">
          ⭐ Star on GitHub
        </a>
        <a href="https://github.com/sponsors/alienx5499" target="_blank" class="inline-flex items-center gap-1 px-3 py-2 rounded-md border border-pink-400 text-pink-300 hover:bg-pink-400/10 transition-all duration-150 text-sm">
          ♥ Sponsor on GitHub
        </a>
        <a href="https://buymeacoffee.com/alienx5499" target="_blank" class="inline-flex items-center gap-1 px-3 py-2 rounded-md border border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 transition-all duration-150 text-sm">
          ☕ Buy me a coffee
        </a>
      </div>
      <p class="m-0 text-xs text-slate-400">Your support helps keep SortVision free and improving! 🙏</p>
    </div>`,
  creator: `
    <div class="animate-fade-in space-y-1 max-w-full">
      <p class="m-0 text-indigo-400 font-semibold">SortVision was created by alienX (Prabal Patra)</p>
      <p class="m-0 text-sm">A passionate developer dedicated to making algorithm learning more interactive and fun! 🚀</p>
      <div class="flex flex-col sm:flex-row flex-wrap gap-2 text-sm mt-1">
        <a href="https://github.com/alienx5499" target="_blank" class="inline-flex items-center gap-1 px-3 py-2 rounded-md border border-emerald-400 text-emerald-300 hover:bg-emerald-400/10 transition-all duration-150">
          🐙 GitHub
        </a>
        <a href="https://www.linkedin.com/in/prabalpatra5499/" target="_blank" class="inline-flex items-center gap-1 px-3 py-2 rounded-md border border-blue-400 text-blue-300 hover:bg-blue-400/10 transition-all duration-150">
          💼 LinkedIn
        </a>
        <a href="https://x.com/alienx5499" target="_blank" class="inline-flex items-center gap-1 px-3 py-2 rounded-md border border-sky-400 text-sky-300 hover:bg-sky-400/10 transition-all duration-150">
          🐦 Twitter
        </a>
      </div>
    </div>`,
  github: `
    <div class="animate-fade-in space-y-1 max-w-full">
      <p class="m-0 text-emerald-400">Check out SortVision on GitHub! 🐙</p>
      <div class="flex flex-col gap-2 mt-1">
        <a href="https://github.com/alienx5499/SortVision" target="_blank" class="inline-flex items-center gap-1 px-3 py-2 rounded-md border border-emerald-400 text-emerald-300 hover:bg-emerald-400/10 transition-all duration-150 text-sm">
          📂 View Repository
        </a>
        <a href="https://github.com/alienx5499/SortVision/issues" target="_blank" class="inline-flex items-center gap-1 px-3 py-2 rounded-md border border-yellow-400 text-yellow-300 hover:bg-yellow-400/10 transition-all duration-150 text-sm">
          🐛 Report Issues
        </a>
        <a href="https://github.com/alienx5499/SortVision/discussions" target="_blank" class="inline-flex items-center gap-1 px-3 py-2 rounded-md border border-blue-400 text-blue-300 hover:bg-blue-400/10 transition-all duration-150 text-sm">
          💬 Join Discussions
        </a>
      </div>
    </div>`,
  help: `
    <div class="animate-fade-in space-y-1 max-w-full">
      <p class="m-0 text-emerald-400">Hi there! I'm SortBot, your sorting algorithm assistant! 👋</p>
      <p class="m-0 text-sm">I can help you understand sorting algorithms. Try asking:</p>
      <div class="grid grid-cols-1 gap-1 mt-2 text-xs">
        <p class="m-0">• "What is bubble sort?"</p>
        <p class="m-0">• "How does merge sort work?"</p>
        <p class="m-0">• "Compare quick sort vs heap sort"</p>
        <p class="m-0">• "What's the complexity of insertion sort?"</p>
        <p class="m-0">• "Show me code examples"</p>
        <p class="m-0">• "Which algorithm should I use?"</p>
      </div>
      <p class="m-0 text-xs text-blue-300">💡 Pick an algorithm above to start visualizing!</p>
    </div>`,
};

// Fast keyword detection for instant responses
const FAST_KEYWORDS = {
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
  help: ['help', 'hi', 'hello', 'what can you do', 'commands'],
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

// Generate code examples for algorithms
const generateCodeExamples = (algorithmName, language = 'javascript') => {
  const algorithmKey = algorithmName.toLowerCase().replace(/\s+/g, '') + 'Sort';
  const codeExamples = ALGORITHM_CODE_EXAMPLES[algorithmKey];

  if (!codeExamples) {
    // If no specific algorithm, show a selection of popular algorithms
    if (algorithmName === 'Bubble Sort' || algorithmName === 'Unknown') {
      return `
        <div class="animate-fade-in space-y-2 max-w-full">
          <p class="m-0 font-semibold text-purple-400">Choose an Algorithm to See Code Examples</p>
          <p class="m-0 text-sm text-slate-300">Select an algorithm from the dropdown above, or ask for a specific one:</p>
          <div class="grid grid-cols-1 gap-2 mt-2">
            <button onclick="askForCode('Bubble Sort')" class="px-3 py-2 bg-slate-700 text-white text-sm rounded hover:bg-slate-600 transition-colors text-left">
              🔵 Bubble Sort - Simple O(n²) algorithm
            </button>
            <button onclick="askForCode('Merge Sort')" class="px-3 py-2 bg-slate-700 text-white text-sm rounded hover:bg-slate-600 transition-colors text-left">
              🟢 Merge Sort - Efficient O(n log n) algorithm
            </button>
            <button onclick="askForCode('Quick Sort')" class="px-3 py-2 bg-slate-700 text-white text-sm rounded hover:bg-slate-600 transition-colors text-left">
              🟡 Quick Sort - Fast average case O(n log n)
            </button>
          </div>
          <p class="m-0 text-xs text-blue-300">💡 Or type "show me [algorithm name] code" for a specific algorithm!</p>
        </div>`;
    }

    return `
      <div class="animate-fade-in space-y-1 max-w-full">
        <p class="m-0 text-yellow-400">Code examples not available for ${algorithmName}</p>
        <p class="m-0 text-sm">Try asking about Bubble Sort, Merge Sort, or Quick Sort!</p>
      </div>`;
  }

  const code = codeExamples[language] || codeExamples.javascript;
  const languageName = language.charAt(0).toUpperCase() + language.slice(1);

  // Generate a unique ID for this code block
  const codeId = `code-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  return `
    <div class="animate-fade-in space-y-2 max-w-full">
      <p class="m-0 font-semibold text-purple-400">${algorithmName} Implementation in ${languageName}</p>
      <div class="bg-slate-800 rounded-lg p-3 overflow-x-auto">
        <pre id="${codeId}" class="text-xs text-green-300 font-mono whitespace-pre-wrap"><code>${code}</code></pre>
      </div>
      <div class="flex flex-wrap gap-2">
        <button onclick="copyCodeById('${codeId}')" class="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors">
          📋 Copy Code
        </button>
        <button onclick="runCode('${algorithmName}', '${language}')" class="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors">
          ▶️ Run Code
        </button>
      </div>
      <p class="m-0 text-xs text-slate-400">💡 Click the buttons above to copy or run this code!</p>
    </div>`;
};

// Enhanced algorithm recommendation system
const generateAlgorithmRecommendation = (query, context) => {
  const lowerQuery = query.toLowerCase();

  // Use case based recommendations
  if (
    containsKeyword(lowerQuery, ['small', 'few elements', 'simple', 'beginner'])
  ) {
    return `
      <div class="animate-fade-in space-y-2 max-w-full">
        <p class="m-0 font-semibold text-emerald-400">For Small Datasets (≤ 50 elements):</p>
        <div class="space-y-1">
          <p class="m-0 text-sm">🥇 <strong>Insertion Sort</strong> - Best for small arrays, adaptive</p>
          <p class="m-0 text-sm">🥈 <strong>Selection Sort</strong> - Simple to understand and implement</p>
          <p class="m-0 text-sm">🥉 <strong>Bubble Sort</strong> - Educational purposes only</p>
        </div>
        <p class="m-0 text-xs text-blue-300">💡 Insertion Sort is often the fastest for small datasets!</p>
      </div>`;
  }

  if (
    containsKeyword(lowerQuery, ['large', 'big', 'many elements', 'production'])
  ) {
    return `
      <div class="animate-fade-in space-y-2 max-w-full">
        <p class="m-0 font-semibold text-emerald-400">For Large Datasets (> 1000 elements):</p>
        <div class="space-y-1">
          <p class="m-0 text-sm">🥇 <strong>Quick Sort</strong> - Fastest average case O(n log n)</p>
          <p class="m-0 text-sm">🥈 <strong>Merge Sort</strong> - Guaranteed O(n log n), stable</p>
          <p class="m-0 text-sm">🥉 <strong>Heap Sort</strong> - Guaranteed O(n log n), in-place</p>
        </div>
        <p class="m-0 text-xs text-blue-300">💡 Quick Sort is the most commonly used in production!</p>
      </div>`;
  }

  if (
    containsKeyword(lowerQuery, ['stable', 'preserve order', 'equal elements'])
  ) {
    return `
      <div class="animate-fade-in space-y-2 max-w-full">
        <p class="m-0 font-semibold text-emerald-400">For Stable Sorting (preserves equal elements order):</p>
        <div class="space-y-1">
          <p class="m-0 text-sm">🥇 <strong>Merge Sort</strong> - Stable, O(n log n)</p>
          <p class="m-0 text-sm">🥈 <strong>Insertion Sort</strong> - Stable, O(n²)</p>
          <p class="m-0 text-sm">🥉 <strong>Bubble Sort</strong> - Stable, O(n²)</p>
        </div>
        <p class="m-0 text-xs text-blue-300">💡 Merge Sort is the best stable sorting algorithm!</p>
      </div>`;
  }

  if (
    containsKeyword(lowerQuery, [
      'memory',
      'space',
      'in-place',
      'constant space',
    ])
  ) {
    return `
      <div class="animate-fade-in space-y-2 max-w-full">
        <p class="m-0 font-semibold text-emerald-400">For Memory-Efficient Sorting (O(1) space):</p>
        <div class="space-y-1">
          <p class="m-0 text-sm">🥇 <strong>Heap Sort</strong> - O(n log n), in-place</p>
          <p class="m-0 text-sm">🥈 <strong>Quick Sort</strong> - O(log n) space for recursion</p>
          <p class="m-0 text-sm">🥉 <strong>Insertion Sort</strong> - O(1) space, O(n²) time</p>
        </div>
        <p class="m-0 text-xs text-blue-300">💡 Heap Sort is the most memory-efficient O(n log n) algorithm!</p>
      </div>`;
  }

  return null;
};

// Enhanced keywords and intent detection
const KEYWORDS = {
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

// Intent detection patterns
const INTENT_PATTERNS = {
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
// Fast keyword detection for instant responses
const fastContainsKeyword = (query, keywords) => {
  const lowerQuery = query.toLowerCase();
  return keywords.some(keyword => lowerQuery.includes(keyword.toLowerCase()));
};

const containsKeyword = (query, keywords) =>
  keywords.some(keyword => query.toLowerCase().includes(keyword));

// Detect user intent from query
const detectIntent = query => {
  const intents = [];
  for (const [intent, pattern] of Object.entries(INTENT_PATTERNS)) {
    if (pattern.test(query)) {
      intents.push(intent);
    }
  }
  return intents;
};

// Extract algorithm mentions from query
const extractAlgorithms = query => {
  const algorithms = [];
  for (const [key, keywords] of Object.entries(KEYWORDS)) {
    if (key.endsWith('Sort') && containsKeyword(query, keywords)) {
      algorithms.push(key);
    }
  }
  return algorithms;
};

// Update conversation context
const updateContext = (query, context, _response) => {
  conversationContext.lastQuestion = query;
  conversationContext.sessionStats.questionsAsked++;

  if (context?.algorithm) {
    conversationContext.lastAlgorithm = context.algorithm;
    conversationContext.sessionStats.algorithmsDiscussed.add(context.algorithm);
  }

  // Detect topics covered
  const intents = detectIntent(query);
  intents.forEach(intent =>
    conversationContext.sessionStats.topicsCovered.add(intent)
  );

  // Update user preferences based on query patterns
  if (containsKeyword(query, KEYWORDS.beginner)) {
    conversationContext.userPreferences.detailLevel = 'detailed';
  } else if (containsKeyword(query, KEYWORDS.advanced)) {
    conversationContext.userPreferences.detailLevel = 'brief';
  }

  if (containsKeyword(query, KEYWORDS.examples)) {
    conversationContext.userPreferences.showExamples = true;
  }
};

// Generate smart follow-up suggestions
const generateFollowUpSuggestions = (query, context, algorithm) => {
  const suggestions = [];
  const intents = detectIntent(query);

  if (intents.includes('question') || intents.includes('request')) {
    if (algorithm && algorithm !== 'Unknown') {
      suggestions.push(`What's the time complexity of ${algorithm}?`);
      suggestions.push(`How does ${algorithm} work step by step?`);
      suggestions.push(`When should I use ${algorithm}?`);
    } else {
      suggestions.push('What is bubble sort?');
      suggestions.push('Compare merge sort vs quick sort');
      suggestions.push('Show me all sorting algorithms');
    }
  }

  if (intents.includes('comparison')) {
    suggestions.push('Which algorithm is fastest?');
    suggestions.push('What are the trade-offs?');
  }

  if (intents.includes('complexity')) {
    suggestions.push('What about space complexity?');
    suggestions.push('Show me examples of each complexity');
  }

  return suggestions.slice(0, 3); // Limit to 3 suggestions
};

// Generate contextual response based on conversation history
const generateContextualResponse = (query, context) => {
  const intents = detectIntent(query);
  const _algorithms = extractAlgorithms(query);

  // Handle follow-up questions
  if (intents.includes('followUp') && conversationContext.lastAlgorithm) {
    return generateFollowUpResponse(
      query,
      conversationContext.lastAlgorithm,
      context
    );
  }

  // Handle clarification requests
  if (intents.includes('clarification')) {
    return generateClarificationResponse(context);
  }

  // Handle reset requests
  if (containsKeyword(query, KEYWORDS.reset)) {
    return generateResetResponse();
  }

  return null;
};

// Generate follow-up response
const generateFollowUpResponse = (query, lastAlgorithm, _context) => {
  const algoData =
    ALGORITHM_DATA[lastAlgorithm.toLowerCase().replace(/\s+/g, '')];
  if (!algoData) return null;

  return `
    <div class="animate-fade-in space-y-1 max-w-full">
      <p class="m-0 text-emerald-400">More about ${algoData.name}:</p>
      <p class="m-0 text-sm">${algoData.description}</p>
      <div class="flex gap-3 text-xs">
        <span class="text-emerald-300">⏱️ ${algoData.timeComplexity}</span>
        <span class="text-blue-300">💾 ${algoData.spaceComplexity}</span>
      </div>
      <p class="m-0 text-xs text-slate-400">Best for: ${algoData.bestFor}</p>
      <div class="mt-2 text-xs text-blue-300">
        <p class="m-0">💡 Try asking: "What are the steps?" or "Show me an example"</p>
      </div>
    </div>`;
};

// Generate reset response
const generateResetResponse = () => {
  conversationContext.lastAlgorithm = null;
  conversationContext.lastQuestion = null;
  conversationContext.sessionStats.questionsAsked = 0;
  conversationContext.sessionStats.algorithmsDiscussed.clear();
  conversationContext.sessionStats.topicsCovered.clear();

  return `
    <div class="animate-fade-in space-y-1 max-w-full">
      <p class="m-0 text-emerald-400">🔄 Conversation Reset!</p>
      <p class="m-0 text-sm">I'm ready to help you learn about sorting algorithms from scratch!</p>
      <div class="text-xs mt-2">
        <p class="m-0">• "What is bubble sort?"</p>
        <p class="m-0">• "How does merge sort work?"</p>
        <p class="m-0">• "Compare all algorithms"</p>
      </div>
      <p class="m-0 text-xs text-blue-300">💡 Select an algorithm above to start visualizing!</p>
    </div>`;
};

export async function processMessage(query, context) {
  // Clean and validate input
  const cleanQuery = query.trim();
  if (!cleanQuery) {
    return { type: 'response', content: INSTANT_RESPONSES.help };
  }

  const lowerCaseQuery = cleanQuery.toLowerCase();

  // INSTANT RESPONSES - No processing overhead
  if (fastContainsKeyword(lowerCaseQuery, FAST_KEYWORDS.support)) {
    return { type: 'response', content: INSTANT_RESPONSES.support };
  }

  if (fastContainsKeyword(lowerCaseQuery, FAST_KEYWORDS.creator)) {
    return { type: 'response', content: INSTANT_RESPONSES.creator };
  }

  if (fastContainsKeyword(lowerCaseQuery, FAST_KEYWORDS.github)) {
    return { type: 'response', content: INSTANT_RESPONSES.github };
  }

  if (fastContainsKeyword(lowerCaseQuery, FAST_KEYWORDS.help)) {
    return { type: 'response', content: INSTANT_RESPONSES.help };
  }

  if (fastContainsKeyword(lowerCaseQuery, FAST_KEYWORDS.thankYou)) {
    return { type: 'response', content: generateThankYouResponse() };
  }

  // Handle code example requests
  if (fastContainsKeyword(lowerCaseQuery, FAST_KEYWORDS.code)) {
    console.log('🔍 Code request detected:', cleanQuery);
    const algorithm = context?.algorithm || 'Bubble Sort';
    const language = lowerCaseQuery.includes('python')
      ? 'python'
      : lowerCaseQuery.includes('java')
        ? 'java'
        : lowerCaseQuery.includes('cpp') || lowerCaseQuery.includes('c++')
          ? 'cpp'
          : 'javascript';
    console.log('📝 Generating code for:', algorithm, 'in', language);
    return {
      type: 'response',
      content: generateCodeExamples(algorithm, language),
    };
  }

  // Handle very short or unclear queries
  if (cleanQuery.length <= 2 || /^[^a-zA-Z]*$/.test(cleanQuery)) {
    return {
      type: 'response',
      content: generateClarificationResponse(context),
    };
  }

  // Update conversation context (only for non-instant responses)
  updateContext(cleanQuery, context);

  // Check cache first for non-instant responses
  const cacheKey = `${cleanQuery.toLowerCase()}_${context?.algorithm || 'none'}`;
  const cachedResponse = responseCache.get(cacheKey);
  if (
    cachedResponse &&
    Date.now() - cachedResponse.timestamp < CACHE_DURATION
  ) {
    return { type: 'response', content: cachedResponse.content };
  }

  // Check for algorithm recommendations
  const recommendation = generateAlgorithmRecommendation(cleanQuery, context);
  if (recommendation) {
    return { type: 'response', content: recommendation };
  }

  // Check for contextual responses
  const contextualResponse = generateContextualResponse(cleanQuery, context);
  if (contextualResponse) {
    // Cache the response
    responseCache.set(cacheKey, {
      content: contextualResponse,
      timestamp: Date.now(),
    });
    return { type: 'response', content: contextualResponse };
  }

  if (
    containsKeyword(lowerCaseQuery, KEYWORDS.quadratic) ||
    /o\s*\(\s*n\s*(\^?2|²)\s*\)/i.test(lowerCaseQuery) ||
    lowerCaseQuery.includes('n squared') ||
    lowerCaseQuery.includes('quadratic complexity') ||
    lowerCaseQuery.includes('square time complexity')
  ) {
    const quadraticAlgos = ['bubbleSort', 'insertionSort', 'selectionSort'];
    const listItems = quadraticAlgos
      .map(key => {
        const algo = ALGORITHM_DATA[key];
        return `<p class="m-0 text-sm">• ${algo.name}: ${algo.description}</p>`;
      })
      .join('\n');

    return {
      type: 'response',
      content: `
                <div class="animate-fade-in space-y-1 max-w-full">
                    <p class="m-0 text-emerald-400">Sorting algorithms with O(n²) complexity:</p>
                    ${listItems}
                    <p class="m-0 text-xs text-slate-400">These are simple but slow on large datasets. Best for learning and small inputs.</p>
                </div>`,
    };
  }

  if (
    /o\s*\(\s*n\s*log\s*n\s*\)/i.test(lowerCaseQuery) ||
    lowerCaseQuery.includes('n log n') ||
    lowerCaseQuery.includes('nlogn') ||
    lowerCaseQuery.includes('log linear') ||
    lowerCaseQuery.includes('logarithmic linear')
  ) {
    const nlognAlgos = ['mergeSort', 'quickSort', 'heapSort'];
    const listItems = nlognAlgos
      .map(key => {
        const algo = ALGORITHM_DATA[key];
        return `<p class="m-0 text-sm">• ${algo.name}: ${algo.description}</p>`;
      })
      .join('\n');

    return {
      type: 'response',
      content: `
                <div class="animate-fade-in space-y-1 max-w-full">
                    <p class="m-0 text-emerald-400">Sorting algorithms with O(n log n) complexity:</p>
                    ${listItems}
                    <p class="m-0 text-xs text-slate-400">These are efficient algorithms widely used in practice for large datasets.</p>
                </div>`,
    };
  }

  // Check for specific algorithm requests in query (prioritize user intent over context)
  const algorithmResponse = generateAlgorithmResponse(
    lowerCaseQuery,
    context,
    true
  );
  if (algorithmResponse) {
    // Add follow-up suggestions to algorithm responses
    const suggestions = generateFollowUpSuggestions(
      cleanQuery,
      context,
      context?.algorithm
    );
    if (suggestions.length > 0) {
      const enhancedResponse = algorithmResponse.replace(
        '</div>',
        `
        <div class="mt-3 p-2 bg-slate-800/30 rounded-lg border border-slate-600">
          <p class="m-0 text-xs text-blue-300 mb-2">💡 You might also ask:</p>
          ${suggestions
            .map(
              suggestion =>
                `<p class="m-0 text-xs text-slate-300 cursor-pointer hover:text-blue-300 transition-colors" onclick="this.parentElement.parentElement.parentElement.querySelector('input').value='${suggestion}'; this.parentElement.parentElement.parentElement.querySelector('input').focus();">• ${suggestion}</p>`
            )
            .join('')}
        </div>
        </div>`
      );
      return { type: 'response', content: enhancedResponse };
    }
    return { type: 'response', content: algorithmResponse };
  }

  console.log('🧠 Context passed to assistant (assistantEngine):', context);

  // Try API first, then fallback to local responses
  const userMessage = { role: 'user', parts: [{ text: query }] };
  const messages = [...messageHistory, userMessage];

  try {
    const responseText = await geminiClient.getResponse(messages, context);
    const assistantMessage = { role: 'model', parts: [{ text: responseText }] };

    messageHistory.push(userMessage, assistantMessage);

    // Enhance response with follow-up suggestions if appropriate
    const intents = detectIntent(cleanQuery);
    if (intents.includes('question') || intents.includes('request')) {
      const suggestions = generateFollowUpSuggestions(
        cleanQuery,
        context,
        context?.algorithm
      );
      if (suggestions.length > 0) {
        const enhancedResponse =
          responseText +
          `
          <div class="mt-3 p-2 bg-slate-800/30 rounded-lg border border-slate-600">
            <p class="m-0 text-xs text-blue-300 mb-2">💡 You might also ask:</p>
            ${suggestions
              .map(
                suggestion =>
                  `<p class="m-0 text-xs text-slate-300 cursor-pointer hover:text-blue-300 transition-colors" onclick="this.parentElement.parentElement.parentElement.querySelector('input').value='${suggestion}'; this.parentElement.parentElement.parentElement.querySelector('input').focus();">• ${suggestion}</p>`
              )
              .join('')}
          </div>`;
        return { type: 'response', content: enhancedResponse };
      }
    }

    return { type: 'response', content: responseText };
  } catch (err) {
    console.error('❌ Error in processMessage:', err);

    // Handle specific error types with appropriate responses
    if (err.message === 'TIMEOUT_ERROR') {
      return {
        type: 'response',
        content: `
          <div class="animate-fade-in space-y-1 max-w-full">
            <p class="m-0 text-orange-400">⏱️ Request Timeout</p>
            <p class="m-0 text-sm">The request took too long to process. Let me help you with local knowledge instead!</p>
            <div class="text-xs mt-2">
              <p class="m-0">• "What is bubble sort?"</p>
              <p class="m-0">• "How does merge sort work?"</p>
              <p class="m-0">• "Compare algorithms"</p>
            </div>
          </div>`,
      };
    }

    if (err.message === 'NETWORK_ERROR') {
      return {
        type: 'response',
        content: `
          <div class="animate-fade-in space-y-1 max-w-full">
            <p class="m-0 text-yellow-400">⚠️ Connection Issue</p>
            <p class="m-0 text-sm">I'm having trouble connecting to the AI service. Let me help you with local knowledge instead!</p>
            <div class="text-xs mt-2">
              <p class="m-0">• "What is bubble sort?"</p>
              <p class="m-0">• "How does merge sort work?"</p>
              <p class="m-0">• "Compare algorithms"</p>
            </div>
          </div>`,
      };
    }

    if (err.message === 'RATE_LIMIT') {
      return {
        type: 'response',
        content: `
          <div class="animate-fade-in space-y-1 max-w-full">
            <p class="m-0 text-orange-400">⏱️ Rate Limit Reached</p>
            <p class="m-0 text-sm">I'm getting too many requests. Please wait a moment and try again!</p>
            <p class="m-0 text-xs text-blue-300">💡 In the meantime, try exploring the algorithms above!</p>
          </div>`,
      };
    }

    if (err.message === 'SERVER_ERROR') {
      return {
        type: 'response',
        content: `
          <div class="animate-fade-in space-y-1 max-w-full">
            <p class="m-0 text-red-400">🔧 Server Issue</p>
            <p class="m-0 text-sm">There's a temporary server issue. Let me help you with local knowledge instead!</p>
            <div class="text-xs mt-2">
              <p class="m-0">• "What is bubble sort?"</p>
              <p class="m-0">• "How does merge sort work?"</p>
              <p class="m-0">• "Compare algorithms"</p>
            </div>
          </div>`,
      };
    }

    // Enhanced fallback with algorithm knowledge
    try {
      const fallbackResponse = generateFallbackResponse(
        lowerCaseQuery,
        context
      );
      return { type: 'response', content: fallbackResponse };
    } catch (fallbackErr) {
      console.error('❌ Error in fallback response:', fallbackErr);

      // Ultimate failsafe response
      return {
        type: 'response',
        content: `
                    <div class="animate-fade-in space-y-1 max-w-full">
                        <p class="m-0 text-emerald-400">I'm here to help with sorting algorithms! 🔄</p>
                        <p class="m-0 text-sm">Sorry, I encountered a temporary issue. Please try asking:</p>
                        <div class="text-xs mt-2">
                            <p class="m-0">• "What is bubble sort?"</p>
                            <p class="m-0">• "How does merge sort work?"</p>
                            <p class="m-0">• "Compare algorithms"</p>
                        </div>
                        <p class="m-0 text-xs text-blue-300">💡 Select an algorithm to start visualizing!</p>
                    </div>`,
      };
    }
  }
}

// Generate responses as separate functions for readability and reusability
function generateDeveloperResponse() {
  return `
        <div class="animate-fade-in animate-duration-100 space-y-1 max-w-full">
            <p class="m-0 leading-tight break-words">SortVision was created by <span class="text-indigo-400 font-semibold animate-pulse animate-duration-[800ms]">alienX (Prabal Patra)</span>, a passionate developer dedicated to making algorithm learning more interactive and fun! 🚀</p>
            <div class="flex flex-col sm:flex-row flex-wrap gap-2 text-sm mt-1">
                <a href="https://github.com/alienx5499" target="_blank" class="inline-flex items-center gap-1 px-3 py-2 rounded-md border border-emerald-400 text-emerald-300 hover:bg-emerald-400/10 transition-all duration-150">
                    🐙 GitHub
                </a>
                <a href="https://www.linkedin.com/in/prabalpatra5499/" target="_blank" class="inline-flex items-center gap-1 px-3 py-2 rounded-md border border-blue-400 text-blue-300 hover:bg-blue-400/10 transition-all duration-150">
                    💼 LinkedIn
                </a>
                <a href="https://x.com/alienx5499" target="_blank" class="inline-flex items-center gap-1 px-3 py-2 rounded-md border border-sky-400 text-sky-300 hover:bg-sky-400/10 transition-all duration-150">
                    🐦 Twitter
                </a>
            </div>
        </div>`;
}

function generateSupportResponse() {
  return `
        <div class="animate-fade-in animate-duration-150 space-y-0.5 max-w-full">
            <p class="m-0 leading-tight break-words">Thank you for considering supporting SortVision! 💖</p>
            <div class="flex flex-col gap-2 mt-1">
                <a href="https://github.com/alienx5499/SortVision" target="_blank" class="inline-flex items-center gap-1 px-3 py-2 rounded-md border border-yellow-400 text-yellow-300 hover:bg-yellow-400/10 transition-all duration-150 text-sm">
                    ⭐ Star on GitHub
                </a>
                <a href="https://github.com/sponsors/alienx5499" target="_blank" class="inline-flex items-center gap-1 px-3 py-2 rounded-md border border-pink-400 text-pink-300 hover:bg-pink-400/10 transition-all duration-150 text-sm">
                    ♥ Sponsor on GitHub
                </a>
                <a href="https://buymeacoffee.com/alienx5499" target="_blank" class="inline-flex items-center gap-1 px-3 py-2 rounded-md border border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 transition-all duration-150 text-sm">
                    ☕ Buy me a coffee
                </a>
            </div>
            <p class="m-0 text-xs text-slate-400 animate-pulse animate-duration-[1000ms] break-words">Your support helps keep SortVision free and improving! 🙏</p>
        </div>`;
}

function generateGithubResponse() {
  return `
        <div class="animate-fade-in animate-duration-150 space-y-0.5 max-w-full">
            <p class="m-0 leading-tight break-words">You can find SortVision on GitHub <a href="https://github.com/alienx5499/SortVision" target="_blank" class="text-blue-400 hover:text-blue-300 underline transition-colors duration-150">here</a>!</p>
            <div class="animate-bounce animate-duration-[1000ms]">
                <p class="text-sm break-words">If you find this project helpful, please give it a ⭐️ star on GitHub!</p>
            </div>
            <p class="m-0 text-xs text-slate-400 break-words">Your support helps us grow and improve! 🙏</p>
        </div>`;
}

function generateThankYouResponse() {
  return `
        <div class="animate-fade-in animate-duration-150 space-y-0.5 max-w-full">
            <p class="m-0 leading-tight break-words">You're welcome! 😊</p>
            <div class="animate-bounce animate-duration-[1000ms]">
                <p class="m-0 text-sm break-words">If you found SortVision helpful, please give us a ⭐️ star on <a href="https://github.com/alienx5499/SortVision" target="_blank" class="text-blue-400 hover:text-blue-300 underline transition-colors duration-150">GitHub</a>!</p>
            </div>
            <p class="m-0 text-xs text-slate-400 break-words">Your support means a lot to us! 🙏</p>
        </div>`;
}

// Algorithm knowledge base for local responses
const ALGORITHM_DATA = {
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

function generateAlgorithmResponse(query, context, prioritizeQuery = false) {
  const { algorithm } = context || {};
  const intents = detectIntent(query);

  // Detect algorithm from query first
  let detectedAlgorithm = null;
  for (const [key, keywords] of Object.entries(KEYWORDS)) {
    if (key.endsWith('Sort') && containsKeyword(query, keywords)) {
      detectedAlgorithm = key;
      break;
    }
  }

  // If prioritizing query and no algorithm found in query, don't use context
  if (prioritizeQuery && !detectedAlgorithm) {
    return null;
  }

  // Use context algorithm if no algorithm detected from query
  if (!detectedAlgorithm && algorithm && algorithm !== 'Unknown') {
    const normalizedAlgorithm = algorithm.toLowerCase().replace(/\s+/g, '');
    // Match algorithm names (bubble -> bubbleSort, merge -> mergeSort, etc.)
    detectedAlgorithm = Object.keys(ALGORITHM_DATA).find(key => {
      const keyName = key.toLowerCase().replace('sort', '');
      return (
        keyName === normalizedAlgorithm ||
        key.toLowerCase() === normalizedAlgorithm
      );
    });
  }

  if (detectedAlgorithm && ALGORITHM_DATA[detectedAlgorithm]) {
    const algoData = ALGORITHM_DATA[detectedAlgorithm];
    const detailLevel = conversationContext.userPreferences.detailLevel;

    // Handle complexity questions
    if (containsKeyword(query, KEYWORDS.complexity)) {
      let complexityInfo = `
                <div class="animate-fade-in space-y-1 max-w-full">
                    <p class="m-0 font-semibold text-emerald-400">${algoData.name} Complexity:</p>
                    <p class="m-0 text-sm">⏱️ Time: ${algoData.timeComplexity}</p>
          <p class="m-0 text-sm">💾 Space: ${algoData.spaceComplexity}</p>`;

      if (detailLevel === 'detailed') {
        complexityInfo += `
          <div class="mt-2 p-2 bg-slate-800/30 rounded-lg">
            <p class="m-0 text-xs text-blue-300">📊 Complexity Analysis:</p>
            <p class="m-0 text-xs text-slate-300">${getComplexityExplanation(algoData.timeComplexity, algoData.spaceComplexity)}</p>
                </div>`;
      }

      complexityInfo += `
        <p class="m-0 text-xs text-slate-400">Best for: ${algoData.bestFor}</p>
      </div>`;

      return complexityInfo;
    }

    // Handle step-by-step questions
    if (
      containsKeyword(query, KEYWORDS.steps) ||
      containsKeyword(query, KEYWORDS.howItWorks)
    ) {
      let stepsInfo = `
                <div class="animate-fade-in space-y-1 max-w-full">
                    <p class="m-0 font-semibold text-blue-400">${algoData.name} Steps:</p>
          <p class="m-0 text-sm">${algoData.steps}</p>`;

      if (detailLevel === 'detailed') {
        stepsInfo += `
          <div class="mt-2 p-2 bg-slate-800/30 rounded-lg">
            <p class="m-0 text-xs text-blue-300">🔍 Detailed Process:</p>
            <p class="m-0 text-xs text-slate-300">${getDetailedSteps(algoData.name)}</p>
          </div>`;
      }

      stepsInfo += `
                    <p class="m-0 text-xs text-slate-400">💡 ${algoData.description}</p>
                </div>`;

      return stepsInfo;
    }

    // Handle example requests
    if (containsKeyword(query, KEYWORDS.examples)) {
      return `
        <div class="animate-fade-in space-y-1 max-w-full">
          <p class="m-0 font-semibold text-purple-400">${algoData.name} Example:</p>
          <p class="m-0 text-sm">${getAlgorithmExample(algoData.name)}</p>
          <p class="m-0 text-xs text-slate-400">💡 ${algoData.description}</p>
        </div>`;
    }

    // Handle comparison requests
    if (intents.includes('comparison')) {
      return generateComparisonResponse(algoData, query);
    }

    // General algorithm info with enhanced details
    let generalInfo = `
            <div class="animate-fade-in space-y-1 max-w-full">
                <p class="m-0 font-semibold text-indigo-400">${algoData.name}</p>
                <p class="m-0 text-sm">${algoData.description}</p>
                <div class="flex gap-3 text-xs">
                    <span class="text-emerald-300">⏱️ ${algoData.timeComplexity}</span>
                    <span class="text-blue-300">💾 ${algoData.spaceComplexity}</span>
        </div>`;

    if (detailLevel === 'detailed') {
      generalInfo += `
        <div class="mt-2 p-2 bg-slate-800/30 rounded-lg">
          <p class="m-0 text-xs text-blue-300">📋 Key Characteristics:</p>
          <p class="m-0 text-xs text-slate-300">${getAlgorithmCharacteristics(algoData.name)}</p>
        </div>`;
    }

    generalInfo += `
                <p class="m-0 text-xs text-slate-400">Best for: ${algoData.bestFor}</p>
            </div>`;

    return generalInfo;
  }

  return null;
}

// Helper functions for enhanced responses
function getComplexityExplanation(timeComplexity, _spaceComplexity) {
  const explanations = {
    'O(n²)':
      'Quadratic time - performance degrades quickly with input size. Not suitable for large datasets.',
    'O(n log n)':
      'Log-linear time - efficient for most practical purposes. Good balance of performance and simplicity.',
    'O(n)':
      'Linear time - excellent performance, scales linearly with input size.',
    'O(log n)':
      'Logarithmic time - very efficient, performance barely changes with input size.',
    'O(1)':
      'Constant time - optimal performance, always takes the same amount of time.',
    'O(n + k)':
      'Linear time with additional factor - depends on both input size and range of values.',
  };

  return (
    explanations[timeComplexity] ||
    'Complexity analysis helps predict algorithm performance.'
  );
}

function getDetailedSteps(algorithmName) {
  const detailedSteps = {
    'Bubble Sort':
      '1. Start from the first element\n2. Compare with next element\n3. Swap if out of order\n4. Move to next pair\n5. Repeat until no swaps needed\n6. Array is now sorted',
    'Merge Sort':
      '1. Divide array into two halves\n2. Recursively sort left half\n3. Recursively sort right half\n4. Merge sorted halves\n5. Compare elements from both halves\n6. Place smaller element in result\n7. Continue until all elements merged',
    'Quick Sort':
      '1. Choose a pivot element\n2. Partition array around pivot\n3. Elements < pivot go left\n4. Elements > pivot go right\n5. Recursively sort left partition\n6. Recursively sort right partition\n7. Combine results',
    'Heap Sort':
      '1. Build max heap from array\n2. Swap root with last element\n3. Reduce heap size by 1\n4. Heapify the root\n5. Repeat steps 2-4\n6. Array is now sorted',
    'Insertion Sort':
      '1. Start with second element\n2. Compare with previous elements\n3. Shift larger elements right\n4. Insert current element\n5. Move to next element\n6. Repeat until array is sorted',
    'Selection Sort':
      '1. Find minimum element\n2. Swap with first position\n3. Find minimum in remaining array\n4. Swap with second position\n5. Continue for all positions\n6. Array is now sorted',
  };

  return (
    detailedSteps[algorithmName] ||
    'Step-by-step process varies by algorithm implementation.'
  );
}

function getAlgorithmExample(algorithmName) {
  const examples = {
    'Bubble Sort':
      'Array: [64, 34, 25, 12, 22, 11, 90]\nPass 1: [34, 25, 12, 22, 11, 64, 90]\nPass 2: [25, 12, 22, 11, 34, 64, 90]\nPass 3: [12, 22, 11, 25, 34, 64, 90]\nFinal: [11, 12, 22, 25, 34, 64, 90]',
    'Merge Sort':
      'Array: [38, 27, 43, 3, 9, 82, 10]\nDivide: [38, 27, 43] [3, 9, 82, 10]\nSort: [27, 38, 43] [3, 9, 10, 82]\nMerge: [3, 9, 10, 27, 38, 43, 82]',
    'Quick Sort':
      'Array: [10, 7, 8, 9, 1, 5]\nPivot 5: [1, 5, 8, 9, 10, 7]\nLeft: [1] Right: [8, 9, 10, 7]\nPivot 7: [1, 5, 7, 9, 10, 8]\nFinal: [1, 5, 7, 8, 9, 10]',
  };

  return (
    examples[algorithmName] ||
    'Example demonstrates the algorithm working on sample data.'
  );
}

function getAlgorithmCharacteristics(algorithmName) {
  const characteristics = {
    'Bubble Sort':
      '• Stable sorting algorithm\n• In-place sorting\n• Simple to understand\n• Adaptive (performs well on nearly sorted data)\n• Not suitable for large datasets',
    'Merge Sort':
      '• Stable sorting algorithm\n• Not in-place (requires extra memory)\n• Consistent O(n log n) performance\n• Good for large datasets\n• Parallelizable',
    'Quick Sort':
      '• Not stable (can change relative order)\n• In-place sorting\n• Fast average case performance\n• Worst case O(n²) performance\n• Widely used in practice',
    'Heap Sort':
      '• Not stable\n• In-place sorting\n• Guaranteed O(n log n) performance\n• Not adaptive\n• Good for embedded systems',
    'Insertion Sort':
      '• Stable sorting algorithm\n• In-place sorting\n• Adaptive and online\n• Good for small datasets\n• Simple implementation',
    'Selection Sort':
      '• Not stable\n• In-place sorting\n• Simple to implement\n• Not adaptive\n• Minimum number of swaps',
  };

  return (
    characteristics[algorithmName] ||
    'Each algorithm has unique characteristics and trade-offs.'
  );
}

function generateComparisonResponse(algoData, _query) {
  const comparisons = {
    'Bubble Sort':
      'Bubble Sort is simple but slow. Use only for educational purposes or very small datasets.',
    'Merge Sort':
      'Merge Sort is stable and consistent. Great for large datasets where stability matters.',
    'Quick Sort':
      'Quick Sort is fast on average. Best general-purpose sorting algorithm for most cases.',
    'Heap Sort':
      'Heap Sort guarantees O(n log n) performance. Good when you need consistent performance.',
    'Insertion Sort':
      'Insertion Sort is simple and adaptive. Best for small datasets or nearly sorted data.',
    'Selection Sort':
      'Selection Sort minimizes swaps. Use when memory writes are expensive.',
  };

  return `
    <div class="animate-fade-in space-y-1 max-w-full">
      <p class="m-0 font-semibold text-yellow-400">${algoData.name} Comparison:</p>
      <p class="m-0 text-sm">${comparisons[algoData.name] || 'This algorithm has unique characteristics.'}</p>
      <div class="flex gap-3 text-xs">
        <span class="text-emerald-300">⏱️ ${algoData.timeComplexity}</span>
        <span class="text-blue-300">💾 ${algoData.spaceComplexity}</span>
      </div>
      <p class="m-0 text-xs text-slate-400">Best for: ${algoData.bestFor}</p>
    </div>`;
}

function generateFallbackResponse(query, context) {
  const { algorithm, step, array } = context || {};

  // Handle general queries first
  if (containsKeyword(query, KEYWORDS.general)) {
    return generateHelpResponse();
  }

  // Handle questions about current visualization
  if (
    containsKeyword(query, KEYWORDS.current) &&
    algorithm &&
    algorithm !== 'Unknown'
  ) {
    return generateContextualResponse(query, context);
  }

  // Try algorithm-specific response (don't prioritize context for unclear queries)
  const algorithmResponse = generateAlgorithmResponse(query, context, false);
  if (algorithmResponse) {
    return algorithmResponse;
  }

  // Context-based responses
  if (algorithm && algorithm !== 'Unknown') {
    // Get algorithm data for display
    const normalizedAlgorithm = algorithm.toLowerCase().replace(/\s+/g, '');
    const detectedAlgorithm = Object.keys(ALGORITHM_DATA).find(key => {
      const keyName = key.toLowerCase().replace('sort', '');
      return (
        keyName === normalizedAlgorithm ||
        key.toLowerCase() === normalizedAlgorithm
      );
    });

    const algoData = detectedAlgorithm
      ? ALGORITHM_DATA[detectedAlgorithm]
      : null;
    const displayName = algoData ? algoData.name : algorithm;

    if (array && array.length > 0) {
      return `
                <div class="animate-fade-in space-y-1 max-w-full">
                    <p class="m-0 text-emerald-400">Currently visualizing: <span class="font-semibold">${displayName}</span></p>
                    <p class="m-0 text-sm">Array: [${array
                      .slice(0, 10)
                      .join(', ')}${array.length > 10 ? '...' : ''}]</p>
                    ${
                      step !== undefined
                        ? `<p class="m-0 text-xs text-slate-400">Step: ${step}</p>`
                        : ''
                    }
                    ${
                      algoData
                        ? `<p class="m-0 text-xs text-slate-300">⏱️ ${algoData.timeComplexity} • 💾 ${algoData.spaceComplexity}</p>`
                        : ''
                    }
                    <p class="m-0 text-xs text-blue-300">💡 Try asking about complexity, steps, or how this algorithm works!</p>
                </div>`;
    }

    return `
            <div class="animate-fade-in space-y-1 max-w-full">
                <p class="m-0 text-emerald-400">Algorithm: <span class="font-semibold">${displayName}</span></p>
                ${
                  algoData
                    ? `<p class="m-0 text-sm">${algoData.description}</p>`
                    : '<p class="m-0 text-sm">Ready to visualize! Click play to see it in action.</p>'
                }
                ${
                  algoData
                    ? `<p class="m-0 text-xs text-slate-300">⏱️ ${algoData.timeComplexity} • 💾 ${algoData.spaceComplexity}</p>`
                    : ''
                }
                <p class="m-0 text-xs text-blue-300">💡 Ask me about complexity, steps, or how it works!</p>
            </div>`;
  }

  // General sorting questions
  if (containsKeyword(query, KEYWORDS.comparison)) {
    return `
            <div class="animate-fade-in space-y-1 max-w-full">
                <p class="m-0 font-semibold text-yellow-400">Algorithm Comparison Tips:</p>
                <p class="m-0 text-sm">• Bubble Sort: Simple but slow O(n²)</p>
                <p class="m-0 text-sm">• Merge Sort: Stable, consistent O(n log n)</p>
                <p class="m-0 text-sm">• Quick Sort: Fast average case O(n log n)</p>
                <p class="m-0 text-sm">• Heap Sort: Guaranteed O(n log n)</p>
                <p class="m-0 text-xs text-blue-300">💡 Select an algorithm to see it in action!</p>
            </div>`;
  }

  // Default helpful response
  return `
        <div class="animate-fade-in space-y-1 max-w-full">
            <p class="m-0 text-emerald-400">I'm here to help with sorting algorithms! 🔄</p>
            <p class="m-0 text-sm">You can ask me about:</p>
            <p class="m-0 text-xs">• How algorithms work • Time/space complexity • Algorithm steps • Comparisons</p>
            <p class="m-0 text-xs text-blue-300">💡 Select an algorithm and start visualizing!</p>
        </div>`;
}

function generateHelpResponse() {
  return `
        <div class="animate-fade-in space-y-1 max-w-full">
            <p class="m-0 text-emerald-400">Hi there! I'm SortBot, your sorting algorithm assistant! 👋</p>
            <p class="m-0 text-sm">I can help you understand sorting algorithms. Try asking:</p>
            <div class="grid grid-cols-1 gap-1 mt-2 text-xs">
                <p class="m-0">• "What is bubble sort?"</p>
                <p class="m-0">• "How does merge sort work?"</p>
                <p class="m-0">• "Compare quick sort vs heap sort"</p>
                <p class="m-0">• "What's the complexity of insertion sort?"</p>
            </div>
            <p class="m-0 text-xs text-blue-300">💡 Pick an algorithm above to start visualizing!</p>
        </div>`;
}

function generateClarificationResponse(context) {
  const { algorithm } = context || {};
  const currentAlgo = algorithm && algorithm !== 'Unknown' ? algorithm : null;

  return `
        <div class="animate-fade-in space-y-1 max-w-full">
            <p class="m-0 text-yellow-400">I didn't quite understand that. Can you be more specific? 🤔</p>
            ${
              currentAlgo
                ? `<p class="m-0 text-sm">Currently visualizing: <span class="font-semibold text-emerald-300">${currentAlgo}</span></p>`
                : ''
            }
            <div class="text-xs mt-2">
                <p class="m-0">Try asking something like:</p>
                <p class="m-0">• "How does this work?" • "What's the complexity?" • "Explain the steps"</p>
            </div>
            <p class="m-0 text-xs text-blue-300">💡 Or ask about any sorting algorithm!</p>
        </div>`;
}

function _generateBasicAlgorithmInfo(algorithmName, context) {
  const { array, step } = context || {};
  return `
        <div class="animate-fade-in space-y-1 max-w-full">
            <p class="m-0 text-emerald-400">Currently visualizing: <span class="font-semibold">${algorithmName}</span></p>
            ${
              array && array.length > 0
                ? `<p class="m-0 text-sm">Array: [${array
                    .slice(0, 10)
                    .join(', ')}${array.length > 10 ? '...' : ''}]</p>`
                : ''
            }
            ${
              step !== undefined
                ? `<p class="m-0 text-xs text-slate-400">Step: ${step}</p>`
                : ''
            }
            <p class="m-0 text-xs text-blue-300">💡 Try asking specific questions about this algorithm!</p>
        </div>`;
}
