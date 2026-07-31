import { getTechnicianRequests } from "./mock";
import RequestsClient from "./RequestsClient";

// TODO: wire to CityZen session (getWorkspaceUser() from '@/lib/workspace-user') once this module is connected to real auth

export async function AssetsOfficerTechnicianRequestsClient() {
  return <RequestsClient />;
}
