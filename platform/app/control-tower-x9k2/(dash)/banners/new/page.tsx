import AdminHeader from '@/components/admin/page-header'
import CrudForm from '@/components/admin/crud-form'
import { BANNER_FIELDS, BANNER_HINTS } from '@/lib/admin/schemas'
import { ADMIN_SLUG } from '@/lib/admin/security'

export const dynamic = 'force-dynamic'

export default function New() {
  const base = `/${ADMIN_SLUG}/banners`
  return (
    <>
      <AdminHeader title="New · Banners" />
      <CrudForm table="banners" fields={BANNER_FIELDS} backTo={base} {...BANNER_HINTS} />
    </>
  )
}
