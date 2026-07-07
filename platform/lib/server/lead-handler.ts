import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { verifyRecaptcha } from '@/lib/integrations/recaptcha'
import { sendEmail, adminNotifyEmail, emailLayout } from '@/lib/integrations/resend'
import { notifyAdminWhatsApp } from '@/lib/integrations/whatsapp'

// In-memory rate limiter (per IP). Resets on cold start — adequate as a soft guard.
const hits = new Map<string, { count: number; ts: number }>()
const WINDOW = 60_000
const LIMIT = 8

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const rec = hits.get(ip)
  if (!rec || now - rec.ts > WINDOW) { hits.set(ip, { count: 1, ts: now }); return false }
  rec.count++
  return rec.count > LIMIT
}

function clientIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown'
}

type Opts = {
  table: string        // supabase table to insert into
  label: string        // human label for notifications
  requiredFields?: string[]
  recaptchaAction?: string
}

/**
 * Generic handler for public form submissions:
 * honeypot → rate-limit → reCAPTCHA → Supabase insert → email + WhatsApp notify + auto-reply.
 * Every external dependency degrades gracefully if its env keys are absent.
 */
export async function handleLead(req: NextRequest, opts: Opts) {
  const ip = clientIp(req)
  if (rateLimited(ip)) return NextResponse.json({ error: 'Too many requests. Please try again shortly.' }, { status: 429 })

  let body: Record<string, any>
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid payload' }, { status: 400 }) }

  // Honeypot — any of these filled means a bot. Pretend success.
  if (body.company_hp || body.website_hp || body._hp) return NextResponse.json({ ok: true })

  // Required fields
  for (const f of opts.requiredFields || []) {
    if (!body[f] || String(body[f]).trim() === '') return NextResponse.json({ error: `Missing field: ${f}` }, { status: 400 })
  }

  // reCAPTCHA
  const ok = await verifyRecaptcha(body.recaptcha_token, opts.recaptchaAction)
  if (!ok) return NextResponse.json({ error: 'Verification failed. Please retry.' }, { status: 400 })

  // Strip internal fields before storing
  const { company_hp, website_hp, _hp, recaptcha_token, ...payload } = body

  // Persist (graceful — store still succeeds for the user even if DB not configured)
  const supabase = createServiceClient()
  if (supabase) {
    const { error } = await supabase.from(opts.table).insert({ ...payload, ip, source: 'website' })
    if (error) console.error(`[lead:${opts.table}] insert error`, error.message)
  } else {
    console.log(`[lead:${opts.table}] (no DB) `, payload)
  }

  // Notify admin (email + WhatsApp)
  const summary = Object.entries(payload).map(([k, v]) => `<b>${k}</b>: ${String(v)}`).join('<br/>')
  const adminTo = adminNotifyEmail()
  if (adminTo) {
    await sendEmail({ to: adminTo, subject: `New ${opts.label}`, html: emailLayout(`New ${opts.label}`, summary) })
  }
  await notifyAdminWhatsApp(`New ${opts.label} from ${payload.name || payload.contact_person || payload.email || ip}`)

  // Auto-reply to the user if we have their email
  if (payload.email) {
    await sendEmail({
      to: payload.email,
      subject: `We received your ${opts.label.toLowerCase()} — FLYQ`,
      html: emailLayout('Thanks for reaching out!', `We&rsquo;ve received your ${opts.label.toLowerCase()} and our team will get back to you shortly. — Team FLYQ`),
    })
  }

  return NextResponse.json({ ok: true })
}
