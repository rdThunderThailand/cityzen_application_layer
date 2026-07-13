import { createClient } from "@supabase/supabase-js";
import { getTenantOrganizations, type ThunderMe, type ThunderMembership, type ThunderOrg } from "./thunder";
import type { Database } from "@/types/database.types";

// Directory Cache: local identity mirror of Thunder (user/tenant/membership) so cityzen
// doesn't cross-call Thunder every request and can revoke near-real-time (ADR 0001/0004).
//
// Config seam (build-now-plug-link-later): the cache lives in its own DB. Until
// CITYZEN_DIRECTORY_DB_URL/KEY are set, every op below is a no-op — auth + webhook flows
// keep working unchanged. Plug the env in later → cache turns on, zero code change.
// Tables live in the `core` schema (not public); service-role key bypasses RLS.
const makeDirectoryClient = (url: string, key: string) =>
  createClient<Database, "core">(url, key, { auth: { persistSession: false }, db: { schema: "core" } });

let cached: ReturnType<typeof makeDirectoryClient> | null | undefined;
function directoryDb(): ReturnType<typeof makeDirectoryClient> | null {
  if (cached !== undefined) return cached;
  const url = process.env.CITYZEN_DIRECTORY_DB_URL;
  const key = process.env.CITYZEN_DIRECTORY_DB_KEY;
  cached = url && key ? makeDirectoryClient(url, key) : null;
  if (!cached) console.warn("[directory-cache] CITYZEN_DIRECTORY_DB_URL/KEY unset — cache ops are no-ops");
  return cached;
}

const nowIso = () => new Date().toISOString();

// Cold populate: on login/launch, mirror the freshly-fetched Thunder snapshot into cache.
// Callers MUST fire-and-forget (see cold-populate comment) — a cache write must never block sign-in.
export async function upsertDirectorySnapshot(
  profile: ThunderMe | undefined,
  memberships: ThunderMembership[] | undefined,
  accessToken?: string,
): Promise<void> {
  const db = directoryDb();
  if (!db || !profile) return;
  const synced_at = nowIso();

  const displayName = profile.display_name ?? ([profile.first_name, profile.last_name].filter(Boolean).join(" ").trim() || profile.email || profile.id);

  const { error: userError } = await db.from("user_directory_cache").upsert({
    thundercore_user_id: profile.id,
    display_name: displayName,
    ...(profile.email !== null ? { email: profile.email } : {}),
    ...(profile.avatar_url !== null ? { avatar_url: profile.avatar_url } : {}),
    synced_at,
  });
  if (userError) throw userError;

  for (const m of memberships ?? []) {
    if (m.tenants) {
      const { error: tenantError } = await db.from("tenant_directory_cache").upsert({
        thundercore_tenant_id: m.tenants.id,
        name: m.tenants.name,
        synced_at,
      });
      if (tenantError) throw tenantError;
    } else {
      const { error: tenantError } = await db.from("tenant_directory_cache").upsert({
        thundercore_tenant_id: m.tenant_id,
        name: m.tenant_id,
        synced_at,
      });
      if (tenantError) throw tenantError;
    }

    // Store raw Thunder role codes (not resolved cityzen roles) — Phase 2 liveness check
    // resolves the cityzen role fresh from these, so role changes take effect near-real-time.
    const roleCodes = m.membership_roles
      .map((mr) => mr.roles?.code)
      .filter((c): c is string => !!c);
    
    const { error: membershipError } = await db.from("membership_directory_cache").upsert({
      thundercore_user_id: profile.id,
      thundercore_tenant_id: m.tenant_id,
      status: m.status,
      role_codes: roleCodes,
      synced_at,
    });
    if (membershipError) throw membershipError;
  }
  // Org (department) backfill: /me carries no org, so fetch each tenant's department tree and
  // seed org_directory_cache. Best-effort — the endpoint is tenant-admin-gated, so non-admin
  // logins get 403 here and are skipped; those orgs seed when an admin logs in or via org.* webhook.
  // Runs after the tenant upserts above so the org→tenant FK is always satisfied.
  if (accessToken) {
    const tenantIds = Array.from(new Set((memberships ?? []).map((m) => m.tenant_id)));
    for (const tenantId of tenantIds) {
      try {
        const orgs = flattenOrgs(await getTenantOrganizations(tenantId, accessToken));
        const fetchedIds = new Set(orgs.map((org) => org.id));
        for (const org of orgs) {
          const abbrev = org.name_en ?? org.code;
          const { error } = await db.from("department_directory_cache").upsert({
            thundercore_department_id: org.id,
            thundercore_tenant_id: tenantId,
            name: org.name || org.id,
            ...(org.department_type !== null ? { department_type: org.department_type } : {}),
            ...(abbrev !== null ? { abbreviation: abbrev } : {}),
            ...(org.status !== null ? { status: org.status } : {}),
            synced_at,
          });
          if (error) throw error;
        }

        // Reconcile: Thunder hard-excludes soft-deleted depts from this list (deleted_at IS NULL
        // filter), so anything cached for this tenant but absent here was deleted upstream and
        // never got an org.deleted webhook (Thunder doesn't emit one). Drop it here to match.
        const { data: existing, error: listErr } = await db
          .from("department_directory_cache")
          .select("thundercore_department_id")
          .eq("thundercore_tenant_id", tenantId);
        if (listErr) throw listErr;
        const staleIds = (existing ?? [])
          .map((row) => row.thundercore_department_id)
          .filter((id): id is string => !!id && !fetchedIds.has(id));
        if (staleIds.length > 0) {
          const { error: delErr } = await db
            .from("department_directory_cache")
            .delete()
            .in("thundercore_department_id", staleIds);
          if (delErr) throw delErr;
        }
      } catch {
        // best-effort backfill — see comment above; never block the rest of the snapshot.
      }
    }
  }
}

const flattenOrgs = (nodes: ThunderOrg[]): ThunderOrg[] =>
  nodes.flatMap((n) => [n, ...flattenOrgs(n.children ?? [])]);

// Warm update (webhook receiver): apply a membership event to the cache without pulling
// from Thunder (ADR 0002 §Clarification — the payload is self-describing).
export async function applyMembershipEvent(claims: Record<string, unknown>): Promise<void> {
  const db = directoryDb();
  if (!db) return;

  const event = claims.event;
  const synced_at = nowIso();

  const s = (v: unknown): string | undefined => (typeof v === "string" ? v : undefined);
  const a = (v: unknown): string[] | undefined => (Array.isArray(v) ? v.filter((i): i is string => typeof i === "string") : undefined);

  if (event === "membership.revoked") {
    const userId = s(claims.user_id);
    const tenantId = s(claims.tenant_id);
    if (!userId || !tenantId) return;

    const { error } = await db.from("membership_directory_cache").upsert(
      {
        thundercore_user_id: userId,
        thundercore_tenant_id: tenantId,
        status: "suspended",
        synced_at,
      },
      { onConflict: "thundercore_user_id,thundercore_tenant_id" }
    );
    if (error) throw error;
    return;
  }

  if (event === "membership.created" || event === "membership.updated") {
    const userId = s(claims.user_id);
    const tenantId = s(claims.tenant_id);
    if (!userId || !tenantId) return;

    const status = s(claims.status);
    const roleCodes = a(claims.role_codes);
    
    if (status === undefined && roleCodes === undefined) {
      console.log(`[webhook] ${String(event)} carries no status/role_codes — skipped (awaiting payload enrichment)`);
      return;
    }

    const tenantName = s(claims.tenant_name) ?? tenantId;
    const { error: tErr } = await db.from("tenant_directory_cache").upsert({
      thundercore_tenant_id: tenantId,
      name: tenantName,
      synced_at,
    });
    if (tErr) throw tErr;

    const displayName = s(claims.display_name) ?? userId;
    const email = s(claims.email);
    const avatarUrl = s(claims.avatar_url);
    const roleLabel = s(claims.role_label);

    const { error: uErr } = await db.from("user_directory_cache").upsert({
      thundercore_user_id: userId,
      display_name: displayName,
      ...(email !== undefined ? { email } : {}),
      ...(avatarUrl !== undefined ? { avatar_url: avatarUrl } : {}),
      ...(roleLabel !== undefined ? { role_label: roleLabel } : {}),
      synced_at,
    });
    if (uErr) throw uErr;

    const { error: mErr } = await db.from("membership_directory_cache").upsert({
      thundercore_user_id: userId,
      thundercore_tenant_id: tenantId,
      ...(status !== undefined ? { status } : {}),
      ...(roleCodes !== undefined ? { role_codes: roleCodes } : {}),
      synced_at,
    });
    if (mErr) throw mErr;
    return;
  }

  if (event === "user.updated") {
    const userId = s(claims.user_id);
    if (!userId) return;

    const displayName = s(claims.display_name) ?? userId;
    const email = s(claims.email);
    const avatarUrl = s(claims.avatar_url);
    const roleLabel = s(claims.role_label);

    const { error } = await db.from("user_directory_cache").upsert({
      thundercore_user_id: userId,
      display_name: displayName,
      ...(email !== undefined ? { email } : {}),
      ...(avatarUrl !== undefined ? { avatar_url: avatarUrl } : {}),
      ...(roleLabel !== undefined ? { role_label: roleLabel } : {}),
      synced_at,
    });
    if (error) throw error;
    return;
  }

  if (event === "tenant.updated") {
    const tenantId = s(claims.tenant_id);
    if (!tenantId) return;

    const name = s(claims.name) ?? tenantId;
    const tenantType = s(claims.tenant_type);
    const code = s(claims.code);
    const status = s(claims.status);

    const { error } = await db.from("tenant_directory_cache").upsert({
      thundercore_tenant_id: tenantId,
      name,
      ...(tenantType !== undefined ? { tenant_type: tenantType } : {}),
      ...(code !== undefined ? { code } : {}),
      ...(status !== undefined ? { status } : {}),
      synced_at,
    });
    if (error) throw error;
    return;
  }

  if (event === "org.created" || event === "org.updated") {
    const orgId = s(claims.org_id);
    const tenantId = s(claims.tenant_id);
    if (!orgId || !tenantId) return;

    const { error: tErr } = await db.from("tenant_directory_cache").upsert({
      thundercore_tenant_id: tenantId,
      name: tenantId,
      synced_at,
    }, { onConflict: "thundercore_tenant_id" });
    if (tErr) throw tErr;

    const name = s(claims.name) ?? orgId;
    const orgType = s(claims.org_type);
    const abbreviation = s(claims.abbreviation);
    const status = s(claims.status);

    const { error: oErr } = await db.from("department_directory_cache").upsert({
      thundercore_department_id: orgId,
      thundercore_tenant_id: tenantId,
      name,
      ...(orgType !== undefined ? { department_type: orgType } : {}),
      ...(abbreviation !== undefined ? { abbreviation } : {}),
      ...(status !== undefined ? { status } : {}),
      synced_at,
    });
    if (oErr) throw oErr;
    return;
  }

  if (event === "org.deleted") {
    const orgId = s(claims.org_id);
    if (!orgId) return;
    const { error } = await db.from("department_directory_cache").delete().eq("thundercore_department_id", orgId);
    if (error) throw error;
    return;
  }

  console.log(`[webhook] unhandled event ${String(event)}`);
}

export type MembershipLiveness = { allow: boolean; roleCodes: string[] | null };

// Per-request authorization state (ADR 0004). Single seam so the strategy (add TTL,
// session_version, short-token) can change without touching proxy.ts.
// Fail-open: cache disabled OR row absent → allow (the JWT already proved identity; the guard
// falls back to the cookie's role). Only an explicit status !== 'active' blocks. This is what
// keeps live sessions from bricking before the DB is plugged in / before cold-populate runs.
export async function checkMembershipLiveness(
  userId: string,
  tenantId: string,
): Promise<MembershipLiveness> {
  const db = directoryDb();
  if (!db) return { allow: true, roleCodes: null };
  const { data, error } = await db
    .from("membership_directory_cache")
    .select("status, role_codes")
    .eq("thundercore_user_id", userId)
    .eq("thundercore_tenant_id", tenantId)
    .maybeSingle();
  if (error || !data) return { allow: true, roleCodes: null };
  return {
    allow: data.status === "active",
    roleCodes: Array.isArray(data.role_codes) ? data.role_codes : null,
  };
}

export type DirectoryDisplayProfile = {
  displayName: string | null;
  avatarUrl: string | null;
  tenantName: string | null;
};

// Phase 2 Part B: display data (name/avatar/tenant) now reads from the cache instead of
// the (trimmed) session cookie. Cache miss must degrade gracefully — never block render.
export async function getDirectoryDisplayProfile(
  userId: string,
  tenantId: string,
): Promise<DirectoryDisplayProfile> {
  const db = directoryDb();
  if (!db) return { displayName: null, avatarUrl: null, tenantName: null };

  const [{ data: user }, { data: tenant }] = await Promise.all([
    db.from("user_directory_cache").select("display_name, avatar_url").eq("thundercore_user_id", userId).maybeSingle(),
    db.from("tenant_directory_cache").select("name").eq("thundercore_tenant_id", tenantId).maybeSingle(),
  ]);

  return {
    displayName: user?.display_name ?? null,
    avatarUrl: user?.avatar_url ?? null,
    tenantName: tenant?.name ?? null,
  };
}

