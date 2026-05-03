import type { SortingAlgorithmId } from '@/components/sortingVisualizer/algorithmRegistry';
import type { JSX } from 'react';

export function BubbleAlgorithmViz(): JSX.Element {
  return (
    <div className="flex items-end space-x-1 relative">
      <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:8px_8px] opacity-20"></div>
      {[4, 2, 6, 1, 5, 3].map((height, i) => (
        <div
          key={i}
          className="w-3 bg-gradient-to-t from-red-600 to-red-400 rounded-t transition-all duration-300 relative group"
          style={{ height: `${height * 6}px` }}
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-white/30 rounded-t"></div>
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-[8px] text-red-300 opacity-0 group-hover:opacity-100 transition-opacity">
            {height}
          </div>
        </div>
      ))}
      <div className="absolute top-0 left-0 w-full">
        <div
          className="absolute h-full border-l-2 border-r-2 border-red-400/50 rounded w-8 transition-all duration-300 bg-red-500/5"
          style={{
            left: '0%',
            animation: 'bubbleCompare 3s ease-in-out infinite',
          }}
        >
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-[8px] text-red-300">
            compare
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-400/70">
            ⇄
          </div>
        </div>
      </div>
      <div className="absolute -bottom-4 right-0 text-[8px] text-slate-400 font-mono">
        step: <span className="text-red-400">n²</span>
      </div>
    </div>
  );
}

export function InsertionAlgorithmViz(): JSX.Element {
  return (
    <div className="flex items-end space-x-1">
      {[1, 2, 3, 6, 5, 4].map((height, i) => (
        <div
          key={i}
          className={`w-3 rounded-t transition-all duration-300 ${
            i < 3
              ? 'bg-gradient-to-t from-orange-600 to-orange-400'
              : 'bg-gradient-to-t from-slate-600 to-slate-400'
          }`}
          style={{ height: `${height * 6}px` }}
        ></div>
      ))}
      <div className="absolute top-0 left-0 w-full">
        <div
          className="w-3 h-6 border-2 border-orange-400/50 rounded-t absolute animate-[moveRight_3s_ease-in-out_infinite]"
          style={{ left: '50%' }}
        ></div>
      </div>
    </div>
  );
}

export function SelectionAlgorithmViz(): JSX.Element {
  return (
    <div className="flex items-end space-x-1 relative">
      {[1, 4, 3, 6, 2, 5].map((height, i) => (
        <div
          key={i}
          className={`w-3 rounded-t transition-all duration-300 ${
            i === 0
              ? 'bg-gradient-to-t from-amber-600 to-amber-400'
              : 'bg-gradient-to-t from-slate-600 to-slate-400'
          }`}
          style={{ height: `${height * 6}px` }}
        ></div>
      ))}
      <div className="absolute top-0 left-0 w-full h-full">
        <div
          className="absolute w-3 h-3 border-2 border-amber-400 rounded-full bg-amber-400/20"
          style={{
            animation: 'selectionSearch 4s ease-in-out infinite',
            top: '30%',
          }}
        ></div>
        <div className="absolute bottom-0 left-0 h-1 bg-amber-400/30 w-full"></div>
      </div>
    </div>
  );
}

export function QuickAlgorithmViz(): JSX.Element {
  return (
    <div className="flex items-end space-x-1">
      {[2, 1, 3, 5, 6, 4].map((height, i) => (
        <div
          key={i}
          className={`w-3 rounded-t transition-all duration-300 ${
            i === 3
              ? 'bg-gradient-to-t from-green-600 to-green-400'
              : 'bg-gradient-to-t from-slate-600 to-slate-400'
          }`}
          style={{ height: `${height * 6}px` }}
        ></div>
      ))}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="w-[80%] border-t-2 border-dashed border-green-400/50"></div>
      </div>
    </div>
  );
}

export function MergeAlgorithmViz(): JSX.Element {
  return (
    <div className="flex items-end space-x-1">
      {[1, 3, 2, 5, 4, 6].map((height, i) => (
        <div
          key={i}
          className={`w-3 rounded-t transition-all duration-300 ${
            i < 3
              ? 'bg-gradient-to-t from-blue-600 to-blue-400'
              : 'bg-gradient-to-t from-purple-600 to-purple-400'
          }`}
          style={{ height: `${height * 6}px` }}
        ></div>
      ))}
      <div className="absolute top-0 left-0 w-full h-full flex items-center">
        <div className="w-[50%] border-r-2 border-blue-400/50 h-full"></div>
      </div>
    </div>
  );
}

export function RadixAlgorithmViz(): JSX.Element {
  return (
    <div className="flex items-end space-x-1 relative">
      {[12, 24, 35, 41, 53, 60].map((height, i) => (
        <div
          key={i}
          className="w-3 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t transition-all duration-300 relative"
          style={{
            height: `${(height / 10) * 6}px`,
            animationDelay: `${i * 0.2}s`,
          }}
        >
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-[8px] text-cyan-300 font-mono tracking-tight whitespace-nowrap">
            {Math.floor(height / 10)}
          </div>
        </div>
      ))}
      <div className="absolute top-0 left-0 w-full">
        <div
          className="absolute h-full border-l border-r border-cyan-400/30 rounded w-8 transition-all duration-300"
          style={{
            left: '0%',
            animation: 'radixSort 3s ease-in-out infinite',
          }}
        >
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-[8px] text-cyan-300 font-mono whitespace-nowrap">
            radix sort
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeapAlgorithmViz(): JSX.Element {
  return (
    <div className="flex items-end space-x-1 relative">
      {[4, 2, 6, 1, 5, 3].map((height, i) => (
        <div
          key={i}
          className="w-3 bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t transition-all duration-300 relative"
          style={{ height: `${height * 6}px` }}
        >
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-[8px] text-indigo-300 font-mono tracking-tight whitespace-nowrap">
            {height}
          </div>
        </div>
      ))}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-2 left-[25%] w-[50%] h-0.5 bg-indigo-400/30"></div>
        <div className="absolute top-2 left-[12.5%] w-[25%] h-0.5 bg-indigo-400/30"></div>
        <div className="absolute top-2 left-[62.5%] w-[25%] h-0.5 bg-indigo-400/30"></div>
      </div>
      <div className="absolute top-0 left-0 w-full">
        <div
          className="absolute h-full border-l border-r border-indigo-400/30 rounded w-8 transition-all duration-300"
          style={{
            left: '0%',
            animation: 'heapify 3s ease-in-out infinite',
          }}
        >
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-[8px] text-indigo-300 font-mono whitespace-nowrap">
            heapify
          </div>
        </div>
      </div>
    </div>
  );
}

export function BucketAlgorithmViz(): JSX.Element {
  return (
    <div className="flex items-end space-x-1 relative h-24">
      <div className="absolute top-0 left-0 w-full h-full flex space-x-1">
        {[0, 1, 2].map((bucket, i) => (
          <div
            key={i}
            className="w-1/3 h-full border border-pink-400/30 rounded-t overflow-hidden relative"
          >
            <div
              className="absolute bottom-0 left-0 w-full bg-pink-400/20"
              style={{ height: `${(bucket + 1) * 30}%` }}
            ></div>
          </div>
        ))}
      </div>
      <div className="relative flex items-end space-x-1 z-10">
        {[2, 4, 1, 5, 6].map((height, i) => (
          <div
            key={i}
            className="w-3 bg-gradient-to-t from-pink-600 to-pink-400 rounded-t transition-all duration-300 relative"
            style={{
              height: `${height * 8}px`,
              animation: `distribute ${2 + i * 0.2}s ease-in-out infinite`,
            }}
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-[8px] text-pink-300 font-mono tracking-tight whitespace-nowrap">
              {height}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute top-0 left-0 w-full">
        <div
          className="absolute h-full border-l border-r border-pink-400/30 rounded w-8 transition-all duration-300"
          style={{
            left: '0%',
            animation: 'distributeIndicator 3s ease-in-out infinite',
          }}
        >
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-[8px] text-pink-300 font-mono whitespace-nowrap">
            distribute
          </div>
        </div>
      </div>
    </div>
  );
}

const MINI_VIEWS: Record<SortingAlgorithmId, () => JSX.Element> = {
  bubble: BubbleAlgorithmViz,
  insertion: InsertionAlgorithmViz,
  selection: SelectionAlgorithmViz,
  quick: QuickAlgorithmViz,
  merge: MergeAlgorithmViz,
  radix: RadixAlgorithmViz,
  heap: HeapAlgorithmViz,
  bucket: BucketAlgorithmViz,
};

export function renderAlgorithmMiniVisualization(
  algorithm: SortingAlgorithmId
): JSX.Element {
  const View = MINI_VIEWS[algorithm];
  return <View />;
}
