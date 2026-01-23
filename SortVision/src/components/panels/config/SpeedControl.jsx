import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Timer } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Speed Control Component
 *
 * A sophisticated slider component for controlling animation speed with:
 * - Visual feedback and animations
 * - Precise control over delay timing
 * - Quick adjustment buttons
 * - Status indicators
 * - Accessibility features
 *
 * Features:
 * - Range: 1ms to 1000ms
 * - Visual speed representation
 * - Animated background effects
 * - 2x and ½x quick adjustment buttons
 */

const SpeedControl = ({ speed, setSpeed, isSorting, audio }) => {
  const { t } = useLanguage();

  return (
    <div className="mb-4 relative group">
      {/* Animated background glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative bg-slate-900 p-4 rounded border border-slate-800 transition-all duration-500 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 group/speed overflow-hidden h-full">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Animated grid pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:8px_8px] opacity-30"></div>

            {/* Floating particles */}
            <div
              className="absolute h-2 w-2 rounded-full bg-emerald-500/50 top-[10%] left-[20%] animate-pulse"
              style={{ animationDuration: '3s' }}
            ></div>
            <div
              className="absolute h-1 w-1 rounded-full bg-emerald-500/50 top-[30%] left-[70%] animate-pulse"
              style={{ animationDuration: '2.3s' }}
            ></div>
            <div
              className="absolute h-1.5 w-1.5 rounded-full bg-emerald-500/50 top-[70%] left-[30%] animate-pulse"
              style={{ animationDuration: '4s' }}
            ></div>

            {/* Animated code lines */}
            <div className="absolute top-[15%] left-0 h-px w-[30%] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent animate-[moveRight_15s_linear_infinite]"></div>
            <div className="absolute top-[45%] left-0 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent animate-[moveRight_12s_linear_infinite]"></div>
            <div className="absolute top-[75%] left-0 h-px w-[40%] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent animate-[moveRight_18s_linear_infinite]"></div>
          </div>
        </div>

        {/* Animated corner accent */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full blur-md group-hover/speed:scale-150 transition-transform duration-700"></div>

        {/* Animated bottom line */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover/speed:w-full bg-gradient-to-r from-emerald-500/50 via-blue-500/50 to-purple-500/50 rounded transition-all duration-700"></div>

        <label
          className="font-mono text-sm text-slate-400 mb-2 flex items-center relative z-10 group-hover/speed:text-emerald-400 transition-colors duration-300"
          id="speed-control-label"
        >
          <Timer
            className="mr-2 h-4 w-4 text-emerald-400 animate-pulse"
            style={{ animationDuration: '4s' }}
          />
          <span className="transition-colors duration-300">
            // {t('visualizer.controls.animationDelay')}:{' '}
            <span className="text-emerald-400 ml-1">{speed}ms</span>
          </span>
        </label>

        <div className="relative mt-6 mb-8">
          <div className="absolute -top-4 left-0 right-0 flex justify-between text-[10px] text-slate-500">
            <span className="text-emerald-300 group-hover/speed:text-emerald-300 transition-colors duration-300">
              {t('visualizer.controls.fast')}
            </span>
            <span className="text-emerald-300 group-hover/speed:text-emerald-300 transition-colors duration-300">
              {t('visualizer.controls.medium')}
            </span>
            <span className="text-emerald-300 group-hover/speed:text-emerald-300 transition-colors duration-300">
              {t('visualizer.controls.slow')}
            </span>
          </div>
          <div className="relative">
            {/* Track background with enhanced glow */}
            <div className="absolute inset-0 bg-emerald-400/5 rounded-full group-hover/speed:bg-emerald-400/10 transition-all duration-300"></div>
            {/* Active track with optimized performance */}
            <div
              className="absolute h-full bg-emerald-400/20 rounded-full overflow-hidden origin-left"
              style={{
                transform: `scaleX(${(speed - 1) / (1000 - 1)})`,
                transition: 'transform 0.1s ease-out',
              }}
            >
              <div className="absolute inset-0 w-0 group-hover/speed:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent"></div>
            </div>
            <Slider
              value={[speed]}
              min={1}
              max={1000}
              step={1}
              onValueChange={value => setSpeed(value[0])}
              disabled={isSorting}
              className="relative z-10"
              name="animation speed"
              aria-label="Animation Speed Slider"
              aria-labelledby="speed-control-label"
            />
            {/* Animated glow effect */}
            <div className="absolute inset-0 bg-emerald-400/10 rounded-full animate-pulse"></div>
          </div>
          <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] text-slate-500">
            <span className="group-hover/speed:text-emerald-300 text-emerald-300 transition-colors duration-300">
              1ms
            </span>
            <span className="group-hover/speed:text-emerald-300 text-emerald-300 transition-colors duration-300">
              500ms
            </span>
            <span className="group-hover/speed:text-emerald-300 text-emerald-300 transition-colors duration-300">
              1000ms
            </span>
          </div>
        </div>

        {/* Speed Control Status Bar */}
        <div className="flex justify-between items-center mt-2 text-xs text-slate-400">
          <div className="flex items-center">
            <div
              className={`w-3 h-3 rounded-sm mr-1 animate-pulse ${
                speed < 100
                  ? 'bg-emerald-400/30'
                  : speed < 500
                    ? 'bg-yellow-400/30'
                    : 'bg-red-400/30'
              }`}
            ></div>
            <span
              className={
                speed < 100
                  ? 'text-emerald-400'
                  : speed < 500
                    ? 'text-yellow-400'
                    : 'text-red-400'
              }
            >
              Delay: {speed}ms
            </span>
          </div>

          {/* Speed adjustment buttons */}
          <div className="flex space-x-1">
            <button
              onClick={() => {
                if (!isSorting && speed < 1000) {
                  const newSpeed = Math.min(1000, speed * 2);
                  setSpeed(newSpeed);
                  audio?.playAccessSound(); // Play sound effect
                }
              }}
              disabled={isSorting || speed >= 1000}
              className="group/btn relative w-8 h-8 rounded-md bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-all duration-300 overflow-hidden"
              aria-label="Double animation delay"
            >
              <div className="absolute inset-0 bg-emerald-400/10 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 flex items-center justify-center text-emerald-400 font-mono text-[10px]">
                2x
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 bg-emerald-400/50 w-0 group-hover/btn:w-full transition-all duration-300"></div>
            </button>
            <button
              onClick={() => {
                if (!isSorting && speed > 1) {
                  const newSpeed = Math.max(1, speed / 2);
                  setSpeed(newSpeed);
                  audio?.playAccessSound(); // Play sound effect
                }
              }}
              disabled={isSorting || speed <= 1}
              className="group/btn relative w-8 h-8 rounded-md bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-all duration-300 overflow-hidden"
              aria-label="Halve animation delay"
            >
              <div className="absolute inset-0 bg-emerald-400/10 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 flex items-center justify-center text-emerald-400 font-mono text-[10px]">
                ½x
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 bg-emerald-400/50 w-0 group-hover/btn:w-full transition-all duration-300"></div>
            </button>
          </div>

          <div className="text-[10px] text-emerald-300 group-hover/speed:text-emerald-300 transition-colors duration-300">
            {speed < 100
              ? 'Visualize patterns'
              : speed < 500
                ? 'Follow the steps'
                : 'Detailed analysis'}
          </div>
        </div>

        {/* Visual speed representation with optimized performance */}
        <div className="mt-4 h-8 bg-slate-800/80 rounded-lg border border-slate-700 overflow-hidden relative group/bar">
          <div
            className="h-full bg-gradient-to-r from-emerald-500/20 to-emerald-400/20 relative overflow-hidden origin-left"
            style={{
              transform: `scaleX(${(speed - 1) / (1000 - 1)})`,
              transition: 'transform 0.05s ease-out',
            }}
          >
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 w-0 group-hover/speed:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent"></div>
            <div className="absolute inset-y-0 right-0 w-1 bg-emerald-400/30"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-[10px] text-emerald-400/70 font-mono group-hover/speed:text-emerald-400 transition-colors duration-300">
            {speed}ms delay
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeedControl;
