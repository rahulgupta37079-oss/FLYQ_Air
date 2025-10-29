# FLYQ Air - The Programmable Drone

## 🚀 Project Overview
**FLYQ Air** is a complete website for an ESP32-S3 based programmable drone platform. Features include a stunning landing page and comprehensive documentation page with a **Midnight Blue + White + Silver** premium color scheme inspired by aerospace and technology.

## ✨ Features

### Landing Page (/)
- **Hero Section**: New FLYQ Air drone image with premium glow effects
- **Features Grid**: 6 feature cards showcasing key product benefits
- **Video Demo**: Embedded YouTube demonstration
- **Programming Section**: Code examples (ESP-IDF, Arduino, Python)
- **Technical Specifications**: Complete hardware specs
- **Image Gallery**: High-quality product photos
- **Call-to-Action**: **Passion 3D World** as exclusive dealer
- **Responsive Design**: Mobile-friendly navigation

### Documentation Page (/docs)
- **Comprehensive Technical Documentation**: ALL information from Circuit Digest LiteWing page
- **Sticky Sidebar Navigation**: Easy navigation through 15+ sections
- **Introduction & Overview**: Product introduction and key features
- **Technical Specifications**: Complete specs table with all hardware details
- **Hardware Design Overview**: PCB frame, components, design philosophy
- **Detailed Circuit Schematics**: Complete circuit breakdowns
  - USB Input & Power Path Control
  - Battery Charging Circuit (TP4056)
  - Voltage Regulation (SPX3819 LDO)
  - Battery Monitoring System
  - Programming Circuit (CH340K USB-UART)
  - Motor Driver Circuits (4x IRLML6344 MOSFET)
  - MPU6050 IMU Integration
  - Status LED Circuits (6 indicators)
  - Expansion Connectors & SMD Pads
- **Complete GPIO Pinout**: Detailed 24-pin expansion pinout table
  - General Purpose GPIO (IO15-IO20, IO1, IO13, IO48)
  - I2C Interface (SCL/SDA for MPU6050)
  - Auxiliary I2C (SCL1/SDA1 for VL53L1X)
  - SPI Interface (MISO/CLK/MOSI/CS for PMW3901)
  - UART Interface (TX/RX)
  - Audio Pins (Buzzer +/-)
  - Power Pins (3V3, GND, VBUS)
  - Silkscreen correction notes
- **Firmware Architecture**: ESP-Drone & Crazyflie based
  - Flight Control Core
  - Hardware Drivers
  - Communication Modules
  - DSP Libraries
  - Firmware Features & Flashing
- **Programming Options**: ESP-IDF, Arduino, Python SDK, CFClient
- **Optional Sensors**: VL53L1X ToF, MS5611 Barometer, PMW3901 Optical Flow
- **Assembly Guide**: Detailed step-by-step with propeller installation
- **Battery Selection & Safety**: Complete LiPo battery guide
  - Specifications (voltage, capacity, discharge rate)
  - Safety warnings and best practices
  - Why discharge rate matters (20C minimum, 30C recommended)
- **Getting Started**: First flight, IMU calibration, app setup
- **Troubleshooting**: 4 common issues with solutions
- **Known Issues & Limitations**: Silkscreen errors, flight modes status
- **Resources**: GitHub, store, community links

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
- **Homepage**: https://3000-i9dkuxqg07opw1sw23plt-d0b9e1e2.sandbox.novita.ai
- **Documentation**: https://3000-i9dkuxqg07opw1sw23plt-d0b9e1e2.sandbox.novita.ai/docs
- **Production**: (Deploy to Cloudflare Pages)

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
