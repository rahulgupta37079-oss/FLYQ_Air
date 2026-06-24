import { notFound } from 'next/navigation'
import { fetchOne } from '@/lib/admin/fetch'
import { createServiceClient } from '@/lib/supabase/server'
import AdminHeader from '@/components/admin/page-header'
import OrderStatus from '@/components/admin/order-status'
import { inr } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function OrderDetail({ params }: { params: { id: string } }) {
  const order = await fetchOne('orders', params.id)
  if (!order) notFound()
  const supabase = createServiceClient()
  const { data: items } = supabase ? await supabase.from('order_items').select('*').eq('order_id', order.id) : { data: [] as any[] }
  const addr = order.shipping_address || {}

  return (
    <>
      <AdminHeader title={`Order ${order.order_number}`} sub={order.created_at ? new Date(order.created_at).toLocaleString('en-IN') : ''} />
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-bold mb-3">Items</h3>
            <table className="w-full text-sm">
              <tbody>
                {(items || []).map((it: any) => (
                  <tr key={it.id} className="border-b border-border/50">
                    <td className="py-2">{it.name}</td>
                    <td className="py-2 text-premium/50">×{it.qty}</td>
                    <td className="py-2 text-right">{inr((it.unit_price_inr || 0) * (it.qty || 1))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 text-sm space-y-1 text-premium/70">
              <div className="flex justify-between"><span>Subtotal</span><span>{inr(order.subtotal_inr || 0)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{inr(order.shipping_inr || 0)}</span></div>
              <div className="flex justify-between"><span>GST</span><span>{inr(order.tax_inr || 0)}</span></div>
              <div className="flex justify-between font-bold text-premium pt-1 border-t border-border"><span>Total</span><span>{inr(order.total_inr || 0)}</span></div>
            </div>
          </div>
          <div className="glass rounded-2xl p-6 text-sm">
            <h3 className="font-bold mb-3">Shipping address</h3>
            <p className="text-premium/70">{addr.name}<br />{addr.line1}<br />{addr.city}, {addr.state} {addr.pincode}<br />{addr.phone} · {addr.email}</p>
            {order.gstin && <p className="text-premium/50 mt-2">GSTIN: {order.gstin}</p>}
          </div>
        </div>
        <OrderStatus id={order.id} status={order.status} awb={order.shiprocket_awb} />
      </div>
    </>
  )
}
