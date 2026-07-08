import { NextResponse, type NextRequest } from "next/server";
import {
  verifyAppSession,
  APP_SESSION_COOKIE,
  DEV_BYPASS_ENABLED,
  devBypassClaims,
} from "./lib/app-session";
import { type CityzenRole, resolveCityzenRoleFromCodes } from "./lib/roles";
import { checkMembershipLiveness } from "./lib/directory-cache";

// Reachable without a cityzen_session (login page + the two exchange routes + the dead end).
const PUBLIC_PATHS = ["/login", "/auth/launch", "/auth/login", "/no-access"];

// Each role may only enter its own /organic subtree.
const ROLE_PREFIX: Record<CityzenRole, string> = {
  owner: "/organic/owner",
  executive_viewer: "/organic/executive",
  operator: "/organic/operator",
};

// Auth is gated solely on cityzen_session (JWT). Identity/credentials live in Thunder;
// cityzen no longer runs a Supabase auth client — see /auth/login (Thunder gateway).
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublic = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  const sessionCookie = request.cookies.get(APP_SESSION_COOKIE)?.value;
  const claims = DEV_BYPASS_ENABLED
    ? devBypassClaims()
    : sessionCookie
      ? await verifyAppSession(sessionCookie)
      : null;

  if (!claims) {
    if (isPublic) return NextResponse.next();
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Sub-app guard. super_admin (god mode) and the dev bypass skip both liveness and prefix checks.
  const isGuardedApp = pathname.startsWith("/organic/");
  if (claims.isSuperAdmin || DEV_BYPASS_ENABLED || !isGuardedApp) {
    return NextResponse.next();
  }

  // Liveness check (ADR 0004): the live cache row is the authorization state, not the 8h JWT.
  // Inert until the directory DB is plugged in (checkMembershipLiveness fail-opens). When live:
  // status !== 'active' → revoked/suspended, and role resolves fresh from role_codes so a
  // role change takes effect immediately. Falls back to the JWT role when the cache has no row.
  const liveness = await checkMembershipLiveness(claims.sub, claims.tenant_id);
  if (!liveness.allow) {
    const url = request.nextUrl.clone();
    url.pathname = "/no-access";
    url.searchParams.set("reason", "revoked");
    return NextResponse.redirect(url);
  }
  const effectiveRole = (liveness.roleCodes && resolveCityzenRoleFromCodes(liveness.roleCodes)) || claims.role;

  // Prefix guard — each role may only enter its own /organic subtree.
  const allowedPrefix = ROLE_PREFIX[effectiveRole];
  if (!pathname.startsWith(allowedPrefix)) {
    const url = request.nextUrl.clone();
    url.pathname = "/no-access";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
