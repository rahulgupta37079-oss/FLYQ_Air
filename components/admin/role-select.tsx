'use client'
import { useTransition } from 'react'
import { setUserRole } from '@/lib/admin/actions'

const ROLES = ['customer', 'staff', 'admin']

export default function RoleSelect({ userId, role }: { userId: string; role: string }) {
  const [pending, start] = useTransition()
  return (
    <select
      defaultValue={role}
      disabled={pending}
      onChange={e => start(() => { setUserRole(userId, e.target.value) })}
      className="px-3 py-1.5 rounded-lg bg-slatedeep border border-border text-xs capitalize focus:border-cyber outline-none disabled:opacity-50"
    >
      {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
    </select>
  )
}
