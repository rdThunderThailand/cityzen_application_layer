import { SignJWT, jwtVerify } from "jose";
import type { NextResponse } from "next/server";
import type { CityzenRole } from "./roles";

const COOKIE = "cityzen_session";
const secret = () => new TextEncoder().encode(process.env.APP_SESSION_SECRET!);

export type AppSessionClaims = {
  sub: string; email: string; tenant_id: string; role: CityzenRole; app_name?: string;
  // Thunder platform super_admin — bypasses the /organic/<role> prefix guard (see proxy.ts).
  isSuperAdmin?: boolean;
  // trimmed Thunder snapshot captured at launch (launch token is 1-min, no refresh)
  profile?: unknown; memberships?: unknown;
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
export function setAppSessionCookie(res: NextResponse, value: string): void {
  res.cookies.set(COOKIE, value, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 8 * 60 * 60, // 8 hours
    secure: process.env.NODE_ENV === "production",
  });
}

export { COOKIE as APP_SESSION_COOKIE };
