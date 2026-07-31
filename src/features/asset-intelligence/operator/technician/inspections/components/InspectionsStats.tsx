"use client";

import { TechnicianInspectionStats } from "@/features/asset-intelligence/operator/technician/types";
import { CheckCircle2, ClipboardList, Clock, XCircle, XSquare } from "lucide-react";
import { SharedTechnicianStatCard } from "../../components/shared/SharedTechnicianStatCard";

export function InspectionsStats({ stats }: { stats: TechnicianInspectionStats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <SharedTechnicianStatCard
        title="รอดำเนินการตรวจสอบ"
        value={stats.pending}
        icon={ClipboardList}
        colorScheme="blue"
        subtitle="รายการ"
        actionLabel="ดูทั้งหมด"
        onClick={() => {}}
      />
      <SharedTechnicianStatCard
        title="กำลังตรวจสอบ"
        value={stats.inspecting}
        icon={Clock}
        colorScheme="orange"
        subtitle="รายการ"
        actionLabel="ดูทั้งหมด"
        onClick={() => {}}
      />
      <SharedTechnicianStatCard
        title="ตรวจสอบแล้ว"
        value={stats.inspected}
        icon={CheckCircle2}
        colorScheme="emerald"
        subtitle="รายการ"
        actionLabel="ดูทั้งหมด"
        onClick={() => {}}
      />
      <SharedTechnicianStatCard
        title="พบประเด็น"
        value={stats.issueFound}
        icon={XCircle}
        colorScheme="purple"
        subtitle="รายการ"
        actionLabel="ดูทั้งหมด"
        onClick={() => {}}
      />
      <SharedTechnicianStatCard
        title="ยกเลิก"
        value={stats.canceled}
        icon={XSquare}
        colorScheme="slate"
        subtitle="รายการ"
        actionLabel="ดูทั้งหมด"
        onClick={() => {}}
      />
    </div>
  );
}
