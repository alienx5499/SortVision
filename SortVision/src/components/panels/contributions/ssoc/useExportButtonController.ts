import { useCallback, useEffect, useRef, useState } from 'react';
import { downloadCsvFile } from './export/leaderboardCsv';
import {
  runFullLeaderboardExport,
  runQuickLeaderboardExport,
} from './export/leaderboardExportPipeline';

const DROPDOWN_SELECTOR = '[data-export-dropdown]';

export function useExportButtonController() {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStatus, setExportStatus] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const handleFullExport = useCallback(async () => {
    setIsExporting(true);
    setExportProgress(0);
    setExportStatus('Starting export...');
    setShowDropdown(false);

    try {
      const result = await runFullLeaderboardExport((progress, status) => {
        setExportProgress(progress);
        setExportStatus(status);
      });

      if (result.status === 'empty') {
        alert('No data available to export');
        setIsExporting(false);
        setExportProgress(0);
        setExportStatus('');
        return;
      }

      downloadCsvFile(result.csv, result.filename);

      setTimeout(() => {
        alert(
          `Export completed successfully!\n\nFile: ${result.filename}\nContributors: ${result.rowCount}\n\nThe file has been downloaded to your Downloads folder.`
        );
      }, 500);

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
      const message = error instanceof Error ? error.message : String(error);
      alert('Export failed: ' + message);
    }
  }, []);

  const handleQuickExport = useCallback(async () => {
    setIsExporting(true);
    setExportProgress(50);
    setExportStatus('Generating quick summary...');
    setShowDropdown(false);

    try {
      const result = await runQuickLeaderboardExport();

      if (result.status === 'empty') {
        alert('No data available to export');
        setIsExporting(false);
        setExportProgress(0);
        setExportStatus('');
        return;
      }

      downloadCsvFile(result.csv, result.filename);

      alert(
        `Quick summary exported successfully!\n\nFile: ${result.filename}\nContributors: ${result.rowCount}`
      );

      setExportProgress(100);
      setExportStatus('Export completed!');

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
      const message = error instanceof Error ? error.message : String(error);
      alert('Quick export failed: ' + message);
    }
  }, []);

  useEffect(() => {
    if (showDropdown && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        left: rect.right - 320,
      });
    }
  }, [showDropdown]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (buttonRef.current && !buttonRef.current.contains(target)) {
        const dropdownElement = document.querySelector(DROPDOWN_SELECTOR);
        if (!dropdownElement || !dropdownElement.contains(target)) {
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

  const toggleDropdown = useCallback(() => {
    setShowDropdown(v => !v);
  }, []);

  return {
    isExporting,
    exportProgress,
    exportStatus,
    showDropdown,
    buttonRef,
    dropdownPosition,
    handleFullExport,
    handleQuickExport,
    toggleDropdown,
  };
}
