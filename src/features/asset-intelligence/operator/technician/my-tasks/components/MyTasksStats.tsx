"use client";

import { TechnicianMyTaskStats } from "@/features/asset-intelligence/operator/technician/types";
import { Box, CheckCircle2, ClipboardList, Clock, Wrench } from "lucide-react";
import { TechnicianMetricCard } from "../../components/shared/TechnicianMetricCard";

export function MyTasksStats({ stats }: { stats: TechnicianMyTaskStats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <TechnicianMetricCard
        title="งานทั้งหมด"
        value={stats.all}
        icon={<ClipboardList className="w-6 h-6 text-blue-600" />}
        subtitle="รายการ"
      />
      <TechnicianMetricCard
        title="รอดำเนินการ"
        value={stats.pending}
        icon={<Clock className="w-6 h-6 text-orange-500" />}
        iconBgColor="bg-orange-50"
        subtitle="รายการ"
      />
      <TechnicianMetricCard
        title="กำลังดำเนินการ"
        value={stats.inProgress}
        icon={<Wrench className="w-6 h-6 text-purple-600" />}
        iconBgColor="bg-purple-50"
        subtitle="รายการ"
      />
      <TechnicianMetricCard
        title="รออะไหล่ / รออนุมัติ"
        value={stats.waiting}
        icon={<Box className="w-6 h-6 text-emerald-600" />}
        iconBgColor="bg-emerald-50"
        subtitle="รายการ"
      />
      <TechnicianMetricCard
        title="งานเกินกำหนด"
        value={stats.overdue}
        icon={<Clock className="w-6 h-6 text-rose-500" />}
        iconBgColor="bg-rose-50"
        subtitle="รายการ"
      />
      <TechnicianMetricCard
        title="งานเสร็จสิ้น (วันนี้)"
        value={stats.completedToday}
        icon={<CheckCircle2 className="w-6 h-6 text-slate-500" />}
        iconBgColor="bg-slate-100"
        subtitle="รายการ"
      />
    </div>
  );
}
