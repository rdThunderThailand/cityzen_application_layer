import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

// Single service-role entry point to the CityZen data project (docs/DATA_ACCESS.md §2).
// One cached client per schema; typed against Database. Service-role key bypasses RLS —
// tenant isolation is the caller's job (§4/§5).
//
// Config seam (build-now-plug-link-later): env unset → returns null → callers no-op.
// Never throws on missing env, so auth/pages keep working before the DB is plugged in.
type AppSchema = Extract<keyof Database, "core" | "disaster_ops">;

const clients = new Map<AppSchema, SupabaseClient<Database, AppSchema> | null>();

export function getDbClient<S extends AppSchema>(schema: S): SupabaseClient<Database, S> | null {
  const memo = clients.get(schema);
  if (memo !== undefined) return memo as SupabaseClient<Database, S> | null;

  const url = process.env.CITYZEN_DIRECTORY_DB_URL;
  const key = process.env.CITYZEN_DIRECTORY_DB_KEY;
  // ponytail: createClient's return type is a conditional over the schema param that TS
  // won't prove equals SupabaseClient<Database, S>; cast the one seam instead of fighting it.
  const client = url && key
    ? (createClient(url, key, { auth: { persistSession: false }, db: { schema } }) as unknown as SupabaseClient<Database, S>)
    : null;
  if (!client) console.warn("[supabase-db] CITYZEN_DIRECTORY_DB_URL/KEY unset — db ops are no-ops");

  clients.set(schema, client as SupabaseClient<Database, AppSchema> | null);
  return client;
}
