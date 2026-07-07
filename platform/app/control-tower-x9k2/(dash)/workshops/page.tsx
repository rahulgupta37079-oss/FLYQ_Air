import Link from 'next/link'
import { fetchAll } from '@/lib/admin/fetch'
import AdminHeader from '@/components/admin/page-header'
import DataTable from '@/components/admin/data-table'
import { DeleteButton, EditLink, ToggleBadge } from '@/components/admin/row-actions'
import { ADMIN_SLUG } from '@/lib/admin/security'

export const dynamic = 'force-dynamic'
const BASE = `/${ADMIN_SLUG}/workshops`

export default async function List() {
  const rows = await fetchAll('workshops')
  return (
    <>
      <AdminHeader title="Workshops" sub="Events & seats" action={<Link href={`${BASE}/new`} className="px-5 py-2.5 rounded-xl btn-cyber font-bold text-sm">+ New</Link>} />
      <DataTable
        rows={rows}
        searchKeys={["title","city"]}
        cols={[
          { key:'title', label:'Title', render:r=> <span className="font-semibold">{r.title}</span> },
          { key:'event_date', label:'Date', render:r=> r.event_date ? new Date(r.event_date).toLocaleDateString('en-IN') : '—' },
          { key:'city', label:'City' },
          { key:'seats', label:'Seats', render:r=> `${r.seats_taken||0}/${r.seats||0}` },
          { key:'published', label:'Published', render:r=> <ToggleBadge table="workshops" id={r.id} field="published" value={!!r.published} on="Live" off="Draft" /> },
          { key:'actions', label:'', render:r=> <span className="flex gap-3"><EditLink base={BASE} id={r.id} /><DeleteButton table="workshops" id={r.id} /></span> },
        ]}
      />
    </>
  )
}
