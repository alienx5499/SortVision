import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  RefreshCw, 
  BarChart2, 
  Zap, 
  Beaker, 
  StopCircle, 
  Crown, 
  TrendingUp, 
  TrendingDown, 
  Percent, 
  Clock, 
  Award, 
  Cpu, 
  BarChart, 
  ArrowUpDown,
  Maximize2,
  Minimize2,
  Terminal
} from 'lucide-react';
import ArrayVisualization from './ArrayVisualization';

/**
 * MetricsPanel Component
 * 
 * Displays performance metrics for sorting algorithms:
 * - Current run metrics (swaps, comparisons, time)
 * - Efficiency ratios and performance indicators
 * - Algorithm comparison with rankings
 * - Test all algorithms functionality
 * - Performance visualization
 */
const MetricsPanel = ({ 
  metrics, 
  sortedMetrics, 
  isSorting, 
  currentTestingAlgo, 
  testAllAlgorithms, 
  stopSorting,
  algorithm,
  array,
  currentBar,
  isStopped
}) => {
  // Calculate efficiency ratios
  const swapRatio = metrics.comparisons > 0 ? (metrics.swaps / metrics.comparisons).toFixed(2) : 0;
  const timePerElement = array.length > 0 ? (metrics.time / array.length).toFixed(2) : 0;
  const operationsPerMs = metrics.time > 0 ? ((metrics.swaps + metrics.comparisons) / metrics.time).toFixed(2) : 0;
  
  // Calculate performance score (lower is better)
  const performanceScore = metrics.time > 0 ? 
    Math.round((metrics.swaps * 0.3 + metrics.comparisons * 0.3 + parseFloat(metrics.time) * 0.4)) : 0;
  
  // Get the best algorithm if available
  const bestAlgorithm = sortedMetrics.length > 0 ? sortedMetrics[0] : null;
  
  // Calculate improvement percentage if there's a best algorithm
  const improvementPercent = bestAlgorithm && metrics.time > 0 && algorithm !== bestAlgorithm.algo ?
    Math.round((metrics.time - parseFloat(bestAlgorithm.metrics.time)) / metrics.time * 100) : 0;
  
  // Find the current algorithm's metrics in sortedMetrics
  const currentAlgoMetrics = sortedMetrics.find(item => item.algo === algorithm)?.metrics;
  
  return (
    <div className="space-y-6">
      {/* Current Run Metrics */}
      <div className="bg-slate-900 p-4 rounded border border-slate-800 relative overflow-hidden group">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 animate-[gradient_8s_ease_infinite] bg-[length:200%_100%]"></div>
        
        {/* Animated corner accent */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
        
        {/* Animated bottom line */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-emerald-500/50 via-blue-500/50 to-purple-500/50 rounded transition-all duration-700"></div>
        
        <div className="font-mono text-sm text-slate-400 mb-4 flex items-center justify-between relative z-10">
          <div className="flex items-center group cursor-pointer hover:text-emerald-400 transition-colors">
            <Terminal className="mr-2 h-4 w-4 text-emerald-400 group-hover:animate-spin" />
            // current run metrics
          </div>
          <Badge variant="outline" className="bg-slate-800/50 text-emerald-400 font-mono border-emerald-500/30 group-hover:bg-slate-800 transition-all duration-300">
            {algorithm}_sort()
          </Badge>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-slate-800 p-3 rounded border border-slate-700 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-emerald-500/10 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Animated corner accent */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
            
            {/* Animated bottom line */}
            <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-emerald-500/50 via-teal-500/50 to-emerald-500/50 rounded transition-all duration-700"></div>
            
            <div className="text-xs text-slate-400 mb-1 flex items-center group-hover:text-slate-300 transition-colors duration-300 relative z-10">
              <ArrowUpDown className="mr-1 h-3 w-3 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" /> SWAPS
            </div>
            <div className="text-xl text-emerald-400 font-mono group-hover:text-emerald-300 transition-colors duration-300 relative z-10">{metrics.swaps}</div>
            <div className="text-[10px] text-slate-500 mt-1 group-hover:text-slate-400 transition-colors duration-300 relative z-10">Memory operations</div>
          </div>
          
          <div className="bg-slate-800 p-3 rounded border border-slate-700 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-blue-500/10 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Animated corner accent */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
            
            {/* Animated bottom line */}
            <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-500/50 via-cyan-500/50 to-blue-500/50 rounded transition-all duration-700"></div>
            
            <div className="text-xs text-slate-400 mb-1 flex items-center group-hover:text-slate-300 transition-colors duration-300 relative z-10">
              <BarChart2 className="mr-1 h-3 w-3 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" /> COMPARISONS
            </div>
            <div className="text-xl text-blue-400 font-mono group-hover:text-blue-300 transition-colors duration-300 relative z-10">{metrics.comparisons}</div>
            <div className="text-[10px] text-slate-500 mt-1 group-hover:text-slate-400 transition-colors duration-300 relative z-10">CPU operations</div>
          </div>
          
          <div className="bg-slate-800 p-3 rounded border border-slate-700 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-purple-500/10 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Animated corner accent */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
            
            {/* Animated bottom line */}
            <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-purple-500/50 rounded transition-all duration-700"></div>
            
            <div className="text-xs text-slate-400 mb-1 flex items-center group-hover:text-slate-300 transition-colors duration-300 relative z-10">
              <Zap className="mr-1 h-3 w-3 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" /> TIME (MS)
            </div>
            <div className="text-xl text-purple-400 font-mono group-hover:text-purple-300 transition-colors duration-300 relative z-10">{metrics.time}</div>
            <div className="text-[10px] text-slate-500 mt-1 group-hover:text-slate-400 transition-colors duration-300 relative z-10">Execution duration</div>
          </div>
        </div>
        
        {/* Advanced Metrics */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-slate-800 p-2 rounded border border-slate-700 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-amber-500/10 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Animated corner accent */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
            
            {/* Animated bottom line */}
            <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-amber-500/50 via-yellow-500/50 to-amber-500/50 rounded transition-all duration-700"></div>
            
            <div className="text-[10px] text-slate-400 mb-1 flex items-center group-hover:text-slate-300 transition-colors duration-300 relative z-10">
              <Percent className="mr-1 h-3 w-3 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" /> SWAP RATIO
            </div>
            <div className="text-sm text-amber-400 font-mono flex items-center group-hover:text-amber-300 transition-colors duration-300 relative z-10">
              {swapRatio}
              <span className="text-[10px] text-slate-500 ml-1 group-hover:text-slate-400 transition-colors duration-300">swaps/comp</span>
            </div>
          </div>
          
          <div className="bg-slate-800 p-2 rounded border border-slate-700 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-amber-500/10 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Animated corner accent */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
            
            {/* Animated bottom line */}
            <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-amber-500/50 via-yellow-500/50 to-amber-500/50 rounded transition-all duration-700"></div>
            
            <div className="text-[10px] text-slate-400 mb-1 flex items-center group-hover:text-slate-300 transition-colors duration-300 relative z-10">
              <Clock className="mr-1 h-3 w-3 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" /> TIME/ELEMENT
            </div>
            <div className="text-sm text-amber-400 font-mono flex items-center group-hover:text-amber-300 transition-colors duration-300 relative z-10">
              {timePerElement}
              <span className="text-[10px] text-slate-500 ml-1 group-hover:text-slate-400 transition-colors duration-300">ms/elem</span>
            </div>
          </div>
          
          <div className="bg-slate-800 p-2 rounded border border-slate-700 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-amber-500/10 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Animated corner accent */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
            
            {/* Animated bottom line */}
            <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-amber-500/50 via-yellow-500/50 to-amber-500/50 rounded transition-all duration-700"></div>
            
            <div className="text-[10px] text-slate-400 mb-1 flex items-center group-hover:text-slate-300 transition-colors duration-300 relative z-10">
              <Cpu className="mr-1 h-3 w-3 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" /> OPS/MS
            </div>
            <div className="text-sm text-amber-400 font-mono flex items-center group-hover:text-amber-300 transition-colors duration-300 relative z-10">
              {operationsPerMs}
              <span className="text-[10px] text-slate-500 ml-1 group-hover:text-slate-400 transition-colors duration-300">ops/ms</span>
            </div>
          </div>
          
          <div className="bg-slate-800 p-2 rounded border border-slate-700 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-amber-500/10 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Animated corner accent */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
            
            {/* Animated bottom line */}
            <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-amber-500/50 via-yellow-500/50 to-amber-500/50 rounded transition-all duration-700"></div>
            
            <div className="text-[10px] text-slate-400 mb-1 flex items-center group-hover:text-slate-300 transition-colors duration-300 relative z-10">
              <Award className="mr-1 h-3 w-3 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" /> SCORE
            </div>
            <div className="text-sm text-amber-400 font-mono flex items-center group-hover:text-amber-300 transition-colors duration-300 relative z-10">
              {performanceScore}
              <span className="text-[10px] text-slate-500 ml-1 group-hover:text-slate-400 transition-colors duration-300">points</span>
            </div>
          </div>
        </div>
        
        {/* Performance Visualization */}
        {metrics.time > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-700">
            <div className="text-xs text-slate-400 mb-2 flex items-center group cursor-pointer hover:text-emerald-400 transition-colors">
              <BarChart className="mr-1 h-3 w-3 text-emerald-400 group-hover:animate-spin" /> PERFORMANCE BREAKDOWN
            </div>
            <div className="flex h-6 rounded overflow-hidden bg-slate-800 border border-slate-700 hover:shadow-lg transition-all duration-300 group relative">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-800/50 via-slate-700/30 to-slate-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Add animated gradient line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-emerald-500/50 rounded transition-all duration-700"></div>
              
              <div 
                className="bg-emerald-600/70 h-full flex items-center justify-center text-[9px] text-white font-mono group-hover:bg-emerald-600/90 transition-colors duration-300 relative z-10"
                style={{ width: `${30}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 to-emerald-500/0 animate-shimmer"></div>
                <span className="relative z-10">Swaps</span>
              </div>
              <div 
                className="bg-blue-600/70 h-full flex items-center justify-center text-[9px] text-white font-mono group-hover:bg-blue-600/90 transition-colors duration-300 relative z-10"
                style={{ width: `${30}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/30 to-blue-500/0 animate-shimmer"></div>
                <span className="relative z-10">Comparisons</span>
              </div>
              <div 
                className="bg-purple-600/70 h-full flex items-center justify-center text-[9px] text-white font-mono group-hover:bg-purple-600/90 transition-colors duration-300 relative z-10"
                style={{ width: `${40}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/30 to-purple-500/0 animate-shimmer"></div>
                <span className="relative z-10">Time</span>
              </div>
            </div>
            
            {/* Improvement potential */}
            {bestAlgorithm && algorithm !== bestAlgorithm.algo && (
              <div className="mt-2 text-xs flex items-center bg-slate-800 p-2 rounded border border-slate-700 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-green-500/10 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Animated corner accent */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
                
                {/* Animated bottom line */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-green-500/50 via-emerald-500/50 to-green-500/50 rounded transition-all duration-700"></div>
                
                <div className="flex items-center relative z-10">
                  <TrendingDown className="h-3 w-3 text-green-500 mr-1 group-hover:text-green-400 transition-colors duration-300" />
                  <span className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">Potential improvement: </span>
                  <span className="text-green-500 ml-1 font-mono group-hover:text-green-400 transition-colors duration-300">{improvementPercent}%</span>
                  <span className="text-slate-500 ml-1 text-[10px] group-hover:text-slate-400 transition-colors duration-300">
                    using {bestAlgorithm.algo}_sort()
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Algorithm Comparison Section */}
      <div className="bg-slate-900 p-4 rounded border border-slate-800 relative overflow-hidden group">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 animate-[gradient_8s_ease_infinite] bg-[length:200%_100%]"></div>
        
        {/* Animated corner accent */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
        
        {/* Animated bottom line */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-rose-500/50 rounded transition-all duration-700"></div>
        
        <div className="flex justify-between items-center mb-4 relative z-10">
          <div className="font-mono text-sm text-slate-400 flex items-center group cursor-pointer hover:text-purple-400 transition-colors">
            <BarChart2 className="mr-2 h-4 w-4 text-purple-400 group-hover:animate-spin" />
            // algorithm comparison
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={testAllAlgorithms} 
              disabled={isSorting && !currentTestingAlgo}
              className={`
                bg-purple-600 hover:bg-purple-500 text-white font-mono text-sm flex items-center
                border border-purple-500 shadow-md hover:shadow-lg transition-all duration-300
                ${isSorting && !currentTestingAlgo ? 'opacity-50 cursor-not-allowed' : 'hover:translate-y-[-1px]'}
              `}
            >
              <Beaker className="mr-2 h-4 w-4" />
              test_all()
            </Button>
            
            <Button 
              variant="destructive" 
              onClick={stopSorting} 
              disabled={!currentTestingAlgo}
              className={`
                font-mono text-sm flex items-center
                border border-red-700 shadow-md hover:shadow-lg transition-all duration-300
                ${!currentTestingAlgo ? 'opacity-50 cursor-not-allowed' : 'hover:translate-y-[-1px] hover:bg-red-700'}
              `}
            >
              <StopCircle className="mr-2 h-4 w-4" />
              stop_test()
            </Button>
          </div>
        </div>
        
        {/* Testing status */}
        {currentTestingAlgo && (
          <div className="mb-4 bg-slate-800 p-3 rounded border border-purple-500/50 flex items-center justify-between relative overflow-hidden group">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-purple-500/10 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Animated corner accent */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
            
            {/* Animated bottom line */}
            <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-rose-500/50 rounded transition-all duration-700"></div>
            
            <div className="flex items-center relative z-10">
              <div className="animate-pulse mr-2 h-3 w-3 rounded-full bg-purple-500 shadow-sm shadow-purple-500/50"></div>
              <span className="text-sm text-slate-300">
                Testing algorithm: <span className="text-purple-400 font-mono font-bold">{currentTestingAlgo}_sort()</span>
              </span>
            </div>
            <div className="text-xs text-slate-400 bg-slate-700/50 py-1 px-2 rounded-full relative z-10">Running tests...</div>
          </div>
        )}
        
        {/* Algorithm Ranking Cards */}
        <div className="space-y-2 relative z-10">
          {sortedMetrics.map(({ algo, metrics: algoMetrics, rank }) => (
            <div 
              key={algo} 
              className={`bg-slate-800 p-3 rounded border ${
                rank === 1 ? 'border-yellow-500' : 'border-slate-700'
              } relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300`}
            >
              {/* Animated gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${
                rank === 1 ? 'from-yellow-500/5 via-yellow-500/10 to-yellow-500/5' :
                rank === 2 ? 'from-slate-400/5 via-slate-400/10 to-slate-400/5' :
                rank === 3 ? 'from-amber-700/5 via-amber-700/10 to-amber-700/5' :
                'from-slate-700/5 via-slate-700/10 to-slate-700/5'
              } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Animated corner accent */}
              <div className={`absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br ${
                rank === 1 ? 'from-yellow-500/10 to-amber-500/10' :
                rank === 2 ? 'from-slate-400/10 to-slate-300/10' :
                rank === 3 ? 'from-amber-700/10 to-amber-600/10' :
                'from-slate-700/10 to-slate-600/10'
              } rounded-full blur-md group-hover:scale-150 transition-transform duration-700`}></div>
              
              {/* Animated bottom line */}
              <div className={`absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${
                rank === 1 ? 'from-yellow-500/50 via-amber-500/50 to-yellow-500/50' :
                rank === 2 ? 'from-slate-400/50 via-slate-300/50 to-slate-400/50' :
                rank === 3 ? 'from-amber-700/50 via-amber-600/50 to-amber-700/50' :
                'from-slate-700/50 via-slate-600/50 to-slate-700/50'
              } rounded transition-all duration-700`}></div>
              
              {/* Algorithm name and rank */}
              <div className="flex items-center justify-between relative z-10">
                <div className="text-sm text-emerald-400 font-mono mb-2 flex items-center group-hover:text-emerald-300 transition-colors duration-300">
                  {algo}_sort()
                  {/* Crown icon for the winner */}
                  {rank === 1 && (
                    <Crown 
                      className="inline-block ml-2 text-yellow-500 group-hover:text-yellow-400 transition-colors duration-300"
                      style={{
                        animation: 'bounce 1s ease-in-out infinite',
                        height: '16px',
                        width: '16px'
                      }}
                    />
                  )}
                  
                  {/* Highlight current algorithm */}
                  {algo === algorithm && (
                    <Badge className="ml-2 bg-slate-700 text-[10px] group-hover:bg-slate-600 transition-colors duration-300">CURRENT</Badge>
                  )}
                </div>
                
                {/* Rank badge */}
                <Badge 
                  variant="outline" 
                  className={`
                    ${rank === 1 ? 'bg-yellow-500/10 text-yellow-500 group-hover:bg-yellow-500/20 group-hover:text-yellow-400' : 
                      rank === 2 ? 'bg-slate-400/10 text-slate-400 group-hover:bg-slate-400/20 group-hover:text-slate-300' :
                      rank === 3 ? 'bg-amber-700/10 text-amber-700 group-hover:bg-amber-700/20 group-hover:text-amber-600' :
                      'bg-slate-700/10 text-slate-500 group-hover:bg-slate-700/20 group-hover:text-slate-400'
                    } transition-colors duration-300 relative z-10
                  `}
                >
                  #{rank}
                </Badge>
              </div>
              
              {/* Performance visualization */}
              <div className="mt-2 h-2 w-full bg-slate-700 rounded-full overflow-hidden relative z-10 group-hover:bg-slate-600 transition-colors duration-300">
                <div 
                  className={`h-full ${
                    rank === 1 ? 'bg-yellow-500 group-hover:bg-yellow-400' : 
                    rank === 2 ? 'bg-slate-400 group-hover:bg-slate-300' :
                    rank === 3 ? 'bg-amber-700 group-hover:bg-amber-600' :
                    'bg-slate-600 group-hover:bg-slate-500'
                  } transition-all duration-500`}
                  style={{ 
                    width: `${Math.max(5, 100 - (rank - 1) * 15)}%`,
                  }}
                ></div>
              </div>
              
              {/* Algorithm metrics grid */}
              <div className="grid grid-cols-3 gap-2 text-xs relative z-10 mt-2">
                <div className="bg-slate-700/50 p-1.5 rounded flex items-center justify-between group-hover:bg-slate-700 transition-colors duration-300 relative overflow-hidden">
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="flex items-center relative z-10">
                    <ArrowUpDown className="mr-1 h-3 w-3 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />
                    <span className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">Swaps:</span>
                  </div>
                  <span className="text-amber-400 font-mono group-hover:text-amber-300 transition-colors duration-300">{algoMetrics.swaps}</span>
                </div>
                
                <div className="bg-slate-700/50 p-1.5 rounded flex items-center justify-between group-hover:bg-slate-700 transition-colors duration-300 relative overflow-hidden">
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="flex items-center relative z-10">
                    <BarChart2 className="mr-1 h-3 w-3 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />
                    <span className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">Comps:</span>
                  </div>
                  <span className="text-amber-400 font-mono group-hover:text-amber-300 transition-colors duration-300">{algoMetrics.comparisons}</span>
                </div>
                
                <div className="bg-slate-700/50 p-1.5 rounded flex items-center justify-between group-hover:bg-slate-700 transition-colors duration-300 relative overflow-hidden">
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="flex items-center relative z-10">
                    <Zap className="mr-1 h-3 w-3 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />
                    <span className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">Time:</span>
                  </div>
                  <span className="text-amber-400 font-mono group-hover:text-amber-300 transition-colors duration-300">{algoMetrics.time}ms</span>
                </div>
              </div>
              
              {/* Comparison with current algorithm */}
              {algo !== algorithm && currentAlgoMetrics && algoMetrics.time > 0 && (
                <div className="mt-2 text-xs flex items-center bg-slate-700/50 p-1.5 rounded relative overflow-hidden group">
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-700/30 via-slate-600/20 to-slate-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="flex items-center relative z-10">
                    {parseFloat(algoMetrics.time) < parseFloat(currentAlgoMetrics.time) ? (
                      <>
                        <TrendingDown className="h-3 w-3 text-green-500 mr-1 group-hover:text-green-400 transition-colors duration-300" />
                        <span className="text-green-500 group-hover:text-green-400 transition-colors duration-300">
                          {Math.round((parseFloat(algoMetrics.time) / parseFloat(currentAlgoMetrics.time) - 1) * -100)}% faster
                        </span>
                        <span className="text-slate-500 ml-1 group-hover:text-slate-400 transition-colors duration-300">
                          than current algorithm
                        </span>
                      </>
                    ) : (
                      <>
                        <TrendingUp className="h-3 w-3 text-red-500 mr-1 group-hover:text-red-400 transition-colors duration-300" />
                        <span className="text-red-500 group-hover:text-red-400 transition-colors duration-300">
                          {Math.round((parseFloat(algoMetrics.time) / parseFloat(currentAlgoMetrics.time) - 1) * 100)}% slower
                        </span>
                        <span className="text-slate-500 ml-1 group-hover:text-slate-400 transition-colors duration-300">
                          than current algorithm
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* No data message */}
        {sortedMetrics.length === 0 && (
          <div className="bg-slate-800 p-4 rounded border border-slate-700 text-center relative overflow-hidden group hover:bg-slate-700 transition-colors duration-300">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-700/5 via-slate-700/10 to-slate-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Animated corner accent */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-slate-700/10 to-slate-600/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="relative z-10">
              <div className="text-slate-400 text-sm mb-2 group-hover:text-slate-300 transition-colors duration-300">No comparison data available</div>
              <div className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors duration-300">Run test_all() to compare algorithm performance</div>
            </div>
          </div>
        )}
        
        {/* Winner summary */}
        {sortedMetrics.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="bg-slate-800 p-3 rounded border border-yellow-500 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-yellow-500/10 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Animated corner accent */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
              
              {/* Animated bottom line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-yellow-500/50 via-amber-500/50 to-yellow-500/50 rounded transition-all duration-700"></div>
              
              <div className="text-sm text-slate-400 font-mono flex items-center justify-between relative z-10">
                <div className="flex items-center">
                  <Crown className="mr-2 h-5 w-5 text-yellow-500 group-hover:text-yellow-400 transition-colors duration-300" 
                    style={{ animation: 'bounce 1s ease-in-out infinite' }}
                  />
                  <span className="text-yellow-500 group-hover:text-yellow-400 transition-colors duration-300">
                    {sortedMetrics[0]?.algo}_sort()
                  </span>
                </div>
                <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30 group-hover:bg-yellow-500/30 transition-colors duration-300">WINNER</Badge>
              </div>
              
              {/* Winner metrics */}
              <div className="grid grid-cols-3 gap-2 text-xs relative z-10 mt-3">
                <div className="bg-slate-700/50 p-1.5 rounded flex items-center justify-between group-hover:bg-slate-700 transition-colors duration-300 relative overflow-hidden">
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-yellow-500/10 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="flex items-center relative z-10">
                    <ArrowUpDown className="mr-1 h-3 w-3 text-yellow-500 group-hover:text-yellow-400 transition-colors duration-300" />
                    <span className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">Swaps:</span>
                  </div>
                  <span className="text-yellow-500 font-mono group-hover:text-yellow-400 transition-colors duration-300">
                    {sortedMetrics[0]?.metrics.swaps}
                  </span>
                </div>
                
                <div className="bg-slate-700/50 p-1.5 rounded flex items-center justify-between group-hover:bg-slate-700 transition-colors duration-300 relative overflow-hidden">
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-yellow-500/10 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="flex items-center relative z-10">
                    <BarChart2 className="mr-1 h-3 w-3 text-yellow-500 group-hover:text-yellow-400 transition-colors duration-300" />
                    <span className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">Comps:</span>
                  </div>
                  <span className="text-yellow-500 font-mono group-hover:text-yellow-400 transition-colors duration-300">
                    {sortedMetrics[0]?.metrics.comparisons}
                  </span>
                </div>
                
                <div className="bg-slate-700/50 p-1.5 rounded flex items-center justify-between group-hover:bg-slate-700 transition-colors duration-300 relative overflow-hidden">
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-yellow-500/10 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="flex items-center relative z-10">
                    <Zap className="mr-1 h-3 w-3 text-yellow-500 group-hover:text-yellow-400 transition-colors duration-300" />
                    <span className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">Time:</span>
                  </div>
                  <span className="text-yellow-500 font-mono group-hover:text-yellow-400 transition-colors duration-300">
                    {sortedMetrics[0]?.metrics.time}ms
                  </span>
                </div>
              </div>
            </div>
            
            {/* Performance summary */}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div className="bg-slate-800 p-2 rounded border border-slate-700 flex items-center justify-between relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-green-500/10 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Animated corner accent */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
                
                {/* Animated bottom line */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-green-500/50 via-emerald-500/50 to-green-500/50 rounded transition-all duration-700"></div>
                
                <div className="flex items-center relative z-10">
                  <Maximize2 className="h-3 w-3 text-green-500 mr-1 group-hover:text-green-400 transition-colors duration-300" />
                  <span className="text-[10px] text-slate-400 group-hover:text-slate-300 transition-colors duration-300">Fastest:</span>
                </div>
                <span className="text-[10px] text-green-500 font-mono group-hover:text-green-400 transition-colors duration-300">
                  {sortedMetrics[0]?.algo}_sort()
                </span>
              </div>
              
              <div className="bg-slate-800 p-2 rounded border border-slate-700 flex items-center justify-between relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-red-500/10 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Animated corner accent */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-red-500/10 to-rose-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
                
                {/* Animated bottom line */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-red-500/50 via-rose-500/50 to-red-500/50 rounded transition-all duration-700"></div>
                
                <div className="flex items-center relative z-10">
                  <Minimize2 className="h-3 w-3 text-red-500 mr-1 group-hover:text-red-400 transition-colors duration-300" />
                  <span className="text-[10px] text-slate-400 group-hover:text-slate-300 transition-colors duration-300">Slowest:</span>
                </div>
                <span className="text-[10px] text-red-500 font-mono group-hover:text-red-400 transition-colors duration-300">
                  {sortedMetrics[sortedMetrics.length - 1]?.algo}_sort()
                </span>
              </div>
            </div>
            
            {/* Speed difference */}
            {sortedMetrics.length > 1 && (
              <div className="mt-2 bg-slate-800 p-2 rounded border border-slate-700 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-amber-500/10 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Animated corner accent */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
                
                {/* Animated bottom line */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-amber-500/50 via-yellow-500/50 to-amber-500/50 rounded transition-all duration-700"></div>
                
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center">
                    <BarChart className="h-3 w-3 text-amber-400 mr-1 group-hover:text-amber-300 transition-colors duration-300" />
                    <span className="text-[10px] text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                      Speed difference:
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-amber-400 font-mono group-hover:text-amber-300 transition-colors duration-300">
                      {Math.round(parseFloat(sortedMetrics[sortedMetrics.length - 1]?.metrics.time) / 
                        parseFloat(sortedMetrics[0]?.metrics.time))}x
                    </span>
                    <span className="text-[10px] text-slate-500 ml-1 group-hover:text-slate-400 transition-colors duration-300">
                      ({parseFloat(sortedMetrics[sortedMetrics.length - 1]?.metrics.time) - 
                        parseFloat(sortedMetrics[0]?.metrics.time)}ms)
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Add the array visualization */}
      {array && (
        <ArrayVisualization
          algorithm={algorithm}
          array={array}
          currentBar={currentBar}
          isSorting={isSorting}
          currentTestingAlgo={currentTestingAlgo}
          isStopped={isStopped}
          height="h-100"
        />
      )}
    </div>
  );
};

export default MetricsPanel; 