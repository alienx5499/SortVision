import { GITHUB_API_CONFIG, EXCLUDED_USERS, POINTS_CONFIG } from './config';

export const fetchGitHubData = async (endpoint) => {
  const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    ...(GITHUB_TOKEN && GITHUB_TOKEN.trim() && { 'Authorization': `Bearer ${GITHUB_TOKEN}` })
  };
  
  const response = await fetch(`${GITHUB_API_CONFIG.BASE_URL}${endpoint}`, { headers });
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }
  return response.json();
};

export const fetchParticipantIssues = async (username) => {
  try {
    // Fetch issues assigned to the user (solved bugs)
    const assignedIssues = await fetchGitHubData(
      `/repos/${GITHUB_API_CONFIG.REPO_OWNER}/${GITHUB_API_CONFIG.REPO_NAME}/issues?state=closed&assignee=${username}&per_page=100`
    );

    // Fetch issues created by the user (reported bugs)
    const createdIssues = await fetchGitHubData(
      `/repos/${GITHUB_API_CONFIG.REPO_OWNER}/${GITHUB_API_CONFIG.REPO_NAME}/issues?state=all&creator=${username}&per_page=100`
    );

    let beginnerIssues = 0;
    let intermediateIssues = 0;
    let advancedIssues = 0;
    let totalPoints = 0;
    let uniqueLabels = new Set();
    let issueTypes = new Set();
    let firstIssueDate = null;
    let lastIssueDate = null;
    let bugsSolved = 0;
    let bugsReported = 0;
    let hasCompletedIn24Hours = false;

    // Process assigned issues (solved)
    assignedIssues.forEach(issue => {
      if (!issue.pull_request) {
        const labels = issue.labels.map(label => label.name);
        labels.forEach(label => uniqueLabels.add(label));
        
        // Track issue types
        const type = labels.find(l => ['bug', 'feature', 'enhancement', 'documentation'].includes(l.toLowerCase()));
        if (type) {
          issueTypes.add(type.toLowerCase());
          if (type.toLowerCase() === 'bug') {
            bugsSolved++;
          }
        }

        // Check if issue was completed within 24 hours
        if (issue.closed_at && issue.created_at) {
          const createdAt = new Date(issue.created_at);
          const closedAt = new Date(issue.closed_at);
          const timeDifferenceHours = (closedAt - createdAt) / (1000 * 60 * 60); // Convert to hours
          
          if (timeDifferenceHours <= 24) {
            hasCompletedIn24Hours = true;
          }
        }

        // Track first and last issue dates
        if (!firstIssueDate || new Date(issue.created_at) < new Date(firstIssueDate)) {
          firstIssueDate = issue.created_at;
        }
        if (!lastIssueDate || new Date(issue.closed_at) > new Date(lastIssueDate)) {
          lastIssueDate = issue.closed_at;
        }
        
        if (labels.includes('SSOC S4')) {
          if (labels.includes('Beginner')) {
            beginnerIssues++;
            totalPoints += POINTS_CONFIG.Beginner;
          } else if (labels.includes('Intermediate')) {
            intermediateIssues++;
            totalPoints += POINTS_CONFIG.Intermediate;
          } else if (labels.includes('Advanced') || labels.includes('Advance')) {
            advancedIssues++;
            totalPoints += POINTS_CONFIG.Advanced;
          }
        }
      }
    });

    // Process created issues (reported)
    createdIssues.forEach(issue => {
      if (!issue.pull_request) {
        const labels = issue.labels.map(label => label.name);
        if (labels.some(label => label.toLowerCase() === 'bug')) {
          bugsReported++;
        }
      }
    });

    return {
      beginnerIssues,
      intermediateIssues,
      advancedIssues,
      totalPoints,
      totalIssues: beginnerIssues + intermediateIssues + advancedIssues,
      uniqueLabels: Array.from(uniqueLabels),
      issueTypes: Array.from(issueTypes),
      firstIssueDate,
      lastIssueDate,
      bugsSolved,
      bugsReported,
      hasCompletedIn24Hours
    };
  } catch (error) {
    console.error(`Error fetching issues for ${username}:`, error);
    return {
      beginnerIssues: 0,
      intermediateIssues: 0,
      advancedIssues: 0,
      totalPoints: 0,
      totalIssues: 0,
      uniqueLabels: [],
      issueTypes: [],
      firstIssueDate: null,
      lastIssueDate: null,
      bugsSolved: 0,
      bugsReported: 0,
      hasCompletedIn24Hours: false
    };
  }
};

export const fetchLeaderboardData = async () => {
  try {
    // Fetch traditional contributors
    const contributors = await fetchGitHubData(
      `/repos/${GITHUB_API_CONFIG.REPO_OWNER}/${GITHUB_API_CONFIG.REPO_NAME}/contributors?per_page=100`
    );

    // Fetch all closed SSOC issues to find assignees who might not be in contributors
    // Handle pagination to get ALL SSOC issues, not just first 100
    let allSsocIssues = [];
    let page = 1;
    let hasMorePages = true;
    
    while (hasMorePages) {
      const ssocIssuesPage = await fetchGitHubData(
        `/repos/${GITHUB_API_CONFIG.REPO_OWNER}/${GITHUB_API_CONFIG.REPO_NAME}/issues?state=closed&labels=SSOC S4&per_page=100&page=${page}`
      );
      
      if (ssocIssuesPage.length > 0) {
        allSsocIssues = allSsocIssues.concat(ssocIssuesPage);
        page++;
        // Stop if we got less than 100 issues (last page)
        if (ssocIssuesPage.length < 100) {
          hasMorePages = false;
        }
      } else {
        hasMorePages = false;
      }
    }
    
    console.log(`📊 Fetched ${allSsocIssues.length} total SSOC S4 issues across ${page - 1} pages`);

    // Extract unique assignees from SSOC issues
    const ssocAssignees = new Set();
    allSsocIssues.forEach(issue => {
      if (issue.assignee && !issue.pull_request) {
        ssocAssignees.add(issue.assignee.login);
      }
      // Also check for multiple assignees
      if (issue.assignees && issue.assignees.length > 0) {
        issue.assignees.forEach(assignee => {
          ssocAssignees.add(assignee.login);
        });
      }
    });

    console.log(`👥 Found ${ssocAssignees.size} unique SSOC assignees:`, Array.from(ssocAssignees).slice(0, 10), '...');

    // Combine contributors and SSOC assignees, removing duplicates
    const allParticipants = new Set();
    
    // Add contributors
    contributors.forEach(contributor => {
      if (!EXCLUDED_USERS.includes(contributor.login.toLowerCase())) {
        allParticipants.add(contributor.login);
      }
    });
    
    // Add SSOC assignees (even if they're not in contributors list)
    ssocAssignees.forEach(assignee => {
      if (!EXCLUDED_USERS.includes(assignee.toLowerCase())) {
        allParticipants.add(assignee);
      }
    });

    const participantPromises = Array.from(allParticipants).map(async (username) => {
      try {
        const [profile, issueStats] = await Promise.all([
          fetchGitHubData(`/users/${username}`),
          fetchParticipantIssues(username)
        ]);

        // Calculate achievements based on the fetched data
        const achievements = {
          // Existing achievements
          completedIn24Hours: issueStats.hasCompletedIn24Hours,
          solvedBugs: issueStats.bugsSolved > 0,
          reportedBugs: issueStats.bugsReported > 0,
          helpedOthers: false,
          hasStreakOfFiveDays: false,
          hasReviewedPRs: false,
          improvedDocs: issueStats.issueTypes.includes('documentation'),
          
          // Progress-based achievements (based on total issues solved)
          hasFirstStep: issueStats.totalIssues === 1,
          isNewcomer: issueStats.totalIssues >= 2,
          isRisingStar: issueStats.totalIssues >= 5,
          isCommittedContributor: issueStats.totalIssues >= 10,
          isSeasonedDeveloper: issueStats.totalIssues >= 15,
          isVeteranContributor: issueStats.totalIssues >= 20,
          
          // Other achievements
          isDiverseContributor: issueStats.issueTypes.length >= 3
        };

        return {
          contributorName: profile.name || username,
          githubId: username,
          discordId: 'N/A',
          avatarUrl: profile.avatar_url,
          achievements,
          bugsSolved: issueStats.bugsSolved,
          bugsReported: issueStats.bugsReported,
          ...issueStats
        };
      } catch (error) {
        console.error(`Error fetching data for ${username}:`, error);
        return null;
      }
    });

    const participantData = (await Promise.all(participantPromises))
      .filter(participant => participant !== null)
      .sort((a, b) => b.totalPoints - a.totalPoints);
      
    return participantData;
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    return [];
  }
}; 