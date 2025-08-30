import React from 'react';

/**
 * AlgorithmSelector Component
 *
 * Provides a UI for selecting different sorting algorithms
 * Grouped by categories (Basic, Efficient, Special)
 */
const AlgorithmSelector = ({ algorithm, setAlgorithm }) => {
  return (
    <div className="mb-8 relative group">
      {/* Animated background glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/30 via-blue-500/30 to-purple-500/30 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative grid grid-cols-3 gap-4">
        {/* BASIC SORTS BOX */}
        <div
          className={`p-5 rounded-lg cursor-pointer transition-all duration-500 overflow-hidden relative group/basic
                        ${
                          algorithm === 'bubble' ||
                          algorithm === 'insertion' ||
                          algorithm === 'selection'
                            ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-red-500/30 shadow-lg shadow-red-500/10'
                            : 'bg-gradient-to-br from-slate-800/70 to-slate-900/70 border border-slate-700/50 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/10'
                        }`}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute top-0 left-0 w-full h-full">
              {/* Animated grid pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:8px_8px] opacity-30"></div>

              {/* Floating particles */}
              <div
                className="absolute h-1.5 w-1.5 rounded-full bg-red-500/50 top-[10%] left-[20%] animate-pulse"
                style={{ animationDuration: '3s' }}
              ></div>
              <div
                className="absolute h-1 w-1 rounded-full bg-orange-500/50 top-[30%] left-[70%] animate-pulse"
                style={{ animationDuration: '2.3s' }}
              ></div>
              <div
                className="absolute h-1 w-1 rounded-full bg-yellow-500/50 top-[70%] left-[30%] animate-pulse"
                style={{ animationDuration: '4s' }}
              ></div>

              {/* Animated code lines */}
              <div className="absolute top-[15%] left-0 h-px w-[30%] bg-gradient-to-r from-transparent via-red-500/30 to-transparent animate-[moveRight_15s_linear_infinite]"></div>
              <div className="absolute top-[45%] left-0 h-px w-[20%] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent animate-[moveRight_12s_linear_infinite]"></div>
            </div>
          </div>

          {/* Animated corner accent */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-md group-hover/basic:scale-150 transition-transform duration-700"></div>

          {/* Animated bottom line */}
          <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover/basic:w-full bg-gradient-to-r from-emerald-500/50 via-blue-500/50 to-purple-500/50 rounded transition-all duration-700"></div>

          <div className="text-xs font-bold text-slate-300 mb-3 flex items-center justify-between">
            <span className="tracking-widest relative group-hover/basic:text-red-300 transition-colors duration-300 flex items-center">
              <span className="text-red-400 mr-1 opacity-80 group-hover/basic:opacity-100 transition-opacity duration-300">
                //{' '}
              </span>
              BASIC SORTS
              <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-red-400/0 via-red-400/70 to-red-400/0"></span>
            </span>
            <div className="flex space-x-2">
              <div
                onClick={() => setAlgorithm('bubble')}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-500 transform ${
                  algorithm === 'bubble'
                    ? 'bg-red-400 scale-110 animate-pulse shadow-md shadow-red-500/50'
                    : 'bg-slate-600 hover:bg-red-400/70 hover:scale-125 hover:rotate-12'
                }`}
              ></div>
              <div
                onClick={() => setAlgorithm('insertion')}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-500 transform ${
                  algorithm === 'insertion'
                    ? 'bg-orange-400 scale-110 animate-pulse shadow-md shadow-orange-500/50'
                    : 'bg-slate-600 hover:bg-orange-400/70 hover:scale-125 hover:rotate-12'
                }`}
              ></div>
              <div
                onClick={() => setAlgorithm('selection')}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-500 transform ${
                  algorithm === 'selection'
                    ? 'bg-yellow-400 scale-110 animate-pulse shadow-md shadow-yellow-500/50'
                    : 'bg-slate-600 hover:bg-yellow-400/70 hover:scale-125 hover:rotate-12'
                }`}
              ></div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-2">
            <div className="flex space-x-2 w-full justify-between">
              <button
                onClick={() => setAlgorithm('bubble')}
                className={`relative text-xs px-2 py-1.5 rounded-md transition-all duration-500 overflow-hidden ${
                  algorithm === 'bubble'
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30 shadow-lg shadow-red-500/10'
                    : 'text-slate-400 hover:text-red-300 hover:-translate-y-1 hover:shadow-md'
                }`}
              >
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 w-0 group-hover/basic:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-red-400/5 to-transparent"></div>
                <span className="relative">Bubble</span>
              </button>
              <button
                onClick={() => setAlgorithm('insertion')}
                className={`relative text-xs px-2 py-1.5 rounded-md transition-all duration-500 overflow-hidden ${
                  algorithm === 'insertion'
                    ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30 shadow-lg shadow-orange-500/10'
                    : 'text-slate-400 hover:text-orange-300 hover:-translate-y-1 hover:shadow-md'
                }`}
              >
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 w-0 group-hover/basic:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-orange-400/5 to-transparent"></div>
                <span className="relative">Insertion</span>
              </button>
              <button
                onClick={() => setAlgorithm('selection')}
                className={`relative text-xs px-2 py-1.5 rounded-md transition-all duration-500 overflow-hidden ${
                  algorithm === 'selection'
                    ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 shadow-lg shadow-yellow-500/10'
                    : 'text-slate-400 hover:text-yellow-300 hover:-translate-y-1 hover:shadow-md'
                }`}
              >
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 w-0 group-hover/basic:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent"></div>
                <span className="relative">Selection</span>
              </button>
            </div>
          </div>
        </div>

        {/* EFFICIENT SORTS BOX */}
        <div
          className={`p-5 rounded-lg cursor-pointer transition-all duration-500 overflow-hidden relative group/efficient
                        ${
                          algorithm === 'quick' ||
                          algorithm === 'merge' ||
                          algorithm === 'heap'
                            ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-blue-500/30 shadow-lg shadow-blue-500/10'
                            : 'bg-gradient-to-br from-slate-800/70 to-slate-900/70 border border-slate-700/50 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10'
                        }`}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute top-0 left-0 w-full h-full">
              {/* Animated grid pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:8px_8px] opacity-30"></div>

              {/* Floating particles */}
              <div
                className="absolute h-1.5 w-1.5 rounded-full bg-green-500/50 top-[10%] left-[20%] animate-pulse"
                style={{ animationDuration: '3s' }}
              ></div>
              <div
                className="absolute h-1 w-1 rounded-full bg-teal-500/50 top-[30%] left-[70%] animate-pulse"
                style={{ animationDuration: '2.3s' }}
              ></div>
              <div
                className="absolute h-1 w-1 rounded-full bg-blue-500/50 top-[70%] left-[30%] animate-pulse"
                style={{ animationDuration: '4s' }}
              ></div>

              {/* Animated code lines */}
              <div className="absolute top-[15%] left-0 h-px w-[30%] bg-gradient-to-r from-transparent via-green-500/30 to-transparent animate-[moveRight_15s_linear_infinite]"></div>
              <div className="absolute top-[45%] left-0 h-px w-[20%] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-[moveRight_12s_linear_infinite]"></div>
            </div>
          </div>

          {/* Animated corner accent */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full blur-md group-hover/efficient:scale-150 transition-transform duration-700"></div>

          {/* Animated bottom line */}
          <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover/efficient:w-full bg-gradient-to-r from-emerald-500/50 via-blue-500/50 to-purple-500/50 rounded transition-all duration-700"></div>

          <div className="text-xs font-bold text-slate-300 mb-3 flex items-center justify-between">
            <span className="tracking-widest relative group-hover/efficient:text-blue-300 transition-colors duration-300 flex items-center">
              <span className="text-blue-400 mr-1 opacity-80 group-hover/efficient:opacity-100 transition-opacity duration-300">
                //{' '}
              </span>
              EFFICIENT SORTS
              <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-blue-400/0 via-blue-400/70 to-blue-400/0"></span>
            </span>
            <div className="flex space-x-2">
              <div
                onClick={() => setAlgorithm('quick')}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-500 transform ${
                  algorithm === 'quick'
                    ? 'bg-green-400 scale-110 animate-pulse shadow-md shadow-green-500/50'
                    : 'bg-slate-600 hover:bg-green-400/70 hover:scale-125 hover:rotate-12'
                }`}
              ></div>
              <div
                onClick={() => setAlgorithm('merge')}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-500 transform ${
                  algorithm === 'merge'
                    ? 'bg-blue-400 scale-110 animate-pulse shadow-md shadow-blue-500/50'
                    : 'bg-slate-600 hover:bg-blue-400/70 hover:scale-125 hover:rotate-12'
                }`}
              ></div>
              <div
                onClick={() => setAlgorithm('heap')}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-500 transform ${
                  algorithm === 'heap'
                    ? 'bg-indigo-400 scale-110 animate-pulse shadow-md shadow-indigo-500/50'
                    : 'bg-slate-600 hover:bg-indigo-400/70 hover:scale-125 hover:rotate-12'
                }`}
              ></div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-2">
            <div className="flex space-x-2 w-full justify-between">
              <button
                onClick={() => setAlgorithm('quick')}
                className={`relative text-xs px-3 py-1.5 rounded-md transition-all duration-500 overflow-hidden ${
                  algorithm === 'quick'
                    ? 'bg-green-500/20 text-green-300 border border-green-500/30 shadow-lg shadow-green-500/10'
                    : 'text-slate-400 hover:text-green-300 hover:-translate-y-1 hover:shadow-md'
                }`}
              >
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 w-0 group-hover/efficient:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-green-400/5 to-transparent"></div>
                <span className="relative">Quick</span>
              </button>
              <button
                onClick={() => setAlgorithm('merge')}
                className={`relative text-xs px-3 py-1.5 rounded-md transition-all duration-500 overflow-hidden ${
                  algorithm === 'merge'
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30 shadow-lg shadow-blue-500/10'
                    : 'text-slate-400 hover:text-blue-300 hover:-translate-y-1 hover:shadow-md'
                }`}
              >
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 w-0 group-hover/efficient:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-blue-400/5 to-transparent"></div>
                <span className="relative">Merge</span>
              </button>
              <button
                onClick={() => setAlgorithm('heap')}
                className={`relative text-xs px-3 py-1.5 rounded-md transition-all duration-500 overflow-hidden ${
                  algorithm === 'heap'
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-lg shadow-indigo-500/10'
                    : 'text-slate-400 hover:text-indigo-300 hover:-translate-y-1 hover:shadow-md'
                }`}
              >
                <div className="absolute inset-0 w-0 group-hover/efficient:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-indigo-400/5 to-transparent"></div>
                <span className="relative">Heap</span>
              </button>
            </div>
          </div>
        </div>

        {/* SPECIAL SORTS BOX */}
        <div
          className={`p-5 rounded-lg cursor-pointer transition-all duration-500 overflow-hidden relative group/special
                        ${
                          algorithm === 'radix' || algorithm === 'bucket'
                            ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/30 shadow-lg shadow-purple-500/10'
                            : 'bg-gradient-to-br from-slate-800/70 to-slate-900/70 border border-slate-700/50 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10'
                        }`}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute top-0 left-0 w-full h-full">
              {/* Animated grid pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:8px_8px] opacity-30"></div>

              {/* Floating particles */}
              <div
                className="absolute h-1.5 w-1.5 rounded-full bg-indigo-500/50 top-[10%] left-[20%] animate-pulse"
                style={{ animationDuration: '3s' }}
              ></div>
              <div
                className="absolute h-1 w-1 rounded-full bg-purple-500/50 top-[30%] left-[70%] animate-pulse"
                style={{ animationDuration: '2.3s' }}
              ></div>
              <div
                className="absolute h-1 w-1 rounded-full bg-pink-500/50 top-[70%] left-[30%] animate-pulse"
                style={{ animationDuration: '4s' }}
              ></div>

              {/* Animated code lines */}
              <div className="absolute top-[15%] left-0 h-px w-[30%] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent animate-[moveRight_15s_linear_infinite]"></div>
              <div className="absolute top-[45%] left-0 h-px w-[20%] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-[moveRight_12s_linear_infinite]"></div>
            </div>
          </div>

          {/* Animated corner accent */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-md group-hover/special:scale-150 transition-transform duration-700"></div>

          {/* Animated bottom line */}
          <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover/special:w-full bg-gradient-to-r from-emerald-500/50 via-blue-500/50 to-purple-500/50 rounded transition-all duration-700"></div>

          <div className="text-xs font-bold text-slate-300 mb-3 flex items-center justify-between">
            <span className="tracking-widest relative group-hover/special:text-purple-300 transition-colors duration-300 flex items-center">
              <span className="text-purple-400 mr-1 opacity-80 group-hover/special:opacity-100 transition-opacity duration-300">
                //{' '}
              </span>
              SPECIAL SORTS
              <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-purple-400/0 via-purple-400/70 to-purple-400/0"></span>
            </span>
            <div className="flex space-x-2">
              <div
                onClick={() => setAlgorithm('radix')}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-500 transform ${
                  algorithm === 'radix'
                    ? 'bg-cyan-400 scale-110 animate-pulse shadow-md shadow-cyan-500/50'
                    : 'bg-slate-600 hover:bg-cyan-400/70 hover:scale-125 hover:rotate-12'
                }`}
              ></div>
              <div
                onClick={() => setAlgorithm('bucket')}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-500 transform ${
                  algorithm === 'bucket'
                    ? 'bg-pink-400 scale-110 animate-pulse shadow-md shadow-pink-500/50'
                    : 'bg-slate-600 hover:bg-pink-400/70 hover:scale-125 hover:rotate-12'
                }`}
              ></div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-2">
            <div className="flex space-x-2 w-full justify-between">
              <button
                onClick={() => setAlgorithm('radix')}
                className={`relative text-xs px-3 py-1.5 rounded-md transition-all duration-500 overflow-hidden ${
                  algorithm === 'radix'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-cyan-300 hover:-translate-y-1 hover:shadow-md'
                }`}
              >
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 w-0 group-hover/special:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent"></div>
                <span className="relative">Radix</span>
              </button>
              <button
                onClick={() => setAlgorithm('bucket')}
                className={`relative text-xs px-3 py-1.5 rounded-md transition-all duration-500 overflow-hidden ${
                  algorithm === 'bucket'
                    ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30 shadow-lg shadow-pink-500/10'
                    : 'text-slate-400 hover:text-pink-300 hover:-translate-y-1 hover:shadow-md'
                }`}
              >
                <div className="absolute inset-0 w-0 group-hover/special:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-pink-400/5 to-transparent"></div>
                <span className="relative">Bucket</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmSelector;
