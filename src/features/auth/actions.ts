"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { loginWithPassword, getMe, getMyMemberships } from "@/lib/thunder";
import { resolveCityzenRole, isThunderSuperAdmin } from "@/lib/roles";
import { signAppSession, setAppSessionCookie, APP_SESSION_COOKIE } from "@/lib/app-session";
import { upsertDirectorySnapshot } from "@/lib/directory-cache";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Direct-login exchange: verify credentials via Thunder (identity gateway), resolve RBAC
// once, mint cityzen_session. Converges with /auth/launch. Never leaks Thunder/Supabase errors.
export async function loginAction(
  email: string,
  password: string
): Promise<{ error: string } | undefined> {
  const parsed = loginSchema.safeParse({ email, password });
  if (!parsed.success) {
    return { error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" };
  }

  let session;
  try {
    session = await loginWithPassword(parsed.data.email, parsed.data.password);
  } catch (e) {
    // Thunder unreachable / misconfigured (e.g. THUNDER_APP_API_KEY unset) — log the
    // real cause server-side, never surface the raw error to the client.
    console.error("[loginAction] thunder call failed:", e);
    return { error: "เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่ภายหลัง" };
  }
  if (!session) {
    return { error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" };
  }

  let profile;
  let memberships;
  try {
    profile = await getMe(session.access_token);
    console.log(profile)
    memberships = await getMyMemberships(session.access_token);
    console.log(memberships)
  } catch {
    // Fail closed: no memberships → no role → /no-access below.
  }

  // Direct login carries no tenant hint — use the primary membership (fallback: first).
  const primary = memberships?.find((m) => m.is_primary) ?? memberships?.[0];
  const tenantId = primary?.tenant_id;
  const role = tenantId ? resolveCityzenRole(memberships, tenantId) : null;
  const isSuperAdmin = tenantId ? isThunderSuperAdmin(memberships, tenantId) : false;

  if (!tenantId || (!role && !isSuperAdmin)) {
    redirect("/no-access");
  }

  // Cold populate the Directory Cache. Fire-and-forget: a cache write must never block sign-in
  // (no-op until the cache DB is plugged in). No rollback — next login re-populates.
  void upsertDirectorySnapshot(profile, memberships).catch((e) =>
    console.error("[loginAction] directory cache populate failed:", e),
  );

  const cookie = await signAppSession({
    sub: session.user_id ?? "",
    email: parsed.data.email,
    tenant_id: tenantId,
    role: role ?? "owner", // super_admin has no tenant role; isSuperAdmin bypasses the prefix guard anyway
    isSuperAdmin,
    profile,
    memberships,
  });

  const cookieStore = await cookies();
  setAppSessionCookie(cookieStore, cookie);
  redirect("/");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(APP_SESSION_COOKIE);
  redirect("/login");
}
