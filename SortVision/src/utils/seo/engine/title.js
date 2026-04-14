export const buildTitle = ({ label, tab }) => {
  const titleMap = {
    config: `${label} Sort Visualization with Step-by-Step Animation`,
    details: `${label} Sort Explained with Examples and Interview Tips`,
    metrics: `${label} Sort Time Complexity Chart (Best, Average, Worst)`,
  };

  return `${titleMap[tab] || titleMap.config} | SortVision`;
};
