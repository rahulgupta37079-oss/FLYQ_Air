import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'

export async function POST() {
  const supabase = createClient()
  if (supabase) { try { await supabase.auth.signOut() } catch {} }
  const res = NextResponse.json({ ok: true })
  res.cookies.set('flyq_admin_unlock', '', { httpOnly: true, secure: true, sameSite: 'strict', path: '/', maxAge: 0 })
  return res
}
