import { ClientOnly } from './client'
import { getAlgorithmMetaTags, getHomepageMetaTags, getContributionsMetaTags, getSSOCMetaTags, algorithms } from '../../utils/seo'

// Generate metadata dynamically based on the route
export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const slug = resolvedParams.slug || []
  
  // Handle algorithm pages: /algorithms/{tab}/{algorithm}
  if (slug[0] === 'algorithms' && slug[2] && algorithms[slug[2]]) {
    const algorithm = slug[2]
    const tab = slug[1] || 'config'
    const metaTags = getAlgorithmMetaTags(algorithm)
    
    return {
      title: metaTags.title,
      description: metaTags.description,
      keywords: metaTags.keywords,
      authors: [{ name: 'alienX' }],
      robots: 'index, follow, noarchive, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      openGraph: {
        type: 'website',
        url: `https://sortvision.vercel.app/algorithms/${tab}/${algorithm}`,
        title: metaTags.ogTitle,
        description: metaTags.ogDescription,
        images: [
          {
            url: 'https://sortvision.vercel.app/og-image.png',
            width: 1200,
            height: 630,
            alt: `${algorithms[algorithm].name} Algorithm Visualization - SortVision`,
          },
        ],
        siteName: 'SortVision',
        locale: 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        title: metaTags.twitterTitle,
        description: metaTags.twitterDescription,
        images: ['https://sortvision.vercel.app/og-image.png'],
        creator: '@alienx5499',
        site: '@alienx5499',
      },
      alternates: {
        canonical: `https://sortvision.vercel.app/algorithms/${tab}/${algorithm}`,
      },
      other: {
        // Add structured data as meta tag for Next.js
        'script:ld+json': JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": `${algorithms[algorithm].name} Algorithm Visualization and Tutorial`,
            "description": metaTags.description,
            "keywords": metaTags.keywords,
            "author": {
              "@type": "Person",
              "name": "alienX",
              "url": "https://github.com/alienx5499"
            },
            "publisher": {
              "@type": "Organization",
              "name": "SortVision",
              "logo": {
                "@type": "ImageObject",
                "url": "https://sortvision.vercel.app/favicon.svg"
              }
            },
            "datePublished": "2024-03-26",
            "dateModified": new Date().toISOString(),
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://sortvision.vercel.app/algorithms/${tab}/${algorithm}`
            },
            "about": {
              "@type": "Thing",
              "name": algorithms[algorithm].name,
              "description": algorithms[algorithm].description
            },
            "educationalUse": "Interactive Visualization",
            "timeRequired": "PT10M"
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://sortvision.vercel.app/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": algorithms[algorithm].name,
                "item": `https://sortvision.vercel.app/algorithms/${tab}/${algorithm}`
              }
            ]
          }
        ])
      }
    }
  }
  
  // Handle contributions pages
  if (slug[0] === 'contributions') {
    const section = slug[1] || 'overview'
    const contributorId = slug[2] // For /contributions/overview/{contributorId}
    let metaTags
    
    if (section === 'ssoc') {
      metaTags = getSSOCMetaTags()
    } else if (section === 'overview' && contributorId) {
      // Custom metadata for contributor detail pages
      metaTags = {
        title: `${contributorId} - Contributor Profile | SortVision`,
        description: `View ${contributorId}'s contributions to SortVision. See their pull requests, issues, commits, and impact on our open-source sorting algorithm visualizer.`,
        keywords: `${contributorId}, contributor, open source, SortVision, GitHub profile, contributions, pull requests, commits`,
        ogTitle: `${contributorId} - SortVision Contributor`,
        ogDescription: `Explore ${contributorId}'s contributions to the SortVision project and their impact on algorithm education.`,
        twitterTitle: `${contributorId} - SortVision Contributor`,
        twitterDescription: `Check out ${contributorId}'s contributions to SortVision algorithm visualizer project.`
      }
    } else {
      metaTags = getContributionsMetaTags()
    }
    
    return {
      title: metaTags.title,
      description: metaTags.description,
      keywords: metaTags.keywords,
      authors: [{ name: 'alienX' }],
      robots: 'index, follow, noarchive, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      openGraph: {
        type: 'website',
        url: contributorId ? `https://sortvision.vercel.app/contributions/${section}/${contributorId}` : `https://sortvision.vercel.app/contributions/${section}`,
        title: metaTags.ogTitle,
        description: metaTags.ogDescription,
        images: [
          {
            url: 'https://sortvision.vercel.app/og-image.png',
            width: 1200,
            height: 630,
            alt: 'SortVision - Open Source Algorithm Visualizer',
          },
        ],
        siteName: 'SortVision',
        locale: 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        title: metaTags.twitterTitle,
        description: metaTags.twitterDescription,
        images: ['https://sortvision.vercel.app/og-image.png'],
        creator: '@alienx5499',
        site: '@alienx5499',
      },
      alternates: {
        canonical: contributorId ? `https://sortvision.vercel.app/contributions/${section}/${contributorId}` : `https://sortvision.vercel.app/contributions/${section}`,
      },
      other: {
        'script:ld+json': JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": metaTags.title,
          "description": metaTags.description,
          "url": contributorId ? `https://sortvision.vercel.app/contributions/${section}/${contributorId}` : `https://sortvision.vercel.app/contributions/${section}`,
          "author": {
            "@type": "Person",
            "name": "alienX"
          },
          "publisher": {
            "@type": "Organization",
            "name": "SortVision"
          },
          "dateModified": new Date().toISOString()
        })
      }
    }
  }
  
  // Default homepage metadata
  const metaTags = getHomepageMetaTags()
  return {
    title: metaTags.title,
    description: metaTags.description,
    keywords: metaTags.keywords,
    authors: [{ name: 'alienX' }],
    robots: 'index, follow, noarchive, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    openGraph: {
      type: 'website',
      url: 'https://sortvision.vercel.app/',
      title: metaTags.ogTitle,
      description: metaTags.ogDescription,
      images: [
        {
          url: 'https://sortvision.vercel.app/og-image.png',
          width: 1200,
          height: 630,
          alt: 'SortVision - Interactive Sorting Algorithm Visualizer for DSA Learning',
        },
      ],
      siteName: 'SortVision',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTags.twitterTitle,
      description: metaTags.twitterDescription,
      images: ['https://sortvision.vercel.app/og-image.png'],
      creator: '@alienx5499',
      site: '@alienx5499',
    },
    alternates: {
      canonical: 'https://sortvision.vercel.app/',
    },
    other: {
      'script:ld+json': JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "SortVision",
          "url": "https://sortvision.vercel.app",
          "applicationCategory": "EducationalApplication",
          "applicationSubCategory": "Algorithm Visualization",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": metaTags.description,
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "1247",
            "bestRating": "5",
            "worstRating": "1"
          },
          "creator": {
            "@type": "Person",
            "name": "alienX",
            "url": "https://github.com/alienx5499"
          },
          "screenshot": "https://sortvision.vercel.app/og-image.png",
          "featureList": [
            "Interactive Bubble Sort Visualization",
            "Interactive Insertion Sort Visualization", 
            "Interactive Selection Sort Visualization",
            "Interactive Merge Sort Visualization",
            "Interactive Quick Sort Visualization",
            "Interactive Heap Sort Visualization",
            "Interactive Radix Sort Visualization",
            "Real-time Performance Metrics",
            "Algorithm Comparison Tools",
            "Educational Content",
            "Step-by-step Animation",
            "Algorithm Complexity Analysis"
          ],
          "keywords": metaTags.keywords,
          "educationalUse": [
            "Computer Science Education",
            "Algorithm Learning", 
            "Data Structures and Algorithms",
            "Programming Education",
            "Coding Interview Preparation"
          ],
          "audience": {
            "@type": "EducationalAudience",
            "educationalRole": [
              "student",
              "teacher",
              "self-learner",
              "developer"
            ]
          },
          "sameAs": [
            "https://github.com/alienx5499/SortVision",
            "https://x.com/alienx5499"
          ]
        },
        {
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "SortVision",
          "url": "https://sortvision.vercel.app",
          "description": metaTags.description,
          "educationalCredentialAwarded": "Algorithm Visualization Knowledge",
          "hasOfferingCatalog": {
            "@type": "OfferingCatalog",
            "name": "Sorting Algorithm Visualizations",
            "itemListElement": Object.keys(algorithms).slice(0, 3).map(key => ({
              "@type": "Course",
              "name": `${algorithms[key].name} Visualization`,
              "description": `Interactive learning of ${algorithms[key].name} algorithm`,
              "url": `https://sortvision.vercel.app/algorithms/config/${key}`,
              "provider": {
                "@type": "Organization",
                "name": "SortVision",
                "url": "https://sortvision.vercel.app"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "category": "Educational Course"
              },
              "hasCourseInstance": {
                "@type": "CourseInstance",
                "courseMode": "Online",
                "courseWorkload": "PT30M",
                "instructor": {
                  "@type": "Person",
                  "name": "alienX"
                }
              }
            }))
          }
        }
      ])
    }
  }
}

// Generate static params for known routes (optional for better performance)
export async function generateStaticParams() {
  const params = []
  
  // Homepage
  params.push({ slug: [] })
  
  // Base routes
  params.push({ slug: ['algorithms'] })
  params.push({ slug: ['contributions'] })
  
  // Generate params for algorithm pages
  const algorithmNames = Object.keys(algorithms)
  const tabs = ['config', 'details', 'metrics']
  
  for (const algorithm of algorithmNames) {
    // Individual algorithm pages without tab
    params.push({ slug: ['algorithms', algorithm] })
    
    // Algorithm pages with tabs
    for (const tab of tabs) {
      params.push({ slug: ['algorithms', tab, algorithm] })
    }
  }
  
  // Generate params for contribution pages
  const contributionSections = ['overview', 'guide', 'ssoc']
  for (const section of contributionSections) {
    params.push({ slug: ['contributions', section] })
  }
  
  // Add contributor detail pages (we can't pre-generate all usernames, but we'll add a few common ones)
  const commonContributors = ['alienx5499', 'dependabot[bot]', 'github-actions[bot]']
  for (const contributor of commonContributors) {
    params.push({ slug: ['contributions', 'overview', contributor] })
  }
  
  // Add common system paths to prevent build errors
  params.push({ slug: ['.well-known', 'appspecific', 'com.chrome.devtools.json'] })
  params.push({ slug: ['favicon.ico'] })
  params.push({ slug: ['api', 'gemini'] })
  
  return params
}

export default function Page({ params }) {
  return <ClientOnly />
} 