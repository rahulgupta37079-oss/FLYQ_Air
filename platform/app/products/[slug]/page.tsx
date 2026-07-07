import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Truck, ShieldCheck, MessageCircle, FileText, Package } from 'lucide-react'
import { PRODUCTS, productImage } from '@/lib/data'
import { inr, waLink, SITE } from '@/lib/utils'
import AddToCart from '@/components/add-to-cart'
import ProductCard from '@/components/product-card'

export function generateStaticParams() {
  return PRODUCTS.map(p => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = PRODUCTS.find(x => x.slug === params.slug)
  if (!p) return { title: 'Product' }
  return { title: p.name, description: p.short, openGraph: { images: [productImage(p.slug)] } }
}

export default function ProductDetail({ params }: { params: { slug: string } }) {
  const p = PRODUCTS.find(x => x.slug === params.slug)
  if (!p) notFound()
  const related = PRODUCTS.filter(x => x.category === p.category && x.slug !== p.slug).slice(0, 4)
  const emi = Math.round(p.price / 12)

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Product', name: p.name, description: p.short,
    image: SITE.url + productImage(p.slug), brand: { '@type': 'Brand', name: 'FLYQ' },
    offers: { '@type': 'Offer', price: p.price, priceCurrency: 'INR', availability: p.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="pt-24" />
      <div className="max-w-7xl mx-auto px-5">
        <nav className="text-sm text-premium/50 mb-6"><Link href="/products" className="hover:text-cyber">Products</Link> / <span className="capitalize">{p.category}</span> / <span className="text-premium">{p.name}</span></nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* gallery */}
          <div>
            <div className="glass rounded-3xl overflow-hidden aspect-square bg-black/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={productImage(p.slug)} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3">
              {[productImage(p.slug), `/images/products/${p.slug}-2.jpg`, `/images/products/${p.slug}-3.jpg`].map((src, i) => (
                <div key={i} className="glass rounded-xl aspect-square overflow-hidden opacity-70 hover:opacity-100 transition">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`${p.name} view ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* info */}
          <div>
            <span className="px-3 py-1 rounded-full glass text-xs capitalize text-cyber">{p.category}</span>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-3">{p.name}</h1>
            <p className="text-premium/60 mt-3">{p.short}</p>

            <div className="flex items-end gap-3 mt-6">
              <span className="text-4xl font-extrabold grad-cyber">{inr(p.price)}</span>
              {p.mrp > p.price && <span className="text-premium/40 line-through mb-1">{inr(p.mrp)}</span>}
            </div>
            <p className="text-premium/50 text-sm mt-1">or EMI from <b className="text-premium">{inr(emi)}/mo</b> · Incl. GST · GST invoice provided</p>
            <p className={`text-sm mt-2 ${p.stock > 0 ? 'text-signal' : 'text-danger'}`}>{p.stock > 0 ? `In stock (${p.stock} available)` : 'Out of stock'}</p>

            <div className="flex flex-wrap gap-3 mt-6">
              <AddToCart slug={p.slug} name={p.name} price={p.price} />
              <a href={waLink(`Hi FLYQ, I'm interested in ${p.name}.`)} target="_blank" rel="noopener noreferrer" className="px-6 py-3.5 rounded-xl glass font-semibold flex items-center gap-2 hover:text-cyber transition"><MessageCircle size={18} /> Talk to expert</a>
            </div>
            <Link href="/bulk-orders" className="inline-block mt-3 text-sm text-cyber">Need bulk quantities? Get a bulk quote →</Link>

            {/* features */}
            <div className="mt-7 grid grid-cols-2 gap-2">
              {p.features.map(f => <span key={f} className="text-sm flex items-center gap-2 text-premium/70"><span className="w-1.5 h-1.5 rounded-full bg-cyber" />{f}</span>)}
            </div>

            <div className="grid grid-cols-3 gap-3 mt-7 text-center text-xs">
              <div className="glass rounded-xl p-3"><Truck className="mx-auto text-cyber mb-1" size={18} />Free shipping ₹5k+</div>
              <div className="glass rounded-xl p-3"><ShieldCheck className="mx-auto text-cyber mb-1" size={18} />1-yr warranty</div>
              <div className="glass rounded-xl p-3"><FileText className="mx-auto text-cyber mb-1" size={18} />GST invoice</div>
            </div>
          </div>
        </div>

        {/* specs + box */}
        <div className="grid lg:grid-cols-2 gap-8 mt-16">
          <div className="glass rounded-2xl p-7">
            <h2 className="font-bold text-lg mb-4">Specifications</h2>
            <dl className="divide-y divide-border text-sm">
              {Object.entries(p.specs).map(([k, v]) => (
                <div key={k} className="flex justify-between py-2.5"><dt className="text-premium/50">{k}</dt><dd className="font-medium">{v}</dd></div>
              ))}
            </dl>
          </div>
          <div className="glass rounded-2xl p-7">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><Package size={18} className="text-cyber" /> What's in the box</h2>
            <ul className="space-y-2 text-sm text-premium/70">
              {p.box.map(b => <li key={b} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-signal" />{b}</li>)}
            </ul>
          </div>
        </div>

        {/* reviews placeholder */}
        <div className="glass rounded-2xl p-7 mt-8">
          <h2 className="font-bold text-lg mb-2">Reviews</h2>
          <p className="text-premium/50 text-sm">Verified-buyer reviews appear here. Logged-in customers can submit a rating, title, review and photo from their account.</p>
        </div>

        {/* related */}
        {related.length > 0 && (
          <div className="mt-16 pb-20">
            <h2 className="text-2xl font-extrabold mb-6">Related products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(r => <ProductCard key={r.slug} p={r} />)}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
