import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { verifyRecaptcha } from '@/lib/integrations/recaptcha'
import { sendEmail, adminNotifyEmail, emailLayout } from '@/lib/integrations/resend'
import { notifyAdminWhatsApp } from '@/lib/integrations/whatsapp'
import { createRazorpayOrder, razorpayConfigured } from '@/lib/integrations/razorpay'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  let body: Record<string, any>
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid payload' }, { status: 400 }) }
  if (body.company_hp || body._hp) return NextResponse.json({ ok: true })

  for (const f of ['name', 'email', 'phone', 'workshop_slug']) {
    if (!body[f]) return NextResponse.json({ error: `Missing field: ${f}` }, { status: 400 })
  }
  if (!(await verifyRecaptcha(body.recaptcha_token, 'workshop'))) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 400 })
  }

  const { company_hp, _hp, recaptcha_token, fee_paise, ...payload } = body

  const supabase = createServiceClient()
  if (supabase) {
    const { error } = await supabase.from('event_registrations').insert({ ...payload, status: 'new' })
    if (error) console.error('[workshop-reg] insert', error.message)
  } else {
    console.log('[workshop-reg] (no DB)', payload)
  }

  // Optional online payment
  let payment: { orderId: string; amount: number; keyId?: string; mock?: boolean } | null = null
  if (body.payment_method === 'online' && fee_paise) {
    try {
      const order = await createRazorpayOrder(Number(fee_paise), `wk_${Date.now()}`)
      payment = { orderId: order.id, amount: order.amount, keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, mock: !razorpayConfigured() }
    } catch (e) { console.error('[workshop-reg] razorpay', e) }
  }

  const adminTo = adminNotifyEmail()
  if (adminTo) await sendEmail({ to: adminTo, subject: `New workshop registration: ${payload.workshop_slug}`, html: emailLayout('New registration', `${payload.name} (${payload.email}) for ${payload.workshop_slug}`) })
  await notifyAdminWhatsApp(`Workshop reg: ${payload.name} → ${payload.workshop_slug}`)
  await sendEmail({ to: payload.email, subject: 'Workshop registration received — FLYQ', html: emailLayout('See you there!', `We&rsquo;ve received your registration for the workshop. We&rsquo;ll email joining details closer to the date. — Team FLYQ`) })

  return NextResponse.json({ ok: true, payment })
}
