// reCAPTCHA v3 verification — graceful: if no secret configured, allow through.
export async function verifyRecaptcha(token?: string, action?: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) return true // not configured — degrade gracefully (dev / pre-launch)
  if (!token) return false
  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secret}&response=${token}`,
    })
    const data = await res.json() as { success: boolean; score?: number; action?: string }
    if (!data.success) return false
    if (typeof data.score === 'number' && data.score < 0.5) return false
    if (action && data.action && data.action !== action) return false
    return true
  } catch {
    return true // network failure shouldn't block legitimate users
  }
}
