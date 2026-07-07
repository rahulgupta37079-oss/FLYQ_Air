# FLYQ Cinematic Redesign - Demo Version

## Reference: https://deft-syrniki-e62766.netlify.app/

---

## 🎬 IMPLEMENTING CINEMATIC DESIGN

I'm creating a cinematic redesign matching the military drone reference site you provided.

### Key Design Elements:

#### 1. **Hero Section** - Full Cinematic Experience
```
- Full-screen video background (like reference)
- Huge gradient typography (6xl-9xl text sizes)
- Bottom-aligned content layout
- Floating UI elements (status badges, nav pills)
- Gradient overlays (black fade top & bottom)
- CTA buttons at bottom
```

#### 2. **Feature Showcase** - Multiple Full-Height Video Sections
```
Section 1: ESP32 POWER
- Background video: drone footage
- Heading: "DUAL-CORE PROCESSING"
- Description: ESP32-S3 specifications
- Text alignment: CENTER

Section 2: SILENT FLIGHT
- Background video: rotor assembly
- Heading: "PRECISION CONTROL"
- Description: Stability system
- Text alignment: LEFT

Section 3: HD VISION
- Background video: camera system
- Heading: "720P CAMERA"
- Description: Visual capabilities
- Text alignment: RIGHT

Section 4: LIGHTWEIGHT
- Background video: frame construction
- Heading: "45G TITANIUM"
- Description: Build quality
- Text alignment: CENTER
```

#### 3. **Technical Specs Grid**
```
- Tabbed interface (Hardware / Software / Performance)
- Grid layout (3 columns)
- Spec cards with:
  - Label (gray text, small, uppercase)
  - Value (large, bold, white/blue)
  - Unit (small, gold/blue text)
- Hover effects (border glow, scale)
```

#### 4. **Pricing Tiers**
```
Tier 1: STUDENT EDITION
- Price: ₹9,999
- Features checklist
- White CTA button

Tier 2: DEVELOPER PRO  
- Price: ₹14,999
- Features checklist
- Blue CTA button
- Most Popular badge

Tier 3: ENTERPRISE
- Price: Custom Quote
- Features checklist
- Outline CTA button
```

#### 5. **Final CTA Section**
```
- Large rounded container (3rem border-radius)
- Gradient overlay effects
- "Ready to fly." heading
- Two CTA buttons (Order Now / Contact Sales)
```

---

## 🎨 **Color Palette** (From Reference)

### Primary Colors:
- **Black**: #000000 (background)
- **White**: #FFFFFF (text, accents)
- **Blue**: #2563EB (exec-blue, primary CTA)
- **Gold**: #F59E0B (accent, units)
- **Red**: #DC2626 (exec-red, highlights)

### Gradients:
- **Text gradients**: from-white to-white/40
- **Overlay gradients**: black/90 to transparent
- **Border gradients**: from-blue to-purple

---

## 📐 **Typography Scale**

### Headings:
- **Hero**: text-9xl (8rem / 128px)
- **Section titles**: text-7xl to text-8xl
- **Sub-headings**: text-2xl to text-3xl
- **Body**: text-lg to text-xl

### Fonts:
- **Headers**: font-space (Space Grotesk style)
- **Body**: font-rajdhani (Rajdhani style)
- **Mono**: font-plex (IBM Plex Mono style)

---

## ✨ **Animation Effects**

### Scroll Animations:
```css
opacity: 0;
transform: translateY(50px);
/* Animates to: */
opacity: 1;
transform: translateY(0);
```

### Hover Effects:
- **Cards**: scale(1.05), border-glow
- **Buttons**: scale(1.05), shadow-glow
- **Images**: rotate(12deg), brightness increase

### Background Effects:
- **Particles**: animate-pulse (3-4s duration)
- **Glow orbs**: blur-3xl, opacity-20
- **Video**: 50% opacity, contrast filters

---

## 🛠️ **Technical Implementation**

### Video Sections:
```html
<section class="relative w-full h-[110vh] bg-black">
  <video autoplay muted loop playsinline 
         class="absolute inset-0 w-full h-full object-cover opacity-50">
    <source src="/videos/feature.mp4" type="video/mp4"/>
  </video>
  
  <!-- Gradient overlays -->
  <div class="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent"></div>
  <div class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent"></div>
  
  <!-- Content -->
  <div class="relative z-10 flex items-center justify-center h-full">
    <h2 class="text-9xl font-bold text-transparent bg-clip-text 
               bg-gradient-to-b from-white to-white/40">
      HEADING
    </h2>
  </div>
</section>
```

### Spec Cards:
```html
<div class="p-6 rounded-xl border-2 border-gold/30 bg-steel/20 
            hover:border-gold/60 transition-all">
  <p class="text-sm text-white/60 tracking-widest">LABEL</p>
  <div class="flex items-baseline gap-2">
    <p class="text-3xl font-bold text-white">850</p>
    <p class="text-sm text-gold">kW</p>
  </div>
</div>
```

---

## 📱 **Responsive Design**

### Desktop (>1024px):
- Full split layouts
- Side-by-side content
- Large typography (9xl)

### Tablet (768px - 1024px):
- Stacked layouts
- Medium typography (7xl)
- Adjusted spacing

### Mobile (<768px):
- Single column
- Smaller typography (5xl)
- Compact padding

---

## 🚀 **Current Implementation Status**

✅ **Completed**:
- Hero section structure
- Green accent color scheme
- Split layout (text left, image right)
- Floating drone image
- Feature section with cards
- Products grid

⏳ **In Progress**:
- Converting to full cinematic style
- Adding multiple video sections
- Implementing gradient text effects
- Adding spec cards grid
- Creating pricing tiers

🔄 **Next Steps**:
1. Complete video sections conversion
2. Add technical specs section
3. Implement pricing tiers
4. Add final CTA section
5. Test animations
6. Deploy to demo

---

## 💡 **Design Philosophy**

**Cinematic. Bold. Premium.**

Following the reference site's approach:
- Full-screen immersive experiences
- Minimal UI, maximum impact
- High-contrast black/white design
- Premium feel with subtle animations
- Military/tactical aesthetic
- Professional and trustworthy

---

**Status**: 🔄 **IN PROGRESS**  
**Demo Branch**: redesign-black-blue-white  
**Production**: Safe (unchanged)  
**Backup**: Created at src/index.tsx.backup-before-cinematic
