"use client";

import { TechnicianMyTaskItem } from "@/features/asset-intelligence/operator/technician/types";
import { CalendarCheck, MoreHorizontal, Search, Wrench } from "lucide-react";
import { TechnicianTable } from "../../components/shared/TechnicianTable";

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

  const getActionClass = () => {
    return "border-blue-200 text-blue-600 bg-white hover:bg-blue-50";
  };

  return (
    <div className="overflow-x-auto">
      <TechnicianTable
        minWidth="1200px"
        emptyMessage="ไม่พบข้อมูลที่ตรงกับเงื่อนไข"
        columns={[
          {
            header: (
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                checked={allSelected}
                ref={input => {
                  if (input) input.indeterminate = someSelected;
                }}
                onChange={(e) => onSelectAll(e.target.checked)}
              />
            ),
            align: "center",
            width: "50px"
          },
          { header: "เลขที่ใบงาน" },
          { header: "ประเภทงาน" },
          { header: "ครุภัณฑ์ / สถานที่" },
          { header: "ผู้แจ้ง" },
          { header: "ลำดับความสำคัญ", align: "center" },
          { header: "กำหนดเสร็จ" },
          { header: "สถานะ", align: "center" },
          { header: "การดำเนินการ", align: "center", width: "160px" }
        ]}
      >
        {tasks.map(task => {
          const isSelected = selectedIds.includes(task.id);
          return (
            <tr
              key={task.id}
              className={`group hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-100 ${isSelected ? 'bg-blue-50/30' : 'bg-white'}`}
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
                  <button className={`px-4 py-1.5 rounded-full border text-[12px] font-bold transition-colors w-28 text-center ${getActionClass()}`}>
                    {task.actionText}
                  </button>
                  <button className="p-1.5 rounded-full border border-blue-200 text-blue-600 bg-white hover:bg-blue-50 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </TechnicianTable>
    </div>
  );
}
