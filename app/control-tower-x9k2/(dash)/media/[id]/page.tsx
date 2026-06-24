import { notFound } from 'next/navigation'
import AdminHeader from '@/components/admin/page-header'
import CrudForm from '@/components/admin/crud-form'
import { fetchOne } from '@/lib/admin/fetch'
import { MEDIA_FIELDS, MEDIA_HINTS } from '@/lib/admin/schemas'
import { ADMIN_SLUG } from '@/lib/admin/security'

export const dynamic = 'force-dynamic'

export default async function Edit({ params }: { params: { id: string } }) {
  const base = `/${ADMIN_SLUG}/media`
  const row = await fetchOne('media', params.id)
  if (!row) notFound()
  return (
    <>
      <AdminHeader title="Edit · Media" />
      <CrudForm table="media" fields={MEDIA_FIELDS} row={row} backTo={base} {...MEDIA_HINTS} />
    </>
  )
}
