import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAppSession, APP_SESSION_COOKIE, DEV_BYPASS_ENABLED, devBypassClaims } from "@/lib/app-session";
import { ROLE_HOME } from "@/lib/roles";

// "/" sends the signed-in user to the CityZen overview hub.
// proxy.ts already redirects here to /login when there is no cityzen_session; the
// check below is the fail-closed backstop.
export default async function RootPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(APP_SESSION_COOKIE)?.value;
  const claims = DEV_BYPASS_ENABLED ? devBypassClaims() : token ? await verifyAppSession(token) : null;
  if (!claims) redirect("/login");
  redirect(ROLE_HOME[claims.role]);
}
