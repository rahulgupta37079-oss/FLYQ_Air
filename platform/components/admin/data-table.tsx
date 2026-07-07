'use client'
import { useState, useMemo } from 'react'

export type Col = { key: string; label: string; render?: (row: any) => React.ReactNode; className?: string }

export default function DataTable({ rows, cols, searchKeys, empty = 'No records yet.' }: {
  rows: any[]; cols: Col[]; searchKeys?: string[]; empty?: string
}) {
  const [q, setQ] = useState('')
  const filtered = useMemo(() => {
    if (!q || !searchKeys?.length) return rows
    const t = q.toLowerCase()
    return rows.filter(r => searchKeys.some(k => String(r[k] ?? '').toLowerCase().includes(t)))
  }, [rows, q, searchKeys])

  return (
    <div>
      {searchKeys?.length ? (
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search…"
          className="mb-4 w-full max-w-xs px-4 py-2 rounded-lg bg-slatedeep border border-border focus:border-cyber outline-none text-sm" />
      ) : null}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-premium/50">
                {cols.map(c => <th key={c.key} className="px-4 py-3 font-semibold whitespace-nowrap">{c.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={cols.length} className="px-4 py-10 text-center text-premium/40">{empty}</td></tr>
              ) : filtered.map((r, i) => (
                <tr key={r.id ?? i} className="border-b border-border/50 hover:bg-panel/50">
                  {cols.map(c => (
                    <td key={c.key} className={`px-4 py-3 align-top ${c.className ?? ''}`}>
                      {c.render ? c.render(r) : String(r[c.key] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-premium/30 text-xs mt-3">{filtered.length} record{filtered.length === 1 ? '' : 's'}</p>
    </div>
  )
}
