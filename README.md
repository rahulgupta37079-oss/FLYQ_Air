# FLYQ Air - The Programmable Drone Website

## 📢 Latest Updates

### 🎊 ALL CONTENT RESTORED - Complete Integration (2025-11-03)
✅ **All Original Content Successfully Restored**
   - **8-Week Curriculum**: Full 30-session training program now on homepage and dedicated `/curriculum` page
   - **Product Gallery**: 4 high-quality images showcasing FLYQ Air from every angle
   - **Partners Section**: Passion 3D World, Espressif Systems, Educational Institutions, Open Source Community
   - **Testimonials**: 6 WhatsApp reviews from students, professors, and developers
   - **FAQ Section**: 6 comprehensive questions about FLYQ Air
   - **Documentation Page**: Accessible via navigation for GitHub and resources

✅ **Complete Website Structure**:
   - **Homepage** (`/`): Hero + Featured Products + Gallery + Curriculum Preview + Partners + Testimonials + FAQ + CTA
   - **Products** (`/products`): Product catalog with FLYQ Air and FLYQ Vision
   - **Product Details** (`/products/:slug`): Individual product pages with full specifications
   - **Shopping Cart** (`/cart`): Cart management with localStorage
   - **Curriculum** (`/curriculum`): Full 8-week program with authentication notice
   - **Docs** (`/docs`): Documentation and resources
   - **Login/Register**: User authentication pages (functional in Phase 2)
   - **About** (`/about`): Company information
   - **Contact** (`/contact`): Get in touch
   - **Account** (`/account`): User dashboard (functional in Phase 2)

✅ **Navigation Updated**:
   - Added "Curriculum" and "Docs" links to main navigation
   - Mobile hamburger menu includes all pages
   - Cart badge with real-time item count

✅ **Authentication Framework Ready**:
   - Auth utility library (`src/lib/auth.ts`) - Password hashing, sessions, user management
   - Validation library (`src/lib/validation.ts`) - Email, password, name, phone validation
   - Database library (`src/lib/db.ts`) - User CRUD, orders, curriculum access control
   - API routes: `/api/auth/register`, `/api/auth/login`, `/api/auth/logout`, `/api/auth/status`
   - Order APIs: `/api/orders/create`, `/api/orders`, `/api/orders/:id`
   - Payment API: `/api/payment/verify` (Razorpay integration ready)
   - Curriculum API: `/api/curriculum/access/:productId` (access control)

✅ **Business Model Implemented**:
   - **Free Preview**: Homepage shows curriculum overview, testimonials, gallery, partners
   - **Gated Content**: Full curriculum access requires purchase + login
   - **E-Commerce Flow**: Browse → Add to Cart → Purchase → Login/Register → Access Curriculum
   - **Protected Routes**: Curriculum page shows lock notice for non-authenticated users

📦 **Current Status**:
   - Development server running at: https://3000-i9dkuxqg07opw1sw23plt-d0b9e1e2.sandbox.novita.ai
   - All content sections visible and functional
   - E-commerce features working (add to cart, cart management)
   - Authentication APIs implemented (D1 database creation pending)
   - 151KB worker bundle (comprehensive with all content)

### 🎉 MVP Phase 1 - E-Commerce Transformation (2025-11-03)
✅ **Complete Site Redesign - Modern E-Commerce Platform**
   - **New Homepage**: Clean e-commerce landing page with hero section, featured products, and CTAs
   - **Products Page**: Dedicated page showcasing FLYQ Air (₹4,999) and FLYQ Vision (₹7,999)
   - **Shopping Cart**: Fully functional cart with localStorage persistence
   - **Product Details**: Individual product pages with full specifications
   - **Mobile Responsive**: Optimized for all screen sizes (mobile, tablet, laptop)

✅ **E-Commerce Features Implemented**:
   - Product catalog with pricing and stock info
   - Add to Cart functionality
   - Cart management (add/remove/update quantities)
   - Cart badge with item count
   - Product detail pages
   - Responsive navigation with mobile menu

✅ **Database Schema Ready**:
   - Cloudflare D1 migrations created (ready to apply)
   - Tables: users, products, orders, order_items, curriculum_access, sessions, cart_items, reviews
   - Migration files: `migrations/0001_ecommerce_schema.sql`, `migrations/0002_seed_products.sql`

### Previous Updates (2025-10-30)
✅ **FLYQ Air Gallery Correction** 🎯
   - **Hero View Image**: First gallery card now shows FLYQ Air hero view (WITHOUT camera)
   - **Accurate Representation**: FLYQ Air doesn't have camera - that's FLYQ Vision feature
   - **Gallery Structure**: Hero View, Complete Assembly, Circuit Board, Components Kit
   - **Product Differentiation**: Clear distinction between Air (basic) and Vision (camera-enabled)
✅ **FLYQ Vision Transparent Camera Drone Update** 📸
   - **Hero Section**: Updated with transparent background camera drone image
   - **Gallery Update**: First card shows transparent camera drone with Vision branding
   - **Professional Consistency**: High-quality transparent images on both products
   - **Navigation**: Menus properly organized and aligned across both pages
✅ **FLYQ Vision Theme Update** 🎨
   - **Unified Design**: Changed from purple/pink to sky-blue theme (matching FLYQ Air)
   - **Brand Consistency**: Both products now share same visual language
   - **All sections updated**: Gallery, features, curriculum, partners, testimonials, FAQ
✅ **FLYQ Vision Complete Page** 🎥
   - Advanced drone with HD camera & gesture control
   - AI-powered object tracking and recognition
   - Real-time video streaming (720p @ 30fps)
   - Computer vision features and autonomous navigation
   - Accessible at `/vision` route
✅ **Comprehensive Sections**:
   - **8-Week Curriculum**: Complete 30-session training program breakdown
   - **Partners Section**: Trusted by industry leaders and institutions
   - **Testimonials**: Real WhatsApp reviews from students and professors
   - **FAQ Section**: 10 comprehensive questions and answers
✅ **Hero Images**: Both products with transparent backgrounds
✅ **Navigation**: Unified menus across both products
✅ **GitHub Synced**: All changes automatically pushed

## Project Overview
- **Name**: FLYQ - E-Commerce Platform for Programmable Drones
- **Type**: Full-stack E-commerce Website with Educational Content
- **Goal**: Online store for FLYQ Air and FLYQ Vision with gated curriculum access
- **Current Status**: Phase 2 In Progress - All Content Restored ✅

## Features Implemented

### ✅ **Complete Website Content Restored**
- **Homepage**: Hero + Featured Products + Gallery + Curriculum Preview + Partners + Testimonials + FAQ
- **8-Week Curriculum**: Full 30-session training program (dedicated `/curriculum` page)
  - Week 1: Introduction & Platform Setup
  - Week 2: Sensor & Motor Systems
  - Week 3: Firmware & Programming
  - Week 4: Flight Basics & Safety
  - Week 5: Advanced Features & Sensors
  - Week 6: Autonomous Flight & Control
  - Week 7: Customization & Expansion
  - Week 8: Projects & Wrap-Up
- **Product Gallery**: 4 high-quality images (Hero View, Assembly, Circuit Board, Components)
- **Partners**: Passion 3D World, Espressif Systems, Educational Institutions, Open Source Community
- **Testimonials**: 6 WhatsApp reviews from students, professors, developers, makers
- **FAQ**: 6 comprehensive questions (programming, experience, kit, battery, sensors, open source)

### ✅ **E-Commerce Storefront**
- Modern homepage with hero section and product showcase
- Product catalog (FLYQ Air ₹4,999, FLYQ Vision ₹7,999)
- Individual product detail pages with full specifications
- Shopping cart with localStorage persistence
- Cart management (add/remove/update quantities)
- Mobile-responsive design with hamburger menu
- Cart badge with real-time item count


### ✅ **Authentication Framework** (Phase 2 - Ready for D1)
- **Auth Library** (`src/lib/auth.ts`):
  - Password hashing with bcryptjs
  - Session creation and management (7-day expiry)
  - User authentication middleware
  - getCurrentUser helper
- **Validation Library** (`src/lib/validation.ts`):
  - Email format validation
  - Password strength requirements (8+ chars, uppercase, lowercase, number)
  - Name and phone validation (Indian format)
  - Input sanitization
- **Database Library** (`src/lib/db.ts`):
  - User CRUD operations
  - Order management (create, list, details)
  - Curriculum access control
  - Payment verification support

### ✅ **API Routes Implemented**
- **Authentication**:
  - `POST /api/auth/register` - User registration with validation
  - `POST /api/auth/login` - User login with session creation
  - `POST /api/auth/logout` - Session destruction
  - `GET /api/auth/status` - Check authentication status
- **Orders**:
  - `POST /api/orders/create` - Create order from cart
  - `GET /api/orders` - Get user's order history
  - `GET /api/orders/:id` - Get order details with items
- **Payment**:
  - `POST /api/payment/verify` - Verify Razorpay payment signature
- **Curriculum**:
  - `GET /api/curriculum/access/:productId` - Check user's curriculum access

### ✅ **Pages Implemented**
- **Homepage** (`/`) - Full content with all sections
- **Products** (`/products`) - Product catalog
- **Product Details** (`/products/:slug`) - Individual pages with specs
- **Shopping Cart** (`/cart`) - Cart management with localStorage
- **Curriculum** (`/curriculum`) - 8-week program with authentication notice
- **Docs** (`/docs`) - Documentation and GitHub links
- **Login** (`/login`) - User login page (functional after D1)
- **Register** (`/register`) - User registration page (functional after D1)
- **Account** (`/account`) - User dashboard (functional after D1)
- **About** (`/about`) - Company information
- **Contact** (`/contact`) - Contact form

### ✅ **Business Model Implementation**
- **Free Preview**: Homepage shows curriculum overview, testimonials, gallery, partners, FAQ
- **Gated Content**: Full curriculum requires purchase + login
- **Purchase Flow**: Browse → Add to Cart → Checkout → Register/Login → Access Curriculum
- **Protected Routes**: Curriculum page shows lock notice for non-authenticated users
- **Access Control**: Database tracks which users have access to which curricula

## Features Pending

### ⏳ **Phase 2 - Database Setup** (User Action Required)
**CRITICAL**: Create D1 database via Cloudflare Dashboard:
1. Go to https://dash.cloudflare.com
2. Navigate to Workers & Pages → D1
3. Click "Create database"
4. Name: `webapp-production`
5. Copy the database ID
6. Update `wrangler.jsonc` with the database ID
7. Run migrations locally:
   ```bash
   npx wrangler d1 migrations apply webapp-production --local
   ```
8. Test authentication and order flows
9. Deploy migrations to production:
   ```bash
   npx wrangler d1 migrations apply webapp-production
   ```

### ⏳ **Phase 2 - Functional Testing**
- Test user registration with email/password validation
- Test login and session management (7-day cookie)
- Test protected curriculum access control
- Test order creation from shopping cart
- Test payment verification with Razorpay sandbox

### ⏳ **Phase 3 - Production Deployment**
- Deploy to Cloudflare Pages with D1 database binding
- Configure Razorpay production API keys as secrets
- Test complete end-to-end purchase flow
- Set up custom domain DNS (flyqdrone.in)
- Monitor production logs and performance

## URLs
- **Production (E-Commerce)**: https://9afe3943.flyq-air.pages.dev 🛒✨
- **Custom Domain**: flyqdrone.in (⏳ DNS pending - See DOMAIN_SETUP_GUIDE.md)
- **Products Page**: https://9afe3943.flyq-air.pages.dev/products 📦
- **Shopping Cart**: https://9afe3943.flyq-air.pages.dev/cart 🛒
- **Local Development**: http://localhost:3000
- **GitHub**: https://github.com/rahulgupta37079-oss/FLYQ_Air

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
✅ **Current FLYQ Air Gallery** (4 images):
  1. **Hero View** - FLYQ Air drone WITHOUT camera (transparent background) ✨
  2. **Complete Assembly** - Fully assembled drone
  3. **Circuit Board** - ESP32-S2 PCB with propellers and motors digitally removed
  4. **Components Kit** - Complete components diagram with original background

✅ **Current FLYQ Vision Gallery** (4 images):
  1. **Camera Drone** - Vision model WITH camera (transparent background) 📸
  2. **Complete Assembly** - Fully assembled drone
  3. **Circuit Board** - ESP32-S2 PCB board
  4. **Components Kit** - All parts included

### Key Difference:
- **FLYQ Air** = No camera (basic programmable drone)
- **FLYQ Vision** = With camera (advanced AI-powered vision drone)

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
- **Platform**: Cloudflare Pages ✅ **DEPLOYED**
- **Framework**: Hono + TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **Icons**: Font Awesome
- **Build Tool**: Vite
- **Status**: ✅ Live in Production

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
✅ **Currently Deployed to Cloudflare Pages**
- **Live URL**: https://6ea3369a.flyq-air.pages.dev
- **Platform**: Cloudflare Pages
- **Status**: ✅ Active and Running
- **Last Deployed**: October 30, 2025

```bash
# Deploy to Cloudflare Pages
npm run build
npx wrangler pages deploy dist --project-name flyq-air
```

## Recent Updates
- October 30, 2025: Updated gallery with custom processed drone images
- Extracted drone from Corizo packaging
- Removed propellers/motors from circuit board view
- Maintained original background for components diagram as requested

## Project Backup
- **Latest Backup**: https://page.gensparksite.com/project_backups/flyq_air_complete_website.tar.gz

**Last Updated**: October 30, 2025
## FLYQ Vision Page (/vision)
✨ **COMPLETE COMPREHENSIVE PAGE** - Camera & Gesture Control Drone

### All Sections Implemented
✅ **Hero Section** - Vision-enabled drone with HD camera showcase
✅ **Features Section** - 6 vision-powered capabilities (Camera, Gesture Control, Object Tracking, AI Processing, Navigation, Mobile App)
✅ **Technical Specifications** - Camera, Processor, and Connectivity specs
✅ **Product Gallery** - Same drone images with purple/pink themed borders
✅ **8-Week Vision Curriculum** - 30 sessions focused on camera & AI training
✅ **Partners Section** - Industry leaders and technology partners
✅ **Testimonials Section** - 6 WhatsApp reviews from vision community
✅ **FAQ Section** - 10 comprehensive questions about vision features
✅ **CTA/Buy Section** - Complete with community links
✅ **Footer** - Professional navigation and links
✅ **Mobile Responsive** - Hamburger menu with all sections

### Key Features
- **HD Camera Module**: 720p @ 30fps streaming with photo/video recording
- **Gesture Control**: AI-powered hand gesture recognition for intuitive control
- **Object Tracking**: Face detection, color-based tracking, multi-object recognition
- **AI Processing**: Edge AI inference with TensorFlow Lite models
- **Autonomous Navigation**: Waypoint navigation with obstacle detection
- **Mobile App Control**: iOS & Android app with live camera feed

### Technical Specifications
- **Camera**: 1280x720 HD, 30 FPS, 120° FOV, WiFi streaming
- **Processor**: ESP32-S3 Dual-Core 240MHz with AI accelerator
- **Memory**: 8MB PSRAM for vision processing
- **Connectivity**: WiFi 802.11 b/g/n, < 200ms latency
- **Range**: 50 meters with real-time video

### Vision-Specific Curriculum (8 Weeks)
1. **Week 1**: Camera setup & video streaming
2. **Week 2**: Image processing fundamentals
3. **Week 3**: Object detection algorithms
4. **Week 4**: Gesture recognition development
5. **Week 5**: AI & machine learning integration
6. **Week 6**: Vision-guided autonomous flight
7. **Week 7**: Mobile app development
8. **Week 8**: Vision projects & presentations

### Use Cases
1. **Education & Research**: Computer vision, AI, and robotics teaching
2. **Content Creation**: Aerial footage with gesture control
3. **Inspection & Monitoring**: Autonomous patrol and surveillance
4. **Interactive Gaming**: Gesture-controlled games and competitions

### Navigation Menu (Unified Across Both Pages)
- **FLYQ Air Page**: Features, Vision, Curriculum, FAQ, Docs, Buy Now
- **FLYQ Vision Page**: FLYQ Air (home), Features, Curriculum, FAQ, Docs, Buy Now

### Color Theme & Visual Identity
- **Sky Blue & Light Blue gradient** - Same theme as FLYQ Air for unified brand experience
- **Same card hover effects** and animations across both products
- **Consistent layout structure** and design patterns
- **Transparent camera drone** - Professional background removal for clean presentation
- **Unified brand experience** - Both products share the same visual language and images
