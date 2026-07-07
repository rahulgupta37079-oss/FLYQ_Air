import AdminHeader from '@/components/admin/page-header'
import CrudForm from '@/components/admin/crud-form'
import { FAQ_FIELDS, FAQ_HINTS } from '@/lib/admin/schemas'
import { ADMIN_SLUG } from '@/lib/admin/security'

export const dynamic = 'force-dynamic'

export default function New() {
  const base = `/${ADMIN_SLUG}/faq`
  return (
    <>
      <AdminHeader title="New · FAQ" />
      <CrudForm table="faqs" fields={FAQ_FIELDS} backTo={base} {...FAQ_HINTS} />
    </>
  )
}
