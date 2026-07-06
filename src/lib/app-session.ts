import { SignJWT, jwtVerify } from "jose";
import type { CityzenRole } from "./roles";

const COOKIE = "cityzen_session";
const secret = () => new TextEncoder().encode(process.env.APP_SESSION_SECRET!);

export type AppSessionClaims = {
  sub: string; email: string; tenant_id: string; role: CityzenRole; app_name?: string;
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
export { COOKIE as APP_SESSION_COOKIE };
