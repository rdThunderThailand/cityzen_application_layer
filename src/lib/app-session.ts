import { SignJWT, jwtVerify } from "jose";
import type { CityzenRole } from "./roles";

const COOKIE = "cityzen_session";
const secret = () => new TextEncoder().encode(process.env.APP_SESSION_SECRET!);

export type AppSessionClaims = {
  sub: string; email: string; tenant_id: string; role: CityzenRole; app_name?: string;
  // Thunder platform super_admin — bypasses the /organic/<role> prefix guard (see proxy.ts).
  isSuperAdmin?: boolean;
  // Note: profile/memberships snapshot removed from the cookie (Phase 2) — never read by any
  // consumer; display data now lives in the Directory Cache (user_directory_cache).
};

export async function signAppSession(claims: AppSessionClaims): Promise<string> {
  return new SignJWT(claims as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("8h").sign(secret());
}
export async function verifyAppSession(token: string): Promise<AppSessionClaims | null> {
  try { const { payload } = await jwtVerify(token, secret()); return payload as unknown as AppSessionClaims; }
  catch { return null; }
}
// Single source of truth for the session cookie's security attributes.
// Accepts either NextResponse.cookies (route handlers) or cookies() from
// next/headers (Server Actions) — both expose the same .set(name, value, options) shape.
type CookieStore = { set(name: string, value: string, options?: Record<string, unknown>): void };

export function setAppSessionCookie(store: CookieStore, value: string): void {
  store.set(COOKIE, value, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 8 * 60 * 60, // 8 hours
    secure: process.env.NODE_ENV === "production",
  });
}

// --- Dev-only auth bypass -------------------------------------------------
// Skip login and enter as a mock Thunder super_admin (god mode → every page).
// Toggle with DEV_AUTH_BYPASS=true. Double-guarded on NODE_ENV so a production
// build can NEVER honor it, even if the env var leaks in.
export const DEV_BYPASS_ENABLED =
  process.env.NODE_ENV !== "production" && process.env.DEV_AUTH_BYPASS === "true";

export function devBypassClaims(): AppSessionClaims {
  return {
    sub: "dev-superadmin",
    email: "dev@cityzen.local",
    tenant_id: "dev-tenant",
    role: "owner", // any real role; isSuperAdmin bypasses the prefix guard anyway
    isSuperAdmin: true,
    app_name: "organic",
  };
}

export { COOKIE as APP_SESSION_COOKIE };
