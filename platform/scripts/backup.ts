/**
 * Export every table to a single timestamped JSON file.
 *
 * Usage:
 *   npx tsx scripts/backup.ts
 *   (or: npx dotenv -e .env.local -- tsx scripts/backup.ts)
 *
 * Requires env: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE
 * Output: ./backups/flyq-backup-YYYY-MM-DD.json
 */
import { createClient } from '@supabase/supabase-js'
import { writeFileSync, mkdirSync } from 'fs'

const TABLES = [
  'categories', 'products', 'product_images', 'profiles', 'addresses',
  'orders', 'order_items', 'reviews', 'testimonials', 'workshops',
  'event_registrations', 'stem_lab_leads', 'bulk_leads', 'dealer_leads',
  'contact_messages', 'newsletter_subscribers', 'faqs', 'blog_posts',
  'pages', 'banners', 'coupons', 'media', 'settings', 'admin_audit',
]

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE
  if (!url || !key) { console.error('Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE'); process.exit(1) }

  const supabase = createClient(url, key, { auth: { persistSession: false } })
  const dump: Record<string, any[]> = {}

  for (const t of TABLES) {
    const { data, error } = await supabase.from(t).select('*')
    if (error) { console.warn(`⚠️  ${t}: ${error.message}`); dump[t] = []; continue }
    dump[t] = data || []
    console.log(`   ${t}: ${dump[t].length} rows`)
  }

  mkdirSync('./backups', { recursive: true })
  const date = new Date().toISOString().slice(0, 10)
  const file = `./backups/flyq-backup-${date}.json`
  writeFileSync(file, JSON.stringify({ exported_at: new Date().toISOString(), tables: dump }, null, 2))
  console.log(`\n✅ Backup written to ${file}`)
}

main().catch(e => { console.error(e); process.exit(1) })
