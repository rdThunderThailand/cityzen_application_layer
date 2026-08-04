"use client";

import { TechnicianAllWOStats } from "@/features/asset-intelligence/operator/technician/types";
import { Box, CheckCircle2, ClipboardList, Clock, Wrench, XCircle } from "lucide-react";
import { CardMetric } from "@/components/dashboard/CardMetric";

export function WorkOrdersStats({ stats }: { stats: TechnicianAllWOStats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <CardMetric
        title="ทั้งหมด"
        value={stats.all}
        icon={ClipboardList}
        classNameForIcon="bg-blue-50 text-blue-600"
        subtitle="ใบงาน"
        className="max-h-180 gap-2 p-5"
      />
      <CardMetric
        title="รอดำเนินการ"
        value={stats.pending}
        icon={Clock}
        classNameForIcon="bg-orange-50 text-orange-500"
        subtitle="ใบงาน"
        className="max-h-180 gap-2 p-5"
      />
      <CardMetric
        title="กำลังดำเนินการ"
        value={stats.inProgress}
        icon={Wrench}
        classNameForIcon="bg-blue-50 text-blue-500"
        subtitle="ใบงาน"
        className="max-h-180 gap-2 p-5"
      />
      <CardMetric
        title="รออะไหล่ / รออนุมัติ"
        value={stats.waiting}
        icon={Box}
        classNameForIcon="bg-purple-50 text-purple-500"
        subtitle="ใบงาน"
        className="max-h-180 gap-2 p-5"
      />
      <CardMetric
        title="เสร็จสิ้น"
        value={stats.completed}
        icon={CheckCircle2}
        classNameForIcon="bg-emerald-50 text-emerald-500"
        subtitle="ใบงาน"
        className="max-h-180 gap-2 p-5"
      />
      <CardMetric
        title="ยกเลิก"
        value={stats.canceled}
        icon={XCircle}
        classNameForIcon="bg-rose-50 text-rose-500"
        subtitle="ใบงาน"
        className="max-h-180 gap-2 p-5"
      />
    </div>
  );
}
