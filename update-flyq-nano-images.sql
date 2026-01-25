-- Update FLYQ Nano with enhanced images and complete specifications
-- Date: 2026-01-25
-- Product ID: 3 (FLYQ Nano)

UPDATE products SET
  name = 'FLYQ Nano',
  slug = 'flyq-nano',
  price = 4999,
  category = 'Consumer Drones',
  description = 'Experience the ultimate aerial photography with FLYQ Nano - a feature-rich foldable drone equipped with dual 1080P HD cameras adjustable within 90°. Advanced WiFi FPV technology provides real-time transmission to your mobile app for immersive flying experience. Intelligent 360° obstacle avoidance ensures safe flights, while VR 3D compatibility transforms your smartphone into a virtual reality headset. Multiple intelligent flight modes including altitude hold, headless mode, one-key takeoff/landing, 360° flips, and trajectory flight let you draw flight paths directly on your phone. LED lights enable night flying, and hand gesture controls allow you to capture photos and videos with simple hand movements. Comes with 2× 3.7V 1800mAh LiPo batteries providing 40-50 minutes total flight time.',
  short_description = 'Foldable drone with dual 1080P HD cameras (90° adjustable), 360° obstacle avoidance, WiFi FPV real-time transmission, VR 3D experience, and 2× 1800mAh batteries for 40-50 minutes total flight time',
  image_url = 'https://www.genspark.ai/api/files/s/WUX4ionT',
  gallery_images = 'https://www.genspark.ai/api/files/s/WUX4ionT,https://www.genspark.ai/api/files/s/uauwE7uT,https://www.genspark.ai/api/files/s/5afvsn7N,https://www.genspark.ai/api/files/s/Bj5yeZjk,https://www.genspark.ai/api/files/s/jFwEVB8O,https://www.genspark.ai/api/files/s/5pyQNA9T,https://www.genspark.ai/api/files/s/oK0M5Cyn',
  specifications = '{
    "camera": {
      "type": "Dual 1080P HD Cameras",
      "frontCamera": "4K FPV Camera",
      "adjustableAngle": "90° adjustable",
      "videoResolution": "1920x1080P (Full HD)",
      "photoResolution": "4K High Resolution",
      "fpv": "WiFi FPV Real-time Transmission",
      "vrSupport": "VR 3D Compatible with VR Glasses"
    },
    "battery": {
      "type": "3.7V 1800mAh LiPo",
      "quantity": "2 batteries included",
      "flightTimePerBattery": "20-25 minutes",
      "totalFlightTime": "40-50 minutes (with 2 batteries)",
      "chargingTime": "~60 minutes",
      "chargingMethod": "USB cable (included)"
    },
    "control": {
      "remoteControl": "2.4GHz Dual Antenna Remote with Smartphone Holder",
      "controlRange": "80-100 meters",
      "wifiRange": "50-80 meters",
      "mobileApp": "iOS and Android compatible with FPV live view",
      "remoteBatteries": "Requires 3× AAA batteries (NOT included)"
    },
    "flightModes": {
      "altitudeHold": "Stable hovering at fixed height",
      "headlessMode": "Easy control regardless of drone orientation",
      "oneKeyTakeoffLanding": "Beginner-friendly automatic takeoff/landing",
      "360Flips": "Impressive aerial stunts with one button",
      "trajectoryFlight": "Draw flight path on smartphone screen",
      "speedLevels": "3 adjustable speed levels for all skill levels",
      "handGesture": "Photo and video capture with hand gestures",
      "emergencyStop": "Instant stop for safety"
    },
    "safety": {
      "obstacleAvoidance": "360° Intelligent Obstacle Avoidance",
      "lowBatteryWarning": "Automatic alerts when battery is low",
      "gpsFailsafe": "Auto-return home feature (if GPS equipped)",
      "propellerGuards": "Optional guards for added safety"
    },
    "design": {
      "foldable": "Yes - Compact and portable",
      "foldedSize": "14cm × 8cm × 6cm (ultra-portable)",
      "unfoldedSize": "25cm × 25cm × 6cm",
      "weight": "~250g (with battery)",
      "ledLights": "Blue LED indicator lights for night flying",
      "colors": "Black / White options",
      "windResistance": "Level 3-4 wind resistance"
    },
    "packageContents": {
      "drone": "1× FLYQ Nano Drone",
      "remote": "1× Remote Control Transmitter with Smartphone Holder",
      "batteries": "2× 3.7V 1800mAh LiPo Batteries",
      "spareBlades": "1× Spare Propeller Blade Set (4 blades)",
      "usbCable": "1× USB Charging Cable",
      "screwdriver": "1× Screwdriver for maintenance",
      "manual": "1× User Manual",
      "quickStart": "1× Quick Start Guide"
    },
    "materials": {
      "body": "High-quality ABS plastic",
      "motors": "Brushed coreless motors"
    },
    "warranty": {
      "period": "6 months manufacturer warranty",
      "coverage": "Defects in materials and workmanship"
    },
    "targetAudience": "Beginners, Hobbyists, Aerial Photography Enthusiasts, Gift Buyers"
  }',
  stock = 100,
  featured = 1
WHERE id = 3;

-- Verify the update
SELECT id, name, slug, price, stock, category, featured, created_at FROM products WHERE id = 3;
