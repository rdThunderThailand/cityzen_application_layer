import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import {
  verifyAppSession,
  APP_SESSION_COOKIE,
  DEV_BYPASS_ENABLED,
  devBypassClaims,
} from "./lib/app-session";
import type { CityzenRole } from "./lib/roles";

// Reachable without a cityzen_session (login + the two exchange routes + the dead end).
const PUBLIC_PATHS = ["/login", "/auth/launch", "/auth/session", "/no-access"];

// Each role may only enter its own /organic subtree.
const ROLE_PREFIX: Record<CityzenRole, string> = {
  owner: "/organic/owner",
  executive_viewer: "/organic/executive",
  operator: "/organic/operator",
};

export async function proxy(request: NextRequest) {
  // let supabaseResponse = NextResponse.next({
  //   request,
  // });

  // const supabase = createServerClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  //   {
  //     cookies: {
  //       getAll() {
  //         return request.cookies.getAll();
  //       },
  //       setAll(cookiesToSet) {
  //         cookiesToSet.forEach(({ name, value }) =>
  //           request.cookies.set(name, value)
  //         );
  //         supabaseResponse = NextResponse.next({
  //           request,
  //         });
  //         cookiesToSet.forEach(({ name, value, options }) =>
  //           supabaseResponse.cookies.set(name, value, options)
  //         );
  //       },
  //     },
  //   }
  // );

  // Keep the Supabase session cookie fresh (the /auth/session exchange needs a live token).
  await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isPublic = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  // Authorization is gated on cityzen_session — a bare Supabase session is NOT enough.
  const sessionCookie = request.cookies.get(APP_SESSION_COOKIE)?.value;
  const claims = DEV_BYPASS_ENABLED
    ? devBypassClaims()
    : sessionCookie
      ? await verifyAppSession(sessionCookie)
      : null;

  if (!claims) {
    if (isPublic) return supabaseResponse;
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

  // return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
