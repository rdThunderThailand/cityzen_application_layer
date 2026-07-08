-- CityZen Directory Cache — local identity mirror of Thunder (ADR 0001).
-- Typed columns for fields cityzen uses now; consumer widens lazily (no cross-repo coordination).
-- Lives in cityzen's OWN directory DB (config seam), NOT the shared Thunder auth project.

create table if not exists cityzen_user_directory_cache (
  user_id      uuid primary key,
  email        text,
  display_name text,
  avatar_url   text,
  synced_at    timestamptz not null default now()
);

create table if not exists cityzen_tenant_directory_cache (
  tenant_id text primary key,
  name      text,
  synced_at timestamptz not null default now()
);

-- Reserved for a future writer — /me + /me/memberships carry no org field yet (see directory-cache.ts).
create table if not exists cityzen_org_directory_cache (
  org_id    uuid primary key,
  name      text,
  synced_at timestamptz not null default now()
);

create table if not exists cityzen_membership_directory_cache (
  user_id    uuid not null,
  tenant_id  text not null,
  status     text not null,               -- Thunder membership status: invited | active | suspended | ...
  role_codes text[] not null default '{}', -- raw Thunder role codes; cityzen role resolved fresh (Phase 2 liveness)
  synced_at  timestamptz not null default now(),
  primary key (user_id, tenant_id)
);
