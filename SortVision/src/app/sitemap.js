import { algorithms } from '../utils/seo'

// Ensure static generation for Next.js export mode
export const dynamic = 'force-static';

export default function sitemap() {
  const baseUrl = 'https://sortvision.vercel.app'
  const currentDate = new Date().toISOString()
  
  const routes = [
    // Homepage
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ]
  
  // Algorithm pages
  const algorithmNames = Object.keys(algorithms)
  const tabs = ['config', 'details', 'metrics']
  
  for (const algorithm of algorithmNames) {
    for (const tab of tabs) {
      const priority = tab === 'config' ? 0.9 : 0.8
      routes.push({
        url: `${baseUrl}/algorithms/${tab}/${algorithm}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority,
      })
    }
  }
  
  // Contribution pages
  const contributionPages = [
    { path: 'overview', priority: 0.7 },
    { path: 'guide', priority: 0.7 },
    { path: 'ssoc', priority: 0.7 },
  ]
  
  for (const page of contributionPages) {
    routes.push({
      url: `${baseUrl}/contributions/${page.path}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: page.priority,
    })
  }
  
  return routes
} 