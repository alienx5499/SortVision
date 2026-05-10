/**
 * Request correlation for API routes (log aggregation, support tickets).
 * Prefer inbound IDs from proxies; otherwise generate a UUID.
 */

const INBOUND_ID_HEADERS = [
  'x-request-id',
  'x-correlation-id',
  'cf-ray',
  'x-vercel-id',
] as const;

const MAX_ID_LEN = 128;

type RequestLike = { headers?: Pick<Headers, 'get'> | null };

export function getOrCreateCorrelationId(request: RequestLike): string {
  const headers = request.headers;
  if (!headers || typeof headers.get !== 'function') {
    return crypto.randomUUID();
  }
  for (const name of INBOUND_ID_HEADERS) {
    const raw = headers.get(name)?.trim();
    if (raw) {
      return raw.length > MAX_ID_LEN ? raw.slice(0, MAX_ID_LEN) : raw;
    }
  }
  return crypto.randomUUID();
}

export function correlationHeaders(requestId: string): Record<string, string> {
  return { 'x-request-id': requestId };
}
