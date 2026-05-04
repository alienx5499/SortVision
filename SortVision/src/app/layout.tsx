import './globals.css';
import type { ReactNode } from 'react';
import {
  getFeedbackGithubRepoFromEnv,
  getMainGithubRepoFromEnv,
} from '@/config/githubRepos';
import PerformanceMonitor from '../components/ui/PerformanceMonitor';
import {
  layoutMetadata,
  GEO_TEXT,
  buildSoftwareApplicationSchema,
  buildCreativeWorkSchema,
  buildFaqSchema,
  buildEducationalOrganizationSchema,
  getClientBootstrapScript,
} from './shell';

const isProdBuild = process.env.NODE_ENV === 'production';
export const metadata = layoutMetadata;

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const githubRepoSlugJson = JSON.stringify({
    main: getMainGithubRepoFromEnv(),
    feedback: getFeedbackGithubRepoFromEnv(),
  });

  const jsonLdSchemas = [
    buildSoftwareApplicationSchema(),
    buildCreativeWorkSchema(),
    buildFaqSchema(),
    buildEducationalOrganizationSchema(),
  ];

  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />
      </head>
      <body>
        <script
          id="sortvision-github-repo-slugs"
          type="application/json"
          dangerouslySetInnerHTML={{ __html: githubRepoSlugJson }}
        />
        <div style={{ display: 'none' }} aria-hidden="true">
          {GEO_TEXT} Example queries: "show me a sorting algorithm visualizer",
          "learn bubble sort with animation", "explain merge sort visually",
          "compare quicksort vs bubble sort", "interactive sorting algorithm
          demo".
        </div>
        <noscript>
          <div>{GEO_TEXT}</div>
        </noscript>
        <PerformanceMonitor />
        <div id="root">{children}</div>

        {jsonLdSchemas.map((schema, index) => (
          <script
            key={`layout-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

        <script
          dangerouslySetInnerHTML={{
            __html: getClientBootstrapScript(isProdBuild),
          }}
        />
      </body>
    </html>
  );
}
