import React from 'react';

const ContributorDetailLoadingState = ({ t, loadingProgress }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 font-mono text-sm max-w-md w-full">
      <div className="flex items-center gap-2 text-emerald-400 mb-4">
        <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
        <span>{t('contributions.contributorDetail.loading')}</span>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span>{t('contributions.contributorDetail.progress')}</span>
          <span>
            {loadingProgress.current}/{loadingProgress.total}
          </span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div
            className="bg-emerald-400 h-2 rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${(loadingProgress.current / loadingProgress.total) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      <div className="text-slate-300 text-xs">
        <span className="text-emerald-400">$</span> {loadingProgress.stage}
        <span className="animate-pulse">|</span>
      </div>

      <div className="flex items-center gap-1 mt-3">
        <div className="w-1 h-1 bg-emerald-400 rounded-full animate-bounce"></div>
        <div
          className="w-1 h-1 bg-emerald-400 rounded-full animate-bounce"
          style={{ animationDelay: '0.1s' }}
        ></div>
        <div
          className="w-1 h-1 bg-emerald-400 rounded-full animate-bounce"
          style={{ animationDelay: '0.2s' }}
        ></div>
      </div>
    </div>
  </div>
);

export default ContributorDetailLoadingState;
