/**
 * Complexity Info Component
 * 
 * A detailed information panel displaying algorithm complexity metrics:
 * - Time complexity (Best/Average/Worst cases)
 * - Space complexity
 * - Efficiency rating
 * - Algorithm description
 * 
 * Features:
 * - Visual efficiency indicators
 * - Animated complexity cards
 * - Interactive hover effects
 * - Color-coded complexity ratings
 * - Detailed algorithm descriptions
 * - Responsive design
 */
import React from 'react';
import { Info, Database, Timer, Rocket, Clock, Hourglass, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ComplexityInfo = ({ getAlgorithmTimeComplexity }) => {
  const { t } = useTranslation();
  return (
    <div className="mb-4 relative">
      {/* Animated background glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-slate-900 p-4 rounded border border-slate-800 transition-all duration-500 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 group overflow-hidden">
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
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
        
        {/* Animated bottom line */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-emerald-500/50 via-blue-500/50 to-purple-500/50 rounded transition-all duration-700"></div>
        
        <label className="font-mono text-sm text-slate-400 mb-2 flex items-center group/label cursor-pointer relative z-10">
          <Info className="mr-2 h-4 w-4 text-emerald-400 animate-pulse" style={{ animationDuration: '4s' }} />
          <span className="transition-colors duration-300 group-hover:text-emerald-400">//{t('complexity.algorithmComplexity')}</span>
        </label>
      
        {/* Efficiency indicator */}
        <div className="mb-3 bg-slate-800/80 p-2 rounded border border-slate-700 transition-all duration-300 hover:border-slate-600 hover:bg-slate-800/60 relative overflow-hidden group/eff">
          {/* Shimmer effect on hover */}
          <div className="absolute inset-0 w-0 group-hover/eff:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-slate-400/5 to-transparent"></div>
          
          <div className="text-xs text-slate-400 mb-1 transition-colors duration-300 group-hover:text-slate-300">{t('complexity.efficiencyRating')}</div>
          <div className="flex items-center">
            <div className={`font-bold text-sm flex items-center transition-all duration-300 hover:scale-105 ${
              getAlgorithmTimeComplexity().color === "red" ? "text-red-500 hover:text-red-400" : 
              getAlgorithmTimeComplexity().color === "orange" ? "text-orange-500 hover:text-orange-400" : 
              getAlgorithmTimeComplexity().color === "yellow" ? "text-yellow-500 hover:text-yellow-400" : 
              getAlgorithmTimeComplexity().color === "blue" ? "text-blue-500 hover:text-blue-400" : 
              getAlgorithmTimeComplexity().color === "indigo" ? "text-green-500 hover:text-green-400" :
              getAlgorithmTimeComplexity().color === "pink" ? "text-pink-500 hover:text-pink-400" :
              "text-green-500 hover:text-green-400"
            }`}>
              {getAlgorithmTimeComplexity().efficiency === "high" && (
                <div className="relative mr-2">
                  <div className="absolute inset-0 opacity-30">
                    <Rocket className="h-4 w-4 text-green-500 animate-ping" style={{ animationDuration: '3s' }} />
                  </div>
                  <Rocket className="h-4 w-4 transition-transform duration-300 hover:rotate-12" />
                </div>
              )}
              {getAlgorithmTimeComplexity().efficiency === "medium-high" && (
                <div className="relative mr-2">
                  <div className="absolute inset-0 opacity-30">
                    <CheckCircle2 className="h-4 w-4 text-blue-500 animate-pulse" style={{ animationDuration: '3s' }} />
                  </div>
                  <CheckCircle2 className="h-4 w-4 transition-transform duration-300 hover:scale-110" />
                </div>
              )}
              {getAlgorithmTimeComplexity().efficiency === "medium" && (
                <div className="relative mr-2">
                  <div className="absolute inset-0 opacity-30">
                    <Clock className="h-4 w-4 text-yellow-500 animate-pulse" style={{ animationDuration: '3s' }} />
                  </div>
                  <Clock className="h-4 w-4 transition-transform duration-300 hover:rotate-45" />
                </div>
              )}
              {getAlgorithmTimeComplexity().efficiency === "medium-low" && (
                <div className="relative mr-2">
                  <div className="absolute inset-0 opacity-30">
                    <Hourglass className="h-4 w-4 text-orange-500 animate-pulse" style={{ animationDuration: '3s' }} />
                  </div>
                  <Hourglass className="h-4 w-4 transition-transform duration-300 hover:rotate-180" />
                </div>
              )}
              {getAlgorithmTimeComplexity().efficiency === "low" && (
                <div className="relative mr-2">
                  <div className="absolute inset-0 opacity-30">
                    <AlertTriangle className="h-4 w-4 text-red-500 animate-pulse" style={{ animationDuration: '3s' }} />
                  </div>
                  <AlertTriangle className="h-4 w-4 transition-transform duration-300 hover:scale-110" />
                </div>
              )}
              {getAlgorithmTimeComplexity().efficiency.charAt(0).toUpperCase() + getAlgorithmTimeComplexity().efficiency.slice(1)}
            </div>
            <div className="ml-auto">
              <div className="flex space-x-1">
                <div className={`h-2 w-2 rounded-full transition-all duration-300 hover:scale-125 ${getAlgorithmTimeComplexity().efficiency === "low" || getAlgorithmTimeComplexity().efficiency === "medium-low" || getAlgorithmTimeComplexity().efficiency === "medium" || getAlgorithmTimeComplexity().efficiency === "medium-high" || getAlgorithmTimeComplexity().efficiency === "high" ? 'bg-red-500 hover:bg-red-400' : 'bg-slate-700'}`}></div>
                <div className={`h-2 w-2 rounded-full transition-all duration-300 hover:scale-125 ${getAlgorithmTimeComplexity().efficiency === "medium-low" || getAlgorithmTimeComplexity().efficiency === "medium" || getAlgorithmTimeComplexity().efficiency === "medium-high" || getAlgorithmTimeComplexity().efficiency === "high" ? 'bg-orange-500 hover:bg-orange-400' : 'bg-slate-700'}`}></div>
                <div className={`h-2 w-2 rounded-full transition-all duration-300 hover:scale-125 ${getAlgorithmTimeComplexity().efficiency === "medium" || getAlgorithmTimeComplexity().efficiency === "medium-high" || getAlgorithmTimeComplexity().efficiency === "high" ? 'bg-yellow-500 hover:bg-yellow-400' : 'bg-slate-700'}`}></div>
                <div className={`h-2 w-2 rounded-full transition-all duration-300 hover:scale-125 ${getAlgorithmTimeComplexity().efficiency === "medium-high" || getAlgorithmTimeComplexity().efficiency === "high" ? 'bg-blue-500 hover:bg-blue-400' : 'bg-slate-700'}`}></div>
                <div className={`h-2 w-2 rounded-full transition-all duration-300 hover:scale-125 ${getAlgorithmTimeComplexity().efficiency === "high" ? 'bg-green-500 hover:bg-green-400' : 'bg-slate-700'}`}></div>
              </div>
            </div>
          </div>
        </div>
      
        {/* Time complexity */}
        <div className="mb-3">
          <div className="text-xs text-slate-400 mb-1 flex items-center group/time">
            <Timer className="mr-1 h-3 w-3 text-yellow-400 animate-pulse" style={{ animationDuration: '3s' }} />
            <span className="transition-colors duration-300 group-hover:text-yellow-400">{t('complexity.timeComplexity')}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-slate-800/80 p-2 rounded border border-slate-700 transition-all duration-300 hover:border-green-500/30 hover:bg-slate-800/60 group/best relative overflow-hidden">
              {/* Background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-hover/best:opacity-100 transition-opacity duration-500"></div>
              
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 w-0 group-hover/best:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-green-400/5 to-transparent"></div>
              
              <div className="text-[10px] text-slate-500 mb-1 transition-colors duration-300 group-hover:text-slate-400"> {t('complexity.bestcase')}</div>
              <div className="flex items-center">
                <div className="relative mr-1">
                  <div className="absolute inset-0 opacity-20">
                    <Clock className="h-3 w-3 text-green-500 animate-ping" style={{ animationDuration: '3s' }} />
                  </div>
                  <Clock className="h-3 w-3 text-green-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45" />
                </div>
                <span className="text-green-500 font-mono text-xs transition-all duration-300 group-hover:text-green-400 group-hover:scale-105">{getAlgorithmTimeComplexity().best}</span>
              </div>
            </div>
            <div className="bg-slate-800/80 p-2 rounded border border-slate-700 transition-all duration-300 hover:border-yellow-500/30 hover:bg-slate-800/60 group/avg relative overflow-hidden">
              {/* Background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/5 to-yellow-500/0 opacity-0 group-hover/avg:opacity-100 transition-opacity duration-500"></div>
              
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 w-0 group-hover/avg:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent"></div>
              
              <div className="text-[10px] text-slate-500 mb-1 transition-colors duration-300 group-hover:text-slate-400"> {t('complexity.average')}</div>
              <div className="flex items-center">
                <div className="relative mr-1">
                  <div className="absolute inset-0 opacity-20">
                    <Clock className="h-3 w-3 text-yellow-500 animate-ping" style={{ animationDuration: '3s' }} />
                  </div>
                  <Clock className="h-3 w-3 text-yellow-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45" />
                </div>
                <span className="text-yellow-500 font-mono text-xs transition-all duration-300 group-hover:text-yellow-400 group-hover:scale-105">{getAlgorithmTimeComplexity().average}</span>
              </div>
            </div>
            <div className="bg-slate-800/80 p-2 rounded border border-slate-700 transition-all duration-300 hover:border-red-500/30 hover:bg-slate-800/60 group/worst relative overflow-hidden">
              {/* Background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover/worst:opacity-100 transition-opacity duration-500"></div>
              
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 w-0 group-hover/worst:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-red-400/5 to-transparent"></div>
              
              <div className="text-[10px] text-slate-500 mb-1 transition-colors duration-300 group-hover:text-slate-400">{t('complexity.worstCase')}</div>
              <div className="flex items-center">
                <div className="relative mr-1">
                  <div className="absolute inset-0 opacity-20">
                    <Hourglass className="h-3 w-3 text-red-500 animate-ping" style={{ animationDuration: '3s' }} />
                  </div>
                  <Hourglass className="h-3 w-3 text-red-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-180" />
                </div>
                <span className="text-red-500 font-mono text-xs transition-all duration-300 group-hover:text-red-400 group-hover:scale-105">{getAlgorithmTimeComplexity().worst}</span>
              </div>
            </div>
          </div>
        </div>
      
        {/* Space complexity */}
        <div className="mb-3">
          <div className="text-xs text-slate-400 mb-1 flex items-center group/space">
            <Database className="mr-1 h-3 w-3 text-blue-400 animate-pulse" style={{ animationDuration: '3s' }} />
            <span className="transition-colors duration-300 group-hover:text-blue-400">{t('complexity.spaceComplexity')}</span>
          </div>
          <div className="bg-slate-800/80 p-2 rounded border border-slate-700 transition-all duration-300 hover:border-blue-500/30 hover:bg-slate-800/60 group/space relative overflow-hidden">
            {/* Background animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover/space:opacity-100 transition-opacity duration-500"></div>
            
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 w-0 group-hover/space:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-blue-400/5 to-transparent"></div>
            
            {/* Binary pattern background */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
              <div className="absolute top-[20%] left-[10%] text-[8px] text-blue-500/20 font-mono">10101</div>
              <div className="absolute top-[50%] left-[60%] text-[8px] text-blue-500/20 font-mono">01010</div>
              <div className="absolute top-[70%] left-[30%] text-[8px] text-blue-500/20 font-mono">11001</div>
            </div>
            
            <span className="text-blue-400 font-mono text-xs transition-all duration-300 group-hover:text-blue-300 group-hover:scale-105 relative z-10">{getAlgorithmTimeComplexity().space}</span>
          </div>
        </div>
      
        {/* Description */}
        <div className="text-[10px] text-slate-400 italic border-t border-slate-800 pt-2 mt-2 transition-all duration-300 hover:text-slate-300 group/desc relative">
          {/* Animation for description hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-800/0 via-slate-700/5 to-slate-800/0 opacity-0 group-hover/desc:opacity-100 transition-opacity duration-500 -z-10"></div>
          
          <span className="text-emerald-400 mr-1 opacity-80">// </span>
          <span className="relative inline-block">
            {getAlgorithmTimeComplexity().description}
            <span className="absolute bottom-0 left-0 w-0 group-hover/desc:w-full h-px bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 to-emerald-500/0 transition-all duration-1000"></span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ComplexityInfo; 