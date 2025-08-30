import React from 'react';
import { Lightbulb } from 'lucide-react';

/**
 * InteractiveTip Component
 *
 * Displays an interactive tip related to the current algorithm
 */
const InteractiveTip = ({ algorithm }) => {
  // Interactive tips based on algorithm
  const getTip = () => {
    const tips = {
      bubble:
        "Try increasing the array size to see how bubble sort's performance degrades quadratically!",
      insertion:
        'Watch how insertion sort performs exceptionally well on nearly sorted arrays.',
      selection:
        'Notice how selection sort always takes the same time regardless of initial order.',
      quick:
        'Observe how the pivot selection affects the partitioning process.',
      merge:
        'See how merge sort divides the array into smaller subarrays recursively.',
      radix:
        'Watch how radix sort processes each digit position independently!',
      heap: 'Notice how heap sort builds a binary heap and repeatedly extracts the maximum element!',
      bucket:
        'Watch how bucket sort distributes elements into buckets and sorts them individually!',
    };
    return tips[algorithm];
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-lg border border-slate-700/50 group hover:bg-slate-800/80 transition-colors relative overflow-hidden">
      {/* Animated corner accent */}
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>

      {/* Animated bottom line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-amber-500/50 via-yellow-500/50 to-orange-500/50 rounded transition-all duration-700"></div>

      <div className="text-xs font-bold text-slate-300 mb-3 flex items-center relative">
        <Lightbulb className="mr-2 h-4 w-4 text-amber-400 animate-pulse" />
        <span className="tracking-widest relative">
          PRO TIP
          <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-amber-400/0 via-amber-400/70 to-amber-400/0"></span>
        </span>
      </div>
      <div className="text-xs text-amber-400 italic group-hover:text-amber-300 transition-colors relative">
        {getTip()}
      </div>
    </div>
  );
};

export default InteractiveTip;
