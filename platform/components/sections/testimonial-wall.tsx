'use client'
import { useState } from 'react'
import { Check, Mic } from 'lucide-react'
import { TESTIMONIALS, type Testimonial } from '@/lib/data'

const CHIPS = [
  { key: 'all', label: 'All' },
  { key: 'farmer', label: 'Farmers' },
  { key: 'student', label: 'Students' },
  { key: 'educator', label: 'Educators' },
  { key: 'fpv', label: 'FPV' },
  { key: 'enterprise', label: 'Enterprise' },
  { key: 'researcher', label: 'Researchers' },
  { key: 'dealer', label: 'Dealers' },
]

function initials(name: string) {
  return name.split(' ').slice(0, 2).map(s => s[0]).join('').toUpperCase()
}

function Bubble({ t }: { t: Testimonial }) {
  return (
    <div className="min-w-[300px] max-w-[320px] rounded-2xl overflow-hidden shadow-lg flex flex-col" style={{ background: '#ECE5DD' }}>
      {/* header */}
      <div className="flex items-center gap-3 px-4 py-3" style={{ background: '#075E54' }}>
        <div className="w-10 h-10 rounded-full grid place-items-center font-bold text-white" style={{ background: '#128C7E' }}>{initials(t.name)}</div>
        <div className="leading-tight">
          <div className="text-white font-semibold text-sm flex items-center gap-1">{t.name} <Check size={13} className="text-sky-300" /></div>
          <div className="text-white/70 text-xs">{t.role} · {t.city}</div>
        </div>
      </div>
      {/* chat area */}
      <div className="p-4 flex-1" style={{ background: '#ECE5DD' }}>
        <div className="rounded-xl rounded-tr-sm px-3 py-2 ml-auto max-w-[95%] text-[#111]" style={{ background: '#DCF8C6' }}>
          {t.voice ? (
            <div className="flex items-center gap-2">
              <Mic size={16} className="text-[#075E54]" />
              <div className="flex items-end gap-0.5 h-5">
                {Array.from({ length: 18 }).map((_, i) => (
                  <span key={i} className="w-0.5 rounded-full" style={{ height: `${4 + ((i * 7) % 16)}px`, background: '#075E54', opacity: 0.55 }} />
                ))}
              </div>
              <span className="text-xs text-[#075E54] font-mono">0:{String(t.voice).padStart(2, '0')}</span>
            </div>
          ) : (
            <p className="text-sm leading-relaxed">{t.message}</p>
          )}
          <div className="flex items-center justify-end gap-1 mt-1">
            <span className="text-[10px] text-[#667781]">{t.ts}</span>
            <Check size={13} className="text-sky-500 -mr-2" />
            <Check size={13} className="text-sky-500" />
          </div>
        </div>
        <button className="mt-3 text-[11px] text-[#075E54] underline">View original screenshot</button>
      </div>
    </div>
  )
}

export default function TestimonialWall() {
  const [filter, setFilter] = useState('all')
  const list = filter === 'all' ? TESTIMONIALS : TESTIMONIALS.filter(t => t.segment === filter)
  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {CHIPS.map(c => (
          <button
            key={c.key}
            onClick={() => setFilter(c.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${filter === c.key ? 'btn-cyber' : 'glass text-premium/70 hover:text-cyber'}`}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="flex gap-5 overflow-x-auto pb-6 snap-x" style={{ scrollbarWidth: 'thin' }}>
        {list.map((t, i) => (
          <div key={i} className="snap-start"><Bubble t={t} /></div>
        ))}
      </div>
    </div>
  )
}
