'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { PageHero } from '@/components/ui/section'
import { WORKSHOPS } from '@/lib/data'
import { inr } from '@/lib/utils'

export default function WorkshopsPage() {
  const [city, setCity] = useState('all')
  const [type, setType] = useState('all')
  const [level, setLevel] = useState('all')

  const cities = ['all', ...Array.from(new Set(WORKSHOPS.map(w => w.city)))]
  const types = ['all', ...Array.from(new Set(WORKSHOPS.map(w => w.type)))]
  const levels = ['all', ...Array.from(new Set(WORKSHOPS.map(w => w.level)))]

  const list = useMemo(() => WORKSHOPS.filter(w =>
    (city === 'all' || w.city === city) &&
    (type === 'all' || w.type === type) &&
    (level === 'all' || w.level === level)
  ), [city, type, level])

  return (
    <>
      <PageHero eyebrow="Workshops & Events" title={<>Learn to fly <span className="grad-cyber">across India</span></>} sub="Hands-on drone building, programming and DGCA prep in cities nationwide." />
      <div className="max-w-7xl mx-auto px-5 -mt-4 mb-8">
        <div className="glass rounded-2xl p-4 grid sm:grid-cols-3 gap-4">
          <Select label="City" value={city} onChange={setCity} options={cities} />
          <Select label="Type" value={type} onChange={setType} options={types} />
          <Select label="Level" value={level} onChange={setLevel} options={levels} />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-5 pb-20">
        <p className="text-premium/50 text-sm mb-5">{list.length} event{list.length !== 1 && 's'}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map(w => (
            <Link key={w.slug} href={`/workshops/${w.slug}`} className="glass rounded-2xl p-6 card-hover">
              <div className="flex items-center justify-between text-xs">
                <span className="text-premium/50">{new Date(w.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                <span className="px-2 py-0.5 rounded-full bg-cyber/10 text-cyber">{w.level}</span>
              </div>
              <h3 className="font-bold mt-3">{w.title}</h3>
              <p className="text-premium/55 text-sm mt-1">{w.city} · {w.venue}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="font-semibold grad-cyber">{w.fee ? inr(w.fee) : 'Free'}</span>
                <span className="text-xs text-premium/50">{w.seats} seats</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="block text-sm">
      <span className="text-premium/60">{label}</span>
      <select value={value} onChange={e => onChange(e.target.value)} className="mt-1 w-full px-4 py-2.5 rounded-lg bg-ink border border-border focus:border-cyber outline-none capitalize">
        {options.map(o => <option key={o} value={o}>{o === 'all' ? 'All' : o}</option>)}
      </select>
    </label>
  )
}
