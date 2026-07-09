const BASE = process.env.THUNDER_CORE_API_URL!;
const APP_KEY = process.env.THUNDER_APP_API_KEY!;

// Every cityzen → Thunder call carries the registered-app key (x-api-key) so Thunder's
// core/v1 accepts it. Generated in Thunder app-registry; stored in THUNDER_APP_API_KEY.
function appHeaders(extra?: Record<string, string>): Record<string, string> {
  if (!APP_KEY) throw new Error("THUNDER_APP_API_KEY is not set");
  return { "x-api-key": APP_KEY, ...extra };
}

export type ThunderMe = {
  id: string; global_user_code: string | null; email: string;
  first_name: string | null; last_name: string | null; display_name: string | null;
  avatar_url: string | null; preferred_language: string | null; timezone: string | null;
  is_super_admin: boolean; default_tenant_id: string | null; role: string;
};
export type ThunderMembership = {
  id: string; tenant_id: string; status: string; is_primary: boolean;
  default_department_id: string | null; joined_at: string;
  tenants: { id: string; name: string } | null;
  membership_roles: { role_id: string; roles: { id: string; code: string; name: string; role_type: string } | null }[];
};

async function get<T>(path: string, accessToken: string): Promise<T> {
  if (!BASE) throw new Error("THUNDER_CORE_API_URL is not set");
  const url = `${BASE}/api/core/v1${path}`;
  const res = await fetch(url, {
    headers: appHeaders({ Authorization: `Bearer ${accessToken}` }), cache: "no-store",
    redirect: "manual", // a redirect means we hit the wrong host (e.g. cityzen itself), not the API
  });
  const body = await res.text();
  if (!res.ok) {
    throw new Error(`Thunder ${path} → ${res.status} (is THUNDER_CORE_API_URL=${BASE} the Thunder Core port?): ${body.slice(0, 120)}`);
  }
  try {
    return JSON.parse(body).data as T;
  } catch {
    throw new Error(`Thunder ${path} returned non-JSON — THUNDER_CORE_API_URL=${BASE} is likely wrong (pointing at cityzen, not Thunder Core)`);
  }
}
// Departments arrive as a nested tree (roots with `children`) — flatten before caching.
export type ThunderOrg = {
  id: string; parent_department_id: string | null; code: string | null; name: string;
  name_en: string | null; department_type: string | null; status: string | null;
  children: ThunderOrg[];
};
export const getMe = (t: string) => get<ThunderMe>("/me", t);
export const getMyMemberships = (t: string) => get<ThunderMembership[]>("/me/memberships", t);
export const getTenantOrganizations = (tenantId: string, t: string) =>
  get<ThunderOrg[]>(`/tenants/${tenantId}/organizations`, t);

export type ThunderLoginResult = {
  access_token: string; refresh_token: string; expires_at: number | null; user_id: string | null;
};
// Verify credentials via Thunder (identity gateway). Returns null on bad credentials (401);
// throws on any other failure (Thunder unreachable/misconfigured) — caller decides the message.
export async function loginWithPassword(email: string, password: string): Promise<ThunderLoginResult | null> {
  if (!BASE) throw new Error("THUNDER_CORE_API_URL is not set");
  const res = await fetch(`${BASE}/api/core/v1/auth/login`, {
    method: "POST",
    headers: appHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ email, password }),
    cache: "no-store",
    redirect: "manual", // a redirect means we hit the wrong host, not the API
  });
  const body = await res.text();
  if (res.status === 401) {
    // ponytail: match Thunder's error wording — app-key rejection is a config error, not bad creds
    if (body.includes("app API key")) {
      throw new Error("Thunder rejected the app API key — check THUNDER_APP_API_KEY");
    }
    return null; // bad email/password
  }
  if (!res.ok) {
    throw new Error(`Thunder /auth/login → ${res.status} (is THUNDER_CORE_API_URL=${BASE} the Thunder Core port?)`);
  }
  try {
    return JSON.parse(body).data as ThunderLoginResult;
  } catch {
    throw new Error(`Thunder /auth/login returned non-JSON — THUNDER_CORE_API_URL=${BASE} is likely wrong`);
  }
}
