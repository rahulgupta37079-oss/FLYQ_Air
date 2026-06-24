import AdminHeader from '@/components/admin/page-header'

export const dynamic = 'force-dynamic'

const TABLES = ['products', 'orders', 'order_items', 'profiles', 'workshops', 'event_registrations', 'testimonials', 'reviews', 'blog_posts', 'faqs', 'pages', 'banners', 'coupons', 'newsletter_subscribers', 'stem_lab_leads', 'bulk_leads', 'dealer_leads', 'contact_messages', 'settings', 'admin_audit']

export default function Backup() {
  return (
    <>
      <AdminHeader title="Backup & Export" sub="Export your data for safekeeping or migration" />
      <div className="glass rounded-2xl p-6 space-y-4">
        <p className="text-premium/70 text-sm">Run the backup script to export every table to timestamped JSON/CSV files. It uses the service-role key server-side and never runs in the browser.</p>
        <pre className="bg-slatedeep rounded-lg p-4 text-xs overflow-x-auto"><code>npx tsx scripts/backup.ts
# → ./backups/flyq-backup-YYYY-MM-DD.json</code></pre>
        <div>
          <h3 className="font-bold text-sm mb-2">Tables exported ({TABLES.length})</h3>
          <div className="flex flex-wrap gap-2">
            {TABLES.map(t => <span key={t} className="text-xs glass px-2.5 py-1 rounded-full font-mono">{t}</span>)}
          </div>
        </div>
        <p className="text-premium/40 text-xs">For point-in-time recovery, also enable Supabase&rsquo;s automated daily backups in your project dashboard. See docs/RUNBOOK.md.</p>
      </div>
    </>
  )
}
