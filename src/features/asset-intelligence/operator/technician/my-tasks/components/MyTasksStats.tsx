"use client";

import { TechnicianMyTaskStats } from "@/features/asset-intelligence/operator/technician/types";
import { Box, CheckCircle2, ClipboardList, Clock, Wrench } from "lucide-react";
import { SharedTechnicianStatCard } from "../../components/shared/SharedTechnicianStatCard";

export function MyTasksStats({ stats }: { stats: TechnicianMyTaskStats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <SharedTechnicianStatCard
        title="งานทั้งหมด"
        value={stats.all}
        icon={ClipboardList}
        colorScheme="blue"
        subtitle="รายการ"
      />
      <SharedTechnicianStatCard
        title="รอดำเนินการ"
        value={stats.pending}
        icon={Clock}
        colorScheme="orange"
        subtitle="รายการ"
      />
      <SharedTechnicianStatCard
        title="กำลังดำเนินการ"
        value={stats.inProgress}
        icon={Wrench}
        colorScheme="purple"
        subtitle="รายการ"
      />
      <SharedTechnicianStatCard
        title="รออะไหล่ / รออนุมัติ"
        value={stats.waiting}
        icon={Box}
        colorScheme="emerald"
        subtitle="รายการ"
      />
      <SharedTechnicianStatCard
        title="งานเกินกำหนด"
        value={stats.overdue}
        icon={Clock}
        colorScheme="rose"
        subtitle="รายการ"
      />
      <SharedTechnicianStatCard
        title="งานเสร็จสิ้น (วันนี้)"
        value={stats.completedToday}
        icon={CheckCircle2}
        colorScheme="slate"
        subtitle="รายการ"
      />
    </div>
  );
}
