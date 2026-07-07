-- ============================================================
--  FLYQ — Row Level Security policies
--  Public read on catalog/content; everything else gated.
-- ============================================================

-- Helper: is current user an admin?
create or replace function is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists(select 1 from profiles where id = auth.uid() and role = 'admin');
$$;

create or replace function is_staff() returns boolean
language sql stable security definer set search_path = public as $$
  select exists(select 1 from profiles where id = auth.uid() and role in ('admin','editor','support'));
$$;

-- Enable RLS everywhere
alter table profiles               enable row level security;
alter table categories             enable row level security;
alter table products               enable row level security;
alter table product_images         enable row level security;
alter table addresses              enable row level security;
alter table cart_items             enable row level security;
alter table orders                 enable row level security;
alter table order_items            enable row level security;
alter table reviews                enable row level security;
alter table testimonials           enable row level security;
alter table workshops              enable row level security;
alter table event_registrations    enable row level security;
alter table stem_lab_leads         enable row level security;
alter table bulk_leads             enable row level security;
alter table dealer_leads           enable row level security;
alter table contact_messages       enable row level security;
alter table newsletter_subscribers enable row level security;
alter table faqs                   enable row level security;
alter table blog_posts             enable row level security;
alter table pages                  enable row level security;
alter table banners                enable row level security;
alter table coupons                enable row level security;
alter table media                  enable row level security;
alter table settings               enable row level security;
alter table admin_audit            enable row level security;

-- ---------- PUBLIC READ (anon) ----------
create policy pub_products      on products            for select using (is_published = true);
create policy pub_prod_images   on product_images      for select using (true);
create policy pub_categories    on categories          for select using (true);
create policy pub_faqs          on faqs                for select using (published = true);
create policy pub_blog          on blog_posts          for select using (published = true);
create policy pub_pages         on pages               for select using (true);
create policy pub_testimonials  on testimonials        for select using (approved = true);
create policy pub_workshops     on workshops           for select using (published = true);
create policy pub_reviews       on reviews             for select using (approved = true);
create policy pub_banners       on banners             for select using (active = true);

-- ---------- PUBLIC INSERT (lead/contact/registration forms) ----------
create policy ins_contact   on contact_messages       for insert with check (true);
create policy ins_news      on newsletter_subscribers for insert with check (true);
create policy ins_stem      on stem_lab_leads         for insert with check (true);
create policy ins_bulk      on bulk_leads             for insert with check (true);
create policy ins_dealer    on dealer_leads           for insert with check (true);
create policy ins_reg       on event_registrations    for insert with check (true);

-- ---------- OWNER access (authenticated customers) ----------
create policy own_profile_sel on profiles   for select using (id = auth.uid() or is_admin());
create policy own_profile_upd on profiles   for update using (id = auth.uid());

create policy own_address     on addresses  for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy own_cart        on cart_items for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy own_orders_sel  on orders     for select using (user_id = auth.uid() or is_staff());
create policy own_orderitems  on order_items for select using (
  exists(select 1 from orders o where o.id = order_id and (o.user_id = auth.uid() or is_staff())));

create policy own_review_ins  on reviews    for insert with check (user_id = auth.uid());
create policy own_review_sel  on reviews    for select using (approved = true or user_id = auth.uid() or is_staff());

-- ---------- STAFF/ADMIN full access ----------
create policy adm_products    on products            for all using (is_staff()) with check (is_staff());
create policy adm_prodimg     on product_images      for all using (is_staff()) with check (is_staff());
create policy adm_categories  on categories          for all using (is_staff()) with check (is_staff());
create policy adm_orders      on orders              for all using (is_staff()) with check (is_staff());
create policy adm_orderitems  on order_items         for all using (is_staff()) with check (is_staff());
create policy adm_testi       on testimonials        for all using (is_staff()) with check (is_staff());
create policy adm_workshops   on workshops           for all using (is_staff()) with check (is_staff());
create policy adm_regs        on event_registrations for all using (is_staff()) with check (is_staff());
create policy adm_stem        on stem_lab_leads      for all using (is_staff()) with check (is_staff());
create policy adm_bulk        on bulk_leads          for all using (is_staff()) with check (is_staff());
create policy adm_dealer      on dealer_leads        for all using (is_staff()) with check (is_staff());
create policy adm_contact     on contact_messages    for all using (is_staff()) with check (is_staff());
create policy adm_news        on newsletter_subscribers for all using (is_staff()) with check (is_staff());
create policy adm_faqs        on faqs                for all using (is_staff()) with check (is_staff());
create policy adm_blog        on blog_posts          for all using (is_staff()) with check (is_staff());
create policy adm_pages       on pages               for all using (is_staff()) with check (is_staff());
create policy adm_banners     on banners             for all using (is_staff()) with check (is_staff());
create policy adm_coupons     on coupons             for all using (is_staff()) with check (is_staff());
create policy adm_media       on media               for all using (is_staff()) with check (is_staff());
create policy adm_settings    on settings            for all using (is_admin()) with check (is_admin());
create policy adm_reviews     on reviews             for update using (is_staff());
create policy adm_audit_sel   on admin_audit         for select using (is_admin());
create policy adm_audit_ins   on admin_audit         for insert with check (is_staff());
create policy adm_profiles    on profiles            for all using (is_admin()) with check (is_admin());

-- Auto-create profile row on signup
create or replace function handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, referral_code)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name',''),
          upper(substr(md5(new.id::text),1,8)));
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function handle_new_user();
