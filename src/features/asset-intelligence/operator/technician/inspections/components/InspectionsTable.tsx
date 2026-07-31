"use client";

import { TechnicianInspectionItem } from "@/features/asset-intelligence/operator/technician/types";
import { Image as ImageIcon, MoreHorizontal } from "lucide-react";

interface InspectionsTableProps {
  inspections: TechnicianInspectionItem[];
  selectedId?: string;
  onSelect?: (item: TechnicianInspectionItem) => void;
}

export function InspectionsTable({ inspections, selectedId, onSelect }: InspectionsTableProps) {
  return (
    <div className="overflow-x-auto custom-scrollbar flex-1">
      <table className="w-full text-left border-collapse min-w-[1300px]">
        <thead>
          <tr className="border-b border-slate-200 bg-white text-[12px] font-bold text-slate-600 tracking-wide">
            <th className="p-4 w-[50px] text-center">
              <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            </th>
            <th className="p-4 min-w-[150px]">เลขที่ใบงาน</th>
            <th className="p-4 min-w-[240px]">ครุภัณฑ์ / รายการ</th>
            <th className="p-4 min-w-[180px]">สถานที่</th>
            <th className="p-4 min-w-[160px]">ผู้แจ้ง</th>
            <th className="p-4 min-w-[140px] text-center">สถานะ</th>
            <th className="p-4 min-w-[100px] text-center">ความเร่งด่วน</th>
            <th className="p-4 min-w-[130px]">วันที่นัดหมาย</th>
            <th className="p-4 min-w-[130px]">กำหนดตรวจสอบ</th>
            <th className="p-4 min-w-[120px] text-center">การดำเนินการ</th>
          </tr>
        </thead>
        <tbody>
          {inspections.map((item) => (
            <tr
              key={item.id}
              onClick={() => onSelect?.(item)}
              className={`border-b border-slate-100 transition-colors group cursor-pointer ${selectedId === item.id ? "bg-blue-50/30" : "hover:bg-slate-50"}`}
            >
              <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              </td>
              <td className="p-4">
                <p className="text-[13px] font-bold text-slate-800">{item.woNumber}</p>
                <p className="text-[11px] text-slate-500 mt-1">{item.woDate}</p>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                    <ImageIcon className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-slate-700">{item.assetName}</p>
                    <p className="text-[11px] text-slate-500 mt-1">{item.assetLocation}</p>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <p className="text-[13px] font-medium text-slate-600 max-w-[160px] truncate">{item.location}</p>
              </td>
              <td className="p-4">
                <p className="text-[13px] font-bold text-slate-700">{item.reporterName}</p>
                <p className="text-[11px] text-slate-500 mt-1">{item.reporterDept}</p>
              </td>
              <td className="p-4 text-center">
                <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold ${item.statusBg} ${item.statusColor}`}>
                  {item.status}
                </span>
              </td>
              <td className="p-4 text-center">
                <span className={`text-[12px] font-bold ${item.priorityColor}`}>
                  {item.priority}
                </span>
              </td>
              <td className="p-4">
                <p className="text-[13px] font-bold text-slate-700">{item.appointmentDate}</p>
                <p className="text-[11px] font-medium text-slate-500 mt-1">{item.appointmentTime}</p>
              </td>
              <td className="p-4">
                <p className="text-[13px] font-bold text-slate-700">{item.dueDate}</p>
                <p className="text-[11px] font-medium text-slate-500 mt-1">{item.dueTime}</p>
              </td>
              <td className="p-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-center gap-2">
                  <button className="px-4 py-1.5 rounded-full border border-blue-200 text-blue-600 bg-white hover:bg-blue-50 text-[12px] font-bold transition-colors whitespace-nowrap">
                    {item.actionText}
                  </button>
                  <button className="p-1.5 rounded-full border border-blue-200 text-blue-600 bg-white hover:bg-blue-50 transition-colors shrink-0">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {inspections.length === 0 && (
            <tr>
              <td colSpan={10} className="p-8 text-center text-slate-500">
                ไม่พบข้อมูลการตรวจสอบหน้างาน
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
