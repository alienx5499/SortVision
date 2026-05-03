/**
 * CSV serialization and browser download (presentation-side I/O).
 */

export function arrayToCSV(
  data: Array<Record<string, string | number>>
): string {
  if (!data || data.length === 0) return '';

  const headerKeys = Object.keys(data[0]!);
  const csvHeaders = headerKeys.join(',');

  const csvRows = data.map(row =>
    headerKeys
      .map(header => {
        const value = row[header];
        if (
          typeof value === 'string' &&
          (value.includes(',') || value.includes('"') || value.includes('\n'))
        ) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      })
      .join(',')
  );

  return [csvHeaders, ...csvRows].join('\n');
}

export function downloadCsvFile(
  content: string,
  filename: string,
  mimeType = 'text/csv'
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
