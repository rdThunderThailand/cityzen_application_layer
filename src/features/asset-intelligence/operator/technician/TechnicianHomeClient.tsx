"use client";

import { TechnicianMaintenanceOverview, TechnicianNotification, TechnicianPMPlan, TechnicianPreWorkChecklist, TechnicianSummaryStats, TechnicianTaskItem, TechnicianToolsAndSpares } from "@/features/asset-intelligence/operator/technician/types";
import { TechnicianAnnouncementsWidget } from "./components/TechnicianAnnouncementsWidget";
import { TechnicianChecklistWidget } from "./components/TechnicianChecklistWidget";
import { TechnicianHeader } from "./components/TechnicianHeader";
import { TechnicianMaintenanceChart } from "./components/TechnicianMaintenanceChart";
import { TechnicianMapWidget } from "./components/TechnicianMapWidget";
import { TechnicianNotificationsWidget } from "./components/TechnicianNotificationsWidget";
import { TechnicianPMWidget } from "./components/TechnicianPMWidget";
import { TechnicianStatsCards } from "./components/TechnicianStatsCards";
import { TechnicianTasksToday } from "./components/TechnicianTasksToday";
import { TechnicianToolsWidget } from "./components/TechnicianToolsWidget";

interface TechnicianHomeClientProps {
  stats: TechnicianSummaryStats;
  tasksToday: TechnicianTaskItem[];
  maintenanceOverview: TechnicianMaintenanceOverview;
  checklist: TechnicianPreWorkChecklist[];
  pmPlan: TechnicianPMPlan[];
  notifications: TechnicianNotification[];
  toolsAndSpares: TechnicianToolsAndSpares;
}

export function TechnicianHomeClient({
  stats,
  tasksToday,
  maintenanceOverview,
  checklist,
  pmPlan,
  notifications,
  toolsAndSpares
}: TechnicianHomeClientProps) {
  // TODO: replace with real session user name
  const userName = "สมชาย";

  // Handlers for "functional" aspect (like checking off checklist items)
  // But wait, to keep it simple, we can pass down the checklist and manage local state inside the component if needed.

  return (
    <div className="min-h-full flex-1 bg-slate-50 w-full p-6 pb-40 space-y-6">
      <TechnicianHeader userName={userName} />

      <TechnicianStatsCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TechnicianTasksToday tasks={tasksToday} />
        <TechnicianMaintenanceChart overview={maintenanceOverview} />
        <TechnicianMapWidget />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="flex flex-col gap-6 lg:col-span-1">
          <TechnicianChecklistWidget initialChecklist={checklist} />
        </div>
        <div className="flex flex-col gap-6 lg:col-span-1">
          <TechnicianPMWidget pmPlan={pmPlan} />
        </div>
        <div className="flex flex-col gap-6 lg:col-span-1">
          <TechnicianNotificationsWidget notifications={notifications} />
        </div>
        <div className="flex flex-col gap-6 lg:col-span-1">
          <TechnicianToolsWidget data={toolsAndSpares} />
          <TechnicianAnnouncementsWidget />
        </div>
      </div>
    </div>
  );
}
