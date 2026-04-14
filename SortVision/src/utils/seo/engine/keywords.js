export const buildKeywords = (
  label,
  algorithmKeywords = '',
  globalKeywords = []
) => {
  const intentKeywords = [
    `${label} sort`,
    `${label} sort explained`,
    `how ${label} sort works`,
    `${label} vs merge sort`,
    `${label} vs quick sort`,
    `${label} sort interview questions`,
    'best sorting algorithm',
    'sorting algorithm comparison',
    `${label} sort visualization`,
    `${label} sort animation`,
    `${label} sort time complexity`,
  ];

  return Array.from(
    new Set(
      [algorithmKeywords, ...intentKeywords, ...globalKeywords]
        .join(',')
        .split(',')
        .map(keyword => keyword.trim())
        .filter(Boolean)
    )
  ).join(', ');
};
