import Link from 'next/link'

const MODULES = [
  ['Products', 'Catalog, stock, pricing'], ['Orders', 'Fulfilment & tracking'],
  ['Customers', 'Accounts & profiles'], ['Workshops', 'Events & registrations'],
  ['Leads', 'STEM / bulk / dealer kanban'], ['Testimonials', 'Approve the wall'],
  ['Reviews', 'Moderate product reviews'], ['Blog', 'Journal CMS'],
  ['FAQ', 'Knowledge base'], ['Newsletter', 'Subscribers'],
  ['Banners', 'Homepage promos'], ['Coupons', 'Discount codes'],
  ['Pages', 'Legal & static CMS'], ['Media', 'Asset library'],
  ['Settings', 'Site configuration'], ['Users & Roles', 'Access control'],
  ['Audit Log', 'Security events'], ['Backup', 'Export data'],
]

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <header className="flex items-center justify-between mb-8">
        <div>
          <div className="text-xs text-cyber uppercase tracking-widest font-semibold">Control Tower</div>
          <h1 className="text-2xl font-extrabold">Admin Dashboard</h1>
        </div>
        <span className="text-xs glass px-3 py-1.5 rounded-full text-signal">● Session active (60 min)</span>
      </header>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {[['Orders', '—'], ['Revenue', '₹—'], ['Leads', '—'], ['Subscribers', '—']].map(([k, v]) => (
          <div key={k} className="glass rounded-2xl p-5"><div className="text-premium/50 text-xs uppercase tracking-widest">{k}</div><div className="text-2xl font-extrabold mt-1">{v}</div></div>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
        {MODULES.map(([name, desc]) => (
          <div key={name} className="glass rounded-2xl p-5 card-hover">
            <h3 className="font-bold">{name}</h3>
            <p className="text-premium/50 text-sm mt-1">{desc}</p>
          </div>
        ))}
      </div>
      <p className="text-premium/30 text-xs mt-8">Module CRUD screens wire to Supabase tables via the service client and are protected by RLS + the admin unlock session. See docs/RUNBOOK.md.</p>
      <Link href="/" className="inline-block mt-4 text-cyber text-sm">← Back to site</Link>
    </div>
  )
}
