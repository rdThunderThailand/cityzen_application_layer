import type { ThunderMembership } from "./thunder";

// The 3 CityZen application roles (RBAC), distinct from Thunder platform roles.
export const CITYZEN_ROLES = ["owner", "executive_viewer", "operator"] as const;
export type CityzenRole = (typeof CITYZEN_ROLES)[number];

// Priority when one membership carries several roles: owner > executive_viewer > operator.
const PRIORITY: readonly CityzenRole[] = CITYZEN_ROLES;

function toCityzenRole(code: string): CityzenRole | null {
  if (code === "owner") return "owner";
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
