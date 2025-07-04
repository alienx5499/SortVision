const BASE_URL = import.meta.env.DEV ? 'http://localhost:3001' : '';
const GEMINI_ENDPOINT = `${BASE_URL}/api/gemini`;

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
    developer: ['developer', 'creator', 'author', 'who made', 'who created', 'alienx', 'prabal', 'core developer'],
    support: ['donate', 'support', 'sponsor', 'coffee', 'contribution', 'help project']
};

// Helper function to check keywords
const containsKeyword = (query, keywords) => 
    keywords.some(keyword => query.toLowerCase().includes(keyword));

export async function processMessage(query, context) {
    // Early checks for common questions to avoid unnecessary processing
    const lowerCaseQuery = query.toLowerCase();
    if (containsKeyword(lowerCaseQuery, KEYWORDS.developer)) {
        return {
            type: 'response',
            content: generateDeveloperResponse()
        };
    }

    if (containsKeyword(lowerCaseQuery, KEYWORDS.support)) {
        return {
            type: 'response',
            content: generateSupportResponse()
        };
    }

    if (containsKeyword(lowerCaseQuery, KEYWORDS.github)) {
        return {
            type: 'response',
            content: generateGithubResponse()
        };
    }

    if (containsKeyword(lowerCaseQuery, KEYWORDS.thankYou)) {
        return {
            type: 'response',
            content: generateThankYouResponse()
        };
    }

    console.log("🧠 Context passed to assistant (assistantEngine):", context);
    
    const userMessage = { role: 'user', parts: [{ text: query }] };
    const messages = [...messageHistory, userMessage];

    try {
        const responseText = await geminiClient.getResponse(messages, context);
        const assistantMessage = { role: 'model', parts: [{ text: responseText }] };

        messageHistory.push(userMessage, assistantMessage);

        return { type: 'response', content: responseText };
    } catch (err) {
        console.error("❌ Error in processMessage:", err);
        return { type: 'error', content: 'Unable to reach assistant right now. Try again later.' };
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