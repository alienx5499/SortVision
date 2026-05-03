import React from 'react';

export const ContributorListLoadingGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
    {[...Array(6)].map((_, index) => (
      <div
        key={index}
        className="p-4 rounded-lg border border-slate-800 bg-slate-900/50 animate-pulse"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 bg-slate-700 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-slate-700 rounded mb-2"></div>
            <div className="h-3 bg-slate-800 rounded mb-2 w-2/3"></div>
            <div className="h-3 bg-slate-800 rounded w-1/2"></div>
          </div>
        </div>
        <div className="mt-4 h-2 bg-slate-800 rounded"></div>
      </div>
    ))}
  </div>
);
