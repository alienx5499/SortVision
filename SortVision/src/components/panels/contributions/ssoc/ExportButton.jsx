import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Download,
  FileSpreadsheet,
  Zap,
  AlertCircle,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import { exportToExcel, exportQuickSummary } from './exportService';

const ExportButton = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStatus, setExportStatus] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const buttonRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const handleFullExport = async () => {
    console.log('Full Export button clicked!');
    setIsExporting(true);
    setExportProgress(0);
    setExportStatus('Starting export...');
    setShowDropdown(false);

    try {
      console.log('Starting full export...');
      await exportToExcel((progress, status) => {
        console.log(`Export progress: ${progress}% - ${status}`);
        setExportProgress(progress);
        setExportStatus(status);
      });

      console.log('Full export completed successfully!');

      // Reset after completion
      setTimeout(() => {
        setIsExporting(false);
        setExportProgress(0);
        setExportStatus('');
      }, 2000);
    } catch (error) {
      setIsExporting(false);
      setExportProgress(0);
      setExportStatus('');
      console.error('Export failed:', error);
      alert('Export failed: ' + error.message);
    }
  };

  const handleQuickExport = async () => {
    console.log('Quick Export button clicked!');
    setIsExporting(true);
    setExportProgress(50);
    setExportStatus('Generating quick summary...');
    setShowDropdown(false);

    try {
      console.log('Starting quick export...');
      await exportQuickSummary();

      setExportProgress(100);
      setExportStatus('Export completed!');
      console.log('Quick export completed successfully!');

      // Reset after completion
      setTimeout(() => {
        setIsExporting(false);
        setExportProgress(0);
        setExportStatus('');
      }, 2000);
    } catch (error) {
      setIsExporting(false);
      setExportProgress(0);
      setExportStatus('');
      console.error('Quick export failed:', error);
      alert('Quick export failed: ' + error.message);
    }
  };

  // Calculate dropdown position when showing
  useEffect(() => {
    if (showDropdown && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        left: rect.right - 320, // Align right edge of dropdown with button
      });
    }
  }, [showDropdown]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = event => {
      // Check if click is outside both the button and the dropdown
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        // Also check if click is not inside the portal dropdown
        const dropdownElement = document.querySelector(
          '[data-export-dropdown]'
        );
        if (!dropdownElement || !dropdownElement.contains(event.target)) {
          setShowDropdown(false);
        }
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showDropdown]);

  return (
    <>
      <div className="relative">
        {/* Export Button */}
        <div className="relative group">
          <button
            ref={buttonRef}
            onClick={() => setShowDropdown(!showDropdown)}
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
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>{isExporting ? 'Exporting...' : 'Export Data'}</span>

            {/* Animated background effect */}
            {!isExporting && (
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-400/20 to-green-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            )}
          </button>

          {/* Progress Bar */}
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

      {/* Export Status - Fixed position for visibility */}
      {isExporting && exportStatus && (
        <div className="fixed top-4 right-4 z-[10000]">
          <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-lg p-3 text-xs text-gray-300 shadow-xl">
            <div className="flex items-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin text-blue-400" />
              <span>{exportStatus}</span>
              <span className="ml-auto text-blue-400 font-medium">
                {Math.round(exportProgress)}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Portal-based Dropdown Menu */}
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
              {/* Full Export Option */}
              <button
                onClick={handleFullExport}
                className="w-full px-4 py-3 text-left hover:bg-gray-800/50 transition-colors duration-200 border-b border-gray-700/30"
              >
                <div className="flex items-start gap-3">
                  <FileSpreadsheet className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-green-300 text-sm">
                      Full Export
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Complete data with issue numbers, PR links, and detailed
                      scores
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <AlertCircle className="w-3 h-3 text-yellow-500" />
                      <span className="text-xs text-yellow-400">
                        Takes 1-2 minutes (detailed API calls)
                      </span>
                    </div>
                  </div>
                </div>
              </button>

              {/* Quick Export Option */}
              <button
                onClick={handleQuickExport}
                className="w-full px-4 py-3 text-left hover:bg-gray-800/50 transition-colors duration-200"
              >
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-blue-300 text-sm">
                      Quick Export
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Basic leaderboard data with issue counts and scores
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
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
};

export default ExportButton;
