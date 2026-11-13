import original from './worker.js';
import { applySEO, seoResource } from './flyq-seo.mjs';
import { applyLogo, logoResource } from './flyq-logo.mjs';
import { applyWebinarNav } from './flyq-webinar-page.mjs';

const COOKIE = 'flyq_workshops';
const WEBINAR_STATES = ['pending', 'utr_submitted', 'paid', 'attended', 'certified', 'cancelled'];
const PROFILES = ['college_student', 'school_student', 'maker_professional', 'parent', 'educator'];

const now = () => Math.floor(Date.now() / 1000);
const escapeHtml = s =>
  String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

async function sha256Hex(value) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(String(value)));
  return Array.from(new Uint8Array(buf), b => b.toString(16).padStart(2, '0')).join('');
}

function randomToken(bytes = 16) {
  return Array.from(crypto.getRandomValues(new Uint8Array(bytes)), b => b.toString(16).padStart(2, '0')).join('');
}

function generateRegCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const arr = crypto.getRandomValues(new Uint8Array(5));
  let code = 'FLYQ-W99-';
  for (let i = 0; i < 5; i++) code += chars[arr[i] % chars.length];
  return code;
}

function safeEmail(s) {
  return typeof s === 'string' && s.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function parseCookieHeader(cookieHeader, name) {
  if (!cookieHeader) return '';
  for (const part of cookieHeader.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const k = part.slice(0, idx).trim();
    if (k === name) return decodeURIComponent(part.slice(idx + 1).trim());
  }
  return '';
}

async function verifyOwner(request, env) {
  if (!env.DB) return null;
  const token = parseCookieHeader(request.headers.get('Cookie') || '', COOKIE);
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  const u = await env.DB.prepare(
    "SELECT u.id,u.email,u.role,u.email_verified,u.status FROM workshop_sessions s JOIN users u ON u.id=s.user_id WHERE s.token_hash=? AND s.expires_at>? AND u.status='active'"
  )
    .bind(await sha256Hex(token), now())
    .first();
  if (!u) return null;
  const isOwnerEmail = String(u.email).toLowerCase() === String(env.ADMIN_EMAIL || '').toLowerCase();
  return isOwnerEmail && (u.role === 'admin' || u.email_verified === 1) ? u : null;
}

async function ensureWebinarTable(db) {
  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS webinar_registrations (
        id TEXT PRIMARY KEY,
        reg_code TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        city TEXT NOT NULL,
        profile TEXT NOT NULL,
        institution TEXT DEFAULT '',
        question TEXT DEFAULT '',
        session_date TEXT NOT NULL,
        amount_inr INTEGER NOT NULL DEFAULT 99,
        payment_status TEXT NOT NULL DEFAULT 'pending',
        utr_number TEXT DEFAULT '',
        notes TEXT DEFAULT '',
        notification_status TEXT DEFAULT 'pending',
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      )`
    )
    .run();
}

async function sendWebinarEmail(env, reg, isUtrUpdate = false) {
  if (!env.RESEND_API_KEY || !env.EMAIL_FROM) return;
  const adminTo = env.WORKSHOP_NOTIFY_EMAIL || env.ADMIN_EMAIL || 'rahulgupta37079@gmail.com';
  const deskUrl = String(env.WORKSHOP_PUBLIC_URL || 'https://flyqdrone.in') + '/workshops/webinar-admin';
  const waReply =
    'https://wa.me/' +
    reg.phone.replace(/[^\d]/g, '').replace(/^0+/, '91') +
    '?text=' +
    encodeURIComponent(
      `Hello ${reg.name}! Welcome to the FLYQ Drones 3-Hour Live Bootcamp (${reg.session_date}). Your Registration ID is ${reg.reg_code}.`
    );

  const entries = [
    ['Registration ID', reg.reg_code],
    ['Payment Status', reg.payment_status.toUpperCase()],
    ['UTR / UPI Ref', reg.utr_number || 'Pending WhatsApp / UPI confirmation'],
    ['Attendee Name', reg.name],
    ['Email', reg.email],
    ['WhatsApp / Phone', reg.phone],
    ['City', reg.city],
    ['Profile', reg.profile],
    ['Institution', reg.institution || 'Not specified'],
    ['Batch', reg.session_date],
    ['Fee', '₹' + reg.amount_inr + ' (Free Certificate Included)'],
    ['Q&A Question', reg.question || 'None']
  ];

  const subject = isUtrUpdate
    ? `₹99 Webinar UTR Submitted: ${reg.utr_number} (${reg.name} · ${reg.reg_code})`
    : `New ₹99 Webinar Registration: ${reg.name} (${reg.reg_code})`;

  const payload = {
    from: env.EMAIL_FROM,
    to: [adminTo],
    reply_to: reg.email,
    subject,
    text:
      entries.map(([k, v]) => `${k}: ${v}`).join('\n') +
      `\n\nWhatsApp Attendee: ${waReply}\nOpen Webinar Admin Desk: ${deskUrl}`,
    html: `<!doctype html><html lang="en"><body style="margin:0;background:#f5f6f8;font-family:Arial,sans-serif;color:#101724"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px"><table role="presentation" width="600" style="max-width:100%;background:#fff;border-radius:12px;overflow:hidden" cellpadding="24"><tr><td style="background:#101724;color:#fff;font-size:22px"><b>FLYQ</b> <span style="font-size:13px;color:#93c5fd">₹99 Live Drone Webinar</span></td></tr><tr><td><h1 style="font-size:22px;margin:0 0 10px">${escapeHtml(subject)}</h1><table role="presentation" width="100%" cellpadding="8">${entries
      .map(
        ([k, v]) =>
          `<tr><td style="border-bottom:1px solid #e5e7eb;font-size:12px;color:#64748b;width:140px">${escapeHtml(k)}</td><td style="border-bottom:1px solid #e5e7eb;font-size:14px;font-weight:600">${escapeHtml(v)}</td></tr>`
      )
      .join(
        ''
      )}</table><p style="margin-top:24px"><a href="${escapeHtml(waReply)}" style="background:#16a34a;color:#fff;padding:12px 18px;text-decoration:none;border-radius:7px;display:inline-block;margin-right:10px;font-weight:bold">Message on WhatsApp ↗</a><a href="${escapeHtml(deskUrl)}" style="background:#225cec;color:#fff;padding:12px 18px;text-decoration:none;border-radius:7px;display:inline-block;font-weight:bold">Open Webinar Desk →</a></p></td></tr></table></td></tr></table></body></html>`
  };

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + env.RESEND_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000)
    });
    if (r.ok && env.DB) {
      await env.DB.prepare("UPDATE webinar_registrations SET notification_status='sent' WHERE id=?")
        .bind(reg.id)
        .run();
    }
  } catch {
    // Registration remains safely stored in D1
  }
}

function jsonResponse(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff'
    }
  });
}

function webinarAdminPage() {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>₹99 Webinar Desk | FLYQ Drones</title><link rel="stylesheet" href="/workshop-assets/homepage.css"><link rel="stylesheet" href="/workshop-assets/workshop.css"><link rel="stylesheet" href="/workshop-assets/admin.css"><script defer src="/workshop-assets/webinar-admin.js"></script></head><body><header class="nav"><a class="logo" href="/webinar">FLYQ<span>drones / ₹99 webinar desk</span></a><div style="display:flex;gap:16px;align-items:center"><a href="/workshops/admin">Campus Enquiries Desk</a><a href="/webinar">View Live Webinar Page ↗</a></div></header><main class="section"><p class="eyebrow">OWNER PORTAL · MONDAY 6:00 PM – 9:00 PM IST</p><h1>₹99 Webinar Registrations.</h1><p id="wb-desk-status" role="status">Checking owner access…</p><form id="wb-owner-login" hidden><h3>Sign in to the Webinar Desk.</h3><p>Use your existing FLYQ platform owner account (rahulgupta37079@gmail.com).</p><label>Email<input name="email" type="email" required autocomplete="username"></label><label>Password<input name="password" type="password" required autocomplete="current-password"></label><button class="btn">Sign in</button></form><section id="wb-desk" hidden><div class="desk-actions"><a class="btn" href="/api/workshops/admin/webinar/export">Export Webinar Registrations (CSV) ↓</a><a class="btn outline" href="/workshops/admin">Switch to Campus Enquiries</a><button id="wb-refresh-btn" class="btn outline" type="button">Refresh now</button><button id="wb-logout" class="btn outline" type="button">Sign out</button></div><div id="wb-kpis" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:14px;margin:20px 0"></div><form id="wb-filters" style="display:flex;gap:16px;align-items:flex-end;flex-wrap:wrap;background:#f5f6f8;padding:18px;border-radius:8px;margin:20px 0"><label style="flex:1;min-width:220px;margin:0">Search<input type="search" name="q" placeholder="Name, email, phone, Reg ID, UTR or institution"></label><label style="min-width:180px;margin:0">Payment Status<select name="status"><option value="">All statuses</option><option value="pending">pending</option><option value="utr_submitted">utr_submitted</option><option value="paid">paid</option><option value="attended">attended</option><option value="certified">certified</option><option value="cancelled">cancelled</option></select></label><button class="btn" type="submit">Filter</button></form><p id="wb-counts"></p><div id="wb-list" style="display:grid;gap:14px;margin:20px 0"></div><div class="desk-actions"><button id="wb-prev" class="btn outline" type="button">Previous</button><button id="wb-next" class="btn outline" type="button">Next</button></div></section></main><dialog id="wb-review"><form id="wb-review-form" style="padding:24px"><h3>Update Webinar Registration</h3><p id="wb-review-name" style="font-weight:700;margin:10px 0"></p><input name="id" type="hidden"><label>Payment / Attendance Status<select name="payment_status"><option value="pending">pending</option><option value="utr_submitted">utr_submitted</option><option value="paid">paid</option><option value="attended">attended</option><option value="certified">certified</option><option value="cancelled">cancelled</option></select></label><label>UPI Reference / UTR Number<input name="utr_number" type="text" maxlength="60" placeholder="12-digit UTR or payment ref"></label><label>Private notes<textarea name="notes" maxlength="2000" rows="4"></textarea></label><p id="wb-review-status" role="status"></p><div class="desk-actions"><button class="btn" type="submit">Save changes</button><button class="btn outline" type="button" id="wb-close-review">Cancel</button></div></form></dialog></body></html>`;
}

const webinarAdminJs = `(() => {
  let offset = 0, rows = [], active = false, loading = false;
  const $ = s => document.querySelector(s);
  const safe = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  async function api(path, body, method = 'POST') {
    const r = await fetch('/api/workshops' + path, body === undefined ? {} : {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      if (r.status === 401 || r.status === 403) {
        active = false;
        $('#wb-desk').hidden = true;
        $('#wb-owner-login').hidden = false;
      }
      throw Error(data.error || 'Request failed.');
    }
    return data;
  }

  async function refresh() {
    if (loading) return;
    loading = true;
    try {
      const f = new FormData($('#wb-filters'));
      const q = encodeURIComponent(f.get('q') || '');
      const st = encodeURIComponent(f.get('status') || '');
      const d = await api('/admin/webinar?offset=' + offset + '&q=' + q + '&status=' + st);
      active = true;
      $('#wb-owner-login').hidden = true;
      $('#wb-desk').hidden = false;
      $('#wb-desk-status').textContent = 'Live · Last checked ' + new Date().toLocaleTimeString();
      rows = d.rows || [];
      const s = d.summary || {};
      $('#wb-kpis').innerHTML = [
        ['Total Registrations', s.total_all || 0],
        ['UTR Submitted / Paid', (s.utr_count || 0) + ' / ' + (s.paid_count || 0)],
        ['Pending Payment', s.pending_count || 0],
        ['Confirmed Revenue', '₹' + ((s.paid_count || 0) * 99)]
      ].map(([k, v]) => '<div class="notice" style="margin:0"><small style="display:block;color:#667080;font-size:11px;text-transform:uppercase;letter-spacing:.08em">' + safe(k) + '</small><strong style="font-size:26px;font-family:Manrope,sans-serif">' + safe(v) + '</strong></div>').join('');
      $('#wb-counts').textContent = (d.total || 0) + ' matching registrations';
      $('#wb-prev').disabled = offset === 0;
      $('#wb-next').disabled = !d.has_more;

      if (!$('#wb-review').open) {
        $('#wb-list').innerHTML = rows.length ? rows.map(r => {
          const waPhone = String(r.phone || '').replace(/[^\\d]/g, '').replace(/^0+/, '91');
          const waUrl = 'https://wa.me/' + waPhone + '?text=' + encodeURIComponent('Hi ' + r.name + ', regarding your FLYQ ₹99 Live Drone Webinar registration (' + r.reg_code + ') for ' + r.session_date + ':');
          return '<article class="enquiry-card"><div><span class="tag">' + safe(r.payment_status) + '</span> <span class="tag" style="background:#e0f2fe;color:#0369a1;font-family:monospace">' + safe(r.reg_code) + '</span>' +
            (r.utr_number ? ' <span class="tag" style="background:#dcfce7;color:#15803d">UTR: ' + safe(r.utr_number) + '</span>' : '') +
            '<h3>' + safe(r.name) + ' <small style="font-size:13px;color:#667080;font-weight:500">(' + safe(r.profile) + ' · ' + safe(r.city) + ')</small></h3>' +
            '<p><a href="mailto:' + safe(r.email) + '">' + safe(r.email) + '</a> · <a href="tel:' + safe(r.phone) + '">' + safe(r.phone) + '</a> · <a href="' + safe(waUrl) + '" target="_blank" rel="noopener" style="color:#16a34a;font-weight:700">WhatsApp ↗</a></p>' +
            '<p><b>Batch:</b> ' + safe(r.session_date) + (r.institution ? ' · <b>Institution:</b> ' + safe(r.institution) : '') + '</p>' +
            (r.question ? '<p><b>Question:</b> ' + safe(r.question) + '</p>' : '') +
            (r.notes ? '<p><b>Notes:</b> ' + safe(r.notes) + '</p>' : '') +
            '<small>Registered: ' + new Date(r.created_at * 1000).toLocaleString() + ' · Email alert: ' + safe(r.notification_status) + '</small>' +
            '</div><button class="btn outline" type="button" data-review="' + safe(r.id) + '">Update →</button></article>';
        }).join('') : '<p>No webinar registrations match this filter yet.</p>';
      }
    } catch (e) {
      $('#wb-desk-status').textContent = e.message;
    } finally {
      loading = false;
    }
  }

  $('#wb-owner-login').onsubmit = async e => {
    e.preventDefault();
    const form = e.currentTarget, b = form.querySelector('button');
    b.disabled = true;
    try {
      await api('/login', Object.fromEntries(new FormData(form)));
      form.reset();
      await refresh();
    } catch (err) {
      $('#wb-desk-status').textContent = err.message;
    } finally {
      b.disabled = false;
    }
  };

  $('#wb-logout').onclick = async () => {
    try {
      await api('/logout', {});
      active = false;
      $('#wb-desk').hidden = true;
      $('#wb-owner-login').hidden = false;
      $('#wb-desk-status').textContent = 'Signed out.';
    } catch (err) {
      $('#wb-desk-status').textContent = err.message;
    }
  };

  $('#wb-refresh-btn').onclick = () => refresh();
  $('#wb-filters').onsubmit = e => { e.preventDefault(); offset = 0; refresh(); };
  $('#wb-prev').onclick = () => { offset = Math.max(0, offset - 50); refresh(); };
  $('#wb-next').onclick = () => { offset += 50; refresh(); };

  $('#wb-list').onclick = e => {
    const b = e.target.closest('[data-review]');
    if (!b) return;
    const row = rows.find(r => r.id === b.dataset.review);
    if (!row) return;
    const f = $('#wb-review-form');
    f.elements.id.value = row.id;
    f.elements.payment_status.value = row.payment_status;
    f.elements.utr_number.value = row.utr_number || '';
    f.elements.notes.value = row.notes || '';
    $('#wb-review-name').textContent = row.name + ' (' + row.reg_code + ')';
    $('#wb-review-status').textContent = '';
    $('#wb-review').showModal();
  };

  $('#wb-close-review').onclick = () => $('#wb-review').close();

  $('#wb-review-form').onsubmit = async e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await api('/admin/webinar/' + encodeURIComponent(d.id), d, 'PATCH');
      $('#wb-review').close();
      refresh();
    } catch (err) {
      $('#wb-review-status').textContent = err.message;
    }
  };

  refresh();
  setInterval(() => { if (active) refresh(); }, 8000);
})();`;

export default {
  ...original,
  async fetch(request, env, ctx) {
    const asset = logoResource(request);
    if (asset) return asset;

    const url = new URL(request.url);
    const path = url.pathname;

    // 1. Serve Webinar Admin JS asset
    if ((request.method === 'GET' || request.method === 'HEAD') && path === '/workshop-assets/webinar-admin.js') {
      return new Response(request.method === 'HEAD' ? null : webinarAdminJs, {
        headers: {
          'Content-Type': 'text/javascript; charset=utf-8',
          'Cache-Control': 'private, no-store',
          'X-Content-Type-Options': 'nosniff'
        }
      });
    }

    // 2. Serve Webinar Admin Portal Page
    if ((request.method === 'GET' || request.method === 'HEAD') && (path === '/workshops/webinar-admin' || path === '/workshops/webinar-admin/')) {
      if (path.endsWith('/')) return Response.redirect(new URL('/workshops/webinar-admin', request.url), 301);
      return new Response(request.method === 'HEAD' ? null : webinarAdminPage(), {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'private, no-store',
          'X-Content-Type-Options': 'nosniff',
          'X-Robots-Tag': 'noindex, nofollow',
          'Content-Security-Policy':
            "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'"
        }
      });
    }

    // 3. Webinar Public & Admin API routes (/api/workshops/webinar/* and /api/workshops/admin/webinar*)
    if (path.startsWith('/api/workshops/webinar') || path.startsWith('/api/workshops/admin/webinar')) {
      if (!['GET', 'HEAD'].includes(request.method)) {
        if (request.headers.get('Origin') !== url.origin) {
          return jsonResponse({ error: 'Request origin is not allowed.' }, 403);
        }
        if (!request.headers.get('Content-Type')?.startsWith('application/json')) {
          return jsonResponse({ error: 'Send JSON data.' }, 415);
        }
      }
      if (!env.DB) {
        return jsonResponse({ error: 'Database service is not connected.' }, 503);
      }
      await ensureWebinarTable(env.DB);

      // GET /api/workshops/webinar/health
      if (path === '/api/workshops/webinar/health' && request.method === 'GET') {
        const c = await env.DB.prepare('SELECT COUNT(*) AS n FROM webinar_registrations').first();
        return jsonResponse({
          ready: true,
          registrations: c?.n || 0,
          email_configured: Boolean(env.RESEND_API_KEY)
        });
      }

      // POST /api/workshops/webinar/register
      if (path === '/api/workshops/webinar/register' && request.method === 'POST') {
        let b;
        try {
          b = await request.json();
        } catch {
          return jsonResponse({ error: 'Invalid registration details.' }, 400);
        }
        if (!b || typeof b !== 'object') {
          return jsonResponse({ error: 'Enter your registration details.' }, 400);
        }
        if (b.website) {
          return jsonResponse({ error: 'Please leave the hidden website field empty.' }, 400);
        }

        const name = String(b.name || '').trim().slice(0, 120);
        const email = String(b.email || '').trim().toLowerCase().slice(0, 254);
        const phone = String(b.phone || '').replace(/[\s()-]/g, '').slice(0, 20);
        const city = String(b.city || '').trim().slice(0, 100);
        const profile = PROFILES.includes(b.profile) ? b.profile : 'college_student';
        const institution = String(b.institution || '').trim().slice(0, 180);
        const question = String(b.question || '').trim().slice(0, 500);
        const session_date = String(b.session_date || 'Monday · 6:00 PM – 9:00 PM IST').trim().slice(0, 120);

        if (!name || name.length < 2) {
          return jsonResponse({ error: 'Please enter your full name for the certificate.' }, 400);
        }
        if (!safeEmail(email)) {
          return jsonResponse({ error: 'Please enter a valid email address.' }, 400);
        }
        if (!/^\+?\d{10,15}$/.test(phone)) {
          return jsonResponse({ error: 'Please enter a valid 10-digit WhatsApp / mobile number.' }, 400);
        }
        if (!city) {
          return jsonResponse({ error: 'Please enter your city.' }, 400);
        }
        if (b.consent !== true) {
          return jsonResponse({ error: 'Please check the consent box to proceed.' }, 400);
        }

        // Check if already registered for the same session
        const existing = await env.DB.prepare(
          'SELECT id, reg_code, payment_status FROM webinar_registrations WHERE email=? AND session_date=? LIMIT 1'
        )
          .bind(email, session_date)
          .first();

        const ts = now();
        if (existing) {
          await env.DB.prepare(
            'UPDATE webinar_registrations SET name=?, phone=?, city=?, profile=?, institution=?, question=?, updated_at=? WHERE id=?'
          )
            .bind(name, phone, city, profile, institution, question, ts, existing.id)
            .run();
          return jsonResponse({
            saved: true,
            id: existing.id,
            reg_code: existing.reg_code,
            payment_status: existing.payment_status,
            amount_inr: 99
          });
        }

        const id = randomToken(16);
        let reg_code = generateRegCode();
        for (let attempt = 0; attempt < 3; attempt++) {
          const dup = await env.DB.prepare('SELECT id FROM webinar_registrations WHERE reg_code=?')
            .bind(reg_code)
            .first();
          if (!dup) break;
          reg_code = generateRegCode();
        }

        const record = {
          id,
          reg_code,
          name,
          email,
          phone,
          city,
          profile,
          institution,
          question,
          session_date,
          amount_inr: 99,
          payment_status: 'pending',
          utr_number: '',
          created_at: ts,
          updated_at: ts
        };

        await env.DB.prepare(
          `INSERT INTO webinar_registrations
          (id, reg_code, name, email, phone, city, profile, institution, question, session_date, amount_inr, payment_status, utr_number, notes, notification_status, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 99, 'pending', '', '', 'pending', ?, ?)`
        )
          .bind(id, reg_code, name, email, phone, city, profile, institution, question, session_date, ts, ts)
          .run();

        if (ctx && typeof ctx.waitUntil === 'function') {
          ctx.waitUntil(sendWebinarEmail(env, record, false));
        }

        return jsonResponse(
          {
            saved: true,
            id,
            reg_code,
            payment_status: 'pending',
            amount_inr: 99
          },
          201
        );
      }

      // POST /api/workshops/webinar/payment
      if (path === '/api/workshops/webinar/payment' && request.method === 'POST') {
        let b;
        try {
          b = await request.json();
        } catch {
          return jsonResponse({ error: 'Invalid payment confirmation data.' }, 400);
        }
        const utr_number = String(b?.utr_number || '').trim().slice(0, 60);
        const id = String(b?.id || '').trim();
        const reg_code = String(b?.reg_code || '').trim().toUpperCase();

        if (!utr_number || utr_number.length < 6) {
          return jsonResponse({ error: 'Please enter a valid UPI Reference / UTR number.' }, 400);
        }

        const row = id
          ? await env.DB.prepare('SELECT * FROM webinar_registrations WHERE id=?').bind(id).first()
          : await env.DB.prepare('SELECT * FROM webinar_registrations WHERE reg_code=?').bind(reg_code).first();

        if (!row) {
          return jsonResponse({ error: 'Registration record not found.' }, 404);
        }

        const nextStatus = row.payment_status === 'paid' ? 'paid' : 'utr_submitted';
        await env.DB.prepare(
          'UPDATE webinar_registrations SET utr_number=?, payment_status=?, updated_at=? WHERE id=?'
        )
          .bind(utr_number, nextStatus, now(), row.id)
          .run();

        const updatedRow = { ...row, utr_number, payment_status: nextStatus };
        if (ctx && typeof ctx.waitUntil === 'function') {
          ctx.waitUntil(sendWebinarEmail(env, updatedRow, true));
        }

        return jsonResponse({ saved: true, payment_status: nextStatus, utr_number });
      }

      // Admin endpoints require owner session
      if (path.startsWith('/api/workshops/admin/webinar')) {
        const ownerUser = await verifyOwner(request, env);
        if (!ownerUser) {
          return jsonResponse({ error: 'Sign in with the FLYQ platform owner account to view webinar registrations.' }, 401);
        }

        if (path === '/api/workshops/admin/webinar' && request.method === 'GET') {
          const offset = Math.max(0, Math.min(100000, Math.floor(Number(url.searchParams.get('offset')) || 0)));
          const q = (url.searchParams.get('q') || '').trim().slice(0, 120);
          const status = (url.searchParams.get('status') || '').trim();
          const where =
            "WHERE (?='' OR payment_status=?) AND (?='' OR instr(lower(name||' '||email||' '||phone||' '||reg_code||' '||utr_number||' '||institution||' '||city),lower(?))>0)";
          const args = [status, status, q, q];

          const rows = await env.DB.prepare(
            `SELECT * FROM webinar_registrations ${where} ORDER BY created_at DESC LIMIT 51 OFFSET ?`
          )
            .bind(...args, offset)
            .all();
          const count = await env.DB.prepare(`SELECT COUNT(*) AS n FROM webinar_registrations ${where}`)
            .bind(...args)
            .first();
          const summary = await env.DB.prepare(
            `SELECT
              COUNT(*) AS total_all,
              SUM(payment_status='pending') AS pending_count,
              SUM(payment_status='utr_submitted') AS utr_count,
              SUM(payment_status IN ('paid','attended','certified')) AS paid_count,
              SUM(payment_status='certified') AS certified_count
            FROM webinar_registrations`
          ).first();

          return jsonResponse({
            rows: (rows.results || []).slice(0, 50),
            has_more: (rows.results || []).length > 50,
            total: count?.n || 0,
            summary: {
              total_all: summary?.total_all || 0,
              pending_count: summary?.pending_count || 0,
              utr_count: summary?.utr_count || 0,
              paid_count: summary?.paid_count || 0,
              certified_count: summary?.certified_count || 0
            }
          });
        }

        if (path === '/api/workshops/admin/webinar/export' && request.method === 'GET') {
          const r = await env.DB.prepare(
            'SELECT reg_code,name,email,phone,city,profile,institution,session_date,amount_inr,payment_status,utr_number,question,notes,created_at FROM webinar_registrations ORDER BY created_at DESC'
          ).all();
          const keys = [
            'reg_code',
            'name',
            'email',
            'phone',
            'city',
            'profile',
            'institution',
            'session_date',
            'amount_inr',
            'payment_status',
            'utr_number',
            'question',
            'notes',
            'created_at'
          ];
          const csvCell = v => {
            let s = String(v ?? '');
            if (/^[\s]*[=+@-]/.test(s)) s = "'" + s;
            return '"' + s.replaceAll('"', '""') + '"';
          };
          const body =
            '\uFEFF' +
            keys.join(',') +
            '\r\n' +
            (r.results || []).map(row => keys.map(k => csvCell(row[k])).join(',')).join('\r\n');
          return new Response(body, {
            status: 200,
            headers: {
              'Content-Type': 'text/csv; charset=utf-8',
              'Content-Disposition': 'attachment; filename="FLYQ-webinar-registrations.csv"',
              'Cache-Control': 'private, no-store'
            }
          });
        }

        if (path.startsWith('/api/workshops/admin/webinar/') && request.method === 'PATCH') {
          const id = decodeURIComponent(path.slice('/api/workshops/admin/webinar/'.length));
          let b;
          try {
            b = await request.json();
          } catch {
            return jsonResponse({ error: 'Invalid request body.' }, 400);
          }
          if (!WEBINAR_STATES.includes(b?.payment_status)) {
            return jsonResponse({ error: 'Choose a valid payment/attendance status.' }, 400);
          }
          const utr = String(b?.utr_number || '').trim().slice(0, 60);
          const notes = String(b?.notes || '').trim().slice(0, 2000);
          const res = await env.DB.prepare(
            'UPDATE webinar_registrations SET payment_status=?, utr_number=?, notes=?, updated_at=? WHERE id=?'
          )
            .bind(b.payment_status, utr, notes, now(), id)
            .run();
          return res.meta.changes
            ? jsonResponse({ saved: true })
            : jsonResponse({ error: 'Registration not found.' }, 404);
        }
      }

      return jsonResponse({ error: 'Webinar endpoint not found.' }, 404);
    }

    const sResource = seoResource(request);
    if (sResource) return sResource;

    let response = await original.fetch.call(original, request, env, ctx);

    if (
      request.method === 'GET' &&
      response.status === 200 &&
      response.headers.get('Content-Type')?.includes('text/html')
    ) {
      let html = await response.text();
      if (path === '/workshops/admin') {
        html = html.replace(
          '<a class="btn outline" href="/api/workshops/admin/export">Export all enquiries (CSV)</a>',
          '<a class="btn" href="/workshops/webinar-admin">Open ₹99 Webinar Desk →</a><a class="btn outline" href="/api/workshops/admin/export">Export all enquiries (CSV)</a>'
        );
      } else {
        html = applyWebinarNav(html, path);
      }
      const h = new Headers(response.headers);
      for (const k of ['Content-Length', 'Content-Encoding', 'ETag', 'Content-MD5', 'Digest']) {
        h.delete(k);
      }
      response = new Response(html, { status: response.status, headers: h });
    }

    const withSeo = await applySEO(request, response);
    return applyLogo(request, withSeo);
  }
};
