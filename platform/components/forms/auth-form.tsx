'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

type Mode = 'login' | 'register' | 'forgot'

export default function AuthForm({ mode }: { mode: Mode }) {
  const [msg, setMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setMsg(null)
    const fd = new FormData(e.target as HTMLFormElement)
    const email = String(fd.get('email') || '')
    const password = String(fd.get('password') || '')
    const supabase = createClient()
    if (!supabase) { setMsg('Auth will activate once Supabase keys are configured.'); setLoading(false); return }
    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        setMsg(error ? error.message : '✓ Signed in. Redirecting…')
        if (!error) window.location.href = '/account'
      } else if (mode === 'register') {
        const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: String(fd.get('name') || '') } } })
        setMsg(error ? error.message : '✓ Check your email to confirm your account.')
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email)
        setMsg(error ? error.message : '✓ Password reset link sent.')
      }
    } finally { setLoading(false) }
  }

  return (
    <form onSubmit={submit} className="glass rounded-2xl p-8 w-full max-w-md space-y-4">
      <h1 className="text-2xl font-extrabold">
        {mode === 'login' ? 'Sign in' : mode === 'register' ? 'Create account' : 'Reset password'}
      </h1>
      {mode === 'register' && <Input name="name" label="Full name" />}
      <Input name="email" label="Email" type="email" required />
      {mode !== 'forgot' && <Input name="password" label="Password" type="password" required />}
      <button disabled={loading} className="w-full px-6 py-3 rounded-xl btn-cyber font-bold disabled:opacity-60">
        {loading ? '…' : mode === 'login' ? 'Sign in' : mode === 'register' ? 'Sign up' : 'Send link'}
      </button>
      {msg && <p className="text-sm text-cyber">{msg}</p>}
      <div className="text-sm text-premium/55 flex justify-between pt-2">
        {mode === 'login' ? <>
          <Link href="/register" className="hover:text-cyber">Create account</Link>
          <Link href="/forgot-password" className="hover:text-cyber">Forgot?</Link>
        </> : <Link href="/login" className="hover:text-cyber">← Back to sign in</Link>}
      </div>
    </form>
  )
}

function Input({ name, label, type = 'text', required }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <label className="block text-sm">
      <span className="text-premium/60">{label}</span>
      <input name={name} type={type} required={required} className="mt-1 w-full px-4 py-2.5 rounded-lg bg-ink border border-border focus:border-cyber outline-none" />
    </label>
  )
}
