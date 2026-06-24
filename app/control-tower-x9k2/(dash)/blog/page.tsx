import Link from 'next/link'
import { fetchAll } from '@/lib/admin/fetch'
import AdminHeader from '@/components/admin/page-header'
import DataTable from '@/components/admin/data-table'
import { DeleteButton, EditLink, ToggleBadge } from '@/components/admin/row-actions'
import { ADMIN_SLUG } from '@/lib/admin/security'

export const dynamic = 'force-dynamic'
const BASE = `/${ADMIN_SLUG}/blog`

export default async function List() {
  const rows = await fetchAll('blog_posts')
  return (
    <>
      <AdminHeader title="Blog" sub="Journal posts" action={<Link href={`${BASE}/new`} className="px-5 py-2.5 rounded-xl btn-cyber font-bold text-sm">+ New</Link>} />
      <DataTable
        rows={rows}
        searchKeys={["title","slug"]}
        cols={[
          { key:'title', label:'Title', render:r=> <span className="font-semibold">{r.title}</span> },
          { key:'author', label:'Author' },
          { key:'published', label:'Published', render:r=> <ToggleBadge table="blog_posts" id={r.id} field="published" value={!!r.published} on="Live" off="Draft" /> },
          { key:'actions', label:'', render:r=> <span className="flex gap-3"><EditLink base={BASE} id={r.id} /><DeleteButton table="blog_posts" id={r.id} /></span> },
        ]}
      />
    </>
  )
}
