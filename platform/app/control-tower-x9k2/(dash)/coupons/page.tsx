import Link from 'next/link'
import { fetchAll } from '@/lib/admin/fetch'
import AdminHeader from '@/components/admin/page-header'
import DataTable from '@/components/admin/data-table'
import { DeleteButton, EditLink, ToggleBadge } from '@/components/admin/row-actions'
import { ADMIN_SLUG } from '@/lib/admin/security'

export const dynamic = 'force-dynamic'
const BASE = `/${ADMIN_SLUG}/coupons`

export default async function List() {
  const rows = await fetchAll('coupons')
  return (
    <>
      <AdminHeader title="Coupons" sub="Discount codes" action={<Link href={`${BASE}/new`} className="px-5 py-2.5 rounded-xl btn-cyber font-bold text-sm">+ New</Link>} />
      <DataTable
        rows={rows}
        searchKeys={["code"]}
        cols={[
          { key:'code', label:'Code', render:r=> <span className="font-mono font-semibold">{r.code}</span> },
          { key:'kind', label:'Kind' },
          { key:'value', label:'Value' },
          { key:'active', label:'Active', render:r=> <ToggleBadge table="coupons" id={r.id} field="active" value={!!r.active} /> },
          { key:'actions', label:'', render:r=> <span className="flex gap-3"><EditLink base={BASE} id={r.id} /><DeleteButton table="coupons" id={r.id} /></span> },
        ]}
      />
    </>
  )
}
