import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const GITHUB_BASE_URL = 'https://api.github.com';
const USER_AGENT = process.env.GITHUB_API_USER_AGENT || 'SortVision-App';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_PROXY_AUTH_TOKEN = process.env.GITHUB_PROXY_AUTH_TOKEN;
const GITHUB_PROXY_IP_ATTESTATION_TOKEN =
  process.env.GITHUB_PROXY_IP_ATTESTATION_TOKEN;
const TRUST_PROXY_IP_HEADERS =
  process.env.GITHUB_PROXY_TRUST_IP_HEADERS === 'true';
const ALLOWED_CROSS_ORIGINS = new Set(
  (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean)
);
const RATE_LIMIT_WINDOW_MS = parseEnvNumber(
  process.env.GITHUB_PROXY_RATE_LIMIT_WINDOW_MS,
  60_000,
  1_000
);
const RATE_LIMIT_MAX_REQUESTS = parseEnvNumber(
  process.env.GITHUB_PROXY_RATE_LIMIT_MAX,
  120,
  1
);
const RATE_LIMIT_MAX_KEYS = parseEnvNumber(
  process.env.GITHUB_PROXY_RATE_LIMIT_MAX_KEYS,
  10_000,
  100
);

type RouteRule = {
  pattern: RegExp;
  allowToken: boolean;
};

const ALLOWED_ROUTE_RULES: RouteRule[] = [
  { pattern: /^repos\/[^/]+\/[^/]+$/, allowToken: true },
  { pattern: /^repos\/[^/]+\/[^/]+\/contributors$/, allowToken: true },
  { pattern: /^repos\/[^/]+\/[^/]+\/stats\/contributors$/, allowToken: true },
  { pattern: /^repos\/[^/]+\/[^/]+\/pulls$/, allowToken: true },
  { pattern: /^repos\/[^/]+\/[^/]+\/issues$/, allowToken: true },
  { pattern: /^repos\/[^/]+\/[^/]+\/releases$/, allowToken: true },
  { pattern: /^users\/[^/]+$/, allowToken: true },
];

type RateLimitState = {
  count: number;
  resetAt: number;
};
const rateLimitStore = new Map<string, RateLimitState>();

type RequestIdentity = {
  isAuthenticated: boolean;
  userId: string | null;
};

function parseEnvNumber(
  rawValue: string | undefined,
  fallback: number,
  minimum: number
): number {
  if (!rawValue) return fallback;
  const parsed = Number(rawValue);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(minimum, Math.floor(parsed));
}

function jsonError(status: number, error: string, message: string) {
  return NextResponse.json({ error, message }, { status });
}

function buildHeaders(includeToken: boolean): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': USER_AGENT,
  };
  if (includeToken && GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
  }
  return headers;
}

function normalizePath(pathSegments: string[]): string | null {
  if (pathSegments.some(segment => segment.length === 0)) return null;
  if (pathSegments.some(segment => segment === '.' || segment === '..'))
    return null;
  return pathSegments.join('/');
}

function findRouteRule(path: string): RouteRule | null {
  return ALLOWED_ROUTE_RULES.find(rule => rule.pattern.test(path)) || null;
}

function resolveRequestOrigin(request: NextRequest): string | null {
  const originHeader = request.headers.get('origin');
  if (originHeader) return originHeader;

  const refererHeader = request.headers.get('referer');
  if (!refererHeader) return null;
  try {
    return new URL(refererHeader).origin;
  } catch {
    return null;
  }
}

function isOriginAllowed(request: NextRequest): boolean {
  const requestOrigin = resolveRequestOrigin(request);
  if (requestOrigin === null) {
    const secFetchSite = request.headers.get('sec-fetch-site');
    return (
      secFetchSite === null ||
      secFetchSite === 'same-origin' ||
      secFetchSite === 'none'
    );
  }
  return (
    requestOrigin === request.nextUrl.origin ||
    ALLOWED_CROSS_ORIGINS.has(requestOrigin)
  );
}

function getClientIp(request: NextRequest): string {
  if (!canTrustProxyIpHeaders(request)) {
    return 'unknown';
  }

  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0]?.trim();
    if (firstIp && isValidClientIp(firstIp)) return firstIp;
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp && isValidClientIp(realIp)) return realIp;
  return 'unknown';
}

function canTrustProxyIpHeaders(request: NextRequest): boolean {
  if (!TRUST_PROXY_IP_HEADERS) return false;
  const attestationHeader = request.headers.get(
    'x-github-proxy-ip-attestation'
  );
  if (!GITHUB_PROXY_IP_ATTESTATION_TOKEN || !attestationHeader) return false;
  return attestationHeader === GITHUB_PROXY_IP_ATTESTATION_TOKEN;
}

function isValidClientIp(candidate: string): boolean {
  return /^[a-fA-F0-9:.]+$/.test(candidate);
}

function getRequestIdentity(request: NextRequest): RequestIdentity {
  const proxyAuthHeader = request.headers.get('x-github-proxy-auth');
  const proxyUserId =
    request.headers.get('x-github-proxy-user')?.trim() || null;
  if (
    GITHUB_PROXY_AUTH_TOKEN &&
    proxyAuthHeader === GITHUB_PROXY_AUTH_TOKEN &&
    proxyUserId
  ) {
    return { isAuthenticated: true, userId: proxyUserId };
  }
  return { isAuthenticated: false, userId: null };
}

function getRateLimitKey(
  request: NextRequest,
  identity: RequestIdentity
): string {
  const clientIp = getClientIp(request);
  if (identity.isAuthenticated && identity.userId) {
    return `user:${identity.userId}|ip:${clientIp}`;
  }
  return `ip:${clientIp}`;
}

function pruneRateLimitStore() {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }

  while (rateLimitStore.size > RATE_LIMIT_MAX_KEYS) {
    const oldestKey = rateLimitStore.keys().next().value;
    if (!oldestKey) break;
    rateLimitStore.delete(oldestKey);
  }
}

type GithubProxyContext = { params: Promise<{ path?: string[] }> };

export async function GET(request: NextRequest, context: GithubProxyContext) {
  if (!isOriginAllowed(request)) {
    return jsonError(
      403,
      'forbidden_origin',
      'Request origin is not allowed for this endpoint'
    );
  }

  const resolvedParams = await context.params;
  const pathSegments = resolvedParams.path ?? [];
  if (!Array.isArray(pathSegments) || pathSegments.length === 0) {
    return jsonError(400, 'invalid_path', 'Missing GitHub path');
  }
  const normalizedPath = normalizePath(pathSegments);
  if (!normalizedPath) {
    return jsonError(400, 'invalid_path', 'Invalid GitHub path');
  }
  const routeRule = findRouteRule(normalizedPath);
  if (!routeRule) {
    return jsonError(
      400,
      'unsupported_path',
      'GitHub API path is not supported by this proxy'
    );
  }

  const url = new URL(`${GITHUB_BASE_URL}/${normalizedPath}`);
  const upstreamParams = request.nextUrl.searchParams.toString();
  if (upstreamParams) {
    url.search = upstreamParams;
  }

  try {
    const upstream = await fetch(url.toString(), {
      method: 'GET',
      headers: buildHeaders(routeRule.allowToken),
      cache: 'no-store',
    });

    const text = await upstream.text();
    const response = new NextResponse(text, {
      status: upstream.status,
      headers: {
        'Content-Type':
          upstream.headers.get('content-type') || 'application/json',
      },
    });

    const passHeaders = [
      'x-ratelimit-limit',
      'x-ratelimit-remaining',
      'x-ratelimit-reset',
      'x-ratelimit-resource',
      'x-ratelimit-used',
    ] as const;
    for (const headerName of passHeaders) {
      const headerValue = upstream.headers.get(headerName);
      if (headerValue) response.headers.set(headerName, headerValue);
    }

    return response;
  } catch {
    return jsonError(
      500,
      'proxy_failure',
      'Failed to proxy GitHub API request'
    );
  }
}

export async function POST(request: NextRequest, context: GithubProxyContext) {
  const identity = getRequestIdentity(request);

  if (!isOriginAllowed(request)) {
    return jsonError(
      403,
      'forbidden_origin',
      'Request origin is not allowed for this endpoint'
    );
  }

  const resolvedParams = await context.params;
  const pathSegments = resolvedParams.path ?? [];
  if (!Array.isArray(pathSegments) || pathSegments.length === 0) {
    return jsonError(400, 'invalid_path', 'Missing GitHub path');
  }
  const normalizedPath = normalizePath(pathSegments);
  if (!normalizedPath) {
    return jsonError(400, 'invalid_path', 'Invalid GitHub path');
  }
  const routeRule = findRouteRule(normalizedPath);
  if (!routeRule) {
    return jsonError(
      400,
      'unsupported_path',
      'GitHub API path is not supported by this proxy'
    );
  }

  pruneRateLimitStore();
  const key = getRateLimitKey(request, identity);
  const now = Date.now();
  const current = rateLimitStore.get(key);
  let rateLimit: { allowed: boolean; retryAfter: number };
  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    rateLimit = { allowed: true, retryAfter: 0 };
  } else if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimit = {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1_000)),
    };
  } else {
    current.count += 1;
    rateLimitStore.set(key, current);
    rateLimit = { allowed: true, retryAfter: 0 };
  }
  if (!rateLimit.allowed) {
    const response = jsonError(
      429,
      'rate_limited',
      'Too many requests to GitHub proxy endpoint'
    );
    response.headers.set('Retry-After', String(rateLimit.retryAfter));
    return response;
  }

  const url = new URL(`${GITHUB_BASE_URL}/${normalizedPath}`);
  const upstreamParams = request.nextUrl.searchParams.toString();
  if (upstreamParams) {
    url.search = upstreamParams;
  }

  try {
    const upstream = await fetch(url.toString(), {
      method: 'POST',
      headers: buildHeaders(routeRule.allowToken),
      cache: 'no-store',
    });

    const text = await upstream.text();
    const response = new NextResponse(text, {
      status: upstream.status,
      headers: {
        'Content-Type':
          upstream.headers.get('content-type') || 'application/json',
      },
    });

    const passHeaders = [
      'x-ratelimit-limit',
      'x-ratelimit-remaining',
      'x-ratelimit-reset',
      'x-ratelimit-resource',
      'x-ratelimit-used',
    ] as const;
    for (const headerName of passHeaders) {
      const headerValue = upstream.headers.get(headerName);
      if (headerValue) response.headers.set(headerName, headerValue);
    }

    return response;
  } catch {
    return jsonError(
      500,
      'proxy_failure',
      'Failed to proxy GitHub API request'
    );
  }
}
