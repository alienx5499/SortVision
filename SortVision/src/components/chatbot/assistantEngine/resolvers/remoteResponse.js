import { detectIntent, generateFollowUpSuggestions } from '../intentHandlers';
import { generateFallbackResponse } from '../contextResponses';
import { chatApiClient } from '../aiClient';
import { appendSuggestions } from './localResponse';

const escapeHtml = value =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const formatRemoteResponseContent = text => {
  const safeText = escapeHtml(text || '');
  const lines = safeText
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);

  const paragraphs =
    lines.length > 0
      ? lines.map(line => `<p class="m-0 text-sm">${line}</p>`).join('')
      : '<p class="m-0 text-sm">No response</p>';

  return `<div class="animate-fade-in space-y-1 max-w-full">${paragraphs}</div>`;
};

const resolveRemoteResponse = async ({
  query,
  cleanQuery,
  lowerCaseQuery,
  context,
  conversationContext,
  messageHistory,
}) => {
  const userMessage = { role: 'user', parts: [{ text: query }] };
  const messages = [...messageHistory, userMessage];

  try {
    const responseText = await chatApiClient.getResponse(messages, context);
    const safeResponseContent = formatRemoteResponseContent(responseText);
    const assistantMessage = { role: 'model', parts: [{ text: responseText }] };
    messageHistory.push(userMessage, assistantMessage);

    const intents = detectIntent(cleanQuery);
    if (intents.includes('question') || intents.includes('request')) {
      const suggestions = generateFollowUpSuggestions(
        cleanQuery,
        context,
        context?.algorithm
      );
      return {
        type: 'response',
        content: appendSuggestions(safeResponseContent, suggestions),
      };
    }

    return { type: 'response', content: safeResponseContent };
  } catch (err) {
    console.error('Error: Error in processMessage:', err);

    if (err?.message === 'ABUSE_BLOCK') {
      conversationContext.forceLocalOnly = true;
      const retryAfterMs = Number(err?.retryAfterMs || 0);
      const retryAfterHours =
        retryAfterMs > 0 ? Math.ceil(retryAfterMs / 3600000) : null;
      return {
        type: 'response',
        content: `
          <div class="animate-fade-in space-y-1 max-w-full">
            <p class="m-0 text-red-400">Remote chat is temporarily blocked due to repeated abusive input.</p>
            <p class="m-0 text-sm">Local sorting help is still available in this session.</p>
            <p class="m-0 text-xs text-blue-300">${retryAfterHours ? `Remote access may return in about ${retryAfterHours} hour(s).` : 'Please continue respectfully with sorting-related questions.'}</p>
          </div>`,
      };
    }

    if (err.message === 'TIMEOUT_ERROR') {
      return {
        type: 'response',
        content: `
          <div class="animate-fade-in space-y-1 max-w-full">
            <p class="m-0 text-orange-400"> Request Timeout</p>
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
            <p class="m-0 text-yellow-400"> Connection Issue</p>
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
            <p class="m-0 text-orange-400"> Rate Limit Reached</p>
            <p class="m-0 text-sm">I'm getting too many requests. Please wait a moment and try again!</p>
            <p class="m-0 text-xs text-blue-300">Tip: In the meantime, try exploring the algorithms above!</p>
          </div>`,
      };
    }

    if (err.message === 'SERVER_ERROR') {
      return {
        type: 'response',
        content: `
          <div class="animate-fade-in space-y-1 max-w-full">
            <p class="m-0 text-red-400"> Server Issue</p>
            <p class="m-0 text-sm">There's a temporary server issue. Let me help you with local knowledge instead!</p>
            <div class="text-xs mt-2">
              <p class="m-0">• "What is bubble sort?"</p>
              <p class="m-0">• "How does merge sort work?"</p>
              <p class="m-0">• "Compare algorithms"</p>
            </div>
          </div>`,
      };
    }

    try {
      const fallbackResponse = generateFallbackResponse(
        lowerCaseQuery,
        context,
        conversationContext
      );
      return { type: 'response', content: fallbackResponse };
    } catch (fallbackErr) {
      console.error('Error: Error in fallback response:', fallbackErr);

      return {
        type: 'response',
        content: `
                    <div class="animate-fade-in space-y-1 max-w-full">
                        <p class="m-0 text-emerald-400">I'm here to help with sorting algorithms! </p>
                        <p class="m-0 text-sm">Sorry, I encountered a temporary issue. Please try asking:</p>
                        <div class="text-xs mt-2">
                            <p class="m-0">• "What is bubble sort?"</p>
                            <p class="m-0">• "How does merge sort work?"</p>
                            <p class="m-0">• "Compare algorithms"</p>
                        </div>
                        <p class="m-0 text-xs text-blue-300">Tip: Select an algorithm to start visualizing!</p>
                    </div>`,
      };
    }
  }
};

export { resolveRemoteResponse };
