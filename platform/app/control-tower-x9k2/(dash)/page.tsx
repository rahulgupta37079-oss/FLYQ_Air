import { counts, fetchAll } from '@/lib/admin/fetch'
import AdminHeader from '@/components/admin/page-header'
import { inr } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  const c = await counts()
  const orders = await fetchAll('orders', 'created_at', false)
  const revenue = orders.reduce((s, o) => s + (o.total_inr || 0), 0)
  const leads = (c.stem_lab_leads || 0) + (c.bulk_leads || 0) + (c.dealer_leads || 0)

  const kpis = [
    ['Orders', String(c.orders ?? 0)],
    ['Revenue', inr(revenue)],
    ['Leads', String(leads)],
    ['Subscribers', String(c.newsletter_subscribers ?? 0)],
    ['Products', String(c.products ?? 0)],
    ['Workshops', String(c.workshops ?? 0)],
    ['Testimonials', String(c.testimonials ?? 0)],
    ['Reviews', String(c.reviews ?? 0)],
  ]

  return (
    <>
      <AdminHeader title="Dashboard" sub="Operational overview" action={<span className="text-xs glass px-3 py-1.5 rounded-full text-signal">● Session active</span>} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map(([k, v]) => (
          <div key={k} className="glass rounded-2xl p-5">
            <div className="text-premium/50 text-xs uppercase tracking-widest">{k}</div>
            <div className="text-2xl font-extrabold mt-1">{v}</div>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-bold mt-8 mb-3">Recent orders</h2>
      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border text-left text-premium/50">
            <th className="px-4 py-3">Order</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Total</th><th className="px-4 py-3">Date</th>
          </tr></thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-premium/40">No orders yet.</td></tr>
            ) : orders.slice(0, 8).map(o => (
              <tr key={o.id} className="border-b border-border/50">
                <td className="px-4 py-3 font-mono text-xs">{o.order_number}</td>
                <td className="px-4 py-3 capitalize">{o.status}</td>
                <td className="px-4 py-3">{inr(o.total_inr || 0)}</td>
                <td className="px-4 py-3 text-premium/50">{o.created_at ? new Date(o.created_at).toLocaleDateString('en-IN') : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
