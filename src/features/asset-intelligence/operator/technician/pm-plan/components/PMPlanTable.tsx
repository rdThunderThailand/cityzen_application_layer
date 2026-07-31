"use client";

import { TechnicianPMPlanItem } from "@/features/asset-intelligence/operator/technician/types";
import { ArrowUpDown, Lightbulb, MoreHorizontal, Settings, ShieldAlert, Truck, Wind, Wrench, Zap } from "lucide-react";

interface PMPlanTableProps {
  plans: TechnicianPMPlanItem[];
}

export function PMPlanTable({ plans }: PMPlanTableProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Wrench": return <Wrench className="w-4 h-4" />;
      case "Zap": return <Zap className="w-4 h-4" />;
      case "Wind": return <Wind className="w-4 h-4" />;
      case "Settings": return <Settings className="w-4 h-4" />;
      case "ArrowUpDown": return <ArrowUpDown className="w-4 h-4" />;
      case "Lightbulb": return <Lightbulb className="w-4 h-4" />;
      case "Truck": return <Truck className="w-4 h-4" />;
      case "ShieldAlert": return <ShieldAlert className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  return (
    <div className="overflow-x-auto custom-scrollbar flex-1">
      <table className="w-full text-left border-collapse min-w-[1200px]">
        <thead>
          <tr className="border-b border-slate-200 bg-white text-[12px] font-bold text-slate-600 tracking-wide">
            <th className="p-4 w-[60px] text-center">ลำดับ</th>
            <th className="p-4 min-w-[160px]">รหัสแผน PM</th>
            <th className="p-4 min-w-[200px]">ชื่อแผน PM</th>
            <th className="p-4 min-w-[180px]">ครุภัณฑ์ / สถานที่</th>
            <th className="p-4 min-w-[120px]">ความถี่</th>
            <th className="p-4 min-w-[150px]">รอบถัดไป</th>
            <th className="p-4 min-w-[160px]">ผู้รับผิดชอบ</th>
            <th className="p-4 min-w-[140px]">สถานะ</th>
            <th className="p-4 min-w-[120px] text-center">การดำเนินการ</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan, idx) => (
            <tr
              key={plan.id}
              className="border-b border-slate-100 hover:bg-slate-50 transition-colors group cursor-pointer"
            >
              <td className="p-4 text-center">
                <span className="text-[13px] font-bold text-slate-500">{idx + 1}</span>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${plan.iconBg} ${plan.iconColor}`}>
                    {getIcon(plan.icon)}
                  </div>
                  <span className="text-[13px] font-bold text-slate-800">{plan.code}</span>
                </div>
              </td>
              <td className="p-4">
                <p className="text-[13px] font-bold text-slate-700">{plan.name}</p>
              </td>
              <td className="p-4">
                <p className="text-[13px] font-bold text-slate-700">{plan.assetName}</p>
                <p className="text-[11px] text-slate-500 mt-1">{plan.location}</p>
              </td>
              <td className="p-4">
                <p className="text-[13px] font-medium text-slate-600">{plan.frequency}</p>
              </td>
              <td className="p-4">
                <p className="text-[13px] font-bold text-slate-700">{plan.nextCycleDate}</p>
                <p className={`text-[11px] font-bold mt-1 ${plan.nextCycleColor}`}>{plan.nextCycleRemaining}</p>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-slate-200 overflow-hidden shrink-0">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(plan.assigneeName)}&background=random&color=fff`}
                      alt={plan.assigneeName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[13px] font-bold text-slate-700">{plan.assigneeName}</span>
                </div>
              </td>
              <td className="p-4">
                <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[11px] font-bold ${plan.statusBg} ${plan.statusColor}`}>
                  {plan.status}
                </span>
              </td>
              <td className="p-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-center gap-2">
                  <button className="px-4 py-1.5 rounded-full border border-blue-200 text-blue-600 bg-white hover:bg-blue-50 text-[12px] font-bold transition-colors">
                    {plan.actionText}
                  </button>
                  <button className="p-1.5 rounded-full border border-blue-200 text-blue-600 bg-white hover:bg-blue-50 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {plans.length === 0 && (
            <tr>
              <td colSpan={9} className="p-8 text-center text-slate-500">
                ไม่พบข้อมูลแผนบำรุงรักษา
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
