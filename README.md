# FLYQ Air - The Programmable Drone

## 📢 Recent Updates (2025-10-30)
✅ **Gallery Updated**: Replaced gallery images with 4 transparent PNG drone images (backgrounds removed)
✅ **YouTube Video Removed**: Video demo section completely removed from landing page
✅ **GitHub Synced**: All changes pushed to repository
✅ **Backup Created**: Project backup available

## 🚀 Project Overview
**FLYQ Air** is a complete website for an ESP32-S3 based programmable drone platform. Features include a stunning landing page and comprehensive documentation page with a **Midnight Blue + White + Silver** premium color scheme inspired by aerospace and technology.

## ✨ Features

### Landing Page (/)
- **Hero Section**: New FLYQ Air drone image with premium glow effects
- **Features Grid**: 6 feature cards showcasing key product benefits
- **Video Demo**: ✅ REMOVED - YouTube video section removed as requested
- **Programming Section**: Code examples (ESP-IDF, Arduino, Python)
- **Technical Specifications**: Complete hardware specs
- **Image Gallery**: ✅ UPDATED - 4 transparent PNG drone images with removed backgrounds:
  1. FLYQ Air - Top View (complete assembly)
  2. Component Overview (all parts included)
  3. Propeller Detail (with protective guard)
  4. Motor Assembly (716 brushed motor)
- **Call-to-Action**: **Passion 3D World** as exclusive dealer
- **Responsive Design**: Mobile-friendly navigation

### Documentation Page (/docs)
**COMPREHENSIVE TECHNICAL REFERENCE** - ALL information from Circuit Digest LiteWing integrated!

- **Sticky Sidebar Navigation**: Quick access to 20+ detailed sections
- **Overview & Introduction**: Product purpose, design philosophy, key benefits
- **Key Features Grid**: 6 highlighted features with visual cards
- **Complete Technical Specifications**: Full specs table with all hardware parameters

#### Hardware Design (Detailed)
- **PCB Frame Architecture**: All-in-one design eliminating 3D printing needs
- **ESP32-S3 Module**: Dual-core specs, capabilities, USB integration details
- **MPU6050 IMU Sensor**: 6-axis motion tracking, calibration importance
- **Power Management System**: 
  - USB-C input with CCx pull-downs
  - TP4056 1A Li-ion charger with status LEDs
  - SPX3819 LDO voltage regulation
  - Power path control with P-MOSFET
  - Battery voltage monitoring via ADC
  - Slide switch power control
- **Motor Driver Circuits**: 4x IRLML6344 MOSFET with PWM control, flyback protection
- **Programming Interface**: CH340K USB-UART bridge with 2N7002DW auto-reset
- **Status LED System**: 6 LEDs (PWR, CHRG, FULL, SYS, LINK, ERR) with behavior table
- **Audio Output**: Optional piezo buzzer connector

#### Circuit Schematics (Complete with Images)
- USB Input & Power Path Control schematic + explanation
- Battery Charger Circuit (TP4056) schematic + explanation
- Battery Monitoring & On/Off Switch schematic + explanation  
- USB-UART Bridge & Auto-Reset schematic + explanation
- ESP32-S3 SoC Connections schematic + explanation
- MPU6050 IMU Circuit schematic + explanation
- Motor Driver Circuits (4x) schematic + explanation
- Status LED Circuit schematic + explanation
- Expansion Connector Pinout schematic + explanation
- Expansion Module SMD Pads schematic + explanation
- GitHub links to download all design files

#### GPIO Pinout Reference
- **Complete 24-pin mapping table** with ESP32-S3 GPIO assignments
- Pinout diagram image included
- Connector groups (4 groups with 6 pins each)
- Silkscreen labeling corrections documented (Rev 1 errors)
- Interface breakdowns: I2C, Aux I2C, SPI, UART, Audio, Power

#### Firmware & Development
- **Firmware Architecture**: ESP-IDF + ESP-Drone + Crazyflie foundation
- Flight Control Core components
- Hardware driver organization
- Communication modules overview
- Software libraries included
- Crazyflie compatibility (cfclient & cflib)
- Firmware download links
- Flashing procedures

#### Programming Options (4 Methods)
- ESP-IDF native development with commands
- Arduino IDE with example code
- Python SDK (cflib) with code examples
- Crazyflie CFClient for PC control

#### Optional Sensors & Expansion
- **VL53L1X ToF**: Height hold (tested & working)
- **MS5611 Barometer**: Altitude hold
- **PMW3901 Optical Flow**: Position hold
- SMD solder pad locations on PCB bottom
- Assisted flight mode status (CFClient only currently)
- Custom expansion options with 24-pin connector

#### Assembly Guide (Comprehensive)
- What's included in kit
- Propeller identification (Type A CW, Type B CCW)
- Critical propeller placement warnings
- PCB marking reference images
- 5-step assembly procedure with details
- Correct vs incorrect assembly comparison
- Multiple assembly reference images

#### Battery Selection & Power
- **Recommended battery**: 650mAh 1S LiPo 30C
- Battery specifications table (min vs recommended)
- Discharge rate importance (20C min, 30C+ recommended)
- Flight time expectations (5-7 min)
- Charging time (1-2 hours)
- Payload capacity (~25g)
- **7 Battery Safety Guidelines** (critical warnings)

#### Getting Started (Detailed)
- Pre-flight setup with 4-step checklist
- IMU calibration procedure (critical!)
- Connection setup (Android/iOS)
- Safety warnings section
- 8-step first flight procedure
- Mobile app setup (Android & iOS separate guides)
- PC control via CFClient setup

#### Troubleshooting (7 Major Issues)
- App won't connect (6 solutions)
- Drone reboots during takeoff (battery issue)
- No response when connected (calibration)
- Wrong propeller orientation (visual guide)
- Unstable flight/drifting (6 causes)
- Short flight time (5 solutions)
- Firmware upload fails (5 solutions)
- Support contact options

#### Tutorials & Projects
- Gesture Control with Python (live link)
- Arduino Flight Control (coming soon)
- AI Object Tracking (coming soon)
- Autonomous Waypoint Navigation (coming soon)

#### Known Issues & Limitations
- Silkscreen labeling errors (Rev 1)
- Assisted flight features (CFClient only)
- Wi-Fi range limitations (30-50m)
- Wind sensitivity (indoor/calm weather only)
- Battery discharge requirements

#### Resources & Support
- GitHub repository links
- Official store (Passion 3D World)
- WhatsApp community
- Main website link
- Email support contact

## 🎨 Design Theme
**Color Scheme: Navy + Cyan + White (Option 2)**
- **Navy Blue**: #0C1E3D (Deep professional navy)
- **Cyan**: #00D9FF (Bright energetic cyan)
- **Sky Blue**: #06B6D4 (Vibrant highlights)
- **Black**: #000000 (Background)
- **White**: #FFFFFF (Text and contrast)

**Typography**:
- Headers: Rajdhani (Bold, modern, tech-focused)
- Body: Inter (Clean, readable)

**Effects**:
- Cyan glow effects on headings
- Card hovers with cyan borders
- Native smooth scroll (no custom parallax)
- Gradient text effects
- Full-size hero image

## 🌐 Live URLs
- **Production Homepage**: https://flyq-air.pages.dev ⭐ **LIVE NOW!**
- **Production Documentation**: https://flyq-air.pages.dev/docs ⭐ **LIVE NOW!**
- **Latest Deployment**: https://6d69bbb0.flyq-air.pages.dev
- **Sandbox (Dev)**: https://3000-i9dkuxqg07opw1sw23plt-d0b9e1e2.sandbox.novita.ai

## 🛒 Purchase
Available exclusively at **Passion 3D World**: https://passion3dworld.com

## 🛠️ Tech Stack
- **Framework**: Hono (lightweight edge framework)
- **Styling**: TailwindCSS (via CDN)
- **Icons**: Font Awesome 6
- **Deployment**: Cloudflare Pages
- **Development**: Vite + Wrangler

## 📋 Product Specifications
- **MCU**: ESP32-S3 (Dual-core 240MHz)
- **Memory**: 512 KB SRAM
- **Connectivity**: Wi-Fi 2.4GHz + Bluetooth LE
- **Weight**: ~45g (without battery)
- **Dimensions**: 100mm × 100mm
- **Programming**: ESP-IDF, Arduino IDE, Python SDK
- **Open Source**: 100% open hardware and firmware

## 🚀 Getting Started

### Development
```bash
# Build the project
npm run build

# Start development server
pm2 start ecosystem.config.cjs

# Test locally
curl http://localhost:3000
```

### Deployment to Cloudflare Pages
```bash
# Deploy to production
npm run deploy:prod
```

## 📁 Project Structure
```
flyq/
├── src/
│   └── index.tsx          # Main application with landing page
├── public/                # Static assets (if needed)
├── dist/                  # Build output
├── ecosystem.config.cjs   # PM2 configuration
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
└── wrangler.jsonc         # Cloudflare configuration
```

## 🎯 Key Sections
1. **Hero** - Bold FLYQ branding with blue glow effects
2. **Features** - 6 compelling reasons with icon cards
3. **Video** - Visual demonstration of the drone
4. **Programming** - Code examples and SDK breakdown
5. **Specifications** - Technical details in styled cards
6. **Gallery** - Product images with blue borders
7. **Buy Now** - Clear CTA with Passion 3D World
8. **Footer** - Links to resources and community

## 🎨 Design Highlights
- **Cyan Glow Effects**: Bright text-shadow on FLYQ branding
- **Gradient Text**: Cyan gradient on brand elements
- **Border Accents**: Vibrant cyan borders on all cards
- **Dark Theme**: Black backgrounds with cyan highlights
- **Energetic Look**: Aviation and futuristic inspired
- **Card Animations**: Hover effects with cyan glows
- **Smooth Scrolling**: Native browser smooth scroll (no custom parallax)
- **Full-Size Images**: Hero drone image at full resolution

## 🔗 Resources
- **Documentation**: https://circuitdigest.com/litewing
- **GitHub**: https://github.com/Circuit-Digest/LiteWing
- **Community**: Circuit Digest Forums & WhatsApp

## 📝 Notes
- Product name: **FLYQ Air** (aviation-inspired, programmable drone)
- Color theme: **Midnight Blue + White + Silver** (Premium & Sleek - Option 3)
- Store: **Passion 3D World** (Exclusive official dealer)
- New drone image: High-quality red/black propeller design
- **Documentation page**: **COMPLETE** technical documentation at `/docs`
  - ALL information from https://circuitdigest.com/litewing integrated
  - Detailed circuit schematics with component explanations
  - Complete GPIO pinout table with 24 pins
  - Firmware architecture breakdown
  - Battery selection guide with safety warnings
  - Known issues and limitations documented
  - Assembly instructions with propeller placement diagrams
- All "LiteWing" references changed to "FLYQ Air"
- GitHub links updated to passion3d/flyq-air
- Code examples updated to use "FLYQAir.h"
- Fully responsive and mobile-friendly
- Optimized for Cloudflare Pages deployment
- Premium aerospace aesthetic with silver accents
- Native smooth scrolling throughout
- Sticky sidebar navigation for easy section access

## 🎨 Branding
**FLYQ - The Programmable Drone**
*Code it. Fly it. Master it.*

---

Built with ❤️ for makers, developers, and educators
