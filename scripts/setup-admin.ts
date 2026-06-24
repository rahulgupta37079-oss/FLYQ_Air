/**
 * Enrol an admin: set role, generate TOTP secret, hash a 6-digit PIN.
 *
 * Usage:
 *   npx tsx scripts/setup-admin.ts <user-email> <6-digit-pin>
 *
 * Requires env: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE
 * (loaded from .env.local — run with: `npx dotenv -e .env.local -- tsx scripts/setup-admin.ts ...`
 *  or export them in your shell first.)
 */
import { createClient } from '@supabase/supabase-js'
import { authenticator } from 'otplib'
import bcrypt from 'bcryptjs'

async function main() {
  const [email, pin] = process.argv.slice(2)
  if (!email || !pin || !/^\d{6}$/.test(pin)) {
    console.error('Usage: tsx scripts/setup-admin.ts <user-email> <6-digit-pin>')
    process.exit(1)
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE
  if (!url || !key) { console.error('Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE'); process.exit(1) }

  const supabase = createClient(url, key, { auth: { persistSession: false } })

  // Find the auth user by email
  const { data: list, error: listErr } = await supabase.auth.admin.listUsers()
  if (listErr) { console.error('listUsers failed:', listErr.message); process.exit(1) }
  const user = list.users.find(u => u.email?.toLowerCase() === email.toLowerCase())
  if (!user) { console.error(`No auth user with email ${email}. Create them in Supabase Auth first.`); process.exit(1) }

  const totpSecret = authenticator.generateSecret()
  const pinHash = await bcrypt.hash(pin, 10)
  const issuer = process.env.ADMIN_TOTP_ISSUER || 'FLYQ'
  const otpauth = authenticator.keyuri(email, issuer, totpSecret)

  const { error } = await supabase.from('profiles').update({
    role: 'admin', totp_secret: totpSecret, pin_hash: pinHash,
  }).eq('id', user.id)
  if (error) { console.error('profile update failed:', error.message); process.exit(1) }

  console.log('\n✅ Admin enrolled:', email)
  console.log('   role = admin, PIN set, TOTP secret stored.\n')
  console.log('📱 Add this to your authenticator app (scan as QR or enter the secret):')
  console.log('   otpauth URI:', otpauth)
  console.log('   secret     :', totpSecret)
  console.log('\nLogin at /<ADMIN_SLUG>/login → email+password → TOTP → PIN.\n')
}

main().catch(e => { console.error(e); process.exit(1) })
