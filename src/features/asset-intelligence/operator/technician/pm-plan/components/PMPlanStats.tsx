"use client";

import { TechnicianPMPlanStats } from "@/features/asset-intelligence/operator/technician/types";
import { AlertTriangle, CheckCircle2, ClipboardList, Clock, PauseCircle } from "lucide-react";
import { CardMetric } from "@/components/dashboard/CardMetric";

export function PMPlanStats({ stats }: { stats: TechnicianPMPlanStats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <CardMetric
        title="แผน PM ทั้งหมด"
        value={stats.all}
        subtitle="แผน"
        icon={ClipboardList}
        classNameForIcon="bg-blue-50 text-blue-600"
        className="max-h-180 gap-2 p-5"
      />
      <CardMetric
        title="ใช้งานอยู่"
        value={stats.active.count}
        subtitle="แผน"
        icon={CheckCircle2}
        classNameForIcon="bg-emerald-50 text-emerald-600"
        className="max-h-180 gap-2 p-5"
      />
      <CardMetric
        title="ใกล้ถึงกำหนด"
        value={stats.nearingDue.count}
        subtitle="แผน"
        icon={Clock}
        classNameForIcon="bg-orange-50 text-orange-500"
        className="max-h-180 gap-2 p-5"
      />
      <CardMetric
        title="เกินกำหนด"
        value={stats.overdue.count}
        subtitle="แผน"
        icon={AlertTriangle}
        classNameForIcon="bg-rose-50 text-rose-500"
        className="max-h-180 gap-2 p-5"
      />
      <CardMetric
        title="หยุดใช้งาน"
        value={stats.suspended.count}
        subtitle="แผน"
        icon={PauseCircle}
        classNameForIcon="bg-purple-50 text-purple-600"
        className="max-h-180 gap-2 p-5"
      />
    </div>
  );
}
