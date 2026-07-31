"use client";

import { TechnicianPMPlanStats } from "@/features/asset-intelligence/operator/technician/types";
import { AlertTriangle, CheckCircle2, ClipboardList, Clock, PauseCircle } from "lucide-react";
import { TechnicianMetricCard } from "../../components/shared/TechnicianMetricCard";

export function PMPlanStats({ stats }: { stats: TechnicianPMPlanStats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <TechnicianMetricCard
        title="แผน PM ทั้งหมด"
        value={stats.all}
        subtitle="แผน"
        icon={<ClipboardList className="w-6 h-6 text-blue-600" />}
      />
      <TechnicianMetricCard
        title="ใช้งานอยู่"
        value={stats.active.count}
        subtitle="แผน"
        icon={<CheckCircle2 className="w-6 h-6 text-emerald-600" />}
        iconBgColor="bg-emerald-50"
      />
      <TechnicianMetricCard
        title="ใกล้ถึงกำหนด"
        value={stats.nearingDue.count}
        subtitle="แผน"
        icon={<Clock className="w-6 h-6 text-orange-500" />}
        iconBgColor="bg-orange-50"
      />
      <TechnicianMetricCard
        title="เกินกำหนด"
        value={stats.overdue.count}
        subtitle="แผน"
        icon={<AlertTriangle className="w-6 h-6 text-rose-500" />}
        iconBgColor="bg-rose-50"
      />
      <TechnicianMetricCard
        title="หยุดใช้งาน"
        value={stats.suspended.count}
        subtitle="แผน"
        icon={<PauseCircle className="w-6 h-6 text-purple-600" />}
        iconBgColor="bg-purple-50"
      />
    </div>
  );
}
