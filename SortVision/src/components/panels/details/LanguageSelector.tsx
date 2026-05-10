'use client';

import { useEffect, useRef, useState } from 'react';
import { Languages, Code2, Check } from 'lucide-react';
import { PROGRAMMING_CODE_LANGUAGE_OPTIONS } from './programmingCodeLanguages';

export type LanguageSelectorProps = {
  selectedLanguage: string;
  onLanguageChange?: (langId: string) => void;
};

export default function LanguageSelector({
  selectedLanguage,
  onLanguageChange,
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (langId: string) => {
    setIsOpen(false);
    onLanguageChange?.(langId);
  };

  const currentLanguage = PROGRAMMING_CODE_LANGUAGE_OPTIONS.find(
    l => l.id === selectedLanguage
  );
  const SelectedIcon = currentLanguage?.icon || Languages;

  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-1.5 rounded-md bg-slate-800/50 border border-slate-700/50
                         hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group"
      >
        <SelectedIcon className={`size-4 ${currentLanguage?.iconColor}`} />
        <span className="text-sm text-slate-300 group-hover:text-slate-200">
          {currentLanguage?.name || 'Select Language'}
        </span>
        <Code2 className="size-4 text-slate-500 group-hover:text-slate-400" />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-[9999] mt-2 w-48 rounded-md bg-slate-800/95 backdrop-blur-sm border border-slate-700
                             shadow-lg shadow-black/50 ring-1 ring-black ring-opacity-5 right-0 top-full"
        >
          <div
            className="py-1 max-h-[260px] overflow-y-auto
                                  scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800/50
                                  hover:scrollbar-thumb-slate-500 transition-colors duration-200"
          >
            {PROGRAMMING_CODE_LANGUAGE_OPTIONS.map(lang => {
              const Icon = lang.icon;
              return (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => handleLanguageSelect(lang.id)}
                  className={`flex items-center justify-between w-full px-4 py-2 text-sm transition-colors duration-300
                                              ${
                                                selectedLanguage === lang.id
                                                  ? 'bg-emerald-500/10 text-emerald-400'
                                                  : 'text-slate-300 hover:bg-slate-700/50 hover:text-slate-200'
                                              }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className={`size-4 ${lang.iconColor}`} />
                    <span>{lang.name}</span>
                  </div>
                  {selectedLanguage === lang.id && (
                    <Check className="size-4 text-emerald-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
