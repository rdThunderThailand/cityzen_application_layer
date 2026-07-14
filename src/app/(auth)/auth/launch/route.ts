import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { signAppSession, setAppSessionCookie } from "@/lib/app-session";
import { getMe, getMyMemberships } from "@/lib/thunder";
import { resolveCityzenRole, isThunderSuperAdmin } from "@/lib/roles";
import { upsertDirectorySnapshot } from "@/lib/directory-cache";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  let payload;
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET!),
      { algorithms: ["HS256"] }
    );
    payload = verified.payload;
  } catch {
    return NextResponse.redirect(new URL("/login?error=invalid_launch", request.url));
  }

  if (payload.aud !== "authenticated") {
    return NextResponse.redirect(new URL("/login?error=invalid_launch", request.url));
  }

  let tenantId = payload.tenant_id as string | undefined;

  let profile;
  let memberships;
  try {
    profile = await getMe(token);
    memberships = await getMyMemberships(token);
  } catch {
    // Fail closed: no memberships → no role → /no-access below.
  }

  if (!tenantId) {
    // OAuth launch token has no tenant hint — pick primary membership (same rule as loginAction).
    const primary = memberships?.find((m) => m.is_primary) ?? memberships?.[0];
    tenantId = primary?.tenant_id;
  }
  // RBAC from membership roles, NOT payload.role (that is Thunder's platform role).
  const role = resolveCityzenRole(memberships, tenantId as string);
  const isSuperAdmin = isThunderSuperAdmin(memberships, tenantId as string);
  if (!role && !isSuperAdmin) {
    return NextResponse.redirect(new URL("/no-access", request.url));
  }

  // Cold populate the Directory Cache. Fire-and-forget: a cache write must never block sign-in
  // (no-op until the cache DB is plugged in). No rollback — next login re-populates.
  void upsertDirectorySnapshot(profile, memberships, token).catch((e) =>
    console.error("[auth/launch] directory cache populate failed:", e),
  );

  const appSessionCookie = await signAppSession({
    sub: payload.sub as string,
    email: payload.email as string,
    tenant_id: tenantId as string,
    role: role ?? "manager", // super_admin has no tenant role; isSuperAdmin bypasses the prefix guard anyway
    isSuperAdmin,
    app_name: payload.app_name as string | undefined,
  });

  const response = NextResponse.redirect(new URL("/", request.url));
  setAppSessionCookie(response.cookies, appSessionCookie);
  return response;
}
