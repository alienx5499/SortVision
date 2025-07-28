import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Terminal } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * Algorithm Selector Component
 * 
 * A visually rich dropdown component for selecting different sorting algorithms.
 * Features:
 * - Animated background effects and transitions
 * - Visual representations of each algorithm
 * - Time complexity information
 * - Interactive hover states
 * - Accessibility support
 * 
 * The component includes:
 * - Main selector dropdown
 * - Algorithm badge with complexity info
 * - Visual icons for each algorithm
 * - Animated background effects
 */
const AlgorithmSelector = ({ algorithm, setAlgorithm, isSorting, audio }) => {
  const { t } = useTranslation();
  return (
    <div className="mb-4 relative group">
      {/* Animated background glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-slate-900 p-4 rounded border border-slate-800 transition-all duration-500 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 group/algo overflow-hidden h-full">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Animated grid pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:8px_8px] opacity-30"></div>
            
            {/* Floating particles */}
            <div className="absolute h-2 w-2 rounded-full bg-emerald-500/50 top-[10%] left-[20%] animate-pulse" style={{ animationDuration: '3s' }}></div>
            <div className="absolute h-1 w-1 rounded-full bg-blue-500/50 top-[30%] left-[70%] animate-pulse" style={{ animationDuration: '2.3s' }}></div>
            <div className="absolute h-1.5 w-1.5 rounded-full bg-purple-500/50 top-[70%] left-[30%] animate-pulse" style={{ animationDuration: '4s' }}></div>
            <div className="absolute h-1 w-1 rounded-full bg-cyan-500/50 top-[60%] left-[80%] animate-pulse" style={{ animationDuration: '3.5s' }}></div>
            
            {/* Animated code lines */}
            <div className="absolute top-[15%] left-0 h-px w-[30%] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent animate-[moveRight_15s_linear_infinite]"></div>
            <div className="absolute top-[45%] left-0 h-px w-[20%] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-[moveRight_12s_linear_infinite]"></div>
            <div className="absolute top-[75%] left-0 h-px w-[40%] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-[moveRight_18s_linear_infinite]"></div>
          </div>
        </div>
        
        {/* Animated corner accent */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full blur-md group-hover/algo:scale-150 transition-transform duration-700"></div>
        
        {/* Animated bottom line */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover/algo:w-full bg-gradient-to-r from-emerald-500/50 via-blue-500/50 to-purple-500/50 rounded transition-all duration-700"></div>
        
        <label className="font-mono text-sm text-slate-400 mb-3 block flex items-center relative z-10 group-hover/algo:text-emerald-400 transition-colors duration-300" id="algorithm-selector-label">
          <Terminal className="mr-2 h-4 w-4 text-emerald-400 animate-pulse" style={{ animationDuration: '4s' }} />
          <span className="transition-colors duration-300">{t('algorithms.selectLabel')}</span>
        </label>
        
        <div className="group/select relative overflow-hidden rounded-md mb-5">
          <Select 
            value={algorithm} 
            onValueChange={(value) => { setAlgorithm(value); audio.playAccessSound(); }} 
            disabled={isSorting}
            aria-labelledby="algorithm-selector-label"
          >
            <SelectTrigger className="w-full h-10 bg-slate-800/90 border-slate-700 text-emerald-400 font-mono relative overflow-hidden group/trigger shadow-lg shadow-emerald-500/5 hover:shadow-emerald-500/10 transition-all duration-300" aria-label="Select sorting algorithm">
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 w-0 group-hover/trigger:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-emerald-400/5 to-transparent"></div>
              <SelectValue placeholder="Algorithm" />
            </SelectTrigger>
            
            <SelectContent className="bg-slate-800/95 border-slate-700 text-emerald-400 font-mono shadow-xl shadow-purple-500/10 backdrop-blur-sm">
              <SelectItem value="bubble" className="hover:bg-slate-700/50 transition-all duration-200 flex items-center hover:scale-[1.02] group/item relative overflow-hidden">
                <div className="absolute inset-0 w-0 group-hover/item:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-red-400/5 to-transparent"></div>
                <div className="flex items-center relative z-10">
                  <div className="w-4 h-4 mr-2 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-1 h-1 bg-red-400 rounded-full animate-ping opacity-75"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                  </div>
                  {t('algorithms.bubble')}
                </div>
              </SelectItem>
              
              <SelectItem value="selection" className="hover:bg-slate-700/50 transition-all duration-200 flex items-center hover:scale-[1.02] group/item relative overflow-hidden">
                <div className="absolute inset-0 w-0 group-hover/item:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent"></div>
                <div className="flex items-center relative z-10">
                  <div className="w-4 h-4 mr-2 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 border border-amber-500 rounded-sm"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-sm"></div>
                    </div>
                  </div>
                  {t('algorithms.selection')}
                </div>
              </SelectItem>
              
              <SelectItem value="insertion" className="hover:bg-slate-700/50 transition-all duration-200 flex items-center hover:scale-[1.02] group/item relative overflow-hidden">
                <div className="absolute inset-0 w-0 group-hover/item:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-orange-400/5 to-transparent"></div>
                <div className="flex items-center relative z-10">
                  <div className="w-4 h-4 mr-2 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-1 bg-orange-500 rounded-sm"></div>
                    </div>
                  </div>
                  {t('algorithms.insertion')}
                </div>
              </SelectItem>
              
              <SelectItem value="bucket" className="hover:bg-slate-700/50 transition-all duration-200 flex items-center hover:scale-[1.02] group/item relative overflow-hidden">
                <div className="absolute inset-0 w-0 group-hover/item:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-pink-400/5 to-transparent"></div>
                <div className="flex items-center relative z-10">
                  <div className="w-4 h-4 mr-2 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-sm animate-pulse"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDuration: '1.5s' }}></div>
                    </div>
                  </div>
                  {t('algorithms.bucket')}
                </div>
              </SelectItem>
              
              <SelectItem value="radix" className="hover:bg-slate-700/50 transition-all duration-200 flex items-center hover:scale-[1.02] group/item relative overflow-hidden">
                <div className="absolute inset-0 w-0 group-hover/item:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent"></div>
                <div className="flex items-center relative z-10">
                  <div className="w-4 h-4 mr-2 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-sm animate-pulse"></div>
                    </div>
                  </div>
                  {t('algorithms.radix')}
                </div>
              </SelectItem>
              
              <SelectItem value="heap" className="hover:bg-slate-700/50 transition-all duration-200 flex items-center hover:scale-[1.02] group/item relative overflow-hidden">
                <div className="absolute inset-0 w-0 group-hover/item:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-indigo-400/5 to-transparent"></div>
                <div className="flex items-center relative z-10">
                  <div className="w-4 h-4 mr-2 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-sm animate-pulse"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 bg-indigo-400 rounded-sm animate-bounce" style={{ animationDuration: '2s' }}></div>
                    </div>
                  </div>
                  {t('algorithms.heap')}
                </div>
              </SelectItem>
              
              <SelectItem value="merge" className="hover:bg-slate-700/50 transition-all duration-200 flex items-center hover:scale-[1.02] group/item relative overflow-hidden">
                <div className="absolute inset-0 w-0 group-hover/item:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-blue-400/5 to-transparent"></div>
                <div className="flex items-center relative z-10">
                  <div className="w-4 h-4 mr-2 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-1.5 h-3 bg-blue-500 rounded-sm"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center pl-2">
                      <div className="w-1.5 h-3 bg-purple-500 rounded-sm"></div>
                    </div>
                  </div>
                  {t('algorithms.merge')}
                </div>
              </SelectItem>
              
              <SelectItem value="quick" className="hover:bg-slate-700/50 transition-all duration-200 flex items-center hover:scale-[1.02] group/item relative overflow-hidden">
                <div className="absolute inset-0 w-0 group-hover/item:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-green-400/5 to-transparent"></div>
                <div className="flex items-center relative z-10">
                  <div className="w-4 h-4 mr-2 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 border-r-2 border-t-2 border-green-500 rounded-tr-md animate-spin" style={{ animationDuration: '3s' }}></div>
                    </div>
                  </div>
                  {t('algorithms.quick')}
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Enhanced Algorithm Badge */}
        <AlgorithmBadge algorithm={algorithm} />
        
        {/* Visual representation of the algorithm */}
        <AlgorithmVisualization algorithm={algorithm} />
      </div>
    </div>
  );
};

// Algorithm Badge Component
const AlgorithmBadge = ({ algorithm }) => {
  return (
    <div className="mt-6 flex justify-center">
      <div className={`
        px-4 py-2 rounded-lg font-mono text-sm
        ${algorithm === 'bubble' ? 'bg-red-500/10 text-red-400 border border-red-500/20 shadow-lg shadow-red-500/10' : 
          algorithm === 'insertion' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-lg shadow-orange-500/10' : 
          algorithm === 'selection' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-lg shadow-amber-500/10' : 
          algorithm === 'quick' ? 'bg-green-500/10 text-green-400 border border-green-500/20 shadow-lg shadow-green-500/10' : 
          algorithm === 'merge' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/10' : 
          algorithm === 'radix' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-lg shadow-cyan-500/10' :
          algorithm === 'heap' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/10' :
          'bg-pink-500/10 text-pink-400 border border-pink-500/20 shadow-lg shadow-pink-500/10'}
        flex items-center gap-3 transform hover:scale-105 transition-all duration-300 relative overflow-hidden
      `}>
        {/* Animated background effect based on algorithm */}
        <div className={`absolute inset-0 opacity-20 ${
          algorithm === 'bubble' ? 'bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0' : 
          algorithm === 'insertion' ? 'bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0' : 
          algorithm === 'selection' ? 'bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0' : 
          algorithm === 'quick' ? 'bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0' : 
          algorithm === 'merge' ? 'bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0' : 
          algorithm === 'radix' ? 'bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0' :
          algorithm === 'heap' ? 'bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0' :
          'bg-gradient-to-r from-pink-500/0 via-pink-500/10 to-pink-500/0'
        } animate-pulse`} style={{ animationDuration: '3s' }}></div>
        
        {/* Algorithm icon */}
        <AlgorithmIcon algorithm={algorithm} />
        
        <div className="flex flex-col">
          <span className="font-bold">{algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort</span>
          <span className="text-xs opacity-70 mt-0.5">
            {algorithm === 'bubble' && "O(n²) - Simple exchange sort"}
            {algorithm === 'insertion' && "O(n²) - Builds sorted array"}
            {algorithm === 'selection' && "O(n²) - Finds minimum element"}
            {algorithm === 'quick' && "O(n log n) - Divide & conquer"}
            {algorithm === 'merge' && "O(n log n) - Divide & merge"}
            {algorithm === 'radix' && "O(nk) - Non-comparative sort"}
            {algorithm === 'heap' && "O(n log n) - Binary heap sort"}
            {algorithm === 'bucket' && "O(n+k) - Distribution sort"}
          </span>
        </div>
      </div>
    </div>
  );
};

// Algorithm Icon Component
const AlgorithmIcon = ({ algorithm }) => {
  if (algorithm === 'bubble') {
    return (
      <div className="relative h-6 w-6 flex items-center justify-center">
        <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping opacity-30" style={{ animationDuration: '2s' }}></div>
        <div className="absolute inset-0 bg-red-500/10 rounded-full animate-ping opacity-20" style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
        <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" style={{ animationDuration: '1.5s' }}></div>
        <div className="absolute w-1 h-1 bg-red-300 rounded-full top-0 right-0 animate-ping" style={{ animationDuration: '1s' }}></div>
      </div>
    );
  }
  
  if (algorithm === 'insertion') {
    return (
      <div className="relative h-6 w-6 flex items-center justify-center">
        <div className="w-4 h-1.5 bg-orange-400 rounded-sm"></div>
        <div className="absolute w-1.5 h-4 bg-orange-400/30 rounded-sm right-1 animate-bounce" style={{ animationDuration: '2s' }}></div>
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
        <div className="absolute inset-0 m-auto w-2 h-2 bg-amber-400 rounded-sm animate-pulse" style={{ animationDuration: '1.5s' }}></div>
      </div>
    );
  }
  
  if (algorithm === 'quick') {
    return (
      <div className="relative h-6 w-6 flex items-center justify-center">
        <div className="w-4 h-4 border-r-2 border-t-2 border-green-400 rounded-tr-md animate-spin" style={{ animationDuration: '3s' }}></div>
        <div className="absolute inset-0 w-2 h-2 bg-green-400/20 rounded-full m-auto animate-ping" style={{ animationDuration: '1.5s' }}></div>
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
        <div className="absolute inset-0 m-auto w-2 h-2 bg-indigo-400 rounded-sm animate-pulse" style={{ animationDuration: '1.5s' }}></div>
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
        <div className="absolute inset-0 m-auto w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDuration: '1.5s' }}></div>
      </div>
    );
  }
  
  // Default (radix)
  return (
    <div className="relative h-6 w-6 flex items-center justify-center">
      <div className="w-4 h-4 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-sm animate-pulse"></div>
      <div className="absolute inset-0 bg-cyan-500/20 rounded-sm animate-ping opacity-30" style={{ animationDuration: '3s' }}></div>
    </div>
  );
};

// Algorithm Visualization Component
const AlgorithmVisualization = ({ algorithm }) => {
  const { t } = useTranslation();
  return (
    <div className="mt-4 flex justify-center h-16 relative">
      {algorithm === 'bubble' && (
        <div className="flex items-end space-x-1 relative">
          {/* Background grid effect */}
          <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:8px_8px] opacity-20"></div>
          
          {/* Animated bars */}
          {[4, 2, 6, 1, 5, 3].map((height, i) => (
            <div 
              key={i} 
              className="w-3 bg-gradient-to-t from-red-600 to-red-400 rounded-t transition-all duration-300 relative group"
              style={{ 
                height: `${height * 6}px`
              }}
            >
              {/* Bar highlight effect */}
              <div className="absolute inset-x-0 top-0 h-1 bg-white/30 rounded-t"></div>
              
              {/* Bar value */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-[8px] text-red-300 opacity-0 group-hover:opacity-100 transition-opacity">
                {height}
              </div>
            </div>
          ))}
          
          {/* Animated comparison indicator */}
          <div className="absolute top-0 left-0 w-full">
            <div 
              className="absolute h-full border-l-2 border-r-2 border-red-400/50 rounded w-8 transition-all duration-300 bg-red-500/5"
              style={{ 
                left: '0%',
                animation: 'bubbleCompare 3s ease-in-out infinite'
              }}
            >
              {/* Comparison text */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-[8px] text-red-300">
                {t('decorations.compare')}
              </div>
              
              {/* Swap arrows */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-400/70">
                ⇄
              </div>
            </div>
          </div>
          
          {/* Algorithm step counter */}
          <div className="absolute -bottom-4 right-0 text-[8px] text-slate-400 font-mono">
            step: <span className="text-red-400">n²</span>
          </div>
        </div>
      )}
      
      {/* Other algorithm visualizations */}
      {algorithm === 'insertion' && (
        <div className="flex items-end space-x-1">
          {[1, 2, 3, 6, 5, 4].map((height, i) => (
            <div 
              key={i} 
              className={`w-3 rounded-t transition-all duration-300 ${i < 3 ? 'bg-gradient-to-t from-orange-600 to-orange-400' : 'bg-gradient-to-t from-slate-600 to-slate-400'}`}
              style={{ height: `${height * 6}px` }}
            ></div>
          ))}
          <div className="absolute top-0 left-0 w-full">
            <div className="w-3 h-6 border-2 border-orange-400/50 rounded-t absolute animate-[moveRight_3s_ease-in-out_infinite]" style={{ left: '50%' }}></div>
          </div>
        </div>
      )}
      
      {/* More algorithm visualizations */}
      {algorithm === 'selection' && (
        <div className="flex items-end space-x-1 relative">
          {[1, 4, 3, 6, 2, 5].map((height, i) => (
            <div 
              key={i} 
              className={`w-3 rounded-t transition-all duration-300 ${i === 0 ? 'bg-gradient-to-t from-amber-600 to-amber-400' : 'bg-gradient-to-t from-slate-600 to-slate-400'}`}
              style={{ height: `${height * 6}px` }}
            ></div>
          ))}
          {/* Animated selection indicator */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div 
              className="absolute w-3 h-3 border-2 border-amber-400 rounded-full bg-amber-400/20"
              style={{ 
                animation: 'selectionSearch 4s ease-in-out infinite',
                top: '30%'
              }}
            ></div>
            <div className="absolute bottom-0 left-0 h-1 bg-amber-400/30 w-full"></div>
          </div>
        </div>
      )}
      
      {algorithm === 'quick' && (
        <div className="flex items-end space-x-1">
          {[2, 1, 3, 5, 6, 4].map((height, i) => (
            <div 
              key={i} 
              className={`w-3 rounded-t transition-all duration-300 ${i === 3 ? 'bg-gradient-to-t from-green-600 to-green-400' : 'bg-gradient-to-t from-slate-600 to-slate-400'}`}
              style={{ height: `${height * 6}px` }}
            ></div>
          ))}
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="w-[80%] border-t-2 border-dashed border-green-400/50"></div>
          </div>
        </div>
      )}
      
      {algorithm === 'merge' && (
        <div className="flex items-end space-x-1">
          {[1, 3, 2, 5, 4, 6].map((height, i) => (
            <div 
              key={i} 
              className={`w-3 rounded-t transition-all duration-300 ${i < 3 ? 'bg-gradient-to-t from-blue-600 to-blue-400' : 'bg-gradient-to-t from-purple-600 to-purple-400'}`}
              style={{ height: `${height * 6}px` }}
            ></div>
          ))}
          <div className="absolute top-0 left-0 w-full h-full flex items-center">
            <div className="w-[50%] border-r-2 border-blue-400/50 h-full"></div>
          </div>
        </div>
      )}
      
      {algorithm === 'radix' && (
        <div className="flex items-end space-x-1 relative">
          {/* Animated bars */}
          {[12, 24, 35, 41, 53, 60].map((height, i) => (
            <div 
              key={i} 
              className="w-3 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t transition-all duration-300 relative"
              style={{ 
                height: `${(height/10) * 6}px`,
                animationDelay: `${i * 0.2}s`
              }}
            >
              {/* Digit indicator */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-[8px] text-cyan-300 font-mono tracking-tight whitespace-nowrap">
                {Math.floor(height/10)}
              </div>
            </div>
          ))}
          
          {/* Sorting indicator */}
          <div className="absolute top-0 left-0 w-full">
            <div 
              className="absolute h-full border-l border-r border-cyan-400/30 rounded w-8 transition-all duration-300"
              style={{ 
                left: '0%',
                animation: 'radixSort 3s ease-in-out infinite'
              }}
            >
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-[8px] text-cyan-300 font-mono whitespace-nowrap">
                {t('decorations.radix')}
              </div>
            </div>
          </div>
        </div>
      )}

      {algorithm === 'heap' && (
        <div className="flex items-end space-x-1 relative">
          {/* Animated bars */}
          {[4, 2, 6, 1, 5, 3].map((height, i) => (
            <div 
              key={i} 
              className="w-3 bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t transition-all duration-300 relative"
              style={{ 
                height: `${height * 6}px`
              }}
            >
              {/* Node value */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-[8px] text-indigo-300 font-mono tracking-tight whitespace-nowrap">
                {height}
              </div>
            </div>
          ))}
          
          {/* Tree connections */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-2 left-[25%] w-[50%] h-0.5 bg-indigo-400/30"></div>
            <div className="absolute top-2 left-[12.5%] w-[25%] h-0.5 bg-indigo-400/30"></div>
            <div className="absolute top-2 left-[62.5%] w-[25%] h-0.5 bg-indigo-400/30"></div>
          </div>
          
          {/* Heapify indicator */}
          <div className="absolute top-0 left-0 w-full">
            <div 
              className="absolute h-full border-l border-r border-indigo-400/30 rounded w-8 transition-all duration-300"
              style={{ 
                left: '0%',
                animation: 'heapify 3s ease-in-out infinite'
              }}
            >
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-[8px] text-indigo-300 font-mono whitespace-nowrap">
                {t('decorations.heapify')}
              </div>
            </div>
          </div>
        </div>
      )}

      {algorithm === 'bucket' && (
        <div className="flex items-end space-x-1 relative h-24">
          {/* Bucket containers */}
          <div className="absolute top-0 left-0 w-full h-full flex space-x-1">
            {[0, 1, 2].map((bucket, i) => (
              <div 
                key={i}
                className="w-1/3 h-full border border-pink-400/30 rounded-t overflow-hidden relative"
              >
                {/* Bucket fill */}
                <div 
                  className="absolute bottom-0 left-0 w-full bg-pink-400/20"
                  style={{ height: `${(i + 1) * 30}%` }}
                ></div>
              </div>
            ))}
          </div>
          
          {/* Elements being distributed */}
          <div className="relative flex items-end space-x-1 z-10">
            {[2, 4, 1, 5, 6].map((height, i) => (
              <div 
                key={i} 
                className="w-3 bg-gradient-to-t from-pink-600 to-pink-400 rounded-t transition-all duration-300 relative"
                style={{ 
                  height: `${height * 8}px`,
                  animation: `distribute ${2 + i * 0.2}s ease-in-out infinite`
                }}
              >
                {/* Element value */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-[8px] text-pink-300 font-mono tracking-tight whitespace-nowrap">
                  {height}
                </div>
              </div>
            ))}
          </div>
          
          {/* Distribution indicator */}
          <div className="absolute top-0 left-0 w-full">
            <div 
              className="absolute h-full border-l border-r border-pink-400/30 rounded w-8 transition-all duration-300"
              style={{ 
                left: '0%',
                animation: 'distributeIndicator 3s ease-in-out infinite'
              }}
            >
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-[8px] text-pink-300 font-mono whitespace-nowrap">
                {t('decorations.distribute')}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlgorithmSelector; 