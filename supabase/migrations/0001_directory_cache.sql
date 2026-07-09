-- CityZen Directory Cache — local identity mirror of Thunder (ADR 0001).
-- Typed columns for fields cityzen uses now; consumer widens lazily (no cross-repo coordination).
-- Lives in cityzen's OWN directory DB (config seam), NOT the shared Thunder auth project.

create table if not exists tenant_directory_cache (
    thundercore_tenant_id uuid primary key,
    tenant_type varchar(30),
    code varchar(100),
    name varchar(255) not null,
    status varchar(30),
    synced_at timestamptz not null default now()
);

create table if not exists org_directory_cache (
    thundercore_org_id uuid primary key,
    thundercore_tenant_id uuid not null references tenant_directory_cache(thundercore_tenant_id),
    org_type varchar(50),
    abbreviation varchar(50),
    name varchar(255) not null,
    status varchar(30),
    synced_at timestamptz not null default now()
);
create index idx_org_cache_tenant_id on org_directory_cache(thundercore_tenant_id);

create table if not exists user_directory_cache (
    thundercore_user_id uuid primary key,
    display_name varchar(200) not null,
    email varchar(255),
    avatar_url text,
    role_label varchar(150),
    synced_at timestamptz not null default now()
);

create table if not exists membership_directory_cache (
    thundercore_user_id uuid not null references user_directory_cache(thundercore_user_id),
    thundercore_tenant_id uuid not null references tenant_directory_cache(thundercore_tenant_id),
    status varchar(30) not null default 'invited',
    role_codes text[] not null default '{}',
    synced_at timestamptz not null default now(),
    primary key (thundercore_user_id, thundercore_tenant_id),
    constraint chk_membership_cache_status check (status in ('invited', 'active', 'suspended', 'revoked'))
);
create index idx_membership_cache_user_id on membership_directory_cache(thundercore_user_id);
create index idx_membership_cache_tenant_id on membership_directory_cache(thundercore_tenant_id);
create index idx_membership_cache_status on membership_directory_cache(status);
