import Link from 'next/link'
import { fetchAll } from '@/lib/admin/fetch'
import AdminHeader from '@/components/admin/page-header'
import DataTable from '@/components/admin/data-table'
import { DeleteButton, EditLink, ToggleBadge } from '@/components/admin/row-actions'
import { ADMIN_SLUG } from '@/lib/admin/security'

export const dynamic = 'force-dynamic'
const BASE = `/${ADMIN_SLUG}/pages`

export default async function List() {
  const rows = await fetchAll('pages', 'updated_at')
  return (
    <>
      <AdminHeader title="Pages" sub="Legal & static content CMS" action={<Link href={`${BASE}/new`} className="px-5 py-2.5 rounded-xl btn-cyber font-bold text-sm">+ New</Link>} />
      <DataTable
        rows={rows}
        searchKeys={["slug","title"]}
        cols={[
          { key:'slug', label:'Slug', render:r=> <span className="font-mono">{r.slug}</span> },
          { key:'title', label:'Title' },
          { key:'actions', label:'', render:r=> <span className="flex gap-3"><EditLink base={BASE} id={r.id} /><DeleteButton table="pages" id={r.id} /></span> },
        ]}
      />
    </>
  )
}
