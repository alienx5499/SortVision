'use client';

import { X, Heart, Sparkles } from 'lucide-react';
import SponsorUs from './mvpblocks/sponsor-us.jsx';
import { Z_INDEX } from '@/utils/zIndex';
import { useSponsorUsPopup } from './useSponsorUsPopup';

export default function SponsorUsPopup() {
  const { showPopup, handleSponsorClick, handleDismiss, handleLater } =
    useSponsorUsPopup();

  if (!showPopup) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
        style={{ zIndex: Z_INDEX.SPONSOR_BACKDROP }}
        onClick={handleLater}
      />

      <div
        className="fixed inset-0 flex items-center justify-center animate-in fade-in duration-300"
        style={{ zIndex: Z_INDEX.SPONSOR_MODAL }}
      >
        <div className="w-[380px] max-w-[90vw] bg-slate-900 border border-slate-700 shadow-2xl shadow-pink-500/20 rounded-2xl relative overflow-hidden transition-transform duration-300 hover:scale-[1.01]">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-pink-950/30 animate-gradient" />
          <div className="relative p-6">
            <button
              type="button"
              onClick={handleDismiss}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full hover:bg-slate-800/80 transition-all duration-300 border border-slate-600 hover:border-pink-500/50 group hover:rotate-90 transform"
              aria-label="Close popup"
            >
              <X className="size-4 text-slate-400 group-hover:text-pink-400 transition-colors duration-300" />
            </button>

            <div className="text-center space-y-6">
              <div className="space-y-2">
                <div className="relative mx-auto size-10 mb-1">
                  <Heart className="size-6 text-pink-400 absolute inset-0 m-auto fill-pink-400 animate-pulse" />
                  <div className="absolute inset-0 rounded-full border-2 border-pink-400/20 animate-ping" />
                  <div className="absolute inset-0 rounded-full border-2 border-pink-400/10 animate-ping [animation-delay:0.5s]" />
                  <Sparkles className="size-3 text-pink-300 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold font-mono text-white relative group">
                  Love SortVision?
                  {typeof window !== 'undefined' &&
                    (new URLSearchParams(window.location.search).get(
                      'testSponsor'
                    ) === '1' ||
                      localStorage.getItem('sv-test-sponsor') === '1') && (
                      <span className="ml-2 text-xs bg-purple-600/20 text-purple-300 px-2 py-0.5 rounded border border-purple-600/30 font-mono">
                        TEST MODE
                      </span>
                    )}
                </h3>
                <p className="text-slate-400 font-mono text-sm leading-relaxed">
                  Your support helps us keep SortVision free and open-source!
                  Consider sponsoring us to help maintain and improve this
                  educational tool.
                </p>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-4 text-left border border-slate-700 relative overflow-hidden">
                <div className="absolute -inset-x-1 top-0 h-px bg-gradient-to-r from-transparent via-pink-400/40 to-transparent" />

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Heart className="size-4 text-pink-400 fill-pink-400" />
                    <h4 className="font-semibold text-sm text-white">
                      Why sponsor us?
                    </h4>
                  </div>
                </div>

                <ul className="text-xs text-slate-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-[3px] inline-block w-1.5 h-1.5 rounded-full bg-pink-400" />
                    <span>Keep SortVision free and accessible to everyone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[3px] inline-block w-1.5 h-1.5 rounded-full bg-pink-400" />
                    <span>Support ongoing development and new features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[3px] inline-block w-1.5 h-1.5 rounded-full bg-pink-400" />
                    <span>
                      Help cover domain, tooling, and keeping the site online
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[3px] inline-block w-1.5 h-1.5 rounded-full bg-pink-400" />
                    <span>
                      Enable us to create more educational content and tools
                    </span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <SponsorUs onClick={handleSponsorClick} />

                <div className="flex gap-2 justify-center">
                  <button
                    type="button"
                    onClick={handleLater}
                    className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    Maybe later
                  </button>
                  <button
                    type="button"
                    onClick={handleDismiss}
                    className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    Don&apos;t show again
                  </button>
                </div>
              </div>

              <div className="text-xs text-slate-400 border-t border-slate-700 pt-4">
                💝 Thank you for being part of the SortVision community!
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
