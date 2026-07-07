'use client'
export default function ExportCsv({ rows, filename }: { rows: any[]; filename: string }) {
  function download() {
    if (!rows.length) return
    const cols = Object.keys(rows[0])
    const esc = (v: any) => `"${String(v ?? '').replace(/"/g, '""')}"`
    const csv = [cols.join(','), ...rows.map(r => cols.map(c => esc(r[c])).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = filename; a.click()
    URL.revokeObjectURL(url)
  }
  return <button onClick={download} className="px-5 py-2.5 rounded-xl glass font-semibold text-sm">⤓ Export CSV</button>
}
