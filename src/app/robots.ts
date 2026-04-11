import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/onboarding', '/welcome', '/signup'],
    },
    sitemap: 'https://missedcallai.co.uk/sitemap.xml',
  }
}