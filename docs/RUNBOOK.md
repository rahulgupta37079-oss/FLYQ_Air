# FLYQ Operations Runbook

Operational procedures for running and maintaining the FLYQ platform.

---

## 1. First-time setup

### 1.1 Database
Run the migrations **in order** in the Supabase SQL editor:
1. `supabase/migrations/0001_init_schema.sql` — tables, enums, indexes
2. `supabase/migrations/0002_rls_policies.sql` — RLS + helpers + signup trigger
3. `supabase/migrations/0003_seed.sql` — categories, products, testimonials, workshops, FAQs, pages, settings

### 1.2 Storage buckets (optional)
Create public buckets `products`, `media`, `testimonials` in Supabase Storage if you upload assets there. Update product/media URLs accordingly.

### 1.3 Environment
Populate env vars (see `docs/ENV.md`) in Vercel → Project → Settings → Environment Variables (and `.env.local` for local dev).

---

## 2. Enrolling an admin (multi-factor)

The admin gate requires: a Supabase user with `role = admin`/`staff`, a **TOTP secret**, and a **6-digit PIN** (bcrypt-hashed).

```bash
# 1. Create the user in Supabase Auth (dashboard → Authentication → Add user)
# 2. Enrol factors:
npx tsx scripts/setup-admin.ts <user-email> <6-digit-pin>
```
The script:
- sets `profiles.role = 'admin'`
- generates a TOTP secret, stores it, and prints an **otpauth://** URI + QR text — scan it into Google Authenticator / Authy
- bcrypt-hashes the PIN into `profiles.pin_hash`

Then log in at `https://<site>/<ADMIN_SLUG>/login`: email + password → TOTP code → PIN.

### Hardening checklist
- [ ] Change `NEXT_PUBLIC_ADMIN_SLUG` from the default (and update `middleware.ts` matcher).
- [ ] Set `ADMIN_IP_ALLOWLIST` to office/VPN IPs.
- [ ] Use a strong, unique admin password.
- [ ] Keep `SUPABASE_SERVICE_ROLE` server-only — never in client code.

---

## 3. Backups

### On-demand export
```bash
npx tsx scripts/backup.ts
# → ./backups/flyq-backup-YYYY-MM-DD.json  (all tables)
```
Store the file in secure object storage (e.g. AI Drive, S3) or commit to a private backups repo.

### Automated
Enable **Supabase daily backups** (Project → Database → Backups). Paid plans include point-in-time recovery.

---

## 4. Integrations — health & failure modes

| Service | Configured? | If keys missing |
|---------|-------------|-----------------|
| Supabase | `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE` | Site uses static `lib/data.ts`; writes are no-ops (logged) |
| Razorpay | `RAZORPAY_KEY_*` | Checkout returns a **mock** order id |
| Resend | `RESEND_API_KEY` | Emails skipped (logged) |
| WhatsApp | `WHATSAPP_PHONE_ID` + `WHATSAPP_TOKEN` | Notifications skipped (logged) |
| Shiprocket | `SHIPROCKET_EMAIL/PASSWORD` | Serviceability assumed; shipment mocked |
| reCAPTCHA | `RECAPTCHA_SECRET_KEY` | Verification passes; honeypot + rate-limit still active |

All integration code lives in `lib/integrations/*`. Each guards on its env keys and never throws on a missing key.

---

## 5. Common tasks

**Add / edit a product** → Admin → Products → New/Edit. Or insert into `products` + `product_images`.
**Approve a testimonial** → Admin → Testimonials → toggle *Approved*. Only approved testimonials show on the wall.
**Moderate a review** → Admin → Reviews → toggle *Approved*.
**Fulfil an order** → Admin → Orders → open → set status + paste Shiprocket AWB.
**Move a lead** → Admin → Leads → change the stage dropdown (new → contacted → qualified → won/lost).
**Edit legal copy** → Admin → Pages (slug = terms/privacy/refund/shipping/warranty), or edit the `app/<page>/page.tsx` fallback.
**Export subscribers** → Admin → Newsletter → Export CSV.

---

## 6. Incident response

- **Admin locked out:** verify Supabase user role, re-run `scripts/setup-admin.ts`, check `ADMIN_IP_ALLOWLIST`.
- **Payments failing:** check Razorpay dashboard + key validity; verify `RAZORPAY_KEY_SECRET` signature path in `lib/integrations/razorpay.ts`.
- **Emails not arriving:** confirm Resend domain verification + `RESEND_FROM` matches a verified domain.
- **Suspicious activity:** review Admin → Audit Log (`admin_audit` table). All create/update/delete/login events are recorded with actor + IP.
- **Site down after deploy:** check Vercel build logs; the app builds without keys, so failures are usually code/env-format issues.

---

## 7. Deploy & rollback (Vercel)
- **Deploy:** push to `main` → Vercel auto-builds. Preview deployments on PRs.
- **Rollback:** Vercel → Deployments → promote a previous successful build.
- **DNS:** point `flyqdrone.in` (A/ALIAS + `www` CNAME) to Vercel; add the domain in Vercel project settings.
