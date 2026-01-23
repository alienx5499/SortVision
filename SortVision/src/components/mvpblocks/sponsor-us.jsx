import { Button } from '../ui/button';
import { Heart } from 'lucide-react';

export default function SponsorUs({ onClick, className = '' }) {
  return (
    <Button
      type="button"
      onClick={onClick}
      className={`group text-foreground ring-offset-background focus-visible:ring-ring relative inline-flex h-10 cursor-pointer items-center justify-center rounded-md border-0 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:via-rose-600 hover:to-pink-700 px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95 disabled:pointer-events-none disabled:opacity-50 ${className}`}
    >
      <div className="flex items-center gap-2">
        <Heart className="h-4 w-4 fill-white animate-pulse" />
        <span className="ml-1 p-1 lg:inline">Sponsor Us</span>
      </div>
    </Button>
  );
}
