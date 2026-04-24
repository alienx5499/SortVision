import React from 'react';
import {
  Calendar,
  Clock,
  ExternalLink,
  FileText,
  GitCommit,
} from 'lucide-react';

const CommitsTab = ({ commits, hasMoreCommits, loadingMoreCommits, t }) => {
  if (commits.length === 0) {
    return (
      <div className="text-center py-12">
        <GitCommit className="w-12 h-12 text-slate-500 mx-auto mb-4" />
        <p className="text-slate-400 font-mono">
          {t('contributions.contributorDetail.noCommits')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {commits.map(commit => (
        <div
          key={commit.sha}
          className="bg-slate-800/30 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-colors group"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
              <GitCommit className="w-3 h-3" />
              <span>{t('contributions.contributorDetail.commit')}</span>
            </div>
            <code className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-300 font-mono border border-slate-600">
              {commit.sha.substring(0, 8)}
            </code>
            <div className="flex-1"></div>
            <a
              href={commit.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors opacity-70 group-hover:opacity-100"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="mb-3">
            <h4 className="text-white font-medium font-mono text-sm leading-relaxed">
              {commit.commit.message.split('\n')[0]}
            </h4>
            {commit.commit.message.split('\n').slice(1).join('\n').trim() && (
              <p className="text-slate-400 text-xs mt-1 font-mono">
                {commit.commit.message.split('\n').slice(1).join('\n').trim()}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-4 text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(commit.commit.author.date).toLocaleDateString(
                  'en-US',
                  {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  }
                )}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {new Date(commit.commit.author.date).toLocaleTimeString(
                  'en-US',
                  {
                    hour: '2-digit',
                    minute: '2-digit',
                  }
                )}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {commit.stats && (
                <>
                  {commit.stats.total !== undefined && (
                    <span className="text-blue-400 flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {(commit.files && commit.files.length) || 'N/A'}{' '}
                      {t('contributions.contributorDetail.files')}
                    </span>
                  )}
                  <span className="flex items-center gap-2">
                    <span className="text-green-400 font-bold">
                      +{commit.stats.additions || 0}
                    </span>
                    <span className="text-red-400 font-bold">
                      -{commit.stats.deletions || 0}
                    </span>
                  </span>
                </>
              )}
            </div>
          </div>

          {commit.files && commit.files.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-700">
              <div className="text-xs text-slate-400 font-mono mb-2">
                {t('contributions.contributorDetail.modifiedFiles')} (
                {commit.files.length}):
              </div>
              <div className="grid grid-cols-1 gap-1 max-h-20 overflow-y-auto">
                {commit.files.slice(0, 5).map((file, fileIndex) => (
                  <div
                    key={fileIndex}
                    className="flex items-center justify-between text-xs font-mono"
                  >
                    <span className="text-slate-300 truncate flex-1 mr-2">
                      {file.filename}
                    </span>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-green-400">
                        +{file.additions || 0}
                      </span>
                      <span className="text-red-400">
                        -{file.deletions || 0}
                      </span>
                    </div>
                  </div>
                ))}
                {commit.files.length > 5 && (
                  <div className="text-xs text-slate-500 font-mono">
                    ...{' '}
                    {t('contributions.contributorDetail.andMore').replace(
                      '{count}',
                      commit.files.length - 5
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      {loadingMoreCommits && (
        <div className="text-center py-3 text-xs font-mono text-emerald-400">
          Loading more commits...
        </div>
      )}

      {!hasMoreCommits && commits.length > 0 && (
        <div className="text-center py-3 text-xs font-mono text-slate-500">
          End of commit history
        </div>
      )}
    </div>
  );
};

export default CommitsTab;
