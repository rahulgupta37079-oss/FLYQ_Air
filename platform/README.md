# FLYQ by Passion3D World — Production Web Platform

India's open-source programmable drone ecosystem (ESP32-S3 powered).
**Tagline:** *Engineered in India. Built for the next generation of pilots, developers and innovators.*

A production-grade, fully-migratable replacement for **flyqdrone.in** — Next.js 14 (App Router) + Tailwind + Supabase + Razorpay + Resend + WhatsApp Cloud API + Shiprocket. Deploy-ready on Vercel.

---

## ✨ Features

### Public site (29+ pages)
- **Storefront**: catalog (23 products, 7 categories), product detail with JSON-LD, cart, checkout (Razorpay + COD), order tracking
- **STEM Lab**: programmes, pricing tiers, drone-soccer, NEP/AICTE/ATL alignment
- **Workshops**: 12 city events, filtering, registration with payment
- **Content**: curriculum, docs, blog, gallery, about, contact, dealers, bulk-orders, training
- **WhatsApp-style testimonial wall** — the differentiator (chat bubbles, voice notes, filterable by segment)
- **35+ FAQ** searchable & categorised
- **Long-form India-compliant legal**: terms, privacy (DPDP Act 2023), refund (Consumer Protection Act 2019), shipping, warranty
- **Auth**: login / register / forgot-password / account dashboard (Supabase)
- **Error pages**: 404, 500, global-error
- **SEO/PWA**: sitemap, robots (admin disallowed), web manifest, schema.org JSON-LD, security headers

### Hidden admin — `/control-tower-x9k2`
Obfuscated slug, `noindex`, robots-disallowed, edge middleware redirects unauthenticated traffic.
Multi-factor unlock: **Supabase Auth + role check + TOTP 2FA + 6-digit bcrypt PIN + IP allowlist + rate-limit + audit log**.

19 modules: Dashboard · Products · Orders · Customers · Workshops · Leads (kanban) · Testimonials · Reviews · Blog · FAQ · Newsletter · Banners · Coupons · Pages (CMS) · Media · Settings · Users & Roles · Audit Log · Backup.

### Forms & integrations (all env-keyed, graceful degradation)
Every public form: **Zod-style validation + honeypot + reCAPTCHA + rate-limit + Supabase write + Resend email + WhatsApp notify + auto-reply**.
Integrations: **Razorpay** (orders + signature verify), **Resend** (transactional email), **WhatsApp Cloud API**, **Shiprocket** (serviceability + shipments), **reCAPTCHA v3**.

> **Graceful degradation:** Every integration and the Supabase client return safely (no-op / mock / static fallback) when their env keys are absent — the site **builds and renders fully without any keys**, so you can preview before provisioning backends.

---

## 🗂 Functional entry URIs

| Path | Description |
|------|-------------|
| `/` | Homepage |
| `/products`, `/products/[slug]` | Catalog & detail |
| `/cart`, `/checkout`, `/order/[id]` | Commerce flow |
| `/stem-lab`, `/stem-lab/drone-soccer` | STEM programmes |
| `/workshops`, `/workshops/[slug]` | Events & registration |
| `/curriculum`, `/docs`, `/blog`, `/blog/[slug]` | Content |
| `/about`, `/contact`, `/dealers`, `/bulk-orders`, `/training`, `/gallery`, `/testimonials`, `/faq` | Engagement |
| `/terms`, `/privacy`, `/refund`, `/shipping`, `/warranty` | Legal |
| `/login`, `/register`, `/forgot-password`, `/account` | Auth |
| `/control-tower-x9k2` | Hidden admin (gated) |
| **API** | `/api/contact`, `/api/newsletter`, `/api/orders`, `/api/workshops/register`, `/api/leads/{stem,bulk,dealer,career,training}`, `/api/admin/{unlock,logout}` |

---

## 🧱 Data architecture
- **Storage**: Supabase (Postgres + Auth + Storage)
- **28 tables** — see `supabase/migrations/0001_init_schema.sql`
- **RLS** on every table — `0002_rls_policies.sql` (public read on published content; owner access for customers; staff/admin full access; `is_admin()`/`is_staff()` helpers; signup trigger auto-creates profile + referral code)
- **Seed** — `0003_seed.sql` (7 categories, 23 products, 12 testimonials, 12 workshops, FAQs, legal pages, settings)
- **Static fallback** — `lib/data.ts` mirrors seed data so the site works before the DB is connected

---

## 🚀 Quick start

```bash
npm install
cp .env.example .env.local   # fill in keys (see docs/ENV.md) — optional for preview
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
```

### Connect Supabase
```bash
# In your Supabase SQL editor, run in order:
supabase/migrations/0001_init_schema.sql
supabase/migrations/0002_rls_policies.sql
supabase/migrations/0003_seed.sql
```
Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE`.

### Enrol an admin
See **docs/RUNBOOK.md** → `scripts/setup-admin.ts` (sets role=admin, TOTP secret, PIN hash).

---

## 📦 Deployment (Vercel)
1. Push to GitHub, import the repo in Vercel.
2. Add all env vars from `.env.example` (see **docs/ENV.md**).
3. Deploy. Point `flyqdrone.in` DNS at Vercel.
4. Run the three SQL migrations against your Supabase project.

**Migratable**: standard Next.js — runs on any Node host (Vercel, Netlify, self-hosted, Docker).

---

## 📚 Docs
- **docs/ENV.md** — every environment variable explained
- **docs/RUNBOOK.md** — operations: admin setup, backups, incident response, integrations

## 🛠 Tech stack
Next.js 14 · React 18 · TypeScript · Tailwind CSS · Supabase · Razorpay · Resend · WhatsApp Cloud API · Shiprocket · otplib · bcryptjs

## ⚠️ Notes
- Product images are **representative placeholders**; replace with real photography in `public/images/products/`.
- You must provision your own Supabase / Razorpay / Resend / WhatsApp / Shiprocket accounts + Vercel + DNS.

**Last updated:** 2026-06-24
