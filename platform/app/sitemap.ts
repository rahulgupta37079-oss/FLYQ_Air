import type { MetadataRoute } from 'next'
import { PRODUCTS, WORKSHOPS, BLOG_POSTS } from '@/lib/data'
import { SITE } from '@/lib/utils'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url
  const now = new Date()
  const staticPaths = [
    '', '/products', '/cart', '/stem-lab', '/stem-lab/drone-soccer', '/workshops',
    '/curriculum', '/docs', '/blog', '/about', '/contact', '/dealers', '/bulk-orders',
    '/training', '/gallery', '/testimonials', '/faq', '/terms', '/privacy', '/refund',
    '/shipping', '/warranty', '/login', '/register',
  ]
  const entries: MetadataRoute.Sitemap = staticPaths.map(p => ({
    url: `${base}${p}`, lastModified: now, changeFrequency: 'weekly', priority: p === '' ? 1 : 0.7,
  }))
  for (const p of PRODUCTS) entries.push({ url: `${base}/products/${p.slug}`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 })
  for (const w of WORKSHOPS) entries.push({ url: `${base}/workshops/${w.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 })
  for (const b of BLOG_POSTS) entries.push({ url: `${base}/blog/${b.slug}`, lastModified: new Date(b.date), changeFrequency: 'monthly', priority: 0.6 })
  return entries
}
