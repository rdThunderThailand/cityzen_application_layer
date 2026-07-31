import {
  getTechnicianMyTaskStats,
  getTechnicianMyTasks
} from "./mock";
import { MyTasksClient } from "./MyTasksClient";

// TODO: wire to CityZen session (getWorkspaceUser() from '@/lib/workspace-user') once this module is connected to real auth

export async function AssetsOfficerTechnicianMyTasksClient() {
  const [stats, tasks] = await Promise.all([
    getTechnicianMyTaskStats(),
    getTechnicianMyTasks(),
  ]);

  return (
    <MyTasksClient
      stats={stats}
      initialTasks={tasks}
    />
  );
}
