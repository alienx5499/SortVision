import React from 'react';
import { Tag } from 'lucide-react';
import type { RepositoryReleaseSummary } from './repositoryHealthTypes';

type RepositoryHealthLatestReleaseProps = {
  release: RepositoryReleaseSummary;
};

export const RepositoryHealthLatestRelease = ({
  release,
}: RepositoryHealthLatestReleaseProps) => (
  <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
    <div className="flex items-center mb-2">
      <Tag className="h-3 w-3 text-emerald-400 mr-2" />
      <span className="font-mono text-xs font-bold text-emerald-400">
        Latest Release
      </span>
    </div>
    <div className="space-y-2">
      <div className="font-mono text-sm text-white">
        {release.name || release.tag_name}
      </div>
      <div className="font-mono text-xs text-slate-400">
        {new Date(release.published_at).toLocaleDateString()}
      </div>
      <a
        href={release.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-2 py-1 bg-emerald-600/20 border border-emerald-500/30 rounded text-emerald-400 hover:text-emerald-300 font-mono text-xs transition-colors duration-200"
      >
        View Release →
      </a>
    </div>
  </div>
);
