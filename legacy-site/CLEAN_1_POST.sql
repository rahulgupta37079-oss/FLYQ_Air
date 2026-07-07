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
