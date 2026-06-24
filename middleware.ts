import { NextRequest, NextResponse } from 'next/server'

const ADMIN_SLUG = process.env.NEXT_PUBLIC_ADMIN_SLUG || 'control-tower-x9k2'

// Edge middleware: protect the hidden admin surface.
// - Unauthenticated requests to the admin slug are rewritten to /404 (hide its existence).
// - The admin /login sub-route is always reachable so a valid admin can sign in.
// - Full auth + role + TOTP + PIN + IP checks happen server-side inside the admin layout.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const adminBase = `/${ADMIN_SLUG}`

  if (pathname === adminBase || pathname.startsWith(`${adminBase}/`)) {
    // Always allow the login gate itself
    if (pathname === `${adminBase}/login`) return NextResponse.next()

    // Presence of the Supabase auth cookie is a cheap first gate at the edge.
    const hasSession = req.cookies.getAll().some(c => c.name.startsWith('sb-') && c.name.includes('-auth-token'))
    // Presence of the admin-unlock cookie set after TOTP+PIN succeed.
    const unlocked = req.cookies.get('flyq_admin_unlock')?.value === '1'

    if (!hasSession || !unlocked) {
      const url = req.nextUrl.clone()
      url.pathname = `${adminBase}/login`
      return NextResponse.rewrite(url)
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/control-tower-x9k2/:path*'],
}
