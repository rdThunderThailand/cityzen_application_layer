import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getMe, getMyMemberships } from "@/lib/thunder";
import { resolveCityzenRole, isThunderSuperAdmin } from "@/lib/roles";
import { signAppSession, setAppSessionCookie } from "@/lib/app-session";

// Direct-login entry: exchanges a Supabase session for a cityzen_session,
// converging with the /auth/launch path. RBAC resolved once, here.
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;
  if (!token || !session?.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  let profile;
  let memberships;
  try {
    profile = await getMe(token);
    memberships = await getMyMemberships(token);
  } catch {
    // Fail closed: no memberships → no role → /no-access below.
  }

  // Direct login carries no tenant hint — use the primary membership (fallback: first).
  const primary = memberships?.find((m) => m.is_primary) ?? memberships?.[0];
  const tenantId = primary?.tenant_id;
  const role = tenantId ? resolveCityzenRole(memberships, tenantId) : null;
  const isSuperAdmin = tenantId ? isThunderSuperAdmin(memberships, tenantId) : false;

  if (!tenantId || (!role && !isSuperAdmin)) {
    return NextResponse.redirect(new URL("/no-access", request.url));
  }

  const cookie = await signAppSession({
    sub: session.user.id,
    email: session.user.email ?? "",
    tenant_id: tenantId,
    role: role ?? "owner", // super_admin has no tenant role; isSuperAdmin bypasses the prefix guard anyway
    isSuperAdmin,
    profile,
    memberships,
  });

  const response = NextResponse.redirect(new URL("/", request.url));
  setAppSessionCookie(response, cookie);
  return response;
}
