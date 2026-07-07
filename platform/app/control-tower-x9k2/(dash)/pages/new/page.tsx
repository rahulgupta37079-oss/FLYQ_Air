import AdminHeader from '@/components/admin/page-header'
import CrudForm from '@/components/admin/crud-form'
import { PAGE_FIELDS, PAGE_HINTS } from '@/lib/admin/schemas'
import { ADMIN_SLUG } from '@/lib/admin/security'

export const dynamic = 'force-dynamic'

export default function New() {
  const base = `/${ADMIN_SLUG}/pages`
  return (
    <>
      <AdminHeader title="New · Pages" />
      <CrudForm table="pages" fields={PAGE_FIELDS} backTo={base} {...PAGE_HINTS} />
    </>
  )
}
