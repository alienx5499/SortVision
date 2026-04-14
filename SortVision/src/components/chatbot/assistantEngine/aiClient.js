const CHAT_API_ENDPOINT = '/api/chatbot';

const CHAT_PROVIDER = (
  process.env.NEXT_PUBLIC_CHAT_PROVIDER || 'local'
).toLowerCase();
const UI_LANGUAGE_NAMES = {
  en: 'English',
  es: 'Spanish',
  hi: 'Hindi',
  fr: 'French',
  de: 'German',
  zh: 'Chinese',
  bn: 'Bengali',
  ja: 'Japanese',
  jp: 'Japanese',
};

class ChatApiClient {
  async getResponse(messages, context) {
    const {
      algorithm = 'Unknown',
      step,
      array = [],
      uiLanguage = 'en',
    } = context || {};
    const safeStep = typeof step === 'number' ? step : JSON.stringify(step);
    const safeArray = Array.isArray(array) ? array.join(', ') : 'N/A';
    const normalizedUiLanguage = String(uiLanguage || 'en').toLowerCase();
    const targetLanguageName =
      UI_LANGUAGE_NAMES[normalizedUiLanguage] || UI_LANGUAGE_NAMES.en;

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
- Respond in ${targetLanguageName}. Keep this language consistently for the whole reply.

Current sorting context:
- Algorithm: ${algorithm}
- Step: ${safeStep}
- Array: [${safeArray}]
`.trim();

    const fullMessages = [
      { role: 'system', parts: [{ text: promptIntro }] },
      ...messages,
    ];

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8500);

      const res = await fetch(CHAT_API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: fullMessages }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorText = await res.text();
        let policy = '';
        let forceLocalOnly = false;
        let retryAfterMs = 0;
        try {
          const parsed = JSON.parse(errorText);
          policy = parsed?.policy || '';
          forceLocalOnly = parsed?.forceLocalOnly === true;
          retryAfterMs = Number(parsed?.retryAfterMs || 0);
        } catch {
          // Non-JSON error responses are handled by status code below.
        }
        if (process.env.NODE_ENV === 'development') {
          console.error('Error: API Error:', res.status, errorText);
        }
        if (res.status === 403 && policy === 'abuse_block') {
          const blockError = new Error('ABUSE_BLOCK');
          blockError.forceLocalOnly = forceLocalOnly;
          blockError.retryAfterMs = retryAfterMs;
          throw blockError;
        }
        throw new Error(`API Error: ${res.status}`);
      }

      const result = await res.json();
      const text = result?.text;
      if (!text) throw new Error('Empty response from API');
      return text;
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error: Error in getResponse:', err);
      }
      if (err.name === 'AbortError' || err.message.includes('timeout')) {
        throw new Error('TIMEOUT_ERROR', { cause: err });
      }
      if (
        err.message.includes('Failed to fetch') ||
        err.message.includes('NetworkError')
      ) {
        throw new Error('NETWORK_ERROR', { cause: err });
      }
      if (err.message.includes('API Error: 500')) {
        throw new Error('SERVER_ERROR', { cause: err });
      }
      if (err.message.includes('API Error: 504')) {
        throw new Error('TIMEOUT_ERROR', { cause: err });
      }
      if (err.message.includes('API Error: 429')) {
        throw new Error('RATE_LIMIT', { cause: err });
      }
      if (err.message === 'ABUSE_BLOCK') {
        throw err;
      }
      throw err;
    }
  }
}

const chatApiClient = new ChatApiClient();

const shouldUseRemoteAI = () => ['nvidia', 'remote'].includes(CHAT_PROVIDER);

export { chatApiClient, shouldUseRemoteAI };
