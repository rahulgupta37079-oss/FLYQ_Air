// Admin security helpers — TOTP, PIN (bcrypt), IP allowlist, rate-limit, audit.
import { authenticator } from 'otplib'
import bcrypt from 'bcryptjs'
import { createServiceClient } from '@/lib/supabase/server'

export const ADMIN_SLUG = process.env.NEXT_PUBLIC_ADMIN_SLUG || 'control-tower-x9k2'

// ---- IP allowlist ----
export function ipAllowed(ip: string | null): boolean {
  const list = (process.env.ADMIN_IP_ALLOWLIST || '').split(',').map(s => s.trim()).filter(Boolean)
  if (list.length === 0) return true // not configured → allow (still gated by auth + TOTP + PIN)
  if (!ip) return false
  return list.includes(ip)
}

// ---- TOTP (2FA) ----
export function verifyTotp(token: string, secret: string): boolean {
  try {
    authenticator.options = { window: 1 }
    return authenticator.verify({ token, secret })
  } catch { return false }
}

export function generateTotpSecret(): string {
  return authenticator.generateSecret()
}

export function totpUri(secret: string, account: string): string {
  const issuer = process.env.ADMIN_TOTP_ISSUER || 'FLYQ'
  return authenticator.keyuri(account, issuer, secret)
}

// ---- PIN (6-digit, bcrypt) ----
export async function hashPin(pin: string): Promise<string> {
  return bcrypt.hash(pin, 10)
}
export async function verifyPin(pin: string, hash: string): Promise<boolean> {
  if (!hash) return false
  return bcrypt.compare(pin, hash)
}

// ---- Rate limit (in-memory soft guard for admin login) ----
const attempts = new Map<string, { count: number; ts: number }>()
const ADMIN_WINDOW = 15 * 60_000
const ADMIN_LIMIT = 10
export function adminRateLimited(key: string): boolean {
  const now = Date.now()
  const rec = attempts.get(key)
  if (!rec || now - rec.ts > ADMIN_WINDOW) { attempts.set(key, { count: 1, ts: now }); return false }
  rec.count++
  return rec.count > ADMIN_LIMIT
}
export function resetAdminAttempts(key: string) { attempts.delete(key) }

// ---- Audit log ----
export async function audit(
  actorId: string | null,
  action: string,
  target?: string | Record<string, unknown>,
  ip?: string,
) {
  const supabase = createServiceClient()
  const targetStr = typeof target === 'string' ? target : target ? JSON.stringify(target) : null
  if (!supabase) { console.log('[audit]', action, targetStr); return }
  try {
    // matches schema: admin_audit(actor, action, target, ip, user_agent)
    await supabase.from('admin_audit').insert({ actor: actorId === 'demo' ? null : actorId, action, target: targetStr, ip: ip || null })
  } catch (e) { console.error('[audit] failed', e) }
}
