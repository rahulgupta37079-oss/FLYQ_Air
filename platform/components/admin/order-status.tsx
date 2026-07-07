'use client'
import { useState, useTransition } from 'react'
import { updateOrderStatus } from '@/lib/admin/actions'

const STATUSES = ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']

export default function OrderStatus({ id, status, awb }: { id: string; status: string; awb?: string }) {
  const [s, setS] = useState(status)
  const [awbVal, setAwb] = useState(awb || '')
  const [pending, start] = useTransition()
  const [msg, setMsg] = useState('')

  function save() {
    start(async () => {
      const res = await updateOrderStatus(id, s, awbVal || undefined)
      setMsg(res.ok ? 'Saved' : res.error || 'Error')
      setTimeout(() => setMsg(''), 2500)
    })
  }

  return (
    <div className="glass rounded-2xl p-6 space-y-4">
      <label className="block text-sm">
        <span className="text-premium/60">Order status</span>
        <select value={s} onChange={e => setS(e.target.value)} className="mt-1 w-full px-4 py-2.5 rounded-lg bg-slatedeep border border-border focus:border-cyber outline-none capitalize">
          {STATUSES.map(x => <option key={x} value={x}>{x}</option>)}
        </select>
      </label>
      <label className="block text-sm">
        <span className="text-premium/60">Shiprocket AWB / tracking</span>
        <input value={awbVal} onChange={e => setAwb(e.target.value)} className="mt-1 w-full px-4 py-2.5 rounded-lg bg-slatedeep border border-border focus:border-cyber outline-none" />
      </label>
      <button onClick={save} disabled={pending} className="px-6 py-2.5 rounded-xl btn-cyber font-bold disabled:opacity-60">{pending ? 'Saving…' : 'Update order'}</button>
      {msg && <span className="text-sm text-signal ml-3">{msg}</span>}
    </div>
  )
}
