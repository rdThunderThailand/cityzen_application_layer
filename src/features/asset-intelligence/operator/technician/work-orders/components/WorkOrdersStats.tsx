"use client";

import { TechnicianAllWOStats } from "@/features/asset-intelligence/operator/technician/types";
import { Box, CheckCircle2, ClipboardList, Clock, Wrench, XCircle } from "lucide-react";
import { TechnicianMetricCard } from "../../components/shared/TechnicianMetricCard";

export function WorkOrdersStats({ stats }: { stats: TechnicianAllWOStats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <TechnicianMetricCard
        title="ทั้งหมด"
        value={stats.all}
        icon={<ClipboardList className="w-6 h-6 text-blue-600" />}
        subtitle="ใบงาน"
      />
      <TechnicianMetricCard
        title="รอดำเนินการ"
        value={stats.pending}
        icon={<Clock className="w-6 h-6 text-orange-500" />}
        iconBgColor="bg-orange-50"
        subtitle="ใบงาน"
      />
      <TechnicianMetricCard
        title="กำลังดำเนินการ"
        value={stats.inProgress}
        icon={<Wrench className="w-6 h-6 text-blue-500" />}
        iconBgColor="bg-blue-50"
        subtitle="ใบงาน"
      />
      <TechnicianMetricCard
        title="รออะไหล่ / รออนุมัติ"
        value={stats.waiting}
        icon={<Box className="w-6 h-6 text-purple-500" />}
        iconBgColor="bg-purple-50"
        subtitle="ใบงาน"
      />
      <TechnicianMetricCard
        title="เสร็จสิ้น"
        value={stats.completed}
        icon={<CheckCircle2 className="w-6 h-6 text-emerald-500" />}
        iconBgColor="bg-emerald-50"
        subtitle="ใบงาน"
      />
      <TechnicianMetricCard
        title="ยกเลิก"
        value={stats.canceled}
        icon={<XCircle className="w-6 h-6 text-rose-500" />}
        iconBgColor="bg-rose-50"
        subtitle="ใบงาน"
      />
    </div>
  );
}
