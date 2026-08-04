"use client";

import { TechnicianInspectionStats } from "@/features/asset-intelligence/operator/technician/types";
import { CheckCircle2, ClipboardList, Clock, XCircle, XSquare } from "lucide-react";
import { CardMetric } from "@/components/dashboard/CardMetric";

export function InspectionsStats({ stats }: { stats: TechnicianInspectionStats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <CardMetric
        title="รอดำเนินการตรวจสอบ"
        value={stats.pending}
        icon={ClipboardList}
        classNameForIcon="bg-blue-50 text-blue-600"
        subtitle="รายการ"
        className="max-h-180 gap-2 p-5"
      />
      <CardMetric
        title="กำลังตรวจสอบ"
        value={stats.inspecting}
        icon={Clock}
        classNameForIcon="bg-orange-50 text-orange-500"
        subtitle="รายการ"
        className="max-h-180 gap-2 p-5"
      />
      <CardMetric
        title="ตรวจสอบแล้ว"
        value={stats.inspected}
        icon={CheckCircle2}
        classNameForIcon="bg-emerald-50 text-emerald-600"
        subtitle="รายการ"
        className="max-h-180 gap-2 p-5"
      />
      <CardMetric
        title="พบประเด็น"
        value={stats.issueFound}
        icon={XCircle}
        classNameForIcon="bg-purple-50 text-purple-600"
        subtitle="รายการ"
        className="max-h-180 gap-2 p-5"
      />
      <CardMetric
        title="ยกเลิก"
        value={stats.canceled}
        icon={XSquare}
        classNameForIcon="bg-slate-100 text-slate-500"
        subtitle="รายการ"
        className="max-h-180 gap-2 p-5"
      />
    </div>
  );
}
