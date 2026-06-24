'use client'
import { useTransition } from 'react'
import { setLeadStatus } from '@/lib/admin/actions'

const STAGES = ['new', 'contacted', 'qualified', 'won', 'lost']

export default function LeadCard({ table, lead, title, lines }: {
  table: string; lead: any; title: string; lines: string[]
}) {
  const [pending, start] = useTransition()
  return (
    <div className="glass rounded-xl p-4 mb-3">
      <div className="font-semibold text-sm">{title}</div>
      {lines.filter(Boolean).map((l, i) => <div key={i} className="text-premium/50 text-xs mt-0.5">{l}</div>)}
      <select
        defaultValue={lead.status || 'new'}
        disabled={pending}
        onChange={e => start(() => { setLeadStatus(table, lead.id, e.target.value) })}
        className="mt-3 w-full px-2 py-1.5 rounded-lg bg-slatedeep border border-border text-xs capitalize focus:border-cyber outline-none"
      >
        {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
    </div>
  )
}
