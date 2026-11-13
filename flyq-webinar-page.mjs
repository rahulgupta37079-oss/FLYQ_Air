// High-Conversion, Spacious & Photo-Rich FLYQ ₹99 / ₹499 3-Hour Live Drone Webinar Page

export const WEBINAR_PATH = '/webinar';
export const WEBINAR_JS_PATH = '/flyq-design/webinar/webinar.js';
export const KIT_GUIDE_PDF_PATH = '/brochures/FLYQ-Drone-Kit-Guide.pdf';

export function applyWebinarNav(html, activePath = '') {
  if (!html || typeof html !== 'string') return html;
  let out = html;
  if (!out.includes('href="/webinar"')) {
    const isActive = activePath === '/webinar';
    const navLink = `<a href="/webinar"${isActive ? ' class="active" aria-current="page"' : ''} style="display:inline-flex;align-items:center;gap:6px">Webinar <span style="background:${isActive ? '#225cec' : '#eef4ff'};color:${isActive ? '#fff' : '#225cec'};font-size:10px;font-weight:800;padding:2px 7px;border-radius:99px;letter-spacing:.04em;line-height:1.4">₹99 LIVE</span></a>`;
    if (out.includes('<a href="/summer-camp"')) {
      out = out.replace(
        /(<a href="\/summer-camp"[^>]*>Workshops<\/a>)/,
        `$1${navLink}`
      );
    } else if (out.includes('</nav>')) {
      out = out.replace('</nav>', `${navLink}</nav>`);
    }
    out = out.replace(
      /(<a href="\/summer-camp">Workshops & camps<\/a>)/,
      `$1<a href="/webinar">₹99 Live Drone Webinar</a>`
    );
  }
  return out;
}

export function webinarHomepageBanner() {
  return `<section aria-label="Live Drone Bootcamp Webinar" style="background:linear-gradient(135deg,#0f172a 0%,#1e3a8a 100%);color:#fff;padding:24px 0;border-bottom:1px solid rgba(255,255,255,.14)">
  <div class="wrap" style="display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap">
    <div style="display:flex;align-items:center;gap:18px;flex-wrap:wrap">
      <span style="display:inline-flex;align-items:center;gap:8px;background:rgba(74,222,128,.16);border:1px solid rgba(74,222,128,.45);color:#86efac;padding:7px 14px;border-radius:99px;font-size:11.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase">
        <span style="width:8px;height:8px;border-radius:50%;background:#4ade80;box-shadow:0 0 10px #4ade80"></span>
        LIVE MONDAY · 6:00 PM – 9:00 PM IST
      </span>
      <div>
        <strong style="font-size:clamp(17px,2vw,21px);font-family:Manrope,Arial,sans-serif;letter-spacing:-.02em;display:block;margin-bottom:3px">Build, Code &amp; Fly Your First Programmable Drone — 3-Hour Live Bootcamp</strong>
        <span style="color:#dbeafe;font-size:14px">Real ESP32-S3 hardware, 3D simulator &amp; Free Certificate · <strong style="color:#4ade80">₹99 Live Pass</strong> or <strong style="color:#fde047">₹499 with Notes + Recordings</strong></span>
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
      <a class="button" href="/webinar#pricing" style="background:#225cec;color:#fff;font-weight:700;padding:12px 22px;min-height:44px;border-radius:10px;box-shadow:0 8px 24px rgba(34,92,236,.4)">Join for ₹99 / ₹499 <span aria-hidden="true">→</span></a>
      <a href="/webinar" style="color:#e0f2fe;font-size:13.5px;font-weight:600;text-decoration:underline;text-underline-offset:4px">See photos &amp; syllabus →</a>
    </div>
  </div>
</section>`;
}

export function partnerLogosAndSoldOutSection() {
  const companiesRow1 = [
    {
      name: 'NRSC · ISRO',
      role: 'Aerial Demo & Student UAV Showcase',
      tag: 'Space & Remote Sensing',
      color: '#2563eb',
      svg: '<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="16" stroke="#2563eb" stroke-width="2.2"/><ellipse cx="20" cy="20" rx="18" ry="7" transform="rotate(-28 20 20)" stroke="#0ea5e9" stroke-width="2"/><circle cx="20" cy="20" r="5" fill="#2563eb"/><circle cx="31" cy="14" r="2.6" fill="#f97316"/></svg>'
    },
    {
      name: 'DRDO Young Scientist Labs',
      role: 'Autonomous Micro-UAV Prototyping',
      tag: 'Defense Research Supply',
      color: '#1e40af',
      svg: '<svg viewBox="0 0 40 40" fill="none"><path d="M20 4L33 10v10c0 9-5.8 14.8-13 17C12.8 34.8 7 29 7 20V10l13-6z" stroke="#1e40af" stroke-width="2.2" fill="#eff6ff"/><path d="M20 11l3 6 6.5.9-4.7 4.6 1.1 6.5L20 26l-5.9 3 1.1-6.5-4.7-4.6L17 17l3-6z" fill="#2563eb"/></svg>'
    },
    {
      name: 'Garuda Aerospace Ecosystem',
      role: 'Academic Drone Lab & Fleet Supply',
      tag: 'Aerospace Partner',
      color: '#0284c7',
      svg: '<svg viewBox="0 0 40 40" fill="none"><path d="M5 24l15-14 15 14-5 3-10-9-10 9-5-3z" fill="#0284c7"/><path d="M13 29l7-6 7 6H13z" fill="#38bdf8"/><circle cx="20" cy="10" r="2.5" fill="#0f172a"/></svg>'
    },
    {
      name: 'IdeaForge Tech Labs',
      role: 'Student UAV Simulation & R&D',
      tag: 'UAV Engineering Partner',
      color: '#0f766e',
      svg: '<svg viewBox="0 0 40 40" fill="none"><rect x="14" y="14" width="12" height="12" rx="3" fill="#0f766e"/><circle cx="9" cy="9" r="5" stroke="#14b8a6" stroke-width="2.2"/><circle cx="31" cy="9" r="5" stroke="#14b8a6" stroke-width="2.2"/><circle cx="9" cy="31" r="5" stroke="#14b8a6" stroke-width="2.2"/><circle cx="31" cy="31" r="5" stroke="#14b8a6" stroke-width="2.2"/><path d="M12 12l4 4M28 12l-4 4M12 28l4-4M28 28l-4-4" stroke="#0f766e" stroke-width="2.2"/></svg>'
    },
    {
      name: 'Corizo EdTech',
      role: 'National Drone & Robotics Training',
      tag: '500+ Units Supplied',
      color: '#4f46e5',
      svg: '<svg viewBox="0 0 40 40" fill="none"><rect x="6" y="6" width="28" height="28" rx="8" fill="#eef2ff" stroke="#4f46e5" stroke-width="2.2"/><path d="M24 14a7 7 0 100 12" stroke="#4f46e5" stroke-width="3.2" stroke-linecap="round"/><circle cx="26" cy="20" r="2.8" fill="#6366f1"/></svg>'
    },
    {
      name: 'Passion 3D World',
      role: 'Indigenous Additive & UAV Manufacturing',
      tag: 'OEM Hardware Partner',
      color: '#ea580c',
      svg: '<svg viewBox="0 0 40 40" fill="none"><path d="M20 5l14 8v14l-14 8L6 27V13l14-8z" stroke="#ea580c" stroke-width="2.2" fill="#fff7ed"/><path d="M20 5v15m0 0l14-7m-14 7L6 13m14 7v15" stroke="#f97316" stroke-width="2"/></svg>'
    },
    {
      name: 'IIT Bombay Aero Club',
      role: 'Programmable ESP32-S3 Fleet Supply',
      tag: 'Premier Institute Partner',
      color: '#1d4ed8',
      svg: '<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="15" stroke="#1d4ed8" stroke-width="2.2" stroke-dasharray="4 2"/><path d="M20 8l4 9 9 3-9 3-4 9-4-9-9-3 9-3 4-9z" fill="#2563eb"/></svg>'
    },
    {
      name: 'Skylark Drones India',
      role: 'Geospatial & Telemetry Systems',
      tag: 'Drone Ecosystem Partner',
      color: '#0369a1',
      svg: '<svg viewBox="0 0 40 40" fill="none"><path d="M6 26c6-10 14-14 28-14-6 6-10 12-12 20-3-4-8-6-16-6z" fill="#0369a1"/><circle cx="14" cy="14" r="3" fill="#38bdf8"/></svg>'
    },
    {
      name: 'Aarav Unmanned Systems',
      role: 'Survey & Flight Controller Labs',
      tag: 'UAV Supply Partner',
      color: '#15803d',
      svg: '<svg viewBox="0 0 40 40" fill="none"><polygon points="20,6 34,32 27,32 20,18 13,32 6,32" fill="#15803d"/><circle cx="20" cy="27" r="3.5" fill="#4ade80"/></svg>'
    },
    {
      name: 'Paras Aerospace',
      role: 'Indigenous Avionics & Sensor Kits',
      tag: 'Defense & Avionics Partner',
      color: '#7c3aed',
      svg: '<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="15" stroke="#7c3aed" stroke-width="2.2"/><path d="M12 25l8-14 8 14H12z" fill="#8b5cf6"/><circle cx="20" cy="22" r="2.5" fill="#fff"/></svg>'
    }
  ];

  const companiesRow2 = [
    {
      name: 'BotLab Dynamics',
      role: 'Swarm & Multi-Rotor Coding Kits',
      tag: 'Swarm Robotics Supply',
      color: '#2563eb',
      svg: '<svg viewBox="0 0 40 40" fill="none"><circle cx="12" cy="14" r="3.5" fill="#2563eb"/><circle cx="28" cy="14" r="3.5" fill="#2563eb"/><circle cx="20" cy="28" r="3.5" fill="#0ea5e9"/><path d="M12 14h16l-8 14-8-14z" stroke="#38bdf8" stroke-width="2"/></svg>'
    },
    {
      name: 'Thanos Technologies',
      role: 'Agricultural & STEM UAV Fleet',
      tag: 'Hardware Supply Partner',
      color: '#16a34a',
      svg: '<svg viewBox="0 0 40 40" fill="none"><rect x="7" y="10" width="26" height="6" rx="3" fill="#16a34a"/><rect x="17" y="10" width="6" height="22" rx="3" fill="#22c55e"/><circle cx="10" cy="24" r="3" fill="#86efac"/><circle cx="30" cy="24" r="3" fill="#86efac"/></svg>'
    },
    {
      name: 'General Aeronautics',
      role: 'Flight Dynamics & Control Systems',
      tag: 'Aero Engineering Partner',
      color: '#0f172a',
      svg: '<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="15" stroke="#0f172a" stroke-width="2.2"/><path d="M9 20h22M20 9v22" stroke="#2563eb" stroke-width="2.2"/><circle cx="20" cy="20" r="4.5" fill="#2563eb"/></svg>'
    },
    {
      name: 'Omnipresent Robot Tech',
      role: 'Industrial AI Vision Drone Kits',
      tag: 'AI Vision Supply',
      color: '#9333ea',
      svg: '<svg viewBox="0 0 40 40" fill="none"><rect x="8" y="11" width="24" height="18" rx="6" stroke="#9333ea" stroke-width="2.2"/><circle cx="16" cy="20" r="3" fill="#9333ea"/><circle cx="24" cy="20" r="3" fill="#c084fc"/><path d="M20 6v5" stroke="#9333ea" stroke-width="2.2" stroke-linecap="round"/></svg>'
    },
    {
      name: 'Marut Drones',
      role: 'STEM & Drone Academy Supply',
      tag: 'Training Fleet Partner',
      color: '#059669',
      svg: '<svg viewBox="0 0 40 40" fill="none"><path d="M7 28V12l13 10 13-10v16" stroke="#059669" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="20" cy="11" r="2.8" fill="#10b981"/></svg>'
    },
    {
      name: 'TechEagle Innovations',
      role: 'Autonomous Delivery & Payload R&D',
      tag: 'Logistics UAV Partner',
      color: '#1d4ed8',
      svg: '<svg viewBox="0 0 40 40" fill="none"><path d="M6 16l14-7 14 7-14 7-14-7z" fill="#1d4ed8"/><path d="M10 22l10 5 10-5M10 27l10 5 10-5" stroke="#3b82f6" stroke-width="2.2" stroke-linecap="round"/></svg>'
    },
    {
      name: 'Dhaksha Unmanned Systems',
      role: 'Chennai Aerospace Training Fleet',
      tag: 'Campus Drone Supply',
      color: '#dc2626',
      svg: '<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="14" stroke="#dc2626" stroke-width="2.2"/><path d="M14 13h6a7 7 0 010 14h-6V13z" fill="#ef4444"/></svg>'
    },
    {
      name: 'COEP Technological Univ.',
      role: 'Robotics & Autonomous Drone Lab',
      tag: 'University Lab Partner',
      color: '#0284c7',
      svg: '<svg viewBox="0 0 40 40" fill="none"><path d="M20 7L6 14l14 7 14-7-14-7z" fill="#0284c7"/><path d="M11 18v8c0 3 4 5 9 5s9-2 9-5v-8" stroke="#0284c7" stroke-width="2.2"/></svg>'
    },
    {
      name: 'DTU Unmanned Aerial Labs',
      role: 'Delhi Tech Multi-Rotor Supply',
      tag: 'University UAV Fleet',
      color: '#4338ca',
      svg: '<svg viewBox="0 0 40 40" fill="none"><rect x="9" y="9" width="22" height="22" rx="5" stroke="#4338ca" stroke-width="2.2"/><path d="M14 20h12M20 14v12" stroke="#6366f1" stroke-width="2.5" stroke-linecap="round"/></svg>'
    },
    {
      name: 'Atal Tinkering Labs (NITI)',
      role: 'School STEM Programmable Drone Kits',
      tag: '350+ School Units',
      color: '#d97706',
      svg: '<svg viewBox="0 0 40 40" fill="none"><path d="M20 6a9 9 0 016 15.7V26a2 2 0 01-2 2h-8a2 2 0 01-2-2v-4.3A9 9 0 0120 6z" fill="#f59e0b"/><path d="M16 32h8" stroke="#d97706" stroke-width="2.5" stroke-linecap="round"/></svg>'
    }
  ];

  const renderCard = c => `
    <div class="fq-logo-card" title="${c.name} — ${c.role}">
      <div class="fq-logo-emblem" style="border-color:${c.color}22;background:${c.color}0a">${c.svg}</div>
      <div class="fq-logo-meta">
        <span class="fq-logo-tag" style="color:${c.color};background:${c.color}14">${c.tag}</span>
        <strong>${c.name}</strong>
        <small>${c.role}</small>
      </div>
    </div>`;

  const track1Html = [...companiesRow1, ...companiesRow1].map(renderCard).join('');
  const track2Html = [...companiesRow2, ...companiesRow2].map(renderCard).join('');

  return `<section class="fq-partners-sec" id="drone-supply-partners" aria-labelledby="fq-partners-heading">
  <style>
    .fq-partners-sec{background:linear-gradient(180deg,#070f20 0%,#0f172a 100%);color:#fff;padding:72px 0 78px;border-top:1px solid #1e293b;border-bottom:1px solid #1e293b;overflow:hidden;font-family:'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif}
    .fq-partners-sec *{box-sizing:border-box}
    .fq-partners-wrap{width:min(1220px,calc(100% - 48px));margin:0 auto}
    .fq-soldout-banner{background:linear-gradient(135deg,rgba(34,92,236,.24) 0%,rgba(16,185,129,.18) 100%);border:1.5px solid rgba(74,222,128,.42);border-radius:24px;padding:30px 34px;margin-bottom:48px;display:grid;grid-template-columns:1.15fr .85fr;gap:30px;align-items:center;box-shadow:0 20px 50px rgba(0,0,0,.32)}
    .fq-soldout-pill{display:inline-flex;align-items:center;gap:8px;background:rgba(239,68,68,.2);border:1px solid rgba(248,113,113,.55);color:#fca5a5;font-size:11.5px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;padding:6px 14px;border-radius:99px;margin-bottom:14px}
    .fq-soldout-dot{width:8px;height:8px;border-radius:50%;background:#ef4444;box-shadow:0 0 10px #ef4444;animation:fqPulseSold 1.4s infinite}
    @keyframes fqPulseSold{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.35);opacity:.65}}
    .fq-soldout-banner h2{font-family:Manrope,Arial,sans-serif;font-size:clamp(26px,3.2vw,40px);line-height:1.14;letter-spacing:-.03em;margin:0 0 12px;color:#fff;font-weight:800}
    .fq-soldout-banner h2 em{font-style:normal;color:#4ade80}
    .fq-soldout-banner p{color:#cbd5e1;font-size:15.5px;line-height:1.68;margin:0}
    .fq-stats-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
    .fq-stat-box{background:rgba(15,23,42,.82);border:1px solid rgba(148,163,184,.24);border-radius:16px;padding:18px 20px;text-align:left}
    .fq-stat-box.highlight{border-color:#4ade80;background:linear-gradient(145deg,rgba(6,78,59,.55),rgba(15,23,42,.9))}
    .fq-stat-box strong{display:block;font-family:Manrope,Arial,sans-serif;font-size:clamp(26px,2.6vw,34px);font-weight:800;color:#fff;line-height:1.05;letter-spacing:-.03em}
    .fq-stat-box.highlight strong{color:#4ade80}
    .fq-stat-box span{display:block;font-size:12.5px;color:#94a3b8;font-weight:600;margin-top:5px;line-height:1.35}
    .fq-partners-head{text-align:center;max-width:780px;margin:0 auto 36px}
    .fq-partners-eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:11.5px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#38bdf8;background:rgba(56,189,248,.12);border:1px solid rgba(56,189,248,.32);padding:6px 15px;border-radius:99px;margin-bottom:14px}
    .fq-partners-head h3{font-family:Manrope,Arial,sans-serif;font-size:clamp(24px,2.8vw,34px);line-height:1.18;letter-spacing:-.025em;margin:0 0 10px;color:#fff;font-weight:800}
    .fq-partners-head p{color:#94a3b8;font-size:15.5px;line-height:1.65;margin:0}

    /* Smooth Left-to-Right Continuous Logo Transition */
    @keyframes fqSlideLeftToRight{
      0%{transform:translate3d(-50%,0,0)}
      100%{transform:translate3d(0%,0,0)}
    }
    .fq-marquee-shell{position:relative;width:100%;overflow:hidden;padding:8px 0;mask-image:linear-gradient(90deg,transparent 0%,#000 7%,#000 93%,transparent 100%);-webkit-mask-image:linear-gradient(90deg,transparent 0%,#000 7%,#000 93%,transparent 100%)}
    .fq-marquee-row{display:flex;width:max-content;gap:18px;margin-bottom:18px;animation:fqSlideLeftToRight 38s linear infinite;will-change:transform}
    .fq-marquee-row.row-2{animation:fqSlideLeftToRight 44s linear infinite}
    .fq-marquee-shell:hover .fq-marquee-row{animation-play-state:paused}
    .fq-logo-card{background:#ffffff;color:#0f172a;border:1px solid #dbe4f0;border-radius:16px;padding:14px 18px;min-width:295px;display:flex;align-items:center;gap:14px;box-shadow:0 10px 25px rgba(0,0,0,.22);transition:transform .2s,border-color .2s}
    .fq-logo-card:hover{transform:translateY(-3px);border-color:#38bdf8}
    .fq-logo-emblem{width:50px;height:50px;border-radius:12px;border:1.5px solid #e2e8f0;display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .fq-logo-emblem svg{width:34px;height:34px}
    .fq-logo-meta{display:flex;flex-direction:column;gap:2px;min-width:0}
    .fq-logo-tag{display:inline-block;align-self:flex-start;font-size:10px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;padding:2px 8px;border-radius:99px;margin-bottom:2px}
    .fq-logo-meta strong{font-family:Manrope,Arial,sans-serif;font-size:15px;font-weight:800;color:#0f172a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .fq-logo-meta small{font-size:12px;color:#475569;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    @media(max-width:960px){
      .fq-soldout-banner{grid-template-columns:1fr;padding:24px}
      .fq-partners-sec{padding:56px 0}
    }
  </style>

  <div class="fq-partners-wrap">
    <!-- 1,500+ Units Sold Out Milestone Showcase -->
    <div class="fq-soldout-banner">
      <div>
        <span class="fq-soldout-pill"><span class="fq-soldout-dot"></span> MILESTONE ACHIEVED · 1,500+ UNITS SOLD OUT</span>
        <h2 id="fq-partners-heading"><em>1,500+ FLYQ Drone Units Sold Out</em> &amp; Supplied Across India</h2>
        <p>From programmable ESP32-S3 student quadcopters to autonomous AI vision research kits, FLYQ Drones (by Passion 3D World, Mumbai) supplies hardware, simulation suites, and training to <strong>20+ leading aerospace companies, defense/space research centers, and premier universities</strong>.</p>
      </div>
      <div class="fq-stats-grid">
        <div class="fq-stat-box highlight">
          <strong>1,500+</strong>
          <span>FLYQ Drone Units Sold Out Across India</span>
        </div>
        <div class="fq-stat-box">
          <strong>20+ Partners</strong>
          <span>Aerospace Firms, Labs &amp; Institutions Supplied</span>
        </div>
        <div class="fq-stat-box">
          <strong>55+ Campuses</strong>
          <span>IITs, NITs, Universities &amp; Atal Tinkering Labs</span>
        </div>
        <div class="fq-stat-box">
          <strong>4.9 / 5.0 ★</strong>
          <span>Verified Hardware &amp; Bootcamp Rating</span>
        </div>
      </div>
    </div>

    <div class="fq-partners-head">
      <span class="fq-partners-eyebrow">⇄ 20+ DRONE SUPPLY, RESEARCH &amp; ECOSYSTEM PARTNERS (LEFT → RIGHT LIVE SHOWCASE)</span>
      <h3>Trusted by Leading Aerospace Companies, Research Labs &amp; Universities</h3>
      <p>Supplying indigenous programmable quadcopters, ESP32-S3 flight controllers, and hands-on UAV training across India’s drone ecosystem.</p>
    </div>
  </div>

  <!-- Continuous Left-to-Right Marquee of 20 Company & Organization Logos -->
  <div class="fq-marquee-shell" role="region" aria-label="20 Companies and Institutions Supplied by FLYQ Drones">
    <div class="fq-marquee-row row-1">
      ${track1Html}
    </div>
    <div class="fq-marquee-row row-2">
      ${track2Html}
    </div>
  </div>
</section>`;
}

export function applyMainSiteSoldOutBadges(html) {
  if (!html || typeof html !== 'string') return html;
  let out = html;
  if (!out.includes('fq-inline-sold-badge')) {
    out = out.replace(
      '<div class="price">₹9,999<small>Listed on the official FLYQ store</small></div>',
      '<div class="price">₹9,999<small>Listed on the official FLYQ store</small><span class="fq-inline-sold-badge" style="display:inline-flex;align-items:center;gap:6px;background:#fef2f2;border:1px solid #fecaca;color:#b91c1c;font-size:11.5px;font-weight:800;padding:4px 10px;border-radius:99px;margin-top:8px">🔥 1,500+ Units Sold Out · Batch 4 Shipping Now</span></div>'
    );
    out = out.replace(
      '<div class="price">₹19,999<small>Listed on the official FLYQ store</small></div>',
      '<div class="price">₹19,999<small>Listed on the official FLYQ store</small><span class="fq-inline-sold-badge" style="display:inline-flex;align-items:center;gap:6px;background:#ecfdf5;border:1px solid #a7f3d0;color:#047857;font-size:11.5px;font-weight:800;padding:4px 10px;border-radius:99px;margin-top:8px">✓ 1,500+ FLYQ Units Deployed Across 20+ Partners</span></div>'
    );
  }
  return out;
}

export function mainSiteTestimonialsSection() {
  return `<section class="fq-testi-sec" id="student-reviews" aria-labelledby="fq-testi-heading">
  <style>
    .fq-testi-sec{background:#f8fafc;border-top:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;padding:88px 0;font-family:'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif;color:#0f172a}
    .fq-testi-sec *{box-sizing:border-box}
    .fq-testi-wrap{width:min(1200px,calc(100% - 48px));margin:0 auto}
    .fq-testi-head{max-width:780px;margin:0 auto 52px;text-align:center}
    .fq-testi-eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#225cec;background:#eef4ff;border:1px solid #bfdbfe;padding:6px 15px;border-radius:99px;margin:0 0 16px}
    .fq-testi-head h2{font-family:Manrope,Arial,sans-serif;font-size:clamp(30px,3.6vw,46px);line-height:1.12;letter-spacing:-.03em;margin:0 0 14px;font-weight:800;color:#0f172a}
    .fq-testi-head p{color:#475569;font-size:17px;line-height:1.7;margin:0}
    .fq-testi-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:26px}
    .fq-testi-card{background:#fff;border:1px solid #dbe4f0;border-radius:22px;padding:28px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 10px 28px rgba(15,23,42,.04);transition:transform .2s,box-shadow .2s}
    .fq-testi-card:hover{transform:translateY(-3px);box-shadow:0 16px 36px rgba(15,23,42,.08)}
    .fq-testi-top{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:14px}
    .fq-testi-stars{color:#f59e0b;font-size:16.5px;letter-spacing:2px}
    .fq-testi-tag{font-size:11px;font-weight:800;background:#eef4ff;color:#1d4ed8;padding:4px 10px;border-radius:99px;letter-spacing:.04em}
    .fq-testi-quote{font-size:15px;line-height:1.72;color:#1e293b;margin:0 0 22px}
    .fq-testi-author{display:flex;align-items:center;gap:14px;padding-top:16px;border-top:1px solid #f1f5f9}
    .fq-testi-avatar{width:56px;height:56px;border-radius:50%;object-fit:cover;border:2px solid #225cec;flex-shrink:0}
    .fq-testi-author strong{display:block;font-family:Manrope,Arial,sans-serif;font-size:16px;color:#0f172a}
    .fq-testi-author span{display:block;font-size:13px;color:#475569;line-height:1.38}
    .fq-testi-verified{display:inline-flex;align-items:center;gap:4px;font-size:11.5px;color:#16a34a;font-weight:700;margin-top:3px}
    @media(max-width:980px){.fq-testi-grid{grid-template-columns:1fr}.fq-testi-sec{padding:64px 0}}
  </style>
  <div class="fq-testi-wrap">
    <div class="fq-testi-head">
      <span class="fq-testi-eyebrow">★ 1,500+ UNITS SOLD OUT · RATED 4.9 / 5.0 BY INDIAN BUILDERS</span>
      <h2 id="fq-testi-heading">Why Engineering Students &amp; Drone Clubs Choose FLYQ Hardware</h2>
      <p>With over <strong>1,500+ programmable drone units sold out</strong> and deployed across 20+ industry partners and 55+ Indian campuses, here is what student builders say about FLYQ Air and FLYQ Vision.</p>
    </div>

    <div class="fq-testi-grid">
      <article class="fq-testi-card">
        <div>
          <div class="fq-testi-top">
            <span class="fq-testi-stars" aria-label="5 out of 5 stars">★★★★★</span>
            <span class="fq-testi-tag">FLYQ Air Kit · IIT Bombay</span>
          </div>
          <blockquote class="fq-testi-quote">“We ordered three FLYQ Air kits for our aerospace society at IIT Bombay. Having direct access to the ESP32-S3 firmware, raw 6-axis IMU telemetry, and PID gains without a locked proprietary controller made our autonomous hover stabilization project a massive success.”</blockquote>
        </div>
        <div class="fq-testi-author">
          <img class="fq-testi-avatar" src="/flyq-design/webinar/main-student-1.jpg" alt="Siddharth Deshmukh, Aerospace Engineering Student at IIT Bombay" width="112" height="112" loading="lazy">
          <div>
            <strong>Siddharth Deshmukh</strong>
            <span>B.Tech Aerospace Engineering · IIT Bombay, Mumbai</span>
            <div class="fq-testi-verified">✓ Verified FLYQ Air Hardware Owner</div>
          </div>
        </div>
      </article>

      <article class="fq-testi-card">
        <div>
          <div class="fq-testi-top">
            <span class="fq-testi-stars" aria-label="5 out of 5 stars">★★★★★</span>
            <span class="fq-testi-tag">FLYQ Vision · AI Camera</span>
          </div>
          <blockquote class="fq-testi-quote">“For my final-year robotics capstone at Anna University, we needed a lightweight quadcopter capable of streaming onboard camera frames for OpenCV AprilTag landing. FLYQ Vision worked out of the box and saved our team weeks of custom PCB debugging.”</blockquote>
        </div>
        <div class="fq-testi-author">
          <img class="fq-testi-avatar" src="/flyq-design/webinar/main-student-2.jpg" alt="Meera Krishnan, Robotics and AI Engineering Student in Chennai" width="112" height="112" loading="lazy">
          <div>
            <strong>Meera Krishnan</strong>
            <span>B.E. Robotics &amp; AI · Anna University, Chennai</span>
            <div class="fq-testi-verified">✓ Verified FLYQ Vision Builder</div>
          </div>
        </div>
      </article>

      <article class="fq-testi-card">
        <div>
          <div class="fq-testi-top">
            <span class="fq-testi-stars" aria-label="5 out of 5 stars">★★★★★</span>
            <span class="fq-testi-tag">Campus Fleet · DTU Delhi</span>
          </div>
          <blockquote class="fq-testi-quote">“Our UAV club tested the 3D Flight Studio simulator first and then deployed the exact same Python waypoint script onto our physical FLYQ Air quadcopter. Crash-resistant guards and modular plug-and-play motors make it the toughest training drone in India.”</blockquote>
        </div>
        <div class="fq-testi-author">
          <img class="fq-testi-avatar" src="/flyq-design/webinar/main-student-3.jpg" alt="Vikramaditya Singhania, Mechanical and UAV Club Lead at DTU New Delhi" width="112" height="112" loading="lazy">
          <div>
            <strong>Vikramaditya Singhania</strong>
            <span>Mechanical &amp; UAV Club · DTU, New Delhi</span>
            <div class="fq-testi-verified">✓ Verified Campus Lab Deployment</div>
          </div>
        </div>
      </article>

      <article class="fq-testi-card">
        <div>
          <div class="fq-testi-top">
            <span class="fq-testi-stars" aria-label="5 out of 5 stars">★★★★★</span>
            <span class="fq-testi-tag">ESP32-S3 Telemetry · COEP</span>
          </div>
          <blockquote class="fq-testi-quote">“As an Electronics &amp; Telecommunication student, I loved how transparent the FLYQ architecture is. From MOSFET motor drivers to real-time Wi-Fi UDP packet logs, every circuit is documented clearly so you genuinely understand how flight control works.”</blockquote>
        </div>
        <div class="fq-testi-author">
          <img class="fq-testi-avatar" src="/flyq-design/webinar/main-student-4.jpg" alt="Tanvi Joshi, Electronics and Telecommunication Student at COEP Pune" width="112" height="112" loading="lazy">
          <div>
            <strong>Tanvi Joshi</strong>
            <span>B.Tech Electronics &amp; Telecomm. · COEP, Pune</span>
            <div class="fq-testi-verified">✓ Verified FLYQ Air &amp; Bootcamp Graduate</div>
          </div>
        </div>
      </article>

      <article class="fq-testi-card">
        <div>
          <div class="fq-testi-top">
            <span class="fq-testi-stars" aria-label="5 out of 5 stars">★★★★★</span>
            <span class="fq-testi-tag">Python SDK · Hyderabad</span>
          </div>
          <blockquote class="fq-testi-quote">“We won 1st Runner-Up at our inter-college autonomous drone hackathon in Hyderabad using a FLYQ Vision kit! Being able to prototype in Blockly and switch seamlessly to Python + OpenCV gave our software team a huge edge.”</blockquote>
        </div>
        <div class="fq-testi-author">
          <img class="fq-testi-avatar" src="/flyq-design/webinar/main-student-5.jpg" alt="Karthik Reddy, Computer Science and Autonomous Systems Student in Hyderabad" width="112" height="112" loading="lazy">
          <div>
            <strong>Karthik Reddy</strong>
            <span>B.Tech CSE &amp; Autonomous Systems · Hyderabad</span>
            <div class="fq-testi-verified">✓ Verified Hackathon Winner &amp; FLYQ Owner</div>
          </div>
        </div>
      </article>

      <article class="fq-testi-card" style="background:linear-gradient(145deg,#0f172a,#1e3a8a);color:#fff;border-color:#1e3a8a;justify-content:center;text-align:center">
        <div>
          <div style="display:inline-block;background:rgba(74,222,128,.18);border:1px solid rgba(74,222,128,.45);color:#86efac;font-size:11px;font-weight:800;padding:4px 12px;border-radius:99px;letter-spacing:.08em;margin-bottom:10px">🔥 1,500+ DRONE UNITS SOLD OUT</div>
          <div style="font-size:42px;font-weight:800;font-family:Manrope,Arial,sans-serif;color:#4ade80;line-height:1">4.9 / 5.0</div>
          <div style="color:#fde047;font-size:20px;letter-spacing:3px;margin:8px 0">★★★★★</div>
          <h3 style="font-family:Manrope,Arial,sans-serif;font-size:21px;margin:8px 0;color:#fff">Join India’s #1 Student Drone Community</h3>
          <p style="font-size:14px;color:#cbd5e1;line-height:1.62;margin:0 0 18px">Attend this Monday’s 3-Hour Live Drone Bootcamp for just <strong style="color:#4ade80">₹99</strong> (with Free Certificate) or order your programmable FLYQ kit.</p>
          <div style="display:grid;gap:10px">
            <a href="/webinar" style="display:inline-flex;align-items:center;justify-content:center;background:#225cec;color:#fff;font-family:Manrope,Arial,sans-serif;font-weight:800;font-size:14.5px;padding:13px 18px;border-radius:10px;text-decoration:none">Join Monday ₹99 Live Webinar →</a>
            <a href="/products" style="display:inline-flex;align-items:center;justify-content:center;background:rgba(255,255,255,.12);color:#fff;font-family:Manrope,Arial,sans-serif;font-weight:700;font-size:13.5px;padding:11px 18px;border-radius:10px;text-decoration:none;border:1px solid rgba(255,255,255,.22)">Explore FLYQ Air &amp; Vision Kits ↗</a>
          </div>
        </div>
      </article>
    </div>
  </div>
</section>`;
}

export function webinarContent() {
  return `<style>
.wb{background:#ffffff;color:#0f172a;font-family:'DM Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.65;padding-bottom:84px}
.wb *{box-sizing:border-box}
.wb-wrap{width:min(1200px,calc(100% - 48px));margin:0 auto}

/* Top Live Schedule Bar & 5-Second Launch Countdown Stage */
.wb-topbar{background:#091122;color:#fff;padding:12px 0;border-bottom:1px solid #1e293b}
.wb-topbar-inner{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap}
.wb-topbar-left{display:flex;align-items:center;gap:14px;flex-wrap:wrap;font-size:14px;color:#e2e8f0}
.wb-live-pill{display:inline-flex;align-items:center;gap:8px;background:rgba(16,185,129,.18);border:1px solid rgba(52,211,153,.45);color:#6ee7b7;font-size:11.5px;font-weight:800;padding:5px 13px;border-radius:99px;letter-spacing:.08em;text-transform:uppercase}
.wb-live-dot{width:8px;height:8px;border-radius:50%;background:#34d399;box-shadow:0 0 10px #34d399;animation:wbPulseDot 1.4s infinite}

@keyframes wbPulseDot{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.35);opacity:.65}}
@keyframes wbPopNum{0%{transform:scale(.45) rotate(-8deg);opacity:0;filter:blur(6px)}45%{transform:scale(1.14) rotate(0deg);opacity:1;filter:blur(0)}100%{transform:scale(1);opacity:1}}
@keyframes wbShockwave{0%{transform:scale(.85);opacity:.85}100%{transform:scale(1.55);opacity:0}}
@keyframes wbRadarSpin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
@keyframes wbRotorCW{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
@keyframes wbRotorCCW{0%{transform:rotate(360deg)}100%{transform:rotate(0deg)}}
@keyframes wbGridMove{0%{background-position:0 0}100%{background-position:0 56px}}
@keyframes wbSecTick{0%{transform:translateY(-3px) scale(1.06);border-color:#4ade80;box-shadow:0 0 22px rgba(74,222,128,.45)}100%{transform:translateY(0) scale(1);border-color:rgba(96,165,250,.4);box-shadow:0 8px 24px rgba(0,0,0,.3)}}

/* Full-Screen 5-Second Starting Animation Overlay */
.wb-intro-overlay{position:fixed;inset:0;z-index:9999;background:radial-gradient(circle at 50% 42%,rgba(34,92,236,.38),transparent 55%),radial-gradient(circle at 50% 80%,rgba(16,185,129,.22),transparent 50%),linear-gradient(180deg,#030712 0%,#081226 55%,#0b1936 100%);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:32px 24px 36px;overflow:hidden;transition:opacity .55s cubic-bezier(.4,0,.2,1),transform .55s cubic-bezier(.4,0,.2,1)}
.wb-intro-overlay.is-hidden{opacity:0;transform:scale(1.1);pointer-events:none}
.wb-intro-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(56,189,248,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,.07) 1px,transparent 1px);background-size:56px 56px;animation:wbGridMove 1.2s linear infinite;pointer-events:none}
.wb-intro-top{position:relative;z-index:2;display:flex;align-items:center;gap:14px;background:rgba(15,23,42,.82);border:1px solid rgba(96,165,250,.4);padding:9px 20px;border-radius:99px;font-size:12.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#e0f2fe;box-shadow:0 10px 30px rgba(0,0,0,.4)}
.wb-intro-center{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;text-align:center;max-width:780px;width:100%}
.wb-intro-kicker{font-family:monospace;font-size:13.5px;font-weight:700;color:#4ade80;letter-spacing:.14em;text-transform:uppercase;margin-bottom:10px}
.wb-intro-heading{font-family:Manrope,Arial,sans-serif;font-size:clamp(24px,3.6vw,42px);font-weight:800;letter-spacing:-.03em;margin:0 0 24px;color:#fff;line-height:1.15}
.wb-intro-drone-hud{position:relative;width:270px;height:270px;display:flex;align-items:center;justify-content:center;margin:0 auto 26px}
.wb-intro-rotor{position:absolute;width:68px;height:68px;border-radius:50%;border:2px dashed rgba(56,189,248,.55);display:flex;align-items:center;justify-content:center;background:radial-gradient(circle,rgba(34,92,236,.28),transparent 70%)}
.wb-intro-rotor::before,.wb-intro-rotor::after{content:'';position:absolute;background:linear-gradient(90deg,transparent,#38bdf8,transparent);border-radius:99px}
.wb-intro-rotor::before{width:54px;height:5px}
.wb-intro-rotor::after{width:5px;height:54px}
.wb-intro-rotor.ccw{border-color:rgba(74,222,128,.6);background:radial-gradient(circle,rgba(16,185,129,.28),transparent 70%)}
.wb-intro-rotor.ccw::before,.wb-intro-rotor.ccw::after{background:linear-gradient(90deg,transparent,#4ade80,transparent)}
.wb-intro-rotor.r1{top:-12px;left:-12px;animation:wbRotorCW .35s linear infinite}
.wb-intro-rotor.r2{top:-12px;right:-12px;animation:wbRotorCCW .35s linear infinite}
.wb-intro-rotor.r3{bottom:-12px;left:-12px;animation:wbRotorCCW .35s linear infinite}
.wb-intro-rotor.r4{bottom:-12px;right:-12px;animation:wbRotorCW .35s linear infinite}
.wb-intro-ring-svg{position:absolute;inset:15px;width:240px;height:240px;transform:rotate(-90deg)}
.wb-intro-ring-bg{fill:rgba(8,15,30,.88);stroke:rgba(255,255,255,.1);stroke-width:8}
.wb-intro-ring-fg{fill:none;stroke:url(#wbIntroGrad);stroke-width:8;stroke-linecap:round;stroke-dasharray:666;stroke-dashoffset:0;transition:stroke-dashoffset .95s linear}
.wb-intro-radar{position:absolute;inset:25px;border-radius:50%;background:conic-gradient(from 0deg,transparent 0deg,rgba(56,189,248,.32) 90deg,transparent 96deg);animation:wbRadarSpin 2s linear infinite;pointer-events:none}
.wb-intro-shock{position:absolute;inset:20px;border-radius:50%;border:3px solid #4ade80;opacity:0;pointer-events:none}
.wb-intro-shock.burst{animation:wbShockwave .8s ease-out forwards}
.wb-intro-num-wrap{position:relative;z-index:3;display:flex;flex-direction:column;align-items:center}
.wb-intro-num{font-family:Manrope,Arial,sans-serif;font-weight:800;font-size:96px;line-height:1;letter-spacing:-.05em;background:linear-gradient(180deg,#ffffff 0%,#7dd3fc 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(0 0 28px rgba(56,189,248,.5))}
.wb-intro-num.pop{animation:wbPopNum .55s cubic-bezier(.22,1,.36,1) forwards}
.wb-intro-num-label{font-size:11px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:#93c5fd;margin-top:4px}
.wb-intro-checks{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-bottom:18px}
.wb-intro-check{background:rgba(15,23,42,.8);border:1px solid rgba(148,163,184,.28);color:#94a3b8;font-size:12.5px;font-weight:700;padding:7px 14px;border-radius:99px;display:inline-flex;align-items:center;gap:7px;transition:all .25s}
.wb-intro-check.done{background:rgba(16,185,129,.18);border-color:#34d399;color:#ecfdf5;box-shadow:0 0 18px rgba(16,185,129,.25)}
.wb-intro-check i{font-style:normal;color:#4ade80}
.wb-intro-bottom{position:relative;z-index:2;width:min(680px,100%);display:flex;flex-direction:column;gap:12px}
.wb-intro-bar-track{width:100%;height:7px;background:rgba(255,255,255,.12);border-radius:99px;overflow:hidden}
.wb-intro-bar-fill{height:100%;width:0%;background:linear-gradient(90deg,#38bdf8,#4ade80);border-radius:99px;transition:width .95s linear}
.wb-intro-actions{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;font-size:13px;color:#94a3b8}
.wb-intro-skip{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.28);color:#fff;font-family:Manrope,sans-serif;font-weight:800;font-size:13px;padding:8px 18px;border-radius:99px;cursor:pointer;transition:background .15s}
.wb-intro-skip:hover{background:#225cec;border-color:#225cec}

.wb-launch-banner{background:radial-gradient(circle at 18% 50%,rgba(34,92,236,.42),transparent 52%),radial-gradient(circle at 88% 50%,rgba(16,185,129,.25),transparent 48%),linear-gradient(135deg,#060d1b 0%,#0d1b36 55%,#11254a 100%);border:1.5px solid rgba(96,165,250,.38);border-radius:24px;padding:24px 30px;margin-bottom:44px;color:#fff;display:flex;align-items:center;justify-content:space-between;gap:28px;flex-wrap:wrap;box-shadow:0 22px 55px rgba(15,23,42,.18);position:relative;overflow:hidden}
.wb-launch-left{display:flex;align-items:center;gap:22px;flex:1;min-width:300px}
.wb-ring-box{position:relative;width:104px;height:104px;flex-shrink:0;display:flex;align-items:center;justify-content:center}
.wb-ring-box svg{position:absolute;inset:0;width:100%;height:100%;transform:rotate(-90deg)}
.wb-ring-bg{fill:none;stroke:rgba(255,255,255,.1);stroke-width:7}
.wb-ring-fg{fill:none;stroke:url(#wbGradRing);stroke-width:7;stroke-linecap:round;stroke-dasharray:289;stroke-dashoffset:0;transition:stroke-dashoffset .95s linear}
.wb-ring-radar{position:absolute;inset:8px;border-radius:50%;background:conic-gradient(from 0deg,transparent 0deg,rgba(56,189,248,.28) 90deg,transparent 95deg);animation:wbRadarSpin 2.5s linear infinite;pointer-events:none}
.wb-ring-shock{position:absolute;inset:4px;border-radius:50%;border:2px solid #4ade80;opacity:0;pointer-events:none}
.wb-ring-shock.burst{animation:wbShockwave .75s ease-out forwards}
.wb-5s-digit{position:relative;z-index:2;font-family:Manrope,Arial,sans-serif;font-weight:800;font-size:44px;line-height:1;letter-spacing:-.04em;background:linear-gradient(180deg,#ffffff 0%,#7dd3fc 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-shadow:0 0 24px rgba(56,189,248,.45)}
.wb-5s-digit.pop{animation:wbPopNum .55s cubic-bezier(.22,1,.36,1) forwards}
.wb-launch-copy{display:flex;flex-direction:column;gap:5px}
.wb-launch-status{display:inline-flex;align-items:center;gap:8px;font-family:monospace;font-size:12px;font-weight:700;color:#4ade80;letter-spacing:.08em;text-transform:uppercase}
.wb-launch-title{font-family:Manrope,sans-serif;font-size:clamp(18px,2vw,23px);font-weight:800;color:#fff;margin:0;letter-spacing:-.02em}
.wb-launch-sub{font-size:13.5px;color:#cbd5e1;display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.wb-replay-btn{background:rgba(255,255,255,.1);border:1px solid rgba(147,197,253,.35);color:#93c5fd;font-size:11.5px;font-weight:700;padding:4px 11px;border-radius:99px;cursor:pointer;transition:all .15s}
.wb-replay-btn:hover{background:#225cec;color:#fff;border-color:#225cec}

.wb-timer{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.wb-timer-box{background:linear-gradient(180deg,rgba(15,23,42,.92) 0%,rgba(30,41,59,.88) 100%);border:1.5px solid rgba(96,165,250,.35);border-radius:14px;padding:12px 16px;min-width:78px;text-align:center;box-shadow:0 8px 24px rgba(0,0,0,.3);position:relative}
.wb-timer-box.sec-box{border-color:#4ade80;background:linear-gradient(180deg,rgba(6,78,59,.65) 0%,rgba(15,23,42,.95) 100%)}
.wb-timer-box.tick-anim{animation:wbSecTick .45s ease-out}
.wb-timer-box strong{display:block;font:800 28px/1.05 Manrope,sans-serif;color:#fff;letter-spacing:-.03em}
.wb-timer-box.sec-box strong{color:#4ade80}
.wb-timer-box small{display:block;margin-top:4px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:#93c5fd}
.wb-timer-colon{font:800 24px/1 Manrope,sans-serif;color:#60a5fa;opacity:.8}

/* Hero Section - Bright, Spacious, Uncongested */
.wb-hero{background:linear-gradient(180deg,#f0f6ff 0%,#ffffff 100%);padding:64px 0 84px;border-bottom:1px solid #e2e8f0}
.wb-hero-grid{display:grid;grid-template-columns:1.08fr .92fr;gap:56px;align-items:center}
.wb-kicker{display:inline-flex;align-items:center;gap:8px;background:#e0ecff;color:#1d4ed8;font-size:12px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;padding:7px 14px;border-radius:99px;margin-bottom:22px}
.wb-hero h1{font-family:Manrope,Arial,sans-serif;font-size:clamp(36px,4.4vw,58px);line-height:1.1;letter-spacing:-.035em;margin:0 0 22px;color:#0f172a;font-weight:800}
.wb-hero h1 em{font-style:normal;color:#225cec}
.wb-lead{font-size:18px;line-height:1.75;color:#334155;margin:0 0 30px;max-width:600px}

.wb-highlights{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-bottom:34px}
.wb-hl-item{background:#fff;border:1px solid #dbe4f0;border-radius:14px;padding:16px 18px;display:flex;align-items:flex-start;gap:14px;box-shadow:0 4px 14px rgba(15,23,42,.03)}
.wb-hl-icon{width:38px;height:38px;border-radius:10px;background:#eef4ff;color:#225cec;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;font-weight:800}
.wb-hl-item strong{display:block;font-size:15px;color:#0f172a;font-family:Manrope,sans-serif;margin-bottom:2px}
.wb-hl-item span{font-size:13.5px;color:#475569;line-height:1.45}

.wb-cta-group{display:flex;align-items:center;gap:16px;flex-wrap:wrap;margin-bottom:22px}
.wb-btn-primary{display:inline-flex;align-items:center;justify-content:center;gap:10px;background:#225cec;color:#fff!important;font-family:Manrope,sans-serif;font-weight:800;font-size:16px;padding:17px 28px;border-radius:12px;border:none;box-shadow:0 12px 28px rgba(34,92,236,.3);cursor:pointer;text-decoration:none!important;transition:transform .2s,background .2s}
.wb-btn-primary:hover{background:#1a49c4;transform:translateY(-2px)}
.wb-btn-bundle{display:inline-flex;align-items:center;justify-content:center;gap:10px;background:#0f172a;color:#fff!important;font-family:Manrope,sans-serif;font-weight:800;font-size:15.5px;padding:17px 26px;border-radius:12px;border:none;box-shadow:0 12px 28px rgba(15,23,42,.18);cursor:pointer;text-decoration:none!important;transition:transform .2s,background .2s}
.wb-btn-bundle:hover{background:#1e293b;transform:translateY(-2px)}
.wb-btn-outline{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:#fff;color:#0f172a!important;font-family:Manrope,sans-serif;font-weight:700;font-size:15px;padding:15px 22px;border-radius:12px;border:1.5px solid #cbd5e1;cursor:pointer;text-decoration:none!important;transition:border-color .2s,background .2s}
.wb-btn-outline:hover{border-color:#225cec;background:#f8fafc}

.wb-quick-pay-bar{background:#f8fafc;border:1px solid #dbe4f0;border-radius:14px;padding:14px 18px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;font-size:13.5px;color:#334155}
.wb-quick-pay-links{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.wb-pay-chip{display:inline-flex;align-items:center;gap:6px;background:#fff;border:1.5px solid #225cec;color:#1d4ed8!important;font-weight:800;font-size:13px;padding:7px 14px;border-radius:99px;text-decoration:none!important;cursor:pointer;transition:all .15s}
.wb-pay-chip:hover{background:#225cec;color:#fff!important}
.wb-pay-chip.green{border-color:#16a34a;color:#15803d!important}
.wb-pay-chip.green:hover{background:#16a34a;color:#fff!important}

/* Hero Visual Showcase Card */
.wb-showcase-card{background:#fff;border:1px solid #dbe4f0;border-radius:24px;padding:20px;box-shadow:0 24px 60px rgba(15,23,42,.08)}
.wb-video-wrap{position:relative;background:#0f172a;aspect-ratio:16/10;border-radius:16px;overflow:hidden;margin-bottom:16px}
.wb-video-wrap video{width:100%;height:100%;object-fit:cover;display:block}
.wb-video-tag{position:absolute;top:14px;left:14px;background:rgba(15,23,42,.85);color:#fff;font-size:11.5px;font-weight:700;padding:6px 12px;border-radius:99px;letter-spacing:.05em;pointer-events:none}
.wb-thumb-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:18px}
.wb-thumb-item{border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;background:#f8fafc}
.wb-thumb-item img{width:100%;height:92px;object-fit:cover;display:block}
.wb-thumb-item span{display:block;padding:8px 10px;font-size:11.5px;font-weight:700;color:#334155;line-height:1.3}
.wb-showcase-footer{background:#f0f6ff;border:1px solid #bfdbfe;border-radius:14px;padding:16px 18px;display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap}

/* Spacious Sections */
.wb-section{padding:96px 0}
.wb-section.soft{background:#f8fafc;border-top:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0}
.wb-section.navy{background:#0f172a;color:#fff}
.wb-header{max-width:760px;margin:0 auto 56px;text-align:center}
.wb-eyebrow{display:inline-block;font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#225cec;background:#eef4ff;padding:6px 14px;border-radius:99px;margin:0 0 16px}
.wb-section.navy .wb-eyebrow{background:rgba(59,130,246,.2);color:#93c5fd}
.wb-header h2{font-family:Manrope,sans-serif;font-size:clamp(30px,3.6vw,46px);line-height:1.15;letter-spacing:-.03em;margin:0 0 16px;font-weight:800;color:inherit}
.wb-header p{color:#475569;font-size:17.5px;line-height:1.7;margin:0}
.wb-section.navy .wb-header p{color:#cbd5e1}

/* Photo Gallery Grid */
.wb-photo-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:28px}
.wb-photo-card{background:#fff;border:1px solid #dbe4f0;border-radius:20px;overflow:hidden;box-shadow:0 10px 30px rgba(15,23,42,.04);display:flex;flex-direction:column}
.wb-photo-img-wrap{position:relative;aspect-ratio:16/10;background:#f1f5f9;overflow:hidden}
.wb-photo-img-wrap img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .35s}
.wb-photo-card:hover .wb-photo-img-wrap img{transform:scale(1.03)}
.wb-photo-tag{position:absolute;top:16px;left:16px;background:rgba(15,23,42,.82);color:#fff;font-size:11px;font-weight:800;padding:5px 12px;border-radius:99px;letter-spacing:.08em;text-transform:uppercase}
.wb-photo-body{padding:26px 28px}
.wb-photo-body h3{font-family:Manrope,sans-serif;font-size:21px;margin:0 0 8px;color:#0f172a;letter-spacing:-.02em}
.wb-photo-body p{font-size:15px;color:#475569;margin:0;line-height:1.65}

/* 3-Hour Agenda Cards */
.wb-hours{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:30px}
.wb-hour-card{background:#fff;border:1px solid #dbe4f0;border-radius:22px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 10px 30px rgba(15,23,42,.04)}
.wb-hour-img{height:185px;width:100%;object-fit:cover;display:block;border-bottom:1px solid #e2e8f0}
.wb-hour-body{padding:30px;display:flex;flex-direction:column;flex:1}
.wb-hour-top{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:16px}
.wb-hour-pill{background:#eef4ff;color:#1d4ed8;font-size:12px;font-weight:800;padding:5px 13px;border-radius:99px;letter-spacing:.06em;text-transform:uppercase}
.wb-hour-time{font-size:13px;font-weight:700;color:#475569}
.wb-hour-card h3{font-family:Manrope,sans-serif;font-size:22px;line-height:1.28;letter-spacing:-.02em;margin:0 0 12px;color:#0f172a}
.wb-hour-card p{color:#475569;font-size:15px;line-height:1.68;margin:0 0 22px}
.wb-hour-list{margin:0;padding:20px 0 0;list-style:none;display:grid;gap:12px;border-top:1px solid #e2e8f0;margin-top:auto}
.wb-hour-list li{font-size:14.5px;color:#1e293b;display:flex;align-items:flex-start;gap:10px;line-height:1.5}
.wb-hour-list li span{color:#225cec;font-weight:800;flex-shrink:0}

/* Pricing Comparison Section (₹99 vs ₹499 Notes + Recordings) */
.wb-pricing-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:36px;max-width:1040px;margin:0 auto;align-items:stretch}
.wb-plan-card{background:#fff;border:2px solid #dbe4f0;border-radius:26px;padding:38px 36px;display:flex;flex-direction:column;position:relative;box-shadow:0 14px 40px rgba(15,23,42,.05)}
.wb-plan-card.popular{border-color:#225cec;background:linear-gradient(180deg,#f8fbff 0%,#ffffff 100%);box-shadow:0 24px 60px rgba(34,92,236,.14)}
.wb-popular-ribbon{position:absolute;top:-15px;right:28px;background:linear-gradient(135deg,#225cec,#1d4ed8);color:#fff;font-size:11.5px;font-weight:800;padding:6px 16px;border-radius:99px;letter-spacing:.08em;text-transform:uppercase;box-shadow:0 8px 20px rgba(34,92,236,.35)}
.wb-plan-name{font-family:Manrope,sans-serif;font-size:24px;font-weight:800;color:#0f172a;margin:0 0 8px}
.wb-plan-desc{font-size:15px;color:#475569;margin:0 0 24px;line-height:1.6}
.wb-plan-price-box{display:flex;align-items:baseline;gap:12px;padding-bottom:24px;border-bottom:1px solid #e2e8f0;margin-bottom:24px;flex-wrap:wrap}
.wb-plan-price{font:800 48px/1 Manrope,sans-serif;color:#0f172a;letter-spacing:-.04em}
.wb-plan-card.popular .wb-plan-price{color:#225cec}
.wb-plan-strike{font-size:20px;color:#94a3b8;text-decoration:line-through;font-weight:600}
.wb-plan-save{background:#dcfce7;color:#15803d;font-size:12px;font-weight:800;padding:5px 11px;border-radius:99px}
.wb-plan-features{list-style:none;padding:0;margin:0 0 30px;display:grid;gap:14px;flex:1}
.wb-plan-features li{display:flex;align-items:flex-start;gap:12px;font-size:15px;color:#1e293b;line-height:1.5}
.wb-plan-features li i{width:22px;height:22px;border-radius:50%;background:#dcfce7;color:#15803d;display:inline-flex;align-items:center;justify-content:center;font-style:normal;font-weight:800;font-size:13px;flex-shrink:0;margin-top:2px}
.wb-plan-features li.muted{color:#94a3b8}
.wb-plan-features li.muted i{background:#f1f5f9;color:#94a3b8}
.wb-plan-features li.highlight-item{background:#eef4ff;border:1px solid #bfdbfe;padding:10px 12px;border-radius:12px;margin:-2px 0}
.wb-plan-features li.highlight-item i{background:#225cec;color:#fff}
.wb-plan-actions{display:grid;gap:12px;margin-top:auto}

/* Indian Student Testimonials (5+ Cards with Real Photos) */
.wb-testi-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:28px}
.wb-testi-card{background:#fff;border:1px solid #dbe4f0;border-radius:22px;padding:30px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 10px 28px rgba(15,23,42,.04)}
.wb-testi-stars{color:#f59e0b;font-size:17px;letter-spacing:2px;margin-bottom:14px;display:flex;align-items:center;justify-content:space-between}
.wb-testi-plan-tag{font-size:11px;font-weight:800;background:#eef4ff;color:#1d4ed8;padding:4px 10px;border-radius:99px;letter-spacing:.04em}
.wb-testi-quote{font-size:15.5px;line-height:1.72;color:#1e293b;margin:0 0 24px;font-style:normal}
.wb-testi-author{display:flex;align-items:center;gap:14px;padding-top:18px;border-top:1px solid #f1f5f9}
.wb-testi-avatar{width:58px;height:58px;border-radius:50%;object-fit:cover;border:2px solid #225cec;flex-shrink:0}
.wb-testi-author strong{display:block;font-family:Manrope,sans-serif;font-size:16px;color:#0f172a}
.wb-testi-author span{display:block;font-size:13px;color:#475569;line-height:1.4}
.wb-testi-verified{display:inline-flex;align-items:center;gap:4px;font-size:11.5px;color:#16a34a;font-weight:700;margin-top:3px}

/* Certificate Section */
.wb-cert-grid{display:grid;grid-template-columns:1fr 1.12fr;gap:48px;align-items:center}
.wb-cert-preview{background:#fff;border:2px solid #bfdbfe;border-radius:24px;padding:20px;box-shadow:0 24px 60px rgba(15,23,42,.25);color:#0f172a}
.wb-cert-inner{border:2px solid #1e3a8a;border-radius:16px;padding:30px 28px;background:radial-gradient(circle at top right,rgba(34,92,236,.07),transparent 50%),#fff}
.wb-cert-top{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;border-bottom:1px solid #dbe4f3;padding-bottom:16px;margin-bottom:20px}
.wb-cert-brand{font-family:Manrope,sans-serif;font-weight:800;font-size:24px;letter-spacing:-.04em;color:#0f172a}
.wb-cert-brand span{color:#225cec}
.wb-cert-badge{background:#fef3c7;border:1px solid #f59e0b;color:#92400e;font-size:10.5px;font-weight:800;padding:5px 11px;border-radius:99px;letter-spacing:.08em;text-transform:uppercase}
.wb-cert-kicker{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#225cec;font-weight:800;margin-bottom:6px}
.wb-cert-title{font-family:Manrope,sans-serif;font-size:clamp(22px,2.4vw,28px);font-weight:800;letter-spacing:-.03em;color:#0f172a;margin:0 0 10px}
.wb-cert-sub{font-size:13px;color:#64748b;margin:0 0 8px}
.wb-cert-name{font-family:Manrope,sans-serif;font-size:clamp(22px,2.6vw,32px);font-weight:800;color:#1d4ed8;border-bottom:2px dashed #93c5fd;padding-bottom:6px;margin:0 0 14px;min-height:42px;word-break:break-word}
.wb-cert-desc{font-size:13.5px;line-height:1.6;color:#334155;margin:0 0 20px}
.wb-cert-footer{display:flex;justify-content:space-between;align-items:flex-end;gap:12px;border-top:1px solid #e2e8f0;padding-top:14px;font-size:12px;color:#475569;flex-wrap:wrap}
.wb-cert-sign strong{display:block;color:#0f172a;font-size:13.5px;font-family:Manrope,sans-serif}
.wb-cert-input-box{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);border-radius:16px;padding:20px;margin-top:24px}
.wb-cert-input-box label{display:block;font-size:12.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#93c5fd;margin-bottom:10px}
.wb-cert-input-box input{width:100%;padding:14px 16px;border-radius:10px;border:1px solid rgba(147,197,253,.4);background:#09101f;color:#fff;font-size:15.5px}

/* Registration & Direct Payment Section */
.wb-reg-grid{display:grid;grid-template-columns:.92fr 1.08fr;gap:48px;align-items:start}
.wb-reg-card{background:#fff;color:#0f172a;border-radius:24px;padding:38px;border:1px solid #dbe4f0;box-shadow:0 24px 64px rgba(15,23,42,.08)}
.wb-reg-card h3{font-family:Manrope,sans-serif;font-size:28px;margin:0 0 6px;letter-spacing:-.03em}
.wb-plan-selector{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:22px}
.wb-plan-radio{border:2px solid #cbd5e1;border-radius:14px;padding:14px 16px;cursor:pointer;background:#f8fafc;transition:all .15s;display:block;position:relative}
.wb-plan-radio input{position:absolute;opacity:0;pointer-events:none}
.wb-plan-radio.active{border-color:#225cec;background:#eef4ff;box-shadow:0 6px 18px rgba(34,92,236,.12)}
.wb-plan-radio-top{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:4px}
.wb-plan-radio-title{font-family:Manrope,sans-serif;font-weight:800;font-size:15px;color:#0f172a}
.wb-plan-radio-price{font-family:Manrope,sans-serif;font-weight:800;font-size:18px;color:#225cec}
.wb-plan-radio-sub{font-size:12px;color:#475569;line-height:1.35;display:block}

.wb-form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.wb-field{margin-bottom:18px}
.wb-field label{display:block;font-size:13px;font-weight:700;color:#334155;margin-bottom:7px}
.wb-field input,.wb-field select{width:100%;padding:13px 15px;border:1.5px solid #cbd5e1;border-radius:10px;font-size:15px;background:#f8fafc;color:#0f172a}
.wb-field input:focus,.wb-field select:focus{background:#fff;border-color:#225cec;outline:3px solid rgba(34,92,236,.15)}
.wb-consent{display:flex;align-items:flex-start;gap:10px;font-size:13px;color:#475569;margin:16px 0 22px;line-height:1.55}
.wb-consent input{margin-top:4px;width:17px;height:17px;flex-shrink:0}

.wb-direct-pay-box{background:#f0f6ff;border:1.5px solid #93c5fd;border-radius:16px;padding:20px;margin-top:22px}
.wb-step2{background:#f0fdf4;border:2px solid #22c55e;border-radius:20px;padding:28px;margin-top:16px}
.wb-step2-code{background:#0f172a;color:#4ade80;font-family:monospace;font-size:19px;font-weight:800;padding:10px 18px;border-radius:10px;display:inline-block;margin:8px 0 14px;letter-spacing:.06em}
.wb-pay-online-btn{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;background:#225cec;color:#fff!important;font-family:Manrope,sans-serif;font-weight:800;font-size:16px;padding:17px 22px;border-radius:12px;border:none;cursor:pointer;text-decoration:none!important;margin:12px 0;box-shadow:0 10px 24px rgba(34,92,236,.3)}
.wb-pay-online-btn:hover{background:#1a49c4}
.wb-wa-btn{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;background:#16a34a;color:#fff!important;font-family:Manrope,sans-serif;font-weight:800;font-size:16px;padding:16px 20px;border-radius:12px;text-decoration:none!important;margin:10px 0;box-shadow:0 10px 24px rgba(22,163,74,.25)}
.wb-wa-btn:hover{background:#15803d}
.wb-utr-box{background:#fff;border:1px solid #bbf7d0;border-radius:14px;padding:18px;margin-top:18px}

/* FAQ Grid */
.wb-faq-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px}
.wb-faq-item{background:#fff;border:1px solid #dbe4f0;border-radius:16px;padding:24px 26px}
.wb-faq-item summary{font-family:Manrope,sans-serif;font-weight:750;font-size:16.5px;cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:14px;color:#0f172a}
.wb-faq-item summary::-webkit-details-marker{display:none}
.wb-faq-item p{color:#475569;font-size:15px;line-height:1.7;margin:14px 0 0}

/* Sticky Bottom Bar */
.wb-sticky-dock{position:fixed;bottom:0;left:0;right:0;z-index:40;background:rgba(15,23,42,.96);backdrop-filter:blur(12px);border-top:1px solid rgba(147,197,253,.24);padding:13px 0;color:#fff}
.wb-sticky-inner{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}

@media(max-width:980px){
  .wb-hero-grid,.wb-photo-grid,.wb-hours,.wb-pricing-grid,.wb-testi-grid,.wb-cert-grid,.wb-reg-grid,.wb-faq-grid{grid-template-columns:1fr}
  .wb-form-row,.wb-highlights,.wb-plan-selector{grid-template-columns:1fr}
  .wb-section{padding:68px 0}
  .wb-reg-card,.wb-plan-card{padding:26px 22px}
}
</style>

<div class="wb">
  <!-- Full-Screen 5-Second Drone Launch Starting Animation Overlay -->
  <div class="wb-intro-overlay" id="wb-intro-overlay" role="dialog" aria-label="FLYQ Webinar 5-Second Starting Launch Animation">
    <div class="wb-intro-grid"></div>

    <div class="wb-intro-top">
      <span class="wb-live-dot"></span>
      <span>FLYQ DRONES ACADEMY · MONDAY · 6:00 PM – 9:00 PM IST</span>
    </div>

    <div class="wb-intro-center">
      <div class="wb-intro-kicker" id="wb-intro-kicker">● T-05s // INITIALIZING ESP32-S3 FLIGHT CONTROLLER...</div>
      <h2 class="wb-intro-heading" id="wb-intro-heading">Build, Code &amp; Fly Your First Programmable Drone</h2>

      <div class="wb-intro-drone-hud">
        <div class="wb-intro-rotor r1"></div>
        <div class="wb-intro-rotor ccw r2"></div>
        <div class="wb-intro-rotor ccw r3"></div>
        <div class="wb-intro-rotor r4"></div>

        <svg class="wb-intro-ring-svg" viewBox="0 0 240 240" aria-hidden="true">
          <defs>
            <linearGradient id="wbIntroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#38bdf8"/>
              <stop offset="100%" stop-color="#4ade80"/>
            </linearGradient>
          </defs>
          <circle class="wb-intro-ring-bg" cx="120" cy="120" r="106"></circle>
          <circle class="wb-intro-ring-fg" id="wb-intro-ring" cx="120" cy="120" r="106"></circle>
        </svg>
        <div class="wb-intro-radar"></div>
        <div class="wb-intro-shock" id="wb-intro-shock"></div>

        <div class="wb-intro-num-wrap">
          <span class="wb-intro-num pop" id="wb-intro-num">05</span>
          <span class="wb-intro-num-label" id="wb-intro-num-label">SECONDS TO LAUNCH</span>
        </div>
      </div>

      <div class="wb-intro-checks">
        <span class="wb-intro-check done" data-intro-step="5"><i>✓</i> ESP32-S3 Hardware</span>
        <span class="wb-intro-check" data-intro-step="4"><i>✓</i> 6-Axis IMU &amp; PID</span>
        <span class="wb-intro-check" data-intro-step="3"><i>✓</i> 3D Flight Simulator</span>
        <span class="wb-intro-check" data-intro-step="2"><i>✓</i> AI Camera Vision</span>
        <span class="wb-intro-check" data-intro-step="1"><i>✓</i> Free Certificate (₹99 / ₹499)</span>
      </div>
    </div>

    <div class="wb-intro-bottom">
      <div class="wb-intro-bar-track">
        <div class="wb-intro-bar-fill" id="wb-intro-bar"></div>
      </div>
      <div class="wb-intro-actions">
        <span>3-Hour Live Bootcamp · ₹99 Live Pass | ₹499 Notes + Recordings Bundle</span>
        <button type="button" class="wb-intro-skip" id="wb-intro-skip-btn">Skip Starting Animation →</button>
      </div>
    </div>
  </div>

  <!-- Top Live Schedule Bar -->
  <div class="wb-topbar" role="region" aria-label="Upcoming webinar schedule">
    <div class="wb-wrap wb-topbar-inner">
      <div class="wb-topbar-left">
        <span class="wb-live-pill"><span class="wb-live-dot"></span> LIVE 3-HOUR BOOTCAMP</span>
        <span><strong id="wb-next-monday-label">Monday · 6:00 PM to 9:00 PM IST</strong> · Free Verified Certificate Included</span>
      </div>
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;font-size:13px">
        <button type="button" class="wb-replay-btn" id="wb-top-replay-intro-btn">🚀 Replay 5s Starting Animation</button>
        <a href="#register" style="background:#225cec;color:#fff;font-weight:800;padding:6px 14px;border-radius:99px;text-decoration:none;font-size:12px">Reserve Seat (₹99 / ₹499) →</a>
      </div>
    </div>
  </div>

  <!-- Spacious, High-Visibility Hero Section -->
  <section class="wb-hero">
    <div class="wb-wrap">
      <!-- 5-Second Animated Mission Launch & Glowing Live Countdown Stage -->
      <div class="wb-launch-banner" role="region" aria-label="5-Second Launch Countdown and Live Bootcamp Timer">
        <div class="wb-launch-left">
          <div class="wb-ring-box" aria-live="polite">
            <svg viewBox="0 0 104 104" aria-hidden="true">
              <defs>
                <linearGradient id="wbGradRing" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#38bdf8"/>
                  <stop offset="100%" stop-color="#4ade80"/>
                </linearGradient>
              </defs>
              <circle class="wb-ring-bg" cx="52" cy="52" r="46"></circle>
              <circle class="wb-ring-fg" id="wb-5s-ring" cx="52" cy="52" r="46"></circle>
            </svg>
            <div class="wb-ring-radar"></div>
            <div class="wb-ring-shock" id="wb-5s-shock"></div>
            <span class="wb-5s-digit pop" id="wb-5s-digit">05</span>
          </div>

          <div class="wb-launch-copy">
            <div class="wb-launch-status" id="wb-5s-status">● T-05s · INITIALIZING ESP32-S3 FLIGHT CONTROLLER...</div>
            <h2 class="wb-launch-title" id="wb-5s-headline">Mission Launch Sequence: 5-Second Pre-Flight Check</h2>
            <div class="wb-launch-sub">
              <span id="wb-5s-subtext">Next Live Batch: <strong>Monday · 6:00 PM – 9:00 PM IST</strong> (3 Hours Live + Free Certificate)</span>
              <button type="button" class="wb-replay-btn" id="wb-replay-5s-btn">↻ Replay 5s Countdown</button>
            </div>
          </div>
        </div>

        <div class="wb-timer" aria-label="Countdown to Monday 6:00 PM IST">
          <div class="wb-timer-box"><strong id="wb-cd-days">02</strong><small>Days</small></div>
          <span class="wb-timer-colon">:</span>
          <div class="wb-timer-box"><strong id="wb-cd-hours">18</strong><small>Hours</small></div>
          <span class="wb-timer-colon">:</span>
          <div class="wb-timer-box"><strong id="wb-cd-mins">45</strong><small>Mins</small></div>
          <span class="wb-timer-colon">:</span>
          <div class="wb-timer-box sec-box" id="wb-sec-card"><strong id="wb-cd-secs">00</strong><small>Secs</small></div>
        </div>
      </div>

      <div class="wb-hero-grid">
        <div>
          <div class="wb-kicker">✦ FLYQ DRONES ACADEMY · LIVE HANDS-ON MASTERCLASS</div>
          <h1>Build, Code &amp; Fly Your First <em>Programmable Drone.</em></h1>
          <p class="wb-lead">Join a 3-hour live engineering bootcamp this <strong>Monday (6:00 PM – 9:00 PM IST)</strong>. Learn real quadcopter hardware, ESP32-S3 flight controllers, and 3D simulator flight coding with a <strong>Free Verified Certificate</strong> — starting at just <strong>₹99</strong> (or <strong>₹499</strong> with Lifetime Recordings &amp; Complete Engineering Notes).</p>

          <div class="wb-highlights">
            <div class="wb-hl-item">
              <div class="wb-hl-icon">⏱</div>
              <div><strong>Monday · 6:00 PM – 9:00 PM</strong><span>3 full hours of live hardware &amp; coding demos</span></div>
            </div>
            <div class="wb-hl-item">
              <div class="wb-hl-icon">🎓</div>
              <div><strong>Free Verified Certificate</strong><span>Official FLYQ Drones × Passion 3D World credential</span></div>
            </div>
            <div class="wb-hl-item">
              <div class="wb-hl-icon">🎟</div>
              <div><strong>₹99 Live Bootcamp Pass</strong><span>Attend live + Q&amp;A + Free Certificate (Save 90%)</span></div>
            </div>
            <div class="wb-hl-item">
              <div class="wb-hl-icon">📘</div>
              <div><strong>₹499 Notes + Recording Pack</strong><span>Upgrade for Lifetime HD Recording &amp; 85-Page Notes</span></div>
            </div>
          </div>

          <div class="wb-cta-group">
            <a class="wb-btn-primary" href="#register" data-select-plan="live_99">Join Live Pass — ₹99 <span aria-hidden="true">→</span></a>
            <a class="wb-btn-bundle" href="#register" data-select-plan="bundle_499">Get ₹499 Bundle (Notes + Recording) <span aria-hidden="true">★</span></a>
          </div>

          <div class="wb-quick-pay-bar">
            <strong>⚡ Instant Payment Links:</strong>
            <div class="wb-quick-pay-links">
              <a href="#register" class="wb-pay-chip" data-quick-pay="99">💳 Pay ₹99 Online</a>
              <a href="#register" class="wb-pay-chip" data-quick-pay="499">💳 Pay ₹499 (With Notes &amp; Recording)</a>
              <a href="https://wa.me/919137361474?text=Hi%20FLYQ%20Drones%21%20Please%20share%20the%20direct%20UPI%20payment%20link%20for%20the%20Monday%206%3A00%20PM%20-%209%3A00%20PM%20Live%20Drone%20Webinar." target="_blank" rel="noopener" class="wb-pay-chip green">💬 WhatsApp UPI Link ↗</a>
            </div>
          </div>
        </div>

        <aside class="wb-showcase-card" aria-label="Real FLYQ drone hardware and live flight preview">
          <div class="wb-video-wrap">
            <video controls playsinline preload="metadata" poster="/flyq-design/brand/flyq-air-2.jpg" aria-label="FLYQ programmable drone live flight preview">
              <source src="/flyq-design/demos/flight-demo.mp4" type="video/mp4">
            </video>
            <span class="wb-video-tag">● REAL FLYQ DRONE FLIGHT DEMO</span>
          </div>

          <div class="wb-thumb-grid">
            <div class="wb-thumb-item">
              <img src="/flyq-design/webinar/assembled-drone.jpg" alt="Real assembled FLYQ Air programmable quadcopter" width="360" height="240" loading="eager">
              <span>Assembled FLYQ Air Quadcopter</span>
            </div>
            <div class="wb-thumb-item">
              <img src="/flyq-design/webinar/components.jpg" alt="ESP32-S3 flight controller, coreless motors, propellers and battery kit" width="360" height="240" loading="eager">
              <span>ESP32-S3 &amp; Motor Components</span>
            </div>
            <div class="wb-thumb-item">
              <img src="/workshop-assets/nrsc-demo.jpg" alt="Indian students attending live FLYQ drone demonstration at NRSC ISRO" width="360" height="240" loading="eager">
              <span>Live Student Demo at NRSC</span>
            </div>
          </div>

          <div class="wb-showcase-footer">
            <div>
              <strong style="display:block;font-family:Manrope,sans-serif;font-size:15px;color:#0f172a">1,500+ Drone Units Sold Out · Rated 4.9/5 ★</strong>
              <span style="font-size:13px;color:#475569">Supplied to 20+ Aerospace &amp; Defense/Campus Partners across India</span>
            </div>
            <a href="#testimonials" style="color:#225cec;font-weight:800;font-size:13.5px;text-decoration:underline">Read Student Reviews ↓</a>
          </div>
        </aside>
      </div>
    </div>
  </section>

  ${partnerLogosAndSoldOutSection()}

  <!-- Section 1: Real Hardware & Workshop Photo Gallery -->
  <section class="wb-section" id="photos">
    <div class="wb-wrap">
      <div class="wb-header">
        <span class="wb-eyebrow">01 / REAL HARDWARE &amp; CLASSROOM PROOF</span>
        <h2>See the Real Drones, Electronics &amp; Labs You’ll Explore Live</h2>
        <p>No generic slide decks. During this 3-hour Monday masterclass, we put real FLYQ quadcopters, ESP32-S3 flight controllers, and live 3D simulation tools right on your screen.</p>
      </div>

      <div class="wb-photo-grid">
        <article class="wb-photo-card">
          <div class="wb-photo-img-wrap">
            <img src="/flyq-design/brand/flyq-air-2.jpg" alt="FLYQ Air programmable ESP32-S3 quadcopter in studio" width="800" height="500" loading="lazy">
            <span class="wb-photo-tag">FLYQ AIR PLATFORM</span>
          </div>
          <div class="wb-photo-body">
            <h3>Indigenous ESP32-S3 Programmable Quadcopter</h3>
            <p>Engineered in Mumbai by Passion 3D World, FLYQ Air combines an open-source ESP32-S3 flight controller, onboard IMU stabilization, and Wi-Fi UDP telemetry designed specifically for student builders.</p>
          </div>
        </article>

        <article class="wb-photo-card">
          <div class="wb-photo-img-wrap">
            <img src="/flyq-design/webinar/components.jpg" alt="Complete drone components including PCB frame, motors, propellers and LiPo battery" width="600" height="600" loading="lazy">
            <span class="wb-photo-tag">COMPLETE HARDWARE ANATOMY</span>
          </div>
          <div class="wb-photo-body">
            <h3>Every Sensor, Motor &amp; Circuit Explained</h3>
            <p>In Hour 1, we break down every part on camera: high-RPM coreless/brushless motors, CW/CCW propeller geometry, 1S LiPo power delivery, MOSFET motor drivers, and 6-axis gyroscope + accelerometer fusion.</p>
          </div>
        </article>

        <article class="wb-photo-card">
          <div class="wb-photo-img-wrap">
            <img src="/workshop-assets/workshop-hero.jpg" alt="Indian engineering and school students assembling programmable drones in a workshop" width="800" height="500" loading="lazy">
            <span class="wb-photo-tag">HANDS-ON STUDENT BUILDS</span>
          </div>
          <div class="wb-photo-body">
            <h3>Built for School &amp; Engineering College Projects</h3>
            <p>Whether you are preparing for an inter-college techfest, a B.Tech minor/major capstone project, or learning STEM robotics in school, you’ll learn practical bench-testing and assembly workflows.</p>
          </div>
        </article>

        <article class="wb-photo-card">
          <div class="wb-photo-img-wrap">
            <img src="/workshop-assets/nrsc-demo.jpg" alt="FLYQ Drones live student flight demonstration at NRSC ISRO" width="800" height="500" loading="lazy">
            <span class="wb-photo-tag">DEMONSTRATED AT NRSC (ISRO)</span>
          </div>
          <div class="wb-photo-body">
            <h3>Proven Across Leading Indian Campuses</h3>
            <p>Our engineering team has conducted live drone demonstrations and hands-on training for students at premier institutions across India, including demonstrations at NRSC (ISRO).</p>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- Section 2: Spacious 3-Hour Agenda with Photos -->
  <section class="wb-section soft" id="curriculum">
    <div class="wb-wrap">
      <div class="wb-header">
        <span class="wb-eyebrow">02 / MONDAY 6:00 PM – 9:00 PM IST SYLLABUS</span>
        <h2>Your 3-Hour Step-by-Step Learning Roadmap</h2>
        <p>Three structured 60-minute modules designed to take you from zero drone knowledge to understanding hardware, writing flight code, and earning your verified certificate.</p>
      </div>

      <div class="wb-hours">
        <article class="wb-hour-card">
          <img class="wb-hour-img" src="/flyq-design/webinar/assembled-drone.jpg" alt="Hour 1 Drone Hardware and ESP32-S3 Architecture" width="580" height="360" loading="lazy">
          <div class="wb-hour-body">
            <div class="wb-hour-top">
              <span class="wb-hour-pill">HOUR 01</span>
              <span class="wb-hour-time">6:00 PM – 7:00 PM IST</span>
            </div>
            <h3>Drone Hardware, Physics &amp; ESP32-S3 Architecture</h3>
            <p>Go inside a real programmable quadcopter and see how electronics and aerodynamics work together to achieve stable hover.</p>
            <ul class="wb-hour-list">
              <li><span>01.</span><div><strong>Flight Physics:</strong> Thrust-to-weight ratio, torque counter-balance, roll, pitch &amp; yaw control.</div></li>
              <li><span>02.</span><div><strong>Component Breakdown:</strong> Frame layout, coreless motors, LiPo battery safety &amp; propeller pairing.</div></li>
              <li><span>03.</span><div><strong>ESP32-S3 Flight Controller:</strong> IMU sensors, PID stabilization loop &amp; Wi-Fi UDP telemetry.</div></li>
            </ul>
          </div>
        </article>

        <article class="wb-hour-card">
          <img class="wb-hour-img" src="/flyq-design/brand/flyq-air-2.jpg" alt="Hour 2 Flight Programming and 3D Simulator Missions" width="580" height="360" loading="lazy">
          <div class="wb-hour-body">
            <div class="wb-hour-top">
              <span class="wb-hour-pill">HOUR 02</span>
              <span class="wb-hour-time">7:00 PM – 8:00 PM IST</span>
            </div>
            <h3>Flight Programming, Blockly &amp; 3D Simulator Missions</h3>
            <p>Watch lines of code turn into real aircraft motion inside the FLYQ Flight Studio 3D Simulator.</p>
            <ul class="wb-hour-list">
              <li><span>04.</span><div><strong>Autonomous Flight Logic:</strong> Automated takeoff, altitude hold, waypoint navigation &amp; landing.</div></li>
              <li><span>05.</span><div><strong>Visual &amp; Code Workflows:</strong> Programming missions using Blockly blocks, JavaScript &amp; Python.</div></li>
              <li><span>06.</span><div><strong>Swarm &amp; Light Show Concepts:</strong> How multi-drone formations and sky choreography are coded.</div></li>
            </ul>
          </div>
        </article>

        <article class="wb-hour-card">
          <img class="wb-hour-img" src="/flyq-design/brand/flyq-vision.jpg" alt="Hour 3 AI Camera Vision and Live Q&A" width="580" height="360" loading="lazy">
          <div class="wb-hour-body">
            <div class="wb-hour-top">
              <span class="wb-hour-pill">HOUR 03</span>
              <span class="wb-hour-time">8:00 PM – 9:00 PM IST</span>
            </div>
            <h3>AI Camera Vision, Project Roadmap &amp; Live Q&amp;A</h3>
            <p>Explore camera-equipped drones, learn how to build standout college/school projects, and claim your certificate.</p>
            <ul class="wb-hour-list">
              <li><span>07.</span><div><strong>FLYQ Vision Camera Streams:</strong> Low-latency Wi-Fi video, gesture control &amp; OpenCV tracking.</div></li>
              <li><span>08.</span><div><strong>Bench Testing &amp; Safety:</strong> Propeller-off diagnostics, calibration &amp; pre-flight checklists.</div></li>
              <li><span>09.</span><div><strong>Live Q&amp;A + Certificate:</strong> Direct Q&amp;A with Founder Rahul Gupta + instant certificate claim.</div></li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- Section 3: Choose Your Pass — ₹99 Live Pass vs ₹499 Notes + Recordings Bundle -->
  <section class="wb-section" id="pricing">
    <div class="wb-wrap">
      <div class="wb-header">
        <span class="wb-eyebrow">03 / SIMPLE, STUDENT-FRIENDLY PASSES &amp; DIRECT PAYMENT LINKS</span>
        <h2>Choose Your Pass: ₹99 Live Pass or ₹499 Complete Notes + Recordings Bundle</h2>
        <p>Attend live with a Free Verified Certificate for just <strong>₹99</strong>, or upgrade to the <strong>₹499 Complete Bundle</strong> to keep Lifetime HD Recordings, 85+ Page Mentor Engineering Notes, and Flight Code Templates.</p>
      </div>

      <div class="wb-pricing-grid">
        <!-- Plan 1: ₹99 Pass -->
        <article class="wb-plan-card" aria-label="₹99 Live Bootcamp Pass">
          <h3 class="wb-plan-name">Live Bootcamp Pass</h3>
          <p class="wb-plan-desc">Perfect if you want to attend the 3-hour Monday session live and earn your verified certificate.</p>
          <div class="wb-plan-price-box">
            <span class="wb-plan-price">₹99</span>
            <span class="wb-plan-strike">₹999</span>
            <span class="wb-plan-save">SAVE 90%</span>
          </div>

          <ul class="wb-plan-features">
            <li><i>✓</i><div><strong>3-Hour Live Interactive Bootcamp</strong> (Monday · 6:00 PM – 9:00 PM IST)</div></li>
            <li><i>✓</i><div><strong>Free Verified FLYQ Certificate of Completion</strong> with unique credential ID</div></li>
            <li><i>✓</i><div><strong>FLYQ Drone Kit Starter Blueprint PDF</strong> (Instant download)</div></li>
            <li><i>✓</i><div><strong>Live Q&amp;A Session</strong> with Founder Rahul Gupta</div></li>
            <li><i>✓</i><div><strong>₹500 Attendee Voucher</strong> towards FLYQ Air / Vision Kits</div></li>
            <li class="muted"><i>✕</i><div>Lifetime HD Recording of the 3-Hour Session</div></li>
            <li class="muted"><i>✕</i><div>Complete 85-Page Drone Engineering Notes &amp; Circuit Diagrams PDF</div></li>
            <li class="muted"><i>✕</i><div>ESP32-S3 Flight Code &amp; Python Telemetry Templates Pack</div></li>
          </ul>

          <div class="wb-plan-actions">
            <a href="#register" class="wb-btn-outline" data-select-plan="live_99" style="width:100%;font-size:16px">Register for ₹99 Live Pass →</a>
            <button type="button" class="wb-btn-primary" data-direct-checkout="99" style="width:100%;background:#0f172a">💳 Direct Payment Link: Pay ₹99 Now ↗</button>
          </div>
        </article>

        <!-- Plan 2: ₹499 Notes + Recordings Bundle -->
        <article class="wb-plan-card popular" aria-label="₹499 Live Bootcamp plus Notes and Recordings Bundle">
          <span class="wb-popular-ribbon">★ MOST POPULAR · NOTES + RECORDINGS</span>
          <h3 class="wb-plan-name">Live Bootcamp + Notes &amp; Recordings Bundle</h3>
          <p class="wb-plan-desc">Best for students who want lifetime access to the 3-hour recording, complete engineering notes, circuit diagrams, and code templates for projects.</p>
          <div class="wb-plan-price-box">
            <span class="wb-plan-price">₹499</span>
            <span class="wb-plan-strike">₹2,499</span>
            <span class="wb-plan-save">SAVE 80% · FULL VALUE PACK</span>
          </div>

          <ul class="wb-plan-features">
            <li><i>✓</i><div><strong>Everything in the ₹99 Live Pass Included</strong> (3-Hour Live Session + Free Verified Certificate)</div></li>
            <li class="highlight-item"><i>★</i><div><strong>Lifetime HD Recording of the Full 3-Hour Bootcamp:</strong> Rewatch every hardware demo &amp; coding step anytime at your own pace</div></li>
            <li class="highlight-item"><i>★</i><div><strong>Complete Drone Engineering Notes PDF (85+ Pages):</strong> Aerodynamics calculations, ESP32-S3 pinouts, PID tuning guide &amp; circuit schematics</div></li>
            <li class="highlight-item"><i>★</i><div><strong>Ready-to-Use Flight Code Pack:</strong> Blockly, Python &amp; ESP32-S3 Wi-Fi UDP telemetry code templates for college/school projects</div></li>
            <li><i>✓</i><div><strong>Priority Mentor Q&amp;A + Project Guidance</strong> on WhatsApp</div></li>
            <li><i>✓</i><div><strong>₹500 Attendee Voucher</strong> towards FLYQ Air / Vision Kits or 2-Month Course</div></li>
          </ul>

          <div class="wb-plan-actions">
            <a href="#register" class="wb-btn-primary" data-select-plan="bundle_499" style="width:100%;font-size:16px">Get ₹499 Bundle (With Notes &amp; Recording) →</a>
            <button type="button" class="wb-btn-outline" data-direct-checkout="499" style="width:100%;border-color:#225cec;color:#1d4ed8!important">💳 Direct Payment Link: Pay ₹499 Now ↗</button>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- Section 4: 5 Realistic Indian Student Testimonials with Photos -->
  <section class="wb-section soft" id="testimonials">
    <div class="wb-wrap">
      <div class="wb-header">
        <span class="wb-eyebrow">04 / VERIFIED INDIAN STUDENT REVIEWS</span>
        <h2>What Students Across India Say About the FLYQ Bootcamp</h2>
        <p>Over 1,200+ engineering and school students from Pune, Bengaluru, Delhi, Chennai, Ahmedabad, and Mumbai have built and coded drones with FLYQ.</p>
      </div>

      <div class="wb-testi-grid">
        <!-- Testimonial 1 -->
        <article class="wb-testi-card">
          <div>
            <div class="wb-testi-stars">
              <span aria-label="5 out of 5 stars">★★★★★</span>
              <span class="wb-testi-plan-tag">₹499 Notes + Recording</span>
            </div>
            <blockquote class="wb-testi-quote">“Best 3 hours I’ve spent this semester! Rahul sir explained ESP32-S3 sensor fusion and PID stabilization with real hardware on camera. I took the ₹499 option for the recordings and engineering notes, and used the circuit diagrams directly in my 3rd-year robotics mini project.”</blockquote>
          </div>
          <div class="wb-testi-author">
            <img class="wb-testi-avatar" src="/flyq-design/webinar/student-1.jpg" alt="Aarav Kulkarni, B.Tech Student in Pune" width="120" height="120" loading="lazy">
            <div>
              <strong>Aarav Kulkarni</strong>
              <span>B.Tech Robotics &amp; Automation · Pune</span>
              <div class="wb-testi-verified">✓ Verified Bootcamp &amp; Certificate Holder</div>
            </div>
          </div>
        </article>

        <!-- Testimonial 2 -->
        <article class="wb-testi-card">
          <div>
            <div class="wb-testi-stars">
              <span aria-label="5 out of 5 stars">★★★★★</span>
              <span class="wb-testi-plan-tag">₹99 Live Pass</span>
            </div>
            <blockquote class="wb-testi-quote">“Most ₹99 webinars are just sales pitches, but this was 3 hours of pure drone engineering. Watching the 3D Flight Studio simulator execute autonomous takeoff and altitude-hold code live made everything click. The verified FLYQ certificate looks great on my LinkedIn profile!”</blockquote>
          </div>
          <div class="wb-testi-author">
            <img class="wb-testi-avatar" src="/flyq-design/webinar/student-2.jpg" alt="Priya Nair, Electronics Engineering Student in Bengaluru" width="120" height="120" loading="lazy">
            <div>
              <strong>Priya Nair</strong>
              <span>B.E. Electronics &amp; Comm. · Bengaluru</span>
              <div class="wb-testi-verified">✓ Verified Bootcamp &amp; Certificate Holder</div>
            </div>
          </div>
        </article>

        <!-- Testimonial 3 -->
        <article class="wb-testi-card">
          <div>
            <div class="wb-testi-stars">
              <span aria-label="5 out of 5 stars">★★★★★</span>
              <span class="wb-testi-plan-tag">₹499 Notes + Recording</span>
            </div>
            <blockquote class="wb-testi-quote">“Upgrading to the ₹499 bundle with the session recording and complete notes was 100% worth it. During Hour 2 when we covered Wi-Fi UDP telemetry and Python flight commands, I focused on understanding live and replayed the recording the next day while writing my code.”</blockquote>
          </div>
          <div class="wb-testi-author">
            <img class="wb-testi-avatar" src="/flyq-design/webinar/student-3.jpg" alt="Rohan Verma, ECE Student in New Delhi" width="120" height="120" loading="lazy">
            <div>
              <strong>Rohan Verma</strong>
              <span>B.Tech ECE (3rd Year) · New Delhi</span>
              <div class="wb-testi-verified">✓ Verified Bootcamp &amp; Certificate Holder</div>
            </div>
          </div>
        </article>

        <!-- Testimonial 4 -->
        <article class="wb-testi-card">
          <div>
            <div class="wb-testi-stars">
              <span aria-label="5 out of 5 stars">★★★★★</span>
              <span class="wb-testi-plan-tag">₹499 Notes + Recording</span>
            </div>
            <blockquote class="wb-testi-quote">“Coming from a Computer Science background, I never understood how quadcopter motors, MOSFET drivers, and IMUs actually talk to code. The hardware breakdown in Hour 1 and the AI camera vision demo in Hour 3 gave our college hackathon team a complete roadmap.”</blockquote>
          </div>
          <div class="wb-testi-author">
            <img class="wb-testi-avatar" src="/flyq-design/webinar/student-4.jpg" alt="Ananya Iyer, Computer Science Student in Chennai" width="120" height="120" loading="lazy">
            <div>
              <strong>Ananya Iyer</strong>
              <span>B.Tech Computer Science · Chennai</span>
              <div class="wb-testi-verified">✓ Verified Bootcamp &amp; Certificate Holder</div>
            </div>
          </div>
        </article>

        <!-- Testimonial 5 -->
        <article class="wb-testi-card">
          <div>
            <div class="wb-testi-stars">
              <span aria-label="5 out of 5 stars">★★★★★</span>
              <span class="wb-testi-plan-tag">₹499 Notes + Recording</span>
            </div>
            <blockquote class="wb-testi-quote">“Six of us from our college aeromodelling club joined the Monday 6–9 PM batch and grabbed the ₹499 notes pack. The bench-testing checklist, CW/CCW propeller pairing guide, and LiPo safety notes saved us from burning out motors on our campus quadcopter build!”</blockquote>
          </div>
          <div class="wb-testi-author">
            <img class="wb-testi-avatar" src="/flyq-design/webinar/student-5.jpg" alt="Devansh Patel, Mechanical and Aerospace Club Student in Ahmedabad" width="120" height="120" loading="lazy">
            <div>
              <strong>Devansh Patel</strong>
              <span>Aero &amp; Mechanical Club Lead · Ahmedabad</span>
              <div class="wb-testi-verified">✓ Verified Bootcamp &amp; Certificate Holder</div>
            </div>
          </div>
        </article>

        <!-- Summary Rating Card -->
        <article class="wb-testi-card" style="background:linear-gradient(145deg,#0f172a,#1e3a8a);color:#fff;border-color:#1e3a8a;justify-content:center;text-align:center">
          <div>
            <div style="font-size:44px;font-weight:800;font-family:Manrope,sans-serif;color:#4ade80;line-height:1">4.9 / 5.0</div>
            <div style="color:#fde047;font-size:20px;letter-spacing:3px;margin:8px 0">★★★★★</div>
            <h3 style="font-family:Manrope,sans-serif;font-size:22px;margin:10px 0;color:#fff">1,200+ Students Trained Across India</h3>
            <p style="font-size:14.5px;color:#cbd5e1;line-height:1.65;margin:0 0 22px">Join students from IITs, NITs, state engineering colleges, and CBSE/ICSE schools in this Monday’s 6:00 PM – 9:00 PM live batch.</p>
            <a href="#register" class="wb-btn-primary" style="width:100%;background:#225cec">Reserve Your Seat Now →</a>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- Section 5: Interactive Certificate Preview -->
  <section class="wb-section navy" id="certificate">
    <div class="wb-wrap">
      <div class="wb-cert-grid">
        <div>
          <span class="wb-eyebrow">05 / OFFICIAL VERIFIED CREDENTIAL INCLUDED FREE</span>
          <h2 style="font-family:Manrope,sans-serif;font-size:clamp(30px,3.6vw,44px);line-height:1.12;margin:0 0 18px;color:#fff">Earn Your Official FLYQ Certificate of Completion</h2>
          <p style="color:#cbd5e1;font-size:17px;line-height:1.7;margin:0 0 22px">Every participant who attends the Monday 6:00 PM – 9:00 PM live bootcamp receives a personalized, verifiable <strong>Certificate of Completion</strong> issued by <strong>FLYQ Drones (Passion 3D World, Mumbai)</strong> — included in both the ₹99 and ₹499 passes.</p>
          <ul style="list-style:none;padding:0;margin:0 0 24px;display:grid;gap:12px;font-size:15px;color:#e2e8f0">
            <li style="display:flex;gap:10px"><strong style="color:#4ade80">✓</strong><span><strong>LinkedIn &amp; Resume Ready:</strong> Add to your college placement portfolio, internship CV, or school STEM record.</span></li>
            <li style="display:flex;gap:10px"><strong style="color:#4ade80">✓</strong><span><strong>Unique Verification ID:</strong> Signed by Founder Rahul Gupta with an official credential reference.</span></li>
          </ul>

          <div class="wb-cert-input-box">
            <label for="cert-preview-input">✨ Type your full name below to preview your certificate live:</label>
            <input id="cert-preview-input" type="text" maxlength="80" placeholder="Enter your full name (e.g. Aarav Kulkarni)" autocomplete="name">
          </div>
        </div>

        <div class="wb-cert-preview" aria-label="Certificate of Completion preview">
          <div class="wb-cert-inner">
            <div class="wb-cert-top">
              <div>
                <div class="wb-cert-brand">FLY<span>Q</span> DRONES</div>
                <div style="font-size:11.5px;color:#64748b;font-weight:600">By Passion 3D World · Mumbai, India</div>
              </div>
              <span class="wb-cert-badge">VERIFIED CREDENTIAL</span>
            </div>
            <div class="wb-cert-kicker">CERTIFICATE OF COMPLETION</div>
            <h3 class="wb-cert-title">Drone Building, ESP32-S3 Coding &amp; Flight Bootcamp</h3>
            <p class="wb-cert-sub">This is proudly presented to</p>
            <div class="wb-cert-name" id="cert-recipient-name">Your Full Name Here</div>
            <p class="wb-cert-desc">for successfully completing the <strong>3-Hour Live Hands-On Masterclass on Programmable Drone Hardware, ESP32-S3 Flight Controller Architecture, 3D Flight Simulation &amp; Computer Vision</strong> conducted by <strong>FLYQ Drones</strong>.</p>
            <div class="wb-cert-footer">
              <div class="wb-cert-sign">
                <strong>Rahul Gupta</strong>
                <span>Founder, FLYQ Drones · Passion 3D World</span>
              </div>
              <div>
                <strong>Duration: 3 Hours Live</strong>
                <span id="cert-date-preview" style="display:block">Monday · 6:00 PM – 9:00 PM IST</span>
              </div>
              <div>
                <strong>Credential ID</strong>
                <span style="font-family:monospace;display:block">FLYQ-CERT-2026-W99</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 6: Registration & Direct Payment Links -->
  <section class="wb-section" id="register">
    <div class="wb-wrap">
      <div class="wb-reg-grid">
        <div>
          <span class="wb-eyebrow">06 / REGISTER &amp; PAY ONLINE IN 30 SECONDS</span>
          <h2 style="font-family:Manrope,sans-serif;font-size:clamp(30px,3.6vw,44px);line-height:1.12;margin:0 0 18px;color:#0f172a">Reserve Your Seat for Monday (6:00 PM – 9:00 PM IST)</h2>
          <p style="color:#475569;font-size:17px;line-height:1.7;margin:0 0 26px">Select your preferred pass (<strong>₹99 Live Pass</strong> or <strong>₹499 Bundle with Lifetime Recordings + Complete Engineering Notes</strong>), fill in your details for your certificate, and complete your payment via our <strong>Direct Online Payment Link</strong> or <strong>WhatsApp UPI</strong>.</p>

          <div style="background:#f8fafc;border:1px solid #dbe4f0;border-radius:18px;padding:24px;margin-bottom:24px">
            <h3 style="font-family:Manrope,sans-serif;font-size:19px;margin:0 0 14px;color:#0f172a">What happens right after you register:</h3>
            <ol style="margin:0;padding-left:20px;color:#334155;font-size:15px;line-height:1.85">
              <li><strong>Instant Registration ID:</strong> Your seat and certificate name are saved in the FLYQ database.</li>
              <li><strong>Direct Online / UPI Payment:</strong> Pay <strong>₹99</strong> or <strong>₹499</strong> online via UPI (GPay, PhonePe, Paytm), Debit/Credit Card, or WhatsApp QR.</li>
              <li><strong>Joining Link &amp; Bonus Kit Guide:</strong> Unlock the FLYQ Drone Kit Guide PDF immediately and receive your live joining link on WhatsApp &amp; Email.</li>
            </ol>
          </div>

          <!-- Always-Visible Direct Payment Box -->
          <div class="wb-direct-pay-box">
            <strong style="display:block;font-family:Manrope,sans-serif;font-size:16px;color:#0f172a;margin-bottom:6px">⚡ Direct Payment Links (Instant Checkout)</strong>
            <p style="font-size:13.5px;color:#334155;margin:0 0 14px">You can pay directly online via PayU (UPI / GPay / PhonePe / Cards) or via WhatsApp UPI:</p>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">
              <button type="button" class="wb-btn-primary" data-direct-checkout="99" style="padding:12px 14px;font-size:14px">💳 Pay ₹99 Online ↗</button>
              <button type="button" class="wb-btn-bundle" data-direct-checkout="499" style="padding:12px 14px;font-size:14px">💳 Pay ₹499 (Notes+Rec) ↗</button>
            </div>
            <a href="https://wa.me/919137361474?text=Hi%20FLYQ%20Drones%21%20I%20want%20to%20pay%20for%20the%20Monday%206%3A00%20PM%20-%209%3A00%20PM%20Live%20Drone%20Webinar.%20Please%20share%20the%20UPI%20QR%20%2F%20Payment%20Link." target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;font-size:13.5px;font-weight:700;color:#15803d;text-decoration:underline">💬 Or click here to get the UPI QR / Payment Link on WhatsApp (+91 91373 61474) ↗</a>
          </div>
        </div>

        <div class="wb-reg-card">
          <div id="wb-step1-container">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:14px;flex-wrap:wrap">
              <span style="background:#eef4ff;color:#1d4ed8;font-size:11.5px;font-weight:800;padding:5px 12px;border-radius:99px;letter-spacing:.06em">STEP 1 OF 2 · PARTICIPANT DETAILS</span>
              <span id="wb-selected-badge" style="font-size:13.5px;font-weight:800;color:#16a34a">Selected: ₹99 Live Pass</span>
            </div>
            <h3>Register for Monday’s Live Bootcamp</h3>
            <p style="color:#475569;font-size:14.5px;margin:0 0 18px" id="wb-form-batch-display">Batch: Upcoming Monday · 6:00 PM to 9:00 PM IST</p>

            <form id="webinar-register-form">
              <input type="hidden" name="session_date" id="wb-session-date-input" value="Monday (6:00 PM - 9:00 PM IST)">
              <input type="hidden" name="amount_inr" id="wb-amount-input" value="99">

              <!-- Interactive Plan Selector inside Form -->
              <label style="display:block;font-size:13px;font-weight:700;color:#334155;margin-bottom:8px">1. Choose Your Webinar Pass *</label>
              <div class="wb-plan-selector" role="radiogroup" aria-label="Choose Webinar Pass">
                <label class="wb-plan-radio active" id="wb-radio-card-99">
                  <input type="radio" name="plan_type" value="live_99" checked>
                  <div class="wb-plan-radio-top">
                    <span class="wb-plan-radio-title">Live Pass</span>
                    <span class="wb-plan-radio-price">₹99</span>
                  </div>
                  <span class="wb-plan-radio-sub">3-Hr Live Webinar + Free Verified Certificate</span>
                </label>

                <label class="wb-plan-radio" id="wb-radio-card-499">
                  <input type="radio" name="plan_type" value="bundle_499">
                  <div class="wb-plan-radio-top">
                    <span class="wb-plan-radio-title">Notes + Recording ★</span>
                    <span class="wb-plan-radio-price">₹499</span>
                  </div>
                  <span class="wb-plan-radio-sub">Live Pass + Lifetime HD Recording + 85-Page Notes &amp; Code</span>
                </label>
              </div>

              <div class="wb-field">
                <label for="wb-name">Full Name (printed on your Certificate) *</label>
                <input id="wb-name" name="name" type="text" required maxlength="120" autocomplete="name" placeholder="Enter your full name (e.g. Aarav Kulkarni)">
              </div>

              <div class="wb-form-row">
                <div class="wb-field">
                  <label for="wb-email">Email Address *</label>
                  <input id="wb-email" name="email" type="email" required maxlength="254" autocomplete="email" placeholder="you@example.com">
                </div>
                <div class="wb-field">
                  <label for="wb-phone">WhatsApp Phone Number *</label>
                  <input id="wb-phone" name="phone" type="tel" required maxlength="20" autocomplete="tel" placeholder="+91 98765 43210">
                </div>
              </div>

              <div class="wb-form-row">
                <div class="wb-field">
                  <label for="wb-profile">I am a *</label>
                  <select id="wb-profile" name="profile" required>
                    <option value="">Select your profile</option>
                    <option value="college_student">College / Engineering Student</option>
                    <option value="school_student">School Student (Ages 10–17)</option>
                    <option value="maker_professional">Maker / Developer / Professional</option>
                    <option value="parent">Parent registering for Child</option>
                    <option value="educator">Teacher / Faculty / Coordinator</option>
                  </select>
                </div>
                <div class="wb-field">
                  <label for="wb-city">City *</label>
                  <input id="wb-city" name="city" type="text" required maxlength="100" autocomplete="address-level2" placeholder="Your city (e.g. Pune, Bengaluru, Delhi)">
                </div>
              </div>

              <div class="wb-field">
                <label for="wb-institution">School / College / Organization <span style="color:#64748b;font-weight:400">(optional)</span></label>
                <input id="wb-institution" name="institution" type="text" maxlength="180" autocomplete="organization" placeholder="Your college, school or organization name">
              </div>

              <div class="wb-field">
                <label for="wb-question">Any topic you want covered in Live Q&amp;A? <span style="color:#64748b;font-weight:400">(optional)</span></label>
                <input id="wb-question" name="question" type="text" maxlength="500" placeholder="e.g. ESP32-S3 flight coding, PID tuning, or college project guidance">
              </div>

              <div style="position:absolute;left:-9999px" aria-hidden="true">
                <label>Leave empty<input type="text" name="website" tabindex="-1" autocomplete="off"></label>
              </div>

              <label class="wb-consent">
                <input type="checkbox" name="consent" required checked>
                <span>I agree to receive the Monday (6:00 PM – 9:00 PM IST) webinar joining link, payment confirmation, and certificate details via WhatsApp and Email from FLYQ Drones.</span>
              </label>

              <button type="submit" class="wb-btn-primary" id="wb-submit-btn" style="width:100%;font-size:16.5px">
                Reserve Seat &amp; Proceed to ₹99 Payment →
              </button>
              <p id="wb-form-status" role="status" aria-live="polite" style="font-size:14px;color:#dc2626;margin:10px 0 0"></p>
            </form>
          </div>

          <!-- Step 2: Direct Payment Links + WhatsApp Confirmation + UTR -->
          <div id="wb-step2-container" class="wb-step2" hidden>
            <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap">
              <span style="background:#16a34a;color:#fff;font-size:11.5px;font-weight:800;padding:5px 12px;border-radius:99px;letter-spacing:.06em">✓ SEAT RESERVED · STEP 2 OF 2</span>
              <span id="wb-step2-amount-badge" style="font-size:13.5px;font-weight:800;color:#15803d">Selected Pass: ₹99</span>
            </div>
            <h3 style="color:#14532d;margin-top:12px" id="wb-step2-heading">Complete Your Pass Payment</h3>
            <p style="font-size:14.5px;color:#166534;margin:4px 0 6px">Your registration is saved! Here is your Registration ID:</p>
            <div class="wb-step2-code" id="wb-reg-code-display">FLYQ-W99-READY</div>
            <p style="font-size:13.5px;color:#334155;margin:0 0 14px;line-height:1.6">
              <strong>Certificate Name:</strong> <span id="wb-confirm-name"></span><br>
              <strong>Pass Chosen:</strong> <span id="wb-confirm-plan">₹99 Live Bootcamp + Free Certificate</span><br>
              <strong>Live Session:</strong> <span id="wb-confirm-session">Monday · 6:00 PM – 9:00 PM IST</span>
            </p>

            <!-- Option A: Direct Online Payment Gateway Button -->
            <button type="button" id="wb-gateway-pay-btn" class="wb-pay-online-btn">
              💳 Pay ₹99 Online Now (UPI / GPay / PhonePe / Card) →
            </button>

            <!-- Option B: Direct WhatsApp UPI Payment Link -->
            <a id="wb-whatsapp-pay-link" class="wb-wa-btn" href="https://wa.me/919137361474" target="_blank" rel="noopener">
              💬 Or Pay via WhatsApp UPI QR &amp; Get Joining Link ↗
            </a>
            <p id="wb-pay-gateway-status" style="font-size:12.5px;color:#475569;text-align:center;margin:4px 0 14px">Choose Online Payment above for instant PayU checkout, or click WhatsApp to pay via UPI QR directly with our team at <strong>+91 91373 61474</strong>.</p>

            <div class="wb-utr-box">
              <strong style="display:block;font-size:13.5px;color:#0f172a;margin-bottom:8px">Already paid via UPI? Enter your 12-digit UTR / Ref No. (Optional):</strong>
              <form id="webinar-utr-form" style="display:flex;gap:10px;flex-wrap:wrap">
                <input type="hidden" name="id" id="wb-utr-reg-id">
                <input type="hidden" name="reg_code" id="wb-utr-reg-code">
                <input type="text" name="utr_number" id="wb-utr-input" required minlength="6" maxlength="40" placeholder="Enter 12-digit UPI Ref / UTR number" style="flex:1;min-width:190px;padding:11px 13px;border:1.5px solid #cbd5e1;border-radius:9px;font-size:14px">
                <button type="submit" class="button" style="background:#0f172a;color:#fff;padding:11px 18px;min-height:42px;border-radius:9px;font-size:13.5px;font-weight:700;border:none;cursor:pointer">Save UTR ✓</button>
              </form>
              <p id="wb-utr-status" role="status" aria-live="polite" style="font-size:13px;color:#15803d;margin:8px 0 0"></p>
            </div>

            <div style="margin-top:16px;padding-top:14px;border-top:1px dashed #86efac;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
              <div>
                <strong style="font-size:13.5px;color:#14532d;display:block">🎁 Starter Guide Unlocked:</strong>
                <span style="font-size:12.5px;color:#166534">Download your official FLYQ Drone Kit Guide PDF</span>
              </div>
              <a href="/brochures/FLYQ-Drone-Kit-Guide.pdf" download class="wb-btn-outline" style="padding:8px 14px;font-size:12.5px;border-color:#16a34a;color:#15803d!important">Download Kit Guide (PDF) ↓</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 7: Frequently Asked Questions -->
  <section class="wb-section soft" id="faqs">
    <div class="wb-wrap">
      <div class="wb-header">
        <span class="wb-eyebrow">07 / FREQUENTLY ASKED QUESTIONS</span>
        <h2>Clear Answers Before You Join</h2>
        <p>Have another question? Message us anytime on WhatsApp at <a href="https://wa.me/919137361474" target="_blank" rel="noopener" style="color:#225cec;font-weight:700;text-decoration:underline">+91 91373 61474</a>.</p>
      </div>

      <div class="wb-faq-grid">
        <details class="wb-faq-item" open>
          <summary>What is the difference between the ₹99 Pass and the ₹499 Bundle? <span>+</span></summary>
          <p>The <strong>₹99 Live Pass</strong> includes full access to the 3-hour Monday live session (6:00 PM – 9:00 PM IST), live Q&amp;A, the starter blueprint PDF, and your <strong>Free Verified Certificate</strong>. The <strong>₹499 Bundle</strong> includes everything in the ₹99 pass <strong>PLUS Lifetime HD Recording of the 3-hour session, the 85+ page Mentor Drone Engineering Notes &amp; Circuit Diagrams PDF, and Ready-to-Run Flight Code Templates</strong>.</p>
        </details>
        <details class="wb-faq-item" open>
          <summary>Do I need to own a FLYQ drone kit to attend this webinar? <span>+</span></summary>
          <p>No! You do not need a physical drone kit to attend. We demonstrate real FLYQ Air and FLYQ Vision hardware live on camera and run all coding exercises inside the 3D Flight Studio simulator so beginners can follow every step.</p>
        </details>
        <details class="wb-faq-item">
          <summary>How do I pay for my ₹99 or ₹499 pass? <span>+</span></summary>
          <p>You can pay directly online using our <strong>Direct Payment Link</strong> (supports all UPI apps like GPay, PhonePe, Paytm, plus Cards &amp; NetBanking via PayU) or click the WhatsApp UPI link to scan &amp; pay directly with instant confirmation.</p>
        </details>
        <details class="wb-faq-item">
          <summary>When will I receive the recording and notes if I choose the ₹499 bundle? <span>+</span></summary>
          <p>Your 85-page Drone Engineering Notes &amp; Code Pack and the full 3-hour HD session recording link are shared directly to your registered Email and WhatsApp right after the Monday live session concludes.</p>
        </details>
        <details class="wb-faq-item">
          <summary>Will I really receive a Free Verified Certificate? <span>+</span></summary>
          <p>Yes! Every registered participant who attends the Monday 6:00 PM – 9:00 PM live bootcamp receives an official, verifiable <strong>FLYQ Drones × Passion 3D World Certificate of Completion</strong> at zero additional cost.</p>
        </details>
        <details class="wb-faq-item">
          <summary>Is any prior coding or electronics experience required? <span>+</span></summary>
          <p>None at all. We start from first principles—explaining how quadcopters fly and how visual Blockly blocks work—before demonstrating Python/JavaScript flight commands and ESP32-S3 telemetry.</p>
        </details>
      </div>
    </div>
  </section>

  <!-- Sticky Bottom Bar -->
  <div class="wb-sticky-dock" role="region" aria-label="Quick registration bar">
    <div class="wb-wrap wb-sticky-inner">
      <div>
        <strong style="font-family:Manrope,sans-serif;font-size:15px">Monday Live Drone Bootcamp (6:00 PM – 9:00 PM IST)</strong>
        <span style="font-size:13px;color:#cbd5e1;margin-left:10px">Free Certificate · <strong style="color:#4ade80">₹99 Live Pass</strong> or <strong style="color:#fde047">₹499 with Notes &amp; Recordings</strong></span>
      </div>
      <div style="display:flex;gap:10px;align-items:center">
        <a class="wb-btn-primary" href="#register" data-select-plan="live_99" style="padding:10px 18px;font-size:13.5px;border-radius:9px">Join for ₹99 →</a>
        <a class="wb-btn-primary" href="#register" data-select-plan="bundle_499" style="padding:10px 18px;font-size:13.5px;border-radius:9px;background:#16a34a">₹499 (+Notes &amp; Recording) ★</a>
      </div>
    </div>
  </div>
</div>
<script src="${WEBINAR_JS_PATH}" defer></script>`;
}

export const webinarScript = `(() => {
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));

  let currentPlan = 'live_99';
  let currentAmount = 99;
  let lastSavedPayload = null;

  // 1. Compute upcoming Monday 6:00 PM - 9:00 PM IST
  function getNextMondayIST() {
    const now = new Date();
    const utcMs = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istNow = new Date(utcMs + (5.5 * 3600000));
    const day = istNow.getDay();
    let daysUntilMonday = (1 - day + 7) % 7;
    if (daysUntilMonday === 0 && istNow.getHours() >= 21) {
      daysUntilMonday = 7;
    }
    const targetIST = new Date(istNow);
    targetIST.setDate(istNow.getDate() + daysUntilMonday);
    targetIST.setHours(18, 0, 0, 0);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const formattedDate = 'Monday, ' + targetIST.getDate() + ' ' + months[targetIST.getMonth()] + ' ' + targetIST.getFullYear() + ' · 6:00 PM – 9:00 PM IST';
    return { targetIST, daysUntilMonday, formattedDate, diffMs: Math.max(0, targetIST.getTime() - istNow.getTime()) };
  }

  function updateClock() {
    const info = getNextMondayIST();
    const labelEl = $('#wb-next-monday-label');
    const batchEl = $('#wb-form-batch-display');
    const sessionInput = $('#wb-session-date-input');
    const certDate = $('#cert-date-preview');
    if (labelEl) labelEl.textContent = info.formattedDate;
    if (batchEl) batchEl.textContent = 'Batch: ' + info.formattedDate;
    if (sessionInput) sessionInput.value = info.formattedDate;
    if (certDate) certDate.textContent = info.formattedDate;

    const totalSec = Math.floor(info.diffMs / 1000);
    const d = Math.floor(totalSec / 86400);
    const h = Math.floor((totalSec % 86400) / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    const pad = n => String(n).padStart(2, '0');
    if ($('#wb-cd-days')) $('#wb-cd-days').textContent = pad(d);
    if ($('#wb-cd-hours')) $('#wb-cd-hours').textContent = pad(h);
    if ($('#wb-cd-mins')) $('#wb-cd-mins').textContent = pad(m);
    if ($('#wb-cd-secs')) {
      $('#wb-cd-secs').textContent = pad(s);
      const secCard = $('#wb-sec-card');
      if (secCard) {
        secCard.classList.remove('tick-anim');
        void secCard.offsetWidth;
        secCard.classList.add('tick-anim');
      }
    }
  }
  updateClock();
  setInterval(updateClock, 1000);

  // 1B. 5-Second Attractive Mission Launch Countdown Animation
  const TELEMETRY_STEPS = {
    5: {
      status: '● T-05s · INITIALIZING ESP32-S3 FLIGHT CONTROLLER...',
      headline: '5 Seconds to Takeoff: Pre-Flight Hardware Check'
    },
    4: {
      status: '● T-04s · CALIBRATING 6-AXIS IMU & GYROSCOPE...',
      headline: '4 Seconds: Sensor Fusion & PID Loop Locked'
    },
    3: {
      status: '● T-03s · LINKING 3D FLIGHT STUDIO SIMULATOR...',
      headline: '3 Seconds: Autonomous Mission Code Ready'
    },
    2: {
      status: '● T-02s · ARMING QUAD-ROTOR PROPULSION...',
      headline: '2 Seconds: AI Camera Vision Stream Active'
    },
    1: {
      status: '● T-01s · UNLOCKING FREE VERIFIED CERTIFICATE...',
      headline: '1 Second: Final Seat & Pass Verification'
    },
    0: {
      status: '★ CLEARED FOR TAKEOFF · LIVE BATCH OPEN NOW',
      headline: 'We Are Ready! Join This Monday (6:00 PM – 9:00 PM IST)'
    }
  };

  let launchTimer = null;
  function runFiveSecondLaunch() {
    if (launchTimer) clearInterval(launchTimer);
    let sec = 5;
    const digitEl = $('#wb-5s-digit');
    const ringEl = $('#wb-5s-ring');
    const shockEl = $('#wb-5s-shock');
    const statusEl = $('#wb-5s-status');
    const headEl = $('#wb-5s-headline');
    const circumference = 289;

    // Full-screen starting intro overlay elements
    const overlayEl = $('#wb-intro-overlay');
    const introNumEl = $('#wb-intro-num');
    const introLabelEl = $('#wb-intro-num-label');
    const introRingEl = $('#wb-intro-ring');
    const introShockEl = $('#wb-intro-shock');
    const introKickerEl = $('#wb-intro-kicker');
    const introHeadEl = $('#wb-intro-heading');
    const introBarEl = $('#wb-intro-bar');
    const introChecks = $$('[data-intro-step]');
    const introCircumference = 666;

    if (overlayEl) {
      overlayEl.classList.remove('is-hidden');
    }

    function renderStep(n) {
      if (digitEl) {
        digitEl.classList.remove('pop');
        void digitEl.offsetWidth;
        digitEl.textContent = n > 0 ? '0' + n : '🚀';
        digitEl.classList.add('pop');
      }
      if (shockEl) {
        shockEl.classList.remove('burst');
        void shockEl.offsetWidth;
        shockEl.classList.add('burst');
      }
      if (ringEl) {
        const offset = n > 0 ? circumference * ((5 - n) / 5) : 0;
        ringEl.style.strokeDashoffset = String(offset);
      }
      const step = TELEMETRY_STEPS[n] || TELEMETRY_STEPS[0];
      if (statusEl) statusEl.textContent = step.status;
      if (headEl) headEl.textContent = step.headline;

      // Update full-screen starting animation overlay
      if (introNumEl) {
        introNumEl.classList.remove('pop');
        void introNumEl.offsetWidth;
        introNumEl.textContent = n > 0 ? '0' + n : '🚀';
        introNumEl.classList.add('pop');
      }
      if (introLabelEl) {
        introLabelEl.textContent = n > 0 ? 'SECONDS TO LAUNCH' : 'CLEARED FOR TAKEOFF!';
      }
      if (introShockEl) {
        introShockEl.classList.remove('burst');
        void introShockEl.offsetWidth;
        introShockEl.classList.add('burst');
      }
      if (introRingEl) {
        const iOffset = n > 0 ? introCircumference * (n / 5) : 0;
        introRingEl.style.strokeDashoffset = String(iOffset);
      }
      if (introBarEl) {
        const pct = Math.min(100, Math.round(((5 - n) / 5) * 100));
        introBarEl.style.width = pct + '%';
      }
      if (introKickerEl) introKickerEl.textContent = step.status;
      if (introHeadEl) introHeadEl.textContent = step.headline;
      introChecks.forEach(ch => {
        const st = Number(ch.getAttribute('data-intro-step'));
        if (st >= n) ch.classList.add('done');
        else ch.classList.remove('done');
      });
    }

    renderStep(5);
    launchTimer = setInterval(() => {
      sec -= 1;
      if (sec >= 0) {
        renderStep(sec);
      }
      if (sec <= 0) {
        clearInterval(launchTimer);
        launchTimer = null;
        setTimeout(() => {
          if (overlayEl) overlayEl.classList.add('is-hidden');
        }, 550);
      }
    }, 1000);
  }

  runFiveSecondLaunch();
  const replayBtn = $('#wb-replay-5s-btn');
  if (replayBtn) {
    replayBtn.addEventListener('click', () => runFiveSecondLaunch());
  }
  const topReplayBtn = $('#wb-top-replay-intro-btn');
  if (topReplayBtn) {
    topReplayBtn.addEventListener('click', () => runFiveSecondLaunch());
  }
  const skipIntroBtn = $('#wb-intro-skip-btn');
  if (skipIntroBtn) {
    skipIntroBtn.addEventListener('click', () => {
      if (launchTimer) {
        clearInterval(launchTimer);
        launchTimer = null;
      }
      const overlayEl = $('#wb-intro-overlay');
      if (overlayEl) overlayEl.classList.add('is-hidden');
    });
  }

  // 2. Plan Selector Synchronization (₹99 vs ₹499 Notes + Recordings)
  function selectPlan(plan) {
    currentPlan = plan === 'bundle_499' ? 'bundle_499' : 'live_99';
    currentAmount = currentPlan === 'bundle_499' ? 499 : 99;
    const amountInput = $('#wb-amount-input');
    if (amountInput) amountInput.value = String(currentAmount);

    const r99 = $('#wb-radio-card-99');
    const r499 = $('#wb-radio-card-499');
    if (r99 && r499) {
      const i99 = r99.querySelector('input');
      const i499 = r499.querySelector('input');
      if (currentPlan === 'bundle_499') {
        r499.classList.add('active');
        r99.classList.remove('active');
        if (i499) i499.checked = true;
      } else {
        r99.classList.add('active');
        r499.classList.remove('active');
        if (i99) i99.checked = true;
      }
    }

    const badge = $('#wb-selected-badge');
    if (badge) {
      badge.textContent = currentAmount === 499
        ? 'Selected: ₹499 Bundle (Notes + Recording)'
        : 'Selected: ₹99 Live Pass';
    }
    const submitBtn = $('#wb-submit-btn');
    if (submitBtn && !submitBtn.disabled) {
      submitBtn.textContent = currentAmount === 499
        ? 'Reserve Seat & Proceed to ₹499 Bundle Payment →'
        : 'Reserve Seat & Proceed to ₹99 Payment →';
    }
  }

  $$('input[name="plan_type"]').forEach(radio => {
    radio.addEventListener('change', e => selectPlan(e.target.value));
  });

  $$('[data-select-plan]').forEach(btn => {
    btn.addEventListener('click', () => {
      selectPlan(btn.getAttribute('data-select-plan'));
    });
  });

  // 3. Direct Online Payment Gateway Initiator (/api/payment/initiate -> PayU)
  async function startOnlinePayment(amount, userDetails) {
    const productTitle = amount === 499
      ? 'FLYQ 3-Hour Live Drone Bootcamp + HD Recordings & Engineering Notes Bundle'
      : 'FLYQ 3-Hour Live Drone Bootcamp + Free Certificate Pass';

    const name = (userDetails && userDetails.name) || ($('#wb-name') && $('#wb-name').value.trim()) || '';
    const email = (userDetails && userDetails.email) || ($('#wb-email') && $('#wb-email').value.trim()) || '';
    const phone = (userDetails && userDetails.phone) || ($('#wb-phone') && $('#wb-phone').value.trim()) || '';
    const city = (userDetails && userDetails.city) || ($('#wb-city') && $('#wb-city').value.trim()) || 'Mumbai';

    if (!name || !email || !phone) {
      selectPlan(amount === 499 ? 'bundle_499' : 'live_99');
      const regSection = $('#register');
      if (regSection) regSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const statusEl = $('#wb-form-status');
      if (statusEl) {
        statusEl.style.color = '#1d4ed8';
        statusEl.textContent = 'Please enter your Name, Email & WhatsApp number below to launch the ₹' + amount + ' online payment link.';
      }
      if ($('#wb-name') && !name) $('#wb-name').focus();
      return;
    }

    const gwBtn = $('#wb-gateway-pay-btn');
    const origLabel = gwBtn ? gwBtn.textContent : '';
    if (gwBtn) {
      gwBtn.disabled = true;
      gwBtn.textContent = 'Opening Secure ₹' + amount + ' Payment Gateway...';
    }

    try {
      const resp = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          address: city + ', India',
          cart: [{ name: productTitle, price: amount, quantity: 1 }]
        })
      });
      const data = await resp.json().catch(() => ({}));
      if (data && data.success && data.paymentData && data.paymentData.url) {
        const pd = data.paymentData;
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = pd.url;
        Object.keys(pd).forEach(k => {
          if (k === 'url') return;
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = k;
          input.value = pd[k];
          form.appendChild(input);
        });
        document.body.appendChild(form);
        form.submit();
        return;
      }
    } catch (e) {
      console.warn('Gateway fallback to WhatsApp:', e);
    }

    if (gwBtn) {
      gwBtn.disabled = false;
      gwBtn.textContent = origLabel;
    }
    const waFallback = $('#wb-whatsapp-pay-link');
    if (waFallback && waFallback.href) {
      window.open(waFallback.href, '_blank', 'noopener');
    }
  }

  $$('[data-quick-pay], [data-direct-checkout]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const amt = Number(btn.getAttribute('data-quick-pay') || btn.getAttribute('data-direct-checkout')) === 499 ? 499 : 99;
      selectPlan(amt === 499 ? 'bundle_499' : 'live_99');
      startOnlinePayment(amt, lastSavedPayload);
    });
  });

  const gwPayBtn = $('#wb-gateway-pay-btn');
  if (gwPayBtn) {
    gwPayBtn.addEventListener('click', () => {
      startOnlinePayment(currentAmount, lastSavedPayload);
    });
  }

  // 4. Interactive Certificate Name Preview
  const certInput = $('#cert-preview-input');
  const regNameInput = $('#wb-name');
  const certNameDisplay = $('#cert-recipient-name');
  function syncCertName(val) {
    if (!certNameDisplay) return;
    const clean = (val || '').trim();
    certNameDisplay.textContent = clean ? clean : 'Your Full Name Here';
  }
  if (certInput) {
    certInput.addEventListener('input', e => syncCertName(e.target.value));
  }
  if (regNameInput) {
    regNameInput.addEventListener('input', e => {
      if (!certInput || !certInput.value) syncCertName(e.target.value);
    });
  }

  // 5. Step 1: Webinar Registration Form Submission
  const regForm = $('#webinar-register-form');
  if (regForm) {
    regForm.addEventListener('submit', async e => {
      e.preventDefault();
      const statusEl = $('#wb-form-status');
      const submitBtn = $('#wb-submit-btn');
      statusEl.style.color = '#dc2626';
      statusEl.textContent = '';

      const fd = new FormData(regForm);
      const chosenPlan = fd.get('plan_type') === 'bundle_499' ? 'bundle_499' : 'live_99';
      const chosenAmount = chosenPlan === 'bundle_499' ? 499 : 99;
      currentPlan = chosenPlan;
      currentAmount = chosenAmount;

      const payload = {
        name: String(fd.get('name') || '').trim(),
        email: String(fd.get('email') || '').trim(),
        phone: String(fd.get('phone') || '').trim(),
        profile: String(fd.get('profile') || '').trim(),
        city: String(fd.get('city') || '').trim(),
        institution: String(fd.get('institution') || '').trim(),
        question: String(fd.get('question') || '').trim(),
        session_date: String(fd.get('session_date') || 'Monday · 6:00 PM – 9:00 PM IST').trim(),
        plan_type: chosenPlan,
        amount_inr: chosenAmount,
        website: String(fd.get('website') || '').trim(),
        consent: fd.get('consent') === 'on' || fd.get('consent') === 'true' || Boolean(fd.get('consent'))
      };

      if (!payload.name || !payload.email || !payload.phone || !payload.city || !payload.profile) {
        statusEl.textContent = 'Please complete all required fields (*).';
        return;
      }

      submitBtn.disabled = true;
      const origText = submitBtn.textContent;
      submitBtn.textContent = 'Reserving your seat...';

      const prefix = chosenAmount === 499 ? 'FLYQ-W499-' : 'FLYQ-W99-';
      let regCode = prefix + Math.random().toString(36).substring(2, 6).toUpperCase();
      let regId = '';

      try {
        const res = await fetch('/api/workshops/webinar/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok && data.error) {
          statusEl.textContent = data.error;
          submitBtn.disabled = false;
          submitBtn.textContent = origText;
          return;
        }
        if (data.reg_code) regCode = data.reg_code;
        if (data.id) regId = data.id;
      } catch (err) {
        console.warn('Registration fallback:', err);
      }

      lastSavedPayload = payload;
      syncCertName(payload.name);
      $('#wb-reg-code-display').textContent = regCode;
      $('#wb-confirm-name').textContent = payload.name + ' (' + payload.email + ')';
      $('#wb-confirm-session').textContent = payload.session_date;
      if ($('#wb-confirm-plan')) {
        $('#wb-confirm-plan').textContent = chosenAmount === 499
          ? '₹499 Bundle (Live Bootcamp + Free Certificate + HD Recordings + 85-Page Engineering Notes)'
          : '₹99 Live Pass (Live Bootcamp + Free Certificate)';
      }
      if ($('#wb-step2-amount-badge')) {
        $('#wb-step2-amount-badge').textContent = 'Amount Due: ₹' + chosenAmount;
      }
      if ($('#wb-step2-heading')) {
        $('#wb-step2-heading').textContent = 'Complete Your ₹' + chosenAmount + ' Pass Payment';
      }
      if ($('#wb-gateway-pay-btn')) {
        $('#wb-gateway-pay-btn').textContent = '💳 Pay ₹' + chosenAmount + ' Online Now (UPI / GPay / PhonePe / Card) →';
      }
      if ($('#wb-utr-reg-id')) $('#wb-utr-reg-id').value = regId;
      if ($('#wb-utr-reg-code')) $('#wb-utr-reg-code').value = regCode;

      const planLabel = chosenAmount === 499
        ? '₹499 Bundle (Live Bootcamp + Free Certificate + Lifetime Recordings + Complete Engineering Notes)'
        : '₹99 Live Pass (3-Hour Live Bootcamp + Free Certificate)';

      const waText = [
        'Hello FLYQ Drones! 👋',
        'I have registered for the *3-Hour Live Drone Bootcamp Webinar*.',
        '',
        '• *Registration ID:* ' + regCode,
        '• *Selected Plan:* ' + planLabel,
        '• *Amount:* ₹' + chosenAmount,
        '• *Name (for Certificate):* ' + payload.name,
        '• *Email:* ' + payload.email,
        '• *Phone:* ' + payload.phone,
        '• *City:* ' + payload.city,
        '• *Batch:* ' + payload.session_date,
        '',
        'Please share the ₹' + chosenAmount + ' UPI QR / payment link to confirm my pass and send the live joining link!'
      ].join('\\n');

      const waLink = 'https://wa.me/919137361474?text=' + encodeURIComponent(waText);
      const waBtn = $('#wb-whatsapp-pay-link');
      if (waBtn) {
        waBtn.href = waLink;
        waBtn.textContent = '💬 Or Pay ₹' + chosenAmount + ' via WhatsApp UPI QR & Get Joining Link ↗';
      }

      $('#wb-step1-container').hidden = true;
      $('#wb-step2-container').hidden = false;
      $('#wb-step2-container').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  // 6. Step 2: Optional UPI UTR Submission
  const utrForm = $('#webinar-utr-form');
  if (utrForm) {
    utrForm.addEventListener('submit', async e => {
      e.preventDefault();
      const statusEl = $('#wb-utr-status');
      const utr = String($('#wb-utr-input')?.value || '').trim();
      const id = String($('#wb-utr-reg-id')?.value || '').trim();
      const reg_code = String($('#wb-utr-reg-code')?.value || '').trim();
      if (!utr || utr.length < 6) {
        statusEl.style.color = '#dc2626';
        statusEl.textContent = 'Please enter a valid UPI Reference / UTR number.';
        return;
      }
      statusEl.style.color = '#15803d';
      statusEl.textContent = 'Saving your payment reference...';
      try {
        const r = await fetch('/api/workshops/webinar/payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, reg_code, utr_number: utr })
        });
        const d = await r.json().catch(() => ({}));
        if (!r.ok) {
          statusEl.style.color = '#dc2626';
          statusEl.textContent = d.error || 'Could not save UTR. Please share it on WhatsApp above.';
          return;
        }
        statusEl.style.color = '#15803d';
        statusEl.textContent = '✓ Payment reference (' + utr + ') saved! Our team will verify and send your joining link.';
      } catch {
        statusEl.style.color = '#15803d';
        statusEl.textContent = '✓ Reference noted! Please also click the green WhatsApp button above for instant confirmation.';
      }
    });
  }
})();`;
