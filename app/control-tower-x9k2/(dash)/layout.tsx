import Link from 'next/link'
import { requireAdmin } from '@/lib/admin/guard'
import { ADMIN_SLUG } from '@/lib/admin/security'
import AdminLogout from '@/components/admin/logout'

export const dynamic = 'force-dynamic'

const NAV: [string, string, string][] = [
  ['', 'Dashboard', '▥'],
  ['products', 'Products', '✦'],
  ['orders', 'Orders', '▣'],
  ['customers', 'Customers', '☻'],
  ['workshops', 'Workshops', '◷'],
  ['leads', 'Leads', '⇲'],
  ['testimonials', 'Testimonials', '❝'],
  ['reviews', 'Reviews', '★'],
  ['blog', 'Blog', '✎'],
  ['faq', 'FAQ', '?'],
  ['newsletter', 'Newsletter', '✉'],
  ['banners', 'Banners', '▭'],
  ['coupons', 'Coupons', '%'],
  ['pages', 'Pages', '§'],
  ['media', 'Media', '◫'],
  ['settings', 'Settings', '⚙'],
  ['users', 'Users & Roles', '⚷'],
  ['audit', 'Audit Log', '⎙'],
  ['backup', 'Backup', '⤓'],
]

export default async function DashLayout({ children }: { children: React.ReactNode }) {
  const ctx = await requireAdmin()
  const base = `/${ADMIN_SLUG}`
  return (
    <div className="flex min-h-screen bg-ink text-premium">
      <aside className="w-60 shrink-0 border-r border-border bg-slatedeep/60 sticky top-0 h-screen overflow-y-auto">
        <div className="p-5 border-b border-border">
          <div className="text-sm font-extrabold grad-cyber">CONTROL TOWER</div>
          <div className="text-[10px] text-premium/40 uppercase tracking-widest mt-0.5">{ctx.role}{!ctx.configured && ' · demo'}</div>
        </div>
        <nav className="p-2">
          {NAV.map(([slug, label, icon]) => (
            <Link key={slug} href={`${base}/${slug}`} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-premium/70 hover:bg-panel hover:text-cyber transition">
              <span className="w-5 text-center opacity-60">{icon}</span>{label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-border mt-2">
          <Link href="/" className="block text-xs text-premium/40 hover:text-cyber px-3 py-1.5">← View site</Link>
          <AdminLogout />
        </div>
      </aside>
      <main className="flex-1 min-w-0">
        {!ctx.configured && (
          <div className="bg-cyber/10 border-b border-cyber/30 text-cyber text-xs px-6 py-2">
            Demo mode — Supabase not configured. Screens render with live data once <code>NEXT_PUBLIC_SUPABASE_URL</code> + <code>SUPABASE_SERVICE_ROLE</code> are set.
          </div>
        )}
        <div className="p-6 lg:p-8 max-w-6xl">{children}</div>
      </main>
    </div>
  )
}
