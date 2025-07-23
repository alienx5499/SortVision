/**
 * Export Service for SSOC Leaderboard
 * Handles exporting contributor data to Excel format
 */

import { fetchLeaderboardData } from './githubService';
import { GITHUB_API_CONFIG, POINTS_CONFIG } from './config';

/**
 * GitHub API helper function with authentication
 */
const fetchGitHubAPI = async (url) => {
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
  };
  
  // Add GitHub token if available
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  if (token && token.trim()) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }
  return response.json();
};

/**
 * Convert array of objects to CSV format
 */
const arrayToCSV = (data) => {
  if (!data || data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const csvHeaders = headers.join(',');
  
  const csvRows = data.map(row => 
    headers.map(header => {
      const value = row[header];
      // Escape quotes and wrap in quotes if contains comma, quote, or newline
      if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    }).join(',')
  );
  
  return [csvHeaders, ...csvRows].join('\n');
};

/**
 * Download file with given content
 */
const downloadFile = (content, filename, mimeType = 'text/csv') => {
  const blob = new Blob([content], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * Fetch detailed PR and issue information for a contributor
 * Using the SAME logic as the leaderboard githubService.js
 */
const fetchContributorDetails = async (githubId) => {
  try {
    console.log(`\n🔍 Fetching details for: ${githubId}`);
    
    // Use the exact same API call as the leaderboard
    const assignedIssues = await fetchGitHubAPI(
      `${GITHUB_API_CONFIG.BASE_URL}/repos/${GITHUB_API_CONFIG.REPO_OWNER}/${GITHUB_API_CONFIG.REPO_NAME}/issues?state=closed&assignee=${githubId}&per_page=100`
    );
    
    console.log(`📋 Closed issues assigned to ${githubId}: ${assignedIssues.length}`);
    
    // Filter and categorize using EXACT same logic as leaderboard
    let beginnerIssues = 0;
    let intermediateIssues = 0;
    let advancedIssues = 0;
    let totalPoints = 0;
    const userIssues = [];
    
    assignedIssues.forEach(issue => {
      if (!issue.pull_request) {  // Exclude PRs, same as leaderboard
        const labels = issue.labels.map(label => label.name);
        const labelNames = labels.join(', ');
        
        console.log(`  - Issue #${issue.number}: "${issue.title}" [${labelNames}]`);
        
        // EXACT same logic as leaderboard: must have 'SSoC25' label
        if (labels.includes('SSoC25')) {
          userIssues.push(issue);
          
          if (labels.includes('Beginner')) {
            beginnerIssues++;
            totalPoints += POINTS_CONFIG.Beginner;
            console.log(`    ✅ Beginner issue (+${POINTS_CONFIG.Beginner} points)`);
          } else if (labels.includes('Intermediate')) {
            intermediateIssues++;
            totalPoints += POINTS_CONFIG.Intermediate;
            console.log(`    ✅ Intermediate issue (+${POINTS_CONFIG.Intermediate} points)`);
          } else if (labels.includes('Advanced') || labels.includes('Advance')) {
            advancedIssues++;
            totalPoints += POINTS_CONFIG.Advanced;
            console.log(`    ✅ Advanced issue (+${POINTS_CONFIG.Advanced} points)`);
          } else {
            console.log(`    ⚠️ SSoC25 issue but no difficulty label`);
          }
        } else {
          console.log(`    ❌ Not an SSoC25 issue`);
        }
      }
    });
    
    console.log(`📊 Results for ${githubId}:`);
    console.log(`  - Beginner: ${beginnerIssues} issues (${beginnerIssues * POINTS_CONFIG.Beginner} points)`);
    console.log(`  - Intermediate: ${intermediateIssues} issues (${intermediateIssues * POINTS_CONFIG.Intermediate} points)`);
    console.log(`  - Advanced: ${advancedIssues} issues (${advancedIssues * POINTS_CONFIG.Advanced} points)`);
    console.log(`  - Total: ${totalPoints} points`);
    
    // Fetch PRs by the contributor that are SSOC-related
    let prs = [];
    try {
      const allPrs = await fetchGitHubAPI(
        `${GITHUB_API_CONFIG.BASE_URL}/repos/${GITHUB_API_CONFIG.REPO_OWNER}/${GITHUB_API_CONFIG.REPO_NAME}/pulls?creator=${githubId}&state=closed&per_page=100`
      );
      
      // Filter PRs that are:
      // 1. Merged
      // 2. Reference/close the user's assigned SSOC issues OR mention SSOC in title/body
      const ssocPrs = allPrs.filter(pr => {
        if (!pr.merged_at) return false; // Must be merged
        
        const title = (pr.title || '').toLowerCase();
        const body = (pr.body || '').toLowerCase();
        

        
        // Check if PR references any of the user's SSOC issues
        const issueNumbers = userIssues.map(issue => issue.number);
        const referencesIssue = issueNumbers.some(issueNum => {
          // Look for various ways PRs reference issues
          const patterns = [
            new RegExp(`#${issueNum}\\b`, 'i'),                    // Simple reference: #123
            new RegExp(`close[sd]?\\s+#${issueNum}\\b`, 'i'),      // closes #123
            new RegExp(`fix(es|ed)?\\s+#${issueNum}\\b`, 'i'),     // fixes #123
            new RegExp(`resolve[sd]?\\s+#${issueNum}\\b`, 'i'),    // resolves #123
            new RegExp(`address(es|ed)?\\s+#${issueNum}\\b`, 'i'), // addresses #123
            new RegExp(`implement[sd]?\\s+#${issueNum}\\b`, 'i')   // implements #123
          ];
          
          return patterns.some(pattern => 
            pattern.test(body) || pattern.test(title)
          );
        });
        
        if (referencesIssue) return true;
        
        // As a fallback, check if PR mentions SSOC in title or body
        const mentionsSSoc = title.includes('ssoc') || body.includes('ssoc') || 
                            title.includes('s4') || body.includes('s4');
        
        return mentionsSSoc;
      });
      prs = ssocPrs;
    } catch (error) {
      console.warn(`Failed to fetch PRs for ${githubId}:`, error);
    }
    
    return { 
      issues: userIssues, 
      prs,
      beginnerIssues,
      intermediateIssues,
      advancedIssues,
      totalPoints,
      totalIssues: userIssues.length
    };
  } catch (error) {
    console.error(`Error fetching details for ${githubId}:`, error);
    return { 
      issues: [], 
      prs: [],
      beginnerIssues: 0,
      intermediateIssues: 0,
      advancedIssues: 0,
      totalPoints: 0,
      totalIssues: 0
    };
  }
};



/**
 * Format only issues for display
 */
const formatIssuesOnly = (issues) => {
  if (issues.length === 0) return 'No issues';
  
  return issues.map(issue => `#${issue.number}`).join(', ');
};



/**
 * Format PR links - Generate GitHub search URL for user's PRs
 */
const formatPRLinks = (prs, githubUsername) => {
  if (prs.length === 0) return 'No PRs';
  
  // Generate GitHub search URL for this user's closed PRs
  const searchUrl = `https://github.com/${GITHUB_API_CONFIG.REPO_OWNER}/${GITHUB_API_CONFIG.REPO_NAME}/pulls?q=is%3Apr+is%3Aclosed+author%3A${githubUsername}`;
  
  return searchUrl;
};



/**
 * Export leaderboard data to Excel (CSV format)
 */
export const exportToExcel = async (onProgress) => {
  try {
    // Show initial progress
    if (onProgress) onProgress(0, 'Fetching leaderboard data...');
    
    // Fetch basic leaderboard data
    const participants = await fetchLeaderboardData();
    
    if (!participants || participants.length === 0) {
      alert('No data available to export');
      return;
    }
    
    // Filter participants with points > 0
    const activeParticipants = participants.filter(p => p.totalPoints > 0);
    
    if (onProgress) onProgress(20, 'Fetching detailed contributor information...');
    
    // Fetch detailed information for each contributor
    const detailedData = [];
    const total = activeParticipants.length;
    
    for (let i = 0; i < activeParticipants.length; i++) {
      const participant = activeParticipants[i];
      
      if (onProgress) {
        const progress = 20 + ((i / total) * 70);
        onProgress(progress, `Processing ${participant.contributorName}...`);
      }
      
      // Fetch detailed issues and PRs (now includes categorization and scoring)
      const contributorData = await fetchContributorDetails(participant.githubId);
      
      // Format data for export
      const exportData = {
        'Rank': i + 1,
        'Contributor Name': participant.contributorName,
        'GitHub Username': participant.githubId,
        'Issues Resolved': formatIssuesOnly(contributorData.issues),
        'PR Links': formatPRLinks(contributorData.prs, participant.githubId),
        'Beginner Issues Count': contributorData.beginnerIssues,
        'Intermediate Issues Count': contributorData.intermediateIssues,
        'Advanced Issues Count': contributorData.advancedIssues,
        'Beginner Score': contributorData.beginnerIssues * POINTS_CONFIG.Beginner,
        'Intermediate Score': contributorData.intermediateIssues * POINTS_CONFIG.Intermediate,
        'Advanced Score': contributorData.advancedIssues * POINTS_CONFIG.Advanced,
        'Total Score': contributorData.totalPoints,
        'Profile URL': `https://github.com/${participant.githubId}`,
        'Total Issues': contributorData.totalIssues,
        'Export Date': new Date().toISOString().split('T')[0]
      };
      
      detailedData.push(exportData);
      
      // Add small delay to avoid rate limiting
      if (i < activeParticipants.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    if (onProgress) onProgress(95, 'Generating Excel file...');
    
    // Sort by total score (descending)
    detailedData.sort((a, b) => b['Total Score'] - a['Total Score']);
    
    // Update ranks after sorting
    detailedData.forEach((data, index) => {
      data.Rank = index + 1;
    });
    
    // Convert to CSV
    const csvContent = arrayToCSV(detailedData);
    
    // Generate filename with current date
    const currentDate = new Date().toISOString().split('T')[0];
    const filename = `SSOC_S4_Leaderboard_Export_${currentDate}.csv`;
    
    // Download file
    downloadFile(csvContent, filename, 'text/csv');
    
    if (onProgress) onProgress(100, 'Export completed!');
    
    // Show success message
    setTimeout(() => {
      alert(`Export completed successfully!\n\nFile: ${filename}\nContributors: ${detailedData.length}\n\nThe file has been downloaded to your Downloads folder.`);
    }, 500);
    
    return detailedData;
    
  } catch (error) {
    console.error('Export failed:', error);
    alert('Export failed. Please try again or check your internet connection.');
    throw error;
  }
};

/**
 * Export quick summary (without detailed API calls)
 */
export const exportQuickSummary = async () => {
  try {
    const participants = await fetchLeaderboardData();
    
    if (!participants || participants.length === 0) {
      alert('No data available to export');
      return;
    }
    
    const activeParticipants = participants
      .filter(p => p.totalPoints > 0)
      .sort((a, b) => b.totalPoints - a.totalPoints);
    
    const summaryData = activeParticipants.map((participant, index) => ({
      'Rank': index + 1,
      'Contributor Name': participant.contributorName,
      'GitHub Username': participant.githubId,
      'Beginner Issues': participant.beginnerIssues,
      'Intermediate Issues': participant.intermediateIssues,
      'Advanced Issues': participant.advancedIssues,
      'Total Points': participant.totalPoints,
      'Profile URL': `https://github.com/${participant.githubId}`,
      'Export Date': new Date().toISOString().split('T')[0]
    }));
    
    const csvContent = arrayToCSV(summaryData);
    const currentDate = new Date().toISOString().split('T')[0];
    const filename = `SSOC_S4_Quick_Summary_${currentDate}.csv`;
    
    downloadFile(csvContent, filename, 'text/csv');
    
    alert(`Quick summary exported successfully!\n\nFile: ${filename}\nContributors: ${summaryData.length}`);
    
    return summaryData;
    
  } catch (error) {
    console.error('Quick export failed:', error);
    alert('Quick export failed. Please try again.');
    throw error;
  }
}; 