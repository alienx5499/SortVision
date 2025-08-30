import React from 'react';
import { RefreshCw, Play, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Control Buttons Component
 *
 * A set of interactive buttons for controlling the sorting visualization:
 * - Generate new array
 * - Start sorting
 * - Stop sorting
 *
 * Features:
 * - Animated hover effects
 * - Visual feedback
 * - Accessibility support
 * - State-aware button states
 * - Consistent styling with other controls
 * - Responsive design
 */

const ControlButtons = ({
  generateNewArray,
  startSorting,
  stopSorting,
  isSorting,
}) => {
  return (
    <div className="my-4 relative group">
      {/* Animated background glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative bg-slate-900 p-4 rounded-lg border border-slate-800 transition-all duration-500 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 group/control overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Animated grid pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:8px_8px] opacity-30"></div>

            {/* Floating particles */}
            <div
              className="absolute h-2 w-2 rounded-full bg-purple-500/50 top-[20%] left-[30%] animate-pulse"
              style={{ animationDuration: '3s' }}
            ></div>
            <div
              className="absolute h-1 w-1 rounded-full bg-emerald-500/50 top-[40%] left-[50%] animate-pulse"
              style={{ animationDuration: '2.3s' }}
            ></div>
            <div
              className="absolute h-1.5 w-1.5 rounded-full bg-red-500/50 top-[60%] left-[70%] animate-pulse"
              style={{ animationDuration: '4s' }}
            ></div>

            {/* Animated code lines */}
            <div className="absolute top-[30%] left-0 h-px w-[40%] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-[moveRight_15s_linear_infinite]"></div>
            <div className="absolute top-[50%] left-0 h-px w-[30%] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent animate-[moveRight_12s_linear_infinite]"></div>
            <div className="absolute top-[70%] left-0 h-px w-[20%] bg-gradient-to-r from-transparent via-red-500/30 to-transparent animate-[moveRight_18s_linear_infinite]"></div>
          </div>
        </div>

        {/* Animated corner accent */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-md group-hover/control:scale-150 transition-transform duration-700"></div>

        {/* Animated bottom line */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover/control:w-full bg-gradient-to-r from-emerald-500/50 via-blue-500/50 to-purple-500/50 rounded transition-all duration-700"></div>

        <div className="relative z-10 grid grid-cols-3 gap-4">
          <div className="group/new relative overflow-hidden rounded-md">
            {/* Button shimmer effect */}
            <div className="absolute inset-0 w-0 group-hover/new:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent rounded-md z-0"></div>

            <Button
              variant="outline"
              onClick={generateNewArray}
              disabled={isSorting}
              className="bg-slate-800/90 border-slate-700 text-emerald-400 hover:bg-slate-700 hover:text-emerald-300 font-mono flex items-center justify-center relative z-10 w-full group-hover/new:border-emerald-500/30 transition-all duration-300"
              aria-label="Generate new array"
            >
              <RefreshCw
                className="mr-2 h-4 w-4 group-hover/new:animate-spin transition-all duration-300"
                style={{ animationDuration: '2s' }}
              />
              new_array()
            </Button>
          </div>

          <div className="group/start relative overflow-hidden rounded-md">
            {/* Button shimmer effect */}
            <div className="absolute inset-0 w-0 group-hover/start:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-md z-0"></div>

            <Button
              onClick={startSorting}
              disabled={isSorting}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-mono flex items-center justify-center relative z-10 w-full group-hover/start:shadow-lg group-hover/start:shadow-emerald-600/20 transition-all duration-300"
              aria-label="Start sorting visualization"
            >
              <Play className="mr-2 h-4 w-4 group-hover/start:scale-110 transition-transform duration-300" />
              {isSorting ? 'sorting...' : 'start()'}
            </Button>
          </div>

          <div className="group/stop relative overflow-hidden rounded-md">
            {/* Button shimmer effect */}
            <div className="absolute inset-0 w-0 group-hover/stop:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-md z-0"></div>

            <Button
              variant="destructive"
              onClick={stopSorting}
              disabled={!isSorting}
              className="font-mono flex items-center justify-center relative z-10 w-full group-hover/stop:shadow-lg group-hover/stop:shadow-red-600/20 transition-all duration-300"
              aria-label="Stop sorting visualization"
            >
              <Square className="mr-2 h-4 w-4 group-hover/stop:scale-110 transition-transform duration-300" />
              stop()
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlButtons;
