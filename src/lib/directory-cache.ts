import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { ThunderMe, ThunderMembership } from "./thunder";

// Directory Cache: local identity mirror of Thunder (user/tenant/membership) so cityzen
// doesn't cross-call Thunder every request and can revoke near-real-time (ADR 0001/0004).
//
// Config seam (build-now-plug-link-later): the cache lives in its own DB. Until
// CITYZEN_DIRECTORY_DB_URL/KEY are set, every op below is a no-op — auth + webhook flows
// keep working unchanged. Plug the env in later → cache turns on, zero code change.
let cached: SupabaseClient | null | undefined;
function directoryDb(): SupabaseClient | null {
  if (cached !== undefined) return cached;
  const url = process.env.CITYZEN_DIRECTORY_DB_URL;
  const key = process.env.CITYZEN_DIRECTORY_DB_KEY;
  cached = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
  if (!cached) console.warn("[directory-cache] CITYZEN_DIRECTORY_DB_URL/KEY unset — cache ops are no-ops");
  return cached;
}

const nowIso = () => new Date().toISOString();

// Cold populate: on login/launch, mirror the freshly-fetched Thunder snapshot into cache.
// Callers MUST fire-and-forget (see cold-populate comment) — a cache write must never block sign-in.
export async function upsertDirectorySnapshot(
  profile: ThunderMe | undefined,
  memberships: ThunderMembership[] | undefined,
): Promise<void> {
  const db = directoryDb();
  if (!db || !profile) return;
  const synced_at = nowIso();

  await db.from("cityzen_user_directory_cache").upsert({
    user_id: profile.id,
    email: profile.email,
    display_name: profile.display_name,
    avatar_url: profile.avatar_url,
    synced_at,
  });

  for (const m of memberships ?? []) {
    if (m.tenants) {
      await db.from("cityzen_tenant_directory_cache").upsert({
        tenant_id: m.tenants.id,
        name: m.tenants.name,
        synced_at,
      });
    }
    // Store raw Thunder role codes (not resolved cityzen roles) — Phase 2 liveness check
    // resolves the cityzen role fresh from these, so role changes take effect near-real-time.
    const roleCodes = m.membership_roles
      .map((mr) => mr.roles?.code)
      .filter((c): c is string => !!c);
    await db.from("cityzen_membership_directory_cache").upsert({
      user_id: profile.id,
      tenant_id: m.tenant_id,
      status: m.status,
      role_codes: roleCodes,
      synced_at,
    });
  }
  // ponytail: no cityzen_org_directory_cache write — /me + /me/memberships carry no org
  // field yet. Table exists (migration); wire a writer when Thunder's snapshot includes org.
}

// Warm update (webhook receiver): apply a membership event to the cache without pulling
// from Thunder (ADR 0002 §Clarification — the payload is self-describing).
//   membership.revoked  → status='suspended' (self-describing, works today)
//   membership.created/updated → upsert status+role_codes FROM the payload
//     (needs Thunder-side payload enrichment; until then those claims are absent → skip)
export async function applyMembershipEvent(claims: Record<string, unknown>): Promise<void> {
  const db = directoryDb();
  if (!db) return;
  const userId = typeof claims.user_id === "string" ? claims.user_id : null;
  const tenantId = typeof claims.tenant_id === "string" ? claims.tenant_id : null;
  if (!userId || !tenantId) return;

  if (claims.event === "membership.revoked") {
    // Partial upsert: only status is set; role_codes keeps its existing value on conflict.
    await db.from("cityzen_membership_directory_cache").upsert({
      user_id: userId,
      tenant_id: tenantId,
      status: "suspended",
      synced_at: nowIso(),
    });
    return;
  }

  // created/updated — activate once payload enrichment lands on the Thunder side.
  const status = typeof claims.status === "string" ? claims.status : null;
  const roleCodes = Array.isArray(claims.role_codes)
    ? claims.role_codes.filter((c): c is string => typeof c === "string")
    : null;
  if (!status && !roleCodes) {
    console.log(`[webhook] ${String(claims.event)} carries no status/role_codes — skipped (awaiting payload enrichment)`);
    return;
  }
  await db.from("cityzen_membership_directory_cache").upsert({
    user_id: userId,
    tenant_id: tenantId,
    ...(status ? { status } : {}),
    ...(roleCodes ? { role_codes: roleCodes } : {}),
    synced_at: nowIso(),
  });
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
    .from("cityzen_membership_directory_cache")
    .select("status, role_codes")
    .eq("user_id", userId)
    .eq("tenant_id", tenantId)
    .maybeSingle();
  if (error || !data) return { allow: true, roleCodes: null };
  return {
    allow: data.status === "active",
    roleCodes: Array.isArray(data.role_codes) ? data.role_codes : null,
  };
}
