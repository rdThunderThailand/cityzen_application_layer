import { NextResponse, type NextRequest } from "next/server";
import {
  verifyAppSession,
  APP_SESSION_COOKIE,
  DEV_BYPASS_ENABLED,
  devBypassClaims,
} from "./lib/app-session";
import type { CityzenRole } from "./lib/roles";

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

  // Role/prefix guard for the sub-app area — Thunder super_admin bypasses it (god mode).
  const allowedPrefix = ROLE_PREFIX[claims.role];
  if (
    !claims.isSuperAdmin &&
    pathname.startsWith("/organic/") &&
    !pathname.startsWith(allowedPrefix)
  ) {
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
