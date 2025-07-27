import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Database } from 'lucide-react';
import { useTranslation } from 'react-i18next';
/**
 * Array Size Control Component
 * 
 * A sophisticated slider component for controlling array size with:
 * - Visual feedback and animations
 * - Precise control over array length
 * - Quick adjustment buttons
 * - Status indicators
 * - Accessibility features
 * 
 * Features:
 * - Range: 10 to 200 elements
 * - Visual size representation
 * - Animated background effects
 * - Size presets (Small/Medium/Large)
 * - ±10 quick adjustment buttons
 * - Usage recommendations based on size
 */

const ArraySizeControl = ({ arraySize, setArraySize, isSorting }) => {
  const { t } = useTranslation();
  return (
    <div className="mb-4 relative group">
      {/* Animated background glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-slate-900 p-4 rounded border border-slate-800 transition-all duration-500 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 group/array overflow-hidden h-full">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Animated grid pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:8px_8px] opacity-30"></div>
            
            {/* Floating particles */}
            <div className="absolute h-2 w-2 rounded-full bg-blue-500/50 top-[10%] left-[20%] animate-pulse" style={{ animationDuration: '3s' }}></div>
            <div className="absolute h-1 w-1 rounded-full bg-blue-500/50 top-[30%] left-[70%] animate-pulse" style={{ animationDuration: '2.3s' }}></div>
            <div className="absolute h-1.5 w-1.5 rounded-full bg-blue-500/50 top-[70%] left-[30%] animate-pulse" style={{ animationDuration: '4s' }}></div>
            
            {/* Animated code lines */}
            <div className="absolute top-[15%] left-0 h-px w-[30%] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-[moveRight_15s_linear_infinite]"></div>
            <div className="absolute top-[45%] left-0 h-px w-[20%] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-[moveRight_12s_linear_infinite]"></div>
            <div className="absolute top-[75%] left-0 h-px w-[40%] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-[moveRight_18s_linear_infinite]"></div>
          </div>
        </div>
        
        {/* Animated corner accent */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 rounded-full blur-md group-hover/array:scale-150 transition-transform duration-700"></div>
        
        {/* Animated bottom line */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover/array:w-full bg-gradient-to-r from-emerald-500/50 via-blue-500/50 to-purple-500/50 rounded transition-all duration-700"></div>
        
        <label className="font-mono text-sm text-slate-400 mb-2 block flex items-center relative z-10 group-hover/array:text-blue-400 transition-colors duration-300" id="array-size-label">
          <Database className="mr-2 h-4 w-4 text-blue-400 animate-pulse" style={{ animationDuration: '4s' }} />
          <span className="transition-colors duration-300">// array size: <span className="text-blue-400 ml-1">{arraySize}</span></span>
        </label>
        
        <div className="relative mt-6 mb-8">
          <div className="absolute -top-4 left-0 right-0 flex justify-between text-[10px] text-slate-500">
            <span className="text-blue-300 group-hover/array:text-blue-300 transition-colors duration-300">Small</span>
            <span className="text-blue-300 group-hover/array:text-blue-300 transition-colors duration-300">Medium</span>
            <span className="text-blue-300 group-hover/array:text-blue-300 transition-colors duration-300">Large</span>
          </div>
          <div className="relative">
            {/* Track background with enhanced glow */}
            <div className="absolute inset-0 bg-blue-400/5 rounded-full group-hover/array:bg-blue-400/10 transition-all duration-300"></div>
            {/* Active track with optimized performance */}
            <div className="absolute h-full bg-blue-400/20 rounded-full overflow-hidden origin-left"
              style={{ 
                transform: `scaleX(${((arraySize - 10) / (200 - 10))})`,
                transition: 'transform 0.1s ease-out'
              }}
            >
              <div className="absolute inset-0 w-0 group-hover/array:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"></div>
            </div>
            <Slider
              value={[arraySize]}
              min={10}
              max={200}
              step={1}
              onValueChange={(value) => setArraySize(value[0])}
              disabled={isSorting}
              className="relative z-10"
              name="array size"
              aria-label="Array Size Slider"
              aria-labelledby="array-size-label"
            />
            {/* Animated glow effect */}
            <div className="absolute inset-0 bg-blue-400/10 rounded-full animate-pulse"></div>
          </div>
          <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] text-slate-500">
            <span className="group-hover/array:text-blue-300 text-blue-300 transition-colors duration-300">10</span>
            <span className="group-hover/array:text-blue-300 text-blue-300 transition-colors duration-300">100</span>
            <span className="group-hover/array:text-blue-300 text-blue-300 transition-colors duration-300">200</span>
          </div>
        </div>
        
        {/* Array Size Control Status Bar */}
        <div className="flex justify-between items-center mt-2 text-xs text-slate-400">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-400/30 rounded-sm mr-1 animate-pulse"></div>
            <span className="text-blue-400">Elements: {arraySize}</span>
          </div>
          
          {/* Size adjustment buttons */}
          <div className="flex space-x-1">
            <button
              onClick={() => !isSorting && arraySize > 10 && setArraySize(arraySize - 10)}
              disabled={isSorting || arraySize <= 10}
              className="group/btn relative w-8 h-8 rounded-md bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-all duration-300 overflow-hidden"
              aria-label="Decrease array size by 10"
            >
              <div className="absolute inset-0 bg-blue-400/10 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 flex items-center justify-center text-blue-400 font-mono text-[10px]">-10</div>
              <div className="absolute bottom-0 left-0 h-0.5 bg-blue-400/50 w-0 group-hover/btn:w-full transition-all duration-300"></div>
            </button>
            <button
              onClick={() => {
                if (!isSorting && arraySize < 200) {
                  const newSize = Math.min(200, arraySize + 10);
                  setArraySize(newSize);
                }
              }}
              disabled={isSorting || arraySize >= 200}
              className="group/btn relative w-8 h-8 rounded-md bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-all duration-300 overflow-hidden"
              aria-label="Increase array size by 10"
            >
              <div className="absolute inset-0 bg-blue-400/10 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 flex items-center justify-center text-blue-400 font-mono text-[10px]">+10</div>
              <div className="absolute bottom-0 left-0 h-0.5 bg-blue-400/50 w-0 group-hover/btn:w-full transition-all duration-300"></div>
            </button>
          </div>

          <div className="text-[10px] text-blue-300 group-hover/array:text-blue-300 transition-colors duration-300">
            {arraySize < 50 ? "Good for learning" : arraySize < 100 ? "Balanced" : "Performance test"}
          </div>
        </div>
        
        {/* Visual bar representation with optimized performance */}
        <div className="mt-4 h-8 bg-slate-800/80 rounded-lg border border-slate-700 overflow-hidden relative group/bar">
          <div 
            className="h-full bg-gradient-to-r from-blue-500/20 to-blue-400/20 relative overflow-hidden origin-left"
            style={{ 
              transform: `scaleX(${((arraySize - 10) / (200 - 10))})`,
              transition: 'transform 0.05s ease-out'
            }}
          >
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 w-0 group-hover/array:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent"></div>
            <div className="absolute inset-y-0 right-0 w-1 bg-blue-400/30"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-[10px] text-blue-400/70 font-mono group-hover/array:text-blue-400 transition-colors duration-300">
            {arraySize}  {t('array.sizeUnit')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArraySizeControl; 