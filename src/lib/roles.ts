import type { ThunderMembership } from "./thunder";

// The 3 CityZen application roles (RBAC), distinct from Thunder platform roles.
export const CITYZEN_ROLES = ["owner", "executive_viewer", "operator"] as const;
export type CityzenRole = (typeof CITYZEN_ROLES)[number];

// Priority when one membership carries several roles: owner > executive_viewer > operator.
const PRIORITY: readonly CityzenRole[] = CITYZEN_ROLES;

// Each role's home page — "/" dispatches here (super_admin's role claim falls back to owner).
export const ROLE_HOME: Record<CityzenRole, string> = {
  owner: "/organic/owner/storyboard",
  executive_viewer: "/organic/executive/daily-brief",
  operator: "/organic/operator/tasks",
};

// Maps Thunder role codes → CityZen roles.
// Thunder is inconsistent about the org-admin code: seed uses `admin_company`,
// the UserRole type uses `company_admin` — accept both.
// super_admin / viewer_auditor have no CityZen role → null (→ /no-access).
function toCityzenRole(code: string): CityzenRole | null {
  if (code === "admin_company" || code === "company_admin") return "owner";
  if (code === "executive_viewer") return "executive_viewer";
  if (code.startsWith("operator")) return "operator"; // operator, operator_supervisor, …
  return null;
}

// RBAC source of truth = membership_roles[].roles.code for the launched tenant.
// NEVER the launch token's platform `role` claim (that is Thunder's platform role).
// Thunder's /me/memberships already filters status to invited|active, so no status check here.
export function resolveCityzenRole(
  memberships: ThunderMembership[] | undefined,
  tenantId: string
): CityzenRole | null {
  const membership = memberships?.find((m) => m.tenant_id === tenantId);
  if (!membership) return null;
  const codes = new Set(
    membership.membership_roles
      .map((mr) => mr.roles?.code)
      .filter((c): c is string => !!c)
      .map(toCityzenRole)
      .filter((r): r is CityzenRole => r !== null)
  );
  return PRIORITY.find((r) => codes.has(r)) ?? null;
}

// Thunder platform super_admin — bypasses CityZen RBAC entirely (god mode),
// checked separately from resolveCityzenRole (that function only knows tenant roles).
export function isThunderSuperAdmin(
  memberships: ThunderMembership[] | undefined,
  tenantId: string
): boolean {
  const membership = memberships?.find((m) => m.tenant_id === tenantId);
  if (!membership) return false;
  return membership.membership_roles.some((mr) => mr.roles?.code === "super_admin");
}
