// WhatsApp Cloud API — graceful: no-op if not configured.
export async function sendWhatsApp(to: string, text: string): Promise<{ ok: boolean; skipped?: boolean }> {
  const phoneId = process.env.WHATSAPP_PHONE_ID
  const token = process.env.WHATSAPP_TOKEN
  if (!phoneId || !token) { console.log('[whatsapp] skipped (no config):', text.slice(0, 60)); return { ok: true, skipped: true } }
  try {
    const res = await fetch(`https://graph.facebook.com/v20.0/${phoneId}/messages`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ messaging_product: 'whatsapp', to: to.replace(/[^0-9]/g, ''), type: 'text', text: { body: text } }),
    })
    return { ok: res.ok }
  } catch (e) { console.error('[whatsapp] error', e); return { ok: false } }
}

export function adminWhatsApp(): string | undefined {
  return process.env.WHATSAPP_ADMIN_NUMBER
}

export async function notifyAdminWhatsApp(text: string) {
  const admin = adminWhatsApp()
  if (!admin) return
  return sendWhatsApp(admin, text)
}
