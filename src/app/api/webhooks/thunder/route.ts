import { jwtVerify, type JWTPayload } from "jose";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const secret = process.env.WEBHOOK_SECRET;
  if (!secret) {
    console.error("[webhook] WEBHOOK_SECRET not configured");
    return new Response("Server misconfigured", { status: 500 });
  }

  const auth = req.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return new Response("Missing bearer token", { status: 401 });

  let claims: JWTPayload;
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    claims = payload;
  } catch {
    return new Response("Invalid signature", { status: 401 });
  }

  // Stub: log only. NO database write — no cache table exists yet (Phase 0).
  // Interpolated into one string so dev loggers that drop object args stay inspectable.
  console.log(
    `[webhook] thunder event ${JSON.stringify({
      event: claims.event,
      tenant_id: claims.tenant_id,
      user_id: claims.user_id,
      occurred_at: claims.occurred_at,
    })}`,
  );

  return new Response("ok", { status: 200 });
}
