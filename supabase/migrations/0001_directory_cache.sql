-- CityZen Directory Cache — local identity mirror of Thunder (ADR 0001).
-- Typed columns for fields cityzen uses now; consumer widens lazily (no cross-repo coordination).
--
-- Authoritative schema: lives in the `core` schema of the cityzen directory Supabase project
-- (env CITYZEN_DIRECTORY_DB_URL/KEY). Accessed server-side with the service_role key, which
-- bypasses RLS. This file mirrors the live DB (source of truth) so a fresh project reproduces it.

create schema if not exists core;

create table if not exists core.tenant_directory_cache (
    thundercore_tenant_id uuid primary key,
    tenant_type varchar(30),
    code varchar(100),
    name varchar(255) not null,
    status varchar(30),
    synced_at timestamptz not null default now()
);

create table if not exists core.user_directory_cache (
    thundercore_user_id uuid primary key,
    display_name varchar(200) not null,
    email varchar(255),
    avatar_url text,
    role_label varchar(150),
    synced_at timestamptz not null default now()
);

create table if not exists core.department_directory_cache (
    thundercore_department_id uuid primary key,
    thundercore_tenant_id uuid not null references core.tenant_directory_cache(thundercore_tenant_id),
    department_type varchar(50),
    abbreviation varchar(50),
    name varchar(255) not null,
    status varchar(30),
    synced_at timestamptz not null default now()
);
create index if not exists idx_department_cache_tenant_id on core.department_directory_cache(thundercore_tenant_id);

create table if not exists core.membership_directory_cache (
    thundercore_user_id uuid not null references core.user_directory_cache(thundercore_user_id),
    thundercore_tenant_id uuid not null references core.tenant_directory_cache(thundercore_tenant_id),
    status varchar(30) not null default 'invited',
    role_codes text[] not null default '{}',
    synced_at timestamptz not null default now(),
    primary key (thundercore_user_id, thundercore_tenant_id),
    constraint chk_membership_cache_status check (status in ('invited', 'active', 'suspended', 'revoked'))
);
create index if not exists idx_membership_cache_user_id on core.membership_directory_cache(thundercore_user_id);
create index if not exists idx_membership_cache_tenant_id on core.membership_directory_cache(thundercore_tenant_id);
create index if not exists idx_membership_cache_status on core.membership_directory_cache(status);

-- RLS on, no policies: anon/authenticated are fully blocked; only service_role (server-side,
-- RLS-bypassing) reads/writes the cache.
alter table core.tenant_directory_cache     enable row level security;
alter table core.user_directory_cache       enable row level security;
alter table core.department_directory_cache enable row level security;
alter table core.membership_directory_cache enable row level security;

-- Grant service_role access to the cache tables (custom schema is not granted by default).
grant usage on schema core to service_role;
grant select, insert, update, delete on
    core.tenant_directory_cache,
    core.user_directory_cache,
    core.department_directory_cache,
    core.membership_directory_cache
to service_role;

-- Expose `core` to PostgREST so the supabase-js client (db.schema = 'core') can reach it.
alter role authenticator set pgrst.db_schemas = 'public, graphql_public, core';
notify pgrst, 'reload schema';
