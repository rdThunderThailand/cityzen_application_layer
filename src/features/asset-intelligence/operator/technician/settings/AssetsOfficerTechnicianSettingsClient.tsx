import { getTechnicianSettingsData } from "./mock";
import SettingsClient from "./SettingsClient";

// TODO: wire to CityZen session (getWorkspaceUser() from '@/lib/workspace-user') once this module is connected to real auth

export async function AssetsOfficerTechnicianSettingsClient() {
  return <SettingsClient />;
}
