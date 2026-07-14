import { getWorkspaceUser } from "@/lib/workspace-user";
import { getExecutiveDailyBriefKpis } from "@/lib/executive-daily-brief";
import DailyBriefClient from "@/features/resource-intelligence/executive/daily-brief/DailyBriefClient";
import { executiveUser } from "@/components/global/mockUserData";

export default async function DailyBriefPage() {
  const { claims, user } = await getWorkspaceUser("executive_viewer");
  const kpis = await getExecutiveDailyBriefKpis(claims.tenant_id);
  return <DailyBriefClient defaultUser={user ?? executiveUser} kpis={kpis} />;
}
