import {
  getTechnicianInspectionStats,
  getTechnicianInspections
} from "./mock";
import { InspectionsClient } from "./InspectionsClient";

// TODO: wire to CityZen session (getWorkspaceUser() from '@/lib/workspace-user') once this module is connected to real auth

export async function AssetsOfficerTechnicianInspectionsClient() {
  const [stats, tasks] = await Promise.all([
    getTechnicianInspectionStats(),
    getTechnicianInspections(),
  ]);

  return (
    <InspectionsClient
      stats={stats}
      initialInspections={tasks}
    />
  );
}
