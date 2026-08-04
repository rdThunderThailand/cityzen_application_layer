"use client";

import PieChart, { PieChartDataPoint } from "@/components/dashboard/PieCart";
import { TechnicianMaintenanceOverview, TechnicianNotification, TechnicianPMPlan, TechnicianPreWorkChecklist, TechnicianSummaryStats, TechnicianTaskItem, TechnicianToolsAndSpares } from "@/features/asset-intelligence/operator/technician/types";
import { TechnicianAnnouncementsWidget } from "./components/TechnicianAnnouncementsWidget";
import { TechnicianChecklistWidget } from "./components/TechnicianChecklistWidget";
import { TechnicianHeader } from "./components/TechnicianHeader";
import { TechnicianMapWidget } from "./components/TechnicianMapWidget";
import { TechnicianNotificationsWidget } from "./components/TechnicianNotificationsWidget";
import { TechnicianPMWidget } from "./components/TechnicianPMWidget";
import { TechnicianStatsCards } from "./components/TechnicianStatsCards";
import { TechnicianTasksToday } from "./components/TechnicianTasksToday";
import { TechnicianToolsWidget } from "./components/TechnicianToolsWidget";

const MAINTENANCE_COLOR_HEX: Record<string, string> = {
  emerald: "#10b981",
  blue: "#3b82f6",
  amber: "#f59e0b",
  rose: "#f43f5e",
  purple: "#8b5cf6",
};

const toMaintenanceChartData = (overview: TechnicianMaintenanceOverview): PieChartDataPoint[] =>
  overview.items.map((item) => {
    const colorKey = Object.keys(MAINTENANCE_COLOR_HEX).find((key) => item.color.includes(key));
    return {
      label: item.label,
      value: item.count,
      color: colorKey ? MAINTENANCE_COLOR_HEX[colorKey] : "#cbd5e1",
    };
  });

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
  const userName = "สมชาย";//mock ไว้ก่อนเดียวค่อย fetch

  // Handlers for "functional" aspect (like checking off checklist items)
  // But wait, to keep it simple, we can pass down the checklist and manage local state inside the component if needed.

  return (
    <div className="min-h-full flex-1 w-full p-6 pb-40 space-y-6 ">
      <TechnicianHeader userName={userName} />

      <TechnicianStatsCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 max-h-180 gap-6">
        <TechnicianTasksToday tasks={tasksToday} />
        <PieChart
          title="ภาพรวมงานบำรุงรักษา"
          subtitle="สัปดาห์นี้"
          unit="รายการ"
          data={toMaintenanceChartData(maintenanceOverview)}
          className="h-[350px] w-full max-w-none rounded-2xl border-slate-200"
        />
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
