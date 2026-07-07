import { notFound } from 'next/navigation'
import AdminHeader from '@/components/admin/page-header'
import CrudForm from '@/components/admin/crud-form'
import { fetchOne } from '@/lib/admin/fetch'
import { PRODUCT_FIELDS, PRODUCT_HINTS } from '@/lib/admin/schemas'
import { ADMIN_SLUG } from '@/lib/admin/security'

export const dynamic = 'force-dynamic'

export default async function EditProduct({ params }: { params: { id: string } }) {
  const base = `/${ADMIN_SLUG}/products`
  const row = await fetchOne('products', params.id)
  if (!row) notFound()
  return (
    <>
      <AdminHeader title={`Edit · ${row.name}`} />
      <CrudForm table="products" fields={PRODUCT_FIELDS} row={row} backTo={base} {...PRODUCT_HINTS} />
    </>
  )
}
