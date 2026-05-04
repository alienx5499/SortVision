import assert from 'node:assert/strict';
import test, { afterEach } from 'node:test';

type FeedbackRouteModule = {
  POST: (request: unknown) => Promise<Response>;
  __resetFeedbackRouteTestState: () => void;
  __setFeedbackRouteTestHooks: (hooks: Record<string, unknown>) => void;
};

const ORIGINAL_ENV = {
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  REPO_OWNER: process.env.REPO_OWNER,
  REPO_NAME: process.env.REPO_NAME,
  FEEDBACK_MODERATION_MODE: process.env.FEEDBACK_MODERATION_MODE,
  NODE_ENV: process.env.NODE_ENV,
  VERCEL: process.env.VERCEL,
};

function restoreEnv(): void {
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
}

afterEach(() => {
  restoreEnv();
});

async function loadFeedbackRoute(
  overrides: Partial<Record<string, string>>
): Promise<FeedbackRouteModule> {
  process.env.GITHUB_TOKEN = 'test-token';
  process.env.REPO_OWNER = 'sortvision';
  process.env.REPO_NAME = 'sortvision-repo';
  process.env.FEEDBACK_MODERATION_MODE = 'false';
  process.env.NODE_ENV = 'test';

  for (const [key, value] of Object.entries(overrides)) {
    process.env[key] = value;
  }

  const suffix = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return (await import(
    `../../../src/app/api/github/feedback/route.ts?contract=${suffix}`
  )) as FeedbackRouteModule;
}

function makeFeedbackRequest(
  body: unknown,
  headers: Record<string, string> = {}
): unknown {
  return {
    headers: new Headers(headers),
    nextUrl: new URL('https://sortvision.com/api/github/feedback'),
    json: async () => body,
  };
}

function makeValidFeedbackPayload(): Record<string, unknown> {
  return {
    name: 'Test User',
    email: 'test@example.com',
    feedbackType: 'bug',
    detailedFeedback: 'Deterministic contract test feedback body',
    rating: 4,
    region: 'IN',
    followUp: true,
    locationData: {
      country: 'India',
      region: 'Karnataka',
      city: 'Bengaluru',
      timezone: 'Asia/Kolkata',
      detectionMethod: 'manual',
      accuracy: 'city',
    },
    sessionData: {
      sessionId: 'sess-1',
      timeSpentOnSite: 12,
      sessionStartTime: '2026-05-03T10:00:00.000Z',
      submissionTime: '2026-05-03T10:01:00.000Z',
      userAgent: 'node-test',
      screenResolution: '1920x1080',
      viewportSize: '1280x720',
      language: 'en',
      appLocale: 'en',
      languages: ['en'],
      timezone: 'Asia/Kolkata',
      colorDepth: 24,
      pixelRatio: 2,
    },
    deviceInfo: {
      deviceType: 'desktop',
      isMobile: false,
      isTablet: false,
      platform: 'macOS',
      vendor: 'Apple',
      cookieEnabled: true,
      onlineStatus: true,
      doNotTrack: 'unknown',
    },
    networkInfo: {
      effectiveType: '4g',
      downlink: 10,
      rtt: 50,
      saveData: false,
    },
    performanceInfo: {
      domContentLoaded: 10,
      pageLoad: 20,
      dnsLookup: 1,
      tcpConnect: 2,
      serverResponse: 3,
    },
    browserCapabilities: {
      localStorage: true,
      sessionStorage: true,
      webGL: true,
      touchSupport: false,
      geolocation: true,
      webWorkers: true,
      websockets: true,
      indexedDB: true,
      serviceWorker: true,
      pushNotifications: false,
    },
    pageContext: {
      url: 'https://sortvision.com/feedback',
      pathname: '/feedback',
      search: '',
      hash: '',
      referrer: '',
      title: 'Feedback',
      scrollPosition: { x: 0, y: 100 },
      documentHeight: 2000,
    },
    memoryInfo: {
      usedJSHeapSize: 1,
      totalJSHeapSize: 2,
      jsHeapSizeLimit: 3,
    },
    errorHistory: [],
    featureUsage: null,
    accessibilityInfo: {
      reduceMotion: false,
      highContrast: false,
      darkMode: true,
      forcedColors: false,
    },
  };
}

function installFeedbackDeps(route: FeedbackRouteModule): void {
  route.__setFeedbackRouteTestHooks({
    deps: {
      getFeedbackIssueRepoFromEnv: () => ({
        owner: 'sortvision',
        name: 'sortvision-repo',
      }),
      assertEnhancedFeedbackPayload: (raw: unknown) => raw,
      buildGitHubFeedbackIssue: () => ({
        title: 'x',
        body: 'y',
        labels: ['z'],
      }),
    },
  });
}

test('POST returns 403 for forbidden origin', async () => {
  const route = await loadFeedbackRoute({});
  route.__resetFeedbackRouteTestState();
  installFeedbackDeps(route);
  const response = await route.POST(
    makeFeedbackRequest(makeValidFeedbackPayload(), {
      origin: 'https://evil.example.com',
    })
  );
  assert.equal(response.status, 403);
  const body = (await response.json()) as Record<string, unknown>;
  assert.equal(body.code, 'forbidden_origin');
});

test('POST returns 503 when production cannot resolve client IP', async () => {
  const route = await loadFeedbackRoute({
    NODE_ENV: 'production',
    VERCEL: '',
  });
  route.__resetFeedbackRouteTestState();
  installFeedbackDeps(route);
  const response = await route.POST(
    makeFeedbackRequest(makeValidFeedbackPayload(), {
      origin: 'https://sortvision.com',
    })
  );
  assert.equal(response.status, 503);
  const body = (await response.json()) as Record<string, unknown>;
  assert.equal(body.code, 'ip_resolution_failed');
});

test('POST accepts x-forwarded-for on Vercel in production for rate limiting', async () => {
  const route = await loadFeedbackRoute({
    NODE_ENV: 'production',
    VERCEL: '1',
  });
  route.__resetFeedbackRouteTestState();
  installFeedbackDeps(route);
  route.__setFeedbackRouteTestHooks({
    createGateway: () => ({
      createIssue: async () => ({
        ok: true,
        status: 201,
        payload: { number: 42, html_url: 'https://github.com/o/r/issues/42' },
      }),
    }),
  });

  const response = await route.POST(
    makeFeedbackRequest(makeValidFeedbackPayload(), {
      origin: 'https://sortvision.com',
      'x-forwarded-for': '198.51.100.180',
    })
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as Record<string, unknown>;
  assert.equal(body.success, true);
});

test('POST returns 400 for invalid JSON body', async () => {
  const route = await loadFeedbackRoute({});
  route.__resetFeedbackRouteTestState();
  installFeedbackDeps(route);
  const response = await route.POST({
    headers: new Headers({ origin: 'https://sortvision.com' }),
    nextUrl: new URL('https://sortvision.com/api/github/feedback'),
    json: async () => {
      throw new Error('invalid-json');
    },
  });
  assert.equal(response.status, 400);
  const body = (await response.json()) as Record<string, unknown>;
  assert.equal(body.code, 'invalid_json');
});

test('POST returns 429 after hitting per-IP rate limit', async () => {
  const route = await loadFeedbackRoute({});
  route.__resetFeedbackRouteTestState();
  installFeedbackDeps(route);
  const request = makeFeedbackRequest(
    { detailedFeedback: '' },
    { origin: 'https://sortvision.com', 'x-forwarded-for': '198.51.100.23' }
  );

  for (let i = 0; i < 10; i += 1) {
    await route.POST(request);
  }
  const blocked = await route.POST(request);
  assert.equal(blocked.status, 429);
  const body = (await blocked.json()) as Record<string, unknown>;
  assert.equal(body.code, 'rate_limited');
  assert.ok(blocked.headers.get('Retry-After'));
});

test('POST returns 502 when GitHub gateway is unreachable', async () => {
  const route = await loadFeedbackRoute({});
  route.__resetFeedbackRouteTestState();
  installFeedbackDeps(route);
  route.__setFeedbackRouteTestHooks({
    createGateway: () => ({
      createIssue: async () => {
        throw new Error('network down');
      },
    }),
  });

  const response = await route.POST(
    makeFeedbackRequest(makeValidFeedbackPayload(), {
      origin: 'https://sortvision.com',
      'x-forwarded-for': '198.51.100.77',
    })
  );
  assert.equal(response.status, 502);
  const body = (await response.json()) as Record<string, unknown>;
  assert.equal(body.code, 'github_gateway_unreachable');
});

test('POST returns 202 and queues feedback in moderation mode', async () => {
  const route = await loadFeedbackRoute({ FEEDBACK_MODERATION_MODE: 'true' });
  route.__resetFeedbackRouteTestState();
  installFeedbackDeps(route);
  route.__setFeedbackRouteTestHooks({ randomUUID: () => 'queue-item-1' });

  const response = await route.POST(
    makeFeedbackRequest(
      { feedbackType: 'idea', rating: 5, email: 'test@example.com', name: 'T' },
      {
        origin: 'https://sortvision.com',
        'x-forwarded-for': '198.51.100.91',
      }
    )
  );

  assert.equal(response.status, 202);
  const body = (await response.json()) as Record<string, unknown>;
  assert.equal(body.queued, true);
  assert.equal(body.queueId, 'queue-item-1');
});

test('POST returns 500 when GITHUB_TOKEN is missing', async () => {
  const route = await loadFeedbackRoute({ GITHUB_TOKEN: '' });
  route.__resetFeedbackRouteTestState();
  installFeedbackDeps(route);
  const response = await route.POST(
    makeFeedbackRequest(makeValidFeedbackPayload(), {
      origin: 'https://sortvision.com',
      'x-forwarded-for': '198.51.100.51',
    })
  );
  assert.equal(response.status, 500);
  const body = (await response.json()) as Record<string, unknown>;
  assert.equal(body.code, 'missing_github_token');
});

test('POST returns 500 when feedback repo config is missing', async () => {
  const route = await loadFeedbackRoute({});
  route.__resetFeedbackRouteTestState();
  route.__setFeedbackRouteTestHooks({
    deps: {
      getFeedbackIssueRepoFromEnv: () => ({ owner: '', name: '' }),
      assertEnhancedFeedbackPayload: (raw: unknown) =>
        raw as Record<string, unknown>,
      buildGitHubFeedbackIssue: () => ({
        title: 'x',
        body: 'y',
        labels: ['z'],
      }),
    },
  });
  const response = await route.POST(
    makeFeedbackRequest(makeValidFeedbackPayload(), {
      origin: 'https://sortvision.com',
      'x-forwarded-for': '198.51.100.52',
    })
  );
  assert.equal(response.status, 500);
  const body = (await response.json()) as Record<string, unknown>;
  assert.equal(body.code, 'missing_feedback_repo_config');
});

test('POST returns 400 when payload validation fails', async () => {
  const route = await loadFeedbackRoute({});
  route.__resetFeedbackRouteTestState();
  route.__setFeedbackRouteTestHooks({
    deps: {
      getFeedbackIssueRepoFromEnv: () => ({
        owner: 'sortvision',
        name: 'sortvision-repo',
      }),
      assertEnhancedFeedbackPayload: () => {
        throw new Error('payload invalid');
      },
      buildGitHubFeedbackIssue: () => ({
        title: 'x',
        body: 'y',
        labels: ['z'],
      }),
    },
  });

  const response = await route.POST(
    makeFeedbackRequest(makeValidFeedbackPayload(), {
      origin: 'https://sortvision.com',
      'x-forwarded-for': '198.51.100.53',
    })
  );
  assert.equal(response.status, 400);
  const body = (await response.json()) as Record<string, unknown>;
  assert.equal(body.code, 'invalid_feedback_payload');
});

test('POST maps non-throwing GitHub failure response', async () => {
  const route = await loadFeedbackRoute({});
  route.__resetFeedbackRouteTestState();
  installFeedbackDeps(route);
  route.__setFeedbackRouteTestHooks({
    createGateway: () => ({
      createIssue: async () => ({
        ok: false,
        status: 422,
        payload: { message: 'Validation Failed' },
      }),
    }),
  });

  const response = await route.POST(
    makeFeedbackRequest(makeValidFeedbackPayload(), {
      origin: 'https://sortvision.com',
      'x-forwarded-for': '198.51.100.54',
    })
  );
  assert.equal(response.status, 422);
  const body = (await response.json()) as Record<string, unknown>;
  assert.equal(body.code, 'github_issue_create_failed');
  assert.equal(body.message, 'Validation Failed');
});
