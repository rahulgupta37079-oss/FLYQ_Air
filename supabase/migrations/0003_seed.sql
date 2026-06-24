-- ============================================================
--  FLYQ — Seed data (categories, 23 products, testimonials,
--  workshops, FAQs, legal pages, settings)
--  Images use representative placeholders — swap via admin later.
-- ============================================================

-- ---------- Categories ----------
insert into categories (slug,name,sort_order) values
 ('education','Education',1),
 ('agriculture','Agriculture',2),
 ('payloads','Payloads',3),
 ('fpv','FPV',4),
 ('tethered','Tethered',5),
 ('parts','Parts',6),
 ('accessories','Accessories',7)
on conflict (slug) do nothing;

-- ---------- Products (23 SKUs) ----------
-- helper local function not available in plain SQL; use category subselect
insert into products (slug,name,category_id,short_desc,price_inr,mrp_inr,stock,is_featured,specs,features,in_the_box)
select v.slug,v.name,(select id from categories where slug=v.cat),v.short_desc,v.price,v.mrp,v.stock,v.feat,
       v.specs::jsonb,v.features,v.box
from (values
 ('flyq-air','FLYQ Air','education','ESP32-S3 programmable nano drone for makers & STEM.',12999,15999,50,true,
   '{"processor":"ESP32-S3","weight":"45g","flight":"5-7 min","motors":"Coreless 8.5x20mm","battery":"650mAh 1S","range":"100m","gyro":"6-axis sub-ms"}',
   array['Open-source firmware','Block + Python + Arduino + ESP-IDF','24-pin expansion','6-axis stabilization'],
   array['FLYQ Air drone','2x battery','USB-C charger','Propeller set','Propeller guards','Quick-start guide']),
 ('flyq-vision','FLYQ Vision','education','AI camera drone with optical-flow & CV SDK.',25999,29999,30,true,
   '{"processor":"ESP32-S3","camera":"HD","sensor":"Optical flow + ToF","flight":"12 min","range":"150m"}',
   array['Computer-vision SDK','Optical-flow position hold','Gesture control','AI object tracking'],
   array['FLYQ Vision drone','2x battery','Charger','Spare props','Case']),
 ('agri-spray-10l','Agriculture Spray Drone 10L','agriculture','10L payload precision spraying quadcopter.',129999,149999,10,true,
   '{"payload":"10L","type":"Quadcopter","gps":"RTK ready"}',array['Precision spraying','RTK GPS ready','Foldable arms'],array['Drone','Tank','Charger','Remote']),
 ('agri-spray-16l','Agriculture Spray Drone 16L','agriculture','16L payload spraying drone for mid farms.',194999,219999,8,false,
   '{"payload":"16L"}',array['Wide spray boom','Smart flow control'],array['Drone','Tank','Remote']),
 ('agri-spray-20l','Agriculture Spray Drone 20L','agriculture','20L high-capacity spraying drone.',259999,289999,6,true,
   '{"payload":"20L"}',array['High capacity','Terrain-follow radar'],array['Drone','Tank','Remote']),
 ('agri-spray-30l-hexa','Agriculture Spray Drone 30L Hexacopter','agriculture','30L hexacopter for large estates.',389999,429999,5,false,
   '{"payload":"30L","type":"Hexacopter"}',array['6-rotor redundancy','RTK precision'],array['Drone','Tank','Remote']),
 ('agri-spray-50l','Agriculture Spray Drone 50L','agriculture','50L flagship agricultural drone.',649999,719999,3,false,
   '{"payload":"50L"}',array['Enterprise capacity','Swarm-ready'],array['Drone','Tank','Remote','Spare props']),
 ('agri-seed-dropping','Agriculture Seed Dropping Drone','agriculture','Aerial seed-dropping drone for reforestation.',169999,189999,7,false,
   '{"function":"Seed dropping"}',array['Programmable seed grid','GPS waypoint'],array['Drone','Hopper','Remote']),
 ('hobbywing-x13-motor','Hobbywing X13 Motor','parts','High-thrust agri drone motor (representative).',12999,14999,25,false,
   '{"type":"Brushless"}',array['High thrust','IP-rated'],array['1x Motor']),
 ('jiyi-kx-fc','JIYI KX Flight Controller','parts','Agricultural flight controller (representative).',32999,36999,15,false,
   '{"type":"Flight controller"}',array['RTK support','Terrain radar input'],array['1x Flight controller']),
 ('3011-carbon-props','3011 Carbon Fiber Propellers (Pair)','parts','Carbon fiber propellers, pair.',2599,2999,50,false,
   '{"size":"30 inch"}',array['Carbon fiber','Balanced'],array['2x Propellers']),
 ('16000mah-6s-lipo','16000mAh 6S LiPo Battery','parts','High-capacity 6S LiPo for agri drones.',19499,21999,20,false,
   '{"capacity":"16000mAh","cells":"6S"}',array['High discharge','Smart BMS'],array['1x Battery']),
 ('zenmuse-l1-lidar','DJI Zenmuse L1 LiDAR','payloads','LiDAR mapping payload (representative listing).',649999,699999,4,false,
   '{"type":"LiDAR"}',array['Live point cloud','IMU fusion'],array['1x Payload']),
 ('zenmuse-p1-camera','DJI Zenmuse P1 Camera','payloads','45MP full-frame mapping camera (representative).',519999,559999,5,false,
   '{"sensor":"45MP full-frame"}',array['Photogrammetry','TimeSync'],array['1x Payload']),
 ('zenmuse-h20n','DJI Zenmuse H20N Night Vision','payloads','Night-vision hybrid payload (representative).',779999,829999,3,false,
   '{"type":"Night vision"}',array['Starlight sensors','Thermal + zoom'],array['1x Payload']),
 ('hyperspectral-camera','Hyperspectral Camera System','payloads','Hyperspectral imaging for agri & research.',389999,429999,6,false,
   '{"type":"Hyperspectral"}',array['Multi-band capture','Research grade'],array['1x Camera system']),
 ('aaf-turbofly-x','AAF Turbofly X FPV Racing Drone','fpv','High-speed FPV racing drone.',45499,49999,12,true,
   '{"type":"FPV racing"}',array['HD digital transmission','Carbon frame'],array['Drone','Goggles-ready','Spare props']),
 ('aaf-training-x','AAF Training X FPV Drone','fpv','Durable FPV trainer drone.',32499,35999,15,false,
   '{"type":"FPV trainer"}',array['Crash-resistant','Sim-compatible'],array['Drone','Spare props']),
 ('tethered-10kg-2kw','Tethered Drone Station 10kg/2kW','tethered','Tethered persistent drone station.',519999,569999,4,false,
   '{"payload":"10kg","power":"2kW"}',array['Unlimited endurance','Secure data link'],array['Station','Tether','Drone']),
 ('tethered-30kg-6kw','Tethered Drone Station 30kg/6kW','tethered','Heavy-lift tethered station.',1169999,1269999,2,false,
   '{"payload":"30kg","power":"6kW"}',array['Heavy lift','Industrial PSU'],array['Station','Tether','Drone']),
 ('drone-remote-controller','Drone Remote Controller','accessories','Universal drone remote controller.',25999,28999,20,false,
   '{"type":"Remote"}',array['Long range','Telemetry display'],array['1x Remote','Charger']),
 ('landing-pad-1-2m','Drone Landing Pad 1.2m','accessories','1.2m foldable landing pad.',3899,4499,35,false,
   '{"size":"1.2m"}',array['Foldable','Hi-vis'],array['1x Landing pad','Bag']),
 ('hard-shell-case','Hard Shell Carrying Case','accessories','Rugged hard-shell carrying case.',12999,14999,18,false,
   '{"type":"Case"}',array['IP-rated','Custom foam'],array['1x Case'])
) as v(slug,name,cat,short_desc,price,mrp,stock,feat,specs,features,box)
on conflict (slug) do nothing;

-- one representative image per product (unique placeholder per slug)
insert into product_images (product_id,url,alt,sort_order)
select p.id, '/images/products/'||p.slug||'.jpg', p.name||' product image', 0
from products p
on conflict do nothing;

-- ---------- Testimonials (12, WhatsApp-style) ----------
insert into testimonials (name,role,city,segment,message,timestamp_label,voice_seconds,approved,sort_order) values
 ('Rajesh Kumar','Agri Farmer','Punjab','farmer','Bhai, 20L spray drone se 5x kaam ho gaya. Diesel ka kharcha bhi 60% kam. Paisa vasool!','Today 14:32',null,true,1),
 ('Dr. Anil Sharma','Research Institute','Dehradun','researcher','LiDAR payload delivery in 4 days. Data quality is exceptional. Going to order 2 more.','Today 11:08',null,true,2),
 ('Priya Deshmukh','FPV Pilot','Pune','fpv','AAF Turbofly X is insane stability for the price. HD transmission rock solid.','Yesterday 19:50',23,true,3),
 ('Vikram Singh','Organic Farmer','Nashik','farmer','30L hexacopter + RTK GPS = labour cost down 60%. Game changer for organic certification.','Yesterday 09:15',null,true,4),
 ('Sanjay Mehta','Surveying Co.','Ahmedabad','enterprise','P1 45MP camera, mapping accuracy improved 3x. After-sales support is unmatched in India.','Mon 16:40',null,true,5),
 ('Principal, DPS','School','Bangalore','educator','Set up the FLYQ STEM Lab last month. 120 students enrolled in week 1. Highly recommended.','Mon 10:22',null,true,6),
 ('Rahul Sharma','B.Tech Student','Mumbai','student','Went from zero to autonomous flight in 8 weeks. Python SDK is buttery smooth.','Sun 21:05',null,true,7),
 ('Prof. Amit Kumar','Professor','Chennai','educator','Integrated FLYQ Air into our embedded systems lab. Open-source firmware is gold for research.','Sun 14:18',null,true,8),
 ('Sneha Desai','Software Dev','Hyderabad','student','Built a gesture-controlled drone as my weekend project. Documentation is chef''s kiss.','Sat 12:30',null,true,9),
 ('Arjun Reddy','Maker','Chennai','student','Kit quality > price. Even propeller guards feel premium. 10/10.','Sat 08:55',null,true,10),
 ('Meera Singh','PhD Researcher','Bangalore','researcher','Expansion connector + ToF sensor = perfect SLAM testbed for my thesis.','Fri 17:42',null,true,11),
 ('Amit Patel','Dealer','Surat','dealer','Bulk-ordered 50 units. Margins are healthy, delivery on time, zero defects. Partner for life.','Fri 11:11',null,true,12);

-- ---------- Workshops (12 across India) ----------
insert into workshops (slug,title,event_date,city,venue,level,type,seats,fee_inr,published) values
 ('mumbai-drone-bootcamp','Drone Building & Programming Bootcamp','2026-07-12','Mumbai','IIT Bombay Innovation Hub','Beginner','College',40,2499,true),
 ('delhi-dgca-pilot-prep','DGCA Micro-Category Pilot Prep','2026-07-19','Delhi','India Habitat Centre','Intermediate','Public',30,4999,true),
 ('bangalore-fpv-build','FPV Racing & Build Workshop','2026-07-26','Bangalore','IISc Campus','Intermediate','Public',25,3499,true),
 ('hyderabad-agri-spray','Agri-Drone Spray Operations','2026-08-02','Hyderabad','T-Hub','Professional','Corporate',20,6999,true),
 ('pune-drone-soccer','Drone Soccer Inter-School Challenge','2026-08-09','Pune','Symbiosis','School','School',80,999,true),
 ('chennai-cv-flyq','Computer Vision on FLYQ Air','2026-08-16','Chennai','IIT Madras Research Park','Advanced','College',35,3999,true),
 ('ahmedabad-lidar','LiDAR Mapping Masterclass','2026-08-23','Ahmedabad','GIFT City','Professional','Corporate',15,9999,true),
 ('kolkata-train-trainer','STEM Teachers Train-the-Trainer','2026-08-30','Kolkata','IIM Calcutta','Educators','School',40,0,true),
 ('jaipur-photo-survey','Drone Photography & Surveying','2026-09-06','Jaipur','MNIT Jaipur','Beginner','Public',30,2999,true),
 ('lucknow-atl-drone-day','Atal Tinkering Lab Drone Day','2026-09-13','Lucknow','Govt. of UP','School','School',100,0,true),
 ('indore-pcb-to-sky','PCB-to-Sky: Building Your Own Drone','2026-09-20','Indore','IIT Indore','Advanced','College',20,5499,true),
 ('online-python-sdk','Python SDK for Autonomous Missions','2026-09-27','Online','Zoom','Intermediate','Online',200,499,true);

-- ---------- FAQs (sample of 35; admin can extend) ----------
insert into faqs (category,question,answer,sort_order) values
 ('Programming & SDK','What programming languages are supported?','FLYQ Air supports ESP-IDF, Arduino, a Python SDK and the Crazyflie client — from block coding for beginners to low-level C for advanced users.',1),
 ('Product','Do I need prior drone experience?','No. Our 8-week curriculum takes complete beginners from zero to autonomous flight.',2),
 ('Product','What is included in the FLYQ Air kit?','The drone, 2 batteries, USB-C charger, a propeller set, propeller guards and a quick-start guide.',3),
 ('Product','How long does the battery last?','Approximately 5-7 minutes of flight per charge, with a 1-2 hour full charge time.',4),
 ('Product','Can I add sensors?','Yes — a 24-pin expansion connector exposes I²C, SPI, UART and GPIO for sensors like VL53L1X, MS5611 and PMW3901.',5),
 ('Programming & SDK','Is FLYQ Air open source?','Yes. Full schematics and firmware are published on GitHub; software is MIT-licensed and hardware is under CERN-OHL.',6),
 ('DGCA & Regulations','Do I need DGCA registration?','Nano drones under 250g are exempt. Micro and Small categories require Digital Sky registration and an RPC.',7),
 ('Shipping & Delivery','What is your shipping timeline?','2-7 business days pan-India for kits; agricultural drones take 10-15 days due to freight.',8),
 ('Payments & GST','Do you provide a GST invoice?','Yes, a GST invoice with our GSTIN is issued for every order.',9),
 ('Warranty & Returns','What is your warranty?','1 year on FLYQ manufacturing defects, 6 months on motors/ESC, and OEM terms for third-party payloads.',10),
 ('Warranty & Returns','What is your return policy?','7-day returns for unboxed items. Once flown, products are non-returnable except for verified defects.',11),
 ('Shipping & Delivery','Do you ship internationally?','Limited international shipping — please contact us for a quote.',12),
 ('Payments & GST','What payment options are available?','UPI, cards, netbanking, EMI (3-24 months), COD up to ₹25,000, and bank transfer for enterprise orders.',13),
 ('Bulk Orders','Is there a bulk discount?','Yes, for orders of 10+ units. Reach out via the Bulk Orders page.',14),
 ('Bulk Orders','Can schools get GST-exempt pricing?','Government schools can avail applicable concessional/TDS pricing — contact our team.',15),
 ('Workshops & STEM Lab','Do you provide training?','Yes — STEM Lab programs, DGCA prep and custom corporate training.',16),
 ('Product','Is FLYQ made in India?','Yes — designed & assembled in Mumbai with PCBs fabricated in Bengaluru.',17),
 ('Product','Are spare parts available?','Yes, we maintain a dedicated Parts section for all components.',18),
 ('Warranty & Returns','Do you offer a repair service?','Yes — raise an RMA from your account dashboard. Typical turnaround is 7-10 days.',19),
 ('Account & Support','How do I track my order?','Log in to your account dashboard or use the order-tracking link sent on confirmation.',20);

-- ---------- Legal pages (placeholders; full copy lives in MDX/admin) ----------
insert into pages (slug,title,body_mdx) values
 ('terms','Terms & Conditions','# Terms & Conditions\nFull India-compliant terms (Consumer Protection Act 2019, IT Act 2000). Edit in admin.'),
 ('privacy','Privacy Policy','# Privacy Policy\nDPDP Act 2023 + GDPR aligned. Edit in admin.'),
 ('refund','Refund & Return Policy','# Refund & Return Policy\n7-day return for unopened items. Edit in admin.'),
 ('shipping','Shipping Policy','# Shipping Policy\nBluedart, Delhivery, Shiprocket. Edit in admin.'),
 ('warranty','Warranty Policy','# Warranty Policy\n1 year FLYQ. Edit in admin.')
on conflict (slug) do nothing;

-- ---------- Settings ----------
insert into settings (key,value) values
 ('contact', '{"whatsapp":"+919137361474","phone":"+919137361474","email":"hello@flyqdrone.in","address":"Mumbai, Maharashtra, India","gstin":"GSTIN-PLACEHOLDER"}')
on conflict (key) do nothing;
