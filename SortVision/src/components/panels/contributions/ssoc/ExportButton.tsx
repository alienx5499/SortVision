'use client';

import { createPortal } from 'react-dom';
import {
  Download,
  FileSpreadsheet,
  Zap,
  AlertCircle,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import { useExportButtonController } from './useExportButtonController';

export default function ExportButton() {
  const {
    isExporting,
    exportProgress,
    exportStatus,
    showDropdown,
    buttonRef,
    dropdownPosition,
    handleFullExport,
    handleQuickExport,
    toggleDropdown,
  } = useExportButtonController();

  return (
    <>
      <div className="relative">
        <div className="relative group">
          <button
            ref={buttonRef}
            type="button"
            onClick={() => toggleDropdown()}
            disabled={isExporting}
            className={`
              relative overflow-hidden px-4 py-2 rounded-lg font-medium text-sm
              transition-all duration-300 border
              ${
                isExporting
                  ? 'bg-blue-600/20 border-blue-500/50 text-blue-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/50 text-green-300 hover:from-green-500/30 hover:to-emerald-500/30 hover:border-green-400/70 hover:text-green-200 hover:shadow-lg hover:shadow-green-500/25'
              }
              flex items-center gap-2
            `}
            title="Export leaderboard data"
          >
            {isExporting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Download className="size-4" />
            )}
            <span>{isExporting ? 'Exporting...' : 'Export Data'}</span>

            {!isExporting && (
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-400/20 to-green-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            )}
          </button>

          {isExporting && (
            <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300 rounded-full"
                style={{ width: `${exportProgress}%` }}
              />
            </div>
          )}
        </div>
      </div>

      {isExporting && exportStatus && (
        <div className="fixed top-4 right-4 z-[10000]">
          <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-lg p-3 text-xs text-gray-300 shadow-xl">
            <div className="flex items-center gap-2">
              <Loader2 className="size-3 animate-spin text-blue-400" />
              <span>{exportStatus}</span>
              <span className="ml-auto text-blue-400 font-medium">
                {Math.round(exportProgress)}%
              </span>
            </div>
          </div>
        </div>
      )}

      {showDropdown &&
        !isExporting &&
        createPortal(
          <div
            className="fixed z-[10001] w-80"
            data-export-dropdown
            style={{
              top: dropdownPosition.top,
              left: dropdownPosition.left,
            }}
          >
            <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-lg shadow-xl overflow-hidden">
              <button
                type="button"
                onClick={() => void handleFullExport()}
                className="w-full px-4 py-3 text-left hover:bg-gray-800/50 transition-colors duration-200 border-b border-gray-700/30"
              >
                <div className="flex items-start gap-3">
                  <FileSpreadsheet className="size-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-green-300 text-sm">
                      Full Export
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Complete data with issue numbers, PR links, and detailed
                      scores
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <AlertCircle className="size-3 text-yellow-500" />
                      <span className="text-xs text-yellow-400">
                        Takes 1-2 minutes (detailed API calls)
                      </span>
                    </div>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => void handleQuickExport()}
                className="w-full px-4 py-3 text-left hover:bg-gray-800/50 transition-colors duration-200"
              >
                <div className="flex items-start gap-3">
                  <Zap className="size-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-blue-300 text-sm">
                      Quick Export
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Basic leaderboard data with issue counts and scores
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <CheckCircle className="size-3 text-green-500" />
                      <span className="text-xs text-green-400">
                        Fast export (few seconds)
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
