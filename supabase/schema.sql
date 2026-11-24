-- Zass backend — run once in Supabase → SQL Editor → New query → Run

create table if not exists public.laptops (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  brand       text not null,
  condition   text not null check (condition in ('New', 'Used')),
  price       integer not null,
  old_price   integer,
  cpu         text not null default '',
  ram         text not null default '',
  storage     text not null default '',
  display     text not null default '',
  gpu         text,
  highlights  text[] not null default '{}',
  warranty    text not null default '',
  featured    boolean not null default false,
  sold        boolean not null default false,
  images      text[] not null default '{}',
  created_at  timestamptz not null default now()
);

alter table public.laptops enable row level security;

drop policy if exists "laptops public read" on public.laptops;
create policy "laptops public read" on public.laptops for select using (true);

drop policy if exists "laptops admin write" on public.laptops;
create policy "laptops admin write" on public.laptops for all to authenticated using (true) with check (true);

-- Public image bucket
insert into storage.buckets (id, name, public)
values ('laptops', 'laptops', true)
on conflict (id) do update set public = true;

drop policy if exists "laptop images public read" on storage.objects;
create policy "laptop images public read" on storage.objects for select using (bucket_id = 'laptops');

drop policy if exists "laptop images admin insert" on storage.objects;
create policy "laptop images admin insert" on storage.objects for insert to authenticated with check (bucket_id = 'laptops');

drop policy if exists "laptop images admin update" on storage.objects;
create policy "laptop images admin update" on storage.objects for update to authenticated using (bucket_id = 'laptops');

drop policy if exists "laptop images admin delete" on storage.objects;
create policy "laptop images admin delete" on storage.objects for delete to authenticated using (bucket_id = 'laptops');
