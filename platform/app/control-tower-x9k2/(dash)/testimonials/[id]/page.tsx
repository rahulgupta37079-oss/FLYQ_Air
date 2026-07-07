import { notFound } from 'next/navigation'
import AdminHeader from '@/components/admin/page-header'
import CrudForm from '@/components/admin/crud-form'
import { fetchOne } from '@/lib/admin/fetch'
import { TESTIMONIAL_FIELDS, TESTIMONIAL_HINTS } from '@/lib/admin/schemas'
import { ADMIN_SLUG } from '@/lib/admin/security'

export const dynamic = 'force-dynamic'

export default async function Edit({ params }: { params: { id: string } }) {
  const base = `/${ADMIN_SLUG}/testimonials`
  const row = await fetchOne('testimonials', params.id)
  if (!row) notFound()
  return (
    <>
      <AdminHeader title="Edit · Testimonials" />
      <CrudForm table="testimonials" fields={TESTIMONIAL_FIELDS} row={row} backTo={base} {...TESTIMONIAL_HINTS} />
    </>
  )
}
