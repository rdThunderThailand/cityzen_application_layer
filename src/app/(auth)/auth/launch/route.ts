import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { signAppSession, APP_SESSION_COOKIE } from "@/lib/app-session";
import { getMe, getMyMemberships } from "@/lib/thunder";
import { resolveCityzenRole } from "@/lib/roles";

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
  if (!role) {
    return NextResponse.redirect(new URL("/no-access", request.url));
  }

  const appSessionCookie = await signAppSession({
    sub: payload.sub as string,
    email: payload.email as string,
    tenant_id: tenantId,
    role,
    app_name: payload.app_name as string | undefined,
    profile,
    memberships,
  });

  const redirectUrl = new URL("/", request.url);
  const response = NextResponse.redirect(redirectUrl);
  
  response.cookies.set(APP_SESSION_COOKIE, appSessionCookie, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 8 * 60 * 60, // 8 hours in seconds
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
