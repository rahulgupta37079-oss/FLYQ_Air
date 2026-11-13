import base64
import math
import os
import shutil
import struct
import subprocess
import wave
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import imageio_ffmpeg

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
drone_uri = b64_uri(
    r"C:\Users\PROFESSORHULK\.gemini\antigravity\scratch\flyq-webinar-release\private-backups\flyq-workshops\2026-11-13T07-56-34-169Z\modules\nrsc-demo.jpg"
    if Path(r"C:\Users\PROFESSORHULK\.gemini\antigravity\scratch\flyq-webinar-release\private-backups\flyq-workshops\2026-11-13T07-56-34-169Z\modules\nrsc-demo.jpg").exists()
    else r"C:\Users\PROFESSORHULK\FLYQ_Air\FLYQ_Air\public\images\products\assembled-drone.jpg"
)
studio_drone_uri = b64_uri(
    r"C:\Users\PROFESSORHULK\FLYQ_Air\FLYQ_Air\public\images\products\assembled-drone.jpg"
)
comp_uri = b64_uri(
    r"C:\Users\PROFESSORHULK\Downloads\FLYQ-PRIVATE-CLOUDFLARE\FLYQ-PRIVATE-CLOUDFLARE\app\public\images\components.png",
    "image/png",
)
s1_uri = b64_uri(ARTIFACT_DIR / "student_1_1794558728764.jpg")
s2_uri = b64_uri(ARTIFACT_DIR / "student_2_1794558746251.jpg")
s3_uri = b64_uri(ARTIFACT_DIR / "student_3_1794558766586.jpg")
s4_uri = b64_uri(ARTIFACT_DIR / "student_4_1794558784516.jpg")
s5_uri = b64_uri(ARTIFACT_DIR / "student_5_1794558802010.jpg")


def build_poster_html(width, height, mode="square"):
    is_story = mode == "story"
    is_portrait = mode == "portrait"
    pad = "56px 52px" if is_story else ("44px 48px" if is_portrait else "36px 44px")
    h1_size = "68px" if is_story else ("58px" if is_portrait else "50px")
    lead_size = "23px" if is_story else ("20px" if is_portrait else "18px")
    img_h = "360px" if is_story else ("270px" if is_portrait else "215px")

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
    background: #060d1a;
    color: #ffffff;
  }}
  .canvas {{
    width: {width}px;
    height: {height}px;
    padding: {pad};
    background:
      radial-gradient(circle at 86% 16%, rgba(34,92,236,0.48), transparent 42%),
      radial-gradient(circle at 12% 84%, rgba(16,185,129,0.28), transparent 42%),
      linear-gradient(160deg, #050b16 0%, #0b1730 52%, #0f2147 100%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    border: 2px solid rgba(96,165,250,0.25);
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
  }}
  .brand-pill {{
    display: inline-flex;
    align-items: center;
    gap: 14px;
    background: rgba(255,255,255,0.95);
    padding: 10px 20px;
    border-radius: 14px;
    box-shadow: 0 10px 28px rgba(0,0,0,0.35);
  }}
  .brand-pill img {{
    height: 34px;
    width: auto;
    display: block;
  }}
  .brand-pill span {{
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    font-size: 13px;
    color: #1e3a8a;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border-left: 2px solid #cbd5e1;
    padding-left: 12px;
  }}
  .live-badge {{
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: rgba(16,185,129,0.2);
    border: 2px solid #34d399;
    color: #6ee7b7;
    padding: 10px 20px;
    border-radius: 99px;
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    font-size: 15px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }}
  .live-dot {{
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: #34d399;
    box-shadow: 0 0 12px #34d399;
  }}

  .hero-block {{
    position: relative;
    z-index: 2;
  }}
  .kicker {{
    display: inline-block;
    color: #7dd3fc;
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    font-size: 15px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-bottom: 10px;
  }}
  h1 {{
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    font-size: {h1_size};
    line-height: 1.04;
    letter-spacing: -0.035em;
    color: #ffffff;
    margin-bottom: 14px;
  }}
  h1 em {{
    font-style: normal;
    background: linear-gradient(90deg, #60a5fa 0%, #4ade80 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }}
  .sublead {{
    font-size: {lead_size};
    color: #cbd5e1;
    line-height: 1.45;
    max-width: 920px;
  }}
  .sublead strong {{ color: #ffffff; }}

  .middle-grid {{
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 1.08fr 0.92fr;
    gap: 24px;
    align-items: stretch;
  }}
  .photo-panel {{
    background: rgba(15,23,42,0.85);
    border: 2px solid rgba(147,197,253,0.3);
    border-radius: 22px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 18px 40px rgba(0,0,0,0.45);
  }}
  .photo-row {{
    display: grid;
    grid-template-columns: 1.35fr 0.65fr;
    gap: 12px;
    margin-bottom: 12px;
  }}
  .photo-row img {{
    width: 100%;
    height: {img_h};
    object-fit: contain;
    padding: 8px;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.18);
    background: #ffffff;
  }}
  .schedule-bar {{
    background: linear-gradient(90deg, #1e3a8a, #225cec);
    border-radius: 14px;
    padding: 14px 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }}
  .schedule-bar strong {{
    font-family: 'Manrope', sans-serif;
    font-size: 18px;
    font-weight: 800;
    color: #fff;
    display: block;
  }}
  .schedule-bar span {{
    font-size: 13.5px;
    color: #dbeafe;
  }}
  .schedule-bar .cert-pill {{
    background: #fde047;
    color: #0f172a !important;
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    font-size: 13.5px;
    padding: 9px 15px;
    border-radius: 99px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    white-space: nowrap;
    box-shadow: 0 4px 12px rgba(0,0,0,0.25);
  }}

  .pricing-stack {{
    display: flex;
    flex-direction: column;
    gap: 14px;
    justify-content: space-between;
  }}
  .price-card {{
    background: rgba(15,23,42,0.9);
    border: 2px solid rgba(148,163,184,0.3);
    border-radius: 20px;
    padding: 18px 22px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
  }}
  .price-card.featured {{
    background: linear-gradient(145deg, rgba(30,58,138,0.85), rgba(15,23,42,0.95));
    border: 2px solid #4ade80;
    box-shadow: 0 12px 32px rgba(74,222,128,0.18);
  }}
  .price-top {{
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 6px;
  }}
  .price-tag {{
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    font-size: 44px;
    line-height: 1;
    color: #4ade80;
    letter-spacing: -0.04em;
  }}
  .price-tag s {{
    font-size: 20px;
    color: #94a3b8;
    margin-left: 8px;
    font-weight: 600;
  }}
  .plan-pill {{
    background: rgba(74,222,128,0.2);
    color: #86efac;
    font-size: 12px;
    font-weight: 800;
    padding: 5px 12px;
    border-radius: 99px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }}
  .price-card h3 {{
    font-family: 'Manrope', sans-serif;
    font-size: 19px;
    font-weight: 800;
    color: #fff;
    margin-bottom: 4px;
  }}
  .price-card p {{
    font-size: 14px;
    color: #cbd5e1;
    line-height: 1.4;
  }}

  .features-strip {{
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
  }}
  .feat-box {{
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.14);
    border-radius: 14px;
    padding: 13px 15px;
  }}
  .feat-box strong {{
    display: block;
    font-family: 'Manrope', sans-serif;
    font-size: 15px;
    color: #7dd3fc;
    margin-bottom: 2px;
  }}
  .feat-box span {{
    font-size: 12.5px;
    color: #e2e8f0;
  }}

  .bottom-cta {{
    position: relative;
    z-index: 2;
    background: #ffffff;
    color: #0f172a;
    border-radius: 20px;
    padding: 18px 26px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 20px 50px rgba(0,0,0,0.45);
  }}
  .student-trust {{
    display: flex;
    align-items: center;
    gap: 14px;
  }}
  .avatar-stack {{
    display: flex;
    align-items: center;
  }}
  .avatar-stack img {{
    width: 46px;
    height: 46px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #fff;
    margin-left: -12px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  }}
  .avatar-stack img:first-child {{ margin-left: 0; }}
  .trust-text strong {{
    display: block;
    font-family: 'Manrope', sans-serif;
    font-size: 16px;
    font-weight: 800;
    color: #0f172a;
  }}
  .trust-text span {{
    font-size: 13px;
    color: #475569;
    font-weight: 600;
  }}
  .url-box {{
    display: flex;
    align-items: center;
    gap: 16px;
  }}
  .cta-btn {{
    background: linear-gradient(135deg, #225cec, #1d4ed8);
    color: #ffffff;
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    font-size: 20px;
    padding: 14px 26px;
    border-radius: 14px;
    letter-spacing: -0.01em;
    box-shadow: 0 10px 24px rgba(34,92,236,0.38);
  }}
</style>
</head>
<body>
  <div class="canvas">
    <div class="grid-overlay"></div>

    <div class="top-row">
      <div class="brand-pill">
        <img src="{logo_uri}" alt="FLYQ">
        <span>FLYQ Drones Academy</span>
      </div>
      <div class="live-badge">
        <span class="live-dot"></span>
        MONDAY · 6:00 PM – 9:00 PM IST
      </div>
    </div>

    <div class="hero-block">
      <div class="kicker">✦ 3-HOUR LIVE HANDS-ON DRONE ENGINEERING BOOTCAMP</div>
      <h1>Build, Code &amp; Fly Your First <em>Programmable Drone.</em></h1>
      <p class="sublead">Master <strong>ESP32-S3 Flight Controllers</strong>, <strong>Quadcopter Physics</strong>, <strong>3D Simulator Coding</strong> &amp; <strong>AI Camera Vision</strong> — Guided Live by FLYQ Engineers.</p>
    </div>

    <div class="middle-grid">
      <div class="photo-panel">
        <div class="photo-row">
          <img src="{drone_uri}" alt="FLYQ Drone">
          <img src="{comp_uri}" alt="Components">
        </div>
        <div class="schedule-bar">
          <div>
            <strong>Every Monday · 6:00 PM to 9:00 PM IST</strong>
            <span>3 Hours Live Online · Zero Prior Coding Needed</span>
          </div>
          <span class="cert-pill">🎓 FREE CERTIFICATE</span>
        </div>
      </div>

      <div class="pricing-stack">
        <div class="price-card">
          <div class="price-top">
            <div class="price-tag">₹99 <s>₹999</s></div>
            <span class="plan-pill">SAVE 90% · LIVE PASS</span>
          </div>
          <h3>3-Hour Live Bootcamp + Free Certificate</h3>
          <p>Live interactive session + Verified FLYQ Certificate + Drone Kit Guide PDF.</p>
        </div>

        <div class="price-card featured">
          <div class="price-top">
            <div class="price-tag">₹499 <s>₹2,499</s></div>
            <span class="plan-pill" style="background:#225cec;color:#fff">★ NOTES + RECORDINGS</span>
          </div>
          <h3>Live Pass + HD Recording + 85-Page Notes</h3>
          <p>Includes Lifetime 3-Hr HD Recording + Complete Engineering Notes &amp; Code Pack.</p>
        </div>
      </div>
    </div>

    <div class="features-strip">
      <div class="feat-box">
        <strong>01 / ESP32-S3 Hardware</strong>
        <span>Flight controller, IMU sensors &amp; motors</span>
      </div>
      <div class="feat-box">
        <strong>02 / 3D Flight Studio</strong>
        <span>Blockly &amp; Python autonomous missions</span>
      </div>
      <div class="feat-box">
        <strong>03 / AI Camera Vision</strong>
        <span>Wi-Fi telemetry &amp; computer vision</span>
      </div>
      <div class="feat-box">
        <strong>04 / Verified Credential</strong>
        <span>Resume &amp; LinkedIn ready certificate</span>
      </div>
    </div>

    <div class="bottom-cta">
      <div class="student-trust">
        <div class="avatar-stack">
          <img src="{s1_uri}" alt="">
          <img src="{s2_uri}" alt="">
          <img src="{s3_uri}" alt="">
          <img src="{s4_uri}" alt="">
          <img src="{s5_uri}" alt="">
        </div>
        <div class="trust-text">
          <strong>★★★★★ 4.9/5 Rated by 1,200+ Indian Students</strong>
          <span>WhatsApp: +91 91373 61474 · Passion 3D World, Mumbai</span>
        </div>
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
    ("FLYQ-Instagram-Poster-1080x1080.png", 1080, 1080, "square"),
    ("FLYQ-LinkedIn-Poster-1080x1350.png", 1080, 1350, "portrait"),
    ("FLYQ-Instagram-Story-1080x1920.png", 1080, 1920, "story"),
]

for filename, w, h, mode in posters:
    html_path = SCRATCH_DIR / f"temp_{mode}.html"
    html_path.write_text(build_poster_html(w, h, mode), encoding="utf-8")
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
    # Crop exact w x h from top-left
    im = Image.open(out_png).convert("RGB")
    if im.size != (w, h):
        im = im.crop((0, 0, w, h))
        im.save(out_png, format="PNG", optimize=True)
    # Also copy to artifact directory so we can embed it in our walkthrough artifact
    shutil.copy2(out_png, ARTIFACT_DIR / filename)
    print(f"Rendered poster: {out_png} ({im.size})")
    html_path.unlink(missing_ok=True)


# ==============================================================================
# PART 2: Generate 5-Second Attractive Webinar Countdown Animation (MP4 + GIF)
# ==============================================================================
print("Generating 5-Second Webinar Countdown Video Animation...")
W, H = 1080, 1080
FPS = 30
DURATION = 5.5  # 5.0s countdown (5..4..3..2..1) + 0.5s LIVE TAKEOFF finale
TOTAL_FRAMES = int(FPS * DURATION)

# Load fonts
font_bold_path = r"C:\Windows\Fonts\segoeuib.ttf"
font_reg_path = r"C:\Windows\Fonts\segoeui.ttf"
font_mono_path = r"C:\Windows\Fonts\consolab.ttf"

f_kicker = ImageFont.truetype(font_bold_path, 22)
f_title = ImageFont.truetype(font_bold_path, 44)
f_num = ImageFont.truetype(font_bold_path, 210)
f_live = ImageFont.truetype(font_bold_path, 110)
f_tele = ImageFont.truetype(font_mono_path, 24)
f_sub = ImageFont.truetype(font_reg_path, 26)
f_badge = ImageFont.truetype(font_bold_path, 26)
f_footer = ImageFont.truetype(font_bold_path, 30)

# Prepare circular drone image & logo
drone_im = Image.open(
    r"C:\Users\PROFESSORHULK\FLYQ_Air\FLYQ_Air\public\images\products\assembled-drone.jpg"
).convert("RGB")
drone_im.thumbnail((220, 160), Image.Resampling.LANCZOS)

TELEMETRY_TEXT = {
    5: "T-05s // INITIALIZING ESP32-S3 FLIGHT CONTROLLER",
    4: "T-04s // CALIBRATING 6-AXIS IMU & GYROSCOPE",
    3: "T-03s // LINKING 3D FLIGHT STUDIO SIMULATOR",
    2: "T-02s // ARMING QUAD-ROTOR PROPULSION SYSTEM",
    1: "T-01s // UNLOCKING FREE VERIFIED CERTIFICATE",
    0: "LIVE // CLEARED FOR TAKEOFF · MONDAY 6:00 PM IST",
}


def render_countdown_frame(frame_idx):
    t = frame_idx / FPS  # 0.0 to 5.5
    sec_left = max(0, 5 - int(t)) if t < 5.0 else 0
    frac = t - int(t)  # 0.0 to 1.0 within each second

    img = Image.new("RGB", (W, H), (6, 12, 26))
    draw = ImageDraw.Draw(img, "RGBA")

    # Subtle radial glow background
    cx, cy = W // 2, H // 2 - 10
    for r in range(460, 40, -35):
        alpha = int(28 * (1 - r / 460))
        col = (34, 92, 236, alpha) if sec_left > 0 else (16, 185, 129, alpha + 10)
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=col)

    # Cyber grid lines
    for gx in range(0, W, 60):
        draw.line([(gx, 0), (gx, H)], fill=(148, 163, 184, 14), width=1)
    for gy in range(0, H, 60):
        draw.line([(0, gy), (W, gy)], fill=(148, 163, 184, 14), width=1)

    # Top header pill
    draw.rounded_rectangle(
        [70, 48, W - 70, 118],
        radius=35,
        fill=(15, 23, 42, 220),
        outline=(96, 165, 250, 90),
        width=2,
    )
    draw.ellipse([98, 73, 118, 93], fill=(52, 211, 153, 255))
    draw.text(
        (134, 68),
        "FLYQ DRONES · 3-HOUR LIVE BOOTCAMP · MONDAY 6:00 PM – 9:00 PM IST",
        font=f_kicker,
        fill=(226, 232, 240, 255),
    )

    # Headline
    draw.text(
        (cx, 168),
        "BUILD, CODE & FLY YOUR FIRST DRONE",
        font=f_title,
        fill=(255, 255, 255, 255),
        anchor="mm",
    )

    # Outer radar ring & ticks
    ring_r = 225
    for deg in range(0, 360, 6):
        rad = math.radians(deg + t * 40)
        r_in = ring_r + 18 if deg % 30 == 0 else ring_r + 24
        r_out = ring_r + 34
        x1, y1 = cx + r_in * math.cos(rad), cy + r_in * math.sin(rad)
        x2, y2 = cx + r_out * math.cos(rad), cy + r_out * math.sin(rad)
        col = (96, 165, 250, 150) if deg % 30 == 0 else (96, 165, 250, 65)
        draw.line([(x1, y1), (x2, y2)], fill=col, width=3 if deg % 30 == 0 else 1)

    # Shockwave burst on each second tick
    shock_r = int(ring_r * (0.85 + 0.55 * frac))
    shock_alpha = int(max(0, 190 * (1.0 - frac * 1.25)))
    if shock_alpha > 0:
        draw.ellipse(
            [cx - shock_r, cy - shock_r, cx + shock_r, cy + shock_r],
            outline=(74, 222, 128, shock_alpha),
            width=4,
        )

    # Main countdown ring track
    bbox = [cx - ring_r, cy - ring_r, cx + ring_r, cy + ring_r]
    draw.ellipse(bbox, fill=(10, 19, 38, 235), outline=(51, 65, 85, 180), width=16)

    # Progress arc (sweeps from -90 deg clockwise)
    progress = min(1.0, t / 5.0)
    end_angle = -90 + 360 * progress
    arc_color = (56, 189, 248, 255) if sec_left > 1 else (74, 222, 128, 255)
    draw.arc(bbox, start=-90, end=end_angle, fill=arc_color, width=16)

    # Orbiting glowing dot on ring tip
    tip_rad = math.radians(end_angle)
    tx, ty = cx + ring_r * math.cos(tip_rad), cy + ring_r * math.sin(tip_rad)
    draw.ellipse([tx - 14, ty - 14, tx + 14, ty + 14], fill=(74, 222, 128, 255))

    # Central Number with pop effect
    if sec_left > 0:
        num_str = f"0{sec_left}"
        # Subtle pulse offset at start of second
        y_off = int(-12 * math.sin(min(1.0, frac * 3.0) * math.pi))
        draw.text(
            (cx, cy - 10 + y_off),
            num_str,
            font=f_num,
            fill=(255, 255, 255, 255),
            anchor="mm",
        )
        draw.text(
            (cx, cy + 125),
            "SECONDS TO LAUNCH",
            font=f_kicker,
            fill=(125, 211, 252, 255),
            anchor="mm",
        )
    else:
        draw.text(
            (cx, cy - 22),
            "LIVE!",
            font=f_live,
            fill=(74, 222, 128, 255),
            anchor="mm",
        )
        draw.text(
            (cx, cy + 75),
            "TAKEOFF READY · JOIN NOW",
            font=f_badge,
            fill=(255, 255, 255, 255),
            anchor="mm",
        )

    # Telemetry readout bar below ring
    tele_y = 815
    draw.rounded_rectangle(
        [90, tele_y - 28, W - 90, tele_y + 28],
        radius=14,
        fill=(15, 23, 42, 235),
        outline=(56, 189, 248, 120),
        width=2,
    )
    draw.text(
        (cx, tele_y),
        TELEMETRY_TEXT[sec_left],
        font=f_tele,
        fill=(74, 222, 128, 255),
        anchor="mm",
    )

    # Bottom Pricing & URL Bar
    draw.rounded_rectangle(
        [60, 880, W - 60, 1020],
        radius=22,
        fill=(255, 255, 255, 255),
    )
    draw.text(
        (100, 922),
        "₹99 Live Pass  |  ₹499 with Notes & Recordings",
        font=f_badge,
        fill=(15, 23, 42, 255),
    )
    draw.text(
        (100, 962),
        "🎓 Free Verified FLYQ Certificate Included",
        font=f_sub,
        fill=(22, 163, 74, 255),
    )
    draw.rounded_rectangle(
        [W - 395, 905, W - 85, 995],
        radius=16,
        fill=(34, 92, 236, 255),
    )
    draw.text(
        (W - 240, 950),
        "flyqdrone.in/webinar",
        font=f_badge,
        fill=(255, 255, 255, 255),
        anchor="mm",
    )

    return img


# Synthesize a crisp 5.5-second futuristic countdown audio WAV
wav_path = SCRATCH_DIR / "countdown_audio.wav"
sample_rate = 44100
total_samples = int(sample_rate * DURATION)
with wave.open(str(wav_path), "w") as wf:
    wf.setnchannels(1)
    wf.setsampwidth(2)
    wf.setframerate(sample_rate)
    samples = bytearray()
    for i in range(total_samples):
        ts = i / sample_rate
        sec_idx = int(ts)
        within = ts - sec_idx
        val = 0.0
        if ts < 5.0:
            # Crisp telemetry beep at start of each second (880Hz)
            if within < 0.14:
                env = math.sin((within / 0.14) * math.pi)
                freq = 880.0 if sec_idx < 4 else 1046.5
                val = 0.35 * env * math.sin(2 * math.pi * freq * within)
        else:
            # Launch chord at t >= 5.0s (C5 + E5 + G5)
            within_launch = ts - 5.0
            env = max(0.0, 1.0 - within_launch / 0.5)
            val = (
                0.22
                * env
                * (
                    math.sin(2 * math.pi * 523.25 * within_launch)
                    + math.sin(2 * math.pi * 659.25 * within_launch)
                    + math.sin(2 * math.pi * 783.99 * within_launch)
                )
            )
        s_int = max(-32767, min(32767, int(val * 32767)))
        samples.extend(struct.pack("<h", s_int))
    wf.writeframes(bytes(samples))

frames = [render_countdown_frame(i) for i in range(TOTAL_FRAMES)]

# Save animated GIF preview (540x540, 15fps for lightweight fast viewing)
gif_frames = [f.resize((540, 540), Image.Resampling.LANCZOS) for f in frames[::2]]
gif_out = OUT_DIR / "FLYQ-Webinar-5Sec-Countdown.gif"
gif_frames[0].save(
    gif_out,
    save_all=True,
    append_images=gif_frames[1:],
    duration=int(1000 / 15),
    loop=0,
    optimize=True,
)
shutil.copy2(gif_out, ARTIFACT_DIR / "FLYQ-Webinar-5Sec-Countdown.gif")
print(f"Saved animated GIF: {gif_out}")

# Encode 1080x1080 H.264 MP4 with audio via ffmpeg
ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
mp4_out = OUT_DIR / "FLYQ-Webinar-5Sec-Countdown-1080p.mp4"
cmd = [
    ffmpeg_exe,
    "-y",
    "-f",
    "rawvideo",
    "-vcodec",
    "rawvideo",
    "-s",
    f"{W}x{H}",
    "-pix_fmt",
    "rgb24",
    "-r",
    str(FPS),
    "-i",
    "-",
    "-i",
    str(wav_path),
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-preset",
    "fast",
    "-crf",
    "20",
    "-c:a",
    "aac",
    "-b:a",
    "128k",
    "-shortest",
    str(mp4_out),
]
proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
for f in frames:
    proc.stdin.write(f.tobytes())
proc.stdin.close()
_, err = proc.communicate()
if proc.returncode != 0:
    raise RuntimeError(f"FFmpeg failed: {err.decode('utf-8', errors='ignore')}")

shutil.copy2(mp4_out, ARTIFACT_DIR / "FLYQ-Webinar-5Sec-Countdown-1080p.mp4")
wav_path.unlink(missing_ok=True)
print(f"Saved 1080p MP4 Countdown Video: {mp4_out} ({mp4_out.stat().st_size} bytes)")
