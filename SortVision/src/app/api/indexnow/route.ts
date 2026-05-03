import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { submitToIndexNow } from '@/utils/indexNow';

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

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as IndexNowBody;
    const { urls } = body;

    if (!urls) {
      return NextResponse.json(
        { error: 'URLs array is required' },
        { status: 400 }
      );
    }

    if (!Array.isArray(urls)) {
      return NextResponse.json(
        { error: 'URLs must be an array' },
        { status: 400 }
      );
    }

    if (urls.length === 0) {
      return NextResponse.json(
        { error: 'At least one URL is required' },
        { status: 400 }
      );
    }

    const MAX_BATCH_SIZE = 100;
    if (urls.length > MAX_BATCH_SIZE) {
      return NextResponse.json(
        { error: `Maximum ${MAX_BATCH_SIZE} URLs per request` },
        { status: 400 }
      );
    }

    const result = (await submitToIndexNow(urls as string[], {
      log: true,
    })) as SubmitToIndexNowResult;

    return NextResponse.json({
      success: result.success,
      submitted: result.urlCount,
      results: result.results,
      urls: result.submittedUrls,
    });
  } catch (error) {
    console.error('[IndexNow API] Error:', error);
    const message =
      error instanceof Error ? error.message : 'Failed to submit URLs';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(
    {
      error: 'Method Not Allowed',
      message: 'This endpoint only accepts POST requests',
      usage: 'POST /api/indexnow with { urls: string[] }',
      endpoints: [
        'https://api.indexnow.org/IndexNow',
        'https://www.bing.com/indexnow',
        'https://yandex.com/indexnow',
      ],
    },
    { status: 405 }
  );
}
