import { NextResponse } from 'next/server';
import { buildGitHubFeedbackIssue } from '@/components/feedback/services/github/buildGitHubFeedbackIssue';

const GITHUB_BASE_URL = 'https://api.github.com';
const USER_AGENT = process.env.GITHUB_API_USER_AGENT || 'SortVision-App';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER =
  process.env.FEEDBACK_REPO_OWNER ||
  process.env.NEXT_PUBLIC_FEEDBACK_REPO_OWNER ||
  'alienx5499';
const REPO_NAME =
  process.env.FEEDBACK_REPO_NAME ||
  process.env.NEXT_PUBLIC_FEEDBACK_REPO_NAME ||
  'SortVision';

export async function POST(request) {
  if (!GITHUB_TOKEN) {
    return NextResponse.json(
      { error: 'Missing server GitHub token (GITHUB_TOKEN)' },
      { status: 500 }
    );
  }

  try {
    const feedbackData = await request.json();
    const issueData = buildGitHubFeedbackIssue(feedbackData);

    const upstream = await fetch(
      `${GITHUB_BASE_URL}/repos/${REPO_OWNER}/${REPO_NAME}/issues`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/vnd.github+json',
          'User-Agent': USER_AGENT,
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(issueData),
      }
    );

    const payload = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      return NextResponse.json(
        {
          error: 'GitHub feedback submission failed',
          status: upstream.status,
          message: payload?.message || upstream.statusText,
        },
        { status: upstream.status }
      );
    }

    return NextResponse.json({
      success: true,
      issueNumber: payload.number,
      issueUrl: payload.html_url,
      data: payload,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Invalid feedback payload',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 400 }
    );
  }
}
