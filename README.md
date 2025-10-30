# FLYQ Air - The Programmable Drone Website

## 📢 Latest Updates (2025-10-30)
✅ **New Sections Added**:
   - **8-Week Curriculum**: Complete 30-session training program breakdown
   - **Partners Section**: Trusted by industry leaders and institutions
   - **Testimonials**: Real WhatsApp reviews from students and professors
   - **FAQ Section**: 10 comprehensive questions and answers
✅ **Hero Image Updated**: New drone assembly photo (top view with red/black propellers)
✅ **Gallery Images Updated**: Complete assembly and components kit photos
✅ **YouTube Video Removed**: Video demo section removed from landing page
✅ **Navigation Updated**: Added Curriculum and FAQ links to main menu
✅ **GitHub Synced**: All changes committed and pushed

## Project Overview
- **Name**: FLYQ Air
- **Goal**: Professional website for the FLYQ Air programmable drone powered by ESP32-S2
- **Features**: 
  - Complete product showcase with hero section
  - Interactive image gallery with processed drone images
  - Technical specifications display
  - Contact form and newsletter subscription
  - Responsive design with mobile menu
  - Smooth animations and transitions

## URLs
- **Local Development**: http://localhost:3000
- **Public Access**: https://3000-i9dkuxqg07opw1sw23plt-d0b9e1e2.sandbox.novita.ai
- **Production**: Not deployed yet
- **GitHub**: Not configured yet

## Features Implemented
✅ Complete FLYQ Air drone website with all sections
✅ Hero section with animated graphics
✅ Features section highlighting ESP32-S2, programmability, and safety
✅ Technical specifications in organized grid layout
✅ Product gallery with custom processed images
✅ **8-Week Training Curriculum** (30 sessions) - NEW!
✅ **Partners Section** - Industry leaders and institutions
✅ **Testimonials Section** - 6 WhatsApp reviews from community
✅ **FAQ Section** - 10 comprehensive Q&A
✅ Contact form with API integration
✅ Newsletter subscription functionality
✅ Responsive navigation with mobile menu (updated with Curriculum & FAQ links)
✅ Professional gradient designs and animations

## Gallery Updates (Latest - October 30, 2025)
✅ **Removed YouTube video** as requested
✅ **Updated gallery with new processed images**:
  1. **Hero View** - Original drone with sleek black body and dual-color propellers
  2. **FLYQ Drone** - Professional drone extracted from Corizo package (transparent background)
  3. **Circuit Board** - ESP32-S2 PCB with propellers and motors digitally removed
  4. **Parts Kit** - Complete components diagram with original background preserved (as requested)

### Image Processing Completed:
- Extracted drone from Corizo box image
- Removed background from extracted drone (transparent PNG)
- Removed propellers and motor units from circuit board image
- Kept components diagram with original background as requested

## Website Sections
1. **Navigation Bar** - Fixed header with smooth scroll links
2. **Hero Section** - Product introduction with FLYQ branding
3. **Features Section** - Key features (ESP32-S2, Programmable, Safety)
4. **Technical Specifications** - Detailed specs
5. **Product Gallery** - Updated with processed images
6. **Contact Section** - Contact form and information
7. **Newsletter Section** - Email subscription
8. **Footer** - Company links and information

## Technical Specifications Displayed
- **Processor**: ESP32-S2 240MHz, 320KB SRAM, 4MB Flash
- **Flight**: 15 m/s max speed, 8-10 min flight time, 50m range
- **Power**: 3.7V 600mAh LiPo, USB-C charging, 45 min charge time
- **Dimensions**: 92 x 92 x 20mm, 35g weight, 4 x 45mm propellers
- **Connectivity**: WiFi 802.11 b/g/n, BLE 5.0, USB Type-C
- **Motors**: 716 Brushed Motors, 38,000 max RPM, 3.7V

## API Endpoints
- `POST /api/contact` - Handle contact form submissions
- `POST /api/newsletter` - Handle newsletter subscriptions

## Data Architecture
- **Frontend**: Pure HTML/JavaScript with Tailwind CSS
- **Backend**: Hono framework on Cloudflare Workers
- **Images**: CDN-hosted processed images (mix of transparent PNGs and original backgrounds)
- **Forms**: JSON API communication

## User Guide
1. Navigate through sections using the top navigation bar
2. Browse the updated gallery with processed drone images
3. Use contact form for inquiries
4. Subscribe to newsletter for updates

## Tech Stack
- **Platform**: Cloudflare Pages
- **Framework**: Hono + TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **Icons**: Font Awesome
- **Status**: ✅ Running successfully

## Installation & Development
```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start development server
pm2 start ecosystem.config.cjs

# View in browser
open http://localhost:3000
```

## Deployment
```bash
# Deploy to Cloudflare Pages
npm run deploy
```

## Recent Updates
- October 30, 2025: Updated gallery with custom processed drone images
- Extracted drone from Corizo packaging
- Removed propellers/motors from circuit board view
- Maintained original background for components diagram as requested

## Project Backup
- **Latest Backup**: https://page.gensparksite.com/project_backups/flyq_air_complete_website.tar.gz

**Last Updated**: October 30, 2025