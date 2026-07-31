import {
  getTechnicianSummaryStats,
  getTechnicianTasksToday,
  getTechnicianMaintenanceOverview,
  getTechnicianPreWorkChecklist,
  getTechnicianPMPlan,
  getTechnicianNotifications,
  getTechnicianToolsAndSpares
} from "./mock";
import { TechnicianHomeClient } from "./TechnicianHomeClient";

// TODO: wire to CityZen session (getWorkspaceUser() from '@/lib/workspace-user') once this module is connected to real auth

export async function AssetsOfficerTechnicianClient() {
  const [
    stats,
    tasksToday,
    maintenanceOverview,
    checklist,
    pmPlan,
    notifications,
    toolsAndSpares
  ] = await Promise.all([
    getTechnicianSummaryStats(),
    getTechnicianTasksToday(),
    getTechnicianMaintenanceOverview(),
    getTechnicianPreWorkChecklist(),
    getTechnicianPMPlan(),
    getTechnicianNotifications(),
    getTechnicianToolsAndSpares(),
  ]);

  return (
    <TechnicianHomeClient
      stats={stats}
      tasksToday={tasksToday}
      maintenanceOverview={maintenanceOverview}
      checklist={checklist}
      pmPlan={pmPlan}
      notifications={notifications}
      toolsAndSpares={toolsAndSpares}
    />
  );
}
