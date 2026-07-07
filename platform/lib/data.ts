// Static fallback data — mirrors the Supabase seed so the site renders
// fully before keys are connected. Once Supabase is live, data layer can
// switch to DB reads; these act as the canonical seed content.

export type Product = {
  slug: string; name: string; category: string; price: number; mrp: number;
  stock: number; featured?: boolean; short: string;
  specs: Record<string, string>; features: string[]; box: string[];
}

export const CATEGORIES = [
  { slug: 'education', name: 'Drones', icon: 'graduation-cap' },
]

export const PRODUCTS: Product[] = [
  { slug:'flyq-air', name:'FLYQ Air', category:'education', price:9999, mrp:12999, stock:50, featured:true,
    short:'ESP32-S3 programmable nano drone for makers, students & STEM labs.',
    specs:{ Processor:'ESP32-S3 dual-core', Weight:'45g', Flight:'5-7 min', Motors:'Coreless 8.5×20mm', Battery:'650mAh 1S LiPo', Range:'100m', Gyro:'6-axis, sub-ms loop', Connectivity:'Wi-Fi + BLE' },
    features:['100% open-source firmware & SDK','Program in Block, Python, Arduino & ESP-IDF','24-pin GPIO expansion header','6-axis stabilization','DGCA nano-category — fly anywhere','Crash-resistant frame + prop guards'],
    box:['FLYQ Air drone','2× 650mAh battery','USB-C charger','Full propeller set','Propeller guards','Quick-start guide'] },
  { slug:'flyq-vision', name:'FLYQ Vision', category:'education', price:19999, mrp:24999, stock:30, featured:true,
    short:'AI camera drone with optical-flow position hold & computer-vision SDK.',
    specs:{ Processor:'ESP32-S3 dual-core', Camera:'HD FPV', Sensor:'Optical flow + ToF', Flight:'12 min', Battery:'1100mAh 1S', Range:'150m', Gyro:'6-axis + magnetometer', Connectivity:'Wi-Fi + BLE' },
    features:['On-device computer-vision SDK','Optical-flow position hold (no GPS needed)','Gesture & palm control','AI object detection & tracking','HD live video stream','Open-source firmware & Python API'],
    box:['FLYQ Vision drone','2× 1100mAh battery','USB-C charger','Spare propeller set','Propeller guards','Hard-shell carry case','Quick-start guide'] },
]

export const productImage = (slug: string) => `/images/products/${slug}.jpg`

export type Testimonial = {
  name: string; role: string; city: string; segment: string;
  message: string; ts: string; voice?: number;
}
export const TESTIMONIALS: Testimonial[] = [
  { name:'Rajesh Kumar', role:'Agri Farmer', city:'Punjab', segment:'farmer', message:'Bhai, 20L spray drone se 5x kaam ho gaya. Diesel ka kharcha bhi 60% kam. Paisa vasool!', ts:'Today 14:32' },
  { name:'Dr. Anil Sharma', role:'Research Institute', city:'Dehradun', segment:'researcher', message:'LiDAR payload delivery in 4 days. Data quality is exceptional. Going to order 2 more.', ts:'Today 11:08' },
  { name:'Priya Deshmukh', role:'FPV Pilot', city:'Pune', segment:'fpv', message:'AAF Turbofly X is insane stability for the price. HD transmission rock solid.', ts:'Yesterday 19:50', voice:23 },
  { name:'Vikram Singh', role:'Organic Farmer', city:'Nashik', segment:'farmer', message:'30L hexacopter + RTK GPS = labour cost down 60%. Game changer for organic certification.', ts:'Yesterday 09:15' },
  { name:'Sanjay Mehta', role:'Surveying Co.', city:'Ahmedabad', segment:'enterprise', message:'P1 45MP camera, mapping accuracy improved 3x. After-sales support is unmatched in India.', ts:'Mon 16:40' },
  { name:'Principal, DPS', role:'School', city:'Bangalore', segment:'educator', message:'Set up the FLYQ STEM Lab last month. 120 students enrolled in week 1. Highly recommended.', ts:'Mon 10:22' },
  { name:'Rahul Sharma', role:'B.Tech Student', city:'Mumbai', segment:'student', message:'Went from zero to autonomous flight in 8 weeks. Python SDK is buttery smooth.', ts:'Sun 21:05' },
  { name:'Prof. Amit Kumar', role:'Professor', city:'Chennai', segment:'educator', message:'Integrated FLYQ Air into our embedded systems lab. Open-source firmware is gold for research.', ts:'Sun 14:18' },
  { name:'Sneha Desai', role:'Software Dev', city:'Hyderabad', segment:'student', message:'Built a gesture-controlled drone as my weekend project. Documentation is chef\u2019s kiss.', ts:'Sat 12:30', voice:18 },
  { name:'Arjun Reddy', role:'Maker', city:'Chennai', segment:'student', message:'Kit quality > price. Even propeller guards feel premium. 10/10.', ts:'Sat 08:55' },
  { name:'Meera Singh', role:'PhD Researcher', city:'Bangalore', segment:'researcher', message:'Expansion connector + ToF sensor = perfect SLAM testbed for my thesis.', ts:'Fri 17:42' },
  { name:'Amit Patel', role:'Dealer', city:'Surat', segment:'dealer', message:'Bulk-ordered 50 units. Margins are healthy, delivery on time, zero defects. Partner for life.', ts:'Fri 11:11' },
]

export type Workshop = {
  slug: string; title: string; date: string; city: string; venue: string;
  level: string; type: string; seats: number; fee: number;
}
export const WORKSHOPS: Workshop[] = [
  { slug:'mumbai-drone-bootcamp', title:'Drone Building & Programming Bootcamp', date:'2026-07-12', city:'Mumbai', venue:'IIT Bombay Innovation Hub', level:'Beginner', type:'College', seats:40, fee:2499 },
  { slug:'delhi-dgca-pilot-prep', title:'DGCA Micro-Category Pilot Prep', date:'2026-07-19', city:'Delhi', venue:'India Habitat Centre', level:'Intermediate', type:'Public', seats:30, fee:4999 },
  { slug:'bangalore-fpv-build', title:'FPV Racing & Build Workshop', date:'2026-07-26', city:'Bangalore', venue:'IISc Campus', level:'Intermediate', type:'Public', seats:25, fee:3499 },
  { slug:'hyderabad-agri-spray', title:'Agri-Drone Spray Operations', date:'2026-08-02', city:'Hyderabad', venue:'T-Hub', level:'Professional', type:'Corporate', seats:20, fee:6999 },
  { slug:'pune-drone-soccer', title:'Drone Soccer Inter-School Challenge', date:'2026-08-09', city:'Pune', venue:'Symbiosis', level:'School', type:'School', seats:80, fee:999 },
  { slug:'chennai-cv-flyq', title:'Computer Vision on FLYQ Air', date:'2026-08-16', city:'Chennai', venue:'IIT Madras Research Park', level:'Advanced', type:'College', seats:35, fee:3999 },
  { slug:'ahmedabad-lidar', title:'LiDAR Mapping Masterclass', date:'2026-08-23', city:'Ahmedabad', venue:'GIFT City', level:'Professional', type:'Corporate', seats:15, fee:9999 },
  { slug:'kolkata-train-trainer', title:'STEM Teachers Train-the-Trainer', date:'2026-08-30', city:'Kolkata', venue:'IIM Calcutta', level:'Educators', type:'School', seats:40, fee:0 },
  { slug:'jaipur-photo-survey', title:'Drone Photography & Surveying', date:'2026-09-06', city:'Jaipur', venue:'MNIT Jaipur', level:'Beginner', type:'Public', seats:30, fee:2999 },
  { slug:'lucknow-atl-drone-day', title:'Atal Tinkering Lab Drone Day', date:'2026-09-13', city:'Lucknow', venue:'Govt. of UP', level:'School', type:'School', seats:100, fee:0 },
  { slug:'indore-pcb-to-sky', title:'PCB-to-Sky: Building Your Own Drone', date:'2026-09-20', city:'Indore', venue:'IIT Indore', level:'Advanced', type:'College', seats:20, fee:5499 },
  { slug:'online-python-sdk', title:'Python SDK for Autonomous Missions', date:'2026-09-27', city:'Online', venue:'Zoom', level:'Intermediate', type:'Online', seats:200, fee:499 },
]

export type Faq = { category: string; q: string; a: string }
export const FAQS: Faq[] = [
  { category:'Programming & SDK', q:'What programming languages are supported?', a:'FLYQ Air supports ESP-IDF, Arduino, a Python SDK and the Crazyflie client — from block coding for beginners to low-level C for advanced users.' },
  { category:'Product', q:'Do I need prior drone experience?', a:'No. Our 8-week curriculum takes complete beginners from zero to autonomous flight.' },
  { category:'Product', q:'What is included in the FLYQ Air kit?', a:'The drone, 2 batteries, USB-C charger, a propeller set, propeller guards and a quick-start guide.' },
  { category:'Product', q:'How long does the battery last?', a:'Approximately 5-7 minutes of flight per charge, with a 1-2 hour full charge time.' },
  { category:'Product', q:'Can I add sensors?', a:'Yes — a 24-pin expansion connector exposes I²C, SPI, UART and GPIO for sensors like VL53L1X, MS5611 and PMW3901.' },
  { category:'Programming & SDK', q:'Is FLYQ Air open source?', a:'Yes. Full schematics and firmware are published on GitHub; software is MIT-licensed and hardware is under CERN-OHL.' },
  { category:'DGCA & Regulations', q:'Do I need DGCA registration?', a:'Nano drones under 250g are exempt. Micro and Small categories require Digital Sky registration and an RPC.' },
  { category:'Shipping & Delivery', q:'What is your shipping timeline?', a:'2-7 business days pan-India for kits; agricultural drones take 10-15 days due to freight.' },
  { category:'Payments & GST', q:'Do you provide a GST invoice?', a:'Yes, a GST invoice with our GSTIN is issued for every order.' },
  { category:'Warranty & Returns', q:'What is your warranty?', a:'1 year on FLYQ manufacturing defects, 6 months on motors/ESC, and OEM terms for third-party payloads.' },
  { category:'Warranty & Returns', q:'What is your return policy?', a:'7-day returns for unboxed items. Once flown, products are non-returnable except for verified defects.' },
  { category:'Shipping & Delivery', q:'Do you ship internationally?', a:'Limited international shipping — please contact us for a quote.' },
  { category:'Payments & GST', q:'What payment options are available?', a:'UPI, cards, netbanking, EMI (3-24 months), COD up to ₹25,000, and bank transfer for enterprise orders.' },
  { category:'Bulk Orders', q:'Is there a bulk discount?', a:'Yes, for orders of 10+ units. Reach out via the Bulk Orders page.' },
  { category:'Bulk Orders', q:'Can schools get GST-exempt pricing?', a:'Government schools can avail applicable concessional/TDS pricing — contact our team.' },
  { category:'Workshops & STEM Lab', q:'Do you provide training?', a:'Yes — STEM Lab programs, DGCA prep and custom corporate training.' },
  { category:'Product', q:'Is FLYQ made in India?', a:'Yes — designed & assembled in Mumbai with PCBs fabricated in Bengaluru.' },
  { category:'Product', q:'Are spare parts available?', a:'Yes, we maintain a dedicated Parts section for all components.' },
  { category:'Warranty & Returns', q:'Do you offer a repair service?', a:'Yes — raise an RMA from your account dashboard. Typical turnaround is 7-10 days.' },
  { category:'Account & Support', q:'How do I track my order?', a:'Log in to your account dashboard or use the order-tracking link sent on confirmation.' },
]

export const STATS = [
  { value:'100+', label:'Projects' },
  { value:'500+', label:'Drones Sold' },
  { value:'200+', label:'Happy Customers' },
  { value:'50+', label:'Licenses Issued' },
  { value:'25+', label:'Cities' },
]

export type BlogPost = {
  slug: string; title: string; excerpt: string; category: string
  author: string; date: string; readMins: number; cover: string; body: string[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'why-we-built-flyq-on-esp32-s3',
    title: 'Why we built FLYQ on the ESP32-S3',
    excerpt: 'The flight controller at the heart of every FLYQ drone is the ESP32-S3 — here is the engineering reasoning behind that choice.',
    category: 'Engineering', author: 'FLYQ Team', date: '2025-05-12', readMins: 6,
    cover: '/images/products/flyq-edu-starter.jpg',
    body: [
      'When we set out to build an Indian programmable drone platform, the single most important decision was the compute at the core. We needed something powerful enough to run real-time control loops, friendly enough for students, and affordable enough to put in every classroom.',
      'The ESP32-S3 hit a rare sweet spot. A dual-core Xtensa LX7 running at 240 MHz gives us headroom for sensor fusion and control while leaving cycles for user code. Native USB simplifies flashing — plug in a cable and program from a Chromebook in a school lab.',
      'Crucially, the ESP32-S3 has a vast, mature open-source ecosystem. ESP-IDF, Arduino, and MicroPython all run on it. That means a learner can start with blocks, graduate to Arduino, and end up writing autonomous missions in Python — all on the same hardware.',
      'Wireless is built in. Wi-Fi and BLE let us stream telemetry, push over-the-air firmware, and pair with a phone or laptop without extra radios. For a teaching platform, that integration is everything.',
      'We pair it with a carefully chosen IMU, barometer and ESCs, then open the firmware so nothing is a black box. The result: a drone you can actually understand, line by line.',
    ],
  },
  {
    slug: 'open-source-firmware-for-classrooms',
    title: 'Open-source firmware belongs in the classroom',
    excerpt: 'Closed firmware turns a drone into a magic box. We think students learn more when they can read — and change — every line.',
    category: 'Education', author: 'FLYQ Team', date: '2025-04-28', readMins: 5,
    cover: '/images/products/flyq-stem-classroom.jpg',
    body: [
      'A drone is one of the most motivating objects a student can program. It flies. It responds. It fails in spectacular, debuggable ways. But that learning only happens if the student can see inside.',
      'Most commercial drones ship locked firmware. You get an app and a set of approved behaviours. For a hobbyist that is fine; for a learner it is a dead end. You cannot ask "what happens if I change this PID gain?" because you cannot reach the PID gains.',
      'FLYQ firmware is open. Every control loop, every safety check, every telemetry packet is in a repository you can read. Teachers build labs around it. Students fork it, break it, and fix it.',
      'Open firmware also future-proofs a school&rsquo;s investment. When the curriculum evolves, the platform evolves with it — no vendor gate, no licence renewal.',
    ],
  },
  {
    slug: 'drone-soccer-the-fastest-growing-stem-sport',
    title: 'Drone Soccer: the fastest-growing STEM sport',
    excerpt: 'Build, pilot, compete. Drone Soccer combines engineering and athleticism into a format schools love.',
    category: 'Community', author: 'FLYQ Team', date: '2025-04-10', readMins: 4,
    cover: '/images/products/flyq-drone-soccer-ball.jpg',
    body: [
      'Drone Soccer puts students inside protective spherical drones that they build, tune and fly through goals. It is part engineering project, part team sport, and entirely addictive.',
      'The format scales beautifully for schools. Teams of five split into builders, pilots and strategists. Everyone has a role; everyone learns.',
      'We supply the cages, controllers and spares — and run inter-school leagues to give students something to train toward. The competition is where the real engineering motivation kicks in.',
    ],
  },
  {
    slug: 'from-first-flight-to-autonomous-mission',
    title: 'From first flight to autonomous mission in eight weeks',
    excerpt: 'A look at the FLYQ curriculum arc that takes complete beginners to programmable autonomy.',
    category: 'Education', author: 'FLYQ Team', date: '2025-03-22', readMins: 7,
    cover: '/images/products/flyq-dev-kit.jpg',
    body: [
      'Our eight-week curriculum is designed as a single arc. Week one is a stable hover; week eight is a Python script flying a waypoint mission. Nothing is skipped.',
      'Weeks 1–2 cover safety, aerodynamics and manual flight. Students earn confidence before they touch code.',
      'Weeks 3–5 move into programming the ESP32-S3 — first with Arduino, then with the FLYQ Python SDK. They read telemetry and write their first automated behaviours.',
      'Weeks 6–8 are projects: sensor integration, autonomous routines, and a capstone mission the students design themselves. By the end they are not drone users — they are drone engineers.',
    ],
  },
]

