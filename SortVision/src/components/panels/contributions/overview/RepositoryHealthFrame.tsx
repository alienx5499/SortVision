import React, { type ReactNode } from 'react';
import { Activity, RefreshCw } from 'lucide-react';

type RepositoryHealthFrameProps = {
  loading: boolean;
  onRefresh: () => void;
  children: ReactNode;
};

export const RepositoryHealthFrame = ({
  loading,
  onRefresh,
  children,
}: RepositoryHealthFrameProps) => (
  <div className="mb-4 relative group">
    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

    <div className="relative bg-slate-900 p-4 rounded border border-slate-800 transition-all duration-500 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 group/health overflow-hidden">
      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover/health:w-full bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-emerald-500/50 rounded transition-all duration-700"></div>

      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:8px_8px] opacity-30"></div>
        <div
          className="absolute h-2 w-2 rounded-full bg-blue-500/50 top-[15%] left-[25%] animate-pulse"
          style={{ animationDuration: '3s' }}
        ></div>
        <div
          className="absolute h-1 w-1 rounded-full bg-purple-500/50 top-[60%] left-[75%] animate-pulse"
          style={{ animationDuration: '2.5s' }}
        ></div>
        <div
          className="absolute h-1.5 w-1.5 rounded-full bg-emerald-500/50 top-[80%] left-[20%] animate-pulse"
          style={{ animationDuration: '4s' }}
        ></div>
      </div>

      <div className="font-mono text-sm text-slate-400 mb-4 flex items-center justify-between relative z-10">
        <div className="flex items-center">
          <Activity
            className="mr-2 h-4 w-4 text-blue-400 animate-pulse"
            style={{ animationDuration: '3s' }}
          />
          <span>// repository health</span>
        </div>
        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          className="p-1 hover:bg-slate-800 rounded transition-colors duration-200 disabled:opacity-50"
          title="Refresh health data"
        >
          <RefreshCw
            className={`h-3 w-3 text-slate-500 hover:text-blue-400 transition-colors ${
              loading ? 'animate-spin' : ''
            }`}
          />
        </button>
      </div>

      {children}
    </div>
  </div>
);
