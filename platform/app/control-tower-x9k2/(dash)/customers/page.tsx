import { fetchAll } from '@/lib/admin/fetch'
import AdminHeader from '@/components/admin/page-header'
import DataTable from '@/components/admin/data-table'

export const dynamic = 'force-dynamic'

export default async function Customers() {
  const rows = await fetchAll('profiles')
  return (
    <>
      <AdminHeader title="Customers" sub="Registered accounts" />
      <DataTable
        rows={rows}
        searchKeys={['full_name', 'phone', 'referral_code']}
        empty="No customers yet."
        cols={[
          { key: 'full_name', label: 'Name', render: r => <span className="font-semibold">{r.full_name || '—'}</span> },
          { key: 'phone', label: 'Phone' },
          { key: 'role', label: 'Role', render: r => <span className="capitalize px-2 py-1 rounded-full text-xs glass">{r.role}</span> },
          { key: 'referral_code', label: 'Referral', render: r => <span className="font-mono text-xs">{r.referral_code || '—'}</span> },
          { key: 'created_at', label: 'Joined', render: r => r.created_at ? new Date(r.created_at).toLocaleDateString('en-IN') : '—' },
        ]}
      />
    </>
  )
}
