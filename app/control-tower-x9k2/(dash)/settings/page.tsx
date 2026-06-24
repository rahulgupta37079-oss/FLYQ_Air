import { createServiceClient } from '@/lib/supabase/server'
import AdminHeader from '@/components/admin/page-header'
import SettingsEditor from '@/components/admin/settings-editor'

export const dynamic = 'force-dynamic'

export default async function Settings() {
  const supabase = createServiceClient()
  const { data } = supabase ? await supabase.from('settings').select('*').order('key') : { data: [] as any[] }
  return (
    <>
      <AdminHeader title="Settings" sub="Site configuration (key → JSON value)" />
      <SettingsEditor settings={data || []} />
    </>
  )
}
