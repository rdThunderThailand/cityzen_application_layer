"use client";

import { TechnicianAllWOStats } from "@/features/asset-intelligence/operator/technician/types";
import { Box, CheckCircle2, ClipboardList, Clock, Wrench, XCircle } from "lucide-react";

export function WorkOrdersStats({ stats }: { stats: TechnicianAllWOStats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {/* All */}
      <div className="bg-[#F8FAFF] rounded-2xl p-4 flex items-center justify-center gap-4 border border-transparent hover:border-blue-100 transition-colors">
        <div className="w-[46px] h-[46px] rounded-full bg-blue-100/60 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(37,99,235,0.15)]">
          <ClipboardList className="w-[22px] h-[22px] text-blue-600" />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[12px] font-bold text-[#1E293B] mb-0.5">ทั้งหมด</span>
          <span className="text-[32px] font-black text-[#0F172A] leading-none tracking-tight">{stats.all}</span>
          <span className="text-[11px] font-medium text-slate-500 mt-0.5">ใบงาน</span>
        </div>
      </div>

      {/* Pending */}
      <div className="bg-[#FFFDF8] rounded-2xl p-4 flex items-center justify-center gap-4 border border-transparent hover:border-orange-100 transition-colors">
        <div className="w-[46px] h-[46px] rounded-full bg-orange-100/60 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(249,115,22,0.15)]">
          <Clock className="w-[22px] h-[22px] text-orange-500" />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[12px] font-bold text-[#1E293B] mb-0.5">รอดำเนินการ</span>
          <span className="text-[32px] font-black text-[#0F172A] leading-none tracking-tight">{stats.pending}</span>
          <span className="text-[11px] font-medium text-slate-500 mt-0.5">ใบงาน</span>
        </div>
      </div>

      {/* In Progress */}
      <div className="bg-[#FCF9FF] rounded-2xl p-4 flex items-center justify-center gap-4 border border-transparent hover:border-blue-100 transition-colors">
        <div className="w-[46px] h-[46px] rounded-full bg-blue-100/60 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
          <Wrench className="w-[22px] h-[22px] text-blue-500" />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[12px] font-bold text-[#1E293B] mb-0.5">กำลังดำเนินการ</span>
          <span className="text-[32px] font-black text-[#0F172A] leading-none tracking-tight">{stats.inProgress}</span>
          <span className="text-[11px] font-medium text-slate-500 mt-0.5">ใบงาน</span>
        </div>
      </div>

      {/* Waiting */}
      <div className="bg-[#FCF9FF] rounded-2xl p-4 flex items-center justify-center gap-4 border border-transparent hover:border-purple-100 transition-colors">
        <div className="w-[46px] h-[46px] rounded-full bg-purple-100/60 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
          <Box className="w-[22px] h-[22px] text-purple-500" />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[12px] font-bold text-[#1E293B] mb-0.5">รออะไหล่ / รออนุมัติ</span>
          <span className="text-[32px] font-black text-[#0F172A] leading-none tracking-tight">{stats.waiting}</span>
          <span className="text-[11px] font-medium text-slate-500 mt-0.5">ใบงาน</span>
        </div>
      </div>

      {/* Completed */}
      <div className="bg-[#F6FDF9] rounded-2xl p-4 flex items-center justify-center gap-4 border border-transparent hover:border-emerald-100 transition-colors">
        <div className="w-[46px] h-[46px] rounded-full bg-emerald-100/60 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
          <CheckCircle2 className="w-[22px] h-[22px] text-emerald-500" />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[12px] font-bold text-[#1E293B] mb-0.5">เสร็จสิ้น</span>
          <span className="text-[32px] font-black text-[#0F172A] leading-none tracking-tight">{stats.completed}</span>
          <span className="text-[11px] font-medium text-slate-500 mt-0.5">ใบงาน</span>
        </div>
      </div>

      {/* Canceled */}
      <div className="bg-[#FFF9FA] rounded-2xl p-4 flex items-center justify-center gap-4 border border-transparent hover:border-rose-100 transition-colors">
        <div className="w-[46px] h-[46px] rounded-full bg-rose-100/60 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(244,63,94,0.15)]">
          <XCircle className="w-[22px] h-[22px] text-rose-500" />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[12px] font-bold text-[#1E293B] mb-0.5">ยกเลิก</span>
          <span className="text-[32px] font-black text-[#0F172A] leading-none tracking-tight">{stats.canceled}</span>
          <span className="text-[11px] font-medium text-slate-500 mt-0.5">ใบงาน</span>
        </div>
      </div>
    </div>
  );
}
