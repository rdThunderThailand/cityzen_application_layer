import ToolsClient from "./ToolsClient";

// TODO: wire to CityZen session (getWorkspaceUser() from '@/lib/workspace-user') once this module is connected to real auth

export async function AssetsOfficerTechnicianToolsClient() {
  return <ToolsClient />;
}
