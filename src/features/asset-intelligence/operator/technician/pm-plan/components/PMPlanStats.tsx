"use client";

import { TechnicianPMPlanStats } from "@/features/asset-intelligence/operator/technician/types";
import { AlertTriangle, CheckCircle2, ClipboardList, Clock, PauseCircle } from "lucide-react";
import { SharedTechnicianStatCard } from "../../components/shared/SharedTechnicianStatCard";

export function PMPlanStats({ stats }: { stats: TechnicianPMPlanStats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <SharedTechnicianStatCard
        title="แผน PM ทั้งหมด"
        value={stats.all}
        suffix="แผน"
        icon={ClipboardList}
        colorScheme="blue"
        actionLabel="ดูทั้งหมด"
        onClick={() => {}}
      />
      <SharedTechnicianStatCard
        title="ใช้งานอยู่"
        value={stats.active.count}
        suffix="แผน"
        subtitle={`${stats.active.percent}% ของทั้งหมด`}
        icon={CheckCircle2}
        colorScheme="emerald"
      />
      <SharedTechnicianStatCard
        title="ใกล้ถึงกำหนด"
        value={stats.nearingDue.count}
        suffix="แผน"
        subtitle={stats.nearingDue.label}
        icon={Clock}
        colorScheme="orange"
      />
      <SharedTechnicianStatCard
        title="เกินกำหนด"
        value={stats.overdue.count}
        suffix="แผน"
        subtitle={stats.overdue.label}
        icon={AlertTriangle}
        colorScheme="rose"
      />
      <SharedTechnicianStatCard
        title="หยุดใช้งาน"
        value={stats.suspended.count}
        suffix="แผน"
        subtitle={`${stats.suspended.percent}% ของทั้งหมด`}
        icon={PauseCircle}
        colorScheme="purple"
      />
    </div>
  );
}
