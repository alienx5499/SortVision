import assert from 'node:assert/strict';
import test, { afterEach, beforeEach } from 'node:test';

import {
  __resetChatbotRouteTestState,
  __setChatbotRouteTestHooks,
  POST,
} from '../../../src/app/api/chatbot/route.ts';

type JsonValue = Record<string, unknown>;

const originalApiKey = process.env.NVIDIA_API_KEY;
const originalAbuseThreshold = process.env.CHAT_ABUSE_THRESHOLD;
const originalAbuseWindowMs = process.env.CHAT_ABUSE_WINDOW_MS;
const originalAbuseBlockMs = process.env.CHAT_ABUSE_BLOCK_MS;

function makeRequest(body: unknown, headers: Record<string, string> = {}) {
  return {
    headers: new Headers(headers),
    nextUrl: new URL('https://sortvision.com/api/chatbot'),
    json: async () => body,
  };
}

async function readJson(response: Response): Promise<JsonValue> {
  return (await response.json()) as JsonValue;
}

beforeEach(() => {
  __resetChatbotRouteTestState();
  process.env.NVIDIA_API_KEY = 'test-key';
  process.env.CHAT_ABUSE_THRESHOLD = '3';
  process.env.CHAT_ABUSE_WINDOW_MS = String(10 * 60 * 1000);
  process.env.CHAT_ABUSE_BLOCK_MS = String(24 * 60 * 60 * 1000);
});

afterEach(() => {
  __resetChatbotRouteTestState();
  if (originalApiKey === undefined) delete process.env.NVIDIA_API_KEY;
  else process.env.NVIDIA_API_KEY = originalApiKey;

  if (originalAbuseThreshold === undefined)
    delete process.env.CHAT_ABUSE_THRESHOLD;
  else process.env.CHAT_ABUSE_THRESHOLD = originalAbuseThreshold;
  if (originalAbuseWindowMs === undefined)
    delete process.env.CHAT_ABUSE_WINDOW_MS;
  else process.env.CHAT_ABUSE_WINDOW_MS = originalAbuseWindowMs;
  if (originalAbuseBlockMs === undefined)
    delete process.env.CHAT_ABUSE_BLOCK_MS;
  else process.env.CHAT_ABUSE_BLOCK_MS = originalAbuseBlockMs;
});

test('POST returns 400 for invalid body format', async () => {
  const response = await POST(
    makeRequest({ messages: 'not-an-array' }) as never
  );
  assert.equal(response.status, 400);
  assert.deepEqual(await readJson(response), {
    error: 'Invalid request format',
  });
});

test('POST returns 500 when NVIDIA_API_KEY is missing', async () => {
  delete process.env.NVIDIA_API_KEY;
  const response = await POST(
    makeRequest({ messages: [{ role: 'user', content: 'hello' }] }) as never
  );
  assert.equal(response.status, 500);
  assert.deepEqual(await readJson(response), {
    error: 'Internal server configuration error',
  });
});

test('POST blocks abusive client after repeated abusive requests', async () => {
  let completionCalls = 0;
  __setChatbotRouteTestHooks({
    now: () => 1_700_000_000_000,
    isAbusiveQuery: () => true,
    buildClient: () =>
      ({
        chat: {
          completions: {
            create: async () => {
              completionCalls += 1;
              return { choices: [{ message: { content: 'ok' } }] };
            },
          },
        },
      }) as never,
  });

  const headers = {
    'x-forwarded-for': '203.0.113.8',
    'user-agent': 'unit-test-agent',
  };
  const body = { messages: [{ role: 'user', content: 'abusive message' }] };

  const first = await POST(makeRequest(body, headers) as never);
  const second = await POST(makeRequest(body, headers) as never);
  const blocked = await POST(makeRequest(body, headers) as never);

  assert.equal(first.status, 200);
  assert.equal(second.status, 200);
  assert.equal(blocked.status, 403);
  const blockedJson = await readJson(blocked);
  assert.equal(blockedJson.policy, 'abuse_block');
  assert.equal(blockedJson.strikes, 3);
  assert.equal(completionCalls, 2);
});

test('POST maps upstream failure status when provider request fails', async () => {
  __setChatbotRouteTestHooks({
    now: () => 1_700_000_000_000,
    isAbusiveQuery: () => false,
    buildClient: () =>
      ({
        chat: {
          completions: {
            create: async () => {
              throw { status: 504, message: 'Gateway timeout' };
            },
          },
        },
      }) as never,
  });

  const response = await POST(
    makeRequest({ messages: [{ role: 'user', content: 'hello' }] }) as never
  );

  assert.equal(response.status, 504);
  assert.deepEqual(await readJson(response), {
    error: 'Upstream AI provider request failed',
  });
});
