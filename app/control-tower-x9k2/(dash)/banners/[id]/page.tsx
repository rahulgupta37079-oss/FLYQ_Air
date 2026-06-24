import { notFound } from 'next/navigation'
import AdminHeader from '@/components/admin/page-header'
import CrudForm from '@/components/admin/crud-form'
import { fetchOne } from '@/lib/admin/fetch'
import { BANNER_FIELDS, BANNER_HINTS } from '@/lib/admin/schemas'
import { ADMIN_SLUG } from '@/lib/admin/security'

export const dynamic = 'force-dynamic'

export default async function Edit({ params }: { params: { id: string } }) {
  const base = `/${ADMIN_SLUG}/banners`
  const row = await fetchOne('banners', params.id)
  if (!row) notFound()
  return (
    <>
      <AdminHeader title="Edit · Banners" />
      <CrudForm table="banners" fields={BANNER_FIELDS} row={row} backTo={base} {...BANNER_HINTS} />
    </>
  )
}
