-- ============================================================================
-- RENOVALLO — Schéma Supabase
-- CRM de génération de leads + espace artisan
-- Exécuter ce script dans le SQL Editor de Supabase (ou via `supabase db push`)
-- ============================================================================

create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- 1. PROFILS (artisans + admins) — lié à auth.users
-- ----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'artisan' check (role in ('admin', 'artisan')),
  full_name text,
  email text,
  company_name text,
  trade text,
  trades text[] default '{}',
  phone text,
  siret text,
  city text,
  postal_code text,
  department text,
  lat double precision,
  lng double precision,
  radius_km integer default 30,
  quota_monthly integer default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists profiles_role_idx on public.profiles (role);

-- ----------------------------------------------------------------------------
-- 2. LEADS (demandes entrantes du site)
-- ----------------------------------------------------------------------------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  first_name text,
  last_name text,
  email text not null,
  phone text,
  project_type text,
  property_type text,
  description text,
  budget_min numeric,
  budget_max numeric,
  address text,
  postal_code text,
  city text,
  department text,
  lat double precision,
  lng double precision,
  status text not null default 'nouveau'
    check (status in ('nouveau', 'contacte', 'qualifie', 'devis_envoye', 'signe', 'perdu')),
  source text not null default 'site',
  page_url text,
  assigned_artisan uuid references public.profiles (id) on delete set null,
  assigned_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_artisan_idx on public.leads (assigned_artisan);
create index if not exists leads_created_idx on public.leads (created_at desc);
create index if not exists leads_city_idx on public.leads (city);
create index if not exists leads_department_idx on public.leads (department);

-- ----------------------------------------------------------------------------
-- 3. QUOTAS (nombre de leads par artisan et par mois)
-- ----------------------------------------------------------------------------
create table if not exists public.quotas (
  id uuid primary key default gen_random_uuid(),
  artisan_id uuid not null references public.profiles (id) on delete cascade,
  month date not null,
  max_leads integer not null default 0,
  used_leads integer not null default 0,
  created_at timestamptz not null default now(),
  unique (artisan_id, month)
);

create index if not exists quotas_artisan_idx on public.quotas (artisan_id);

-- ----------------------------------------------------------------------------
-- 4. CHANTIERS (projets gérés par un artisan)
-- ----------------------------------------------------------------------------
create table if not exists public.chantiers (
  id uuid primary key default gen_random_uuid(),
  artisan_id uuid not null references public.profiles (id) on delete cascade,
  lead_id uuid references public.leads (id) on delete set null,
  title text,
  client_name text,
  status text not null default 'prospect'
    check (status in ('prospect', 'devis', 'planifie', 'en_cours', 'termine', 'facture')),
  amount numeric,
  address text,
  city text,
  start_date date,
  end_date date,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists chantiers_artisan_idx on public.chantiers (artisan_id);

-- ----------------------------------------------------------------------------
-- 5. DEVIS (devis émis par un artisan)
-- ----------------------------------------------------------------------------
create table if not exists public.devis (
  id uuid primary key default gen_random_uuid(),
  artisan_id uuid not null references public.profiles (id) on delete cascade,
  lead_id uuid references public.leads (id) on delete set null,
  chantier_id uuid references public.chantiers (id) on delete set null,
  reference text,
  amount numeric,
  status text not null default 'brouillon'
    check (status in ('brouillon', 'envoye', 'accepte', 'refuse')),
  valid_until date,
  created_at timestamptz not null default now()
);

create index if not exists devis_artisan_idx on public.devis (artisan_id);

-- ----------------------------------------------------------------------------
-- 6. FONCTIONS D'AIDE (rôles)
-- ----------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean language sql stable security definer as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.is_artisan()
returns boolean language sql stable security definer as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'artisan'
  );
$$;

-- ----------------------------------------------------------------------------
-- 7. ASSIGNATION D'UN LEAD (incrémente le quota du mois)
-- ----------------------------------------------------------------------------
create or replace function public.assign_lead_to_artisan(p_lead_id uuid, p_artisan_id uuid)
returns void language plpgsql security definer as $$
declare
  v_month date := date_trunc('month', now())::date;
begin
  -- Vérifier que l'appelant est admin
  if not public.is_admin() then
    raise exception 'Accès refusé : rôle admin requis';
  end if;

  -- Si le lead était déjà assigné à un autre artisan, décrémenter son quota
  update public.leads
    set assigned_artisan = p_artisan_id, assigned_at = now(), status = 'contacte'
    where id = p_lead_id;

  -- Incrémenter le quota de l'artisan (création si absent)
  insert into public.quotas (artisan_id, month, max_leads, used_leads)
  values (p_artisan_id, v_month, 0, 1)
  on conflict (artisan_id, month)
  do update set used_leads = public.quotas.used_leads + 1;
end;
$$;

-- ----------------------------------------------------------------------------
-- 8. RLS (Row Level Security)
-- ----------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.leads enable row level security;
alter table public.quotas enable row level security;
alter table public.chantiers enable row level security;
alter table public.devis enable row level security;

-- PROFILES
drop policy if exists "profiles_read_self" on public.profiles;
create policy "profiles_read_self" on public.profiles
  for select using (auth.uid() = id or public.is_admin());

drop policy if exists "profiles_update_self" on public.profiles;
create policy "profiles_update_self" on public.profiles
  for update using (auth.uid() = id or public.is_admin());

drop policy if exists "profiles_admin_all" on public.profiles;
create policy "profiles_admin_all" on public.profiles
  for all using (public.is_admin()) with check (public.is_admin());

-- LEADS
-- Le public (anon) peut créer un lead
drop policy if exists "leads_insert_public" on public.leads;
create policy "leads_insert_public" on public.leads
  for insert with check (true);

-- L'admin lit/modifie tout
drop policy if exists "leads_admin_all" on public.leads;
create policy "leads_admin_all" on public.leads
  for all using (public.is_admin()) with check (public.is_admin());

-- L'artisan lit/modifie ses leads assignés
drop policy if exists "leads_artisan_select" on public.leads;
create policy "leads_artisan_select" on public.leads
  for select using (assigned_artisan = auth.uid());

drop policy if exists "leads_artisan_update" on public.leads;
create policy "leads_artisan_update" on public.leads
  for update using (assigned_artisan = auth.uid());

-- QUOTAS
drop policy if exists "quotas_admin_all" on public.quotas;
create policy "quotas_admin_all" on public.quotas
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "quotas_artisan_read" on public.quotas;
create policy "quotas_artisan_read" on public.quotas
  for select using (artisan_id = auth.uid());

-- CHANTIERS
drop policy if exists "chantiers_admin_all" on public.chantiers;
create policy "chantiers_admin_all" on public.chantiers
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "chantiers_artisan_all" on public.chantiers;
create policy "chantiers_artisan_all" on public.chantiers
  for all using (artisan_id = auth.uid()) with check (artisan_id = auth.uid());

-- DEVIS
drop policy if exists "devis_admin_all" on public.devis;
create policy "devis_admin_all" on public.devis
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "devis_artisan_all" on public.devis;
create policy "devis_artisan_all" on public.devis
  for all using (artisan_id = auth.uid()) with check (artisan_id = auth.uid());

-- ----------------------------------------------------------------------------
-- 9. TRIGGER : création automatique du profil à l'inscription
-- ----------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    coalesce(new.raw_user_meta_data ->> 'role', 'artisan')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ----------------------------------------------------------------------------
-- 10. GRANTS
-- ----------------------------------------------------------------------------
grant usage on schema public to anon, authenticated;
grant select on public.profiles to authenticated;
grant insert, update on public.profiles to authenticated;
grant insert on public.leads to anon, authenticated;
grant select, update on public.leads to authenticated;
grant select, insert, update, delete on public.quotas to authenticated;
grant select, insert, update, delete on public.chantiers to authenticated;
grant select, insert, update, delete on public.devis to authenticated;
