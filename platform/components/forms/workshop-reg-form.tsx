'use client'
import { useState } from 'react'

export default function WorkshopRegForm({ slug, fee }: { slug: string; fee: number }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [pay, setPay] = useState<'razorpay' | 'venue'>(fee > 0 ? 'razorpay' : 'venue')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    const fd = new FormData(e.target as HTMLFormElement)
    if (fd.get('company_hp')) { setStatus('done'); return }
    const body = { workshop_slug: slug, payment_method: pay, ...Object.fromEntries(fd.entries()) }
    try {
      const res = await fetch('/api/workshops/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      setStatus(res.ok ? 'done' : 'error')
    } catch { setStatus('error') }
  }

  if (status === 'done') return (
    <div className="glass rounded-2xl p-8 text-center">
      <div className="text-4xl mb-3">🎟️</div>
      <h3 className="font-bold text-lg">You're registered!</h3>
      <p className="text-premium/60 text-sm mt-1">A confirmation + QR-code ticket will be emailed/WhatsApped once integrations are live.</p>
    </div>
  )

  return (
    <form onSubmit={submit} className="glass rounded-2xl p-7 grid sm:grid-cols-2 gap-4">
      <input type="text" name="company_hp" className="hidden" tabIndex={-1} />
      {[
        ['name', 'Full name', 'text', true], ['email', 'Email', 'email', true],
        ['phone', 'Phone', 'tel', true], ['age', 'Age', 'number', false],
        ['city', 'City', 'text', true], ['occupation', 'Occupation', 'text', false],
      ].map(([n, l, t, r]) => (
        <label key={n as string} className="block text-sm">
          <span className="text-premium/60">{l as string}{r && ' *'}</span>
          <input name={n as string} type={t as string} required={r as boolean} className="mt-1 w-full px-4 py-2.5 rounded-lg bg-ink border border-border focus:border-cyber outline-none" />
        </label>
      ))}
      <label className="block text-sm">
        <span className="text-premium/60">Experience level</span>
        <select name="experience_level" className="mt-1 w-full px-4 py-2.5 rounded-lg bg-ink border border-border focus:border-cyber outline-none">
          <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
        </select>
      </label>
      <label className="block text-sm">
        <span className="text-premium/60">T-shirt size</span>
        <select name="tshirt_size" className="mt-1 w-full px-4 py-2.5 rounded-lg bg-ink border border-border focus:border-cyber outline-none">
          <option>S</option><option>M</option><option>L</option><option>XL</option><option>XXL</option>
        </select>
      </label>
      <label className="block text-sm sm:col-span-2">
        <span className="text-premium/60">Emergency contact</span>
        <input name="emergency_contact" className="mt-1 w-full px-4 py-2.5 rounded-lg bg-ink border border-border focus:border-cyber outline-none" />
      </label>

      <div className="sm:col-span-2">
        <span className="text-premium/60 text-sm">Payment</span>
        <div className="grid sm:grid-cols-2 gap-3 mt-1">
          {fee > 0 && <button type="button" onClick={() => setPay('razorpay')} className={`p-3 rounded-xl text-left text-sm ${pay === 'razorpay' ? 'btn-cyber' : 'glass'}`}>Pay online (Razorpay)</button>}
          <button type="button" onClick={() => setPay('venue')} className={`p-3 rounded-xl text-left text-sm ${pay === 'venue' ? 'btn-cyber' : 'glass'}`}>Pay at venue</button>
        </div>
      </div>

      <div className="sm:col-span-2">
        <button disabled={status === 'loading'} className="px-7 py-3 rounded-xl btn-cyber font-bold disabled:opacity-60">{status === 'loading' ? 'Registering…' : 'Register'}</button>
        {status === 'error' && <p className="text-danger text-sm mt-2">Something went wrong. Please try again.</p>}
      </div>
    </form>
  )
}
