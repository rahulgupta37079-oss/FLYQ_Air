'use client'
import { useState } from 'react'

// Multi-factor admin gate: email/password (Supabase) → TOTP 2FA → 6-digit PIN.
// Submits to /api/admin/unlock which performs all server-side checks and sets the unlock cookie.
export default function AdminLogin() {
  const [step, setStep] = useState<1 | 2>(1)
  const [form, setForm] = useState({ email: '', password: '', totp: '', pin: '' })
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  function set(k: string, v: string) { setForm(s => ({ ...s, [k]: v })) }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setErr(''); setLoading(true)
    try {
      const res = await fetch('/api/admin/unlock', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) { window.location.href = `/control-tower-x9k2` }
      else if (data.needTotp && step === 1) { setStep(2); setErr('') }
      else setErr(data.error || 'Access denied')
    } catch { setErr('Network error') }
    setLoading(false)
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-5 grid-bg">
      <form onSubmit={submit} className="glass rounded-2xl p-8 w-full max-w-sm space-y-4">
        <div className="text-center">
          <div className="text-2xl font-extrabold grad-cyber">CONTROL TOWER</div>
          <p className="text-premium/40 text-xs mt-1 uppercase tracking-widest">Authorized personnel only</p>
        </div>
        {step === 1 ? (
          <>
            <input type="email" required placeholder="Email" value={form.email} onChange={e => set('email', e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-ink border border-border focus:border-cyber outline-none" />
            <input type="password" required placeholder="Password" value={form.password} onChange={e => set('password', e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-ink border border-border focus:border-cyber outline-none" />
          </>
        ) : (
          <>
            <input inputMode="numeric" maxLength={6} required placeholder="2FA code (TOTP)" value={form.totp} onChange={e => set('totp', e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-ink border border-border focus:border-cyber outline-none tracking-[0.5em] text-center" />
            <input inputMode="numeric" maxLength={6} type="password" required placeholder="6-digit PIN" value={form.pin} onChange={e => set('pin', e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-ink border border-border focus:border-cyber outline-none tracking-[0.5em] text-center" />
          </>
        )}
        {err && <p className="text-danger text-sm">{err}</p>}
        <button disabled={loading} className="w-full px-6 py-3 rounded-xl btn-cyber font-bold disabled:opacity-60">{loading ? 'Verifying…' : step === 1 ? 'Continue' : 'Unlock'}</button>
      </form>
    </main>
  )
}
