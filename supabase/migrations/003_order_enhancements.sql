-- ============================================================
-- RoboxRise — Migration 003: Order enhancements
-- Adds customer name + address snapshot to orders,
-- admin role to profiles, and admin RLS policies.
-- ============================================================

-- 1) Add customer name and shipping address snapshot to orders
alter table public.orders
  add column customer_first_name text,
  add column customer_last_name  text,
  add column shipping_address_snapshot jsonb;

-- 2) Add role column to profiles (default 'customer')
alter table public.profiles
  add column role text not null default 'customer';

-- 3) Admin RLS policies — users with role = 'admin' can read everything

create policy "orders_select_admin"
  on public.orders for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.role = 'admin'
    )
  );

create policy "order_items_select_admin"
  on public.order_items for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.role = 'admin'
    )
  );

create policy "addresses_select_admin"
  on public.addresses for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.role = 'admin'
    )
  );

create policy "payment_events_select_admin"
  on public.payment_events for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.role = 'admin'
    )
  );

-- 4) Tighten guest order RLS — require the caller to filter by idempotency_key
--    Drop the old overly broad policy and replace it.
drop policy if exists "orders_select_guest" on public.orders;

-- Guest orders are no longer selectable by anon via RLS.
-- The confirmation page should use the order data returned by the verify-payment API
-- instead of querying the orders table directly.
