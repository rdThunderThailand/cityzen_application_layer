import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getMe, getMyMemberships, ThunderMe, ThunderMembership } from "@/lib/thunder";
import { verifyAppSession, APP_SESSION_COOKIE } from "@/lib/app-session";

function ProfileCard({ profile, source }: { profile: Partial<ThunderMe>; source: string }) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">User Profile</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{source}</p>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="px-4 py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <dd className="mt-1 text-sm text-gray-900">{profile.display_name || "N/A"}</dd>
          </div>
          <div className="px-4 py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-sm text-gray-900">{profile.email || "N/A"}</dd>
          </div>
          <div className="px-4 py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Role</dt>
            <dd className="mt-1 text-sm text-gray-900">{profile.role || "N/A"}</dd>
          </div>
          <div className="px-4 py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Global Code</dt>
            <dd className="mt-1 text-sm text-gray-900">{profile.global_user_code || "N/A"}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function MembershipList({ memberships }: { memberships: ThunderMembership[] }) {
  if (!memberships || memberships.length === 0) {
    return <p className="text-sm text-gray-500">No memberships found.</p>;
  }

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow mt-6">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Memberships</h3>
      </div>
      <ul role="list" className="divide-y divide-gray-200">
        {memberships.map((m) => (
          <li key={m.id} className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-indigo-600 truncate">{m.tenants?.name || "Unknown Tenant"}</p>
              <div className="ml-2 flex flex-shrink-0">
                <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                  {m.status}
                </p>
              </div>
            </div>
            <div className="mt-2 sm:flex sm:justify-between">
              <div className="sm:flex">
                <p className="flex items-center text-sm text-gray-500">
                  Roles: {m.membership_roles.map((mr) => mr.roles?.name).filter(Boolean).join(", ") || "None"}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function HomeClient() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let profile: Partial<ThunderMe> | null = null;
  let memberships: ThunderMembership[] = [];
  let source = "";

  if (user) {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    if (token) {
      try {
        [profile, memberships] = await Promise.all([getMe(token), getMyMemberships(token)]);
        source = "Signed in (live)";
      } catch (error) {
        console.error("Failed to fetch live data from Thunder Core", error);
      }
    }
  } else {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(APP_SESSION_COOKIE)?.value;
    if (sessionCookie) {
      const claims = await verifyAppSession(sessionCookie);
      if (claims) {
        profile = (claims.profile as Partial<ThunderMe>) || null;
        memberships = (claims.memberships as ThunderMembership[]) || [];
        source = "Launched from Thunder Core (snapshot)";
      }
    }
  }

  if (!profile && !source) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <p className="text-gray-700">Not authenticated properly.</p>
        <Link href="/login" className="text-indigo-600 hover:text-indigo-500">Go to login</Link>
      </div>
    );
  }

  const signOut = async () => {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Dashboard</h1>
          <form action={signOut}>
            <button type="submit" className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Sign out
            </button>
          </form>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-8">
          {profile && <ProfileCard profile={profile} source={source} />}
          <MembershipList memberships={memberships} />
        </div>
      </main>
    </div>
  );
}
