import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  APP_SESSION_COOKIE,
  DEV_BYPASS_ENABLED,
  devBypassClaims,
  verifyAppSession,
  type AppSessionClaims,
} from "./app-session";
import { getDirectoryDisplayProfile } from "./directory-cache";
import type { CityzenRole } from "./roles";
import { executiveUser, managerUser, operatorUser, type UserProfile } from "@/components/global/mockUserData";

const ROLE_LABEL: Record<CityzenRole, string> = {
  manager: "ผู้จัดการ",
  executive_viewer: "ผู้บริหาร",
  operator: "เจ้าหน้าที่ปฏิบัติการ",
};

// dev_bypass shows the mock matching the *claimed* role, not always executiveUser —
// keeps header/sidebar consistent with whichever /resource-intelligence/<role> subtree is open.
const DEV_MOCK_BY_ROLE: Record<CityzenRole, UserProfile> = {
  manager: managerUser,
  executive_viewer: executiveUser,
  operator: operatorUser,
};

// Single source for "who is signed in + what do we show for them" across every
// resource-intelligence layout/page. Redirects to /login when there's no valid session
// (proxy.ts already guards this in practice — this is the belt-and-suspenders case).
//
// devMockRole: dev_bypass's claims.role is a fixed "manager" test identity (it only exists to
// satisfy the type — isSuperAdmin is what actually bypasses the route guard), so it can't tell
// us which mock to show. Callers that know their own role context (an executive-only page) pass
// it explicitly; the shared layout (spans all 3 roles) omits it and leaves `user` undefined so
// Header's pathname-based fallback picks the right mock instead.
// Callers that always need a defined user (e.g. a role-specific page) should do
// `user ?? someMockUser` themselves rather than relying on devMockRole to prove it statically.
  export async function getWorkspaceUser(
  devMockRole?: CityzenRole
): Promise<{ claims: AppSessionClaims; user: UserProfile | undefined }> {
  if (DEV_BYPASS_ENABLED) {
    const claims = devBypassClaims();
    return { claims, user: devMockRole ? DEV_MOCK_BY_ROLE[devMockRole] : undefined };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(APP_SESSION_COOKIE)?.value;
  const claims = token ? await verifyAppSession(token) : null;
  if (!claims) redirect("/login");

  const profile = await getDirectoryDisplayProfile(claims.sub, claims.tenant_id);
  const user: UserProfile = {
    displayName: profile.displayName ?? claims.email,
    role: ROLE_LABEL[claims.role],
    profileImg: profile.avatarUrl ?? "/logo.png",
    companyName: profile.tenantName ?? "Smart CityZen",
    companyLogo: "/logo.png",
  };
  return { claims, user };
}
