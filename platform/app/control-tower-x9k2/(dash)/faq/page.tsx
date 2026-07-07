import Link from 'next/link'
import { fetchAll } from '@/lib/admin/fetch'
import AdminHeader from '@/components/admin/page-header'
import DataTable from '@/components/admin/data-table'
import { DeleteButton, EditLink, ToggleBadge } from '@/components/admin/row-actions'
import { ADMIN_SLUG } from '@/lib/admin/security'

export const dynamic = 'force-dynamic'
const BASE = `/${ADMIN_SLUG}/faq`

export default async function List() {
  const rows = await fetchAll('faqs')
  return (
    <>
      <AdminHeader title="FAQ" sub="Knowledge base" action={<Link href={`${BASE}/new`} className="px-5 py-2.5 rounded-xl btn-cyber font-bold text-sm">+ New</Link>} />
      <DataTable
        rows={rows}
        searchKeys={["question","category"]}
        cols={[
          { key:'question', label:'Question', render:r=> <span className="font-semibold">{r.question}</span> },
          { key:'category', label:'Category' },
          { key:'published', label:'Published', render:r=> <ToggleBadge table="faqs" id={r.id} field="published" value={!!r.published} /> },
          { key:'actions', label:'', render:r=> <span className="flex gap-3"><EditLink base={BASE} id={r.id} /><DeleteButton table="faqs" id={r.id} /></span> },
        ]}
      />
    </>
  )
}
