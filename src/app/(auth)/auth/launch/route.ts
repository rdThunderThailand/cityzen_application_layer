import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { signAppSession, setAppSessionCookie } from "@/lib/app-session";
import { getMe, getMyMemberships } from "@/lib/thunder";
import { resolveCityzenRole, isThunderSuperAdmin } from "@/lib/roles";

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

  const tenantId = payload.tenant_id as string;

  let profile;
  let memberships;
  try {
    profile = await getMe(token);
    memberships = await getMyMemberships(token);
  } catch {
    // Fail closed: no memberships → no role → /no-access below.
  }
  // RBAC from membership roles, NOT payload.role (that is Thunder's platform role).
  const role = resolveCityzenRole(memberships, tenantId);
  const isSuperAdmin = isThunderSuperAdmin(memberships, tenantId);
  if (!role && !isSuperAdmin) {
    return NextResponse.redirect(new URL("/no-access", request.url));
  }

  const appSessionCookie = await signAppSession({
    sub: payload.sub as string,
    email: payload.email as string,
    tenant_id: tenantId,
    role: role ?? "owner", // super_admin has no tenant role; isSuperAdmin bypasses the prefix guard anyway
    isSuperAdmin,
    app_name: payload.app_name as string | undefined,
    profile,
    memberships,
  });

  const response = NextResponse.redirect(new URL("/", request.url));
  setAppSessionCookie(response.cookies, appSessionCookie);
  return response;
}
