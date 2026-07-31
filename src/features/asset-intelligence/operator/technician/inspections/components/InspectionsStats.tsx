"use client";

import { TechnicianInspectionStats } from "@/features/asset-intelligence/operator/technician/types";
import { CheckCircle2, ClipboardList, Clock, XCircle, XSquare } from "lucide-react";
import { TechnicianMetricCard } from "../../components/shared/TechnicianMetricCard";

export function InspectionsStats({ stats }: { stats: TechnicianInspectionStats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <TechnicianMetricCard
        title="รอดำเนินการตรวจสอบ"
        value={stats.pending}
        icon={<ClipboardList className="w-6 h-6 text-blue-600" />}
        subtitle="รายการ"
      />
      <TechnicianMetricCard
        title="กำลังตรวจสอบ"
        value={stats.inspecting}
        icon={<Clock className="w-6 h-6 text-orange-500" />}
        iconBgColor="bg-orange-50"
        subtitle="รายการ"
      />
      <TechnicianMetricCard
        title="ตรวจสอบแล้ว"
        value={stats.inspected}
        icon={<CheckCircle2 className="w-6 h-6 text-emerald-600" />}
        iconBgColor="bg-emerald-50"
        subtitle="รายการ"
      />
      <TechnicianMetricCard
        title="พบประเด็น"
        value={stats.issueFound}
        icon={<XCircle className="w-6 h-6 text-purple-600" />}
        iconBgColor="bg-purple-50"
        subtitle="รายการ"
      />
      <TechnicianMetricCard
        title="ยกเลิก"
        value={stats.canceled}
        icon={<XSquare className="w-6 h-6 text-slate-500" />}
        iconBgColor="bg-slate-100"
        subtitle="รายการ"
      />
    </div>
  );
}
