# FLYQ by Passion3D World

India's open-source programmable drone ecosystem (ESP32-S3 powered).
Brand: **FLYQ by Passion3D World** · Official Store: <https://passion3dworld.com>

This repository holds **two versions** of the FLYQ website:

## 📁 Repository Structure

```
FLYQ_Air/
├── platform/       # ✅ NEW — Next.js 14 platform (active, deploy target)
└── legacy-site/    # 🗄️  ARCHIVE — original Cloudflare/Hono site (flyqdrone.in)
```

### `platform/` — Next.js 14 (current)
The production-grade rebuild. Next.js 14 App Router + Tailwind + Framer Motion +
Supabase (Auth/DB/Storage) + Resend + Razorpay + WhatsApp Cloud API + Shiprocket.

- 29+ public pages, hidden multi-factor admin at `/control-tower-x9k2`
- Graceful degradation — builds & renders fully **without any env keys**
- Hero video animation + real product imagery carried over from the legacy site
- Deploy-ready on **Vercel**, migratable to `flyqdrone.in`

Quick start:
```bash
cd platform
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```
See [`platform/README.md`](platform/README.md), [`platform/docs/ENV.md`](platform/docs/ENV.md),
and [`platform/docs/RUNBOOK.md`](platform/docs/RUNBOOK.md).

### `legacy-site/` — Cloudflare Pages / Hono (archived)
The original site that powered **flyqdrone.in**: Hono + Cloudflare Workers/Pages,
D1 database, R2 storage, full order/email/tracking system, 50+ blog posts, and the
complete historical documentation (200+ `.md` files, SQL seeds, email campaign
scripts, customer exports). Preserved verbatim for reference & data migration.

## 📇 Official Contact (same across both versions)

| | |
|---|---|
| **Email** | info@passion3dworld.com |
| **Support** | support@flyqdrones.com |
| **Orders** | orders@flyqdrones.com |
| **Phone / WhatsApp** | +91 9137361474 |
| **Official Store** | https://passion3dworld.com |
| **Firmware / GitHub** | https://github.com/passion3d/flyq-air |

---
© 2025–2026 FLYQ by Passion3D World. All rights reserved. Made in India 🇮🇳
