import { redirect } from 'next/navigation'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { ADMIN_SLUG } from '@/lib/admin/security'

export type AdminCtx = {
  userId: string
  email: string | null
  role: 'admin' | 'staff'
  configured: boolean
}

/**
 * Server-side guard for admin pages. Verifies an authenticated Supabase session
 * with an admin/staff role. The middleware already gates the unlock cookie at the
 * edge; this is the authoritative server check.
 *
 * When Supabase is NOT configured (no env keys), we return a demo context so the
 * admin UI is still browsable in local/preview builds without a backend.
 */
export async function requireAdmin(): Promise<AdminCtx> {
  const supabase = createClient()
  if (!supabase) {
    // Pre-launch / no backend → allow read-only browsing of the admin shell.
    return { userId: 'demo', email: 'demo@flyq.local', role: 'admin', configured: false }
  }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect(`/${ADMIN_SLUG}/login`)

  const svc = createServiceClient()
  const { data: profile } = svc
    ? await svc.from('profiles').select('role').eq('id', user.id).single()
    : { data: null as any }

  const role = profile?.role
  if (role !== 'admin' && role !== 'staff') redirect('/404')

  return { userId: user.id, email: user.email ?? null, role, configured: true }
}

export function isConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE)
}
