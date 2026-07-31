"use client";

import { TechnicianMyTaskItem } from "@/features/asset-intelligence/operator/technician/types";
import { CalendarCheck, MoreHorizontal, Search, Wrench } from "lucide-react";

interface MyTasksTableProps {
  tasks: TechnicianMyTaskItem[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onSelectAll: (checked: boolean) => void;
}

export function MyTasksTable({ tasks, selectedIds, onToggleSelect, onSelectAll }: MyTasksTableProps) {
  const allSelected = tasks.length > 0 && selectedIds.length === tasks.length;
  const someSelected = selectedIds.length > 0 && !allSelected;

  const getIcon = (iconName: string, iconClass: string) => {
    switch (iconName) {
      case "Wrench": return <Wrench className={`w-4 h-4 ${iconClass}`} />;
      case "CalendarCheck": return <CalendarCheck className={`w-4 h-4 ${iconClass}`} />;
      case "Search": return <Search className={`w-4 h-4 ${iconClass}`} />;
      default: return <Wrench className={`w-4 h-4 ${iconClass}`} />;
    }
  };

  const getActionClass = (text: string) => {
    return "border-blue-200 text-blue-600 bg-white hover:bg-blue-50";
  };

  return (
    <div className="overflow-x-auto min-h-[400px]">
      <table className="w-full text-left border-collapse min-w-[1200px]">
        <thead>
          <tr className="border-b border-slate-200 bg-white text-[12px] font-bold text-slate-600 tracking-wide">
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
            <th className="p-4">ผู้แจ้ง</th>
            <th className="p-4 text-center">ลำดับความสำคัญ</th>
            <th className="p-4">กำหนดเสร็จ</th>
            <th className="p-4 text-center">สถานะ</th>
            <th className="p-4 text-center w-[160px]">การดำเนินการ</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {tasks.length === 0 ? (
            <tr>
              <td colSpan={9} className="p-8 text-center text-slate-400 font-medium">
                ไม่พบข้อมูลที่ตรงกับเงื่อนไข
              </td>
            </tr>
          ) : (
            tasks.map(task => {
              const isSelected = selectedIds.includes(task.id);
              return (
                <tr
                  key={task.id}
                  className={`group hover:bg-slate-50/80 transition-colors cursor-pointer ${isSelected ? 'bg-blue-50/30' : 'bg-white'}`}
                  onClick={() => onToggleSelect(task.id)}
                >
                  <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      checked={isSelected}
                      onChange={() => onToggleSelect(task.id)}
                    />
                  </td>
                  <td className="p-4">
                    <p className="text-[13px] font-bold text-slate-800">{task.woNumber}</p>
                    <p className="text-[11px] text-slate-500 mt-1">{task.createdDate}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${task.taskIconBg} border-white shadow-sm`}>
                        {getIcon(task.taskIcon, task.taskIconColor)}
                      </div>
                      <span className="text-[12px] font-bold text-slate-700">{task.taskType}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-[12px] font-bold text-slate-800 leading-tight">{task.assetName}</p>
                    <p className="text-[11px] text-slate-500 mt-1 leading-tight">{task.location}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-[12px] font-bold text-slate-800">{task.reporterName}</p>
                    <p className="text-[11px] text-slate-500 mt-1">{task.reporterDept}</p>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap border border-white shadow-sm ${task.priorityColor}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <p className="text-[12px] font-bold text-slate-800">{task.dueDate}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{task.dueTime}</p>
                    {task.overdueText && (
                      <p className="text-[10px] font-bold text-rose-500 mt-0.5">{task.overdueText}</p>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap ${task.statusBg} ${task.statusColor}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center gap-2">
                      <button className={`px-4 py-1.5 rounded-full border text-[12px] font-bold transition-colors w-28 text-center ${getActionClass(task.actionText)}`}>
                        {task.actionText}
                      </button>
                      <button className="p-1.5 rounded-full border border-blue-200 text-blue-600 bg-white hover:bg-blue-50 transition-colors">
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
