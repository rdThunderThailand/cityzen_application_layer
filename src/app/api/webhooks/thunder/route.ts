import { jwtVerify, type JWTPayload } from "jose";
import { NextRequest } from "next/server";
import { applyMembershipEvent } from "@/lib/directory-cache";

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

  console.log(
    `[webhook] thunder event ${JSON.stringify({
      event: claims.event,
      tenant_id: claims.tenant_id,
      user_id: claims.user_id,
      occurred_at: claims.occurred_at,
    })}`,
  );

  // Warm update the Directory Cache from the event (no-op until cache DB is plugged in).
  // Awaited so a write failure returns 500 → Thunder's retry/backoff redelivers.
  try {
    await applyMembershipEvent(claims);
  } catch (e) {
    console.error("[webhook] directory cache update failed:", e);
    return new Response("cache update failed", { status: 500 });
  }

  return new Response("ok", { status: 200 });
}
