# Environment Variables

Copy `.env.example` → `.env.local` (local) or set in your Vercel project settings (production).
**Every variable is optional for a preview build** — the app degrades gracefully when keys are absent. Provision them as you connect each service.

> 🔒 **Never** expose secret keys to the browser. Only variables prefixed `NEXT_PUBLIC_` are sent to the client. Everything else stays server-side (API routes / server actions).

---

## Site
| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | recommended | Canonical URL, e.g. `https://flyqdrone.in`. Used for SEO, sitemap, OG, schema. |
| `NEXT_PUBLIC_ADMIN_SLUG` | recommended | Hidden admin path segment. Default `control-tower-x9k2`. **Change it** for security. Must match `middleware.ts` matcher (update both). |
| `NEXT_PUBLIC_WHATSAPP` | optional | Public WhatsApp number for the floating button / expert links. |

## Supabase (Auth + DB + Storage)
| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | for backend | Project URL. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | for backend | Public anon key (RLS-protected). |
| `SUPABASE_SERVICE_ROLE` | for backend | **Secret.** Server-only. Bypasses RLS — used by admin + API writes. |

## Razorpay (payments)
| Variable | Required | Description |
|----------|----------|-------------|
| `RAZORPAY_KEY_ID` | for payments | Secret server key id. |
| `RAZORPAY_KEY_SECRET` | for payments | **Secret.** Used to create orders + verify signatures. |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | for payments | Public key id for the browser checkout widget. |

> Without these, checkout creates a **mock order** so the flow is testable.

## Resend (email)
| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | for email | **Secret.** Sends transactional + auto-reply mail. |
| `RESEND_FROM` | for email | From address, e.g. `FLYQ <noreply@flyqdrone.in>` (verify the domain in Resend). |
| `RESEND_ADMIN_NOTIFY_EMAIL` | for email | Where new-order / lead notifications are sent. |

## WhatsApp Cloud API
| Variable | Required | Description |
|----------|----------|-------------|
| `WHATSAPP_PHONE_ID` | for WA notify | Cloud API phone number id. |
| `WHATSAPP_TOKEN` | for WA notify | **Secret.** Permanent / system-user token. |
| `WHATSAPP_ADMIN_NUMBER` | for WA notify | Admin number to receive notifications (E.164, digits only). |

## Shiprocket (logistics)
| Variable | Required | Description |
|----------|----------|-------------|
| `SHIPROCKET_EMAIL` | for shipping | Account email. |
| `SHIPROCKET_PASSWORD` | for shipping | **Secret.** Token is fetched & cached server-side. |

> Without these, serviceability checks assume serviceable (≈5-day ETA) and shipment creation is mocked.

## reCAPTCHA v3
| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | for captcha | Public site key for the browser widget. |
| `RECAPTCHA_SECRET_KEY` | for captcha | **Secret.** Server-side verification (score ≥ 0.5). |

> Without a secret, verification passes through (degrade gracefully) — honeypot + rate-limit still apply.

## Admin hardening
| Variable | Required | Description |
|----------|----------|-------------|
| `ADMIN_IP_ALLOWLIST` | optional | Comma-separated IPs allowed to reach admin unlock. Empty = any IP (still gated by auth+TOTP+PIN). |
| `ADMIN_TOTP_ISSUER` | optional | Issuer label shown in authenticator apps. Default `FLYQ`. |

---

## Minimum sets

**Static preview (no backend):** none required.

**Functional site:** Supabase trio (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE`).

**Full commerce:** Supabase + Razorpay (3) + Resend (3) + Shiprocket (2) + reCAPTCHA (2) + WhatsApp (3).
