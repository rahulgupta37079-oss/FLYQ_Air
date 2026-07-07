import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { sendEmail, emailLayout } from '@/lib/integrations/resend'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  let body: Record<string, any>
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid payload' }, { status: 400 }) }
  if (body.company_hp || body._hp) return NextResponse.json({ ok: true }) // honeypot

  const email = String(body.email || '').trim().toLowerCase()
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return NextResponse.json({ error: 'Invalid email' }, { status: 400 })

  const supabase = createServiceClient()
  if (supabase) {
    const { error } = await supabase.from('newsletter_subscribers').upsert({ email }, { onConflict: 'email' })
    if (error) console.error('[newsletter] insert', error.message)
  } else {
    console.log('[newsletter] (no DB)', email)
  }

  await sendEmail({ to: email, subject: 'Welcome to the FLYQ list', html: emailLayout('You&rsquo;re in!', 'Thanks for subscribing. Expect engineering notes, product drops and workshop announcements — no spam. — Team FLYQ') })

  return NextResponse.json({ ok: true })
}
