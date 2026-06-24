'use client'
import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { PageHero } from '@/components/ui/section'
import ProductCard from '@/components/product-card'
import { PRODUCTS, CATEGORIES } from '@/lib/data'

function Catalog() {
  const params = useSearchParams()
  const initialCat = params.get('cat') || 'all'
  const [cat, setCat] = useState(initialCat)
  const [q, setQ] = useState('')

  const list = useMemo(() => {
    return PRODUCTS.filter(p =>
      (cat === 'all' || p.category === cat) &&
      (q === '' || p.name.toLowerCase().includes(q.toLowerCase()) || p.short.toLowerCase().includes(q.toLowerCase()))
    )
  }, [cat, q])

  return (
    <>
      <div className="max-w-7xl mx-auto px-5 -mt-6 mb-8">
        <div className="glass rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-premium/40" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search products…" className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-ink border border-border focus:border-cyber outline-none text-sm" />
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setCat('all')} className={`px-4 py-2 rounded-full text-sm font-medium ${cat === 'all' ? 'btn-cyber' : 'glass text-premium/70'}`}>All</button>
            {CATEGORIES.map(c => (
              <button key={c.slug} onClick={() => setCat(c.slug)} className={`px-4 py-2 rounded-full text-sm font-medium ${cat === c.slug ? 'btn-cyber' : 'glass text-premium/70'}`}>{c.name}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-5 pb-20">
        <p className="text-premium/50 text-sm mb-5">{list.length} product{list.length !== 1 && 's'}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {list.map(p => <ProductCard key={p.slug} p={p} />)}
        </div>
      </div>
    </>
  )
}

export default function ProductsPage() {
  return (
    <>
      <PageHero eyebrow="The FLYQ Catalog" title={<>Build your <span className="grad-cyber">fleet</span></>} sub="23 SKUs across Education, Agriculture, Payloads, FPV, Tethered, Parts and Accessories." />
      <Suspense fallback={<div className="text-center py-20 text-premium/50">Loading…</div>}>
        <Catalog />
      </Suspense>
    </>
  )
}
