-- ============================================================
-- RoboRise — Initial schema: profiles, addresses, orders,
-- order_items, payment_events.  Run once in Supabase SQL Editor.
-- ============================================================

-- 1) Enums
create type public.order_status    as enum ('pending','paid','failed','cancelled','refunded');
create type public.payment_status  as enum ('pending','authorized','captured','failed','refunded');
create type public.address_type    as enum ('shipping','billing');

-- 2) Helper: auto-update updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ============================================================
-- 3) PROFILES  (1:1 with auth.users)
-- ============================================================
create table public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  full_name  text,
  phone      text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using (id = auth.uid());

create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

create policy "profiles_insert_own"
  on public.profiles for insert
  to authenticated
  with check (id = auth.uid());

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Auto-create a profile row when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- 4) ADDRESSES
-- ============================================================
create table public.addresses (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  type        public.address_type not null default 'shipping',
  line1       text not null,
  line2       text,
  city        text not null,
  state       text not null,
  postal_code text not null,
  country     text not null default 'IN',
  is_default  boolean not null default false,
  created_at  timestamptz not null default now()
);

alter table public.addresses enable row level security;

create policy "addresses_select_own"
  on public.addresses for select
  to authenticated
  using (user_id = auth.uid());

create policy "addresses_insert_own"
  on public.addresses for insert
  to authenticated
  with check (user_id = auth.uid());

create policy "addresses_update_own"
  on public.addresses for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "addresses_delete_own"
  on public.addresses for delete
  to authenticated
  using (user_id = auth.uid());

create index idx_addresses_user_id on public.addresses(user_id);

-- ============================================================
-- 5) ORDERS
-- ============================================================
create table public.orders (
  id                   uuid primary key default gen_random_uuid(),
  user_id              uuid references auth.users(id) on delete restrict,
  status               public.order_status   not null default 'pending',
  payment_status       public.payment_status not null default 'pending',
  currency             text    not null default 'INR',
  subtotal_amount      integer not null check (subtotal_amount >= 0),
  shipping_amount      integer not null check (shipping_amount  >= 0),
  tax_amount           integer not null check (tax_amount       >= 0),
  total_amount         integer not null check (total_amount     >= 0),
  razorpay_order_id    text unique,
  razorpay_payment_id  text unique,
  receipt              text unique,
  shipping_address_id  uuid references public.addresses(id) on delete set null,
  contact_email        text not null,
  contact_phone        text,
  guest_email          text,
  guest_phone          text,
  idempotency_key      text unique,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now(),
  paid_at              timestamptz
);

alter table public.orders enable row level security;

-- Authenticated users see only their own orders
create policy "orders_select_own"
  on public.orders for select
  to authenticated
  using (user_id = auth.uid());

-- Guest orders readable by anon if they know the idempotency_key (used on confirmation page)
create policy "orders_select_guest"
  on public.orders for select
  to anon
  using (user_id is null and idempotency_key is not null);

create index idx_orders_user_id_created on public.orders(user_id, created_at desc);
create index idx_orders_razorpay_order   on public.orders(razorpay_order_id);

create trigger orders_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

-- ============================================================
-- 6) ORDER ITEMS
-- ============================================================
create table public.order_items (
  id           uuid primary key default gen_random_uuid(),
  order_id     uuid not null references public.orders(id) on delete cascade,
  product_id   text not null,
  product_sku  text,
  product_name text not null,
  unit_price   integer not null check (unit_price >= 0),
  quantity     integer not null check (quantity   >  0),
  line_total   integer not null check (line_total >= 0)
);

alter table public.order_items enable row level security;

create policy "order_items_select_own"
  on public.order_items for select
  to authenticated
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
        and orders.user_id = auth.uid()
    )
  );

create index idx_order_items_order_id on public.order_items(order_id);

-- ============================================================
-- 7) PAYMENT EVENTS  (audit / idempotency for webhooks)
-- ============================================================
create table public.payment_events (
  id         uuid primary key default gen_random_uuid(),
  order_id   uuid references public.orders(id) on delete cascade,
  provider   text not null default 'razorpay',
  event_type text not null,
  event_id   text,
  payload    jsonb not null,
  created_at timestamptz not null default now(),
  unique(provider, event_id)
);

alter table public.payment_events enable row level security;
-- No client-facing policies — only the service role key can read/write this table.
