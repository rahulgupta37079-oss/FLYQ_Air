'use client'
import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'done' : 'error')
      if (res.ok) setEmail('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') return <p className="text-signal text-sm">✓ Please check your inbox to confirm.</p>

  return (
    <form onSubmit={submit} className="flex gap-2">
      {/* honeypot */}
      <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />
      <input
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="flex-1 px-4 py-2.5 rounded-lg bg-ink border border-border focus:border-cyber outline-none text-sm"
      />
      <button disabled={status === 'loading'} className="px-5 py-2.5 rounded-lg btn-cyber font-semibold text-sm disabled:opacity-60">
        {status === 'loading' ? '...' : 'Subscribe'}
      </button>
    </form>
  )
}
