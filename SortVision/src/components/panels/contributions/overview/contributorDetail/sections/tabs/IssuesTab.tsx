import React from 'react';
import { Bug, Clock, ExternalLink } from 'lucide-react';

const IssuesTab = ({ issues, t }) => {
  if (issues.length === 0) {
    return (
      <div className="text-center py-12">
        <Bug className="w-12 h-12 text-slate-500 mx-auto mb-4" />
        <p className="text-slate-400 font-mono">
          {t('contributions.contributorDetail.noIssues')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {issues.map(issue => (
        <div
          key={issue.id}
          className="bg-slate-800/30 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Bug
                  className={`w-4 h-4 ${
                    issue.state === 'open'
                      ? 'text-green-400'
                      : 'text-purple-400'
                  }`}
                />
                <span
                  className={`px-2 py-1 rounded text-xs font-mono ${
                    issue.state === 'open'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-purple-500/20 text-purple-400'
                  }`}
                >
                  {issue.state.toUpperCase()}
                </span>
                {issue.labels?.map(label => (
                  <span
                    key={label.id}
                    className="px-2 py-1 rounded text-xs"
                    style={{
                      backgroundColor: `#${label.color}20`,
                      color: `#${label.color}`,
                    }}
                  >
                    {label.name}
                  </span>
                ))}
              </div>
              <h4 className="text-white font-medium mb-1">{issue.title}</h4>
              <div className="text-sm text-slate-400 flex items-center gap-4">
                <span>#{issue.number}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(issue.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>
            <a
              href={issue.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IssuesTab;
