import Link from 'next/link'
import { fetchAll } from '@/lib/admin/fetch'
import AdminHeader from '@/components/admin/page-header'
import DataTable from '@/components/admin/data-table'
import { DeleteButton, EditLink, ToggleBadge } from '@/components/admin/row-actions'
import { ADMIN_SLUG } from '@/lib/admin/security'

export const dynamic = 'force-dynamic'
const BASE = `/${ADMIN_SLUG}/banners`

export default async function List() {
  const rows = await fetchAll('banners')
  return (
    <>
      <AdminHeader title="Banners" sub="Homepage promos" action={<Link href={`${BASE}/new`} className="px-5 py-2.5 rounded-xl btn-cyber font-bold text-sm">+ New</Link>} />
      <DataTable
        rows={rows}
        searchKeys={["title"]}
        cols={[
          { key:'title', label:'Title', render:r=> <span className="font-semibold">{r.title}</span> },
          { key:'cta_label', label:'CTA' },
          { key:'active', label:'Active', render:r=> <ToggleBadge table="banners" id={r.id} field="active" value={!!r.active} /> },
          { key:'actions', label:'', render:r=> <span className="flex gap-3"><EditLink base={BASE} id={r.id} /><DeleteButton table="banners" id={r.id} /></span> },
        ]}
      />
    </>
  )
}
