import Link from 'next/link'
import { fetchAll } from '@/lib/admin/fetch'
import AdminHeader from '@/components/admin/page-header'
import DataTable from '@/components/admin/data-table'
import { DeleteButton, EditLink, ToggleBadge } from '@/components/admin/row-actions'
import { ADMIN_SLUG } from '@/lib/admin/security'

export const dynamic = 'force-dynamic'
const BASE = `/${ADMIN_SLUG}/testimonials`

export default async function List() {
  const rows = await fetchAll('testimonials')
  return (
    <>
      <AdminHeader title="Testimonials" sub="WhatsApp wall — moderate & approve" action={<Link href={`${BASE}/new`} className="px-5 py-2.5 rounded-xl btn-cyber font-bold text-sm">+ New</Link>} />
      <DataTable
        rows={rows}
        searchKeys={["name","message"]}
        cols={[
          { key:'name', label:'Name', render:r=> <span className="font-semibold">{r.name}</span> },
          { key:'segment', label:'Segment' },
          { key:'message', label:'Message', render:r=> <span className="text-premium/60 line-clamp-1 max-w-xs inline-block">{r.message}</span> },
          { key:'approved', label:'Approved', render:r=> <ToggleBadge table="testimonials" id={r.id} field="approved" value={!!r.approved} /> },
          { key:'actions', label:'', render:r=> <span className="flex gap-3"><EditLink base={BASE} id={r.id} /><DeleteButton table="testimonials" id={r.id} /></span> },
        ]}
      />
    </>
  )
}
