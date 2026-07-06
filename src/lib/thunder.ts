const BASE = process.env.THUNDER_CORE_API_URL!;

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
    headers: { Authorization: `Bearer ${accessToken}` }, cache: "no-store",
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
export const getMe = (t: string) => get<ThunderMe>("/me", t);
export const getMyMemberships = (t: string) => get<ThunderMembership[]>("/me/memberships", t);
