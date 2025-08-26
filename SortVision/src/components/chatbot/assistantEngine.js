const GEMINI_ENDPOINT = process.env.NEXT_PUBLIC_GEMINI_ENDPOINT || 'http://localhost:3001/api/gemini';

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

        const fullMessages = [{ role: 'user', parts: [{ text: promptIntro }] }, ...messages];

        try {
        const res = await fetch(GEMINI_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: fullMessages }),
        });

        if (!res.ok) throw new Error('Assistant unreachable');

        const result = await res.json();
        const text = result?.text;
        if (!text) throw new Error('Empty response from Gemini');
        return text;
        } catch (err) {
            console.error("❌ Error in getResponse:", err);
            throw err;
        }
    }
}

const geminiClient = new GeminiClient();
let messageHistory = [];

// Keywords for quick checks
const KEYWORDS = {
    github: ['github', 'repo', 'repository', 'source code', 'source'],
    thankYou: ['thank', 'thanks', 'thx', 'tysm', 'thank you'],
    quadratic: ['n^2', 'n2', 'o(n2)', 'o(n^2)', 'quadratic', 'square time'],
    developer: ['developer', 'creator', 'author', 'who made', 'who created', 'alienx', 'prabal', 'core developer'],
    support: ['donate', 'support', 'sponsor', 'coffee', 'contribution', 'help project'],
    bubbleSort: ['bubble sort', 'bubble', 'bubblesort'],
    mergeSort: ['merge sort', 'merge', 'mergesort'],
    quickSort: ['quick sort', 'quick', 'quicksort'],
    heapSort: ['heap sort', 'heap', 'heapsort'],
    insertionSort: ['insertion sort', 'insertion', 'insertionsort'],
    selectionSort: ['selection sort', 'selection', 'selectionsort'],
    radixSort: ['radix sort', 'radix', 'radixsort'],
    bucketSort: ['bucket sort', 'bucket', 'bucketsort'],
    complexity: ['complexity', 'time complexity', 'space complexity', 'big o', 'o(n)', 'performance'],
    howItWorks: ['how does', 'how it works', 'explain', 'what is', 'algorithm works', 'how', 'work'],
    comparison: ['compare', 'difference', 'vs', 'versus', 'better', 'faster', 'slower'],
    steps: ['steps', 'process', 'procedure', 'how to', 'algorithm'],
    current: ['this', 'current', 'what is this', 'tell me about this'],
    general: ['hello', 'hi', 'hey', 'help', 'what can you do']
};

// Helper function to check keywords
const containsKeyword = (query, keywords) => 
    keywords.some(keyword => query.toLowerCase().includes(keyword));

export async function processMessage(query, context) {
    // Clean and validate input
    const cleanQuery = query.trim();
    if (!cleanQuery) {
        return { type: 'response', content: generateHelpResponse() };
    }
    
    const lowerCaseQuery = cleanQuery.toLowerCase();
    
    // Handle very short or unclear queries
    if (cleanQuery.length <= 2 || /^[^a-zA-Z]*$/.test(cleanQuery)) {
        return { type: 'response', content: generateClarificationResponse(context) };
    }
    
    // Quick responses that don't require API
    if (containsKeyword(lowerCaseQuery, KEYWORDS.developer)) {
        return { type: 'response', content: generateDeveloperResponse() };
    }

    if (containsKeyword(lowerCaseQuery, KEYWORDS.support)) {
        return { type: 'response', content: generateSupportResponse() };
    }

    if (containsKeyword(lowerCaseQuery, KEYWORDS.github)) {
        return { type: 'response', content: generateGithubResponse() };
    }

    if (containsKeyword(lowerCaseQuery, KEYWORDS.thankYou)) {
        return { type: 'response', content: generateThankYouResponse() };
    }

    if (
        containsKeyword(lowerCaseQuery, KEYWORDS.quadratic) ||
        /o\s*\(\s*n\s*(\^?2|²)\s*\)/i.test(lowerCaseQuery) ||
        lowerCaseQuery.includes("n squared") ||
        lowerCaseQuery.includes("quadratic complexity") ||
        lowerCaseQuery.includes("square time complexity")
        ) {
        const quadraticAlgos = ['bubbleSort', 'insertionSort', 'selectionSort'];
        const listItems = quadraticAlgos.map(key => {
            const algo = ALGORITHM_DATA[key];
            return `<p class="m-0 text-sm">• ${algo.name}: ${algo.description}</p>`;
        }).join("\n");

        return {
            type: 'response',
            content: `
                <div class="animate-fade-in space-y-1 max-w-full">
                    <p class="m-0 text-emerald-400">Sorting algorithms with O(n²) complexity:</p>
                    ${listItems}
                    <p class="m-0 text-xs text-slate-400">These are simple but slow on large datasets. Best for learning and small inputs.</p>
                </div>`
            };
        }

    if (
    /o\s*\(\s*n\s*log\s*n\s*\)/i.test(lowerCaseQuery) ||
    lowerCaseQuery.includes("n log n") ||
    lowerCaseQuery.includes("nlogn") ||
    lowerCaseQuery.includes("log linear") ||
    lowerCaseQuery.includes("logarithmic linear")
) {
    const nlognAlgos = ['mergeSort', 'quickSort', 'heapSort'];
    const listItems = nlognAlgos.map(key => {
        const algo = ALGORITHM_DATA[key];
        return `<p class="m-0 text-sm">• ${algo.name}: ${algo.description}</p>`;
    }).join("\n");

    return {
        type: 'response',
        content: `
            <div class="animate-fade-in space-y-1 max-w-full">
                <p class="m-0 text-emerald-400">Sorting algorithms with O(n log n) complexity:</p>
                ${listItems}
                <p class="m-0 text-xs text-slate-400">These are efficient algorithms widely used in practice for large datasets.</p>
            </div>`
    };
    // Quadratic complexity detection
    const quadraticResponse = detectComplexityAndRespond(cleanQuery, {
        keywordList: [
            ...KEYWORDS.quadratic,
            "n squared",
            "quadratic complexity",
            "square time complexity"
        ],
        regexList: [
            /o\s*\(\s*n\s*(\^?2|²)\s*\)/i
        ],
        algoKeys: ['bubbleSort', 'insertionSort', 'selectionSort'],
        title: "Sorting algorithms with O(n²) complexity:",
        description: "These are simple but slow on large datasets. Best for learning and small inputs."
    });
    if (quadraticResponse) return quadraticResponse;

    // N log N complexity detection
    const nlognResponse = detectComplexityAndRespond(cleanQuery, {
        keywordList: [
            "n log n",
            "nlogn",
            "log linear",
            "logarithmic linear"
        ],
        regexList: [
            /o\s*\(\s*n\s*log\s*n\s*\)/i
        ],
        algoKeys: ['mergeSort', 'quickSort', 'heapSort'],
        title: "Sorting algorithms with O(n log n) complexity:",
        description: "These are efficient algorithms widely used in practice for large datasets."
    });
    if (nlognResponse) return nlognResponse;
    
    // Check for specific algorithm requests in query (prioritize user intent over context)
    const algorithmResponse = generateAlgorithmResponse(lowerCaseQuery, context, true);
    if (algorithmResponse) {
        return { type: 'response', content: algorithmResponse };
    }

    console.log("🧠 Context passed to assistant (assistantEngine):", context);

    // Try API first, then fallback to local responses
    const userMessage = { role: 'user', parts: [{ text: query }] };
    const messages = [...messageHistory, userMessage];

    try {
        const responseText = await geminiClient.getResponse(messages, context);
        const assistantMessage = { role: 'model', parts: [{ text: responseText }] };

        messageHistory.push(userMessage, assistantMessage);

        return { type: 'response', content: responseText };
    } catch (err) {
        console.error("❌ Error in processMessage:", err);
        
        // Enhanced fallback with algorithm knowledge
        try {
            const fallbackResponse = generateFallbackResponse(lowerCaseQuery, context);
            return { type: 'response', content: fallbackResponse };
        } catch (fallbackErr) {
            console.error("❌ Error in fallback response:", fallbackErr);
            
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
                    </div>`
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
        description: 'Compares adjacent elements and swaps them if they are in wrong order. Repeats until array is sorted.',
        bestFor: 'Educational purposes and small datasets',
        steps: 'Compare adjacent elements → Swap if needed → Move to next pair → Repeat until no swaps needed'
    },
    mergeSort: {
        name: 'Merge Sort',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        description: 'Divides array into halves, sorts them recursively, then merges sorted halves.',
        bestFor: 'Large datasets and when stable sorting is needed',
        steps: 'Divide array in half → Sort left half → Sort right half → Merge sorted halves'
    },
    quickSort: {
        name: 'Quick Sort',
        timeComplexity: 'O(n log n) average, O(n²) worst',
        spaceComplexity: 'O(log n)',
        description: 'Picks a pivot element and partitions array around it, then sorts partitions recursively.',
        bestFor: 'General purpose sorting with good average performance',
        steps: 'Choose pivot → Partition array around pivot → Recursively sort left partition → Recursively sort right partition'
    },
    heapSort: {
        name: 'Heap Sort',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(1)',
        description: 'Builds a max heap from array, then repeatedly extracts maximum element.',
        bestFor: 'When consistent O(n log n) performance is needed',
        steps: 'Build max heap → Extract max (root) → Restore heap property → Repeat until array is sorted'
    },
    insertionSort: {
        name: 'Insertion Sort',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        description: 'Builds sorted array one element at a time by inserting each element into its correct position.',
        bestFor: 'Small datasets and nearly sorted arrays',
        steps: 'Start with second element → Compare with previous elements → Insert in correct position → Move to next element'
    },
    selectionSort: {
        name: 'Selection Sort',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        description: 'Finds minimum element and places it at the beginning, then repeats for remaining array.',
        bestFor: 'Situations where memory writes are costly',
        steps: 'Find minimum element → Swap with first element → Find minimum in remaining array → Repeat'
    },
    radixSort: {
        name: 'Radix Sort',
        timeComplexity: 'O(d × n)',
        spaceComplexity: 'O(n + k)',
        description: 'Sorts numbers digit by digit, starting from least significant digit.',
        bestFor: 'Sorting integers or fixed-length strings',
        steps: 'Sort by least significant digit → Move to next digit → Repeat until all digits processed'
    },
    bucketSort: {
        name: 'Bucket Sort',
        timeComplexity: 'O(n + k)',
        spaceComplexity: 'O(n)',
        description: 'Distributes elements into buckets, sorts each bucket, then concatenates buckets.',
        bestFor: 'Uniformly distributed data',
        steps: 'Create buckets → Distribute elements into buckets → Sort each bucket → Concatenate buckets'
    }
};

function generateAlgorithmResponse(query, context, prioritizeQuery = false) {
    const { algorithm } = context || {};
    
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
            return keyName === normalizedAlgorithm || key.toLowerCase() === normalizedAlgorithm;
        });
    }
    
    if (detectedAlgorithm && ALGORITHM_DATA[detectedAlgorithm]) {
        const algoData = ALGORITHM_DATA[detectedAlgorithm];
        
        if (containsKeyword(query, KEYWORDS.complexity)) {
            return `
                <div class="animate-fade-in space-y-1 max-w-full">
                    <p class="m-0 font-semibold text-emerald-400">${algoData.name} Complexity:</p>
                    <p class="m-0 text-sm">⏱️ Time: ${algoData.timeComplexity}</p>
                    <p class="m-0 text-sm">💾 Space: ${algoData.spaceComplexity}</p>
                    <p class="m-0 text-xs text-slate-400">${algoData.bestFor}</p>
                </div>`;
        }
        
        if (containsKeyword(query, KEYWORDS.steps) || containsKeyword(query, KEYWORDS.howItWorks)) {
            return `
                <div class="animate-fade-in space-y-1 max-w-full">
                    <p class="m-0 font-semibold text-blue-400">${algoData.name} Steps:</p>
                    <p class="m-0 text-sm">${algoData.steps}</p>
                    <p class="m-0 text-xs text-slate-400">💡 ${algoData.description}</p>
                </div>`;
        }
        
        // General algorithm info
        return `
            <div class="animate-fade-in space-y-1 max-w-full">
                <p class="m-0 font-semibold text-indigo-400">${algoData.name}</p>
                <p class="m-0 text-sm">${algoData.description}</p>
                <div class="flex gap-3 text-xs">
                    <span class="text-emerald-300">⏱️ ${algoData.timeComplexity}</span>
                    <span class="text-blue-300">💾 ${algoData.spaceComplexity}</span>
                </div>
                <p class="m-0 text-xs text-slate-400">Best for: ${algoData.bestFor}</p>
            </div>`;
    }
    
    return null;
}

function generateFallbackResponse(query, context) {
    const { algorithm, step, array } = context || {};
    
    // Handle general queries first
    if (containsKeyword(query, KEYWORDS.general)) {
        return generateHelpResponse();
    }
    
    // Handle questions about current visualization
    if (containsKeyword(query, KEYWORDS.current) && algorithm && algorithm !== 'Unknown') {
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
            return keyName === normalizedAlgorithm || key.toLowerCase() === normalizedAlgorithm;
        });
        
        const algoData = detectedAlgorithm ? ALGORITHM_DATA[detectedAlgorithm] : null;
        const displayName = algoData ? algoData.name : algorithm;
        
        if (array && array.length > 0) {
            return `
                <div class="animate-fade-in space-y-1 max-w-full">
                    <p class="m-0 text-emerald-400">Currently visualizing: <span class="font-semibold">${displayName}</span></p>
                    <p class="m-0 text-sm">Array: [${array.slice(0, 10).join(', ')}${array.length > 10 ? '...' : ''}]</p>
                    ${step !== undefined ? `<p class="m-0 text-xs text-slate-400">Step: ${step}</p>` : ''}
                    ${algoData ? `<p class="m-0 text-xs text-slate-300">⏱️ ${algoData.timeComplexity} • 💾 ${algoData.spaceComplexity}</p>` : ''}
                    <p class="m-0 text-xs text-blue-300">💡 Try asking about complexity, steps, or how this algorithm works!</p>
                </div>`;
        }
        
        return `
            <div class="animate-fade-in space-y-1 max-w-full">
                <p class="m-0 text-emerald-400">Algorithm: <span class="font-semibold">${displayName}</span></p>
                ${algoData ? `<p class="m-0 text-sm">${algoData.description}</p>` : '<p class="m-0 text-sm">Ready to visualize! Click play to see it in action.</p>'}
                ${algoData ? `<p class="m-0 text-xs text-slate-300">⏱️ ${algoData.timeComplexity} • 💾 ${algoData.spaceComplexity}</p>` : ''}
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
            ${currentAlgo ? `<p class="m-0 text-sm">Currently visualizing: <span class="font-semibold text-emerald-300">${currentAlgo}</span></p>` : ''}
            <div class="text-xs mt-2">
                <p class="m-0">Try asking something like:</p>
                <p class="m-0">• "How does this work?" • "What's the complexity?" • "Explain the steps"</p>
            </div>
            <p class="m-0 text-xs text-blue-300">💡 Or ask about any sorting algorithm!</p>
        </div>`;
}

function generateContextualResponse(query, context) {
    const { algorithm, step, array } = context || {};
    
    // Get algorithm data for display
    const normalizedAlgorithm = algorithm.toLowerCase().replace(/\s+/g, '');
    const detectedAlgorithm = Object.keys(ALGORITHM_DATA).find(key => {
        const keyName = key.toLowerCase().replace('sort', '');
        return keyName === normalizedAlgorithm || key.toLowerCase() === normalizedAlgorithm;
    });
    
    const algoData = detectedAlgorithm ? ALGORITHM_DATA[detectedAlgorithm] : null;
    const displayName = algoData ? algoData.name : algorithm;
    
    // Check what type of question about current algorithm
    if (containsKeyword(query, KEYWORDS.complexity)) {
        return algoData ? `
            <div class="animate-fade-in space-y-1 max-w-full">
                <p class="m-0 font-semibold text-emerald-400">${displayName} Complexity:</p>
                <p class="m-0 text-sm">⏱️ Time: ${algoData.timeComplexity}</p>
                <p class="m-0 text-sm">💾 Space: ${algoData.spaceComplexity}</p>
                <p class="m-0 text-xs text-slate-400">Best for: ${algoData.bestFor}</p>
            </div>` : generateBasicAlgorithmInfo(displayName, context);
    }
    
    if (containsKeyword(query, KEYWORDS.steps) || containsKeyword(query, KEYWORDS.howItWorks)) {
        return algoData ? `
            <div class="animate-fade-in space-y-1 max-w-full">
                <p class="m-0 font-semibold text-blue-400">How ${displayName} Works:</p>
                <p class="m-0 text-sm">${algoData.steps}</p>
                <p class="m-0 text-xs text-slate-400">💡 ${algoData.description}</p>
                ${array && array.length > 0 ? `<p class="m-0 text-xs text-emerald-300">Current array: [${array.slice(0, 8).join(', ')}${array.length > 8 ? '...' : ''}]</p>` : ''}
            </div>` : generateBasicAlgorithmInfo(displayName, context);
    }
    
    // General info about current algorithm
    return algoData ? `
        <div class="animate-fade-in space-y-1 max-w-full">
            <p class="m-0 font-semibold text-indigo-400">Currently: ${displayName}</p>
            <p class="m-0 text-sm">${algoData.description}</p>
            <div class="flex gap-3 text-xs">
                <span class="text-emerald-300">⏱️ ${algoData.timeComplexity}</span>
                <span class="text-blue-300">💾 ${algoData.spaceComplexity}</span>
            </div>
            ${array && array.length > 0 ? `<p class="m-0 text-xs text-slate-300">Array size: ${array.length} elements</p>` : ''}
            <p class="m-0 text-xs text-blue-300">💡 Ask about steps, complexity, or comparisons!</p>
        </div>` : generateBasicAlgorithmInfo(displayName, context);
}

function generateBasicAlgorithmInfo(algorithmName, context) {
    const { array, step } = context || {};
    return `
        <div class="animate-fade-in space-y-1 max-w-full">
            <p class="m-0 text-emerald-400">Currently visualizing: <span class="font-semibold">${algorithmName}</span></p>
            ${array && array.length > 0 ? `<p class="m-0 text-sm">Array: [${array.slice(0, 10).join(', ')}${array.length > 10 ? '...' : ''}]</p>` : ''}
            ${step !== undefined ? `<p class="m-0 text-xs text-slate-400">Step: ${step}</p>` : ''}
            <p class="m-0 text-xs text-blue-300">💡 Try asking specific questions about this algorithm!</p>
        </div>`;
}