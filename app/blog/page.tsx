import Link from 'next/link'
import { PageHero, Section } from '@/components/ui/section'
import { BLOG_POSTS } from '@/lib/data'

export const metadata = { title: 'Blog', description: 'Engineering notes, education stories and product updates from the FLYQ team.' }

function fmt(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function Blog() {
  const [featured, ...rest] = BLOG_POSTS
  return (
    <>
      <PageHero eyebrow="From the workshop" title={<>FLYQ <span className="grad-cyber">Journal</span></>} sub="Engineering deep-dives, classroom stories and product updates — written by the people building the platform." />
      <Section className="py-12">
        {featured && (
          <Link href={`/blog/${featured.slug}`} className="block glass rounded-3xl overflow-hidden card-hover mb-10 grid md:grid-cols-2">
            <img src={featured.cover} alt={featured.title} className="w-full h-64 md:h-full object-cover" />
            <div className="p-8 flex flex-col justify-center">
              <span className="text-xs text-cyber uppercase tracking-widest font-semibold">{featured.category} · Featured</span>
              <h2 className="text-2xl md:text-3xl font-extrabold mt-3">{featured.title}</h2>
              <p className="text-premium/60 mt-3">{featured.excerpt}</p>
              <p className="text-premium/40 text-sm mt-4">{featured.author} · {fmt(featured.date)} · {featured.readMins} min read</p>
            </div>
          </Link>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map(p => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="glass rounded-2xl overflow-hidden card-hover flex flex-col">
              <img src={p.cover} alt={p.title} className="w-full h-44 object-cover" />
              <div className="p-5 flex-1 flex flex-col">
                <span className="text-xs text-cyber uppercase tracking-widest font-semibold">{p.category}</span>
                <h3 className="font-bold text-lg mt-2">{p.title}</h3>
                <p className="text-premium/55 text-sm mt-2 flex-1">{p.excerpt}</p>
                <p className="text-premium/40 text-xs mt-4">{fmt(p.date)} · {p.readMins} min read</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}
