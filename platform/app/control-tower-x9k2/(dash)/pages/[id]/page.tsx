import { notFound } from 'next/navigation'
import AdminHeader from '@/components/admin/page-header'
import CrudForm from '@/components/admin/crud-form'
import { fetchOne } from '@/lib/admin/fetch'
import { PAGE_FIELDS, PAGE_HINTS } from '@/lib/admin/schemas'
import { ADMIN_SLUG } from '@/lib/admin/security'

export const dynamic = 'force-dynamic'

export default async function Edit({ params }: { params: { id: string } }) {
  const base = `/${ADMIN_SLUG}/pages`
  const row = await fetchOne('pages', params.id)
  if (!row) notFound()
  return (
    <>
      <AdminHeader title="Edit · Pages" />
      <CrudForm table="pages" fields={PAGE_FIELDS} row={row} backTo={base} {...PAGE_HINTS} />
    </>
  )
}
