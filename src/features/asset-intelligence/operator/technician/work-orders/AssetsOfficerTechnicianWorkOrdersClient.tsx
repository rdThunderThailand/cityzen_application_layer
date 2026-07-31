import {
  getTechnicianAllWOStats,
  getTechnicianAllWOs
} from "./mock";
import { WorkOrdersClient } from "./WorkOrdersClient";

// TODO: wire to CityZen session (getWorkspaceUser() from '@/lib/workspace-user') once this module is connected to real auth

export async function AssetsOfficerTechnicianWorkOrdersClient() {
  const [stats, tasks] = await Promise.all([
    getTechnicianAllWOStats(),
    getTechnicianAllWOs(),
  ]);

  return (
    <WorkOrdersClient
      stats={stats}
      initialWorkOrders={tasks}
    />
  );
}
