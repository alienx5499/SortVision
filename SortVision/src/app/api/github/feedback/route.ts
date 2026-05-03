import { NextResponse } from 'next/server';
import {
  assertEnhancedFeedbackPayload,
  buildGitHubFeedbackIssue,
  getFeedbackIssueRepoFromEnv,
} from '@/lib/feedback';
import { createGitHubFeedbackIssueGateway } from './gateways/githubFeedbackIssueGateway';

const USER_AGENT = process.env.GITHUB_API_USER_AGENT || 'SortVision-App';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

type GitHubIssueApiPayload = {
  message?: string;
  number?: number;
  html_url?: string;
};

function asGitHubIssuePayload(raw: unknown): GitHubIssueApiPayload {
  if (raw && typeof raw === 'object') {
    return raw as GitHubIssueApiPayload;
  }
  return {};
}

export async function POST(request: Request) {
  if (!GITHUB_TOKEN) {
    return NextResponse.json(
      { error: 'Missing server GitHub token (GITHUB_TOKEN)' },
      { status: 500 }
    );
  }

  const { owner: repoOwner, name: repoName } = getFeedbackIssueRepoFromEnv();
  if (!repoOwner || !repoName) {
    return NextResponse.json(
      {
        error: 'Missing feedback repository configuration',
        message: 'Set REPO_OWNER and REPO_NAME in the server environment.',
      },
      { status: 500 }
    );
  }

  try {
    const gateway = createGitHubFeedbackIssueGateway({
      repoOwner,
      repoName,
      token: GITHUB_TOKEN,
      userAgent: USER_AGENT,
    });
    const rawBody: unknown = await request.json();
    const feedbackData = assertEnhancedFeedbackPayload(rawBody);
    const issueData = buildGitHubFeedbackIssue(feedbackData);
    const upstreamResult = await gateway.createIssue(issueData);
    if (!upstreamResult.ok) {
      const errPayload = asGitHubIssuePayload(upstreamResult.payload);
      return NextResponse.json(
        {
          error: 'GitHub feedback submission failed',
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
