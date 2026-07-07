import { fetchAll } from '@/lib/admin/fetch'
import AdminHeader from '@/components/admin/page-header'
import DataTable from '@/components/admin/data-table'
import { DeleteButton } from '@/components/admin/row-actions'
import ExportCsv from '@/components/admin/export-csv'

export const dynamic = 'force-dynamic'

export default async function Newsletter() {
  const rows = await fetchAll('newsletter_subscribers')
  return (
    <>
      <AdminHeader title="Newsletter" sub={`${rows.length} subscribers`} action={<ExportCsv rows={rows} filename="newsletter.csv" />} />
      <DataTable
        rows={rows}
        searchKeys={['email']}
        empty="No subscribers yet."
        cols={[
          { key: 'email', label: 'Email', render: r => <span className="font-mono text-sm">{r.email}</span> },
          { key: 'confirmed', label: 'Confirmed', render: r => r.confirmed ? '✓' : 'pending' },
          { key: 'created_at', label: 'Subscribed', render: r => r.created_at ? new Date(r.created_at).toLocaleDateString('en-IN') : '—' },
          { key: 'actions', label: '', render: r => <DeleteButton table="newsletter_subscribers" id={r.id} /> },
        ]}
      />
    </>
  )
}
