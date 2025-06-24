// branchUtils.js
export function trackBranchPrediction(decisions) {
  let accurate = 0;
  const total = decisions.length;
  
  // Simple simulation - real implementation would need actual branch data
  const baseAccuracy = 0.85;
  
  for (let i = 0; i < total; i++) {
    if (Math.random() < baseAccuracy) {
      accurate++;
    }
  }
  
  return { accurate, total };
}