import { notFound } from 'next/navigation'
import AdminHeader from '@/components/admin/page-header'
import CrudForm from '@/components/admin/crud-form'
import { fetchOne } from '@/lib/admin/fetch'
import { BLOG_FIELDS, BLOG_HINTS } from '@/lib/admin/schemas'
import { ADMIN_SLUG } from '@/lib/admin/security'

export const dynamic = 'force-dynamic'

export default async function Edit({ params }: { params: { id: string } }) {
  const base = `/${ADMIN_SLUG}/blog`
  const row = await fetchOne('blog_posts', params.id)
  if (!row) notFound()
  return (
    <>
      <AdminHeader title="Edit · Blog" />
      <CrudForm table="blog_posts" fields={BLOG_FIELDS} row={row} backTo={base} {...BLOG_HINTS} />
    </>
  )
}
