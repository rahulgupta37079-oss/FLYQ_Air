// High-Conversion FLYQ ₹99 3-Hour Live Drone Webinar Page & Site-Wide Components

export const WEBINAR_PATH = '/webinar';
export const WEBINAR_JS_PATH = '/flyq-design/webinar/webinar.js';
export const KIT_GUIDE_PDF_PATH = '/brochures/FLYQ-Drone-Kit-Guide.pdf';

export function applyWebinarNav(html, activePath = '') {
  if (!html || typeof html !== 'string') return html;
  let out = html;
  // Inject Webinar link into .main-nav if not already present
  if (!out.includes('href="/webinar"')) {
    const isActive = activePath === '/webinar';
    const navLink = `<a href="/webinar"${isActive ? ' class="active" aria-current="page"' : ''} style="display:inline-flex;align-items:center;gap:6px">Webinar <span style="background:${isActive ? '#225cec' : '#eef4ff'};color:${isActive ? '#fff' : '#225cec'};font-size:10px;font-weight:800;padding:2px 7px;border-radius:99px;letter-spacing:.04em;line-height:1.4">₹99 LIVE</span></a>`;
    // Insert right after Workshops link in main-nav
    if (out.includes('<a href="/summer-camp"')) {
      out = out.replace(
        /(<a href="\/summer-camp"[^>]*>Workshops<\/a>)/,
        `$1${navLink}`
      );
    } else if (out.includes('</nav>')) {
      out = out.replace('</nav>', `${navLink}</nav>`);
    }
    // Also add to footer EXPLORE section
    out = out.replace(
      /(<a href="\/summer-camp">Workshops & camps<\/a>)/,
      `$1<a href="/webinar">₹99 Live Drone Webinar</a>`
    );
  }
  return out;
}

export function webinarHomepageBanner() {
  return `<section aria-label="Live Drone Bootcamp Webinar" style="background:linear-gradient(135deg,#081121 0%,#0f2347 55%,#163b7a 100%);color:#fff;padding:22px 0;border-bottom:1px solid rgba(255,255,255,.12)">
  <div class="wrap" style="display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap">
    <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
      <span style="display:inline-flex;align-items:center;gap:8px;background:rgba(34,92,236,.35);border:1px solid rgba(135,184,255,.45);color:#9ec5ff;padding:6px 13px;border-radius:99px;font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase">
        <span style="width:8px;height:8px;border-radius:50%;background:#4ade80;box-shadow:0 0 10px #4ade80"></span>
        LIVE MONDAY · 6:00 PM – 9:00 PM IST
      </span>
      <div>
        <strong style="font-size:clamp(16px,2vw,20px);font-family:Manrope,Arial,sans-serif;letter-spacing:-.02em;display:block">Build, Code &amp; Fly Your First Programmable Drone — 3-Hour Live Bootcamp</strong>
        <span style="color:#c5d6f0;font-size:13.5px">Hands-on ESP32-S3 hardware, 3D simulator coding &amp; AI camera vision · <strong style="color:#4ade80">Only ₹99</strong> <s style="color:#8da4c8">₹999</s> + <strong style="color:#fff">Free Verified Certificate</strong></span>
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
      <a class="button" href="/webinar#register" style="background:#225cec;color:#fff;font-weight:700;padding:11px 20px;min-height:42px;border-radius:8px;box-shadow:0 8px 24px rgba(34,92,236,.4)">Register for ₹99 <span aria-hidden="true">↗</span></a>
      <a href="/webinar" style="color:#d6e4ff;font-size:13px;font-weight:600;text-decoration:underline;text-underline-offset:4px">View 3-hour syllabus →</a>
    </div>
  </div>
</section>`;
}

export function webinarContent() {
  return `<style>
.wb{background:#fff;color:#151923;font-family:'DM Sans',Arial,sans-serif}
.wb *{box-sizing:border-box}
.wb-wrap{width:min(1260px,calc(100% - 48px));margin:0 auto}
.wb-hero{background:radial-gradient(circle at 82% 18%,rgba(34,92,236,.28),transparent 42%),linear-gradient(160deg,#070d19 0%,#0c172c 55%,#111f3a 100%);color:#fff;padding:48px 0 68px;position:relative;overflow:hidden}
.wb-urgency{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.13);border-radius:14px;padding:12px 20px;margin-bottom:32px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
.wb-urgency-left{display:flex;align-items:center;gap:12px;flex-wrap:wrap;font-size:13px;color:#dbe7ff}
.wb-live-pill{display:inline-flex;align-items:center;gap:7px;background:#10b98126;border:1px solid #10b98166;color:#6ee7b7;font-size:11px;font-weight:800;padding:4px 11px;border-radius:99px;letter-spacing:.1em;text-transform:uppercase}
.wb-live-dot{width:7px;height:7px;border-radius:50%;background:#34d399;box-shadow:0 0 8px #34d399}
.wb-timer{display:flex;align-items:center;gap:8px}
.wb-timer-box{background:rgba(8,15,28,.75);border:1px solid rgba(135,184,255,.28);border-radius:8px;padding:5px 10px;min-width:52px;text-align:center}
.wb-timer-box strong{display:block;font:800 16px/1.1 Manrope,sans-serif;color:#fff}
.wb-timer-box small{font-size:9px;text-transform:uppercase;letter-spacing:.08em;color:#9bb4d8}
.wb-hero-grid{display:grid;grid-template-columns:1.12fr .88fr;gap:42px;align-items:start}
.wb-kicker{display:inline-flex;align-items:center;gap:10px;color:#7cb2ff;font-size:12px;font-weight:800;letter-spacing:.15em;text-transform:uppercase;margin-bottom:18px}
.wb-hero h1{font-family:Manrope,Arial,sans-serif;font-size:clamp(36px,4.8vw,64px);line-height:1.05;letter-spacing:-.045em;margin:0 0 20px;color:#fff;font-weight:800}
.wb-hero h1 em{font-style:normal;background:linear-gradient(90deg,#60a5fa,#93c5fd);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.wb-lead{font-size:clamp(16px,1.4vw,19px);line-height:1.68;color:#c3d3ec;margin:0 0 26px;max-width:620px}
.wb-badges{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-bottom:28px}
.wb-badge-card{background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:13px 16px;display:flex;align-items:flex-start;gap:12px}
.wb-badge-icon{width:34px;height:34px;border-radius:9px;background:rgba(34,92,236,.32);border:1px solid rgba(135,184,255,.35);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;color:#93c5fd}
.wb-badge-card strong{display:block;font-size:14px;color:#fff;font-family:Manrope,sans-serif;margin-bottom:2px}
.wb-badge-card span{font-size:12px;color:#a5b9d8;line-height:1.4}
.wb-cta-row{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-bottom:20px}
.wb-btn-primary{display:inline-flex;align-items:center;justify-content:center;gap:12px;background:linear-gradient(135deg,#225cec,#1646c4);color:#fff!important;font-family:Manrope,sans-serif;font-weight:800;font-size:16px;padding:16px 28px;border-radius:11px;border:1px solid rgba(147,197,253,.35);box-shadow:0 12px 30px rgba(34,92,236,.45);cursor:pointer;text-decoration:none!important;transition:transform .2s,box-shadow .2s}
.wb-btn-primary:hover{transform:translateY(-2px);box-shadow:0 16px 36px rgba(34,92,236,.6)}
.wb-btn-secondary{display:inline-flex;align-items:center;justify-content:center;gap:10px;background:rgba(255,255,255,.08);color:#fff!important;font-weight:600;font-size:14px;padding:15px 22px;border-radius:11px;border:1px solid rgba(255,255,255,.18);text-decoration:none!important;transition:background .2s}
.wb-btn-secondary:hover{background:rgba(255,255,255,.14)}
.wb-trust-note{font-size:12.5px;color:#9bb0cf;display:flex;align-items:center;gap:16px;flex-wrap:wrap}
.wb-hero-card{background:#101a2e;border:1px solid rgba(147,197,253,.24);border-radius:22px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,.45)}
.wb-video-wrap{position:relative;background:#050911;aspect-ratio:16/9}
.wb-video-wrap video{width:100%;height:100%;object-fit:cover;display:block}
.wb-video-tag{position:absolute;top:14px;left:14px;background:rgba(8,15,28,.84);border:1px solid rgba(255,255,255,.2);color:#fff;font-size:11px;font-weight:700;padding:5px 11px;border-radius:99px;letter-spacing:.06em;pointer-events:none}
.wb-card-body{padding:24px}
.wb-price-row{display:flex;align-items:baseline;justify-content:space-between;gap:12px;padding-bottom:18px;border-bottom:1px solid rgba(255,255,255,.1);margin-bottom:18px;flex-wrap:wrap}
.wb-price-main{display:flex;align-items:baseline;gap:10px}
.wb-price-now{font:800 42px/1 Manrope,sans-serif;color:#4ade80;letter-spacing:-.04em}
.wb-price-was{font-size:18px;color:#7f95b8;text-decoration:line-through}
.wb-discount-pill{background:#10b98126;color:#6ee7b7;border:1px solid #10b98155;font-size:11px;font-weight:800;padding:4px 10px;border-radius:99px;letter-spacing:.06em}
.wb-checklist{list-style:none;padding:0;margin:0 0 20px;display:grid;gap:10px;font-size:13.5px;color:#d6e3f8}
.wb-checklist li{display:flex;align-items:flex-start;gap:10px}
.wb-checklist li i{color:#4ade80;font-style:normal;font-weight:800}
.wb-seat-meter{background:rgba(255,255,255,.05);border-radius:10px;padding:11px 14px;margin-bottom:18px}
.wb-seat-bar{height:7px;background:rgba(255,255,255,.12);border-radius:99px;overflow:hidden;margin-bottom:7px}
.wb-seat-fill{height:100%;width:82%;background:linear-gradient(90deg,#3b82f6,#10b981);border-radius:99px}
.wb-seat-text{display:flex;justify-content:space-between;font-size:11.5px;color:#b2c5e3}
.wb-ribbon{background:#edf3ff;border-bottom:1px solid #dce5f5;padding:16px 0}
.wb-ribbon-inner{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;font-size:12.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#1e3a8a}
.wb-section{padding:72px 0}
.wb-section.grey{background:#f5f7fb;border-top:1px solid #e3e8f2;border-bottom:1px solid #e3e8f2}
.wb-section.dark{background:#0b1323;color:#fff}
.wb-heading{display:flex;justify-content:space-between;align-items:flex-end;gap:28px;margin-bottom:42px;flex-wrap:wrap}
.wb-eyebrow{font-size:11.5px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#225cec;margin:0 0 12px;display:flex;align-items:center;gap:10px}
.wb-section.dark .wb-eyebrow{color:#7cb2ff}
.wb-eyebrow:before{content:'';width:24px;height:2px;background:currentColor}
.wb-heading h2{font-family:Manrope,sans-serif;font-size:clamp(30px,3.8vw,48px);line-height:1.08;letter-spacing:-.04em;margin:0;font-weight:800}
.wb-heading p{max-width:460px;color:#5b677a;font-size:15.5px;line-height:1.65;margin:0}
.wb-section.dark .wb-heading p{color:#a9bddc}
.wb-hours{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}
.wb-hour-card{background:#fff;border:1px solid #dfe5f0;border-radius:20px;padding:28px;display:flex;flex-direction:column;box-shadow:0 8px 26px rgba(16,23,36,.04)}
.wb-hour-top{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:16px}
.wb-hour-pill{background:#eef4ff;color:#1d4ed8;font-size:11.5px;font-weight:800;padding:5px 12px;border-radius:99px;letter-spacing:.08em;text-transform:uppercase}
.wb-hour-time{font-size:12.5px;font-weight:700;color:#526075}
.wb-hour-card h3{font-family:Manrope,sans-serif;font-size:22px;line-height:1.22;letter-spacing:-.025em;margin:0 0 12px}
.wb-hour-card p{color:#526075;font-size:14.5px;line-height:1.65;margin:0 0 18px}
.wb-hour-list{margin:0;padding:0;list-style:none;display:grid;gap:10px;border-top:1px solid #e8edf5;padding-top:16px;margin-top:auto}
.wb-hour-list li{font-size:13.5px;color:#1e293b;display:flex;align-items:flex-start;gap:9px;line-height:1.45}
.wb-hour-list li span{color:#225cec;font-weight:800}
.wb-cert-grid{display:grid;grid-template-columns:1fr 1.15fr;gap:40px;align-items:center}
.wb-cert-preview{background:linear-gradient(145deg,#ffffff 0%,#f7faff 100%);border:2px solid #c7d9fe;border-radius:22px;padding:18px;box-shadow:0 24px 60px rgba(15,23,42,.18);color:#0f172a;position:relative}
.wb-cert-inner{border:2px solid #1e3a8a;border-radius:14px;padding:28px 26px;background:radial-gradient(circle at top right,rgba(34,92,236,.07),transparent 50%),#fff;position:relative}
.wb-cert-top{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;border-bottom:1px solid #dbe4f3;padding-bottom:16px;margin-bottom:20px}
.wb-cert-brand{font-family:Manrope,sans-serif;font-weight:800;font-size:24px;letter-spacing:-.04em;color:#0f172a}
.wb-cert-brand span{color:#225cec}
.wb-cert-badge{background:#fef3c7;border:1px solid #f59e0b;color:#92400e;font-size:10px;font-weight:800;padding:4px 10px;border-radius:99px;letter-spacing:.1em;text-transform:uppercase}
.wb-cert-kicker{font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;color:#225cec;font-weight:800;margin-bottom:6px}
.wb-cert-title{font-family:Manrope,sans-serif;font-size:clamp(22px,2.5vw,30px);font-weight:800;letter-spacing:-.03em;color:#0f172a;margin:0 0 10px}
.wb-cert-sub{font-size:12.5px;color:#64748b;margin:0 0 8px}
.wb-cert-name{font-family:Manrope,sans-serif;font-size:clamp(22px,2.6vw,32px);font-weight:800;color:#1d4ed8;border-bottom:2px dashed #93c5fd;padding-bottom:6px;margin:0 0 14px;min-height:42px;word-break:break-word}
.wb-cert-desc{font-size:13px;line-height:1.55;color:#334155;margin:0 0 20px}
.wb-cert-footer{display:flex;justify-content:space-between;align-items:flex-end;gap:12px;border-top:1px solid #e2e8f0;padding-top:14px;font-size:11.5px;color:#475569;flex-wrap:wrap}
.wb-cert-sign strong{display:block;color:#0f172a;font-size:13px;font-family:Manrope,sans-serif}
.wb-cert-input-box{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.16);border-radius:14px;padding:18px;margin-top:22px}
.wb-cert-input-box label{display:block;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#93c5fd;margin-bottom:8px}
.wb-cert-input-box input{width:100%;padding:12px 15px;border-radius:9px;border:1px solid rgba(147,197,253,.4);background:#070e1b;color:#fff;font-size:15px}
.wb-personas{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px}
.wb-persona{background:#fff;border:1px solid #e1e6f0;border-radius:18px;padding:24px}
.wb-persona-num{font:800 12px Manrope,sans-serif;color:#225cec;letter-spacing:.12em;display:block;margin-bottom:10px}
.wb-persona h3{font-size:19px;margin:0 0 10px}
.wb-persona p{font-size:14px;color:#526075;line-height:1.6;margin:0}
.wb-value-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:36px;align-items:center}
.wb-stack-list{display:grid;gap:14px}
.wb-stack-item{background:#fff;border:1px solid #dfe5f0;border-radius:14px;padding:18px 20px;display:flex;justify-content:space-between;align-items:center;gap:16px}
.wb-stack-item strong{display:block;font-size:16px;font-family:Manrope,sans-serif;margin-bottom:3px}
.wb-stack-item span{font-size:13px;color:#5b677a}
.wb-stack-val{background:#eef4ff;color:#1d4ed8;font-weight:800;font-size:13px;padding:6px 12px;border-radius:99px;white-space:nowrap}
.wb-reg-grid{display:grid;grid-template-columns:.92fr 1.08fr;gap:42px;align-items:start}
.wb-reg-card{background:#fff;color:#151923;border-radius:22px;padding:34px;border:1px solid #dce4f0;box-shadow:0 24px 64px rgba(0,0,0,.28)}
.wb-reg-card h3{font-family:Manrope,sans-serif;font-size:26px;margin:0 0 6px;letter-spacing:-.03em}
.wb-form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.wb-field{margin-bottom:15px}
.wb-field label{display:block;font-size:12.5px;font-weight:700;color:#334155;margin-bottom:6px}
.wb-field input,.wb-field select,.wb-field textarea{width:100%;padding:12px 14px;border:1px solid #cbd5e1;border-radius:9px;font-size:14.5px;background:#f8fafc;color:#0f172a}
.wb-field input:focus,.wb-field select:focus,.wb-field textarea:focus{background:#fff;border-color:#225cec;outline:2px solid #93c5fd}
.wb-consent{display:flex;align-items:flex-start;gap:10px;font-size:12.5px;color:#475569;margin:14px 0 20px;line-height:1.5}
.wb-consent input{margin-top:3px;width:16px;height:16px;flex-shrink:0}
.wb-step2{background:#f0fdf4;border:2px solid #22c55e;border-radius:18px;padding:24px;margin-top:16px}
.wb-step2-code{background:#0f172a;color:#4ade80;font-family:monospace;font-size:18px;font-weight:800;padding:10px 16px;border-radius:10px;display:inline-block;margin:8px 0 14px;letter-spacing:.06em}
.wb-wa-btn{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;background:#16a34a;color:#fff!important;font-family:Manrope,sans-serif;font-weight:800;font-size:16px;padding:16px 20px;border-radius:11px;text-decoration:none!important;margin:12px 0;box-shadow:0 10px 24px rgba(22,163,74,.3)}
.wb-wa-btn:hover{background:#15803d}
.wb-utr-box{background:#fff;border:1px solid #bbf7d0;border-radius:12px;padding:16px;margin-top:16px}
.wb-faq-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}
.wb-faq-item{background:#fff;border:1px solid #dfe5f0;border-radius:14px;padding:20px 22px}
.wb-faq-item summary{font-family:Manrope,sans-serif;font-weight:750;font-size:16px;cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:12px}
.wb-faq-item summary::-webkit-details-marker{display:none}
.wb-faq-item p{color:#526075;font-size:14px;line-height:1.65;margin:12px 0 0}
.wb-sticky-dock{position:fixed;bottom:0;left:0;right:0;z-index:40;background:rgba(10,18,34,.96);backdrop-filter:blur(12px);border-top:1px solid rgba(147,197,253,.24);padding:12px 0;color:#fff}
.wb-sticky-inner{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
@media(max-width:960px){
  .wb-hero-grid,.wb-hours,.wb-cert-grid,.wb-personas,.wb-value-grid,.wb-reg-grid,.wb-faq-grid{grid-template-columns:1fr}
  .wb-form-row,.wb-badges{grid-template-columns:1fr}
  .wb-section{padding:52px 0}
  .wb-reg-card{padding:24px 20px}
}
</style>

<div class="wb">
  <section class="wb-hero">
    <div class="wb-wrap">
      <div class="wb-urgency" role="region" aria-label="Upcoming webinar schedule and countdown">
        <div class="wb-urgency-left">
          <span class="wb-live-pill"><span class="wb-live-dot"></span> LIVE BOOTCAMP</span>
          <span><strong id="wb-next-monday-label">Monday · 6:00 PM to 9:00 PM IST</strong> (3 Hours Live + Q&amp;A)</span>
        </div>
        <div class="wb-timer" aria-label="Countdown to Monday 6:00 PM IST">
          <div class="wb-timer-box"><strong id="wb-cd-days">02</strong><small>Days</small></div>
          <div class="wb-timer-box"><strong id="wb-cd-hours">18</strong><small>Hours</small></div>
          <div class="wb-timer-box"><strong id="wb-cd-mins">45</strong><small>Mins</small></div>
          <div class="wb-timer-box"><strong id="wb-cd-secs">00</strong><small>Secs</small></div>
        </div>
      </div>

      <div class="wb-hero-grid">
        <div>
          <div class="wb-kicker">FLYQ DRONES ACADEMY · BEGINNER-TO-BUILDER MASTERCLASS</div>
          <h1>Build, Code &amp; Fly Your First <em>Programmable Drone.</em></h1>
          <p class="wb-lead">Join a 3-hour live, mentor-led engineering bootcamp this <strong>Monday (6:00 PM – 9:00 PM IST)</strong>. Learn how quadcopters fly, explore ESP32-S3 flight controllers, program autonomous 3D simulator missions, and earn your <strong>Free Verified FLYQ Certificate</strong> — all for just <strong>₹99</strong>.</p>

          <div class="wb-badges">
            <div class="wb-badge-card">
              <div class="wb-badge-icon">⏱</div>
              <div><strong>Monday · 6:00 PM – 9:00 PM</strong><span>3 hours of live practical instruction &amp; demos</span></div>
            </div>
            <div class="wb-badge-card">
              <div class="wb-badge-icon">🎓</div>
              <div><strong>Free Verified Certificate</strong><span>Official FLYQ Drones × Passion 3D World credential</span></div>
            </div>
            <div class="wb-badge-card">
              <div class="wb-badge-icon">⚡</div>
              <div><strong>ESP32-S3 + 3D Simulator</strong><span>Hardware anatomy, Blockly/Python &amp; AI camera vision</span></div>
            </div>
            <div class="wb-badge-card">
              <div class="wb-badge-icon">₹</div>
              <div><strong>Only ₹99 All-Inclusive</strong><span>90% off regular ₹999 workshop pass · No hidden fees</span></div>
            </div>
          </div>

          <div class="wb-cta-row">
            <a class="wb-btn-primary" href="#register">Reserve Your Seat for ₹99 <span aria-hidden="true">↗</span></a>
            <a class="wb-btn-secondary" href="#curriculum">See 3-Hour Agenda ↓</a>
            <a class="wb-btn-secondary" href="#certificate">Preview Certificate</a>
          </div>

          <div class="wb-trust-note">
            <span>✓ No drone kit or prior coding required to attend</span>
            <span>✓ Instant Drone Kit Blueprint PDF unlocked on registration</span>
          </div>
        </div>

        <aside class="wb-hero-card" aria-label="Webinar pass summary">
          <div class="wb-video-wrap">
            <video controls playsinline preload="metadata" poster="/flyq-design/demos/flight-demo.jpg" aria-label="FLYQ programmable drone live flight preview">
              <source src="/flyq-design/demos/flight-demo.mp4" type="video/mp4">
            </video>
            <span class="wb-video-tag">REAL FLYQ DRONE IN FLIGHT</span>
          </div>
          <div class="wb-card-body">
            <div class="wb-price-row">
              <div class="wb-price-main">
                <span class="wb-price-now">₹99</span>
                <span class="wb-price-was">₹999</span>
              </div>
              <span class="wb-discount-pill">SAVE 90% · MONDAY SPECIAL</span>
            </div>

            <div class="wb-seat-meter">
              <div class="wb-seat-bar"><div class="wb-seat-fill"></div></div>
              <div class="wb-seat-text"><span><strong>Monday 6:00 PM – 9:00 PM IST</strong> batch filling fast</span><span>Limited live Q&amp;A seats</span></div>
            </div>

            <ul class="wb-checklist">
              <li><i>✓</i><span><strong>3-Hour Live Interactive Session</strong> (Monday, 6:00 PM – 9:00 PM IST)</span></li>
              <li><i>✓</i><span><strong>Free Verified Certificate of Completion</strong> signed by FLYQ Founder</span></li>
              <li><i>✓</i><span><strong>Instant Download:</strong> FLYQ Drone Kit &amp; Robotics Engineering Guide (PDF)</span></li>
              <li><i>✓</i><span><strong>Live 3D Flight Studio Demo</strong> + ESP32-S3 flight controller walkthrough</span></li>
              <li><i>✓</i><span><strong>₹500 Attendee Credit</strong> towards FLYQ Air / Vision Kits or 2-Month Course</span></li>
            </ul>

            <a class="wb-btn-primary" href="#register" style="width:100%">Register Now for ₹99 <span aria-hidden="true">→</span></a>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <div class="wb-ribbon">
    <div class="wb-wrap wb-ribbon-inner">
      <span>✦ ESP32-S3 FLIGHT CONTROLLERS</span>
      <span>✦ QUADCOPTER AERODYNAMICS</span>
      <span>✦ 3D FLIGHT STUDIO SIMULATION</span>
      <span>✦ AI CAMERA VISION</span>
      <span>✦ FREE VERIFIED CERTIFICATE</span>
    </div>
  </div>

  <section class="wb-section" id="curriculum">
    <div class="wb-wrap">
      <div class="wb-heading">
        <div>
          <p class="wb-eyebrow">01 / THE 3-HOUR MONDAY MASTERCLASS AGENDA</p>
          <h2>Three hours.<br>Zero fluff. Pure engineering.</h2>
        </div>
        <p>Every 60-minute block is designed to take you from understanding physical drone components to writing real flight logic and planning your next robotics project.</p>
      </div>

      <div class="wb-hours">
        <article class="wb-hour-card">
          <div class="wb-hour-top">
            <span class="wb-hour-pill">HOUR 01</span>
            <span class="wb-hour-time">6:00 PM – 7:00 PM IST</span>
          </div>
          <h3>Drone Hardware, Physics &amp; ESP32-S3 Architecture</h3>
          <p>Go inside a real programmable quadcopter and understand how every electronic and mechanical component works together to achieve stable flight.</p>
          <ul class="wb-hour-list">
            <li><span>01</span><div><strong>Flight Physics &amp; Aerodynamics:</strong> Thrust, torque counter-balance, roll, pitch, yaw &amp; hover stability.</div></li>
            <li><span>02</span><div><strong>Inside FLYQ Air &amp; Vision:</strong> Coreless/brushless propulsion, propeller geometry, LiPo power &amp; safety.</div></li>
            <li><span>03</span><div><strong>ESP32-S3 Flight Controller:</strong> IMU sensors (gyroscope + accelerometer), sensor fusion &amp; Wi-Fi UDP telemetry.</div></li>
          </ul>
        </article>

        <article class="wb-hour-card">
          <div class="wb-hour-top">
            <span class="wb-hour-pill">HOUR 02</span>
            <span class="wb-hour-time">7:00 PM – 8:00 PM IST</span>
          </div>
          <h3>Flight Programming, Blockly &amp; 3D Simulator Missions</h3>
          <p>See how lines of code become real aircraft motion. Watch live mission programming in the FLYQ Flight Studio 3D Simulator.</p>
          <ul class="wb-hour-list">
            <li><span>04</span><div><strong>Autonomous Flight Logic:</strong> Takeoff, target altitude hold, coordinate navigation &amp; safe landing sequences.</div></li>
            <li><span>05</span><div><strong>Visual &amp; Code Workflows:</strong> Building repeatable flight programs with Blockly and JavaScript/Python commands.</div></li>
            <li><span>06</span><div><strong>3D Light Show &amp; Swarm Concepts:</strong> How multi-drone formations and timed sky choreography are programmed.</div></li>
          </ul>
        </article>

        <article class="wb-hour-card">
          <div class="wb-hour-top">
            <span class="wb-hour-pill">HOUR 03</span>
            <span class="wb-hour-time">8:00 PM – 9:00 PM IST</span>
          </div>
          <h3>AI Computer Vision, Project Roadmap &amp; Live Q&amp;A</h3>
          <p>Discover camera-based drone applications, learn how to build standout school/college projects, and get your questions answered live.</p>
          <ul class="wb-hour-list">
            <li><span>07</span><div><strong>FLYQ Vision &amp; Camera Streams:</strong> Low-latency Wi-Fi video, gesture recognition &amp; computer-vision experiments.</div></li>
            <li><span>08</span><div><strong>Bench Testing &amp; Troubleshooting:</strong> Propeller-off diagnostics, calibration &amp; safe first-flight checklists.</div></li>
            <li><span>09</span><div><strong>Live Q&amp;A + Certification:</strong> Career &amp; competition guidance with Founder Rahul Gupta + certificate claim code.</div></li>
          </ul>
        </article>
      </div>
    </div>
  </section>

  <section class="wb-section dark" id="certificate">
    <div class="wb-wrap">
      <div class="wb-cert-grid">
        <div>
          <p class="wb-eyebrow">02 / OFFICIAL VERIFIED CREDENTIAL INCLUDED FREE</p>
          <h2 style="font-family:Manrope,sans-serif;font-size:clamp(30px,3.8vw,46px);line-height:1.08;margin:0 0 18px">Earn your official FLYQ Certificate of Completion.</h2>
          <p style="color:#b5c7e3;font-size:16px;line-height:1.7;margin:0 0 20px">Every attendee who completes the Monday 6:00 PM – 9:00 PM live bootcamp receives a personalized, verifiable <strong>Certificate of Completion</strong> issued by <strong>FLYQ Drones (Passion 3D World, Mumbai)</strong> at no extra cost.</p>
          <ul class="wb-checklist" style="margin-bottom:24px">
            <li><i>✓</i><span><strong>Portfolio &amp; Resume Ready:</strong> Share on LinkedIn, college project files, or school STEM portfolios.</span></li>
            <li><i>✓</i><span><strong>Unique Verification ID:</strong> Each certificate carries a unique credential reference and date of issue.</span></li>
            <li><i>✓</i><span><strong>Included in Your ₹99 Pass:</strong> Zero extra exam or certificate issuance fee.</span></li>
          </ul>

          <div class="wb-cert-input-box">
            <label for="cert-preview-input">✨ Type your name below to preview your certificate live:</label>
            <input id="cert-preview-input" type="text" maxlength="80" placeholder="Enter your full name (e.g. Aarav Sharma)" autocomplete="name">
          </div>
        </div>

        <div class="wb-cert-preview" aria-label="Certificate of Completion preview">
          <div class="wb-cert-inner">
            <div class="wb-cert-top">
              <div>
                <div class="wb-cert-brand">FLY<span>Q</span> DRONES</div>
                <div style="font-size:11px;color:#64748b;font-weight:600">By Passion 3D World · Mumbai, India</div>
              </div>
              <span class="wb-cert-badge">VERIFIED CREDENTIAL</span>
            </div>
            <div class="wb-cert-kicker">CERTIFICATE OF COMPLETION</div>
            <h3 class="wb-cert-title">Drone Building, ESP32-S3 Coding &amp; Flight Bootcamp</h3>
            <p class="wb-cert-sub">This is proudly presented to</p>
            <div class="wb-cert-name" id="cert-recipient-name">Your Full Name Here</div>
            <p class="wb-cert-desc">for successfully completing the <strong>3-Hour Live Hands-On Webinar on Programmable Drone Hardware, ESP32-S3 Flight Controller Architecture, 3D Flight Simulation &amp; Computer Vision</strong> conducted by <strong>FLYQ Drones</strong>.</p>
            <div class="wb-cert-footer">
              <div class="wb-cert-sign">
                <strong>Rahul Gupta</strong>
                <span>Founder, FLYQ Drones · Passion 3D World</span>
              </div>
              <div>
                <strong>Duration: 3 Hours Live</strong>
                <span id="cert-date-preview">Monday · 6:00 PM – 9:00 PM IST</span>
              </div>
              <div>
                <strong>Credential ID</strong>
                <span style="font-family:monospace">FLYQ-CERT-2026-W99</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="wb-section grey" id="who-should-attend">
    <div class="wb-wrap">
      <div class="wb-heading">
        <div>
          <p class="wb-eyebrow">03 / DESIGNED FOR CURIOUS MINDS</p>
          <h2>Who is this ₹99 live bootcamp built for?</h2>
        </div>
        <p>Whether you are writing your very first line of code or planning an engineering capstone project, this session gives you a clear, practical foundation.</p>
      </div>

      <div class="wb-personas">
        <article class="wb-persona">
          <span class="wb-persona-num">01 / SCHOOL STUDENTS (10+)</span>
          <h3>Young Makers &amp; STEM Learners</h3>
          <p>Understand how real drones fly, see how sensors and motors work, and watch block-based code fly a virtual quadcopter step by step.</p>
        </article>
        <article class="wb-persona">
          <span class="wb-persona-num">02 / ENGINEERING &amp; COLLEGE</span>
          <h3>B.Tech, Diploma &amp; B.Sc Students</h3>
          <p>Explore ESP32-S3 embedded firmware, Wi-Fi UDP control protocols, and computer-vision project ideas for hackathons and minor/major projects.</p>
        </article>
        <article class="wb-persona">
          <span class="wb-persona-num">03 / MAKERS &amp; DEVELOPERS</span>
          <h3>Hobbyists &amp; Tech Enthusiasts</h3>
          <p>Learn how open-source programmable micro-drones are built, calibrated, and tested before investing in hardware kits.</p>
        </article>
        <article class="wb-persona">
          <span class="wb-persona-num">04 / PARENTS &amp; EDUCATORS</span>
          <h3>Teachers &amp; Robotics Coordinators</h3>
          <p>Experience FLYQ’s hands-on teaching approach live and discover how to bring practical drone robotics to your child or campus.</p>
        </article>
      </div>
    </div>
  </section>

  <section class="wb-section" id="mentor">
    <div class="wb-wrap">
      <div class="wb-value-grid">
        <div>
          <p class="wb-eyebrow">04 / LEARN FROM REAL DRONE BUILDERS</p>
          <h2 style="font-family:Manrope,sans-serif;font-size:clamp(28px,3.5vw,44px);line-height:1.1;margin:0 0 18px">Guided by Rahul Gupta &amp; the FLYQ Engineering Team.</h2>
          <p style="color:#526075;font-size:16px;line-height:1.7;margin:0 0 20px">Built in Mumbai by <strong>Passion 3D World</strong>, FLYQ Drones designs programmable ESP32-S3 quadcopters (FLYQ Air &amp; FLYQ Vision), 3D flight simulation tools, and hands-on campus workshops demonstrated for students at leading institutions including <strong>NRSC, ISRO</strong>.</p>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;background:#f5f7fb;border:1px solid #e1e6f0;border-radius:16px;padding:18px;margin-bottom:22px">
            <div><strong style="font:800 26px Manrope,sans-serif;color:#225cec;display:block">3 Hrs</strong><span style="font-size:12px;color:#526075">Live interactive build &amp; code</span></div>
            <div><strong style="font:800 26px Manrope,sans-serif;color:#225cec;display:block">50+</strong><span style="font-size:12px;color:#526075">Guided simulator missions</span></div>
            <div><strong style="font:800 26px Manrope,sans-serif;color:#225cec;display:block">100%</strong><span style="font-size:12px;color:#526075">Practical hardware &amp; code</span></div>
          </div>
          <img src="/flyq-design/brand/workshop-students-demo.jpg" alt="FLYQ live drone demonstration with students at NRSC" width="1024" height="768" loading="lazy" style="border-radius:18px;border:1px solid #dfe5f0;max-height:300px;width:100%;object-fit:cover">
        </div>

        <div>
          <div style="background:#f5f7fb;border:1px solid #dfe5f0;border-radius:22px;padding:28px">
            <p class="wb-eyebrow" style="margin-bottom:8px">EVERYTHING INCLUDED IN YOUR ₹99 PASS</p>
            <h3 style="font-family:Manrope,sans-serif;font-size:24px;margin:0 0 18px">Total Value ₹2,498 — Yours for ₹99</h3>
            <div class="wb-stack-list">
              <div class="wb-stack-item">
                <div><strong>3-Hour Live Drone Engineering Bootcamp</strong><span>Monday · 6:00 PM – 9:00 PM IST live session</span></div>
                <span class="wb-stack-val">₹999 Value</span>
              </div>
              <div class="wb-stack-item">
                <div><strong>Official FLYQ Certificate of Completion</strong><span>Verified digital certificate with unique ID</span></div>
                <span class="wb-stack-val">₹500 Value</span>
              </div>
              <div class="wb-stack-item">
                <div><strong>FLYQ Drone Kit &amp; Hardware Guide (PDF)</strong><span>Instant high-resolution blueprint download</span></div>
                <span class="wb-stack-val">₹499 Value</span>
              </div>
              <div class="wb-stack-item">
                <div><strong>₹500 FLYQ Kit / Course Attendee Credit</strong><span>Redeemable on FLYQ Air, Vision or 2-Month Course</span></div>
                <span class="wb-stack-val">₹500 Value</span>
              </div>
            </div>
            <div style="margin-top:20px;padding-top:18px;border-top:1px solid #dce4f0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
              <div>
                <span style="font-size:12px;color:#526075;display:block">Special Monday Bootcamp Fee</span>
                <strong style="font:800 32px Manrope,sans-serif;color:#151923">₹99 <small style="font-size:14px;color:#16a34a;font-weight:700">(Save 96%)</small></strong>
              </div>
              <a class="wb-btn-primary" href="#register">Claim ₹99 Pass →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="wb-section dark" id="register">
    <div class="wb-wrap">
      <div class="wb-reg-grid">
        <div>
          <p class="wb-eyebrow">05 / RESERVE YOUR SEAT NOW</p>
          <h2 style="font-family:Manrope,sans-serif;font-size:clamp(30px,4vw,50px);line-height:1.06;margin:0 0 18px">Join this Monday’s 6:00 PM – 9:00 PM Live Batch for ₹99.</h2>
          <p style="color:#b8cae6;font-size:16px;line-height:1.7;margin:0 0 24px">Complete your registration in 30 seconds. Your seat details are saved immediately, unlocking your <strong>instant ₹99 WhatsApp / UPI confirmation</strong> and the <strong>FLYQ Drone Kit Guide PDF</strong>.</p>

          <div style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);border-radius:16px;padding:22px;margin-bottom:24px">
            <h3 style="font-family:Manrope,sans-serif;font-size:18px;margin:0 0 12px;color:#fff">How your registration works:</h3>
            <ol style="margin:0;padding-left:20px;color:#cbd9f0;font-size:14px;line-height:1.8">
              <li><strong>Step 1:</strong> Fill in your name (as it should appear on your Certificate), email, and WhatsApp number.</li>
              <li><strong>Step 2:</strong> Complete the <strong>₹99 payment</strong> via instant WhatsApp UPI QR / UPI ID and share your 12-digit UTR or confirmation message.</li>
              <li><strong>Step 3:</strong> Receive your live joining link before Monday 6:00 PM IST + your verified certificate upon completion!</li>
            </ol>
          </div>

          <div style="font-size:13.5px;color:#9bb2d4;line-height:1.8">
            <div><strong style="color:#fff">Need help or registering a group?</strong></div>
            <div>Call / WhatsApp: <a href="https://wa.me/919137361474?text=Hi%20FLYQ%2C%20I%20want%20to%20register%20for%20the%20Monday%206%3A00%20PM%20-%209%3A00%20PM%20%E2%82%B999%20Drone%20Webinar." target="_blank" rel="noopener" style="color:#60a5fa;text-decoration:underline">+91 91373 61474 ↗</a></div>
            <div>Email: <a href="mailto:info@passion3dworld.com" style="color:#60a5fa;text-decoration:underline">info@passion3dworld.com</a></div>
          </div>
        </div>

        <div class="wb-reg-card">
          <div id="wb-step1-container">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:16px;flex-wrap:wrap">
              <span style="background:#eef4ff;color:#1d4ed8;font-size:11px;font-weight:800;padding:4px 10px;border-radius:99px;letter-spacing:.08em">STEP 1 OF 2 · SEAT REGISTRATION</span>
              <span style="font-size:13px;font-weight:700;color:#16a34a">Fee: ₹99 + Free Certificate</span>
            </div>
            <h3>Register for the Live Webinar</h3>
            <p style="color:#526075;font-size:14px;margin:0 0 20px" id="wb-form-batch-display">Batch: Upcoming Monday · 6:00 PM to 9:00 PM IST</p>

            <form id="webinar-register-form">
              <input type="hidden" name="session_date" id="wb-session-date-input" value="Monday (6:00 PM - 9:00 PM IST)">
              <div class="wb-field">
                <label for="wb-name">Full Name (printed on your Certificate) *</label>
                <input id="wb-name" name="name" type="text" required maxlength="120" autocomplete="name" placeholder="Enter your full name">
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
                  <input id="wb-city" name="city" type="text" required maxlength="100" autocomplete="address-level2" placeholder="Your city (e.g. Mumbai)">
                </div>
              </div>

              <div class="wb-field">
                <label for="wb-institution">School / College / Organization <span style="color:#64748b;font-weight:400">(optional)</span></label>
                <input id="wb-institution" name="institution" type="text" maxlength="180" autocomplete="organization" placeholder="Your school, college or company name">
              </div>

              <div class="wb-field">
                <label for="wb-question">Any specific topic or question for the live Q&amp;A? <span style="color:#64748b;font-weight:400">(optional)</span></label>
                <input id="wb-question" name="question" type="text" maxlength="500" placeholder="e.g. How to program ESP32-S3 flight controller or build a college project">
              </div>

              <div style="position:absolute;left:-9999px" aria-hidden="true">
                <label>Leave empty<input type="text" name="website" tabindex="-1" autocomplete="off"></label>
              </div>

              <label class="wb-consent">
                <input type="checkbox" name="consent" required checked>
                <span>I agree to receive the Monday (6:00 PM – 9:00 PM IST) webinar joining link, ₹99 payment confirmation, and certificate details via WhatsApp and Email from FLYQ Drones.</span>
              </label>

              <button type="submit" class="wb-btn-primary" id="wb-submit-btn" style="width:100%;font-size:16px">
                Reserve My Seat &amp; Proceed to ₹99 Pass →
              </button>
              <p id="wb-form-status" role="status" aria-live="polite" style="font-size:13.5px;color:#dc2626;margin:10px 0 0"></p>
            </form>
          </div>

          <div id="wb-step2-container" class="wb-step2" hidden>
            <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap">
              <span style="background:#16a34a;color:#fff;font-size:11px;font-weight:800;padding:4px 10px;border-radius:99px;letter-spacing:.08em">✓ SEAT RESERVED · STEP 2 OF 2</span>
              <span style="font-size:12.5px;font-weight:700;color:#15803d">Amount Due: ₹99</span>
            </div>
            <h3 style="color:#14532d;margin-top:10px">Complete Your ₹99 Pass Confirmation</h3>
            <p style="font-size:14px;color:#166534;margin:4px 0 6px">Your registration is saved! Use your unique Registration Code below:</p>
            <div class="wb-step2-code" id="wb-reg-code-display">FLYQ-W99-READY</div>
            <p style="font-size:13px;color:#334155;margin:0 0 12px">
              <strong>Attendee / Certificate Name:</strong> <span id="wb-confirm-name"></span><br>
              <strong>Live Session:</strong> <span id="wb-confirm-session">Monday · 6:00 PM – 9:00 PM IST (3 Hours)</span>
            </p>

            <a id="wb-whatsapp-pay-link" class="wb-wa-btn" href="https://wa.me/919137361474" target="_blank" rel="noopener">
              💬 Confirm ₹99 Pass on WhatsApp (Instant UPI QR &amp; Link) ↗
            </a>
            <p style="font-size:12px;color:#475569;text-align:center;margin:0 0 14px">Clicking above opens WhatsApp to <strong>+91 91373 61474</strong> with your Registration ID pre-filled so you can pay ₹99 via any UPI app (GPay / PhonePe / Paytm) and get your live meeting link immediately.</p>

            <div class="wb-utr-box">
              <strong style="display:block;font-size:13.5px;color:#0f172a;margin-bottom:6px">Already paid ₹99 via UPI? Enter your 12-digit UTR / Ref No. (Optional):</strong>
              <form id="webinar-utr-form" style="display:flex;gap:10px;flex-wrap:wrap">
                <input type="hidden" name="id" id="wb-utr-reg-id">
                <input type="hidden" name="reg_code" id="wb-utr-reg-code">
                <input type="text" name="utr_number" id="wb-utr-input" required minlength="6" maxlength="40" placeholder="Enter 12-digit UPI Ref / UTR number" style="flex:1;min-width:190px;padding:10px 12px;border:1px solid #cbd5e1;border-radius:8px;font-size:14px">
                <button type="submit" class="button" style="background:#0f172a;color:#fff;padding:10px 18px;min-height:40px;border-radius:8px;font-size:13.5px;font-weight:700">Save UTR ✓</button>
              </form>
              <p id="wb-utr-status" role="status" aria-live="polite" style="font-size:12.5px;color:#15803d;margin:8px 0 0"></p>
            </div>

            <div style="margin-top:16px;padding-top:14px;border-top:1px dashed #86efac;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
              <div>
                <strong style="font-size:13px;color:#14532d;display:block">🎁 Bonus Pre-Read Unlocked:</strong>
                <span style="font-size:12px;color:#166534">Download your official FLYQ Drone Kit Guide PDF</span>
              </div>
              <a href="/brochures/FLYQ-Drone-Kit-Guide.pdf" download class="button secondary" style="padding:8px 14px;min-height:36px;font-size:12.5px;border-color:#16a34a;color:#15803d">Download Kit Guide (PDF) ↓</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="wb-section grey" id="faqs">
    <div class="wb-wrap">
      <div class="wb-heading">
        <div>
          <p class="wb-eyebrow">06 / FREQUENTLY ASKED QUESTIONS</p>
          <h2>Everything you need to know.</h2>
        </div>
        <p>Still have a question? Chat with the FLYQ team on WhatsApp at <a href="https://wa.me/919137361474" target="_blank" rel="noopener" style="color:#225cec;text-decoration:underline">+91 91373 61474</a>.</p>
      </div>

      <div class="wb-faq-grid">
        <details class="wb-faq-item" open>
          <summary>Do I need to own a FLYQ drone kit to attend this ₹99 webinar? <span>+</span></summary>
          <p>No! You do not need a physical drone kit to attend. We demonstrate real FLYQ Air and FLYQ Vision hardware live on camera and show the coding workflows inside the 3D Flight Studio simulator so complete beginners can follow every step.</p>
        </details>
        <details class="wb-faq-item" open>
          <summary>When is the live webinar held and how long is it? <span>+</span></summary>
          <p>The live bootcamp takes place on <strong>Monday from 6:00 PM to 9:00 PM IST</strong> (3 full hours), covering Drone Hardware &amp; ESP32-S3 Electronics (Hour 1), Flight Coding &amp; 3D Simulation (Hour 2), and AI Camera Vision &amp; Live Q&amp;A (Hour 3).</p>
        </details>
        <details class="wb-faq-item">
          <summary>Will I really receive a Free Certificate for ₹99? <span>+</span></summary>
          <p>Yes! Every registered participant who attends the Monday 6:00 PM – 9:00 PM live session receives an official, verifiable <strong>FLYQ Drones × Passion 3D World Certificate of Completion</strong> at zero additional cost.</p>
        </details>
        <details class="wb-faq-item">
          <summary>How do I complete the ₹99 payment and get the meeting link? <span>+</span></summary>
          <p>As soon as you submit the registration form above, you’ll get a unique Registration ID and a one-click WhatsApp confirmation button to complete the ₹99 UPI payment and receive your live joining link on WhatsApp and Email.</p>
        </details>
        <details class="wb-faq-item">
          <summary>Is any prior programming experience required? <span>+</span></summary>
          <p>None at all. We start from first principles—explaining how quadcopters fly and how visual Blockly blocks work—before showing JavaScript/Python flight commands and ESP32-S3 telemetry.</p>
        </details>
        <details class="wb-faq-item">
          <summary>Do attendees get a discount on FLYQ Drone Kits or the 2-Month Course? <span>+</span></summary>
          <p>Yes. Every ₹99 webinar attendee receives a <strong>₹500 credit voucher</strong> that can be applied towards purchasing a FLYQ Air or FLYQ Vision drone kit or enrolling in the 2-Month Live Drone Robotics Programme.</p>
        </details>
      </div>
    </div>
  </section>

  <div class="wb-sticky-dock" role="region" aria-label="Quick registration bar">
    <div class="wb-wrap wb-sticky-inner">
      <div>
        <strong style="font-family:Manrope,sans-serif;font-size:15px">Monday Live Drone Bootcamp (6:00 PM – 9:00 PM IST)</strong>
        <span style="font-size:12.5px;color:#93c5fd;margin-left:10px">3 Hours Live · Free Verified Certificate · <strong style="color:#4ade80">Only ₹99</strong> <s>₹999</s></span>
      </div>
      <a class="wb-btn-primary" href="#register" style="padding:10px 20px;font-size:14px;border-radius:8px">Register for ₹99 →</a>
    </div>
  </div>
</div>
<script src="${WEBINAR_JS_PATH}" defer></script>`;
}

export const webinarScript = `(() => {
  const $ = s => document.querySelector(s);

  // 1. Compute upcoming Monday 6:00 PM - 9:00 PM IST
  function getNextMondayIST() {
    const now = new Date();
    // Convert current time to IST (UTC+5:30)
    const utcMs = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istNow = new Date(utcMs + (5.5 * 3600000));
    const day = istNow.getDay(); // 0=Sun, 1=Mon, ... 6=Sat
    let daysUntilMonday = (1 - day + 7) % 7;
    // If today is Monday and it is already past 9:00 PM IST, target next Monday
    if (daysUntilMonday === 0 && istNow.getHours() >= 21) {
      daysUntilMonday = 7;
    }
    const targetIST = new Date(istNow);
    targetIST.setDate(istNow.getDate() + daysUntilMonday);
    targetIST.setHours(18, 0, 0, 0);
    // Convert targetIST back to real epoch ms
    const targetEpochMs = targetIST.getTime() - (5.5 * 3600000) - (now.getTimezoneOffset() * 60000);
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
    if ($('#wb-cd-secs')) $('#wb-cd-secs').textContent = pad(s);
  }
  updateClock();
  setInterval(updateClock, 1000);

  // 2. Interactive Certificate Name Preview
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

  // 3. Step 1: Webinar Registration Form Submission
  const regForm = $('#webinar-register-form');
  if (regForm) {
    regForm.addEventListener('submit', async e => {
      e.preventDefault();
      const statusEl = $('#wb-form-status');
      const submitBtn = $('#wb-submit-btn');
      statusEl.style.color = '#dc2626';
      statusEl.textContent = '';

      const fd = new FormData(regForm);
      const payload = {
        name: String(fd.get('name') || '').trim(),
        email: String(fd.get('email') || '').trim(),
        phone: String(fd.get('phone') || '').trim(),
        profile: String(fd.get('profile') || '').trim(),
        city: String(fd.get('city') || '').trim(),
        institution: String(fd.get('institution') || '').trim(),
        question: String(fd.get('question') || '').trim(),
        session_date: String(fd.get('session_date') || 'Monday · 6:00 PM – 9:00 PM IST').trim(),
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

      let regCode = 'FLYQ-W99-' + Math.random().toString(36).substring(2, 6).toUpperCase();
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
        // Fallback so user can still proceed to WhatsApp confirmation even on network hiccup
        console.warn('Registration fallback:', err);
      }

      syncCertName(payload.name);
      $('#wb-reg-code-display').textContent = regCode;
      $('#wb-confirm-name').textContent = payload.name + ' (' + payload.email + ')';
      $('#wb-confirm-session').textContent = payload.session_date;
      if ($('#wb-utr-reg-id')) $('#wb-utr-reg-id').value = regId;
      if ($('#wb-utr-reg-code')) $('#wb-utr-reg-code').value = regCode;

      const waText = [
        'Hello FLYQ Drones! 👋',
        'I have registered for the *3-Hour Live Drone Bootcamp Webinar (₹99 + Free Certificate)*.',
        '',
        '• *Registration ID:* ' + regCode,
        '• *Name (for Certificate):* ' + payload.name,
        '• *Email:* ' + payload.email,
        '• *Phone:* ' + payload.phone,
        '• *City:* ' + payload.city,
        '• *Batch:* ' + payload.session_date,
        '',
        'Please share the ₹99 UPI QR / payment link to confirm my seat and send the live joining link!'
      ].join('\\n');

      const waLink = 'https://wa.me/919137361474?text=' + encodeURIComponent(waText);
      const waBtn = $('#wb-whatsapp-pay-link');
      if (waBtn) waBtn.href = waLink;

      $('#wb-step1-container').hidden = true;
      $('#wb-step2-container').hidden = false;
      $('#wb-step2-container').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  // 4. Step 2: Optional UPI UTR Submission
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
