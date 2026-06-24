'use server'
import { revalidatePath } from 'next/cache'
import { createServiceClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/admin/guard'
import { audit } from '@/lib/admin/security'
import { ADMIN_SLUG } from '@/lib/admin/security'

type Result = { ok: boolean; error?: string }

/** Coerce a FormData into a plain object, parsing JSON / arrays / numbers / booleans by hint. */
function parseForm(fd: FormData, jsonFields: string[] = [], arrayFields: string[] = [], numberFields: string[] = [], boolFields: string[] = []): Record<string, any> {
  const out: Record<string, any> = {}
  for (const [k, v] of fd.entries()) {
    if (k.startsWith('_')) continue
    const s = String(v)
    if (jsonFields.includes(k)) { try { out[k] = s ? JSON.parse(s) : {} } catch { out[k] = {} } }
    else if (arrayFields.includes(k)) out[k] = s ? s.split('\n').map(x => x.trim()).filter(Boolean) : []
    else if (numberFields.includes(k)) out[k] = s === '' ? null : Number(s)
    else if (boolFields.includes(k)) out[k] = s === 'on' || s === 'true'
    else out[k] = s === '' ? null : s
  }
  // unchecked checkboxes don't appear in FormData → default to false
  for (const b of boolFields) if (!(b in out)) out[b] = false
  return out
}

type SaveOpts = {
  table: string
  jsonFields?: string[]; arrayFields?: string[]; numberFields?: string[]; boolFields?: string[]
}

export async function saveRow(opts: SaveOpts, fd: FormData): Promise<Result> {
  const ctx = await requireAdmin()
  const supabase = createServiceClient()
  if (!supabase) return { ok: false, error: 'Backend not configured (read-only preview).' }

  const id = fd.get('_id') as string | null
  const data = parseForm(fd, opts.jsonFields, opts.arrayFields, opts.numberFields, opts.boolFields)

  const res = id
    ? await supabase.from(opts.table).update(data).eq('id', id)
    : await supabase.from(opts.table).insert(data)

  if (res.error) return { ok: false, error: res.error.message }
  await audit(ctx.userId, id ? 'update' : 'create', `${opts.table}:${id ?? 'new'}`)
  revalidatePath(`/${ADMIN_SLUG}/${opts.table}`)
  return { ok: true }
}

export async function deleteRow(table: string, id: string): Promise<Result> {
  const ctx = await requireAdmin()
  const supabase = createServiceClient()
  if (!supabase) return { ok: false, error: 'Backend not configured.' }
  const { error } = await supabase.from(table).delete().eq('id', id)
  if (error) return { ok: false, error: error.message }
  await audit(ctx.userId, 'delete', `${table}:${id}`)
  revalidatePath(`/${ADMIN_SLUG}/${table}`)
  return { ok: true }
}

/** Toggle a boolean column (publish/approve/active). */
export async function toggleField(table: string, id: string, field: string, value: boolean): Promise<Result> {
  const ctx = await requireAdmin()
  const supabase = createServiceClient()
  if (!supabase) return { ok: false, error: 'Backend not configured.' }
  const { error } = await supabase.from(table).update({ [field]: value }).eq('id', id)
  if (error) return { ok: false, error: error.message }
  await audit(ctx.userId, 'toggle', `${table}:${id}:${field}=${value}`)
  revalidatePath(`/${ADMIN_SLUG}/${table}`)
  return { ok: true }
}

/** Update a lead's pipeline status. */
export async function setLeadStatus(table: string, id: string, status: string): Promise<Result> {
  const ctx = await requireAdmin()
  const supabase = createServiceClient()
  if (!supabase) return { ok: false, error: 'Backend not configured.' }
  const { error } = await supabase.from(table).update({ status }).eq('id', id)
  if (error) return { ok: false, error: error.message }
  await audit(ctx.userId, 'lead_status', `${table}:${id}:${status}`)
  revalidatePath(`/${ADMIN_SLUG}/leads`)
  return { ok: true }
}

export async function updateOrderStatus(id: string, status: string, awb?: string): Promise<Result> {
  const ctx = await requireAdmin()
  const supabase = createServiceClient()
  if (!supabase) return { ok: false, error: 'Backend not configured.' }
  const patch: Record<string, any> = { status }
  if (awb) patch.shiprocket_awb = awb
  const { error } = await supabase.from('orders').update(patch).eq('id', id)
  if (error) return { ok: false, error: error.message }
  await audit(ctx.userId, 'order_status', `orders:${id}:${status}`)
  revalidatePath(`/${ADMIN_SLUG}/orders`)
  return { ok: true }
}

export async function saveSetting(key: string, fd: FormData): Promise<Result> {
  const ctx = await requireAdmin()
  const supabase = createServiceClient()
  if (!supabase) return { ok: false, error: 'Backend not configured.' }
  let value: any = {}
  try { value = JSON.parse(String(fd.get('value') || '{}')) } catch { return { ok: false, error: 'Invalid JSON' } }
  const { error } = await supabase.from('settings').upsert({ key, value })
  if (error) return { ok: false, error: error.message }
  await audit(ctx.userId, 'setting', `settings:${key}`)
  revalidatePath(`/${ADMIN_SLUG}/settings`)
  return { ok: true }
}

export async function setUserRole(userId: string, role: string): Promise<Result> {
  const ctx = await requireAdmin()
  if (ctx.role !== 'admin') return { ok: false, error: 'Only admins can change roles.' }
  const supabase = createServiceClient()
  if (!supabase) return { ok: false, error: 'Backend not configured.' }
  const { error } = await supabase.from('profiles').update({ role }).eq('id', userId)
  if (error) return { ok: false, error: error.message }
  await audit(ctx.userId, 'role_change', `profiles:${userId}:${role}`)
  revalidatePath(`/${ADMIN_SLUG}/users`)
  return { ok: true }
}
