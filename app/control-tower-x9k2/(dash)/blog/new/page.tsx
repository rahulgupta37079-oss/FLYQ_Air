import AdminHeader from '@/components/admin/page-header'
import CrudForm from '@/components/admin/crud-form'
import { BLOG_FIELDS, BLOG_HINTS } from '@/lib/admin/schemas'
import { ADMIN_SLUG } from '@/lib/admin/security'

export const dynamic = 'force-dynamic'

export default function New() {
  const base = `/${ADMIN_SLUG}/blog`
  return (
    <>
      <AdminHeader title="New · Blog" />
      <CrudForm table="blog_posts" fields={BLOG_FIELDS} backTo={base} {...BLOG_HINTS} />
    </>
  )
}
