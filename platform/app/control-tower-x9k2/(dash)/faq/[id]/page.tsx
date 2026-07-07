import { notFound } from 'next/navigation'
import AdminHeader from '@/components/admin/page-header'
import CrudForm from '@/components/admin/crud-form'
import { fetchOne } from '@/lib/admin/fetch'
import { FAQ_FIELDS, FAQ_HINTS } from '@/lib/admin/schemas'
import { ADMIN_SLUG } from '@/lib/admin/security'

export const dynamic = 'force-dynamic'

export default async function Edit({ params }: { params: { id: string } }) {
  const base = `/${ADMIN_SLUG}/faq`
  const row = await fetchOne('faqs', params.id)
  if (!row) notFound()
  return (
    <>
      <AdminHeader title="Edit · FAQ" />
      <CrudForm table="faqs" fields={FAQ_FIELDS} row={row} backTo={base} {...FAQ_HINTS} />
    </>
  )
}
