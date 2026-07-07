import AdminHeader from '@/components/admin/page-header'
import CrudForm from '@/components/admin/crud-form'
import { PRODUCT_FIELDS, PRODUCT_HINTS } from '@/lib/admin/schemas'
import { ADMIN_SLUG } from '@/lib/admin/security'

export const dynamic = 'force-dynamic'

export default function NewProduct() {
  const base = `/${ADMIN_SLUG}/products`
  return (
    <>
      <AdminHeader title="New product" />
      <CrudForm table="products" fields={PRODUCT_FIELDS} backTo={base} {...PRODUCT_HINTS} />
    </>
  )
}
