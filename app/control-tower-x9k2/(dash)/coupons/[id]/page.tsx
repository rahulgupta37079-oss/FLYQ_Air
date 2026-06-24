import { notFound } from 'next/navigation'
import AdminHeader from '@/components/admin/page-header'
import CrudForm from '@/components/admin/crud-form'
import { fetchOne } from '@/lib/admin/fetch'
import { COUPON_FIELDS, COUPON_HINTS } from '@/lib/admin/schemas'
import { ADMIN_SLUG } from '@/lib/admin/security'

export const dynamic = 'force-dynamic'

export default async function Edit({ params }: { params: { id: string } }) {
  const base = `/${ADMIN_SLUG}/coupons`
  const row = await fetchOne('coupons', params.id)
  if (!row) notFound()
  return (
    <>
      <AdminHeader title="Edit · Coupons" />
      <CrudForm table="coupons" fields={COUPON_FIELDS} row={row} backTo={base} {...COUPON_HINTS} />
    </>
  )
}
