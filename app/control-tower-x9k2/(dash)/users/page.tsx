import { fetchAll } from '@/lib/admin/fetch'
import AdminHeader from '@/components/admin/page-header'
import DataTable from '@/components/admin/data-table'
import RoleSelect from '@/components/admin/role-select'

export const dynamic = 'force-dynamic'

export default async function Users() {
  const rows = await fetchAll('profiles')
  return (
    <>
      <AdminHeader title="Users & Roles" sub="Grant staff / admin access. Admins only." />
      <DataTable
        rows={rows}
        searchKeys={['full_name', 'phone']}
        empty="No users yet."
        cols={[
          { key: 'full_name', label: 'Name', render: r => <span className="font-semibold">{r.full_name || r.id.slice(0, 8)}</span> },
          { key: 'phone', label: 'Phone' },
          { key: 'role', label: 'Role', render: r => <RoleSelect userId={r.id} role={r.role} /> },
          { key: 'totp', label: '2FA', render: r => r.totp_secret ? '✓ enrolled' : '—' },
          { key: 'pin', label: 'PIN', render: r => r.pin_hash ? '✓ set' : '—' },
        ]}
      />
      <p className="text-premium/30 text-xs mt-4">To enrol an admin&rsquo;s TOTP secret and PIN hash, run <code>scripts/setup-admin.ts</code> (see docs/RUNBOOK.md). Role changes are audited.</p>
    </>
  )
}
