import { fetchAll } from '@/lib/admin/fetch'
import AdminHeader from '@/components/admin/page-header'
import DataTable from '@/components/admin/data-table'
import { DeleteButton, ToggleBadge } from '@/components/admin/row-actions'

export const dynamic = 'force-dynamic'

export default async function Reviews() {
  const rows = await fetchAll('reviews')
  return (
    <>
      <AdminHeader title="Reviews" sub="Moderate product reviews" />
      <DataTable
        rows={rows}
        searchKeys={['title', 'body']}
        empty="No reviews yet."
        cols={[
          { key: 'rating', label: 'Rating', render: r => '★'.repeat(r.rating || 0) },
          { key: 'title', label: 'Title', render: r => <span className="font-semibold">{r.title || '—'}</span> },
          { key: 'body', label: 'Review', render: r => <span className="text-premium/60 line-clamp-1 max-w-xs inline-block">{r.body}</span> },
          { key: 'verified_buyer', label: 'Verified', render: r => r.verified_buyer ? '✓' : '—' },
          { key: 'approved', label: 'Approved', render: r => <ToggleBadge table="reviews" id={r.id} field="approved" value={!!r.approved} /> },
          { key: 'actions', label: '', render: r => <DeleteButton table="reviews" id={r.id} /> },
        ]}
      />
    </>
  )
}
