import { NextResponse } from 'next/server.js';
import type { NextRequest } from 'next/server';
import { submitToIndexNow } from '../../../utils/indexNow.js';
import { correlationHeaders, getOrCreateCorrelationId } from '../../../lib/logging/correlationId.ts';
import { createServerLogger } from '../../../lib/logging/createServerLogger.ts';

/**
 * IndexNow API Route
 *
 * POST /api/indexnow
 * Submit URLs to IndexNow for instant search engine indexing
 *
 * Body: { urls: string[] }
 */

type IndexNowBody = {
  urls?: unknown;
};

/** Aligns with `submitToIndexNow` runtime return; JS module JSDoc is incomplete. */
type SubmitToIndexNowResult = {
  success: boolean;
  urlCount: number;
  results: unknown[];
  submittedUrls: string[];
};

let submitToIndexNowImpl = submitToIndexNow;

export function __setIndexNowSubmitterForTests(
  submitter: typeof submitToIndexNow
): void {
  submitToIndexNowImpl = submitter;
}

export function __resetIndexNowRouteTestState(): void {
  submitToIndexNowImpl = submitToIndexNow;
}

export async function GET(req: NextRequest) {
  const requestId = getOrCreateCorrelationId(req);
  return NextResponse.json(
    {
      error: 'Method Not Allowed',
      usage: 'POST /api/indexnow with { urls: string[] }',
    },
    { status: 405, headers: correlationHeaders(requestId) }
  );
}

export async function POST(req: NextRequest) {
  const requestId = getOrCreateCorrelationId(req);
  const log = createServerLogger({ requestId, scope: 'api.indexnow' });
  const attachId = (res: NextResponse) => {
    for (const [k, v] of Object.entries(correlationHeaders(requestId))) {
      res.headers.set(k, v);
    }
    return res;
  };

  try {
    const body = (await req.json()) as IndexNowBody;
    const { urls } = body;

    if (!urls) {
      return attachId(
        NextResponse.json({ error: 'URLs array is required' }, { status: 400 })
      );
    }

    if (!Array.isArray(urls)) {
      return attachId(
        NextResponse.json({ error: 'URLs must be an array' }, { status: 400 })
      );
    }

    if (urls.length === 0) {
      return attachId(
        NextResponse.json(
          { error: 'At least one URL is required' },
          { status: 400 }
        )
      );
    }

    const MAX_BATCH_SIZE = 100;
    if (urls.length > MAX_BATCH_SIZE) {
      return attachId(
        NextResponse.json(
          { error: `Maximum ${MAX_BATCH_SIZE} URLs per request` },
          { status: 400 }
        )
      );
    }

    const result = (await submitToIndexNowImpl(urls as string[], {
      log: true,
    })) as SubmitToIndexNowResult;

    return attachId(
      NextResponse.json({
        success: result.success,
        submitted: result.urlCount,
        results: result.results,
        urls: result.submittedUrls,
      })
    );
  } catch (error) {
    log.error('indexnow.request.failed', error);
    const message =
      error instanceof Error ? error.message : 'Failed to submit URLs';
    return attachId(NextResponse.json({ error: message }, { status: 500 }));
  }
}
