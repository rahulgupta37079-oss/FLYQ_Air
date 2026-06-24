'use client'
import Link from 'next/link'
import { useTransition } from 'react'
import { deleteRow, toggleField } from '@/lib/admin/actions'

export function DeleteButton({ table, id }: { table: string; id: string }) {
  const [pending, start] = useTransition()
  return (
    <button
      disabled={pending}
      onClick={() => { if (confirm('Delete this record? This cannot be undone.')) start(() => { deleteRow(table, id) }) }}
      className="text-danger/80 hover:text-danger text-xs disabled:opacity-50"
    >{pending ? '…' : 'Delete'}</button>
  )
}

export function EditLink({ base, id }: { base: string; id: string }) {
  return <Link href={`${base}/${id}`} className="text-cyber text-xs hover:underline">Edit</Link>
}

export function ToggleBadge({ table, id, field, value, on = 'Yes', off = 'No' }: {
  table: string; id: string; field: string; value: boolean; on?: string; off?: string
}) {
  const [pending, start] = useTransition()
  return (
    <button
      disabled={pending}
      onClick={() => start(() => { toggleField(table, id, field, !value) })}
      className={`text-xs px-2 py-1 rounded-full border ${value ? 'border-signal/40 text-signal bg-signal/10' : 'border-border text-premium/50'} disabled:opacity-50`}
    >{pending ? '…' : value ? on : off}</button>
  )
}
