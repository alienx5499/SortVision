import React from 'react';

const AlgorithmSelectOptionIcon = ({ algorithm }) => {
  if (algorithm === 'bubble') {
    return (
      <div className="w-4 h-4 mr-2 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-1 bg-red-400 rounded-full animate-ping opacity-75"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (algorithm === 'selection') {
    return (
      <div className="w-4 h-4 mr-2 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 border border-amber-500 rounded-sm"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-amber-500 rounded-sm"></div>
        </div>
      </div>
    );
  }

  if (algorithm === 'insertion') {
    return (
      <div className="w-4 h-4 mr-2 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-1 bg-orange-500 rounded-sm"></div>
        </div>
      </div>
    );
  }

  if (algorithm === 'bucket') {
    return (
      <div className="w-4 h-4 mr-2 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-sm animate-pulse"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce"
            style={{ animationDuration: '1.5s' }}
          ></div>
        </div>
      </div>
    );
  }

  if (algorithm === 'radix') {
    return (
      <div className="w-4 h-4 mr-2 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-sm animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (algorithm === 'heap') {
    return (
      <div className="w-4 h-4 mr-2 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-sm animate-pulse"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-2 h-2 bg-indigo-400 rounded-sm animate-bounce"
            style={{ animationDuration: '2s' }}
          ></div>
        </div>
      </div>
    );
  }

  if (algorithm === 'merge') {
    return (
      <div className="w-4 h-4 mr-2 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-3 bg-blue-500 rounded-sm"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pl-2">
          <div className="w-1.5 h-3 bg-purple-500 rounded-sm"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-4 h-4 mr-2 relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-3 h-3 border-r-2 border-t-2 border-green-500 rounded-tr-md animate-spin"
          style={{ animationDuration: '3s' }}
        ></div>
      </div>
    </div>
  );
};

export default AlgorithmSelectOptionIcon;
