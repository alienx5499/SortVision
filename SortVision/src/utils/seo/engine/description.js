export const buildDescription = ({ label, tab }) => {
  if (tab === 'details') {
    return `Learn how ${label} sort works with step-by-step explanation, edge cases, and real interview insights.`;
  }

  if (tab === 'metrics') {
    return `${label} sort time complexity explained with best, worst, and average cases, plus when to use it.`;
  }

  return `Interactive ${label} sort visualization with real-time animation and step-by-step breakdown.`;
};
