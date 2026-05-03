import assert from 'node:assert/strict';
import test from 'node:test';

import {
  correlationHeaders,
  getOrCreateCorrelationId,
} from '../../../src/lib/logging/correlationId.ts';

test('getOrCreateCorrelationId reuses x-request-id when present', () => {
  const headers = new Headers({ 'x-request-id': 'upstream-abc' });
  const id = getOrCreateCorrelationId(
    new Request('https://x.test', { headers })
  );
  assert.equal(id, 'upstream-abc');
});

test('getOrCreateCorrelationId falls back to x-correlation-id', () => {
  const headers = new Headers({ 'x-correlation-id': 'corr-1' });
  const id = getOrCreateCorrelationId(
    new Request('https://x.test', { headers })
  );
  assert.equal(id, 'corr-1');
});

test('getOrCreateCorrelationId generates UUID when no inbound id', () => {
  const id = getOrCreateCorrelationId(new Request('https://x.test'));
  assert.match(
    id,
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  );
});

test('correlationHeaders sets x-request-id', () => {
  assert.deepEqual(correlationHeaders('rid'), { 'x-request-id': 'rid' });
});
