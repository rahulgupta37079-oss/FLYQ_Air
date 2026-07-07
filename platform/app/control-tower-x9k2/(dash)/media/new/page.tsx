import AdminHeader from '@/components/admin/page-header'
import CrudForm from '@/components/admin/crud-form'
import { MEDIA_FIELDS, MEDIA_HINTS } from '@/lib/admin/schemas'
import { ADMIN_SLUG } from '@/lib/admin/security'

export const dynamic = 'force-dynamic'

export default function New() {
  const base = `/${ADMIN_SLUG}/media`
  return (
    <>
      <AdminHeader title="New · Media" />
      <CrudForm table="media" fields={MEDIA_FIELDS} backTo={base} {...MEDIA_HINTS} />
    </>
  )
}
