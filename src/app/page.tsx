import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAppSession, APP_SESSION_COOKIE } from "@/lib/app-session";
import { ROLE_HOME } from "@/lib/roles";

// "/" dispatches the signed-in user to their role's home (Thunder-style role branch).
// proxy.ts already redirects here to /login when there is no cityzen_session; the
// check below is the fail-closed backstop.
export default async function RootPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(APP_SESSION_COOKIE)?.value;
  const claims = token ? await verifyAppSession(token) : null;
  if (!claims) redirect("/login");
  redirect(ROLE_HOME[claims.role]);
}
