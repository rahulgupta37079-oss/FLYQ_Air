import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { ipAllowed, verifyTotp, verifyPin, adminRateLimited, resetAdminAttempts, audit } from '@/lib/admin/security'

export const runtime = 'nodejs'

function ip(req: NextRequest) {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || null
}

export async function POST(req: NextRequest) {
  const clientIp = ip(req)
  if (!ipAllowed(clientIp)) { await audit(null, 'admin.ip_blocked', {}, clientIp || undefined); return NextResponse.json({ error: 'Access denied' }, { status: 403 }) }
  if (adminRateLimited(clientIp || 'unknown')) return NextResponse.json({ error: 'Too many attempts. Try later.' }, { status: 429 })

  const body = await req.json().catch(() => ({})) as Record<string, string>
  const supabase = createClient()
  if (!supabase) return NextResponse.json({ error: 'Auth not configured' }, { status: 503 })

  // Step 1: email/password
  const { data: auth, error } = await supabase.auth.signInWithPassword({ email: body.email, password: body.password })
  if (error || !auth.user) { await audit(null, 'admin.login_fail', { email: body.email }, clientIp || undefined); return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 }) }

  // Role + factors from profile
  const svc = createServiceClient()
  const { data: profile } = svc
    ? await svc.from('profiles').select('role, totp_secret, pin_hash').eq('id', auth.user.id).single()
    : { data: null as any }

  if (!profile || (profile.role !== 'admin' && profile.role !== 'staff')) {
    await audit(auth.user.id, 'admin.role_denied', {}, clientIp || undefined)
    return NextResponse.json({ error: 'Access denied' }, { status: 403 })
  }

  // Step 2: require TOTP + PIN
  if (!body.totp || !body.pin) return NextResponse.json({ needTotp: true })

  if (!profile.totp_secret || !verifyTotp(body.totp, profile.totp_secret)) {
    await audit(auth.user.id, 'admin.totp_fail', {}, clientIp || undefined)
    return NextResponse.json({ error: 'Invalid 2FA code', needTotp: true }, { status: 401 })
  }
  if (!(await verifyPin(body.pin, profile.pin_hash))) {
    await audit(auth.user.id, 'admin.pin_fail', {}, clientIp || undefined)
    return NextResponse.json({ error: 'Invalid PIN', needTotp: true }, { status: 401 })
  }

  resetAdminAttempts(clientIp || 'unknown')
  await audit(auth.user.id, 'admin.unlock_success', {}, clientIp || undefined)

  const res = NextResponse.json({ ok: true })
  res.cookies.set('flyq_admin_unlock', '1', { httpOnly: true, secure: true, sameSite: 'strict', path: '/', maxAge: 60 * 60 })
  return res
}
