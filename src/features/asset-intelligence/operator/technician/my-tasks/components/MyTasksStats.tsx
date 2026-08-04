"use client";

import { TechnicianMyTaskStats } from "@/features/asset-intelligence/operator/technician/types";
import { Box, CheckCircle2, ClipboardList, Clock, Wrench } from "lucide-react";
import { CardMetric } from "@/components/dashboard/CardMetric";

export function MyTasksStats({ stats }: { stats: TechnicianMyTaskStats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <CardMetric
        title="งานทั้งหมด"
        value={stats.all}
        icon={ClipboardList}
        classNameForIcon="bg-blue-50 text-blue-600"
        subtitle="รายการ"
        className="max-h-180 gap-2 p-5"
      />
      <CardMetric
        title="รอดำเนินการ"
        value={stats.pending}
        icon={Clock}
        classNameForIcon="bg-orange-50 text-orange-500"
        subtitle="รายการ"
        className="max-h-180 gap-2 p-5"
      />
      <CardMetric
        title="กำลังดำเนินการ"
        value={stats.inProgress}
        icon={Wrench}
        classNameForIcon="bg-purple-50 text-purple-600"
        subtitle="รายการ"
        className="max-h-180 gap-2 p-5"
      />
      <CardMetric
        title="รออะไหล่ / รออนุมัติ"
        value={stats.waiting}
        icon={Box}
        classNameForIcon="bg-emerald-50 text-emerald-600"
        subtitle="รายการ"
        className="max-h-180 gap-2 p-5"
      />
      <CardMetric
        title="งานเกินกำหนด"
        value={stats.overdue}
        icon={Clock}
        classNameForIcon="bg-rose-50 text-rose-500"
        subtitle="รายการ"
        className="max-h-180 gap-2 p-5"
      />
      <CardMetric
        title="งานเสร็จสิ้น (วันนี้)"
        value={stats.completedToday}
        icon={CheckCircle2}
        classNameForIcon="bg-slate-100 text-slate-500"
        subtitle="รายการ"
        className="max-h-180 gap-2 p-5"
      />
    </div>
  );
}
