import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/utils'

export default function robots(): MetadataRoute.Robots {
  const adminSlug = SITE.adminSlug
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/account', '/checkout', `/${adminSlug}`, `/${adminSlug}/`],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
