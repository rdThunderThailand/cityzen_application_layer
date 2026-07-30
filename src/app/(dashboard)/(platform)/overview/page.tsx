// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import { verifyAppSession, APP_SESSION_COOKIE, DEV_BYPASS_ENABLED, devBypassClaims } from "@/lib/app-session";
// import OverviewClient from "@/features/overview/OverviewClient";

// export default async function OverviewPage() {
//   const cookieStore = await cookies();
//   const token = cookieStore.get(APP_SESSION_COOKIE)?.value;
//   const claims = DEV_BYPASS_ENABLED ? devBypassClaims() : token ? await verifyAppSession(token) : null;
//   if (!claims) redirect("/login");
//   return <OverviewClient role={claims.role} tenantId={claims.tenant_id} email={claims.email} />;
// }

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAppSession, APP_SESSION_COOKIE, DEV_BYPASS_ENABLED, devBypassClaims } from "@/lib/app-session";
import { roleHome } from "@/lib/roles";

export default async function OrganicLanding() {
  const cookieStore = await cookies();
  const token = cookieStore.get(APP_SESSION_COOKIE)?.value;
  const claims = DEV_BYPASS_ENABLED ? devBypassClaims() : token ? await verifyAppSession(token) : null;
  if (!claims) redirect("/login");
  redirect(roleHome(claims.role, claims.operatorPersona));
}
