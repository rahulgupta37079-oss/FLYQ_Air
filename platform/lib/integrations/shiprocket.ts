// Shiprocket — graceful: no-op token if not configured. Token cached in-memory.
let cachedToken: { token: string; expires: number } | null = null

export function shiprocketConfigured(): boolean {
  return !!(process.env.SHIPROCKET_EMAIL && process.env.SHIPROCKET_PASSWORD)
}

async function getToken(): Promise<string | null> {
  if (!shiprocketConfigured()) return null
  if (cachedToken && cachedToken.expires > Date.now()) return cachedToken.token
  try {
    const res = await fetch('https://apiv2.shiprocket.in/v1/external/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: process.env.SHIPROCKET_EMAIL, password: process.env.SHIPROCKET_PASSWORD }),
    })
    if (!res.ok) return null
    const data = await res.json() as { token: string }
    cachedToken = { token: data.token, expires: Date.now() + 9 * 24 * 60 * 60 * 1000 }
    return data.token
  } catch { return null }
}

export async function checkServiceability(pin: string): Promise<{ serviceable: boolean; etaDays?: number; mock?: boolean }> {
  const token = await getToken()
  if (!token) return { serviceable: true, etaDays: 5, mock: true } // assume serviceable pre-launch
  try {
    const res = await fetch(`https://apiv2.shiprocket.in/v1/external/courier/serviceability/?pickup_postcode=400001&delivery_postcode=${pin}&weight=1&cod=0`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await res.json() as { data?: { available_courier_companies?: { estimated_delivery_days?: string }[] } }
    const companies = data?.data?.available_courier_companies || []
    return { serviceable: companies.length > 0, etaDays: companies[0]?.estimated_delivery_days ? Number(companies[0].estimated_delivery_days) : undefined }
  } catch { return { serviceable: true, etaDays: 5, mock: true } }
}

export async function createShipment(payload: Record<string, unknown>): Promise<{ ok: boolean; shipmentId?: string; mock?: boolean }> {
  const token = await getToken()
  if (!token) return { ok: true, mock: true }
  try {
    const res = await fetch('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json() as { shipment_id?: string }
    return { ok: res.ok, shipmentId: data.shipment_id ? String(data.shipment_id) : undefined }
  } catch { return { ok: false } }
}
