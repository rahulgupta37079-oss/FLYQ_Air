import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { BLOG_POSTS } from '@/lib/data'
import { SITE } from '@/lib/utils'

export function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = BLOG_POSTS.find(x => x.slug === params.slug)
  if (!p) return { title: 'Article' }
  return { title: p.title, description: p.excerpt, openGraph: { images: [p.cover], type: 'article' } }
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const p = BLOG_POSTS.find(x => x.slug === params.slug)
  if (!p) notFound()
  const more = BLOG_POSTS.filter(x => x.slug !== p.slug).slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.title,
    description: p.excerpt, image: SITE.url + p.cover, datePublished: p.date,
    author: { '@type': 'Organization', name: p.author },
    publisher: { '@type': 'Organization', name: SITE.brand },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="pt-28 pb-16 max-w-3xl mx-auto px-5">
        <nav className="text-sm text-premium/50 mb-6"><Link href="/blog" className="hover:text-cyber">Journal</Link> / <span className="text-premium">{p.category}</span></nav>
        <span className="text-xs text-cyber uppercase tracking-widest font-semibold">{p.category}</span>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-3">{p.title}</h1>
        <p className="text-premium/40 text-sm mt-4">{p.author} · {fmt(p.date)} · {p.readMins} min read</p>
        <img src={p.cover} alt={p.title} className="w-full rounded-2xl mt-8 object-cover max-h-96" />
        <div className="prose prose-invert mt-8 space-y-5">
          {p.body.map((para, i) => (
            <p key={i} className="text-premium/75 leading-relaxed" dangerouslySetInnerHTML={{ __html: para }} />
          ))}
        </div>
      </article>

      <section className="max-w-7xl mx-auto px-5 pb-20">
        <h2 className="text-xl font-bold mb-6">More from the Journal</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {more.map(m => (
            <Link key={m.slug} href={`/blog/${m.slug}`} className="glass rounded-2xl overflow-hidden card-hover">
              <img src={m.cover} alt={m.title} className="w-full h-36 object-cover" />
              <div className="p-4"><h3 className="font-bold text-sm">{m.title}</h3></div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
