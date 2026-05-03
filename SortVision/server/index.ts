import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { isAbusiveQuery } from '../src/components/chatbot/assistantEngine/moderation.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const app = express();
const CORS_ALLOWED_ORIGINS = (process.env.CORS_ALLOWED_ORIGINS || '')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (CORS_ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
      if (IS_DEVELOPMENT && CORS_ALLOWED_ORIGINS.length === 0) {
        return callback(null, true);
      }
      return callback(null, false);
    },
  })
);
app.use(express.json());

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

type AbuseRecord = {
  abuseCount: number;
  lastAbuseAt: number;
  blockedUntil: number;
};

const abuseTracker = new Map<string, AbuseRecord>();

const getClientKey = (req: Request): string => {
  const forwardedFor = req.headers['x-forwarded-for'];
  const ip = (
    Array.isArray(forwardedFor)
      ? forwardedFor[0]
      : forwardedFor || req.ip || 'unknown-ip'
  )
    .toString()
    .split(',')[0]
    .trim();
  const userAgent = (req.headers['user-agent'] || 'unknown-agent').toString();
  return `${ip}::${userAgent.slice(0, 120)}`;
};

type IncomingChatMessage = {
  role?: string;
  parts?: { text?: string }[];
  content?: string;
};

const latestUserMessage = (messages: IncomingChatMessage[]): string => {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const message = messages[i];
    const role = message?.role;
    if (role === 'user') {
      const content = Array.isArray(message?.parts)
        ? message.parts.map(part => part?.text || '').join('\n')
        : message?.content || '';
      return String(content);
    }
  }
  return '';
};

const pruneAbuseTrackerIfNeeded = (now: number) => {
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

app.post('/api/chatbot', async (req: Request, res: Response) => {
  const messages = req.body.messages as IncomingChatMessage[] | undefined;
  if (process.env.NODE_ENV === 'development') {
    console.log('Received chat request metadata:', {
      hasMessagesArray: Array.isArray(messages),
      messageCount: Array.isArray(messages) ? messages.length : 0,
    });
  }

  if (!Array.isArray(messages)) {
    return res
      .status(400)
      .json({ error: 'Expected prompt to be an array of messages' });
  }

  const clientKey = getClientKey(req);
  const now = Date.now();
  const record = abuseTracker.get(clientKey) || {
    abuseCount: 0,
    lastAbuseAt: 0,
    blockedUntil: 0,
  };

  if (record.blockedUntil > now) {
    return res.status(403).json({
      error:
        'Chat access temporarily restricted due to repeated policy violations',
      policy: 'abuse_block',
      retryAfterMs: record.blockedUntil - now,
      strikes: record.abuseCount,
      forceLocalOnly: true,
    });
  }

  const latestQuery = latestUserMessage(messages);
  if (isAbusiveQuery(latestQuery)) {
    if (record.lastAbuseAt > 0 && now - record.lastAbuseAt > ABUSE_WINDOW_MS) {
      record.abuseCount = 0;
    }
    record.abuseCount += 1;
    record.lastAbuseAt = now;
    if (record.abuseCount >= ABUSE_THRESHOLD) {
      record.blockedUntil = now + ABUSE_BLOCK_MS;
    }
    abuseTracker.set(clientKey, record);
    pruneAbuseTrackerIfNeeded(now);

    if (record.blockedUntil > now) {
      return res.status(403).json({
        error:
          'Chat access temporarily restricted due to repeated policy violations',
        policy: 'abuse_block',
        retryAfterMs: record.blockedUntil - now,
        strikes: record.abuseCount,
        forceLocalOnly: true,
      });
    }
  } else if (
    record.lastAbuseAt > 0 &&
    now - record.lastAbuseAt > ABUSE_WINDOW_MS &&
    record.blockedUntil <= now
  ) {
    abuseTracker.delete(clientKey);
  }

  try {
    const apiKey = process.env.NVIDIA_API_KEY;
    const baseUrl =
      process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1';
    const model = process.env.NVIDIA_MODEL || 'moonshotai/kimi-k2-instruct';

    if (!apiKey) {
      return res
        .status(500)
        .json({ error: 'NVIDIA_API_KEY is not configured' });
    }

    const result = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: messages.map(message => ({
          role:
            message?.role === 'model'
              ? 'assistant'
              : ['user', 'assistant', 'system'].includes(String(message?.role))
                ? message.role
                : 'user',
          content: Array.isArray(message?.parts)
            ? message.parts.map(part => part?.text || '').join('\n')
            : message?.content || '',
        })),
        temperature: 0.6,
        top_p: 0.9,
        max_tokens: 1024,
      }),
    });

    if (!result.ok) {
      const errorText = await result.text();
      console.error('Chat API error:', errorText);
      return res.status(result.status).json({ error: errorText });
    }

    const raw: unknown = await result.json();
    const data = raw as {
      choices?: { message?: { content?: string } }[];
    };
    const text = data?.choices?.[0]?.message?.content || 'No response';
    res.status(200).json({ text });
  } catch (error: unknown) {
    console.error('Server error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Chatbot proxy server running on port ${PORT}`);
});
