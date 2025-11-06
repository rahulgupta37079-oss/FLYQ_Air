-- Seed initial products: FLYQ Air and FLYQ Vision

INSERT OR IGNORE INTO products (
  id, name, slug, description, short_description, price, image_url, stock, featured, category, specifications
) VALUES
(
  1,
  'FLYQ Air',
  'flyq-air',
  'The ultimate programmable drone powered by ESP32-S3. Perfect for makers, developers, educators, and robotics enthusiasts. Features Wi-Fi control, open-source hardware, comprehensive SDK support (ESP-IDF, Arduino, Python), and expandable GPIO. Build, code, and fly your own autonomous missions. Includes 8-week comprehensive training curriculum with 30 hands-on sessions covering hardware assembly, firmware programming, flight control, and autonomous navigation.',
  'ESP32-S3 powered programmable drone with Wi-Fi control and open-source SDK',
  4999.00,
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  50,
  1,
  'Drones',
  '{"processor":"ESP32-S3 Dual-Core 240MHz","memory":"512KB SRAM","connectivity":"Wi-Fi + BLE","weight":"45g","size":"100x100mm","battery":"1S LiPo 3.7V","flight_time":"5-7 min","motors":"720 Coreless x4","sensors":"MPU6050 6-Axis IMU","programming":"ESP-IDF, Arduino, Python","expansion":"24-pin GPIO, I2C, SPI, UART"}'
),
(
  2,
  'FLYQ Vision',
  'flyq-vision',
  'Advanced camera-equipped drone with AI-powered vision capabilities. Everything from FLYQ Air PLUS HD 720p camera with real-time streaming, gesture control recognition, object tracking, computer vision processing, and autonomous navigation. Features edge AI processing with TensorFlow Lite support, face detection, color-based tracking, and custom ML training capabilities. Perfect for computer vision projects, AI research, content creation, and advanced autonomous flight applications. Includes extended 8-week vision-focused curriculum covering camera integration, image processing, gesture recognition, and AI model development.',
  'Advanced AI-powered camera drone with gesture control and computer vision',
  8999.00,
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_f1a47aea-7dd7-431f-bfe8-e82d7d001b38',
  30,
  1,
  'Drones',
  '{"processor":"ESP32-S3 Dual-Core 240MHz + AI Accelerator","memory":"512KB SRAM + 8MB PSRAM","camera":"HD 720p @ 30fps, 120° FOV","streaming":"WiFi Real-time < 200ms latency","ai_features":"Gesture Control, Object Tracking, Face Detection","vision":"TensorFlow Lite, Custom ML Models","connectivity":"Wi-Fi 802.11 b/g/n, 2.4GHz","range":"50 meters","weight":"48g","size":"100x100mm","battery":"1S LiPo 3.7V","flight_time":"5-7 min","motors":"720 Coreless x4","sensors":"MPU6050 6-Axis IMU + Camera","programming":"ESP-IDF, Arduino, Python + Computer Vision SDK","expansion":"24-pin GPIO, I2C, SPI, UART"}'
);
