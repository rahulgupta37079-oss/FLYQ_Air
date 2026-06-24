'use client'
import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { PageHero } from '@/components/ui/section'
import { FAQS } from '@/lib/data'

export default function FaqPage() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')
  const cats = ['all', ...Array.from(new Set(FAQS.map(f => f.category)))]
  const list = useMemo(() => FAQS.filter(f =>
    (cat === 'all' || f.category === cat) &&
    (q === '' || f.q.toLowerCase().includes(q.toLowerCase()) || f.a.toLowerCase().includes(q.toLowerCase()))
  ), [q, cat])

  return (
    <>
      <PageHero eyebrow="Help Centre" title={<>Frequently <span className="grad-cyber">Asked Questions</span></>} sub="Product, programming, shipping, payments, DGCA, warranty and more." />
      <div className="max-w-4xl mx-auto px-5 -mt-4 mb-8">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-premium/40" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search FAQs…" className="w-full pl-9 pr-4 py-3 rounded-xl glass border border-border focus:border-cyber outline-none text-sm" />
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)} className={`px-3 py-1.5 rounded-full text-xs font-medium ${cat === c ? 'btn-cyber' : 'glass text-premium/70'}`}>{c === 'all' ? 'All' : c}</button>
          ))}
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-5 pb-20 space-y-3">
        {list.map((f, i) => (
          <details key={i} className="glass rounded-xl p-5 group">
            <summary className="font-semibold cursor-pointer list-none flex justify-between items-center gap-4">
              <span>{f.q}</span><span className="text-cyber group-open:rotate-45 transition shrink-0">+</span>
            </summary>
            <p className="text-premium/60 text-sm mt-3">{f.a}</p>
            <span className="inline-block mt-3 text-[10px] px-2 py-0.5 rounded-full bg-cyber/10 text-cyber">{f.category}</span>
          </details>
        ))}
        {list.length === 0 && <p className="text-center text-premium/50 py-10">No results. Try a different search.</p>}
      </div>
    </>
  )
}
