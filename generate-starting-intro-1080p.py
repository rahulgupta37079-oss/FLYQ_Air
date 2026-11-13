import math
import shutil
import struct
import subprocess
import wave
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg

OUT_DIR = Path(r"C:\Users\PROFESSORHULK\Downloads\FLYQ-Social-Media-Kit")
ARTIFACT_DIR = Path(r"C:\Users\PROFESSORHULK\.gemini\antigravity\brain\2a52ed4d-c7f5-444a-b906-e3a15058312a")
SCRATCH_DIR = Path(r"C:\Users\PROFESSORHULK\.gemini\antigravity\scratch\flyq-webinar-release")
OUT_DIR.mkdir(parents=True, exist_ok=True)

W, H = 1920, 1080
FPS = 30
DURATION = 5.6  # 5.0s countdown + 0.6s TAKEOFF reveal
TOTAL_FRAMES = int(FPS * DURATION)

font_bold = r"C:\Windows\Fonts\segoeuib.ttf"
font_reg = r"C:\Windows\Fonts\segoeui.ttf"
font_mono = r"C:\Windows\Fonts\consolab.ttf"

f_top = ImageFont.truetype(font_bold, 22)
f_kicker = ImageFont.truetype(font_mono, 24)
f_title = ImageFont.truetype(font_bold, 54)
f_num = ImageFont.truetype(font_bold, 195)
f_live = ImageFont.truetype(font_bold, 92)
f_label = ImageFont.truetype(font_bold, 20)
f_check = ImageFont.truetype(font_bold, 22)
f_footer = ImageFont.truetype(font_bold, 26)

CHECKS = [
    (5, "ESP32-S3 Flight Controller"),
    (4, "6-Axis IMU & PID Loop"),
    (3, "3D Flight Studio Simulator"),
    (2, "AI Camera Vision Stream"),
    (1, "Free Verified Certificate"),
]

STATUS_LINES = {
    5: "● T-05s // INITIALIZING ESP32-S3 FLIGHT CONTROLLER...",
    4: "● T-04s // CALIBRATING 6-AXIS IMU & GYROSCOPE...",
    3: "● T-03s // LINKING 3D FLIGHT STUDIO SIMULATOR...",
    2: "● T-02s // ARMING QUAD-ROTOR PROPULSION SYSTEM...",
    1: "● T-01s // UNLOCKING FREE VERIFIED CERTIFICATE...",
    0: "★ CLEARED FOR TAKEOFF // WELCOME TO FLYQ LIVE BOOTCAMP!",
}


def draw_spinning_rotor(draw, rx, ry, radius, angle_deg, is_ccw=False):
    col_ring = (74, 222, 128, 160) if is_ccw else (56, 189, 248, 160)
    col_blade = (74, 222, 128, 230) if is_ccw else (56, 189, 248, 230)
    draw.ellipse(
        [rx - radius, ry - radius, rx + radius, ry + radius],
        fill=(15, 23, 42, 200),
        outline=col_ring,
        width=3,
    )
    # Draw 2 crossed propeller blades rotated by angle_deg
    for offset in (0, 90):
        rad = math.radians(angle_deg + offset)
        bx1 = rx - (radius - 10) * math.cos(rad)
        by1 = ry - (radius - 10) * math.sin(rad)
        bx2 = rx + (radius - 10) * math.cos(rad)
        by2 = ry + (radius - 10) * math.sin(rad)
        draw.line([(bx1, by1), (bx2, by2)], fill=col_blade, width=7)
    draw.ellipse([rx - 8, ry - 8, rx + 8, ry + 8], fill=(255, 255, 255, 255))


def render_frame(idx):
    t = idx / FPS
    sec_left = max(0, 5 - int(t)) if t < 5.0 else 0
    frac = t - int(t)

    img = Image.new("RGB", (W, H), (4, 9, 22))
    draw = ImageDraw.Draw(img, "RGBA")

    cx, cy = W // 2, H // 2 + 10

    # Radial glow
    for r in range(560, 40, -45):
        alpha = int(32 * (1 - r / 560))
        c = (34, 92, 236, alpha) if sec_left > 0 else (16, 185, 129, alpha + 12)
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=c)

    # Moving cyber grid
    y_shift = int((t * 60) % 60)
    for gx in range(0, W, 60):
        draw.line([(gx, 0), (gx, H)], fill=(56, 189, 248, 16), width=1)
    for gy in range(-60 + y_shift, H, 60):
        draw.line([(0, gy), (W, gy)], fill=(56, 189, 248, 16), width=1)

    # Top badge
    draw.rounded_rectangle(
        [cx - 420, 36, cx + 420, 94],
        radius=30,
        fill=(15, 23, 42, 230),
        outline=(96, 165, 250, 110),
        width=2,
    )
    draw.ellipse([cx - 390, 55, cx - 370, 75], fill=(52, 211, 153, 255))
    draw.text(
        (cx + 15, 65),
        "FLYQ DRONES ACADEMY · MONDAY · 6:00 PM – 9:00 PM IST",
        font=f_top,
        fill=(224, 242, 254, 255),
        anchor="mm",
    )

    # Kicker & Title
    draw.text(
        (cx, 138),
        STATUS_LINES[sec_left],
        font=f_kicker,
        fill=(74, 222, 128, 255),
        anchor="mm",
    )
    draw.text(
        (cx, 198),
        "Build, Code & Fly Your First Programmable Drone",
        font=f_title,
        fill=(255, 255, 255, 255),
        anchor="mm",
    )

    # Quadcopter X-frame arms & 4 spinning rotors around the central HUD
    ring_r = 195
    arm_offset = 175
    rotor_positions = [
        (cx - arm_offset, cy - arm_offset, False),
        (cx + arm_offset, cy - arm_offset, True),
        (cx - arm_offset, cy + arm_offset, True),
        (cx + arm_offset, cy + arm_offset, False),
    ]
    # Diagonal carbon-style arms
    for rx, ry, _ in rotor_positions:
        draw.line([(cx, cy), (rx, ry)], fill=(51, 65, 85, 200), width=10)
        draw.line([(cx, cy), (rx, ry)], fill=(96, 165, 250, 90), width=3)

    # Spin speed accelerates as t goes 0 -> 5
    spin_angle = t * (420 + t * 140)
    for rx, ry, is_ccw in rotor_positions:
        ang = -spin_angle if is_ccw else spin_angle
        draw_spinning_rotor(draw, rx, ry, 54, ang, is_ccw)

    # Shockwave burst
    shock_r = int(ring_r * (0.9 + 0.55 * frac))
    shock_alpha = int(max(0, 200 * (1.0 - frac * 1.25)))
    if shock_alpha > 0:
        draw.ellipse(
            [cx - shock_r, cy - shock_r, cx + shock_r, cy + shock_r],
            outline=(74, 222, 128, shock_alpha),
            width=4,
        )

    # Central HUD Ring
    bbox = [cx - ring_r, cy - ring_r, cx + ring_r, cy + ring_r]
    draw.ellipse(bbox, fill=(8, 15, 32, 242), outline=(51, 65, 85, 200), width=14)

    progress = min(1.0, t / 5.0)
    end_ang = -90 + 360 * progress
    arc_col = (56, 189, 248, 255) if sec_left > 1 else (74, 222, 128, 255)
    draw.arc(bbox, start=-90, end=end_ang, fill=arc_col, width=14)

    if sec_left > 0:
        y_pop = int(-10 * math.sin(min(1.0, frac * 3.0) * math.pi))
        draw.text(
            (cx, cy - 12 + y_pop),
            f"0{sec_left}",
            font=f_num,
            fill=(255, 255, 255, 255),
            anchor="mm",
        )
        draw.text(
            (cx, cy + 112),
            "SECONDS TO LAUNCH",
            font=f_label,
            fill=(147, 197, 253, 255),
            anchor="mm",
        )
    else:
        draw.text(
            (cx, cy - 18),
            "LIVE!",
            font=f_live,
            fill=(74, 222, 128, 255),
            anchor="mm",
        )
        draw.text(
            (cx, cy + 72),
            "CLEARED FOR TAKEOFF",
            font=f_label,
            fill=(255, 255, 255, 255),
            anchor="mm",
        )

    # 5 Telemetry Checklist Pills below HUD
    pill_y = 835
    total_w = 1660
    start_x = (W - total_w) // 2
    pill_w = 316
    gap = 20
    for i, (step_num, label) in enumerate(CHECKS):
        px = start_x + i * (pill_w + gap)
        is_done = step_num >= sec_left
        bg = (16, 185, 129, 55) if is_done else (15, 23, 42, 210)
        border = (52, 211, 153, 230) if is_done else (100, 116, 139, 90)
        txt_col = (236, 253, 245, 255) if is_done else (148, 163, 184, 200)
        draw.rounded_rectangle(
            [px, pill_y, px + pill_w, pill_y + 54],
            radius=27,
            fill=bg,
            outline=border,
            width=2,
        )
        prefix = "✓ " if is_done else "○ "
        draw.text(
            (px + pill_w // 2, pill_y + 27),
            prefix + label,
            font=f_check,
            fill=txt_col,
            anchor="mm",
        )

    # Bottom progress bar & footer
    bar_x1, bar_x2 = 260, W - 260
    bar_y = 935
    draw.rounded_rectangle(
        [bar_x1, bar_y, bar_x2, bar_y + 12],
        radius=6,
        fill=(30, 41, 59, 220),
    )
    fill_w = int((bar_x2 - bar_x1) * progress)
    if fill_w > 12:
        draw.rounded_rectangle(
            [bar_x1, bar_y, bar_x1 + fill_w, bar_y + 12],
            radius=6,
            fill=(74, 222, 128, 255),
        )

    draw.text(
        (cx, 995),
        "3-Hour Live Bootcamp  ·  ₹99 Live Pass  |  ₹499 Notes + Recordings Bundle  ·  flyqdrone.in/webinar",
        font=f_footer,
        fill=(203, 213, 225, 255),
        anchor="mm",
    )

    return img


# Synthesize turbine + countdown beep audio
wav_path = SCRATCH_DIR / "starting_intro_audio.wav"
sr = 44100
total_s = int(sr * DURATION)
with wave.open(str(wav_path), "w") as wf:
    wf.setnchannels(1)
    wf.setsampwidth(2)
    wf.setframerate(sr)
    buf = bytearray()
    for i in range(total_s):
        ts = i / sr
        sec_idx = int(ts)
        within = ts - sec_idx
        val = 0.0
        # Subtle rising drone rotor hum (120Hz -> 320Hz)
        hum_freq = 120.0 + 40.0 * min(5.0, ts)
        val += 0.06 * math.sin(2 * math.pi * hum_freq * ts)
        if ts < 5.0:
            if within < 0.15:
                env = math.sin((within / 0.15) * math.pi)
                beep_f = 880.0 if sec_idx < 4 else 1046.5
                val += 0.36 * env * math.sin(2 * math.pi * beep_f * within)
        else:
            w_l = ts - 5.0
            env = max(0.0, 1.0 - w_l / 0.6)
            val += (
                0.24
                * env
                * (
                    math.sin(2 * math.pi * 523.25 * w_l)
                    + math.sin(2 * math.pi * 659.25 * w_l)
                    + math.sin(2 * math.pi * 783.99 * w_l)
                    + math.sin(2 * math.pi * 1046.5 * w_l)
                )
            )
        s_int = max(-32767, min(32767, int(val * 32767)))
        buf.extend(struct.pack("<h", s_int))
    wf.writeframes(bytes(buf))

frames = [render_frame(i) for i in range(TOTAL_FRAMES)]

# Save widescreen GIF preview (768x432, 15fps)
gif_frames = [f.resize((768, 432), Image.Resampling.LANCZOS) for f in frames[::2]]
gif_out = OUT_DIR / "FLYQ-Webinar-Starting-Intro-16x9.gif"
gif_frames[0].save(
    gif_out,
    save_all=True,
    append_images=gif_frames[1:],
    duration=int(1000 / 15),
    loop=0,
    optimize=True,
)
shutil.copy2(gif_out, ARTIFACT_DIR / "FLYQ-Webinar-Starting-Intro-16x9.gif")

# Encode 1920x1080 Full-HD MP4
ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
mp4_out = OUT_DIR / "FLYQ-Webinar-Starting-Intro-1920x1080.mp4"
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
    "19",
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

shutil.copy2(mp4_out, ARTIFACT_DIR / "FLYQ-Webinar-Starting-Intro-1920x1080.mp4")
wav_path.unlink(missing_ok=True)
print(f"Saved 1920x1080 Widescreen Starting Intro MP4: {mp4_out} ({mp4_out.stat().st_size} bytes)")
