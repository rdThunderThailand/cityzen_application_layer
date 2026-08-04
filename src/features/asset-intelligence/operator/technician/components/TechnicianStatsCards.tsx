"use client";

import { TechnicianSummaryStats } from "@/features/asset-intelligence/operator/technician/types";
import { CheckCircle2, ChevronRight, Clock, FileText, History, Timer } from "lucide-react";
import { CardMetric } from "@/components/dashboard/CardMetric";

export function TechnicianStatsCards({ stats }: { stats: TechnicianSummaryStats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6 items-start">
      <CardMetric
        title="งานของฉันวันนี้"
        value={stats.tasksToday}
        subtitle="รายการ"
        icon={FileText}
        classNameForIcon="bg-blue-50 text-blue-600"
        className="max-h-180 gap-2 p-5 items-start"
        action={
          <div className="w-full">
          <button className="flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors">
            ดูทั้งหมด <ChevronRight className="w-3 h-3" />
          </button>
          </div>
        }
      />
      <CardMetric
        title="งานเร่งด่วน"
        value={stats.urgentTasks}
        subtitle="รายการ"
        icon={Clock}
        classNameForIcon="bg-amber-50 text-amber-600"
        className="max-h-180 gap-2 p-5 items-start"
        action={
          <button className="flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors">
            ดูทั้งหมด <ChevronRight className="w-3 h-3" />
          </button>
        }
      />
      <CardMetric
        title="งานค้างเกินกำหนด"
        value={stats.overdueTasks}
        subtitle="รายการ"
        icon={History}
        classNameForIcon="bg-purple-50 text-purple-600"
        className="max-h-180 gap-2 p-5 items-start"
        action={
          <button className="flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors">
            ดูทั้งหมด <ChevronRight className="w-3 h-3" />
          </button>
        }
      />
      <CardMetric
        title="งานเสร็จสิ้น (สัปดาห์นี้)"
        value={stats.completedThisWeek}
        subtitle="รายการ"
        icon={CheckCircle2}
        classNameForIcon="bg-emerald-50 text-emerald-600"
        className="max-h-180 gap-2 p-5 items-start"
        action={
          <button className="flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors">
            ดูสรุปผลงาน <ChevronRight className="w-3 h-3" />
          </button>
        }
      />

      {/* Hours Worked */}
      <CardMetric
        title="ชั่วโมงทำงานวันนี้"
        value={stats.hoursWorked}
        unit="ชม."
        subtitle={`จาก ${stats.maxHours} ชม.`}
        icon={Timer}
        classNameForIcon="bg-slate-100 text-slate-600 "
        className="max-h-180 gap-2 p-6 items-start"
        action={
            <div className="w-ful h-2 rounded-full gap-2 flex">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: `${stats.progressPercent}%` }} />
              <div className="text-right text-[10px] font-bold text-slate-400">{stats.progressPercent}%</div>
          </div>
        }
      />
    </div>
  );
}
