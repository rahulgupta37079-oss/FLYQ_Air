import Link from 'next/link'
import { fetchAll } from '@/lib/admin/fetch'
import AdminHeader from '@/components/admin/page-header'
import DataTable from '@/components/admin/data-table'
import { DeleteButton, EditLink, ToggleBadge } from '@/components/admin/row-actions'
import { ADMIN_SLUG } from '@/lib/admin/security'

export const dynamic = 'force-dynamic'
const BASE = `/${ADMIN_SLUG}/media`

export default async function List() {
  const rows = await fetchAll('media')
  return (
    <>
      <AdminHeader title="Media" sub="Asset library" action={<Link href={`${BASE}/new`} className="px-5 py-2.5 rounded-xl btn-cyber font-bold text-sm">+ New</Link>} />
      <DataTable
        rows={rows}
        searchKeys={["url","alt"]}
        cols={[
          { key:'url', label:'Asset', render:r=> <a href={r.url} target="_blank" rel="noreferrer" className="text-cyber text-xs hover:underline break-all">{r.url}</a> },
          { key:'kind', label:'Kind' },
          { key:'alt', label:'Alt' },
          { key:'actions', label:'', render:r=> <span className="flex gap-3"><DeleteButton table="media" id={r.id} /></span> },
        ]}
      />
    </>
  )
}
