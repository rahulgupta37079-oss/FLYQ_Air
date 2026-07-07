import { notFound } from 'next/navigation'
import AdminHeader from '@/components/admin/page-header'
import CrudForm from '@/components/admin/crud-form'
import { fetchOne } from '@/lib/admin/fetch'
import { WORKSHOP_FIELDS, WORKSHOP_HINTS } from '@/lib/admin/schemas'
import { ADMIN_SLUG } from '@/lib/admin/security'

export const dynamic = 'force-dynamic'

export default async function Edit({ params }: { params: { id: string } }) {
  const base = `/${ADMIN_SLUG}/workshops`
  const row = await fetchOne('workshops', params.id)
  if (!row) notFound()
  return (
    <>
      <AdminHeader title="Edit · Workshops" />
      <CrudForm table="workshops" fields={WORKSHOP_FIELDS} row={row} backTo={base} {...WORKSHOP_HINTS} />
    </>
  )
}
