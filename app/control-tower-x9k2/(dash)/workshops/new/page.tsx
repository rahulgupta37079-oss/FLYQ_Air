import AdminHeader from '@/components/admin/page-header'
import CrudForm from '@/components/admin/crud-form'
import { WORKSHOP_FIELDS, WORKSHOP_HINTS } from '@/lib/admin/schemas'
import { ADMIN_SLUG } from '@/lib/admin/security'

export const dynamic = 'force-dynamic'

export default function New() {
  const base = `/${ADMIN_SLUG}/workshops`
  return (
    <>
      <AdminHeader title="New · Workshops" />
      <CrudForm table="workshops" fields={WORKSHOP_FIELDS} backTo={base} {...WORKSHOP_HINTS} />
    </>
  )
}
