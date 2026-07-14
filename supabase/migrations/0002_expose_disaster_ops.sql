-- Expose disaster_ops to PostgREST (same 4-layer gap hit earlier for hospitality_waste:
-- schema not in pgrst.db_schemas + no grants for service_role). Applied directly via
-- Supabase MCP on project wmcliqjttbpihjcosmmc; captured here so a DB rebuild doesn't
-- silently drop the exposure again.
alter role authenticator set pgrst.db_schemas = 'public, graphql_public, core, hospitality_waste, disaster_ops';
notify pgrst, 'reload schema';

grant usage on schema disaster_ops to service_role;
grant select, insert, update, delete on all tables in schema disaster_ops to service_role;
alter default privileges in schema disaster_ops grant select, insert, update, delete on tables to service_role;
