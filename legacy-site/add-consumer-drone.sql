-- Add FLYQ Consumer Drone Product
-- Product ID: 3
-- Price: ₹4,999 (Inclusive of GST)

INSERT INTO products (
  id,
  name,
  slug,
  description,
  short_description,
  price,
  image_url,
  gallery_images,
  stock,
  featured,
  category,
  specifications,
  created_at
) VALUES (
  3,
  'FLYQ Consumer Drone with 4K Camera',
  'flyq-consumer-drone',
  'Feature-rich foldable drone with dual 1080P HD cameras, intelligent 360° obstacle avoidance, and multiple flight modes. Perfect for beginners, hobbyists, and aerial photography enthusiasts. Features WiFi FPV real-time transmission, VR 3D experience, LED lights, trajectory flight via mobile app, altitude hold, headless mode, and hand gesture photo/video controls. Includes 2x 3.7V 1800mAh batteries for 40-50 minutes total flight time. Complete ready-to-fly package with remote control, spare propellers, and accessories. Compact foldable design for easy portability.',
  'Foldable consumer drone with dual 1080P HD cameras, obstacle avoidance, and WiFi FPV',
  4999,
  'https://www.genspark.ai/api/files/s/WUX4ionT',
  '["https://www.genspark.ai/api/files/s/WUX4ionT", "https://www.genspark.ai/api/files/s/uauwE7uT", "https://www.genspark.ai/api/files/s/5afvsn7N", "https://www.genspark.ai/api/files/s/Bj5yeZjk", "https://www.genspark.ai/api/files/s/jFwEVB8O", "https://www.genspark.ai/api/files/s/5pyQNA9T", "https://www.genspark.ai/api/files/s/oK0M5Cyn"]',
  100,
  1,
  'Consumer Drones',
  '{"camera":"Dual 1080P HD (4K FPV Front Camera)","camera_angle":"90° adjustable","video_resolution":"1920x1080P","photo_resolution":"4K","battery":"3.7V 1800mAh Lipo","batteries_included":"2x batteries","flight_time":"20-25 min per battery (40-50 min total)","charging_time":"~60 minutes","control_range":"80-100 meters","wifi_range":"50-80 meters","weight":"~250g (with battery)","folded_size":"14x8x6 cm (approx)","unfolded_size":"25x25x6 cm (approx)","color_options":"Black / White","led_lights":"Blue LED indicators","wind_resistance":"Level 3-4","obstacle_avoidance":"360° intelligent detection","flight_modes":"Altitude Hold, Headless Mode, One-Key Takeoff/Landing, 360° Flip, Trajectory Flight, Speed Adjustment (3 levels), Hand Gesture Photo/Video, Emergency Stop","remote_control":"2.4GHz dual antenna with smartphone holder","remote_power":"3x AAA batteries (not included)","fpv":"WiFi real-time transmission","vr_support":"VR 3D experience compatible","package_contents":"1x Drone, 1x Remote Control, 2x Batteries, 1x Spare Blade Set, 1x USB Cable, 1x Screwdriver, 1x User Manual","materials":"ABS plastic, metal motors, electronic components","warranty":"6 months","target_audience":"Beginners, Hobbyists, Photography Enthusiasts"}',
  datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  name = excluded.name,
  slug = excluded.slug,
  description = excluded.description,
  short_description = excluded.short_description,
  price = excluded.price,
  image_url = excluded.image_url,
  gallery_images = excluded.gallery_images,
  stock = excluded.stock,
  featured = excluded.featured,
  category = excluded.category,
  specifications = excluded.specifications;

-- Verify the insertion
SELECT id, name, price, category, stock, featured FROM products WHERE id = 3;
