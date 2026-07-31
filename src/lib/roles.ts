import type { ThunderMembership } from "./thunder";

// The 3 CityZen application roles (RBAC), distinct from Thunder platform roles.
export const CITYZEN_ROLES = ["manager", "executive_viewer", "operator"] as const;
export type CityzenRole = (typeof CITYZEN_ROLES)[number];

// Priority when one membership carries several roles: manager > executive_viewer > operator.
const PRIORITY: readonly CityzenRole[] = CITYZEN_ROLES;

// Each role's home page — "/" dispatches here (super_admin's role claim falls back to manager).
export const ROLE_HOME: Record<CityzenRole, string> = {
  manager: "/resource-intelligence/manager/daily-brief",
  executive_viewer: "/resource-intelligence/executive/daily-brief",
<<<<<<< HEAD
  // General operator info page — persona-specific pages (technician, supply-officer, …)
  // are reached by branching out from here, not by a direct login redirect.
=======
>>>>>>> technician
  operator: "/asset-intelligence/operator/main",
};

// Maps Thunder role codes → CityZen roles.
// Thunder's department-admin code is `department_admin`; older seeds used
// `admin_company` / `company_admin` — accept all three → manager.
// super_admin / viewer_auditor have no CityZen role → null (→ /no-access).
function toCityzenRole(code: string): CityzenRole | null {
  if (code === "department_admin" || code === "admin_company" || code === "company_admin")
    return "manager";
  if (code === "executive_viewer") return "executive_viewer";
  if (code.startsWith("operator")) return "operator"; // operator, operator_supervisor, …
  return null;
}

// Highest-priority CityZen role from raw Thunder role codes. Shared by auth-time resolution
// (membership snapshot) and the Phase 2 liveness check (cache row's role_codes).
export function resolveCityzenRoleFromCodes(codes: readonly string[]): CityzenRole | null {
  const cityzenRoles = new Set(
    codes.map(toCityzenRole).filter((r): r is CityzenRole => r !== null)
  );
  return PRIORITY.find((r) => cityzenRoles.has(r)) ?? null;
}

// Raw role codes for a tenant's membership — shared by RBAC resolution and persona lookup.
function membershipCodes(
  memberships: ThunderMembership[] | undefined,
  tenantId: string
): string[] {
  const membership = memberships?.find((m) => m.tenant_id === tenantId);
  if (!membership) return [];
  return membership.membership_roles
    .map((mr) => mr.roles?.code)
    .filter((c): c is string => !!c);
}

// RBAC source of truth = membership_roles[].roles.code for the launched tenant.
// NEVER the launch token's platform `role` claim (that is Thunder's platform role).
// Thunder's /me/memberships already filters status to invited|active, so no status check here.
export function resolveCityzenRole(
  memberships: ThunderMembership[] | undefined,
  tenantId: string
): CityzenRole | null {
  const codes = membershipCodes(memberships, tenantId);
  if (codes.length === 0) return null;
  return resolveCityzenRoleFromCodes(codes);
}

// Operator personas with their own landing page — home-page routing only, NOT a separate
// CityZen role: RBAC/proxy guard still treat all of these as the coarse "operator" role.
export const OPERATOR_HOME: Record<string, string> = {
  operator_procurement: "/asset-intelligence/operator/supply-officer",
  operator_technician: "/asset-intelligence/operator/technician",
};

// Most specific operator persona from raw Thunder codes, for home-page routing only.
// Null when none of the codes match a known persona (falls back to ROLE_HOME.operator).
export function resolveOperatorPersonaFromCodes(codes: readonly string[]): string | null {
  return codes.find((c) => c in OPERATOR_HOME) ?? null;
}

export function resolveOperatorPersona(
  memberships: ThunderMembership[] | undefined,
  tenantId: string
): string | null {
  return resolveOperatorPersonaFromCodes(membershipCodes(memberships, tenantId));
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
