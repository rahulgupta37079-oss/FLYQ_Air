import { fetchAll } from '@/lib/admin/fetch'
import AdminHeader from '@/components/admin/page-header'
import LeadCard from '@/components/admin/lead-card'

export const dynamic = 'force-dynamic'

const STAGES = ['new', 'contacted', 'qualified', 'won', 'lost']

export default async function Leads() {
  const [stem, bulk, dealer] = await Promise.all([
    fetchAll('stem_lab_leads'), fetchAll('bulk_leads'), fetchAll('dealer_leads'),
  ])

  // Unify into one stream with a source + display mapping.
  type L = { id: string; status: string; table: string; title: string; lines: string[] }
  const all: L[] = [
    ...stem.map(r => ({ id: r.id, status: r.status || 'new', table: 'stem_lab_leads', title: `STEM · ${r.school_name || 'School'}`, lines: [`${r.city || ''} ${r.state || ''}`.trim(), r.contact || r.email || '', r.budget_range || ''] })),
    ...bulk.map(r => ({ id: r.id, status: r.status || 'new', table: 'bulk_leads', title: `Bulk · ${r.company || 'Company'}`, lines: [r.email || r.phone || '', r.product ? `${r.product} ×${r.qty || '?'}` : '', r.budget || ''] })),
    ...dealer.map(r => ({ id: r.id, status: r.status || 'new', table: 'dealer_leads', title: `Dealer · ${r.company || 'Company'}`, lines: [`${r.city || ''} ${r.state || ''}`.trim(), r.monthly_volume || '', r.current_lines || ''] })),
  ]

  return (
    <>
      <AdminHeader title="Leads" sub={`${all.length} across STEM, Bulk & Dealer pipelines`} />
      <div className="grid md:grid-cols-5 gap-4">
        {STAGES.map(stage => {
          const col = all.filter(l => l.status === stage)
          return (
            <div key={stage} className="bg-slatedeep/40 rounded-2xl p-3 min-h-[200px]">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs uppercase tracking-widest text-premium/50 capitalize">{stage}</span>
                <span className="text-xs glass px-2 py-0.5 rounded-full">{col.length}</span>
              </div>
              {col.map(l => <LeadCard key={`${l.table}-${l.id}`} table={l.table} lead={l} title={l.title} lines={l.lines} />)}
              {col.length === 0 && <p className="text-premium/20 text-xs text-center mt-6">Empty</p>}
            </div>
          )
        })}
      </div>
    </>
  )
}
