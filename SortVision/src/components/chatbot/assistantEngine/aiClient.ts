import {
  AbuseBlockError,
  type ChatApiClientMessage,
  type SortingAssistantContext,
} from '../types';

const CHAT_API_ENDPOINT = '/api/chatbot';

const CHAT_PROVIDER = (
  process.env.NEXT_PUBLIC_CHAT_PROVIDER || 'local'
).toLowerCase();

type TransportPolicyPayload = {
  policy: string;
  forceLocalOnly: boolean;
  retryAfterMs: number;
};

const UI_LANGUAGE_NAMES: Record<string, string> = {
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

function parseTransportPolicyPayload(
  rawPayload: string
): TransportPolicyPayload {
  try {
    const parsed = JSON.parse(rawPayload) as {
      policy?: unknown;
      forceLocalOnly?: unknown;
      retryAfterMs?: unknown;
    };

    const parsedRetryAfterMs =
      typeof parsed.retryAfterMs === 'number'
        ? parsed.retryAfterMs
        : Number(parsed.retryAfterMs);
    const retryAfterMs = Number.isFinite(parsedRetryAfterMs)
      ? Math.max(0, parsedRetryAfterMs)
      : 0;

    return {
      policy: typeof parsed.policy === 'string' ? parsed.policy : '',
      forceLocalOnly: parsed.forceLocalOnly === true,
      retryAfterMs,
    };
  } catch {
    return {
      policy: '',
      forceLocalOnly: false,
      retryAfterMs: 0,
    };
  }
}

function classifyTransportError(err: unknown): Error | AbuseBlockError {
  if (err instanceof AbuseBlockError) {
    return err;
  }

  const normalizedError = err instanceof Error ? err : new Error(String(err));

  if (
    normalizedError.name === 'AbortError' ||
    normalizedError.message.includes('timeout') ||
    normalizedError.message.includes('API Error: 504')
  ) {
    return new Error('TIMEOUT_ERROR', { cause: err });
  }

  if (
    normalizedError.message.includes('Failed to fetch') ||
    normalizedError.message.includes('NetworkError')
  ) {
    return new Error('NETWORK_ERROR', { cause: err });
  }

  if (normalizedError.message.includes('API Error: 500')) {
    return new Error('SERVER_ERROR', { cause: err });
  }

  if (normalizedError.message.includes('API Error: 429')) {
    return new Error('RATE_LIMIT', { cause: err });
  }

  return normalizedError;
}

class ChatApiClient {
  async getResponse(
    messages: ChatApiClientMessage[],
    context: SortingAssistantContext | undefined
  ): Promise<string> {
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
- NEVER use markdown syntax like *italics* or **bold** - just plain text.
- Always respond with clear, short, and helpful answers - no long explanations unless asked.
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

    const fullMessages: ChatApiClientMessage[] = [
      { role: 'system', parts: [{ text: promptIntro }] },
      ...messages,
    ];

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8500);

      try {
        const res = await fetch(CHAT_API_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: fullMessages }),
          signal: controller.signal,
        });

        if (!res.ok) {
          const errorText = await res.text();
          const policyPayload = parseTransportPolicyPayload(errorText);
          if (process.env.NODE_ENV === 'development') {
            console.error('Error: API Error:', res.status, errorText);
          }
          if (res.status === 403 && policyPayload.policy === 'abuse_block') {
            throw new AbuseBlockError('ABUSE_BLOCK', {
              forceLocalOnly: policyPayload.forceLocalOnly,
              retryAfterMs: policyPayload.retryAfterMs,
            });
          }
          throw new Error(`API Error: ${res.status}`);
        }

        const result: { text?: string } = await res.json();
        const text = result?.text;
        if (!text) throw new Error('Empty response from API');
        return text;
      } finally {
        clearTimeout(timeoutId);
      }
    } catch (err: unknown) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error: Error in getResponse:', err);
      }

      const classifiedError = classifyTransportError(err);
      throw classifiedError;
    }
  }
}

const chatApiClient = new ChatApiClient();

const shouldUseRemoteAI = () => ['nvidia', 'remote'].includes(CHAT_PROVIDER);

export { chatApiClient, shouldUseRemoteAI };
