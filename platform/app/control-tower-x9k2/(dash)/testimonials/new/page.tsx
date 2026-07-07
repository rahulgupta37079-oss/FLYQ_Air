import AdminHeader from '@/components/admin/page-header'
import CrudForm from '@/components/admin/crud-form'
import { TESTIMONIAL_FIELDS, TESTIMONIAL_HINTS } from '@/lib/admin/schemas'
import { ADMIN_SLUG } from '@/lib/admin/security'

export const dynamic = 'force-dynamic'

export default function New() {
  const base = `/${ADMIN_SLUG}/testimonials`
  return (
    <>
      <AdminHeader title="New · Testimonials" />
      <CrudForm table="testimonials" fields={TESTIMONIAL_FIELDS} backTo={base} {...TESTIMONIAL_HINTS} />
    </>
  )
}
