import { NextResponse } from 'next/server';

const GITHUB_BASE_URL = 'https://api.github.com';
const USER_AGENT = process.env.GITHUB_API_USER_AGENT || 'SortVision-App';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

function buildHeaders() {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': USER_AGENT,
  };
  if (GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
  }
  return headers;
}

export async function GET(request, context) {
  const resolvedParams = await context?.params;
  const pathSegments = resolvedParams?.path || [];
  if (!Array.isArray(pathSegments) || pathSegments.length === 0) {
    return NextResponse.json({ error: 'Missing GitHub path' }, { status: 400 });
  }

  const url = new URL(`${GITHUB_BASE_URL}/${pathSegments.join('/')}`);
  request.nextUrl.searchParams.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  try {
    const upstream = await fetch(url.toString(), {
      method: 'GET',
      headers: buildHeaders(),
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
    ];
    for (const headerName of passHeaders) {
      const headerValue = upstream.headers.get(headerName);
      if (headerValue) response.headers.set(headerName, headerValue);
    }

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to proxy GitHub API request',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
