import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { createRazorpayOrder, razorpayConfigured } from '@/lib/integrations/razorpay'
import { sendEmail, adminNotifyEmail, emailLayout } from '@/lib/integrations/resend'
import { notifyAdminWhatsApp } from '@/lib/integrations/whatsapp'
import { PRODUCTS } from '@/lib/data'

export const runtime = 'nodejs'

type LineIn = { slug: string; qty: number }

export async function POST(req: NextRequest) {
  let body: Record<string, any>
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid payload' }, { status: 400 }) }
  if (body.company_hp || body._hp) return NextResponse.json({ ok: true })

  for (const f of ['name', 'email', 'phone', 'address', 'city', 'state', 'pincode']) {
    if (!body[f]) return NextResponse.json({ error: `Missing field: ${f}` }, { status: 400 })
  }

  const items: LineIn[] = Array.isArray(body.items) ? body.items : []
  if (items.length === 0) return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })

  // Recompute prices server-side (never trust client totals)
  const lines = items.map(i => {
    const p = PRODUCTS.find(x => x.slug === i.slug)
    if (!p) return null
    const qty = Math.max(1, Math.min(99, Number(i.qty) || 1))
    return { slug: p.slug, name: p.name, price: p.price, qty, line: p.price * qty }
  }).filter(Boolean) as { slug: string; name: string; price: number; qty: number; line: number }[]

  if (lines.length === 0) return NextResponse.json({ error: 'Invalid items' }, { status: 400 })

  const subtotal = lines.reduce((s, l) => s + l.line, 0)
  const shipping = subtotal >= 5000 ? 0 : 99
  const gst = Math.round((subtotal + shipping) * 0.18)
  const total = subtotal + shipping + gst
  const method = body.payment_method === 'cod' ? 'cod' : 'online'

  const supabase = createServiceClient()
  let orderId = `ord_${Date.now()}`
  const orderNumber = `FLYQ-${Date.now().toString(36).toUpperCase()}`
  if (supabase) {
    const { data, error } = await supabase.from('orders').insert({
      order_number: orderNumber,
      status: 'pending',
      subtotal_inr: subtotal, tax_inr: gst, shipping_inr: shipping, total_inr: total,
      payment_method: method, gstin: body.gstin || null,
      shipping_address: {
        name: body.name, email: body.email, phone: body.phone,
        line1: body.address, city: body.city, state: body.state, pincode: body.pincode,
      },
    }).select('id').single()
    if (error) console.error('[orders] insert', error.message)
    if (data?.id) {
      orderId = String(data.id)
      await supabase.from('order_items').insert(lines.map(l => ({ order_id: data.id, name: l.name, qty: l.qty, unit_price_inr: l.price })))
    }
  } else {
    console.log('[orders] (no DB)', { orderId, total, lines })
  }

  let payment: { orderId: string; amount: number; keyId?: string; mock?: boolean } | null = null
  if (method === 'online') {
    try {
      const rp = await createRazorpayOrder(total * 100, orderId)
      payment = { orderId: rp.id, amount: rp.amount, keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, mock: !razorpayConfigured() }
    } catch (e) { console.error('[orders] razorpay', e) }
  }

  const adminTo = adminNotifyEmail()
  if (adminTo) await sendEmail({ to: adminTo, subject: `New order ₹${total} (${method})`, html: emailLayout('New order', `${body.name} — ₹${total}<br/>${lines.map(l => `${l.name} ×${l.qty}`).join('<br/>')}`) })
  await notifyAdminWhatsApp(`New order ₹${total} from ${body.name} (${method})`)
  await sendEmail({ to: body.email, subject: `Order received — FLYQ`, html: emailLayout('Thank you for your order!', `We&rsquo;ve received your order (₹${total}). ${method === 'cod' ? 'It will ship soon — pay on delivery.' : 'Complete payment to confirm.'} You&rsquo;ll get tracking details shortly. — Team FLYQ`) })

  return NextResponse.json({ ok: true, orderId, total, payment })
}
