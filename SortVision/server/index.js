import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { isAbusiveQuery } from '../src/components/chatbot/assistantEngine/moderation.js';

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure dotenv to look for .env in parent directory
dotenv.config({ path: join(__dirname, '../.env') });

const app = express();
app.use(cors());
app.use(express.json());

const ABUSE_THRESHOLD = Number(process.env.CHAT_ABUSE_THRESHOLD || 3);
const ABUSE_WINDOW_MS = Number(
  process.env.CHAT_ABUSE_WINDOW_MS || 10 * 60 * 1000
);
const ABUSE_BLOCK_MS = Number(
  process.env.CHAT_ABUSE_BLOCK_MS || 24 * 60 * 60 * 1000
);
const abuseTracker = new Map();

const getClientKey = req => {
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

const latestUserMessage = messages => {
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

app.post('/api/chatbot', async (req, res) => {
  console.log('Received:', req.body);
  const messages = req.body.messages;

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
          role: message?.role === 'model' ? 'assistant' : 'user',
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

    const data = await result.json();
    const text = data?.choices?.[0]?.message?.content || 'No response';
    res.status(200).json({ text });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Chatbot proxy server running on port ${PORT}`);
});
