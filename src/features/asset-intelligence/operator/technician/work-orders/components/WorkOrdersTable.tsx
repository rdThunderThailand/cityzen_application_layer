"use client";

import { TechnicianAllWOItem } from "@/features/asset-intelligence/operator/technician/types";
import { AlertTriangle, CalendarCheck, MoreHorizontal, Search, Wrench } from "lucide-react";

interface WorkOrdersTableProps {
  workOrders: TechnicianAllWOItem[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onSelectAll: (checked: boolean) => void;
}

export function WorkOrdersTable({ workOrders, selectedIds, onToggleSelect, onSelectAll }: WorkOrdersTableProps) {
  const allSelected = workOrders.length > 0 && selectedIds.length === workOrders.length;
  const someSelected = selectedIds.length > 0 && !allSelected;

  const getIcon = (iconName: string, iconClass: string) => {
    switch (iconName) {
      case "Wrench": return <Wrench className={`w-4 h-4 ${iconClass}`} />;
      case "CalendarCheck": return <CalendarCheck className={`w-4 h-4 ${iconClass}`} />;
      case "Search": return <Search className={`w-4 h-4 ${iconClass}`} />;
      case "AlertTriangle": return <AlertTriangle className={`w-4 h-4 ${iconClass}`} />;
      default: return <Wrench className={`w-4 h-4 ${iconClass}`} />;
    }
  };

  const getActionClass = (text: string) => {
    if (text === "ดูรายละเอียด") return "border-blue-200 text-blue-600 hover:bg-blue-50 bg-white";
    if (text === "ดูสรุปงาน") return "border-emerald-200 text-emerald-600 hover:bg-emerald-50 bg-white";
    return "border-slate-200 text-slate-600 hover:bg-slate-50 bg-white";
  };

  return (
    <div className="overflow-x-auto min-h-[400px]">
      <table className="w-full text-left border-collapse min-w-[1300px]">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/50 text-[11px] font-bold text-slate-500 tracking-wider">
            <th className="p-4 w-[50px] text-center">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                checked={allSelected}
                ref={input => {
                  if (input) input.indeterminate = someSelected;
                }}
                onChange={(e) => onSelectAll(e.target.checked)}
              />
            </th>
            <th className="p-4">เลขที่ใบงาน</th>
            <th className="p-4">ประเภทงาน</th>
            <th className="p-4">ครุภัณฑ์ / สถานที่</th>
            <th className="p-4">ผู้แจ้ง / ผู้สร้าง</th>
            <th className="p-4 text-center">ความสำคัญ</th>
            <th className="p-4 text-center">สถานะ</th>
            <th className="p-4">กำหนดเสร็จ</th>
            <th className="p-4">วันที่สร้าง</th>
            <th className="p-4">ผู้รับผิดชอบ</th>
            <th className="p-4 text-center w-[160px]">การดำเนินการ</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {workOrders.length === 0 ? (
            <tr>
              <td colSpan={11} className="p-8 text-center text-slate-400 font-medium">
                ไม่พบข้อมูลที่ตรงกับเงื่อนไข
              </td>
            </tr>
          ) : (
            workOrders.map(wo => {
              const isSelected = selectedIds.includes(wo.id);
              return (
                <tr
                  key={wo.id}
                  className={`group hover:bg-slate-50/80 transition-colors cursor-pointer ${isSelected ? 'bg-blue-50/30' : 'bg-white'}`}
                  onClick={() => onToggleSelect(wo.id)}
                >
                  <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      checked={isSelected}
                      onChange={() => onToggleSelect(wo.id)}
                    />
                  </td>
                  <td className="p-4">
                    <p className="text-[13px] font-bold text-blue-600 group-hover:underline">{wo.woNumber}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{wo.createdDate}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${wo.taskIconBg} border-white shadow-sm`}>
                        {getIcon(wo.taskIcon, wo.taskIconColor)}
                      </div>
                      <span className="text-[12px] font-bold text-slate-700">{wo.taskType}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-[12px] font-bold text-slate-800 leading-tight">{wo.assetName}</p>
                    <p className="text-[11px] text-slate-500 mt-1 leading-tight">{wo.location}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-[12px] font-bold text-slate-800">{wo.reporterName}</p>
                    {wo.reporterDept && <p className="text-[11px] text-slate-500 mt-1">{wo.reporterDept}</p>}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap border border-white shadow-sm ${wo.priorityColor}`}>
                      {wo.priority}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap ${wo.statusBg} ${wo.statusColor}`}>
                      {wo.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <p className="text-[12px] font-bold text-slate-800">{wo.dueDate}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{wo.dueTime}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-[12px] font-bold text-slate-800">{wo.createdDateOnly}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{wo.createdTimeOnly}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-[12px] font-bold text-slate-700">{wo.assigneeName}</p>
                  </td>
                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center gap-2">
                      <button className={`px-3 py-1.5 rounded-lg border text-[11px] font-bold transition-colors w-24 text-center ${getActionClass(wo.actionText)}`}>
                        {wo.actionText}
                      </button>
                      <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors bg-white">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
