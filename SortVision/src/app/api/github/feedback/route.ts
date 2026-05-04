import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server.js';
import { createGitHubFeedbackIssueGateway } from './gateways/githubFeedbackIssueGateway.ts';

const USER_AGENT = process.env.GITHUB_API_USER_AGENT || 'SortVision-App';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const FEEDBACK_ALLOWED_ORIGINS = new Set(
  (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean)
);
const FEEDBACK_TRUST_PROXY_IP_HEADERS =
  process.env.FEEDBACK_TRUST_PROXY_IP_HEADERS === 'true';
const FEEDBACK_PROXY_IP_ATTESTATION_TOKEN =
  process.env.FEEDBACK_PROXY_IP_ATTESTATION_TOKEN;
const FEEDBACK_RATE_LIMIT_WINDOW_MS = 60_000;
const FEEDBACK_RATE_LIMIT_MAX = 10;
const FEEDBACK_RATE_LIMIT_MAX_KEYS = 10_000;
const FEEDBACK_MODERATION_MODE =
  process.env.FEEDBACK_MODERATION_MODE === 'true' ||
  process.env.FEEDBACK_MODERATION_MODE === 'queue';
const FEEDBACK_MODERATION_QUEUE_MAX = parseEnvNumber(
  process.env.FEEDBACK_MODERATION_QUEUE_MAX,
  500,
  10
);

type GitHubIssueApiPayload = {
  message?: string;
  number?: number;
  html_url?: string;
};

type FeedbackRequestBody = Record<string, unknown>;

type RateLimitState = {
  count: number;
  resetAt: number;
};

type ModerationQueueEntry = {
  id: string;
  createdAt: string;
  feedbackType: string;
  rating: number;
  email: string;
  name: string;
};

type FeedbackRouteTestHooks = {
  now?: () => number;
  randomUUID?: () => string;
  createGateway?: typeof createGitHubFeedbackIssueGateway;
  deps?: FeedbackDeps;
};

type ParsedFeedbackPayload = Record<string, unknown>;
type GitHubIssueDraftLike = {
  title: string;
  body: string;
  labels: string[];
};

type FeedbackDeps = {
  assertEnhancedFeedbackPayload: (raw: unknown) => ParsedFeedbackPayload;
  buildGitHubFeedbackIssue: (
    payload: ParsedFeedbackPayload
  ) => GitHubIssueDraftLike;
  getFeedbackIssueRepoFromEnv: () => { owner: string; name: string };
};

const feedbackRateLimitStore = new Map<string, RateLimitState>();
const moderationQueue = new Map<string, ModerationQueueEntry>();
const INVALID_JSON_SENTINEL = Symbol('invalid-json');
let feedbackRouteTestHooks: FeedbackRouteTestHooks = {};
let feedbackDepsPromise: Promise<FeedbackDeps> | null = null;

export function __resetFeedbackRouteTestState(): void {
  feedbackRouteTestHooks = {};
  feedbackDepsPromise = null;
  feedbackRateLimitStore.clear();
  moderationQueue.clear();
}

export function __setFeedbackRouteTestHooks(
  hooks: FeedbackRouteTestHooks
): void {
  feedbackRouteTestHooks = { ...feedbackRouteTestHooks, ...hooks };
}

async function loadFeedbackDeps(): Promise<FeedbackDeps> {
  if (!feedbackDepsPromise) {
    feedbackDepsPromise = Promise.all([
      import('../../../../lib/feedback/github/feedbackPayloadSchema.ts'),
      import('../../../../lib/feedback/github/buildGitHubFeedbackIssue.ts'),
      import('../../../../lib/feedback/github/feedbackIssueRepo.ts'),
    ]).then(([payloadSchema, buildIssue, repoConfig]) => {
      const deps: FeedbackDeps = {
        assertEnhancedFeedbackPayload: (raw: unknown) =>
          payloadSchema.assertEnhancedFeedbackPayload(
            raw
          ) as unknown as ParsedFeedbackPayload,
        buildGitHubFeedbackIssue: (payload: ParsedFeedbackPayload) =>
          buildIssue.buildGitHubFeedbackIssue(
            payload as never
          ) as GitHubIssueDraftLike,
        getFeedbackIssueRepoFromEnv: () =>
          repoConfig.getFeedbackIssueRepoFromEnv(),
      };
      return deps;
    });
  }
  return feedbackDepsPromise as Promise<FeedbackDeps>;
}

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

function asGitHubIssuePayload(raw: unknown): GitHubIssueApiPayload {
  if (raw && typeof raw === 'object') {
    return raw as GitHubIssueApiPayload;
  }
  return {};
}

function jsonError(
  status: number,
  code: string,
  message: string,
  extra: Record<string, unknown> = {}
) {
  return NextResponse.json(
    {
      error: 'feedback_submission_blocked',
      code,
      message,
      ...extra,
    },
    { status }
  );
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
    FEEDBACK_ALLOWED_ORIGINS.has(requestOrigin)
  );
}

function canTrustProxyIpHeaders(request: NextRequest): boolean {
  if (!FEEDBACK_TRUST_PROXY_IP_HEADERS) return false;
  if (!FEEDBACK_PROXY_IP_ATTESTATION_TOKEN) return false;
  const attestationHeader = request.headers.get('x-feedback-ip-attestation');
  return attestationHeader === FEEDBACK_PROXY_IP_ATTESTATION_TOKEN;
}

function isValidClientIp(candidate: string): boolean {
  return /^[a-fA-F0-9:.]+$/.test(candidate);
}

/**
 * First hop from common edge/proxy forwarding headers. Only safe to use when the
 * platform terminates TLS and overwrites these (e.g. Vercel); see `getClientIp`.
 */
function readForwardedClientIp(request: NextRequest): string | null {
  const headerChains = [
    request.headers.get('x-forwarded-for'),
    request.headers.get('x-vercel-forwarded-for'),
    request.headers.get('x-real-ip'),
  ];
  for (const raw of headerChains) {
    if (!raw) continue;
    const firstIp = raw.split(',')[0]?.trim();
    if (firstIp && isValidClientIp(firstIp)) return firstIp;
  }
  return null;
}

function isTrustedEdgeForwardedIp(): boolean {
  // Vercel sets x-forwarded-for / x-vercel-forwarded-for at the edge; clients cannot spoof after TLS.
  return process.env.VERCEL === '1';
}

function getClientIp(request: NextRequest): string {
  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp && isValidClientIp(cfIp)) return cfIp;

  const flyIp = request.headers.get('fly-client-ip');
  if (flyIp && isValidClientIp(flyIp)) return flyIp;

  if (isTrustedEdgeForwardedIp()) {
    const edgeIp = readForwardedClientIp(request);
    if (edgeIp) return edgeIp;
  }

  if (
    !canTrustProxyIpHeaders(request) &&
    process.env.NODE_ENV === 'production'
  ) {
    return '';
  }

  const forwardedIp = readForwardedClientIp(request);
  if (forwardedIp) return forwardedIp;

  if (process.env.NODE_ENV !== 'production') return '127.0.0.1';
  return '';
}

function pruneRateLimitStore() {
  const now = feedbackRouteTestHooks.now?.() || Date.now();
  for (const [key, value] of feedbackRateLimitStore.entries()) {
    if (value.resetAt <= now) {
      feedbackRateLimitStore.delete(key);
    }
  }

  while (feedbackRateLimitStore.size > FEEDBACK_RATE_LIMIT_MAX_KEYS) {
    const oldestKey = feedbackRateLimitStore.keys().next().value;
    if (!oldestKey) break;
    feedbackRateLimitStore.delete(oldestKey);
  }
}

function enforceRateLimit(request: NextRequest): {
  allowed: boolean;
  retryAfter: number;
  missingIp?: boolean;
} {
  pruneRateLimitStore();
  const clientIp = getClientIp(request);
  if (!clientIp) {
    return { allowed: false, retryAfter: 0, missingIp: true };
  }
  const key = `ip:${clientIp}`;
  const now = feedbackRouteTestHooks.now?.() || Date.now();
  const current = feedbackRateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    feedbackRateLimitStore.set(key, {
      count: 1,
      resetAt: now + FEEDBACK_RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true, retryAfter: 0 };
  }

  if (current.count >= FEEDBACK_RATE_LIMIT_MAX) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1_000)),
    };
  }

  current.count += 1;
  feedbackRateLimitStore.set(key, current);
  return { allowed: true, retryAfter: 0 };
}

function asFeedbackRequestBody(raw: unknown): FeedbackRequestBody {
  if (raw && typeof raw === 'object') {
    return raw as FeedbackRequestBody;
  }
  return {};
}

function extractFeedbackPayload(rawBody: FeedbackRequestBody): unknown {
  const maybePayload = rawBody.payload;
  if (maybePayload && typeof maybePayload === 'object') {
    return maybePayload;
  }
  return rawBody;
}

function readStringValue(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function enqueueModeration(rawBody: FeedbackRequestBody): string {
  const id = feedbackRouteTestHooks.randomUUID?.() || crypto.randomUUID();
  const item: ModerationQueueEntry = {
    id,
    createdAt: new Date().toISOString(),
    feedbackType: readStringValue(rawBody.feedbackType) || 'unknown',
    rating:
      typeof rawBody.rating === 'number' && Number.isFinite(rawBody.rating)
        ? rawBody.rating
        : 0,
    email: readStringValue(rawBody.email) || '',
    name: readStringValue(rawBody.name) || '',
  };
  moderationQueue.set(id, item);

  while (moderationQueue.size > FEEDBACK_MODERATION_QUEUE_MAX) {
    const oldestKey = moderationQueue.keys().next().value;
    if (!oldestKey) break;
    moderationQueue.delete(oldestKey);
  }
  return id;
}

export async function POST(request: NextRequest) {
  if (!isOriginAllowed(request)) {
    return jsonError(
      403,
      'forbidden_origin',
      'Request origin is not allowed for feedback submission'
    );
  }

  const rateLimit = enforceRateLimit(request);
  if (!rateLimit.allowed) {
    if (rateLimit.missingIp) {
      return jsonError(
        503,
        'ip_resolution_failed',
        'Unable to resolve client IP for per-IP rate limiting'
      );
    }
    const response = jsonError(
      429,
      'rate_limited',
      'Too many feedback submissions from this IP'
    );
    response.headers.set('Retry-After', String(rateLimit.retryAfter));
    return response;
  }

  if (!GITHUB_TOKEN) {
    return NextResponse.json(
      {
        error: 'feedback_service_unavailable',
        code: 'missing_github_token',
        message: 'Missing server GitHub token (GITHUB_TOKEN)',
      },
      { status: 500 }
    );
  }

  const deps = feedbackRouteTestHooks.deps || (await loadFeedbackDeps());
  const { owner: repoOwner, name: repoName } =
    deps.getFeedbackIssueRepoFromEnv();
  if (!repoOwner || !repoName) {
    return NextResponse.json(
      {
        error: 'feedback_service_unavailable',
        code: 'missing_feedback_repo_config',
        message:
          'Set FEEDBACK_REPO_OWNER and FEEDBACK_REPO_NAME in the server environment.',
      },
      { status: 500 }
    );
  }

  const parsedJson: unknown = await request
    .json()
    .catch(() => INVALID_JSON_SENTINEL);
  if (parsedJson === INVALID_JSON_SENTINEL) {
    return jsonError(400, 'invalid_json', 'Feedback request body must be JSON');
  }
  const rawBody = asFeedbackRequestBody(parsedJson);

  if (FEEDBACK_MODERATION_MODE) {
    const queueId = enqueueModeration(rawBody);
    return NextResponse.json(
      {
        success: true,
        queued: true,
        queueId,
        message: 'Feedback queued for moderation review',
      },
      { status: 202 }
    );
  }

  let feedbackData: ParsedFeedbackPayload;
  try {
    feedbackData = deps.assertEnhancedFeedbackPayload(
      extractFeedbackPayload(rawBody)
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: 'invalid_feedback_payload',
        code: 'invalid_feedback_payload',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 400 }
    );
  }

  try {
    const createGateway =
      feedbackRouteTestHooks.createGateway || createGitHubFeedbackIssueGateway;
    const gateway = createGateway({
      repoOwner,
      repoName,
      token: GITHUB_TOKEN,
      userAgent: USER_AGENT,
    });
    const issueData = deps.buildGitHubFeedbackIssue(feedbackData);
    const upstreamResult = await gateway.createIssue(issueData as never);
    if (!upstreamResult.ok) {
      const errPayload = asGitHubIssuePayload(upstreamResult.payload);
      return NextResponse.json(
        {
          error: 'github_feedback_submission_failed',
          code: 'github_issue_create_failed',
          status: upstreamResult.status,
          message: errPayload.message || 'Unknown GitHub error',
          targetRepo: { owner: repoOwner, name: repoName },
        },
        { status: upstreamResult.status }
      );
    }

    const okPayload = asGitHubIssuePayload(upstreamResult.payload);
    return NextResponse.json({
      success: true,
      issueNumber: okPayload.number,
      issueUrl: okPayload.html_url,
      data: upstreamResult.payload,
    });
  } catch {
    return NextResponse.json(
      {
        error: 'upstream_request_failed',
        code: 'github_gateway_unreachable',
        message:
          'Unable to reach upstream GitHub service for feedback issue creation',
      },
      { status: 502 }
    );
  }
}
