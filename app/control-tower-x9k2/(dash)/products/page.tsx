import Link from 'next/link'
import { fetchAll } from '@/lib/admin/fetch'
import AdminHeader from '@/components/admin/page-header'
import DataTable from '@/components/admin/data-table'
import { DeleteButton, EditLink, ToggleBadge } from '@/components/admin/row-actions'
import { ADMIN_SLUG } from '@/lib/admin/security'
import { inr } from '@/lib/utils'

export const dynamic = 'force-dynamic'
const BASE = `/${ADMIN_SLUG}/products`

export default async function ProductsList() {
  const rows = await fetchAll('products')
  return (
    <>
      <AdminHeader title="Products" sub="Catalog, pricing & stock" action={<Link href={`${BASE}/new`} className="px-5 py-2.5 rounded-xl btn-cyber font-bold text-sm">+ New product</Link>} />
      <DataTable
        rows={rows}
        searchKeys={['name', 'slug']}
        empty="No products. Add one, or seed via supabase/migrations/0003_seed.sql."
        cols={[
          { key: 'name', label: 'Name', render: r => <span className="font-semibold">{r.name}</span> },
          { key: 'price_inr', label: 'Price', render: r => inr(r.price_inr || 0) },
          { key: 'stock', label: 'Stock' },
          { key: 'is_featured', label: 'Featured', render: r => <ToggleBadge table="products" id={r.id} field="is_featured" value={!!r.is_featured} /> },
          { key: 'is_published', label: 'Published', render: r => <ToggleBadge table="products" id={r.id} field="is_published" value={!!r.is_published} on="Live" off="Draft" /> },
          { key: 'actions', label: '', render: r => <span className="flex gap-3"><EditLink base={BASE} id={r.id} /><DeleteButton table="products" id={r.id} /></span> },
        ]}
      />
    </>
  )
}
