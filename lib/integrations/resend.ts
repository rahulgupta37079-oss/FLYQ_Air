// Resend email — graceful: no-op if RESEND_API_KEY absent.
type Mail = { to: string | string[]; subject: string; html: string; replyTo?: string }

export async function sendEmail(mail: Mail): Promise<{ ok: boolean; skipped?: boolean }> {
  const key = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM || 'FLYQ <noreply@flyqdrone.in>'
  if (!key) { console.log('[resend] skipped (no key):', mail.subject); return { ok: true, skipped: true } }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: mail.to, subject: mail.subject, html: mail.html, reply_to: mail.replyTo }),
    })
    return { ok: res.ok }
  } catch (e) { console.error('[resend] error', e); return { ok: false } }
}

export function adminNotifyEmail(): string | undefined {
  return process.env.RESEND_ADMIN_NOTIFY_EMAIL
}

// Simple branded wrapper
export function emailLayout(title: string, bodyHtml: string): string {
  return `<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;background:#0A0A0B;color:#F5F5F7;padding:32px;border-radius:16px">
    <h1 style="color:#00E5FF;font-size:20px;margin:0 0 16px">${title}</h1>
    <div style="color:#cfcfd4;line-height:1.6;font-size:14px">${bodyHtml}</div>
    <hr style="border:0;border-top:1px solid rgba(255,255,255,.1);margin:24px 0"/>
    <p style="color:#8a8a90;font-size:12px">FLYQ by Passion3D World · Engineered in India</p>
  </div>`
}
