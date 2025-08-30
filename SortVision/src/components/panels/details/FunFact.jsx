import React from 'react';
import { Zap } from 'lucide-react';

/**
 * FunFact Component
 *
 * Displays a fun fact about the current algorithm
 */
const FunFact = ({ algorithm }) => {
  return (
    <div className="mt-4 bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-lg border border-slate-700/50 group hover:bg-slate-800/80 transition-colors relative overflow-hidden">
      {/* Animated corner accent */}
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>

      {/* Animated bottom line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-yellow-500/50 via-orange-500/50 to-red-500/50 rounded transition-all duration-700"></div>

      <div className="text-xs font-bold text-slate-300 mb-3 flex items-center relative">
        <Zap className="mr-2 h-4 w-4 text-yellow-400 group-hover:animate-bounce" />
        <span className="tracking-widest relative">
          FUN FACT
          <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-yellow-400/0 via-yellow-400/70 to-yellow-400/0"></span>
        </span>
      </div>
      <div className="text-xs text-yellow-400 italic group-hover:text-yellow-300 transition-colors relative">
        {algorithm === 'bubble' &&
          "Bubble Sort is named for the way smaller elements 'bubble' to the top of the list through exchanges."}
        {algorithm === 'insertion' &&
          'Insertion Sort is similar to how many people sort playing cards in their hands.'}
        {algorithm === 'selection' &&
          'Selection Sort makes the minimum number of swaps possible (n-1 in the worst case).'}
        {algorithm === 'quick' &&
          'Quick Sort was developed by Tony Hoare in 1959 while he was an exchange student at Moscow State University.'}
        {algorithm === 'merge' &&
          'Merge Sort was invented by John von Neumann in 1945, one of the earliest divide-and-conquer algorithms described.'}
        {algorithm === 'radix' &&
          'Radix Sort predates modern computers and was used with punch card sorting machines in the early 20th century.'}
        {algorithm === 'heap' &&
          'Heap Sort was invented by J. W. J. Williams in 1964 and is the basis for many priority queue implementations.'}
        {algorithm === 'bucket' &&
          'Bucket Sort is particularly efficient when the input is uniformly distributed across a range.'}
      </div>
    </div>
  );
};

export default FunFact;
