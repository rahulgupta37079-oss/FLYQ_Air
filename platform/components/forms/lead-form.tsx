'use client'
import { useState } from 'react'

export type FieldDef = {
  name: string; label: string; type?: string; required?: boolean
  options?: string[]; full?: boolean; textarea?: boolean
}

export default function LeadForm({ endpoint, fields, cta = 'Submit' }: { endpoint: string; fields: FieldDef[]; cta?: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    const fd = new FormData(e.target as HTMLFormElement)
    if (fd.get('company_hp')) { setStatus('done'); return } // honeypot
    const body = Object.fromEntries(fd.entries())
    try {
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      setStatus(res.ok ? 'done' : 'error')
    } catch { setStatus('error') }
  }

  if (status === 'done') return (
    <div className="glass rounded-2xl p-8 text-center">
      <div className="text-4xl mb-3">✅</div>
      <h3 className="font-bold text-lg">Thank you!</h3>
      <p className="text-premium/60 text-sm mt-1">Our team will reach out shortly. A confirmation has been logged.</p>
    </div>
  )

  return (
    <form onSubmit={submit} className="glass rounded-2xl p-7 grid sm:grid-cols-2 gap-4">
      <input type="text" name="company_hp" className="hidden" tabIndex={-1} autoComplete="off" />
      {fields.map(f => (
        <label key={f.name} className={`block text-sm ${f.full || f.textarea ? 'sm:col-span-2' : ''}`}>
          <span className="text-premium/60">{f.label}{f.required && ' *'}</span>
          {f.textarea ? (
            <textarea name={f.name} required={f.required} rows={4} className="mt-1 w-full px-4 py-2.5 rounded-lg bg-ink border border-border focus:border-cyber outline-none" />
          ) : f.options ? (
            <select name={f.name} required={f.required} className="mt-1 w-full px-4 py-2.5 rounded-lg bg-ink border border-border focus:border-cyber outline-none">
              <option value="">Select…</option>
              {f.options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          ) : (
            <input name={f.name} type={f.type || 'text'} required={f.required} className="mt-1 w-full px-4 py-2.5 rounded-lg bg-ink border border-border focus:border-cyber outline-none" />
          )}
        </label>
      ))}
      <div className="sm:col-span-2">
        <button disabled={status === 'loading'} className="px-7 py-3 rounded-xl btn-cyber font-bold disabled:opacity-60">{status === 'loading' ? 'Sending…' : cta}</button>
        {status === 'error' && <p className="text-danger text-sm mt-2">Something went wrong. Please try again or WhatsApp us.</p>}
      </div>
    </form>
  )
}
