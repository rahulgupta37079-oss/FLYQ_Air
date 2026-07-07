'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveRow } from '@/lib/admin/actions'

export type Field = {
  name: string; label: string; type?: 'text' | 'number' | 'textarea' | 'select' | 'checkbox' | 'json' | 'array' | 'date' | 'email'
  options?: string[]; full?: boolean; help?: string; placeholder?: string
}

export default function CrudForm({ table, fields, row, backTo, jsonFields = [], arrayFields = [], numberFields = [], boolFields = [] }: {
  table: string; fields: Field[]; row?: any; backTo: string
  jsonFields?: string[]; arrayFields?: string[]; numberFields?: string[]; boolFields?: string[]
}) {
  const router = useRouter()
  const [err, setErr] = useState('')
  const [saving, setSaving] = useState(false)

  function initial(f: Field): string {
    const v = row?.[f.name]
    if (v == null) return ''
    if (f.type === 'json') return JSON.stringify(v, null, 2)
    if (f.type === 'array') return Array.isArray(v) ? v.join('\n') : String(v)
    if (f.type === 'date' && typeof v === 'string') return v.slice(0, 10)
    return String(v)
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true); setErr('')
    const fd = new FormData(e.currentTarget)
    const res = await saveRow({ table, jsonFields, arrayFields, numberFields, boolFields }, fd)
    setSaving(false)
    if (res.ok) router.push(backTo)
    else setErr(res.error || 'Save failed')
  }

  return (
    <form onSubmit={onSubmit} className="glass rounded-2xl p-6 grid sm:grid-cols-2 gap-4">
      {row?.id && <input type="hidden" name="_id" value={row.id} />}
      {fields.map(f => (
        <label key={f.name} className={`block text-sm ${f.full || f.type === 'textarea' || f.type === 'json' || f.type === 'array' ? 'sm:col-span-2' : ''}`}>
          <span className="text-premium/60">{f.label}</span>
          {f.type === 'textarea' || f.type === 'array' ? (
            <textarea name={f.name} rows={4} defaultValue={initial(f)} placeholder={f.placeholder} className="mt-1 w-full px-4 py-2.5 rounded-lg bg-slatedeep border border-border focus:border-cyber outline-none" />
          ) : f.type === 'json' ? (
            <textarea name={f.name} rows={6} defaultValue={initial(f)} placeholder="{ }" className="mt-1 w-full px-4 py-2.5 rounded-lg bg-slatedeep border border-border focus:border-cyber outline-none font-mono text-xs" />
          ) : f.type === 'select' ? (
            <select name={f.name} defaultValue={initial(f)} className="mt-1 w-full px-4 py-2.5 rounded-lg bg-slatedeep border border-border focus:border-cyber outline-none">
              <option value="">Select…</option>
              {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          ) : f.type === 'checkbox' ? (
            <span className="mt-2 flex items-center gap-2"><input type="checkbox" name={f.name} defaultChecked={!!row?.[f.name]} className="w-4 h-4 accent-cyan-400" /> <span className="text-premium/40 text-xs">{f.help}</span></span>
          ) : (
            <input name={f.name} type={f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : f.type === 'email' ? 'email' : 'text'} defaultValue={initial(f)} placeholder={f.placeholder} className="mt-1 w-full px-4 py-2.5 rounded-lg bg-slatedeep border border-border focus:border-cyber outline-none" />
          )}
          {f.help && f.type !== 'checkbox' && <span className="text-premium/30 text-xs mt-1 block">{f.help}</span>}
        </label>
      ))}
      <div className="sm:col-span-2 flex items-center gap-3 pt-2">
        <button disabled={saving} className="px-6 py-2.5 rounded-xl btn-cyber font-bold disabled:opacity-60">{saving ? 'Saving…' : 'Save'}</button>
        <button type="button" onClick={() => router.push(backTo)} className="px-6 py-2.5 rounded-xl glass">Cancel</button>
        {err && <span className="text-danger text-sm">{err}</span>}
      </div>
    </form>
  )
}
