import { createServiceClient } from '@/lib/supabase/server'

/** Fetch all rows from a table for admin lists. Returns [] when backend not configured. */
export async function fetchAll(table: string, orderBy = 'created_at', ascending = false): Promise<any[]> {
  const supabase = createServiceClient()
  if (!supabase) return []
  const { data, error } = await supabase.from(table).select('*').order(orderBy, { ascending })
  if (error) { console.error(`[admin:fetch ${table}]`, error.message); return [] }
  return data ?? []
}

export async function fetchOne(table: string, id: string): Promise<any | null> {
  const supabase = createServiceClient()
  if (!supabase) return null
  const { data } = await supabase.from(table).select('*').eq('id', id).single()
  return data ?? null
}

export async function counts(): Promise<Record<string, number>> {
  const supabase = createServiceClient()
  if (!supabase) return {}
  const tables = ['orders', 'stem_lab_leads', 'bulk_leads', 'dealer_leads', 'newsletter_subscribers', 'products', 'workshops', 'testimonials', 'reviews']
  const out: Record<string, number> = {}
  await Promise.all(tables.map(async t => {
    const { count } = await supabase.from(t).select('*', { count: 'exact', head: true })
    out[t] = count ?? 0
  }))
  return out
}
