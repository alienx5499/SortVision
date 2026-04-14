import OpenAI from 'openai';
import { isAbusiveQuery } from '@/components/chatbot/assistantEngine/moderation';

const NVIDIA_BASE_URL =
  process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1';
const PRIMARY_MODEL = process.env.NVIDIA_MODEL || 'moonshotai/kimi-k2-instruct';
const MODEL_FALLBACKS = (process.env.NVIDIA_MODEL_FALLBACKS || '')
  .split(',')
  .map(model => model.trim())
  .filter(Boolean);

const REQUEST_TIMEOUT_MS = Number(process.env.NVIDIA_TIMEOUT_MS || 15000);
const TEMPERATURE = Number(process.env.NVIDIA_TEMPERATURE || 0.6);
const TOP_P = Number(process.env.NVIDIA_TOP_P || 0.9);
const MAX_TOKENS = Number(process.env.NVIDIA_MAX_TOKENS || 1024);
const ABUSE_THRESHOLD = Number(process.env.CHAT_ABUSE_THRESHOLD || 3);
const ABUSE_WINDOW_MS = Number(
  process.env.CHAT_ABUSE_WINDOW_MS || 10 * 60 * 1000
);
const ABUSE_BLOCK_MS = Number(
  process.env.CHAT_ABUSE_BLOCK_MS || 24 * 60 * 60 * 1000
);
const ABUSE_TRACKER_MAX_SIZE = Number(
  process.env.CHAT_ABUSE_TRACKER_MAX_SIZE || 5000
);
const CORS_ALLOWED_ORIGINS = (process.env.CORS_ALLOWED_ORIGINS || '')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
const abuseTracker = new Map();

const getCorsHeaders = req => {
  const origin = req?.headers?.get('origin') || '';
  const requestOrigin = req?.nextUrl?.origin || '';
  const isSameOriginRequest =
    Boolean(origin) && Boolean(requestOrigin) && origin === requestOrigin;
  const hasExplicitAllowlist = CORS_ALLOWED_ORIGINS.length > 0;
  const allowOrigin = hasExplicitAllowlist
    ? CORS_ALLOWED_ORIGINS.includes(origin)
      ? origin
      : ''
    : isSameOriginRequest || !origin
      ? origin || '*'
      : IS_DEVELOPMENT
        ? '*'
        : '';
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
    'Access-Control-Allow-Headers':
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    Vary: 'Origin',
  };
};

const getClientKey = req => {
  const forwardedFor = req.headers.get('x-forwarded-for') || '';
  const ip = forwardedFor.split(',')[0]?.trim() || 'unknown-ip';
  const userAgent = req.headers.get('user-agent') || 'unknown-agent';
  return `${ip}::${userAgent.slice(0, 120)}`;
};

const pruneAbuseTrackerIfNeeded = now => {
  if (abuseTracker.size <= ABUSE_TRACKER_MAX_SIZE) return;
  for (const [key, record] of abuseTracker.entries()) {
    if (
      record.blockedUntil <= now &&
      record.lastAbuseAt > 0 &&
      now - record.lastAbuseAt > ABUSE_WINDOW_MS
    ) {
      abuseTracker.delete(key);
    }
    if (abuseTracker.size <= ABUSE_TRACKER_MAX_SIZE) return;
  }
};

const getLatestUserMessage = messages => {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    if (messages[i]?.role === 'user') {
      return messages[i]?.content || '';
    }
  }
  return '';
};

const recordAbuseAndCheckBlocked = (clientKey, latestQuery, now) => {
  const record = abuseTracker.get(clientKey) || {
    abuseCount: 0,
    lastAbuseAt: 0,
    blockedUntil: 0,
  };

  if (record.blockedUntil > now) {
    return {
      blocked: true,
      remainingMs: record.blockedUntil - now,
      strikes: record.abuseCount,
    };
  }

  if (!isAbusiveQuery(latestQuery)) {
    if (record.lastAbuseAt > 0 && now - record.lastAbuseAt > ABUSE_WINDOW_MS) {
      abuseTracker.delete(clientKey);
    }
    return { blocked: false, remainingMs: 0, strikes: 0 };
  }

  if (now - record.lastAbuseAt > ABUSE_WINDOW_MS) {
    record.abuseCount = 0;
  }

  record.abuseCount += 1;
  record.lastAbuseAt = now;
  if (record.abuseCount >= ABUSE_THRESHOLD) {
    record.blockedUntil = now + ABUSE_BLOCK_MS;
  }
  abuseTracker.set(clientKey, record);
  pruneAbuseTrackerIfNeeded(now);

  return {
    blocked: record.blockedUntil > now,
    remainingMs: record.blockedUntil > now ? record.blockedUntil - now : 0,
    strikes: record.abuseCount,
  };
};

const mapMessagesToOpenAI = messages =>
  messages
    .map(message => {
      const fallbackText =
        typeof message?.content === 'string' ? message.content : '';
      const partText = Array.isArray(message?.parts)
        ? message.parts
            .map(part => (typeof part?.text === 'string' ? part.text : ''))
            .join('\n')
        : '';

      return {
        role:
          message?.role === 'model'
            ? 'assistant'
            : ['user', 'assistant', 'system'].includes(message?.role)
              ? message.role
              : 'user',
        content: (partText || fallbackText).trim(),
      };
    })
    .filter(message => message.content.length > 0);

const buildClient = () =>
  new OpenAI({
    apiKey: process.env.NVIDIA_API_KEY || '',
    baseURL: NVIDIA_BASE_URL,
    timeout: REQUEST_TIMEOUT_MS,
  });

const getModelsToTry = () => {
  const deduped = [];
  const seen = new Set();
  for (const model of [PRIMARY_MODEL, ...MODEL_FALLBACKS]) {
    if (model && !seen.has(model)) {
      seen.add(model);
      deduped.push(model);
    }
  }
  return deduped.length > 0 ? deduped : [PRIMARY_MODEL];
};

export async function OPTIONS(req) {
  const corsHeaders = getCorsHeaders(req);
  if (corsHeaders['Access-Control-Allow-Origin'] === '') {
    return new Response(null, { status: 403, headers: corsHeaders });
  }

  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(req) {
  const corsHeaders = getCorsHeaders(req);
  if (corsHeaders['Access-Control-Allow-Origin'] === '') {
    return new Response(JSON.stringify({ error: 'Origin not allowed' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  try {
    const body = await req.json();
    if (process.env.NODE_ENV === 'development') {
      console.log('Chat API request body:', JSON.stringify(body, null, 2));
    }

    const messages = body.messages;
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid request format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const normalizedMessages = mapMessagesToOpenAI(messages);
    if (normalizedMessages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'At least one non-empty message is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    const hasApiKey = !!process.env.NVIDIA_API_KEY;
    if (!hasApiKey) {
      return new Response(
        JSON.stringify({ error: 'Internal server configuration error' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    const clientKey = getClientKey(req);
    const now = Date.now();
    const latestQuery = getLatestUserMessage(normalizedMessages);
    const moderationState = recordAbuseAndCheckBlocked(
      clientKey,
      latestQuery,
      now
    );
    if (moderationState.blocked) {
      return new Response(
        JSON.stringify({
          error:
            'Chat access temporarily restricted due to repeated policy violations',
          policy: 'abuse_block',
          retryAfterMs: moderationState.remainingMs,
          strikes: moderationState.strikes,
          forceLocalOnly: true,
        }),
        {
          status: 403,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    const client = buildClient();
    const modelsToTry = getModelsToTry();
    let completion = null;
    let lastError = null;

    for (const model of modelsToTry) {
      try {
        completion = await client.chat.completions.create({
          model,
          messages: normalizedMessages,
          temperature: TEMPERATURE,
          top_p: TOP_P,
          max_tokens: MAX_TOKENS,
          stream: false,
        });
        break;
      } catch (error) {
        lastError = error;
        if (process.env.NODE_ENV === 'development') {
          console.error(
            `NVIDIA model failed (${model}):`,
            error?.message || error
          );
        }
      }
    }

    if (!completion) {
      const status =
        typeof lastError?.status === 'number' ? lastError.status : 502;
      if (process.env.NODE_ENV === 'development') {
        console.error(
          'Upstream AI provider request failed:',
          lastError?.message || lastError
        );
      }
      return new Response(
        JSON.stringify({
          error: 'Upstream AI provider request failed',
        }),
        {
          status,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    const text =
      completion?.choices?.[0]?.message?.content?.trim() || 'No response';
    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Chat API server error:', error);
    }
    return new Response(
      JSON.stringify({
        error: 'An unexpected error occurred',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
}
