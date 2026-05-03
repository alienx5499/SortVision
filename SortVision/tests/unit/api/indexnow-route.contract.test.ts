import assert from 'node:assert/strict';
import test, { afterEach, beforeEach } from 'node:test';

import {
  GET,
  __resetIndexNowRouteTestState,
  __setIndexNowSubmitterForTests,
  POST,
} from '../../../src/app/api/indexnow/route.ts';

function makeRequest(body: unknown, headers = new Headers()) {
  return {
    headers,
    json: async () => body,
  };
}

function emptyRequest(headers = new Headers()) {
  return { headers };
}

beforeEach(() => {
  __resetIndexNowRouteTestState();
});

afterEach(() => {
  __resetIndexNowRouteTestState();
});

test('POST returns 400 when urls is missing', async () => {
  const response = await POST(makeRequest({}) as never);
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: 'URLs array is required' });
});

test('POST returns 400 when urls is not an array', async () => {
  const response = await POST(makeRequest({ urls: 'not-array' }) as never);
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: 'URLs must be an array' });
});

test('POST returns 400 when urls is empty', async () => {
  const response = await POST(makeRequest({ urls: [] }) as never);
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    error: 'At least one URL is required',
  });
});

test('POST returns 400 when urls exceed max batch size', async () => {
  const urls = Array.from({ length: 101 }, (_, i) => `https://x.test/${i}`);
  const response = await POST(makeRequest({ urls }) as never);
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    error: 'Maximum 100 URLs per request',
  });
});

test('POST returns success payload with mocked submitToIndexNow', async () => {
  let capturedUrls: string[] = [];
  __setIndexNowSubmitterForTests((async (urls: string[]) => {
    capturedUrls = [...urls];
    return {
      success: true,
      urlCount: urls.length,
      results: [
        { endpoint: 'https://api.indexnow.org/IndexNow', success: true },
      ],
      submittedUrls: urls,
    };
  }) as never);

  const urls = ['https://sortvision.com/algorithms/details/bubble'];
  const response = await POST(makeRequest({ urls }) as never);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    success: true,
    submitted: 1,
    results: [{ endpoint: 'https://api.indexnow.org/IndexNow', success: true }],
    urls,
  });
  assert.deepEqual(capturedUrls, urls);
});

test('GET returns 405 with usage metadata', async () => {
  const response = await GET(emptyRequest() as never);
  assert.equal(response.status, 405);
  const body = (await response.json()) as Record<string, unknown>;
  assert.equal(body.error, 'Method Not Allowed');
  assert.equal(body.usage, 'POST /api/indexnow with { urls: string[] }');
});

test('POST returns 500 when request JSON parsing throws', async () => {
  const response = await POST({
    json: async () => {
      throw new Error('bad-json');
    },
  } as never);
  assert.equal(response.status, 500);
  assert.deepEqual(await response.json(), { error: 'bad-json' });
});

test('POST returns 500 when submitter throws', async () => {
  __setIndexNowSubmitterForTests((async () => {
    throw new Error('indexnow-down');
  }) as never);

  const response = await POST(
    makeRequest({
      urls: ['https://sortvision.com/algorithms/config/bubble'],
    }) as never
  );
  assert.equal(response.status, 500);
  assert.deepEqual(await response.json(), { error: 'indexnow-down' });
});
