import Link from 'next/link'
import { fetchAll } from '@/lib/admin/fetch'
import AdminHeader from '@/components/admin/page-header'
import DataTable from '@/components/admin/data-table'
import { EditLink } from '@/components/admin/row-actions'
import { ADMIN_SLUG } from '@/lib/admin/security'
import { inr } from '@/lib/utils'

export const dynamic = 'force-dynamic'
const BASE = `/${ADMIN_SLUG}/orders`

export default async function OrdersList() {
  const rows = await fetchAll('orders')
  return (
    <>
      <AdminHeader title="Orders" sub="Fulfilment & tracking" />
      <DataTable
        rows={rows}
        searchKeys={['order_number', 'status']}
        empty="No orders yet."
        cols={[
          { key: 'order_number', label: 'Order', render: r => <span className="font-mono text-xs">{r.order_number}</span> },
          { key: 'status', label: 'Status', render: r => <span className="capitalize px-2 py-1 rounded-full text-xs glass">{r.status}</span> },
          { key: 'payment_method', label: 'Payment' },
          { key: 'total_inr', label: 'Total', render: r => inr(r.total_inr || 0) },
          { key: 'created_at', label: 'Date', render: r => r.created_at ? new Date(r.created_at).toLocaleDateString('en-IN') : '—' },
          { key: 'actions', label: '', render: r => <EditLink base={BASE} id={r.id} /> },
        ]}
      />
    </>
  )
}
