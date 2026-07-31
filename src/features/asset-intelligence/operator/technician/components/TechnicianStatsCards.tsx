"use client";

import { TechnicianSummaryStats } from "@/features/asset-intelligence/operator/technician/types";
import { CheckCircle2, Clock, FileText, History } from "lucide-react";
import { SharedTechnicianStatCard } from "./shared/SharedTechnicianStatCard";

export function TechnicianStatsCards({ stats }: { stats: TechnicianSummaryStats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <SharedTechnicianStatCard
        title="งานของฉันวันนี้"
        value={stats.tasksToday}
        subtitle="รายการ"
        icon={FileText}
        colorScheme="blue"
        actionLabel="ดูทั้งหมด"
        layout="left"
      />
      <SharedTechnicianStatCard
        title="งานเร่งด่วน"
        value={stats.urgentTasks}
        subtitle="รายการ"
        icon={Clock}
        colorScheme="amber"
        actionLabel="ดูทั้งหมด"
        layout="left"
      />
      <SharedTechnicianStatCard
        title="งานค้างเกินกำหนด"
        value={stats.overdueTasks}
        subtitle="รายการ"
        icon={History}
        colorScheme="purple"
        actionLabel="ดูทั้งหมด"
        layout="left"
      />
      <SharedTechnicianStatCard
        title="งานเสร็จสิ้น (สัปดาห์นี้)"
        value={stats.completedThisWeek}
        subtitle="รายการ"
        icon={CheckCircle2}
        colorScheme="emerald"
        actionLabel="ดูสรุปผลงาน"
        layout="left"
      />

      {/* Hours Worked */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 flex flex-col justify-between relative overflow-hidden">
        <div>
          <p className="text-[12px] font-bold text-slate-600 mb-2">ชั่วโมงทำงานวันนี้</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-slate-800 leading-none">{stats.hoursWorked}</span>
            <span className="text-[13px] font-bold text-slate-500 mb-1">ชม.</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">จาก {stats.maxHours} ชม.</p>
        </div>
        <div className="mt-6 flex flex-col gap-1">
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${stats.progressPercent}%` }} />
          </div>
          <div className="text-right text-[10px] font-bold text-slate-400">{stats.progressPercent}%</div>
        </div>
      </div>
    </div>
  );
}
