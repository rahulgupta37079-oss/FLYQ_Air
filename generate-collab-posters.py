import base64
import os
import shutil
import subprocess
from pathlib import Path
from PIL import Image

OUT_DIR = Path(r"C:\Users\PROFESSORHULK\Downloads\FLYQ-Social-Media-Kit")
ARTIFACT_DIR = Path(r"C:\Users\PROFESSORHULK\.gemini\antigravity\brain\2a52ed4d-c7f5-444a-b906-e3a15058312a")
SCRATCH_DIR = Path(r"C:\Users\PROFESSORHULK\.gemini\antigravity\scratch\flyq-webinar-release")
OUT_DIR.mkdir(parents=True, exist_ok=True)


def b64_uri(path, mime="image/jpeg"):
    data = Path(path).read_bytes()
    return f"data:{mime};base64," + base64.b64encode(data).decode("ascii")


logo_uri = b64_uri(
    r"C:\Users\PROFESSORHULK\Downloads\FLYQ-LOGO-UPDATE\FLYQ-LOGO-UPDATE\logo-blue.png",
    "image/png",
)

# Crop the black letterbox bars from the user-uploaded FLYQ drone image (or use air-clean.jpg)
uploaded_img_path = Path(r"C:\Users\PROFESSORHULK\.gemini\antigravity\brain\2a52ed4d-c7f5-444a-b906-e3a15058312a\.user_uploaded\media_1794572367329_376d4d45.jpg")
clean_crop_path = SCRATCH_DIR / "flyq_black_drone_cropped.jpg"
im_src = Image.open(uploaded_img_path)
w_src, h_src = im_src.size
# Trim top/bottom 12% letterbox bars so the sleek black FLYQ drone fills the frame
im_cropped = im_src.crop((0, int(h_src * 0.115), w_src, int(h_src * 0.885)))
im_cropped.save(clean_crop_path, "JPEG", quality=96)

flyq_drone_uri = b64_uri(clean_crop_path, "image/jpeg")


def build_single_kit_poster_html(width, height, mode="insta_square"):
    is_story = mode == "story"
    is_portrait = mode == "linkedin_portrait"
    is_fb_landscape = mode == "fb_landscape"

    if is_fb_landscape:
        return f"""<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;700&family=Manrope:wght@700;800&display=swap" rel="stylesheet">
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  html, body {{
    width: {width}px;
    height: {height}px;
    overflow: hidden;
    font-family: 'DM Sans', 'Segoe UI', Arial, sans-serif;
    background: #050b16;
    color: #fff;
  }}
  .canvas {{
    width: {width}px;
    height: {height}px;
    padding: 28px 36px;
    background:
      radial-gradient(circle at 85% 20%, rgba(34,92,236,0.48), transparent 45%),
      radial-gradient(circle at 15% 85%, rgba(16,185,129,0.28), transparent 45%),
      linear-gradient(155deg, #040914 0%, #0a1730 55%, #0f2347 100%);
    display: grid;
    grid-template-columns: 1.18fr 0.82fr;
    gap: 28px;
    align-items: center;
    position: relative;
    border: 2px solid rgba(96,165,250,0.32);
  }}
  .left-col {{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }}
  .top-strip {{
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }}
  .brand-box {{
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #fff;
    padding: 7px 14px;
    border-radius: 10px;
  }}
  .brand-box img {{ height: 24px; width: auto; }}
  .brand-box span {{
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    font-size: 11px;
    color: #1e3a8a;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    border-left: 1.5px solid #cbd5e1;
    padding-left: 8px;
  }}
  .collab-pill {{
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(90deg, rgba(236,72,153,0.22), rgba(139,92,246,0.25));
    border: 1.5px solid #f472b6;
    color: #fbcfe8;
    padding: 6px 13px;
    border-radius: 99px;
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    font-size: 12px;
  }}
  .free-pill {{
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: rgba(16,185,129,0.22);
    border: 1.5px solid #34d399;
    color: #6ee7b7;
    padding: 6px 13px;
    border-radius: 99px;
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    font-size: 11.5px;
    letter-spacing: 0.06em;
  }}
  h1 {{
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    font-size: 38px;
    line-height: 1.06;
    letter-spacing: -0.03em;
    margin: 8px 0;
  }}
  h1 em {{
    font-style: normal;
    background: linear-gradient(90deg, #38bdf8 0%, #4ade80 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }}
  .lead {{
    font-size: 14.5px;
    color: #cbd5e1;
    line-height: 1.45;
    margin-bottom: 10px;
  }}
  .bullets {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 12px;
  }}
  .b-item {{
    background: rgba(15,23,42,0.85);
    border: 1px solid rgba(148,163,184,0.24);
    border-radius: 10px;
    padding: 8px 11px;
    font-size: 12px;
    color: #e2e8f0;
  }}
  .b-item strong {{ color: #4ade80; display: block; font-size: 12.5px; font-family: 'Manrope', sans-serif; }}
  .cta-bar {{
    background: linear-gradient(90deg, #1d4ed8 0%, #2563eb 100%);
    border: 1.5px solid #93c5fd;
    border-radius: 14px;
    padding: 11px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }}
  .cta-bar strong {{ font-family: 'Manrope', sans-serif; font-size: 17px; color: #fff; display: block; }}
  .cta-bar span {{ font-size: 11.5px; color: #dbeafe; }}
  .url-chip {{
    background: #4ade80;
    color: #052e16;
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    font-size: 14px;
    padding: 9px 15px;
    border-radius: 10px;
  }}
  .right-col {{
    background: rgba(15,23,42,0.88);
    border: 2px solid rgba(96,165,250,0.35);
    border-radius: 20px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 100%;
    justify-content: space-between;
  }}
  .single-kit-box {{
    width: 100%;
    height: 360px;
    border-radius: 14px;
    overflow: hidden;
    border: 2px solid rgba(96,165,250,0.4);
    background: #090f1d;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }}
  .single-kit-box img {{
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }}
  .kit-tag {{
    position: absolute;
    top: 12px;
    left: 12px;
    background: rgba(15,23,42,0.92);
    color: #38bdf8;
    border: 1.5px solid #38bdf8;
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    font-size: 11px;
    padding: 5px 11px;
    border-radius: 99px;
    letter-spacing: 0.08em;
  }}
  .sched-card {{
    background: linear-gradient(135deg, rgba(16,185,129,0.2), rgba(34,92,236,0.24));
    border: 1.5px solid rgba(74,222,128,0.45);
    border-radius: 12px;
    padding: 10px 14px;
  }}
  .sched-card strong {{ display: block; font-family: 'Manrope', sans-serif; font-size: 15px; color: #4ade80; }}
  .sched-card span {{ font-size: 12px; color: #e2e8f0; }}
  .sold-bar {{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255,255,255,0.06);
    border-radius: 10px;
    padding: 8px 12px;
    font-size: 11.5px;
  }}
</style>
</head>
<body>
  <div class="canvas">
    <div class="left-col">
      <div class="top-strip">
        <div class="brand-box">
          <img src="{logo_uri}" alt="FLYQ">
          <span>Drone Robotics Live</span>
        </div>
        <div class="collab-pill">🤝 @theprofessorhulk × @passion3dworld</div>
        <div class="free-pill">● FREE CERTIFICATE</div>
      </div>

      <div>
        <h1>Free Drone Robotics <em>Live Masterclass &amp; Bootcamp</em></h1>
        <p class="lead">Learn how the <strong>FLYQ Programmable Drone Kit (ESP32-S3)</strong> is built, stabilized &amp; coded in Python/Blockly with live 3D simulation &amp; AI camera vision.</p>

        <div class="bullets">
          <div class="b-item"><strong>✓ Hour 1: FLYQ Kit Anatomy</strong>ESP32-S3 PCB, IMU sensors &amp; motors</div>
          <div class="b-item"><strong>✓ Hour 2: 3D Flight Studio</strong>Live Blockly &amp; Python flight code</div>
          <div class="b-item"><strong>✓ Hour 3: AI Vision &amp; Q&amp;A</strong>Camera telemetry &amp; career roadmap</div>
          <div class="b-item"><strong>✓ Free Verified Certificate</strong>Official FLYQ × Passion 3D World ID</div>
        </div>
      </div>

      <div class="cta-bar">
        <div>
          <strong>Register Online: https://flyqdrone.in/webinar</strong>
          <span>WhatsApp Direct Registration: +91 91373 61474 · Limited Live Batch</span>
        </div>
        <div class="url-chip">flyqdrone.in/webinar ↗</div>
      </div>
    </div>

    <div class="right-col">
      <div class="single-kit-box">
        <span class="kit-tag">OFFICIAL FLYQ DRONE KIT</span>
        <img src="{flyq_drone_uri}" alt="FLYQ Programmable Drone Kit">
      </div>
      <div class="sched-card">
        <strong>📅 MONDAY · 6:00 PM – 9:00 PM IST (3 Hours Live)</strong>
        <span>Free Drone Robotics Session + Verified Certificate (₹99 Pass / ₹499 Notes Bundle)</span>
      </div>
      <div class="sold-bar">
        <strong style="color:#fde047">🔥 1,500+ FLYQ Kits Sold Out</strong>
        <span style="color:#93c5fd;font-weight:700">20+ Aerospace &amp; Campus Partners</span>
      </div>
    </div>
  </div>
</body>
</html>"""

    pad = "54px 50px" if is_story else ("40px 44px" if is_portrait else "30px 38px")
    h1_size = "62px" if is_story else ("52px" if is_portrait else "43px")
    lead_size = "21px" if is_story else ("18.5px" if is_portrait else "16px")
    img_h = "420px" if is_story else ("295px" if is_portrait else "225px")

    return f"""<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;700&family=Manrope:wght@700;800&display=swap" rel="stylesheet">
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  html, body {{
    width: {width}px;
    height: {height}px;
    overflow: hidden;
    font-family: 'DM Sans', 'Segoe UI', Arial, sans-serif;
    background: #050b16;
    color: #ffffff;
  }}
  .canvas {{
    width: {width}px;
    height: {height}px;
    padding: {pad};
    background:
      radial-gradient(circle at 86% 14%, rgba(34,92,236,0.52), transparent 42%),
      radial-gradient(circle at 14% 86%, rgba(16,185,129,0.32), transparent 42%),
      linear-gradient(160deg, #040914 0%, #0a162e 52%, #0f2147 100%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    border: 2px solid rgba(96,165,250,0.3);
  }}
  .grid-overlay {{
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
  }}
  .top-row {{
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }}
  .brand-pill {{
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: rgba(255,255,255,0.97);
    padding: 9px 18px;
    border-radius: 13px;
    box-shadow: 0 10px 28px rgba(0,0,0,0.35);
  }}
  .brand-pill img {{
    height: 30px;
    width: auto;
    display: block;
  }}
  .brand-pill span {{
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    font-size: 12.5px;
    color: #1e3a8a;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border-left: 2px solid #cbd5e1;
    padding-left: 10px;
  }}
  .collab-banner {{
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: linear-gradient(90deg, rgba(236,72,153,0.24) 0%, rgba(139,92,246,0.28) 100%);
    border: 2px solid #f472b6;
    color: #fdf2f8;
    padding: 9px 18px;
    border-radius: 99px;
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    font-size: 14px;
    box-shadow: 0 8px 24px rgba(236,72,153,0.25);
  }}
  .ig-dot {{
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: linear-gradient(45deg, #f59e0b, #ec4899, #8b5cf6);
  }}

  .hero-block {{
    position: relative;
    z-index: 2;
  }}
  .kicker-row {{
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
    flex-wrap: wrap;
  }}
  .kicker {{
    display: inline-block;
    background: rgba(16,185,129,0.2);
    border: 1.5px solid #34d399;
    color: #6ee7b7;
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    font-size: 13px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: 99px;
  }}
  .sold-pill {{
    display: inline-block;
    background: rgba(239,68,68,0.2);
    border: 1.5px solid #f87171;
    color: #fecaca;
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    font-size: 12.5px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: 99px;
  }}
  h1 {{
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    font-size: {h1_size};
    line-height: 1.04;
    letter-spacing: -0.035em;
    color: #ffffff;
    margin-bottom: 12px;
  }}
  h1 em {{
    font-style: normal;
    background: linear-gradient(90deg, #38bdf8 0%, #4ade80 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }}
  .sublead {{
    font-size: {lead_size};
    color: #cbd5e1;
    line-height: 1.44;
    max-width: 960px;
  }}
  .sublead strong {{ color: #ffffff; }}

  .middle-grid {{
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 1.08fr 0.92fr;
    gap: 20px;
    align-items: stretch;
  }}
  .photo-panel {{
    background: rgba(15,23,42,0.88);
    border: 2px solid rgba(147,197,253,0.34);
    border-radius: 22px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 18px 40px rgba(0,0,0,0.45);
  }}
  .single-kit-frame {{
    width: 100%;
    height: {img_h};
    border-radius: 16px;
    border: 2px solid rgba(96,165,250,0.45);
    background: #090f1d;
    margin-bottom: 12px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }}
  .single-kit-frame img {{
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }}
  .kit-badge-overlay {{
    position: absolute;
    top: 12px;
    left: 12px;
    background: rgba(15,23,42,0.92);
    border: 1.5px solid #38bdf8;
    color: #7dd3fc;
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    font-size: 11.5px;
    letter-spacing: 0.08em;
    padding: 5px 12px;
    border-radius: 99px;
    text-transform: uppercase;
  }}
  .schedule-bar {{
    background: linear-gradient(90deg, rgba(34,92,236,0.28), rgba(16,185,129,0.22));
    border: 1.5px solid rgba(96,165,250,0.42);
    border-radius: 14px;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }}
  .schedule-bar strong {{
    display: block;
    font-family: 'Manrope', sans-serif;
    font-size: 16.5px;
    color: #ffffff;
  }}
  .schedule-bar span {{
    font-size: 13px;
    color: #93c5fd;
    font-weight: 700;
  }}
  .cert-pill {{
    background: #16a34a;
    color: #ffffff;
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    font-size: 12px;
    padding: 7px 13px;
    border-radius: 99px;
    letter-spacing: 0.06em;
  }}

  .pricing-stack {{
    display: flex;
    flex-direction: column;
    gap: 14px;
    justify-content: space-between;
  }}
  .price-card {{
    background: rgba(15,23,42,0.88);
    border: 2px solid rgba(148,163,184,0.3);
    border-radius: 20px;
    padding: 16px 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }}
  .price-card.featured {{
    background: linear-gradient(145deg, rgba(16,185,129,0.22) 0%, rgba(15,23,42,0.95) 100%);
    border: 2px solid #4ade80;
    box-shadow: 0 14px 32px rgba(16,185,129,0.22);
  }}
  .price-top {{
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 5px;
  }}
  .price-tag {{
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    font-size: 32px;
    color: #4ade80;
    line-height: 1;
  }}
  .price-tag s {{
    font-size: 16px;
    color: #64748b;
    font-weight: 600;
    margin-left: 6px;
  }}
  .plan-pill {{
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 5px 11px;
    border-radius: 99px;
    background: rgba(74,222,128,0.18);
    color: #86efac;
  }}
  .price-card h3 {{
    font-family: 'Manrope', sans-serif;
    font-size: 18px;
    color: #ffffff;
    margin-bottom: 4px;
  }}
  .price-card p {{
    font-size: 13px;
    color: #cbd5e1;
    line-height: 1.4;
  }}

  .features-strip {{
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }}
  .feat-box {{
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.14);
    border-radius: 14px;
    padding: 12px 14px;
  }}
  .feat-box strong {{
    display: block;
    font-family: 'Manrope', sans-serif;
    font-size: 14px;
    color: #38bdf8;
    margin-bottom: 2px;
  }}
  .feat-box span {{
    font-size: 12px;
    color: #e2e8f0;
    line-height: 1.35;
    display: block;
  }}

  .bottom-cta {{
    position: relative;
    z-index: 2;
    background: linear-gradient(90deg, #1d4ed8 0%, #2563eb 55%, #0284c7 100%);
    border-radius: 20px;
    padding: 16px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 18px 40px rgba(34,92,236,0.45);
    border: 2px solid rgba(191,219,254,0.55);
  }}
  .trust-text strong {{
    display: block;
    font-family: 'Manrope', sans-serif;
    font-size: 18px;
    color: #ffffff;
    margin-bottom: 2px;
  }}
  .trust-text span {{
    font-size: 13px;
    color: #dbeafe;
    font-weight: 700;
  }}
  .url-box {{
    text-align: right;
  }}
  .cta-btn {{
    display: inline-block;
    background: #4ade80;
    color: #052e16;
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    font-size: 18px;
    padding: 12px 22px;
    border-radius: 12px;
    letter-spacing: -0.01em;
    box-shadow: 0 8px 20px rgba(0,0,0,0.28);
  }}
</style>
</head>
<body>
  <div class="canvas">
    <div class="grid-overlay"></div>

    <div class="top-row">
      <div class="brand-pill">
        <img src="{logo_uri}" alt="FLYQ">
        <span>FLYQ Drone Robotics</span>
      </div>
      <div class="collab-banner">
        <span class="ig-dot"></span>
        COLLAB: @theprofessorhulk × @passion3dworld
      </div>
    </div>

    <div class="hero-block">
      <div class="kicker-row">
        <span class="kicker">● FREE DRONE ROBOTICS SESSION + FREE VERIFIED CERTIFICATE</span>
        <span class="sold-pill">🔥 1,500+ FLYQ KITS SOLD OUT</span>
      </div>
      <h1>Build, Code &amp; Fly Your First <em>Autonomous Drone.</em></h1>
      <p class="sublead">Join our <strong>3-Hour Live Drone Robotics Masterclass</strong> this <strong>Monday (6:00 PM – 9:00 PM IST)</strong>. Master the <strong>FLYQ Programmable Drone Kit (ESP32-S3)</strong>, <strong>3D Simulator Coding</strong> &amp; <strong>AI Vision</strong>.</p>
    </div>

    <div class="middle-grid">
      <div class="photo-panel">
        <div class="single-kit-frame">
          <span class="kit-badge-overlay">OFFICIAL FLYQ DRONE KIT</span>
          <img src="{flyq_drone_uri}" alt="FLYQ Programmable Drone Kit">
        </div>
        <div class="schedule-bar">
          <div>
            <strong>Monday · 6:00 PM to 9:00 PM IST</strong>
            <span>3 Hours Live Online · Register at flyqdrone.in/webinar</span>
          </div>
          <span class="cert-pill">🎓 FREE CERTIFICATE</span>
        </div>
      </div>

      <div class="pricing-stack">
        <div class="price-card featured">
          <div class="price-top">
            <div class="price-tag">FREE <s>CERT</s> + ₹99</div>
            <span class="plan-pill">★ STUDENT LIVE PASS</span>
          </div>
          <h3>Free Drone Robotics Session + Certificate</h3>
          <p>3-Hour Live Robotics Bootcamp + Official Verified Certificate + FLYQ Kit Guide PDF.</p>
        </div>

        <div class="price-card">
          <div class="price-top">
            <div class="price-tag" style="color:#60a5fa">₹499 <s>₹2,499</s></div>
            <span class="plan-pill" style="background:#225cec;color:#fff">NOTES + RECORDING</span>
          </div>
          <h3>Complete Bundle (+85-Page Notes &amp; HD Video)</h3>
          <p>Includes Lifetime 3-Hr HD Recording + Complete Circuit Diagrams &amp; Python Flight Code.</p>
        </div>
      </div>
    </div>

    <div class="features-strip">
      <div class="feat-box">
        <strong>01 / ESP32-S3 Avionics</strong>
        <span>6-Axis IMU, MOSFETs &amp; PID loop</span>
      </div>
      <div class="feat-box">
        <strong>02 / 3D Flight Studio</strong>
        <span>Blockly &amp; Python flight coding</span>
      </div>
      <div class="feat-box">
        <strong>03 / AI Camera Vision</strong>
        <span>UDP telemetry &amp; OpenCV tracking</span>
      </div>
      <div class="feat-box">
        <strong>04 / 20+ Industry Partners</strong>
        <span>Supplied to NRSC-ISRO &amp; IIT clubs</span>
      </div>
    </div>

    <div class="bottom-cta">
      <div class="trust-text">
        <strong>🔗 Register Now: https://flyqdrone.in/webinar</strong>
        <span>Insta Collab: @theprofessorhulk × @passion3dworld · WhatsApp: +91 91373 61474</span>
      </div>
      <div class="url-box">
        <div class="cta-btn">flyqdrone.in/webinar ↗</div>
      </div>
    </div>
  </div>
</body>
</html>"""


chrome_exe = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
if not os.path.exists(chrome_exe):
    chrome_exe = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

posters = [
    ("FLYQ-LinkedIn-Drone-Robotics-Post-1080x1350.png", 1080, 1350, "linkedin_portrait"),
    ("FLYQ-Instagram-Facebook-Post-Collab-1080x1080.png", 1080, 1080, "insta_square"),
    ("FLYQ-Insta-FB-Story-Collab-1080x1920.png", 1080, 1920, "story"),
    ("FLYQ-Facebook-LinkedIn-Banner-1200x630.png", 1200, 630, "fb_landscape"),
    # Also overwrite the earlier filenames so every file in the kit uses this exact FLYQ drone image
    ("FLYQ-Instagram-Poster-1080x1080.png", 1080, 1080, "insta_square"),
    ("FLYQ-LinkedIn-Poster-1080x1350.png", 1080, 1350, "linkedin_portrait"),
    ("FLYQ-Instagram-Story-1080x1920.png", 1080, 1920, "story"),
]

for filename, w, h, mode in posters:
    html_path = SCRATCH_DIR / f"temp_exact_{filename}.html"
    html_path.write_text(build_single_kit_poster_html(w, h, mode), encoding="utf-8")
    out_png = OUT_DIR / filename
    cmd = [
        chrome_exe,
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        "--force-device-scale-factor=1",
        f"--window-size={w},{h + 120}",
        f"--screenshot={out_png}",
        html_path.as_uri(),
    ]
    subprocess.run(cmd, check=True)
    im = Image.open(out_png)
    if im.size != (w, h):
        im = im.crop((0, 0, w, h))
        im.save(out_png, "PNG", optimize=True)
    shutil.copy2(out_png, ARTIFACT_DIR / filename)
    print(f"Rendered {filename} ({w}x{h}) -> {out_png}")
