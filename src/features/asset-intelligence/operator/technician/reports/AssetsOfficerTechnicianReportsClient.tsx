import { getTechnicianReportData } from "./mock";
import ReportsClient from "./ReportsClient";

// TODO: wire to CityZen session (getWorkspaceUser() from '@/lib/workspace-user') once this module is connected to real auth

export async function AssetsOfficerTechnicianReportsClient() {
  return <ReportsClient />;
}
