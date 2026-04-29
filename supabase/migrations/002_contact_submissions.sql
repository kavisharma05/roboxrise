-- ============================================================
-- Contact form submissions (hero + contact page)
-- ============================================================

create table public.contact_submissions (
  id         uuid primary key default gen_random_uuid(),
  source     text not null default 'contact',   -- 'hero' or 'contact'
  name       text not null,
  email      text not null,
  phone      text,
  subject    text,
  message    text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

-- Anyone (logged-in or not) can submit the form
create policy "contact_submissions_insert_public"
  on public.contact_submissions for insert
  to anon, authenticated
  with check (true);

-- No select/update/delete for clients — only service role can read
