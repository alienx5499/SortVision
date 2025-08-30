import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Terminal } from 'lucide-react';

/**
 * SortingHeader Component
 *
 * Renders the application header with title and decorative elements
 */
const SortingHeader = () => {
  return (
    <CardHeader className="border-b border-slate-800 bg-slate-900">
      <div className="flex items-center">
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <CardTitle className="font-mono flex items-center">
          <Terminal className="mr-2 h-5 w-5" />
          <span className="text-emerald-400">sort</span>
          <span className="text-purple-400">()</span>
          <span className="text-slate-400 text-sm ml-2">
            // algorithm visualizer
          </span>
        </CardTitle>
      </div>
    </CardHeader>
  );
};

export default SortingHeader;
