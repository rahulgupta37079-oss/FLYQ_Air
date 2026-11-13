from PIL import Image
import base64
import io
import json

sources = {
    "/flyq-design/webinar/student-1.jpg": (
        r"C:\Users\PROFESSORHULK\.gemini\antigravity\brain\2a52ed4d-c7f5-444a-b906-e3a15058312a\student_1_1794558728764.jpg",
        (360, 360),
        84,
    ),
    "/flyq-design/webinar/student-2.jpg": (
        r"C:\Users\PROFESSORHULK\.gemini\antigravity\brain\2a52ed4d-c7f5-444a-b906-e3a15058312a\student_2_1794558746251.jpg",
        (360, 360),
        84,
    ),
    "/flyq-design/webinar/student-3.jpg": (
        r"C:\Users\PROFESSORHULK\.gemini\antigravity\brain\2a52ed4d-c7f5-444a-b906-e3a15058312a\student_3_1794558766586.jpg",
        (360, 360),
        84,
    ),
    "/flyq-design/webinar/student-4.jpg": (
        r"C:\Users\PROFESSORHULK\.gemini\antigravity\brain\2a52ed4d-c7f5-444a-b906-e3a15058312a\student_4_1794558784516.jpg",
        (360, 360),
        84,
    ),
    "/flyq-design/webinar/student-5.jpg": (
        r"C:\Users\PROFESSORHULK\.gemini\antigravity\brain\2a52ed4d-c7f5-444a-b906-e3a15058312a\student_5_1794558802010.jpg",
        (360, 360),
        84,
    ),
    "/flyq-design/webinar/components.jpg": (
        r"C:\Users\PROFESSORHULK\Downloads\FLYQ-PRIVATE-CLOUDFLARE\FLYQ-PRIVATE-CLOUDFLARE\app\public\images\components.png",
        (600, 600),
        85,
    ),
    "/flyq-design/webinar/assembled-drone.jpg": (
        r"C:\Users\PROFESSORHULK\FLYQ_Air\FLYQ_Air\public\images\products\assembled-drone.jpg",
        (720, 540),
        84,
    ),
}

out_map = {}
total_bytes = 0
for route, (src_path, max_size, quality) in sources.items():
    im = Image.open(src_path)
    if im.mode in ("RGBA", "P"):
        bg = Image.new("RGB", im.size, (255, 255, 255))
        if im.mode == "RGBA":
            bg.paste(im, mask=im.split()[3])
        else:
            bg.paste(im)
        im = bg
    else:
        im = im.convert("RGB")
    im.thumbnail(max_size, Image.Resampling.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, format="JPEG", quality=quality, optimize=True)
    raw = buf.getvalue()
    total_bytes += len(raw)
    out_map[route] = base64.b64encode(raw).decode("ascii")
    print(f"{route}: {im.size} -> {len(raw)} bytes")

print(f"Total compressed image payload: {total_bytes} bytes")

mjs_code = f"""// Optimized Webinar Visual Assets (Indian Student Portraits & Hardware Photos)
const ASSETS = {json.dumps(out_map, indent=2)};

const CACHE = new Map();

export function webinarImageResource(request) {{
  if (request.method !== 'GET' && request.method !== 'HEAD') return null;
  const url = new URL(request.url);
  const b64 = ASSETS[url.pathname];
  if (!b64) return null;
  let bytes = CACHE.get(url.pathname);
  if (!bytes) {{
    const bin = atob(b64);
    bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    CACHE.set(url.pathname, bytes);
  }}
  return new Response(request.method === 'HEAD' ? null : bytes, {{
    status: 200,
    headers: {{
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=604800, immutable',
      'X-Content-Type-Options': 'nosniff'
    }}
  }});
}}
"""

with open(
    r"C:\Users\PROFESSORHULK\.gemini\antigravity\scratch\flyq-webinar-release\flyq-webinar-assets.mjs",
    "w",
    encoding="utf-8",
) as f:
    f.write(mjs_code)
print("Saved flyq-webinar-assets.mjs successfully.")
