import React from 'react';

// Algorithm Icon Component
const AlgorithmIcon = ({ algorithm }) => {
  if (algorithm === 'bubble') {
    return (
      <div className="relative h-6 w-6 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-red-500/20 rounded-full animate-ping opacity-30"
          style={{ animationDuration: '2s' }}
        ></div>
        <div
          className="absolute inset-0 bg-red-500/10 rounded-full animate-ping opacity-20"
          style={{ animationDuration: '3s', animationDelay: '0.5s' }}
        ></div>
        <div
          className="w-3 h-3 bg-red-400 rounded-full animate-pulse"
          style={{ animationDuration: '1.5s' }}
        ></div>
        <div
          className="absolute w-1 h-1 bg-red-300 rounded-full top-0 right-0 animate-ping"
          style={{ animationDuration: '1s' }}
        ></div>
      </div>
    );
  }

  if (algorithm === 'insertion') {
    return (
      <div className="relative h-6 w-6 flex items-center justify-center">
        <div className="w-4 h-1.5 bg-orange-400 rounded-sm"></div>
        <div
          className="absolute w-1.5 h-4 bg-orange-400/30 rounded-sm right-1 animate-bounce"
          style={{ animationDuration: '2s' }}
        ></div>
      </div>
    );
  }

  if (algorithm === 'selection') {
    return (
      <div className="relative h-6 w-6 flex items-center justify-center">
        <div className="w-4 h-4 border border-amber-400 rounded-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-amber-400/10"></div>
          <div className="absolute h-full w-1 bg-amber-400/30 animate-[selectionScan_2s_ease-in-out_infinite]"></div>
        </div>
        <div
          className="absolute inset-0 m-auto w-2 h-2 bg-amber-400 rounded-sm animate-pulse"
          style={{ animationDuration: '1.5s' }}
        ></div>
      </div>
    );
  }

  if (algorithm === 'quick') {
    return (
      <div className="relative h-6 w-6 flex items-center justify-center">
        <div
          className="w-4 h-4 border-r-2 border-t-2 border-green-400 rounded-tr-md animate-spin"
          style={{ animationDuration: '3s' }}
        ></div>
        <div
          className="absolute inset-0 w-2 h-2 bg-green-400/20 rounded-full m-auto animate-ping"
          style={{ animationDuration: '1.5s' }}
        ></div>
      </div>
    );
  }

  if (algorithm === 'merge') {
    return (
      <div className="relative h-6 w-6 flex items-center justify-center">
        <div className="relative w-5 h-4">
          <div className="absolute left-0 w-2 h-4 bg-blue-400 rounded-sm"></div>
          <div className="absolute right-0 w-2 h-4 bg-purple-400 rounded-sm"></div>
          <div className="absolute inset-x-0 bottom-0 h-1.5 bg-indigo-400/50 rounded-sm animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (algorithm === 'heap') {
    return (
      <div className="relative h-6 w-6 flex items-center justify-center">
        <div className="w-4 h-4 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-indigo-400/10"></div>
          <div className="absolute h-full w-1 bg-indigo-400/30 animate-[heapify_2s_ease-in-out_infinite]"></div>
        </div>
        <div
          className="absolute inset-0 m-auto w-2 h-2 bg-indigo-400 rounded-sm animate-pulse"
          style={{ animationDuration: '1.5s' }}
        ></div>
      </div>
    );
  }

  if (algorithm === 'bucket') {
    return (
      <div className="relative h-6 w-6 flex items-center justify-center">
        <div className="w-4 h-4 bg-gradient-to-br from-pink-500 to-rose-500 rounded-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-pink-400/10"></div>
          <div className="absolute h-full w-1 bg-pink-400/30 animate-[distribute_2s_ease-in-out_infinite]"></div>
        </div>
        <div
          className="absolute inset-0 m-auto w-2 h-2 bg-pink-400 rounded-full animate-pulse"
          style={{ animationDuration: '1.5s' }}
        ></div>
      </div>
    );
  }

  // Default (radix)
  return (
    <div className="relative h-6 w-6 flex items-center justify-center">
      <div className="w-4 h-4 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-sm animate-pulse"></div>
      <div
        className="absolute inset-0 bg-cyan-500/20 rounded-sm animate-ping opacity-30"
        style={{ animationDuration: '3s' }}
      ></div>
    </div>
  );
};

export default AlgorithmIcon;
