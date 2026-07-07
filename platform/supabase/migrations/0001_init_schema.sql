-- ============================================================
--  FLYQ by Passion3D World — Supabase Schema
--  Run order: 0001_init_schema.sql -> 0002_rls_policies.sql -> 0003_seed.sql
-- ============================================================

-- ---------- Extensions ----------
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ---------- Enums ----------
do $$ begin
  create type user_role as enum ('admin','editor','support','customer');
exception when duplicate_object then null; end $$;

do $$ begin
  create type order_status as enum ('pending','paid','processing','shipped','delivered','cancelled','refunded');
exception when duplicate_object then null; end $$;

do $$ begin
  create type lead_status as enum ('new','contacted','demo','won','lost');
exception when duplicate_object then null; end $$;

-- ---------- Profiles (extends auth.users) ----------
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role user_role not null default 'customer',
  totp_secret text,            -- encrypted at app layer
  pin_hash text,               -- bcrypt of 6-digit admin PIN
  referral_code text unique,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ---------- Categories ----------
create table if not exists categories (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  description text,
  sort_order int default 0
);

-- ---------- Products ----------
create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  category_id uuid references categories(id),
  short_desc text,
  long_desc text,
  price_inr int not null,
  mrp_inr int,
  stock int not null default 0,
  specs jsonb default '{}'::jsonb,
  features text[],
  in_the_box text[],
  datasheet_url text,
  is_featured boolean default false,
  is_published boolean default true,
  created_at timestamptz default now()
);

create table if not exists product_images (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references products(id) on delete cascade,
  url text not null,
  alt text,
  content_hash text,           -- build-time uniqueness check
  sort_order int default 0
);

-- ---------- Addresses ----------
create table if not exists addresses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  full_name text, phone text, line1 text, line2 text,
  city text, state text, pincode text, country text default 'India',
  is_default boolean default false
);

-- ---------- Cart ----------
create table if not exists cart_items (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  qty int not null default 1,
  created_at timestamptz default now(),
  unique(user_id, product_id)
);

-- ---------- Orders ----------
create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  order_number text unique not null,
  user_id uuid references profiles(id),
  status order_status not null default 'pending',
  subtotal_inr int not null default 0,
  tax_inr int not null default 0,
  shipping_inr int not null default 0,
  total_inr int not null default 0,
  payment_method text,         -- razorpay | cod | bank
  razorpay_order_id text,
  razorpay_payment_id text,
  shiprocket_awb text,
  shipping_address jsonb,
  gstin text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  name text, qty int, unit_price_inr int
);

-- ---------- Reviews ----------
create table if not exists reviews (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references products(id) on delete cascade,
  user_id uuid references profiles(id),
  rating int check (rating between 1 and 5),
  title text, body text, photo_url text,
  verified_buyer boolean default false,
  approved boolean default false,
  created_at timestamptz default now()
);

-- ---------- Testimonials (WhatsApp-style) ----------
create table if not exists testimonials (
  id uuid primary key default uuid_generate_v4(),
  name text not null, role text, city text,
  segment text,                -- farmer|student|educator|fpv|enterprise|researcher|dealer
  message text not null,
  avatar_url text,
  attachment_url text,         -- optional image inside bubble
  voice_url text,              -- optional voice note
  voice_seconds int,
  screenshot_url text,         -- original screenshot lightbox
  timestamp_label text,        -- e.g. "Today 14:32"
  approved boolean default false,
  sort_order int default 0
);

-- ---------- Workshops / Events ----------
create table if not exists workshops (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  event_date date not null,
  city text, venue text,
  level text,                  -- Beginner|Intermediate|Advanced|School|Educators|Professional
  type text,                   -- School|College|Public|Corporate|Online
  seats int, seats_taken int default 0,
  fee_inr int default 0,
  poster_url text,
  instructor_name text, instructor_bio text,
  prerequisites text, what_youll_build text,
  map_embed text,
  published boolean default true,
  created_at timestamptz default now()
);

create table if not exists event_registrations (
  id uuid primary key default uuid_generate_v4(),
  workshop_id uuid references workshops(id) on delete cascade,
  name text, email text, phone text, age int, city text,
  occupation text, experience_level text, tshirt_size text,
  dietary text, emergency_contact text,
  payment_method text,         -- razorpay | venue
  payment_status text default 'pending',
  ticket_code text,
  created_at timestamptz default now()
);

-- ---------- Leads (STEM Lab / Bulk / Dealer) ----------
create table if not exists stem_lab_leads (
  id uuid primary key default uuid_generate_v4(),
  school_name text, school_type text, city text, state text,
  strength int, principal_name text, contact text, email text,
  demo_date date, budget_range text, message text,
  status lead_status default 'new',
  created_at timestamptz default now()
);

create table if not exists bulk_leads (
  id uuid primary key default uuid_generate_v4(),
  company text, gstin text, contact_person text, email text, phone text,
  product text, qty int, timeline text, budget text, message text,
  status lead_status default 'new',
  created_at timestamptz default now()
);

create table if not exists dealer_leads (
  id uuid primary key default uuid_generate_v4(),
  company text, city text, state text, years_in_business int,
  current_lines text, monthly_volume text, document_url text, message text,
  status lead_status default 'new',
  created_at timestamptz default now()
);

create table if not exists contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text, email text, phone text, subject text, message text,
  created_at timestamptz default now()
);

create table if not exists newsletter_subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  confirmed boolean default false,
  created_at timestamptz default now()
);

-- ---------- CMS ----------
create table if not exists faqs (
  id uuid primary key default uuid_generate_v4(),
  category text, question text not null, answer text not null,
  sort_order int default 0, published boolean default true
);

create table if not exists blog_posts (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null, title text not null,
  excerpt text, body_mdx text, cover_url text,
  author text, published boolean default false,
  published_at timestamptz, created_at timestamptz default now()
);

create table if not exists pages (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,   -- terms|privacy|refund|shipping|warranty
  title text, body_mdx text, updated_at timestamptz default now()
);

create table if not exists banners (
  id uuid primary key default uuid_generate_v4(),
  title text, subtitle text, image_url text, cta_label text, cta_href text,
  active boolean default true, sort_order int default 0
);

create table if not exists coupons (
  id uuid primary key default uuid_generate_v4(),
  code text unique not null, kind text, value int,
  expires_at timestamptz, active boolean default true
);

create table if not exists media (
  id uuid primary key default uuid_generate_v4(),
  url text not null, kind text, alt text, created_at timestamptz default now()
);

create table if not exists settings (
  key text primary key, value jsonb
);

-- ---------- Admin audit ----------
create table if not exists admin_audit (
  id uuid primary key default uuid_generate_v4(),
  actor uuid references profiles(id),
  action text, target text, ip text, user_agent text,
  created_at timestamptz default now()
);

-- ---------- Indexes ----------
create index if not exists idx_products_cat on products(category_id);
create index if not exists idx_orders_user on orders(user_id);
create index if not exists idx_reg_workshop on event_registrations(workshop_id);
create index if not exists idx_reviews_product on reviews(product_id);
