import AdminHeader from '@/components/admin/page-header'
import CrudForm from '@/components/admin/crud-form'
import { COUPON_FIELDS, COUPON_HINTS } from '@/lib/admin/schemas'
import { ADMIN_SLUG } from '@/lib/admin/security'

export const dynamic = 'force-dynamic'

export default function New() {
  const base = `/${ADMIN_SLUG}/coupons`
  return (
    <>
      <AdminHeader title="New · Coupons" />
      <CrudForm table="coupons" fields={COUPON_FIELDS} backTo={base} {...COUPON_HINTS} />
    </>
  )
}
