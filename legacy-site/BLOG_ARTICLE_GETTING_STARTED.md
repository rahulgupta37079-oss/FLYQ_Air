# Getting Started with FLYQ: Your First Programmable Drone

**Category**: Getting Started  
**Reading Time**: 8 minutes  
**Author**: FLYQ Team  
**Published**: November 19, 2025

---

## Introduction

Welcome to the exciting world of programmable drones! Whether you're a beginner learning robotics or an experienced developer exploring IoT applications, FLYQ makes drone programming accessible and fun. This comprehensive guide will walk you through everything you need to know to get your FLYQ drone flying safely and confidently.

---

## Preflight Check

Before powering up your FLYQ drone, complete these essential checks to ensure a safe and successful flight:

### 1. **Choose Your Flying Location**
- Find a flat, level surface free of obstacles
- Ensure at least 3 meters clearance in all directions
- Avoid flying near people, animals, or fragile objects
- Check for adequate lighting conditions
- Verify no strong winds (max recommended: 10 km/h for beginners)

### 2. **Position the Drone Correctly**
- Place your FLYQ on a completely flat surface
- Orient the drone with the **front (nose) facing away** from you
- The FLYQ logo on top should be clearly visible
- Ensure all four landing gear pads are touching the ground evenly

**[Image: FLYQ drone on flat surface, nose forward]**

### 3. **Battery Installation and Securing**
- **FLYQ Air**: 
  - Slide the 3.7V 600mAh LiPo battery into the battery compartment
  - Connect the JST connector (red = positive, black = negative)
  - Secure with the Velcro strap to prevent movement during flight
  
- **FLYQ Vision**:
  - Install the larger 3.7V 800mAh battery for extended flight with camera
  - Ensure battery is seated flush in the compartment
  - Double-check Velcro strap is tight

**⚠️ Battery Safety Warning**:
- Never use a damaged or swollen battery
- Ensure correct polarity when connecting
- Remove battery when not in use for extended periods

**[Image: Battery installation with JST connector and Velcro strap]**

### 4. **Visual Inspection**
- ✅ Check all four propellers are intact and undamaged
- ✅ Verify propellers spin freely without obstruction
- ✅ Inspect motor mounts for secure attachment
- ✅ Confirm no loose wires or components
- ✅ Clean camera lens (FLYQ Vision only)

---

## Powering Up Your FLYQ Drone

### Power-On Sequence

1. **Turn on the drone** using the power button on the side
2. **Wait 3-5 seconds** for the ESP32-S3 to initialize
3. **Do NOT move or touch the drone** during initialization
   - The accelerometer and gyroscope are calibrating
   - Movement during this phase can cause unstable flight

### Understanding LED Indicators

Your FLYQ has three status LEDs that provide important information:

#### **PWR LED (Power)**
- **Solid Blue**: Power on, normal operation
- **Off**: No power/battery disconnected

#### **SYS LED (System Status)**
- **Slow Blink (1 Hz)**: System initializing
- **Solid Green**: Ready to fly
- **Fast Blink (5 Hz)**: Calibration in progress
- **Red Solid**: System error, check battery or restart

#### **LINK LED (Connection Status)**
- **Off**: Not connected to controller/app
- **Slow Blink**: Searching for connection
- **Solid Blue**: Successfully connected to Wi-Fi/app
- **Fast Blink**: Receiving control commands

**[Image: LED panel with labels for PWR, SYS, and LINK LEDs]**

### What to Expect
After power-on, you should see:
1. PWR LED turns solid blue (immediate)
2. SYS LED blinks slowly for 3-5 seconds (calibration)
3. SYS LED turns solid green (ready)
4. LINK LED starts slow blinking (waiting for app connection)

---

## Controller Response Test (Optional)

If you're using a physical controller with your FLYQ:

### Pre-flight Motor Test
1. **Arm the motors** (if your controller has an arming sequence)
2. **Gently raise the throttle** to about 20%
3. **Listen for motor response** - all four motors should spin equally
4. **Test yaw** by moving the left stick left/right
   - Front-right and back-left motors should speed up (left yaw)
   - Front-left and back-right motors should speed up (right yaw)
5. **Test pitch/roll** with the right stick
   - Forward stick: back motors speed up
   - Backward stick: front motors speed up
   - Left stick: right motors speed up
   - Right stick: left motors speed up

**[Image: Controller stick directions and corresponding motor responses]**

---

## FLYQ Mobile App Setup

### Download and Install

**For iOS (iPhone/iPad)**:
1. Open the App Store
2. Search for "FLYQ Drone Controller"
3. Tap "Get" and install (requires iOS 13.0 or later)
4. Grant permissions: Location, Camera (for FLYQ Vision), Bluetooth

**For Android**:
1. Open Google Play Store
2. Search for "FLYQ Drone Controller"
3. Tap "Install" (requires Android 8.0 or later)
4. Or scan the QR code in your FLYQ manual for direct download

**App Permissions Required**:
- ✅ **Location**: Required for GPS features and regulatory compliance
- ✅ **Wi-Fi**: To connect to your FLYQ's hotspot
- ✅ **Camera**: For live video streaming (FLYQ Vision)
- ✅ **Storage**: To save photos and videos

---

## Connecting to Your FLYQ Drone

### Step 1: Configure Your Phone

Before connecting, optimize your phone settings:

**For Both iOS and Android**:
1. **Disable Mobile Data**: Go to Settings → Mobile Data → Turn OFF
   - This ensures your phone doesn't prefer cellular over Wi-Fi
2. **Enable Location Services**: Settings → Privacy → Location → Turn ON
3. **Enable Wi-Fi**: Settings → Wi-Fi → Turn ON

**Why?**: Your FLYQ creates its own Wi-Fi hotspot. Disabling mobile data prevents your phone from disconnecting to search for internet.

### Step 2: Connect to FLYQ Wi-Fi Hotspot

1. **Power on your FLYQ drone** and wait for LINK LED to start blinking
2. **Open Wi-Fi settings** on your phone
3. **Look for the FLYQ network**:
   - **SSID Format**: `FLYQ-XXXX` (where XXXX is your drone's last 4 digits of MAC address)
   - **Example**: `FLYQ-A3F2`, `FLYQ-B8C4`
4. **Tap the FLYQ-XXXX network** to connect
5. **Enter the password**: `flyq2024` (default password)
   - Note: You can change this in the app settings later
6. **Wait for connection** - your phone should show "Connected" with no internet icon (this is normal!)

**[Image: Phone Wi-Fi screen showing FLYQ-XXXX network]**

### Step 3: Launch the FLYQ App

1. **Open the FLYQ Drone Controller app**
2. **Tap the "Connect" button** on the home screen
3. **Wait for automatic connection** (3-5 seconds)
4. **Look for confirmation**:
   - App shows "Connected" with a green checkmark
   - LINK LED on drone turns solid blue
   - You should hear a brief confirmation tone

**[Image: FLYQ app home screen with Connect button and connection status]**

### Troubleshooting Connection Issues

**If connection fails**:
- ❌ **"Cannot find FLYQ network"**: 
  - Ensure drone is powered on and LINK LED is blinking
  - Restart the drone and wait 10 seconds
  
- ❌ **"Wrong password"**:
  - Default is `flyq2024` (all lowercase)
  - Try forgetting the network and reconnecting
  
- ❌ **"Connected but app won't link"**:
  - Close and reopen the FLYQ app
  - Disable VPN if you have one running
  - Check that mobile data is disabled

---

## Understanding the FLYQ App Interface

### Main Screen Elements

**[Image: FLYQ app main interface with labeled sections]**

#### 1. **Connection Status** (Top Center)
- Green: Connected and ready to fly
- Yellow: Connecting...
- Red: Disconnected
- Battery level of drone displayed next to status

#### 2. **Left Virtual Stick** (Throttle & Yaw)
- **Up/Down**: Throttle (altitude control)
  - Up = Ascend
  - Down = Descend
- **Left/Right**: Yaw (rotation)
  - Left = Rotate counter-clockwise
  - Right = Rotate clockwise

#### 3. **Right Virtual Stick** (Pitch & Roll)
- **Up/Down**: Pitch (forward/backward)
  - Up = Fly forward
  - Down = Fly backward
- **Left/Right**: Roll (left/right movement)
  - Left = Fly left
  - Right = Fly right

#### 4. **Quick Action Buttons**
- **Takeoff/Land**: Automatic takeoff to 1m or gentle landing
- **Emergency Stop**: Immediately cuts power to motors (use only in emergency!)
- **Return to Home**: Activates GPS return (FLYQ Vision only)
- **Photo/Video**: Camera controls (FLYQ Vision only)

#### 5. **Settings Menu** (Gear Icon)
- Flight Mode: Beginner / Sport / Advanced
- Control Sensitivity: Adjust stick response
- Altitude Limit: Set maximum height (default: 30m)
- Speed Limit: Set maximum horizontal speed
- LED Brightness: Adjust indicator brightness
- Wi-Fi Password: Change default password
- Firmware Update: Check for updates

#### 6. **Telemetry Data** (Bottom)
- Altitude (m)
- Speed (m/s)
- Battery voltage (V)
- Signal strength (%)
- GPS satellites (FLYQ Vision)
- Flight time remaining

---

## Flight Modes Explained

### Beginner Mode (Recommended for First Flight)
- **Max Speed**: 2 m/s
- **Max Altitude**: 10 m
- **Control**: Gentle, stable, self-leveling
- **Wind Resistance**: Active stabilization
- **Best For**: Learning basic controls, indoor flying

### Sport Mode
- **Max Speed**: 5 m/s
- **Max Altitude**: 30 m
- **Control**: Responsive, more aggressive
- **Wind Resistance**: Moderate stabilization
- **Best For**: Outdoor flying, experienced pilots

### Advanced Mode (Acro)
- **Max Speed**: 8 m/s
- **Max Altitude**: 50 m
- **Control**: Full manual, no auto-leveling
- **Wind Resistance**: Minimal assistance
- **Best For**: FPV flying, tricks, racing

**⚠️ Important**: Always start in Beginner Mode until you're comfortable with the controls!

---

## Safety Tips and Best Practices

### Before Every Flight
- ✅ Check battery is fully charged (≥ 3.8V per cell)
- ✅ Verify propellers are undamaged and properly oriented
- ✅ Confirm clear flying area with no obstacles
- ✅ Check weather conditions (no rain, light wind only)
- ✅ Ensure mobile app shows strong connection (> 70% signal)

### During Flight
- 👀 **Maintain Visual Line of Sight**: Always keep your drone visible
- 🚫 **Avoid Flying Over People**: Stay at least 10m away from bystanders
- 🌬️ **Monitor Wind**: Land immediately if wind picks up
- 🔋 **Watch Battery**: Land when battery reaches 20% (app will alert you)
- 📱 **Stay Connected**: If you see connection warnings, land immediately

### After Flight
- 🔌 **Disconnect Battery**: Remove battery if not flying again within 30 minutes
- 🧹 **Clean Drone**: Wipe dust from motors and propellers
- 📊 **Check Telemetry**: Review flight data in app for any errors
- 🔋 **Charge Battery**: Charge to 3.8V per cell for storage (not full 4.2V)

---

## Final Checklist Before Takeoff

Before your first flight, confirm:

- [ ] Battery charged to 100% (4.2V per cell) and securely installed
- [ ] Drone on completely level surface
- [ ] All four propellers installed correctly:
  - CW props on front-right and back-left motors (usually marked with 'A')
  - CCW props on front-left and back-right motors (usually marked with 'B')
- [ ] PWR LED solid blue
- [ ] SYS LED solid green (ready state)
- [ ] LINK LED solid blue (connected to app)
- [ ] Mobile app shows "Connected" status
- [ ] Flying area clear of obstacles and people
- [ ] Wind conditions acceptable (< 10 km/h)
- [ ] Flight mode set to "Beginner"
- [ ] Emergency stop button location known

**You're ready to fly! 🚀**

---

## Your First Flight: Step-by-Step

### Takeoff
1. **Tap the "Takeoff" button** in the app
2. **Drone will automatically ascend** to 1 meter and hover
3. **Keep hands ready** on the virtual sticks
4. **Watch the drone's orientation** - front should face away from you

### Basic Maneuvers
1. **Hover**: Release all sticks - drone maintains position
2. **Ascend**: Push left stick up gently
3. **Descend**: Push left stick down gently
4. **Rotate**: Push left stick left or right
5. **Forward**: Push right stick up
6. **Backward**: Pull right stick down
7. **Left/Right**: Push right stick left or right

### Landing
1. **Position drone over takeoff spot** (or any safe landing area)
2. **Tap the "Land" button**, or
3. **Manually descend** by pulling left stick down until drone touches ground
4. **Motors will automatically stop** when landed
5. **Wait for confirmation** (SYS LED will return to solid green)

---

## Common Issues and Solutions

### Issue: Drone drifts during hover
**Solution**: 
- Perform accelerometer calibration in app settings
- Ensure flying on level ground
- Check for wind conditions

### Issue: One motor not spinning
**Solution**:
- Check propeller is not obstructed
- Verify propeller is correctly installed
- Inspect motor connections
- Try motor test in app settings

### Issue: App loses connection frequently
**Solution**:
- Ensure mobile data is disabled
- Move closer to drone (max range: 50m)
- Check for Wi-Fi interference from other devices
- Update app to latest version

### Issue: Battery drains quickly
**Solution**:
- Charge battery fully before flight
- Check battery health (bulging = replace)
- Reduce aggressive maneuvers
- Fly in calm conditions (wind drains battery faster)

### Issue: Camera feed is laggy (FLYQ Vision)
**Solution**:
- Move closer to drone
- Reduce camera resolution in settings
- Close other apps on phone
- Ensure strong Wi-Fi connection (> 70%)

---

## Next Steps

### Learn Programming
- Explore the FLYQ Python SDK for custom flight patterns
- Try Arduino sketches for sensor integration
- Access our 8-week curriculum for structured learning

### Join the Community
- Share your flights on social media #FLYQDrone
- Visit our forum at community.flyq.com
- Subscribe to our YouTube channel for tutorials
- Follow @FLYQDrones on Twitter for updates

### Expand Your FLYQ
- Add sensors via the 24-pin GPIO header
- Integrate CrazyFlie Python API for autonomous missions
- 3D print custom parts from our open-source designs
- Build projects: line following, object tracking, swarm flying

---

## Support and Resources

### Need Help?
- **Email**: support@flyq.com
- **Phone**: +91-XXXX-XXXXXX
- **Live Chat**: Available on flyqdrone.in
- **Community Forum**: community.flyq.com

### Documentation
- **Full Manual**: Download from flyqdrone.in/docs
- **API Reference**: docs.flyq.com/api
- **Video Tutorials**: youtube.com/@FLYQDrones
- **GitHub**: github.com/flyq-drones

---

## Conclusion

Congratulations on completing the getting started guide! You now have all the knowledge needed to safely fly your FLYQ drone. Remember, every expert pilot started as a beginner - practice regularly, fly safely, and most importantly, have fun!

The sky is no longer the limit - it's your playground. Welcome to the FLYQ community! 🚁✈️

---

**Happy Flying!**  
— The FLYQ Team

---

*Last Updated: November 19, 2025*  
*Article Version: 1.0*  
*Tested with: FLYQ Air v1.0 & FLYQ Vision v1.0*  
*App Version: FLYQ Controller v2.3.0 (iOS & Android)*
