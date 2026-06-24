import { fetchAll } from '@/lib/admin/fetch'
import AdminHeader from '@/components/admin/page-header'
import DataTable from '@/components/admin/data-table'

export const dynamic = 'force-dynamic'

export default async function Audit() {
  const rows = await fetchAll('admin_audit')
  return (
    <>
      <AdminHeader title="Audit Log" sub="Security & administrative events" />
      <DataTable
        rows={rows}
        searchKeys={['action', 'target']}
        empty="No audit events recorded yet."
        cols={[
          { key: 'created_at', label: 'When', render: r => r.created_at ? new Date(r.created_at).toLocaleString('en-IN') : '—' },
          { key: 'action', label: 'Action', render: r => <span className="font-mono text-xs">{r.action}</span> },
          { key: 'target', label: 'Target', render: r => <span className="text-premium/60 text-xs">{r.target || '—'}</span> },
          { key: 'ip', label: 'IP', render: r => <span className="font-mono text-xs">{r.ip || '—'}</span> },
        ]}
      />
    </>
  )
}
