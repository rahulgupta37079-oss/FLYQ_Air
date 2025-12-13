-- Seed 50 Blog Posts for FLYQ Website
-- Distribution: Getting Started (10), Tutorials (15), Projects (12), Tips & Tricks (8), News (5)

-- Clear existing test data (keep the Getting Started post from earlier)
-- DELETE FROM blog_posts WHERE id > 1;

-- GETTING STARTED CATEGORY (9 new posts + 1 existing = 10 total)

INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, author_id, category, tags, status, reading_time, published_at, created_at) VALUES 
(
  'Understanding Your FLYQ Drone Components',
  'understanding-flyq-drone-components',
  'Detailed guide to every component in your FLYQ drone kit and how they work together.',
  '<h2>The Flight Controller</h2><p>The ESP32-S3 dual-core processor runs at 240MHz handling all flight calculations. With 320KB SRAM and 4MB Flash, it manages sensor fusion, motor control, and wireless communication.</p><h2>Motor System</h2><p>Four 716 brushed motors provide thrust, each capable of 38,000 RPM. ESCs precisely control rotation speed for stable flight.</p><h2>Sensor Suite</h2><p>MPU6050 6-axis IMU provides accelerometer and gyroscope data essential for flight stabilization.</p><h2>Power System</h2><p>600mAh 3.7V LiPo battery delivers 8-10 minutes of flight time with built-in protection circuitry.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Getting Started', '["components", "hardware", "ESP32-S3", "beginners"]', 'published', 6,
  datetime('now', '-50 days'), datetime('now', '-50 days')
),
(
  'FLYQ Safety Guidelines: Essential Rules',
  'flyq-safety-guidelines',
  'Comprehensive safety guidelines for safe drone operation indoors and outdoors.',
  '<h2>Pre-Flight Safety</h2><p>Always inspect propellers, motors, battery, and frame before flight. Check weather conditions and ensure adequate space.</p><h2>Flying Environment</h2><p>Indoor: minimum 3m x 3m x 2.5m. Outdoor: calm weather, away from people, within visual line of sight.</p><h2>Battery Safety</h2><p>Never leave charging unattended. Store at 50-60% charge. Dispose of damaged batteries properly.</p><h2>Emergency Procedures</h2><p>Know how to handle lost control, low battery warnings, and motor failures.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Getting Started', '["safety", "guidelines", "best practices"]', 'published', 5,
  datetime('now', '-48 days'), datetime('now', '-48 days')
),
(
  'Setting Up Your Development Environment',
  'setting-up-development-environment',
  'Install Arduino IDE, Python, and FLYQ SDK for programming your drone.',
  '<h2>Arduino IDE Setup</h2><p>Download Arduino IDE 2.0+, install ESP32 board support, select ESP32-S3 Dev Module, and install required libraries: MPU6050, ESP32Servo, AsyncTCP.</p><h2>Python Environment</h2><p>Install Python 3.8+, create virtual environment, install FLYQ Python SDK and dependencies.</p><h2>Testing</h2><p>Upload blink test to Arduino, run Python connection test to verify setup.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Getting Started', '["programming", "Arduino", "Python", "setup"]', 'published', 8,
  datetime('now', '-45 days'), datetime('now', '-45 days')
),
(
  'Your First Manual Flight: Basic Controls',
  'first-manual-flight-controls',
  'Master throttle, yaw, pitch, and roll for stable hovering and controlled flight.',
  '<h2>The Four Controls</h2><p>Throttle controls altitude, yaw rotates the drone, pitch moves forward/backward, roll moves left/right.</p><h2>First Flight Steps</h2><p>Takeoff to 1-1.5m, practice hovering for 30 seconds, make small corrections, land gently.</p><h2>Common Mistakes</h2><p>Avoid over-correcting, panic throttle cuts, flying too high initially, and ignoring battery level.</p><h2>Practice Progression</h2><p>Week 1: Hovering. Week 2: Basic movements. Week 3: Combined maneuvers and patterns.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Getting Started', '["manual flight", "controls", "hovering", "flying skills"]', 'published', 9,
  datetime('now', '-42 days'), datetime('now', '-42 days')
),
(
  'Charging and Battery Care Guide',
  'charging-battery-care',
  'Essential guide to LiPo battery charging, maintenance, and safety practices.',
  '<h2>Charging Procedure</h2><p>Use only provided USB-C cable with 5V/2A adapter. Red LED = charging, Green LED = full. Takes 45-60 minutes from empty.</p><h2>Storage Best Practices</h2><p>Short-term: 50-80% charge. Long-term: 50-60% charge at room temperature.</p><h2>Warning Signs</h2><p>Replace battery if swollen, reduced flight time (<5 min), excessive heat, or physical damage.</p><h2>Battery Life</h2><p>Expected 300-500 charge cycles. Never discharge below 3.0V. Land at 20-30% remaining.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Getting Started', '["battery", "charging", "LiPo", "safety"]', 'published', 6,
  datetime('now', '-40 days'), datetime('now', '-40 days')
),
(
  'Calibrating Sensors for Optimal Performance',
  'calibrating-sensors',
  'Complete calibration guide for accelerometer, gyroscope, and ESCs.',
  '<h2>When to Calibrate</h2><p>First setup, after firmware update, after crashes, when drone drifts, monthly maintenance.</p><h2>IMU Calibration</h2><p>Place on level surface, keep perfectly still for 30 seconds. Use app or Arduino code.</p><h2>ESC Calibration</h2><p>Remove propellers, follow app instructions for 15-second calibration sequence.</p><h2>Verification</h2><p>Check sensor readings, perform hover test to ensure minimal drift.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Getting Started', '["calibration", "sensors", "IMU", "setup"]', 'published', 7,
  datetime('now', '-38 days'), datetime('now', '-38 days')
),
(
  'Troubleshooting Common Issues',
  'troubleshooting-common-issues',
  'Solutions to frequent problems: connection issues, motor problems, and flight instability.',
  '<h2>Connection Problems</h2><p>Can''t find Wi-Fi hotspot? Check LED indicators, verify drone is powered on, forget and reconnect network.</p><h2>Motor Issues</h2><p>Motors won''t spin? Check ESC connections, verify battery charge, recalibrate ESCs, inspect for physical damage.</p><h2>Flight Instability</h2><p>Drone drifts or flips? Recalibrate IMU, check propeller installation, verify motor directions, balance propellers.</p><h2>App Issues</h2><p>App crashes or disconnects? Update to latest version, clear cache, check device compatibility.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Getting Started', '["troubleshooting", "problems", "support", "fixes"]', 'published', 6,
  datetime('now', '-36 days'), datetime('now', '-36 days')
),
(
  'Understanding Flight Modes Explained',
  'understanding-flight-modes',
  'Learn about different flight modes: Manual, Stabilize, Altitude Hold, and Position Hold.',
  '<h2>Manual Mode</h2><p>Full control with no stabilization. For experienced pilots only. Requires constant input for stable flight.</p><h2>Stabilize Mode</h2><p>Self-leveling when sticks centered. Best for beginners. Drone automatically returns to level flight.</p><h2>Altitude Hold</h2><p>Maintains current altitude automatically. Barometer keeps height constant. Easier hovering and photography.</p><h2>Position Hold (Vision only)</h2><p>GPS-based position lock. Drone stays in place without input. Ideal for hands-free hovering.</p><h2>Choosing Right Mode</h2><p>Beginners start with Stabilize, progress to Altitude Hold, advanced pilots use Manual for tricks.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Getting Started', '["flight modes", "stabilization", "beginners", "controls"]', 'published', 7,
  datetime('now', '-34 days'), datetime('now', '-34 days')
),
(
  'Reading and Understanding Telemetry Data',
  'reading-telemetry-data',
  'Understand telemetry displays: battery voltage, signal strength, altitude, and sensor readings.',
  '<h2>Battery Telemetry</h2><p>Voltage range 3.0V-4.2V. 3.7V = 50%. Below 3.5V = land soon. Real-time voltage and percentage display.</p><h2>Signal Strength</h2><p>RSSI (Received Signal Strength Indicator) shows Wi-Fi quality. -50dBm = excellent, -70dBm = good, -80dBm = poor.</p><h2>Flight Data</h2><p>Altitude (barometer), vertical speed, attitude (roll/pitch/yaw angles), accelerations.</p><h2>Using Telemetry</h2><p>Monitor during flight, identify issues early, log data for analysis, optimize flight parameters.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Getting Started', '["telemetry", "data", "monitoring", "sensors"]', 'published', 6,
  datetime('now', '-32 days'), datetime('now', '-32 days')
),
(
  'Firmware Updates and Version Management',
  'firmware-updates',
  'How to update FLYQ firmware safely and manage different firmware versions.',
  '<h2>Why Update Firmware</h2><p>Bug fixes, new features, performance improvements, security patches, compatibility updates.</p><h2>Update Process</h2><p>Connect via USB-C, open FLYQ updater tool, check current version, download latest firmware, flash and verify.</p><h2>Backup Before Update</h2><p>Save current settings, export calibration data, backup custom code, document current configuration.</p><h2>Troubleshooting Updates</h2><p>Update fails? Try different USB cable, hold BOOT button, use recovery mode, contact support if needed.</p><h2>Version History</h2><p>Track firmware versions, read changelog, understand new features, rollback if necessary.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Getting Started', '["firmware", "updates", "version", "maintenance"]', 'published', 7,
  datetime('now', '-30 days'), datetime('now', '-30 days')
);

-- TUTORIALS CATEGORY (15 posts)

INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, author_id, category, tags, status, reading_time, published_at, created_at) VALUES 
(
  'Programming Custom LED Patterns',
  'programming-led-patterns',
  'Create stunning LED displays using Arduino code for FLYQ status lights.',
  '<h2>LED System Overview</h2><p>FLYQ has 3 status LEDs: PWR (GPIO12), SYS (GPIO13), LINK (GPIO14).</p><h2>Basic Control</h2><pre><code>digitalWrite(PWR_LED, HIGH);delay(500);digitalWrite(PWR_LED, LOW);</code></pre><h2>Advanced Patterns</h2><p>Knight Rider effect, breathing animation, battery status indicator, flight mode displays.</p><h2>Wi-Fi Control</h2><p>Create web server to control LEDs remotely via smartphone.</p><h2>Best Practices</h2><p>Use PWM for smooth fading, avoid rapid flashing, maintain system status indicators.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Tutorials', '["Arduino", "LED", "programming", "GPIO"]', 'published', 10,
  datetime('now', '-28 days'), datetime('now', '-28 days')
),
(
  'Building Your First Python Flight Script',
  'first-python-flight-script',
  'Write automated flight scripts with Python for takeoff, patterns, and landing.',
  '<h2>Basic Script Structure</h2><pre><code>from flyq import FLYQ\ndrone = FLYQ()\ndrone.connect()\ndrone.takeoff(1.0)\ntime.sleep(5)\ndrone.land()</code></pre><h2>Square Pattern</h2><p>Program 2m x 2m square flight path using movement commands.</p><h2>Error Handling</h2><p>Implement try-except blocks, check battery before flight, emergency stop on keyboard interrupt.</p><h2>Telemetry Logging</h2><p>Log flight data to CSV for later analysis.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Tutorials', '["Python", "programming", "automation", "SDK"]', 'published', 12,
  datetime('now', '-26 days'), datetime('now', '-26 days')
),
(
  'Reading and Processing IMU Data',
  'reading-imu-data',
  'Access accelerometer and gyroscope data for custom flight algorithms.',
  '<h2>IMU Basics</h2><p>MPU6050 provides 3-axis accelerometer and gyroscope data at up to 1000Hz.</p><h2>Reading Raw Data</h2><pre><code>Wire.begin();\nmpu.initialize();\nint16_t ax,ay,az,gx,gy,gz;\nmpu.getMotion6(&ax,&ay,&az,&gx,&gy,&gz);</code></pre><h2>Data Filtering</h2><p>Apply complementary filter to combine accel and gyro for accurate attitude estimation.</p><h2>Applications</h2><p>Custom stabilization, gesture detection, vibration monitoring, crash detection.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Tutorials', '["IMU", "sensors", "data processing", "Arduino"]', 'published', 11,
  datetime('now', '-24 days'), datetime('now', '-24 days')
),
(
  'Creating a Web-Based Controller',
  'web-based-controller',
  'Build custom web interface for controlling FLYQ from any browser.',
  '<h2>Setup Web Server</h2><p>Use ESPAsyncWebServer library to create HTTP server on ESP32-S3.</p><h2>HTML Interface</h2><p>Design responsive control panel with virtual joysticks, buttons, and telemetry display.</p><h2>WebSocket Communication</h2><p>Real-time bidirectional data transfer for low-latency control.</p><h2>Features</h2><p>Live video feed (Vision), gamepad support, mobile-responsive design, saved flight modes.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Tutorials', '["web development", "controller", "Wi-Fi", "interface"]', 'published', 13,
  datetime('now', '-22 days'), datetime('now', '-22 days')
),
(
  'Implementing Altitude Hold with Barometer',
  'altitude-hold-barometer',
  'Use barometric pressure sensor for stable altitude hold functionality.',
  '<h2>BMP280 Barometer</h2><p>Measures atmospheric pressure to calculate altitude with ±1m accuracy.</p><h2>PID Controller</h2><pre><code>float error = target_alt - current_alt;\nfloat pid_output = Kp*error + Ki*integral + Kd*derivative;</code></pre><h2>Tuning Parameters</h2><p>Start with Kp=2.0, Ki=0.5, Kd=1.0. Adjust based on flight response.</p><h2>Integration</h2><p>Combine with IMU data, handle pressure changes, compensate for temperature.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Tutorials', '["barometer", "altitude hold", "PID", "sensors"]', 'published', 10,
  datetime('now', '-20 days'), datetime('now', '-20 days')
),
(
  'Adding External Sensors via GPIO',
  'adding-external-sensors',
  'Connect and read data from ultrasonic, IR, and environmental sensors.',
  '<h2>GPIO Expansion</h2><p>FLYQ provides 24-pin GPIO header for sensor integration. 3.3V logic level.</p><h2>Ultrasonic Distance Sensor</h2><p>HC-SR04 for obstacle detection. Measure echo time to calculate distance.</p><h2>IR Sensors</h2><p>Line following, edge detection, proximity sensing applications.</p><h2>Environmental Sensors</h2><p>Temperature (DHT22), light (BH1750), humidity for data logging missions.</p><h2>Power Considerations</h2><p>Total GPIO current limit 40mA. Use external power for high-current sensors.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Tutorials', '["GPIO", "sensors", "expansion", "hardware"]', 'published', 9,
  datetime('now', '-18 days'), datetime('now', '-18 days')
),
(
  'Voice Control with Speech Recognition',
  'voice-control-speech',
  'Control your FLYQ drone using voice commands via mobile app.',
  '<h2>Architecture</h2><p>Mobile app captures speech, sends to cloud API for recognition, transmits commands to drone.</p><h2>Command Set</h2><p>"Take off", "Land", "Go forward", "Turn left", "Emergency stop", "Return home".</p><h2>Python Implementation</h2><pre><code>import speech_recognition as sr\nrecognizer = sr.Recognizer()\ncommand = recognizer.recognize_google(audio)</code></pre><h2>Safety Features</h2><p>Confidence threshold, emergency keywords, timeout limits, confirmation for dangerous commands.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Tutorials', '["voice control", "speech recognition", "AI", "mobile"]', 'published', 11,
  datetime('now', '-16 days'), datetime('now', '-16 days')
),
(
  'Waypoint Navigation System',
  'waypoint-navigation',
  'Program autonomous flight paths with GPS waypoints (FLYQ Vision).',
  '<h2>GPS Integration</h2><p>NEO-6M GPS module provides latitude/longitude coordinates for navigation.</p><h2>Waypoint Structure</h2><pre><code>struct Waypoint { float lat; float lon; float alt; int action; };</code></pre><h2>Path Planning</h2><p>Calculate bearing and distance between waypoints. Implement smooth transitions.</p><h2>Mission Execution</h2><p>Sequential waypoint following, hold actions, photo triggers, RTH on low battery.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Tutorials', '["GPS", "navigation", "waypoints", "autonomous"]', 'published', 12,
  datetime('now', '-14 days'), datetime('now', '-14 days')
),
(
  'Camera Integration and Image Processing',
  'camera-image-processing',
  'Use FLYQ Vision camera for photos, video streaming, and computer vision.',
  '<h2>Camera Module</h2><p>OV2640 provides 720p video and 2MP photos over Wi-Fi stream.</p><h2>Streaming Setup</h2><p>MJPEG stream at 30fps. Access via http://flyq-ip/stream.</p><h2>OpenCV Integration</h2><pre><code>import cv2\ncap = cv2.VideoCapture("http://flyq-ip/stream")\nret, frame = cap.read()</code></pre><h2>Applications</h2><p>Face detection, QR code reading, color tracking, optical flow navigation.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_f1a47aea-7dd7-431f-bfe8-e82d7d001b38',
  1, 'Tutorials', '["camera", "computer vision", "OpenCV", "Vision"]', 'published', 13,
  datetime('now', '-12 days'), datetime('now', '-12 days')
),
(
  'Gesture Control Using MediaPipe',
  'gesture-control-mediapipe',
  'Control drone with hand gestures detected through laptop webcam.',
  '<h2>MediaPipe Hands</h2><p>Google''s ML solution for real-time hand tracking and gesture recognition.</p><h2>Setup</h2><pre><code>pip install mediapipe opencv-python\nimport mediapipe as mp\nhands = mp.solutions.hands.Hands()</code></pre><h2>Gesture Mapping</h2><p>Open palm = takeoff, closed fist = land, point up = ascend, swipe = direction control.</p><h2>Safety</h2><p>Require gesture hold time, emergency stop gesture, max altitude limit.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_f1a47aea-7dd7-431f-bfe8-e82d7d001b38',
  1, 'Tutorials', '["gesture control", "MediaPipe", "AI", "computer vision"]', 'published', 11,
  datetime('now', '-10 days'), datetime('now', '-10 days')
),
(
  'Building FPV Racing Mode',
  'fpv-racing-mode',
  'Configure FLYQ for FPV racing with acro mode and low-latency controls.',
  '<h2>Acro Mode Setup</h2><p>Disable self-leveling, increase rotation rates, adjust expo curves for smooth control.</p><h2>Tuning for Speed</h2><p>Maximize motor output, optimize PID gains, reduce drag, lightweight modifications.</p><h2>FPV Video</h2><p>Stream camera feed to VR headset or smartphone. Minimize latency (<100ms).</p><h2>Racing Features</h2><p>Lap timer, speed overlay, crash detection, quick rearm for racing.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Tutorials', '["FPV", "racing", "acro mode", "performance"]', 'published', 10,
  datetime('now', '-8 days'), datetime('now', '-8 days')
),
(
  'Data Logging and Flight Analysis',
  'data-logging-analysis',
  'Record flight data to SD card and analyze performance metrics.',
  '<h2>SD Card Module</h2><p>SPI interface SD card adapter stores CSV logs of sensor data and flight parameters.</p><h2>Log Format</h2><p>Timestamp, battery, altitude, attitude, motor PWM, sensor readings at 50Hz.</p><h2>Analysis Tools</h2><p>Python pandas for data processing, matplotlib for visualization, identify issues.</p><h2>Insights</h2><p>Battery performance curves, PID tuning optimization, crash analysis, vibration detection.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Tutorials', '["data logging", "analysis", "SD card", "telemetry"]', 'published', 9,
  datetime('now', '-6 days'), datetime('now', '-6 days')
),
(
  'Creating Custom Flight Controller Firmware',
  'custom-firmware',
  'Build your own flight controller code from scratch using Arduino.',
  '<h2>Core Components</h2><p>Sensor fusion algorithm, PID controllers for stabilization, motor mixing, RC input processing.</p><h2>Main Loop</h2><pre><code>void loop() {\nreadSensors();\ncalculateAttitude();\nrunPID();\nmixMotors();\noutputPWM();\n}</code></pre><h2>Safety Systems</h2><p>Failsafe detection, low battery cutoff, range limits, crash detection.</p><h2>Testing</h2><p>Bench test without props, gradual flight testing, log data for debugging.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Tutorials', '["firmware", "flight controller", "Arduino", "advanced"]', 'published', 15,
  datetime('now', '-4 days'), datetime('now', '-4 days')
),
(
  'Bluetooth Controller Integration',
  'bluetooth-controller',
  'Connect PS4/Xbox controllers via Bluetooth for traditional RC control.',
  '<h2>BLE Setup</h2><p>ESP32 built-in Bluetooth Low Energy for gamepad connection.</p><h2>Controller Pairing</h2><pre><code>#include "PS4Controller.h"\nPS4.begin("MAC_ADDRESS");\nif(PS4.isConnected()) { ... }</code></pre><h2>Button Mapping</h2><p>Left stick = throttle/yaw, right stick = pitch/roll, buttons for modes and emergency.</p><h2>Latency</h2><p>BLE provides <20ms latency, sufficient for smooth control response.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Tutorials', '["Bluetooth", "controller", "gamepad", "BLE"]', 'published', 8,
  datetime('now', '-2 days'), datetime('now', '-2 days')
),
(
  'Machine Learning for Obstacle Avoidance',
  'ml-obstacle-avoidance',
  'Train neural network for autonomous obstacle detection and avoidance.',
  '<h2>Dataset Collection</h2><p>Capture thousands of images from drone camera during flights near obstacles.</p><h2>Model Training</h2><p>Use TensorFlow Lite to train object detection model, optimize for ESP32-S3.</p><h2>Inference</h2><p>Run model on-device for real-time detection. Adjust flight path automatically.</p><h2>Performance</h2><p>Achieve 10fps inference rate, 85% accuracy, <200ms response time.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_f1a47aea-7dd7-431f-bfe8-e82d7d001b38',
  1, 'Tutorials', '["machine learning", "AI", "obstacle avoidance", "TensorFlow"]', 'published', 14,
  datetime('now', '-1 days'), datetime('now', '-1 days')
);

-- PROJECTS CATEGORY (12 posts)

INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, author_id, category, tags, status, reading_time, published_at, created_at) VALUES 
(
  'Autonomous Delivery Drone Project',
  'autonomous-delivery-drone',
  'Build a fully autonomous package delivery system with GPS waypoints.',
  '<h2>Project Overview</h2><p>Create autonomous drone that picks up small packages, navigates to GPS coordinates, and delivers safely.</p><h2>Hardware Additions</h2><p>Servo gripper mechanism, GPS module, extended battery for longer range.</p><h2>Software</h2><p>Waypoint navigation, payload detection, safe landing algorithm, package release mechanism.</p><h2>Testing</h2><p>Start with short distances, gradually increase range, test various payloads up to 50g.</p><h2>Results</h2><p>Successfully deliver packages within 100m radius, 95% success rate, 6 minute average delivery time.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Projects', '["autonomous", "delivery", "GPS", "waypoints"]', 'published', 10,
  datetime('now', '-55 days'), datetime('now', '-55 days')
),
(
  'Indoor Mapping Drone with SLAM',
  'indoor-mapping-slam',
  'Create 3D maps of indoor spaces using SLAM algorithm and ultrasonic sensors.',
  '<h2>SLAM Basics</h2><p>Simultaneous Localization and Mapping - drone tracks position while building environment map.</p><h2>Hardware</h2><p>4x ultrasonic sensors, improved IMU, Raspberry Pi Zero for processing.</p><h2>Algorithm</h2><p>Use FastSLAM2.0 algorithm, particle filter for localization, occupancy grid for map.</p><h2>Visualization</h2><p>Real-time 3D map display in web browser, export to common formats (OBJ, STL).</p><h2>Applications</h2><p>Room measurement, furniture layout, emergency response, industrial inspection.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_f1a47aea-7dd7-431f-bfe8-e82d7d001b38',
  1, 'Projects', '["SLAM", "mapping", "3D", "computer vision"]', 'published', 12,
  datetime('now', '-53 days'), datetime('now', '-53 days')
),
(
  'Drone Swarm Coordination System',
  'drone-swarm-coordination',
  'Control multiple FLYQ drones in synchronized formation flying.',
  '<h2>Swarm Architecture</h2><p>Master controller broadcasts commands to all drones via UDP multicast.</p><h2>Formation Control</h2><p>Each drone maintains relative position to neighbors. Leader-follower topology.</p><h2>Collision Avoidance</h2><p>Implement potential field algorithm, minimum separation distance 1m.</p><h2>Patterns</h2><p>Line formation, circle, V-formation, expanding/contracting shapes.</p><h2>Demonstration</h2><p>Coordinate 4 FLYQ drones in synchronized light show with music.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Projects', '["swarm", "multi-drone", "coordination", "formations"]', 'published', 13,
  datetime('now', '-51 days'), datetime('now', '-51 days')
),
(
  'Aerial Photography Stabilization Rig',
  'aerial-photography-rig',
  'Build gimbal system for smooth, professional aerial photography.',
  '<h2>Hardware</h2><p>2-axis brushless gimbal, stabilized camera mount, damping system.</p><h2>Stabilization Algorithm</h2><p>Complementary filter combines IMU data for smooth gimbal control.</p><h2>Camera Control</h2><p>Trigger photo/video via GPIO, adjust settings remotely, live preview.</p><h2>Flight Modes</h2><p>Smooth operator mode, point of interest orbit, cable cam simulation.</p><h2>Results</h2><p>Professional-quality stable footage, eliminates vibration, smooth panning shots.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_f1a47aea-7dd7-431f-bfe8-e82d7d001b38',
  1, 'Projects', '["photography", "gimbal", "stabilization", "camera"]', 'published', 11,
  datetime('now', '-49 days'), datetime('now', '-49 days')
),
(
  'Search and Rescue Thermal Camera Drone',
  'search-rescue-thermal',
  'Integrate thermal camera for search and rescue operations.',
  '<h2>Thermal Camera</h2><p>MLX90640 32x24 pixel thermal array sensor, detects heat signatures.</p><h2>Image Processing</h2><p>Highlight temperature anomalies, detect humans in low visibility, log hotspot locations.</p><h2>Autonomous Search</h2><p>Grid pattern coverage, pause on detection, mark GPS coordinates.</p><h2>Ground Station</h2><p>Live thermal feed, temperature overlay, waypoint marking, emergency alert.</p><h2>Field Test</h2><p>Successfully detect person from 20m altitude, works in complete darkness.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_f1a47aea-7dd7-431f-bfe8-e82d7d001b38',
  1, 'Projects', '["thermal camera", "search rescue", "emergency", "sensors"]', 'published', 12,
  datetime('now', '-47 days'), datetime('now', '-47 days')
),
(
  'Educational Drone Programming Platform',
  'educational-programming-platform',
  'Create visual programming interface for teaching kids drone concepts.',
  '<h2>Block-Based Programming</h2><p>Blockly interface like Scratch - drag and drop command blocks.</p><h2>Simulation Mode</h2><p>Test code in 3D simulator before real flight. Safe learning environment.</p><h2>Curriculum Integration</h2><p>Lessons on physics, math, programming, problem-solving through drone projects.</p><h2>Challenges</h2><p>Obstacle course navigation, package delivery, formation flying competitions.</p><h2>Impact</h2><p>Engage students aged 10-16, improve STEM interest, hands-on learning.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Projects', '["education", "Blockly", "kids", "STEM"]', 'published', 10,
  datetime('now', '-45 days'), datetime('now', '-45 days')
),
(
  'Weather Station Drone for Data Collection',
  'weather-station-drone',
  'Collect atmospheric data at various altitudes for weather monitoring.',
  '<h2>Sensors</h2><p>Temperature, humidity, pressure, air quality (PM2.5), wind speed.</p><h2>Data Collection</h2><p>Vertical profile from 0-100m altitude, record every 5m.</p><h2>Telemetry</h2><p>Real-time data transmission to ground station, CSV logging to SD card.</p><h2>Visualization</h2><p>Generate altitude vs temperature graphs, humidity profiles, pressure charts.</p><h2>Applications</h2><p>Microclimate studies, pollution monitoring, education, hobby meteorology.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Projects', '["weather", "sensors", "data collection", "environment"]', 'published', 9,
  datetime('now', '-43 days'), datetime('now', '-43 days')
),
(
  'Line Following Autonomous Drone',
  'line-following-drone',
  'Build drone that autonomously follows colored lines on the ground.',
  '<h2>Computer Vision</h2><p>Downward camera detects colored tape on floor using HSV color filtering.</p><h2>Control Algorithm</h2><p>PID controller maintains center position over line, adjusts yaw for turns.</p><h2>Implementation</h2><p>OpenCV on companion computer processes video, sends corrections to flight controller.</p><h2>Track Design</h2><p>Create race tracks with loops, intersections, varying widths for challenge.</p><h2>Competition</h2><p>Time trials, fastest completion, obstacle courses, multi-drone racing.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_f1a47aea-7dd7-431f-bfe8-e82d7d001b38',
  1, 'Projects', '["line following", "computer vision", "autonomous", "racing"]', 'published', 11,
  datetime('now', '-41 days'), datetime('now', '-41 days')
),
(
  'Agriculture Crop Monitoring System',
  'agriculture-crop-monitoring',
  'Use multispectral imaging to assess crop health and irrigation needs.',
  '<h2>NDVI Camera</h2><p>Near-infrared camera captures plant health data invisible to human eye.</p><h2>Flight Planning</h2><p>Automated grid patterns cover entire field, consistent altitude and overlap.</p><h2>Image Analysis</h2><p>Generate NDVI maps showing vegetation health, identify problem areas.</p><h2>Insights</h2><p>Detect early disease, optimize irrigation, variable rate fertilization.</p><h2>Farmer Benefits</h2><p>Reduce costs 20%, improve yield 15%, data-driven decision making.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_f1a47aea-7dd7-431f-bfe8-e82d7d001b38',
  1, 'Projects', '["agriculture", "NDVI", "crop monitoring", "farming"]', 'published', 12,
  datetime('now', '-39 days'), datetime('now', '-39 days')
),
(
  'Drone-Based Home Security System',
  'home-security-system',
  'Automated patrol drone with intruder detection and alert system.',
  '<h2>Patrol Routes</h2><p>Program scheduled flights around property perimeter, check all angles.</p><h2>Detection Systems</h2><p>Motion detection, face recognition, unusual sound detection via microphone.</p><h2>Alert Protocol</h2><p>Push notification to phone, stream live video, record evidence, sound alarm.</p><h2>Docking Station</h2><p>Automatic charging base, weather protection, scheduled launches.</p><h2>Privacy</h2><p>Configurable zones, logging, compliance with local regulations.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_f1a47aea-7dd7-431f-bfe8-e82d7d001b38',
  1, 'Projects', '["security", "surveillance", "automation", "home"]', 'published', 10,
  datetime('now', '-37 days'), datetime('now', '-37 days')
),
(
  'Interactive Light Painting Drone',
  'light-painting-drone',
  'Create stunning long-exposure photographs with programmable light trails.',
  '<h2>LED Setup</h2><p>RGB LED strips on drone arms, programmable colors and patterns.</p><h2>Path Programming</h2><p>3D path planning interface, smooth Bezier curves, timing synchronization.</p><h2>Camera Setup</h2><p>DSLR with 10-30 second exposure, low ISO, tripod mounted.</p><h2>Patterns</h2><p>Spirals, helixes, geometric shapes, text writing, artistic designs.</p><h2>Gallery</h2><p>Showcase stunning light painting photos created with FLYQ.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Projects', '["light painting", "photography", "LED", "art"]', 'published', 8,
  datetime('now', '-35 days'), datetime('now', '-35 days')
),
(
  'DIY Drone Racing Course Builder',
  'racing-course-builder',
  'Design and build FPV racing course with timing gates and obstacles.',
  '<h2>Gate Design</h2><p>PVC pipe frames with LED strips, multiple size/shape options.</p><h2>Timing System</h2><p>IR sensors detect drone passage, Arduino-based lap timer.</p><h2>Course Layouts</h2><p>Indoor: tight turns, figure-8, slalom. Outdoor: long straights, vertical elements.</p><h2>Software</h2><p>Lap timing app, leaderboards, race replays, ghost drone comparison.</p><h2>Competition</h2><p>Host races, practice sessions, improve skills, compete with friends.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Projects', '["FPV racing", "course", "competition", "DIY"]', 'published', 11,
  datetime('now', '-33 days'), datetime('now', '-33 days')
);

-- TIPS & TRICKS CATEGORY (8 posts)

INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, author_id, category, tags, status, reading_time, published_at, created_at) VALUES 
(
  '10 Ways to Extend Flight Time',
  'extend-flight-time',
  'Practical tips to maximize your FLYQ drone battery life and flight duration.',
  '<h2>1. Optimal Battery Care</h2><p>Store at 60% charge, avoid full discharge, charge before flight.</p><h2>2. Weight Reduction</h2><p>Remove unnecessary accessories, use lighter camera mounts.</p><h2>3. Smooth Flying</h2><p>Avoid aggressive maneuvers, use gentle inputs, maintain stable altitude.</p><h2>4. Weather Conditions</h2><p>Fly in calm weather, avoid wind, optimal temperature 20-25°C.</p><h2>5. Motor Maintenance</h2><p>Clean motors regularly, lubricate bearings, balance propellers.</p><h2>More Tips</h2><p>Use efficient flight modes, reduce video streaming quality, plan shorter routes, carry spare batteries.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Tips & Tricks', '["battery life", "flight time", "optimization", "tips"]', 'published', 6,
  datetime('now', '-31 days'), datetime('now', '-31 days')
),
(
  'Crash Prevention: Common Mistakes to Avoid',
  'crash-prevention',
  'Learn from common mistakes and prevent crashes with these essential tips.',
  '<h2>Pre-Flight Mistakes</h2><p>Skipping calibration, ignoring battery level, not checking propellers.</p><h2>Flying Errors</h2><p>Flying too high initially, over-correcting, losing orientation, ignoring warnings.</p><h2>Environmental Hazards</h2><p>Strong wind, obstacles, sun glare, electromagnetic interference.</p><h2>Recovery Techniques</h2><p>Level panic drop, emergency landing, regaining control, safe crash procedures.</p><h2>Post-Crash</h2><p>Inspection checklist, damage assessment, repair guide, insurance claims.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Tips & Tricks', '["crash prevention", "safety", "mistakes", "recovery"]', 'published', 7,
  datetime('now', '-29 days'), datetime('now', '-29 days')
),
(
  'Perfect Propeller Balance for Smooth Flight',
  'propeller-balance',
  'How to check and balance propellers for vibration-free flying.',
  '<h2>Why Balance Matters</h2><p>Unbalanced props cause vibration, reduce flight time, stress motors.</p><h2>Testing Balance</h2><p>Use propeller balancer or needle method. Check all four props.</p><h2>Correction Methods</h2><p>Add small pieces of tape to light side, sand heavier side carefully.</p><h2>Verification</h2><p>Re-test after adjustment, verify in hover test, check IMU vibration data.</p><h2>Maintenance Schedule</h2><p>Check every 10 flights, after crashes, when replacing props.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Tips & Tricks', '["propellers", "balance", "maintenance", "vibration"]', 'published', 5,
  datetime('now', '-27 days'), datetime('now', '-27 days')
),
(
  'Mastering Indoor Flying Techniques',
  'indoor-flying-techniques',
  'Expert tips for safe and precise indoor drone operation.',
  '<h2>Space Preparation</h2><p>Clear 3m x 3m area, remove fragile objects, good lighting, close windows.</p><h2>Control Adjustments</h2><p>Reduce expo settings, lower max tilt angle, enable altitude hold.</p><h2>Precision Maneuvers</h2><p>Slow movements, maintain low altitude (1-1.5m), use walls as reference.</p><h2>Common Challenges</h2><p>Ceiling bounce, GPS denial, Wi-Fi interference, limited space.</p><h2>Practice Drills</h2><p>Box patterns, figure-8, tight turns, precision landing on targets.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Tips & Tricks', '["indoor flying", "techniques", "precision", "space"]', 'published', 6,
  datetime('now', '-25 days'), datetime('now', '-25 days')
),
(
  'Photography Tips for Aerial Shots',
  'aerial-photography-tips',
  'Capture stunning aerial photos with your FLYQ Vision drone.',
  '<h2>Camera Settings</h2><p>Use manual mode, ISO 100-400, fast shutter speed 1/500+, RAW format.</p><h2>Composition Rules</h2><p>Rule of thirds, leading lines, symmetry, golden hour lighting.</p><h2>Flight Techniques</h2><p>Smooth movements, orbit shots, reveal techniques, altitude variation.</p><h2>Weather Conditions</h2><p>Best: early morning, late afternoon. Avoid: harsh midday sun, overcast.</p><h2>Post-Processing</h2><p>Adjust exposure, enhance colors, remove distortion, sharpen details.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_f1a47aea-7dd7-431f-bfe8-e82d7d001b38',
  1, 'Tips & Tricks', '["photography", "camera", "tips", "aerial shots"]', 'published', 7,
  datetime('now', '-23 days'), datetime('now', '-23 days')
),
(
  'Quick Fixes for Common Hardware Issues',
  'quick-hardware-fixes',
  'Troubleshoot and repair common hardware problems in the field.',
  '<h2>Motor Not Spinning</h2><p>Check connections, test with multimeter, replace if burnt.</p><h2>Propeller Damage</h2><p>Minor cracks: superglue. Major: replace immediately. Keep spares.</p><h2>Battery Issues</h2><p>Won''t charge: check contacts. Swollen: dispose safely. Low capacity: replace.</p><h2>Frame Cracks</h2><p>Temporary: epoxy/tape. Permanent: carbon fiber patch or new frame.</p><h2>Field Repair Kit</h2><p>Spare props, motors, tools, tape, zip ties, multimeter, soldering iron.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Tips & Tricks', '["repair", "hardware", "fixes", "maintenance"]', 'published', 6,
  datetime('now', '-21 days'), datetime('now', '-21 days')
),
(
  'Wi-Fi Range Enhancement Methods',
  'wifi-range-enhancement',
  'Boost your FLYQ drone communication range for longer flights.',
  '<h2>Antenna Upgrades</h2><p>Replace stock antenna with high-gain directional antenna.</p><h2>RF Shielding</h2><p>Add RF shielding to reduce interference from other electronics.</p><h2>Software Optimization</h2><p>Adjust TX power settings, optimize packet size, reduce data rate.</p><h2>Environmental Factors</h2><p>Avoid 2.4GHz congestion, line of sight, avoid metal obstacles.</p><h2>Results</h2><p>Extend range from 50m to 150m+ with proper modifications.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Tips & Tricks', '["Wi-Fi", "range", "antenna", "optimization"]', 'published', 5,
  datetime('now', '-19 days'), datetime('now', '-19 days')
),
(
  'Winter Flying: Cold Weather Best Practices',
  'winter-flying-tips',
  'Special considerations for flying your FLYQ drone in cold weather.',
  '<h2>Battery Management</h2><p>Warm battery before flight, reduce flight time by 30%, monitor voltage closely.</p><h2>Cold Start Procedure</h2><p>Indoor warmup, extended motor test, verify all systems before takeoff.</p><h2>Flight Considerations</h2><p>Reduced performance, faster discharge, more frequent landings.</p><h2>Equipment Protection</h2><p>Remove snow/ice, dry thoroughly after flight, store at room temperature.</p><h2>Temperature Limits</h2><p>Minimum: -10°C. Below this: risk of component damage.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'Tips & Tricks', '["winter", "cold weather", "temperature", "battery"]', 'published', 6,
  datetime('now', '-17 days'), datetime('now', '-17 days')
);

-- NEWS CATEGORY (5 posts)

INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, author_id, category, tags, status, reading_time, published_at, created_at) VALUES 
(
  'FLYQ Firmware 2.0 Released: Major Update',
  'firmware-2-0-released',
  'New firmware brings improved stability, new flight modes, and enhanced performance.',
  '<h2>What''s New</h2><p>Firmware 2.0 is our biggest update yet with major improvements across the board.</p><h2>Key Features</h2><ul><li><strong>Enhanced Stabilization:</strong> New PID algorithm for 40% smoother flight</li><li><strong>Sport Mode:</strong> Increased speed and agility for experienced pilots</li><li><strong>Smart RTH:</strong> Automatic return home on low battery or signal loss</li><li><strong>Improved Wi-Fi:</strong> 30% longer range and more stable connection</li></ul><h2>Performance Improvements</h2><p>Battery efficiency improved by 15%, faster sensor processing, reduced latency.</p><h2>How to Update</h2><p>Connect via USB, open FLYQ Updater tool, follow instructions. Backup settings first!</p><h2>Feedback</h2><p>Community response overwhelmingly positive. Join forum to discuss features.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'News', '["firmware", "update", "release", "features"]', 'published', 5,
  datetime('now', '-15 days'), datetime('now', '-15 days')
),
(
  'FLYQ Community Reaches 10,000 Pilots',
  'community-10k-milestone',
  'Celebrating our growing community of drone enthusiasts worldwide.',
  '<h2>Milestone Achievement</h2><p>We''re thrilled to announce 10,000 registered FLYQ pilots globally!</p><h2>Community Highlights</h2><ul><li>5,000+ forum discussions</li><li>1,200+ project showcases</li><li>850+ code contributions</li><li>42 countries represented</li></ul><h2>Top Contributors</h2><p>Special recognition to community members sharing tutorials, troubleshooting, and inspiring projects.</p><h2>Community Events</h2><p>Virtual drone racing championship, code competition, photography contest coming soon.</p><h2>Thank You</h2><p>Your passion drives innovation. Together we''re building something amazing!</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'News', '["community", "milestone", "celebration", "users"]', 'published', 4,
  datetime('now', '-13 days'), datetime('now', '-13 days')
),
(
  'New Expansion Packs: Camera and Sensors',
  'new-expansion-packs',
  'Introducing official expansion kits for FLYQ Air: Camera Module and Sensor Pack.',
  '<h2>Camera Expansion Kit</h2><p>Transform FLYQ Air into Vision-capable drone. Includes OV2640 camera, mount, cables. Full HD 720p video streaming.</p><h2>Sensor Expansion Pack</h2><p>Add ultrasonic distance sensor, GPS module, digital compass. Enable advanced autonomous features.</p><h2>Pricing</h2><p>Camera Kit: ₹2,499. Sensor Pack: ₹1,999. Bundle: ₹3,999 (save ₹500).</p><h2>Availability</h2><p>Pre-orders open now, shipping starts next month. Limited first batch.</p><h2>Compatibility</h2><p>Works with all FLYQ Air units. Firmware 2.0+ required.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'News', '["expansion", "accessories", "camera", "sensors"]', 'published', 5,
  datetime('now', '-11 days'), datetime('now', '-11 days')
),
(
  'FLYQ Education Program Launches',
  'education-program-launch',
  'New curriculum and resources for schools teaching drone programming.',
  '<h2>Program Overview</h2><p>Free educational resources for teachers incorporating FLYQ into STEM curriculum.</p><h2>What''s Included</h2><ul><li>12-week lesson plans</li><li>Video tutorials for teachers</li><li>Student workbooks</li><li>Assessment tools</li><li>Classroom management software</li></ul><h2>School Pricing</h2><p>Special bulk discount: 10+ units at 25% off. Grants available for eligible schools.</p><h2>Success Stories</h2><p>Pilot program in 20 schools showed 85% student engagement increase.</p><h2>Apply Now</h2><p>Schools can register at education.flyq.com for free resources.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'News', '["education", "schools", "STEM", "curriculum"]', 'published', 6,
  datetime('now', '-9 days'), datetime('now', '-9 days')
),
(
  'First FLYQ Racing Championship Announced',
  'racing-championship-announced',
  'Join the inaugural FLYQ Racing Championship with prizes worth ₹50,000.',
  '<h2>Competition Details</h2><p>FPV racing competition for FLYQ pilots across 3 categories: Beginner, Intermediate, Expert.</p><h2>Prize Pool</h2><ul><li>1st Place: ₹25,000 + Trophy</li><li>2nd Place: ₹15,000</li><li>3rd Place: ₹10,000</li><li>Top 10: FLYQ merchandise</li></ul><h2>Rules</h2><p>Stock FLYQ Air or Vision, manual mode only, timed qualification rounds, elimination brackets.</p><h2>Registration</h2><p>Opens next week at racing.flyq.com. Limited to 100 participants per category.</p><h2>Schedule</h2><p>Qualifiers: March 1-15. Finals: March 30 live-streamed event.</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1, 'News', '["racing", "competition", "championship", "prizes"]', 'published', 5,
  datetime('now', '-7 days'), datetime('now', '-7 days')
);

-- Verify counts
-- SELECT category, COUNT(*) as count FROM blog_posts GROUP BY category;
-- Insert Getting Started blog post
INSERT INTO blog_posts (
  title,
  slug,
  excerpt,
  content,
  featured_image,
  author_id,
  category,
  tags,
  status,
  reading_time,
  published_at,
  created_at
) VALUES (
  'Getting Started with FLYQ: Your First Programmable Drone',
  'getting-started-with-flyq',
  'Complete beginner guide to flying your FLYQ drone safely. Learn about preflight checks, LED indicators, mobile app setup, and your first flight step-by-step.',
  '<h2>Introduction</h2>
<p>Welcome to the exciting world of programmable drones! Whether you''re a beginner learning robotics or an experienced developer exploring IoT applications, FLYQ makes drone programming accessible and fun. This comprehensive guide will walk you through everything you need to know to get your FLYQ drone flying safely and confidently.</p>

<h2>Preflight Check</h2>
<p>Before powering up your FLYQ drone, complete these essential checks to ensure a safe and successful flight:</p>

<h3>1. Choose Your Flying Location</h3>
<ul>
<li>Find a flat, level surface free of obstacles</li>
<li>Ensure at least 3 meters clearance in all directions</li>
<li>Avoid flying near people, animals, or fragile objects</li>
<li>Check for adequate lighting conditions</li>
<li>Verify no strong winds (max recommended: 10 km/h for beginners)</li>
</ul>

<h3>2. Position the Drone Correctly</h3>
<ul>
<li>Place your FLYQ on a completely flat surface</li>
<li>Orient the drone with the <strong>front (nose) facing away</strong> from you</li>
<li>The FLYQ logo on top should be clearly visible</li>
<li>Ensure all four landing gear pads are touching the ground evenly</li>
</ul>

<h3>3. Battery Installation and Securing</h3>
<p><strong>FLYQ Air</strong>:</p>
<ul>
<li>Slide the 3.7V 600mAh LiPo battery into the battery compartment</li>
<li>Connect the JST connector (red = positive, black = negative)</li>
<li>Secure with the Velcro strap to prevent movement during flight</li>
</ul>

<p><strong>FLYQ Vision</strong>:</p>
<ul>
<li>Install the larger 3.7V 800mAh battery for extended flight with camera</li>
<li>Ensure battery is seated flush in the compartment</li>
<li>Double-check Velcro strap is tight</li>
</ul>

<blockquote>
<p><strong>⚠️ Battery Safety Warning</strong>: Never use a damaged or swollen battery. Ensure correct polarity when connecting. Remove battery when not in use for extended periods.</p>
</blockquote>

<h2>Powering Up Your FLYQ Drone</h2>

<h3>Power-On Sequence</h3>
<ol>
<li><strong>Turn on the drone</strong> using the power button on the side</li>
<li><strong>Wait 3-5 seconds</strong> for the ESP32-S3 to initialize</li>
<li><strong>Do NOT move or touch the drone</strong> during initialization - The accelerometer and gyroscope are calibrating</li>
</ol>

<h3>Understanding LED Indicators</h3>
<p>Your FLYQ has three status LEDs that provide important information:</p>

<h4>PWR LED (Power)</h4>
<ul>
<li><strong>Solid Blue</strong>: Power on, normal operation</li>
<li><strong>Off</strong>: No power/battery disconnected</li>
</ul>

<h4>SYS LED (System Status)</h4>
<ul>
<li><strong>Slow Blink (1 Hz)</strong>: System initializing</li>
<li><strong>Solid Green</strong>: Ready to fly</li>
<li><strong>Fast Blink (5 Hz)</strong>: Calibration in progress</li>
<li><strong>Red Solid</strong>: System error, check battery or restart</li>
</ul>

<h4>LINK LED (Connection Status)</h4>
<ul>
<li><strong>Off</strong>: Not connected to controller/app</li>
<li><strong>Slow Blink</strong>: Searching for connection</li>
<li><strong>Solid Blue</strong>: Successfully connected to Wi-Fi/app</li>
<li><strong>Fast Blink</strong>: Receiving control commands</li>
</ul>

<h2>FLYQ Mobile App Setup</h2>

<h3>Download and Install</h3>
<p><strong>For iOS (iPhone/iPad)</strong>:</p>
<ol>
<li>Open the App Store</li>
<li>Search for "FLYQ Drone Controller"</li>
<li>Tap "Get" and install (requires iOS 13.0 or later)</li>
<li>Grant permissions: Location, Camera (for FLYQ Vision), Bluetooth</li>
</ol>

<p><strong>For Android</strong>:</p>
<ol>
<li>Open Google Play Store</li>
<li>Search for "FLYQ Drone Controller"</li>
<li>Tap "Install" (requires Android 8.0 or later)</li>
</ol>

<h2>Connecting to Your FLYQ Drone</h2>

<h3>Step 1: Configure Your Phone</h3>
<p>Before connecting, optimize your phone settings:</p>
<ul>
<li><strong>Disable Mobile Data</strong>: Go to Settings → Mobile Data → Turn OFF</li>
<li><strong>Enable Location Services</strong>: Settings → Privacy → Location → Turn ON</li>
<li><strong>Enable Wi-Fi</strong>: Settings → Wi-Fi → Turn ON</li>
</ul>

<h3>Step 2: Connect to FLYQ Wi-Fi Hotspot</h3>
<ol>
<li><strong>Power on your FLYQ drone</strong> and wait for LINK LED to start blinking</li>
<li><strong>Open Wi-Fi settings</strong> on your phone</li>
<li><strong>Look for the FLYQ network</strong>: SSID Format: <code>FLYQ-XXXX</code> (where XXXX is your drone''s last 4 digits of MAC address)</li>
<li><strong>Tap the FLYQ-XXXX network</strong> to connect</li>
<li><strong>Enter the password</strong>: <code>flyq2024</code> (default password)</li>
</ol>

<h3>Step 3: Launch the FLYQ App</h3>
<ol>
<li><strong>Open the FLYQ Drone Controller app</strong></li>
<li><strong>Tap the "Connect" button</strong> on the home screen</li>
<li><strong>Wait for automatic connection</strong> (3-5 seconds)</li>
<li><strong>Look for confirmation</strong>: App shows "Connected" with a green checkmark and LINK LED on drone turns solid blue</li>
</ol>

<h2>Safety Tips and Best Practices</h2>

<h3>Before Every Flight</h3>
<ul>
<li>✅ Check battery is fully charged (≥ 3.8V per cell)</li>
<li>✅ Verify propellers are undamaged and properly oriented</li>
<li>✅ Confirm clear flying area with no obstacles</li>
<li>✅ Check weather conditions (no rain, light wind only)</li>
<li>✅ Ensure mobile app shows strong connection (> 70% signal)</li>
</ul>

<h3>During Flight</h3>
<ul>
<li>👀 <strong>Maintain Visual Line of Sight</strong>: Always keep your drone visible</li>
<li>🚫 <strong>Avoid Flying Over People</strong>: Stay at least 10m away from bystanders</li>
<li>🌬️ <strong>Monitor Wind</strong>: Land immediately if wind picks up</li>
<li>🔋 <strong>Watch Battery</strong>: Land when battery reaches 20% (app will alert you)</li>
<li>📱 <strong>Stay Connected</strong>: If you see connection warnings, land immediately</li>
</ul>

<h2>Your First Flight: Step-by-Step</h2>

<h3>Takeoff</h3>
<ol>
<li><strong>Tap the "Takeoff" button</strong> in the app</li>
<li><strong>Drone will automatically ascend</strong> to 1 meter and hover</li>
<li><strong>Keep hands ready</strong> on the virtual sticks</li>
<li><strong>Watch the drone''s orientation</strong> - front should face away from you</li>
</ol>

<h3>Basic Maneuvers</h3>
<ul>
<li><strong>Hover</strong>: Release all sticks - drone maintains position</li>
<li><strong>Ascend</strong>: Push left stick up gently</li>
<li><strong>Descend</strong>: Push left stick down gently</li>
<li><strong>Rotate</strong>: Push left stick left or right</li>
<li><strong>Forward</strong>: Push right stick up</li>
<li><strong>Backward</strong>: Pull right stick down</li>
<li><strong>Left/Right</strong>: Push right stick left or right</li>
</ul>

<h3>Landing</h3>
<ol>
<li><strong>Position drone over takeoff spot</strong> (or any safe landing area)</li>
<li><strong>Tap the "Land" button</strong>, or manually descend</li>
<li><strong>Motors will automatically stop</strong> when landed</li>
</ol>

<h2>Troubleshooting</h2>

<h3>Drone drifts during hover</h3>
<p><strong>Solution</strong>: Perform accelerometer calibration in app settings, ensure flying on level ground, check for wind conditions.</p>

<h3>App loses connection frequently</h3>
<p><strong>Solution</strong>: Ensure mobile data is disabled, move closer to drone (max range: 50m), check for Wi-Fi interference from other devices.</p>

<h3>Battery drains quickly</h3>
<p><strong>Solution</strong>: Charge battery fully before flight, check battery health (bulging = replace), reduce aggressive maneuvers, fly in calm conditions.</p>

<h2>Next Steps</h2>
<ul>
<li><strong>Learn Programming</strong>: Explore the FLYQ Python SDK for custom flight patterns</li>
<li><strong>Join the Community</strong>: Share your flights on social media #FLYQDrone</li>
<li><strong>Expand Your FLYQ</strong>: Add sensors via the 24-pin GPIO header</li>
</ul>

<h2>Support and Resources</h2>
<p><strong>Need Help?</strong></p>
<ul>
<li><strong>Email</strong>: support@flyq.com</li>
<li><strong>Live Chat</strong>: Available on flyqdrone.in</li>
<li><strong>Community Forum</strong>: community.flyq.com</li>
</ul>

<p><strong>Documentation</strong>:</p>
<ul>
<li><strong>Full Manual</strong>: Download from flyqdrone.in/docs</li>
<li><strong>API Reference</strong>: docs.flyq.com/api</li>
<li><strong>Video Tutorials</strong>: youtube.com/@FLYQDrones</li>
</ul>

<h2>Conclusion</h2>
<p>Congratulations on completing the getting started guide! You now have all the knowledge needed to safely fly your FLYQ drone. Remember, every expert pilot started as a beginner - practice regularly, fly safely, and most importantly, have fun!</p>

<p>The sky is no longer the limit - it''s your playground. Welcome to the FLYQ community! 🚁✈️</p>

<p><strong>Happy Flying!</strong><br>— The FLYQ Team</p>',
  'https://cdn1.genspark.ai/user-upload-image/rmbg_generated/0_435c9a66-800a-4537-80f8-cd513ea4bf15',
  1,
  'Getting Started',
  '["beginners", "tutorial", "setup", "first flight", "safety", "ESP32-S3"]',
  'published',
  8,
  datetime('now'),
  datetime('now')
);

-- Update category post count
UPDATE blog_categories SET post_count = post_count + 1 WHERE name = 'Getting Started';
