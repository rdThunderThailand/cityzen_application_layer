import { cookies } from "next/headers";
import { verifyAppSession, APP_SESSION_COOKIE, DEV_BYPASS_ENABLED, devBypassClaims } from "@/lib/app-session";
import { getExecutiveDailyBriefKpis } from "@/lib/executive-daily-brief";
import DailyBriefClient from "@/features/resource-intelligence/executive/daily-brief/DailyBriefClient";

export default async function DailyBriefPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(APP_SESSION_COOKIE)?.value;
  const claims = DEV_BYPASS_ENABLED ? devBypassClaims() : token ? await verifyAppSession(token) : null;
  const kpis = claims ? await getExecutiveDailyBriefKpis(claims.tenant_id) : null;
  return <DailyBriefClient kpis={kpis} />;
}