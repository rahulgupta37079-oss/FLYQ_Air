'use client'
import { useState, useTransition } from 'react'
import { saveSetting } from '@/lib/admin/actions'

export default function SettingsEditor({ settings }: { settings: { key: string; value: any }[] }) {
  return (
    <div className="space-y-5">
      {settings.length === 0 && <p className="text-premium/40 text-sm">No settings rows yet. They are created by the seed migration (e.g. <code>contact</code>).</p>}
      {settings.map(s => <SettingRow key={s.key} k={s.key} value={s.value} />)}
      <div className="pt-2"><SettingRow k="" value={{}} isNew /></div>
    </div>
  )
}

function SettingRow({ k, value, isNew }: { k: string; value: any; isNew?: boolean }) {
  const [keyVal, setKeyVal] = useState(k)
  const [json, setJson] = useState(JSON.stringify(value ?? {}, null, 2))
  const [pending, start] = useTransition()
  const [msg, setMsg] = useState('')

  function save() {
    if (!keyVal) { setMsg('Key required'); return }
    const fd = new FormData(); fd.set('value', json)
    start(async () => {
      const res = await saveSetting(keyVal, fd)
      setMsg(res.ok ? 'Saved' : res.error || 'Error'); setTimeout(() => setMsg(''), 2500)
    })
  }

  return (
    <div className="glass rounded-2xl p-5">
      <input value={keyVal} onChange={e => setKeyVal(e.target.value)} disabled={!isNew} placeholder="setting key" className="font-mono text-sm font-bold bg-transparent border-b border-border focus:border-cyber outline-none pb-1 mb-3 disabled:opacity-100" />
      <textarea value={json} onChange={e => setJson(e.target.value)} rows={5} className="w-full px-4 py-2.5 rounded-lg bg-slatedeep border border-border focus:border-cyber outline-none font-mono text-xs" />
      <div className="mt-3"><button onClick={save} disabled={pending} className="px-5 py-2 rounded-xl btn-cyber font-bold text-sm disabled:opacity-60">{pending ? 'Saving…' : 'Save'}</button>{msg && <span className="text-sm text-signal ml-3">{msg}</span>}</div>
    </div>
  )
}
