import { memo } from 'react';
import Link from 'next/link';
import { Terminal, Code } from '@/components/ui/OptimizedIcons';

type MainHeaderProps = {
  getLocalizedUrl: (path: string) => string;
};

const MainHeader = memo(({ getLocalizedUrl }: MainHeaderProps) => (
  <header className="flex flex-col items-center mb-4 sm:mb-6 animate-fade-down animate-once animate-duration-[800ms] animate-delay-100">
    <div className="flex items-center gap-2 sm:gap-3">
      <Terminal
        className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-400 animate-pulse animate-infinite animate-duration-[3000ms]"
        aria-hidden="true"
      />
      <h1 className="text-2xl sm:text-4xl font-mono font-bold text-white">
        <Link
          href={getLocalizedUrl('')}
          className="hover:opacity-90 transition-opacity"
        >
          <span className="text-emerald-400 hover:text-emerald-300 transition-colors duration-300">
            Sort
          </span>
          <span className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
            Vision
          </span>
        </Link>
      </h1>
      <Code
        className="h-4 w-4 sm:h-6 sm:w-6 text-slate-400 animate-spin animate-once animate-duration-[1500ms] animate-delay-300"
        aria-hidden="true"
      />
    </div>
    <div className="text-lg sm:text-xl font-mono text-slate-400 mt-1">
      <span className="text-emerald-400 hover:text-emerald-300 transition-colors duration-300">
        algorithm
      </span>
      <span className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
        .visualizer
      </span>
      <span className="text-slate-400 hover:text-white transition-colors duration-300">
        ()
      </span>
    </div>
  </header>
));

MainHeader.displayName = 'MainHeader';

export default MainHeader;
