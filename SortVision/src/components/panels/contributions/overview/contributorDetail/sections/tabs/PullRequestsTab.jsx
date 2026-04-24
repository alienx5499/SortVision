import React from 'react';
import { Clock, ExternalLink, GitPullRequest } from 'lucide-react';
import { getPRStatus } from '../../utils/statusMappers';

const PullRequestsTab = ({ pullRequests, t }) => {
  if (pullRequests.length === 0) {
    return (
      <div className="text-center py-12">
        <GitPullRequest className="w-12 h-12 text-slate-500 mx-auto mb-4" />
        <p className="text-slate-400 font-mono">
          {t('contributions.contributorDetail.noPullRequests')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {pullRequests.map(pr => {
        const prStatus = getPRStatus(pr);
        return (
          <div
            key={pr.id}
            className="bg-slate-800/30 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <GitPullRequest className={`w-4 h-4 ${prStatus.icon}`} />
                  <span
                    className={`px-2 py-1 rounded text-xs font-mono ${prStatus.bg}`}
                  >
                    {prStatus.status}
                  </span>
                  {pr.state === 'closed' && (
                    <span className="text-xs text-slate-500 font-mono">
                      {pr.merged_at
                        ? `Merged ${new Date(pr.merged_at).toLocaleDateString()}`
                        : pr.closed_at
                          ? `Closed ${new Date(pr.closed_at).toLocaleDateString()}`
                          : ''}
                    </span>
                  )}
                </div>
                <h4 className="text-white font-medium mb-1">{pr.title}</h4>
                <div className="text-sm text-slate-400 flex items-center gap-4">
                  <span>#{pr.number}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {t('contributions.contributorDetail.updated')}{' '}
                    {new Date(pr.updated_at).toLocaleDateString()}
                  </span>
                  {(pr.additions || pr.deletions || pr.changed_files) && (
                    <span className="flex items-center gap-2 text-xs">
                      {pr.changed_files && (
                        <span className="text-blue-400">
                          {pr.changed_files}{' '}
                          {t('contributions.contributorDetail.files')}
                        </span>
                      )}
                      {pr.additions !== undefined &&
                        pr.deletions !== undefined && (
                          <span className="flex items-center gap-1">
                            <span className="text-green-400">
                              +{pr.additions}
                            </span>
                            <span className="text-red-400">
                              -{pr.deletions}
                            </span>
                          </span>
                        )}
                    </span>
                  )}
                </div>
              </div>
              <a
                href={pr.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PullRequestsTab;
