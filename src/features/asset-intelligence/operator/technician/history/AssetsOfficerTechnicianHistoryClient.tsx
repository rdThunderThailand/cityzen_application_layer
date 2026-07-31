import { getTechnicianHistory } from "./mock";
import HistoryClient from "./HistoryClient";

// TODO: wire to CityZen session (getWorkspaceUser() from '@/lib/workspace-user') once this module is connected to real auth

export async function AssetsOfficerTechnicianHistoryClient() {
  return <HistoryClient />;
}
